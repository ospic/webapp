<template>
  <div>
    <div v-if="opdpatients.length !== 0">
      <patient-list
        :datalist="opdpatients"
        :pagetitle="pagetitle"
      ></patient-list>
    </div>
    <div v-else>ZERo</div>
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
