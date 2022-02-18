<template>
  <div>
    <div class="breadcrumb" v-if="userdata != null">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/patients">{{
        $t("label.breadcrumb.patients")
      }}</router-link>
      <router-link :to="`/patients/${this.$route.params.id}`" class="active">{{
        username
      }}</router-link>
    </div>

    <v-card class="mx-auto default">
      <div v-if="userdata !== null">
        <card-info
          :userdata="userdata"
          v-on:update-profile="reUpdateProfile"
        ></card-info>
      </div>

      <div v-else>
        <div height="500" flat>
          <v-layout align-center justify-center column fill-height>
            <v-flex row align-center>
              <v-progress-circular
                indeterminate
                :size="50"
                color="primary"
              ></v-progress-circular>
            </v-flex>
          </v-layout>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import info_card_info from "~/components/consultation/c_info_card";
export default {
  components: {
    "card-info": info_card_info,
  },
  data() {
    return {
      userdata: null,
    };
  },

  methods: {
    async viewusedata() {
      return await this.$api
        .$get(`patients/${this.$route.params.id}/`)
        .then((response) => {
          this.userdata = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    reUpdateProfile: function () {
      setTimeout(() => {
        this.viewusedata();
        console.log("Call emit");
      }, this.delay_seconds);
    },
  },
  created() {
    this.viewusedata();
  },
  computed: {
    username() {
      return this.userdata == null ? "" : this.userdata.name;
    },
  },
};
</script>

<style scoped></style>
