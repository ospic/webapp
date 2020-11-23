export default ({ app, route, from, store, redirect }) => {
  app.router.beforeEach((to, from, next) => {
    if (localStorage.getItem("ospic.token") === null && to.path !== "/signin" && to.path !== "/") {

      next("/");
    } else {
      console.log("Entering the route:  " + to.path);
      next();
    }
  });
  app.router.afterEach((to, from) => {
    // eslint-disable-next-line no-console
    console.log("After leaving the route");
  });
}