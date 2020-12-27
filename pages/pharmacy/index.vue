<template>
  <div>
    <v-alert dense text type="success">
      Medicine groups and categories editing and deleting functionality is under

      <strong>developmet</strong>
    </v-alert>
    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tab
        v-for="item in items"
        :key="item.tab"
        @click.stop="handleTabNavigation(item)"
      >
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <tab-medicine :medicines="medicines"></tab-medicine>
      </v-tab-item>
      <v-tab-item>
        <tab-med-categories
          :categories="categories"
          v-on:update="fetchCategories"
        ></tab-med-categories>
      </v-tab-item>
      <v-tab-item>
        <tab-med-groups
          :groups="groups"
          v-on:update="fetchCategories"
        ></tab-med-groups>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import medicineTab from "@/components/pharmacy/tabs/medicine";
import medicineGroupsTab from "@/components/pharmacy/tabs/groups";
import medicineCategoriesTab from "@/components/pharmacy/tabs/categories";
export default {
  components: {
    "tab-medicine": medicineTab,
    "tab-med-groups": medicineGroupsTab,
    "tab-med-categories": medicineCategoriesTab
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
      { text: "Actions", value: "actions", sortable: false }
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
      units: 0
    },
    defaultItem: {
      id: 0,
      name: "",
      company: "",
      compositions: "",
      category: "",
      group: "",
      units: 0
    },
    items: [
      { id: 1, tab: "Medicines", content: "Tab 1" },
      { id: 2, tab: "Medicine Categories", content: "Tab 2 Content" },
      { id: 3, tab: "Medicine Groups", content: "Tab 2 Content" }
    ]
  }),
  created() {},
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
    fetchMedicines: function() {
      this.$store.dispatch("getmedicines");
    },
    fetchCategories: function() {
      this.$store.dispatch("getmedicinescategories");
    },
    fetchGroups: function() {
      this.$store.dispatch("getmedicinesgroups");
    },
    handleTabNavigation: function(val) {
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
      }
    },

    handleClick: function(value) {
      console.log(value);
      this.$router.push("/patients/" + value.id);
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
      this.$store.dispatch("retrieve_medicine_template");
    }
  },
  computed: {
    ...mapGetters({
      medicines: "medicines",
      categories: "medicinecategories",
      groups: "medicinegroups",
      template: "medicine_templates"
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  }
};
</script>
