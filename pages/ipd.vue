<template>
  <div>
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
