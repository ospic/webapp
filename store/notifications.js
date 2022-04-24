
const state = () => ({
  isLoading: Boolean,
  newnotifications: [],
  allnotifications: [],
  notification: {}
});

const mutations = {
  ["GET_NEW_NOTIFICATIONS"](state) {
    state.isLoading = true;
  },
  ["GET_NEW_NOTIFICATIONS_SUCCESS"](state, payload) {
    state.isLoading = false;
    state.newnotifications = payload;
  },
  ["GET_NEW_NOTIFICATIONS_ERROR"](state) {
    state.isLoading = false;
  },

  ["GET_ALL_NOTIFICATIONS"](state) {
    state.isLoading = true;
  },
  ["GET_ALL_NOTIFICATIONS_SUCCESS"](state, payload) {
    state.isLoading = false;
    state.allnotifications = payload;
  },
  ["GET_ALL_NOTIFICATIONS_ERROR"](state) {
    state.isLoading = false;
  },

  ["READ_NOTIFICATION"](state) {
    state.isLoading = true;
  },
  ["READ_NOTIFICATION_SUCCESS"](state, payload) {
    state.isLoading = false;
    state.notification = payload;
  },
  ["READ_NOTIFICATION_ERROR"](state) {
    state.isLoading = false;
  }
};
const actions = {
  async _getnewnotifications({ commit }) {
    commit("GET_NEW_NOTIFICATIONS");
    await this.$api.$get('notifications/')
      .then(response => {
        commit("GET_NEW_NOTIFICATIONS_SUCCESS", response);
      }).catch(error => {
        commit("GET_NEW_NOTIFICATIONS_ERROR");
      });
  },
  async _getallnotifications({ commit }) {
    commit("GET_ALL_NOTIFICATIONS");
    await this.$api.$get('notifications/all')
      .then(response => {
        commit("GET_ALL_NOTIFICATIONS_SUCCESS", response);
      }).catch(error => {
        commit("GET_ALL_NOTIFICATIONS_ERROR");
      });
  },
  async _readnotification({ commit }, payload) {
    commit("READ_NOTIFICATION");
    await this.$api.$get(`notifications/${payload}`)
      .then(response => {
        commit("READ_NOTIFICATION_SUCCESS", response);
      }).catch(error => {
        commit("READ_NOTIFICATION_ERROR");
      });
  }

};
const getters = {
  newnotifications: function (state) {
    return state.newnotifications;
  },
  notificationsize: function (state) {
    return state.newnotifications.length;
  },
  allnotifications: function (state) {
    return state.allnotifications;
  }
};
export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions,
};
