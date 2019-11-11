const HTMLAsset = require('parcel-bundler/src/assets/HTMLAsset')
const Twig = require('./twig')


/**
 * Render on demand
 */
module.exports = class extends HTMLAsset {
  async parse(code) {

    // resolve config
    const pkg = await this.getPackage()
    const rc = await this.getConfig(['.twigrc', '.twigrc.js'])
    const custom = rc || pkg.twig || {}
    const { data, functions, filters, ...rest } = custom
    const opts = {
      path: this.name,
      async: false,
      debug: false,
      trace: false,
      data: code,
      ...rest
    }

    // fetch data
    if(data) {
      for(let key in data) {
        Twig.addGlobal(key, data[key])
      }
    }

    // import functions
    if(functions) {
      for(let key in functions) {
        Twig.extendFunction(key, functions[key])
      }
    }

    // import filters
    if(filters) {
      for(let key in filters) {
        Twig.extendFilter(key, filters[key])
      }
    }

    // compile template
    this.contents = Twig.twig(opts).render()
    return super.parse(this.contents)
  }
}