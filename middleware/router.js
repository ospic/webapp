export default ({ app, route, from, store, redirect }) => {
  app.router.beforeEach((to, from, next) => {
    const exipire = window.localStorage.getItem('date');
    const status = ((typeof exipire == 'undefined' ? new Date().getTime() - 2 : exipire) - new Date().getTime()) > 0;
    if (!status && to.path !== "/signin") {
      store.dispatch("logout");
    } else {
      next();
    }
  });
  app.router.afterEach((to, from) => {
  });
}