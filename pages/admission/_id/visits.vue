<template>
  <div>
    <div class="breadcrumb">
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
      >
        Admission Visits</router-link
      >
    </div>
    <v-container fluid>
      <v-progress-linear
        v-if="!visits"
        indeterminate
        color="primary"
      ></v-progress-linear>
      <v-card v-else-if="visits.length > 0" class="mx-auto default">
        <v-card-title class="primary white--text">
          <span class="title"
            >Admission {{ this.$route.params.id }} Visits</span
          >
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text class="py-0">
          <v-timeline dense>
            <v-slide-x-reverse-transition group hide-on-leave>
              <v-timeline-item
                v-for="visit in visits"
                :key="visit.id"
                small
                fill-dot
              >
                <v-alert
                  :value="true"
                  color="success"
                  text
                  icon="mdi-information"
                >
                  <div class="title">
                    {{ visit.dateTime }}
                  </div>
                  <v-divider></v-divider>

                  <p cl>{{ visit.symptoms }}</p>
                </v-alert>
              </v-timeline-item>
            </v-slide-x-reverse-transition>
          </v-timeline>
        </v-card-text>
      </v-card>

      <v-card
        v-else
        flat
        class="d-flex justify-center align-center"
        height="600"
        width="100%"
      >
        <span class="font-weight-black text-h3 grey--text"
          >No visit yet ...</span
        >
      </v-card>
    </v-container>
  </div>
</template>
<script>
const COLORS = ["info", "warning", "error", "success"];
export default {
  data: () => ({
    visits: null,
  }),
  methods: {
    async fetchvitits() {
      return await this.$api
        .$get(`admissions/${this.$route.params.id}/visits`)
        .then((response) => {
          this.visits = response.reverse();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeCreate() {},
  created() {
    this.fetchvitits();
  },
  computed: {},
};
</script>
