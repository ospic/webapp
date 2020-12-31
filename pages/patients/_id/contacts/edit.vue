<template>
  <div>
    <div class="breadcrumb" v-if="patient != null">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/patients">Patients</router-link>
      <router-link :to="`/patients/${this.$route.params.id}`">{{
        patient.name
      }}</router-link>

      <router-link to="/patients" class="active">Edit contact</router-link>
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
    title: "Edit contact"
  }),
  computed: {
    patient() {
      return this.$store.getters.patient(parseInt(this.$route.params.id));
    }
  }
};
</script>
