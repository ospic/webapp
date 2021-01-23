import Vue from "vue";
import Vuex from "vuex";
import authentication from "./modules/authentication";
import SignUp from "./modules/signup";
import patients from "./modules/patients";
import templates from './modules/template';
import documents from "./modules/documents";
import contacts from "./modules/contacts";
import users from "./modules/users";
import pharmacy from "./modules/pharmacy";
import diagnoses from "./modules/diagnosis";
import inventory from "./modules/inventory"
import profile from "./modules/profile";
import bloodbank from "./modules/bloodbank";
import theme from "./modules/theme";
import smsconfiguration from "./modules/smsconfigurations";
import statisitics from "./modules/statistics";
import services from "./modules/services";
import departments from "./modules/departments"


Vue.use(Vuex);
Vue.config.devtools = true
const store = () => {
  return new Vuex.Store({
    modules: {
      authentication, SignUp, patients, documents, contacts, users, pharmacy,
      templates, diagnoses, inventory, profile, bloodbank, theme, smsconfiguration, statisitics,
      departments, services
    },

  });
};

export default store;
