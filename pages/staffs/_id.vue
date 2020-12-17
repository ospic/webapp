<template>
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
                src="https://cache.moviestillsdb.com/i/500x/uawbx6ps/prison-break-lg.jpg"
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
          <h2>Info</h2>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      staffdata: null
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
    }
  },
  created() {
    this.getStaffById();
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
