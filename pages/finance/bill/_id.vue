<template>
  <v-container fluid>
    <div class="breadcrumb " v-if="bill !== null">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/finance">Finance</router-link>
      <router-link :to="`/finance/bill/${bill.id}`" class="active"
        >Bill</router-link
      >
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
        </v-row>
        <charges-component :transaction="transaction"></charges-component>
      </div>
    </v-card>
  </v-container>
</template>
<script>
import Charges from "@/components/profile/tabs/charges";
export default {
  layout: "finance",
  components: {
    "charges-component": Charges
  },
  data() {
    return {
      bill: null,
      transaction: null
    };
  },
  methods: {
    async get_bill() {
      return await this.$api
        .$get(`bills/${this.$route.params.id}/`)
        .then(response => {
          this.bill = response;
          this.transaction = response.transactionResponse;
        })
        .catch(error => {
          console.log(error);
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
