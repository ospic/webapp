<template>
  <v-card class="mx-auto default ">
    <v-progress-circular
      v-if="departments.length == null"
      indeterminate
      color="grey lighten-5"
      size="16"
    ></v-progress-circular>
    <div md12 v-else>
      <v-data-table
        dense
        :headers="headers"
        :items="departments"
        :search="search"
        width="100%"
        @click:row="handleClick"
        @update:page="updatePagination"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <h2>
              <strong>{{ title }}</strong>
            </h2>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Enter search text ..."
              dense
              single-line
              hide-details
            ></v-text-field
            >&nbsp;&nbsp;
            <v-btn medium dense class="primary" to="/patients/add"
              ><v-icon>mdi-list</v-icon>New department</v-btn
            >
          </v-toolbar>
        </template>
      </v-data-table>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      search: null,
      title: "Departments",
      headers: [
        { text: "ID", value: "id" },
        { text: "Department name", value: "name", sortable: false },
        { text: "Description", value: "descriptions" },
        { text: "Opening date", value: "openingDate" }
      ]
    };
  },
  created() {
    this.$store.dispatch("retrieve_departments");
  },
  computed: {
    ...mapGetters({
      departments: "departments"
    })
  }
};
</script>
