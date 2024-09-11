(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{771:function(t,n,l){var content=l(860);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,l(17).default)("7629777f",content,!0,{sourceMap:!1})},859:function(t,n,l){"use strict";l(771)},860:function(t,n,l){var e=l(16)((function(i){return i[1]}));e.push([t.i,"a{color:#fff;-webkit-text-decoration:none;text-decoration:none}",""]),e.locals={},t.exports=e},923:function(t,n,l){"use strict";l.r(n);var e=l(169),o=l(272),r=l(60),c=l(664),d=l(655),_=l(651),v=l(273),f=l(663),m=l(371),h=l(653),y=l(112),w=l(2),C=(l(23),{components:{"charges-component":l(293).default},data:function(){return{dialog:!1,bill:null,transaction:null,amountToPay:null}},methods:{get_bill:function(){var t=this;return Object(w.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.$api.$get("bills/".concat(t.$route.params.id,"/")).then((function(n){t.bill=n,t.transaction=n.transactionResponse,t.amountToPay=n.totalAmount})).catch((function(t){console.log(t)}));case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})))()},paybill:function(){var t=this;this.dialog=!1;var n={consultationId:this.bill.consultationId,amount:this.amountToPay};this.$store.dispatch("pay_bill",n).then((function(n){t.get_bill()}))}},created:function(){this.get_bill()},computed:{id:function(){return this.$route.params.id}}}),x=(l(859),l(46)),component=Object(x.a)(C,(function(){var t=this,n=t._self._c;return n(d.a,{attrs:{fluid:""}},[null!==t.bill?n("div",{staticClass:"breadcrumb"},[n("router-link",{attrs:{to:"/finance"}},[t._v("Dashboard")]),t._v(" "),n("router-link",{attrs:{to:"/finance"}},[t._v("Finance")]),t._v(" "),n("router-link",{attrs:{to:"/finance/bills"}},[t._v("Bills")]),t._v(" "),n("router-link",{staticClass:"active",attrs:{to:"/finance/bills/".concat(t.bill.id)}},[t._v(t._s(t.bill.patientName))])],1):t._e(),t._v(" "),n(o.a,{staticClass:"pa-3"},[null==t.bill?n(v.a,{attrs:{indeterminate:""}}):n("div",[n(f.a,[n(c.a,{attrs:{cols:"12",md:"4"}},[n(o.a,{attrs:{flat:"",outlined:"",elevation:"1"}},[n(m.a,{attrs:{dense:""},scopedSlots:t._u([{key:"default",fn:function(){return[n("tbody",[n("tr",[n("td",{staticClass:"font-weight-bold"},[t._v("Extra ID")]),t._v(" "),n("td",[t._v(t._s(t.bill.extraId))])]),t._v(" "),n("tr",[n("td",{staticClass:"font-weight-bold"},[t._v("Required Amount")]),t._v(" "),n("td",[t._v(t._s(t.bill.totalAmount))])]),t._v(" "),n("tr",[n("td",{staticClass:"font-weight-bold"},[t._v("Paid Amount")]),t._v(" "),n("td",[t._v(t._s(t.bill.paidAmount))])]),t._v(" "),n("tr",[n("td",{staticClass:"font-weight-bold"},[t._v("Consultation ID")]),t._v(" "),n("NuxtLink",{attrs:{to:"/consultations/".concat(t.bill.consultationId)}},[n("td",[t._v("   "+t._s(t.bill.consultationId))])])],1),t._v(" "),n("tr",[n("td",{staticClass:"font-weight-bold"},[t._v("Patient")]),t._v(" "),n("NuxtLink",{attrs:{to:"/patients/".concat(t.bill.patientId)}},[n("td",[t._v("\n                           "+t._s(t.bill.patientName)+"["+t._s(t.bill.patientId)+"]\n                      ")])])],1),t._v(" "),n("tr",[n("td",{staticClass:"font-weight-bold"},[t._v("Is Active ?")]),t._v(" "),n("td",[t._v(t._s(t.bill.isActive))])]),t._v(" "),n("tr",[n("td",{staticClass:"font-weight-bold"},[t._v("Phone")]),t._v(" "),n("td",[t._v(t._s(t.bill.phoneNumber))])]),t._v(" "),n("tr",[n("td",{staticClass:"font-weight-bold"},[t._v("Adress")]),t._v(" "),n("td",[t._v(t._s(t.bill.address))])]),t._v(" "),n("tr",[n("td",{staticClass:"font-weight-bold"},[t._v("Email")]),t._v(" "),n("td",[t._v(t._s(t.bill.emailAddress))])]),t._v(" "),n("tr",[n("td",{staticClass:"font-weight-bold"},[t._v("Created")]),t._v(" "),n("td",[t._v(t._s(t.bill.createdDate)+" By: "+t._s(t.bill.createdBy))])]),t._v(" "),n("tr",[n("td",{staticClass:"font-weight-bold"},[t._v("Last Modified")]),t._v(" "),n("td",[t._v("\n                      "+t._s(t.bill.lastUpdatedDate)+" By: "+t._s(t.bill.lastUpdatedBy)+"\n                    ")])])])]},proxy:!0}])})],1)],1),t._v(" "),n(c.a,{staticClass:"d-flex align-center justify-center mb-6",attrs:{cols:"12",md:"4"}},[t.bill.isPaid?n("span",{staticClass:"stamp is-draft"},[t._v("Paid ")]):n("span",{staticClass:"stamp is-approved"},[t._v("OutStanding !")])]),t._v(" "),n(c.a,{staticClass:"d-flex align-end justify-end",attrs:{cols:"12",md:"4"}},[n(_.a,{attrs:{persistent:"","max-width":"600px"},scopedSlots:t._u([{key:"activator",fn:function(l){var o=l.on,r=l.attrs;return[t.bill.isPaid?t._e():n(e.a,t._g(t._b({staticClass:"blue white--text"},"v-btn",r,!1),o),[t._v(t._s(t.$t("label.button.btnpaybill")))])]}}]),model:{value:t.dialog,callback:function(n){t.dialog=n},expression:"dialog"}},[t._v(" "),n(o.a,[n(r.d,{staticClass:"primary"},[n("span",{staticClass:"white--text"},[t._v("Pay bill No."+t._s(t.bill.id)+" for customer\n                  "+t._s(t.bill.patientName)+" amount "+t._s(t.bill.totalAmount)+" ?\n                ")])]),t._v(" "),n(r.c,[n(d.a,[n(f.a,[n(c.a,{attrs:{cols:"12"}},[n(y.a,{attrs:{label:"Amount",type:"number",required:""},model:{value:t.amountToPay,callback:function(n){t.amountToPay=n},expression:"amountToPay"}})],1)],1)],1)],1),t._v(" "),n(r.a,[n(h.a),t._v(" "),n(e.a,{attrs:{color:"blue darken-1",small:"",text:""},on:{click:function(n){t.dialog=!1}}},[t._v("\n                  Ignore\n                ")]),t._v(" "),n(e.a,{staticClass:"blue white--text",attrs:{small:""},on:{click:t.paybill}},[t._v("\n                  Yes "+t._s(t.$t("label.button.btnpaybill"))+"\n                ")])],1)],1)],1)],1)],1),t._v(" "),n("charges-component",{attrs:{transaction:t.transaction},on:{update:t.get_bill}})],1)],1)],1)}),[],!1,null,null,null);n.default=component.exports}}]);