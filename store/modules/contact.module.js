import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  contact: {},
  contacts: []
});

const mutations = {

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
    this.contact = payload;
  },

}
const actions = {

  async update_patient_add_contacts({ commit }, id, payload) {
    commit(mutation.UPDATE_PATIENT_ADD_CONTACT);
    await this.$api.$patch(`contacts/${id}/`, payload)
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
  state,
  mutations,
  actions,
  getters
}