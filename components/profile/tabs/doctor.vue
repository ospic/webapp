<template>
  <v-row justify="start" align="start" fluid>
    <v-col cols="12" sm="12" md="6" v-if="physician == null"></v-col>
    <v-col cols="12" sm="12" md="6" v-if="physician !== null">
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
                {{ physician.firstname }} &nbsp;{{ physician.lastname }}
              </v-list-item-title>
              <v-list-item-subtitle>{{
                physician.specialities
              }}</v-list-item-subtitle>
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
        :items="physicians"
        v-model="selectedPhysicianId"
        item-text="firstname"
        item-value="id"
        label="Select Physicians to assign"
        persistent-hint
        return-object
        single-line
        class="ma-2 d-flex"
        background-color="primary"
        dark
        hint="Re/Assign Physicians"
        @change="_assign_physician()"
      >
        <template slot="selection" slot-scope="data">
          {{ data.item.firstname }},
          {{ data.item.lastname }}
        </template>
        <template slot="item" slot-scope="data">
          {{ data.item.firstname }},
          {{ data.item.lastname }}
        </template>
      </v-select>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    physician: {
      type: Object,
      default: null
    },
    physicians: {
      type: Array,
      default: null
    }
  },
  methods: {
    async _assign_physician() {
      console.log(this.selectedPhysicianId);
      return await this.$api
        .$put(
          `patients/${this.$route.params.id}/${this.selectedPhysicianId.id}/`
        )
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
