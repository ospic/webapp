<template>
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
</template>
<script>
import StatisticalCard from "~/components/finance/statistical-card.vue";
export default {
  components: {
    "statistical-card": StatisticalCard
  },

  data: function() {
    return {
      items: [
        {
          value: 34000,
          title: "Vuetify layout",
          icon: "mdi-progress-question"
        },
        {
          value: 34000,
          title: "Vuetify layout",
          icon: "mdi-progress-question"
        },
        {
          value: 34000,
          title: "Vuetify layout",
          icon: "mdi-progress-question"
        },
        {
          value: 34000,
          title: "Vuetify layout",
          icon: "mdi-progress-question"
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
