<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/inventory">{{
        $t("label.breadcrumb.services")
      }}</router-link>

      <router-link
        :to="`/services/${this.$route.params.service}`"
        class="active"
        v-html="`${this.$route.params.service}`"
      ></router-link>
    </div>
    <medical-service :services="services"></medical-service>
  </div>
</template>
<script>
import MedicalServiceComponent from "~/components/services/medical_service";
export default {
  components: {
    "medical-service": MedicalServiceComponent
  },
  data: () => ({
    dialog: false,
    search: "",
    sortDesc: false,
    editedIndex: -1,
    valid: true,
    services: [],
    headers: [
      { text: "ID", value: "id" },
      { text: "Name", value: "name" },
      { text: "Is Active", value: "isActive", sortable: false },
      { text: "Price", value: "price" },

      { text: "Service type", value: "serviceTypeName" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    editedItem: {
      id: "",
      name: "",
      price: 0,
      medicalServiceType: 0,
      units: ""
    },
    defaultItem: {
      id: "",
      name: "",
      price: 0,
      medicalServiceType: 0,
      units: ""
    }
  }),
  methods: {
    handleClick: function(item) {
      this.$router.push("roles/" + item.id);
    },
    editItem(item) {
      this.editedIndex = this.services.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.request_data();
      });
    },
    request_data() {
      this.$store.dispatch("get_medical_services");
    },
    save() {
      if (this.editedIndex > -1) {
        console.log(this.editedItem);
        this.$store.dispatch("update_medical_service", this.editedItem);
      } else {
        delete this.editedItem.id;
        this.$store.dispatch("create_new_medical_service", this.editedItem);
      }
      this.close();
    },
    fetch_measures: function() {
      this.$store.dispatch("fetch_medicine_measurements");
    },

    async getMedicalServicesByTypeName() {
      return await this.$api
        .$get(`services/name/${this.$route.params.service}`)
        .then(response => {
          if (response !== null) {
            this.services = response;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getMedicalServicesByTypeName();
    this.$store.dispatch("get_medical_services");
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "label.titles.newservice"
        : "label.titles.editservice";
    },
    routename() {
      return this.$route.params.service;
    }
  }
};
</script>
