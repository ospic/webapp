const state = () => ({
  isLoading: Boolean,
  laboratory_services: [],
  laboratory_service: {}
});

const mutations = {
  //FETCH MEDICAL LABORATORY SERVICES
  ["GET_LABORATORY_SERVICES"](state) {
    state.isLoading = true;
  },
  ["GET_LABORATORY_SERVICES_SUCCESS"](state, payload) {
    state.isLoading = false;
    state.laboratory_services = payload;
  },
  ["GET_LABORATORY_SERVICES_FAILED"](state) {
    state.isLoading = false;
  },
  ["GET_LABORATORY_SERVICES_ERROR"](state) {
    state.isLoading = false;
  },


  //CREATE MEDICAL LABORATORY SERVICE
  ["POST_LABORATORY_SERVICES"](state) {
    state.isLoading = true;
  },
  ["POST_LABORATORY_SERVICES_SUCCESS"](state, payload) {
    state.isLoading = false;
    state.laboratory_service = payload;
  },
  ["POST_LABORATORY_SERVICES_FAILED"](state) {
    state.isLoading = false;
  },
  ["POST_LABORATORY_SERVICES_ERROR"](state) {
    state.isLoading = false;
  },

  //UPDATE MEDICAL LABORATORY SERVI
  ["UPDATE_LABORATORY_SERVICES"](state) {
    state.isLoading = true;
  },
  ["UPDATE_LABORATORY_SERVICES_SUCCESS"](state, payload) {
    state.isLoading = false;
    state.laboratory_service = payload;
  },
  ["UPDATE_LABORATORY_SERVICES_FAILED"](state) {
    state.isLoading = false;
  },
  ["UPDATE_LABORATORY_SERVICES_ERROR"](state) {
    state.isLoading = false;
  },

  //DELETE MEDICAL LABORATORY SERVI
  ["DELETE_LABORATORY_SERVICES"](state) {
    state.isLoading = true;
  },
  ["DELETE_LABORATORY_SERVICES_SUCCESS"](state, payload) {
    state.isLoading = false;
    state.laboratory_services = payload;
  },
  ["DELETE_LABORATORY_SERVICES_FAILED"](state) {
    state.isLoading = false;
  },
  ["DELETE_LABORATORY_SERVICES_ERROR"](state) {
    state.isLoading = false;
  },

};
const actions = {
  async create_laboratory_service({ commit }, payload) {
    commit("POST_LABORATORY_SERVICES");
    await this.$api.$post(`lab/services/`, payload)
      .then(response => {
        commit("POST_LABORATORY_SERVICES_SUCCESS", response);
      }).catch(error => {
        commit("POST_LABORATORY_SERVICES_FAILED");
      });
  },

  async fetch_laboratory_services({ commit }) {
    commit("GET_LABORATORY_SERVICES");
    await this.$api.$get(`lab/services/`)
      .then(response => {
        commit("GET_LABORATORY_SERVICES_SUCCESS", response);
      }).catch(error => {
        commit("GET_LABORATORY_SERVICES_FAILED");
      });
  },

  async update_laboratory_service({ commit }, payload) {
    commit("UPDATE_LABORATORY_SERVICES");
    await this.$api.$put(`lab/services/${payload.id}`, payload)
      .then(response => {
        commit("UPDATE_LABORATORY_SERVICES_SUCCESS", response);
      }).catch(error => {
        commit("UPDATE_LABORATORY_SERVICES_FAILED");
      });
  },
  async delete_laboratory_service({ commit }, payload) {
    commit("DELETE_LABORATORY_SERVICES");
    await this.$api.$get(`lab/services/${payload}`)
      .then(response => {
        commit("DELETE_LABORATORY_SERVICES_SUCCESS", response);
      }).catch(error => {
        commit("DELETE_LABORATORY_SERVICES_FAILED");
      });
  }

};
const getters = {
  laboratoryservices: function (state) {
    return state.laboratory_services;
  }
};
export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions,
};
