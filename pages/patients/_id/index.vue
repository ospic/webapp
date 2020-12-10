<template>
  <v-card>
    <div v-if="userdata !== null">
      <card-info :userdata="userdata"></card-info>
    </div>
    <div v-else>
      <div height="500" flat>
        <v-layout align-center justify-center column fill-height>
          <v-flex row align-center>
            <v-progress-circular
              indeterminate
              :size="50"
              color="primary"
              class=""
            ></v-progress-circular>
          </v-flex>
        </v-layout>
      </div>
    </div>
  </v-card>
</template>

<script>
import info_card_info from "@/components/profile/c_info_card";
export default {
  components: {
    "card-info": info_card_info
  },
  data() {
    return {
      userdata: null
    };
  },

  methods: {
    async viewusedata() {
      return await this.$api
        .$get(`patients/${this.$route.params.id}/`)
        .then(response => {
          this.userdata = response;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.viewusedata();
  }
};
</script>

<style scoped></style>
