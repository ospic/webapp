<template>
  <div>
    <v-progress-circular
      size="52"
      color="indigo"
      indeterminate
      v-if="!configurations"
    ></v-progress-circular>
    <v-data-table
      v-else
      dense
      :headers="headers"
      :items="configurations"
      sort-by="id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="primary" dark>
          <v-toolbar-title>{{
            $t("label.titles.globalconfigurations")
          }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px" color="red">
            <v-card>
              <v-toolbar-title flat class="primary">
                <v-card-title class="subhead-1 pa-4 white--text">
                  {{ $t("label.dialogs.editconfigurationvalue") }}</v-card-title
                >
              </v-toolbar-title>
              <v-card-text class="mt-2">
                <v-text-field
                  v-model="config.configurationValue"
                  type="number"
                  label="Configuration value"
                  min="0"
                  filled
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="dialog = !dialog">{{
                  $t("label.button.decline")
                }}</v-btn>
                <v-btn color="warning" @click="edit">{{
                  $t("label.button.btnsave")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.active`]="{ item }">
        <v-icon class="font-weight-black" color="primary" v-if="item.active">
          mdi-check
        </v-icon>
        <v-icon class="font-weight-black" small color="primary" v-else>
          mdi-close
        </v-icon>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        &nbsp;
        <v-btn
          @click="updatestatus(item)"
          small
          elevation="0"
          :color="item.active ? 'red darken-2' : 'primary'"
          class="white--text"
        >
          <v-icon v-if="item.active" small left> mdi-close</v-icon
          ><v-icon v-else small left>mdi-check</v-icon>
          {{
            item.active ? $t("label.button.close") : $t("label.button.activate")
          }}
        </v-btn>
      </template>
      <template v-slot:no-data>
        <p>No Data available</p>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    dialog: false,
    role: 0,
    editedIndex: -1,
    departmentId: null,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
        class: "primary",
      },
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
        class: "primary",
      },
      { text: "Value", value: "value", class: "primary" },
      { text: "Active", value: "active", class: "primary" },
      { text: "Actions", value: "actions", class: "primary", sortable: false },
    ],
    editedItem: {
      id: "",
      name: "",
      value: false,
      email: "",
      code: null,
    },
    defaultItem: {
      id: "",
      name: "",
      value: false,
      email: "",
      code: null,
    },
    config: {
      configurationValue: 0,
      configurationId: 0,
    },
    valid: true,

    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length > 5) || "Name must be less than 5 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  created() {
    this.$store.dispatch("get_configurations");
  },
  methods: {
    editItem(it) {
      this.dialog = true;
      this.config.configurationId = it.id;
      this.config.configurationValue = parseInt(it.value);
    },
    close() {
      this.dialog = false;
    },
    edit() {
      this.config.configurationValue = parseInt(this.config.configurationValue);
      this.$store.dispatch("update_configuration", this.config);
      this.close();
    },
    updatestatus(it) {
      var payload = {
        action: it.active ? "deactivate" : "activate",
        id: it.id,
      };
      this.$store.dispatch("update_configuration_status", payload).then(() => {
        setTimeout(
          () => this.$store.dispatch("get_configurations"),
          this.delay_seconds
        );
      });
    },
  },
  computed: {
    ...mapGetters({
      configurations: "configurations",
    }),
  },
  watch: {
    dialog(val) {
      val || this.close();
      setTimeout(
        () => this.$store.dispatch("get_configurations"),
        this.delay_seconds
      );
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
};
</script>
