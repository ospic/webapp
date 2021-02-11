import * as mutation from './mutation-types';
const state = () => ({
  registration: {},
  isLoading: Boolean,
  userdata: {}
});

const mutations = {
  [mutation.SIGNUP](state) {
    state.isLoading = true;
  },
  [mutation.SIGNUP_SUCCESS](state, payload) {
    state.isLoading = false;
    state.userdata = payload;
  },
  [mutation.SIGNUP_FAILED](state) {
    state.isLoading = false;
  },
  [mutation.SIGNUP_ERROR](state) {
    state.isLoading = false;
  }
};
const actions = {
  async signup({
    commit
  }, payload) {
    commit(mutation.SIGNUP);
    await this.$api.$post(`auth/signup/`, payload)
      .then(response => {
        if (response.message != null) {
          commit(mutation.SIGNUP_SUCCESS, response);
          this.$router.push('/signin');
        }


      }).catch(error => {
        commit(mutation.SIGNUP_FAILED);


      });
  }

};
const getters = {};
export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions,
};
