<template>
  <v-row>
    <v-col cols="12" md="3">
      <v-list rounded>
        <v-list-group
          v-for="(listitem, index) in menuitems"
          :key="index"
          :value="true"
          :prepend-icon="listitem.icon"
        >
          <template v-slot:activator>
            <v-list-item-title class="text-caption">{{
              $t(listitem.title)
            }}</v-list-item-title>
          </template>

          <v-list-group
            v-for="menu in listitem.menus"
            :key="menu.title"
            :value="true"
            no-action
            sub-group
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title class="text-caption">{{
                  $t(menu.title)
                }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              dense
              v-for="(submenu, i) in menu.submenu"
              :key="i"
              link
              :to="submenu.to"
            >
              <v-list-item-icon>
                <v-icon v-text="submenu.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content class="text-caption">{{
                $t(submenu.title)
              }}</v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-col>
    <v-col cols="12" md="9">
      <nuxt-child :key="this.$router.currentRoute.name" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: "dashboard",
  data: () => ({
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
    menuitems: [
      {
        title: "label.titles.roleandpermissions",
        icon: "mdi-shield-lock-outline",
        menus: [
          {
            title: "label.titles.administrations",
            submenu: [
              {
                title: "label.titles.users",
                to: "/settings/users",
                icon: "mdi-account-group-outline"
              },
              {
                title: "label.titles.roles",
                to: "/settings/roles",
                icon: "mdi-lock-outline"
              }
            ]
          }
        ]
      },
      {
        title: "Actions and Users",
        icon: "mdi-cog",
        menus: [
          {
            title: "Users actions",
            submenu: [
              {
                title: "User  Actions",
                to: "/settings/users",
                icon: "mdi-cog"
              }
            ]
          }
        ]
      }
    ]
  })
};
</script>
<style scoped>
.nuxt-link-exact-active.nuxt-link-active li a {
  text-decoration: none !important;
}
</style>
