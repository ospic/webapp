<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="groups"
      :search="search"
      :items-per-page="15"
      sort-by="id"
      dense
      class="elevation-0"
    >
      <template v-slot:top>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title><h3>Medicine groups</h3></v-toolbar-title>
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
          <v-dialog v-model="dialog" max-width="900px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                elevation="1"
                class="button primary"
                v-bind="attrs"
                v-on="on"
                x-large
                dark
                v-if="isMdAndUp"
                ><v-icon left>mdi-plus</v-icon
                >{{ $t("label.button.addnewgroup") }}</v-btn
              >
              <v-btn
                v-else
                color="button"
                fab
                small
                class="mb-2 font-weight-normal"
                v-bind="attrs"
                v-on="on"
                dark
                ><v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="primary white--text">
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="pa-4 mt-4">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field
                        v-model="editedItem.descriptions"
                        label="Descriptions"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="button cancel" @click="close">{{
                  $t("label.button.decline")
                }}</v-btn>
                <v-btn class="button" @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small color="indigo darken-4" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  props: {
    groups: {
      type: Array,
      default: null,
    },
  },
  data: () => {
    return {
      editedIndex: -1,
      editedItemId: "",
      dialog: false,
      search: "",
      headers: [
        { text: "ID", value: "id", class: "primary" },
        { text: "Name", value: "name", class: "primary" },
        {
          text: "Descriptions",
          value: "descriptions",
          sortable: false,
          class: "primary",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          class: "primary",
        },
      ],
      editedItem: {
        id: 0,
        name: "",
        descriptions: "",
      },
      defaultItem: {
        id: 0,
        name: "",
        descriptions: "",
      },
    };
  },
  methods: {
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.groups[this.editedIndex], this.editedItem);

        this.$store
          .dispatch("update_medicine_group", this.editedItem)
          .then((res) => {
            setTimeout(() => this.$emit("update"), this.delay_seconds);
          });
      } else {
        this.groups.push(this.editedItem);
        this.$store
          .dispatch("add_new_medicine_group", this.editedItem)
          .then((res) => {
            setTimeout(() => this.$emit("update"), this.delay_seconds);
          });
      }
      this.close();
    },
    close: function () {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    editItem: function (item) {
      this.editedIndex = this.groups.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editedItemId = item.id;
    },
    deleteItem: function () {},
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "New medicine  group"
        : "Edit medicine group";
    },
  },
};
</script>
