<template>
  <v-app class="app" style="background: rgba(0, 0, 0, 0)">
    <!--NAVIGATION DRAWER-->
    <v-navigation-drawer
      v-model="drawer"
      mini-variant.sync="mini"
      overlay-color="primary"
      app
      clipped
      width="220"
      height="100%"
      elevation="0"
    >
      <v-list nav subheader tile class="mt-0 pa-0 py-1">
        <v-list-item class="list-item ma-0" v-if="!showback" to="/">
          <v-list-item-icon class="ml-1 mr-2">
            <v-icon medium color="primary">mdi-panorama-wide-angle</v-icon>
          </v-list-item-icon>
          <v-list-item-title color="primary" class="font-weight-normal">{{
            $t("label.menu.overview")
          }}</v-list-item-title>
        </v-list-item>

        <div v-for="(setting, index) in settings" :key="index">
          <v-list-item
            class="list-item ma-0"
            v-if="index == 0 && showback"
            @click="navigateBack"
          >
            <v-list-item-icon class="ml-1 mr-2">
              <v-icon medium color="primary">mdi-keyboard-backspace</v-icon>
            </v-list-item-icon>
            <v-list-item-title color="primary" class="font-weight-normal"
              >Back to main menu</v-list-item-title
            >
          </v-list-item>
          <v-list-item
            v-esle
            v-if="hasPermission(setting.permissions)"
            v-on:click="navigateToHere(setting.to)"
          >
            <v-list-item-title
              :class="
                !showback ? `font-weight-light ` : ` font-weight-light ml-5`
              "
            >
              <v-icon
                slot="prependIcon"
                v-html="setting.icon"
                :medium="!showback"
                :small="showback"
                color=" primary"
                class="ml-1 mr-2"
              ></v-icon>
              {{ $t(setting.title) }}</v-list-item-title
            >
          </v-list-item>
        </div>
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
        <iframe
          src="https://github.com/sponsors/ospic/button"
          title="Sponsor ospic"
          height="30"
          width="216"
          style="border: 0"
        ></iframe>
      </template>
    </v-navigation-drawer>
    <v-app-bar clipped-left hide-on-scroll dense fixed app flat color="primary">
      <v-toolbar-title>
        <v-avatar color="primary lighten-1" size="36">
          <span
            class="white--text font-weight-bold overline"
            @click.stop="drawer = !drawer"
          >
            <v-icon small color="white">mdi-text</v-icon>
          </span>
        </v-avatar>
        &nbsp;&nbsp;
        <span class="hidden-sm-and-down font-weight-bold default--text"
          >Hospital Management System</span
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!--<v-badge class="mr-3" icon="mdi-lock" color="blue" bottom overlap>
        <template v-slot:badge> 10 </template>
        <v-btn fab small class="primary" elevation="0" to="/notifications">
          <v-icon medium color="white">mdi-bell</v-icon></v-btn
        >
      </v-badge>-->

      <v-tooltip bottom color="primary" open-on-hover open-delay="500">
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            v-if="$vuetify.breakpoint.mdAndUp"
            v-on="on"
            @click.stop="syncro()"
            small
            elevation="0"
            class="primary mr-1"
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

      <v-menu
        max-width="500"
        position-x="center"
        offset-y
        v-if="notificationnumber > 0"
        content-class="elevation-1 mt-4 badge"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-badge
            :content="notificationnumber"
            class="mr-8"
            color="blue lighten-2"
            overlap
          >
            <v-icon v-bind="attrs" v-on="on" color="white" medium>
              mdi-bell-outline
            </v-icon>
          </v-badge>
        </template>
        <v-list color="white" tile>
          <v-timeline v-if="notifications.length > 0" align-top dense>
            <v-timeline-item
              color="primary"
              small
              v-for="(n, i) in notificationnumber > 5 ? 5 : notificationnumber"
              :key="i"
              fill-dot
              class="pt-0 mt-0"
              icon="mdi-bell-alert"
            >
              <v-list-item class="ma-0 pl-0" :key="i">
                <v-list-item-content>
                  <v-list-item-title class="blue--text">{{
                    notifications[i].title
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="font-weight-normal text-caption">
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 350px"
                    >
                      {{ notifications[i].message }}
                    </span>
                    <br />
                    <span class="d-inline-block blue--text text-caption">{{
                      notifications[i].createdAt
                    }}</span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </v-timeline-item>
          </v-timeline>
          <v-list-item class="d-flex justify-center">
            <nuxt-link to="/notifications">View All</nuxt-link>
          </v-list-item>
        </v-list>
      </v-menu>

      <div class="ma-0 pa-0">
        <v-list-item class="ma-0 pa-0" dense dark>
          <v-list-item-avatar :key="image" color="primary lighten-2">
            <v-img :src="profileImage" class="pa-2"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              v-html="user.username"
              class="font-weight-black"
            ></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-menu offset-y tile content-class="elevation-1 mt-2">
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-menu-down</v-icon>
              </template>
              <v-list tile>
                <v-list-item
                  ripple
                  v-for="(item, index) in menus"
                  :key="index"
                  @click="selectionAction(item)"
                >
                  <v-list-item-icon>
                    <v-avatar color="primary" size="24">
                      <v-icon small dark v-text="item.icon"></v-icon>
                    </v-avatar>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
      </div>
    </v-app-bar>

    <v-main>
      <v-container
        style="background-color: transparent"
        class="ma-0 mt-5 pa-0 mx-2"
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
      <v-btn color="whitish" text to="/about" x-small> Made by Ospic </v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import { mapGetters } from "vuex";
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
      overlay: false,
      zIndex: 0,
      showback: false,
      menulist: 0,
      image: 0,

      titles: {
        title: "Ospic",
      },
      settings: [
        {
          title: "label.menu.patients",
          icon: "mdi-account-group",
          to: "/patients",
          permissions:
            "ALL_FUNCTIONS, CREATE_PATIENT, UPDATE_PATIENT, DELETE_PATIENT, DELETE_PATIENT",
        },
        {
          title: "label.menu.inventoryandstock",
          icon: "mdi-rhombus-outline",
          permissions: "ALL_FUNCTIONS",
          to: "/inventory",
        },
        {
          title: "label.menu.medicalservices",
          icon: "mdi-square-rounded",
          to: "/services",
          permissions: "ALL_FUNCTIONS",
        },
        {
          title: "label.menu.organization",
          icon: "mdi-tooltip",
          to: "/staffs",
          permissions: "ALL_FUNCTIONS",
        },
        {
          title: "label.menu.finance",
          icon: "mdi-wallet-plus",
          to: "/finance",
          permissions:
            "ALL_FUNCTIONS, CREATE_BILL, READ_BILL,UPDATE_BILL,DELETE_BILL",
        },
        {
          title: "label.menu.calendar",
          icon: "mdi-calendar-month",
          to: "/calendar",

          permissions: "ALL_FUNCTIONS",
        },
        {
          title: "label.menu.reports",
          icon: "mdi-chart-box",
          to: "/reports",

          permissions: "ALL_FUNCTIONS",
        },
        {
          title: "label.menu.settings",
          icon: "mdi-cog",
          to: "/settings",
          permissions: "ALL_FUNCTIONS",
        },
      ],
      actions: [
        // { title: "View profile", icon: "mdi-account-circle" },
        { title: "Settings", icon: "mdi-cog" },
        { title: "Help", icon: "mdi-help" },
        { title: "Logout", icon: "mdi-logout-variant" },
      ],
      select: { locale: "English", lang: "en" },
      locales: [
        {
          locale: "English",
          lang: "en",
        },
        {
          locale: "Kiswahili",
          lang: "sw",
        },
        {
          locale: "French",
          lang: "fr",
        },
        {
          locale: "Arab",
          lang: "ar",
        },
      ],
      miniVariant: false,
      right: true,
      shaped: true,
      collapseOnScroll: true,
      rightDrawer: false,
      year: new Date().getFullYear(),
      userdata: {
        username: "Elirehema Paul",
      },
      menus: [
        { title: "View profile", icon: "mdi-account", value: 1 },
        { title: "Logout", icon: "mdi-power", value: 2 },
      ],
    };
  },
  created() {
    this.image = this.image++;
  },
  mounted: function () {
    this.$nextTick(function () {
      window.setInterval(() => {
        console.log("Notifications");
        this.$store.dispatch("_getnewnotifications");
      }, 20000);
    });
  },

  methods: {
    selectionAction: function (i) {
      switch (i.value) {
        case 1:
          this.navigateToHere("me");
          break;

        case 2:
          this.logoutsession();
          break;
      }
    },
    toggledrawer: function () {
      this.drawer = !this.drawer;
    },
    logoutsession: function () {
      this.$store.dispatch("_clear_local_storage_and_sign_out");
      this.drawer = !this.drawer;
    },
    changemode: function () {
      this.dark = !this.dark;
      this.$vuetify.theme.dark = this.dark;
    },
    navigateBack: function () {
      this.settings = this.defaultmenu;
      this.showback = false;
    },
    navigateToHere(id) {
      console.log(id);
      this.$router.push(id);
      if (id == "/") {
        this.settings = this.settings;
        this.showback = true;
      }
      if (id == "/patients") {
        this.settings = this.menuoptions.patients;
        this.showback = true;
      }
      if (id == "/inventory") {
        this.settings = this.menuoptions.inventory;
        this.showback = true;
      }
      if (id == "/services") {
        this.settings = this.menuoptions.services;
        this.showback = true;
      }
      if (id == "/finance") {
        this.settings = this.menuoptions.finance;
        this.showback = true;
      }
      if (id == "/staffs") {
        this.settings = this.menuoptions.organization;
        this.showback = true;
      }
      if (id == "/calendar") {
        this.settings = this.menuoptions.calendar;
        this.showback = true;
      }
      if (id == "/reports") {
        this.settings = this.menuoptions.reports;
        this.showback = true;
      }
      if (id == "/settings") {
        this.settings = this.menuoptions.settings;
        this.showback = true;
      }
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

    syncro: async function () {
      const vm = this;
      vm.sync = !vm.sync;
      await Promise.all([
        vm.$store.dispatch("retrievepatients"),
        vm.$store.dispatch("retrievephysicians"),
      ]).then(function () {
        console.log("Loading complete...");
      });
      setTimeout(() => {
        vm.sync = !vm.sync;
      }, 2000);
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },

  computed: {
    ...mapGetters({
      notificationnumber: "notificationsize",
      notifications: "newnotifications",
    }),
    user() {
      return this.$store.getters.profile;
    },
    profileImage() {
      return this.$api.defaults.baseURL + "auth/" + this.user.id + "/images";
    },
  },
};
</script>

