import Vue from "vue";
import Vuex from "vuex";
import SignIn from "./modules/signin";
import SignUp from "./modules/signup.module";
import Registry from "./modules/patient.module";
import Template from './modules/template';
import DocumentsModules from "./modules/documents.module";
import ContactsModules from "./modules/contact.module";
import UsersManagementModule from "./modules/users.module";
import MedicineModule from "./modules/pharmacy.medicine";

Vue.use(Vuex);
const store = () => {
  return new Vuex.Store({
    state: {

    },
    modules: {
      SignIn, SignUp,
      Registry, Template,
      DocumentsModules, ContactsModules, UsersManagementModule, MedicineModule
    },
    /* plugins: [createPersistedState({
       storage: window.sessionStorage,
     })]
     */
  });
};

export default store;
