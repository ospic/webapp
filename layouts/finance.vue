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
      app
      expand-on-hover
      width="220"
      height="100%"
    >
      <v-list nav dense subheader tile class="mt-0 pa-0 py-1">
        <v-list-item dense class="px-2" to="/me">
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

        <v-divider></v-divider>
        <!--<v-list-item class="list-item ma-0" dense to="/finance/dashboard">
          <v-list-item-icon class="ml-1 mr-1">
            <v-icon color="primary" small>mdi-view-grid</v-icon>
          </v-list-item-icon>
          <v-list-item-title color="#8C93F5" class="font-weight-bold ">{{
            $t("label.menu.dashboard")
          }}</v-list-item-title>
        </v-list-item>-->

        <template v-for="(item, i) in items">
          <v-list-item
            class="list-item ma-0"
            dense
            :key="`${i}-${item.route}`"
            :to="item.route"
          >
            <v-list-item-icon class="ml-1 mr-1">
              <v-icon color="primary" v-text="item.icon" small></v-icon>
            </v-list-item-icon>
            <v-list-item-title color="#8C93F5" class="font-weight-bold ">{{
              $t(item.text)
            }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar hide-on-scroll dense fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="title font-weight-black primary--text">
        Finance
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom color="primary" open-on-hover open-delay="500">
        <template v-slot:activator="{ on }">
          <v-btn fab v-on="on" x-small elevation="1" class="mr-2 primary">
            <v-icon medium @click="logoutsession">mdi-power</v-icon>
          </v-btn>
        </template>
        <span>{{ $t("label.tooltip.clicktologout") }}</span>
      </v-tooltip>
      <v-btn
        fab
        x-small
        color="primary"
        class="pa-1 "
        elevation="1"
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
    <a
      class="github-fork-ribbon right-bottom fixed "
      href="https://github.com/ospic/webapp"
      target="_blank"
      rel="noopener noreferrer"
      data-ribbon="Fork me on GitHub"
      title="Fork me on GitHub"
      >Fork me on GitHub</a
    >
    <v-main>
      <v-container
        style="background-color: transparent;"
        class="pa-0 px-3  ma-0 mt-5"
        fluid
      >
        <v-alert v-if="!domain" dense color="green lighten-1" type="info">
          This application is no longer supported in this domain. It has being
          moved to
          <a style="color: blue" href="http://app.ospicx.com/"
            >app.ospicx.com</a
          >
        </v-alert>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer color="transparent">
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

      items: [
        {
          text: "label.menu.bills",
          icon: "mdi-finance",
          route: "/finance/bills",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.transactions",
          icon: "mdi-calendar-month",
          route: "/finance/transactions",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.financereports",
          icon: "mdi-clipboard-file",
          route: "/finance/reports",
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
      this.$router.push(id);
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
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },

  computed: {}
};
</script>
