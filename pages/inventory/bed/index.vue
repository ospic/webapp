<template>
  <v-list flat>
    <v-subheader>WARDS AND BEDS</v-subheader>
    <v-list-item-group v-model="selectedItem" color="primary">
      <v-list-item v-for="(ward, i) in wards" :key="i">
        <v-list-item-content>
          <div>
            <fieldset>
              <legend class="">{{ ward.name }}</legend>
              <v-container fluid>
                <v-row
                  align="start"
                  align-content="stretch"
                  justify="start"
                  dense
                >
                  <v-col
                    v-for="(bed, i) in ward.beds"
                    cols="12"
                    sm="6"
                    md="2"
                    :key="i"
                  >
                    <v-btn class="ma-2" v-if="bed.isOccupied" color="primary">
                      {{ bed.identifier }}&nbsp;&nbsp;
                      <v-icon>mdi-bed</v-icon>
                    </v-btn>
                    <v-btn class="ma-2" outlined v-else color="green">
                      {{ bed.identifier }}&nbsp;&nbsp;
                      <v-icon>mdi-bed-outline</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </fieldset>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
export default {
  data: () => ({
    title: "Wards",
    search: ""
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
<style scoped>
fieldset {
  background-color: transparent;
  max-width: 100%;
  padding: 16px;
  border: 2px solid green;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
}
.legend1 {
  margin-bottom: 0px;
  margin-left: 0px;
}
</style>
