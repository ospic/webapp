const state = () => ({
  showLoader: Boolean,
  patient: {},
  patients: [],
  trends: [],
});

const mutations = {

  ["GET_PATIENTS"](state) {
    state.showLoader = true;
  },
  ["GET_PATIENTS_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_PATIENTS_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_PATIENTS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.patients = payload;

  },
  ["GET_PATIENT_TRENDS"](state) {
    state.showLoader = true;
  },
  ["GET_PATIENT_TRENDS_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_PATIENT_TRENDS_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_PATIENT_TRENDS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.trends = payload;

  },
  ["CREATE_PATIENTS"](state) {
    state.showLoader = true;
  },
  ["CREATE_PATIENTS_FAILED"](state) {
    state.showLoader = false;
  },
  ["CREATE_PATIENTS_ERROR"](state) {
    state.showLoader = false;
  },
  ["CREATE_PATIENTS_SUCCESS"](state, payload) {
    state.showLoader = false;
    this.$router.push('/patients/' + payload.id);
  },

  ["UPDATE_PATIENT"](state) {
    state.showLoader = true;
  },
  ["UPDATE_PATIENT_FAILED"](state) {
    state.showLoader = false;
  },
  ["UPDATE_PATIENT_ERROR"](state) {
    state.showLoader = false;
  },
  ["UPDATE_PATIENT_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.patient = payload;
  },
  //Delete Patient Mutations 

  ["DELETE_PATIENT"](state) {
    state.showLoader = true;
  },
  ["DELETE_PATIENT_FAILED"](state) {
    state.showLoader = false;
  },
  ["DELETE_PATIENT_ERROR"](state) {
    state.showLoader = false;
  },
  ["DELETE_PATIENT_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.patient = payload;
  },

  //Admit patient
  ["ADMIT_PATIENT"](state) {
    state.showLoader = true;
  },
  ["ADMIT_PATIENT_FAILED"](state) {
    state.showLoader = false;
  },
  ["ADMIT_PATIENT_ERROR"](state) {
    state.showLoader = false;
  },
  ["ADMIT_PATIENT_SUCCESS"](state, payload) {
    state.showLoader = false;
    this.$router.push('/consultations/' + payload);
  },
  //End patient admission
  ["END_ADMISSION"](state) {
    state.showLoader = true;
  },
  ["END_ADMISSION_FAILED"](state) {
    state.showLoader = false;
  },
  ["END_ADMISSION_ERROR"](state) {
    state.showLoader = false;
  },
  ["END_ADMISSION_SUCCESS"](state, payload) {
    state.showLoader = false;
    this.$router.push('/consultations/' + payload);
  },

}
const actions = {
  async retrievepatients({ commit }) {
    commit("GET_PATIENTS");
    await this.$api.$get(`patients/`)
      .then(response => {
        commit("GET_PATIENTS_SUCCESS", response);

      }).catch(error => {
        commit("GET_PATIENTS_ERROR");
        console.log(error);

      });

  },
  async get_patient_trends({ commit }) {
    commit("GET_PATIENTS");
    await this.$api.$get(`patients/?command=trends`)
      .then(response => {
        commit("GET_PATIENT_TRENDS_SUCCESS", response);

      }).catch(error => {
        commit("GET_PATIENT_TRENDS_ERROR");
        console.log(error);

      });

  },
  async create_new_patient({ commit }, payload) {
    commit("CREATE_PATIENTS");
    await this.$api.$post(`patients/`, payload)
      .then(response => {
        if (response.id !== null) {
          commit("CREATE_PATIENTS_SUCCESS", response);
        }

      }).catch(error => {
        commit("CREATE_PATIENTS_ERROR");
        console.log(error);

      });

  },
  async update_patient({ commit }, payload) {
    commit("UPDATE_PATIENT");
    await this.$api.$put(`patients/${payload.id}/`, payload)
      .then(response => {
        commit("UPDATE_PATIENT_SUCCESS", response);

      }).catch(error => {
        commit("UPDATE_PATIENT_ERROR");
        console.log(error);

      });

  },
  async delete_patient({ commit }, payload) {
    commit("DELETE_PATIENT");
    await this.$api.$delete(`patients/${payload}`)
      .then(response => {
        commit("DELETE_PATIENT_SUCCESS", response);

      }).catch(error => {
        commit("DELETE_PATIENT_ERROR");
        console.log(error);

      });

  },
  async admit_patient({ commit }, payload) {
    commit("ADMIT_PATIENT");
    await this.$api.$post(`admissions/`, payload)
      .then(response => {
        if (response.message !== null) {
          commit("ADMIT_PATIENT_SUCCESS", payload.serviceId);

        }
      }).catch(error => {
        commit("ADMIT_PATIENT_ERROR");
        console.log(error);

      });

  },
  async end_patient_admission({ commit }, payload) {
    commit("END_ADMISSION");
    await this.$api.$post(`admissions/end`, payload)
      .then(response => {
        if (response.message !== null) {
          commit("END_ADMISSION_SUCCESS", payload.serviceId);

        }

      }).catch(error => {
        commit("END_ADMISSION_ERROR");
        console.log(error);

      });

  },

}
const getters = {
  patients: function (state) {
    return state.patients;
  },

  patient: (state) => (id) => {
    return state.patients.find(patient => patient.id == id)
  },
  opdpatients: function (state) {
    return state.patients.filter(patient => !patient.isAdmitted);
  },
  ipdpatients: function (state) {
    return state.patients.filter(patient => patient.isAdmitted);
  },

  trends: function (state) {
    return state.trends;
  }

}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}