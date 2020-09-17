 <template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        {{titlex}}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search in News"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="datalist"
        :items-per-page="5"
        class="elevation-1"
        :search="search"
        loading="true"
        dense
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
                          <v-text-field
                            label="News Title*"
                            type="text"
                            hint="News Title"
                            persistent-hint
                            required
                            v-model="title"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="Source *"
                            hint="News source *"
                            type="text"
                            persistent-hint
                            required
                            v-model="source"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            label="URL *"
                            hint="Link to the News article"
                            persistent-hint
                            required
                            v-model="url"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            label="Descriptions"
                            hint="Descriptions"
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
          <v-icon small @click="delete_selected_item('deletenews',item)" color="warning">mdi-delete</v-icon>
        </template>

        <template v-slot:item.title="{ item }">
          <v-chip class="mt-1">
            <v-avatar left class="primary lighten-2 mt-1 mb-1">{{ item.newsid }}</v-avatar>
            <a :href="item.url" target="_blank" color="info">{{ item.title }}</a>
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
    dialog: false,
    editedIndex: -1,
    valid: true,
    search: '',
    titlex: 'News',
    headers: [
                
                  { text: 'News Title', value: 'title' },
                  { text: 'Description', value: 'description'},
                  { text: 'Source ', value: 'source' },
                  { text: 'Updated At', value: 'createdAt' },
                  { text: 'Actions', value: 'actions', sortable: false },
                ],
                title: null,
                source: null,
                url: null,
                description: null,
                newsid: null
    };
  },
 
  methods: {
    save: function(){
      const data = {newsid: this.newsid, description: this.description, title: this.title, source: this.source, url: this.url}
     
       if (this.editedIndex > -1) {
          Object.assign(this.datalist[this.editedIndex], this.editedItem)
          
          this.$store.dispatch('editnews', data)
      }else {
     this.$store.dispatch('savenews', data)
      }
      this.close();
    },

    editItem: function (item) {
        this.editedIndex = this.datalist.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.title = item.title;
        this.newsid = item.newsid;
        this.source = item.source;
        this.description = item.description;
        this.url = item.url;
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
    datalist: {
      get:function (){
      return this.$store.getters.newsdata;
      },
      set: function(value){
        this.$store.dispatch('savenews', value)
      }
    },
     formTitle () {
        return this.editedIndex === -1 ? 'New news item' : 'Edit news item'
      },
  }
};

</script>
