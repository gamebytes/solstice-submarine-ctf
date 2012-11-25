define('model/game/move',
       ['underscore', 'backbone'],
       function(_, Backbone) {
  var Move = Backbone.Model.extend({
    defaults: {
      unit: function() {
        return Move.unit.SUB_A;
      },
      points: [],
      shielded: false
    },
    validate: function(attrs) {
      var points = attrs.points;
      var shielded = attrs.shielded;
      var invalid = false;
      var last;

      if (points) {
        _.each(points, function(point) {
          if (!last) {
            point = last;
          } else if (!point.distanceTo(last) === 1) {
            invalid = true;
          }
        });

        if (points.length > 4) {
          invalid = true;
        }

        if (shielded && points.length > 2) {
          invalid = true;
        }
      }

      if (invalid) {
        return 'Invalid move settings.';
      }
    }
  }, {
    unit: {
      SUB_A: 'subA',
      SUB_B: 'subB',
      RKT_A: 'rktA',
      RKT_B: 'rktB'
    }
  });

  return Move;
});
