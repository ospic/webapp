<template>
  <v-container fluid>
    <h1>All staffs will be Displayed Here</h1>
    <br />
    <h2>Staffs demo</h2>
    <v-row no-gutters>
      <v-col v-for="n in 10" :key="n" cols="12" sm="12" md="2">
        <staff-card :index="n"></staff-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import StaffCard from "@/components/staff/staff_card";
export default {
  components: {
    StaffCard
  }
};
</script>
