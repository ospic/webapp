<template>
  <v-card>
    <v-data-table
      dense
      class="default"
      :headers="headers"
      :items="datalist"
      :search="search"
      :options="body.options"
      sort-by="isActive"
      :sort-desc="sortDesc"
      mobile-breakpoint="100"
      @click:row="handleClick"
      :items-per-page="itemsperpage"
      @update:page="updatePagination"
    >
      <template v-slot:top>
        <v-toolbar flat class="primary" dark>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Enter search text ..."
            single-line
            hide-details
            rounded
            filled
            height="40"
          ></v-text-field
          >&nbsp;&nbsp;

          <div v-if="hasPermission('ALL_FUNCTIONS', 'CREATE_PATIENT')">
            <v-btn x-large v-if="isMdAndUp" class="button" to="/patients/add"
              ><v-icon>mdi-plus</v-icon
              >{{ $t("label.button.btnnewpatient") }}</v-btn
            >
            <v-btn fab v-else class="button" to="/patients/add"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
          </div>
        </v-toolbar>
      </template>
      <template v-slot:[`item.gender`]="{ item }">
        <v-tooltip top v-if="item.gender == 'Female'" color="green">
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" small color="green darken-2"
              >mdi-gender-female
            </v-icon>
          </template>
          <span>{{ $t("label.tooltip.genderfemale") }}</span>
        </v-tooltip>
        <v-tooltip top v-if="item.gender == 'Male'" color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" small color="primary darken-2"
              >mdi-gender-male
            </v-icon>
          </template>
          <span>{{ $t("label.tooltip.gendermale") }}</span>
        </v-tooltip>
        <v-tooltip top v-if="item.gender == 'Unspecified'" color="cyan">
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
      <template v-slot:[`item.isActive`]="{ item }">
        <v-icon class="font-weight-black" color="primary" v-if="item.isActive">
          mdi-check
        </v-icon>
      </template>

      <template v-slot:no-data>
        <h3>No Data available ...</h3>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: ["datalist", "pagetitle"],
  data: () => ({
    dialog: false,
    search: "",
    sortDesc: false,
    headers: [
      { text: "Name", value: "name", class: "primary" },
      { text: "Gender", value: "gender", class: "primary", sortable: false },
      { text: "Guardian", value: "guardianName", class: "primary" },
      { text: "Status", value: "isAdmitted", class: "primary", sortable: true },
      { text: "Address", value: "address", class: "primary" },
      { text: "Phone", value: "phone", class: "primary", sortable: true },
      { text: "Is Active?", value: "isActive", class: "primary" },
      { text: "Created On", value: "createdDate", class: "primary" },
      { text: "Created By", value: "createdBy", class: "primary" },
      { text: "Updated On", value: "lastModifiedDate", class: "primary" },
      { text: "Updated By", value: "lastModifiedBy", class: "primary" },
    ],
    desserts: [],
    editedIndex: -1,
    editedItemId: "",
    editedItem: {
      name: "",
      phone: "",
      address: "",
      emailAddress: "",
      guardianName: "",
      height: "",
      weight: "",
      bloodPressure: "",
      age: "",
      bloodGroup: "",
      gender: 0,
      isAdmitted: false,
      symptoms: "",
      note: "",
      marriageStatus: "",
    },
    defaultItem: {
      name: "",
      phone: "",
      address: "",
      emailAddress: "",
      guardianName: "",
      height: "",
      weight: "",
      bloodPressure: "",
      age: "",
      bloodGroup: "",
      gender: 0,
      isAdmitted: false,
      symptoms: "",
      note: "",
      marriageStatus: "",
    },
    genderoptions: ["Male", "Female", "Others"],
    marriagestatusoptions: [
      "Single",
      "Married",
      "Seperated",
      "Widowed",
      "Unspecified",
    ],
    bloodgroupoptions: [
      "A+",
      "A-",
      "B+",
      "B-",
      "O+",
      "O-",
      "AB+",
      "AB-",
      "Unspecified",
    ],
    body: {
      options: {
        page: 1,
        sortBy: ["name"],
      },
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    isAppointmentRoute: {
      get() {
        return this.$router.currentRoute.name === "patients";
      },
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {},

  methods: {
    editItem(item) {
      this.editedIndex = this.datalist.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editedItemId = item.id;
    },

    handleClick: function (value) {
      this.$router.push("/patients/" + value.id);
    },
    initialize() {},
    updatePagination: function (val) {
      console.log(val);
    },
  },

  beforeMount() {
    this.$store.dispatch("retrievepatients");
  },
};
</script>
<style scoped>
.v-text-field__slot {
  width: 20px;
}
</style>
