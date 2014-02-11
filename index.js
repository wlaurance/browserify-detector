var _ = require('underscore')

var sToC = [
  '[function(require,module,exports)'
]

function liner(line, number) {
  return {
    number: number,
    line: line
  }
}

function checker(o) {
  return _.some(sToC, function(c) { return o.line.indexOf(c) !== -1 })
}

module.exports = function(scriptText, callback) {
  var type = typeof scriptText
  if (type !== 'string') {
    var eM = 'browserify-detector usage: fn(string, function)'
    return callback(new Error(eM))
  } else {
    var lines = _.map(scriptText.split('\n'), liner)
    var suspects = _.filter(lines, checker)
    callback(null, suspects.length > 0 ? { lines: suspects } : void 0)
  }
}
