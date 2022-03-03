<template>
  <v-container class="ma-2 pa-0 px-2" fluid>
    <div>
      <div class="breadcrumb">
        <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
        <router-link to="/oppointemnts" class="active">{{
          $t("label.breadcrumb.appointments")
        }}</router-link>
      </div>
      <v-card>
        <v-tabs
          slider-color="blue"
          background-color="primary"
          slider-size="3"
          right
          v-model="tab"
          show-arrows-on-hover="true"
          :show-arrows="$vuetify.breakpoint.mobile"
          dark
        >
          <v-tab>
            <v-badge
              color="green"
              :content="unassigned.length"
              :value="unassigned.length"
            >
              {{ $t("label.titles.unassignedservices") }}
            </v-badge>
          </v-tab>
          <v-tab ripple class="pr-8"
            ><v-badge
              color="green"
              :content="assigned.length"
              :value="assigned.length"
              class="lowercase"
              >{{ $t("label.titles.assignedservices") }}</v-badge
            ></v-tab
          >

          <v-tab-item>
            <servicescard-component
              :services="unassigned"
              title="label.titles.unassignedservices"
            ></servicescard-component>
          </v-tab-item>
          <v-tab-item>
            <servicescard-component
              :services="assigned"
              title="label.titles.assignedservices"
            ></servicescard-component>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import PatientListing from "@/components/patients/PatientListing";
import ServiceCard from "@/components/consultation/consultation_card";
import { mapGetters } from "vuex";
export default {
  components: {
    "patient-list": PatientListing,
    "servicescard-component": ServiceCard,
  },
  data: () => ({
    dialog: false,
    search: "",
    tab: null,
    un_assigned_pagetitle: "Un-Assigned Patients",
    assigned_pagetitle: "Assigned Patients",
    all_pagetitle: "All Patients",
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
      },
    },

    ...mapGetters({
      datalist: "patients",
      assigned: "assigned",
      unassigned: "unassigned",
    }),
  },
  beforeMount() {
    this.$store.dispatch("fetch_all_services");
  },
};
</script>
