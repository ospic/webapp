<template>
  <v-card class="pa-3">
    <v-card-title>Patient Admission</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row align="center" justify="center">
          <v-col cols="12" md="5">
            <v-select
              v-model="wardId"
              :items="wards"
              prepend-icon="mdi-home-variant-outline"
              :rules="[v => !!v || 'Item is required']"
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
              :rules="[v => !!v || 'Item is required']"
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
                  :rules="[v => !!v || 'Date is required']"
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
                  :rules="[v => !!v || 'Date is required']"
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
        <div>
          <v-spacer></v-spacer>
          <v-btn color="error" class="mr-4" @click="reset">
            Reset Form
          </v-btn>
          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="validate"
          >
            Admit
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    wardId: "",
    beds: [],
    date: new Date().toISOString().substr(0, 7),
    menu1: false,
    menu2: false,
    modal: false,
    admission: {
      bedId: "",
      serviceId: 0,
      isActive: 1,
      endDateTime: null,
      startDateTime: null
    }
  }),

  methods: {
    async wardIdChanges() {
      console.log(this.wardId);
      return await this.$api
        .$get(`beds/${this.wardId}/ward/`)
        .then(response => {
          if (response !== null) {
            this.beds = response.filter(bed => bed.isOccupied === false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    validate() {
      var state = this.$refs.form.validate();
      this.$refs.form.validate();
      if (state) {
        this.admission.serviceId = this.$route.params.id;
        this.$store.dispatch("admit_patient", this.admission);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
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
    }
  }
};
</script>
