<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/inventory">{{
        $t("label.breadcrumb.inventory")
      }}</router-link>
      <router-link to="/inventory/bed" class="active">{{
        $t("label.breadcrumb.bloodbank")
      }}</router-link>
    </div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="groups"
        :search="search"
        :options="body.options"
        mobile-breakpoint="100"
      >
        <template v-slot:top>
          <v-toolbar flat dark color="primary">
            <v-row no-gutters>
              <v-col cols="12" md="2" align-self="center">
                <h3 class="title">Blood Bank</h3>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="Enter search text ..."
                  rounded
                  single-line
                  hide-details
                  filled
                  class="pt-3"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-dialog v-model="dialog" max-width="900px">
              <v-card>
                <v-card-title>
                  <span class="headline"
                    >Update Group {{ editedItem.group }}</span
                  >
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.group"
                          label="Group"
                          readonly
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.added"
                          value="0"
                          type="number"
                          label="Counts(To be added)"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          :value="summation"
                          type="number"
                          readonly
                          label="Counts(In total)"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="button cancel" @click="close">{{
                    $t("label.button.btncancel")
                  }}</v-btn>
                  <v-btn class="button" @click="save">{{
                    $t("label.button.btnsave")
                  }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.group`]="{ item }">
          <p class="font-weight-bold">{{ item.group }}</p>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click="editItem(item)" small color="blue darken-2"
            >mdi-lead-pencil</v-icon
          >
        </template>

        <template v-slot:no-data>
          <h3>No Data available ...</h3>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    search: null,
    dialog: false,
    headers: [
      { text: "Group", value: "group", class: "primary" },
      {
        text: "Quantitty(in bags)",
        value: "counts",
        class: "primary",
        sortable: false,
      },
      { text: "Actions", value: "actions", class: "primary" },
    ],
    editedItem: {
      id: 0,
      group: "",
      added: 0,
      total: 0,
      counts: 0,
    },
  }),
  beforeCreate() {
    this.$store.dispatch("fetchbloodsbank");
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.groups.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editedItemId = item.id;
    },
    close() {
      this.dialog = false;
    },
    getdata: function () {
      this.$store.dispatch("fetchbloodsbank");
    },
    save() {
      var data = {
        groupId: this.editedItem.id,
        bagsCount: this.editedItem.added,
      };
      this.$store.dispatch("updatebloodgroup", data).then(() => {
        this.getdata();
        this.close();
      });
    },
  },
  computed: {
    groups() {
      return this.$store.getters.groups;
    },
    summation() {
      return parseInt(this.editedItem.added) + parseInt(this.editedItem.counts);
    },
  },
};
</script>
