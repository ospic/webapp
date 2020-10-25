import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  user: {},
  users: []
});

const mutations = {

  [mutation.FETCH_APPLICATION_USERS](state) {
    state.showLoader = true;
  },
  [mutation.FETCH_APPLICATION_USERS_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_APPLICATION_USERS_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_APPLICATION_USERS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.users = payload;

  },

}
const actions = {
  async retrieveAllusers({ commit }) {
    commit(mutation.FETCH_APPLICATION_USERS);
    await this.$api.$get(`auth/users/`)
      .then(response => {
        commit(mutation.FETCH_APPLICATION_USERS_SUCCESS, response);
        console.log(response);

      }).catch(error => {
        commit(mutation.FETCH_APPLICATION_USERS_FAILED);
        console.log(error);

      });

  }
}
const getters = {
  users: function (state) {
    return state.users.reverse();
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}