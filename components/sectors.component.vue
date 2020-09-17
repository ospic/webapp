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
        :items="sectors"
        :items-per-page="5"
        :search="search"
        dense
        class="elevation-1"
      >
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
                    <span class="headline">Add new Sector</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="sectorname"
                            label="Sector Name*"
                            hint="sector name"
                            persistent-hint
                            :counter="5"
                            :rules="nameRules"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="warning" @click="dialog = false">Cancel</v-btn>
                    <v-btn color="success" :disabled="!valid" @click="save()">Save</v-btn>
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
            @click="delete_selected_item('sectordelete',item)"
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
      dialog: false,
      sectorid: null,
      sectorname: null,
      search: '',
      valid: true,
      titlex: 'Sectors',
         nameRules: [
        v => !!v || 'Sector name  is required',
        v => (v && v.length > 5) || 'Sector Name must be less than 5 characters',
      ],
      editedIndex: -1,
         editedItem: {
         sectorname: '',
         sectorid: '',
         createdAt: '',
         updatedAt : ''},
      defaultItem:
      {sectorname: '',
         sectorid: '',
         createdAt: '',
         updatedAt: ''},
       headers: [

              { text: 'Sector ID', value: 'sectorid', align: 'start',
                sortable: false,},
              { text: 'Sector Name', value: 'sectorname' },
               { text: 'Updated On:', value:  'updatedAt' },
              { text: 'Actions', value: 'actions', sortable: false },
            ],

    };
  },
  methods:{

    save(){
       if (this.editedIndex > -1) {
          Object.assign(this.sectors[this.editedIndex], this.editedItem)

           this.$store.dispatch('sectoredit', {
        sectorname: this.sectorname,
        sectorid: this.sectorid
      })
        } else {
      this.$store.dispatch('postsector', {sectorname: this.sectorname})

        }
        this.close();
    },
     editItem (item) {
        this.editedIndex = this.sectors.indexOf(item)
        this.editedItem = Object.assign({}, item)

        this.sectorid = item.sectorid;
        this.sectorname = item.sectorname;
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
   created: function () {
    let vm = this;

  },
     watch: {
      dialog (val) {
        val || this.close()
      },
    },
   computed: {
    sectors() {
      return this.$store.getters.sectordata;
    },
    formTitle () {
        return this.editedIndex === -1 ? 'New Sector' : 'Edit Sector'
      },
   }

};
</script>
