<template>
  <div>
    <div class="breadcrumb " v-if="staffdata != null">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/staffs">{{
        $t("label.breadcrumb.staffs")
      }}</router-link>
      <router-link :to="`/staffs/${this.$route.params.id}`" class="active">{{
        this.staffdata.fullName == null
          ? this.staffdata.username
          : this.staffdata.fullName
      }}</router-link>
    </div>
    <v-container class="ma-0 pa-0" fluid>
      <v-row>
        <v-col cols="12" v-if="show_profile" :md="profile_size">
          <v-progress-circular
            v-if="staffdata == null"
            indeterminate
            color="grey lighten-5"
            size="16"
          ></v-progress-circular>
          <v-card flat tile outlined v-else>
            <v-card-title class="d-flex flex-row justify-center mb-2">
              <v-avatar size="82">
                <v-img
                  alt="user"
                  :src="staffThumbnail"
                  :lazy-src="thumbnil"
                ></v-img>
              </v-avatar>
            </v-card-title>
            <div class="d-flex flex-row justify-center mb-2">
              <v-icon class="red--text lighten-4 mx-1">mdi-account-lock</v-icon>
              <v-icon class="blue--text lighten-4 mx-1">mdi-camera</v-icon>
              <v-icon class="orange--text mx-1" @click="_close_open"
                >mdi-eye</v-icon
              >
            </div>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                      <td class="font-weight-bold">{{ item.name }}</td>
                      <td>{{ item.value }}</td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" :md="data_size">
          <v-tabs
            slider-color="secondary"
            background-color="primary"
            :show-arrows="this.$vuetify.breakpoint.mobile"
            color="secondary"
            left
            v-model="tab"
            class="elevation-2"
            dark
          >
            <v-tab class="font-weight-normal">
              <span><v-icon small left>mdi-account</v-icon>Payroll</span>
            </v-tab>
            <v-tab class="font-weight-normal" @click.stop="getAppointments()">
              <span>
                <v-icon small left>mdi-calendar</v-icon
                >{{ $t("label.tab.appointments") }}</span
              >
            </v-tab>
            <v-tab class="font-weight-normal">
              <span><v-icon small left>mdi-history</v-icon> Attandence</span>
            </v-tab>
            <v-tab class="font-weight-normal">
              <span><v-icon small left>mdi-plus</v-icon> Document</span>
            </v-tab>
            <v-tab class="font-weight-normal">
              <span> <v-icon small left>mdi-plus</v-icon> Timeline</span>
            </v-tab>
            <v-tab
              class="font-weight-normal"
              @click="getHistoricalAssignedServices"
            >
              <span>
                <v-icon small left>mdi-plus</v-icon>Consultations History</span
              >
            </v-tab>
          </v-tabs>
          <v-tabs-items vertical v-model="tab">
            <v-tab-item>
              <service-card :services="services"></service-card>
            </v-tab-item>
            <v-tab-item>
              <appointment-component
                :appointments="appointments"
                @update="getAppointments()"
              ></appointment-component>
            </v-tab-item>
            <v-tab-item>
              <h2 class="ma-8">Attendance</h2>
            </v-tab-item>
            <v-tab-item>
              <h1 class="ma-8">Document</h1>
            </v-tab-item>
            <v-tab-item>
              <h1 class="ma-8">Timeline</h1>
            </v-tab-item>
            <v-tab-item>
              <v-progress-circular
                v-if="allservices == null"
              ></v-progress-circular>
              <service-card v-else :services="allservices"></service-card>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ServiceCard from "@/components/consultation/consultation_card";
import AppointmentsComponent from "@/components/staff/tabs/appointments.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    "service-card": ServiceCard,
    "appointment-component": AppointmentsComponent
  },
  data() {
    return {
      staffdata: null,
      staffpatients: [],
      services: [],
      allservices: null,
      tab: null,
      profile_size: 3,
      data_size: 9,
      show_profile: true
    };
  },
  methods: {
    async getStaffById() {
      return await this.$api
        .$get(`staffs/${this.$route.params.id}/`)
        .then(response => {
          this.staffdata = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getStaffPatinets() {
      return await this.$api
        .$get(`staffs/${this.$route.params.id}/patients`)
        .then(response => {
          this.staffpatients = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getAcitveAssignedServices() {
      return await this.$api
        .$get(`consultations/staff/${this.$route.params.id}/?active=true`)
        .then(response => {
          if (response !== null) {
            this.services = response;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getHistoricalAssignedServices() {
      return await this.$api
        .$get(`consultations/staff/${this.$route.params.id}/?`)
        .then(response => {
          if (response !== null) {
            this.allservices = response;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    _close_open() {
      this.data_size = 12;
      this.profile_size = 0;
      this.show_profile = false;
    },
    getAppointments() {
      this.$store.dispatch("get_physician_appointments", this.$route.params.id);
    },
    handleClick: function(value) {
      this.$router.push("/consultations/" + value.id);
    },
    updatePagination: function(val) {
      console.log(val);
    }
  },
  created() {
    this.getStaffById();
    this.getAcitveAssignedServices();
  },
  computed: {
    desserts: {
      get() {
        return [
          {
            name: "Name",
            value:
              this.staffdata.fullName == null
                ? this.staffdata.username
                : this.staffdata.fullName
          },
          {
            name: "Role",
            value:
              this.staffdata.user == "undefined"
                ? "No role"
                : this.staffdata.user.roles[0].name.toLowerCase()
          },
          {
            name: "Depatment",
            value:
              this.staffdata.department == null
                ? "Un-Assigned"
                : this.staffdata.department.name
          },
          {
            name: "Work Shift",
            value: "6:00AM - 12:01PM"
          },
          {
            name: "Location",
            value:
              this.staffdata.department == null
                ? "Not available"
                : this.staffdata.department.extraId
          },

          {
            name: "Is Staff",
            value:
              this.staffdata.user.isStaff == "undefined"
                ? ""
                : this.staffdata.user.isStaff
          },
          {
            name: "Level",
            value: this.staffdata.level == null ? "None" : this.staffdata.level
          },
          {
            name: "Phone",
            value:
              this.staffdata.contacts == null
                ? "None "
                : this.staffdata.contacts
          },
          {
            name: "Email",
            value: this.staffdata.email
          },
          {
            name: "Joining Date",
            value: new Date().toISOString().slice(0, 10)
          }
        ];
      }
    },
    staffThumbnail() {
      return this.filebaseUri + this.staffdata.imageUrl;
    },
    ...mapGetters({
      appointments: "appointments"
    })
  }
};
</script>
