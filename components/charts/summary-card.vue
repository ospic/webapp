<template>
  <v-col cols="12" xs="4" sm="3" md="2" xl="1">
    <v-card class="mx-auto ma-0 pa-0" max-width="344" dense tile>
      <v-card-title
        style="background: #00897B;"
        class="font-weight-bold caption py-2   ma-0 pr-1 white--text"
        >{{ data.title }}<v-spacer></v-spacer
        ><v-btn
          x-small
          color="teal darken-2"
          rounded
          depressed
          v-show="data.measure"
          class=" pa-1 white--text text-lowercase font-weight-normal"
          >{{ data.measure }}</v-btn
        ></v-card-title
      >
      <v-divider></v-divider>
      <v-list-item three-line dense>
        <v-list-item-content class="ma-0 pa-0">
          <v-list-item-subtitle
            class="font-weight-light light-blue--text text-h6 ma-0 pa-1"
            >{{ data.value }}</v-list-item-subtitle
          >
          <v-list-item-subtitle
            dense
            class="font-weight-light caption  ma-0 pa-0"
          >
            {{ data.subtitle }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar class="ma-0 mt-1 pa-0 " size="30" color="primary">
          <v-icon dark v-text="data.icon" color="white"></v-icon
        ></v-list-item-avatar>
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
