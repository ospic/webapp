const state = () => ({
  showLoader: Boolean,
  blood: {},
  bloods: [],

});

const mutations = {

  /**Populate blood bank  */
  ["FETCH_BLOODS"](state) {
    state.showLoader = true;
  },
  ["FETCH_BLOODS_FAILED"](state) {
    state.showLoader = false;
  },
  ["FETCH_BLOODS_ERROR"](state) {
    state.showLoader = false;
  },
  ["FETCH_BLOODS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.bloods = payload;
  },

  /**Update blood bank  */
  ["UPDATE_BLOOD"](state) {
    state.showLoader = true;
  },
  ["UPDATE_BLOOD_FAILED"](state) {
    state.showLoader = false;
  },
  ["UPDATE_BLOOD_ERROR"](state) {
    state.showLoader = false;
  },
  ["UPDATE_BLOOD_SUCCESS"](state, payload) {
    state.showLoader = false;

  },

}
const actions = {
  async fetchbloodsbank({ commit }) {
    commit("FETCH_BLOODS");
    await this.$api.$get(`bloods/`)
      .then(response => {
        commit("FETCH_BLOODS_SUCCESS", response);

      }).catch(error => {
        commit("FETCH_BLOODS_ERROR");
        console.log(error);

      });
  },
  async updatebloodgroup({ commit }, payload) {
    commit("UPDATE_BLOOD");
    await this.$api.$patch(`bloods/`, payload).then(response => {
      commit("UPDATE_BLOOD_SUCCESS", response);
    }).catch(error => {
      commit("UPDATE_BLOOD_ERROR");
      console.log(error);
    });
  },
}

const getters = {
  groups: function (state) {
    return state.bloods;
  }

}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}