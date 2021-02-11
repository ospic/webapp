import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  departments: [],
  department: {}
});

const mutations = {
  //CREATE DEPARTMENT
  [mutation.CREATE_DEPARTMENT](state) {
    state.showLoader = true;
  },
  [mutation.CREATE_DEPARTMENT_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_DEPARTMENT_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_DEPARTMENT_SUCCESS](state, payload) {
    state.showLoader = false;
    state.department = payload;
  },

  //GET DEPARTMENTS
  [mutation.GET_DEPARTMENTS](state) {
    state.showLoader = true;
  },
  [mutation.GET_DEPARTMENTS_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.GET_DEPARTMENTS_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.GET_DEPARTMENTS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.departments = payload;
  },
}

const actions = {

  async create_department({ commit }, payload) {
    commit(mutation.CREATE_DEPARTMENT);
    await this.$api.$post('departments/', payload)
      .then(response => {
        console.log(response)
        commit(mutation.CREATE_DEPARTMENT_SUCCESS, response);
      }).catch(error => {
        commit(mutation.CREATE_DEPARTMENT_ERROR);
        console.log(error);

      });

  },

  async retrieve_departments({ commit }) {
    commit(mutation.GET_DEPARTMENTS);
    await this.$api.$get('departments/')
      .then(response => {
        commit(mutation.GET_DEPARTMENTS_SUCCESS, response);
      }).catch(error => {
        commit(mutation.GET_DEPARTMENTS_ERROR);
        console.log(error);

      });

  }
}
const getters = {
  departments: function (state) {
    return state.departments;
  },


}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}
