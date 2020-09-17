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
        class="regular"
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
                    <span class="headline">{{formTitle}}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6">
                          <v-select
                            v-model="sourcegroup"
                            hint="Select Source Group *"
                            :items="sourcegroups"
                            item-text="sourcename"
                            item-value="sourcename"
                            label="Select source id"
                            @change="changeSourceGroup(`${sourcegroup.sourcename}`)"
                            required
                            persistent-hint
                            return-object
                            single-line
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="6">
                          <v-text-field
                            label="Short Name *"
                            hint="Short Name"
                            persistent-hint
                            single-line
                            required
                            type="text"
                            readonly
                            autocomplete="false"
                            v-model="shortname"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            label="Source Name *"
                            hint="Source Name *"
                            type="text"
                            persistent-hint
                            required
                            :rules="nameRules"
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
            @click="delete_selected_item('deleteindicatorsource', item)"
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
      titlex: 'Indicator Sources',
      search: '',
      editedIndex: -1,
      valid: true,
    headers: [

                  { text: 'Source ID', value: 'sourceid', align: 'start',
                    sortable: false, },
                  { text: 'Source Name', value: 'sourcename' },
                  //{ text: 'Short Name', value: 'shortname' },
                  {text: 'Source Group', value:'sourcegroup'},
                  { text: 'Updated At', value: 'createdAt' },
                  { text: 'Created At', value: 'updatedAt' },
                  { text: 'Actions', value: 'actions', sortable: false },
                ],
                  nameRules: [
        v => !!v || 'Sector name  is required',
        v => (v && v.length > 5) || 'Sector Name must be less than 5 characters',
      ],
                dialog: false,
                sourcegroup: null,
                sourceid: null,
                sourcename: null,
                shortname: null,
    };
  },
  methods:{
    save: function(){
      const data = {
        sourceid: this.sourceid,
        sourcegroup: this.sourcegroup,
        sourcename: this.sourcename,
        shortname: this.shortname
      }
       if (this.editedIndex > -1) {
          Object.assign(this.datalist[this.editedIndex], this.editedItem)
          this.$store.dispatch('editindicatorsource', data)
       } else {this.$store.dispatch('postindicatorources', data)}
      this.close();
    },
     editItem: function (item) {
        this.editedIndex = this.datalist.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.sourcegroup = item.sourcegroup;
        this.sourcename = item.sourcename;
        this.shortname = item.shortname;
        this.sourceid = item.sourceid;
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
       changeSourceGroup(e){
       console.log(e);
      this.sourcegroup = e;
      this.shortname = e;
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
    datalist() {
      return this.$store.getters.indicatorsourcesdata;
    },
     sourcegroups() {
      return this.$store.getters.sourcegroupsdata;
    },
     formTitle () {
        return this.editedIndex === -1 ? 'New Indicator source' : 'Edit Indicator source'
      },
   }

};
</script>
<style >
.greencontainer {
  background-color: #81c784;
}
</style>

