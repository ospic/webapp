(window.webpackJsonp=window.webpackJsonp||[]).push([[4,21,22,23,26],{676:function(t,e,n){"use strict";n.r(e);var r=n(272),c=n(664),l=n(666),o=n(142),d=n(254),m=n(653),v=n(112),f=n(76),_=n(657),h=(n(30),n(218),{props:{services:{type:Array,default:null},title:{type:String,default:"Services"}},data:function(){return{search:null,headers:[{text:"ID",value:"id",class:"primary"},{text:"Patient Name",value:"patientName",class:"primary",sortable:!1},{text:"Consultant",value:"staffName",class:"primary"},{text:"Is Active?",value:"isActive",class:"primary"},{text:"From",value:"fromDate",class:"primary"},{text:"To",value:"toDate",class:"primary"}],body:{options:{page:1,itemsPerPage:5,sortBy:["patientName"]}}}},methods:{handleClick:function(t){this.$router.push("/consultations/"+t.id)},updatePagination:function(t){console.log(t)}}}),y=n(46),component=Object(y.a)(h,(function(){var t=this,e=t._self._c;return e(r.a,{staticClass:"mx-auto default"},[null==t.services.length?e(d.a,{attrs:{indeterminate:"",color:"grey lighten-5",size:"16"}}):e("div",{attrs:{md12:""}},[e(l.a,{attrs:{dense:"",headers:t.headers,items:t.services,search:t.search,width:"100%"},on:{"click:row":t.handleClick,"update:page":t.updatePagination},scopedSlots:t._u([{key:"top",fn:function(){return[e(f.a,{attrs:{flat:"",color:"primary",dark:""}},[e("span",{staticClass:"text-h4 white--text"},[t._v(t._s(t.$t(t.title)))]),t._v(" "),e(m.a),t._v(" "),e(c.a,{attrs:{cols:"12",md:"3"}},[e(v.a,{staticClass:"search mr-2",attrs:{"prepend-inner-icon":"mdi-magnify",label:"Search group by name, id","single-line":"","hide-details":"",outlined:"",filled:"",rounded:"",height:"40",dense:"",clearable:"",autocomplete:"off",light:""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)],1)]},proxy:!0},{key:"item.isActive",fn:function(n){return[n.item.isActive?e(_.a,{attrs:{right:"",color:"primary"},scopedSlots:t._u([{key:"activator",fn:function(n){var r=n.on,c=n.attrs;return[e(o.a,t._g(t._b({attrs:{small:"",color:"red lighten-2"}},"v-icon",c,!1),r),[t._v("mdi-check")])]}}],null,!0)},[t._v(" "),e("span",[t._v("Active")])]):e("div")]}},{key:"item.patientName",fn:function(e){var n=e.item;return[t._v("\n        "+t._s(n.patientName)+" ( "+t._s(n.patientId)+")\n      ")]}},{key:"item.staffName",fn:function(n){var r=n.item;return[null==r.staffName?e("p",[t._v("Unassigned")]):e("p",[t._v(t._s(r.staffName)+" ( "+t._s(r.staffId)+")")])]}}],null,!0)})],1)],1)}),[],!1,null,null,null);e.default=component.exports},731:function(t,e,n){"use strict";n.r(e);var r=n(169),c=n(272),l=n(60),o=n(693),d=n(664),m=n(142),v=n(663),f=n(184),_=n(371),h=n(653),y=n(112),k=(n(33),{props:{patient:{type:Object,default:null}},data:function(){return{edit:!1,patientcp:this.patient,gender:["Male","Female","Unspecified"],bloodgroup:["A+","A-","B+","B-","AB+","AB-","O+","O-","Unspecified"],marriageStatus:["Single","Married","Seperated","Widowed","Unspecified"]}},methods:{submit:function(){var t=this;delete this.patientcp.contactsInformation,this.$store.dispatch("update_patient",this.patientcp).then((function(){t.edit=!1,t.fetchclientdata(t.$route.params.id)}))}}}),x=n(46),component=Object(x.a)(k,(function(){var t=this,e=t._self._c;return e(c.a,{staticClass:"mx-auto default",attrs:{flat:""}},[e(l.c,[e(v.a,[e(h.a),t._v(" "),e(d.a,{attrs:{cols:"12",md:"1",sm:"1"}},[e(r.a,{staticClass:"mb-1",attrs:{color:"primary",fab:"",small:""},on:{click:function(e){t.edit=!t.edit}}},[e(m.a,[t._v("mdi-account-edit")])],1)],1),t._v(" "),e(d.a,{attrs:{cols:"12",md:"12",sm:"12"}},[e(_.a,{attrs:{dense:""},scopedSlots:t._u([{key:"default",fn:function(){return[e("tbody",[t.patient.id?e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"id"}},[t._v("ID:")]),t._v(" "),e("td",[t._v(t._s(t.patient.id))])]):t._e(),t._v(" "),t.patient.name?e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"name"}},[t._v("Full Name:")]),t._v(" "),e("td",[t.edit?e(y.a,{attrs:{dense:"",counter:"100"},model:{value:t.patientcp.name,callback:function(e){t.$set(t.patientcp,"name",e)},expression:"patientcp.name"}}):e("p",[t._v(t._s(t.patient.name))])],1)]):t._e(),t._v(" "),t.patient.gender?e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"gender"}},[t._v("Gender:")]),t._v(" "),t.edit?e("td",[e(f.a,{attrs:{items:t.gender,"menu-props":{top:!0,offsetY:!0},label:"Select gender"},model:{value:t.patientcp.gender,callback:function(e){t.$set(t.patientcp,"gender",e)},expression:"patientcp.gender"}})],1):e("td",[t._v(t._s(t.patient.gender))])]):t._e(),t._v(" "),t.patient.age?e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"age"}},[t._v("Age:")]),t._v(" "),e("td",[t.edit?e(y.a,{attrs:{dense:""},model:{value:t.patientcp.age,callback:function(e){t.$set(t.patientcp,"age",e)},expression:"patientcp.age"}}):e("p",[t._v(t._s(t.patient.age))])],1)]):t._e(),t._v(" "),t.patient.phone?e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"phone"}},[t._v("Phone No.")]),t._v(" "),e("td",[t.edit?e(y.a,{attrs:{dense:"",counter:"15"},model:{value:t.patientcp.phone,callback:function(e){t.$set(t.patientcp,"phone",e)},expression:"patientcp.phone"}}):e("p",[t._v(t._s(t.patient.phone))])],1)]):t._e(),t._v(" "),t.patient.address?e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"address"}},[t._v("Address.")]),t._v(" "),e("td",[t.edit?e(y.a,{attrs:{dense:"",counter:"200"},model:{value:t.patientcp.address,callback:function(e){t.$set(t.patientcp,"address",e)},expression:"patientcp.address"}}):e("p",[t._v(t._s(t.patient.address))])],1)]):t._e(),t._v(" "),t.patient.emailAddress?e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"email"}},[t._v("Email Address.")]),t._v(" "),e("td",[t.edit?e(y.a,{attrs:{dense:"",counter:"254"},model:{value:t.patientcp.emailAddress,callback:function(e){t.$set(t.patientcp,"emailAddress",e)},expression:"patientcp.emailAddress"}}):e("p",[t._v(t._s(t.patient.emailAddress))])],1)]):t._e(),t._v(" "),t.patient.guardianName?e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"guardian"}},[t._v("\n                  Guardian Name.\n                ")]),t._v(" "),e("td",[t.edit?e(y.a,{attrs:{dense:"",counter:"100"},model:{value:t.patientcp.guardianName,callback:function(e){t.$set(t.patientcp,"guardianName",e)},expression:"patientcp.guardianName"}}):e("p",[t._v(t._s(t.patient.guardianName))])],1)]):t._e(),t._v(" "),t.patient.createdDate?e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"createddate"}},[t._v("\n                  Created Date:\n                ")]),t._v(" "),e("td",[t._v(t._s(t.patient.createdDate))])]):t._e(),t._v(" "),t.patient.bloodPressure?e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"bp"}},[t._v("BP:")]),t._v(" "),e("td",[t.edit?e(y.a,{attrs:{dense:""},model:{value:t.patientcp.bloodPressure,callback:function(e){t.$set(t.patientcp,"bloodPressure",e)},expression:"patientcp.bloodPressure"}}):e("p",[t._v(t._s(t.patient.bloodPressure))])],1)]):t._e(),t._v(" "),t.patient.bloodGroup?e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"bloodgroup"}},[t._v("\n                  Blood group:\n                ")]),t._v(" "),e("td",[t.edit?e(f.a,{attrs:{items:t.bloodgroup,"menu-props":{top:!0,offsetY:!0},label:"Select bloodgroup"},model:{value:t.patientcp.bloodGroup,callback:function(e){t.$set(t.patientcp,"bloodGroup",e)},expression:"patientcp.bloodGroup"}}):e("p",[t._v(t._s(t.patient.bloodGroup))])],1)]):t._e(),t._v(" "),t.patient.height?e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"height"}},[t._v("Height:")]),t._v(" "),e("td",[t.edit?e(y.a,{attrs:{dense:"",counter:"10"},model:{value:t.patientcp.height,callback:function(e){t.$set(t.patientcp,"height",e)},expression:"patientcp.height"}}):e("p",[t._v(t._s(t.patient.height))])],1)]):t._e(),t._v(" "),t.patient.weight?e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"weight"}},[t._v("Weight:")]),t._v(" "),e("td",[t.edit?e(y.a,{attrs:{dense:"",counter:"10"},model:{value:t.patientcp.weight,callback:function(e){t.$set(t.patientcp,"weight",e)},expression:"patientcp.weight"}}):e("p",[t._v(t._s(t.patient.weight))])],1)]):t._e(),t._v(" "),t.patient.marriageStatus?e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"marriage"}},[t._v("\n                  Maritial Status:\n                ")]),t._v(" "),e("td",[t.edit?e(f.a,{attrs:{items:t.marriageStatus,"menu-props":{top:!0,offsetY:!0},label:"Select Marriage Status"},model:{value:t.patientcp.marriageStatus,callback:function(e){t.$set(t.patientcp,"marriageStatus",e)},expression:"patientcp.marriageStatus"}}):e("p",[t._v(t._s(t.patient.marriageStatus))])],1)]):t._e(),t._v(" "),e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"isamitted"}},[t._v("\n                  Is Admitted ?\n                ")]),t._v(" "),e("td",[e(o.a,{attrs:{readonly:"",dense:""},model:{value:t.patientcp.isAdmitted,callback:function(e){t.$set(t.patientcp,"isAdmitted",e)},expression:"patientcp.isAdmitted"}})],1)]),t._v(" "),e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"isamitted"}},[t._v("\n                  Have user account ?\n                ")]),t._v(" "),e("td",[e(o.a,{attrs:{readonly:"",dense:""},model:{value:t.patientcp.hasSelfServiceUserAccount,callback:function(e){t.$set(t.patientcp,"hasSelfServiceUserAccount",e)},expression:"patientcp.hasSelfServiceUserAccount"}})],1)]),t._v(" "),t.patient.allergies?e("tr",[e("td",{staticClass:"font-weight-black",attrs:{id:"allergies"}},[t._v("Allergies:")]),t._v(" "),e("td",[t.edit?e(y.a,{attrs:{dense:"",counter:"550"},model:{value:t.patientcp.allergies,callback:function(e){t.$set(t.patientcp,"allergies",e)},expression:"patientcp.allergies"}}):e("p",[t._v(t._s(t.patient.allergies))])],1)]):t._e(),t._v(" "),t.edit?e("tr",[e("td"),t._v(" "),e("td",[e(r.a,{staticClass:"primary",attrs:{small:""},on:{click:function(e){return e.stopPropagation(),t.submit.apply(null,arguments)}}},[t._v("Edit")])],1)]):t._e()])]},proxy:!0}])})],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports},733:function(t,e,n){"use strict";n.r(e);var r=n(275),c=n(276),l=n(170),o=n(278),d={props:["type"]},m=n(46),component=Object(m.a)(d,(function(){var t=this,e=t._self._c;return e(c.a,{staticClass:"ma-0"},[e(l.a,{staticClass:"ma-0 pa-0"},[e(o.a,{staticClass:"grey--text ma-0 mr-1 pa-1",attrs:{size:"45px"}},[e("span",{staticClass:"font-weight-regular text-caption text-uppercase black--text"},[t._v(t._s(t.type))])]),t._v(" "),e(r.a)],1)],1)}),[],!1,null,null,null);e.default=component.exports},734:function(t,e,n){"use strict";n.r(e);var r=n(169),c=n(170),l=n(18),o={props:["address"],data:function(){return{}},created:function(){console.log(this.address)}},d=n(46),component=Object(d.a)(o,(function(){var t=this,e=t._self._c;return e("div",[e(c.a,{attrs:{"three-line":""}},[e(l.a,{staticClass:"ma-0"},[e(l.c,{staticClass:"font-weight-bold"},[e("span",{staticClass:"text-subtitle-2 font-weight-bold"},[t._v(t._s(t.address.state))]),t._v("    \n        "),e(r.a,{staticClass:"mb-1 primary--text",attrs:{small:"",depressed:"",color:"primary lighten-4"}},[t._v(t._s(t.address.zipcode))])],1),t._v(" "),e(l.b,{staticClass:"font-weight-light text-caption"},[t._v("\n        "+t._s(t.address.city)+"\n      ")]),t._v(" "),e(l.b,{staticClass:"font-weight-light text-caption"},[t._v("\n        "+t._s(t.address.physical_address)+"\n      ")])],1)],1),t._v(" "),e(c.a,{attrs:{"three-line":""}},[e(l.a,[e(l.c,[t._v("Contact Details")]),t._v(" "),e(l.b,{staticClass:"font-weight-light text-caption"},[e("strong",[t._v("Mobile Phone: ")]),t._v("   "+t._s(t.address.work_phone)),e("br"),t._v(" "),e("strong",[t._v(" Home Phone:")]),t._v("   "+t._s(t.address.home_phone)+"\n      ")]),t._v(" "),e(l.b,{staticClass:"font-weight-light text-caption"},[e("strong",[t._v("Email Address: ")]),t._v("  "+t._s(t.address.email_address)+"\n      ")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports},735:function(t,e,n){"use strict";n.r(e);var r=n(655),c=n(666),l=n(142),o=n(254),d=n(657),m=(n(30),n(218),{components:{"service-card":n(676).default},props:{services:{type:Array,default:null}},data:function(){return{search:null,headers:[{text:"Status",value:"isActive",class:"primary"},{text:"ID",value:"id",class:"primary"},{text:"Patient Name",value:"patientName",class:"primary",sortable:!1},{text:"Consultant",value:"staffName",class:"primary"},{text:"From",value:"fromDate",class:"primary"},{text:"To",value:"toDate",class:"primary"},{text:"Status",value:"status",class:"primary"}],body:{options:{page:1,itemsPerPage:5,sortBy:["patientName"]}}}},methods:{handleClick:function(t){this.$router.push("/consultations/"+t.id)},updatePagination:function(t){console.log(t)}}}),v=n(46),component=Object(v.a)(m,(function(){var t=this,e=t._self._c;return e(r.a,{attrs:{fluid:""}},[null==t.services?e(o.a,{attrs:{indeterminate:"",color:"grey",size:"24"}}):e("div",[e(c.a,{staticClass:"default",attrs:{dense:"",headers:t.headers,items:t.services,search:t.search,"mobile-breakpoint":"100"},on:{"click:row":t.handleClick,"update:page":t.updatePagination},scopedSlots:t._u([{key:"item.isActive",fn:function(n){return[n.item.isActive?e(d.a,{attrs:{right:"",color:"primary"},scopedSlots:t._u([{key:"activator",fn:function(n){var r=n.on,c=n.attrs;return[e(l.a,t._g(t._b({attrs:{small:"",color:"blue lighten-2"}},"v-icon",c,!1),r),[t._v("mdi-check-circle")])]}}],null,!0)},[t._v(" "),e("span",[t._v("Active")])]):e(d.a,{attrs:{right:"",color:"warning"},scopedSlots:t._u([{key:"activator",fn:function(n){var r=n.on,c=n.attrs;return[e(l.a,t._g(t._b({attrs:{small:"",color:"red lighten-2"}},"v-icon",c,!1),r),[t._v("mdi-close-circle")])]}}],null,!0)},[t._v(" "),e("span",[t._v("Closed")])])]}},{key:"item.patientName",fn:function(e){var n=e.item;return[t._v("\n        "+t._s(n.patientName)+" ( "+t._s(n.patientId)+")\n      ")]}},{key:"item.status",fn:function(n){return[n.item.isAdmitted?e(d.a,{attrs:{right:"",color:"primary"},scopedSlots:t._u([{key:"activator",fn:function(n){var r=n.on,c=n.attrs;return[e(l.a,t._g(t._b({attrs:{small:""}},"v-icon",c,!1),r),[t._v("mdi-bed-outline")])]}}],null,!0)},[t._v(" "),e("span",[t._v("Admitted")])]):e("div")]}},{key:"item.staffName",fn:function(n){var r=n.item;return[null==r.staffName?e("p",[t._v("Unassigned")]):e("p",[t._v(t._s(r.staffName)+" ( "+t._s(r.staffId)+")")])]}}],null,!0)})],1)],1)}),[],!1,null,null,null);e.default=component.exports},774:function(t,e,n){var content=n(869);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(17).default)("98e3b356",content,!0,{sourceMap:!1})},798:function(t,e,n){"use strict";n.r(e);var r=n(169),c=n(272),l=n(60),o=n(281),d=n(664),m=n(655),v=n(651),f=n(275),_=n(718),h=n(725),y=n(142),k=n(215),x=n(276),w=n(170),I=n(278),C=n(18),$=n(145),S=n(254),A=n(663),P=n(653),N=n(880),D=n(951),O=n(947),j=n(875),T=(n(33),n(2)),E=(n(23),n(7),n(47),n(222),n(5),n(731)),M=n(733),z=n(735),R=n(734),U=n(799),F={props:{userdata:{type:Object,default:null}},components:{"v-type-divider":M.default,"tb-biograph":E.default,"tb-services":z.default,"v-address-card":R.default,"tb-insurance":U.default},data:function(){return{dialog:!1,uploaddialog:!1,currentFile:void 0,rate:!1,tab:null,valid:!0,rating:2,posts:null,comments:null,admissions:null,followings:null,followers:null,selectedstaffId:null,active:!0,date:(new Date).toISOString().substr(0,7),menu:!1,modal:!1,emptyIcon:"mdi-star-outline",fullIcon:"mdi-star",halfIcon:"mdi-star-half-full",address:null,staff:null,services:[],cards:[],diagnoses:null,attrs:{class:"mb-6",boilerplate:!0,elevation:2},profileImage:1}},created:function(){this.address=this.userdata.contactsInformation,this.staff=this.userdata.staff,this.$store.dispatch("fetchAllStaffs")},computed:{entityThumbNail:function(){return this.$api.defaults.baseURL+"patients/"+this.userdata.id+"/images"},staffs:{get:function(){return this.$store.getters.staffs}},insurancecards:function(){var t=this.cards.filter((function(t){return t.isActive})),e=this.cards.filter((function(t){return!t.isActive}));return this.active?t:e}},methods:{selectFile:function(t){this.progress=0,this.currentFile=t},uploadPatientImage:function(){var t=this;return Object(T.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("file",t.currentFile),e.next=4,t.$api.$patch("/patients/".concat(t.$route.params.id,"/images/"),n).then((function(e){null!==e&&(t.uploaddialog=!1,t.profileImage=t.profileImage+1,t.$emit("update-profile"))})).catch((function(t){console.log(t)}));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})))()},deletePatientProfilePic:function(){var t=this;return Object(T.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$api.$delete("/patients/".concat(t.$route.params.id,"/images/")).then((function(e){null!==e&&(t.profileImage=t.profileImage-1,t.$emit("update-profile"))})).catch((function(t){console.log(t)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))()},initiateServiceInstance:function(){var t=this;return Object(T.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$api.$post("consultations/".concat(t.$route.params.id)).then((function(e){null!==e&&(t.getPatientServices(),t.$emit("update-profile"))})).catch((function(t){console.log(t)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))()},getPatientServices:function(t){var e=this;return Object(T.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$api.$get("consultations/patient/".concat(e.$route.params.id),{params:{active:t}}).then((function(t){null!==t&&(e.services=t.sort((function(a,b){return b.isActive-a.isActive})))})).catch((function(t){console.log(t)}));case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),n)})))()},getPatientInsurances:function(){var t=this;return Object(T.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$api.$get("insurance/cards/patient/".concat(t.$route.params.id)).then((function(e){null!==e&&(t.cards=e)})).catch((function(t){console.log(t)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))()},get_average_rgb:function(img){var t=document.createElement("canvas").getContext("2d");if("string"==typeof img){var e=img;(img=new Image).setAttribute("crossOrigin",""),img.src=e}return t.imageSmoothingEnabled=!0,t.drawImage(img,0,0,1,1),t.getImageData(1,1,1,1).data.slice(0,3)}}},B=(n(868),n(46)),component=Object(B.a)(F,(function(){var t=this,e=t._self._c;return e(m.a,{attrs:{"fill-height":"",fluid:"","grid-list-xl":""}},[e(A.a,[e(d.a,{attrs:{xs:"12",md:"3",sm:"12"}},[e(c.a,{attrs:{flat:""}},[e(k.a,{key:t.profileImage,staticClass:"grey lighten-2 align-end",attrs:{src:t.entityThumbNail,"lazy-src":"https://www.attendanceworks.org/wp-content/uploads/2020/09/img-placeholder.png","aspect-ratio":"1",height:"200px","max-height":"200px"},scopedSlots:t._u([{key:"placeholder",fn:function(){return[e(A.a,{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[e(S.a,{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}])},[t._v(" "),e(l.d,[e(x.a,{staticClass:"default",attrs:{"three-line":"",flat:"",width:"100%"}},[e(w.a,[e(I.a,{attrs:{size:"60"}},[e(k.a,{attrs:{src:t.entityThumbNail,"lazy-src":"https://aosa.org/wp-content/uploads/2019/04/image-placeholder-350x350.png"}})],1),t._v(" "),e(C.a,[e(C.c,[t._v(" "+t._s(t.userdata.name))]),t._v(" "),t.userdata?e(C.b,{domProps:{innerHTML:t._s(t.userdata.address)}}):e(C.b,{domProps:{innerHTML:t._s(t.userdata.country)}})],1),t._v(" "),e($.a,[e("div",{staticClass:"text-center"},[e(v.a,{attrs:{persistent:"",width:"600"},scopedSlots:t._u([{key:"activator",fn:function(n){var c=n.on,l=n.attrs;return[null!=t.userdata.patientPhoto?e(r.a,{attrs:{color:"warning",fab:"","x-small":"",dark:""},on:{click:function(e){return e.stopPropagation(),t.deletePatientProfilePic()}}},[e(y.a,[t._v("mdi-trash-can-outline")])],1):e(r.a,t._g(t._b({staticClass:"button",attrs:{fab:"",dark:"","x-small":""}},"v-btn",l,!1),c),[e(y.a,[t._v("mdi-progress-upload")])],1)]}}]),model:{value:t.uploaddialog,callback:function(e){t.uploaddialog=e},expression:"uploaddialog"}},[t._v(" "),e(c.a,[e(l.d,{staticClass:"headline"},[t._v("\n                          Changing "+t._s(t.userdata.name)+"\n                          profile picture\n                        ")]),t._v(" "),e(l.c,[e(_.a,{attrs:{label:"Profile picture",accept:"image/png, image/jpeg, image/bmp","prepend-icon":"mdi-camera","show-size":""},on:{change:t.selectFile},scopedSlots:t._u([{key:"selection",fn:function(n){var text=n.text;return[e(o.a,{attrs:{small:"",label:"",color:"primary"}},[t._v("\n                                "+t._s(text)+"\n                              ")])]}}])})],1),t._v(" "),e(f.a),t._v(" "),e(l.a,[e(P.a),t._v(" "),e(r.a,{attrs:{color:"primary",medium:""},on:{click:function(e){e.stopPropagation(),t.uploaddialog=!1}}},[t._v("\n                            "+t._s(t.$t("label.button.btncancel"))+"\n                          ")]),t._v(" "),e(r.a,{attrs:{medium:"",shaped:""},on:{click:function(e){return t.uploadPatientImage()}}},[t._v("\n                            "+t._s(t.$t("label.button.btnsave"))+"\n                          ")])],1)],1)],1)],1)])],1)],1)],1)],1),t._v(" "),e(l.c,[e("p",{staticClass:"overline"},[t._v("Contacts")]),t._v(" "),e(f.a),t._v(" "),null!==t.address?e(h.a,{staticClass:"ma-0 pa-0",attrs:{xs12:"",md12:""}},[e("v-address-card",{attrs:{address:t.address}})],1):t._e()],1),t._v(" "),e(l.a,[e(d.a,[t.address?e(r.a,{staticClass:"button",attrs:{small:"",block:"",dark:"",to:"/patients/".concat(t.userdata.id,"/contacts/")}},[t._v("View contacts")]):e(r.a,{staticClass:"primary",attrs:{dark:"",to:"/patients/".concat(t.userdata.id,"/contacts/add")}},[t._v("\n              "+t._s(t.$t("label.button.addcontacts"))+"\n            ")]),t._v(" "),t.userdata.hasSelfServiceUserAccount?t._e():e(r.a,{staticClass:"primary",attrs:{to:"/patients/".concat(t.userdata.id,"/selfservice")}},[t._v("\n              "+t._s(t.$t("label.button.createselfservice"))+"\n            ")])],1)],1)],1)],1),t._v(" "),e(d.a,{attrs:{xs:"12",md:"9",sm:"12"}},[e(O.a,{attrs:{"slider-color":"blue","background-color":"primary","slider-size":"3",left:"",dark:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[e(N.a,{staticClass:"ffont-weight-normal"},[e("span",[e(y.a,{attrs:{small:"",left:""}},[t._v("mdi-account-question")]),t._v(t._s(t.$t("label.tab.biography")))],1)]),t._v(" "),e(N.a,{staticClass:"font-weight-normal",on:{click:function(e){return e.stopPropagation(),t.getPatientServices(!0)}}},[e(y.a,{attrs:{small:"",left:""}},[t._v("mdi-clock-check")]),t._v("\n          "+t._s(t.$t("label.tab.consultations"))+"\n        ")],1),t._v(" "),e(N.a,{staticClass:"font-weight-normal",on:{click:function(e){return e.stopPropagation(),t.getPatientInsurances()}}},[e(y.a,{attrs:{small:"",left:""}},[t._v("mdi-shield-sun")]),t._v("\n          "+t._s(t.$t("label.tab.insurances"))+"\n        ")],1)],1),t._v(" "),e(j.a,{attrs:{vertical:""},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[e(D.a,{staticClass:"default"},[e("tb-biograph",{attrs:{patient:t.userdata}})],1),t._v(" "),e(D.a,{staticClass:"default"},[e("div",{},[e(A.a,{attrs:{"no-gutters":""}},[e(P.a),t._v(" "),t.userdata.isActive?t._e():e(r.a,{staticClass:"button small ma-2",attrs:{small:""},on:{click:function(e){return e.stopPropagation(),t.initiateServiceInstance()}}},[e(y.a,{attrs:{small:"",left:""}},[t._v("mdi-plus")]),t._v(t._s(t.$t("label.button.newconsultation")))],1),t._v(" "),e(r.a,{staticClass:"button small ma-2",attrs:{small:""},on:{click:function(e){return e.stopPropagation(),t.getPatientServices(null)}}},[t._v("View all")])],1),t._v(" "),e("tb-services",{attrs:{services:t.services}})],1)]),t._v(" "),e(D.a,{staticClass:"default"},[e("tb-insurance",{attrs:{insurancecards:t.insurancecards,button:t.active?"Show inactive":"Show active",title:t.active?"Active Insurances":"Inactive Insurances",activelist:t.active},on:{update:function(e){return t.getPatientInsurances()},active:function(e){t.active=!t.active}}})],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports},799:function(t,e,n){"use strict";n.r(e);var r=n(169),c=n(272),l=n(60),o=n(664),d=n(655),m=n(666),v=n(883),f=n(651),_=n(672),h=n(142),y=n(282),k=n(254),x=n(663),w=n(184),I=n(653),C=n(112),$=n(76),S=n(92),A=(n(30),n(218),n(10),n(7),n(13),n(14),n(11),n(5),n(9),n(0)),P=(n(51),n(70));function N(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function D(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?N(Object(n),!0).forEach((function(e){Object(A.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):N(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var O={props:{insurancecards:{type:Array,dafault:null},title:{type:String,default:"Active"},button:{type:String,default:"Active"},activelist:{type:Boolean,default:!0}},data:function(){return{search:null,valid:!1,editedIndex:-1,deletedialog:!1,select:null,date:(new Date).toISOString().substr(0,10),menu:!1,menu2:!1,headers:[{text:"ID",value:"id",class:"primary"},{text:"Insurance name",value:"insurance.name",class:"primary"},{text:"Client name",value:"patientName",class:"primary",sortable:!1},{text:"Client No.",value:"membershipNumber",class:"primary"},{text:"Active ? ",value:"isActive",class:"primary"},{text:"Gender",value:"sex",class:"primary"},{text:"Exipire Date",value:"expireDate",class:"primary"},{text:"Actions",value:"actions",class:"primary"}],items:[{title:"Edit",icon:"lead-pencil",icona:"lead-penci",color:"blue"},{title:"Delete",icon:"minus-circle",icona:"plus-circle",color:"red"}],dialog:!1,editedItem:{id:0,membershipNumber:"",voteNo:"",issuedDate:"",expireDate:"",codeNo:"",insuranceId:0,patientId:0}}},methods:{getSelected:function(t,e){"Edit"==t.title&&this.editItem(e),"Delete"==t.title&&(this.deletedialog=!0,this.itemtodelete=e),"View"==t.title&&this.navigateTo(e.id)},editItem:function(t){this.editedIndex=this.insurancecards.indexOf(t),this.editedItem=Object.assign({},t),delete this.editedItem.insurance,this.dialog=!0,this.editedItemId=t.id},deleteItem:function(){this.activelist?this.$store.dispatch("deactivate_patient_insurance_card",this.itemtodelete.id):this.$store.dispatch("activate_patient_insurance_card",this.itemtodelete.id),this.close()},navigateTo:function(t){this.$router.push("/insurances/".concat(t))},close:function(){var t=this;setTimeout((function(){t.$emit("update"),t.deletedialog=!1,t.dialog=!1}),this.delay_seconds)},save:function(){var t=this;this.editedIndex>-1?(this.editedItem.patientId=parseInt(this.$route.params.id),this.$store.dispatch("update_patient_insurance",this.editedItem)):(this.editedItem.patientId=parseInt(this.$route.params.id),delete this.editedItem.id,this.$store.dispatch("create_patient_insurance",this.editedItem).then((function(e){setTimeout((function(){return t.$emit("update")}),t.delay_seconds)}))),this.close()},showActive:function(){this.$emit("active")},handleClick:function(t){}},created:function(){this.$store.dispatch("get_insurance_companies")},computed:D(D({},Object(P.b)({insurances:"insurances"})),{},{formTitle:function(){return-1===this.editedIndex?"New insurance card":"Edit insurance card"}})},j=n(46),component=Object(j.a)(O,(function(){var t=this,e=t._self._c;return e("div",[t.insurancecards?e("div",{attrs:{md12:""}},[e(m.a,{attrs:{dense:"",headers:t.headers,items:t.insurancecards,search:t.search,width:"100%"},on:{"click:row":t.handleClick},scopedSlots:t._u([{key:"top",fn:function(){return[e($.a,{attrs:{flat:"",dark:"",color:"primary"}},[e("h2",[e("strong",[t._v(t._s(t.title))])]),t._v(" "),e(I.a),t._v(" "),e(C.a,{staticClass:"mt-2",attrs:{"append-icon":"search",label:"Search...",outlined:"","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._v("  \n          "),e(r.a,{staticClass:"button mb-1",attrs:{medium:""},on:{click:t.showActive}},[t._v("\n            "+t._s(t.button))]),t._v("  \n          "),e(f.a,{attrs:{"max-width":"900px"},scopedSlots:t._u([{key:"activator",fn:function(n){var c=n.on,l=n.attrs;return[t.isMdAndUp?e(r.a,t._g(t._b({staticClass:"button",attrs:{elevation:"1",medium:"","prepend-icon":"mdi-plus"}},"v-btn",l,!1),c),[e(h.a,{attrs:{left:""}},[t._v("mdi-plus")]),t._v(t._s(t.$t("label.button.newinsurancecard")))],1):e(r.a,t._g(t._b({staticClass:"button",attrs:{fab:"",dark:"",small:""}},"v-btn",l,!1),c),[e(h.a,{attrs:{dark:""}},[t._v(" mdi-plus ")])],1)]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[t._v(" "),e(c.a,[e(_.a,{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[e($.a,{attrs:{color:"primary",dark:"",flat:""}},[e(S.b,[e("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])])],1),t._v(" "),e(l.c,[e(d.a,[e(x.a,[e(o.a,{attrs:{cols:"12",sm:"12",md:"6"}},[e(C.a,{attrs:{placeholder:"e.g 11Y73M6839012V0",label:"Membership No."},model:{value:t.editedItem.membershipNumber,callback:function(e){t.$set(t.editedItem,"membershipNumber",e)},expression:"editedItem.membershipNumber"}})],1),t._v(" "),e(o.a,{attrs:{cols:"12",sm:"12",md:"6"}},[e(C.a,{attrs:{label:"Vote Number",autocomplete:"false",placeholder:"e.g.  1729407-121-32440"},model:{value:t.editedItem.voteNo,callback:function(e){t.$set(t.editedItem,"voteNo",e)},expression:"editedItem.voteNo"}})],1),t._v(" "),e(o.a,{attrs:{cols:"12",sm:"12",md:"6"}},[e(C.a,{attrs:{placeholder:"e.g 407-121-32440",label:"Code Number"},model:{value:t.editedItem.codeNo,callback:function(e){t.$set(t.editedItem,"codeNo",e)},expression:"editedItem.codeNo"}})],1),t._v(" "),e(o.a,{attrs:{cols:"12",sm:"6",md:"6"}},[e(w.a,{attrs:{items:t.insurances,"item-text":"name","item-value":"id",chips:"","small-chips":"",rules:[function(t){return!!t||"You must select one to continue!"}],label:"Insurance",required:"","persistent-hint":"","single-line":""},model:{value:t.editedItem.insuranceId,callback:function(e){t.$set(t.editedItem,"insuranceId",e)},expression:"editedItem.insuranceId"}})],1),t._v(" "),e(o.a,{attrs:{cols:"12",sm:"12",md:"6"}},[e(y.a,{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":t.date,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"290px"},on:{"update:returnValue":function(e){t.date=e},"update:return-value":function(e){t.date=e}},scopedSlots:t._u([{key:"activator",fn:function(n){var r=n.on,c=n.attrs;return[e(C.a,t._g(t._b({attrs:{label:"Issued date","prepend-icon":"mdi-calendar",readonly:"",rules:[function(t){return!!t||"Date is required"}],required:""},model:{value:t.editedItem.issuedDate,callback:function(e){t.$set(t.editedItem,"issuedDate",e)},expression:"editedItem.issuedDate"}},"v-text-field",c,!1),r))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[t._v(" "),e(v.a,{attrs:{"no-title":"",scrollable:"",required:""},on:{input:function(e){t.menu=!1}},model:{value:t.editedItem.issuedDate,callback:function(e){t.$set(t.editedItem,"issuedDate",e)},expression:"editedItem.issuedDate"}},[e(I.a),t._v(" "),e(r.a,{attrs:{text:"",color:"primary"},on:{click:function(e){t.menu=!1}}},[t._v("\n                              Cancel\n                            ")]),t._v(" "),e(r.a,{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.menu.save(t.date)}}},[t._v("\n                              OK\n                            ")])],1)],1)],1),t._v(" "),e(o.a,{attrs:{cols:"12",sm:"12",md:"6"}},[e(y.a,{ref:"menu2",attrs:{"close-on-content-click":!1,"return-value":t.date,transition:"scale-transition","offset-y":"","max-width":"290px","min-width":"290px"},on:{"update:returnValue":function(e){t.date=e},"update:return-value":function(e){t.date=e}},scopedSlots:t._u([{key:"activator",fn:function(n){var r=n.on,c=n.attrs;return[e(C.a,t._g(t._b({attrs:{label:"Expired date","prepend-icon":"mdi-calendar",readonly:"",rules:[function(t){return!!t||"Date is required"}],required:""},model:{value:t.editedItem.expireDate,callback:function(e){t.$set(t.editedItem,"expireDate",e)},expression:"editedItem.expireDate"}},"v-text-field",c,!1),r))]}}]),model:{value:t.menu2,callback:function(e){t.menu2=e},expression:"menu2"}},[t._v(" "),e(v.a,{attrs:{"no-title":"",scrollable:"",required:""},on:{input:function(e){t.menu2=!1}},model:{value:t.editedItem.expireDate,callback:function(e){t.$set(t.editedItem,"expireDate",e)},expression:"editedItem.expireDate"}},[e(I.a),t._v(" "),e(r.a,{attrs:{text:"",color:"primary"},on:{click:function(e){t.menu2=!1}}},[t._v("\n                              Cancel\n                            ")]),t._v(" "),e(r.a,{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.menu2.save(t.date)}}},[t._v("\n                              OK\n                            ")])],1)],1)],1)],1)],1)],1),t._v(" "),e(l.a,[e(I.a),t._v(" "),e(r.a,{attrs:{color:"primary",medium:""},on:{click:function(e){return e.stopPropagation(),t.close.apply(null,arguments)}}},[t._v(t._s(t.$t("label.button.decline")))]),t._v(" "),e(r.a,{attrs:{color:"warning",medium:""},on:{click:function(e){return e.stopPropagation(),t.save.apply(null,arguments)}}},[t._v(t._s(t.$t("label.button.btnsave")))])],1)],1)],1)],1),t._v(" "),e(f.a,{attrs:{persistent:"","max-width":"590"},model:{value:t.deletedialog,callback:function(e){t.deletedialog=e},expression:"deletedialog"}},[e(c.a,[t.activelist?e(l.d,{staticClass:"text-h5"},[t._v("\n                Deactivate this insurance\n              ")]):e(l.d,{staticClass:"text-h5"},[t._v("\n                Activate this insurance\n              ")]),t._v(" "),t.activelist?e(l.c,[t._v("Are you sure you want to deactivate this insurance. Click\n                'Yes' to deactivate or 'No' to ignore\n              ")]):e(l.c,[t._v("Are you sure you want to activate this insurance. Click 'Yes'\n                to activate or 'No' to ignore\n              ")]),t._v(" "),e(l.a,[e(I.a),t._v(" "),e(r.a,{attrs:{color:"primary",medium:""},on:{click:function(e){t.deletedialog=!1}}},[t._v("\n                  No\n                ")]),t._v(" "),e(r.a,{attrs:{color:"warning",medium:""},on:{click:t.deleteItem}},[t._v("\n                  Yes\n                ")])],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(n){var r=n.item;return[e("td",{staticClass:"none-clickable",on:{click:function(t){t.stopPropagation()}}},t._l(t.items,(function(n,i){return e(h.a,{key:i,staticClass:"mr-2",attrs:{medium:"",color:n.color},on:{click:function(e){return t.getSelected(n,r)}}},[t._v("\n            mdi-"+t._s(t.activelist?n.icon:n.icona)+"\n          ")])})),1)]}},{key:"item.isActive",fn:function(n){return[n.item.isActive?e(h.a,{staticClass:"font-weight-black",attrs:{color:"primary"}},[t._v("\n          mdi-check\n        ")]):e(h.a,{staticClass:"font-weight-black",attrs:{color:"primary"}},[t._v("\n          mdi-close\n        ")])]}},{key:"no-data",fn:function(){return[e("p",{staticClass:"mt-2"},[t._v("No Data available")])]},proxy:!0}],null,!0)})],1):e(k.a,{attrs:{indeterminate:"",color:"grey lighten-5",size:"16"}})],1)}),[],!1,null,null,null);e.default=component.exports},868:function(t,e,n){"use strict";n(774)},869:function(t,e,n){var r=n(16)((function(i){return i[1]}));r.push([t.i,".basil{background-color:#fffbe6!important}.basil--text{color:#356859!important}.v-item-group .v-window__container,.v-window,.v-window-item{width:100%}",""]),r.locals={},t.exports=r}}]);