require('dotenv').config()

const withCSS = require('@zeit/next-css')

const webpack = require('webpack')
module.exports = withCSS({
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env))
    return config
  },
  exportPathMap: () => {
    return {
      '/': { page: '/' }
    };
  },
  serverRuntimeConfig: { // Will only be available on the server side
  },
  publicRuntimeConfig: { // Will be available on both server and client
    firebase: {
        apiKey: process.env.API_KEY,
        authDomain:process.env.AUTH_DOMAIN,
        databaseURL:process.env.DATABASE_URL,
        storageBucket:process.env.STORAGE_BUCKET,
        projectId:process.env.PROJECT_ID
    }
  }
})