import Vue from "vue";
import Vuex from "vuex";
import authentication from "./modules/authentication";
import SignUp from "./modules/signup.module";
import patients from "./modules/patients";
import templates from './modules/template';
import documents from "./modules/documents";
import contacts from "./modules/contacts";
import users from "./modules/users";
import pharmacy from "./modules/pharmacy.medicine";
import diagnoses from "./modules/diagnosis";
import inventory from "./modules/inventory"
import profile from "./modules/profile";
import bloodbank from "./modules/bloods";



Vue.use(Vuex);
const store = () => {
  return new Vuex.Store({
    modules: {
      authentication, SignUp, patients, documents, contacts, users, pharmacy,
      templates, diagnoses, inventory, profile, bloodbank
    },

  });
};

export default store;
