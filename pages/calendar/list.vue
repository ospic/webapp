<template>
  <v-card class="mx-auto default">
    <v-progress-circular
      v-if="events.length == null"
      indeterminate
      color="grey lighten-5"
      size="16"
    ></v-progress-circular>
    <div md12 v-else>
      <v-data-table
        dense
        :headers="headers"
        :items="events"
        :search="search"
        width="100%"
        @click:row="handleClick"
        @update:page="updatePagination"
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
          </v-toolbar>
        </template>
        <template v-slot:[`item.isActive`]="{ item }">
          <v-tooltip right v-if="item.isActive" color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on" small color="red lighten-2"
                >mdi-check</v-icon
              >
            </template>
            <span>Active</span>
          </v-tooltip>
          <div v-else></div>
        </template>
        <template v-slot:[`item.description`]="{ item }">
          <v-tooltip color="primary" v-model="show" top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="primary lighten-1"> mdi-information </v-icon>
              </v-btn>
            </template>
            <span>{{ item.description }}</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-btn color="primary" small v-if="item.ownedByMe">
            <v-icon class="mr-2" small>mdi-pencil</v-icon> Edit</v-btn
          >
        </template>
      </v-data-table>
    </div>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    focus: "",
    dates: [],
    search: null,
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
      "4day": "4 Days",
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,

    event: {
      name: null,
      startDate: null,
      startTime: null,
      endDate: null,
      endTime: null,
      timed: true,
      description: null,
      departmentId: null,
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
    headers: [
      { text: "ID", value: "id", class: "primary" },
      {
        text: "Event",
        value: "name",
        class: "primary",
        sortable: false,
      },

      {
        text: "Description",
        value: "description",
        class: "primary",
      },
      { text: "Start", value: "start", class: "primary" },
      { text: "End", value: "end", class: "primary" },
    ],
  }),
  mounted() {
    this.$store.dispatch("get_calendar_events");
  },
  created() {
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
  },

  computed: {
    ...mapGetters({
      events: "events",
    }),
  },
};
</script>
