module.exports = {
  outputDir: 'chat-room',
  publicPath: '/chat-room/',
  lintOnSave: false,
  devServer: {
    port: 8000,
    open: true,
    hot: 'only',
    proxy: {
      '/api': {
        target: 'http://10.0.0.151:8585/shipInspection-supervision-service-v2/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  chainWebpack (config) {
    config.optimization.minimizer('terser').tap((args) => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
  }
}

