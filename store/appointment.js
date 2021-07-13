const CREATE_APPOINTMENTS = "CREATE_APPOINTMENTS";
const CREATE_APPOINTMENTS_SUCCESS = "CREATE_APPOINTMENTS_SUCCESS";
const CREATE_APPOINTMENTS_FAILED = "CREATE_APPOINTMENTS_FAILED";
const CREATE_APPOINTMENTS_ERROR = "CREATE_APPOINTMENTS_ERROR";

const ACCEPT_APPOINTMENT = "ACCEPT_APPOINTMENT";
const ACCEPT_APPOINTMENT_SUCCESS = "ACCEPT_APPOINTMENT_SUCCESS";
const ACCEPT_APPOINTMENT_FAILED = "ACCEPT_APPOINTMENT_FAILED";
const ACCEPT_APPOINTMENT_ERROR = "ACCEPT_APPOINTMENT_ERROR";

const DECLINE_APPOINTMENT = "DECLINE_APPOINTMENT";
const DECLINE_APPOINTMENT_SUCCESS = "DECLINE_APPOINTMENT_SUCCESS";
const DECLINE_APPOINTMENT_FAILED = "DECLINE_APPOINTMENT_FAILED";
const DECLINE_APPOINTMENT_ERROR = "DECLINE_APPOINTMENT_ERROR";

const GET_APPOINTMENTS = "GET_APPOINTMENTS";
const GET_APPOINTMENTS_SUCCESS = "GET_APPOINTMENTS_SUCCESS";
const GET_APPOINTMENTS_FAILED = "GET_APPOINTMENTS_FAILED";
const GET_APPOINTMENTS_ERROR = "GET_APPOINTMENTS_ERROR";

const UNSCHEDULE_APPOINTMENT = "DECLINE_APPOINTMENT";
const UNSCHEDULE_APPOINTMENT_SUCCESS = "DECLINE_APPOINTMENT_SUCCESS";
const UNSCHEDULE_APPOINTMENT_FAILED = "DECLINE_APPOINTMENT_FAILED";
const UNSCHEDULE_APPOINTMENT_ERROR = "DECLINE_APPOINTMENT_ERROR";


const EDIT_APPOINTMENT = "DECLINE_APPOINTMENT";
const EDIT_APPOINTMENT_SUCCESS = "DECLINE_APPOINTMENT_SUCCESS";
const EDIT_APPOINTMENT_FAILED = "DECLINE_APPOINTMENT_FAILED";
const EDIT_APPOINTMENT_ERROR = "DECLINE_APPOINTMENT_ERROR";




const state = () => ({
  showLoader: Boolean,
  appointments: [],
  appointment: {},
});

const mutations = {
  /**Fetch bills */

  [GET_APPOINTMENTS](state) {
    state.showLoader = true;
  },
  [GET_APPOINTMENTS_FAILED](state) {
    state.showLoader = false;
  },
  [GET_APPOINTMENTS_ERROR](state) {
    state.showLoader = false;
    state.appointments = [];
  },
  [GET_APPOINTMENTS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.appointments = payload;
  },

  [CREATE_APPOINTMENTS](state) {
    state.showLoader = true;
  },
  [CREATE_APPOINTMENTS_FAILED](state) {
    state.showLoader = false;
  },
  [CREATE_APPOINTMENTS_ERROR](state) {
    state.showLoader = false;
  },
  [CREATE_APPOINTMENTS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.appointment = payload;
  },

  [ACCEPT_APPOINTMENT](state) {
    state.showLoader = true;
  },
  [ACCEPT_APPOINTMENT_FAILED](state) {
    state.showLoader = false;
  },
  [ACCEPT_APPOINTMENT_ERROR](state) {
    state.showLoader = false;
  },
  [ACCEPT_APPOINTMENT_SUCCESS](state, payload) {
    state.showLoader = false;
    state.appointment = payload;
  },

  [DECLINE_APPOINTMENT](state) {
    state.showLoader = true;
  },
  [DECLINE_APPOINTMENT_FAILED](state) {
    state.showLoader = false;
  },
  [DECLINE_APPOINTMENT_ERROR](state) {
    state.showLoader = false;
  },
  [DECLINE_APPOINTMENT_SUCCESS](state, payload) {
    state.showLoader = false;
    state.appointment = payload;
  },


  [UNSCHEDULE_APPOINTMENT](state) {
    state.showLoader = true;
  },
  [UNSCHEDULE_APPOINTMENT_FAILED](state) {
    state.showLoader = false;
  },
  [UNSCHEDULE_APPOINTMENT_ERROR](state) {
    state.showLoader = false;
  },
  [UNSCHEDULE_APPOINTMENT_SUCCESS](state, payload) {
    state.showLoader = false;
    state.appointment = payload;
  },


  [EDIT_APPOINTMENT](state) {
    state.showLoader = true;
  },
  [EDIT_APPOINTMENT_FAILED](state) {
    state.showLoader = false;
  },
  [EDIT_APPOINTMENT_ERROR](state) {
    state.showLoader = false;
  },
  [EDIT_APPOINTMENT_SUCCESS](state, payload) {
    state.showLoader = false;
    state.appointment = payload;
  },

}

const actions = {

  async get_physician_appointments({ commit }, payload) {
    commit(GET_APPOINTMENTS);
    await this.$api.$get(`appointments/physician/${payload}`).then(response => {
      commit(GET_APPOINTMENTS_SUCCESS, response);
    }).catch(error => {
      commit(GET_APPOINTMENTS_ERROR);
      console.log(error);

    });
  },


  async accept_appointment({ commit }, payload) {
    commit(ACCEPT_APPOINTMENT);
    await this.$api.$put(`appointments/${payload}/update?action=accept`).then(response => {
      commit(ACCEPT_APPOINTMENT_SUCCESS, response);
    }).catch(error => {
      commit(ACCEPT_APPOINTMENT_ERROR);
      console.log(error);

    });
  },

  async reject_appointment({ commit }, payload) {
    commit(DECLINE_APPOINTMENT);
    await this.$api.$put(`appointments/${payload}/update?action=unschedule`).then(response => {
      commit(DECLINE_APPOINTMENT_SUCCESS, response);
    }).catch(error => {
      commit(DECLINE_APPOINTMENT_ERROR);
      console.log(error);

    });
  },

  async unschedule_appointment({ commit }, payload) {
    commit(UNSCHEDULE_APPOINTMENT);
    await this.$api.$delete(`appointments/${payload}/update?action=unschedule`).then(response => {
      commit(UNSCHEDULE_APPOINTMENT_SUCCESS, response);
    }).catch(error => {
      commit(UNSCHEDULE_APPOINTMENT_ERROR);
      console.log(error);

    });
  },


  async update_appointment({ commit }, payload) {
    commit(EDIT_APPOINTMENT);
    await this.$api.$put(`appointments/${payload.id}`, payload).then(response => {
      commit(EDIT_APPOINTMENT_SUCCESS, response);
    }).catch(error => {
      commit(EDIT_APPOINTMENT_ERROR);
      console.log(error);

    });
  },


}
const getters = {
  appointments: function (state) {
    return state.appointments;
  },
  appointment: (state) => (id) => {
    return state.appointments.find(appointment => appointment.id == id)
  },

}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}
