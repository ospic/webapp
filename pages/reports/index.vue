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
      >
        <template v-slot:top>
          <v-toolbar flat class="default">
            <p class="title">Reports</p>
            <v-spacer></v-spacer>
            <v-row no-gutters>
              <v-col cols="12" md="2" align-self="center"> </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Search by Name/ID ..."
                  outlined
                  rounded
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-toolbar>
        </template>
      </v-data-table>
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
