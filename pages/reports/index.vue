<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/reports" class="active">Reports</router-link>
    </div>
    <v-card class="mx-auto">
      <v-toolbar flat dark color="primary">
        <p class="title">Reports</p>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search by Name/ID ..."
          outlined
          dense
          rounded
          single-line
          hide-details
        ></v-text-field>

        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on" v-if="isMdAndUp">
              <v-icon small>mdi-file-upload</v-icon>&nbsp; Upload report
            </v-btn>
            <v-btn
              v-else
              color="primary"
              fab
              small
              class="mb-2 font-weight-normal"
              v-bind="attrs"
              v-on="on"
              dark
              ><v-icon>mdi-file-upload</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2">
              Upload new report ?
            </v-card-title>

            <v-card-text>
              <v-file-input
                show-size
                small-chips
                accept=".jrxml"
                truncate-length="50"
                @change="filechanged"
              ></v-file-input>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" small @click="dialog = false">
                No Deny
              </v-btn>
              <v-btn color="warning" small @click="uploadreport">
                Yes Upload
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-card-text class="ma-0 pa-0">
        <v-container fluid class="ma-0 pa-0">
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
          </v-data-table>
        </v-container>
      </v-card-text>
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
      dialog: false,
      currentFile: undefined,
      publicPath: process.env.BASE_URL,
      headers: [
        { text: "ID", value: "id" },
        { text: "Report Name", value: "name" },
        { text: "Description", value: "descriptions" }
      ]
    };
  },
  methods: {
    handle_row_click(i) {
      this.$router.push("/reports/" + i.filename + "&entity=" + i.entity);
    },
    filechanged: function(file) {
      this.progress = 0;
      this.currentFile = file;
    },
    uploadreport: function() {
      this.dialog = false;
      const formData = new FormData();
      formData.append("file", this.currentFile);
      this.$store.dispatch("uploadreport", formData);
      this.$store.dispatch("get_reports");
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
