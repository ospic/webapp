<template>
  <v-row justify="start" align="start" fluid>
    <v-col cols="12" sm="12" md="6" v-if="staff == null"></v-col>
    <v-col cols="12" sm="12" md="6" v-if="staff !== null">
      <v-card class="mx-auto ml-2" outlined>
        <v-list three-line>
          <v-list-item>
            <v-list-item-avatar width="80" height="80">
              <v-img
                max-height="150"
                max-width="250"
                src="https://www.nicepng.com/png/detail/26-260551_femscare-benifits-doctor-image-png-hd.png"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="title">
                {{ staff.fullName == null ? staff.username : staff.fullName }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ staff.role }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
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
export default {
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
      console.log(this.selectedstaffId);
      return await this.$api
        .$put(`patients/${this.$route.params.id}/${this.selectedstaffId.id}/`)
        .then(response => {
          if (response !== null) {
            this.$router.push("/patients/" + this.$route.params.id);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
