<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/insurances" class="active">{{
        $t("label.breadcrumb.insurances")
      }}</router-link>
    </div>
    <v-card class="mx-auto default">
      <v-progress-circular
        v-if="insurances.length == null"
        indeterminate
        color="grey lighten-5"
        size="16"
      ></v-progress-circular>
      <div md12 v-else>
        <v-data-table
          dense
          :headers="headers"
          :items="insurances"
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
                    class="button mt-2"
                    v-bind="attrs"
                    v-on="on"
                    dark
                    v-if="isMdAndUp"
                    ><v-icon left>mdi-plus</v-icon
                    >{{ $t("label.button.newinsurance") }}</v-btn
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
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-toolbar color="primary" dark flat>
                      <v-toolbar-title>
                        <span class="headline">{{
                          formTitle
                        }}</span></v-toolbar-title
                      >
                    </v-toolbar>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="12" md="6">
                            <v-text-field
                              v-model="editedItem.name"
                              label="Insurance company name"
                              autocomplete="false"
                              placeholder="e.g. National Health Insurance fund - NHIF"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="6">
                            <v-text-field
                              v-model="editedItem.poBox"
                              placeholder="e.g 11736"
                              label="P.o Box"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="12" md="6">
                            <v-text-field
                              v-model="editedItem.location"
                              placeholder="e.g. West Eisenhower Road Alexandria, NM 24673"
                              label="Office location"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="12" md="6">
                            <v-text-field
                              v-model="editedItem.telephoneNo"
                              placeholder="e.g +255 716 xxx xxx"
                              label="Organization phone number"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="12" md="6">
                            <v-text-field
                              v-model="editedItem.emailAddress"
                              label="Email address"
                              placeholder="e.g example@ospicx.com"
                            ></v-text-field>
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
                  </v-form>
                </v-card>
              </v-dialog>

              <!--Delete insurance company-dialog-->
              <v-dialog v-model="deletedialog" persistent max-width="590">
                <v-card>
                  <v-card-title class="text-h5">
                    Are you sure you want to delete this insurance?
                  </v-card-title>
                  <v-card-text
                    >Note: This process can not be undone. Click 'Yes' to delete
                    or 'No' to ignore
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" medium @click="deletedialog = false">
                      No
                    </v-btn>
                    <v-btn color="warning" @click="deleteItem" medium>
                      Yes
                    </v-btn>
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
            <p class="mt-2">No Data available...</p>
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
      title: "Insurances companies",
      valid: false,
      headers: [
        { text: "ID", value: "id", class: "primary" },
        { text: "Insurance", value: "name", class: "primary", sortable: false },
        { text: "P.O Box", value: "poBox", class: "primary" },
        { text: "Location", value: "location", class: "primary" },
        { text: "Email", value: "emailAddress", class: "primary" },
        { text: "Actions", value: "actions", class: "primary" },
      ],
      items: [
        { title: "Edit", icon: "lead-pencil", color: "blue" },
        { title: "Delete", icon: "delete", color: "red" },
      ],
      editedIndex: -1,
      editedItemId: "",
      dialog: false,
      deletedialog: false,
      itemtodelete: null,
      editedItem: {
        id: 0,
        name: "",
        poBox: "",
        location: "",
        telephoneNo: "",
        emailAddress: "",
      },
      defaultItem: {
        id: 0,
        name: "",
        poBox: "",
        location: "",
        telephoneNo: "",
        emailAddress: "",
      },
    };
  },

  methods: {
    fetchdata() {
      this.$store.dispatch("get_insurance_companies");
    },
    getSelected: function (it, item) {
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
    },
    editItem(item) {
      this.editedIndex = this.insurances.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editedItemId = item.id;
    },
    deleteItem() {
      this.$store.dispatch("delete_insurance", this.itemtodelete.id);
      setTimeout(() => {
        this.$store.dispatch("get_insurance_companies");
        this.deletedialog = false;
      }, this.delay_seconds);
    },
    navigateTo: function (id) {
      this.$router.push(`/insurances/${id}`);
    },
    close() {
      this.dialog = false;
    },
    save() {
      if (this.editedIndex > -1) {
        this.$store.dispatch("update_insurance", this.editedItem);
      } else {
        delete this.editedItem.id;
        this.$store.dispatch("create_insurance", this.editedItem);
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
        () => this.$store.dispatch("get_insurance_companies"),
        this.delay_seconds
      );
    },
  },
  created() {
    this.$store.dispatch("get_insurance_companies");
  },
  computed: {
    ...mapGetters({
      insurances: "insurances",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New insurance" : "Edit insurance";
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
