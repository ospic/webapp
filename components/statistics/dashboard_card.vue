<template>
  <v-col class="pa-1" xs="6" sm="6" md="2" xl="1">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card
          class="default"
          flat
          :elevation="hover ? 3 : 2"
          color="primary"
          tile
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class=" font-weight-black "
                v-html="item.value"
              ></v-list-item-title>
              <v-list-item-subtitle
                class="font-weight-normal my-1"
                v-html="item.title"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <v-avatar :color="item.color" size="48" class="ml-0 mr-3">
              <v-icon color="white" v-text="item.icon"></v-icon
            ></v-avatar>
          </v-list-item>
        </v-card>
      </template>
    </v-hover>
  </v-col>
</template>
<script>
export default {
  props: {
    item: {
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
