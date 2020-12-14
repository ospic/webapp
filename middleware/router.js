export default ({ app, route, from, store, redirect }) => {
  app.router.beforeEach((to, from, next) => {
    if (window.localStorage.getItem("ospic.token") === null && to.path !== "/signin") {
      next("/signin");
    } else {
      next();
    }
  });
  app.router.afterEach((to, from) => {
  });
}