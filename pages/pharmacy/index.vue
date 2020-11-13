<template>
  <div v-if="medicinos !== null">
    <v-data-table
      dense
      :headers="headers"
      :items="medicinos"
      :search="search"
      :items-per-page="15"
      sort-by="id"
      class="elevation-1"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small color="indigo darken-4" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
  <div v-else>
    <div height="500" flat>
      <v-layout align-center justify-center column fill-height>
        <v-flex row align-center>
          <v-progress-circular
            indeterminate
            :size="50"
            color="blue"
            class=""
            title="Please wait ..."
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    search: "",
    medicinos: null,
    headers: [
      { text: "Name", value: "name" },
      { text: "Company", value: "company", sortable: false },
      { text: "Composition", value: "compositions" },
      { text: "Units", value: "units", sortable: true },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),
  created() {
    this.fetchdata();
    this.$forceUpdate();
  },
  beforeMount() {
    this.$store.dispatch("getmedicines");
  },

  methods: {
    async fetchdata() {
      return await this.$api
        .$get(`pharmacy/medicine/`)
        .then(response => {
          this.medicinos = response;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  watch: {},
  computed: {
    ...mapGetters({ medicines: "medicines" })
  }
};
</script>
