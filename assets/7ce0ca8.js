(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{911:function(e,t,n){"use strict";n.r(t);var r=n(169),o=n(272),c=n(666),l=n(142),d=n(254),h=n(653),v=n(112),m=n(76),f=n(657),_=(n(10),n(78),n(30),n(218),n(0)),y=(n(47),n(7),n(33),n(13),n(14),n(11),n(5),n(9),n(51),n(70));function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var w={data:function(){return{focus:"",dates:[],search:null,type:"month",time:null,menu:!1,menu2:!1,modal2:!1,valid:!0,dialog:!1,edit:!1,updateId:null,nowDate:(new Date).toISOString().slice(0,10),today:(new Date).toISOString(),timeNow:(new Date).toTimeString().split(" ")[0],typeToLabel:{month:"Month",week:"Week",day:"Day","4day":"4 Days"},selectedEvent:{},selectedElement:null,selectedOpen:!1,event:{name:null,startDate:null,startTime:null,endDate:null,endTime:null,timed:!0,description:null,departmentId:null},colors:["blue","indigo","deep-purple","cyan","green","orange","grey darken-1"],names:["Meeting","Holiday","PTO","Travel","Event","Birthday","Conference","Party"],headers:[{text:"ID",value:"id",class:"primary"},{text:"Event",value:"name",class:"primary",sortable:!1},{text:"Description",value:"description",class:"primary"},{text:"Start",value:"start",class:"primary"},{text:"End",value:"end",class:"primary"}]}},mounted:function(){this.$store.dispatch("get_calendar_events")},created:function(){this.$store.dispatch("get_calendar_events")},methods:{save_event:function(){var e=this;this.event.startDate=this.dates[0],this.event.endDate=this.dates[1],this.$refs.form.validate()&&this.$store.dispatch("create_calendar_event",this.event).then((function(){setTimeout((function(){return e.$store.dispatch("get_calendar_events")}),e.delay_seconds),setTimeout((function(){return e.focus=e.focus+" "}),e.delay_seconds)})),this.$refs.form.reset(),this.dialog=!1},viewDay:function(e){var t=e.date;this.focus=t,this.type="day"},getEventColor:function(e){return e.color},setToday:function(){this.focus=""},prev:function(){this.$refs.calendar.prev()},next:function(){this.$refs.calendar.next()},showEvent:function(e){var t=this,n=e.nativeEvent,r=e.event,o=function(){t.selectedEvent=r,t.selectedElement=n.target,t.selectedEvent.details=r.description,setTimeout((function(){t.selectedOpen=!0}),10)};this.selectedOpen?(this.selectedOpen=!1,setTimeout(o,10)):o(),n.stopPropagation()},close:function(){this.$refs.form.reset(),this.edit=!1,this.dialog=!1},delete_calendar_event:function(e){var t=this;this.$store.dispatch("delete_calendar_event",e).then((function(){setTimeout((function(){return t.$store.dispatch("get_calendar_events")}),t.delay_seconds),setTimeout((function(){t.selectedOpen=!1}),10)}))},initiate_update:function(e){var t=new Date(e.start),n=new Date(e.end),r=t.toISOString().split("T")[0],o=n.toISOString().split("T")[0];this.dates[0]=r,this.dates[1]=o,this.event={name:e.name,startDate:this.dates[0],startTime:this.update_time_format(e.start),endDate:this.dates[1],endTime:this.update_time_format(e.end),timed:e.timed,description:e.eventSummary.description},this.updateId=e.eventSummary.id,this.dialog=!0,this.edit=!0},update_time_format:function(time){return time.toLocaleTimeString().slice(0,-3).split(":")[0]<10?"0"+time.toLocaleTimeString().slice(0,-3):time.toLocaleTimeString().slice(0,-3)},month_format:function(e){return("0"+e).slice(-2)},update_calendar_event:function(){var e=this;this.event.description=this.event.description,console.log(this.dates),this.event.startDate=this.dates[0],this.event.endDate=this.dates[1];var t={id:this.updateId,data:this.event};this.$store.dispatch("update_calendar_event",t).then((function(){setTimeout((function(){e.$store.dispatch("get_calendar_events"),e.close()}),e.delay_seconds)}))}},computed:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){Object(_.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},Object(y.b)({events:"events"}))},D=w,T=n(46),component=Object(T.a)(D,(function(){var e=this,t=e._self._c;return t(o.a,{staticClass:"mx-auto default"},[null==e.events.length?t(d.a,{attrs:{indeterminate:"",color:"grey lighten-5",size:"16"}}):t("div",{attrs:{md12:""}},[t(c.a,{attrs:{dense:"",headers:e.headers,items:e.events,search:e.search,width:"100%"},on:{"click:row":e.handleClick,"update:page":e.updatePagination},scopedSlots:e._u([{key:"top",fn:function(){return[t(m.a,{attrs:{flat:"",color:"primary",dark:""}},[t("h2",[t("strong",[e._v(e._s(e.$t(e.title)))])]),e._v(" "),t(h.a),e._v(" "),t(v.a,{attrs:{"append-icon":"search",label:"Enter search text ...",dense:"","single-line":"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1)]},proxy:!0},{key:"item.isActive",fn:function(n){return[n.item.isActive?t(f.a,{attrs:{right:"",color:"primary"},scopedSlots:e._u([{key:"activator",fn:function(n){var r=n.on,o=n.attrs;return[t(l.a,e._g(e._b({attrs:{small:"",color:"red lighten-2"}},"v-icon",o,!1),r),[e._v("mdi-check")])]}}],null,!0)},[e._v(" "),t("span",[e._v("Active")])]):t("div")]}},{key:"item.description",fn:function(n){var o=n.item;return[t(f.a,{attrs:{color:"primary",top:""},scopedSlots:e._u([{key:"activator",fn:function(n){var o=n.on,c=n.attrs;return[t(r.a,e._g(e._b({attrs:{icon:""}},"v-btn",c,!1),o),[t(l.a,{attrs:{color:"primary lighten-1"}},[e._v(" mdi-information ")])],1)]}}],null,!0),model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[e._v(" "),t("span",[e._v(e._s(o.description))])])]}},{key:"item.action",fn:function(n){return[n.item.ownedByMe?t(r.a,{attrs:{color:"primary",small:""}},[t(l.a,{staticClass:"mr-2",attrs:{small:""}},[e._v("mdi-pencil")]),e._v(" Edit")],1):e._e()]}}],null,!0)})],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);