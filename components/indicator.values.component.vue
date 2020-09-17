 <template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="11"></v-col>
      <v-col cols="6" md="1">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn class="mx-2" fab dark small v-on="on" color="primary lighten-2">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
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
                      <v-select
                        v-model="indicatorid"
                        hint="Select Indicator "
                        :items="indicators"
                        item-text="indicatorname"
                        item-value="indicatorid"
                        label="Select indicator id"
                        @change="changeIndicatorid(`${indicatorid.indicatorid}`)"
                        persistent-hint
                        return-object
                        single-line
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                      <v-select
                        v-model="disaggregationid"
                        hint="Select Disaggregations "
                        :items="disaggregations"
                        item-text="disaggregationname"
                        item-value="disaggregationtypeid"
                        label="Select disaggregation id"
                        @change="changeDisaggregationid(`${disaggregationid.disaggregationtypeid}`)"
                        type="number"
                        persistent-hint
                        return-object
                        single-line
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                      <v-select
                        v-model="periodid"
                        hint="Select Period ID"
                        :items="periodtypes"
                        item-text="periodname"
                        item-value="periodid"
                        label="Select period id"
                        type="number"
                        @change="changePeriodId(`${periodid.periodid}`)"
                        persistent-hint
                        return-object
                        single-line
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                      <v-select
                        v-model="seconddisaggregationid"
                        hint="Second Disaggregations"
                        :items="seconddisaggregationvalues"
                        item-text="disaggregationvalue"
                        item-value="disaggregationid"
                        label="Select Second Disaggregations *"
                        @change="changeSecDisaggregationId(`${seconddisaggregationid.disaggregationid}`)"
                        persistent-hint
                        return-object
                        single-line
                      ></v-select>
                    </v-col>

                    <v-col v-if="mf" cols="12" sm="12" md="6">
                      <v-text-field
                        label="Male "
                        hint="Male"
                        type="number"
                        persistent-hint
                        single-line
                        v-model="malevalue"
                      ></v-text-field>
                    </v-col>

                    <v-col v-if="mf" cols="12" sm="12" md="6">
                      <v-text-field
                        label="Female"
                        hint="Female"
                        type="number"
                        persistent-hint
                        single-line
                        v-model="femalevalue"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="6">
                      <v-text-field
                        label="Total/Value *"
                        hint="Value/Total *"
                        type="number"
                        persistent-hint
                        required
                        single-line
                        v-model="total"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="12" md="6">
                      <v-text-field
                        label="Reporting period *"
                        hint="Reporting period"
                        persistent-hint
                        single-line
                        required
                        type="number"
                        v-model="reportingperiod"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                      <v-select
                        v-model="sourceid"
                        hint="Select Source ID *"
                        :items="sourcegroups"
                        item-text="sourcename"
                        item-value="sourceid"
                        label="Select source id"
                        @change="changeSourceId(`${sourceid.sourceid}`)"
                        required
                        persistent-hint
                        return-object
                        single-line
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="12" md="6">
                      <v-text-field
                        label="Date *"
                        hint="Date"
                        persistent-hint
                        single-line
                        required
                        type="text"
                        v-model="date"
                        @change="uppercase()"
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
      </v-col>
    </v-row>

    <v-card>
      <v-tabs background-color="white" color="deep-purple accent-4" right>
        <v-tab>Regular</v-tab>
        <v-tab>Indicators</v-tab>

        <v-tab-item>
          <v-container fluid>
            <v-card flat color="white">
              <v-card-title>
                {{titlef}}
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
                :headers="regular_indicators_datatable"
                :items="regularindicatorvaluestemplate"
                :items-per-page="12"
                :search="search"
                dense
                class="elevation-1"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)" color="info">mdi-lead-pencil</v-icon>
                  <v-icon small @click="deleteItem(item)" color="warning">mdi-delete</v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container fluid>
            <v-card flat color="white">
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
                :headers="regular_datatable"
                :items="indicatorvaluestemplate"
                :items-per-page="5"
                :search="search"
                dense
                class="elevation-1"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editDefaultIndicator(item)"
                    color="info"
                  >mdi-lead-pencil</v-icon>
                  <v-icon small @click="deleteItem(item)" color="warning">mdi-delete</v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>
<script lang="js">
export default {
  data() {
    return {
      titlex: 'Regular Indicator values',
      titlef: 'Frequent Indicator values',
      search: "",
      valid: true,
      date: '',
      modal: false,
      editedIndex: -1,
      editedtItemId: null,
      dialog: false,
      sourcegroup: null,
      sourceid: null,
      value: null,
      total: null,
      male: null,
      female: null,
      shortname: null,
      periodid:null,
      indicatorid: 0,
      seconddisaggregationid: null,
      disaggregationid: null,
      reportingperiod: null,
      malevalue: null,
      femalevalue:null,
      mf: false,

    regular_indicators_datatable: [
            { text: ' ID', value: 'valueid', align: 'start', sortable: false, },
            { text: 'Indicator', value: 'indicatorid' },
            { text: 'Disag:', value:'disaggregationid'},
            { text: 'Second:', value:'seconddisaggregation'},
            { text: 'Period Types', value:'periodid'},
            { text: 'Source:', value: 'sourceid'},
            { text: 'Value', value: 'total'},
            { text: 'Period Time', value: 'datadate' },
            { text: 'Actions', value: 'actions', sortable: false },
            ],
    regular_datatable: [
            { text: ' ID', value: 'valueid', align: 'start', sortable: false, },
            { text: 'Indicator', value: 'indicatorid' },
            { text: 'Disag:', value:'disaggregationid'},
            { text: 'Second ID', value:'seconddisaggregation'},
            { text: 'Period Types', value:'periodid'},
            { text: 'Source Id:', value: 'sourceid'},
            { text: 'Male', value: 'male'},
            { text: 'Female', value: 'female'},
            { text: 'Total', value: 'total'},
            { text: 'Period Time ', value: 'datadate' },
            { text: 'Actions', value: 'actions', sortable: false },
             ],
           
    };
  },
  methods:{
    changePeriodId(a) {
       if(parseInt(a) !== 1){
         this.malevalue = null;
         this.femalevalue = null;
         this.mf = false;
       }else{
         this.mf = true;
       }
       this.periodid = parseInt(a);
        console.log(a);
        console.log(this.mf);
    },
    changeIndicatorid(b){
      console.log(b);
      this.indicatorid = parseInt(b);
    },
    changeDisaggregationid(c){
       console.log(c);
      this.disaggregationid = parseInt(c)
    },
    changeSecDisaggregationId(d){
       console.log(d);
      this.seconddisaggregationid = parseInt(d);
    },
    changeSourceId(e){
       console.log(e);
      this.sourceid = parseInt(e);
    },
    uppercase() {
        this.date = this.date.toUpperCase();
    },

    close: function () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.$refs.form.reset()
        }, 300)
    },
    editDefaultIndicator(item){
        this.editedIndex =  this.indicatorvaluestemplate.indexOf(item)
          //this.editedItem = Object.assign({}, item)
          this.editedtItemId = item.valueid;
          this.email = item.email;
          this.malevalue = item.male;
          this.femalevalue = item.female;
          this.total = item.total;
          this.sourceid = item.sourceid;
          this.periodid = item.periodid;
          this.date = item.date;
          //this.indicatorid = item.indicatorid;
          //this.seconddisaggregationid = item.seconddisaggregation;
          //this.disaggregationid = item.disaggregationid;
          this.reportingperiod = item.reportingperiod;
          
          this.changeIndicatorid(item.indicatorid);
          this.changeDisaggregationid(item.disaggregationid);
          this.changeSourceId(item.sourceid);
          this.changePeriodId(item.periodid);
          this.changeSecDisaggregationId(item.seconddisaggregation);
          
          this.dialog = true
    },

     editItem(item) {
          this.date = null;
          this.editedIndex =  this.regularindicatorvaluestemplate.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.editedtItemId = item.valueid;
          this.email = item.email;
          this.malevalue = item.male;
          this.femalevalue = item.female;
          this.total = item.total;
          this.date = item.date;
          this.changeIndicatorid(item.indicatorid);
          this.reportingperiod = item.reportingperiod;
          this.changeDisaggregationid(item.disaggregationid);
          this.changeSourceId(item.sourceid);
          this.changePeriodId(item.periodid);
          this.changeSecDisaggregationId(item.seconddisaggregation);
          console.log(item);
          this.dialog = true
      },

    save(){
      const newDataItem = {
        email : localStorage.getItem("mmail"),
        indicatorid: this.indicatorid,
        disaggregationid: this.disaggregationid,
        seconddisaggregation:  this.seconddisaggregationid,
        periodid: this.periodid,
        date: this.date,
        periodcode:  this.periodid,
        male: this.malevalue ? this.malevalue : 0,
        female: this.femalevalue ? this.femalevalue : 0,
        reportingperiod: parseInt(this.reportingperiod),
        sourceid: this.sourceid,
        total:  this.total,
      }
      var editedDataItem ={
        valueid: this.editedtItemId,
        email : localStorage.getItem("mmail"),
        indicatorid: this.indicatorid,
        disaggregationid: this.disaggregationid,
        seconddisaggregation:  this.seconddisaggregationid,
        periodid: this.periodid,
        date:  this.date,
        periodcode:  this.periodid,
        male: this.malevalue ? this.malevalue : 0,
        female: this.femalevalue ? this.femalevalue : 0,
        reportingperiod: parseInt(this.reportingperiod),
        sourceid: this.sourceid,
        total: this.total,
      }
      //console.log(editedDataItem);
      
      if (this.editedIndex > -1) {
        console.log("Edit Item: " + this.editedtItemId);
       console.log(editedDataItem);
          if(parseInt(editedDataItem.periodid) !== 1){
          this.$store.dispatch('editindicatorvalues', editedDataItem)
          }else{
          this.$store.dispatch('editdefaultindicatorvalues',editedDataItem)
        }
      }else{
        console.log("New Item");
        
        console.log(newDataItem);
        
      this.$store.dispatch('postindicatorvalues', newDataItem)
      }
       this.close();
    },
   

  },
   created: function () {
    let vm = this;

  },
   computed: {
    datalist() {
      return this.$store.getters.indicatorvaluesdata;
    },
     periodtypes(){
      return this.$store.getters.periodtypesdata;
    },
     indicators() {
      return this.$store.getters.indicatorsdata;
    },
     disaggregations() {
      return this.$store.getters.disaggregationdata;
    },
     sourcegroups() {
      return this.$store.getters.sourcegroupsdata;
    },
     seconddisaggregationvalues() {
      return this.$store.getters.disaggregationvaluesdata;
    },
    regularindicatorvalues(){
      return this.$store.getters.regularindicatorvaluesdata;
    },
    indicatorvaluestemplate(){
      return this.$store.getters.indicatorvaluestemplate;
    },
    regularindicatorvaluestemplate(){
      return this.$store.getters.regularindicatorvaluestemplate;
    },
    formTitle () {
        return this.editedIndex === -1 ? 'Add New Indicator Value' : 'Edit Indicator Value'
    },
 

   },
   watch: {
      dialog (val) {
        val || this.close()
      },
    },

};
</script>
<style >
.greencontainer {
  background-color: #81c784;
}
</style>
