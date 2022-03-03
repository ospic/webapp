const state = () => ({
  showLoader: Boolean,
  isAuthenticated: Boolean,
  userdata: {},
  roles: [],
  exipiredate: '',
  privileges: [],
  accessToken: "",
});

const mutations = {

  ["SIGNIN"](state) {
    state.showLoader = true;
  },
  ["SIGNIN_FAILED"](state) {
    state.showLoader = false;
  },
  ["SIGNIN_ERROR"](state) {
    state.showLoader = false;
  },
  ["SIGNIN_SUCCESS"](state, payload) {
    state.isAuthenticated = true;
    state.showLoader = false;

    this.$toast.success('Welcome, ' + payload.username);
    var d = new Date();
    var n = d.getTime();
    var mil = n + 86400000;
    var date = new Date(mil);

    state.exipiredate = date;
    state.userdata = payload;
    var response = payload;
    state.accessToken = response.accessToken;
    if (window.localStorage) {
      window.localStorage.setItem('date', mil);
    }
    this.$router.push('/');
  },
  ["SIGNOUT"](state) {
    state.showLoader = true;
    state.userdata = null;
    state.isAuthenticated = false;

    this.$router.push('/signin');
  },
  ["SIGNOUT_SUCCESS"](state) {
    state.showLoader = false;
    state.userdata = null;
    window.localStorage.clear();
    sessionStorage.clear();
    this.$router.push('/signin');
  },
  ["SIGNOUT_FAILED"](state) {
    state.showLoader = false;
  },


  /**User roles */
  ["FETCH_ROLES"](state) {
    state.showLoader = true;
  },
  ["FETCH_ROLES_ERROR"](state) {
    state.showLoader = false;
  },
  ["FETCH_ROLES_FAILED"](state) {
    state.showLoader = false;
  },
  ["FETCH_ROLES_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.roles = payload;
  },


  /** create role  */
  ["CREATE_ROLE"](state) {
    state.showLoader = true;
  },
  ["CREATE_ROLE_ERROR"](state) {
    state.showLoader = false;
  },
  ["CREATE_ROLE_FAILED"](state) {
    state.showLoader = false;
  },
  ["CREATE_ROLE_SUCCESS"](state, payload) {
    state.showLoader = false;
  },


  /** Role privileges */
  ["REQUEST_PRIVILEGES"](state) {
    state.showLoader = true;
  },
  ["REQUEST_PRIVILEGES_ERROR"](state) {
    state.showLoader = false;
  },
  ["REQUEST_PRIVILEGES_FAILED"](state) {
    state.showLoader = false;
  },
  ["REQUEST_PRIVILEGES_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.privileges = payload;
  }
};
const actions = {
  async _authenticate_then_login({ commit }, payload) {
    commit("SIGNIN");
    await this.$authapi.$post(`auth/signin`, payload, { params: { tenant: window.location.hostname.split('.')[0] } })
      .then(response => {
        if (response) {
          commit("SIGNIN_SUCCESS", response);

        }

      }).catch(error => {
        commit("SIGNIN_ERROR");
        localStorage.clear();

      });
  },

  _clear_local_storage_and_sign_out({ commit }) {
    window.localStorage.clear();
    localStorage.removeItem('ospic.*');
    sessionStorage.clear();
    this.$router.push('/signin');
  },
  async logout({ commit }) {
    commit("SIGNOUT")
  },
  async update_role_privileges({ commit }, id, payload) {
    console.log(id);
    console.log(payload)
    return await this.$api
      .$put(`auth/roles/${id}/`, payload)
      .then(response => {
        this.$router.push(`roles/${id}`);
        //this.request_data();
      })
      .catch(error => {
        console.log(error);
      });
  },
  async fetchuserroles({ commit }) {
    commit("FETCH_ROLES");
    await this.$api.$get(`auth/roles/`).then(response => {
      commit("FETCH_ROLES_SUCCESS", response)
    }).catch(error => {
      commit("FETCH_ROLES_FAILED");
      console.log(error);

    });
  },
  async request_role_privileges({ commit }) {
    commit("REQUEST_PRIVILEGES");
    await this.$api.$get(`auth/authorities/`).then(response => {
      commit("REQUEST_PRIVILEGES_SUCCESS", response)
    }).catch(error => {
      commit("REQUEST_PRIVILEGES_FAILED");
      console.log(error);

    });
  },
  async create_role({ commit }, payload) {
    commit("CREATE_ROLE");
    await this.$api.$post(`auth/roles/`, payload).then(response => {
      commit("CREATE_ROLE_SUCCESS", response)
    }).catch(error => {
      commit("CREATE_ROLE_FAILED");
      console.log(error);

    });
  }
};
const getters = {
  isLoggedIn: function (state) {
    const exipire = window.localStorage.getItem('date');
    const status = ((typeof exipire == 'undefined' ? new Date().getTime() - 2 : exipire) - new Date().getTime()) > 0;
    return status;
  },
  exipireddate: function (state) {
    return state.exipiredate;
  },
  userInfos: function (state) {
    return state.userdata;
  },
  userroles: function (state) {
    return state.roles;
  },
  privileges: function (state) {
    return state.privileges;
  },
  role: (state) => (id) => {
    return state.roles.find(role => role.id === id)
  },
  accessToken: function (state) {
    return state.accessToken;
  },
  thisuserroles: function (state) {
    return state.userdata.roles;
  },
  thisuserpermissions: function (state) {
    return state.userdata.permissions;
  }
};
export default {
  namespaced: false,
  state,
  getters,
  mutations,
  actions,
};
