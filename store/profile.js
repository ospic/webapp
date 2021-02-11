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

  [mutation.UPDATE_PASSWORD](state) {
    state.showLoader = true;
  },
  [mutation.UPDATE_PASSWORD_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_PASSWORD_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_PASSWORD_SUCCESS](state, payload) {
    state.showLoader = false;

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

  },
  async _update_user_password({ commit }, payload) {
    commit(mutation.UPDATE_PASSWORD);
    await this.$api.$post("auth/password", payload)
      .then(response => {
        commit(mutation.UPDATE_PASSWORD_SUCCESS, response);
        if (response.httpStatus === 'OK') {
          commit(mutation.SIGNOUT_SUCCESS)
        }

      }).catch(error => {
        commit(mutation.UPDATE_PASSWORD_ERROR);
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
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}