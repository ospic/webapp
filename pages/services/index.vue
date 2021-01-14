<template>
  <service-card :services="services"></service-card>
</template>
<script>
import ServiceCard from "@/components/profile/card_service";
export default {
  components: {
    "service-card": ServiceCard
  },
  data: function() {
    return {
      services: [],
      search: null,
      headers: [
        { text: "ID", value: "id" },
        { text: "Patient Name", value: "patientName", sortable: false },
        { text: "Staff Name", value: "staffName" },
        { text: "Is Active?", value: "isActive" },
        { text: "From", value: "fromDate" },
        { text: "To", value: "toDate" }
      ],
      body: {
        options: {
          page: 1,
          itemsPerPage: 5,
          sortBy: ["patientName"]
        }
      }
    };
  },
  methods: {
    async getAllServices() {
      return await this.$api
        .$get(`services/`)
        .then(response => {
          if (response !== null) {
            this.services = response.sort(function(a, b) {
              return b.isActive - a.isActive;
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleClick: function(value) {
      this.$router.push("/services/" + value.id);
    },
    updatePagination: function(val) {
      console.log(val);
    }
  },
  created() {
    this.getAllServices();
  }
};
</script>
