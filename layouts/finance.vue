<template>
  <v-app
    class="app"
    style="
    background: rgba(0,0,0,0);"
  >

    <v-main>
      <v-container
        style="background-color: transparent;"
        class="pa-0 px-3  ma-0 mt-5"
        fluid
      >
     
        <nuxt />
      </v-container>
    </v-main>

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
          text: "label.menu.dashboard",
          icon: "mdi-view-grid",
          route: "/patients",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
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
