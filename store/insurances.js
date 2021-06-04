const CREATE_INSURANCES = "CREATE_INSURANCES";
const CREATE_INSURANCES_SUCCESS = "CREATE_INSURANCES_SUCCESS";
const CREATE_INSURANCES_FAILED = "CREATE_INSURANCES_FAILED";
const CREATE_INSURANCES_ERROR = "CREATE_INSURANCES_ERROR";

const UPDATE_INSURANCES = "UPDATE_INSURANCES";
const UPDATE_INSURANCES_SUCCESS = "UPDATE_INSURANCES_SUCCESS";
const UPDATE_INSURANCES_FAILED = "UPDATE_INSURANCES_FAILED";
const UPDATE_INSURANCES_ERROR = "UPDATE_INSURANCES_ERROR";

const DELETE_INSURANCES = "DELETE_INSURANCES";
const DELETE_INSURANCES_SUCCESS = "DELETE_INSURANCES_SUCCESS";
const DELETE_INSURANCES_FAILED = "DELETE_INSURANCES_FAILED";
const DELETE_INSURANCES_ERROR = "DELETE_INSURANCES_ERROR";

const GET_INSURANCES = "GET_INSURANCES";
const GET_INSURANCES_SUCCESS = "GET_INSURANCES_SUCCESS";
const GET_INSURANCES_FAILED = "GET_INSURANCES_FAILED";
const GET_INSURANCES_ERROR = "GET_INSURANCES_ERROR";





const state = () => ({
  showLoader: Boolean,
  insurances: [],
  insurance: {},
});

const mutations = {
  /**Fetch bills */

  [GET_INSURANCES](state) {
    state.showLoader = true;
  },
  [GET_INSURANCES_FAILED](state) {
    state.showLoader = false;
  },
  [GET_INSURANCES_ERROR](state) {
    state.showLoader = false;
    state.insurances = [];
  },
  [GET_INSURANCES_SUCCESS](state, payload) {
    state.showLoader = false;
    state.insurances = payload;
  },

  [CREATE_INSURANCES](state) {
    state.showLoader = true;
  },
  [CREATE_INSURANCES_FAILED](state) {
    state.showLoader = false;
  },
  [CREATE_INSURANCES_ERROR](state) {
    state.showLoader = false;
  },
  [CREATE_INSURANCES_SUCCESS](state, payload) {
    state.showLoader = false;
    state.insurance = payload;
  },

  [UPDATE_INSURANCES](state) {
    state.showLoader = true;
  },
  [UPDATE_INSURANCES_FAILED](state) {
    state.showLoader = false;
  },
  [UPDATE_INSURANCES_ERROR](state) {
    state.showLoader = false;
  },
  [UPDATE_INSURANCES_SUCCESS](state, payload) {
    state.showLoader = false;
    state.insurance = payload;
  },

  [DELETE_INSURANCES](state) {
    state.showLoader = true;
  },
  [DELETE_INSURANCES_FAILED](state) {
    state.showLoader = false;
  },
  [DELETE_INSURANCES_ERROR](state) {
    state.showLoader = false;
  },
  [DELETE_INSURANCES_SUCCESS](state, payload) {
    state.showLoader = false;
    state.insurance = payload;
  },

}

const actions = {

  async get_insurance_companies({ commit }) {
    commit(GET_INSURANCES);
    await this.$api.$get('insurances/').then(response => {
      commit(GET_INSURANCES_SUCCESS, response);
    }).catch(error => {
      commit(GET_INSURANCES_ERROR);
      console.log(error);

    });
  },

  async create_insurance({ commit }, payload) {
    commit(CREATE_INSURANCES);
    await this.$api.$post('insurances/', payload).then(response => {
      commit(CREATE_INSURANCES_SUCCESS, response);
    }).catch(error => {
      commit(CREATE_INSURANCES_ERROR);
      console.log(error);

    });
  },

  async update_insurance({ commit }, payload) {
    commit(UPDATE_INSURANCES);
    await this.$api.$put(`insurances/${payload.id}`, payload).then(response => {
      commit(UPDATE_INSURANCES_SUCCESS, response);
    }).catch(error => {
      commit(UPDATE_INSURANCES_ERROR);
      console.log(error);

    });
  },

  async delete_insurance({ commit }, payload) {
    commit(DELETE_INSURANCES);
    await this.$api.$delete(`insurances/${payload}`).then(response => {
      commit(DELETE_INSURANCES_SUCCESS, response);
    }).catch(error => {
      commit(DELETE_INSURANCES_ERROR);
      console.log(error);

    });
  },


}
const getters = {
  insurances: function (state) {
    return state.insurances;
  },
  insurance: (state) => (id) => {
    return state.insurances.find(insurance => insurance.id == id)
  },

}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}
