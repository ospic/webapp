const state = () => ({
  isDark: false
});

const mutations = {
  ["LIGHT_THEME"](state) {
    state.isDark = false;
  },

  ["DARK_THEME"](state) {
    state.isDark = true;
  },

}
const actions = {
  async change_to_dark({ commit }) {
    commit("DARK_THEME");

  },
  async change_to_light({ commit }) {
    commit("LIGHT_THEME");
  }
}
const getters = {
  isDark: function (state) {
    return state.isDark;
  }

}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}