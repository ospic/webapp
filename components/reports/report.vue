<template>
  <div>
    <v-card class="mx-auto">
      <v-toolbar flat dark color="primary">
        <v-toolbar-title class="title">{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-col cols="12" md="3" class="mt-3">
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search report by name/desc"
            outlined
            rounded
            single-line
            hide-details
          ></v-text-field>
        </v-col>

        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on" v-if="false">
              <v-icon small>mdi-file-upload</v-icon>&nbsp; Upload report
            </v-btn>
            <v-btn
              v-if="false"
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
          <v-progress-circular
            v-if="reports === null"
            value="20"
            buffer-value="0"
            stream
            indeterminate
            color="button"
            class="ma-4"
          ></v-progress-circular>
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
export default {
  props: {
    reports: {
      type: Array,
      default: null,
    },
    title: {
      type: String,
      default: "Reports",
    },
  },
  data: function () {
    return {
      response_url: null,
      response_data: null,
      search: "",
      dialog: false,
      currentFile: undefined,
      publicPath: process.env.BASE_URL,
      headers: [
        { text: "ID", value: "id", class: "primary" },
        { text: "Report Name", value: "name", class: "primary" },
        { text: "Description", value: "descriptions", class: "primary" },
      ],
    };
  },
  methods: {
    handle_row_click(i) {
      this.$router.push("/reports/" + i.id);
    },
    filechanged: function (file) {
      this.progress = 0;
      this.currentFile = file;
    },
    uploadreport: function () {
      this.dialog = false;
      const formData = new FormData();
      formData.append("file", this.currentFile);
      this.$store.dispatch("uploadreport", formData);
      this.$store.dispatch("get_reports");
    },
  },
  mounted() {
    this.$store.dispatch("get_reports");
  },
  computed: {
    reportUrl() {
      return this;
    },
  },
};
</script>
