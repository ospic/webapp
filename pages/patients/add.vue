<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/patients">Patients</router-link>
      <router-link to="/patients/add" class="active"
        >Create new Patient</router-link
      >
    </div>
    <v-card class="mx-auto default ">
      <v-toolbar dark color="primary" flat dense>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>

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
                        counter=100
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
                        label="Select Gender"
                        item-value="value"
                        :rules="[rules.required]"
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
                        counter=15
                        label="Phone No."
                        hint="Patient phone No. e.g +255716xxxxxx (Mandatory)"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.address"
                        outlined
                        counter=200
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
                        counter=100
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
                        counter=254
                        label="Email address"
                        hint="Patient Email  address. E.g example@email.com (Optional)"
                        :rules="[rules.email]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.marriageStatus"
                        :hint="` ${editedItem.marriageStatus.name}`"
                        :items="marriagestatusoptions"
                        label="Select Married Status"
                        item-value="value"
                        :rules="[rules.required]"
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
                        v-model="editedItem.height"
                        outlined
                        counter=10
                        label="Height"
                        hint="Patient height. e.g 10FT (Mandatory)"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.weight"
                        outlined
                        counter=10
                        label="Weight"
                        hint="Patient weight. e.g 10Kg (Mandatory)"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.bloodGroup"
                        :hint="` ${editedItem.bloodGroup.name}`"
                        :items="bloodgroupoptions"
                        label="Select Bloodgroup"
                        item-value="value"
                        :rules="[rules.required]"
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
                        v-model="editedItem.bloodPressure"
                        outlined
                        counter=10
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
                        label="Allergies"
                        outlined
                        counter=550
                        v-model="editedItem.allergies"
                        hint="Patient allergies"
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12">
                      <v-textarea
                        label="Note:"
                        outlined
                        counter=200
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
            <v-btn @click="close" class="button cancel">Cancel</v-btn>
            <v-btn color="button" @click="save">Save</v-btn>
          </v-card-actions>
        </v-container>
      </v-form>
    </v-card>
  </div>
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
      age: 0,
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
      age: 0,
      bloodGroup: 0,
      gender: 0,
      isAdmitted: false,
      symptoms: "",
      note: "",
      marriageStatus: 0
    },
    rules: {
      required: value => !!value || "Required.",
      counter: value => value.length <= 20 || "Max 20 characters",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return value.length <= 0 || pattern.test(value) || "Invalid e-mail.";
      }
    },
    genderoptions: [
      { name: "Male", value: 1 },
      { name: "Female", value: 2 },
      { name: "Unspecified", value: 0 }
    ],
    marriagestatusoptions: [
      { name: "Single", value: 1 },
      { name: "Married", value: 2 },
      { name: "Seperated", value: 3 },
      { name: "Widowed", value: 4 },
      { name: "Unspecified", value: 0 }
    ],
    bloodgroupoptions: [
      { name: "A+", value: 1 },
      { name: "A-", value: 2 },
      { name: "B+", value: 3 },
      { name: "B-", value: 4 },
      { name: "AB+", value: 5 },
      { name: "AB-", value: 6 },
      { name: "O+", value: 7 },
      { name: "O-", value: 8 },
      { name: "Unspecified", value: 0 }
    ],
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
