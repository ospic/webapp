<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="default" :elevation="hover ? 3 : 1">
        <v-list-item>
          <v-list-item-avatar height="45" width="45" rounded>
            <v-icon color="primary" size="50" v-text="item.icon"></v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              class=" font-weight-black my-1"
              v-html="item.title"
            ></v-list-item-title>
            <v-list-item-subtitle
              class="text-h5 font-weight-normal"
              v-html="item.value"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </template>
  </v-hover>
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
