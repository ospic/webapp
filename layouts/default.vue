<template>
  <v-app class="app">
    <!--NAVIGATION DRAWER-->
    <v-navigation-drawer class="primary" elevation="0" v-model="drawer" width="180" app>
      <v-toolbar color="primary" elevation="0">
        <v-spacer></v-spacer>
        <v-toolbar-items></v-toolbar-items>
      </v-toolbar>

      <v-list nav dense class="mt-12 pa-0">
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in items"
            :key="`${i}-${item.route}`"
            v-on:click="nativateToHere(item.route)"
          >
            <v-list-item-icon>
              <v-icon color="default" v-text="item.icon"></v-icon>
            </v-list-item-icon>&nbsp;&nbsp;
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold default--text" v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
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
    <v-app-bar elevation="0" :clipped-left="clipped" color="primary" fixed app dark>
      <v-toolbar-title>
        <v-avatar color="primary lighten-1" size="36">
          <span class="white--text font-weight-bold overline" @click.stop="drawer = !drawer">
            <v-icon small color="white">mdi-dialpad</v-icon>
          </span>
        </v-avatar>
        <span
          class="hidden-sm-and-down font-weight-bold default--text"
        >Welcome, {{ userdata.username }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <span class="default--text font-weight-bold hidden-sm-and-down">{{todayDate}}</span>
      <v-tooltip bottom color="primary" open-on-hover open-delay="500">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.stop="syncro()">
            <v-progress-circular v-if="sync" v-on="on" size="20" indeterminate color="white"></v-progress-circular>
            <v-icon v-else color="default">mdi-sync</v-icon>
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
          <v-btn icon v-on="on">
            <v-icon color="default">mdi-cog</v-icon>
          </v-btn>
        </template>
        <span>Settings Configuration</span>
      </v-tooltip>
      <v-tooltip bottom color="primary" open-on-hover open-delay="500">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="default" @click="logoutsession">mdi-logout-variant</v-icon>
          </v-btn>
        </template>
        <span>Click to logout</span>
      </v-tooltip>
    </v-app-bar>

    <v-main>
      <nuxt />
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
    "disaggregations-component": DisaggregationsComponent
  },
  data() {
    return {
      ChapterDetails: ChapterDetails,
      FooterData: FooterData,
      clipped: false,
      drawer: false,
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
        { title: "Disaggregations", icon: "mdi-eye" }
      ],
      titles: {
        title: "National Bureau of Statistics"
      },

      items: [
        {
          text: "Dashboard",
          icon: "mdi-view-dashboard",
          route: "dashboard",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "Home",
          icon: "mdi-home-variant",
          route: "home",
          subtitle: "Lorem ipsum dolor sit de amet.."
        },
        {
          text: "Documents",
          icon: "mdi-file",
          route: "home",
          subtitle: "Lorem ipsum dolor sit de amet ..."
        },
        {
          text: "Help",
          icon: "mdi-help-circle",
          route: "home",
          subtitle: "Lorem ipsum dolor sit de amet ..."
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
      userdata:{
        username: 'Elirehema Paul'
      }
    };
  },

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
</style>