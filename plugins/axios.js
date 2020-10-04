import swal from "sweetalert";
export default function ({ $axios, redirect }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: "application/json, text/plain, */*",
      },
    },
  });

  api.onRequest(config => {
    api.setHeader("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");

  });

  api.onError(error => {
    const code = parseInt(error.response.status);
    if (code === 400) {
      redirect("/400");
    }
    if (code === 500) {
      redirect('/sorry')
    }
  });
  api.onResponseError((error) => {
    swal({
      title: error.response.statusText + " !!",
      text:
        error.response.data.message +
        " \n In accessing " +
        error.config.url +
        "\n Status code :" +
        error.response.status,
      icon: "warning",
      dangerMode: true,
    });
  });
  api.setHeader('Content-Type', 'application/json', [post]);
  api.setToken(localStorage.getItem("ospic.token"), localStorage.getItem("ospic.tokentype"));


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
