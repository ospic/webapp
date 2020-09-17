 <template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        {{title}}
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
        :sort-by="['categoryid','sectorid']"
        :sort-desc="[false, true]"
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
                    <span class="headline">{{formTitle}}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="6">
                          <v-text-field
                            label="Name *"
                            hint="Indicator Category Name  *"
                            type="text"
                            persistent-hint
                            required
                            single-line
                            v-model="name"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12" md="6">
                          <v-select
                            v-model="sectorid"
                            hint="Select indicator category Sector ID"
                            :items="sectors"
                            item-text="sectorname"
                            item-value="sectorid"
                            label="Select sector"
                            persistent-hint
                            return-object
                            single-line
                          ></v-select>
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
            @click="delete_selected_item('deleteindicatorcategory', item)"
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
      search: '',
      title:'Indicator Categories',
      editedIndex: -1,
      valid: true,

    headers: [
                  { text: 'Category ID', value: 'categoryid',align: 'start' },
                  { text: 'Category Name', value: 'name' },
                  { text: 'Sector ID', value: 'sectorid' },
                  { text: 'Updated At', value: 'createdAt' },
                  { text: 'Created At', value: 'updatedAt' },
                  { text: 'Actions', value: 'actions', sortable: false },
                ],
                dialog: false,
                categoryid: null,
                name:null,
                sectorid: null,

    };
  },
  methods:{
    save: function(){

      const data = {categoryid: this.categoryid, name: this.name,sectorid: this.sectorid.sectorid};
       if (this.editedIndex > -1) {
          Object.assign(this.datalist[this.editedIndex], this.editedItem)
        
      this.$store.dispatch('editindicatorcategory', data)
       } else {
         this.$store.dispatch('postindicatorcategory', data)
        }
      this.close();
    },
      close: function () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.sectorid = this.sectorid;
          this.editedIndex = -1
          this.$refs.form.reset()
        }, 300)
      },
    editItem:function (item) {
        this.editedIndex = this.datalist.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.categoryid = item.categoryid;
        this.name = item.name;
        this.dialog = true;
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
      return this.$store.getters.indicatorcategoriesdata;
    },
    sectors(){
      return this.$store.getters.sectordata;
    },
     formTitle () {
        return this.editedIndex === -1 ? 'New Indicator Category' : 'Edit Category'
      },
   }

};
</script>
<style >
.greencontainer {
  background-color: #81c784;
}
</style>

