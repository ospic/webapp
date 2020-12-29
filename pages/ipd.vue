<template>
  <div>
    <div class="breadcrumb flat ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/ipd" class="active"
        >Inpatient Department(IPD)</router-link
      >
    </div>
    <div v-if="ipdpatients.length !== 0">
      <patient-list
        :datalist="ipdpatients"
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
    pagetitle: "IPD Center"
  }),
  computed: {
    ipdpatients: {
      get() {
        return this.$store.getters.ipdpatients;
      }
    }
  }
};
</script>
