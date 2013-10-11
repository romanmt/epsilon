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
})(typeof window === 'undefined' ? this : window);
