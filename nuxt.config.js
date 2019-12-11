const pkg = require('./package')
require('dotenv').config()
const webpack = require('webpack')

const config = require('./.contentful.json')

module.exports = {

  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: `${pkg.name} - %s`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.7.2/css/all.css',
        integrity: 'sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr',
        crossorigin: 'anonymous'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: '~/components/utils/Preloader.vue',

  /*
  ** Global CSS
  */
  css: [
    '@/assets/sass/index.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-plugins-ssr.js',
    { src: '~/plugins/vue-plugins-csr.js', ssr: false },
    '~/plugins/vue-mixins.js',
    { src: '~/plugins/vue-init.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/sitemap',
    '@nuxtjs/style-resources',
    ...process.env['GOOGLE_ANALYTICS_TOKEN'] ? [['@nuxtjs/google-analytics', {
      id: process.env['GOOGLE_ANALYTICS_TOKEN']
    }]] : [],
    ...process.env['FACEBOOK_PIXEL'] ? [['nuxt-facebook-pixel-module', {
      track: 'PageView',
      pixelId: process.env['FACEBOOK_PIXEL'],
      disabled: false
    }]] : []
  ],

  styleResources: {
    sass: [
      '@/assets/sass/_variables.scss',
      '@/assets/sass/_mixins.scss'
    ]
  },

  /*
  ** Router Settings
  */
  router: {
    middleware: 'cache-management'
  },

  /*
   ** Sitemap settings
   */
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env['APP_URL'],
    cacheTime: 1000 * 60 * 15,
    gzip: false,
    generate: true,
    routes: () => {
      return []
    }
  },

  /*
  ** Build configuration
  */
  build: {
    plugins: [
      // set shortcuts as global for bootstrap
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // // Run ESLint on save
      // if (ctx.isDev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      // }
    }
  },
  env: {
    CTF_SPACE_ID: config.CTF_SPACE_ID,
    CTF_CDA_ACCESS_TOKEN: config.CTF_CDA_ACCESS_TOKEN,
    CTF_BLOG_POST_TYPE_ID: config.CTF_BLOG_POST_TYPE_ID
  }
}
