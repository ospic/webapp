(window.webpackJsonp=window.webpackJsonp||[]).push([[66,19,35,37],{714:function(t,e,o){var content=o(740);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(17).default)("599b36b2",content,!0,{sourceMap:!1})},715:function(t,e,o){var content=o(742);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(17).default)("2db89651",content,!0,{sourceMap:!1})},726:function(t,e,o){"use strict";var n=o(126),r=o(52),l=o(6),c=o(12);e.a=Object(l.a)(n.a,r.a).extend({name:"v-hover",props:{disabled:{type:Boolean,default:!1},value:{type:Boolean,default:void 0}},methods:{onMouseEnter:function(){this.runDelay("open")},onMouseLeave:function(){this.runDelay("close")}},render:function(){return this.$scopedSlots.default||void 0!==this.value?(this.$scopedSlots.default&&(element=this.$scopedSlots.default({hover:this.isActive})),Array.isArray(element)&&1===element.length&&(element=element[0]),element&&!Array.isArray(element)&&element.tag?(this.disabled||(element.data=element.data||{},this._g(element.data,{mouseenter:this.onMouseEnter,mouseleave:this.onMouseLeave})),element):(Object(c.c)("v-hover should only contain a single element",this),element)):(Object(c.c)("v-hover is missing a default scopedSlot or bound value",this),null);var element}})},739:function(t,e,o){"use strict";o(714)},740:function(t,e,o){var n=o(16)((function(i){return i[1]}));n.push([t.i,".outlined[data-v-068e46a4]{border-color:blue!important;color:blue!important}",""]),n.locals={},t.exports=n},741:function(t,e,o){"use strict";o(715)},742:function(t,e,o){var n=o(16)((function(i){return i[1]}));n.push([t.i,".outlined[data-v-450b2fec]{border-color:blue!important;color:blue!important}",""]),n.locals={},t.exports=n},759:function(t,e,o){var content=o(834);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(17).default)("38cbb01e",content,!0,{sourceMap:!1})},777:function(t,e,o){"use strict";o.r(e);var n=o(272),r=o(60),l=o(275),c=o(726),d=o(142),m=o(170),f=o(18),h=o(653),y=o(76),v={props:{item:{type:Object,default:null}},data:function(){return{}}},_=(o(739),o(46)),component=Object(_.a)(v,(function(){var t=this,e=t._self._c;return e(c.a,{scopedSlots:t._u([{key:"default",fn:function(o){var c=o.hover;return[e(n.a,{staticClass:"default",attrs:{elevation:c?3:1}},[e(y.a,{attrs:{flat:"",dense:"",color:"primary",dark:""}},[e(r.d,[e("span",[t._v(" "+t._s(t.item.title))])]),t._v(" "),e(h.a),t._v(" "),e(d.a,{attrs:{color:"white"},domProps:{textContent:t._s(t.item.icon)}})],1),t._v(" "),e(l.a),t._v(" "),e(r.c,[e(m.a,[e(f.a,[e(f.c,{staticClass:"primary--text font-weight-bold text-body-1 text-xs-center"},[t._v(t._s(null==t.formatPrice(t.item.value)?0:t.formatPrice(t.item.value))+"\n            ")]),t._v(" "),e(f.b,{domProps:{innerHTML:t._s(t.item.subtitle)}})],1)],1)],1)],1)]}}])})}),[],!1,null,"068e46a4",null);e.default=component.exports},778:function(t,e,o){"use strict";o.r(e);var n=o(272),r=o(60),l=o(275),c=o(726),d=o(142),m=o(170),f=o(18),h=o(653),y=o(76),v={props:{item:{type:Object,default:null}},data:function(){return{}}},_=(o(741),o(46)),component=Object(_.a)(v,(function(){var t=this,e=t._self._c;return e(c.a,{scopedSlots:t._u([{key:"default",fn:function(o){var c=o.hover;return[e(n.a,{staticClass:"default",attrs:{elevation:c?3:1}},[e(y.a,{attrs:{flat:"",dense:""}},[e(r.d,{staticClass:"grey--text"},[e("span",[t._v(" "+t._s(t.item.title))])]),t._v(" "),e(h.a),t._v(" "),e(d.a,{attrs:{color:t.item.color},domProps:{textContent:t._s(t.item.icon)}})],1),t._v(" "),e(l.a),t._v(" "),e(r.c,{staticClass:"ma-0 py-0"},[e(m.a,{staticClass:"ma-0 pa-0",attrs:{dense:""}},[e(f.a,[e(f.c,{staticClass:"primary--text font-weight-light text-body-1"},[t._v(t._s(t.formatPrice(t.item.value))+"\n            ")]),t._v(" "),e(f.b,{domProps:{innerHTML:t._s(t.item.subtitle1)}})],1)],1),t._v(" "),e(m.a,{staticClass:"ma-0 pa-0",attrs:{dense:""}},[e(f.a,[e(f.c,{staticClass:"primary--text font-weight-normal text-body-1"},[t._v(t._s(t.formatPrice(t.item.amount))+" "),e(d.a,{attrs:{color:"primary",small:""}},[t._v("mdi-arrow-up")])],1),t._v(" "),e(f.b,{domProps:{innerHTML:t._s(t.item.subtitle2)}})],1)],1)],1)],1)]}}])})}),[],!1,null,"450b2fec",null);e.default=component.exports},779:function(t,e,o){"use strict";o.r(e);var n={props:{data:{type:Object,default:null},title:{type:String,default:null}},data:function(){return{options:{series:this.data.series,chart:{height:350,type:"line"},theme:{mode:"light",palette:"palette1",monochrome:{enabled:!0,color:"#2E294E",shadeTo:"dark",shadeIntensity:1}},stroke:{width:4,curve:"smooth"},xaxis:{type:"datetime",categories:this.data.categories,tickAmount:10},title:{text:null==this.title?"No. of bills per day":this.title,align:"left",style:{fontSize:"16px",color:"#666"}},fill:{type:"gradient",gradient:{shade:"dark",gradientToColors:["#FDD835"],shadeIntensity:1,type:"horizontal",opacityFrom:1,opacityTo:1,stops:[0,100,100,100]}},markers:{size:4,colors:["#FFA41B"],strokeColors:"#fff",strokeWidth:2,hover:{size:7}},yaxis:{min:0,title:{text:this.title}}}}}},r=o(46),component=Object(r.a)(n,(function(){var t=this;return(0,t._self._c)("apexchart",{attrs:{width:"98%",type:"line",options:t.options,series:t.options.series}})}),[],!1,null,null,null);e.default=component.exports},833:function(t,e,o){"use strict";o(759)},834:function(t,e,o){var n=o(16)((function(i){return i[1]}));n.push([t.i,".outlined[data-v-4f10d320]{border-color:blue!important;color:blue!important}",""]),n.locals={},t.exports=n},889:function(t,e,o){"use strict";o.r(e);var n=o(272),r=o(664),l=o(655),c=o(663),d=(o(10),o(7),o(13),o(14),o(11),o(0)),m=(o(5),o(9),o(777)),f=o(778),h=o(779),y=o(70);function v(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function _(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?v(Object(o),!0).forEach((function(e){Object(d.a)(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):v(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}var O={components:{"statistical-card":m.default,"transaction-card":f.default,"smooth-line-chart":h.default},data:function(){return{}},created:function(){this.$store.dispatch("get_bills_perday"),this.$store.dispatch("get_bills_summation"),this.$store.dispatch("get_transactions_perday"),this.$store.dispatch("get_transactions_summations")},computed:_(_({},Object(y.b)({billsperday:"billsperday",billsummation:"billsummation",transactionsperday:"transactionsperday",transactionsummation:"transactionsummation"})),{},{bills:{get:function(){return[{value:this.billsummation.totalNumberOfBillsToday,title:"No. bills today",subtitle:"Total number of bills today",icon:"mdi-currency-usd-circle",color:"black darken-2"},{value:this.billsummation.totalBillsAmountToday,title:"Amount of bills today",subtitle:"Total amount of bills today",icon:"mdi-layers-outline",color:"red darken-1"},{value:this.billsummation.totalBillsPaidAmountToday,title:"Amount paid today",subtitle:"Total amount of bills paid today",icon:"mdi-layers-outline",color:"red darken-1"},{value:this.billsummation.totalNumberOfBills,title:"No. of bills",subtitle:"Total number of bills",icon:"mdi-bitcoin",color:"blue"},{value:this.billsummation.totalBillsAmount,title:"Bills amount",subtitle:"Total of all bills amount",icon:"mdi-layers-outline",color:"red darken-1"},{value:this.billsummation.totalBillsPaidAmount,title:"Total paid bills",subtitle:"Amount paid from bills",icon:"mdi-barcode-scan",color:"blue darken-2"}]}},transactions:{get:function(){return[{value:this.transactionsummation.totalNumberOfTransactionsToday,amount:this.transactionsummation.totalTransactionAmountToday,title:"Transactions today",subtitle1:"Transactions",subtitle2:"Total amount",icon:"mdi-currency-usd-circle",color:"black darken-2"},{value:this.transactionsummation.totalNumberOfTransactionsLast7Days,amount:this.transactionsummation.totalTransactionAmountLast7Days,title:"Transactions in last 7 days",subtitle1:"Number of Transactions",subtitle2:"Total amount",icon:"mdi-contactless-payment-circle",color:"primary darken-1"},{value:this.transactionsummation.totalNumberOfTransactionsLast30Days,amount:this.transactionsummation.totalTransactionAmountLast30Days,title:"Transactions in last 30 days",subtitle1:"No. of transactions in last 30 days",subtitle2:"Transactions amount in last 30 days",icon:"mdi-wallet",color:"red darken-1"},{value:this.transactionsummation.totalNumberOfTransactions,amount:this.transactionsummation.totalTransactionAmount,title:"All transactions",subtitle1:"Number of all transactions",subtitle2:"Total amounts",icon:"mdi-barcode",color:"blue darken-2"}]}},transactiontrends:{get:function(){var t=this.transactionsperday,e=new Array,o=new Array;return void 0!==t&&t.forEach((function(element){e.push(element.numberOfTransactions);var t=element.transactionDate;o.push(new Date(t).toISOString())})),{series:[{name:"Number of Transactions per day",data:e}],categories:o}}},billtrends:{get:function(){var t=this.billsperday,e=new Array,o=new Array;return void 0!==t&&t.forEach((function(element){e.push(element.totalBills);var t=element.createdDate;o.push(new Date(t).toISOString())})),{series:[{name:"Number of bills per day",data:e}],categories:o}}}})},T=(o(833),o(46)),component=Object(T.a)(O,(function(){var t=this,e=t._self._c;return e(l.a,{attrs:{fluid:""}},[e(c.a,{attrs:{"no-gutters":"",wrap:""}},t._l(t.bills,(function(t,o){return e(r.a,{key:o,staticClass:"ma-0 pa-0 pr-2 pb-2",attrs:{sm:"12",md:"2",lg:"2",xl:"2"}},[e("statistical-card",{attrs:{item:t}})],1)})),1),t._v(" "),e(c.a,{attrs:{"no-gutters":""}},[e(r.a,{attrs:{cols:"12",md:"5",sm:"12"}},[e(n.a,{staticClass:"mr-1"},[e("smooth-line-chart",{attrs:{data:t.transactiontrends,title:"Number of transactions per day"}})],1)],1),t._v(" "),null!=t.billsperday?e(r.a,{staticClass:"pa-0 ma-0",attrs:{cols:"12",md:"5",sm:"12"}},[e(n.a,{staticClass:"ml-1"},[e("smooth-line-chart",{attrs:{data:t.billtrends,title:"Number of bills created per day"}})],1)],1):t._e(),t._v(" "),e(r.a,{staticClass:"ma-0 pa-0",attrs:{cols:"12",md:"2",sm:"12"}},t._l(t.transactions,(function(t,o){return e(r.a,{key:o,staticClass:"ma-0 pa-0 pl-2 pb-2"},[e("transaction-card",{attrs:{item:t}})],1)})),1)],1)],1)}),[],!1,null,"4f10d320",null);e.default=component.exports}}]);