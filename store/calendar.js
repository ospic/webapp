const state = () => ({
  showLoader: Boolean,
  event: {},
  events: [],

});

const mutations = {

  /**Populate  calendar events */
  ["FETCH_CALENDAR_EVENTS"](state) {
    state.showLoader = true;
  },
  ["FETCH_CALENDAR_EVENTS_FAILED"](state) {
    state.showLoader = false;
  },
  ["FETCH_CALENDAR_EVENTS_ERROR"](state) {
    state.showLoader = false;
  },
  ["FETCH_CALENDAR_EVENTS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.events = payload;
  },

  /**Create calendar event */
  ["CREATE_EVENT"](state) {
    state.showLoader = true;
  },
  ["CREATE_EVENT_FAILED"](state) {
    state.showLoader = false;
  },
  ["CREATE_EVENT_ERROR"](state) {
    state.showLoader = false;
  },
  ["CREATE_EVENT_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.event = payload;
  },

  /**Delete calendar event */
  ["DELETE_EVENT"](state) {
    state.showLoader = true;
  },
  ["DELETE_EVENT_FAILED"](state) {
    state.showLoader = false;
  },
  ["DELETE_EVENT_ERROR"](state) {
    state.showLoader = false;
  },
  ["DELETE_EVENT_SUCCESS"](state) {
    state.showLoader = false;
  },

  /**Delete calendar event */
  ["UPDATE_EVENT"](state) {
    state.showLoader = true;
  },
  ["UPDATE_EVENT_FAILED"](state) {
    state.showLoader = false;
  },
  ["UPDATE_EVENT_ERROR"](state) {
    state.showLoader = false;
  },
  ["UPDATE_EVENT_SUCCESS"](state) {
    state.showLoader = false;
  },

}
const actions = {
  async get_calendar_events({ commit }) {
    commit("FETCH_CALENDAR_EVENTS");
    await this.$api.$get(`calendar/`)
      .then(response => {
        commit("FETCH_CALENDAR_EVENTS_SUCCESS", response);
      }).catch(error => {
        commit("FETCH_CALENDAR_EVENTS_ERROR");
        console.log(error);

      });
  },

  async create_calendar_event({ commit }, payload) {
    commit("CREATE_EVENT");
    await this.$api.$post(`calendar/`, payload)
      .then(response => {
        commit("CREATE_EVENT_SUCCESS", response);
      }).catch(error => {
        commit("CREATE_EVENT_ERROR");
        console.log(error);

      });
  },

  async delete_calendar_event({ commit }, payload) {
    commit("DELETE_EVENT");
    await this.$api.$delete(`calendar/${payload}`)
      .then(response => {
        commit("DELETE_EVENT_SUCCESS");
      }).catch(error => {
        commit("DELETE_EVENT_ERROR");
        console.log(error);

      });
  },

  async update_calendar_event({ commit }, payload) {
    commit("UPDATE_EVENT");
    await this.$api.$put(`calendar/${payload.id}`, payload.data)
      .then(response => {
        commit("UPDATE_EVENT_SUCCESS");
      }).catch(error => {
        commit("UPDATE_EVENT_ERROR");
        console.log(error);

      });
  },

}

const getters = {
  events: function (state) {
    return state.events;
  }

}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}