<template>
<v-container fluid>

  <div id="invoice-POS" v-if="bill !== null">
    
    <center id="top">
      <div class="logo"></div>
      <div class="info"> 
        <h2>Ospic Memorial Hospital</h2>
      </div><!--End Info-->
    </center><!--End InvoiceTop-->
    
    <div id="mid">
      <div class="info">
        <h2>Receipt Info</h2>
           <p> 
            Client : {{bill.patientName}}</br>
            Email   : {{ bill.emailAddress }}</br>
            Phone   : {{ bill.phoneNumber}} </br>
            Address : {{bill.address}}
        </p>
      </div>
    </div><!--End Invoice Mid-->
    
    <div id="bot">

					<div id="table" v-if="bill !== null">
						<table>
							<tr class="tabletitle">
								<td class="item"><h2>ID</h2></td>
								<td class="Hours"><h2>Service</h2></td>
                	<td class="Hours"><h2>Medicine</h2></td>
								<td class="Rate"><h2>Price</h2></td>
							</tr>

							<tr class="service" v-for="(trans, index) in bill.transactionResponse.transactions" :key="index">
								<td class="tableitem"><p class="itemtext">{{index+1}}</p></td>
								<td class="tableitem"><p class="itemtext">{{ trans.medicalServiceName === null ? '------': trans.medicalServiceName }}</p></td>
								<td class="tableitem"><p class="itemtext">{{ trans.medicineName === null ? '------':trans.medicineName }}</p></td>
							
              	<td class="tableitem"><p class="itemtext">{{trans.amount}}</p></td>
							</tr>

						

							<tr class="tabletitle">
								<td></td><td></td>
								<td class="Rate"><h2>Tax</h2></td>
								<td class="payment"><h2>{{tax}}</h2></td>
							</tr>

							<tr class="tabletitle">
								<td></td><td></td>
								<td class="Rate"><h2>Total</h2></td>
								<td class="payment"><h2>{{bill.transactionResponse.totalAmount}}</h2></td>
							</tr>

						</table>
					</div><!--End Table-->

					<div id="legalcopy">
					<div >
              <span class="stamp is-approved" v-if="!bill.isPaid"
              >OutStanding !</span
            >
            <span class="stamp" style="height: 90px"  v-else>Paid </span>
          </div>
					</div>

				</div><!--End InvoiceBot-->
  </div><!--End Invoice-->

  
</v-container>
</template>
<script>
export default {
  props:{
    bill:{
      type:Object,
      default: null
    }
  },
  data:()=>({
   
  }),
  methods:{
    async getbill(id) {
      return await this.$api
        .$get(`bills/${id}`)
        .then(response => {
         // this.bill = response;
          //this.transaction = response.transactionResponse;
          //this.amountToPay = response.totalAmount;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  created(){
   
  }
}
</script>
<style scoped lang="scss">
#invoice-POS{
  box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5);
  padding:2mm;
  margin: 0 auto;
  width: 100%;
  background: #FFF;
   -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently */
          
  
::selection {background: #f31544; color: #FFF;}
::moz-selection {background: #f31544; color: #FFF;}
h1{
  font-size: 1.5em;
  color: #222;
}
h2{font-size: .9em;}
h3{
  font-size: 1.2em;
  font-weight: 300;
  line-height: 2em;
}
p{
  font-size: .8em;
  color: #666;
  line-height: 1.2em;
}
 
#top, #mid,#bot{ /* Targets all id with 'col-' */
  border-bottom: 1px solid #EEE;
}

#top{min-height: 100px;}
#mid{min-height: 80px;} 
#bot{ min-height: 50px;}

#top .logo{
  //float: left;
	height: 60px;
	width: 60px;
	background: url(../../static/icon.png) no-repeat;
	background-size: 60px 60px;
}
.clientlogo{
  float: left;
	height: 60px;
	width: 60px;
	background: url(../../static/logo.png) no-repeat;
	background-size: 60px 60px;
  border-radius: 50px;
}
.info{
  display: block;
  //float:left;
  margin-left: 0;
}
.title{
  float: right;
}
.title p{text-align: right;} 
table{
  width: 100%;
  border-collapse: collapse;
}
td{
  /*padding: 5px 0 5px 15px;
  border: 1px solid #EEE */
}
.tabletitle{
  //padding: 5px;
  font-size: 1.1em;
  background: #EEE;
  
}
.service{
  border-bottom: 1px solid #EEE;}
.item{width: 24mm;}
.itemtext{font-size: .9em;}

#legalcopy{
  margin-top: 5mm;
}

  
  
}
</style>