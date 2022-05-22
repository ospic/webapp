<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/calendar" class="active">{{
        $t("label.breadcrumb.workingcalendar")
      }}</router-link>
    </div>
    <v-card>
      <v-toolbar dark flat color="primary">
        <v-toolbar-title> {{ $t("label.titles.events") }} </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          transition="dialog-bottom-transition"
          max-width="800"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="button" x-large v-bind="attrs" v-on="on"
              ><v-icon left>mdi-plus</v-icon
              >{{ $t("label.button.newevent") }}</v-btn
            >
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-title flat class="primary" dark
                  ><span>{{
                    $t("label.titles.addnewevent")
                  }}</span></v-card-title
                >

                <v-card-text>
                  <v-row class="mt-3">
                    <v-col cols="12" sm="12" md="6">
                      <v-text-field
                        autofocus
                        v-model="event.name"
                        label="Event name"
                        clearable
                        :rules="[(v) => !!v || 'Field is required']"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col sm="6" md="6" class="d-flex justify-center">
                      <v-checkbox
                        v-model="event.timed"
                        :label="`Timed : ${event.timed}`"
                      ></v-checkbox>
                    </v-col>

                    <v-col cols="12" sm="12" md="6">
                      <v-select
                        v-model="event.departmentId"
                        :items="departments"
                        item-text="name"
                        item-value="id"
                        chips
                        small-chips
                        @change="fetchdepartmentstaffs"
                        :rules="[
                          (v) => !!v || 'You must select one to continue!',
                        ]"
                        label="Departments"
                        required
                        persistent-hint
                        single-line
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="6" v-if="isdep">
                      <v-select
                        v-model="event.memberIds"
                        :items="departmentstaffs"
                        item-text="username"
                        item-value="id"
                        chips
                        small-chips
                        multiple
                        @change="fetchdepartmentstaffs"
                        :rules="[
                          (v) => !!v || 'You must select one to continue!',
                        ]"
                        label="Choose member to receive notification"
                        required
                        persistent-hint
                        single-line
                      >
                        <template v-slot:append="{ item }">
                          <v-checkbox v-model="item.id"></v-checkbox>
                        </template>
                        <template v-slot:item="{ item }">
                          {{
                            item.fullName == null
                              ? item.username
                              : item.fullName
                          }}
                        </template>
                        <template v-slot:selection="{ item }">
                          {{
                            item.fullName == null
                              ? item.username
                              : item.fullName
                          }}
                        </template>
                      </v-select>
                    </v-col>

                    <v-col cols="12" sm="12" md="6">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="dates"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-combobox
                            v-model="dates"
                            multiple
                            chips
                            small-chips
                            label="Selet event start date and end date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-combobox>
                        </template>
                        <v-date-picker
                          v-model="dates"
                          multiple
                          no-title
                          scrollable
                          range
                          reactive
                          :min="nowDate"
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            class="button cancel"
                            @click="menu = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            class="button"
                            @click="$refs.menu.save(dates)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        type="time"
                        id="appt"
                        name="appt"
                        v-if="event.timed"
                        label="Start time"
                        v-model="event.startTime"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>

                    <v-col cols="11" sm="6" md="3">
                      <v-text-field
                        type="time"
                        id="appt"
                        name="appt"
                        v-if="event.timed"
                        label="End time"
                        v-model="event.endTime"
                        required
                        min="12:00"
                        max="18:00"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        name="input--0"
                        v-model="event.description"
                        label="Event description"
                        hint="Description"
                        filled
                        :rules="[(v) => !!v || 'Field is required']"
                        required
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-end">
                  <v-btn @click="close" class="button cancel">Cancel</v-btn>
                  <v-btn
                    v-if="edit"
                    @click="update_calendar_event"
                    class="button"
                    >Update</v-btn
                  >
                  <v-btn v-else @click="save_event" class="button">Save</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </template>
        </v-dialog>
      </v-toolbar>
      <v-card-text>
        <v-row class="fill-height">
          <v-col>
            <v-sheet height="64">
              <v-toolbar flat>
                <v-btn
                  outlined
                  class="mr-4"
                  color="grey darken-2"
                  @click="setToday"
                >
                  Today
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="prev">
                  <v-icon small> mdi-chevron-left </v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="next">
                  <v-icon small> mdi-chevron-right </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                  {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu bottom right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      outlined
                      color="grey darken-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <span>{{ typeToLabel[type] }}</span>
                      <v-icon right> mdi-menu-down </v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="type = 'day'">
                      <v-list-item-title>Day</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'week'">
                      <v-list-item-title>Week</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = 'month'">
                      <v-list-item-title>Month</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="type = '4day'">
                      <v-list-item-title>4 days</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
              <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :event-height="30"
                :events="events"
                :event-color="getEventColor"
                :type="type"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
              ></v-calendar>

              <v-dialog
                v-model="selectedOpen"
                hide-overlay
                transition="fab-transition"
                scrollable
                width="600"
              >
                <v-card
                  color="grey lighten-4"
                  min-width="100px"
                  flat
                  v-if="selectedEvent.eventSummary"
                >
                  <v-toolbar :color="selectedEvent.color" flat dark>
                    <v-toolbar-title
                      v-html="selectedEvent.name"
                    ></v-toolbar-title>
                    <v-spacer></v-spacer>

                    <v-btn
                      icon
                      v-if="selectedEvent.eventSummary.editable"
                      @click="initiate_update(selectedEvent)"
                    >
                      <v-icon>mdi-square-edit-outline</v-icon>
                    </v-btn>
                    <v-btn
                      icon
                      v-if="selectedEvent.eventSummary.editable"
                      @click="
                        delete_calendar_event(selectedEvent.eventSummary.id)
                      "
                    >
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card-text>
                    <span>{{ selectedEvent.eventSummary.description }}</span>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn text color="secondary" @click="selectedOpen = false">
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    focus: "",
    dates: [],
    type: "month",
    time: null,
    menu: false,
    menu2: false,
    modal2: false,
    valid: true,
    dialog: false,
    edit: false,
    updateId: null,
    isdep: true,
    nowDate: new Date().toISOString().slice(0, 10),
    today: new Date().toISOString(),
    timeNow: new Date().toTimeString().split(" ")[0],
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    departmentstaffs: [],

    event: {
      name: null,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      timed: true,
      description: null,
      departmentId: null,
      memberIds: [],
    },
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    this.$store.dispatch("get_calendar_events");
  },
  methods: {
    save_event: function () {
      this.event.startDate = this.dates[0];
      this.event.endDate = this.dates[1];
      if (this.$refs.form.validate()) {
        this.$store.dispatch("create_calendar_event", this.event).then(() => {
          setTimeout(
            () => this.$store.dispatch("get_calendar_events"),
            this.delay_seconds
          );
          setTimeout(() => {
            this.focus = this.focus + " ";
            this.$refs.form.reset();
            this.dialog = false;
          }, this.delay_seconds);
        });
      }
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        this.selectedEvent.details = event.description;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    close: function () {
      this.$refs.form.reset();
      this.edit = false;
      this.dialog = false;
    },

    delete_calendar_event(val) {
      this.$store.dispatch("delete_calendar_event", val).then(() => {
        setTimeout(
          () => this.$store.dispatch("get_calendar_events"),
          this.delay_seconds
        );
        setTimeout(() => {
          this.selectedOpen = false;
        }, 10);
      });
    },
    initiate_update(e) {
      var startD = new Date(e.start);
      var endD = new Date(e.end);

      var startDate = startD.toISOString().split("T")[0];
      var endDate = endD.toISOString().split("T")[0];
      this.dates[0] = startDate;
      this.dates[1] = endDate;

      this.event = {
        name: e.name,
        startDate: this.dates[0],
        startTime: this.update_time_format(e.start),
        endDate: this.dates[1],
        endTime: this.update_time_format(e.end),
        timed: e.timed,
        description: e.eventSummary.description,
      };
      this.updateId = e.eventSummary.id;
      this.dialog = true;
      this.edit = true;
    },
    update_time_format(time) {
      return time.toLocaleTimeString().slice(0, -3).split(":")[0] < 10
        ? "0" + time.toLocaleTimeString().slice(0, -3)
        : time.toLocaleTimeString().slice(0, -3);
    },
    month_format(month) {
      return ("0" + month).slice(-2);
    },

    update_calendar_event() {
      this.event.description = this.event.description;
      console.log(this.dates);
      this.event.startDate = this.dates[0];
      this.event.endDate = this.dates[1];

      var payload = {
        id: this.updateId,
        data: this.event,
      };
      this.$store.dispatch("update_calendar_event", payload).then(() => {
        setTimeout(() => {
          this.$store.dispatch("get_calendar_events");
          this.close();
        }, this.delay_seconds);
      });
    },
    async fetchdepartmentstaffs() {
      return await this.$api
        .$get(`staffs/dep/${this.event.departmentId}/`)
        .then((response) => {
          this.departmentstaffs = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  computed: {
    ...mapGetters({
      eventsa: "events",
      departments: "departments",
    }),
    events() {
      const events = [];
      this.eventsa.forEach((e) => {
        var summary = {
          id: e.id,
          editable: e.ownedByMe,
          description: e.description,
        };
        events.push({
          name: e.name,
          start: new Date(e.start),
          end: new Date(e.end),
          color: e.color,
          timed: e.timed,
          eventSummary: summary,
        });
      });
      return events;
    },
  },
};
</script>
