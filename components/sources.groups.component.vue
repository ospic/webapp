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
      <v-data-table :headers="headers" :items="datalist" :items-per-page="5" :search="search" dense>
        <template v-slot:top>
          <v-toolbar flat color="transparent">
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <div class="my-2">
                  <v-btn color="info" fab x-small dark v-on="on">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </template>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{formTitle}}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            label="Source Name *"
                            hint="Source Name *"
                            type="text"
                            persistent-hint
                            required
                            single-line
                            v-model="sourcename"
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
              </v-form>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" color="info">mdi-lead-pencil</v-icon>
          <v-icon
            small
            @click="delete_selected_item('deletedisourcegroup',item)"
            color="warning"
          >mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script lang="js">
import mixin from "@/plugins/mixins.js";
export default {
  mixins: [mixin],
  data() {
    return {
      titlex: 'Source Groups',
      search: '',
      editedIndex: -1,
      valid: true,
    headers: [

                  { text: 'Source ID', value: 'sourceid', align: 'start',
                    sortable: false, },
                  { text: 'Source Name', value: 'sourcename' },
                  { text: 'Updated At', value: 'createdAt' },
                  { text: 'Created At', value: 'updatedAt' },
                  { text: 'Actions', value: 'actions', sortable: false },
                ],
                dialog: false,
                sourcename: null
    };
  },
  methods:{
    save: function(){
      const data =  {sourceid: this.sourceid, sourcename: this.sourcename}
       if (this.editedIndex > -1) {
          Object.assign(this.datalist[this.editedIndex], this.editedItem)
          this.$store.dispatch('editdisourcegroup', data)
      }else {
      this.$store.dispatch('postsourcegroupvalue',data);
      }
      this.close();
    },

      editItem: function (item) {
        this.editedIndex = this.datalist.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.sourceid = item.sourceid;
        this.sourcename = item.sourcename;
        this.dialog = true
     },
    
    close: function () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.$refs.form.reset()
        }, 300)
      },

  },
   watch: {
      dialog (val) {
        val || this.close()
      },
    },
   computed: {
    datalist() {
      return this.$store.getters.sourcegroupsdata;
    },
    formTitle () {
        return this.editedIndex === -1 ? 'New source group' : 'Edit source group'
      },
   }

};
</script>
<style >
.greencontainer {
  background-color: #81c784;
}
</style>

