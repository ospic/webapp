import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      paths: [
        "authentication", "inventory", "profile", "diagnoses",
        "templates", "users", "patients", "documents", "statistics", "theme", "smsconfiguration", "statisitics",
        "consultations", "departments", "medicalservices", "laboratory", 'bills', 'radiology', 'reports', 'accounting',
        'servicetypes', 'pharmarcy', 'configuration', 'notifications',],
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })(store);
  });
};
