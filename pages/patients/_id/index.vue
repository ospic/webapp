<template>
  <div>
    <v-breadcrumbs :items="items" divider=">">
      <v-breadcrumbs-item slot="item" slot-scope="{ item }" exact :to="item.to">
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-card>
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
                class=""
              ></v-progress-circular>
            </v-flex>
          </v-layout>
        </div>
      </div>
    </v-card>
  </div>
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
    },
    reUpdateProfile: function() {
      this.viewusedata();
    }
  },
  created() {
    this.viewusedata();
  },
  computed: {
    username() {
      return this.userdata == null ? "" : this.userdata.name;
    },
    items() {
      return [
        {
          text: "Dashboard",
          disabled: false,
          to: "/"
        },
        {
          text: "Patients",
          disabled: false,
          to: "/patients"
        },
        {
          text: this.username,
          disabled: false,
          to: "/patients"
        }
      ];
    }
  }
};
</script>

<style scoped></style>
