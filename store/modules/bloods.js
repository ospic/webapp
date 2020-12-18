import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  blood: {},
  bloods: [],

});

const mutations = {

  [mutation.FETCH_BLOODS](state) {
    state.showLoader = true;
  },
  [mutation.FETCH_BLOODS_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_BLOODS_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_BLOODS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.bloods = payload;
  },

  [mutation.UPDATE_BLOOD](state) {
    state.showLoader = true;
  },
  [mutation.UPDATE_BLOOD_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_BLOOD_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_BLOOD_SUCCESS](state, payload) {
    state.showLoader = false;

  },

}
const actions = {
  async fetchbloodsbank({ commit }) {
    commit(mutation.FETCH_BLOODS);
    await this.$api.$get(`bloods/`)
      .then(response => {
        commit(mutation.FETCH_BLOODS_SUCCESS, response);

      }).catch(error => {
        commit(mutation.FETCH_BLOODS_ERROR);
        console.log(error);

      });

  },
  async updatebloodgroup({ commit }, payload) {
    commit(mutation.UPDATE_BLOOD);
    await this.$api.$patch(`bloods/`, payload).then(response => {
      commit(mutation.UPDATE_BLOOD_SUCCESS, response);

    }).catch(error => {
      commit(mutation.UPDATE_BLOOD_ERROR);
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
  state,
  mutations,
  actions,
  getters
}