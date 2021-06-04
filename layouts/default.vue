<template>
  <v-app
    class="app"
    style="
    background: rgba(0,0,0,0);"
  >
    <!--NAVIGATION DRAWER-->
    <v-navigation-drawer
      v-model="drawer"
      mini-variant.sync="mini"
      overlay-color="primary"
      color="primary"
      dark
      app
      expand-on-hover
      width="220"
      height="100%"
    >
      <v-list nav dense subheader tile class="mt-0 pa-0 py-1">
        <!-- <v-list-item dense class="px-2" to="/me">
          <v-list-item-avatar>
            <v-img
              src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content class="tile ma-0 pa-0">
            <v-list-item-title
              class="font-weight-bold text-overline primary--text mt-1"
            >
              {{ username }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>-->
        <v-list-item class="list-item ma-0" dense to="/">
          <v-list-item-icon class="ml-1 mr-1">
            <v-icon small>mdi-view-grid</v-icon>
          </v-list-item-icon>
          <v-list-item-title color="#8C93F5" class="font-weight-bold ">{{
            $t("label.menu.dashboard")
          }}</v-list-item-title>
        </v-list-item>
        <div v-for="(setting, ind) in settings" :key="ind + setting.icon">
          <v-divider></v-divider>
          <v-list-group
            :value="false"
            no-action
            ripple
            color="white"
            v-if="hasPermission(setting.permissions)"
          >
            <template v-slot:activator class="ma-0 pa-0">
              <v-list-item-title class="font-weight-bold" dark>
                <v-icon
                  slot="prependIcon"
                  v-html="setting.icon"
                  small
                  class="ml-1 mr-2"
                ></v-icon>
                {{ $t(setting.title) }}</v-list-item-title
              >
            </template>

            <template v-for="(menu, index) in setting.menus">
              <v-list-item
                dense
                class="my-0 py-0"
                :key="index + menu.title"
                :to="menu.to"
                color="white"
                v-if="hasPermission(menu.permissions)"
              >
                <v-list-item-title
                  color="white"
                  class="font-weight-light ma-0 pa-0 "
                >
                  <v-icon small>mdi-circle-medium</v-icon>
                  &nbsp;&nbsp;{{ $t(menu.title) }}</v-list-item-title
                >
              </v-list-item>
            </template>
          </v-list-group>
        </div>

        <template v-for="(item, i) in items">
          <v-divider :key="i"></v-divider>
          <v-list-item
            class="list-item ma-0"
            dense
            :key="`${i}-${item.route}`"
            v-if="hasPermission(item.permissions)"
            v-on:click="nativateToHere(item.route)"
          >
            <v-list-item-icon class="ml-1 mr-1">
              <v-icon v-text="item.icon" small></v-icon>
            </v-list-item-icon>
            <v-list-item-title class="font-weight-bold ">{{
              $t(item.text)
            }}</v-list-item-title>
          </v-list-item>
        </template>

        <v-divider></v-divider>
      </v-list>
      <template v-slot:append>
        <v-select
          v-model="select"
          :items="locales"
          item-text="locale"
          item-value="lang"
          persistent-hint
          return-object
          single-line
          dense
          class="font-weight-light ma-2"
          @change="changeLanguage(select.lang)"
        ></v-select>
        <a
          target="_blank"
          class="ml-2"
          href="https://www.paypal.com/donate?business=HE3L345WEKRWJ&item_name=Support+Ospic+an+open+source++Hospital+Management+system+developers+team.&currency_code=USD"
        >
          <img
            src="https://img.shields.io/badge/Donate-PayPal-green.svg"
            alt="Donate button"
        /></a>
      </template>
    </v-navigation-drawer>
    <v-app-bar hide-on-scroll fixed app flat color="primary">
      <v-toolbar-title>
        <v-avatar color="primary lighten-1" size="36">
          <span
            class="white--text font-weight-bold overline"
            @click.stop="drawer = !drawer"
          >
            <v-icon small color="white">mdi-dots-grid</v-icon>
          </span>
        </v-avatar>
        &nbsp;&nbsp;
        <span class="hidden-sm-and-down font-weight-bold default--text"
          >Hospital Management System</span
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-badge
        bordered
        bottom
        color="deep-purple accent-4"
        dot
        class="mr-2"
        offset-x="10"
        offset-y="10"
      >
        <v-btn fab small class="button" to="/me">
          <v-avatar size="35">
            <v-img :src="thumbnail"></v-img>
          </v-avatar>
        </v-btn>
      </v-badge>
      <v-badge class="mr-3" icon="mdi-lock" color="blue" overlap>
        <template v-slot:badge>
          10
        </template>
        <v-btn fab small class="button" to="/notifications">
          <v-icon color="white">mdi-bell</v-icon></v-btn
        >
      </v-badge>

      <v-tooltip bottom color="primary" open-on-hover open-delay="500">
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            v-if="$vuetify.breakpoint.mdAndUp"
            v-on="on"
            @click.stop="syncro()"
            small
            elevation="1"
            class="button mr-2 "
            dark
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
      <v-tooltip bottom color="primary" open-on-hover open-delay="500">
        <template v-slot:activator="{ on }">
          <v-btn fab v-on="on" small elevation="1" class="mr-2 button" dark>
            <v-icon medium @click="logoutsession">mdi-power</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("label.tooltip.clicktologout") }}</span>
      </v-tooltip>
      <v-btn
        fab
        x-small
        class="pa-1 button"
        elevation="1"
        v-show="false"
        dark
        @click="(dark = !dark), toggle(dark)"
      >
        <v-icon
          medium
          :color="dark ? 'yellow' : 'white'"
          v-html="
            dark
              ? 'mdi-lightbulb-on mdi-rotate-180'
              : 'mdi-lightbulb-outline mdi-rotate-180'
          "
        ></v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container
        style="background-color: transparent;"
        class="pa-0 px-3  ma-0 mt-5"
        fluid
      >
        <v-alert v-if="!domain" dense color="green lighten-1" type="info">
          This application is no longer supported in this domain. It has being
          moved to
          <a style="color: blue" href="https://app.ospicx.com"
            >app.ospicx.com</a
          >
        </v-alert>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer class="primary" fixed padless app>
      <v-btn color="whitish" text to="/about" x-small>
        Made by Ospic
      </v-btn>
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
          permissions:
            "ALL_FUNCTIONS, CREATE_PATIENT, UPDATE_PATIENT, DELETE_PATIENT, DELETE_PATIENT",
          menus: [
            {
              title: "label.menu.appointmentandschedule",
              to: "/appointments",
              permissions:
                "ALL_FUNCTIONS, CREATE_PATIENT, UPDATE_PATIENT, DELETE_PATIENT, DELETE_PATIENT"
            },
            {
              title: "label.menu.patients",
              to: "/patients",
              permissions:
                "ALL_FUNCTIONS, CREATE_PATIENT, UPDATE_PATIENT, DELETE_PATIENT, DELETE_PATIENT"
            },
            {
              title: "label.menu.opdcenter",
              to: "/opd",

              permissions:
                "ALL_FUNCTIONS, CREATE_PATIENT, UPDATE_PATIENT, DELETE_PATIENT, DELETE_PATIENT"
            },
            {
              title: "label.menu.ipdcenter",
              to: "/ipd",
              permissions: "ALL_FUNCTIONS"
            }
          ]
        },
        {
          title: "label.menu.inventoryandstock",
          icon: "mdi-store-24-hour",
          permissions: "ALL_FUNCTIONS",
          menus: [
            {
              title: "label.titles.pharmacy",
              to: "/inventory/",
              permissions: "ALL_FUNCTIONS"
            },
            {
              title: "label.titles.medicine",
              to: "/inventory/medicine",
              permissions: "ALL_FUNCTIONS"
            },
            {
              title: "label.titles.bloodbank",
              to: "/inventory/bloods",
              permissions: "ALL_FUNCTIONS"
            },
            {
              title: "label.titles.wards",
              to: "/inventory/ward",
              permissions: "ALL_FUNCTIONS"
            },
            {
              title: "label.titles.beds",
              to: "/inventory/bed",
              permissions: "ALL_FUNCTIONS"
            }
          ]
        },
        {
          title: "label.menu.medicalservices",
          icon: "mdi-octagon",
          permissions: "ALL_FUNCTIONS",
          menus: [
            {
              title: "label.menu.laboratory",
              icon: "mdi-octagon",
              to: "/services/laboratory",
              permissions: "ALL_FUNCTIONS"
            },
            {
              title: "label.menu.radiology",
              icon: "mdi-radioactive",
              to: "/services/radiology",
              permissions: "ALL_FUNCTIONS"
            },
            {
              title: "label.titles.medicalservices",
              to: "/services",
              permissions: "ALL_FUNCTIONS"
            },
            {
              title: "label.titles.servicecategories",
              to: "/services/types",
              permissions: "ALL_FUNCTIONS"
            }
          ]
        },
        {
          title: "label.menu.organization",
          icon: "mdi-store-24-hour",
          permissions: "ALL_FUNCTIONS",
          menus: [
            {
              title: "label.menu.staff",
              to: "/staffs",
              permissions: "ALL_FUNCTIONS"
            },
            {
              title: "label.titles.departments",
              to: "/departments",
              permissions: "ALL_FUNCTIONS"
            },
            {
              title: "label.titles.insurances",
              to: "/insurances",
              permissions:
                "ALL_FUNCTIONS, READ_INSURANCE_COMPANY,UPDATE_INSURANCE_COMPANY,DELETE_INSURANCE_COMPANY,CREATE_INSURANCE_COMPANY"
            }
          ]
        },
        {
          title: "label.menu.finance",
          icon: "mdi-currency-usd-circle",
          permissions:
            "ALL_FUNCTIONS, CREATE_BILL, READ_BILL,UPDATE_BILL,DELETE_BILL",
          menus: [
            {
              title: "label.menu.dashboard",
              to: "/finance",
              permissions: "ALL_FUNCTIONS"
            },
            {
              title: "label.menu.bills",
              to: "/finance/bills",
              permissions: "ALL_FUNCTIONS"
            },
            {
              title: "label.menu.transactions",
              to: "/finance/transactions",
              permissions: "ALL_FUNCTIONS"
            },
            {
              title: "label.menu.financereports",
              to: "/finance/reports",
              permissions: "ALL_FUNCTIONS"
            }
          ]
        }
      ],

      items: [
        /**  {
          text: "label.menu.stations",
          icon: "mdi-map-marker-radius",
          route: "stations",

          permissions: "ALL_FUNCTIONS"
        },
        **/
        {
          text: "label.menu.calendar",
          icon: "mdi-calendar-month",
          route: "calendar",

          permissions: "ALL_FUNCTIONS"
        },
        {
          text: "label.menu.reports",
          icon: "mdi-clipboard-file",
          route: "reports",

          permissions: "ALL_FUNCTIONS"
        },
        {
          text: "label.tooltip.settingsandconfigurations",
          icon: "mdi-cog-outline",
          route: "settings",
          permissions: "ALL_FUNCTIONS"
        }
      ],
      actions: [
        // { title: "View profile", icon: "mdi-account-circle" },
        { title: "Settings", icon: "mdi-cog" },
        { title: "Help", icon: "mdi-help" },
        { title: "Logout", icon: "mdi-logout-variant" }
      ],
      select: { locale: "English", lang: "en" },
      locales: [
        {
          locale: "English",
          lang: "en"
        },
        {
          locale: "Kiswahili",
          lang: "sw"
        },
        {
          locale: "French",
          lang: "fr"
        },
        {
          locale: "Arab",
          lang: "ar"
        }
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
    toggle(mode) {
      if (`${mode}` === "true") {
        this.$vuetify.theme.dark = true;
        this.$store.dispatch("change_to_dark");
        document.body.style.background = "#1d3333";
        this.dark = true;
      } else {
        this.$store.dispatch("change_to_light");
        this.$vuetify.theme.dark = false;
        this.dark = false;
        document.body.style.backgroundImage =
          "url(https://cdn.hipwallpaper.com/i/50/79/MSsZP2.jpg)";
      }
    },

    syncro: async function() {
      const vm = this;
      vm.sync = !vm.sync;
      await Promise.all([
        vm.$store.dispatch("retrievepatients"),
        vm.$store.dispatch("retrievephysicians")
      ]).then(function() {
        console.log("Loading complete...");
      });
      setTimeout(() => {
        vm.sync = !vm.sync;
      }, 2000);
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },

  computed: {}
};
</script>
