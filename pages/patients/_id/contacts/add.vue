<template>
  <v-card>
    <v-card-title> </v-card-title>
    <v-card-text>
      <form>
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="4" class="pa-2">
            <v-text-field
              outlined
              v-model="state"
              :error-messages="nameErrors"
              :counter="10"
              label="State/Country"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="4" class="pa-2">
            <v-text-field
              outlined
              v-model="city"
              :error-messages="nameErrors"
              :counter="10"
              label="City"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="4" class="pa-2">
            <v-text-field
              outlined
              v-model="zipcode"
              :error-messages="nameErrors"
              :counter="10"
              label="Zip Code"
              required
              @input="$v.zipcode.$touch()"
              @blur="$v.zipcode.$touch()"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="12" md="4" class="pa-2">
            <v-text-field
              outlined
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="12" md="4" class="pa-2">
            <v-text-field
              outlined
              v-model="home_phone"
              :error-messages="phoneErrors"
              label="Home Mobile"
            ></v-text-field>
          </v-col>
          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="Do you agree?"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
          ></v-checkbox>

          <v-btn class="mr-4" @click="submit">
            submit
          </v-btn>
          <v-btn @click="clear">
            clear
          </v-btn>
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
    }
  },

  methods: {
    submit() {
      this.$v.$touch();
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
