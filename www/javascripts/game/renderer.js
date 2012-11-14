define('game/renderer',
       ['game/object', 'game/node', 'game/entity', 'game/graphic', 'three', 'underscore', 'jquery', 'backbone'],
       function(GameObject, Node, Entity, Graphic, THREE, _, $, Backbone) {

  var Renderer = GameObject.extend({
    initialize: function(options) {
      options = _.defaults(options || {}, {
        width: 720,
        height: 360
      });

      GameObject.prototype.initialize.apply(this, arguments);

      this.canvas = document.createElement('canvas');
      this.options = options;

      if (window.matchMedia) {
        this.matchTinyScreen = window.matchMedia('(max-width: 539px)');
        this.matchSmallScreen = window.matchMedia('(max-width: 719px)');
        this.matchMediumScreen = window.matchMedia('(max-width: 1599px)');
        this.matchLargeScreen = window.matchMedia('(min-width: 1600px)');

        this.boundInvalidateRatios = _.bind(this.invalidateRatios, this);

        this.matchTinyScreen.addListener(this.boundInvalidateRatios);
        this.matchSmallScreen.addListener(this.boundInvalidateRatios);
        this.matchMediumScreen.addListener(this.boundInvalidateRatios);
        this.matchLargeScreen.addListener(this.boundInvalidateRatios);
      }


      this.pressedKeys = 0;
      this.rendered = false;
      
      this.context = this.canvas.getContext('2d');
      this.sceneRoot = new Node();
      this.redrawRectangles = null;
      this.translations = [];
      this.rotations = [];
      this.translationOrigin = new THREE.Vector2();
      this.rotationOrigin = 0;

      this.$window = $(window);
      this.$body = $(document.body);
      this.$root = $('#Game');
      this.$canvas = $(this.canvas);

      this.invalidateRatios();
      // Set the scale based on device pixel ratio..

      this.sceneRoot.on('draw', this.pushRedrawRectangle, this);

      this.$root.prepend(this.$canvas);
    },
    dispose: function() {
      this.sceneRoot.off('draw', this.pushRedrawRect, this);

      if (window.matchMedia) {
        this.matchTinyScreen.removeListener(this.boundInvalidateRatios);
        this.matchSmallScreen.removeListener(this.boundInvalidateRatios);
        this.matchMediumScreen.removeListener(this.boundInvalidateRatios);
        this.matchLargeScreen.removeListener(this.boundInvalidateRatios);

        this.boundInvalidateRatios = null;

        this.matchTinyScreen = null;
        this.matchSmallScreen = null;
        this.matchMediumScreen = null;
        this.matchLargeScreen = null;
      }

      this.$canvas.remove();

      this.$canvas = null;
      this.canvas = null;
      this.context = null;
      this.renderer = null;

      this.sceneRoot.dispose();
      this.sceneRoot = null;

      this.$window = null;
      this.$body = null;

      this.redrawRectangles = null;
      this.translations = null;
      this.rotations = null;
      this.translationOrigin = null;
    },
    draw: function(entity) {
      if (entity && entity instanceof Entity) {
        var x = entity.position.x * this.graphicRatio;
        var y = entity.position.y * this.graphicRatio;
        var w = entity.width * this.graphicRatio;
        var h = entity.height * this.graphicRatio;
        var w2 = w / this.graphicRatio;
        var h2 = h / this.graphicRatio;
        var r = entity.rotation;
        var drawRect = new THREE.Rectangle();

        drawRect.set(-w2, -h2, -w2 + w, -h2 + h);
        
        this.pushTranslation(new THREE.Vector2(w2, h2));

        if (entity instanceof Graphic && (!this.rendered || this.shouldRedraw(drawRect))) {
          this.context.drawImage(
            entity.sprite.image,
            entity.sprite.clipRect.getX(),
            entity.sprite.clipRect.getY(),
            entity.sprite.clipRect.getWidth(),
            entity.sprite.clipRect.getHeight(),
            drawRect.getX(),
            drawRect.getY(),
            drawRect.getWidth(),
            drawRect.getHeight()
          );
        }

        this.popTranslation();
      }
    },
    drawScene: function(node) {
      if (node) {
        var iter = node;
        var x;
        var y;
        var r;

        do {
          x = 0;
          y = 0;
          r = 0;

          if (iter instanceof Entity) {
            x = iter.position.x * this.graphicRatio;
            y = iter.position.y * this.graphicRatio;
            r = iter.rotation;
          }


          this.pushTranslation(new THREE.Vector2(x, y));
          r && this.pushRotation(r);

          this.draw(iter);
          this.drawScene(iter.firstChild);

          r && this.popRotation();
          this.popTranslation();

        } while (iter = iter.nextSibling);
      }
    },
    updateScene: function(node) {
      if (node) {
        var iter = node;

        do {
          if (iter instanceof Graphic) {
            iter.draw();
          }

          this.updateScene(iter.firstChild);
        } while(iter = iter.nextSibling);
      }
    },
    render: function() {
      this.updateScene(this.sceneRoot);
      this.drawScene(this.sceneRoot);
      this.cleanup();
    },
    cleanup: function() {
      this.rendered = true;
      this.redrawRectangles = null;
    },
    pushTranslation: function(translation) {
      if (translation) {
        this.context.translate(translation.x, translation.y);
        this.translationOrigin.add(this.translationOrigin, translation);
        this.translations.push(translation);
      }
    },
    popTranslation: function() {
      var translation = this.translations.pop();
      this.translationOrigin.sub(this.translationOrigin, translation);
      this.context.translate(-translation.x, -translation.y);
      return translation;
    },
    pushRotation: function(rotation) {
      if (rotation) {
        this.context.rotate(rotation);
        this.rotationOrigin += rotation;
        this.rotations.push(rotation);
      }
    },
    popRotation: function() {
      var rotation = this.rotations.pop();
      this.rotationOrigin -= rotation;
      this.context.rotate(-rotation);
      return rotation;
    },
    pushRedrawRectangle: function(rect) {
      if (rect) {
        var iter = rect;

        rect.set(rect.getLeft() * this.graphicRatio,
                 rect.getTop() * this.graphicRatio,
                 rect.getRight() * this.graphicRatio,
                 rect.getBottom() * this.graphicRatio);

        rect.next = this.redrawRectangles;

        while (iter.next) {
          if (iter.next.intersects(rect)) {
            rect.addRectangle(iter.next);
            iter.next = iter.next.next;
          } else {
            iter = iter.next;
          }
        }

        this.redrawRectangles = rect;
      }
    },
    adjusted: function(rect) {
      var adjusted = new THREE.Rectangle();
      adjusted.set(rect.getLeft() + this.translationOrigin.x,
               rect.getTop() + this.translationOrigin.y,
               rect.getRight() + this.translationOrigin.x,
               rect.getBottom() + this.translationOrigin.y);
      return adjusted;
    },
    shouldRedraw: function(rect) {
      var iter;

      if (!this.rendered) {
        return true;
      }

      if (!this.redrawRectangles) {
        return false;
      }

      iter = this.redrawRectangles;
      rect = this.adjusted(rect);

      do {
        if (rect.intersects(iter)) {
          return true;
        }
      } while (iter = iter.next);

      return false;
    },
    invalidateRatios: function() {
      this.pixelRatio = window.pixelRatio || 1;
      this.graphicRatio = 2;

      if (window.matchMedia) {
        if (this.matchTinyScreen.matches) {
          this.graphicRatio = 1;
        } else if (this.matchSmallScreen.matches) {
          this.graphicRatio = 1.5;
        } else if (this.matchMediumScreen.matches) {
          this.graphicRatio = 2;
        } else if (this.matchLargeScreen.matches) {
          this.graphicRatio = 3;
        }
      }

      this.width = this.options.width * (this.pixelRatio / 2) * this.graphicRatio;
      this.height = this.options.height * (this.pixelRatio / 2) * this.graphicRatio;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvas.style.width = this.width / this.pixelRatio + 'px';
      this.canvas.style.height = this.height / this.pixelRatio + 'px';

      this.context.scale(this.pixelRatio, this.pixelRatio);
      this.rendered = false;
    }
  });

  _.extend(Renderer.prototype, Backbone.Events);

  return Renderer;
});