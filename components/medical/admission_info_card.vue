<template>
  <v-col class="pa-1" cols="12">
    <v-card
      class="mx-auto default darken-1"
      :outlined="!data.isActive"
      :elevation="data.isActive ? 2 : 0"
      :raised="data.isActive"
      :to="`/admission/${data.id}`"
    >
      <v-card-title
        background-color="green"
        class="font-weight-bold caption py-2   ma-0 pr-1 "
        >{{ data.id }}<v-spacer></v-spacer>{{ data.startDate }}&nbsp;&nbsp;
        <v-icon small v-show="data.isActive" color="red"
          >mdi-check-circle</v-icon
        >
      </v-card-title>
      <v-divider></v-divider>
      <v-list-item>
        <v-list-item-content class="mt-1">
          <v-list-item-subtitle class="font-weight-normal light-black--text ">
            <strong>From date: </strong>{{ data.startDate }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="font-weight-normal light-black--text ">
            <strong>To date:</strong> {{ data.endDate }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <strong> Ward: </strong>{{ data.wardName }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <strong> Bed: </strong>{{ data.bedIdentifier }}
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
