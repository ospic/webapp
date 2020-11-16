import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  template: {},
  templates: []
});

const mutations = {
  [mutation.MEDICINE_TEMPLATE](state) {
    state.showLoader = true;
  },
  [mutation.MEDICINE_TEMPLATE_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.MEDICINE_TEMPLATE_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.MEDICINE_TEMPLATE_SUCCESS](state, payload) {
    state.showLoader = false;
    state.templates = payload;
  },


}
const actions = {
  async retrieve_medicine_template({ commit }) {
    commit(mutation.MEDICINE_TEMPLATE);
    await this.$api.$get(`pharmacy/medicines/template/`)
      .then(response => {
        commit(mutation.MEDICINE_TEMPLATE_SUCCESS, response);
      }).catch(error => {
        commit(mutation.MEDICINE_TEMPLATE_FAILED);
        console.log(error);

      });

  }

}
const getters = {
  medicine_templates: function (state) {
    return state.templates;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}