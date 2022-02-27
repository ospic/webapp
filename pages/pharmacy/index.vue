<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/pharmacy" class="active">Pharmacy</router-link>
    </div>
    <v-card>
      <v-tabs v-model="tab" show-arrows background-color="primary" dark>
        <v-tab
          v-for="item in items"
          :key="item.tab"
          @click.stop="handleTabNavigation(item)"
        >
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items
        slider-color="blue"
        background-color="primary"
        slider-size="3"
        right
        v-model="tab"
        show-arrows-on-hover
        :show-arrows="$vuetify.breakpoint.mobile"
      >
        <v-tab-item>
          <tab-medicine
            :medicines="medicines"
            @update="fetchMedicines"
          ></tab-medicine>
        </v-tab-item>
        <v-tab-item>
          <tab-med-groups
            :groups="groups"
            @update="fetchGroups()"
          ></tab-med-groups>
        </v-tab-item>
        <v-tab-item>
          <tab-med-categories
            :categories="categories"
            @update="fetchCategories()"
          ></tab-med-categories>
        </v-tab-item>

        <v-tab-item>
          <tab-med-measurement
            :measures="medicinemeasurements"
            @update="fetchMedicineMeasureUnits()"
          ></tab-med-measurement>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import medicineTab from "@/components/pharmacy/tabs/medicine";
import medicineGroupsTab from "@/components/pharmacy/tabs/groups";
import medicineCategoriesTab from "@/components/pharmacy/tabs/categories";
import measurementTab from "@/components/pharmacy/tabs/measurement";
export default {
  components: {
    "tab-medicine": medicineTab,
    "tab-med-groups": medicineGroupsTab,
    "tab-med-categories": medicineCategoriesTab,
    "tab-med-measurement": measurementTab,
  },
  data: () => ({
    dialog: false,
    search: "",
    medicinos: null,
    tab: null,
    headers: [
      { text: "Name", value: "name" },
      { text: "Company", value: "company", sortable: false },
      { text: "Composition", value: "compositions" },
      { text: "Units", value: "units", sortable: true },
      { text: "Group", value: "group", sortable: true },
      { text: "Category", value: "category", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItemId: "",
    editedItem: {
      id: 0,
      name: "",
      company: "",
      compositions: "",
      category: "",
      group: "",
      units: 0,
    },
    defaultItem: {
      id: 0,
      name: "",
      company: "",
      compositions: "",
      category: "",
      group: "",
      units: 0,
    },
    items: [
      { id: 1, tab: "Medicines", content: "Tab 1" },
      { id: 3, tab: "Medicine Groups", content: "Tab 2 Content" },
      { id: 2, tab: "Medicine Categories", content: "Tab 2 Content" },
      { id: 4, tab: "Measurement units", content: "Tab measures " },
    ],
  }),
  created() {
    this.fetchGroups();
  },
  beforeMount() {
    this.$store.dispatch("getmedicines");
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.medicines.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editedItemId = item.id;
    },
    fetchMedicines: function () {
      this.$store.dispatch("getmedicines");
    },
    fetchCategories: function () {
      this.$store.dispatch("getmedicinescategories");
    },
    fetchGroups: function () {
      this.$store.dispatch("getmedicinesgroups");
    },
    fetchMedicineMeasureUnits: function () {
      this.$store.dispatch("fetch_medicine_measurements");
    },
    handleTabNavigation: function (val) {
      switch (val.id) {
        case 1:
          this.fetchMedicines();
          break;
        case 2:
          this.fetchCategories();
          break;
        case 3:
          this.fetchGroups();
          break;
        case 4:
          this.fetchMedicineMeasureUnits();
          break;
      }
    },

    handleClick: function (value) {
      console.log(value);
      this.$router.push("/patients/" + value.id);
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
      this.$store.dispatch("retrieve_medicine_template");
    },
  },
  computed: {
    ...mapGetters({
      medicines: "medicines",
      categories: "medicinecategories",
      groups: "medicinegroups",
      template: "medicine_templates",
      medicinemeasurements: "medicinemeasurements",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
};
</script>
