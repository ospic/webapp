<template>
  <v-app
    dark
    class="app"
    v-bind:style="{ background: $vuetify.theme.dark ? '#FAFAFA' : '#FAFAFA' }"
  >
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="$vuetify.breakpoint.mdAndDown"
      :expand-on-hover="$vuetify.breakpoint.mdAndDown"
      overlay-color="primary"
      color="white"
      clipped
      fixed
      app
      width="270"
    >
      <v-list nav dense subheader tile class="mt-0 pa-0">
        <v-list-item class="ma-0" dense to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t("label.titles.home") }}</v-list-item-title>
        </v-list-item>
        <v-divider light></v-divider>

        <template v-for="(setting, ind) in settings">
          <v-list-group :value="true" :prepend-icon="setting.icon" :key="ind">
            <template v-slot:activator>
              <v-list-item-title>{{ setting.title }}</v-list-item-title>
            </template>

            <template v-for="(menu, index) in setting.menus">
              <v-divider
                class="ml-6"
                dark
                :key="index + setting.menus.length"
              ></v-divider>
              <v-list-group :value="true" no-action sub-group :key="index">
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title>{{ menu.title }}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="(sub, i) in menu.submenus"
                  :key="i"
                  link
                  :to="sub.to"
                  class="ma-0"
                  dense
                >
                  <v-list-item-title>{{ sub.title }}</v-list-item-title>

                  <v-list-item-icon>
                    <v-icon v-text="sub.icon"></v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-group>
            </template>
          </v-list-group>
          <v-divider dark :key="ind + settings.length"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      flat
      elevation="1"
      fixed
      app
      dense
      short
      color="primary "
    >
      <v-app-bar-nav-icon dense>
        <img
          @click="toggledrawer"
          class="pa-0 ma-0"
          src="@/assets/images/icon.png"
          alt=""
          height="40px"
          max-height="40px"
          max-width="40px"
          contain
        />
      </v-app-bar-nav-icon>
      <v-toolbar-title
        v-if="$vuetify.breakpoint.mdAndUp"
        class="title font-weight-black green--text"
      >
        {{ $t("label.heading.applicationsettings") }}&nbsp;<v-icon
          color="green lighten-1"
          >mdi-cog-outline</v-icon
        >
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn fab elevation="1" x-small class="mr-2 primary lighten-2" icon>
        <NuxtLink to="/">
          <v-icon color="white">mdi-home-outline</v-icon>
        </NuxtLink>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container style="background-color: #efefef;" class="pa-2 ma-0" fluid>
        <nuxt-child :key="this.$router.currentRoute.name" />
      </v-container>
    </v-main>
  </v-app>
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
      locales: ["English", "Kiswahili"],
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
          title: "Roles And Permissions",
          icon: "mdi-shield-lock-outline",
          menus: [
            {
              title: "No Administrations",
              submenus: [
                {
                  title: "Users Managements",
                  to: "/settings/users",
                  icon: "mdi-account-settings"
                },
                {
                  title: "Administrator",
                  to: "/settings/admin",
                  icon: "mdi-account-cog-outline"
                }
              ]
            },
            {
              title: "Actions",
              submenus: [
                { title: "Create", icon: "mdi-plus-outline", to: "/" },
                { title: "Read", icon: "mdi-file-outline", to: "/" },
                { title: "Update", icon: "mdi-update", to: "/" },
                { title: "Delete", icon: "mdi-delete", to: "/" }
              ]
            }
          ]
        },
        {
          title: "Users Settings",
          icon: "mdi-account-outline",
          menus: [
            {
              title: "Administrations",
              submenus: [
                {
                  title: "Users Managements",
                  to: "/settings/users",
                  icon: "mdi-account-multiples-outline"
                },
                { title: "Settings", to: "/", icon: "mdi-cog-outline" }
              ]
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
</style>
