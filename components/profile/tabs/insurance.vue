<template>
  <div>
    <v-row class=" my-1">
      <v-spacer></v-spacer>
      <v-col cols="3">
        <v-btn class="button" medium>
          <v-icon left>mdi-plus</v-icon>
          {{ $t("label.button.newinsurancecard") }}</v-btn
        >
      </v-col>
    </v-row>

    <v-progress-circular
      v-if="!insurancecards"
      indeterminate
      color="grey lighten-5"
      size="16"
    ></v-progress-circular>
    <div md12 v-else>
      <v-data-table
        dense
        :headers="headers"
        :items="insurancecards"
        :search="search"
        width="100%"
        @click:row="handleClick"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <td @click.stop class="none-clickable">
            <v-icon
              x-small
              :color="it.color"
              class="mr-2"
              v-for="(it, i) in items"
              :key="i"
              @click="getSelected(it, item)"
            >
              mdi-{{ it.icon }}
            </v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <p class="mt-2">No Data available for {{ routename }}</p>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    insurancecards: {
      type: Array,
      dafault: null
    }
  },
  data: function() {
    return {
      search: null,
      title: "Insurances companies",
      valid: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Insurance name", value: "insurance.name" },
        { text: "Client name", value: "patientName", sortable: false },
        { text: "Client No.", value: "membershipNumber" },
        { text: "Gender", value: "sex" },
        { text: "Exipire Date", value: "expireDate" },
        { text: "Actions", value: "actions" }
      ],
      items: [
        { title: "Edit", icon: "lead-pencil", color: "blue" },
        { title: "Delete", icon: "delete", color: "red" }
      ]
    };
  },
  methods: {
    getSelected: function(it, item) {
      if (it.title == "Edit") {
        this.editItem(item);
      }
      if (it.title == "Delete") {
        this.deletedialog = true;
        this.itemtodelete = item;
      }
      if (it.title == "View") {
        this.navigateTo(item.id);
      }
    }
  }
};
</script>
