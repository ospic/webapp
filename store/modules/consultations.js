import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  ipdservices: [],
  opdservices: [],
  services: []
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

  //GET ALLSERVICES
  [mutation.SERVICES](state) {
    state.showLoader = true;
  },
  [mutation.SERVICES_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.SERVICES_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.SERVICES_SUCCESS](state, payload) {
    state.showLoader = false;
    state.services = payload;
  },
}

const actions = {

  async retrieve_active_opd_services({ commit }) {
    commit(mutation.GET_OPDSERVICES);
    await this.$api.$get('consultations/?active=activeopd')
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
    await this.$api.$get('consultations/?active=activeipd')
      .then(response => {
        commit(mutation.GET_IPDSERVICES_SUCCESS, response);
      }).catch(error => {
        commit(mutation.GET_IPDSERVICES_ERROR);
        console.log(error);

      });

  },
  async fetch_all_services({ commit }) {
    commit(mutation.SERVICES);
    return await this.$api
      .$get(`consultations/`)
      .then(response => {
        if (response !== null) {
          commit(mutation.SERVICES_SUCCESS, response);
        }
      })
      .catch(error => {
        commit(mutation.SERVICES_ERROR);

      });
  },
}
const getters = {
  opds: function (state) {
    return state.opdservices;
  },
  ipds: function (state) {
    return state.ipdservices;
  },
  services: function (state) {
    return state.services;
  },
  assigned: function (state) {
    return state.services.filter(service => (service.isActive && service.staffName != null));
  },
  unassigned: function (state) {
    return state.services.filter(service => (service.isActive && service.staffName == null));
  },


}

export default {
  state,
  mutations,
  actions,
  getters
}
