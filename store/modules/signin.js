import * as mutation from './mutation-types';
const state = () => ({
  userdata: {},
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
    state.showLoader = false;
    state.userdata = payload;
    var response = payload;
    if (window.localStorage) {
      console.log("Window loaded")

      window.localStorage.setItem('ospic.token', response.accessToken);
      window.localStorage.setItem('ospic.roles', response.roles);
      window.localStorage.setItem('ospic.email', response.email);
      window.localStorage.setItem('ospic.tokentype', response.tokenType);
      window.localStorage.setItem('ospic.uid', response.id);
      window.localStorage.setItem('ospic.username', response.username);
      sessionStorage.setItem('ospic.token', response.accessToken)
      window.localStorage.setItem("ospic.time", new Date());
      this.$cookies.set('ospic.tokentype', response.tokenType, { path: '/', maxAge: 60 * 60 * 24 * 1 });
      this.$cookies.set('ospic.token', response.accessToken, { path: '/', maxAge: 60 * 60 * 24 * 1 });
    }
    //this.$router.app.refresh()

    // console.log(localStorage.getItem('ospic.token'))

    this.$router.push('/');
  },
  [mutation.SIGNOUT](state) {
    state.showLoader = true;
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
};
const actions = {
  async login({ commit }, payload) {
    commit(mutation.SIGNIN);
    await this.$api.$post(`auth/signin`, payload)
      .then(response => {
        if (response.accessToken != null) {
          commit(mutation.SIGNIN_SUCCESS, response);

        }


      }).catch(error => {
        commit(mutation.SIGNIN_ERROR);
        localStorage.removeItem('ospic');
        console.log(error);

      });
  },

  clearlocal({ commit }) {
    window.localStorage.clear();
    localStorage.removeItem('ospic.*');
    sessionStorage.clear();
    this.$router.push('/signin');
  },
  async logout({ commit }) {
    await this.$api.$get(`auth/signout`)
      .then(response => {
        if (response.result == 'OK') {
          commit(mutation.SIGNOUT_SUCCESS);

        }


      }).catch(error => {
        commit(mutation.SIGNOUT_FAILED);

      });
  },

};
const getters = {
  isLoggedIn: function (state) {
    return (window.localStorage.getItem('ospic.token') && window.localStorage.getItem('ospic.tokentype')) !== null;
  },
  userInfos: function (state) {
    return state.userdata;
  }
};
export default {
  state,
  getters,
  mutations,
  actions,
};
