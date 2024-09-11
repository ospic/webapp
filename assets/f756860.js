(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{796:function(t,e,l){"use strict";l.r(e);var n=l(661),o=l(169),r=l(272),c=l(60),d=l(664),f=l(655),v=l(651),m=l(275),_=l(718),h=l(142),w=l(215),y=l(856),x=l(855),k=l(663),C=l(879),$=l(653),F=l(76),S=l(92),U=(l(33),l(79),l(2)),z=(l(23),l(27),{props:{files:{type:Array,default:null}},data:function(){return{select:[],dialog:!1,viewdialog:!1,deletedialog:!1,loading:!1,file:void 0,currentFile:void 0,selectedfile:null,location:null,width:300,permissions:"ALL_FUNCTIONS, UPDATE_CONSULTATION",accepted:"image/*,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.pdf,.doc,.xml,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"}},methods:{selectFile:function(t){this.progress=0,this.currentFile=t,this.loading=!1},deletefile:function(t){this.deletedialog=!0,this.file=t},uploadimagefile:function(){var t=this;return Object(U.a)(regeneratorRuntime.mark((function e(){var l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,(l=new FormData).append("file",t.currentFile),e.next=5,t.$api.$patch("/consultations/".concat(t.$route.params.id,"/").concat(t.location,"/"),l).then((function(e){null!==e&&(t.loading=!1,t.dialog=!1,t.currentFile=void 0),t.$emit("update-report")})).catch((function(t){console.log(t)}));case 5:return e.abrupt("return",e.sent);case 6:case"end":return e.stop()}}),e)})))()},toggle:function(){this.$refs.alert.toggle(),this.deletedialog=!1},viewfile:function(t){this.selectedfile=t,this.selectedfile.url=this.$api.defaults.baseURL+"consultations/"+this.$route.params.id+"/files/"+t.id+"/",this.viewdialog=!0,console.log(t)},deleteimagefile:function(){var t=this;return Object(U.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,t.$api.$delete("/consultations/".concat(t.$route.params.id,"/").concat(t.file.location,"/").concat(t.file.id)).then((function(e){t.loading=!1,t.deletedialog=!1,t.$emit("update-report")})).catch((function(t){console.log(t)}));case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})))()}}}),R=l(46),component=Object(R.a)(z,(function(){var t=this,e=t._self._c;return e(f.a,{attrs:{fluid:""}},[t.deletedialog?e(n.a,{ref:"alert",attrs:{color:"warning",border:"left",elevation:"1","colored-border":"",type:"warning",prominent:"",dismissible:"",transition:"scale-transition"},scopedSlots:t._u([{key:"close",fn:function(){return[e(o.a,{attrs:{icon:""},on:{click:t.toggle}},[e(h.a,{attrs:{size:"32",color:"red"}},[t._v("mdi-close-circle")])],1)]},proxy:!0}],null,!1,4238499713)},[e(k.a,{attrs:{align:"center"}},[e(d.a,{staticClass:"grow"},[e("h3",[t._v("\n          Do you real want to delete this report file ?\n          "),e("strong",[t._v(t._s(t.file.name))])]),t._v("\n        Remember: This process will parmanently delete this file and you can\n        not undo after that\n      ")]),t._v(" "),e(d.a,{staticClass:"shrink"},[e(o.a,{staticClass:"button",attrs:{loading:t.loading,disabled:t.loading},on:{click:function(e){return e.stopPropagation(),t.deleteimagefile.apply(null,arguments)}},scopedSlots:t._u([{key:"loader",fn:function(){return[e("span",{staticClass:"white--text"},[t._v("Deleting...")])]},proxy:!0}],null,!1,3155693433)},[t._v("Yes Delete")])],1)],1)],1):t._e(),t._v(" "),e(k.a,{staticClass:"mx-2 pt-2"},[e($.a),t._v(" "),e(v.a,{attrs:{transition:"dialog-bottom-transition",width:"600"},scopedSlots:t._u([{key:"activator",fn:function(l){var n=l.on,r=l.attrs;return[t.hasPermission(t.permissions)?e(o.a,t._g(t._b({staticClass:"mb-2",attrs:{color:"button",medium:"",dark:""}},"v-btn",r,!1),n),[e(h.a,{attrs:{left:""}},[t._v(" mdi-file-document ")]),t._v("\n          "+t._s(t.$t("label.button.btnuploadnewreportfile")))],1):t._e()]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[t._v(" "),e(r.a,[e(c.d,{staticClass:"pa-0 mb-4"},[e(F.a,{attrs:{color:"primary",dark:"",flat:""}},[t._v("Upload new patient medical examination report")])],1),t._v(" "),e(c.c,[e("p",[t._v(t._s(t.location||"null"))]),t._v(" "),e(x.a,{attrs:{row:"",mandatory:""},model:{value:t.location,callback:function(e){t.location=e},expression:"location"}},[e(y.a,{attrs:{label:"Laboratory",value:"laboratory"}}),t._v(" "),e(y.a,{attrs:{label:"Radiology",value:"radiology"}})],1),t._v(" "),e(_.a,{attrs:{counter:"","show-size":"","small-chips":"",accept:t.accepted,label:"Medical examination report file","truncate-length":"27"},on:{change:t.selectFile}})],1),t._v(" "),e(m.a),t._v(" "),e(c.a,{staticClass:"justify-end"},[e(o.a,{attrs:{color:"primary",outlined:""},on:{click:function(e){t.dialog=!1}}},[t._v("Deny")]),t._v(" "),e(o.a,{staticClass:"primary",attrs:{loading:t.loading,disabled:t.loading},on:{click:function(e){return t.uploadimagefile()}},scopedSlots:t._u([{key:"loader",fn:function(){return[e("span",[t._v("Uploading...")])]},proxy:!0}])},[t._v("Upload\n            "),e(h.a,{attrs:{right:"",dark:""}},[t._v(" mdi-cloud-upload ")])],1)],1)],1)],1),t._v(" "),e(v.a,{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},model:{value:t.viewdialog,callback:function(e){t.viewdialog=e},expression:"viewdialog"}},[e(r.a,{attrs:{dark:""}},[e(F.a,{attrs:{dark:"",color:"primary"}},[e(o.a,{attrs:{icon:"",dark:""},on:{click:function(e){t.viewdialog=!1}}},[e(h.a,[t._v("mdi-close")])],1),t._v(" "),e(S.b,[t._v(t._s(null==t.selectedfile?"":t.selectedfile.name))]),t._v(" "),e($.a),t._v(" "),e(S.a,[e(o.a,{attrs:{dark:"",text:""},on:{click:function(e){t.viewdialog=!1}}},[t._v(" Save ")])],1)],1),t._v(" "),null!=t.selectedfile?e("div",{staticClass:"pa-4"},[t.selectedfile.type.startsWith("image/")?e("div",{staticClass:"d-flex flex-column justify-space-between align-center"},[e(f.a,{attrs:{fluid:""}},[e(k.a,{attrs:{"no-gutters":""}},[e(d.a,{attrs:{cols:"12",sm:"12",md:"2"}},[e("strong",[t._v("Image size : "+t._s(t.width))]),t._v(" "),e(C.a,{staticClass:"align-self-stretch",attrs:{hint:"Height",min:"200",max:"1500",step:"1"},model:{value:t.width,callback:function(e){t.width=e},expression:"width"}})],1),t._v(" "),e($.a),t._v(" "),e(d.a,{attrs:{cols:"12",sm:"4",md:"9"}},[e(w.a,{attrs:{width:t.width,src:t.selectedfile.url,"lazy-src":"https://aosa.org/wp-content/uploads/2019/04/image-placeholder-350x350.png"}})],1)],1)],1)],1):"application/pdf"==t.selectedfile.type?e("div",[e("div",[e("v-pdf",{attrs:{src:t.selectedfile.url}})],1)]):t._e()]):t._e()],1)],1)],1),t._v(" "),e(k.a,t._l(t.files,(function(l,i){return e(d.a,{key:i,attrs:{md:"4",lg:"2",sm:"6"}},[e(r.a,{attrs:{outlined:"",dense:""}},[e(F.a,{staticClass:"primary",attrs:{dense:"",height:"40",flat:""}},[e("h5",{staticClass:"white--text font-weight-medium"},[t._v(t._s(l.name))]),t._v(" "),e($.a),t._v(" "),e(o.a,{staticClass:"button delete",attrs:{fab:"",text:"","x-small":""},on:{click:function(e){return t.deletefile(l)}}},[e(h.a,[t._v(" mdi-trash-can-outline ")])],1)],1),t._v(" "),e("div",{staticClass:"d-flex flex-no-wrap justify-space-between"},[e("div",[e(c.c,[e("ul",[e("li",[t._v("Type: "+t._s(l.type.split("/").pop()))]),t._v(" "),e("li",[t._v("Size: "+t._s(l.size))]),t._v(" "),e("li",[t._v("Unit: "+t._s(l.location))])])])],1),t._v(" "),e("div",{class:"ma-3 fi fi-size-xl fi-round-md fi-".concat(l.type.split("/")[1]),on:{click:function(e){return t.viewfile(l)}}},[e("div",{staticClass:"fi-content"},[t._v(t._s(l.type.split("/")[1]))])])])],1)],1)})),1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);