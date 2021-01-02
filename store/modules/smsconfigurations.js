import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  smsconfiguration: {},
  smsconfigurations: [],
});

const mutations = {
  /** Retrieve sms configurations */
  [mutation.GET_SMS_CONFIG](state) {
    state.showLoader = true;
  },
  [mutation.GET_SMS_CONFIG_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.GET_SMS_CONFIG_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.GET_SMS_CONFIG_SUCCESS](state, payload) {
    state.showLoader = false;
    state.smsconfigurations = payload;
  },

  /** Create new sms configuration */
  [mutation.CREATE_SMS_CONFIG](state) {
    state.showLoader = true;
  },
  [mutation.CREATE_SMS_CONFIG_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_SMS_CONFIG_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_SMS_CONFIG_SUCCESS](state, payload) {
    state.showLoader = false;
  },

  /**Update SMS configurations */
  [mutation.UPDATE_SMS_CONFIG](state) {
    state.showLoader = true;
  },
  [mutation.UPDATE_SMS_CONFIG_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_SMS_CONFIG_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_SMS_CONFIG_SUCCESS](state, payload) {
    state.showLoader = false;
  },

  /**Activate SMS configurations */

  /**Update SMS configurations */
  [mutation.ACTIVATE_SMS_CONFIG](state) {
    state.showLoader = true;
  },
  [mutation.ACTIVATE_SMS_CONFIG_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.ACTIVATE_SMS_CONFIG_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.ACTIVATE_SMS_CONFIG_SUCCESS](state, payload) {
    state.showLoader = false;
  },

}
const actions = {
  async fetch_sms_configurations({ commit }) {
    commit(mutation.GET_SMS_CONFIG);
    await this.$api.$get(`configurations/sms`)
      .then(response => {
        commit(mutation.GET_SMS_CONFIG_SUCCESS, response);

      }).catch(error => {
        commit(mutation.GET_SMS_CONFIG_ERROR);
        console.log(error);

      });

  },
  async create_sms_configuration({ commit }, payload) {
    commit(mutation.CREATE_SMS_CONFIG);
    await this.$api.$post(`configurations/sms`, payload)
      .then(response => {
        commit(mutation.CREATE_SMS_CONFIG_SUCCESS, response);
      }).catch(error => {
        commit(mutation.CREATE_SMS_CONFIG_FAILED);
        console.log(error);

      });

  },
  async update_sms_configuration({ commit }, payload) {
    commit(mutation.UPDATE_SMS_CONFIG);
    await this.$api.$put(`configurations/sms/${payload.id}/`, payload)
      .then(response => {
        commit(mutation.UPDATE_SMS_CONFIG_SUCCESS, response);
      }).catch(error => {
        commit(mutation.UPDATE_SMS_CONFIG_FAILED);
        console.log(error);

      });

  },
  async activate_sms_configuration({ commit }, id) {
    commit(mutation.ACTIVATE_SMS_CONFIG);
    await this.$api.$put(`configurations/sms/${id}/activate`)
      .then(response => {
        commit(mutation.ACTIVATE_SMS_CONFIG_SUCCESS, response);
      }).catch(error => {
        commit(mutation.ACTIVATE_SMS_CONFIG_FAILED);
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
  state,
  mutations,
  actions,
  getters
}