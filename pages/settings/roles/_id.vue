<template>
  <v-card>
    <v-progress-circular
      v-if="role == null"
      size="32"
      color="gray"
    ></v-progress-circular>
    <div v-else>
      <v-card-title> Role: {{ role.name }} </v-card-title>
      <v-card-subtitle>authorities</v-card-subtitle>
      <v-card-text>
        <ul>
          <li v-for="(pr, i) in role.privileges" :key="i">
            {{ pr.name }}
          </li>
        </ul>
      </v-card-text>
    </div>
  </v-card>
</template>
<script>
export default {
  data: function() {
    return {
      role: null
    };
  },
  methods: {
    async get_role_privileges() {
      return await this.$api
        .$get(`auth/roles/${this.$route.params.id}/`)
        .then(response => {
          this.role = response;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.get_role_privileges();
  },
  computed: {
    /**role() {
      var id = parseInt(this.$route.params.id);
      return this.$store.getters.role(id);
    }
    **/
  }
};
</script>
