<template>
  <v-card class="mx-auto" max-width="">
    <v-card dark flat>
      <v-card-title class="pa-2 primary">
        <h3 class="title font-weight-light text-center grow">Notifications</h3>
      </v-card-title>
    </v-card>
    <v-card-text class="py-0">
      <v-timeline align-top dense>
        <v-timeline-item
          color="primary"
          small
          v-for="(notification, i) in notifications"
          :key="i"
        >
          <v-row class="pt-1" no-gutters dense>
            <v-col cols="1">
              <strong class="primary--text text-caption">{{
                notification.createdAt
              }}</strong>
            </v-col>
            <v-col>
              <strong>{{ notification.title }}</strong>
              <div class="caption">
                <p>
                  {{ notification.message }}
                </p>
              </div>
            </v-col>
            <v-col cols="1">
              <v-btn icon text>
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      color="primary"
                      @click.stop="markasread(notification)"
                      v-if="notification.isNew"
                      >mdi-checkbox-marked-circle-outline</v-icon
                    >
                  </template>
                  <span>Mark as read</span>
                </v-tooltip>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    total: 10,
  }),
  created() {
    this.$store.dispatch("_getallnotifications");
  },
  methods: {
    fetchnotifications: function () {
      this.$store.dispatch("_getallnotifications");
    },
    markasread: function (notification) {
      this.$store.dispatch("_readnotification", notification.id).then(() => {
        setTimeout(() => {
          this.fetchnotifications();
          this.$store.dispatch("_getnewnotifications");
        }, this.delay_seconds);
      });
    },
  },
  computed: {
    ...mapGetters({
      notifications: "allnotifications",
    }),
  },
};
</script>
