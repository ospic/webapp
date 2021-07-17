<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/patients">{{
        $t("label.breadcrumb.patients")
      }}</router-link>
      <router-link to="/patients/add" class="active">{{
        $t("label.breadcrumb.createnewpatient")
      }}</router-link>
    </div>
    <v-card class="mx-auto default ">
      <v-toolbar dark color="primary" flat dense>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-toolbar>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-stepper v-model="e1" alt-labels elevation="0">
            <v-stepper-header>
              <v-stepper-step step="1" :complete="e1 > 1">
                Info
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="2" :complete="e1 > 2">
                Contacts
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3" :complete="e1 > 3">
                Others
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="4">
                Overview
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.name"
                            outlined
                            counter="100"
                            label="Full Name"
                            hint="Patient full name. E.g John Doe (Mandatory)"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-select
                            v-model="editedItem.gender"
                            :items="genderoptions"
                            :item-text="'name'"
                            :item-value="'name'"
                            label="Select Gender"
                            :rules="[rules.required]"
                            name="editedItem.gender"
                            outlined
                            persistent-hint
                            single-line
                          >
                          </v-select>
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
                            counter="100"
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
                          <v-select
                            v-model="editedItem.marriageStatus"
                            :hint="` ${editedItem.marriageStatus.name}`"
                            :items="marriagestatusoptions"
                            :item-text="'name'"
                            label="Select Married Status"
                            :rules="[rules.required]"
                            name="editedItem.marriageStatus"
                            outlined
                            persistent-hint
                            single-line
                          >
                          </v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.height"
                            outlined
                            counter="10"
                            label="Height"
                            hint="Patient height. e.g 10FT (Mandatory)"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.weight"
                            outlined
                            counter="10"
                            label="Weight"
                            hint="Patient weight. e.g 10Kg (Mandatory)"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
                <v-btn color="primary" @click="e1 = 2">
                  Continue
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.phone"
                            outlined
                            counter="15"
                            label="Phone No."
                            hint="Patient phone No. e.g +255716xxxxxx (Mandatory)"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.address"
                            outlined
                            counter="200"
                            label="Home Address"
                            hint="Address e.g 123 Hawaii, 31ST, H24KL (Mandatory)"
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
                            counter="254"
                            label="Email address"
                            hint="Patient Email  address. E.g example@email.com (Optional)"
                            :rules="[rules.email]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
                <v-btn color="primary" @click="e1 = 3">
                  Continue
                </v-btn>

                <v-btn text @click="e1 = e1 - 1">
                  Back
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-select
                            v-model="editedItem.bloodGroup"
                            :hint="` ${editedItem.bloodGroup.name}`"
                            :items="bloodgroupoptions"
                            label="Select Bloodgroup"
                            item-value="value"
                            item-text="name"
                            :rules="[rules.required]"
                            name="editedItem.bloodGroup"
                            outlined
                            persistent-hint
                            single-line
                          >
                          </v-select>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.bloodPressure"
                            outlined
                            counter="10"
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
                            counter="550"
                            v-model="editedItem.symptoms"
                            hint="Patient allergies"
                          ></v-textarea>
                        </v-col>

                        <v-col cols="12">
                          <v-textarea
                            label="Note:"
                            outlined
                            counter="200"
                            v-model="editedItem.note"
                            hint="Additional note if any"
                          ></v-textarea
                        ></v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-container>
                <v-btn color="primary" @click="e1 = 4">
                  Continue
                </v-btn>

                <v-btn text @click="e1 = e1 - 1">
                  Back
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="4">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <strong>Info</strong>
                      <v-list>
                        <v-list-item>
                          <strong>Username: {{ editedItem.name }}</strong>
                        </v-list-item>
                        <v-list-item>
                          <strong>Gender: {{ editedItem.gender }}</strong>
                        </v-list-item>
                        <v-list-item>
                          <strong>Age: {{ editedItem.age }}</strong>
                        </v-list-item>
                        <v-list-item>
                          <strong
                            >Guardian: {{ editedItem.guardianName }}</strong
                          >
                        </v-list-item>
                        <v-list-item>
                          <strong>
                            Status :
                            {{ editedItem.marriageStatus }}</strong
                          >
                        </v-list-item>
                        <v-list-item>
                          <strong>Height: {{ editedItem.height }}</strong>
                        </v-list-item>
                        <v-list-item>
                          <strong>Weight: {{ editedItem.weight }}</strong>
                        </v-list-item>
                      </v-list>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <strong>Contacts</strong>
                      <v-list>
                        <v-list-item>
                          <strong>Phone: {{ editedItem.phone }}</strong>
                        </v-list-item>

                        <v-list-item>
                          <strong> Address: {{ editedItem.address }}</strong>
                        </v-list-item>

                        <v-list-item>
                          <strong>Email: {{ editedItem.emailAddress }}</strong>
                        </v-list-item>
                      </v-list>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <strong>Contacts</strong>
                      <v-list>
                        <v-list-item>
                          <strong>BG: {{ editedItem.bloodGroup }}</strong>
                        </v-list-item>
                        <v-list-item>
                          <strong>BP: {{ editedItem.bloodPressure }}</strong>
                        </v-list-item>
                        <v-list-item>
                          <strong>Allergies: {{ editedItem.symptoms }}</strong>
                        </v-list-item>
                        <v-list-item>
                          <strong>Note: {{ editedItem.note }}</strong>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-container>
                <v-btn color="button" @click="save">Submit</v-btn>
                <v-btn @click="e1 = e1 - 1" class="button cancel">Back</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
          <!--  <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        outlined
                        counter="100"
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
                        counter="15"
                        label="Phone No."
                        hint="Patient phone No. e.g +255716xxxxxx (Mandatory)"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.address"
                        outlined
                        counter="200"
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
                        counter="100"
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
                        counter="254"
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
                        counter="10"
                        label="Height"
                        hint="Patient height. e.g 10FT (Mandatory)"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.weight"
                        outlined
                        counter="10"
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
                        counter="10"
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
                        counter="550"
                        v-model="editedItem.allergies"
                        hint="Patient allergies"
                      ></v-textarea>
                    </v-col>

                    <v-col cols="12">
                      <v-textarea
                        label="Note:"
                        outlined
                        counter="200"
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
          </v-card-actions>-->
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
    e1: 1,
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
    ]
  }),
  methods: {
    close() {
      this.editedItem = {
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
      };
      this.$router.push("/patients");
    },
    save() {
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
