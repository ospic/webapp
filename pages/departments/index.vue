<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/departments" class="active">Departments</router-link>
    </div>
    <v-card class="mx-auto default ">
      <v-progress-circular
        v-if="departments.length == null"
        indeterminate
        color="grey lighten-5"
        size="16"
      ></v-progress-circular>
      <div md12 v-else>
        <v-data-table
          dense
          :headers="headers"
          :items="departments"
          :search="search"
          width="100%"
          @click:row="handleClick"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <h2>
                <strong>{{ title }}</strong>
              </h2>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Enter search text ..."
                dense
                single-line
                hide-details
              ></v-text-field
              >&nbsp;&nbsp;
              <v-dialog v-model="dialog" max-width="900px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    elevation="1"
                    medium
                    prepend-icon="mdi-plus"
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                    dark
                    ><v-icon left>mdi-plus</v-icon
                    >{{ $t("label.button.newdepartment") }}</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="6">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
                          <v-text-field
                            v-model="editedItem.hierachy"
                            label="Hierachy"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12" md="6" v-if="editedItem.id != 1">
                          <v-select
                            v-model="editedItem.parent"
                            :items="departments"
                            label="Parent department"
                            item-text="name"
                            :item-value="'id'"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
                          <v-text-field
                            v-model="editedItem.extraId"
                            label="Etra Identifier (Optional)"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12" md="12">
                          <v-textarea
                            v-model="editedItem.description"
                            label="Descriptions"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small color="indigo darken-4" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-progress-linear indeterminate color="cyan"></v-progress-linear>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: function() {
    return {
      search: null,
      title: "Departments",
      headers: [
        { text: "ID", value: "id" },
        { text: "Department name", value: "name", sortable: false },
        { text: "Description", value: "descriptions" },
        { text: "Opening date", value: "openingDate" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItemId: "",
      dialog: false,
      editedItem: {
        id: 0,
        name: "",
        hierachy: "",
        description: "",
        extraId: "",
        parent: 0
      },
      defaultItem: {
        id: 0,
        name: "",
        hierachy: "",
        description: "",
        extraId: "",
        parent: 0
      }
    };
  },

  methods: {
    fetchdata() {
      this.$store.dispatch("retrieve_departments");
    },
    editItem(item) {
      this.editedIndex = this.departments.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editedItemId = item.id;
    },
    close() {
      this.dialog = false;
    },
    save() {
      if (this.editedIndex > -1) {
        //this.$store.dispatch("update_medicine_product", this.editedItem);
      } else {
        delete this.editedItem.id;
        this.$store.dispatch("create_department", this.editedItem);
      }
      this.close();
    },
    handleClick: function(value) {
      console.log(value);
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
      this.$store.dispatch("retrieve_departments");
    }
  },
  created() {
    this.$store.dispatch("retrieve_departments");
  },
  computed: {
    ...mapGetters({
      departments: "departments"
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New department" : "Edit department";
    }
  }
};
</script>
