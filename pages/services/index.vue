<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/services" class="active"
        >{{ $t("label.breadcrumb.services") }}
      </router-link>
    </div>

    <medical-service
      :services="medicalservices"
      v-on:update="update"
    ></medical-service>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import MedicalServiceComponent from "~/components/services/medical_service";
export default {
  components: {
    "medical-service": MedicalServiceComponent,
  },
  data: () => ({
    dialog: false,
    search: "",
    sortDesc: false,
    editedIndex: -1,
    valid: true,
  }),
  methods: {
    update() {
      setTimeout(() => this.request_data(), 4000);
    },
    request_data() {
      this.$store.dispatch("get_medical_services");
    },
  },
  created() {
    this.$store.dispatch("get_medical_services");
  },
  computed: {
    ...mapGetters({
      medicalservices: "medicalservices",
    }),
    formTitle() {
      return this.editedIndex === -1
        ? "label.titles.newservice"
        : "label.titles.editservice";
    },
  },
};
</script>
