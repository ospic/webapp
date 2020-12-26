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
                >mdi-stop-circle</v-icon
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
        <template v-slot:[`item.staffName`]="{ item }">
          <p v-if="item.staffName == null">Unassigned</p>
          <p v-else>{{ item.staffName }} ( {{ item.staffId }})</p>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>
<script>
import ServiceCard from "@/components/profile/card_service";
export default {
  components: {
    "service-card": ServiceCard
  },
  props: {
    services: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    search: null,
    headers: [
      { text: "Status", value: "isActive" },
      { text: "ID", value: "id" },
      { text: "Patient Name", value: "patientName", sortable: false },
      { text: "Staff Name", value: "staffName" },

      { text: "From", value: "fromDate" },
      { text: "To", value: "toDate" }
    ],
    body: {
      options: {
        page: 1,
        itemsPerPage: 5,
        sortBy: ["patientName"]
      }
    }
  }),
  methods: {
    handleClick: function(value) {
      this.$router.push("/services/" + value.id);
    },
    updatePagination: function(val) {
      console.log(val);
    }
  }
};
</script>
