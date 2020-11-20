<template>
  <div>
    <fieldset>
      <legend class="">
        <h3>{{ ward.name }}</h3>
      </legend>
      <v-container fluid>
        <v-row align="start" align-content="stretch" justify="start" dense>
          <v-col v-for="(bed, i) in ward.beds" cols="12" sm="6" md="2" :key="i">
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
</template>
<script>
export default {
  props: {
    ward: {
      type: Object,
      default: null
    }
  },
  data: () => ({})
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
