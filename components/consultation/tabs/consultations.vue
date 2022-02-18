<template>
  <v-container fluid>
    <v-progress-circular
      v-if="services == null"
      indeterminate
      color="grey"
      size="24"
    ></v-progress-circular>
    <div v-else>
      <v-data-table
        dense
        class="default"
        :headers="headers"
        :items="services"
        :search="search"
        mobile-breakpoint="100"
        @click:row="handleClick"
        @update:page="updatePagination"
      >
        <template v-slot:[`item.isActive`]="{ item }">
          <v-tooltip right v-if="item.isActive" color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" small color="blue lighten-2"
                >mdi-check-circle</v-icon
              >
            </template>
            <span>Active</span>
          </v-tooltip>
          <v-tooltip right v-else color="warning">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" small color="red lighten-2"
                >mdi-close-circle</v-icon
              >
            </template>
            <span>Closed</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.patientName`]="{ item }">
          {{ item.patientName }} ( {{ item.patientId }})
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-tooltip right v-if="item.isAdmitted" color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" small>mdi-bed-outline</v-icon>
            </template>
            <span>Admitted</span>
          </v-tooltip>
          <div v-else></div>
        </template>
        <template v-slot:[`item.staffName`]="{ item }">
          <p v-if="item.staffName == null">Unassigned</p>
          <p v-else>{{ item.staffName }} ( {{ item.staffId }})</p>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>
<script>
import ServiceCard from "@/components/consultation/consultation_card";
export default {
  components: {
    "service-card": ServiceCard,
  },
  props: {
    services: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
    search: null,
    headers: [
      { text: "Status", value: "isActive", class: "primary" },
      { text: "ID", value: "id", class: "primary" },
      {
        text: "Patient Name",
        value: "patientName",
        class: "primary",
        sortable: false,
      },
      { text: "Consultant", value: "staffName", class: "primary" },
      { text: "From", value: "fromDate", class: "primary" },
      { text: "To", value: "toDate", class: "primary" },
      { text: "Status", value: "status", class: "primary" },
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
