<template>
  <div>
    <div class="breadcrumb" v-if="service != null">
      <router-link to="/">{{ $t("label.menu.dashboard") }}</router-link>
      <router-link to="/patients">{{
        $t("label.breadcrumb.patients")
      }}</router-link>
      <router-link :to="`/patients/${service.patient.id}`">{{
        service.patient.name
      }}</router-link>
      <router-link
        :to="`/consultations/${this.$route.params.id}`"
        class="active"
        >service ({{ this.$route.params.id }})</router-link
      >
    </div>

    <v-card class="mx-auto">
      <v-toolbar dark v-if="service != null" prominent color="primary">
        <v-container fluid>
          <v-row no-gutters>
            <v-col cols="12" md="3">
              <v-icon :color="service.isActive ? 'green' : 'gray'"
                >mdi-circle</v-icon
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <v-dialog v-model="dialog" persistent dark max-width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    medium
                    v-if="service.isActive"
                    class="button"
                    v-bind="attrs"
                    v-on="on"
                    ><v-icon small>mdi-close-circle</v-icon>&nbsp; Close
                    consultation</v-btn
                  >
                </template>
                <v-card flat class="text-xs-center">
                  <v-card-title primary-title class="justify-center">
                    <div>
                      <h2 class="font-weight-black">
                        <v-icon size="48" color="yellow"
                          >mdi-alert-octagon-outline</v-icon
                        >&nbsp;&nbsp;End service ?
                      </h2>
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
                      admission visits, Service costs etc. Click agree if you
                      are okay with this or Disagree to cancel this operation
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
              <v-autocomplete
                dense
                :items="staffs"
                v-model="selectedstaffId"
                item-text="fullName"
                item-value="id"
                persistent-hint
                return-object
                solo
                flat
                light
                small-chips
                class="mx-3 mt-4 d-flex align-bottom"
                @focus="$store.dispatch('fetchAllStaffs')"
                label="Re/Assign staffs"
                @change="_assign_staff()"
              >
                <template slot="selection" slot-scope="data">
                  <v-chip
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    close
                    @click="data.select"
                    @click:close="remove(data.item)"
                  >
                    <v-avatar left>
                      <v-img
                        :src="
                          data.item.imageUrl === null
                            ? thumbnail
                            : data.item.imageUrl
                        "
                      ></v-img>
                    </v-avatar>
                    {{
                      data.item.fullName === null
                        ? data.item.username
                        : data.item.fullName
                    }}
                  </v-chip>
                </template>

                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content
                      v-text="data.item"
                    ></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-avatar>
                      <v-img
                        :src="
                          data.item.imageUrl === null
                            ? thumbnail
                            : data.item.imageUrl
                        "
                        alt="image"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="
                          data.item.fullName === null
                            ? data.item.username
                            : data.item.fullName
                        "
                      ></v-list-item-title>
                      <v-list-item-subtitle>
                        {{ data.item.department.name }} [
                        {{ data.item.user.roles[0].name }} ]
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" md="3">
              <br />
            </v-col>
            <v-col cols="12" md="3" v-if="isMdAndUp">
              <v-container fluid>
                <v-card outlined light dense>
                  <v-list-item three-line>
                    <v-list-item-avatar size="60">
                      <v-img
                        :src="
                          service.patient.patientPhoto == null
                            ? thumbnail
                            : filebaseUri + service.patient.patientPhoto
                        "
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        ><strong>Patient:</strong>&nbsp;&nbsp;{{
                          service.patient.name
                        }}</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        <strong>Weight</strong>&nbsp;&nbsp;{{
                          service.patient.weight
                        }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <strong>Blood pressure</strong>&nbsp;&nbsp;
                        {{ service.patient.bloodPressure }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-container>
            </v-col>
            <v-col cols="12" md="3" v-if="service.staff && isMdAndUp">
              <v-container fluid>
                <v-card outlined dense light>
                  <v-list-item three-line>
                    <v-list-item-avatar size="60">
                      <v-img
                        :src="
                          service.staff.imageUrl == null
                            ? thumbnail
                            : service.staff.imageUrl
                        "
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        ><strong>Staff:</strong>&nbsp;&nbsp;{{
                          service.staff.fullName == null
                            ? service.staff.username
                            : service.staff.fullName
                        }}</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        <strong>Phone</strong>&nbsp;&nbsp;{{
                          service.staff.contacts
                        }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <strong>Email</strong>&nbsp;&nbsp;
                        {{ service.staff.email }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-toolbar>
      <v-progress-circular
        v-if="service == null"
        indeterminate
        color="grey lighten-5"
        size="16"
      ></v-progress-circular>
      <div v-else>
        <v-card-text class="ma-0 pa-0">
          <v-tabs
            slider-color="blue"
            background-color="primary"
            slider-size="3"
            left
            dark
            v-model="tab"
            class="elevation-2"
            show-arrows-on-hover="true"
            :show-arrows="$vuetify.breakpoint.mobile"
          >
            <v-tab class="font-weight-normal">
              <v-icon small left>mdi-stethoscope</v-icon>
              Diagnoses
            </v-tab>

            <v-tab
              class="font-weight-normal"
              @click="
                getMedicalServices();
                getServiceChargesAndCosts();
              "
            >
              <v-icon small left>mdi-plus-box</v-icon>
              Services
            </v-tab>
            <v-tab
              class="font-weight-normal"
              @click="getServiceChargesAndCosts()"
            >
              <v-icon small left>mdi-pill</v-icon>
              Medications
            </v-tab>
            <v-tab
              class="font-weight-normal"
              @click="getConsultationLaboratoryReports()"
            >
              <v-icon small left>mdi-microscope</v-icon>
              Laboratory reports
            </v-tab>
            <v-tab
              class="font-weight-normal"
              @click="getServiceChargesAndCosts"
            >
              <v-icon small left>mdi-credit-card</v-icon>
              Costs
            </v-tab>

            <v-tab class="font-weight-normal" @click="getServiceAdmissions">
              <v-icon small left>mdi-bed</v-icon>
              Admissions
            </v-tab>
          </v-tabs>
          <v-tabs-items vertical v-model="tab" class="default">
            <v-tab-item>
              <tb-diagnoses
                v-bind:diagnoses="service.diagnoses"
                :isActive="service.isActive"
              ></tb-diagnoses>
            </v-tab-item>

            <v-tab-item>
              <tb-medical-services
                :transaction="service_transactions"
                :isActive="service.isActive"
                v-on:update="getServiceChargesAndCosts"
              ></tb-medical-services>
            </v-tab-item>
            <v-tab-item>
              <tb-medications
                :transaction="service_transactions"
                :isActive="service.isActive"
                v-on:update="getServiceChargesAndCosts"
              ></tb-medications>
            </v-tab-item>

            <v-tab-item>
              <tb-reports
                :files="reportfiles"
                v-on:update-report="checkevent"
              ></tb-reports>
            </v-tab-item>
            <v-tab-item>
              <tb-charges
                :transaction="service_transactions"
                v-on:update="getServiceChargesAndCosts"
              ></tb-charges>
            </v-tab-item>

            <v-tab-item>
              <tb-admissions
                :admissions="admissions"
                :userdata="service.patient"
                :isactive="service.isActive"
              ></tb-admissions>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>
<script>
import DoctorTab from "@/components/consultation/tabs/doctor";
import BiographTab from "@/components/consultation/tabs/biograph";
import DiagnosesTab from "@/components/consultation/tabs/diagnoses";
import AdmissionsTab from "@/components/consultation/tabs/admissions";
import c_type_divider from "@/components/consultation/c_type_divider";
import AddressCard from "@/components/consultation/c_address_card";
import ConsultationsTab from "@/components/consultation/tabs/consultations";
import ChargesAndConstsTab from "@/components/consultation/tabs/charges";
import MedicalServicesTab from "@/components/consultation/tabs/medicalservices";
import MedicineServiceTab from "@/components/consultation/tabs/medications";
import ReportsTab from "@/components/consultation/tabs/reports";

export default {
  props: {
    userdata: {
      type: Object,
      default: null,
    },
  },
  components: {
    "v-type-divider": c_type_divider,
    "v-address-card": AddressCard,
    "tb-biograph": BiographTab,
    "tb-doctor": DoctorTab,
    "tb-diagnoses": DiagnosesTab,
    "tb-admissions": AdmissionsTab,
    "tb-consultations": ConsultationsTab,
    "tb-charges": ChargesAndConstsTab,
    "tb-medical-services": MedicalServicesTab,
    "tb-medications": MedicineServiceTab,
    "tb-reports": ReportsTab,
  },
  data: function () {
    return {
      tab: null,
      service: null,
      dialog: false,
      admissions: null,
      service_transactions: null,
      selectedstaffId: null,
      reportfiles: null,
    };
  },
  methods: {
    async getServiceById() {
      return await this.$api
        .$get(`consultations/${this.$route.params.id}`)
        .then((response) => {
          if (response !== null) {
            this.service = response;
            this.selectedstaffId = response.staff.id;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onServiceUpdate: function () {
      this.getServiceById();
    },
    async getServiceAdmissions() {
      return await this.$api
        .$get(`admissions/${this.$route.params.id}/?command=service`)
        .then((response) => {
          if (response !== null) {
            this.admissions = response;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getConsultationLaboratoryReports() {
      return await this.$api
        .$get(`consultations/${this.$route.params.id}/files`)
        .then((response) => {
          if (response !== null) {
            this.reportfiles = response;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getServiceChargesAndCosts() {
      return await this.$api
        .$get(`transactions/${this.$route.params.id}/consultation`)
        .then((response) => {
          if (response !== null) {
            this.service_transactions = response;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async endThisService() {
      this.dialog = false;
      return await this.$api
        .$put(`consultations/${this.$route.params.id}`)
        .then((response) => {
          if (response !== null) {
            this.getServiceById();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMedicalServices() {
      this.$store.dispatch("get_medical_services");
    },
    updatestafflist() {
      this.$store.dispatch("fetchAllStaffs");
    },
    checkevent() {
      console.log("This event");
      this.getConsultationLaboratoryReports();
    },
    async _assign_staff() {
      if (this.selectedstaffId.id != null) {
        return await this.$api
          .$put(
            `consultations/${this.$route.params.id}/${this.selectedstaffId.id}/`
          )
          .then((response) => {
            if (response !== null) {
              this.onServiceUpdate();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    remove(i) {
      console.log(i);
    },
  },
  created() {
    this.getServiceById();
  },
  computed: {
    staffs: {
      get() {
        return this.$store.getters.staffs;
      },
    },
  },
};
</script>
