<template>
  <v-card class="mx-auto default ">
    <v-progress-circular
      v-if="appointments.length == null"
      indeterminate
      color="grey lighten-5"
      size="16"
    ></v-progress-circular>
    <div md12 v-else>
      <v-data-table
        dense
        :headers="headers"
        :items="appointments"
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
    appointments: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    search: null,
    headers: [
      { text: "ID", value: "id" },
      { text: "Appointment Date", value: "appointmentDate", sortable: true },
      { text: "Status", value: "status" },
      { text: "Patient", value: "patientId" }
    ],
    body: {
      options: {
        page: 1,
        itemsPerPage: 5,
        sortBy: ["patientName"]
      }
    }
  })
};
</script>
