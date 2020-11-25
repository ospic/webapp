<template>
  <v-data-table
    dense
    :headers="headers"
    :items="datalist"
    :search="search"
    :items-per-page="15"
    sort-by="calories"
    class="elevation-1"
    @click:row="handleClick"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title
          ><h3>{{ pagetitle }}</h3></v-toolbar-title
        >
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field
        >&nbsp;&nbsp;
        <v-dialog v-model="dialog" max-width="900px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="teal"
              fab
              small
              v-if="isAppointmentRoute"
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              dark
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Full Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.phone"
                      label="Phone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.address"
                      label="Address"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.gender"
                      :hint="` ${editedItem.gender.option}`"
                      :items="genderoptions"
                      label="Select"
                      persistent-hint
                      return-object
                      single-line
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.age"
                      label="Age"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.guardianName"
                      label="Guardain Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-checkbox
                      background-color="success lighten-4"
                      on-icon="mdi-bed-outline"
                      v-model="editedItem.isAdmitted"
                      :label="
                        editedItem.isAdmitted
                          ? 'Patient Admitted'
                          : 'Check to admit patient'
                      "
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.gender`]="{ item }">
      <v-tooltip top v-if="item.gender == 'F'" color="green">
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" small color="green darken-2"
            >mdi-gender-female
          </v-icon>
        </template>
        <span>{{ $t("label.tooltip.genderfemale") }}</span>
      </v-tooltip>
      <v-tooltip top v-if="item.gender == 'M'" color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" small color="primary darken-2"
            >mdi-gender-male
          </v-icon>
        </template>
        <span>{{ $t("label.tooltip.gendermale") }}</span>
      </v-tooltip>
      <v-tooltip top v-if="item.gender == 'O'" color="cyan">
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" small color="cyan darken-2"
            >mdi-gender-male-female
          </v-icon>
        </template>
        <span>{{ $t("label.tooltip.genderother") }}</span>
      </v-tooltip>
    </template>

    <template v-slot:[`item.isAdmitted`]="{ item }">
      <v-tooltip right v-if="item.isAdmitted" color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" v-on="on" x-small>mdi-bed-outline</v-icon>
        </template>
        <span>Admitted</span>
      </v-tooltip>
      <div v-else></div>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" color="primary" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small color="red" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <h3>No Data available ...</h3>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: ["datalist", "pagetitle"],
  data: () => ({
    dialog: false,
    search: "",
    headers: [
      { text: "Name", value: "name" },
      { text: "Gender", value: "gender", sortable: false },
      { text: "Guardian", value: "guardianName" },
      { text: "Status", value: "isAdmitted", sortable: true },
      { text: "Address", value: "address", sortable: true },
      { text: "Phone", value: "phone" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItemId: "",
    editedItem: {
      name: "",
      phone: "",
      address: "",
      age: "",
      gender: "",
      guardianName: "",
      ssn: "",
      mdn: "",
      principal_tribe: "",
      country: "",
      isAdmitted: false
    },
    defaultItem: {
      name: "",
      phone: "",
      address: "",
      age: "",
      gender: "",
      guardianName: "",
      ssn: "",
      mdn: "",
      principal_tribe: "",
      country: "",
      isAdmitted: false
    },
    genderoptions: ["Male", "Female", "Others"]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    isAppointmentRoute: {
      get() {
        return this.$router.currentRoute.name === "appointments";
      }
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {},

  methods: {
    editItem(item) {
      this.editedIndex = this.datalist.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editedItemId = item.id;
    },

    deleteItem(item) {
      const index = this.datalist.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.datalist.splice(index, 1);
      this.$store.dispatch("delete_patient", item.id);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      console.log(this.editedItemId);
      if (this.editedIndex > -1) {
        Object.assign(this.datalist[this.editedIndex], this.editedItem);
        var gender = null;
        delete this.editedItem.contactsInformation;
        delete this.editedItem.diagnoses;
        delete this.editedItem.physician;
        switch (this.editedItem.gender.toLowerCase()) {
          case "male":
            gender = "M";
            break;
          case "female":
            gender = "F";
            break;
          case "others":
            gender = "O";
            break;
          default:
            gender = "O";
        }
        this.editedItem.gender = gender;
        console.log(this.editedItem);
        this.$store.dispatch("update_patient", {
          id: this.editedItemId,
          body: this.editedItem
        });
      } else {
        this.datalist.push(this.editedItem);
        this.$store.dispatch("create_new_patient", this.editedItem);
      }
      this.close();
    },
    handleClick: function(value) {
      this.$router.push("/patients/" + value.id);
    },
    initialize() {}
  },

  beforeMount() {
    this.$store.dispatch("retrievepatients");
  }
};
</script>
