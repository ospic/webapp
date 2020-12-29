<template>
  <div>
    <v-breadcrumbs :items="items" divider=">">
      <v-breadcrumbs-item slot="item" slot-scope="{ item }" exact :to="item.to">
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>

    <v-tabs color="deep-purple accent-4" right>
      <v-tab v-if="unassigned.length > 0">
        <v-badge
          color="green"
          :content="unassigned.length"
          :value="unassigned.length"
        >
          Un-Assigned
        </v-badge>
      </v-tab>
      <v-tab v-if="assigned.length > 0"
        ><v-badge
          color="green"
          :content="assigned.length"
          :value="assigned.length"
          class="lowercase"
          >Assigned</v-badge
        ></v-tab
      >
      <v-tab v-if="datalist.length > 0"
        ><v-badge
          color="green"
          :content="datalist.length"
          :value="datalist.length"
          >All</v-badge
        ></v-tab
      >

      <v-tab-item>
        <patient-list
          :datalist="unassigned"
          :pagetitle="un_assigned_pagetitle"
        ></patient-list>
      </v-tab-item>
      <v-tab-item>
        <patient-list
          :datalist="assigned"
          :pagetitle="assigned_pagetitle"
        ></patient-list>
      </v-tab-item>
      <v-tab-item>
        <patient-list
          :datalist="datalist"
          :pagetitle="all_pagetitle"
        ></patient-list>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import PatientListing from "@/components/patients/PatientListing";
export default {
  components: {
    "patient-list": PatientListing
  },
  data: () => ({
    dialog: false,
    search: "",
    un_assigned_pagetitle: "Un-Assigned Patients",
    assigned_pagetitle: "Assigned Patients",
    all_pagetitle: "All Patients",
    items: [
      {
        text: "Dashboard",
        disabled: false,
        to: "/"
      },
      {
        text: "Patients",
        disabled: false,
        to: "/patients"
      }
    ]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    datalist: {
      get() {
        return this.$store.getters.patients;
      }
    },
    assigned: {
      get() {
        return this.$store.getters.assigned;
      }
    },
    unassigned: {
      get() {
        return this.$store.getters.unassigned;
      }
    }
  },
  beforeMount() {
    this.$store.dispatch("retrievepatients");
  }
};
</script>
