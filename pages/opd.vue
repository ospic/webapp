<template>
  <v-progress-circular v-if="services == undefined"></v-progress-circular>
  <servicescard-component v-else :services="services"></servicescard-component>
</template>
<script>
import ServiceCard from "@/components/profile/card_service";
export default {
  components: {
    "servicescard-component": ServiceCard
  },
  data: function() {
    return {};
  },
  created() {
    this.$store.dispatch("retrieve_active_opd_services");
  },
  computed: {
    services() {
      var data = this.$store.getters.opds;
      return data;
    }
  }
};
</script>
