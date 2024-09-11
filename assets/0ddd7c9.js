(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{672:function(e,t,n){"use strict";var r=n(0),o=(n(10),n(7),n(53),n(37),n(13),n(14),n(11),n(5),n(219),n(55),n(9),n(51),n(6)),c=n(102),l=n(124),d=n(1);function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}t.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(e){var t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var e=this,t=function(input){return input.$watch("hasError",(function(t){e.$set(e.errorBag,input._uid,t)}),{immediate:!0})},n={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=input.$watch("shouldValidate",(function(r){r&&(e.errorBag.hasOwnProperty(input._uid)||(n.valid=t(input)))})):n.valid=t(input),n},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var e=this;this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var e=this.inputs.find((function(i){return i._uid===input._uid}));if(e){var t=this.watchers.find((function(i){return i._uid===e._uid}));t&&(t.valid(),t.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==e._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(e){var t=this;return e("form",{staticClass:"v-form",attrs:v({novalidate:!0},this.attrs$),on:{submit:function(e){return t.$emit("submit",e)}}},Object(d.s)(this))}})},798:function(e,t,n){"use strict";n.r(t);var r=n(169),o=n(272),c=n(60),l=n(664),d=n(655),m=n(666),v=n(880),f=n(651),h=n(672),_=n(142),y=n(282),x=n(254),I=n(663),k=n(184),w=n(653),O=n(112),D=n(76),j=n(92),$=(n(30),n(218),n(10),n(7),n(13),n(14),n(11),n(5),n(9),n(0)),N=(n(51),n(70));function C(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function P(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?C(Object(n),!0).forEach((function(t){Object($.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var A={props:{insurancecards:{type:Array,dafault:null},title:{type:String,default:"Active"},button:{type:String,default:"Active"},activelist:{type:Boolean,default:!0}},data:function(){return{search:null,valid:!1,editedIndex:-1,deletedialog:!1,select:null,date:(new Date).toISOString().substr(0,10),menu:!1,menu2:!1,headers:[{text:"ID",value:"id",class:"primary"},{text:"Insurance name",value:"insurance.name",class:"primary"},{text:"Client name",value:"patientName",class:"primary",sortable:!1},{text:"Client No.",value:"membershipNumber",class:"primary"},{text:"Active ? ",value:"isActive",class:"primary"},{text:"Gender",value:"sex",class:"primary"},{text:"Exipire Date",value:"expireDate",class:"primary"},{text:"Actions",value:"actions",class:"primary"}],items:[{title:"Edit",icon:"lead-pencil",icona:"lead-penci",color:"blue"},{title:"Delete",icon:"minus-circle",icona:"plus-circle",color:"red"}],dialog:!1,editedItem:{id:0,membershipNumber:"",voteNo:"",issuedDate:"",expireDate:"",codeNo:"",insuranceId:0,patientId:0}}},methods:{getSelected:function(e,t){"Edit"==e.title&&this.editItem(t),"Delete"==e.title&&(this.deletedialog=!0,this.itemtodelete=t),"View"==e.title&&this.navigateTo(t.id)},editItem:function(e){this.editedIndex=this.insurancecards.indexOf(e),this.editedItem=Object.assign({},e),delete this.editedItem.insurance,this.dialog=!0,this.editedItemId=e.id},deleteItem:function(){this.activelist?this.$store.dispatch("deactivate_patient_insurance_card",this.itemtodelete.id):this.$store.dispatch("activate_patient_insurance_card",this.itemtodelete.id),this.close()},navigateTo:function(e){this.$router.push("/insurances/".concat(e))},close:function(){var e=this;setTimeout((function(){e.$emit("update"),e.deletedialog=!1,e.dialog=!1}),this.delay_seconds)},save:function(){var e=this;this.editedIndex>-1?(this.editedItem.patientId=parseInt(this.$route.params.id),this.$store.dispatch("update_patient_insurance",this.editedItem)):(this.editedItem.patientId=parseInt(this.$route.params.id),delete this.editedItem.id,this.$store.dispatch("create_patient_insurance",this.editedItem).then((function(t){setTimeout((function(){return e.$emit("update")}),e.delay_seconds)}))),this.close()},showActive:function(){this.$emit("active")},handleClick:function(e){}},created:function(){this.$store.dispatch("get_insurance_companies")},computed:P(P({},Object(N.b)({insurances:"insurances"})),{},{formTitle:function(){return-1===this.editedIndex?"New insurance card":"Edit insurance card"}})},E=n(46),component=Object(E.a)(A,(function(){var e=this,t=e._self._c;return t("div",[e.insurancecards?t("div",{attrs:{md12:""}},[t(m.a,{attrs:{dense:"",headers:e.headers,items:e.insurancecards,search:e.search,width:"100%"},on:{"click:row":e.handleClick},scopedSlots:e._u([{key:"top",fn:function(){return[t(D.a,{attrs:{flat:"",dark:"",color:"primary"}},[t("h2",[t("strong",[e._v(e._s(e.title))])]),e._v(" "),t(w.a),e._v(" "),t(O.a,{staticClass:"mt-2",attrs:{"append-icon":"search",label:"Search...",outlined:"","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v("  \n          "),t(r.a,{staticClass:"button mb-1",attrs:{medium:""},on:{click:e.showActive}},[e._v("\n            "+e._s(e.button))]),e._v("  \n          "),t(f.a,{attrs:{"max-width":"900px"},scopedSlots:e._u([{key:"activator",fn:function(n){var o=n.on,c=n.attrs;return[e.isMdAndUp?t(r.a,e._g(e._b({staticClass:"button",attrs:{elevation:"1",medium:"","prepend-icon":"mdi-plus"}},"v-btn",c,!1),o),[t(_.a,{attrs:{left:""}},[e._v("mdi-plus")]),e._v(e._s(e.$t("label.button.newinsurancecard")))],1):t(r.a,e._g(e._b({staticClass:"button",attrs:{fab:"",dark:"",small:""}},"v-btn",c,!1),o),[t(_.a,{attrs:{dark:""}},[e._v(" mdi-plus ")])],1)]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),t(o.a,[t(h.a,{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(D.a,{attrs:{color:"primary",dark:"",flat:""}},[t(j.b,[t("span",{staticClass:"headline"},[e._v(e._s(e.formTitle))])])],1),e._v(" "),t(c.c,[t(d.a,[t(I.a,[t(l.a,{attrs:{cols:"12",sm:"12",md:"6"}},[t(O.a,{attrs:{placeholder:"e.g 11Y73M6839012V0",label:"Membership No."},model:{value:e.editedItem.membershipNumber,callback:function(t){e.$set(e.editedItem,"membershipNumber",t)},expression:"editedItem.membershipNumber"}})],1),e._v(" "),t(l.a,{attrs:{cols:"12",sm:"12",md:"6"}},[t(O.a,{attrs:{label:"Vote Number",autocomplete:"false",placeholder:"e.g.  1729407-121-32440"},model:{value:e.editedItem.voteNo,callback:function(t){e.$set(e.editedItem,"voteNo",t)},expression:"editedItem.voteNo"}})],1),e._v(" "),t(l.a,{attrs:{cols:"12",sm:"12",md:"6"}},[t(O.a,{attrs:{placeholder:"e.g 407-121-32440",label:"Code Number"},model:{value:e.editedItem.codeNo,callback:function(t){e.$set(e.editedItem,"codeNo",t)},expression:"editedItem.codeNo"}})],1),e._v(" "),t(l.a,{attrs:{cols:"12",sm:"6",md:"6"}},[t(k.a,{attrs:{items:e.insurances,"item-text":"name","item-value":"id",chips:"","small-chips":"",rules:[function(e){return!!e||"You must select one to continue!"}],label:"Insurance",required:"","persistent-hint":"","single-line":""},model:{value:e.editedItem.insuranceId,callback:function(t){e.$set(e.editedItem,"insuranceId",t)},expression:"editedItem.insuranceId"}})],1),e._v(" "),t(l.a,{attrs:{cols:"12",sm:"12",md:"6"}},[t(y.a,{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":e.date,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"290px"},on:{"update:returnValue":function(t){e.date=t},"update:return-value":function(t){e.date=t}},scopedSlots:e._u([{key:"activator",fn:function(n){var r=n.on,o=n.attrs;return[t(O.a,e._g(e._b({attrs:{label:"Issued date","prepend-icon":"mdi-calendar",readonly:"",rules:[function(e){return!!e||"Date is required"}],required:""},model:{value:e.editedItem.issuedDate,callback:function(t){e.$set(e.editedItem,"issuedDate",t)},expression:"editedItem.issuedDate"}},"v-text-field",o,!1),r))]}}]),model:{value:e.menu,callback:function(t){e.menu=t},expression:"menu"}},[e._v(" "),t(v.a,{attrs:{"no-title":"",scrollable:"",required:""},on:{input:function(t){e.menu=!1}},model:{value:e.editedItem.issuedDate,callback:function(t){e.$set(e.editedItem,"issuedDate",t)},expression:"editedItem.issuedDate"}},[t(w.a),e._v(" "),t(r.a,{attrs:{text:"",color:"primary"},on:{click:function(t){e.menu=!1}}},[e._v("\n                              Cancel\n                            ")]),e._v(" "),t(r.a,{attrs:{text:"",color:"primary"},on:{click:function(t){return e.$refs.menu.save(e.date)}}},[e._v("\n                              OK\n                            ")])],1)],1)],1),e._v(" "),t(l.a,{attrs:{cols:"12",sm:"12",md:"6"}},[t(y.a,{ref:"menu2",attrs:{"close-on-content-click":!1,"return-value":e.date,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"290px"},on:{"update:returnValue":function(t){e.date=t},"update:return-value":function(t){e.date=t}},scopedSlots:e._u([{key:"activator",fn:function(n){var r=n.on,o=n.attrs;return[t(O.a,e._g(e._b({attrs:{label:"Expired date","prepend-icon":"mdi-calendar",readonly:"",rules:[function(e){return!!e||"Date is required"}],required:""},model:{value:e.editedItem.expireDate,callback:function(t){e.$set(e.editedItem,"expireDate",t)},expression:"editedItem.expireDate"}},"v-text-field",o,!1),r))]}}]),model:{value:e.menu2,callback:function(t){e.menu2=t},expression:"menu2"}},[e._v(" "),t(v.a,{attrs:{"no-title":"",scrollable:"",required:""},on:{input:function(t){e.menu2=!1}},model:{value:e.editedItem.expireDate,callback:function(t){e.$set(e.editedItem,"expireDate",t)},expression:"editedItem.expireDate"}},[t(w.a),e._v(" "),t(r.a,{attrs:{text:"",color:"primary"},on:{click:function(t){e.menu2=!1}}},[e._v("\n                              Cancel\n                            ")]),e._v(" "),t(r.a,{attrs:{text:"",color:"primary"},on:{click:function(t){return e.$refs.menu2.save(e.date)}}},[e._v("\n                              OK\n                            ")])],1)],1)],1)],1)],1)],1),e._v(" "),t(c.a,[t(w.a),e._v(" "),t(r.a,{attrs:{color:"primary",medium:""},on:{click:function(t){return t.stopPropagation(),e.close.apply(null,arguments)}}},[e._v(e._s(e.$t("label.button.decline")))]),e._v(" "),t(r.a,{attrs:{color:"warning",medium:""},on:{click:function(t){return t.stopPropagation(),e.save.apply(null,arguments)}}},[e._v(e._s(e.$t("label.button.btnsave")))])],1)],1)],1)],1),e._v(" "),t(f.a,{attrs:{persistent:"","max-width":"590"},model:{value:e.deletedialog,callback:function(t){e.deletedialog=t},expression:"deletedialog"}},[t(o.a,[e.activelist?t(c.d,{staticClass:"text-h5"},[e._v("\n                Deactivate this insurance\n              ")]):t(c.d,{staticClass:"text-h5"},[e._v("\n                Activate this insurance\n              ")]),e._v(" "),e.activelist?t(c.c,[e._v("Are you sure you want to deactivate this insurance. Click\n                'Yes' to deactivate or 'No' to ignore\n              ")]):t(c.c,[e._v("Are you sure you want to activate this insurance. Click 'Yes'\n                to activate or 'No' to ignore\n              ")]),e._v(" "),t(c.a,[t(w.a),e._v(" "),t(r.a,{attrs:{color:"primary",medium:""},on:{click:function(t){e.deletedialog=!1}}},[e._v("\n                  No\n                ")]),e._v(" "),t(r.a,{attrs:{color:"warning",medium:""},on:{click:e.deleteItem}},[e._v("\n                  Yes\n                ")])],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(n){var r=n.item;return[t("td",{staticClass:"none-clickable",on:{click:function(e){e.stopPropagation()}}},e._l(e.items,(function(n,i){return t(_.a,{key:i,staticClass:"mr-2",attrs:{medium:"",color:n.color},on:{click:function(t){return e.getSelected(n,r)}}},[e._v("\n            mdi-"+e._s(e.activelist?n.icon:n.icona)+"\n          ")])})),1)]}},{key:"item.isActive",fn:function(n){return[n.item.isActive?t(_.a,{staticClass:"font-weight-black",attrs:{color:"primary"}},[e._v("\n          mdi-check\n        ")]):t(_.a,{staticClass:"font-weight-black",attrs:{color:"primary"}},[e._v("\n          mdi-close\n        ")])]}},{key:"no-data",fn:function(){return[t("p",{staticClass:"mt-2"},[e._v("No Data available")])]},proxy:!0}],null,!0)})],1):t(x.a,{attrs:{indeterminate:"",color:"grey lighten-5",size:"16"}})],1)}),[],!1,null,null,null);t.default=component.exports}}]);