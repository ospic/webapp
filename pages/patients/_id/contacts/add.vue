<template>
  <div>
    <div class="breadcrumb" v-if="patient != null">
      <router-link to="/">Dashboard</router-link>
      <router-link v-show="!this.$vuetify.breakpoint.mobile" to="/patients"
        >Patients</router-link
      >
      <router-link :to="`/patients/${this.$route.params.id}`">{{
        patient.name
      }}</router-link>

      <router-link to="/patients" class="active">Add contact</router-link>
    </div>
    <contacts-form :title="title"></contacts-form>
  </div>
</template>
<script>
import _contacts_form from "~/components/contact_form";
export default {
  components: {
    "contacts-form": _contacts_form
  },
  data: () => ({
    title: "Add contact"
  }),

  computed: {
    patient() {
      return this.$store.getters.patient(parseInt(this.$route.params.id));
    }
  }
};
</script>
