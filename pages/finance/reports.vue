<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/finance">{{
        $t("label.breadcrumb.dashboard")
      }}</router-link>
      <router-link to="/finance">{{
        $t("label.breadcrumb.finance")
      }}</router-link>
      <router-link to="/finance/reports" class="active">{{
        $t("label.breadcrumb.financialreports")
      }}</router-link>
    </div>

    <report-component
      :reports="reports"
      title="Financial Reports"
    ></report-component>
  </div>
</template>
<script>
import report_component from "@/components/reports/report";
import { mapGetters } from "vuex";
export default {
  components: {
    "report-component": report_component,
  },
  mounted() {
    this.$store.dispatch("get_financial_reports");
  },

  computed: {
    ...mapGetters({
      reports: "financialreports",
    }),
    reportUrl() {
      return this;
    },
  },
};
</script>
