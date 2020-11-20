<template>
  <v-app
    class="app"
    v-bind:style="{ background: $vuetify.theme.dark ? '#d7f4fa' : '#d7f4fa' }"
  >
    <!--NAVIGATION DRAWER-->
    <v-navigation-drawer
      v-model="drawer"
      permanent
      :mini-variant.sync="mini"
      overlay-color="primary"
      color="#d7f4fa"
      app
      width="180"
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-list-item-avatar>
          <p class="title mt-0 pa-0 ma-0">{{ username }}</p>
          <v-spacer></v-spacer>
        </v-list-item>
      </v-list>
      <v-list nav dense subheader tile class="mt-0 pa-0">
        <v-divider light></v-divider>
        <template v-for="(item, i) in items">
          <v-list-item
            class="ma-0"
            dense
            :key="`${i}-${item.route}`"
            v-on:click="nativateToHere(item.route)"
          >
            <v-list-item-icon class="ml-1">
              <v-icon color="green" v-text="item.icon" small></v-icon>
            </v-list-item-icon>
            <v-list-item-content class="ma-0 pa-0">
              <v-list-item-title class="font-weight-normal">{{
                $t(item.text)
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider light :key="i" :inset="item.inset"></v-divider>
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
      color="#d7f4fa"
    >
      <v-toolbar-title
        v-if="$vuetify.breakpoint.mdAndUp"
        class="title font-weight-black indigo--text"
      >
        <v-btn x-small icon @click.stop="mini = !mini">
          <v-icon v-if="mini">mdi-arrow-right</v-icon>
          <v-icon v-else>mdi-arrow-left</v-icon> </v-btn
        >&nbsp;&nbsp;&nbsp; Welcome, {{ username }}
      </v-toolbar-title>

      <v-spacer class="hidden-xs-only"></v-spacer>
      <v-text-field
        rounded
        dense
        hide-details
        single-line
        placeholder="Search keyword..."
        background-color="#FFFFFF"
        class="shrink pa-0 ma-0 text--overline"
        height="30"
      ></v-text-field>
      &nbsp;&nbsp;
      <v-tooltip bottom color="primary" open-on-hover open-delay="500">
        <template v-slot:activator="{ on }">
          <v-btn
            fab
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

    <v-main>
      <v-container style="background-color: #d7f4fa;" class="pa-2 ma-0" fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer color="#d7f4fa">
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
          icon: "mdi-hospital-building",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.patientregistry",
          icon: "mdi-account-plus-outline",
          route: "patients",

          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.appointmentandschedule",
          icon: "mdi-file-cabinet",
          route: "appointments",
          subtitle: "Lorem ipsum dolor sit de amet ..."
        },
        {
          text: "label.menu.opdcenter",
          icon: "mdi-zodiac-cancer",
          route: "opd",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.ipdcenter",
          icon: "mdi-bed-outline",
          route: "ipd",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.laboratory",
          icon: "mdi-beaker-question-outline",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.pharmacyandmedicine",
          icon: "mdi-pharmacy",
          route: "pharmacy",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.radiology",
          icon: "mdi-radioactive",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },

        {
          text: "label.menu.cashandbillingcenter",
          icon: "mdi-credit-card-wireless",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.printreceiptbills",
          icon: "mdi-printer",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.financialaccount",
          icon: "mdi-currency-usd-circle",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.payrollmanagement",
          icon: "mdi-currency-usd-circle-outline",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.inventoryandstock",
          icon: "mdi-hospital",
          route: "inventory",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },

        {
          text: "label.menu.nursestations",
          icon: "mdi-zodiac-cancer",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "label.menu.misreport",
          icon: "mdi-folder-text-outline",
          route: "",
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
      this.$store.dispatch("clearlocal");
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
  mounted: function() {
    this.$nextTick(function() {
      window.setInterval(() => {
        this.syncro();
      }, 60000);
    });
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0);
      }
      this.value += 10;
    }, 2000);
  },
  beforeMount: function() {},
  computed: {
    username() {
      return localStorage.getItem("ospic.username");
    },
    email() {
      return localStorage.getItem("ospic.email");
    }
  }
};
</script>
<style></style>
