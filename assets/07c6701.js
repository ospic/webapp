(window.webpackJsonp=window.webpackJsonp||[]).push([[26,23],{663:function(t,e,r){"use strict";r.r(e);var n={props:{services:{type:Array,default:null},title:{type:String,default:"Services"}},data:function(){return{search:null,headers:[{text:"ID",value:"id",class:"primary"},{text:"Patient Name",value:"patientName",class:"primary",sortable:!1},{text:"Consultant",value:"staffName",class:"primary"},{text:"Is Active?",value:"isActive",class:"primary"},{text:"From",value:"fromDate",class:"primary"},{text:"To",value:"toDate",class:"primary"}],body:{options:{page:1,itemsPerPage:5,sortBy:["patientName"]}}}},methods:{handleClick:function(t){this.$router.push("/consultations/"+t.id)},updatePagination:function(t){console.log(t)}}},l=r(43),o=r(50),c=r.n(o),v=r(265),d=r(653),m=r(141),f=r(248),_=r(642),h=r(112),y=r(81),k=r(649),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"mx-auto default"},[null==t.services.length?r("v-progress-circular",{attrs:{indeterminate:"",color:"grey lighten-5",size:"16"}}):r("div",{attrs:{md12:""}},[r("v-data-table",{attrs:{dense:"",headers:t.headers,items:t.services,search:t.search,width:"100%"},on:{"click:row":t.handleClick,"update:page":t.updatePagination},scopedSlots:t._u([{key:"top",fn:function(){return[r("v-toolbar",{attrs:{flat:"",color:"primary",dark:""}},[r("h2",[r("strong",[t._v(t._s(t.$t(t.title)))])]),t._v(" "),r("v-spacer"),t._v(" "),r("v-text-field",{attrs:{"append-icon":"search",label:"Enter search text ...",dense:"","single-line":"","hide-details":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1)]},proxy:!0},{key:"item.isActive",fn:function(e){return[e.item.isActive?r("v-tooltip",{attrs:{right:"",color:"primary"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,l=e.attrs;return[r("v-icon",t._g(t._b({attrs:{small:"",color:"red lighten-2"}},"v-icon",l,!1),n),[t._v("mdi-check")])]}}],null,!0)},[t._v(" "),r("span",[t._v("Active")])]):r("div")]}},{key:"item.patientName",fn:function(e){var r=e.item;return[t._v("\n        "+t._s(r.patientName)+" ( "+t._s(r.patientId)+")\n      ")]}},{key:"item.staffName",fn:function(e){var n=e.item;return[null==n.staffName?r("p",[t._v("Unassigned")]):r("p",[t._v(t._s(n.staffName)+" ( "+t._s(n.staffId)+")")])]}}],null,!0)})],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VCard:v.a,VDataTable:d.a,VIcon:m.a,VProgressCircular:f.a,VSpacer:_.a,VTextField:h.a,VToolbar:y.a,VTooltip:k.a})},721:function(t,e,r){"use strict";r.r(e);var n={components:{"service-card":r(663).default},props:{services:{type:Array,default:null}},data:function(){return{search:null,headers:[{text:"Status",value:"isActive",class:"primary"},{text:"ID",value:"id",class:"primary"},{text:"Patient Name",value:"patientName",class:"primary",sortable:!1},{text:"Consultant",value:"staffName",class:"primary"},{text:"From",value:"fromDate",class:"primary"},{text:"To",value:"toDate",class:"primary"},{text:"Status",value:"status",class:"primary"}],body:{options:{page:1,itemsPerPage:5,sortBy:["patientName"]}}}},methods:{handleClick:function(t){this.$router.push("/consultations/"+t.id)},updatePagination:function(t){console.log(t)}}},l=r(43),o=r(50),c=r.n(o),v=r(640),d=r(653),m=r(141),f=r(248),_=r(649),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{attrs:{fluid:""}},[null==t.services?r("v-progress-circular",{attrs:{indeterminate:"",color:"grey",size:"24"}}):r("div",[r("v-data-table",{staticClass:"default",attrs:{dense:"",headers:t.headers,items:t.services,search:t.search,"mobile-breakpoint":"100"},on:{"click:row":t.handleClick,"update:page":t.updatePagination},scopedSlots:t._u([{key:"item.isActive",fn:function(e){return[e.item.isActive?r("v-tooltip",{attrs:{right:"",color:"primary"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,l=e.attrs;return[r("v-icon",t._g(t._b({attrs:{small:"",color:"blue lighten-2"}},"v-icon",l,!1),n),[t._v("mdi-check-circle")])]}}],null,!0)},[t._v(" "),r("span",[t._v("Active")])]):r("v-tooltip",{attrs:{right:"",color:"warning"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,l=e.attrs;return[r("v-icon",t._g(t._b({attrs:{small:"",color:"red lighten-2"}},"v-icon",l,!1),n),[t._v("mdi-close-circle")])]}}],null,!0)},[t._v(" "),r("span",[t._v("Closed")])])]}},{key:"item.patientName",fn:function(e){var r=e.item;return[t._v("\n        "+t._s(r.patientName)+" ( "+t._s(r.patientId)+")\n      ")]}},{key:"item.status",fn:function(e){return[e.item.isAdmitted?r("v-tooltip",{attrs:{right:"",color:"primary"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,l=e.attrs;return[r("v-icon",t._g(t._b({attrs:{small:""}},"v-icon",l,!1),n),[t._v("mdi-bed-outline")])]}}],null,!0)},[t._v(" "),r("span",[t._v("Admitted")])]):r("div")]}},{key:"item.staffName",fn:function(e){var n=e.item;return[null==n.staffName?r("p",[t._v("Unassigned")]):r("p",[t._v(t._s(n.staffName)+" ( "+t._s(n.staffId)+")")])]}}],null,!0)})],1)],1)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VContainer:v.a,VDataTable:d.a,VIcon:m.a,VProgressCircular:f.a,VTooltip:_.a})}}]);