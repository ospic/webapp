import Vue from "vue";
import Vuex from "vuex";
import SignIn from "./modules/signin";
import SignUp from "./modules/signup.module";
import Registry from "./modules/registry";
import Template from './modules/template'

Vue.use(Vuex);
const store = () => {
  return new Vuex.Store({
    state: {

    },
    modules: {
      SignIn, SignUp,
      Registry, Template
    },
    /* plugins: [createPersistedState({
       storage: window.sessionStorage,
     })]
     */
  });
};

export default store;
