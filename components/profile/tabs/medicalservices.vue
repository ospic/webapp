<template>
  <v-container>
    <v-dialog transition="dialog-top-transition" max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" v-bind="attrs" v-on="on"
          >Add patient service</v-btn
        >
      </template>
      <template v-slot:default="dialog">
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
            <v-btn @click="dialog.value = false">Close</v-btn>
            <v-btn class="warning" @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </template>
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
    select: null
  }),
  methods: {
    fetch_medical_services() {
      this.$store.dispatch("get_medical_services");
    },
    save() {
      this.$store.dispatch("initiate_medical_transaction", {
        consultationId: 40,
        medicalServices: [1]
      });
    }
  },
  computed: {
    ...mapGetters({
      medicalservices: "medicalservices"
    })
  }
};
</script>
