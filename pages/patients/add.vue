<template>
  <v-card class="mx-auto">
    <tool-bar :title="title"></tool-bar>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      outlined
                      label="Full Name"
                      hint="Patient full name. E.g John Doe (Mandatory)"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="editedItem.gender"
                      :hint="` ${editedItem.gender.name}`"
                      :items="genderoptions"
                      label="Select"
                      item-value="value"
                      outlined
                      persistent-hint
                      return-object
                      single-line
                    >
                      <template slot="selection" slot-scope="data">
                        {{ data.item.name }}
                      </template>
                      <template slot="item" slot-scope="data">
                        {{ data.item.name }}, ({{ data.item.value }})
                      </template>
                    </v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.phone"
                      outlined
                      label="Phone No."
                      hint="Patient phone No. e.g +255716xxxxxx (Mandatory)"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.address"
                      outlined
                      label="Home Address"
                      hint="Address e.g 123 Hawaii, 31ST, H24KL (Mandatory)"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      type="number"
                      v-model="editedItem.age"
                      outlined
                      label="Age"
                      hint="Patient age. E.g 34 (Mandatory)"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.guardianName"
                      outlined
                      label="Guardian Name"
                      hint="Patient close relative. E.g Alice Doe (Mandatory)"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.emailAddress"
                      outlined
                      label="Email address"
                      hint="Patient Email  address. E.g example@email.com (Optional)"
                      :rules="[rules.required, rules.email]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.marriageStatus"
                      outlined
                      label="Marriage Status"
                      hint="Marriage Status (Mandatory)"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.height"
                      outlined
                      label="Height"
                      hint="Patient height. e.g 10FT (Mandatory)"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.weight"
                      outlined
                      label="Weight"
                      hint="Patient weight. e.g 10Kg (Mandatory)"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.bloodGroup"
                      outlined
                      label="Blood Group"
                      hint="Blood group. e.g A,B,O (Mandatory)"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.bloodPressure"
                      outlined
                      label="Blood pressure"
                      hint="Patient BP. (Mandatory)"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-textarea
                      label="Symptoms"
                      outlined
                      v-model="editedItem.symptoms"
                      hint="Patient initial symptoms"
                    ></v-textarea>
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      label="Note:"
                      outlined
                      v-model="editedItem.note"
                      hint="Additional note if any"
                    ></v-textarea
                  ></v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="close">Cancel</v-btn>
          <v-btn color="success darken-1" @click="save">Save</v-btn>
        </v-card-actions>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
import _tool_bar from "~/components/_tool_bar.vue";
export default {
  components: {
    "tool-bar": _tool_bar
  },
  data: () => ({
    title: "Create New Patient",
    formHasErrors: false,
    valid: true,
    editedItem: {
      name: "",
      phone: "",
      address: "",
      emailAddress: "",
      guardianName: "",
      height: "",
      weight: "",
      bloodPressure: "",
      age: "",
      bloodGroup: "",
      gender: 0,
      isAdmitted: false,
      symptoms: "",
      note: "",
      marriageStatus: ""
    },
    defaultItem: {
      name: "",
      phone: "",
      address: "",
      emailAddress: "",
      guardianName: "",
      height: "",
      weight: "",
      bloodPressure: "",
      age: "",
      bloodGroup: "",
      gender: 0,
      isAdmitted: false,
      symptoms: "",
      note: "",
      marriageStatus: ""
    },
    rules: {
      required: value => !!value || "Required.",
      counter: value => value.length <= 20 || "Max 20 characters",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      }
    },
    genderoptions: [
      { name: "Male", value: 1 },
      { name: "Female", value: 2 },
      { name: "Unspecified", value: 0 }
    ]
  }),
  methods: {
    close() {},
    save() {
      this.editedItem.gender = this.editedItem.gender.name;
      console.log(this.editedItem);
      var state = this.$refs.form.validate();
      this.$refs.form.validate();
      if (state) {
        this.$store.dispatch("create_new_patient", this.editedItem);
      }
    }
  }
};
</script>
