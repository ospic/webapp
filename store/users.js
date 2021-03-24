const state = () => ({
  showLoader: Boolean,
  user: {},
  users: [],
  staffs: [],
  selfserviceusers: []
});

const mutations = {
  ["FETCH_APPLICATION_USERS"](state) {
    state.showLoader = true;
  },
  ["FETCH_APPLICATION_USERS_FAILED"](state) {
    state.showLoader = false;
  },
  ["FETCH_APPLICATION_USERS_ERROR"](state) {
    state.showLoader = false;
  },
  ["FETCH_APPLICATION_USERS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.users = payload;
  },
  ["CREATE_NEW_USER"](state) {
    state.showLoader = true;
  },
  ["CREATE_NEW_USER_FAILED"](state) {
    state.showLoader = false;
  },
  ["CREATE_NEW_USER_ERROR"](state) {
    state.showLoader = false;
  },
  ["CREATE_NEW_USER_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.users.push(payload)
  },
  ["FETCH_STAFFS"](state) {
    state.showLoader = true;
  },
  ["FETCH_STAFFS_FAILED"](state) {
    state.showLoader = false;
  },
  ["FETCH_STAFFS_ERROR"](state) {
    state.showLoader = false;
  },
  ["FETCH_STAFFS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.staffs = payload
  },

  ["UPDATE_STAFF"](state) {
    state.showLoader = true;
  },
  ["UPDATE_STAFF_FAILED"](state) {
    state.showLoader = false;
  },
  ["UPDATE_STAFF_ERROR"](state) {
    state.showLoader = false;
  },
  ["UPDATE_STAFF_SUCCESS"](state, payload) {
    state.showLoader = false;
  },

  /** Asign staff to department */
  ["ASSIGN_STAFF_TO_DEPARTMENT"](state) {
    state.showLoader = true;
  },
  ["ASSIGN_STAFF_TO_DEPARTMENT_FAILED"](state) {
    state.showLoader = false;
  },
  ["ASSIGN_STAFF_TO_DEPARTMENT_ERROR"](state) {
    state.showLoader = false;
  },
  ["ASSIGN_STAFF_TO_DEPARTMENT_SUCCESS"](state, payload) {
    state.showLoader = false;
  },

  /** Update user department */
  ["UPDATE_USER"](state) {
    state.showLoader = true;
  },
  ["UPDATE_USER_FAILED"](state) {
    state.showLoader = false;
  },
  ["UPDATE_USER_ERROR"](state) {
    state.showLoader = false;
  },
  ["UPDATE_USER_SUCCESS"](state, payload) {
    state.showLoader = false;
  },


  //Get self service users
  ["GET_SELF_SERVICE_USERS"](state) {
    state.showLoader = true;
  },
  ["GET_SELF_SERVICE_USERS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.selfserviceusers = payload;
  },
  ["GET_SELF_SERVICE_USERS_FAILED"](state) {
    state.showLoader = false;

  },

  //Get self service users
  ["CREATE_SERVICE_USERS"](state) {
    state.showLoader = true;
  },
  ["CREATE_SERVICE_USERS_SUCCESS"](state, payload) {
    state.showLoader = false;
  },
  ["CREATE_SERVICE_USERS_FAILED"](state) {
    state.showLoader = false;

  },

  //Get self service users
  ["DELETE_USERS"](state) {
    state.showLoader = true;
  },
  ["DELETE_USERS_SUCCESS"](state, payload) {
    state.showLoader = false;
  },
  ["DELETE_USERS_FAILED"](state) {
    state.showLoader = false;

  },

}
const actions = {
  async retrieveAllusers({ commit }) {
    commit("FETCH_APPLICATION_USERS");
    await this.$api.$get(`auth/users/?command=users`)
      .then(response => {
        commit("FETCH_APPLICATION_USERS_SUCCESS", response);
      }).catch(error => {
        commit("FETCH_APPLICATION_USERS_FAILED");
        console.log(error);

      });

  },
  async get_self_service_users({ commit }) {
    commit("GET_SELF_SERVICE_USERS");
    await this.$api.$get(`auth/users/?command=self`)
      .then(response => {
        commit("GET_SELF_SERVICE_USERS_SUCCESS", response);
      }).catch(error => {
        commit("GET_SELF_SERVICE_USERS_FAILED");
        console.log(error);
      });

  },
  async create_self_service_users({ commit }, payload) {
    commit("CREATE_SERVICE_USERS");
    await this.$api.$post(`auth/self/`, payload)
      .then(response => {
        commit("CREATE_SERVICE_USERS_SUCCESS", response);
      }).catch(error => {
        commit("CREATE_SERVICE_USERS_FAILED");
        console.log(error);

      });

  },
  async create_new_user({ commit }, payload) {
    commit("CREATE_NEW_USER");
    await this.$api.$post(`auth/signup/`, payload)
      .then(response => {
        if (response.statusCode === 200) {
          commit("CREATE_NEW_USER_SUCCESS", response);
        }

      }).catch(error => {
        commit("CREATE_NEW_USER_FAILED");
        console.log(error);

      });

  },

  async delete_user({ commit }, payload) {
    commit("DELETE_USER");
    await this.$api.$delete(`auth/self/${payload}`)
      .then(response => {
        if (response.statusCode === 200) {
          commit("DELETE_USER_SUCCESS", response);
        }
      }).catch(error => {
        commit("DELETE_USER_FAILED");
        console.log(error);
      });
  },
  async updateuserdetails({ commit }, payload) {
    commit("UPDATE_USER");
    await this.$api.$put(`auth/users/${payload.id}`, payload.data)
      .then(response => {
        console.log(response);
        if (response.statusCode === 200) {
          commit("UPDATE_USER_SUCCESS", response);
        }

      }).catch(error => {
        commit("UPDATE_USER_FAILED");
        console.log(error);
      });

  },
  async fetchAllStaffs({ commit }) {
    commit("FETCH_STAFFS");
    await this.$api.$get(`staffs/status?status=activeavailable`)
      .then(response => {
        if (response != null) {
          commit("FETCH_STAFFS_SUCCESS", response);
        }

      }).catch(error => {
        commit("FETCH_STAFFS_FAILED");
        console.log(error);

      });
  },
  async updatestaff({ commit }, payload) {
    commit("UPDATE_STAFF");
    await this.$api.$put(`staffs/${payload.id}`, payload)
      .then(response => {
        if (response != null) {
          commit("UPDATE_STAFF_SUCCESS", response);
        }

      }).catch(error => {
        commit("UPDATE_STAFF_ERROR");
        console.log(error);

      });
  },
  async assign_staff_to_departemnt({ commit }, payload) {
    commit("ASSIGN_STAFF_TO_DEPARTMENT");
    await this.$api.$post(`staffs/assign`, payload)
      .then(response => {
        if (response != null) {
          commit("ASSIGN_STAFF_TO_DEPARTMENT_SUCCESS", response);
        }

      }).catch(error => {
        commit("ASSIGN_STAFF_TO_DEPARTMENT_ERROR");
        console.log(error);

      });
  }
}
const getters = {
  users: function (state) {
    return state.users;
  },
  staffs: function (state) { return state.staffs },
  selfserviceusers: function (state) { return state.selfserviceusers }
}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}