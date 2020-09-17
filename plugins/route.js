export default function ({ app, route, from, store, redirect }) {
  app.router.beforeEach((to, from, next) => {
    if (
      localStorage.getItem("qAccessToken") === null &&
      to.path !== "/signup" &&
      to.path !== "/"
    ) {
      // eslint-disable-next-line no-console
      console.log("Entering the route:  " + to.path);

      next("/");
    } else {
      // eslint-disable-next-line no-console
      console.log("Entering the route:  " + to.path);
      next();
    }
  });
  app.router.afterEach((to, from) => {
    // eslint-disable-next-line no-console
    console.log("After leaving the route");
  });
}
