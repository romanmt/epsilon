describe('Epsilon Greedy', function() {
  var spec = {
    test: {
      name: 'test test'
    },
    rn1: .9,
    rn2: .1
  }

  describe('#incrementRewards()', function() {
    it("adds 1 to the total rewards for the selected lever", function() {
      spec.test.levers = [
        {name: "page a", totalTrials: 0, totalRewards: 0},
        {name: "page b", totalTrials: 0, totalRewards: 0},
      ]
      spec.selected = 1;
      expect(EpsilonGreedy(spec)
             .rewardSelectedLever()
             .getSelectedLever()
             .totalRewards).toEqual(1)
    })
  })

  describe('#incrementTrials()', function() {
    it("passes the updated test to the callback", function() {
      spec.test.levers = [
        {name: "page a", totalTrials: 0, totalRewards: 0},
        {name: "page b", totalTrials: 0, totalRewards: 0},
      ]
      function callback(test) {
        expect(test.getSelectedLever().totalTrials).toEqual(1);
      }
      EpsilonGreedy(spec).selectLever(callback)

    })

    it("adds once for each selection", function(done) {
      spec.test.levers = [
        {name: "page a", totalTrials: 0, totalRewards: 0},
        {name: "page b", totalTrials: 0, totalRewards: 0},
      ]
      expect(EpsilonGreedy(spec)
             .selectLever()
             .selectLever()
             .getSelectedLever()
             .totalTrials).toEqual(2)
    })

    it("adds 1 to the total trials for the given lever", function() {
      spec.test.levers = [
        {name: "page a", totalTrials: 0, totalRewards: 0},
        {name: "page b", totalTrials: 0, totalRewards: 0},
      ]
      expect(EpsilonGreedy(spec)
             .selectLever()
             .getSelectedLever()
             .totalTrials).toEqual(1)
    })
  })

  describe('#selectLever()', function() {
    describe('for a brand new tests', function() {
      it("selects the last", function(done) {
        spec.test.levers = [
          {name: "page a", totalTrials: 0, totalRewards: 0},
          {name: "page b", totalTrials: 0, totalRewards: 0},
        ]
        expect(EpsilonGreedy(spec)
               .selectLever()
               .getSelectedLever()
               .name).toEqual('page b');
      })
    })

    describe('when there is no clear winner', function() {
      it("selects the last", function() {
        spec.test.levers = [
          {name: "page a", totalTrials: 10, totalRewards: 2},
          {name: "page b", totalTrials: 10, totalRewards: 2},
        ]
        expect(EpsilonGreedy(spec)
               .selectLever()
               .getSelectedLever()
               .name).toEqual("page b");
      })
    })

    describe('90% of the time', function() {
      it("selects based on probability", function() {
        spec.test.levers = [
          {name: "page a", totalTrials: 10, totalRewards: 1},
          {name: "page b", totalTrials: 10, totalRewards: 2},
        ]
        expect(EpsilonGreedy(spec)
               .selectLever()
               .getSelectedLever()
               .name).toEqual("page b");
      })
    })

    describe('10% of the time', function() {
      it("selects based on the random number", function() {
        spec.test.levers = [
          {name: "page a", totalTrials: 10, totalRewards: 1},
          {name: "page b", totalTrials: 10, totalRewards: 2},
        ]
        expect(EpsilonGreedy(spec)
               .seed(.01, .1)
               .selectLever()
               .getSelectedLever()
               .name).toEqual("page a");
      })
    })
  })
})
