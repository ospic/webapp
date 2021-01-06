<template>
  <div>
    <div class="breadcrumb " v-if="service != null">
      <router-link to="/">Dashboard</router-link>
      <router-link v-show="!this.$vuetify.breakpoint.mobile" to="/patients"
        >Patients</router-link
      >
      <router-link :to="`/patients/${service.patient.id}`">{{
        service.patient.name
      }}</router-link>
      <router-link :to="`/services/${this.$route.params.id}`" class="active"
        >service ({{ this.$route.params.id }})</router-link
      >
    </div>

    <v-flex class="ma-0 pa-0 default">
      <v-card flat class="ma-0 pa-0 mx-auto ">
        <v-list class="ma-0 pa-0">
          <v-progress-circular
            v-if="service == null"
            indeterminate
            color="grey lighten-5"
            size="16"
          ></v-progress-circular>
          <div v-else>
            <v-card-title>
              <v-row no-gutters>
                <v-col cols="12" md="3">
                  <v-icon :color="service.isActive ? 'green' : 'gray'"
                    >mdi-circle</v-icon
                  >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <v-dialog v-model="dialog" persistent dark max-width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        small
                        v-if="service.isActive"
                        class="primary mb-1"
                        v-bind="attrs"
                        v-on="on"
                        >End service</v-btn
                      >
                    </template>
                    <v-card flat class=" text-xs-center">
                      <v-card-title primary-title class="justify-center">
                        <div>
                          <h2 class="font-weight-black">End service ?</h2>
                        </div>
                      </v-card-title>

                      <v-card-text>
                        <p class="text-justify font-weight-normal">
                          Ending this service will make this service instance
                          <strong> No. {{ service.id }} </strong>
                          &nbsp;for client
                          <strong class="font-weight-normal">{{
                            service.patient.name
                          }}</strong
                          >&nbsp;as inactive for new admissions, diagnoses,
                          admission visits, Service costs etc. Click agree if
                          you are okay with this or Disagree to cancel this
                          operation
                        </p>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          @click="dialog = false"
                          class="font-weight-bold"
                          large
                        >
                          Discard
                        </v-btn>
                        <v-btn
                          color="primary darken-2"
                          class="font-weight-bold"
                          @click.stop="endThisService"
                          large
                        >
                          End service
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
                <v-col cols="12" md="4">
                  <table
                    style="width:100%; text-align: start;"
                    class="pa-0"
                    summary="Patient infos"
                  >
                    <tr v-if="service.patient.id">
                      <td id="Patient" class="font-weight-normal">Patient</td>
                      <td>
                        <small>{{ service.patient.name }}</small>
                      </td>
                    </tr>

                    <tr>
                      <td id="Phone" class="font-weight-normal">Weight</td>
                      <td>
                        <small>{{ service.patient.weight }} </small>
                      </td>
                    </tr>
                    <tr>
                      <td id="Phone" class="font-weight-normal">BP</td>
                      <td>
                        <small>{{ service.patient.bloodPressure }} </small>
                      </td>
                    </tr>
                  </table>
                </v-col>
                <v-col cols="12" md="1">
                  <br />
                </v-col>
                <v-col cols="12" md="4" v-if="service.staff">
                  <table
                    style="width:100%; text-align: start; "
                    class="pa-0"
                    summary="Staff infos"
                  >
                    <tr v-if="service.patient.id">
                      <td id="Patient" class="font-weight-normal">Staff</td>
                      <td>
                        {{
                          service.staff.fullName == null
                            ? service.staff.username
                            : service.staff.fullName
                        }}
                      </td>
                    </tr>
                    <tr>
                      <td id="Phone" class="font-weight-normal">Phone</td>
                      <td>
                        <small>{{ service.staff.contacts }} </small>
                      </td>
                    </tr>
                    <tr>
                      <td id="Phone" class="font-weight-normal">Email</td>
                      <td>
                        <small>{{ service.staff.email }} </small>
                      </td>
                    </tr>
                  </table>
                </v-col>
              </v-row>
            </v-card-title>
            <v-card-text>
              <v-tabs
                slider-color="primary"
                background-color="default"
                slider-size="3"
                left
                v-model="tab"
                class="elevation-2"
                show-arrows-on-hover="true"
                :show-arrows="$vuetify.breakpoint.mobile"
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
                <v-tab class="font-weight-normal" @click="getServiceAdmissions">
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
              <v-tabs-items vertical v-model="tab" class="default">
                <v-tab-item>
                  <tb-biograph :patient="service.patient"></tb-biograph>
                </v-tab-item>
                <v-tab-item>
                  <tb-doctor
                    v-bind:staff="service.staff"
                    v-bind:staffs="staffs"
                    v-on:update-service="onServiceUpdate"
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
                    :admissions="admissions"
                    :userdata="service.patient"
                  ></tb-admissions>
                </v-tab-item>
                <v-tab-item>
                  <h1>Service Charges</h1>
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
              </v-tabs-items>
            </v-card-text>
          </div>
        </v-list>
      </v-card>
    </v-flex>
  </div>
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
      service: null,
      dialog: false,
      admissions: null
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
    onServiceUpdate: function() {
      this.getServiceById();
    },
    async getServiceAdmissions() {
      return await this.$api
        .$get(`admissions/${this.$route.params.id}/?command=service`)
        .then(response => {
          if (response !== null) {
            this.admissions = response;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    async endThisService() {
      this.dialog = false;
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
