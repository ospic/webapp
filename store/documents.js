import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  image: {},
  images: []
});

const mutations = {

  [mutation.UPDATE_PATIENT_PROFILE_PICTURE](state) {
    state.showLoader = true;
  },
  [mutation.UPDATE_PATIENT_PROFILE_PICTURE_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_PATIENT_PROFILE_PICTURE_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_PATIENT_PROFILE_PICTURE_SUCCESS](state, payload) {
    state.showLoader = false;
    this.image = payload;
  },

}
const actions = {
 
  async update_patient_profile_image({ commit }, id, payload) {
    commit(mutation.UPDATE_PATIENT_PROFILE_PICTURE);
    await this.$api.$patch(`patients/${id}/images/`, payload, con)
      .then(response => {
        commit(mutation.UPDATE_PATIENT_PROFILE_PICTURE_SUCCESS, response);

      }).catch(error => {
        commit(mutation.UPDATE_PATIENT_PROFILE_PICTURE_ERROR);
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