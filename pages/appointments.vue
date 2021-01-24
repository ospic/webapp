<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/oppointemnts" class="active">Appointments</router-link>
    </div>
    <v-tabs color="deep-purple accent-4 pa-3" right>
      <v-tab>
        <v-badge
          color="green"
          :content="unassigned.length"
          :value="unassigned.length"
        >
          Un-Assigned
        </v-badge>
      </v-tab>
      <v-tab ripple
        ><v-badge
          color="green"
          :content="assigned.length"
          :value="assigned.length"
          class="lowercase"
          >Assigned</v-badge
        ></v-tab
      >

      <v-tab-item>
        <servicescard-component
          :services="unassigned"
          title="Un-assigned services"
        ></servicescard-component>
      </v-tab-item>
      <v-tab-item>
        <servicescard-component
          :services="assigned"
          title="Assigned services"
        ></servicescard-component>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import PatientListing from "@/components/patients/PatientListing";
import ServiceCard from "@/components/profile/card_service";
import { mapGetters } from "vuex";
export default {
  components: {
    "patient-list": PatientListing,
    "servicescard-component": ServiceCard
  },
  data: () => ({
    dialog: false,
    search: "",
    un_assigned_pagetitle: "Un-Assigned Patients",
    assigned_pagetitle: "Assigned Patients",
    all_pagetitle: "All Patients"
  }),
  created() {
    console.log(this.isAppointmentRoute);
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    isAppointmentRoute: {
      get() {
        return this.$router.path === "appointments";
      }
    },

    ...mapGetters({
      datalist: "patients",
      assigned: "assigned",
      unassigned: "unassigned"
    })
  },
  beforeMount() {
    this.$store.dispatch("retrievepatients");
  }
};
</script>
