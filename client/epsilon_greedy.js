(function(global) {
  "use strict";

  function Levers() {
    var exports = {
      select: function(ids, levers, defaults) {
        function mapper(element) {
          return levers[element] || _({name: element}).extend(defaults);
        }
        return _(ids).map(mapper);
      },

      objectify: function(levers) {
        function reducer(obj, value) {
          obj[value.name] = value;
          return obj;
        }
        var object = _(levers).reduce(reducer, {})
        return object;
      }
    }
    return exports;
  }

  global.Levers = Levers;
  function EpsilonGreedy(spec) {

    function selectRandom() {
      return Math.floor(spec.rn2 * spec.test.levers.length);
    }

    function selectHighestProbability() {
      var lever =  _(spec.test.levers).max(function(lever) {
        return lever.totalRewards / lever.totalTrials || 0;
      });
      return _(spec.test.levers).indexOf(lever);
    }

    function increment(index, attribute) {
      spec.test.levers[index][attribute] += 1;
      return spec;
    }

    function incrementRewards(index) {
      return increment(index, 'totalRewards');
    }

    function incrementTrials(index) {
      return increment(index, 'totalTrials');
    }

    var exports = {
      seed: function(randomNumber1, randomNumber2) {
        return new EpsilonGreedy(_(spec).extend({
          rn1: randomNumber1 || Math.random(),
          rn2: randomNumber2 || Math.random()
        }));
      },

      getTestData: function() {
        return spec.test;
      },

      getLevers: function() {
        return spec.test.levers;
      },

      getSelectedLever: function() {
        return spec.test.levers[spec.selected];
      },

      rewardSelectedLever: function rewardSelectedLever(callback) {
        var updated = new EpsilonGreedy(incrementRewards(spec.selected));
        if(callback) callback(updated);
        return updated;
      },

      selectLever: function selectLever(callback) {
        var index = (spec.rn1 < 0.1) ?
           selectRandom() :
           selectHighestProbability();
        var newSpec = _(incrementTrials(index)).extend({selected: index})
        var updated = new EpsilonGreedy(newSpec);
        if(callback) callback(updated);
        return updated;
      }
    }
    return exports;
  }

  function initializeTest(test, name) {
    var leverSelector = test.attr('data-levelselector')
    var rewardSelector = test.attr('data-rewardselector')
    if (leverSelector) $(leverSelector).addClass('epsilon-lever')
    if (rewardSelector) $(rewardSelector).addClass('epsilon-reward')

    var ids = _.chain(test.find('.epsilon-lever')).map(function (lever) {
      $(lever).hide()
      return $(lever).attr('data-levername');
    }).uniq().value()

    if(ids.length > 0) {
      $.getJSON('/epsilon/test/' + name, function(data) {
        var levers = Levers().select(
          ids,
          Levers().objectify(data.levers),
          {totalTrials: 0, totalRewards: 0})
        var spec = {test: {name: name, levers: levers}}
        var eg = EpsilonGreedy(spec).seed().selectLever(function(test) {
          var selected = test.getSelectedLever();
          $('.epsilon-lever:not([data-levername='+selected.name+'])').remove()
          $('.epsilon-lever[data-levername='+selected.name+']').show()
          $.post('/epsilon/test', {_method: 'put', test: test.getTestData()});
        });
        $(document).on('click', '.epsilon-reward', function(e) {
          eg.rewardSelectedLever(function(test) {
            $.post('/epsilon/test', {_method: 'put', test: test.getTestData()});
          })
        })
      })
    }
  }

  global.EpsilonGreedy = EpsilonGreedy;

  $(document).ready(function() {
    var test = $('.epsilon-test')
    var testNames = _.chain(test).map(function(t) {
      return $(t).attr('data-testname')
    }).uniq().value()

    _.each(testNames, function(name) {
      initializeTest($("[data-testname='" + name + "']"), name)
    })
  })

})(typeof window === 'undefined' ? this : window);
