<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/inventory">Inventory</router-link>
      <router-link to="/inventory/ward" class="active">Wards</router-link>
    </div>
    <v-progress-circular
      v-if="wards === null"
      :width="2"
      color="primary"
      size="20"
      indeterminate
    ></v-progress-circular>
    <v-data-table
      v-else
      dense
      :headers="headers"
      :items="wards"
      :search="search"
      :items-per-page="15"
      sort-by="calories"
      class="elevation-1"
      @click:row="navigateToWard"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title
            ><h3>{{ title }}</h3></v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            dense
            class="shrink"
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    title: "Wards",
    search: "",
    headers: [
      { text: "ID", value: "id" },
      { text: "Name", value: "name", sortable: false },
      { text: "No. of Beds", value: "numberOfBeds" }
    ]
  }),
  methods: {
    navigateToWard(item) {
      console.log(item);
      this.$router.push("/inventory/ward/" + item.id);
    }
  },
  computed: {
    wards() {
      return this.$store.getters.wards;
    }
  },
  beforeMount() {
    this.$store.dispatch("retrieve_all_wards");
  }
};
</script>
