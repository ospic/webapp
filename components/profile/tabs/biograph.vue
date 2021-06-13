<template>
  <v-card flat class="mx-auto default">
    <v-card-text>
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="12" md="1" sm="1">
          <v-btn color="primary" class="mb-1" fab small @click="edit = !edit">
            <v-icon>mdi-account-edit</v-icon>
          </v-btn></v-col
        >
        <v-col cols="12" md="12" sm="12">
          <v-simple-table dense>
            <template v-slot:default>
              <tbody>
                <tr v-if="patient.id">
                  <td id="id" class="font-weight-black">ID:</td>
                  <td>{{ patient.id }}</td>
                </tr>
                <tr v-if="patient.name">
                  <td id="name" class="font-weight-black">Full Name:</td>
                  <td>
                    <v-text-field
                      v-if="edit"
                      dense
                      counter=100
                      v-model="patientcp.name"
                    ></v-text-field>
                    <p v-else>{{ patient.name }}</p>
                  </td>
                </tr>
                <tr v-if="patient.gender">
                  <td id="gender" class="font-weight-black">Gender:</td>
                  <td v-if="edit">
                    <v-select
                      :items="gender"
                      v-model="patientcp.gender"
                      :menu-props="{ top: true, offsetY: true }"
                      label="Select gender"
                    ></v-select>
                  </td>
                  <td v-else>{{ patient.gender }}</td>
                </tr>
                <tr v-if="patient.age">
                  <td id="age" class="font-weight-black">Age:</td>
                  <td>
                    <v-text-field
                      v-if="edit"
                      dense
                      v-model="patientcp.age"
                    ></v-text-field>
                    <p v-else>{{ patient.age }}</p>
                  </td>
                </tr>

                <tr v-if="patient.phone">
                  <td id="phone" class="font-weight-black">Phone No.</td>
                  <td>
                    <v-text-field
                      v-if="edit"
                      dense
                      counter=15
                      v-model="patientcp.phone"
                    ></v-text-field>
                    <p v-else>{{ patient.phone }}</p>
                  </td>
                </tr>
                <tr v-if="patient.address">
                  <td id="address" class="font-weight-black">Address.</td>
                  <td>
                    <v-text-field
                      v-if="edit"
                      dense
                      counter=200
                      v-model="patientcp.address"
                    ></v-text-field>
                    <p v-else>{{ patient.address }}</p>
                  </td>
                </tr>
                <tr v-if="patient.emailAddress">
                  <td id="email" class="font-weight-black">Email Address.</td>
                  <td>
                    <v-text-field
                      v-if="edit"
                      dense
                      counter=254
                      v-model="patientcp.emailAddress"
                    ></v-text-field>
                    <p v-else>{{ patient.emailAddress }}</p>
                  </td>
                </tr>
                <tr v-if="patient.guardianName">
                  <td id="guardian" class="font-weight-black">
                    Guardian Name.
                  </td>
                  <td>
                    <v-text-field
                      v-if="edit"
                      dense
                      counter=100
                      v-model="patientcp.guardianName"
                    ></v-text-field>
                    <p v-else>{{ patient.guardianName }}</p>
                  </td>
                </tr>
                <tr v-if="patient.createdDate">
                  <td id="createddate" class="font-weight-black">
                    Created Date:
                  </td>
                  <td>{{ patient.createdDate }}</td>
                </tr>
                <tr v-if="patient.bloodPressure">
                  <td id="bp" class="font-weight-black">BP:</td>
                  <td>
                    <v-text-field
                      v-if="edit"
                      dense
                      v-model="patientcp.bloodPressure"
                    ></v-text-field>
                    <p v-else>{{ patient.bloodPressure }}</p>
                  </td>
                </tr>
                <tr v-if="patient.bloodGroup">
                  <td id="bloodgroup" class="font-weight-black">
                    Blood group:
                  </td>
                  <td>
                    <v-select
                      v-if="edit"
                      :items="bloodgroup"
                      v-model="patientcp.bloodGroup"
                      :menu-props="{ top: true, offsetY: true }"
                      label="Select bloodgroup"
                    ></v-select>
                    <p v-else>{{ patient.bloodGroup }}</p>
                  </td>
                </tr>
                <tr v-if="patient.height">
                  <td id="height" class="font-weight-black">Height:</td>
                  <td>
                    <v-text-field
                      v-if="edit"
                      dense
                      counter=10
                      v-model="patientcp.height"
                    ></v-text-field>
                    <p v-else>{{ patient.height }}</p>
                  </td>
                </tr>
                <tr v-if="patient.weight">
                  <td id="weight" class="font-weight-black">Weight:</td>
                  <td>
                    <v-text-field
                      v-if="edit"
                      dense
                      counter=10
                      v-model="patientcp.weight"
                    ></v-text-field>
                    <p v-else>{{ patient.weight }}</p>
                  </td>
                </tr>
                <tr v-if="patient.marriageStatus">
                  <td id="marriage" class="font-weight-black">
                    Maritial Status:
                  </td>
                  <td>
                    <v-select
                      v-if="edit"
                      :items="marriageStatus"
                      v-model="patientcp.marriageStatus"
                      :menu-props="{ top: true, offsetY: true }"
                      label="Select Marriage Status"
                    ></v-select>
                    <p v-else>{{ patient.marriageStatus }}</p>
                  </td>
                </tr>
                <tr>
                  <td id="isamitted" class="font-weight-black">
                    Is Admitted ?
                  </td>
                  <td>
                    <v-checkbox
                      v-model="patientcp.isAdmitted"
                      readonly
                      dense
                    ></v-checkbox>
                  </td>
                </tr>
                <tr>
                  <td id="isamitted" class="font-weight-black">
                    Have user account ?
                  </td>
                  <td>
                    <v-checkbox
                      v-model="patientcp.hasSelfServiceUserAccount"
                      readonly
                      dense
                    ></v-checkbox>
                  </td>
                </tr>

                <tr v-if="patient.allergies">
                  <td id="allergies" class="font-weight-black">Allergies:</td>
                  <td>
                    <v-text-field
                      v-if="edit"
                      dense
                      counter=550
                      v-model="patientcp.allergies"
                    ></v-text-field>
                    <p v-else>{{ patient.allergies }}</p>
                  </td>
                </tr>
                <tr v-if="edit">
                  <td></td>
                  <td>
                    <v-btn class="primary" small @click.stop="submit"
                      >Edit</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    patient: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      edit: false,
      patientcp: this.patient,
      gender: ["Male", "Female", "Unspecified"],
      bloodgroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', "Unspecified"],
      marriageStatus: ['Single', 'Married', 'Seperated', 'Widowed',"Unspecified"],
    };
  },
  methods: {
    submit() {
      delete this.patientcp.contactsInformation;
      this.$store.dispatch("update_patient", this.patientcp).then(() => {
        this.edit = false;
        this.fetchclientdata(this.$route.params.id);
      });
    }
  }
};
</script>
