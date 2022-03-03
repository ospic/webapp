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
      },
    },
  });

  api.onRequest(config => {
    api.setHeader("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    api.setHeader("Access-Control-Allow-Origin", "*");
    api.setHeader("X-Tenant-Identifier", window.location.hostname.split('.')[0]);

  });

  api.onError(error => {
    console.log(error)
    return Promise.resolve(false);
  })
  api.onResponse(response => {
    // Vue.toasted.show('Success ', { icon: 'check-circle', type: 'success' });
  });
  api.onResponseError((error) => {
    Vue.toasted.show('Failed !!!', { icon: 'close-circle', type: 'error' });
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
  inject("authapi", api);
}

