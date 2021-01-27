import * as mutation from './mutation-types';
const state = () => ({
  showLoader: Boolean,
  medicine: {},
  medicines: [],
  medicinecategories: [],
  medicinegroups: [],
  medicinemeasurements: [],
});

const mutations = {
  /** Get medicine's  products */
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
    state.medicines = payload.body;
  },


  /**Create medicine products */
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

  /**Update medicne product */
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

  /** Medicine groups */
  [mutation.FETCH_MEDICINE_GROUPS](state) {
    state.showLoader = true;
  },
  [mutation.FETCH_MEDICINE_GROUPS_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_MEDICINE_GROUPS_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_MEDICINE_GROUPS_SUCCESS](state, payload) {
    state.showLoader = false;
    state.medicinegroups = payload;
  },

  /** UPDATE Medicine group */
  [mutation.UPDATE_MEDICINE_GROUP](state) {
    state.showLoader = true;
  },
  [mutation.UPDATE_MEDICINE_GROUP_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_MEDICINE_GROUP_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_MEDICINE_GROUP_SUCCESS](state, payload) {
    state.showLoader = false;
  },


  /** Medicine categories */
  [mutation.FETCH_MEDICINE_CATEGORIES](state) {
    state.showLoader = true;
  },
  [mutation.FETCH_MEDICINE_CATEGORIES_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_MEDICINE_CATEGORIES_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.FETCH_MEDICINE_CATEGORIES_SUCCESS](state, payload) {
    state.showLoader = false;
    state.medicinecategories = payload;
  },

  /** Create medicine categories */
  [mutation.CREATE_MEDICINE_CATEGORY](state) {
    state.showLoader = true;
  },
  [mutation.CREATE_MEDICINE_CATEGORY_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_MEDICINE_CATEGORY_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_MEDICINE_CATEGORY_SUCCESS](state, payload) {
    state.showLoader = false;
  },

  /** UPDATE medicine categories */
  [mutation.UPDATE_MEDICINE_CATEGORY](state) {
    state.showLoader = true;
  },
  [mutation.UPDATE_MEDICINE_CATEGORY_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_MEDICINE_CATEGORY_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.UPDATE_MEDICINE_CATEGORY_SUCCESS](state, payload) {
    state.showLoader = false;
  },
  /** Create medicine group */
  [mutation.CREATE_MEDICINE_GROUP](state) {
    state.showLoader = true;
  },
  [mutation.CREATE_MEDICINE_GROUP_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_MEDICINE_GROUP_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.CREATE_MEDICINE_GROUP_SUCCESS](state, payload) {
    state.showLoader = false;
  },

  /** Fetch medicine measurement units */
  [mutation.GET_MEDICINE_MEASURES](state) {
    state.showLoader = true;
  },
  [mutation.GET_MEDICINE_MEASURES_FAILED](state) {
    state.showLoader = false;
  },
  [mutation.GET_MEDICINE_MEASURES_ERROR](state) {
    state.showLoader = false;
  },
  [mutation.GET_MEDICINE_MEASURES_SUCCESS](state, payload) {
    state.showLoader = false;
    state.medicinemeasurements = payload;
  },

  /** Create new medicine measurement units */
  ["CREATE_MEDICINE_MEASURES"](state) {
    state.showLoader = true;
  },
  ["CREATE_MEDICINE_MEASURES_FAILED"](state) {
    state.showLoader = false;
  },
  ["CREATE_MEDICINE_MEASURES_ERROR"](state) {
    state.showLoader = false;
  },
  ["CREATE_MEDICINE_MEASURES_SUCCESS"](state, payload) {
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
  async add_new_medicine_category({ commit }, payload) {
    commit(mutation.CREATE_MEDICINE_CATEGORY);
    await this.$api.$post(`pharmacy/medicines/categories/`, payload)
      .then(response => {
        commit(mutation.CREATE_MEDICINE_CATEGORY_SUCCESS, response);

      }).catch(error => {
        commit(mutation.CREATE_MEDICINE_CATEGORY_ERROR);
        console.log(error);

      });
  },
  async add_new_medicine_group({ commit }, payload) {
    commit(mutation.CREATE_MEDICINE_GROUP);
    await this.$api.$post(`pharmacy/medicines/groups/`, payload)
      .then(response => {
        commit(mutation.CREATE_MEDICINE_GROUP_SUCCESS, response);

      }).catch(error => {
        commit(mutation.CREATE_MEDICINE_GROUP_ERROR);
        console.log(error);

      });
  },
  async update_medicine_product({ commit }, payload) {
    commit(mutation.UPDATE_MEDICINE_PRODUCT);
    await this.$api.$put(`pharmacy/medicines/${payload.id}`, payload)
      .then(response => {
        commit(mutation.UPDATE_MEDICINE_PRODUCT_SUCCESS, response);

      }).catch(error => {
        commit(mutation.UPDATE_MEDICINE_PRODUCT_ERROR);
        console.log(error);

      });
  },
  async getmedicinesgroups({ commit }) {
    commit(mutation.FETCH_MEDICINE_GROUPS);
    await this.$api.$get(`pharmacy/medicines/groups/`)
      .then(response => {
        commit(mutation.FETCH_MEDICINE_GROUPS_SUCCESS, response);

      }).catch(error => {
        commit(mutation.FETCH_MEDICINE_GROUPS_ERROR);
        console.log(error);

      });
  },
  async getmedicinescategories({ commit }) {
    commit(mutation.FETCH_MEDICINE_CATEGORIES);
    await this.$api.$get(`pharmacy/medicines/categories/`)
      .then(response => {
        commit(mutation.FETCH_MEDICINE_CATEGORIES_SUCCESS, response);

      }).catch(error => {
        commit(mutation.FETCH_MEDICINE_CATEGORIES_ERROR);
        console.log(error);

      });
  },

  async update_medicine_group({ commit }, payload) {
    commit(mutation.UPDATE_MEDICINE_GROUP);
    await this.$api.$put(`pharmacy/medicines/groups/${payload.id}`, payload)
      .then(response => {
        commit(mutation.UPDATE_MEDICINE_GROUP_SUCCESS, response);

      }).catch(error => {
        commit(mutation.UPDATE_MEDICINE_GROUP_ERROR);
        console.log(error);

      });
  },
  async update_medicine_category({ commit }, payload) {
    commit(mutation.UPDATE_MEDICINE_CATEGORY);
    await this.$api.$put(`pharmacy/medicines/categories/${payload.id}`, payload)
      .then(response => {
        commit(mutation.UPDATE_MEDICINE_CATEGORY_SUCCESS, response);

      }).catch(error => {
        commit(mutation.UPDATE_MEDICINE_CATEGORY_ERROR);
        console.log(error);

      });
  },
  async fetch_medicine_measurements({ commit }) {
    commit(mutation.GET_MEDICINE_MEASURES);
    await this.$api.$get(`pharmacy/measures/`)
      .then(response => {
        commit(mutation.GET_MEDICINE_MEASURES_SUCCESS, response);

      }).catch(error => {
        commit(mutation.GET_MEDICINE_MEASURES_ERROR);
        console.log(error);

      });
  },
   async create_medicine_measurement({ commit }, payload) {
    commit("CREATE_MEDICINE_MEASURES");
    await this.$api.$post(`pharmacy/measures/`, payload)
      .then(response => {
        commit("CREATE_MEDICINE_MEASURES_SUCCESS", response);

      }).catch(error => {
        commit("CREATE_MEDICINE_MEASURES_ERROR");
        console.log(error);

      });
  }

}
const getters = {
  medicines: function (state, getters) {
    return state.medicines
  },
  medicinegroups: function (state, getters) {
    return state.medicinegroups;
  },
  medicinecategories: function (state) {
    return state.medicinecategories;
  },
  medicinemeasurements: function (state) {
    return state.medicinemeasurements;
  }


}

export default {
  state,
  mutations,
  actions,
  getters
}