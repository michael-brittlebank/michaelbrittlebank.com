module.exports = {
 future: {
  webpack5: true,
 },
 poweredByHeader: false,
 reactStrictMode: true,
 webpack: (config) => {
  // Overcome Webpack referencing `window` in chunks
  config.output.globalObject = `(typeof self !== 'undefined' ? self : this)`
  return config
 }
}