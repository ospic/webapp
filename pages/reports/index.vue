<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/reports" class="active">{{
        $t("label.breadcrumb.reports")
      }}</router-link>
    </div>

    <report-component :reports="reports"></report-component>
  </div>
</template>
<script>
import report_component from "@/components/reports/report";
import { mapGetters } from "vuex";
export default {
  components: {
    "report-component": report_component
  },

  mounted() {
    this.$store.dispatch("get_reports");
  },

  computed: {
    ...mapGetters({
      reports: "reports"
    }),
    reportUrl() {
      return this;
    }
  }
};
</script>
