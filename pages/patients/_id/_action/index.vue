<template>
  <div>
    <div class="breadcrumb" v-if="patient != null">
      <router-link to="/">{{ $t("label.menu.dashboard") }}</router-link>
      <router-link to="/patients">{{
        $t("label.breadcrumb.patients")
      }}</router-link>
      <router-link :to="`/patients/${this.$route.params.id}`">{{
        patient.name
      }}</router-link>
      <a class="active"> {{ this.$route.params.action }}</a>
    </div>
    <div v-if="this.$route.params.action === 'admit'">
      <v-card>
        <v-toolbar dark flat color="primary">
          <v-toolbar-title>Admit patient</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row align="center" justify="center">
              <v-col cols="12" md="5">
                <v-select
                  v-model="wardId"
                  :items="wards"
                  prepend-icon="mdi-home-variant-outline"
                  :rules="[(v) => !!v || 'Item is required']"
                  label="Select ward"
                  :item-value="'id'"
                  @change="wardIdChanges()"
                  required
                >
                  <template slot="selection" slot-scope="{ item }">
                    {{ item.name }} - {{ item.id }}
                  </template>
                  <template slot="item" slot-scope="{ item }">
                    {{ item.id }} - {{ item.name }}
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12" md="5" v-show="beds.length > 0">
                <v-select
                  v-model="admission.bedId"
                  :items="beds"
                  prepend-icon="mdi-queen-bed"
                  :rules="[(v) => !!v || 'Item is required']"
                  :item-value="'id'"
                  required
                >
                  <template slot="selection" slot-scope="{ item }">
                    {{ item.identifier }} - {{ item.id }}
                  </template>
                  <template slot="item" slot-scope="{ item }">
                    {{ item.id }} - {{ item.identifier }}
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12" md="5">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="admission.startDateTime"
                      label="Admission from Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[(v) => !!v || 'Date is required']"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="admission.startDateTime"
                    no-title
                    scrollable
                    required
                    @input="menu1 = false"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu1 = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu1.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="5">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="admission.endDateTime"
                      label="To Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[(v) => !!v || 'Date is required']"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="admission.endDateTime"
                    no-title
                    scrollable
                    required
                    @input="menu2 = false"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu2 = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu2.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="button warning mr-4" @click="reset"> Reset Form </v-btn>
          <v-btn :disabled="!valid" class="button mr-4" @click="validate">
            Admit
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-if="this.$route.params.action === 'selfservice'">
      <v-card>
        <v-toolbar flat dark color="primary">
          <v-toolbar-title>Create Self service</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="12" md="4"></v-col>
            <v-col cols="12" sm="12" md="4">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                  <v-text-field
                    v-model="selfservice.username"
                    :rules="nameRules"
                    :counter="5"
                    label="Self service username"
                    placeholder="e.g username"
                    autocomplete="new-password"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="selfservice.password"
                    :rules="passwordRules"
                    :counter="8"
                    label="Password"
                    placeholder="e.g password"
                    type="password"
                    autocomplete="new-password"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="selfservice.email"
                    :rules="emailRules"
                    label="E-mail"
                    placeholder="email@example.com"
                    type="email"
                    autocomplete="username"
                    required
                  ></v-text-field>
                  <v-btn class="primary mt-3" @click.stop="submit"
                    >Submit</v-btn
                  >
                </v-container>
              </v-form>
            </v-col>
            <v-col cols="12" sm="12" md="4"></v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    valid: false,
    name: "",
    wardId: "",
    beds: [],
    date: new Date().toISOString().substr(0, 7),
    menu1: false,
    menu2: false,
    modal: false,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    nameRules: [
      (v) => !!v || "Username is required",
      (v) =>
        (v && v.length >= 5 && v.length < 12) ||
        "Username must be not less than 5 and not more than 12 characters",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length >= 8) || "Password must be not less than 8 characters",
      (v) =>
        (v && v.length < 18) ||
        "Password must be not less than 8 and not more than 18 characters",
    ],
    admission: {
      bedId: "",
      serviceId: 0,
      isActive: 1,
      endDateTime: null,
      startDateTime: null,
    },
    selfservice: {
      username: "",
      email: "",
      password: "",
      patientId: 0,
    },
  }),

  methods: {
    async wardIdChanges() {
      console.log(this.wardId);
      return await this.$api
        .$get(`beds/${this.wardId}/ward/`)
        .then((response) => {
          if (response !== null) {
            this.beds = response.filter((bed) => bed.isOccupied === false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validate() {
      var state = this.$refs.form.validate();
      this.$refs.form.validate();
      if (state) {
        this.admission.serviceId = parseInt(this.$route.params.id);
        this.$store.dispatch("admit_patient", this.admission);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submit: function () {
      var state = this.$refs.form.validate();
      this.selfservice.patientId = parseInt(this.$route.params.id);
      if (state) {
        this.$store
          .dispatch("create_self_service_users", this.selfservice)
          .then(() => {
            this.$router.push(`/patients/${this.$route.params.id}`);
          });
      }
    },
  },
  created() {
    this.admission.serviceId = this.$route.params.id;
  },
  beforeCreate() {
    this.$store.dispatch("retrieve_all_wards");
  },
  computed: {
    wards() {
      return this.$store.getters.wards;
    },
    patient() {
      return this.$store.getters.patient(parseInt(this.$route.params.id));
    },
  },
};
</script>
