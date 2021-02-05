<template>
  <div>
    <div class="breadcrumb " v-if="services != null">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/consultations" class="active"
        >Consultation
      </router-link>
    </div>

    <consultation-card :services="consultations"></consultation-card>
  </div>
</template>
<script>
import ConsultationCard from "@/components/profile/consultation_card";
import { mapGetters } from "vuex";
export default {
  components: {
    "consultation-card": ConsultationCard
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
      consultations: "consultations"
    })
  }
};
</script>
