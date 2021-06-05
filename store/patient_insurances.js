const CREATE_PATIENT_INSURANCES = "CREATE_PATIENT_INSURANCES";
const CREATE_PATIENT_INSURANCES_SUCCESS = "CREATE_PATIENT_INSURANCES_SUCCESS";
const CREATE_PATIENT_INSURANCES_FAILED = "CREATE_PATIENT_INSURANCES_FAILED";
const CREATE_PATIENT_INSURANCES_ERROR = "CREATE_PATIENT_INSURANCES_ERROR";

const UPDATE_PATIENT_INSURANCES = "UPDATE_PATIENT_INSURANCES";
const UPDATE_PATIENT_INSURANCES_SUCCESS = "UPDATE_PATIENT_INSURANCES_SUCCESS";
const UPDATE_PATIENT_INSURANCES_FAILED = "UPDATE_PATIENT_INSURANCES_FAILED";
const UPDATE_PATIENT_INSURANCES_ERROR = "UPDATE_PATIENT_INSURANCES_ERROR";

const DELETE_PATIENT_INSURANCES = "DELETE_PATIENT_INSURANCES";
const DELETE_PATIENT_INSURANCES_SUCCESS = "DELETE_PATIENT_INSURANCES_SUCCESS";
const DELETE_PATIENT_INSURANCES_FAILED = "DELETE_PATIENT_INSURANCES_FAILED";
const DELETE_PATIENT_INSURANCES_ERROR = "DELETE_PATIENT_INSURANCES_ERROR";

const GET_PATIENT_INSURANCES = "GET_PATIENT_INSURANCES";
const GET_PATIENT_INSURANCES_SUCCESS = "GET_PATIENT_INSURANCES_SUCCESS";
const GET_PATIENT_INSURANCES_FAILED = "GET_PATIENT_INSURANCES_FAILED";
const GET_PATIENT_INSURANCES_ERROR = "GET_PATIENT_INSURANCES_ERROR";

const state = () => ({
  showLoader: Boolean,
  insurancecards: [],
  insurancecard: {},
  message: null,
});

const mutations = {

  [CREATE_PATIENT_INSURANCES](state) {
    state.showLoader = true;
  },
  [CREATE_PATIENT_INSURANCES_FAILED](state) {
    state.showLoader = false;
  },
  [CREATE_PATIENT_INSURANCES_ERROR](state) {
    state.showLoader = false;
    state.insurances = [];
  },
  [CREATE_PATIENT_INSURANCES_SUCCESS](state, payload) {
    state.showLoader = false;
    state.insurancecard = payload;
  },

  [UPDATE_PATIENT_INSURANCES](state) {
    state.showLoader = true;
  },
  [UPDATE_PATIENT_INSURANCES_FAILED](state) {
    state.showLoader = false;
  },
  [UPDATE_PATIENT_INSURANCES_ERROR](state) {
    state.showLoader = false;
    state.insurances = [];
  },
  [UPDATE_PATIENT_INSURANCES_SUCCESS](state, payload) {
    state.showLoader = false;
    state.insurancecard = payload;
  },

  [DELETE_PATIENT_INSURANCES](state) {
    state.showLoader = true;
  },
  [DELETE_PATIENT_INSURANCES_FAILED](state) {
    state.showLoader = false;
  },
  [DELETE_PATIENT_INSURANCES_ERROR](state) {
    state.showLoader = false;

  },
  [DELETE_PATIENT_INSURANCES_SUCCESS](state, payload) {
    state.showLoader = false;
    state.message = payload;
  },
}



const actions = {

  async create_patient_insurance({ commit }, payload) {
    commit(CREATE_PATIENT_INSURANCES);
    await this.$api.$post('insurance/cards/', payload).then(response => {
      commit(CREATE_PATIENT_INSURANCES_SUCCESS, response);
    }).catch(error => {
      commit(CREATE_PATIENT_INSURANCES_ERROR);
      console.log(error);

    });
  },

  async update_patient_insurance({ commit }, payload) {
    commit(UPDATE_PATIENT_INSURANCES);
    await this.$api.$put(`insurance/cards/${payload.id}`, payload).then(response => {
      commit(UPDATE_PATIENT_INSURANCES_SUCCESS, response);
    }).catch(error => {
      commit(UPDATE_PATIENT_INSURANCES_ERROR);
      console.log(error);

    });
  },

  async deactivate_patient_insurance_card({ commit }, payload) {
    commit(DELETE_PATIENT_INSURANCES);
    await this.$api.$put(`insurance/cards/${payload}/deactivate`).then(response => {
      commit(DELETE_PATIENT_INSURANCES_SUCCESS, response);
    }).catch(error => {
      commit(DELETE_PATIENT_INSURANCES_ERROR);
      console.log(error);

    });
  },
  async activate_patient_insurance_card({ commit }, payload) {
    commit(DELETE_PATIENT_INSURANCES);
    await this.$api.$put(`insurance/cards/${payload}/activate`).then(response => {
      commit(DELETE_PATIENT_INSURANCES_SUCCESS, response);
    }).catch(error => {
      commit(DELETE_PATIENT_INSURANCES_ERROR);
      console.log(error);

    });
  },
}

const getters = {

}


export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}

