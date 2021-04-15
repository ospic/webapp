<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/reports" class="active">Reports</router-link>
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
  mounted() {},
  created() {},
  computed: {
    reportUrl() {
      return (
        this.$api.defaults.baseURL +
        "reports/view?reportName=" +
        this.$route.params.name
      );
    }
  }
};
</script>
