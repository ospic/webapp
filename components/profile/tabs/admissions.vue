<template>
  <v-container fluid>
    <v-btn
      v-if="!userdata.isAdmitted && userdata.isActive && isactive"
      class="button ml-5 my-2"
      dark
      :to="`/patients/${this.$route.params.id}/admit`"
    >
      <v-icon left>
        mdi-bed
      </v-icon>
      Admit Patient</v-btn
    >
    <v-row justify="start">
      <v-col align="center" v-if="admissions === null">
        <v-row>
          <v-col cols="12" md="3" v-for="i in 4" :key="i" wrap>
            <v-skeleton-loader type="article, actions"></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        v-else-if="admissions.length !== 0"
        cols="12"
        lg="3"
        md="3"
        sm="12"
        wrap
        v-for="(admission, index) in admissions"
        :key="index"
      >
        <admission-card :data="admission"></admission-card>
      </v-col>
      <p v-else></p>
    </v-row>
  </v-container>
</template>
<script>
import AdmissionCard from "@/components/medical/admission_info_card";
export default {
  components: {
    "admission-card": AdmissionCard
  },
  props: {
    admissions: {
      type: Array,
      default: null
    },
    userdata: {
      type: Object,
      default: null
    },
    isactive: {
      type: Boolean,
      default: false
    }
  }
};
</script>
