<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="(item, index) in items"
          :key="index"
          class="pa-1"
          xs="6"
          sm="6"
          md="3"
          xl="1"
        >
          <statistical-card :item="item"></statistical-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import StatisticalCard from "~/components/finance/statistical-card.vue";
export default {
  layout: "finance",
  components: {
    "statistical-card": StatisticalCard
  },

  data: function() {
    return {
      items: [
        {
          value: 1238000,
          title: "Active bills",
          subtitle: "Total bill amounts",
          icon: "mdi-bitcoin",
          color: "blue"
        },
        {
          value: 478000,
          title: "Amount collected",
          subtitle: "Amount collected today",
          icon: "mdi-currency-usd-circle",
          color: "black darken-2"
        },
        {
          value: 562000,
          title: "Amount not collected",
          subtitle: "Amount not collected today",
          icon: "mdi-layers-outline",
          color: "red darken-1"
        },
        {
          value: 34000,
          title: "Total bills",
          subtitle: "Amount collected today",
          icon: "mdi-barcode-scan",
          color: "blue darken-2"
        }
      ]
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
