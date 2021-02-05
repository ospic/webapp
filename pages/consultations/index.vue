<template>
  <div>
    <div class="breadcrumb " v-if="services != null">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/consultations" class="active"
        >Consultation
      </router-link>
    </div>

    <service-card :services="services"></service-card>
  </div>
</template>
<script>
import ServiceCard from "@/components/profile/card_service";
import { mapGetters } from "vuex";
export default {
  components: {
    "service-card": ServiceCard
  },
  data: function() {
    return {};
  },
  methods: {},
  created() {
    this.$store.dispatch("fetch_all_services");
  },
  computed: {
    ...mapGetters({
      services: "services"
    })
  }
};
</script>
