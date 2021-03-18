<template>
  <v-container fluid>
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
              class="file-icon file-icon-xl ma-3"
              :data-type="file.type.split('/')[1]"
            ></div>
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
  }
};
</script>
