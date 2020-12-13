import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      paths: [
        "authentication", "inventory", "profile", "diagnoses",
        "templates", "users", "patients", "documents"]
    })(store);
  });
};
