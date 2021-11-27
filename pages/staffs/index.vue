<template>
  <div>
    <div class="breadcrumb">
      <router-link to="/">{{ $t("label.breadcrumb.dashboard") }}</router-link>
      <router-link to="/staffs" class="active">{{
        $t("label.breadcrumb.staffs")
      }}</router-link>
    </div>
    <v-card>
      <v-toolbar flat dark class="primary">
        <v-row no-gutters>
          <v-col cols="12" sm="12" md="3">
            <v-card-title>
              <h5 v-if="title != null">
                <v-icon color="blue" left>mdi-circle</v-icon>&nbsp;{{ title }}
                Department Staff's
              </h5>
              <h5 v-else>{{ $t("label.titles.staffs") }}</h5></v-card-title
            >
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="12" md="3">
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Enter search text ..."
              rounded
              dense
              outlined
              single-line
              hide-details
              class="mt-3"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-toolbar>
      <v-card-text class="pa-0">
        <v-tabs
          v-model="tab"
          background-color="primary"
          slider-color="blue"
          dark
          show-arrows="true"
        >
          <v-tab
            v-for="department in departments"
            :key="department.id"
            left
            class="ml-0 pl-0"
            style="text-align: left"
            @click="fetchDepartmentStaffs(department.id, department.name)"
            reverse-trasition="true"
          >
            <v-icon left color="blue"> mdi-circle-medium </v-icon>
            {{ department.name }}
          </v-tab>
          <v-tab-item v-for="department in departments" :key="department.id">
            <div>
              <h5 v-if="title != null && !isMdAndUp" class="primary--text">
                {{ title }} Department Staff's
              </h5>
              <v-progress-linear
                v-if="updating"
                indeterminate
                color="cyan"
                class="mb-1"
              ></v-progress-linear>

              <v-data-table
                dense
                v-else
                :headers="headers"
                :items="departmentsstaffs"
                :search="search"
                width="100%"
                @click:row="handleClick"
              >
                <template v-slot:[`item.image`]="{ item }">
                  <v-avatar>
                    <img
                      :src="item.imageUrl === null ? thumbnail : item.imageUrl"
                      alt="Staff profile image"
                    />
                  </v-avatar>
                </template>
                <template v-slot:[`item.fullName`]="{ item }">
                  {{
                    item.fullName == null ? item.user.username : item.fullName
                  }}
                </template>
                <template v-slot:[`item.department`]="{ item }">
                  {{ item.department.name }}
                </template>
                <template v-slot:[`item.email`]="{ item }">
                  {{ item.email === null ? item.user.email : item.email }}
                </template>
                <template v-slot:[`item.isActive`]="{ item }">
                  <v-tooltip right v-if="item.isActive" color="primary">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        small
                        color="red lighten-2"
                        >mdi-check</v-icon
                      >
                    </template>
                    <span>Active</span>
                  </v-tooltip>
                  <div v-else></div>
                </template>
                <template v-slot:[`item.isAvailable`]="{ item }">
                  <v-tooltip right v-if="item.isAvailable" color="primary">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        v-on="on"
                        small
                        color="red lighten-2"
                        >mdi-check</v-icon
                      >
                    </template>
                    <span>Available</span>
                  </v-tooltip>
                  <div v-else></div>
                </template>
                <template v-slot:[`item.role`]="{ item }">
                  <v-chip
                    small
                    dense
                    class="primary"
                    v-for="role in item.user.roles"
                    :key="role.id"
                  >
                    {{ role.name.toLowerCase() }}
                  </v-chip>
                </template>
              </v-data-table>
            </div>
          </v-tab-item>
        </v-tabs>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import StaffCard from "@/components/staff/staff_card";
import { mapGetters } from "vuex";
export default {
  components: {
    StaffCard,
  },
  data: () => ({
    search: "",
    updating: false,
    headers: [
      { text: "Image", value: "image", class: "primary" },
      {
        text: "User/name",
        value: "fullName",
        class: "primary",
        sortable: false,
      },
      { text: "Department", value: "department", class: "primary" },
      { text: "Email", value: "email", class: "primary" },
      { text: "Phone", value: "contacts", class: "primary" },
      { text: "Role", value: "role", class: "primary" },
      { text: "Active ?", value: "isActive", class: "primary", sortable: true },
      {
        text: "Available ?",
        value: "isAvailable",
        class: "primary",
        sortable: true,
      },
    ],
    items: [
      { title: "Edit", icon: "lead-pencil", color: "blue" },
      { title: "Delete", icon: "delete", color: "red" },
    ],
    departmentsstaffs: [],
    title: null,
  }),
  methods: {
    async fetchDepartmentStaffs(id, title) {
      this.title = title;
      this.updating = true;
      await this.$api
        .$get(`staffs/dep/${id}`)
        .then((response) => {
          if (response != null) {
            this.departmentsstaffs = response;
            this.updating = false;
          }
        })
        .catch((error) => {
          this.updating = false;
          console.log(error);
        });
    },
    handleClick(item) {
      this.$router.push("staffs/" + item.id);
    },
  },
  created() {
    this.fetchDepartmentStaffs(1);
  },
  beforeCreate() {
    this.$store.dispatch("retrieve_departments");
  },
  computed: {
    ...mapGetters({
      staffs: "staffs",
      departments: "departments",
    }),
  },
};
</script>
