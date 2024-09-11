(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{672:function(t,e,n){"use strict";var r=n(0),c=(n(10),n(7),n(53),n(37),n(13),n(14),n(11),n(5),n(219),n(55),n(9),n(51),n(6)),o=n(102),l=n(124),d=n(1);function f(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function h(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?f(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}e.a=Object(c.a)(o.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},n={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=input.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(input._uid)||(n.valid=e(input)))})):n.valid=e(input),n},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:h({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},Object(d.s)(this))}})},795:function(t,e,n){"use strict";n.r(e);var r=n(169),c=n(272),o=n(60),l=n(664),d=n(655),f=n(666),h=n(651),v=n(275),m=n(672),y=n(142),O=n(273),_=n(663),j=n(184),w=n(112),x=n(76),k=n(92),P=n(0),B=(n(7),n(10),n(53),n(13),n(14),n(11),n(5),n(9),n(51),n(70));function $(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function C(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?$(Object(n),!0).forEach((function(e){Object(P.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):$(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var D={components:{charges:n(293).default},props:{consultationsservices:{type:Array,default:null},transaction:{type:Object,default:null},isActive:{type:Boolean,default:!0}},data:function(){return{select:null,dialog:!1,service_transactions:null,type:"medicine",quantity:null,valid:!1,payload:{},data:{id:null,quantity:0,type:"medicine"},suffix:null,headers:[{text:"ID",value:"id",class:"primary"},{text:"Service",value:"medicineName",sortable:!0,class:"primary"},{text:"Department",value:"departmentName",class:"primary"},{text:"Amount",value:"amount",sortable:!1,class:"primary"},{text:"Currency",value:"currencyCode",class:"primary"},{text:"Reversed",value:"isReversed",sortable:!0,class:"primary"},{text:"Transaction Date",value:"transactionDate",class:"primary"}]}},methods:{fetch_medical_services:function(){this.$store.dispatch("getmedicines")},save:function(){var t=this;this.$refs.form.validate()&&(this.payload.route=this.$route.params.id,this.data.id=parseInt(this.data.id),this.data.quantity=parseInt(this.data.quantity),this.payload.data=this.data,this.$store.dispatch("initiate_medical_transaction",this.payload).then((function(e){setTimeout((function(){return t.$emit("update")}),t.delay_seconds)})),this.dialog=!1)},clear_select:function(){this.select=null},change_select:function(t){console.log(t);var e=this.medicines.find((function(e){return e.id===t}));this.suffix=void 0===e?"":e.unit}},computed:C(C({},Object(B.b)({medicines:"medicines"})),{},{transactions:function(){return this.transaction.transactions.filter((function(t){return null===t.medicalServiceName}))}})},E=n(46),component=Object(E.a)(D,(function(){var t=this,e=t._self._c;return e(d.a,[e(h.a,{attrs:{transition:"dialog-top-transition",width:"600"},scopedSlots:t._u([{key:"activator",fn:function(n){var c=n.on,o=n.attrs;return[t.isActive?e(r.a,t._g(t._b({staticClass:"button",attrs:{dark:""}},"v-btn",o,!1),c),[e(y.a,{attrs:{small:"",left:""}},[t._v("mdi-plus")]),t._v("Add patient medicine")],1):t._e()]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[t._v(" "),e(c.a,[e(x.a,{attrs:{color:"primary",dark:""}},[e(k.b,[t._v("Give new medicine to this patient")])],1),t._v(" "),e(d.a,[e(o.c,[e(m.a,{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[e(_.a,{staticClass:"mx-1"},[e(l.a,{attrs:{cols:"12",sm:"12",md:"6"}},[e(o.c,[e(j.a,{attrs:{items:t.medicines,"item-text":"name","item-value":"id",chips:"","small-chips":"",label:"Select Medicine",filled:"",rules:[function(t){return!!t||"Medicine is required!"}],required:"",clearable:"","persistent-hint":"","single-line":""},on:{click:[t.fetch_medical_services,function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"clear",void 0,e.key,void 0)?null:t.clear_select.apply(null,arguments)}],change:t.change_select},model:{value:t.data.id,callback:function(e){t.$set(t.data,"id",e)},expression:"data.id"}})],1)],1),t._v(" "),t.data.id?e(l.a,{attrs:{cols:"12",sm:"12",md:"6"}},[e(w.a,{staticClass:"mt-4",attrs:{label:"Quantity",type:"number",filled:"",min:"1",suffix:null===t.suffix?"":t.suffix,rules:[function(t){return!!t||"Quantity is required!"}],required:""},model:{value:t.data.quantity,callback:function(e){t.$set(t.data,"quantity",e)},expression:"data.quantity"}})],1):t._e()],1)],1)],1),t._v(" "),e(v.a),t._v(" "),e(o.a,{staticClass:"justify-end"},[e(r.a,{on:{click:function(e){t.dialog=!1}}},[t._v("Close")]),t._v(" "),e(r.a,{staticClass:"warning",on:{click:t.save}},[t._v("Save")])],1)],1)],1)],1),t._v(" "),e("div",[null==t.transaction?e(O.a,{attrs:{indeterminate:""}}):e(d.a,{staticClass:"ma-2",attrs:{fluid:""}},[e(f.a,{staticClass:"default",attrs:{dense:"",headers:t.headers,items:t.transactions,"mobile-breakpoint":"100"}})],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);