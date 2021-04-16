<template>
  <div>
    <v-card class="mx-auto ma-1" dark flat tile>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>
          <v-icon>mdi-file-document</v-icon>Report Name
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-scale-transition>
          <v-btn v-if="selection.length" key="export" icon>
            <v-icon>mdi-export-variant</v-icon>
          </v-btn>
        </v-scale-transition>
        <v-scale-transition>
          <v-btn v-if="selection.length" key="delete" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-scale-transition>

        <v-chip
          color="primary lighten-4"
          class="ml-0 mr-2 black--text"
          label
          small
          id="chip"
        >
          Page {{ currentPage }} out of {{ pageCount }}
        </v-chip>
        <v-btn fab class="ma-0 pa-0" dense text small @click="rotate += 90">
          <v-icon color="white" small>mdi-cog-clockwise</v-icon>
        </v-btn>
        <v-btn
          fab
          class="primary lighten-4 ma-0 pa-0"
          text
          small
          @click="rotate -= 90"
        >
          <v-icon color="white" small>mdi-cog-counterclockwise</v-icon>
        </v-btn>
        <v-btn
          class="primary lighten-4"
          small
          text
          @click="$refs.pdfdoc.print()"
        >
          <v-icon color="blue" small>mdi-printer</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <div style="width: 70%;  margin: auto;">
          <pdf
            ref="pdfdoc"
            id="pdfdoc"
            name="pdfdoc"
            :src="src"
            @num-pages="pageCount = $event"
            @page-loaded="currentPage = $event"
            :rotate="rotate"
            @error="error"
            @link-clicked="page = $event"
            @progress="loadedRatio = $event"
            style="width: 100%;"
          ></pdf>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import pdf from "vue-pdf-print";
//var loadingTask = pdf.createLoadingTask("http://localhost:8080/api/test/view");

export default {
  components: {
    pdf
  },
  props: {
    src: {
      type: String
    }
  },

  data: () => ({
    default: null,
    currentPage: 0,
    pageCount: 0,
    numPages: undefined,
    srca: null,
    selection: [],
    loadedRatio: 0,
    page: 1,
    rotate: 0,
    items: ["Foo", "Bar", "Fizz", "Buzz"]
  }),
  methods: {
    error: function(err) {
      console.log(err);
    }
  },
  mounted() {
    this.srca = pdf.createLoadingTask(this.src);
    this.srca.promise.then(pdf => {
      this.numPages = pdf.numPages;
    });
  }
};
</script>
