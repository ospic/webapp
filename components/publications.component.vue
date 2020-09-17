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
                        <v-col cols="6" sm="12">
                          <v-text-field
                            label="Publication Title*"
                            type="text"
                            hint="Publication"
                            persistent-hint
                            required
                            v-model="title"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6" sm="12">
                          <v-text-field
                            label="Source Link*"
                            hint="Source Link *"
                            type="text"
                            persistent-hint
                            required
                            v-model="link"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            label="Description"
                            hint="Descriptions *"
                            type="text"
                            persistent-hint
                            required
                            v-model="description"
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
            @click="delete_selected_item('deletepublications',item)"
            color="warning"
          >mdi-delete</v-icon>
        </template>
        <template v-slot:item.title="{ item }">
          <v-chip class="mt-1">
            <v-avatar left class="primary lighten-2 mt-1 mb-1">{{ item.pubid }}</v-avatar>
            <a :href="item.link" target="_blank" color="info">{{ item.title }}</a>
          </v-chip>
        </template>
        <template v-slot:item.description="{ item }">
          <v-tooltip top color="primary" max-width="35%" nudge-width="5" open-delay="4">
            <template v-slot:activator="{ on }">
              <v-btn class="mt-1" v-on="on" color="primary lighten-2" fab x-small dark>
                <v-icon color="white">mdi-help</v-icon>
              </v-btn>
            </template>
            <span>{{ item.description }}</span>
          </v-tooltip>
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
      titlex: 'Publications',
      search: '',
      editedIndex: -1,
      valid: true,
    headers: [
                  { text: 'Title', value: 'title' },
                  //{ text: 'Publication Type', value: 'publicationtype' },
               
                  { text: 'Descriptions', value: 'description'},
                  //{ text: 'Publication Contents', value: '"publicationcontent'},
                  //{ text:'Publication Address', value:'publicationaddress'},
                  { text: 'Updated At', value: 'createdAt' },
                  //{ text: 'Created At', value: 'updatedAt' },
                  { text: 'Actions', value: 'actions', sortable: false },
                ],
                dialog: false,
                title:null,
                publicationid:null,
                publicationtype: null,
                description:null,
                releasedate:null,
                publicationcontent:null,
                contenttype: null,
                publicationaddress:null,
                publicationsize:null,
                recorder:null,
                pubid: null,


    };
  },
  methods:{
    save: function(){
      const data = {
          title:this.title,
                description:this.description,
                link: this.link,
               
      }


       if (this.editedIndex > -1) {
          Object.assign(this.datalist[this.editedIndex], this.editedItem)
         
          this.$store.dispatch('editpublications', data)
      }else {
      this.$store.dispatch('postpublications', data);
      }
      this.close();

    },
     editItem: function (item) {
        this.editedIndex = this.datalist.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.pubid = item.pubid;
        this.title = item.title;
        this.link = item.link;
        this.description = item.description;
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
      return this.$store.getters.publicationsdata;
    },
    formTitle () {
        return this.editedIndex === -1 ? 'Create new publication' : 'Edit Publication'
      },
   },
   

};
</script>
