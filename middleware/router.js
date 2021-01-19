

export default ({ app, route, from, store, redirect }) => {


  app.router.beforeEach((to, from, next) => {
    const exipire = store.getters.exipireddate;
    const today = new Date();
    const status = today < exipire;
    //console.log(status)
    if (!status && to.path !== "/signin") {
      store.dispatch("logout");
    } else {
      next();
    }
  });
  app.router.afterEach((to, from) => {
  });
}