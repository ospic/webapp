<template>
  <v-container fill-height fluid grid-list-xl>
    <v-row>
      <v-col xs="12" md="3" sm="12">
        <v-card flat>
          <v-img
            :src="filebaseUri + entityThumbNail"
            lazy-src="https://www.attendanceworks.org/wp-content/uploads/2020/09/img-placeholder.png"
            aspect-ratio="1"
            class="grey lighten-2 align-end"
            height="200px"
            max-height="200px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <v-card-title>
              <v-list three-line flat width="100%" class="default">
                <v-list-item>
                  <v-list-item-avatar size="60">
                    <v-img
                      :src="filebaseUri + entityThumbNail"
                      lazy-src="https://aosa.org/wp-content/uploads/2019/04/image-placeholder-350x350.png"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title> {{ userdata.name }}</v-list-item-title>
                    <v-list-item-subtitle
                      v-if="userdata"
                      v-html="userdata.address"
                    ></v-list-item-subtitle>
                    <v-list-item-subtitle v-else v-html="userdata.country">
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
                            class="button"
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
                            <v-btn x-small shaped @click="uploadPatientImage()">
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
            <p class="overline">Contacts</p>
            <v-divider></v-divider>

            <v-flex xs12 md12 class="ma-0 pa-0" v-if="address !== null">
              <v-address-card :address="address"></v-address-card>
            </v-flex>
          </v-card-text>
          <v-card-actions>
            <v-col>
              <v-btn
                small
                block
                class="button"
                v-if="address"
                dark
                :to="`/patients/${userdata.id}/contacts/`"
                >View contacts</v-btn
              >
              <v-btn
                small
                block
                class="button"
                v-else
                dark
                :to="`/patients/${userdata.id}/contacts/add`"
              >
                Add contacts
              </v-btn>
              <v-btn
                small
                block
                dark
                class="button mt-2"
                v-if="!userdata.hasSelfServiceUserAccount"
                :to="`/patients/${userdata.id}/selfservice`"
              >
                Create self service user
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col xs="12" md="9" sm="12">
        <v-tabs
          slider-color="blue"
          background-color="primary"
          slider-size="3"
          left
          dark
          v-model="tab"
        >
          <v-tab class="ffont-weight-normal">
            <span
              ><v-icon small left>mdi-account-question</v-icon>Biography</span
            >
          </v-tab>

          <v-tab class="font-weight-normal" @click.stop="getPatientServices()">
            <v-icon small left>mdi-clock-check</v-icon>
            Consultations
          </v-tab>
          <v-tab
            class="font-weight-normal"
            @click.stop="getPatientInsurances()"
          >
            <v-icon small left>mdi-shield-sun</v-icon>
            Insurances
          </v-tab>
        </v-tabs>
        <v-tabs-items vertical v-model="tab">
          <v-tab-item class="default">
            <tb-biograph :patient="userdata"></tb-biograph>
          </v-tab-item>

          <v-tab-item class="default">
            <div class="">
              <v-btn
                class="button small ma-2"
                small
                v-if="!userdata.isActive"
                @click.stop="initiateServiceInstance()"
                ><v-icon small left>mdi-plus</v-icon>New consultation</v-btn
              >
              <tb-services :services="services"></tb-services>
            </div>
          </v-tab-item>

          <v-tab-item class="default">
            <tb-insurance
              :insurancecards="insurancecards"
              @update="getPatientInsurances()"
            ></tb-insurance>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="js">

import BiographTab from "@/components/profile/tabs/biograph"
import c_type_divider from "@/components/profile/c_type_divider";
import ConsultationsTab from "@/components/profile/tabs/consultations";
import AddressCard from "@/components/profile/c_address_card.vue";
import InsuranceTab from "@/components/profile/tabs/insurance.vue";

export default {
  props: {
    userdata:{
      type: Object,
      default: null
    }
    },
  components: {
    'v-type-divider': c_type_divider,
    'tb-biograph': BiographTab,
    'tb-services': ConsultationsTab,
    'v-address-card': AddressCard,
    'tb-insurance': InsuranceTab
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
      services: null,
      insurancecards:null,
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


    async uploadPatientImage() {
      const formData = new FormData();
      formData.append("file", this.currentFile )

      return await this.$api.$patch(`/patients/${this.$route.params.id}/images/`,formData)
        .then(response => {
          if (response !== null) {
            this.uploaddialog = false
            this.$emit('update-profile');
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
            this.$emit('update-profile');
          }
        }).catch(error => {
          console.log(error);

        });

    },
    async initiateServiceInstance(){
        return await this.$api.$post(`consultations/${this.$route.params.id}`)
        .then(response => {
          if (response !== null) {
            this.getPatientServices()
            this.$emit('update-profile');
          }
        }).catch(error => {
          console.log(error);

        });

    },
    async getPatientServices(){
        return await this.$api.$get(`consultations/patient/${this.$route.params.id}`)
        .then(response => {
          if (response !== null) {
            this.services = response.sort(function(a,b){return b.isActive - a.isActive});
          }
        }).catch(error => {
          console.log(error);

        });
    },
    async getPatientInsurances(){
         return await this.$api.$get(`insurance/cards/patient/${this.$route.params.id}`)
        .then(response => {
          if (response !== null) {
            this.insurancecards = response;
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
