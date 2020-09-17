 <template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        {{titlex}}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="datalist"
        :items-per-page="5"
        :search="search"
        dense
        class="elevation-1"
      ></v-data-table>
    </v-card>
  </v-container>
</template>
<script lang="js">
export default {
  data() {
    return {
      search:'',
      titlex: 'Login Histories',
      editedIndex: -1,
    headers: [
                  {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'loginid',
                  },
                  { text: 'Username', value: 'username' },
                  { text: 'Email ', value: 'email' },
                  { text: 'Last Login', value: 'lastlogin' },
                  { text: 'Last Logout', value: 'lastlogout' },

                ],
    };
  },
   created: function () {
    let vm = this;
    vm.$store.dispatch("getAllLogins");
   
  },
   computed: {
    datalist() {
      return this.$store.getters.loginsdata;
    }
   },

};
</script>
