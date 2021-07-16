<template>
  <div>
    <div class="breadcrumb " v-if="consultations != null">
      <router-link to="/">{{ $t("label.menu.dashboard") }}</router-link>
      <router-link to="/consultations" class="active">{{
        $t("label.breadcrumb.consultations")
      }}</router-link>
    </div>

    <consultation-card :services="consultations"></consultation-card>
  </div>
</template>
<script>
import ConsultationCard from "@/components/consultation/consultation_card";
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
