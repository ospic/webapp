<template>
  <div>
    <div class="breadcrumb" v-if="ward != null">
      <router-link to="/">Dashboard</router-link>
      <router-link v-show="!this.$vuetify.breakpoint.mobile" to="/inventory"
        >Inventory</router-link
      >
      <router-link to="/inventory/ward">Wards</router-link>
      <router-link to="/inventory/ward" class="active">{{
        ward.name
      }}</router-link>
    </div>
    <v-card class="mx-auto">
      <v-toolbar flat class="primary" dark>
        <v-toolbar-title>Ward {{ $route.params.id }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-container>
          <div>
            <v-row no-gutters>
              <v-spacer></v-spacer>
              <v-col cols="12" sm="3" class="">
                <v-text-field
                  v-model="total"
                  type="number"
                  outlined
                  dense
                  light
                  background-color="whitish"
                  hide-details
                  placeholder="No. of beds to add"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <v-btn
                  small
                  shaped
                  class="primary mt-1 ml-2 button"
                  @click.stop="_addmorebeds()"
                  ><v-icon small left>mdi-plus</v-icon> Add more beds</v-btn
                >
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-toolbar>
      <v-card-text>
        <v-progress-linear
          indeterminate
          color="primary"
          v-if="ward == null"
        ></v-progress-linear>
        <beds-list v-else :ward="ward"></beds-list>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import Beds_list from "~/components/patients/beds_list.vue";
export default {
  components: {
    "beds-list": Beds_list
  },
  data: () => ({
    ward: null,
    total: 0
  }),
  created() {
    this._retrieve_ward();
  },
  methods: {
    async _retrieve_ward() {
      return await this.$api
        .$get(`wards/${this.$route.params.id}/`)
        .then(response => {
          this.ward = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async _addmorebeds() {
      return await this.$api
        .$post(`beds/list/`, {
          wardId: this.$route.params.id,
          numberOfBeds: this.total
        })
        .then(response => {
          if (response !== null) {
            this._retrieve_ward();
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  computed: {}
};
</script>
