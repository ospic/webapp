<template>
  <v-container fluid style="background-color: white">
    <beds-list :ward="ward"></beds-list>
  </v-container>
</template>
<script>
import Beds_list from "~/components/patients/beds_list.vue";
export default {
  components: {
    "beds-list": Beds_list
  },
  data: () => ({}),
  computed: {
    ward() {
      console.log(this.$route.params.id);
      var n = this.$route.params.id;
      var data = this.$store.getters.beds.find(bed => bed.id == n);
      return data;
    }
  }
};
</script>
