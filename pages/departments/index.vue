<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/departments" class="active">{{
        $t("label.breadcrumb.departments")
      }}</router-link>
    </div>
    <v-card class="mx-auto default">
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
            <v-toolbar flat dark color="primary">
              <h2>
                <strong>{{ title }}</strong>
              </h2>
              <v-spacer></v-spacer>

              <v-text-field
                v-model="search"
                append-icon="search"
                label="Enter search text ..."
                rounded
                outlined
                single-line
                hide-details
                class="mt-2"
              ></v-text-field
              >&nbsp;&nbsp;
              <v-dialog v-model="dialog" max-width="900px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    x-large
                    prepend-icon="mdi-plus"
                    class="mt-2 button"
                    v-bind="attrs"
                    v-on="on"
                    v-if="isMdAndUp"
                    ><v-icon left>mdi-plus</v-icon
                    >{{ $t("label.button.newdepartment") }}</v-btn
                  >
                  <v-btn
                    v-else
                    class="mx-2 button"
                    v-bind="attrs"
                    v-on="on"
                    fab
                    dark
                    small
                  >
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
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

                        <v-col
                          cols="12"
                          sm="12"
                          md="6"
                          v-if="editedItem.id != 1"
                        >
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
                            v-model="editedItem.descriptions"
                            label="Descriptions"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" medium @click.stop="close">{{
                      $t("label.button.decline")
                    }}</v-btn>
                    <v-btn color="warning" medium @click.stop="save">{{
                      $t("label.button.btnsave")
                    }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
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
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: function () {
    return {
      search: null,
      title: "Departments",
      headers: [
        { text: "ID", value: "id", class: "primary" },
        {
          text: "Department name",
          value: "name",
          class: "primary",
          sortable: false,
        },
        { text: "Description", value: "descriptions", class: "primary" },
        { text: "Opening date", value: "openingDate", class: "primary" },
        {
          text: "Actions",
          value: "actions",
          class: "primary",
          sortable: false,
        },
      ],
      items: [
        { title: "Edit", icon: "lead-pencil", color: "blue" },
        { title: "Delete", icon: "delete", color: "red" },
      ],
      editedIndex: -1,
      editedItemId: "",
      dialog: false,
      editedItem: {
        id: 0,
        name: "",
        hierarchy: "",
        descriptions: "",
        extraId: "",
        openingDate: "",
        parent: 0,
      },
      defaultItem: {
        id: 0,
        name: "",
        hierarchy: "",
        descriptions: "",
        extraId: "",
        openingDate: "",
        parent: 0,
      },
    };
  },

  methods: {
    fetchdata() {
      this.$store.dispatch("retrieve_departments");
    },
    getSelected: function (it, item) {
      if (it.title == "Edit") {
        this.editItem(item);
      }
      if (it.title == "Delete") {
        this.deleteItem(item);
      }
      if (it.title == "View") {
        this.navigateTo(item.id);
      }
      console.log(it);
      console.log(item);
    },
    editItem(item) {
      this.editedIndex = this.departments.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editedItemId = item.id;
    },
    deleteItem(item) {
      console.log(item);
    },
    navigateTo: function (id) {
      this.$router.push(`/departments/${id}`);
    },
    close() {
      this.dialog = false;
    },
    save() {
      if (this.editedIndex > -1) {
        this.$store.dispatch("update_department", this.editedItem);
      } else {
        delete this.editedItem.id;
        this.$store.dispatch("create_department", this.editedItem);
      }
      this.close();
    },
    handleClick: function (item) {
      this.navigateTo(item.id);
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
      setTimeout(
        () => this.$store.dispatch("retrieve_departments"),
        this.delay_seconds
      );
    },
  },
  created() {
    this.$store.dispatch("retrieve_departments");
  },
  computed: {
    ...mapGetters({
      departments: "departments",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New department" : "Edit department";
    },
  },
};
</script>
<style lang="scss" scoped>
:v-deep tbody tr {
  cursor: pointer;
}
:v-deep tbody tr td.none-clickable {
  cursor: auto;
}
</style>
