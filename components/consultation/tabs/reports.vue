<template>
  <v-container fluid>
    <v-alert
      color="warning"
      border="left"
      elevation="1"
      colored-border
      type="warning"
      prominent
      v-if="deletedialog"
      dismissible
      ref="alert"
      transition="scale-transition"
    >
      <v-row align="center">
        <v-col class="grow">
          <h3>
            Do you real want to delete this report file ?
            <strong>{{ file.name }}</strong>
          </h3>
          Remember: This process will parmanently delete this file and you can
          not undo after that
        </v-col>
        <v-col class="shrink">
          <v-btn
            class="button"
            @click.stop="deleteimagefile"
            :loading="loading"
            :disabled="loading"
          >
            <template v-slot:loader>
              <span class="white--text">Deleting...</span> </template
            >Yes Delete</v-btn
          >
        </v-col>
      </v-row>
      <template v-slot:close>
        <v-btn icon @click="toggle">
          <v-icon size="32" color="red">mdi-close-circle</v-icon>
        </v-btn>
      </template>
    </v-alert>
    <v-row class="mx-2 pt-2">
      <v-spacer></v-spacer>

      <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="button"
            class="mb-2"
            medium
            v-if="hasPermission(permissions)"
            v-bind="attrs"
            v-on="on"
            dark
          >
            <v-icon left> mdi-file-document </v-icon>
            {{ $t("label.button.btnuploadnewreportfile") }}</v-btn
          >
        </template>
        <v-card>
          <v-card-title class="pa-0 mb-4">
            <v-toolbar color="primary" dark flat
              >Upload new patient medical examination report</v-toolbar
            >
          </v-card-title>
          <v-card-text>
            <p>{{ location || "null" }}</p>
            <v-radio-group row v-model="location" mandatory>
              <v-radio label="Laboratory" value="laboratory"></v-radio>
              <v-radio label="Radiology" value="radiology"></v-radio>
            </v-radio-group>
            <v-file-input
              counter
              show-size
              small-chips
              @change="selectFile"
              :accept="accepted"
              label="Medical examination report file"
              truncate-length="27"
            ></v-file-input>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="justify-end">
            <v-btn @click="dialog = false" color="primary" outlined>Deny</v-btn>
            <v-btn
              class="primary"
              @click="uploadimagefile()"
              :loading="loading"
              :disabled="loading"
              >Upload
              <v-icon right dark> mdi-cloud-upload </v-icon>
              <template v-slot:loader>
                <span>Uploading...</span>
              </template>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="viewdialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card dark>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="viewdialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{
              selectedfile == null ? "" : selectedfile.name
            }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="viewdialog = false"> Save </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <div v-if="selectedfile != null" class="pa-4">
            <div
              v-if="selectedfile.type.startsWith('image/')"
              class="d-flex flex-column justify-space-between align-center"
            >
              <v-container fluid>
                <v-row no-gutters>
                  <v-col cols="12" sm="12" md="2">
                    <strong>Image size : {{ width }}</strong>
                    <v-slider
                      v-model="width"
                      class="align-self-stretch"
                      hint="Height"
                      min="200"
                      max="1500"
                      step="1"
                    ></v-slider>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="12" sm="4" md="9">
                    <v-img
                      :width="width"
                      :src="selectedfile.url"
                      lazy-src="https://aosa.org/wp-content/uploads/2019/04/image-placeholder-350x350.png"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <div v-else-if="selectedfile.type == 'application/pdf'">
              <div>
                <v-pdf :src="selectedfile.url"></v-pdf>
              </div>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row>
      <v-col md="4" lg="2" sm="6" v-for="(file, i) in files" :key="i">
        <v-card outlined dense>
          <v-toolbar dense height="40" class="primary" flat>
            <h5 class="white--text font-weight-medium">{{ file.name }}</h5>
            <v-spacer></v-spacer>
            <v-btn
              fab
              text
              class="button delete"
              x-small
              @click="deletefile(file)"
            >
              <v-icon> mdi-trash-can-outline </v-icon>
            </v-btn>
          </v-toolbar>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-text>
                <ul>
                  <li>Type: {{ file.type.split("/").pop() }}</li>
                  <li>Size: {{ file.size }}</li>
                  <li>Unit: {{ file.location }}</li>
                </ul>
              </v-card-text>
            </div>

            <div
              @click="viewfile(file)"
              :class="`ma-3 fi fi-size-xl fi-round-md fi-${
                file.type.split('/')[1]
              }`"
            >
              <div class="fi-content">{{ file.type.split("/")[1] }}</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    files: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
    select: [],
    dialog: false,
    viewdialog: false,
    deletedialog: false,
    loading: false,
    file: undefined,
    currentFile: undefined,
    selectedfile: null,
    location: null,
    width: 300,
    permissions: "ALL_FUNCTIONS, UPDATE_CONSULTATION",
    accepted:
      "image/*,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.pdf,.doc,.xml,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  }),

  methods: {
    selectFile(file) {
      this.progress = 0;
      this.currentFile = file;
      this.loading = false;
    },
    deletefile(file) {
      this.deletedialog = true;
      this.file = file;
    },
    async uploadimagefile() {
      this.loading = true;
      const formData = new FormData();
      formData.append("file", this.currentFile);
      return await this.$api
        .$patch(
          `/consultations/${this.$route.params.id}/${this.location}/`,
          formData
        )
        .then((response) => {
          if (response !== null) {
            this.loading = false;
            this.dialog = false;
            this.currentFile = undefined;
          }
          this.$emit("update-report");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggle: function () {
      this.$refs.alert.toggle();
      this.deletedialog = false;
    },
    viewfile: function (it) {
      this.selectedfile = it;
      this.selectedfile.url =
        this.$api.defaults.baseURL +
        "consultations/" +
        this.$route.params.id +
        "/files/" +
        it.id +
        "/";
      this.viewdialog = true;
      console.log(it);
    },
    async deleteimagefile() {
      this.loading = true;
      return await this.$api
        .$delete(
          `/consultations/${this.$route.params.id}/${this.file.location}/${this.file.id}`
        )
        .then((response) => {
          this.loading = false;
          this.deletedialog = false;
          this.$emit("update-report");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
