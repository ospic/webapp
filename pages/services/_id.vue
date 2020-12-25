<template>
  <v-flex class="ma-0 pa-0 lighten-2">
    <v-card flat class="ma-0 pa-0">
      <v-list class="ma-0 pa-0">
        <v-progress-circular
          v-if="service == null"
          indeterminate
          color="grey "
          size="32"
        ></v-progress-circular>
        <div v-else>
          <v-card-title>
            <v-row no-gutters>
              <v-col cols="12" md="4">
                <v-icon :color="service.isActive ? 'green' : 'gray'"
                  >mdi-circle</v-icon
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <v-btn
                  small
                  v-if="service.isActive"
                  class="primary"
                  @click.stop="endThisService"
                  >End service</v-btn
                >
              </v-col>
              <v-col cols="12" md="4">
                <table
                  style="width:60%; text-align: start; background-color: #FAFAFA"
                  class="pa-0"
                >
                  <tr v-if="service.patient.id">
                    <td id="Patient" class="font-weight-black">Patient</td>
                    <td>{{ service.patient.name }}</td>
                  </tr>

                  <tr>
                    <td id="Phone" class="font-weight-black">Weight</td>
                    <td>{{ service.patient.weight }}</td>
                  </tr>
                  <tr>
                    <td id="Phone" class="font-weight-black">BP</td>
                    <td>{{ service.patient.bloodPressure }}</td>
                  </tr>
                </table>
              </v-col>
              <v-col cols="12" md="4" v-if="service.staff">
                <table
                  style="width:60%; text-align: start; background-color: #FAFAFA"
                  class="pa-0"
                >
                  <tr v-if="service.patient.id">
                    <td id="Patient" class="font-weight-black">Staff</td>
                    <td>
                      {{
                        service.staff.fullName == null
                          ? service.staff.username
                          : service.staff.fullName
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td id="Phone" class="font-weight-black">Phone</td>
                    <td>{{ service.staff.contacts }}</td>
                  </tr>
                  <tr>
                    <td id="Phone" class="font-weight-black">Email</td>
                    <td>{{ service.staff.email }}</td>
                  </tr>
                </table>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-list-item-group color="primary">
              <v-list-item inactive class="ma-0 pa-0" :ripple="false">
                <v-list-item-content class="ma-0 pa-0">
                  <v-tabs
                    slider-color="primary"
                    background-color="#FAFAFA"
                    slider-size="3"
                    color="primary"
                    left
                    v-model="tab"
                    class="elevation-2"
                  >
                    <v-tab class="ffont-weight-normal">
                      <span><v-icon small left>mdi-eye</v-icon>Biography</span>
                    </v-tab>
                    <v-tab class="font-weight-normal">
                      <span><v-icon small left>mdi-bag</v-icon>Staff</span>
                    </v-tab>
                    <v-tab class="font-weight-normal">
                      <v-icon small left>mdi-medical-bag</v-icon>
                      Diagnoses
                    </v-tab>
                    <v-tab class="font-weight-normal">
                      <v-icon small left>mdi-history</v-icon>
                      Admission History
                    </v-tab>
                    <v-tab class="font-weight-normal">
                      <v-icon small left>mdi-credit-card</v-icon>
                      Charges & Costs
                    </v-tab>
                    <v-tab class="font-weight-normal">
                      <v-icon small left>mdi-plus</v-icon>
                      Medicines
                    </v-tab>
                  </v-tabs>
                  <v-tabs-items vertical v-model="tab">
                    <v-tab-item>
                      <tb-biograph :patient="service.patient"></tb-biograph>
                    </v-tab-item>
                    <v-tab-item>
                      <tb-doctor
                        v-bind:staff="service.staff"
                        v-bind:staffs="staffs"
                      ></tb-doctor>
                    </v-tab-item>
                    <v-tab-item>
                      <tb-diagnoses
                        v-bind:diagnoses="service.diagnoses"
                        :isActive="service.isActive"
                      ></tb-diagnoses>
                    </v-tab-item>
                    <v-tab-item>
                      <tb-admissions
                        :admissions="service.admissions"
                        :userdata="service.patient"
                      ></tb-admissions>
                    </v-tab-item>
                    <v-tab-item>
                      <h1 class="pa-2">
                        List of all service charges from
                        <a
                          href="https://github.com/ospic/platform/issues/139"
                          target="_blank"
                          >Master price database table</a
                        >, written in General Ledger
                      </h1>
                    </v-tab-item>
                    <v-tab-item>
                      <h1 class="pa-2">
                        Medicines
                      </h1>
                    </v-tab-item>
                  </v-tabs-items>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-card-text>
        </div>
      </v-list>
    </v-card>
  </v-flex>
</template>
<script>
import DoctorTab from "@/components/profile/tabs/doctor";
import BiographTab from "@/components/profile/tabs/biograph";
import DiagnosesTab from "@/components/profile/tabs/diagnoses";
import AdmissionsTab from "@/components/profile/tabs/admissions";
import c_type_divider from "@/components/profile/c_type_divider";
import AddressCard from "@/components/profile/c_address_card";
import ServicesTab from "@/components/profile/tabs/services";

export default {
  props: {
    userdata: {
      type: Object,
      default: null
    }
  },
  components: {
    "v-type-divider": c_type_divider,
    "v-address-card": AddressCard,
    "tb-biograph": BiographTab,
    "tb-doctor": DoctorTab,
    "tb-diagnoses": DiagnosesTab,
    "tb-admissions": AdmissionsTab,
    "tb-services": ServicesTab
  },
  data: function() {
    return {
      tab: null,
      service: null
    };
  },
  methods: {
    async getServiceById() {
      return await this.$api
        .$get(`services/${this.$route.params.id}`)
        .then(response => {
          if (response !== null) {
            this.service = response;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    async endThisService() {
      return await this.$api
        .$put(`services/${this.$route.params.id}`)
        .then(response => {
          if (response !== null) {
            this.getServiceById();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getServiceById();
  },
  computed: {
    staffs: {
      get() {
        return this.$store.getters.staffs;
      }
    }
  }
};
</script>
