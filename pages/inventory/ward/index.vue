<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/inventory">{{
        $t("label.breadcrumb.inventory")
      }}</router-link>
      <router-link to="/inventory/bed" class="active">{{
        $t("label.breadcrumb.wards")
      }}</router-link>
    </div>
    <v-progress-circular
      v-if="wards === null"
      :width="2"
      color="primary"
      size="20"
      indeterminate
    ></v-progress-circular>
    <v-data-table
      v-else
      dense
      :headers="headers"
      :items="wards"
      :search="search"
      :items-per-page="15"
      sort-by="calories"
      class="elevation-1"
      @click:row="navigateToWard"
    >
      <template v-slot:top>
        <v-toolbar flat dark color="primary" class="py-4">
          <v-toolbar-title
            ><h3>{{ title }}</h3></v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="Search by name/company/composition"
            single-line
            hide-details
            rounded
            filled
            height="40"
          ></v-text-field
          >&nbsp;&nbsp;
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                x-large
                v-on="on"
                v-if="isMdAndUp"
                class="button"
                ><v-icon>mdi-plus</v-icon
                >{{ $t("label.button.btncreateward") }}</v-btn
              >
              <v-btn v-bind="attrs" v-on="on" fab v-else class="button"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </template>
            <v-card>
              <v-card-title class="primary">
                <span>{{ $t(formTitle) }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Ward Name"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="button cancel" @click="close">
                  {{ $t("label.button.btncancel") }}
                </v-btn>
                <v-btn class="button" @click="save">
                  {{ $t("label.button.btnsave") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <td @click.stop>
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small color="indigo darken-4" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    title: "Wards",
    search: "",
    editedIndex: -1,
    dialog: false,
    valid: true,
    headers: [
      { text: "ID", value: "id", class: "primary" },
      { text: "Name", value: "name", class: "primary", sortable: false },
      { text: "No. of Beds", value: "numberOfBeds", class: "primary" },
      { text: "Actions", value: "actions", class: "primary", sortable: false },
    ],
    editedItem: {
      id: "",
      name: "",
    },
    defaultItem: {
      id: "",
      name: "",
    },
  }),
  methods: {
    navigateToWard(item) {
      console.log(item);
      this.$router.push("/inventory/ward/" + item.id);
    },
    close: function () {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.$store.dispatch("retrieve_all_wards");
      });
    },
    editItem: function (item) {
      this.editedIndex = this.wards.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem: function (item) {
      this.$store.dispatch("delete_ward", item.id);
    },
    save: function () {
      if (this.editedIndex > -1) {
        this.$store.dispatch("update_ward", this.editedItem);
        this.close();
      } else {
        //Create new item
        delete this.editedItem.id;
        this.$store.dispatch("create_new_ward", this.editedItem);
        this.close();
      }
    },
  },
  computed: {
    wards() {
      return this.$store.getters.wards;
    },
    formTitle() {
      return this.editedIndex === -1
        ? "label.titles.newward"
        : "label.titles.editward";
    },
  },
  beforeMount() {
    this.$store.dispatch("retrieve_all_wards");
  },
};
</script>
