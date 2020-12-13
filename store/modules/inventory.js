import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  ward: {},
  bed: {},
  beds: [],
  wards: []
});

const mutations = {
  [mutation.RETRIEVE_WARDS](state) {
    state.showLoader = true;
  },
  [mutation.RETRIEVE_WARDS_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.RETRIEVE_WARDS_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.RETRIEVE_WARDS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.wards = payload;

  },

  [mutation.GET_BEDS](state) {
    state.showLoader = true;
  },
  [mutation.GET_BEDS_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.GET_BEDS_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.GET_BEDS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.beds = payload;

  },
}

const actions = {
  async retrieve_all_wards({ commit }) {
    commit(mutation.RETRIEVE_WARDS);
    await this.$api.$get(`wards/beds/`)
      .then(response => {
        commit(mutation.RETRIEVE_WARDS_SUCCESS, response);

      }).catch(error => {
        commit(mutation.RETRIEVE_WARDS_ERROR);
        console.log(error);

      });

  },
  async retrieve_all_ward_with_beds({ commit }) {
    commit(mutation.RETRIEVE_WARDS);
    await this.$api.$get(`wards/`)
      .then(response => {
        commit(mutation.GET_BEDS_SUCCESS, response);

      }).catch(error => {
        commit(mutation.GET_BEDS_ERROR);
        console.log(error);

      });

  },
}

const getters = {
  wards: function (state) {
    return state.wards
  },
  beds: function (state) {
    return state.beds;
  },
  getWard: (state) => (id) => {
    return state.beds.find(bed => bed.id === id)
  },

}
export default {
  state,
  mutations,
  actions,
  getters
}