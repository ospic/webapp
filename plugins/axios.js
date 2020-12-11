import Vue from 'vue';
import VueToasted from 'vue-toasted';
import swal from "sweetalert";
Vue.use(VueToasted, {
  iconPack: 'mdi' // set your iconPack, defaults to material. material|fontawesome|custom-class
})
function check_cookie_name(name) {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    // console.log(match[2]);
    return match[2];
  }
  else {
    console.log('--something went wrong---');
  }
}
export default function ({ $axios, redirect, $toast }, inject) {
  // Create a custom axios instance
  $axios.setHeader('Content-Type', 'application/json');
  $axios.setToken(window.localStorage.getItem("ospic.token"), window.localStorage.getItem("ospic.tokentype"));


  const api = $axios.create({
    headers: {
      common: {
        Accept: "application/json, text/plain, */*",
      },
    },
  });

  api.onRequest(config => {
    api.setHeader("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    // api.setHeader("Access-Control-Allow-Origin", "*");

  });

  api.onError(error => {
    const code = parseInt(error.response.status);
    if (code === 400) {
      redirect("/");
    }
    if (code === 500) {
      redirect('/')
    }
  });
  api.onResponse(response => {
    Vue.toasted.show('Success !!', { icon: 'check-circle' });
  });
  api.onResponseError((error) => {
    Vue.toasted.show('Failed. Try to reload page or re-login & reload ', {
      icon: 'close-circle', action: {
        text: 'Reload',
        onClick: (e, toastObject) => {
          window.location.reload();
          toastObject.goAway(600);
        }
      }
    });

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

