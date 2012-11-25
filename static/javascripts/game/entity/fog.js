define('game/entity/fog',
       ['game/graphic'],
       function(Graphic) {
  return Graphic.extend({
    initialize: function(options) {
      options = _.defaults(options || {}, {
        url: 'assets/images/fog.png'
      });

      Graphic.prototype.initialize.call(this, options);
    },
    invalidateNeighbors: function(neighbors) {
      var neighbor;

      for (neighbor in neighbors) {
        if (typeof neighbors[neighbor] === 'undefined') {
          neighbors[neighbor] = 512;
        }
      }
      var top = neighbors.top;
      var left = neighbors.left;
      var right = neighbors.right;
      var bottom = neighbors.bottom;
      var topLeft = neighbors.topLeft;
      var topRight = neighbors.topRight;
      var bottomLeft = neighbors.bottomLeft;
      var bottomRight = neighbors.bottomRight;
      var index = this.currentIndex;

      this.sprite.goTo(0);
      this.rotation = 0;

      if ((top & left & right & bottom & 512) === 512) {
        if (!(topLeft & 512) &&
            !(bottomLeft & 512) &&
            !(topRight & 512) &&
            !(bottomRight & 512)) {
          this.sprite.goTo(8);
        } else if (!(topLeft & 512) &&
                   !(bottomLeft & 512) &&
                   !(topRight & 512)) {
          this.sprite.goTo(9);
          this.rotation = -Math.PI / 2;
        } else if (!(topLeft & 512) &&
                   !(bottomLeft & 512) &&
                   !(bottomRight & 512)) {
          this.sprite.goTo(9);
          this.rotation = Math.PI;
        } else if (!(topRight & 512) &&
                   !(bottomLeft & 512) &&
                   !(bottomRight & 512)) {
          this.sprite.goTo(9);
        } else if (!(topLeft & 512) &&
                   !(bottomRight & 512)) {
          this.sprite.goTo(10);
          this.rotation = Math.PI / 2;
        } else if (!(topRight & 512) &&
                   !(bottomLeft & 512)) {
          this.sprite.goTo(10);
        } else if (!(topLeft & 512) &&
                   !(topRight & 512)) {
          this.sprite.goTo(7);
        } else if (!(topLeft & 512) &&
                   !(bottomLeft & 512)) {
          this.sprite.goTo(7);
          this.rotation = -Math.PI / 2;
        } else if (!(bottomLeft & 512) &&
                   !(bottomRight & 512)) {
          this.sprite.goTo(7);
          this.rotation = Math.PI;
        } else if (!(topRight & 512) &&
                   !(bottomRight & 512)) {
          this.sprite.goTo(7);
          this.rotation = Math.PI / 2;
        } else if (!(topRight & 512)) {
          this.sprite.goTo(5);
        } else if (!(topLeft & 512)) {
          this.sprite.goTo(5);
          this.rotation = -Math.PI / 2;
        } else if (!(bottomLeft & 512)) {
          this.sprite.goTo(5);
          this.rotation = Math.PI;
        } else if (!(bottomRight & 512)) {
          this.sprite.goTo(5);
          this.rotation = Math.PI / 2;
        } else {
          this.sprite.goTo(0);
        }
        /*if ((topLeft & topRight & bottomLeft & bottomRight & 512) === 0) {
          this.sprite.goTo(8);
        } else if ((topLeft & topRight & bottomLeft & 512) === 0) {
          this.sprite.goTo(9);
          this.rotation = -Math.PI / 2;
        } else if ((topLeft & topRight & bottomRight & 512) === 0) {
          this.sprite.goTo(9);
        } else if ((bottomLeft & bottomRight & topLeft & 512) === 0) {
          this.sprite.goTo(9);
          this.rotation = Math.PI;
        } else if ((bottomLeft & bottomRight & topRight & 512) === 0) {
          this.sprite.goTo(9);
          this.rotation = Math.PI / 2;
        } else {
          this.sprite.goTo(0);
        }*/
      } else if ((top & left & right & 512) === 512) {
        this.sprite.goTo(1);
        this.rotation = Math.PI / 2;
      } else if ((bottom & left & right & 512) === 512) {
        this.sprite.goTo(1);
        this.rotation = -Math.PI / 2;
      } else if ((bottom & left & top & 512) === 512) {
        this.sprite.goTo(1);
      } else if ((bottom & right & top & 512) === 512) {
        this.sprite.goTo(1);
        this.rotation = Math.PI;
      } else if ((bottom & top & 512) === 512) {
        this.sprite.goTo(2);
      } else if ((left & right & 512) === 512) {
        this.sprite.goTo(2);
        this.rotation = Math.PI / 2;
      } else if ((left & top & 512) === 512) {
        this.sprite.goTo(6);
        this.rotation = Math.PI / 2;
      } else if ((left & bottom & 512) === 512) {
        this.sprite.goTo(6);
      } else if ((right & top & 512) === 512) {
        this.sprite.goTo(6);
        this.rotation = Math.PI;
      } else if ((right & bottom & 512) === 512) {
        this.sprite.goTo(6);
        this.rotation = -Math.PI / 2;
      } else if ((right & 512) === 512) {
        this.sprite.goTo(3);
        this.rotation = -Math.PI / 2;
      } else if ((left & 512) === 512) {
        this.sprite.goTo(3);
        this.rotation = Math.PI / 2;
      } else if ((top & 512) === 512) {
        this.sprite.goTo(3);
        this.rotation = Math.PI;
      } else if ((bottom & 512) === 512) {
        this.sprite.goTo(3);
      } else {
        

        this.sprite.goTo(4);
      }

      if (this.currentIndex !== index) {
        this.redraw();
      }
    }
  });
});