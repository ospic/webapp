<template>
  <v-card class="mx-auto" outlined>
    <v-card-title> Add contact</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <form ref="form" @submit.prevent="submit" method="put">
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

          <v-col cols="12" sm="12" md="4" class="pa-2">
            <v-btn class="mr-4" @click="submit">
              submit
            </v-btn>
            <v-btn @click="clear">
              clear
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </v-card-text>
  </v-card>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      }
    }
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
      state: ""
    },
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    phoneErrors() {}
  },

  methods: {
    submit() {
      console.log(this.formData);
      this.$store.dispatch(
        "update_patient_add_contacts",

        this.formData
      );
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    }
  }
};
</script>
