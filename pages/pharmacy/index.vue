<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="medicines"
      :search="search"
      :items-per-page="15"
      sort-by="id"
      class="elevation-0 "
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small color="indigo darken-4" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-progress-linear indeterminate color="cyan"></v-progress-linear>
      </template>
    </v-data-table>
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
  created() {},
  beforeMount() {
    this.$store.dispatch("getmedicines");
  },

  methods: {},
  watch: {},
  computed: {
    ...mapGetters({ medicines: "medicines" })
  }
};
</script>
