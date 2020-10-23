import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  patient: {},
  patients: []
});

const mutations = {

  [mutation.GET_PATIENTS](state) {
    state.showLoader = true;
  },
  [mutation.GET_PATIENTS_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.GET_PATIENTS_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.GET_PATIENTS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.patients = payload;

  },
  [mutation.CREATE_PATIENTS](state) {
    state.showLoader = true;
  },
  [mutation.CREATE_PATIENTS_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_PATIENTS_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_PATIENTS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.patient = payload;

  },

  [mutation.UPDATE_PATIENT_SUCCESS](state, payload) {
    state.showLoader = false;
    state.patients = payload;

  },
  [mutation.UPDATE_PATIENT](state) {
    state.showLoader = true;
  },
  [mutation.UPDATE_PATIENT_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_PATIENT_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_PATIENT_SUCCESS](state, payload) {
    state.showLoader = false;
    state.patient = payload;
  },
  //Delete Patient Mutations 

  [mutation.DELETE_PATIENT](state) {
    state.showLoader = true;
  },
  [mutation.DELETE_PATIENT_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.DELETE_PATIENT_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.DELETE_PATIENT_SUCCESS](state, payload) {
    state.showLoader = false;
    state.patient = payload;
  },
}
const actions = {
  async retrievepatients({ commit }) {
    commit(mutation.GET_PATIENTS);
    await this.$api.$get(`patients/`)
      .then(response => {
        commit(mutation.GET_PATIENTS_SUCCESS, response);

      }).catch(error => {
        commit(mutation.GET_PATIENTS_ERROR);
        console.log(error);

      });

  },
  async create_new_patient({ commit }, payload) {
    commit(mutation.CREATE_PATIENTS);
    await this.$api.$post(`patients/`, payload)
      .then(response => {
        commit(mutation.CREATE_PATIENTS_SUCCESS, response);

      }).catch(error => {
        commit(mutation.CREATE_PATIENTS_ERROR);
        console.log(error);

      });

  },
  async update_patient({ commit }, payload) {
    commit(mutation.UPDATE_PATIENT);
    await this.$api.$put(`patients/${payload.id}/`, payload.body)
      .then(response => {
        commit(mutation.UPDATE_PATIENT_SUCCESS, response);

      }).catch(error => {
        commit(mutation.UPDATE_PATIENT_ERROR);
        console.log(error);

      });

  },
  async delete_patient({ commit }, payload) {
    commit(mutation.DELETE_PATIENT);
    await this.$api.$delete(`patients/${payload}`)
      .then(response => {
        commit(mutation.DELETE_PATIENT_SUCCESS, response);

      }).catch(error => {
        commit(mutation.DELETE_PATIENT_ERROR);
        console.log(error);

      });

  }
}
const getters = {
  patients: function (state) {
    return state.patients.reverse();
  },
  assigned: function (state) {
    return state.patients.filter(patient => patient.physician !== null);
  },
  unassigned: function (state) {
    return state.patients.filter(patient => patient.physician === null);
  },
  patient: (state) => (id) => {
    return state.patients.find(patient => patient.id === id)
  },
  opdpatients: function (state) {
    return state.patients.filter(patient => !patient.isAdmitted);
  },
  ipdpatients: function (state) {
    return state.patients.filter(patient => patient.isAdmitted);
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}