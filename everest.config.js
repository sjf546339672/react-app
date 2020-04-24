module.exports = {
  pages: {
    index: {
      entry: './src/index.js',
      template: './public/index.html'
    }
  },
  themes: ['white', 'blue'],
  alias: {
    '@': './src'
  },
  proxy: {
    context: ['/tenant/**', '/api/**', '/notify/**', '/frontend/**'],
    target: 'http://10.1.62.146/'
  }
}
