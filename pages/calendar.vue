<template>
  <div>
    <div class="breadcrumb  ">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/calendar" class="active">{{
        $t("label.breadcrumb.workingcalendar")
      }}</router-link>
    </div>
    <v-card>
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>
          <strong>Events</strong>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          transition="dialog-bottom-transition"
          max-width="800"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="button" v-bind="attrs" v-on="on"
              ><v-icon left>mdi-plus</v-icon> new events</v-btn
            >
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-toolbar flat color="primary" dark>Add new event</v-toolbar>

                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        autofocus
                        v-model="event.name"
                        label="Event name"
                        clearable
                        :rules="[v => !!v || 'Field is required']"
                        required
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        name="input--1"
                        v-model="event.description"
                        label="Event description"
                        hint="Description"
                        :rules="[v => !!v || 'Field is required']"
                        required
                      ></v-textarea>
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

                    <v-col sm="12" md="6">
                      <v-checkbox
                        v-model="event.timed"
                        :label="`Is Timed event: ${event.timed}`"
                      ></v-checkbox>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
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

                    <v-col cols="11" sm="12" md="6">
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
                  </v-row>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn @click="dialog.value = false" class="button cancel"
                    >Cancel</v-btn
                  >
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
                  <v-icon small>
                    mdi-chevron-left
                  </v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2" @click="next">
                  <v-icon small>
                    mdi-chevron-right
                  </v-icon>
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
                      <v-icon right>
                        mdi-menu-down
                      </v-icon>
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
                @change="updateRange"
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
    nowDate: new Date().toISOString().slice(0, 10),
    today: new Date().toISOString(),
    timeNow: new Date().toTimeString().split(" ")[0],
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    event: {
      name: null,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      timed: true,
      description: null,
      departmentId: null
    },
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party"
    ]
  }),
  mounted() {
    this.$refs.calendar.checkChange();
    this.$store.dispatch("get_calendar_events");
  },
  methods: {
    save_event: function() {
      this.event.startDate = this.dates[0];
      this.event.endDate = this.dates[1];
      if (this.$refs.form.validate()) {
        this.$store.dispatch("create_calendar_event", this.event).then(() => {
          setTimeout(
            () => this.$store.dispatch("get_calendar_events"),
            this.delay_seconds
          );
          setTimeout(() => (this.focus = this.focus + " "), this.delay_seconds);
        });
      }
      this.$refs.form.reset();
      this.dialog = false;
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
    updateRange({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay
        });
      }

      this.events = this.fevents;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
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
      var startDate =
        e.start.getFullYear() +
        "-" +
        e.start.getMonth() +
        "-" +
        e.start.getDay();

      var endDate =
        e.end.getFullYear() + "-" + e.end.getMonth() + "-" + e.end.getDay();
      this.dates[0] = startDate;
      this.dates[1] = endDate;

      this.event = {
        name: e.name,
        startDate: this.dates[0],
        startTime: this.update_time_format(e.start),
        endDate: this.dates[1],
        endTime: this.update_time_format(e.end),
        timed: e.timed,
        description: e.eventSummary.description
      };
      this.updateId = e.eventSummary.id;
      this.dialog = true;
      this.edit = true;
    },
    update_time_format(time) {
      return time
        .toLocaleTimeString()
        .slice(0, -3)
        .split(":")[0] < 10
        ? "0" + time.toLocaleTimeString().slice(0, -3)
        : time.toLocaleTimeString().slice(0, -3);
    },

    update_calendar_event() {
      this.event.description = this.event.description;
      this.event.startDate = this.dates[0];
      this.event.endDate = this.dates[1];
      var payload = {
        id: this.updateId,
        data: this.event
      };
      this.$store.dispatch("update_calendar_event", payload).then(() => {
        setTimeout(
          () => this.$store.dispatch("get_calendar_events"),
          this.delay_seconds
        );
      });
    }
  },

  computed: {
    ...mapGetters({
      eventsa: "events"
    }),
    fevents() {
      const events = [];
      this.eventsa.forEach(e => {
        var summary = {
          id: e.id,
          editable: e.ownedByMe,
          description: e.description
        };
        events.push({
          name: e.name,
          start: new Date(e.start),
          end: new Date(e.end),
          color: e.color,
          timed: e.timed,
          eventSummary: summary
        });
      });
      return events;
    }
  }
};
</script>
