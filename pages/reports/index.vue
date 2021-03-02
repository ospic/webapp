<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/reports" class="active">Reports</router-link>
    </div>
    <v-card class="mx-auto pa-2">
      <v-progress-linear
        v-if="reports === null"
        value="20"
        buffer-value="0"
        stream
        color="primary"
      ></v-progress-linear>
      <v-data-table
        dense
        v-else
        class="default"
        :headers="headers"
        :items="reports"
        :search="search"
        mobile-breakpoint="100"
      ></v-data-table>
    </v-card>
    <!--<div v-if="response_url != null">
      <v-pdf :src="getpdf()"></v-pdf>
    </div>-->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      response_url: null,
      response_data: null,
      search: "",
      publicPath: process.env.BASE_URL,
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" }
      ]
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
    this.$store.dispatch("get_reports");
    this.load_pdf();
  },

  created() {
    this.load_pdf();
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
