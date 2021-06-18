const state = () => ({
  showLoader: Boolean,
  configuration: {},
  configurations: []
});

const mutations = {

  ["GET_CONFIGURATIONS"](state) {
    state.showLoader = true;
  },
  ["GET_CONFIGURATIONS_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_CONFIGURATIONS_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_CONFIGURATIONS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.configurations = payload;
  },


  ["UPDATE_UPDATE_CONFIGURATION_VALUE"](state) {
    state.showLoader = true;
  },
  ["UPDATE_UPDATE_CONFIGURATION_VALUE_FAILED"](state) {
    state.showLoader = false;
  },
  ["UPDATE_UPDATE_CONFIGURATION_VALUE_ERROR"](state) {
    state.showLoader = false;
  },
  ["UPDATE_UPDATE_CONFIGURATION_VALUE_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.configuration = payload;
  },

  ["UPDATE_UPDATE_CONFIGURATION_STATUS"](state) {
    state.showLoader = true;
  },
  ["UPDATE_UPDATE_CONFIGURATION_STATUS_FAILED"](state) {
    state.showLoader = false;
  },
  ["UPDATE_UPDATE_CONFIGURATION_STATUS_ERROR"](state) {
    state.showLoader = false;
  },
  ["UPDATE_UPDATE_CONFIGURATION_STATUS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.configuration = payload;
  },
}
const actions = {

  async get_configurations({ commit }) {
    commit("GET_CONFIGURATIONS");
    await this.$api.$get('configurations/')
      .then(response => {
        commit("GET_CONFIGURATIONS_SUCCESS", response);

      }).catch(error => {
        commit("GET_CONFIGURATIONS_ERROR");
        console.log(error);
      });
  },

  async update_configuration({ commit }, payload) {
    commit("UPDATE_UPDATE_CONFIGURATION_VALUE");
    await this.$api.$patch('configurations/', payload)
      .then(response => {
        commit("UPDATE_UPDATE_CONFIGURATION_VALUE_SUCCESS", response);

      }).catch(error => {
        commit("UPDATE_UPDATE_CONFIGURATION_VALUE_ERROR");
        console.log(error);

      });
  },


  async update_configuration_status({ commit }, payload) {
    commit("UPDATE_UPDATE_CONFIGURATION_STATUS");
    await this.$api.$put(`configurations/${payload.id}/?command=${payload.action}`)
      .then(response => {
        commit("UPDATE_UPDATE_CONFIGURATION_STATUS_SUCCESS", response);

      }).catch(error => {
        commit("UPDATE_UPDATE_CONFIGURATION_STATUS_ERROR");
        console.log(error);

      });

  },


}
const getters = {
  configurations: function (state) {
    return state.configurations;
  }

}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}