 <template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="11"></v-col>
      <v-col cols="6" md="1">
        <v-btn class="mx-2" fab dark color="green lighten-2">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="datalist"
      :items-per-page="5"
      dense
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>
<script lang="js">
export default {
  data() {
    return {
    headers: [
                  {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                  },
                  { text: 'Reporting Period', value: 'reportingperiod' },
                  { text: 'Source Group', value: 'sourcegroup' },
                  { text: 'Total', value: 'total' },

                  { text: 'Updated At', value: 'createdAt' },
                  { text: 'Created At', value: 'updatedAt' },
                ],
    };
  },
   created: function () {
    let vm = this;

  },
   computed: {
    datalist() {
      return this.$store.getters.totalfemalesdata;
    }
   }

};
</script>
