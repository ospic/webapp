import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  //target: 'static',
  ssr: false,
  router: {
    base: process.env.NODE_ENV === "production" ? "/webapp/" : "/",
    routerNameSplitter: "/"
  },
  env: {
    baseUrl: 'https://ospicapi.herokuapp.com/api/',
    localUrl: 'http://localhost:8080/api/'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: 'Ospic',
    title: 'ospic-web',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/styles.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/i18n.js",
    '@plugins/vuetify.js',
    '~/plugins/axios',
    '~/plugins/route',
    '~/plugins/pwa.client.js',
    '~/plugins/vue-apexcharts.js',
    '~/mixins/label_mixins.js',
    { src: '~plugins/ga.js', mode: 'client' },
    /*
    { src: '~/plugins/localStorage.js', ssr: false }
    */
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  // https://go.nuxtjs.dev/axios
  // https://go.nuxtjs.dev/pwa

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    'nuxt-material-design-icons'
  ],
  build: {
    /*
     ** You can extend webpack config here
     */
    publicPath: process.env.NODE_ENV === 'production' ? '/assets/' : '',
    extend(config, ctx) { },
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    }
  },
  pwa: {
    manifest: {
      name: 'HMS',
      lang: 'en'
    },
    meta: {
      /* meta options */
    },
    icon: {
      iconSrc: '/static/icon.png'
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},


  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  server: {
    port: 8000, // default: 3000
    host: "0.0.0.0" // default: localhost
  }
}
