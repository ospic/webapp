(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{794:function(e,t,r){"use strict";r.r(t);var c=r(169),n=r(272),l=r(60),o=r(655),d=r(666),v=r(651),m=r(275),f=r(142),y=r(273),h=r(184),_=r(76),O=(r(10),r(13),r(14),r(11),r(9),r(0)),j=(r(7),r(5),r(51),r(70));function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,c)}return r}function k(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach((function(t){Object(O.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var x={components:{charges:r(293).default},props:{consultationsservices:{type:Array,default:null},transaction:{type:Object,default:null},isActive:{type:Boolean,default:!0}},data:function(){return{select:null,dialog:!1,service_transactions:null,type:"service",service:null,payload:{},data:{id:null,quantity:0,type:"service"},headers:[{text:"ID",value:"id",class:"primary"},{text:"Service",value:"medicalServiceName",sortable:!0,class:"primary"},{text:"Department",value:"departmentName",class:"primary"},{text:"Amount",value:"amount",sortable:!1,class:"primary"},{text:"Currency",value:"currencyCode",class:"primary"},{text:"Reversed",value:"isReversed",sortable:!0,class:"primary"},{text:"Transaction Date",value:"transactionDate",class:"primary"}]}},methods:{fetch_medical_services:function(){this.$store.dispatch("get_medical_services")},fetch_medical_types:function(e){this.$store.dispatch("get_medical_services_by_type",e)},update_service:function(e){this.data.id=parseInt(e)},save:function(){var e=this;this.payload.route=this.$route.params.id,this.data.quantity=parseInt(1),this.payload.data=this.data,this.$store.dispatch("initiate_medical_transaction",this.payload).then((function(t){setTimeout((function(){return e.$emit("update")}),e.delay_seconds)})),this.dialog=!1}},computed:k(k({},Object(j.b)({medicalservices:"medicalservices",servicetypes:"servicetypes"})),{},{transactions:function(){return this.transaction.transactions.filter((function(e){return null!==e.medicalServiceName}))}})},C=r(46),component=Object(C.a)(x,(function(){var e=this,t=e._self._c;return t(o.a,[t(v.a,{attrs:{transition:"dialog-top-transition",width:"600"},scopedSlots:e._u([{key:"activator",fn:function(r){var n=r.on,l=r.attrs;return[e.isActive?t(c.a,e._g(e._b({staticClass:"button",attrs:{dark:""}},"v-btn",l,!1),n),[t(f.a,{attrs:{small:"",left:""}},[e._v("mdi-plus")]),e._v("Add patient service")],1):e._e()]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),t(n.a,[t(_.a,{attrs:{color:"primary",dark:""}},[e._v("Add new service's received by this patient")]),e._v(" "),t(l.c,[t(h.a,{attrs:{items:e.servicetypes,"item-text":"name","item-value":"id",chips:"","small-chips":"",rules:[function(e){return!!e||"You must select one to continue!"}],label:"Medical services",required:"","persistent-hint":"","single-line":""},on:{click:e.fetch_medical_service_types,change:e.fetch_medical_types},model:{value:e.service,callback:function(t){e.service=t},expression:"service"}}),e._v(" "),t(h.a,{attrs:{items:e.medicalservices,"item-text":"name","item-value":"id",chips:"","small-chips":"",disabled:e.medicalservices.length<=0,rules:[function(e){return!!e||"You must select one to continue!"}],label:e.medicalservices.length>0?"Medical services":"Selected category have no medical services",required:"","persistent-hint":"","single-line":""},on:{change:e.update_service},model:{value:e.select,callback:function(t){e.select=t},expression:"select"}})],1),e._v(" "),t(m.a),e._v(" "),t(l.a,{staticClass:"justify-end"},[t(c.a,{on:{click:function(t){e.dialog=!1}}},[e._v("Close")]),e._v(" "),t(c.a,{staticClass:"warning",on:{click:e.save}},[e._v("Save")])],1)],1)],1),e._v(" "),t("div",[null==e.transaction?t(y.a,{attrs:{indeterminate:""}}):t(o.a,{staticClass:"ma-2",attrs:{fluid:""}},[t(d.a,{staticClass:"default",attrs:{dense:"",headers:e.headers,items:e.transactions,"mobile-breakpoint":"100"}})],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);