<template>
  <v-container fill-height fluid grid-list-xl>
    <v-row>
      <v-col xs="12" md="3" sm="12">
        <v-card flat>
          <v-img
            :src="entityThumbNail"
            :key="profileImage"
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
                      :src="entityThumbNail"
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
                      <v-dialog v-model="uploaddialog" persistent width="600">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            color="warning"
                            fab
                            x-small
                            dark
                            v-if="userdata.patientPhoto != null"
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
                            Changing {{ userdata.name }}
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
                          <v-divider></v-divider>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="primary"
                              @click.stop="uploaddialog = false"
                              medium
                            >
                              {{ $t("label.button.btncancel") }}
                            </v-btn>
                            <v-btn medium shaped @click="uploadPatientImage()">
                              {{ $t("label.button.btnsave") }}
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
                class="primary"
                v-else
                dark
                :to="`/patients/${userdata.id}/contacts/add`"
              >
                {{ $t("label.button.addcontacts") }}
              </v-btn>
              <v-btn
                class="primary"
                v-if="!userdata.hasSelfServiceUserAccount"
                :to="`/patients/${userdata.id}/selfservice`"
              >
                {{ $t("label.button.createselfservice") }}
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
              ><v-icon small left>mdi-account-question</v-icon
              >{{ $t("label.tab.biography") }}</span
            >
          </v-tab>

          <v-tab
            class="font-weight-normal"
            @click.stop="getPatientServices(true)"
          >
            <v-icon small left>mdi-clock-check</v-icon>
            {{ $t("label.tab.consultations") }}
          </v-tab>
          <v-tab
            class="font-weight-normal"
            @click.stop="getPatientInsurances()"
          >
            <v-icon small left>mdi-shield-sun</v-icon>
            {{ $t("label.tab.insurances") }}
          </v-tab>
        </v-tabs>
        <v-tabs-items vertical v-model="tab">
          <v-tab-item class="default">
            <tb-biograph :patient="userdata"></tb-biograph>
          </v-tab-item>

          <v-tab-item class="default">
            <div class="">
              <v-row no-gutters>
                <v-spacer></v-spacer>
                <v-btn
                  class="button small ma-2"
                  small
                  v-if="!userdata.isActive"
                  @click.stop="initiateServiceInstance()"
                  ><v-icon small left>mdi-plus</v-icon
                  >{{ $t("label.button.newconsultation") }}</v-btn
                >
                <v-btn
                  class="button small ma-2"
                  small
                  @click.stop="getPatientServices(null)"
                  >View all</v-btn
                >
              </v-row>
              <tb-services :services="services"></tb-services>
            </div>
          </v-tab-item>

          <v-tab-item class="default">
            <tb-insurance
              :insurancecards="insurancecards"
              @update="getPatientInsurances()"
              @active="active = !active"
              :button="active ? 'Show inactive' : 'Show active'"
              :title="active ? 'Active Insurances' : 'Inactive Insurances'"
              :activelist="active"
            ></tb-insurance>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="js">

import BiographTab from "@/components/consultation/tabs/biograph"
import c_type_divider from "@/components/consultation/c_type_divider";
import ConsultationsTab from "@/components/consultation/tabs/consultations";
import AddressCard from "@/components/consultation/c_address_card.vue";
import InsuranceTab from "@/components/consultation/tabs/insurance.vue";

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
      active: true,
      date: new Date().toISOString().substr(0, 7),
      menu: false,
      modal: false,
      emptyIcon: 'mdi-star-outline',
      fullIcon: 'mdi-star',
      halfIcon: 'mdi-star-half-full',
      address: null,
      staff:null,
      services: [],
      cards:[],
      diagnoses: null,
        attrs: {
        class: 'mb-6',
        boilerplate: true,
        elevation: 2,
      },
      profileImage: 1,



    }
  },
  created() {
    this.address = this.userdata.contactsInformation;
    this.staff = this.userdata.staff;
    this.$store.dispatch("fetchAllStaffs");
  },
  computed:{
    entityThumbNail: function() {
      return this.$api.defaults.baseURL +"patients/"+this.userdata.id+"/images";
    },
     staffs: {
      get() {
        return this.$store.getters.staffs;
      }
    },
     insurancecards() {
       var activeinsurances  = this.cards.filter(it => (it.isActive));
       var inactiveinsurances  = this.cards.filter(it => (!it.isActive));
      return this.active ? activeinsurances : inactiveinsurances;
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
            this.profileImage = this.profileImage+1;
            this.$emit('update-profile');
          }
        }).catch(error => {
          console.log(error);

        });

    },
    async deletePatientProfilePic() {
      return await this.$api.$delete(`/patients/${this.$route.params.id}/images/`)
        .then(response => {
          if (response !== null) {
            this.profileImage = this.profileImage-1;
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
    async getPatientServices(status){
        return await this.$api.$get(`consultations/patient/${this.$route.params.id}`,{params:{active: status}})
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
            this.cards = response ;
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
