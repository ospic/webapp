<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/insurances">Insurances</router-link>
      <router-link :to="`/insurances/${insuranceinfo.id}`" class="active">{{
        insuranceinfo.name
      }}</router-link>
    </div>
    <v-card class="mx-auto default ">
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>
          {{ insuranceinfo.name }}
        </v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-timeline align-top dense>
          <v-timeline-item color="info" small>
            <div>
              <div class="font-weight-normal">
                <strong>ID</strong>
              </div>

              <div>{{ insuranceinfo.id }}</div>
            </div>
          </v-timeline-item>
          <v-timeline-item color="info" small>
            <div>
              <div class="font-weight-normal">
                <strong>Name</strong>
              </div>
              <div>{{ insuranceinfo.name }}</div>
            </div>
          </v-timeline-item>

          <v-timeline-item color="info" small>
            <div>
              <div class="font-weight-normal">
                <strong>P.O Box</strong>
              </div>
              <div>{{ insuranceinfo.poBox }}</div>
            </div>
          </v-timeline-item>

          <v-timeline-item color="info" small>
            <div>
              <div class="font-weight-normal">
                <strong>Location</strong>
              </div>
              <div>{{ insuranceinfo.location }}</div>
            </div>
          </v-timeline-item>

          <v-timeline-item color="info" small>
            <div>
              <div class="font-weight-normal">
                <strong>Telephone No.</strong>
              </div>
              <div>{{ insuranceinfo.telephoneNo }}</div>
            </div>
          </v-timeline-item>
          <v-timeline-item color="info" small>
            <div>
              <div class="font-weight-normal">
                <strong>Email</strong>
              </div>
              <div>{{ insuranceinfo.emailAddress }}</div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      search: null,
      title: "Insurances",
      valid: false
    };
  },

  computed: {
    ...mapGetters(["insurance"]),
    insuranceinfo() {
      return this.insurance(this.$route.params.id);
    }
  }
};
</script>
