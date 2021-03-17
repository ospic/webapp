
const state = () => ({
  registration: {},
  isLoading: Boolean,
  userdata: {}
});

const mutations = {
  ["SIGNUP"](state) {
    state.isLoading = true;
  },
  ["SIGNUP_SUCCESS"](state, payload) {
    state.isLoading = false;
    state.userdata = payload;
  },
  ["SIGNUP_FAILED"](state) {
    state.isLoading = false;
  },
  ["SIGNUP_ERROR"](state) {
    state.isLoading = false;
  }
};
const actions = {
  async signup({ commit }, payload) {
    commit("SIGNUP");
    await this.$api.$post(`auth/signup/`, payload)
      .then(response => {
        if (response.message != null) {
          commit("SIGNUP_SUCCESS", response);
          this.$router.push('/signin');
        }
      }).catch(error => {
        commit("SIGNUP_FAILED");
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
