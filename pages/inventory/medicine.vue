<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/pharmacy" class="active">{{
        $t("label.breadcrumb.phamarcy")
      }}</router-link>
    </div>
    <v-card>
      <tab-medicine :medicines="medicines" :showaction="false"></tab-medicine>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import medicineTab from "@/components/pharmacy/tabs/medicine";
export default {
  components: {
    "tab-medicine": medicineTab,
  },
  data: () => ({
    dialog: false,
    search: "",
    medicinos: null,
    tab: null,
    headers: [
      { text: "Name", value: "name", class: "primary" },
      { text: "Company", value: "company", class: "primary", sortable: false },
      { text: "Composition", value: "compositions", class: "primary" },
      { text: "Units", value: "units", class: "primary", sortable: true },
      { text: "Group", value: "group", class: "primary", sortable: true },
      { text: "Category", value: "category", class: "primary", sortable: true },
      { text: "Actions", value: "actions", class: "primary", sortable: false },
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
    fetchMedicines: function () {
      this.$store.dispatch("getmedicines");
    },
    fetchCategories: function () {
      this.$store.dispatch("getmedicinescategories");
    },
    fetchGroups: function () {
      this.$store.dispatch("getmedicinesgroups");
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
    }),
  },
};
</script>
