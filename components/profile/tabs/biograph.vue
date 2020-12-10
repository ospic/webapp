<template>
  <v-card flat>
    <v-card-text>
      <table
        style="width:60%; text-align: start; background-color: #Fffde7"
        class="pa-3"
      >
        <tr v-if="patient.id">
          <td id="id" class="font-weight-black">ID:</td>
          <td>{{ patient.id }}</td>
        </tr>
        <tr v-if="patient.name">
          <td id="name" class="font-weight-black">Name:</td>
          <td>{{ patient.name }}</td>
        </tr>
        <tr v-if="patient.gender">
          <td id="gender" class="font-weight-black">Gender:</td>
          <td>{{ patient.gender }}</td>
        </tr>
        <tr v-if="patient.age">
          <td id="age" class="font-weight-black">Age:</td>
          <td>{{ patient.age }}</td>
        </tr>

        <tr v-if="patient.phone">
          <td id="phone" class="font-weight-black">Phone:</td>
          <td>{{ patient.phone }}</td>
        </tr>
        <tr v-if="patient.address">
          <td id="address" class="font-weight-black">Address:</td>
          <td>{{ patient.address }}</td>
        </tr>
        <tr v-if="patient.emailAddress">
          <td id="email" class="font-weight-black">Email Address:</td>
          <td>{{ patient.emailAddress }}</td>
        </tr>
        <tr v-if="patient.guardianName">
          <td id="guardian" class="font-weight-black">Guardian Name:</td>
          <td>{{ patient.guardianName }}</td>
        </tr>
        <tr v-if="patient.createdDate">
          <td id="createddate" class="font-weight-black">Created Date:</td>
          <td>{{ patient.createdDate }}</td>
        </tr>
        <tr v-if="patient.bloodPressure">
          <td id="bp" class="font-weight-black">BP:</td>
          <td>{{ patient.bloodPressure }}</td>
        </tr>
        <tr v-if="patient.bloodGroup">
          <td id="bloodgroup" class="font-weight-black">Blood group:</td>
          <td>{{ patient.bloodGroup }}</td>
        </tr>
        <tr v-if="patient.height">
          <td id="height" class="font-weight-black">Height:</td>
          <td>{{ patient.height }}</td>
        </tr>
        <tr v-if="patient.weight">
          <td id="weight" class="font-weight-black">Weight:</td>
          <td>{{ patient.weight }}</td>
        </tr>
        <tr v-if="patient.marriageStatus">
          <td id="marriage" class="font-weight-black">Maritial Status:</td>
          <td>{{ patient.marriageStatus }}</td>
        </tr>
        <tr>
          <td id="isamitted" class="font-weight-black">IDs Admitted</td>
          <td>
            <v-checkbox
              v-model="patient.isAdmitted"
              readonly
              dense
            ></v-checkbox>
          </td>
        </tr>
      </table>
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
  data: () => ({})
};
</script>
