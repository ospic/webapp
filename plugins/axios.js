import swal from "sweetalert";
export default function ({ $axios, redirect }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    headers: {
      common: {
        Accept: "text/plain, */*",
      },
    },
  });
  api.onRequest((config) => {
    if (localStorage.getItem("qAccessToken") != null) {
      api.setHeader("x-access-token", localStorage.getItem("qAccessToken"));
      api.setHeader(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      api.setHeader("user-id", localStorage.getItem("uuId"));
    }
  });

  api.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      redirect("/400");
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
