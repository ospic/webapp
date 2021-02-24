<template>
  <!--<div>
    <div class="breadcrumb ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/reports" class="active">Reports</router-link>
    </div>
    <div id="app">
      <WebViewer :url="response_url" />
    </div>
  </div>-->
  <!--<div>
    <div class="breadcrumb ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/reports" class="active">Reports</router-link>
    </div>
    <v-card class="pa-3">
      <h1>Example of reports (Under development)</h1>
      <div name="link" id="link"></div>
      <div>
        <pdf :src="getpdf()"></pdf>
      </div>
    </v-card>
  </div>-->
  <div v-if="response_url != null">
    <v-pdf :src="getpdf()"></v-pdf>
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
  methods: {
    getpdf() {
      return this.$api.defaults.baseURL + "test/view";
    },
    async load_pdf() {
      return await this.$api
        .$get(`test/view`)
        .then(response => {
          this.response_data = response;
          this.response_url = this.$api.defaults.baseURL + "test/view";
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.load_pdf();
  },

  created() {
    this.load_pdf();
  },
  computed: {
    reportUrl() {
      return this;
    }
  }
};
</script>
