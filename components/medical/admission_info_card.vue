<template>
  <v-col class="pa-1" cols="12">
    <v-card class="mx-auto" outlined>
      <v-card-title
        background-color="green"
        class="font-weight-bold caption py-2   ma-0 pr-1 "
        >{{ data.fromDateTime }}<v-spacer></v-spacer>
        <v-icon small v-show="data.isActive" color="red">mdi-circle</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content class="mt-1">
          <v-list-item-subtitle
            class="font-weight-normal light-black--text text-subtitle-2"
          >
            From date: {{ data.fromDateTime }}
          </v-list-item-subtitle>
          <v-list-item-subtitle
            class="font-weight-normal light-black--text text-subtitle-2"
          >
            To date: {{ data.toDateTime }}
          </v-list-item-subtitle>
        </v-list-item-content>
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
    return {};
  }
};
</script>
<style scoped>
.outlined {
  color: blue !important;
  border-color: blue !important;
}
</style>
