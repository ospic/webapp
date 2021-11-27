<template>
  <div>
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
        <template v-slot:top>
          <v-toolbar flat dark color="primary">
            <h2>
              <strong>{{ title }}</strong>
            </h2>
            <v-spacer></v-spacer>

            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search..."
              outlined
              single-line
              hide-details
              class="mt-2"
            ></v-text-field
            >&nbsp;&nbsp;
            <v-btn class="button mb-1" medium @click="showActive">
              {{ button }}</v-btn
            >&nbsp;&nbsp;
            <v-dialog v-model="dialog" max-width="900px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  elevation="1"
                  medium
                  prepend-icon="mdi-plus"
                  class="button"
                  v-bind="attrs"
                  v-on="on"
                  v-if="isMdAndUp"
                  ><v-icon left>mdi-plus</v-icon
                  >{{ $t("label.button.newinsurancecard") }}</v-btn
                >
                <v-btn
                  v-else
                  class="button"
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
                            v-model="editedItem.membershipNumber"
                            placeholder="e.g 11Y73M6839012V0"
                            label="Membership No."
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
                          <v-text-field
                            v-model="editedItem.voteNo"
                            label="Vote Number"
                            autocomplete="false"
                            placeholder="e.g.  1729407-121-32440"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12" md="6">
                          <v-text-field
                            v-model="editedItem.codeNo"
                            placeholder="e.g 407-121-32440"
                            label="Code Number"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            v-model="editedItem.insuranceId"
                            :items="insurances"
                            item-text="name"
                            item-value="id"
                            chips
                            small-chips
                            :rules="[
                              (v) => !!v || 'You must select one to continue!',
                            ]"
                            label="Insurance"
                            required
                            persistent-hint
                            single-line
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="12" md="6">
                          <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.issuedDate"
                                label="Issued date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :rules="[(v) => !!v || 'Date is required']"
                                required
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.issuedDate"
                              no-title
                              scrollable
                              required
                              @input="menu = false"
                            >
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="menu = false">
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(date)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
                        </v-col>

                        <v-col cols="12" sm="12" md="6">
                          <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="editedItem.expireDate"
                                label="Expired date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :rules="[(v) => !!v || 'Date is required']"
                                required
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.expireDate"
                              no-title
                              scrollable
                              required
                              @input="menu2 = false"
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="menu2 = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.menu2.save(date)"
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-menu>
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
                <v-card-title class="text-h5" v-if="activelist">
                  Deactivate this insurance
                </v-card-title>
                <v-card-title class="text-h5" v-else>
                  Activate this insurance
                </v-card-title>
                <v-card-text v-if="activelist"
                  >Are you sure you want to deactivate this insurance. Click
                  'Yes' to deactivate or 'No' to ignore
                </v-card-text>

                <v-card-text v-else
                  >Are you sure you want to activate this insurance. Click 'Yes'
                  to activate or 'No' to ignore
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
              medium
              :color="it.color"
              class="mr-2"
              v-for="(it, i) in items"
              :key="i"
              @click="getSelected(it, item)"
            >
              mdi-{{ activelist ? it.icon : it.icona }}
            </v-icon>
          </td>
        </template>
        <template v-slot:[`item.isActive`]="{ item }">
          <v-icon
            class="font-weight-black"
            color="primary"
            v-if="item.isActive"
          >
            mdi-check
          </v-icon>
          <v-icon class="font-weight-black" color="primary" v-else>
            mdi-close
          </v-icon>
        </template>
        <template v-slot:no-data>
          <p class="mt-2">No Data available</p>
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    insurancecards: {
      type: Array,
      dafault: null,
    },
    title: {
      type: String,
      default: "Active",
    },
    button: {
      type: String,
      default: "Active",
    },
    activelist: {
      type: Boolean,
      default: true,
    },
  },
  data: function () {
    return {
      search: null,
      valid: false,
      editedIndex: -1,
      deletedialog: false,
      select: null,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      menu2: false,
      headers: [
        { text: "ID", value: "id", class: "primary" },
        { text: "Insurance name", value: "insurance.name", class: "primary" },
        {
          text: "Client name",
          value: "patientName",
          class: "primary",
          sortable: false,
        },
        { text: "Client No.", value: "membershipNumber", class: "primary" },
        { text: "Active ? ", value: "isActive", class: "primary" },
        { text: "Gender", value: "sex", class: "primary" },
        { text: "Exipire Date", value: "expireDate", class: "primary" },
        { text: "Actions", value: "actions", class: "primary" },
      ],
      items: [
        {
          title: "Edit",
          icon: "lead-pencil",
          icona: "lead-penci",
          color: "blue",
        },
        {
          title: "Delete",
          icon: "minus-circle",
          icona: "plus-circle",
          color: "red",
        },
      ],
      dialog: false,
      editedItem: {
        id: 0,
        membershipNumber: "",
        voteNo: "",
        issuedDate: "",
        expireDate: "",
        codeNo: "",
        insuranceId: 0,
        patientId: 0,
      },
    };
  },
  methods: {
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
      this.editedIndex = this.insurancecards.indexOf(item);
      this.editedItem = Object.assign({}, item);
      delete this.editedItem.insurance;
      this.dialog = true;
      this.editedItemId = item.id;
    },
    deleteItem() {
      this.activelist
        ? this.$store.dispatch(
            "deactivate_patient_insurance_card",
            this.itemtodelete.id
          )
        : this.$store.dispatch(
            "activate_patient_insurance_card",
            this.itemtodelete.id
          );
      this.close();
    },

    navigateTo: function (id) {
      this.$router.push(`/insurances/${id}`);
    },
    close() {
      setTimeout(() => {
        this.$emit("update");
        this.deletedialog = false;
        this.dialog = false;
      }, this.delay_seconds);
    },
    save() {
      if (this.editedIndex > -1) {
        this.editedItem.patientId = parseInt(this.$route.params.id);
        this.$store.dispatch("update_patient_insurance", this.editedItem);
      } else {
        this.editedItem.patientId = parseInt(this.$route.params.id);
        delete this.editedItem.id;
        this.$store
          .dispatch("create_patient_insurance", this.editedItem)
          .then((res) => {
            setTimeout(() => this.$emit("update"), this.delay_seconds);
          });
      }
      this.close();
    },
    showActive() {
      this.$emit("active");
    },
    handleClick: function (item) {
      //this.navigateTo(item.id);
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
      return this.editedIndex === -1
        ? "New insurance card"
        : "Edit insurance card";
    },
  },
};
</script>
