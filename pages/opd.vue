<template>
  <div>
    <div class="breadcrumb  ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/opd" class="active"
        >Outpatient Department(OPD)</router-link
      >
    </div>
    <div v-if="opdpatients.length !== 0">
      <patient-list
        :datalist="opdpatients"
        :pagetitle="pagetitle"
      ></patient-list>
    </div>
    <div v-else>{{ $t("label.message.nodataavailable") }}</div>
  </div>
</template>
<script>
import PatientListing from "@/components/patients/PatientListing";
export default {
  components: {
    "patient-list": PatientListing
  },
  data: () => ({
    pagetitle: "OPD Center"
  }),
  computed: {
    opdpatients: {
      get() {
        return this.$store.getters.opdpatients;
      }
    }
  }
};
</script>
