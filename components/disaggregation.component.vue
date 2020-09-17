 <template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        {{titles}}
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
                        <v-col cols="12">
                          <v-text-field
                            label="Disaggregation name*"
                            hint="Disaggregation name (required)"
                            type="text"
                            :rules="[v => !!v || 'Disaggregation name required']"
                            :counter="3"
                            v-model="disaggregationname"
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
            @click="delete_selected_item('deletedisaggregations', item)"
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
      titles: 'Disaggregations',
      editedIndex: -1,
      valid: true,
    headers: [
                  { text: 'Disaggregation Type ID', align:'start', value: 'disaggregationtypeid',sortable: false, },
                  { text: 'Disaggregation Name', value: 'disaggregationname' },

                  { text: 'Updated At', value: 'createdAt' },
                  { text: 'Created At', value: 'updatedAt' },
              { text: 'Actions', value: 'actions', sortable: false },
                ],
                dialog: false,
                published: true,
                disaggregationname: null,
                disaggregationtypeid: null

    };
  },
  methods:{
    save(){
      const data = {
        disaggregationtypeid: this.disaggregationtypeid,
        disaggregationname: this.disaggregationname
      }
      if (this.editedIndex > -1) {
          Object.assign(this.datalist[this.editedIndex], this.editedItem)
          this.$store.dispatch('editdisaggregation', data)
      }else {
      this.$store.dispatch('postdisaggregation',data);
      }
      this.close();
    },
      editItem: function (item) {
        this.editedIndex = this.datalist.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.disaggregationname = item.disaggregationname;
        this.disaggregationtypeid = item.disaggregationtypeid;
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
    datalist() {
      return this.$store.getters.disaggregationdata;
    },
      formTitle () {
        return this.editedIndex === -1 ? 'New Disaggregations' : 'Edit Disaggregations'
      },
   }

};
</script>
