<template>
  <div>
    <fieldset>
      <legend class="">
        <h3>{{ ward.name }}</h3>
      </legend>
      <v-container fluid>
        <v-row align="start" align-content="start" justify="start" dense wrap>
          <v-col v-for="(bed, i) in ward.beds" cols="12" sm="4" md="2" :key="i">
            <v-tooltip
              v-if="bed.isOccupied"
              right
              min-width="230px"
              color="primary "
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="ma-2"
                  v-bind="attrs"
                  v-on="on"
                  :key="bed.id"
                  @mouseenter.stop="callfunction(bed.id)"
                  color="primary"
                  >{{ bed.identifier }}&nbsp;&nbsp;
                  <v-icon>mdi-bed</v-icon>
                </v-btn>
              </template>
              <div>
                <v-progress-circular
                  v-if="patient == null"
                  indeterminate
                  color="grey lighten-5"
                  size="16"
                ></v-progress-circular>
                <div v-else>
                  <v-list-item>
                    <v-list-item-avatar color="green">
                      <v-img :src="patient.patientPhoto"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title class="white--text"
                        ><strong>Name:</strong>&nbsp;&nbsp;{{
                          patient.name
                        }}</v-list-item-title
                      >
                      <v-list-item-subtitle class="white--text"
                        ><strong>Id:</strong>&nbsp;&nbsp;
                        {{ patient.id }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                  <table style="width:100%; text-align: start">
                    <tr>
                      <td id="gender">Gender:</td>
                      <td>{{ patient.gender }}</td>
                    </tr>
                    <tr>
                      <td id="gender">Height:</td>
                      <td>{{ patient.height }}</td>
                    </tr>
                    <tr>
                      <td id="gender">Weight:</td>
                      <td>{{ patient.weight }}</td>
                    </tr>
                    <tr>
                      <td id="gender">Blood Pressure:</td>
                      <td>{{ patient.bloodPressure }}</td>
                    </tr>
                    <tr>
                      <td id="gender">Blood Group:</td>
                      <td>{{ patient.bloodGroup }}</td>
                    </tr>
                    <tr>
                      <td id="gender">Age:</td>
                      <td>{{ patient.age }}</td>
                    </tr>
                    <tr v-if="patient.martiaStatus">
                      <td id="gender">Mariage Status:</td>
                      <td>{{ patient.martiaStatus }}</td>
                    </tr>
                    <tr>
                      <td id="gender">Guardian:</td>
                      <td>{{ patient.guardianName }}</td>
                    </tr>
                    <tr>
                      <td id="gender">Phone:</td>
                      <td>{{ patient.phone }}</td>
                    </tr>
                    <tr>
                      <td id="gender">Email:</td>
                      <td>{{ patient.email }}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </v-tooltip>

            <v-btn v-else class="ma-0" outlined color="green">
              {{ bed.identifier }}&nbsp;&nbsp;
              <v-icon>mdi-bed-queen-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </fieldset>
  </div>
</template>
<script>
export default {
  props: {
    ward: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    patient: null,
    active: false,
    total: 0
  }),
  methods: {
    async callfunction(val) {
      console.log("Call function" + val);
      this.patient = null;
      return await this.$api
        .$get(`admissions/inbed/${val}/`)
        .then(response => {
          this.patient = response[0];
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style scoped>
fieldset {
  background-color: transparent;
  max-width: 100%;
  padding: 16px;
  border: 2px solid green;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
}
.legend1 {
  margin-bottom: 0px;
  margin-left: 0px;
}
</style>
