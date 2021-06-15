<template>
  <div>
    <div class="breadcrumb" v-if="patient != null">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/patients">{{
        $t("label.breadcrumb.patients")
      }}</router-link>
      <router-link :to="`/patients/${this.$route.params.id}`">{{
        patient.name
      }}</router-link>

      <router-link to="/patients" class="active">{{
        $t("label.breadcrumb.viewcontact")
      }}</router-link>
    </div>
    <v-container fluid grid-list-md>
      <v-card>
        <v-toolbar dark flat color="primary">
          <h3>View contact</h3>
        </v-toolbar>
        <v-layout row wrap align-center class="mt-3">
          <v-flex xs12 sm12 md12 order-md2 order-sm2>
            <v-row justify="space-around" no-gutters v-if="!isDataLoaded">
              <v-col cols="12" xs="12" sm="12" md="3">
                <v-card ro>
                  <v-img
                    height="200px"
                    :src="
                      require('../../../../assets/images/body_background.jpg')
                    "
                  >
                    <v-app-bar flat color="rgba(0, 0, 0, 0)">
                      <v-toolbar-title class="title primary--text pl-0">
                        {{ patient.name }} Contacts
                      </v-toolbar-title>

                      <v-spacer></v-spacer>

                      <v-btn class="primary" small fab @click="edit = !edit">
                        <v-icon small>mdi-pencil</v-icon>
                      </v-btn>
                    </v-app-bar>

                    <v-card-title class="white--text mt-8">
                      <v-avatar size="56" color="white">
                        <v-icon class="primary--text">mdi-phone-classic</v-icon>
                      </v-avatar>
                      <p class="ml-3" v-html="username"></p>
                    </v-card-title>
                  </v-img>

                  <v-card-text>
                    <v-timeline align-top dense>
                      <v-timeline-item color="primary" small>
                        <div>
                          <div class="font-weight-normal">
                            <strong>City</strong>
                          </div>
                          <v-text-field
                            dense
                            v-if="edit"
                            v-model="contact.city"
                          ></v-text-field>
                          <div v-else>{{ contact.city }}</div>
                        </div>
                      </v-timeline-item>
                      <v-timeline-item color="primary" small>
                        <div>
                          <div class="font-weight-normal">
                            <strong>State</strong>
                          </div>

                          <v-text-field
                            dense
                            v-if="edit"
                            v-model="contact.state"
                          ></v-text-field>
                          <div v-else>{{ contact.state }}</div>
                        </div>
                      </v-timeline-item>
                      <v-timeline-item color="primary" small>
                        <div>
                          <div class="font-weight-normal">
                            <strong>Location</strong>
                          </div>
                          <v-text-field
                            dense
                            v-if="edit"
                            v-model="contact.physical_address"
                          ></v-text-field>
                          <div v-else>{{ contact.physical_address }}</div>
                        </div>
                      </v-timeline-item>
                      <v-timeline-item color="primary" small>
                        <div>
                          <div class="font-weight-normal">
                            <strong>Email Adress</strong>
                          </div>
                          <v-text-field
                            dense
                            v-if="edit"
                            type="email"
                            v-model="contact.email_address"
                          ></v-text-field>
                          <div v-else>{{ contact.email_address }}</div>
                        </div>
                      </v-timeline-item>
                      <v-timeline-item color="primary" small>
                        <div>
                          <div class="font-weight-normal">
                            <strong>Home Phone</strong>
                          </div>
                          <v-text-field
                            dense
                            v-if="edit"
                            v-model="contact.home_phone"
                          ></v-text-field>
                          <div v-else>{{ contact.home_phone }}</div>
                        </div>
                      </v-timeline-item>
                      <v-timeline-item color="primary" small>
                        <div>
                          <div class="font-weight-normal">
                            <strong>Mobile Phone</strong>
                          </div>
                          <v-text-field
                            dense
                            v-if="edit"
                            v-model="contact.work_phone"
                          ></v-text-field>
                          <div v-else>{{ contact.work_phone }}</div>
                        </div>
                      </v-timeline-item>
                      <v-timeline-item color="primary" small>
                        <div>
                          <div class="font-weight-normal">
                            <strong>Is Reachable</strong>

                            <v-checkbox
                              v-model="contact.isReachable"
                              required
                              :readonly="!edit"
                            ></v-checkbox>
                          </div>
                        </div>
                      </v-timeline-item>
                      <v-btn v-if="edit" block class="primary" @click="submit"
                        >Submit</v-btn
                      >
                    </v-timeline>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="5">
                <v-card outlined v-if="edit">
                  <v-card-title>
                    <h3>Your edits</h3>
                  </v-card-title>
                  <v-card-text>
                    <v-timeline align-top dense>
                      <v-timeline-item color="info" small>
                        <div>
                          <div class="font-weight-normal">
                            <strong>City</strong>
                          </div>

                          <div>{{ contact.city }}</div>
                        </div>
                      </v-timeline-item>
                      <v-timeline-item color="info" small>
                        <div>
                          <div class="font-weight-normal">
                            <strong>State</strong>
                          </div>
                          <div>{{ contact.state }}</div>
                        </div>
                      </v-timeline-item>
                      <v-timeline-item color="info" small>
                        <div>
                          <div class="font-weight-normal">
                            <strong>Location</strong>
                          </div>

                          <div>{{ contact.physical_address }}</div>
                        </div>
                      </v-timeline-item>
                      <v-timeline-item color="info" small>
                        <div>
                          <div class="font-weight-normal">
                            <strong>Email Adress</strong>
                          </div>

                          <div>{{ contact.email_address }}</div>
                        </div>
                      </v-timeline-item>
                      <v-timeline-item color="info" small>
                        <div>
                          <div class="font-weight-normal">
                            <strong>Home Phone</strong>
                          </div>

                          <div>{{ contact.home_phone }}</div>
                        </div>
                      </v-timeline-item>
                      <v-timeline-item color="info" small>
                        <div>
                          <div class="font-weight-normal">
                            <strong>Mobile Phone</strong>
                          </div>

                          <div>{{ contact.work_phone }}</div>
                        </div>
                      </v-timeline-item>
                      <v-timeline-item color="info" small>
                        <div>
                          <div class="font-weight-normal">
                            <strong>Is Reachable</strong>

                            <v-checkbox
                              color="info"
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
            </v-row>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    contact: {},
    edit: false,
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
    },
    submit: function() {
      var contact = this.contact;
      delete contact.patient;
      var payload = {
        id: contact.id,
        contact: contact
      };
      this.$store.dispatch("updatepatientcontacts", payload).then(() => {
        this.edit = false;
      });
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
      return this.contact.patient.patientPhoto;
    },
    username: function() {
      return this.contact.patient.first_name;
    },
    patient() {
      return this.$store.getters.patient(parseInt(this.$route.params.id));
    }
  }
};
</script>
