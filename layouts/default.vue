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
      width="280"
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
        <v-list-item class="list-item ma-0" dense to="/">
          <v-list-item-icon class="ml-1 mr-1">
            <v-icon color="gray lighten-3" small>mdi-view-grid</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="tile ma-0 pa-0">
            <v-list-item-title
              color="#8C93F5"
              class="font-weight-light text-caption "
              >{{ $t("label.menu.dashboard") }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list nav dense subheader tile class="mt-0 pa-0">
        <template v-for="(setting, ind) in settings">
          <v-list-group
            :value="true"
            no-action
            ripple="true"
            :prepend-icon="setting.icon"
            :key="ind"
          >
            <template v-slot:activator>
              <v-list-item-title
                color="#8C93F5"
                class="font-weight-light text-caption "
              >
                {{ $t(setting.title) }}</v-list-item-title
              >
            </template>

            <template v-for="(menu, index) in setting.menus">
              <v-list-item :key="index" :to="menu.to">
                <v-list-item-content>
                  <v-list-item-title
                    color="#8C93F5"
                    class="font-weight-light text-caption ma-0 pa-0"
                  >
                    <v-icon
                      small
                      color="gray lighten-3"
                      v-html="menu.icon"
                    ></v-icon>
                    &nbsp;&nbsp;{{ $t(menu.title) }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>
        </template>
      </v-list>
      <v-list nav dense subheader tile class="mt-0 pa-0">
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

      titles: {
        title: "Ospic"
      },
      settings: [
        {
          title: "label.menu.patients",
          icon: "mdi-account-multiple",
          menus: [
            {
              title: "label.menu.patients",
              to: "/patients",
              icon: "mdi-account-multiple"
            },
            {
              title: "label.menu.opdcenter",
              icon: "mdi-alpha-o-circle",
              to: "/opd",
              subtitle: "Lorem ipsum dolor sit de amet.."
            },
            {
              title: "label.menu.ipdcenter",
              icon: "mdi-bed-queen",
              to: "/ipd",
              subtitle: "Lorem ipsum dolor sit de amet.."
            },
            {
              title: "label.menu.appointmentandschedule",
              icon: "mdi-alarm-multiple",
              to: "/appointments",
              subtitle: "Lorem ipsum dolor sit de amet ..."
            }
          ]
        },
        {
          title: "label.menu.inventoryandstock",
          icon: "mdi-store-24-hour",
          menus: [
            {
              title: "label.titles.pharmacy",
              to: "/inventory/",
              icon: "mdi-pharmacy"
            },
            {
              title: "label.titles.medicine",
              to: "/inventory/medicine",
              icon: "mdi-pill"
            },
            {
              title: "label.titles.bloodbank",
              to: "/inventory/bloods",
              icon: "mdi-blood-bag"
            },
            {
              title: "label.titles.wards",
              to: "/inventory/ward",
              icon: "mdi-home-floor-1"
            },
            {
              title: "label.titles.beds",
              to: "/inventory/bed",
              icon: "mdi-bunk-bed-outline"
            }
          ]
        },
        {
          title: "label.menu.laboratory",
          icon: "mdi-octagon",
          menus: [
            {
              title: "label.menu.laboratory",
              icon: "mdi-octagon",
              to: "/laboratory",
              subtitle: "Lorem ipsum dolor sit de amet.."
            },
            {
              title: "label.menu.radiology",
              icon: "mdi-radioactive",
              to: "/laboratory/radiology",
              subtitle: "Lorem ipsum dolor sit de amet.."
            }
          ]
        },
        {
          title: "label.menu.organization",
          icon: "mdi-store-24-hour",
          menus: [
            {
              title: "label.menu.staff",
              to: "/staffs",
              icon: "mdi-account-hard-hat"
            }
          ]
        },
        {
          title: "label.menu.finance",
          icon: "mdi-finance",
          menus: [
            {
              title: "label.menu.finance",
              icon: "mdi-finance",
              to: "/finance",
              subtitle: "Lorem ipsum dolor sit de amet.."
            }
          ]
        }
      ],

      items: [
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
