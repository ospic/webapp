 <template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="11"></v-col>
      <v-col cols="6" md="1">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn class="mx-2" fab dark v-on="on" color="green lighten-2">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add New Privilege</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Privilege ID*"
                      type="number"
                      hint="Privilege ID"
                      persistent-hint
                      single-line
                      required
                      v-model="privilage_id"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Privilege *"
                      hint="Privilege *"
                      type="text"
                      persistent-hint
                      required
                      single-line
                      v-model="privilage"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green lighten-1" text @click="dialog = false">Close</v-btn>
              <v-btn color="green lighten-1 pa-1" small @click="save()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="datalist" :items-per-page="5" class="elevation-1"></v-data-table>
  </v-container>
</template>
<script lang="js">
export default {
  data() {
    return {
    headers: [
                  {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                  },
                  { text: 'Privilege', value: 'privilage_id' },
                  { text: 'Privilege ID', value: 'privilage' },

                  { text: 'Updated At', value: 'createdAt' },
                  { text: 'Created At', value: 'updatedAt' },
                ],
                 dialog: false,
                privilage: null,
                privilage_id: null,
    };
  },
  methods:{
    save: function(){
      const data ={privilage: this.privilage, privilage_id: this.privilage_id};
     
      this.$store.dispatch('postprivilegevalue', data);
      this.dialog = false;
    }

  },
   created: function () {
    let vm = this;

  },
   computed: {
    datalist() {
      return this.$store.getters.privilegesdata;
    }
   }

};
</script>
