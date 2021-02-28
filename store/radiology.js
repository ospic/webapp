const state = () => ({
  isLoading: Boolean,
  radiology_services: [],
  radiology_service: {}
});

const mutations = {
  //FETCH MEDICAL radiology SERVICES
  ["GET_RADIOLOGY_SERVICES"](state) {
    state.isLoading = true;
  },
  ["GET_RADIOLOGY_SERVICES_SUCCESS"](state, payload) {
    state.isLoading = false;
    state.radiology_services = payload;
  },
  ["GET_RADIOLOGY_SERVICES_FAILED"](state) {
    state.isLoading = false;
  },
  ["GET_RADIOLOGY_SERVICES_ERROR"](state) {
    state.isLoading = false;
  },


  //CREATE MEDICAL radiology SERVICE
  ["POST_RADIOLOGY_SERVICES"](state) {
    state.isLoading = true;
  },
  ["POST_RADIOLOGY_SERVICES_SUCCESS"](state, payload) {
    state.isLoading = false;
    state.radiology_service = payload;
  },
  ["POST_RADIOLOGY_SERVICES_FAILED"](state) {
    state.isLoading = false;
  },
  ["POST_RADIOLOGY_SERVICES_ERROR"](state) {
    state.isLoading = false;
  },

  //UPDATE MEDICAL radiology SERVI
  ["UPDATE_RADIOLOGY_SERVICES"](state) {
    state.isLoading = true;
  },
  ["UPDATE_RADIOLOGY_SERVICES_SUCCESS"](state, payload) {
    state.isLoading = false;
    state.radiology_service = payload;
  },
  ["UPDATE_RADIOLOGY_SERVICES_FAILED"](state) {
    state.isLoading = false;
  },
  ["UPDATE_RADIOLOGY_SERVICES_ERROR"](state) {
    state.isLoading = false;
  },

  //DELETE MEDICAL radiology SERVI
  ["DELETE_RADIOLOGY_SERVICES"](state) {
    state.isLoading = true;
  },
  ["DELETE_RADIOLOGY_SERVICES_SUCCESS"](state, payload) {
    state.isLoading = false;
    state.radiology_services = payload;
  },
  ["DELETE_RADIOLOGY_SERVICES_FAILED"](state) {
    state.isLoading = false;
  },
  ["DELETE_RADIOLOGY_SERVICES_ERROR"](state) {
    state.isLoading = false;
  },

};
const actions = {
  async create_radiology_service({ commit }, payload) {
    commit("POST_RADIOLOGY_SERVICES");
    await this.$api.$post(`radiology/`, payload)
      .then(response => {
        commit("POST_RADIOLOGY_SERVICES_SUCCESS", response);
      }).catch(error => {
        commit("POST_RADIOLOGY_SERVICES_FAILED");
      });
  },

  async fetch_radiology_services({ commit }) {
    commit("GET_RADIOLOGY_SERVICES");
    await this.$api.$get(`radiology/`)
      .then(response => {
        commit("GET_RADIOLOGY_SERVICES_SUCCESS", response);
      }).catch(error => {
        commit("GET_RADIOLOGY_SERVICES_FAILED");
      });
  },

  async update_radiology_service({ commit }, payload) {
    commit("UPDATE_RADIOLOGY_SERVICES");
    await this.$api.$put(`radiology/${payload.id}`, payload)
      .then(response => {
        commit("UPDATE_RADIOLOGY_SERVICES_SUCCESS", response);
      }).catch(error => {
        commit("UPDATE_RADIOLOGY_SERVICES_FAILED");
      });
  },
  async delete_radiology_service({ commit }, payload) {
    commit("DELETE_RADIOLOGY_SERVICES");
    await this.$api.$get(`radiology/${payload}`)
      .then(response => {
        commit("DELETE_RADIOLOGY_SERVICES_SUCCESS", response);
      }).catch(error => {
        commit("DELETE_RADIOLOGY_SERVICES_FAILED");
      });
  }

};
const getters = {
  radiologyservices: function (state) {
    return state.radiology_services;
  }
};
export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions,
};
