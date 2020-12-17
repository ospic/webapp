<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-start wrap>
      <v-flex xs12 md3 sm12 class="mt-0 ml-0 ">
        <v-container py-0>
          <v-layout wrap>
            <v-flex xs12 md12 class="pa-0 ma-0">
              <v-card class="mx-auto" flat>
                <v-img
                  :src="entityThumbNail"
                  lazy-src="https://boylancode.com/wp-content/uploads/2018/09/Man-Placeholder-Headshot.png"
                  aspect-ratio="1"
                  class="grey lighten-2 align-end"
                  height="200px"
                  max-height="200px"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                  <v-card-title>
                    <v-list three-line flat width="100%">
                      <v-list-item>
                        <v-list-item-avatar>
                          <v-img :src="entityThumbNail"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>
                            {{ userdata.name }}</v-list-item-title
                          >
                          <v-list-item-subtitle
                            v-if="userdata.contactsInformation"
                            v-html="userdata.contactsInformation.city"
                          ></v-list-item-subtitle>
                          <v-list-item-subtitle
                            v-else
                            v-html="userdata.country"
                          >
                          </v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-icon>
                          <div class="text-center">
                            <v-dialog
                              v-model="uploaddialog"
                              persistent
                              max-width="600"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  color="warning"
                                  fab
                                  x-small
                                  dark
                                  v-if="entityThumbNail != null"
                                  @click.stop="deletePatientProfilePic()"
                                >
                                  <v-icon>mdi-trash-can-outline</v-icon>
                                </v-btn>
                                <v-btn
                                  v-else
                                  fab
                                  color="primary"
                                  dark
                                  v-bind="attrs"
                                  v-on="on"
                                  x-small
                                >
                                  <v-icon>mdi-progress-upload</v-icon>
                                </v-btn>
                              </template>
                              <v-card>
                                <v-card-title class="headline">
                                  Changing {{ userdata.first_name }}&nbsp;{{
                                    userdata.last_name
                                  }}
                                  profile picture
                                </v-card-title>
                                <v-card-text>
                                  <v-file-input
                                    label="Profile picture"
                                    accept="image/png, image/jpeg, image/bmp"
                                    prepend-icon="mdi-camera"
                                    show-size
                                    @change="selectFile"
                                  >
                                    <template v-slot:selection="{ text }">
                                      <v-chip small label color="primary">
                                        {{ text }}
                                      </v-chip>
                                    </template>
                                  </v-file-input>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    color="primary"
                                    @click.stop="uploaddialog = false"
                                    x-small
                                  >
                                    Cancel
                                  </v-btn>
                                  <v-btn
                                    color="warning"
                                    x-small
                                    shaped
                                    @click="uploadPatientImage()"
                                  >
                                    Save
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </v-dialog>
                          </div>
                        </v-list-item-icon>
                      </v-list-item>
                    </v-list>
                  </v-card-title>
                </v-img>
                <v-card-text>
                  <v-flex xs12 md12 class="ma-0 pa-0">
                    <v-type-divider type="Info"></v-type-divider>
                  </v-flex>
                  <v-flex xs12 md12 class="ma-0 pa-0">
                    <v-btn
                      x-small
                      rounded
                      color="primary"
                      v-if="address"
                      :to="`/patients/${userdata.id}/contacts/`"
                      >View contacts</v-btn
                    >
                    <v-btn
                      x-small
                      rounded
                      color="primary"
                      v-else
                      :to="`/patients/${userdata.id}/contacts/add`"
                    >
                      Add contacts
                    </v-btn>
                    <v-btn
                      :to="`/patients/${userdata.id}/contacts/edit`"
                      x-small
                      rounded
                      v-if="address"
                      >Edit Contacts</v-btn
                    >
                  </v-flex>
                  <v-flex xs12 md12 class="ma-0 pa-0" v-if="address !== null">
                    <v-address-card :address="address"></v-address-card>
                  </v-flex>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs12 md9 sm12 class="ma-0 pa-0 lighten-2">
        <v-card flat class="ma-0 pa-0">
          <v-list class="ma-0 pa-0">
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
                      <span><v-icon small left>mdi-account</v-icon>Doctor</span>
                    </v-tab>
                    <v-tab
                      class="font-weight-normal"
                      @click.stop="getThisUserPosts()"
                    >
                      <v-icon small left>mdi-medical-bag</v-icon>
                      Diagnoses
                    </v-tab>
                    <v-tab
                      class="font-weight-normal"
                      @click.stop="getPatientAdmissions()"
                    >
                      <v-icon small left>mdi-history</v-icon>
                      Admission History
                    </v-tab>
                    <v-tab class="font-weight-normal">
                      <v-icon small left>mdi-plus</v-icon>
                      Actions
                    </v-tab>
                    <v-tab class="font-weight-normal">
                      <v-icon small left>mdi-plus</v-icon>
                      More
                    </v-tab>
                  </v-tabs>
                  <v-tabs-items vertical v-model="tab">
                    <v-tab-item>
                      <tb-biograph :patient="userdata"></tb-biograph>
                    </v-tab-item>
                    <v-tab-item>
                      <tb-doctor
                        v-bind:staff="staff"
                        v-bind:staffs="staffs"
                      ></tb-doctor>
                    </v-tab-item>
                    <v-tab-item>
                      <tb-diagnoses v-bind:diagnoses="diagnoses"></tb-diagnoses>
                    </v-tab-item>
                    <v-tab-item>
                      <tb-admissions
                        :admissions="admissions"
                        :userdata="userdata"
                      ></tb-admissions>
                    </v-tab-item>
                    <v-tab-item>
                      <h1>More</h1>
                    </v-tab-item>
                    <v-tab-item>
                      <h1>More</h1>
                    </v-tab-item>
                  </v-tabs-items>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="js">

import DoctorTab from "@/components/profile/tabs/doctor"
import BiographTab from "@/components/profile/tabs/biograph"
import DiagnosesTab from "@/components/profile/tabs/diagnoses"
import AdmissionsTab from "@/components/profile/tabs/admissions"
import c_type_divider from "@/components/profile/c_type_divider";
import AddressCard from "@/components/profile/c_address_card";

export default {
  props: {
    userdata:{
      type: Object,
      default: null
    }
    },
  components: {
    'v-type-divider': c_type_divider,
    'v-address-card': AddressCard,
    'tb-biograph': BiographTab,
    'tb-doctor': DoctorTab,
    'tb-diagnoses': DiagnosesTab,
    'tb-admissions': AdmissionsTab
  },
  data() {
    return {
      dialog: false,
      uploaddialog: false,
      currentFile: undefined,
      rate: false,
      tab: null,
      valid: true,
      rating: 2,
      posts: null,
      comments: null,
      admissions: null,
      followings: null,
      followers: null,
      selectedstaffId: null,
      date: new Date().toISOString().substr(0, 7),
      menu: false,
      modal: false,
     emptyIcon: 'mdi-star-outline',
      fullIcon: 'mdi-star',
      halfIcon: 'mdi-star-half-full',
      address: null,
      staff:null,
      diagnoses: null,
        attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
      },



    }
  },
  created() {
    this.address = this.userdata.contactsInformation;
    this.staff = this.userdata.staff;
    this.$store.dispatch("fetchAllStaffs");
  },
  computed:{
      entityThumbNail: function() {
            return this.userdata.patientPhoto;
    },
     staffs: {
      get() {
        return this.$store.getters.staffs;
      }
    }
  },
  methods: {

    selectFile(file) {
      this.progress = 0;
      this.currentFile = file;
    },
    async getThisUserPosts() {
      console.log("Clicked" + this.$route.params.id)
      return await this.$api.$get(`diagnoses/${this.$route.params.id}/`)
        .then(response => {
          this.diagnoses = response.reverse();
        }).catch(error => {
          console.log(error);

        });
    },

    async uploadPatientImage() {
      const formData = new FormData();
      formData.append("file", this.currentFile )

      return await this.$api.$patch(`/patients/${this.$route.params.id}/images/`,formData)
        .then(response => {
          if (response !== null) {
            this.uploaddialog = false
            this.$parent.viewusedata();
          }
        }).catch(error => {
          console.log(error);

        });

    },
    async deletePatientProfilePic() {
      console.log(this.userdata.patientPhoto.split('/').pop());
      return await this.$api.$delete(`/patients/${this.$route.params.id}/images/${this.userdata.patientPhoto.split('/').pop()}`)
        .then(response => {
          if (response !== null) {
            this.$parent.viewusedata();
          }
        }).catch(error => {
          console.log(error);

        });

    },
    async getPatientAdmissions() {
      return await this.$api.$get(`admissions/${this.$route.params.id}/?command=patient`)
        .then(response => {
          if (response !== null) {
            this.admissions = response;
          }
        }).catch(error => {
          console.log(error);

        });
    },
    get_average_rgb(img) {
    var context = document.createElement('canvas').getContext('2d');
    if (typeof img == 'string') {
        var src = img;
        img = new Image;
        img.setAttribute('crossOrigin', '');
        img.src = src;
    }
    context.imageSmoothingEnabled = true;
    context.drawImage(img, 0, 0, 1, 1);
    return context.getImageData(1, 1, 1, 1).data.slice(0,3);
}

  }
}
</script>
<style>
.basil {
  background-color: #fffbe6 !important;
}

.basil--text {
  color: #356859 !important;
}
.v-window,
.v-item-group .v-window__container,
.v-window-item {
  width: 100%;
}
</style>
