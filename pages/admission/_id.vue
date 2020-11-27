<template>
  <v-card class="pa-3">
    <v-card-title> Admission No. {{ this.$route.params.id }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div v-if="admissions !== null">
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-row no-gutters>
              <v-col cols="12" md="6">
                <p class="font-weight-black">
                  Admission ID.
                </p></v-col
              >

              <v-col cols="12" md="6">
                <p class="font-weight-normal">
                  {{ admissions.id }}
                </p></v-col
              >
              <v-col cols="12" md="6">
                <p class="font-weight-black">
                  Start Date.
                </p></v-col
              >

              <v-col cols="12" md="6">
                <p class="font-weight-normal">
                  {{ admissions.startDate }}
                </p></v-col
              >
              <v-col cols="12" md="6">
                <p class="font-weight-black">
                  End Date.
                </p></v-col
              >

              <v-col cols="12" md="6">
                <p class="font-weight-normal">
                  {{ admissions.endDate }}
                </p></v-col
              >
              <v-col cols="12" md="6">
                <p class="font-weight-black">
                  Is Active.
                </p></v-col
              >

              <v-col cols="12" md="6">
                <p class="font-weight-normal">
                  {{ admissions.isActive }}
                </p>
              </v-col>
              <v-col cols="12" md="6">
                <p class="font-weight-black">
                  Ward ID.
                </p></v-col
              >

              <v-col cols="12" md="6">
                <p class="font-weight-normal">
                  {{ admissions.wardId }}
                </p></v-col
              >
              <v-col cols="12" md="6">
                <p class="font-weight-black">
                  Ward Name.
                </p></v-col
              >

              <v-col cols="12" md="6">
                <p class="font-weight-normal">
                  {{ admissions.wardName }}
                </p></v-col
              >
              <v-col cols="12" md="6">
                <p class="font-weight-black">
                  Bed ID.
                </p></v-col
              >

              <v-col cols="12" md="6">
                <p class="font-weight-normal">
                  {{ admissions.bedId }}
                </p></v-col
              >
              <v-col cols="12" md="6">
                <p class="font-weight-black">
                  Bed Name
                </p></v-col
              >

              <v-col cols="12" md="6">
                <p class="font-weight-normal">
                  {{ admissions.bedIdentifier }}
                </p></v-col
              >
            </v-row>
          </v-col>
        </v-row>
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
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    admissions: null
  }),
  methods: {
    async _get_admission_by_id() {
      return await this.$api
        .$get(`admissions/${this.$route.params.id}/`)
        .then(response => {
          this.admissions = response[0];
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this._get_admission_by_id();
  },
  computed: {}
};
</script>
