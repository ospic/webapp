const state = () => ({
  showLoader: Boolean,
  ipdservices: [],
  opdservices: [],
  consultations: []
});

const mutations = {
  //GET ACTIVE OPD SERVICES AVAILABLE
  ["GET_OPDSERVICES"](state) {
    state.showLoader = true;
  },
  ["GET_OPDSERVICES_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_OPDSERVICES_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_OPDSERVICES_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.opdservices = payload;
  },

  //GET ACTIVE IPD SERVICES
  ["GET_IPDSERVICES"](state) {
    state.showLoader = true;
  },
  ["GET_IPDSERVICES_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_IPDSERVICES_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_IPDSERVICES_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.ipdservices = payload;
  },

  //GET ALLSERVICES
  ["SERVICES"](state) {
    state.showLoader = true;
  },
  ["SERVICES_FAILED"](state) {
    state.showLoader = false;
  },
  ["SERVICES_ERROR"](state) {
    state.showLoader = false;
  },
  ["SERVICES_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.consultations = payload;
  },
}

const actions = {

  async retrieve_active_opd_services({ commit }) {
    commit("GET_OPDSERVICES");
    await this.$api.$get('consultations/?active=activeopd')
      .then(response => {
        commit("GET_OPDSERVICES_SUCCESS", response);
      }).catch(error => {
        commit("GET_OPDSERVICES_ERROR");
        console.log(error);

      });

  },

  async retrieve_active_ipd_services({ commit }) {
    commit("GET_IPDSERVICES");
    await this.$api.$get('consultations/?active=activeipd')
      .then(response => {
        commit("GET_IPDSERVICES_SUCCESS", response);
      }).catch(error => {
        commit("GET_IPDSERVICES_ERROR");
        console.log(error);

      });

  },
  async fetch_all_services({ commit }) {
    commit("SERVICES");
    return await this.$api
      .$get(`consultations/`)
      .then(response => {
        if (response !== null) {
          commit("SERVICES_SUCCESS", response);
        }
      })
      .catch(error => {
        commit("SERVICES_ERROR");

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
  consultations: function (state) {
    return state.consultations;
  },
  assigned: function (state) {
    return state.consultations.filter(service => (service.isActive && service.staffName != null));
  },
  unassigned: function (state) {
    return state.consultations.filter(service => (service.isActive && service.staffName == null));
  },


}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}
