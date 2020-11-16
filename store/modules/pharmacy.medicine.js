import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  medicine: {},
  medicines: []
});

const mutations = {
  [mutation.GET_MEDICINE_PRODUCTS](state) {
    state.showLoader = true;
  },
  [mutation.GET_MEDICINE_PRODUCTS_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.GET_MEDICINE_PRODUCTS_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.GET_MEDICINE_PRODUCTS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.medicines = payload;
  },

  [mutation.CREATE_NEW_MEDICINE_PRODUCT](state) {
    state.showLoader = true;
  },
  [mutation.CREATE_NEW_MEDICINE_PRODUCT_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_NEW_MEDICINE_PRODUCT_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_NEW_MEDICINE_PRODUCT_SUCCESS](state, payload) {
    state.showLoader = false;
  },


  [mutation.UPDATE_MEDICINE_PRODUCT](state) {
    state.showLoader = true;
  },
  [mutation.UPDATE_MEDICINE_PRODUCT_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_MEDICINE_PRODUCT_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_MEDICINE_PRODUCT_SUCCESS](state, payload) {
    state.showLoader = false;
  },



}
const actions = {

  async getmedicines({ commit }) {
    commit(mutation.GET_MEDICINE_PRODUCTS);
    await this.$api.$get(`pharmacy/medicines/`)
      .then(response => {
        commit(mutation.GET_MEDICINE_PRODUCTS_SUCCESS, response);

      }).catch(error => {
        commit(mutation.GET_MEDICINE_PRODUCTS_ERROR);
        console.log(error);

      });
  },
  async add_new_medicine({ commit }, payload) {
    commit(mutation.CREATE_NEW_MEDICINE_PRODUCT);
    await this.$api.$post(`pharmacy/medicines/`, payload)
      .then(response => {
        commit(mutation.CREATE_NEW_MEDICINE_PRODUCT_SUCCESS, response);

      }).catch(error => {
        commit(mutation.CREATE_NEW_MEDICINE_PRODUCT_ERROR);
        console.log(error);

      });
  },

  async update_medicine_product({ commit }, id, payload) {
    commit(mutation.UPDATE_MEDICINE_PRODUCT);
    await this.$api.$put(`pharmacy/medicines/${id}`, payload)
      .then(response => {
        commit(mutation.UPDATE_MEDICINE_PRODUCT_SUCCESS, response);

      }).catch(error => {
        commit(mutation.UPDATE_MEDICINE_PRODUCT_ERROR);
        console.log(error);

      });
  },

}
const getters = {
  medicines: function (state, getters) {
    return state.medicines.reverse();
  },

}

export default {
  state,
  mutations,
  actions,
  getters
}