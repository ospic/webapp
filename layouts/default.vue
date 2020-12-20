<template>
  <v-app
    class="app"
    v-bind:style="{ background: $vuetify.theme.dark ? 'white' : 'white' }"
  >
    <!--NAVIGATION DRAWER-->
    <v-navigation-drawer
      v-model="drawer"
      permanent
      :mini-variant.sync="mini"
      overlay-color="primary"
      color="white"
      app
      width="180"
    >
      <v-list nav dense subheader tile class="mt-0 pa-0 py-1">
        <v-list-item dense class="ma-0" to="me">
          <v-list-item-icon class="ml-1 mr-1">
            <v-icon medium color="indigo lighten-1">mdi-plus-box</v-icon>
          </v-list-item-icon>

          <v-list-item-content class="tile ma-0 pa-0">
            <v-list-item-title
              class="font-weight-bold text-overline indigo--text mt-1"
            >
              {{ username }}
            </v-list-item-title>
          </v-list-item-content>
          <v-spacer></v-spacer>
        </v-list-item>
      </v-list>
      <v-list nav dense subheader tile class="mt-0 pa-0">
        <v-divider></v-divider>
        <template v-for="(item, i) in items">
          <v-list-item
            class="list-item ma-0"
            dense
            :key="`${i}-${item.route}`"
            v-on:click="nativateToHere(item.route)"
          >
            <v-list-item-icon class="ml-1 mr-1">
              <v-icon color="gray lighten-3" v-text="item.icon" small></v-icon>
            </v-list-item-icon>
            <v-list-item-content class="tile ma-0 pa-0">
              <v-list-item-title
                color="#8C93F5"
                class="font-weight-light text-caption "
                >{{ $t(item.text) }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      flat
      elevation="0"
      hide-on-scroll
      fixed
      app
      dense
      short
      color="white"
    >
      <v-toolbar-title class="title font-weight-black indigo--text">
        <v-btn x-small icon @click.stop="mini = !mini">
          <v-icon v-if="mini">mdi-arrow-right</v-icon>
          <v-icon v-else>mdi-arrow-left</v-icon> </v-btn
        >&nbsp;&nbsp;&nbsp; Welcome, {{ username }}
      </v-toolbar-title>

      <v-spacer class="hidden-xs-only"></v-spacer>

      <v-tooltip bottom color="primary" open-on-hover open-delay="500">
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            v-if="$vuetify.breakpoint.mdAndUp"
            v-on="on"
            @click.stop="syncro()"
            elevation="1"
            x-small
            class="mr-2 primary"
          >
            <v-icon v-on="on" v-if="sync" medium>mdi-progress-clock</v-icon>
            <v-icon v-else medium>mdi-progress-check</v-icon>
          </v-btn>
        </template>

        <span v-if="sync" color="white">{{
          $t("label.tooltip.progresssynchronising")
        }}</span>
        <span v-else color="white">{{ $t("label.tooltip.synchronise") }}</span>
      </v-tooltip>

      <v-tooltip
        bottom
        color="primary"
        v-if="$vuetify.breakpoint.smAndUp"
        open-on-hover
        open-delay="500"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            v-on="on"
            elevation="1"
            to="/settings"
            x-small
            class="mr-2 green primary"
          >
            <v-icon medium>mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("label.tooltip.settingsandconfigurations") }}</span>
      </v-tooltip>
      <v-tooltip bottom color="primary" open-on-hover open-delay="500">
        <template v-slot:activator="{ on }">
          <v-btn fab v-on="on" x-small elevation="1" class="mr-2 primary">
            <v-icon medium @click="logoutsession">mdi-power</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("label.tooltip.clicktologout") }}</span>
      </v-tooltip>
    </v-app-bar>
    <a
      class="github-fork-ribbon left-bottom fixed "
      href="https://github.com/ospic/webapp"
      target="_blank"
      rel="noopener noreferrer"
      data-ribbon="Fork me on GitHub"
      title="Fork me on GitHub"
      >Fork me on GitHub</a
    >
    <v-main>
      <v-container style="background-color: #efefef;" class="pa-2 ma-0" fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer color="white">
      <v-progress-linear
        v-if="sync"
        width="100"
        color="teal"
        buffer-value="0"
        value="20"
        stream
      ></v-progress-linear>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default {
  async fetch({ store, params }) {
    // await this.$store.dispatch("getProfile");
  },
  components: {},
  data() {
    return {
      clipped: false,
      mini: true,
      drawer: true,
      fixed: false,
      picture: true,
      dark: false,
      sync: false,
      interval: {},
      value: 0,
      tabs: [
        { title: "News", icon: "news-component" },
        { title: "Indicators", icon: "mdi-eye" },
        { title: "Sectors", icon: "mdi-eye" },
        { title: "Indicator Source", icon: "mdi-eye" },
        { title: "Current Release", icon: "mdi-eye" },
        { title: "Disaggregations", icon: "mdi-eye" }
      ],
      titles: {
        title: "Ospic"
      },

      items: [
        {
          text: "label.menu.dashboard",
          icon: "mdi-view-grid",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.patients",
          icon: "mdi-account-multiple",
          route: "patients",

          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.appointmentandschedule",
          icon: "mdi-alarm-multiple",
          route: "appointments",
          subtitle: "Lorem ipsum dolor sit de amet ..."
        },
        {
          text: "label.menu.staff",
          icon: "mdi-account-hard-hat",
          route: "staffs",
          subtitle: "Lorem ipsum dolor sit de amet ..."
        },
        {
          text: "label.menu.opdcenter",
          icon: "mdi-alpha-o-circle",
          route: "opd",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.ipdcenter",
          icon: "mdi-bed-queen",
          route: "ipd",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.laboratory",
          icon: "mdi-octagon",
          route: "lab",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.pharmacyandmedicine",
          icon: "mdi-pharmacy",
          route: "pharmacy",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },

        {
          text: "label.menu.finance",
          icon: "mdi-finance",
          route: "finance",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },

        {
          text: "label.menu.inventoryandstock",
          icon: "mdi-store-24-hour",
          route: "inventory",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },

        {
          text: "label.menu.stations",
          icon: "mdi-adjust",
          route: "stations",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.calendar",
          icon: "mdi-calendar-month",
          route: "calendar",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.reports",
          icon: "mdi-clipboard-file",
          route: "reports",
          subtitle: "Lorem ipsum dolor sit de amet.."
        }
      ],
      actions: [
        // { title: "View profile", icon: "mdi-account-circle" },
        { title: "Settings", icon: "mdi-cog" },
        { title: "Help", icon: "mdi-help" },
        { title: "Logout", icon: "mdi-logout-variant" }
      ],
      miniVariant: false,
      right: true,
      shaped: true,
      collapseOnScroll: true,
      rightDrawer: false,
      year: new Date().getFullYear(),
      userdata: {
        username: "Elirehema Paul"
      }
    };
  },

  methods: {
    selectedItemAction: function(item) {
      switch (item) {
        case 0:
          //this.$router.push("/profile");
          break;
        case 2:
          localStorage.removeItem("qAccessToken");
          localStorage.removeItem("uuId");
          sessionStorage.clear();
          this.$router.push("/");
          break;
      }
    },
    toggledrawer: function() {
      this.drawer = !this.drawer;
    },
    logoutsession: function() {
      this.$store.dispatch("_clear_local_storage_and_sign_out");
      this.drawer = !this.drawer;
    },
    changemode: function() {
      this.dark = !this.dark;
      this.$vuetify.theme.dark = this.dark;
    },
    nativateToHere(id) {
      this.$router.push("/" + id);
    },
    toggle(value) {
      if (`${value}` === "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    },
    check_cookie_name: function(name) {
      var match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      if (match) {
        return match[2];
      } else {
        this.logoutsession();
        console.log("--something went wrong---");
      }
    },

    syncro: async function() {
      const vm = this;
      vm.sync = !vm.sync;
      await Promise.all([
        vm.$store.dispatch("retrievepatients"),
        vm.$store.dispatch("retrievephysicians"),
        vm.$store.dispatch("get_patient_trends")
      ]).then(function() {
        console.log("Loading complete...");
      });
      setTimeout(() => {
        vm.sync = !vm.sync;
      }, 2000);
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  beforeUpdate() {
    this.check_cookie_name("ospic.token");
  },
  computed: {
    username() {
      return window.localStorage.getItem("ospic.username");
    },
    email() {
      return window.localStorage.getItem("ospic.email");
    }
  }
};
</script>
<style scoped>
.list-item .tile {
  color: #566573;
}
.list-item:hover .tile:hover {
  color: #4a56ff;
}
</style>
