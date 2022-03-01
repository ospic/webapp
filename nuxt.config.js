const open = require('opn');
const routerBase = process.env.DEPLOY_ENV === 'prod' ? '/webapp/' : '/';
import metajs from './plugins/meta';
const meta = metajs();
export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  //target: 'static',
  telemetry: true,
  ssr: false,
  router: {
    mode: 'hash',
    base: routerBase,
    routerNameSplitter: "/",
    middleware: ['router']
  },
  loadingIndicator: {
    name: 'pulse',
    color: ' #00A756',
    background: '#FAFAFA'
  },
  /**
  hooks: {
    listen(server, { host, port }) {
      open(`http://${host}:${port}`)
    }
  },
  **/
  env: {
    baseUrl: 'https://api.ospicx.com/api/',
    localUrl: 'http://localhost:8080/api/'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: 'Ospic',
    title: 'Ospic-HMS',
    meta: [
      ...meta,
      { charset: 'utf-8' },
      /**Chrome, Firefox OS and Opera **/
      { name: "theme-color", content: "#00A756" },
      /**Windows phone **/
      { name: "msapplication-navbutton-color", content: "#00A756" },
      /**iOS Safari**/
      { name: "apple-mobile-web-app-status-bar-style", content: "#00A756" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { hid: 'description', name: 'description', content: 'Open source Hospital Management System' },
      { name: "google-site-verification", content: "cx99OlrotJDjh6FbXnZFs4lRdaqQ7ksY-SadPjv2CLQ" },
      //Twitter meta-data
      { hid: "twitter:site", name: "twitter:site", content: "ospicapp" },
      { hid: "twitter:card", name: "twitter:card", content: "summary_large_image" },
      { hid: "twitter:image:alt", name: "twitter:image:alt", content: "Ospic application" },

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
    '~/plugins/vuetify.js',
    '~/plugins/axios',
    '~/plugins/authaxios',
    '~/plugins/pwa.client.js',
    '~/plugins/vue-apexcharts.js',
    '~/mixins/mixins.js',
    '~/plugins/vuepersistence.js',
    { src: '~plugins/ga.js', mode: 'client' },
    /*
    { src: '~/plugins/localStorage.js', ssr: false }
    */
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/toast',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  // https://go.nuxtjs.dev/axios
  // https://go.nuxtjs.dev/pwa

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/toast',
    '@nuxtjs/sitemap',
    'nuxt-material-design-icons',
    ['cookie-universal-nuxt', { parseJSON: false }],
  ],

  toast: {
    position: 'bottom-right',
    duration: 4000,
    theme: 'bubble',
    singleton: true,
    iconPack: 'mdi'
  },
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
    },
    terser: {
      extractComments: false // default was LICENSES
    }
  },
  pwa: {
    manifest: {
      name: 'Ospic Hospital Management System',
      short_name: 'Ospic Hms',
      color_theme: "#2F4454",
      background_color: "#2F4454",
      lang: 'en',
      useWebmanifestExtension: false
    },
    meta: {
      /* meta options */
      name: "Ospic Hospital Management System",
      author: "Ospic",
      description: "Open source Hospital Management System",
      lang: "en",
      ogType: "website",
      ogSiteName: "Ospic Hms",
      ogTitle: "Ospic Hospital Management system",
      ogDescription: "Open source Hospital Management System",
      ogHost: "https://app.ospicx.com/",
      ogImage: "https://docs.ospicx.com/preview.png",
      ogUrl: "",
      twitterCard: "Ospic",
      twitterSite: "ospicapp",


    },
    icon: {
      iconSrc: '/static/icon.png'
    }
  },

  /**Sitemap file */
  sitemap: {
    hostname: 'https://app.ospicx.com',
    gzip: false,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    filter({ routes }) {
      return routes.map(route => {
        route.url = `#/${route.url}`
        return route
      })
    }
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},


  // Build Configuration (https://go.nuxtjs.dev/config-build)

  server: {
    port: 8000, // default: 3000
    host: "0.0.0.0" // default: localhost
  }
}
