import colors from 'vuetify/es5/util/colors';
const open = require('opn');

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  //target: 'static',
  ssr: false,
  router: {
    mode: 'hash',
    base: process.env.NODE_ENV === "production" ? "/webapp/" : "/",
    routerNameSplitter: "/",
    middleware: ['router']
  },
  loadingIndicator: {
    name: 'cube-grid',
    color: '#00897B',
    background: '#d7f4fa'
  },
  /** 
  hooks: {
    listen(server, { host, port }) {
      open(`http://${host}:${port}`)
    }
  },
  **/
  env: {
    baseUrl: 'https://ospicapi.herokuapp.com/api/',
    localUrl: 'http://localhost:8080/api/'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: 'Ospic',
    title: 'Ospic-HMS',
    meta: [
      { charset: 'utf-8' },
      /**Chrome, Firefox OS and Opera **/
      { name: "theme-color", content: "#00897B" },
      /**Windows phone **/
      { name: "msapplication-navbutton-color", content: "#00897B" },
      /**iOS Safari**/
      { name: "apple-mobile-web-app-status-bar-style", content: "#00897B" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { hid: 'description', name: 'description', content: 'Open source Hospital Management System' },
      { hid: 'og:image', property: 'og:image', content: "https://hmis.netlify.app/icon.png" || '' }

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/github-fork-ribbon-css/0.2.3/gh-fork-ribbon.min.css' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/fonts/montserrat.css',
    '@/assets/css/styles.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/i18n.js",
    '~/plugins/vuetify.js',
    '~/plugins/axios',
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
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  // https://go.nuxtjs.dev/axios
  // https://go.nuxtjs.dev/pwa

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-material-design-icons',
    ['cookie-universal-nuxt', { parseJSON: false }],
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
      name: 'Ospic Hospital Management System',
      short_name: 'Ospic Hms',
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
      ogHost: "http://ospic.github.io/webapp/",
      ogImage: "https://a.fsdn.com/con/app/proj/ospic/screenshots/Screenshot%20from%202020-10-23%2020-03-21.png/max/max/1",
      ogUrl: "",
      twitterCard: "Ospic",
      twitterSite: "elixml",


    },
    icon: {
      iconSrc: '/static/icon.png'
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
