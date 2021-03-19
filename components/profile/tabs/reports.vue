<template>
  <v-container fluid>
    <v-row class="mx-2">
      <v-spacer></v-spacer>

      <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" small outlined v-bind="attrs" v-on="on">
            <v-icon left>
              mdi-file-document
            </v-icon>
            Upload new report file</v-btn
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
              accept="image/png, image/jpeg, image/bmp"
              label="Medical examination report file"
              truncate-length="27"
            ></v-file-input>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn @click="dialog = false" color="primary" outlined>Deny</v-btn>
            <v-btn
              class="primary"
              @click="uploadimagefile()"
              :loading="loading"
              :disabled="loading"
              >Upload
              <v-icon right dark>
                mdi-cloud-upload
              </v-icon>
              <template v-slot:loader>
                <span>Uploading...</span>
              </template>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row>
      <v-col md="2" sm="6" v-for="(file, i) in files" :key="i">
        <v-card outlined>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-text>
                <ul>
                  <li>File: {{ file.name }}</li>
                  <li>Size: {{ file.size }}</li>
                  <li>Unit: {{ file.location }}</li>
                </ul>
              </v-card-text>
            </div>

            <div
              :class="
                `ma-3 fi fi-size-xl fi-round-md fi-${file.type.split('/')[1]}`
              "
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
      default: null
    }
  },
  data: () => ({
    select: [],
    dialog: false,
    loading: false,
    file: undefined,
    currentFile: undefined,
    location: null
  }),
  methods: {
    selectFile(file) {
      this.progress = 0;
      this.currentFile = file;
      this.loading = false;
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
        .then(response => {
          if (response !== null) {
            this.loading = false;
            this.dialog = false;
            this.currentFile = undefined;
          }
          this.$emit("updatereport");
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
