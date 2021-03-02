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
        @click:row="handle_row_click"
      ></v-data-table>
    </v-card>
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
    handle_row_click(i) {
      this.$router.push("/reports/" + i.filename);
    }
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
