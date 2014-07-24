var Benchmark = require('benchmark');
global.Extent = require('./');

var suite = new Benchmark.Suite();

// add tests
suite
.add({
    name: 'contains',
    fn: function() {
         ext.contains([0, 10]);
         invalidExt.contains([0, 10]);
    },
    setup: function() {
        var ext = global.Extent()
            .include([0, 0])
            .include([10, 10]);
        var invalidExt = global.Extent()
            .include([0, 0])
            .include([10, 10]);
    }
})
.add({
    name: 'fastContains',
    fn: function() {
        extContains([0, 10]);
        invalidExtContains([0, 10]);
    },
    setup: function() {
        var extContains = global.Extent()
            .include([0, 0])
            .include([10, 10]).contains();
        var invalidExtContains = global.Extent()
            .include([0, 0])
            .include([10, 10]).contains();
    }
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run({ 'async': true });
