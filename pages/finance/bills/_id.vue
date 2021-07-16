<template>
  <v-container fluid>
    <div class="breadcrumb " v-if="bill !== null">
      <router-link to="/finance">Dashboard</router-link>
      <router-link to="/finance">Finance</router-link>
      <router-link to="/finance/bills">Bills</router-link>
      <router-link :to="`/finance/bills/${bill.id}`" class="active">{{
        bill.patientName
      }}</router-link>
    </div>
    <v-card class="pa-3">
      <v-progress-linear indeterminate v-if="bill == null"></v-progress-linear>
      <div v-else>
        <v-row>
          <v-col cols="12" md="4">
            <v-card flat outlined elevation="1">
              <v-simple-table dense>
                <template v-slot:default>
                  <tbody>
                    <tr>
                      <td class="font-weight-bold">Extra ID</td>
                      <td>{{ bill.extraId }}</td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Required Amount</td>
                      <td>{{ bill.totalAmount }}</td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Paid Amount</td>
                      <td>{{ bill.paidAmount }}</td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Consultation ID</td>
                      <NuxtLink :to="`/consultations/${bill.consultationId}`">
                        <td>&nbsp;&nbsp;&nbsp;{{ bill.consultationId }}</td>
                      </NuxtLink>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Patient</td>
                      <NuxtLink :to="`/patients/${bill.patientId}`">
                        <td>
                          &nbsp;&nbsp;&nbsp;{{ bill.patientName }}[{{
                            bill.patientId
                          }}]
                        </td>
                      </NuxtLink>
                    </tr>

                    <tr>
                      <td class="font-weight-bold">Is Active ?</td>
                      <td>{{ bill.isActive }}</td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Phone</td>
                      <td>{{ bill.phoneNumber }}</td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Adress</td>
                      <td>{{ bill.address }}</td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Email</td>
                      <td>{{ bill.emailAddress }}</td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Created</td>
                      <td>{{ bill.createdDate }} By: {{ bill.createdBy }}</td>
                    </tr>
                    <tr>
                      <td class="font-weight-bold">Last Modified</td>
                      <td>
                        {{ bill.lastUpdatedDate }} By: {{ bill.lastUpdatedBy }}
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>

          <v-col
            cols="12"
            md="4"
            class="d-flex align-center justify-center mb-6"
          >
            <span class="stamp is-approved" v-if="!bill.isPaid"
              >OutStanding !</span
            >
            <span class="stamp is-draft" v-else>Paid </span>
          </v-col>
          <v-col cols="12" md="4" class="d-flex align-end justify-end">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="blue white--text"
                  v-bind="attrs"
                  v-on="on"
                  v-if="!bill.isPaid"
                  >{{ $t("label.button.btnpaybill") }}</v-btn
                >
              </template>
              <v-card>
                <v-card-title class="primary">
                  <span class="white--text"
                    >Pay bill No.{{ bill.id }} for customer
                    {{ bill.patientName }} amount {{ bill.totalAmount }} ?
                  </span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          label="Amount"
                          type="number"
                          required
                          v-model="amountToPay"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    small
                    text
                    @click="dialog = false"
                  >
                    Ignore
                  </v-btn>
                  <v-btn class="blue white--text" small @click="paybill">
                    Yes {{ $t("label.button.btnpaybill") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <charges-component
          :transaction="transaction"
          v-on:update="get_bill"
        ></charges-component>
      </div>
    </v-card>
  </v-container>
</template>
<script>
import Charges from "@/components/consultation/tabs/charges";
export default {
  components: {
    "charges-component": Charges
  },
  data() {
    return {
      dialog: false,
      bill: null,
      transaction: null,
      amountToPay: null
    };
  },
  methods: {
    async get_bill() {
      return await this.$api
        .$get(`bills/${this.$route.params.id}/`)
        .then(response => {
          this.bill = response;
          this.transaction = response.transactionResponse;
          this.amountToPay = response.totalAmount;
        })
        .catch(error => {
          console.log(error);
        });
    },
    paybill: function() {
      this.dialog = false;
      var payload = {
        consultationId: this.bill.consultationId,
        amount: this.amountToPay
      };
      this.$store.dispatch("pay_bill", payload).then(response => {
        this.get_bill();
      });
    }
  },
  created() {
    this.get_bill();
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  }
};
</script>
<style>
a {
  color: #ffffff;
  text-decoration: none;
}
</style>
