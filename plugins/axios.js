import Vue from 'vue';
import VueToasted from 'vue-toasted';
Vue.use(VueToasted, {
  iconPack: 'mdi' // set your iconPack, defaults to material. material|fontawesome|custom-class
})


export default function ({ $axios, redirect, store }, inject) {
  $axios.setHeader('Content-Type', 'application/json');
  //$axios.setToken(store.getters.accessToken, 'Bearer');


  const api = $axios.create({
    headers: {
      common: {
        Accept: "application/json, text/plain, */*",
        'Content-Type': 'application/json'
      },
    },
  });

  api.onRequest(config => {
    var token = store.getters.accessToken;
    api.setHeader("Authorization", "Bearer  " + token);
    api.setHeader("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    api.setHeader("Access-Control-Allow-Origin", "*");

  });

  api.onError(error => {
    const message = error.response.data.defaultUserMessage
    const code = parseInt(error.response && error.response.status)

  })
  api.onResponse(response => {
    // Vue.toasted.show('Success ', { icon: 'check-circle', type: 'success' });
  });
  api.onResponseError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 404) {
      const message = error.response.data.defaultUserMessage
      Vue.toasted.error(`Failed with message: ${message}`, {
        icon: 'close-circle', position: 'top-center', keepOnHover: true, type: 'error',
        theme: 'outline', duration: 5000
      });
    }
    if (code === 401) {
      const message = error.response.data.defaultUserMessage;
      Vue.toasted.error(`${message}`, {
        icon: 'close-circle', position: 'top-center', keepOnHover: true, type: 'info',
        theme: 'outline', duration: 5000
      });
    }
  });

  // Set baseURL to something different
  // eslint-disable-next-line no-console
  console.log(
    process.env.NODE_ENV === "production"
      ? process.env.baseUrl
      : process.env.localUrl
  );
  /** For UI developers with no local API **/
  /* api.setBaseURL(  process.env.baseUrl ); */


  /**For production */
  api.setBaseURL(process.env.NODE_ENV === "production" ? process.env.baseUrl : process.env.localUrl);
  // Inject to context as $api
  inject("api", api);
}

