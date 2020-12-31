import * as mutation from './mutation-types';
const state = () => ({
  isDark: false
});

const mutations = {
  [mutation.LIGHT_THEME](state) {
    state.isDark = false;
  },

  [mutation.DARK_THEME](state) {
    state.isDark = true;
  },

}
const actions = {
  async change_to_dark({ commit }) {
    commit(mutation.DARK_THEME);

  },
  async change_to_light({ commit }) {
    commit(mutation.LIGHT_THEME);
  }
}
const getters = {
  isDark: function (state) {
    return state.isDark;
  }

}

export default {
  state,
  mutations,
  actions,
  getters
}