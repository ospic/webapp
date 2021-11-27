const state = () => ({
  showLoader: Boolean,
  medicalservicestype: {},
  medicalservicestypes: [],
});

const mutations = {
  //CREATE MEDICAL SERVICE
  ["CREATE_MEDICAL_SERVICE_TYPES"](state) {
    state.showLoader = true;
  },
  ["CREATE_MEDICAL_SERVICE_TYPES_FAILED"](state) {
    state.showLoader = false;
  },
  ["CREATE_MEDICAL_SERVICE_TYPES_ERROR"](state) {
    state.showLoader = false;
  },
  ["CREATE_MEDICAL_SERVICE_TYPES_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.medicalservicestype = payload;
  },

  /** Update medical service */
  ["UPDATE_MEDICAL_SERVICE_TYPES"](state) {
    state.showLoader = true;
  },
  ["UPDATE_MEDICAL_SERVICE_TYPES_FAILED"](state) {
    state.showLoader = false;
  },
  ["UPDATE_MEDICAL_SERVICE_TYPES_ERROR"](state) {
    state.showLoader = false;
  },
  ["UPDATE_MEDICAL_SERVICE_TYPES_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.medicalservicestype = payload;
  },

  //GET MEDICAL SERVICES
  ["GET_MEDICAL_SERVICE_TYPES"](state) {
    state.showLoader = true;
  },
  ["GET_MEDICAL_SERVICE_TYPES_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_MEDICAL_SERVICE_TYPES_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_MEDICAL_SERVICE_TYPES_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.medicalservicestypes = payload;
  },
  //GET MEDICAL SERVICES
  ["DELETE_MEDICAL_SERVICE_TYPE"](state) {
    state.showLoader = true;
  },
  ["DELETE_MEDICAL_SERVICE_TYPE_FAILED"](state) {
    state.showLoader = false;
  },
  ["DELETE_MEDICAL_SERVICE_TYPE_ERROR"](state) {
    state.showLoader = false;
  },
  ["DELETE_MEDICAL_SERVICE_TYPE_SUCCESS"](state, payload) {
    state.showLoader = false;
  }
}

const actions = {

  async create_new_medical_service_type({ commit }, payload) {
    commit("CREATE_MEDICAL_SERVICE_TYPES");
    await this.$api.$post('mdservice/types/', payload)
      .then(response => {
        commit("CREATE_MEDICAL_SERVICE_TYPES_SUCCESS", response);
      }).catch(error => {
        commit("CREATE_MEDICAL_SERVICE_TYPES_ERROR");
        console.log(error);

      });

  },
  async update_medical_service_type({ commit }, payload) {
    commit("UPDATE_MEDICAL_SERVICE_TYPES");
    await this.$api.$put(`mdservice/types/${payload.id}/`, payload)
      .then(response => {
        commit("UPDATE_MEDICAL_SERVICE_TYPES_SUCCESS", response);
      }).catch(error => {
        commit("UPDATE_MEDICAL_SERVICE_TYPES_ERROR");
        console.log(error);

      });

  },

  async get_medical_services_by_type({ commit }, payload) {
    commit("GET_MEDICAL_SERVICE_TYPES");
    await this.$api.$get(`mdservice/types/${payload}`)
      .then(response => {
        commit("GET_MEDICAL_SERVICE_TYPES_SUCCESS", response);
      }).catch(error => {
        commit("GET_MEDICAL_SERVICE_TYPES_ERROR");
        console.log(error);

      });

  },
  async get_medical_service_types({ commit }) {
    commit("GET_MEDICAL_SERVICE_TYPES");
    await this.$api.$get('mdservice/types/')
      .then(response => {
        commit("GET_MEDICAL_SERVICE_TYPES_SUCCESS", response);
      }).catch(error => {
        commit("GET_MEDICAL_SERVICE_TYPES_ERROR");
        console.log(error);

      });

  },
  async delete_medical_service_type({ commit }, payload) {
    commit("DELETE_MEDICAL_SERVICE_TYPE");
    await this.$api.$delete(`mdservice/types/${payload}`)
      .then(response => {
        commit("DELETE_MEDICAL_SERVICE_TYPE_SUCCESS", response);
      }).catch(error => {
        commit("DELETE_MEDICAL_SERVICE_TYPE_ERROR");
        console.log(error);

      });

  }
}
const getters = {

  servicetypes: function (state) {
    return state.medicalservicestypes;
  }


}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}
