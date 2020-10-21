<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap align-center>
      <v-flex xs12 sm12 md12 order-md2 order-sm2>
        <v-row justify="space-around" no-gutters v-if="!isDataLoaded">
          <v-col cols="12" md="2"></v-col>
          <v-col cols="12" md="4" class="pr-2">
            <v-card width="400">
              <v-img
                height="200px"
                src="https://static.timesofisrael.com/www/uploads/2017/02/Hitlers-Phone-Auction_Horo-640x400.jpg"
              >
                <v-app-bar flat color="rgba(0, 0, 0, 0)">
                  <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

                  <v-toolbar-title class="title white--text pl-0">
                    Contacts
                  </v-toolbar-title>

                  <v-spacer></v-spacer>

                  <v-btn color="white" icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-app-bar>

                <v-card-title class="white--text mt-8">
                  <v-avatar size="56">
                    <img alt="user" :src="itemThumbnail" />
                  </v-avatar>
                  <p class="ml-3" v-html="username"></p>
                </v-card-title>
              </v-img>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card width="400" outlined>
              <v-card-text>
                <v-timeline align-top dense>
                  <v-timeline-item color="primary" small>
                    <div>
                      <div class="font-weight-normal">
                        <strong>City</strong>
                      </div>
                      <div>{{ contact.city }}</div>
                    </div>
                  </v-timeline-item>
                  <v-timeline-item color="primary" small>
                    <div>
                      <div class="font-weight-normal">
                        <strong>State</strong>
                      </div>
                      <div>{{ contact.state }}</div>
                    </div>
                  </v-timeline-item>
                  <v-timeline-item color="primary" small>
                    <div>
                      <div class="font-weight-normal">
                        <strong>Location</strong>
                      </div>
                      <div>{{ contact.physical_address }}</div>
                    </div>
                  </v-timeline-item>
                  <v-timeline-item color="primary" small>
                    <div>
                      <div class="font-weight-normal">
                        <strong>Email Adress</strong>
                      </div>
                      <div>{{ contact.email_address }}</div>
                    </div>
                  </v-timeline-item>
                  <v-timeline-item color="primary" small>
                    <div>
                      <div class="font-weight-normal">
                        <strong>Home Phone</strong>
                      </div>
                      <div>{{ contact.home_phone }}</div>
                    </div>
                  </v-timeline-item>
                  <v-timeline-item color="primary" small>
                    <div>
                      <div class="font-weight-normal">
                        <strong>Mobile Phone</strong>
                      </div>
                      <div>{{ contact.work_phone }}</div>
                    </div>
                  </v-timeline-item>
                  <v-timeline-item color="primary" small>
                    <div>
                      <div class="font-weight-normal">
                        <strong>Is Reachable</strong>
                        <v-checkbox
                          v-model="contact.isReachable"
                          required
                          readonly
                        ></v-checkbox>
                      </div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="2"></v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    contact: {},
    messages: [
      {
        from: "You",
        message: `Sure, I'll see you later.`,
        time: "10:42am",
        color: "deep-purple lighten-1"
      },
      {
        from: "John Doe",
        message: "Yeah, sure. Does 1:00pm work?",
        time: "10:37am",
        color: "green"
      },
      {
        from: "You",
        message: "Did you still want to grab lunch today?",
        time: "9:47am",
        color: "deep-purple lighten-1"
      }
    ]
  }),
  methods: {
    async viewusedata() {
      return await this.$api
        .$get(`contacts/${this.$route.params.id}/`)
        .then(response => {
          this.contact = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
  },
  created() {
    this.viewusedata();
  },
  computed: {
    isDataLoaded() {
      return this.isEmpty(this.contact);
    },
    itemThumbnail: function() {
      return this.contact.patient.imageThumbnail;
    },
    username: function() {
      return this.contact.patient.first_name;
    }
  }
};
</script>
