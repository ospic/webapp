<template>
  <v-card class="mx-auto">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>
        <span class="headline">{{ title }}</span></v-toolbar-title
      >
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="4" class="pa-2">
          <v-text-field
            dense
            outlined
            v-model="formData.state"
            :counter="10"
            label="State/Country"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4" class="pa-2">
          <v-text-field
            dense
            outlined
            v-model="formData.city"
            :counter="10"
            label="City"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4" class="pa-2">
          <v-text-field
            dense
            outlined
            v-model="formData.zipcode"
            :counter="10"
            label="Zip Code"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" md="4" class="pa-2">
          <v-text-field
            dense
            outlined
            v-model="formData.email_address"
            label="E-mail"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" md="4" class="pa-2">
          <v-text-field
            outlined
            dense
            v-model="formData.physical_address"
            label="Physical Address"
            hint="E.g Mbamba Bay "
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" md="4" class="pa-2">
          <v-text-field
            outlined
            dense
            v-model="formData.home_phone"
            label="Desk phone"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4" class="pa-2">
          <v-text-field
            outlined
            dense
            v-model="formData.work_phone"
            label="Mobile Phone"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" md="4" class="pa-2">
          <v-checkbox
            v-model="formData.isReachable"
            label="Is reachable?"
            required
          ></v-checkbox>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="mr-4 button" @click="submit"> Submit </v-btn>
      <v-btn @click="clear" class="button warning"> Clear </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
    },

    data: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    name: "",
    email: "",
    city: "",
    formData: {
      isReachable: false,
      home_phone: "",
      work_phone: "",
      physical_address: "",
      zipcode: "",
      state: "",
    },
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),

  computed: {},

  methods: {
    submit: function () {
      var payload = {
        id: this.$route.params.id,
        contact: this.formData,
      };
      this.$store.dispatch("postpatientcontacts", payload).then(() => {
        this.$router.push(`/patients/${this.$route.params.id}/contacts/`);
      });
    },
    clear() {},
  },
};
</script>
