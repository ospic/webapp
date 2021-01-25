<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/reports" class="active">Reports</router-link>
    </div>
    <v-card class="pa-3">
      <h1>Example of reports (Under development)</h1>
      <div name="link" id="link"></div>
      <div>
        <pdf :src="response_url"></pdf>
      </div>
    </v-card>
  </div>
</template>
<script>
import pdf from "vue-pdf";
export default {
  components: {
    pdf
  },
  data: function() {
    return {
      response_url: null,
      response_data: null
    };
  },
  methods: {
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

  created() {
    this.load_pdf();
  }
};
</script>
