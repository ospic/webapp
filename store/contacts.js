import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  contact: {},
  contacts: []
});

const mutations = {

  ["CREATE_CONTACT"](state) {
    state.showLoader = true;
  },
  ["CREATE_CONTACT_FAILED"](state) {
    state.showLoader = false;
  },
  ["CREATE_CONTACT_ERROR"](state) {
    state.showLoader = false;
  },
  ["CREATE_CONTACT_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.contact = payload;
  },


  [mutation.UPDATE_PATIENT_ADD_CONTACT](state) {
    state.showLoader = true;
  },
  [mutation.UPDATE_PATIENT_ADD_CONTACT_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_PATIENT_ADD_CONTACT_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_PATIENT_ADD_CONTACT_SUCCESS](state, payload) {
    state.showLoader = false;
  },
}
const actions = {

  async postpatientcontacts({ commit }, payload) {
    commit("CREATE_CONTACT");
    await this.$api.$post(`contacts/${payload.id}/`, payload.contact)
      .then(response => {
        console.log(response);
        commit("CREATE_CONTACT_SUCCESS", response);

      }).catch(error => {
        commit("CREATE_CONTACT_ERROR");
        console.log(error);

      });

  },
  async updatepatientcontacts({ commit }, payload) {
    commit(mutation.UPDATE_PATIENT_ADD_CONTACT);
    await this.$api.$patch(`contacts/${payload.id}/`, payload.contact)
      .then(response => {
        console.log(response);
        commit(mutation.UPDATE_PATIENT_ADD_CONTACT_SUCCESS, response);

      }).catch(error => {
        commit(mutation.UPDATE_PATIENT_ADD_CONTACT_ERROR);
        console.log(error);

      });

  }

}
const getters = {

}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}