<template>
  <v-row justify="start" align="start" fluid>
    <v-col cols="12" sm="12" md="6" v-if="staff == null"></v-col>
    <v-col cols="12" sm="12" md="6" v-if="staff !== null">
      <staff-card :staff="staff"></staff-card>
    </v-col>
    <v-col cols="12" sm="12" md="2"></v-col>
    <v-col cols="12" sm="12" md="4">
      <v-autocomplete
        dense
        :items="staffs"
        v-model="selectedstaffId"
        item-text="fullName"
        item-value="id"
        label="Select staffs to assign"
        persistent-hint
        return-object
        filled
        chips
        clearable
        class="ma-2 d-flex"
        hint="Re/Assign staffs"
        @change="_assign_staff()"
      >
        <template slot="selection" slot-scope="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click="data.select"
            @click:close="remove(data.item)"
          >
            <v-avatar left>
              <v-img
                :src="
                  data.item.imageUrl === null ? thumbnail : data.item.imageUrl
                "
              ></v-img>
            </v-avatar>
            {{
              data.item.fullName === null
                ? data.item.username
                : data.item.fullName
            }}
          </v-chip>
          <!--{{
            data.item.fullName === null
              ? data.item.username
              : data.item.fullName
          }}-->
        </template>

        <!-- <template slot="item" slot-scope="data">
          {{
            data.item.fullName === null
              ? data.item.username
              : data.item.fullName
          }}
        </template>-->

        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item"></v-list-item-content>
          </template>
          <template v-else>
            <v-list-item-avatar>
              <v-img
                :src="
                  data.item.imageUrl === null ? thumbnail : data.item.imageUrl
                "
                alt="image"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                v-html="
                  data.item.fullName === null
                    ? data.item.username
                    : data.item.fullName
                "
              ></v-list-item-title>
              <v-list-item-subtitle>
                {{ data.item.department.name }} [
                {{ data.item.user.roles[0].name }} ]
              </v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
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
    selectedstaffId: null
  }),
  methods: {
    async _assign_staff() {
      return await this.$api
        .$put(
          `consultations/${this.$route.params.id}/${this.selectedstaffId.id}/`
        )
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
