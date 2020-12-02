import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  profile: {}
});

const mutations = {

  [mutation.GET_PROFILE](state) {
    state.showLoader = true;
  },
  [mutation.GET_PROFILE_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.GET_PROFILE_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.GET_PROFILE_SUCCESS](state, payload) {
    state.showLoader = false;
    state.profile = payload;

  },

}
const actions = {
  async retrieve_profile({ commit }) {
    commit(mutation.GET_PROFILE);
    await this.$api.$get("auth/users/me")
      .then(response => {
        commit(mutation.GET_PROFILE_SUCCESS, response);

      }).catch(error => {
        commit(mutation.GET_PROFILE_ERROR);
        console.log(error);

      });

  }
}
const getters = {
  profile: function (state) {
    return state.profile;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}