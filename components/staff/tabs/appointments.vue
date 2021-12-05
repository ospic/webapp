<template>
  <v-card class="mx-auto default">
    <v-progress-circular
      v-if="appointments.length == null"
      indeterminate
      color="grey lighten-5"
      size="16"
    ></v-progress-circular>
    <div md12 v-else>
      <v-data-table
        dense
        :headers="headers"
        :items="appointments"
        :search="search"
        width="100%"
      >
        <template v-slot:top>
          <v-toolbar flat color="primary" dark>
            <h2>
              <strong>{{ $t(title) }}</strong>
            </h2>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Enter search text ..."
              dense
              single-line
              hide-details
            ></v-text-field>
            <v-dialog v-model="dialog" max-width="900px">
              <!-- <template v-slot:activator="{ on, attrs }">
                <v-btn
                  elevation="1"
                  medium
                  prepend-icon="mdi-plus"
                  class="mb-2 button"
                  v-bind="attrs"
                  v-on="on"
                  dark
                  v-if="isMdAndUp"
                  ><v-icon left>mdi-plus</v-icon
                  >{{ $t("label.button.newappointment") }}</v-btn
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
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </template>-->
              <v-card>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-toolbar color="primary" dark flat>
                    <v-toolbar-title>
                      <span class="headline">{{
                        $t(formTitle)
                      }}</span></v-toolbar-title
                    >
                  </v-toolbar>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.patientId"
                            label="Patient ID"
                            readonly
                            autocomplete="false"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            v-model="editedItem.physicianId"
                            label="Physician ID"
                            readonly
                          ></v-text-field>
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
                                v-model="editedItem.date"
                                label="Appointment date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                :rules="[(v) => !!v || 'Date is required']"
                                required
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="editedItem.date"
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
                          <v-text-field
                            type="time"
                            id="appt"
                            name="appt"
                            required
                            label="Appointment time"
                            v-model="editedItem.time"
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
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            small
            class="button my-2"
            @click="accept_appointment(item.id)"
            v-show="item.status === 'WAITING'"
            >accept</v-btn
          >
          <v-btn
            small
            color="button warning"
            v-show="
              item.status === 'ACCEPTED' ||
              item.status === 'WAITING' ||
              item.status === 'PROGRESSING'
            "
            @click.stop="editItem(item)"
            >re-schedule</v-btn
          >
          <v-btn
            small
            color="button error"
            v-show="
              item.status === 'ACCEPTED' ||
              item.status === 'WAITING' ||
              item.status === 'PROGRESSING'
            "
            @click="reject_appointment(item.id)"
            >decline</v-btn
          >
        </template>
        <template v-slot:[`item.patientId`]="{ item }" }>
          <router-link :to="`/patients/${item.patientId}`">
            Patient No.{{ item.patientId }}</router-link
          >
        </template>
      </v-data-table>
    </div>
  </v-card>
</template>
<script>
export default {
  props: {
    appointments: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
    search: null,
    title: "Adjust appointment",
    dialog: false,
    valid: true,
    menu: null,
    date: null,
    headers: [
      { text: "ID", value: "id", class: "primary" },
      {
        text: "Date",
        value: "appointmentDate",
        sortable: true,
        class: "primary",
      },
      { text: "Status", value: "status", class: "primary" },
      { text: "Patient", value: "patientId", class: "primary" },
      { text: "Actions", value: "actions", class: "primary" },
    ],
    editedIndex: -1,
    editedItem: {
      id: 0,
      patientId: 0,
      physicianId: 0,
      date: "",
      time: "",
      timeZone: "Africa/Dar_es_Salaam",
    },
  }),
  methods: {
    editItem(item) {
      this.editedIndex = this.appointments.indexOf(item);
      //this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.editedItem.id = item.id;
      this.editedItem.physicianId = item.physicianId;
      this.editedItem.patientId = item.patientId;
      this.editedItem.date = item.appointmentDate.split(" ")[0];
      this.editedItem.time = item.appointmentDate.split(" ")[1];
      this.editedItemId = item.id;
    },
    accept_appointment(id) {
      this.$store.dispatch("accept_appointment", id);
      setTimeout(() => {
        this.$emit("update");
      }, this.delay_seconds);
    },
    reject_appointment(id) {
      this.$store.dispatch("reject_appointment", id);
      setTimeout(() => {
        this.$emit("update");
      }, this.delay_seconds);
    },
    close() {
      setTimeout(() => {
        this.$emit("update");
        this.dialog = false;
      }, this.delay_seconds);
    },
    save: function () {
      console.log(this.editedItem);
      this.$store.dispatch("update_appointment", this.editedItem);
      this.close();
    },
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "label.dialogs.newappointment"
        : "label.dialogs.rescheduleappointment";
    },
  },
};
</script>
