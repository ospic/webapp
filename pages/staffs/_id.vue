<template>
  <div>
    <div class="breadcrumb flat " v-if="staffdata != null">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/staffs">Staffs</router-link>
      <router-link :to="`/staffs/${this.$route.params.id}`" class="active">{{
        this.staffdata.fullName == null
          ? this.staffdata.username
          : this.staffdata.fullName
      }}</router-link>
    </div>
    <v-container class="ma-0 pa-0" fluid>
      <v-row>
        <v-col cols="12" md="3">
          <v-progress-circular
            v-if="staffdata == null"
            indeterminate
            color="grey lighten-5"
            size="16"
          ></v-progress-circular>
          <v-card flat tile outlined v-else>
            <v-card-title class="d-flex flex-row justify-center mb-2">
              <v-avatar size="82">
                <img
                  alt="user"
                  height="100%"
                  width="100%"
                  :src="
                    staffdata.imageUrl == null
                      ? 'https://boylancode.com/wp-content/uploads/2018/09/Man-Placeholder-Headshot.png'
                      : staffdata.imageUrl
                  "
                />
              </v-avatar>
            </v-card-title>
            <div class="d-flex flex-row justify-center mb-2">
              <v-icon class="red--text lighten-4 mx-1">mdi-account-lock</v-icon>
              <v-icon class="blue--text lighten-4 mx-1">mdi-camera</v-icon>
              <v-icon class="orange--text mx-1">mdi-pencil</v-icon>
            </div>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                      <td class="font-weight-bold">{{ item.name }}</td>
                      <td>{{ item.calories }}</td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="9">
          <v-card outlined tile>
            <v-list class="ma-0 pa-0">
              <v-list-item-group color="primary">
                <v-list-item inactive class="ma-0 pa-0" :ripple="false">
                  <v-list-item-content class="ma-0 pa-0">
                    <v-tabs
                      slider-color="primary"
                      slider-size="3"
                      color="primary"
                      left
                      v-model="tab"
                      class="elevation-2"
                    >
                      <v-tab class="ffont-weight-normal">
                        <span><v-icon small left>mdi-eye</v-icon>Profile</span>
                      </v-tab>
                      <v-tab class="font-weight-normal">
                        <span
                          ><v-icon small left>mdi-account</v-icon>Payroll</span
                        >
                      </v-tab>
                      <v-tab class="font-weight-normal">
                        <span>
                          <v-icon small left>mdi-medical-bag</v-icon>
                          Leaves</span
                        >
                      </v-tab>
                      <v-tab class="font-weight-normal">
                        <span
                          ><v-icon small left>mdi-history</v-icon>
                          Attandence</span
                        >
                      </v-tab>
                      <v-tab class="font-weight-normal">
                        <span
                          ><v-icon small left>mdi-plus</v-icon> Document</span
                        >
                      </v-tab>
                      <v-tab class="font-weight-normal">
                        <span>
                          <v-icon small left>mdi-plus</v-icon> Timeline</span
                        >
                      </v-tab>
                      <v-tab
                        class="font-weight-normal"
                        @click="getHistoricalAssignedServices"
                      >
                        <span>
                          <v-icon small left>mdi-plus</v-icon>Service
                          History</span
                        >
                      </v-tab>
                    </v-tabs>
                    <v-tabs-items vertical v-model="tab">
                      <v-tab-item>
                        <h2 class="ma-8">Profile</h2>
                      </v-tab-item>
                      <v-tab-item>
                        <service-card :services="services"></service-card>
                      </v-tab-item>
                      <v-tab-item>
                        <h2 class="ma-8">Leaves</h2>
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
                        <service-card
                          v-else
                          :services="allservices"
                        ></service-card>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ServiceCard from "@/components/profile/card_service";
export default {
  components: {
    "service-card": ServiceCard
  },
  data() {
    return {
      staffdata: null,
      staffpatients: [],
      services: [],
      allservices: null,
      tab: null
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
        .$get(`services/staff/${this.$route.params.id}/?active=true`)
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
        .$get(`services/staff/${this.$route.params.id}/?`)
        .then(response => {
          if (response !== null) {
            this.allservices = response;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleClick: function(value) {
      this.$router.push("/services/" + value.id);
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
            calories:
              this.staffdata.fullName == null
                ? this.staffdata.username
                : this.staffdata.fullName
          },
          {
            name: "Role",
            calories:
              this.staffdata.user == "undefined"
                ? "No role"
                : this.staffdata.user.roles[0].name.toLowerCase()
          },
          {
            name: "Depatment",
            calories: ""
          },
          {
            name: "Work Shift",
            calories: ""
          },
          {
            name: "Location",
            calories: ""
          },
          {
            name: "Jelly bean",
            calories: 375
          },
          {
            name: "Is Staff",
            calories:
              this.staffdata.user.isStaff == "undefined"
                ? ""
                : this.staffdata.user.isStaff
          },
          {
            name: "Level",
            calories:
              this.staffdata.level == null ? "None" : this.staffdata.level
          },
          {
            name: "Phone",
            calories:
              this.staffdata.contacts == null
                ? "None "
                : this.staffdata.contacts
          },
          {
            name: "Email",
            calories: this.staffdata.email
          },
          {
            name: "Joining Date",
            calories: new Date().toISOString().slice(0, 10)
          }
        ];
      }
    }
  }
};
</script>
