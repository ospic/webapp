<template>
  <v-container fluid>
    <v-card class=" pa-1">
      {{ id }}
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      bill: null
    };
  },
  methods: {
    async get_bill() {
      return await this.$api
        .$get(`bills/${this.$route.params.id}/`)
        .then(response => {
          this.bill = response;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.get_bill();
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  }
};
</script>
