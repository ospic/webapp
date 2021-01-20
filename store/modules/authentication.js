import * as mutation from './mutation-types';

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

  [mutation.SIGNIN](state) {
    state.showLoader = true;
  },
  [mutation.SIGNIN_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.SIGNIN_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.SIGNIN_SUCCESS](state, payload) {
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
  [mutation.SIGNOUT](state) {
    state.showLoader = true;
    state.userdata = null;
    state.isAuthenticated = false;

    this.$router.push('/signin');
  },
  [mutation.SIGNOUT_SUCCESS](state) {
    state.showLoader = false;
    state.userdata = null;
    window.localStorage.clear();
    sessionStorage.clear();
    this.$router.push('/signin');
  },
  [mutation.SIGNOUT_FAILED](state) {
    state.showLoader = false;
  },


  /**User roles */
  [mutation.FETCH_ROLES](state) {
    state.showLoader = true;
  },
  [mutation.FETCH_ROLES_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_ROLES_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_ROLES_SUCCESS](state, payload) {
    state.showLoader = false;
    state.roles = payload;
  },


  /** Role privileges */
  [mutation.REQUEST_PRIVILEGES](state) {
    state.showLoader = true;
  },
  [mutation.REQUEST_PRIVILEGES_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.REQUEST_PRIVILEGES_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.REQUEST_PRIVILEGES_SUCCESS](state, payload) {
    state.showLoader = false;
    state.privileges = payload;
  }
};
const actions = {
  async _authenticate_then_login({ commit }, payload) {
    commit(mutation.SIGNIN);
    await this.$api.$post(`auth/signin`, payload)
      .then(response => {
        if (response) {
          commit(mutation.SIGNIN_SUCCESS, response);

        }

      }).catch(error => {
        commit(mutation.SIGNIN_ERROR);
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
    commit(mutation.SIGNOUT)
    /**await this.$api.$get(`auth/signout`)
      .then(response => {
        if (response.result == 'OK') {
          commit(mutation.SIGNOUT_SUCCESS);

        }


      }).catch(error => {
        commit(mutation.SIGNOUT_FAILED);

      });
    **/
  },
  async fetchuserroles({ commit }) {
    commit(mutation.FETCH_ROLES);
    await this.$api.$get(`auth/roles/`).then(response => {
      if (response != null) {
        commit(mutation.FETCH_ROLES_SUCCESS, response)
      }
    }).catch(error => {
      commit(mutation.FETCH_ROLES_FAILED);
      console.log(error);

    });
  },
  async request_role_privileges({ commit }) {
    commit(mutation.REQUEST_PRIVILEGES);
    await this.$api.$get(`auth/authorities/`).then(response => {
      commit(mutation.REQUEST_PRIVILEGES_SUCCESS, response)
    }).catch(error => {
      commit(mutation.REQUEST_PRIVILEGES_FAILED);
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
  }
};
export default {
  state,
  getters,
  mutations,
  actions,
};
