const Twig = require('twig')

// enhance twig
Twig.extend(function(core) {

  // add global props and setter
  core.exports.globals = {}
  core.exports.addGlobal = function(key, value) {
    core.exports.globals[key] = value
  }

  // overwrite render() method to use globals
  core.Template.prototype._render = core.Template.prototype.render
  core.Template.prototype.render = function(context, params) {
    const data = Object.assign({}, core.exports.globals, context)
    return this._render(data, params)
  }

})

module.exports = Twig