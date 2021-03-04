<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card class="default" :elevation="hover ? 3 : 1">
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title
              class="text--caption font-weight-normal my-1"
              v-html="item.title"
            ></v-list-item-title>

            <v-list-item-subtitle
              class="text-h5 font-weight-black black--text my-2"
              v-html="item.value"
            ></v-list-item-subtitle>

            <v-list-item-subtitle
              class="font-weight-normal"
              v-html="item.subtitle"
            ></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar height="45" width="45" rounded>
            <v-icon :color="item.color" size="50" v-text="item.icon"></v-icon>
          </v-list-item-avatar>
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
