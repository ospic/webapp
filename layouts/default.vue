<template>
  <v-app class="app" v-bind:style="{ background: $vuetify.theme.dark ?  '#01242F' : '#055273' }">
    <!--NAVIGATION DRAWER-->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="$vuetify.breakpoint.mdAndDown"
      :expand-on-hover="$vuetify.breakpoint.mdAndDown"
      overlay-color="primary"
      color="primary"
      clipped
     
      fixed
      app
      width="180"
    >
      <v-list nav dense subheader tile class="mt-0 pa-0">
        <v-divider light></v-divider>
        <template v-for="(item, i) in items">
          <v-list-item
            class="ma-0"
            dense
            :key="`${i}-${item.route}`"
            v-on:click="nativateToHere(item.route)"
          >
            <v-list-item-icon class="mr-0">
              <v-icon color="default" v-text="item.icon" small></v-icon>
            </v-list-item-icon>
            <v-list-item-content class="ma-0 pa-0">
              <v-list-item-title class="font-weight-normal default--text" v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider light :key="i" :inset="item.inset"></v-divider>
        </template>
      </v-list>
      <template v-slot:append>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-subtitle class="subtitle white--text font-weight-bold">Light/Dark</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-switch :value="true" @change="toggle($event !== null)"></v-switch>
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <v-app-bar flat clipped-left fixed app dense short color="primary">
      <v-toolbar-side-icon @click="toggledrawer">
        <img width="30%" class="mt-1" src="../assets/images/logo.png" alt="Header Image" />
      </v-toolbar-side-icon>

      <v-spacer></v-spacer>
      <v-tooltip bottom color="primary" open-on-hover open-delay="500">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="syncro()" x-small>
            <v-progress-circular v-if="sync" v-on="on" size="20" indeterminate color="white"></v-progress-circular>
            <v-icon v-else small >mdi-sync</v-icon>
          </v-btn>
        </template>

        <span v-if="sync" color="white">Sync ....</span>
        <span v-else color="white">Sync</span>
      </v-tooltip>

      <v-tooltip
        bottom
        color="primary"
        v-if="$vuetify.breakpoint.smAndUp"
        open-on-hover
        open-delay="500"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" x-small>
            <v-icon small>mdi-cog</v-icon>
          </v-btn>
        </template>
        <span>Settings Configuration</span>
      </v-tooltip>
      <v-tooltip bottom color="primary" open-on-hover open-delay="500">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" x-small>
            <v-icon small @click="logoutsession">mdi-logout-variant</v-icon>
          </v-btn>
        </template>
        <span>Click to logout</span>
      </v-tooltip>
    </v-app-bar>

    <v-main >
      <v-container   fluid class="pa-5">
      <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ChapterDetails from "@/assets/data/chapterDetails.json";
import FooterData from "@/assets/data/footer.json";
import FooterComponent from "~/components/footer/FooterComponent.vue";
import IndicatorsComponent from "~/components/indicators.component.vue";
import NewsComponent from "~/components/news.component.vue";
import SectorsComponent from "~/components/sectors.component.vue";
import IndicatorSourceComponent from "~/components/indicator.sources.component.vue";
import CurrentReleasesComponent from "~/components/current.releases.component.vue";
import DisaggregationsComponent from "~/components/disaggregation.component.vue";

export default {
  async fetch({ store, params }) {
    // await this.$store.dispatch("getProfile");
  },
  components: {
    FooterComponent,
    "news-component": NewsComponent,
    "indicators-component": IndicatorsComponent,
    "sectors-component": SectorsComponent,
    "indicatorsource-component": IndicatorSourceComponent,
    "currentrelease-component": CurrentReleasesComponent,
    "disaggregations-component": DisaggregationsComponent,
  },
  data() {
    return {
      ChapterDetails: ChapterDetails,
      FooterData: FooterData,
      clipped: false,
      drawer: true,
      fixed: false,
      picture: true,
      dark: false,
      sync: false,
      tabs: [
        { title: "News", icon: "news-component" },
        { title: "Indicators", icon: "mdi-eye" },
        { title: "Sectors", icon: "mdi-eye" },
        { title: "Indicator Source", icon: "mdi-eye" },
        { title: "Current Release", icon: "mdi-eye" },
        { title: "Disaggregations", icon: "mdi-eye" },
      ],
      titles: {
        title: "Ospic",
      },

      items: [
        {
          text: "Dashboard",
          icon: "mdi-hospital-building",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet..",
        },
        {
          text: "Patient Registration",
          icon: "mdi-account-plus-outline",
          route: "register",

          subtitle: "Lorem ipsum dolor sit de amet..",
        },
        {
          text: "Appointment & Scheduling",
          icon: "mdi-file-cabinet",
          route: "appointments",
          subtitle: "Lorem ipsum dolor sit de amet ...",
        },
        {
          text: "OPD Center",
          icon: "mdi-zodiac-cancer",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet..",
        },
        {
          text: "IPD Center",
          icon: "mdi-bed-outline",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet..",
        },
        {
          text: "Laboratory",
          icon: "mdi-beaker-question-outline",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet..",
        },
        {
          text: "Pharmacy & Medicine",
          icon: "mdi-pharmacy",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet..",
        },
        {
          text: "Radiology",
          icon: "mdi-radioactive",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet..",
        },

        {
          text: "Cash/billing Center",
          icon: "mdi-credit-card-wireless",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet..",
        },
        {
          text: "Print Receipt/Bills/Reports",
          icon: "mdi-printer",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet..",
        },
        {
          text: "Financial Account",
          icon: "mdi-currency-usd-circle",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet..",
        },
        {
          text: "Payroll Management",
          icon: "mdi-currency-usd-circle-outline",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet..",
        },
        {
          text: "Inventory & Stock",
          icon: "mdi-hospital",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet..",
        },

        {
          text: "Nurse Station",
          icon: "mdi-zodiac-cancer",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet..",
        },
        {
          text: "Administration & Monitooring",
          icon: "mdi-account-settings",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet..",
        },
        {
          text: "MIS Reports",
          icon: "mdi-folder-text-outline",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet..",
        },
        {
          text: "Security Control",
          icon: "mdi-lock",
          route: "",
          subtitle: "Lorem ipsum dolor sit de amet..",
        },
      ],
      actions: [
        // { title: "View profile", icon: "mdi-account-circle" },
        { title: "Settings", icon: "mdi-cog" },
        { title: "Help", icon: "mdi-help" },
        { title: "Logout", icon: "mdi-logout-variant" },
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
    };
  },

  methods: {
    selectedItemAction: function (item) {
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
    toggledrawer: function(){
      this.drawer = !this.drawer;
    },
    logoutsession: function () {
     // this.$store.dispatch("logout");
     this.drawer = !this.drawer;
    },
    changemode: function () {
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
  },
  beforeMount: function () {},
  computed: {},
};
</script>
<style>
#app {
  font-family: "Lato", sans-serif;
}

.drawer .item:hover {
  color: #01242f;
  margin-left: 2px;
  background-color: white;
  border-radius: 20px 0px 0px 20px;
}
.drawer .item:active {
  color: #01242f;
  margin-left: 2px;
  background-color: white;
  border-radius: 20px 0px 0px 20px;
}
.v-progress-circular {
  margin: 1rem;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(194, 5, 5); 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
}
</style>