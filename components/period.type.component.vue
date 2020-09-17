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
        :search="search"
        dense
        class="elevation-1"
        loading="true"
      >
        <template v-slot:top>
          <v-toolbar flat color="transparent">
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <!--<template v-slot:activator="{ on }">
                <div class="my-2">
                  <v-btn color="info" fab x-small dark v-on="on">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </template>-->
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-card>
                  <v-card-title>
                    <span class="headline">Add Period Type</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="12" md="6">
                          <v-text-field
                            label="Period Code *"
                            hint="Period Code *"
                            type="text"
                            persistent-hint
                            required
                            single-line
                            v-model="periodcode"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
                          <v-text-field
                            label="Period Name *"
                            hint="Period Name"
                            persistent-hint
                            single-line
                            required
                            type="text"
                            autocomplete="false"
                            v-model="periodname"
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
       <!-- <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)" color="info">mdi-lead-pencil</v-icon>
          <v-icon small @click="deleteItem(item)" color="warning">mdi-delete</v-icon>
        </template>-->
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script lang="js">
export default {
  data() {
    return {
      title: 'Period types',
      search: '',
      editedIndex: -1,
      lazy: true,
      valid: true,
    headers: [
                  { text: 'Period ID', value: 'periodid', align: 'start',
                    sortable: false, },
                  { text: 'Period Name', value: 'periodname' },
                  { text: 'PeriodCode', value: 'periodcode' },
                  { text: 'Created At', value: 'createdAt' },
                  { text: 'Updated At', value: 'updatedAt' },
                ],
                dialog: false,
                periodcode: null,
                periodid: null,
                periodname: null,
    };
  },
  methods:{
    save: function(){
      const data ={periodid:this.periodid, periodcode:this.periodcode,periodname:this.periodname};
      if (this.editedIndex > -1) {
          Object.assign(this.datalist[this.editedIndex], this.editedItem)

           this.$store.dispatch('periodedit',data);
    }else{
      this.$store.dispatch('postperiodtypevalue', data);
    }
      this.close();
    },

    close: function () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.$refs.form.reset()
        }, 300)
      },
    editItem:function (item) {
        this.editedIndex = this.datalist.indexOf(item)
        this.editedItem = Object.assign({}, item)

        this.periodid = item.periodid;
        this.periodcode = item.periodcode;
        this.periodname = item.periodname;
        this.dialog = true;
     },
     deleteItem:function (item) {
      const index = this.datalist.indexOf(item)
      if (window.confirm("Are you sure you want to delete "+ item.periodname +"?")) {
        this.$store.dispatch('perioddelete', item);
        }
     }
  },
   created: function () {
    let vm = this;

  },
   computed: {
    datalist() {
      return this.$store.getters.periodtypesdata;
    }
   }

};
</script>
