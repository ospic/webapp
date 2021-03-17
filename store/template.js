const state = () => ({
  showLoader: Boolean,
  physician: {},
  physicians: [],
  template: {},
  medicine_template: []
});

const mutations = {

  ["GET_PATIENT_CREATION_TEMPLATE"](state) {
    state.showLoader = true;
  },
  ["GET_PATIENT_CREATION_TEMPLATE_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_PATIENT_CREATION_TEMPLATE_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_PATIENT_CREATION_TEMPLATE_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.physicians = payload.physicianOptions;
  },
  ["MEDICINE_TEMPLATE"](state) {
    state.showLoader = true;
  },
  ["MEDICINE_TEMPLATE_FAILED"](state) {
    state.showLoader = false;
  },
  ["MEDICINE_TEMPLATE_ERROR"](state) {
    state.showLoader = false;
  },
  ["MEDICINE_TEMPLATE_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.medicine_template = payload;
  },

}
const actions = {
  async retrievephysicians({ commit }) {
    commit("GET_PATIENT_CREATION_TEMPLATE");
    await this.$api.$get(`patients/?command=template`)
      .then(response => {
        commit("GET_PATIENT_CREATION_TEMPLATE_SUCCESS", response);

      }).catch(error => {
        commit("GET_PATIENT_CREATION_TEMPLATE_ERROR");
        console.log(error);

      });

  },
  async retrieve_medicine_template({ commit }) {
    commit("MEDICINE_TEMPLATE");
    await this.$api.$get(`pharmacy/medicines/template/`)
      .then(response => {
        commit("MEDICINE_TEMPLATE_SUCCESS", response);
      }).catch(error => {
        commit("MEDICINE_TEMPLATE_FAILED");
        console.log(error);

      });

  }
}
const getters = {
  physicians: function (state) {
    return state.physicians;
  },
  medicine_templates: function (state) {
    return state.medicine_template;
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}