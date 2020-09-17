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
        loading="true"
        loading-text="No data available ...!"
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
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="select"
                            hint="Select Indicator category ID"
                            :items="indicatorcategories"
                            item-text="name"
                            item-value="id"
                            label="Select"
                            persistent-hint
                            return-object
                            single-line
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-select
                            v-model="periodid"
                            hint="Select Period ID"
                            :items="periodtypes"
                            item-text="periodname"
                            item-value="periodid"
                            label="Select period id"
                            persistent-hint
                            return-object
                            single-line
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="Indicator Name *"
                            hint="Indicator Name"
                            persistent-hint
                            single-line
                            required
                            type="text"
                            v-model="indicatorname"
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
            @click="delete_selected_item('deleteindicator',item)"
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
      search:'',
      titlex:'Indicators',
      editedIndex: -1,
      valid: true,
    headers: [

                  { text: 'Indicator ID', value: 'indicatorid' },
                  { text: 'Indicator Category', value: 'categoryname' },
                  { text: 'Period Type', value: 'periodname' },
                  {text: 'Indicator Name', value:'indicatorname'},
                  { text: 'Updated At', value: 'createdAt' },
                  { text: 'Created At', value: 'updatedAt' },
                  { text: 'Actions', value: 'actions', sortable: false },
                ],
                dialog: false,
                select: null,
                indicatorname: null,
                indicatorid: null,
                periodid: null,
                categoryid: null

    };
  },
   created: function () {
    let vm = this;

  },
  methods:{
    save: function(){
const data = {indicatorid: this.indicatorid, indicatorname: this.indicatorname, categoryid: this.select.categoryid, periodid: this.periodid.periodid};
 if (this.editedIndex > -1) {
          Object.assign(this.datalist[this.editedIndex], this.editedItem)

          this.$store.dispatch('editindicator', data)
       } else {

this.$store.dispatch('postindicatorvalue', data);
      }
      this.close();
    },
          close: function () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.indicatorid = this.indicatorid;
          this.editedIndex = -1
          this.$refs.form.reset()
        }, 300)
      },
    editItem:function (item) {
        this.editedIndex = this.datalist.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.indicatorid = item.indicatorid;
        this.periodid = this.periodid;
        this.categoryid = this.categoryid;
        this.indicatorname = item.indicatorname;
        this.dialog = true;
     },


  },
  watch: {
      dialog (val) {
        val || this.close()
      },
    },
   computed: {
    datalist() {
      return this.$store.getters.indicatorsdata;
    },
    indicatorcategories(){
      return this.$store.getters.indicatorcategoriesdata;
    },
    periodtypes(){
      return this.$store.getters.periodtypesdata;
    },
    formTitle () {
        return this.editedIndex === -1 ? 'New Indicator ' : 'Edit Indicator'
      },
   }

};
</script>
