<template>
  <div>
    <div class="breadcrumb" v-if="patient != null">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/patients">{{
        $t("label.breadcrumb.patients")
      }}</router-link>
      <router-link :to="`/patients/${this.$route.params.id}`">{{
        patient.name
      }}</router-link>

      <router-link to="/patients" class="active">{{
        $t("label.breadcrumb.addcontact")
      }}</router-link>
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
