<template>
  <div>
    <div class="breadcrumb" v-if="admission != null">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/patients">{{
        $t("label.breadcrumb.patients")
      }}</router-link>
      <router-link :to="`/consultations/${admission.serviceId}`"
        >{{ $t("label.breadcrumb.consultation") }} ({{
          admission.serviceId
        }})</router-link
      >

      <router-link :to="`/admission/${this.$route.params.id}`" class="active"
        >Admission ({{ this.$route.params.id }})</router-link
      >
    </div>
    <v-progress-circular v-if="admission == null" size="34" color="gray">
    </v-progress-circular>

    <v-card v-else class="pa-3">
      <v-card-title>
        <p>Admission No. {{ this.$route.params.id }}</p>
        <v-spacer></v-spacer>
        <v-btn
          class="ml-1"
          v-if="admission.isActive"
          color="primary"
          @click="_end_this_admission"
        >
          <v-icon left> mdi-reorder-horizontal </v-icon>
          End this admission</v-btn
        >
        <v-btn
          class="ml-1"
          v-if="admission.isActive"
          color="primary"
          :to="`/admission/${this.$route.params.id}/visit`"
        >
          <v-icon left> mdi-tag-plus </v-icon>
          Visit admission</v-btn
        >
        <v-btn
          class="ml-1"
          color="primary"
          :to="`/admission/${this.$route.params.id}/visits`"
        >
          <v-icon left> mdi-eye </v-icon>
          Admission Visits</v-btn
        >
      </v-card-title>

      <v-divider></v-divider>
      <v-card-text>
        <div v-if="admission !== null">
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-row no-gutters>
                <v-col cols="12" md="6">
                  <p class="font-weight-black">Admission ID.</p></v-col
                >

                <v-col cols="12" md="6">
                  <p class="font-weight-normal">
                    {{ admission.id }}
                  </p></v-col
                >
                <v-col cols="12" md="6">
                  <p class="font-weight-black">Start Date.</p></v-col
                >

                <v-col cols="12" md="6">
                  <p class="font-weight-normal">
                    {{ admission.startDate }}
                  </p></v-col
                >
                <v-col cols="12" md="6">
                  <p class="font-weight-black">End Date.</p></v-col
                >

                <v-col cols="12" md="6">
                  <p class="font-weight-normal">
                    {{ admission.endDate }}
                  </p></v-col
                >
                <v-col cols="12" md="6">
                  <p class="font-weight-black">Is Active.</p></v-col
                >

                <v-col cols="12" md="6">
                  <p class="font-weight-normal">
                    {{ admission.isActive }}
                  </p>
                </v-col>
                <v-col cols="12" md="6">
                  <p class="font-weight-black">Ward ID.</p></v-col
                >

                <v-col cols="12" md="6">
                  <p class="font-weight-normal">
                    {{ admission.wardId }}
                  </p></v-col
                >
                <v-col cols="12" md="6">
                  <p class="font-weight-black">Ward Name.</p></v-col
                >

                <v-col cols="12" md="6">
                  <p class="font-weight-normal">
                    {{ admission.wardName }}
                  </p></v-col
                >
                <v-col cols="12" md="6">
                  <p class="font-weight-black">Bed ID.</p></v-col
                >

                <v-col cols="12" md="6">
                  <p class="font-weight-normal">
                    {{ admission.bedId }}
                  </p></v-col
                >
                <v-col cols="12" md="6">
                  <p class="font-weight-black">Bed Name</p></v-col
                >

                <v-col cols="12" md="6">
                  <p class="font-weight-normal">
                    {{ admission.bedIdentifier }}
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
  </div>
</template>
<script>
export default {
  data: () => ({
    admission: null,
    endrequest: {},
    date: new Date().toISOString().substr(0, 10),
  }),
  methods: {
    async _get_admission_by_id() {
      return await this.$api
        .$get(`admissions/${this.$route.params.id}/`)
        .then((response) => {
          this.admission = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    _end_this_admission() {
      this.$store.dispatch("end_patient_admission", {
        serviceId: this.admission.serviceId,
        admissionId: this.admission.id,
        bedId: this.admission.bedId,
        endDateTime: this.date,
      });
    },
  },
  created() {
    this._get_admission_by_id();
  },
  computed: {},
};
</script>
