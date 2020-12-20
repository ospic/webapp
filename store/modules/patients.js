import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  patient: {},
  patients: [],
  trends: []
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
  [mutation.GET_PATIENT_TRENDS](state) {
    state.showLoader = true;
  },
  [mutation.GET_PATIENT_TRENDS_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.GET_PATIENT_TRENDS_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.GET_PATIENT_TRENDS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.trends = payload;

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

    this.$router.push('/patients/' + payload.id);

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

  //Admit patient
  [mutation.ADMIT_PATIENT](state) {
    state.showLoader = true;
  },
  [mutation.ADMIT_PATIENT_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.ADMIT_PATIENT_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.ADMIT_PATIENT_SUCCESS](state, payload) {
    state.showLoader = false;
    this.$router.push('/patients/' + payload);
  },
  //End patient admission
  [mutation.END_ADMISSION](state) {
    state.showLoader = true;
  },
  [mutation.END_ADMISSION_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.END_ADMISSION_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.END_ADMISSION_SUCCESS](state, payload) {
    state.showLoader = false;
    this.$router.push('/patients/' + payload);
  },
}
const actions = {
  async retrievepatients({ commit }) {
    commit(mutation.GET_PATIENTS);
    await this.$api.$get(`patients/`)
      .then(response => {
        commit(mutation.GET_PATIENTS_SUCCESS, response.body);

      }).catch(error => {
        commit(mutation.GET_PATIENTS_ERROR);
        console.log(error);

      });

  },
  async get_patient_trends({ commit }) {
    commit(mutation.GET_PATIENTS);
    await this.$api.$get(`patients/?command=trends`)
      .then(response => {
        commit(mutation.GET_PATIENT_TRENDS_SUCCESS, response);

      }).catch(error => {
        commit(mutation.GET_PATIENT_TRENDS_ERROR);
        console.log(error);

      });

  },
  async create_new_patient({ commit }, payload) {
    commit(mutation.CREATE_PATIENTS);
    await this.$api.$post(`patients/`, payload)
      .then(response => {
        if (response.id !== null) {
          commit(mutation.CREATE_PATIENTS_SUCCESS, response);
        }

      }).catch(error => {
        commit(mutation.CREATE_PATIENTS_ERROR);
        console.log(error);

      });

  },
  async update_patient({ commit }, payload) {
    commit(mutation.UPDATE_PATIENT);
    await this.$api.$put(`patients/${payload.id}/`, payload)
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

  },
  async admit_patient({ commit }, payload) {
    commit(mutation.ADMIT_PATIENT);
    await this.$api.$post(`admissions/`, payload)
      .then(response => {
        if (response.message !== null) {
          commit(mutation.ADMIT_PATIENT_SUCCESS, payload.patientId);

        }
      }).catch(error => {
        commit(mutation.ADMIT_PATIENT_ERROR);
        console.log(error);

      });

  },
  async end_patient_admission({ commit }, payload) {
    commit(mutation.END_ADMISSION);
    await this.$api.$post(`admissions/end`, payload)
      .then(response => {
        if (response.message !== null) {
          commit(mutation.END_ADMISSION_SUCCESS, payload.patientId);

        }

      }).catch(error => {
        commit(mutation.END_ADMISSION_ERROR);
        console.log(error);

      });

  }
}
const getters = {
  patients: function (state) {
    return state.patients.reverse();
  },
  assigned: function (state) {
    return state.patients.filter(patient => patient.staff !== null);
  },
  unassigned: function (state) {
    return state.patients.filter(patient => patient.staff === null);
  },
  patient: (state) => (id) => {
    return state.patients.find(patient => patient.id === id)
  },
  opdpatients: function (state) {
    return state.patients.filter(patient => !patient.isAdmitted);
  },
  ipdpatients: function (state) {
    return state.patients.filter(patient => patient.isAdmitted);
  },
  malepatients: function (state) {
    return state.patients.filter(patient => patient.gender === "M")
  },
  femalepatients: function (state) {
    return state.patients.filter(patient => patient.gender === "F")
  },
  otherpatients: function (state) {
    return state.patients.filter(patient => patient.gender === "O")
  },
  trends: function (state) {
    return state.trends;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}