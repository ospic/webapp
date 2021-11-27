<template>
  <v-container fluid class="">
    <div class="d-flex justify-start">
      <v-row justify="start" class="ml-5 ma-4">
        <v-dialog v-model="dialog" persistent width="600">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="button" v-on="on" v-bind="attrs" v-if="isActive">
              <v-icon small left>mdi-plus</v-icon> Add new Diagnosis</v-btn
            >
          </template>
          <v-card>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card-title>
                <span class="headline">Diagnosis Form</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                <v-container>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="diagnosisFormData.date"
                        label="Date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :rules="[(v) => !!v || 'Date is required']"
                        required
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="diagnosisFormData.date"
                      no-title
                      scrollable
                      required
                      @input="menu = false"
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-textarea
                    outlined
                    label="Symptoms *"
                    class="ma-0 mt-4"
                    placeholder="Patient symptoms on th specified date"
                    :rules="symptoms_rule"
                    required
                    v-model="diagnosisFormData.symptoms"
                  ></v-textarea>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                  Close
                </v-btn>
                <v-btn
                  color="success darken-1"
                  @click="addNewPatientDiagnosis()"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <v-row>
      <v-col align="center" v-if="diagnoses === null">
        <v-progress-circular
          :width="2"
          color="primary"
          size="20"
          indeterminate
        ></v-progress-circular>
      </v-col>
      <v-col v-else-if="diagnoses.length !== 0">
        <v-timeline align-top dense class="ml-1 pl-1">
          <v-slide-x-reverse-transition group hide-on-leave>
            <v-timeline-item
              v-for="(diagnose, index) in diagnoses"
              :key="index"
              medium
            >
              <template v-slot:icon>
                <v-avatar color="primary">
                  <span class="white--text">{{ index }}</span>
                </v-avatar>
              </template>
              <diagnosis-info-card :post="diagnose"></diagnosis-info-card>
            </v-timeline-item>
          </v-slide-x-reverse-transition>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="js">
import medicalInfoCard from "@/components/medical/medical_info_card"
export default {
   components:{
    'diagnosis-info-card': medicalInfoCard,
    },
  props:{
    diagnoses:{
      type: Array,
      default:  function () {
    return []
  },
    },
    isActive:{
      type:Boolean,
      default: true
    },
  },
  data: () => ({
    dialog: false,
      diagnosisFormData:{
        date: '',
        symptoms: ''
      },
      valid: true,
      date: new Date().toISOString().substr(0, 7),
      menu: false,
      modal: false,
       rules: [
        value => !value || value.size < 500 || 'Avatar size should be less than 500 KB!',
      ],
       symptoms_rule: [
        v => !!v || 'Symptom required',
        v => (v && v.length <= 500) || 'Symptom must be not less than 5 ',
      ],

  }),
  methods:{
      async addNewPatientDiagnosis() {
          return await this.$api.$post(`diagnoses/${this.$route.params.id}/`, this.diagnosisFormData)
        .then(response => {
          console.log(response)
          if (response !== null) {
            this.dialog = false;
            this.getPatientDiagnoses(this.$route.params.id)
          }
        }).catch(error => {
          console.log(error);

        });

    },

  }
};
</script>
