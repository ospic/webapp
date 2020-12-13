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
  [mutation.CREATE_NEW_USER](state) {
    state.showLoader = true;
  },
  [mutation.CREATE_NEW_USER_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_NEW_USER_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_NEW_USER_SUCCESS](state, payload) {
    state.showLoader = false;
    state.users.push(payload)
  },

}
const actions = {
  async retrieveAllusers({ commit }) {
    commit(mutation.FETCH_APPLICATION_USERS);
    await this.$api.$get(`auth/users/`)
      .then(response => {
        commit(mutation.FETCH_APPLICATION_USERS_SUCCESS, response);


      }).catch(error => {
        commit(mutation.FETCH_APPLICATION_USERS_FAILED);
        console.log(error);

      });

  }
  , async create_new_user({ commit }, payload) {
    commit(mutation.CREATE_NEW_USER);
    await this.$api.$post(`auth/signup/`, payload)
      .then(response => {
        console.log(response);
        if (response.statusCode === 200) {
          commit(mutation.CREATE_NEW_USER_SUCCESS, response);
        }

      }).catch(error => {
        commit(mutation.CREATE_NEW_USER_FAILED);
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