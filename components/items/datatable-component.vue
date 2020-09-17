<template>
  <v-data-table
    :headers="headers"
    :items="repayments"
    :items-per-page="5"
    :search="search"
    class="elevation-0"
    :dense="dense"
    :dark="dark"
    multi-sort
    :loading="loading"
    loading-text="Loading... Please wait"
  >
    <template v-slot:top>
      <v-row no-gutters>
        <v-col cols="6" sm="6">
          <v-switch v-model="dense" label="Dense" class="pa-1"></v-switch>
        </v-col>
        <v-col cols="6" sm="6">
          <v-switch v-model="dark" label="Dark" class="pa-1"></v-switch>
        </v-col>
      </v-row>
    </template>
    <template v-slot:body.append v-if="$vuetify.breakpoint.smAndUp">
      <tr class="table_footer">
        <td>Total#</td>
        <td></td>
        <td>
          <p class="font-weight-black">{{amount}}</p>
        </td>
        <td></td>
        <td>
          <p class="font-weight-black">{{ttInterest}}</p>
        </td>
        <td></td>
        <td>
          <p class="font-weight-black">{{ttBalance}}</p>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
<script>
export default {
  props: [
    "headers",
    "repayments",
    "loading",
    "search",
    "dense",
    "dark",
    "amount",
    "ttInterest",
    "ttBalance"
  ]
};
</script>