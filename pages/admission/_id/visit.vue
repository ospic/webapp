<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/patients">{{
        $t("label.breadcrumb.patients")
      }}</router-link>
      <router-link :to="`/admission/${this.$route.params.id}`"
        >Admission ({{ this.$route.params.id }})</router-link
      >
      <router-link
        :to="`/admission/${this.$route.params.id}/visit`"
        class="active"
        >Visit Admission</router-link
      >
    </div>
    <v-card>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-title>
          <span class="headline">Visit Form</span>
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
                  v-model="visitsFormData.dateTime"
                  label="Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :rules="[v => !!v || 'Date is required']"
                  required
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="visitsFormData.dateTime"
                no-title
                scrollable
                required
                @input="menu = false"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
            <v-textarea
              outlined
              label="Symptoms *"
              class=" ma-0 mt-4"
              placeholder="Patient symptoms on th specified date"
              :rules="symptoms_rule"
              required
              v-model="visitsFormData.symptoms"
            ></v-textarea>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="success darken-1" @click="addNewAdmissionVisit()">
            Save
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    visitsFormData: {
      dateTime: "",
      symptoms: ""
    },
    valid: true,
    date: new Date().toISOString().substr(0, 7),
    menu: false,
    modal: false,
    rules: [
      value =>
        !value || value.size < 500 || "Avatar size should be less than 500 KB!"
    ],
    symptoms_rule: [
      v => !!v || "Symptom required",
      v => (v && v.length <= 500) || "Symptom must be not less than 5 "
    ]
  }),
  methods: {
    async addNewAdmissionVisit() {
      var state = this.$refs.form.validate();
      this.visitsFormData.admissionId = this.$route.params.id;

      if (state) {
        return await this.$api
          .$post(`admissions/visits`, this.visitsFormData)
          .then(response => {
            this.visits = response;
          })
          .catch(error => {
            console.log(error);
          })
          .then(() => {
            this.$router.push("/admission/" + this.$route.params.id);
          });
      }
    }
  },
  beforeCreate() {},
  computed: {}
};
</script>
