<template>
  <v-card class="mx-auto default">
    <v-progress-circular
      v-if="services.length == null"
      indeterminate
      color="grey lighten-5"
      size="16"
    ></v-progress-circular>
    <div md12 v-else>
      <v-data-table
        dense
        :headers="headers"
        :items="services"
        :search="search"
        width="100%"
        @click:row="handleClick"
        @update:page="updatePagination"
      >
        <template v-slot:top>
          <v-toolbar flat color="primary" dark>
            <h2>
              <strong>{{ $t(title) }}</strong>
            </h2>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Enter search text ..."
              dense
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:[`item.isActive`]="{ item }">
          <v-tooltip right v-if="item.isActive" color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" small color="red lighten-2"
                >mdi-check</v-icon
              >
            </template>
            <span>Active</span>
          </v-tooltip>
          <div v-else></div>
        </template>
        <template v-slot:[`item.patientName`]="{ item }">
          {{ item.patientName }} ( {{ item.patientId }})
        </template>
        <template v-slot:[`item.staffName`]="{ item }">
          <p v-if="item.staffName == null">Unassigned</p>
          <p v-else>{{ item.staffName }} ( {{ item.staffId }})</p>
        </template>
      </v-data-table>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    services: {
      type: Array,
      default: null,
    },
    title: {
      type: String,
      default: "Services",
    },
  },
  data: () => ({
    search: null,
    headers: [
      { text: "ID", value: "id", class: "primary" },
      {
        text: "Patient Name",
        value: "patientName",
        class: "primary",
        sortable: false,
      },
      { text: "Consultant", value: "staffName", class: "primary" },
      { text: "Is Active?", value: "isActive", class: "primary" },
      { text: "From", value: "fromDate", class: "primary" },
      { text: "To", value: "toDate", class: "primary" },
    ],
    body: {
      options: {
        page: 1,
        itemsPerPage: 5,
        sortBy: ["patientName"],
      },
    },
  }),
  methods: {
    handleClick: function (value) {
      this.$router.push("/consultations/" + value.id);
    },
    updatePagination: function (val) {
      console.log(val);
    },
  },
};
</script>
