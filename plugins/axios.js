import swal from "sweetalert";
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
export default function ({ $axios, redirect }, inject) {
  // Create a custom axios instance
  $axios.setHeader('Content-Type', 'application/json');
  $axios.setToken(check_cookie_name("ospic.token"), check_cookie_name("ospic.tokentype"));


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
  api.onResponseError((error) => {
    swal({
      title: error.response.statusText + " !!",
      text: error.response.data.message + " \n In accessing " + error.config.url + "\n Status code :" + error.response.status,
      icon: "warning",
      customClass: 'swal-wide',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          window.location.reload();
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
  api.setBaseURL(
    process.env.NODE_ENV === "production"
      ? process.env.baseUrl
      : process.env.localUrl
  );
  // Inject to context as $api
  inject("api", api);
}

