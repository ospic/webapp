<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="default" :elevation="hover ? 3 : 1">
        <v-toolbar flat dense>
          <v-card-title class="grey--text">
            <span> {{ item.title }}</span>
          </v-card-title>
          <v-spacer></v-spacer>
          <v-icon v-text="item.icon" :color="item.color"></v-icon>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="ma-0 py-0">
          <v-list-item dense class="ma-0 pa-0">
            <v-list-item-content>
              <v-list-item-title
                class="primary--text font-weight-light text-body-1"
                >{{ formatPrice(item.value) }}
              </v-list-item-title>
              <v-list-item-subtitle
                v-html="item.subtitle1"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item dense class="ma-0 pa-0">
            <v-list-item-content>
              <v-list-item-title
                class="primary--text font-weight-normal text-body-1"
                >{{ formatPrice(item.amount) }}&nbsp;<v-icon
                  color="primary"
                  small
                  >mdi-arrow-up</v-icon
                >
              </v-list-item-title>
              <v-list-item-subtitle
                v-html="item.subtitle2"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card-text>
      </v-card>
    </template>
  </v-hover>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  data: function () {
    return {};
  },
};
</script>
<style scoped>
.outlined {
  color: blue !important;
  border-color: blue !important;
}
</style>
