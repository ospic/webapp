<template>
  <div>
    <div class="breadcrumb ">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/settings" class="active">{{
        $t("label.breadcrumb.settingandconfiguration")
      }}</router-link>
    </div>
    <v-container class="fill-height" fluid>
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="3" class="pa-2">
          <v-list nav dense subheader tile>
            <template v-for="(setting, ind) in settings">
              <v-list-group
                :value="true"
                :prepend-icon="setting.icon"
                :key="ind"
              >
                <template v-slot:activator>
                  <v-list-item-title>{{ $t(setting.title) }}</v-list-item-title>
                </template>

                <template v-for="(menu, index) in setting.menus">
                  <v-list-group
                    :value="true"
                    no-action
                    sub-group
                    :key="menu.title"
                  >
                    <template v-slot:activator>
                      <v-list-item-content>
                        <v-list-item-title>{{
                          $t(menu.title)
                        }}</v-list-item-title>
                      </v-list-item-content>
                    </template>
                    <template v-for="(sub, i) in menu.submenus">
                      <v-list-item :key="sub.to" :to="sub.to">
                        <v-list-item-content>
                          <v-list-item-title>
                            <v-icon left v-html="sub.icon"></v-icon>
                            {{ $t(sub.title) }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider class="ml-12" :key="i"></v-divider>
                    </template>
                  </v-list-group>
                </template>
              </v-list-group>
            </template>
          </v-list>
        </v-col>
        <v-col cols="12" sm="12" md="9" class="ma-0 pa-2">
          <nuxt-child class="ma-0 pa-0" :key="this.$router.currentRoute.name" />
        </v-col>
      </v-row>
    </v-container>
  </div>
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
          title: "label.titles.roleandpermissions",
          icon: "mdi-shield-lock-outline",
          menus: [
            {
              title: "label.titles.administrations",
              submenus: [
                {
                  title: "label.titles.usersmanagement",
                  to: "/settings",
                  icon: "mdi-account-settings"
                },
                {
                  title: "label.titles.selfusersmanagement",
                  to: "/settings/selfservices",
                  icon: "mdi-tooltip-account"
                },
                {
                  title: "label.menu.rolesandprivileges",
                  icon: "mdi-account-cog",
                  to: "/settings/roles"
                }
              ]
            }
          ]
        },
        {
          title: "label.titles.system",
          icon: "mdi-cog",
          menus: [
            {
              title: "label.titles.configurations",
              submenus: [
                {
                  title: "label.titles.smsconfigurations",
                  to: "/settings/sms",
                  icon: "mdi-message-cog-outline"
                },
                {
                  title: "label.titles.emailconfigurations",
                  to: "/settings/config/email",
                  icon: "mdi-folder-cog-outline"
                },
                {
                  title: "label.titles.themecolor",
                  to: "/settings/colors",
                  icon: "mdi-invert-colors"
                },
                {
                  title: "label.titles.globalconfigurations",
                  to: "/settings/configurations",
                  icon: "mdi-cog-transfer"
                }
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
.routeLink {
  text-decoration: none;
}
</style>
