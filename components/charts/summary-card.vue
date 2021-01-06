<template>
  <v-col class="pa-1" cols="12" xs="4" sm="3" md="2" xl="1">
    <v-card class="mx-auto default " elevation="1">
      <v-card-title class="font-weight-bold caption py-2   ma-0 pr-1 "
        >{{ data.title }}<v-spacer></v-spacer
        ><v-btn
          x-small
          color="teal lighten-2"
          rounded
          depressed
          v-show="data.measure"
          class=" pa-1 white--text text-lowercase font-weight-normal"
          >{{ data.measure }}</v-btn
        ></v-card-title
      >
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content class="mt-1">
          <v-list-item-subtitle
            class="font-weight-light light-blue--text text-subtitle-2"
            >{{ data.value }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="font-weight-light caption  ma-0 pa-0">
            {{ data.subtitle }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon dark v-text="data.icon" color="primary" small></v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      pie_options: {
        series: [44, 55, 13, 33],
        chartOptions: {
          labels: ["Apple", "Mango", "Orange", "Watermelon"]
        }
      }
    };
  }
};
</script>
<style scoped>
.outlined {
  color: blue !important;
  border-color: blue !important;
}
</style>
