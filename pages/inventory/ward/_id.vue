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
      <v-container fluid>
        <div>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="3" class="">
              <v-text-field
                v-model="total"
                type="number"
                outlined
                dense
                hide-details
                placeholder="No. of beds to add"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <v-btn
                small
                shaped
                class="primary mt-1 ml-2"
                @click.stop="_addmorebeds()"
                >Add more beds</v-btn
              >
            </v-col>
          </v-row>
        </div>
        <v-progress-linear
          indeterminate
          color="primary"
          v-if="ward == null"
        ></v-progress-linear>
        <beds-list v-else :ward="ward"></beds-list>
      </v-container>
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
