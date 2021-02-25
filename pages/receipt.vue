<template>
  <v-container fluid>
    <id>
      <v-progress-linear
        background-color="white"
        indeterminate
        color="cyan"
        v-if="bill == null"
      ></v-progress-linear>
      <receipt v-else :bill="bill"></receipt>
    </id>
  </v-container>
</template>
<script>
import ReceiptComponent from "@/components/finance/receipt_component.vue";
export default {
  layout: "finance",
  components: {
    receipt: ReceiptComponent
  },

  data: () => ({
    dialog: false,
    bill: null,
    transaction: null,
    amountToPay: null,
    tax: 0
  }),
  methods: {
    async getbill() {
      return await this.$api
        .$get(`bills/1/`)
        .then(response => {
          this.bill = response;
          this.transaction = response.transactionResponse;
          this.amountToPay = response.totalAmount;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getbill();
  }
};
</script>
<style scoped lang="scss">
#invoice-POS {
  box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
  padding: 2mm;
  margin: 0 auto;
  width: 80mm;
  background: #fff;

  ::selection {
    background: #f31544;
    color: #fff;
  }
  ::moz-selection {
    background: #f31544;
    color: #fff;
  }
  h1 {
    font-size: 1.5em;
    color: #222;
  }
  h2 {
    font-size: 0.9em;
  }
  h3 {
    font-size: 1.2em;
    font-weight: 300;
    line-height: 2em;
  }
  p {
    font-size: 0.7em;
    color: #666;
    line-height: 1.2em;
  }

  #top,
  #mid,
  #bot {
    /* Targets all id with 'col-' */
    border-bottom: 1px solid #eee;
  }

  #top {
    min-height: 100px;
  }
  #mid {
    min-height: 80px;
  }
  #bot {
    min-height: 50px;
  }

  #top .logo {
    //float: left;
    height: 60px;
    width: 60px;
    background: url(../static/icon.png) no-repeat;
    background-size: 60px 60px;
  }
  .clientlogo {
    float: left;
    height: 60px;
    width: 60px;
    background: url(../static/logo.png) no-repeat;
    background-size: 60px 60px;
    border-radius: 50px;
  }
  .info {
    display: block;
    //float:left;
    margin-left: 0;
  }
  .title {
    float: right;
  }
  .title p {
    text-align: right;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  td {
    /*padding: 5px 0 5px 15px;
  border: 1px solid #EEE */
  }
  .tabletitle {
    //padding: 5px;
    font-size: 0.5em;
    background: #eee;
  }
  .service {
    border-bottom: 1px solid #eee;
  }
  .item {
    width: 24mm;
  }
  .itemtext {
    font-size: 0.5em;
  }

  #legalcopy {
    margin-top: 5mm;
  }
}
</style>
