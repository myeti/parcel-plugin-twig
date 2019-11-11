module.exports = function(bundler) {
  bundler.addAssetType('twig', require.resolve('./twig-asset'))
}