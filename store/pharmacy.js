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
  ["GET_MEDICINE_PRODUCTS"](state) {
    state.showLoader = true;
  },
  ["GET_MEDICINE_PRODUCTS_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_MEDICINE_PRODUCTS_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_MEDICINE_PRODUCTS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.medicines = payload;
  },


  /**Create medicine products */
  ["CREATE_NEW_MEDICINE_PRODUCT"](state) {
    state.showLoader = true;
  },
  ["CREATE_NEW_MEDICINE_PRODUCT_FAILED"](state) {
    state.showLoader = false;
  },
  ["CREATE_NEW_MEDICINE_PRODUCT_ERROR"](state) {
    state.showLoader = false;
  },
  ["CREATE_NEW_MEDICINE_PRODUCT_SUCCESS"](state, payload) {
    state.showLoader = false;
  },

  /**Update medicne product */
  ["UPDATE_MEDICINE_PRODUCT"](state) {
    state.showLoader = true;
  },
  ["UPDATE_MEDICINE_PRODUCT_FAILED"](state) {
    state.showLoader = false;
  },
  ["UPDATE_MEDICINE_PRODUCT_ERROR"](state) {
    state.showLoader = false;
  },
  ["UPDATE_MEDICINE_PRODUCT_SUCCESS"](state, payload) {
    state.showLoader = false;
  },

  /** Medicine groups */
  ["FETCH_MEDICINE_GROUPS"](state) {
    state.showLoader = true;
  },
  ["FETCH_MEDICINE_GROUPS_FAILED"](state) {
    state.showLoader = false;
  },
  ["FETCH_MEDICINE_GROUPS_ERROR"](state) {
    state.showLoader = false;
  },
  ["FETCH_MEDICINE_GROUPS_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.medicinegroups = payload;
  },

  /** UPDATE Medicine group */
  ["UPDATE_MEDICINE_GROUP"](state) {
    state.showLoader = true;
  },
  ["UPDATE_MEDICINE_GROUP_FAILED"](state) {
    state.showLoader = false;
  },
  ["UPDATE_MEDICINE_GROUP_ERROR"](state) {
    state.showLoader = false;
  },
  ["UPDATE_MEDICINE_GROUP_SUCCESS"](state, payload) {
    state.showLoader = false;
  },


  /** Medicine categories */
  ["FETCH_MEDICINE_CATEGORIES"](state) {
    state.showLoader = true;
  },
  ["FETCH_MEDICINE_CATEGORIES_FAILED"](state) {
    state.showLoader = false;
  },
  ["FETCH_MEDICINE_CATEGORIES_ERROR"](state) {
    state.showLoader = false;
  },
  ["FETCH_MEDICINE_CATEGORIES_SUCCESS"](state, payload) {
    state.showLoader = false;
    state.medicinecategories = payload;
  },

  /** Create medicine categories */
  ["CREATE_MEDICINE_CATEGORY"](state) {
    state.showLoader = true;
  },
  ["CREATE_MEDICINE_CATEGORY_FAILED"](state) {
    state.showLoader = false;
  },
  ["CREATE_MEDICINE_CATEGORY_ERROR"](state) {
    state.showLoader = false;
  },
  ["CREATE_MEDICINE_CATEGORY_SUCCESS"](state, payload) {
    state.showLoader = false;
  },

  /** UPDATE medicine categories */
  ["UPDATE_MEDICINE_CATEGORY"](state) {
    state.showLoader = true;
  },
  ["UPDATE_MEDICINE_CATEGORY_FAILED"](state) {
    state.showLoader = false;
  },
  ["UPDATE_MEDICINE_CATEGORY_ERROR"](state) {
    state.showLoader = false;
  },
  ["UPDATE_MEDICINE_CATEGORY_SUCCESS"](state, payload) {
    state.showLoader = false;
  },
  /** Create medicine group */
  ["CREATE_MEDICINE_GROUP"](state) {
    state.showLoader = true;
  },
  ["CREATE_MEDICINE_GROUP_FAILED"](state) {
    state.showLoader = false;
  },
  ["CREATE_MEDICINE_GROUP_ERROR"](state) {
    state.showLoader = false;
  },
  ["CREATE_MEDICINE_GROUP_SUCCESS"](state, payload) {
    state.showLoader = false;
  },

  /** Fetch medicine measurement units */
  ["GET_MEDICINE_MEASURES"](state) {
    state.showLoader = true;
  },
  ["GET_MEDICINE_MEASURES_FAILED"](state) {
    state.showLoader = false;
  },
  ["GET_MEDICINE_MEASURES_ERROR"](state) {
    state.showLoader = false;
  },
  ["GET_MEDICINE_MEASURES_SUCCESS"](state, payload) {
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
  /** Update medicine measurement units */
  ["UpdateMM"](state) {
    state.showLoader = true;
  },
  ["UpdateMMFailed"](state) {
    state.showLoader = false;
  },
  ["UpdateMMError"](state) {
    state.showLoader = false;
  },
  ["UpdateMMSuccess"](state, payload) {
    state.showLoader = false;
  },

}
const actions = {

  async getmedicines({ commit }) {
    commit("GET_MEDICINE_PRODUCTS");
    await this.$api.$get(`pharmacy/medicines/`)
      .then(response => {
        commit("GET_MEDICINE_PRODUCTS_SUCCESS", response);

      }).catch(error => {
        commit("GET_MEDICINE_PRODUCTS_ERROR");
        console.log(error);

      });
  },
  async add_new_medicine({ commit }, payload) {
    commit("CREATE_NEW_MEDICINE_PRODUCT");
    await this.$api.$post(`pharmacy/medicines/`, payload)
      .then(response => {
        commit("CREATE_NEW_MEDICINE_PRODUCT_SUCCESS", response);

      }).catch(error => {
        commit("CREATE_NEW_MEDICINE_PRODUCT_ERROR");
        console.log(error);

      });
  },
  async add_new_medicine_category({ commit }, payload) {
    commit("CREATE_MEDICINE_CATEGORY");
    await this.$api.$post(`pharmacy/medicines/categories/`, payload)
      .then(response => {
        commit("CREATE_MEDICINE_CATEGORY_SUCCESS", response);

      }).catch(error => {
        commit("CREATE_MEDICINE_CATEGORY_ERROR");
        console.log(error);

      });
  },
  async add_new_medicine_group({ commit }, payload) {
    commit("CREATE_MEDICINE_GROUP");
    await this.$api.$post(`pharmacy/medicines/groups/`, payload)
      .then(response => {
        commit("CREATE_MEDICINE_GROUP_SUCCESS", response);

      }).catch(error => {
        commit("CREATE_MEDICINE_GROUP_ERROR");
        console.log(error);

      });
  },
  async update_medicine_product({ commit }, payload) {
    commit("UPDATE_MEDICINE_PRODUCT");
    await this.$api.$put(`pharmacy/medicines/${payload.id}`, payload)
      .then(response => {
        commit("UPDATE_MEDICINE_PRODUCT_SUCCESS", response);

      }).catch(error => {
        commit("UPDATE_MEDICINE_PRODUCT_ERROR");
        console.log(error);

      });
  },
  async getmedicinesgroups({ commit }) {
    commit("FETCH_MEDICINE_GROUPS");
    await this.$api.$get(`pharmacy/medicines/groups/`)
      .then(response => {
        commit("FETCH_MEDICINE_GROUPS_SUCCESS", response);

      }).catch(error => {
        commit("FETCH_MEDICINE_GROUPS_ERROR");
        console.log(error);

      });
  },
  async getmedicinescategories({ commit }) {
    commit("FETCH_MEDICINE_CATEGORIES");
    await this.$api.$get(`pharmacy/medicines/categories/`)
      .then(response => {
        commit("FETCH_MEDICINE_CATEGORIES_SUCCESS", response);

      }).catch(error => {
        commit("FETCH_MEDICINE_CATEGORIES_ERROR");
        console.log(error);

      });
  },

  async update_medicine_group({ commit }, payload) {
    commit("UPDATE_MEDICINE_GROUP");
    await this.$api.$put(`pharmacy/medicines/groups/${payload.id}`, payload)
      .then(response => {
        commit("UPDATE_MEDICINE_GROUP_SUCCESS", response);

      }).catch(error => {
        commit("UPDATE_MEDICINE_GROUP_ERROR");
        console.log(error);

      });
  },
  async update_medicine_category({ commit }, payload) {
    commit("UPDATE_MEDICINE_CATEGORY");
    await this.$api.$put(`pharmacy/medicines/categories/${payload.id}`, payload)
      .then(response => {
        commit("UPDATE_MEDICINE_CATEGORY_SUCCESS", response);

      }).catch(error => {
        commit("UPDATE_MEDICINE_CATEGORY_ERROR");
        console.log(error);

      });
  },
  async fetch_medicine_measurements({ commit }) {
    commit("GET_MEDICINE_MEASURES");
    await this.$api.$get(`pharmacy/measures/`)
      .then(response => {
        commit("GET_MEDICINE_MEASURES_SUCCESS", response);

      }).catch(error => {
        commit("GET_MEDICINE_MEASURES_ERROR");
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
  },
  async update_medicine_measure({ commit }, payload) {
    commit("UpdateMM");
    await this.$api.$put(`pharmacy/measures/${payload.id}`, payload)
      .then(response => {
        commit("UpdateMMSuccess", response);

      }).catch(error => {
        commit("UpdateMMError");
        console.log(error);

      });
  },
  async delete_medicine_measure({ commit }, payload) {
    commit("UpdateMM");
    await this.$api.$delete(`pharmacy/measures/${payload}`)
      .then(response => {
        commit("UpdateMMSuccess", response);

      }).catch(error => {
        commit("UpdateMMError");
        console.log(error);

      });
  },

  async delete_medicine_category({ commit }, payload) {
    commit("UPDATE_MEDICINE_CATEGORY");
    await this.$api.$delete(`pharmacy/medicines/categories/${payload}`)
      .then(response => {
        commit("UPDATE_MEDICINE_CATEGORY_SUCCESS", response);

      }).catch(error => {
        commit("UPDATE_MEDICINE_CATEGORY_ERROR");
        console.log(error);

      });
  },

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
  },
  get_measure_by_unit: (state) => (it) => {
    return state.medicinemeasurements.find(x => x.symbol === it)
  },


}

export default {
  namespaced: false,
  state,
  mutations,
  actions,
  getters
}