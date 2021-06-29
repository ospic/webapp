<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/reports">{{
        $t("label.breadcrumb.reports")
      }}</router-link>

      <router-link :to="`/reports/${$route.params.id}`" class="active">{{
        $t("label.breadcrumb.viewreports")
      }}</router-link>
    </div>

    <div v-if="reportUrl">
      <v-pdf :src="reportUrl"></v-pdf>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      response_url: null,
      response_data: null,
      publicPath: process.env.BASE_URL
    };
  },
  methods: {},
  computed: {
    reportUrl() {
      return (
        this.$api.defaults.baseURL + "reports/view/" + this.$route.params.id
      );
    }
  }
};
</script>
