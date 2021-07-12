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

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn small class="button my-2" @click="accept_appointment(item.id)"
            >accept</v-btn
          >
          <v-btn small color="button warning">re-schedule</v-btn>
          <v-btn small color="button error" @click="reject_appointment(item.id)"
            >decline</v-btn
          >
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
    title: "Adjust appointment",
    headers: [
      { text: "ID", value: "id" },
      { text: "Appointment Date", value: "appointmentDate", sortable: true },
      { text: "Status", value: "status" },
      { text: "Patient", value: "patientId" },
      { text: "Actions", value: "actions" }
    ]
  }),
  methods: {
    accept_appointment(id) {
      this.$store.dispatch("accept_appointment", id);
    },
    reject_appointment(id) {
      this.$store.dispatch("reject_appointment", id);
    }
  }
};
</script>
