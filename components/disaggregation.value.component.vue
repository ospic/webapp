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
                            label="Disaggregation value*"
                            hint="Disaggregation value (required)"
                            type="text"
                            v-model="disaggregationvalue"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12" md="6">
                          <v-select
                            v-model="selectdisagtype"
                            hint="Disaggregation Type id (required)"
                            :items="disaggregationsdata"
                            item-text="disaggregationname"
                            item-value="disaggregationtypeid"
                            label="Select disaggregation type"
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
                    <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
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
            @click="delete_selected_item('deletedisaggregationvalue', item)"
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
      titlex: 'Disaggregations Values',
      editedIndex: -1,
      valid: true,
    headers: [

                  { text: 'Disaggregation ID', value: 'disaggregationid',align: 'start' },
                  { text: 'Disaggregation Type ID', value: 'disaggregationtypeid' },
                  { text: 'Disaggregation Value', value: 'disaggregationvalue' },

                  { text: 'Created At', value: 'createdAt' },
                  { text: 'Updated  At', value: 'updatedAt' },
                  { text: 'Actions', value: 'actions', sortable: false },
                ],
                dialog: false,
                disaggregationid: null,
                disaggregationtypeid: null,
                disaggregationvalue: null,
                selectdisagtype: null,
    };
  },
  methods:{
  save: function(){
    const data = {
      disaggregationid: this.disaggregationid,
      disaggregationtypeid: this.selectdisagtype.disaggregationtypeid,
      disaggregationvalue: this.disaggregationvalue
    }
  if (this.editedIndex > -1) {
          Object.assign(this.datalist[this.editedIndex], this.editedItem)
          this.$store.dispatch('editdisaggregationvalue', data)
      }else {
    this.$store.dispatch('postdisaggregationvalue',data);
    }
      this.close();

  },
    editItem: function (item) {
        this.editedIndex = this.datalist.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.disaggregationid = item.disaggregationid;
        this.disaggregationvalue = item.disaggregationvalue;
        this.disaggregationtypeid = this.disaggregationtypeid;
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
      return this.$store.getters.disaggregationvaluesdata;
    },
    disaggregationsdata(){
      return this.$store.getters.disaggregationdata;
    },
     formTitle () {
        return this.editedIndex === -1 ? 'New Disaggregation vlaue' : 'Edit Disaggregation lueva'
      },
   }

};
</script>
