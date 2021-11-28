const state = () => ({
  showLoader: Boolean,
  medicalservices: [],
  medicalservice: {}
});

const mutations = {
  //CREATE MEDICAL SERVICE
  ["CREATE_MEDICAL_SERVICE"](state) {
    state.showLoader = true;
  },
  ["CREATE_MEDICAL_SERVICE_FAILED"](state) {
    state.showLoader = false;
  },
  ["CREATE_MEDICAL_SERVICE_ERROR"](state) {
    state.showLoader = false;
  },
  ["CREATE_MEDICAL_SERVICE_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.medicalservice = payload;
  },

  /** Update medical service */
  ["UPDATE_MEDICAL_SERVICE"](state) {
    state.showLoader = true;
  },
  ["UPDATE_MEDICAL_SERVICE_FAILED"](state) {
    state.showLoader = false;
  },
  ["UPDATE_MEDICAL_SERVICE_ERROR"](state) {
    state.showLoader = false;
  },
  ["UPDATE_MEDICAL_SERVICE_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.medicalservice = payload;
  },

  //GET MEDICAL SERVICES
  ["GET_MEDICAL_SERVICES"](state) {
    state.showLoader = true;
  },
  ["GET_MEDICAL_SERVICES_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_MEDICAL_SERVICES_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_MEDICAL_SERVICES_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.medicalservices = payload;
  },


  /** Enable and disable medical service */
  ["ENABLEDISABLE_MEDICAL_SERVICE"](state) {
    state.showLoader = true;
  },
  ["ENABLEDISABLE_MEDICAL_SERVICE_FAILED"](state) {
    state.showLoader = false;
  },
  ["ENABLEDISABLE_MEDICAL_SERVICE_ERROR"](state) {
    state.showLoader = false;
  },
  ["ENABLEDISABLE_MEDICAL_SERVICE_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.medicalservice = payload;
  },

  /** Delete medical service */
  ["DELETE_MEDICAL_SERVICE"](state) {
    state.showLoader = true;
  },
  ["DELETE_MEDICAL_SERVICE_FAILED"](state) {
    state.showLoader = false;
  },
  ["DELETE_MEDICAL_SERVICE_ERROR"](state) {
    state.showLoader = false;
  },
  ["DELETE_MEDICAL_SERVICE_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.medicalservice = payload;
  },

}

const actions = {

  async create_new_medical_service({ commit }, payload) {
    commit("CREATE_MEDICAL_SERVICE");
    await this.$api.$post('services/', payload)
      .then(response => {
        commit("CREATE_MEDICAL_SERVICE_SUCCESS", response);
      }).catch(error => {
        commit("CREATE_MEDICAL_SERVICE_ERROR");
        console.log(error);

      });

  },
  async update_medical_service({ commit }, payload) {
    commit("UPDATE_MEDICAL_SERVICE");
    await this.$api.$put(`services/${payload.id}/`, payload)
      .then(response => {
        commit("UPDATE_MEDICAL_SERVICE_SUCCESS", response);
      }).catch(error => {
        commit("UPDATE_MEDICAL_SERVICE_ERROR");
        console.log(error);

      });

  },

  async get_medical_services({ commit }) {
    commit("GET_MEDICAL_SERVICES");
    await this.$api.$get('services/')
      .then(response => {
        commit("GET_MEDICAL_SERVICES_SUCCESS", response);
      }).catch(error => {
        commit("GET_MEDICAL_SERVICES_ERROR");
        console.log(error);

      });

  },
  async get_medical_services_by_type({ commit }, payload) {
    commit("GET_MEDICAL_SERVICES");
    await this.$api.$get(`services/type/${payload}`)
      .then(response => {
        commit("GET_MEDICAL_SERVICES_SUCCESS", response);
      }).catch(error => {
        commit("GET_MEDICAL_SERVICES_ERROR");
        console.log(error);

      });

  },

  async enable_disable_medical_service({ commit }, payload) {
    commit("ENABLEDISABLE_MEDICAL_SERVICE");
    await this.$api.$put(`services/${payload.action}/${payload.id}`)
      .then(response => {
        commit("ENABLEDISABLE_MEDICAL_SERVICE_SUCCESS", response);
      }).catch(error => {
        commit("ENABLEDISABLE_MEDICAL_SERVICE_ERROR");
        console.log(error);

      });

  },

  async delete_medical_service({ commit }, payload) {
    commit("DELETE_MEDICAL_SERVICE");
    await this.$api.$delete(`services/${payload}`)
      .then(response => {
        commit("DELETE_MEDICAL_SERVICE_SUCCESS", response);
      }).catch(error => {
        commit("DELETE_MEDICAL_SERVICE_ERROR");
        console.log(error);

      });

  },

}
const getters = {
  medicalservices: function (state) {
    return state.medicalservices;
  },



}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}
