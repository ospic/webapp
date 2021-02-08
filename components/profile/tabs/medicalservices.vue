<template>
  <v-container>
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on"
          >Add patient service</v-btn
        >
      </template>
      <v-card>
        <v-toolbar color="primary" dark
          >Add new service's received by this patient</v-toolbar
        >
        <v-card-text>
          <v-select
            v-model="select"
            :items="medicalservices"
            item-text="name"
            item-value="id"
            chips
            small-chips
            @click="fetch_medical_services"
            :rules="[v => !!v || 'You must select one to continue!']"
            label="Medical services"
            required
            multiple
            persistent-hint
            single-line
          ></v-select>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn @click="dialog = false">Close</v-btn>
          <v-btn class="warning" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    consultationsservices: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    select: [],
    dialog: false
  }),
  methods: {
    fetch_medical_services() {
      this.$store.dispatch("get_medical_services");
    },
    save() {
      this.$store.dispatch("initiate_medical_transaction", {
        id: this.$route.params.id,
        services: this.select
      });
      this.dialog = false;
    }
  },
  computed: {
    ...mapGetters({
      medicalservices: "medicalservices"
    })
  }
};
</script>
