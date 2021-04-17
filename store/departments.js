const state = () => ({
  showLoader: Boolean,
  departments: [],
  department: {}
});

const mutations = {
  //CREATE DEPARTMENT
  ["CREATE_DEPARTMENT"](state) {
    state.showLoader = true;
  },
  ["CREATE_DEPARTMENT_FAILED"](state) {
    state.showLoader = false;
  },
  ["CREATE_DEPARTMENT_ERROR"](state) {
    state.showLoader = false;
  },
  ["CREATE_DEPARTMENT_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.department = payload;
  },

  //GET DEPARTMENTS
  ["GET_DEPARTMENTS"](state) {
    state.showLoader = true;
  },
  ["GET_DEPARTMENTS_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_DEPARTMENTS_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_DEPARTMENTS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.departments = payload;
  },

  //UPDATE DEPARTMENTS
  ["UPDATE_DEPARTMENT"](state) {
    state.showLoader = true;
  },
  ["UPDATE_DEPARTMENT_FAILED"](state) {
    state.showLoader = false;
  },
  ["UPDATE_DEPARTMENT_ERROR"](state) {
    state.showLoader = false;
  },
  ["UPDATE_DEPARTMENT_SUCCESS"](state, payload) {
    state.showLoader = false;
  },
}

const actions = {

  async create_department({ commit }, payload) {
    commit("CREATE_DEPARTMENT");
    await this.$api.$post('departments/', payload)
      .then(response => {
        console.log(response)
        commit("CREATE_DEPARTMENT_SUCCESS", response);
      }).catch(error => {
        commit("CREATE_DEPARTMENT_ERROR");
        console.log(error);
      });
  },

  async update_department({ commit }, payload) {
    commit("UPDATE_DEPARTMENT");
    await this.$api.$put(`departments/${payload.id}`, payload)
      .then(response => {
        console.log(response)
        commit("UPDATE_DEPARTMENT_SUCCESS", response);
      }).catch(error => {
        commit("UPDATE_DEPARTMENT_ERROR");
        console.log(error);
      });
  },


  async retrieve_departments({ commit }) {
    commit("GET_DEPARTMENTS");
    await this.$api.$get('departments/')
      .then(response => {
        commit("GET_DEPARTMENTS_SUCCESS", response);
      }).catch(error => {
        commit("GET_DEPARTMENTS_ERROR");
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
