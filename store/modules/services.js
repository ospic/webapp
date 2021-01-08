import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  ipdservices: [],
  opdservices: []
});

const mutations = {
  //GET ACTIVE OPD SERVICES AVAILABLE
  [mutation.GET_OPDSERVICES](state) {
    state.showLoader = true;
  },
  [mutation.GET_OPDSERVICES_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.GET_OPDSERVICES_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.GET_OPDSERVICES_SUCCESS](state, payload) {
    state.showLoader = false;
    state.opdservices = payload;
  },

  //GET ACTIVE IPD SERVICES
  [mutation.GET_IPDSERVICES](state) {
    state.showLoader = true;
  },
  [mutation.GET_IPDSERVICES_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.GET_IPDSERVICES_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.GET_IPDSERVICES_SUCCESS](state, payload) {
    state.showLoader = false;
    state.ipdservices = payload;
  },
}

const actions = {

  async retrieve_active_opd_services({ commit }) {
    commit(mutation.GET_OPDSERVICES);
    await this.$api.$get('services/?active=activeopd')
      .then(response => {
        console.log(response)
        commit(mutation.GET_OPDSERVICES_SUCCESS, response);
      }).catch(error => {
        commit(mutation.GET_OPDSERVICES_ERROR);
        console.log(error);

      });

  },

  async retrieve_active_ipd_services({ commit }) {
    commit(mutation.GET_IPDSERVICES);
    await this.$api.$get('services/?active=activeipd')
      .then(response => {
        commit(mutation.GET_IPDSERVICES_SUCCESS, response);
      }).catch(error => {
        commit(mutation.GET_IPDSERVICES_ERROR);
        console.log(error);

      });

  }
}
const getters = {
  opds: function (state) {
    return state.opdservices;
  },
  ipds: function (state) {
    return state.ipdservices;
  },

}

export default {
  state,
  mutations,
  actions,
  getters
}
