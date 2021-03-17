const state = () => ({
  showLoader: Boolean,
  smsconfiguration: {},
  smsconfigurations: [],
});

const mutations = {
  /** Retrieve sms configurations */
  ["GET_SMS_CONFIG"](state) {
    state.showLoader = true;
  },
  ["GET_SMS_CONFIG_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_SMS_CONFIG_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_SMS_CONFIG_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.smsconfigurations = payload;
  },

  /** Create new sms configuration */
  ["CREATE_SMS_CONFIG"](state) {
    state.showLoader = true;
  },
  ["CREATE_SMS_CONFIG_FAILED"](state) {
    state.showLoader = false;
  },
  ["CREATE_SMS_CONFIG_ERROR"](state) {
    state.showLoader = false;
  },
  ["CREATE_SMS_CONFIG_SUCCESS"](state, payload) {
    state.showLoader = false;
  },

  /**Update SMS configurations */
  ["UPDATE_SMS_CONFIG"](state) {
    state.showLoader = true;
  },
  ["UPDATE_SMS_CONFIG_FAILED"](state) {
    state.showLoader = false;
  },
  ["UPDATE_SMS_CONFIG_ERROR"](state) {
    state.showLoader = false;
  },
  ["UPDATE_SMS_CONFIG_SUCCESS"](state, payload) {
    state.showLoader = false;
  },

  /**Activate SMS configurations */

  /**Update SMS configurations */
  ["ACTIVATE_SMS_CONFIG"](state) {
    state.showLoader = true;
  },
  ["ACTIVATE_SMS_CONFIG_FAILED"](state) {
    state.showLoader = false;
  },
  ["ACTIVATE_SMS_CONFIG_ERROR"](state) {
    state.showLoader = false;
  },
  ["ACTIVATE_SMS_CONFIG_SUCCESS"](state, payload) {
    state.showLoader = false;
  },

}
const actions = {
  async fetch_sms_configurations({ commit }) {
    commit("GET_SMS_CONFIG");
    await this.$api.$get(`configurations/sms`)
      .then(response => {
        commit("GET_SMS_CONFIG_SUCCESS", response);

      }).catch(error => {
        commit("GET_SMS_CONFIG_ERROR");
        console.log(error);

      });

  },
  async create_sms_configuration({ commit }, payload) {
    commit("CREATE_SMS_CONFIG");
    await this.$api.$post(`configurations/sms`, payload)
      .then(response => {
        commit("CREATE_SMS_CONFIG_SUCCESS", response);
      }).catch(error => {
        commit("CREATE_SMS_CONFIG_FAILED");
        console.log(error);

      });

  },
  async update_sms_configuration({ commit }, payload) {
    commit("UPDATE_SMS_CONFIG");
    await this.$api.$put(`configurations/sms/${payload.id}/`, payload)
      .then(response => {
        commit("UPDATE_SMS_CONFIG_SUCCESS", response);
      }).catch(error => {
        commit("UPDATE_SMS_CONFIG_FAILED");
        console.log(error);

      });

  },
  async activate_sms_configuration({ commit }, id) {
    commit("ACTIVATE_SMS_CONFIG");
    await this.$api.$put(`configurations/sms/${id}/activate`)
      .then(response => {
        commit("ACTIVATE_SMS_CONFIG_SUCCESS", response);
      }).catch(error => {
        commit("ACTIVATE_SMS_CONFIG_FAILED");
        console.log(error);

      });

  }
}
const getters = {
  smsconfigurations: function (state) {
    return state.smsconfigurations;
  },
  smsconfiguration: (state) => (id) => {
    return state.smsconfigurations.filter(config => config.id === id);
  }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}