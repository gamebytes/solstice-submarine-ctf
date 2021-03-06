define('app',
       ['backbone', 'jquery', 'underscore', 'view/start', 'view/tutorial', 'view/choosemode', 'view/game', 'view/loader', 'model/assets', 'model/application', 'model/user', 'game/assets'],
       function(Backbone, $, _, StartView, TutorialView, ChooseModeView, GameView, LoaderView, AssetsModel, ApplicationModel, UserModel, assets) {
  var App = Backbone.Router.extend({
    routes: {
      '': 'index',
      'load': 'loadAssets',
      'play-online': 'launchOnlineGame',
      'play-solo': 'launchSoloGame',
      'choose-mode': 'chooseMode',
      'tutorial': 'tutorial',
      'start': 'start',
      'logout': 'logout'
    },
    initialize: function() {
      this.assetSources = new AssetsModel({
        data: [
          'assets/data/maps/seabound.json'
        ],
        images: [
          'assets/images/floor.png',
          'assets/images/laser.png',
          'assets/images/items.png',
          'assets/images/walls.png',
          'assets/images/teal-sub.png',
          'assets/images/yellow-sub.png',
          'assets/images/red-rocket.png',
          'assets/images/blue-rocket.png',
          'assets/images/font-yellow.png',
          'assets/images/font-white.png',
          'assets/images/highlight.png',
          'assets/images/logo.png',
          'assets/images/test.png',
          'assets/images/fog.png',
          'assets/images/waypoint.png'
        ]
      });

      this.user = new UserModel();
      this.model = new ApplicationModel();
      this.$body = $('body').addClass('solsticesub-ctf');
      this.$panels = $('#Panels');

      this.user.on('change:id', this.invalidateId, this);

      Backbone.history.start();
    },
    index: function() {
      this.navigate('load', { trigger: true });
    },
    login: function() {
      navigator.id.request({
        siteName: 'The Solstice Submarine: CTF',
        oncancel: function() {
          history.back();
        }
      });
    },
    logout: function() {
      var manualRedirect = this.user.get('id') === null;

      navigator.id.logout();

      if (manualRedirect) {
        this.navigate('start', { trigger: true });
      }
    },
    invalidateId: function() {
      if (Backbone.history.fragment === 'login') {
        history.back();
      } else if (Backbone.history.fragment === 'logout') {
        this.navigate('start', { trigger: true });
      }
    },
    loadAssets: function() {
      if (!this.model.get('assetsLoaded')) {
        var loaderView = this.setCurrentView(new LoaderView({ model: this.assetSources }));
        loaderView.loader.on('loaded', this.onLoadAsset, this);
        loaderView.loader.on('done', this.onLoadComplete, this);
        loaderView.load();
      } else {
        this.navigate('start', { trigger: true });
      }
    },
    start: function() {
      if (this.verifyLoaded()) {
        this.setCurrentView(new StartView());
      }
    },
    tutorial: function() {
      if (this.verifyLoaded()) {
        this.setCurrentView(new TutorialView({ app: this }));
      }
    },
    chooseMode: function() {
      if (this.verifyLoaded()) {
        this.setCurrentView(new ChooseModeView({
          model: this.user,
          app: this
        }));
      }
    },
    launchOnlineGame: function() {
      if (this.verifyLoaded()) {
        if (!this.user.get('id')) {
          this.navigate('logout', { trigger: true });
        }
        try {
          this.setCurrentView(new GameView({
            app: this
          })).play();
        } catch(e) {
          console.error(e.stack || e.message || e.toString());
        }
      }
    },
    launchSoloGame: function() {
      if (this.verifyLoaded()) {
        try {
          this.setCurrentView(new GameView({
            app: this
          })).play();
        } catch(e) {
          console.error(e.stack || e.message || e.toString());
        }
      }
    },
    removeCurrentView: function() {
      if (this.currentView) {
        this.$body.removeClass(function(index, className) {
          return className.match(/(route-(?:[^ ]*))/gi).join(' ');
        });
        this.currentView.$el.remove();
        this.currentView.off();
        this.currentView.dispose();
        delete this.currentView;
      }
    },
    setCurrentView: function(view) {
      if (this.currentView !== view) {
        this.removeCurrentView();
        this.$body.addClass('route-' + Backbone.history.fragment);
        this.$panels.after(view.render().$el);
        this.currentView = view;
      }
      return view;
    },
    onLoadAsset: function(asset) {
      assets.registerAsset(asset.url, asset.data);
    },
    onLoadComplete: function() {
      this.model.set('assetsLoaded', true);
      this.navigate('start', { trigger: true });
    },
    verifyLoaded: function() {
      if (!this.model.get('assetsLoaded')) {
        this.navigate('load', { trigger: true });
      }
      return this.model.get('assetsLoaded');
    }
  });

  return App;
});
