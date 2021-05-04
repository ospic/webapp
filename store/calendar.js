const state = () => ({
  showLoader: Boolean,
  event: {},
  events: [],

});

const mutations = {

  /**Populate blood bank  */
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