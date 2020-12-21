<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <!-- <v-col cols="12" sm="3" class="pa-2">
        <v-list nav dense subheader tile>
          <template v-for="(setting, ind) in settings">
            <v-list-group
              :value="true"
              color="green"
              no-action
              :prepend-icon="setting.icon"
              :key="ind"
            >
              <template v-slot:activator>
                <v-list-item-title class="black--text">{{
                  $t(setting.title)
                }}</v-list-item-title>
              </template>

              <template v-for="(menu, index) in setting.menus">
                <v-list-item :key="index" :to="menu.to">
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-icon small color="green" v-html="menu.icon"></v-icon>
                      &nbsp;&nbsp;{{ $t(menu.title) }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-group>
          </template>
        </v-list>
      </v-col>-->
      <v-col cols="12" sm="12" class="pa-2">
        <nuxt-child :key="this.$router.currentRoute.name" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      picture: true,
      dark: false,
      sync: false,
      pagetitle: "Administrator Dashboard",

      admins: [
        [
          "label.titles.usersmanagement",
          "mdi-account-multiples-outline",
          "/settings/users"
        ],
        ["label.titles.settings", "mdi-cog-outline", "/settings/admin"]
      ],
      cruds: [
        ["Create", "mdi-plus-outline"],
        ["Read", "mdi-file-outline"],
        ["Update", "mdi-update"],
        ["Delete", "mdi-delete"]
      ],
      settings: [
        {
          title: "label.titles.medicalstock",
          icon: "mdi-store",
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
            }
          ]
        },
        {
          title: "label.titles.wardandbeds",
          icon: "mdi-home-group",
          menus: [
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
        }
      ]
    };
  },
  head() {
    return {
      title: "Home Page"
    };
  },
  beforeMount: function() {
    //const vm = this;
  },
  methods: {
    toggledrawer: function() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
<style>
#app {
  font-family: "Lato", sans-serif;
}
.routeLink {
  text-decoration: none;
}
</style>
