<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col v-for="(staff, n) in staffs" :key="n" cols="12" sm="12" md="2">
        <staff-card :staff="staff"></staff-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import StaffCard from "@/components/staff/staff_card";
import { mapGetters } from "vuex";
export default {
  components: {
    StaffCard
  },
  beforeCreate() {
    this.$store.dispatch("fetchAllStaffs");
  },
  computed: {
    ...mapGetters({
      staffs: "staffs"
    })
  }
};
</script>
