<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/patients" class="active">{{
        $t("label.breadcrumb.patients")
      }}</router-link>
    </div>

    <v-card class="mx-auto default">
      <patient-list
        :datalist="datalist"
        :pagetitle="all_pagetitle"
      ></patient-list>
    </v-card>
  </div>
</template>

<script>
import PatientListing from "@/components/patients/PatientListing";
export default {
  components: {
    "patient-list": PatientListing
  },
  data: () => ({
    dialog: false,
    search: "",
    all_pagetitle: "All Patients"
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    datalist: {
      get() {
        return this.$store.getters.patients;
      }
    }
  },
  beforeMount() {
    this.$store.dispatch("retrievepatients");
  }
};
</script>
