<template>
  <v-row justify="start" align="start" fluid>
    <v-col cols="12" sm="12" md="6" v-if="staff == null"></v-col>
    <v-col cols="12" sm="12" md="6" v-if="staff !== null">
      <staff-card :staff="staff"></staff-card>
    </v-col>
    <v-col cols="12" sm="12" md="2"></v-col>
    <v-col cols="12" sm="12" md="4">
      <v-select
        dense
        solo
        :items="staffs"
        v-model="selectedstaffId"
        item-text="username"
        item-value="id"
        label="Select staffs to assign"
        persistent-hint
        return-object
        single-line
        class="ma-2 d-flex"
        background-color="primary"
        dark
        hint="Re/Assign staffs"
        @change="_assign_staff()"
      >
        <template slot="selection" slot-scope="data">
          {{
            data.item.fullName === null
              ? data.item.username
              : data.item.fullName
          }}
        </template>
        <template slot="item" slot-scope="data">
          {{
            data.item.fullName === null
              ? data.item.username
              : data.item.fullName
          }}
        </template>
      </v-select>
    </v-col>
  </v-row>
</template>
<script>
import StaffCard from "@/components/staff/staff_card";
export default {
  components: {
    "staff-card": StaffCard
  },
  props: {
    staff: {
      type: Object,
      default: null
    },
    staffs: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    selectedstaffId: 0
  }),
  methods: {
    async _assign_staff() {
      return await this.$api
        .$put(`consultations/${this.$route.params.id}/${this.selectedstaffId.id}/`)
        .then(response => {
          if (response !== null) {
            this.$emit("update-service");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
