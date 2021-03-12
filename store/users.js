import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  user: {},
  users: [],
  staffs: [],
  selfserviceusers: []
});

const mutations = {
  [mutation.FETCH_APPLICATION_USERS](state) {
    state.showLoader = true;
  },
  [mutation.FETCH_APPLICATION_USERS_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_APPLICATION_USERS_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_APPLICATION_USERS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.users = payload;
  },
  [mutation.CREATE_NEW_USER](state) {
    state.showLoader = true;
  },
  [mutation.CREATE_NEW_USER_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_NEW_USER_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_NEW_USER_SUCCESS](state, payload) {
    state.showLoader = false;
    state.users.push(payload)
  },
  [mutation.FETCH_STAFFS](state) {
    state.showLoader = true;
  },
  [mutation.FETCH_STAFFS_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_STAFFS_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_STAFFS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.staffs = payload
  },

  [mutation.UPDATE_STAFF](state) {
    state.showLoader = true;
  },
  [mutation.UPDATE_STAFF_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_STAFF_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_STAFF_SUCCESS](state, payload) {
    state.showLoader = false;
  },

  /** Asign staff to department */
  [mutation.ASSIGN_STAFF_TO_DEPARTMENT](state) {
    state.showLoader = true;
  },
  [mutation.ASSIGN_STAFF_TO_DEPARTMENT_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.ASSIGN_STAFF_TO_DEPARTMENT_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.ASSIGN_STAFF_TO_DEPARTMENT_SUCCESS](state, payload) {
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

}
const actions = {
  async retrieveAllusers({ commit }) {
    commit(mutation.FETCH_APPLICATION_USERS);
    await this.$api.$get(`auth/users/?command=users`)
      .then(response => {
        commit(mutation.FETCH_APPLICATION_USERS_SUCCESS, response);


      }).catch(error => {
        commit(mutation.FETCH_APPLICATION_USERS_FAILED);
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
    commit(mutation.CREATE_NEW_USER);
    await this.$api.$post(`auth/signup/`, payload)
      .then(response => {
        console.log(response);
        if (response.statusCode === 200) {
          commit(mutation.CREATE_NEW_USER_SUCCESS, response);
        }

      }).catch(error => {
        commit(mutation.CREATE_NEW_USER_FAILED);
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
    commit(mutation.FETCH_STAFFS);
    await this.$api.$get(`staffs/status?status=activeavailable`)
      .then(response => {
        if (response != null) {
          commit(mutation.FETCH_STAFFS_SUCCESS, response);
        }

      }).catch(error => {
        commit(mutation.FETCH_STAFFS_FAILED);
        console.log(error);

      });
  },
  async updatestaff({ commit }, payload) {
    commit(mutation.UPDATE_STAFF);
    await this.$api.$put(`staffs/${payload.id}`, payload)
      .then(response => {
        if (response != null) {
          commit(mutation.UPDATE_STAFF_SUCCESS, response);
        }

      }).catch(error => {
        commit(mutation.UPDATE_STAFF_ERROR);
        console.log(error);

      });
  },
  async assign_staff_to_departemnt({ commit }, payload) {
    commit(mutation.ASSIGN_STAFF_TO_DEPARTMENT);
    await this.$api.$post(`staffs/assign`, payload)
      .then(response => {
        if (response != null) {
          commit(mutation.ASSIGN_STAFF_TO_DEPARTMENT_SUCCESS, response);
        }

      }).catch(error => {
        commit(mutation.ASSIGN_STAFF_TO_DEPARTMENT_ERROR);
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