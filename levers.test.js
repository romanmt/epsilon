describe('Levers', function() {
  describe('#select()', function() {
    it("doesn't default if the value does exist", function() {
      var ids = ['b']
      var obj = {b: {name: 'b', val: 'hola'}}
      var defaults = {val: 'hello'}
      var expected = [{name: 'b', val: 'hola'}]
      expect(Levers().select(ids, obj, defaults)).toEqual(expected)
    })
    it("defaults if the value doesn't exist", function() {
      var ids = ['b']
      var obj = {}
      var defaults = {val: 'hello'}
      var expected = [{name: 'b', val: 'hello'}]
      expect(Levers().select(ids, obj, defaults)).toEqual(expected)
    })

    it("selects elements from object into an array", function() {
      var ids = ['b']
      var obj = {'a': {name: "a"}, 'b': {name: "b"}}
      var expected = [{name: 'b'}]
      expect(Levers().select(ids, obj)).toEqual(expected)
    })
  })

  describe('#Objectify', function() {
    it("converts an array of objects to a single object", function() {
      var array = [{name: 'a'}, {name: 'b'}];
      expect(Levers().objectify(array)).toEqual({'a': array[0], 'b': array[1]});
    })
  })
})
