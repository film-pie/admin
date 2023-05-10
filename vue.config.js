const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const appConfig = require('./public/config/config')

const { NODE_ENV, VUE_APP_TITLE = '' } = process.env

const config = {
  transpileDependencies: false,
  productionSourceMap: NODE_ENV === 'production',
  chainWebpack: (setting) => {
    setting.plugin('html').tap((args) => {
      args[0].APP_TITLE = VUE_APP_TITLE
      return args
    })
    // config.module.rule('eslint').use('eslint-loader').options({
    //   emitWarning: false,
    //   emitError: false
    // })
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/styles/variable.less')
      ]
    }
  },
  devServer: {
    open: true,
    port: appConfig.app.port,
    host: 'localhost',
    proxy: {
      '/api': {
        target: `https://localhost:${path}`,
        changeOrigin: true
      }
    }
  }
}

module.exports = defineConfig(config)
