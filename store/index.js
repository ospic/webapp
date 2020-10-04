import Vue from "vue";
import Vuex from "vuex";
import SignIn from "./modules/signin";
import SignUp from "./modules/signup.module";

Vue.use(Vuex);
const store = () => {
  return new Vuex.Store({
    state: {

    },
    modules: {
      SignIn,
      SignUp
    },
   /* plugins: [createPersistedState({
      storage: window.sessionStorage,
    })]
    */
  });
};

export default store;
