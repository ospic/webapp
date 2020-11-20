<template>
  <v-list flat>
    <v-subheader>WARDS AND BEDS</v-subheader>
    <v-list-item-group v-model="selectedItem" color="primary">
      <v-list-item
        v-for="(ward, i) in wards"
        :key="i"
        :to="`/inventory/ward/${ward.id}`"
      >
        <v-list-item-content>
          <beds-list :ward="ward"></beds-list>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
import _bedsList from "~/components/patients/beds_list";
export default {
  components: {
    "beds-list": _bedsList
  },
  data: () => ({
    title: "Wards",
    search: "",
    benched: 0,
    selectedItem: ""
  }),
  computed: {
    wards() {
      return this.$store.getters.beds.filter(ward => ward.beds.length !== 0);
    }
  },
  beforeMount() {
    this.$store.dispatch("retrieve_all_ward_with_beds");
  }
};
</script>
