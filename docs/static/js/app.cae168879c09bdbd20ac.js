webpackJsonp([1],{NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("xd7I"),n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var a=s("C7Lr")({name:"App"},n,!1,function(e){s("s59O")},null,null).exports,r=s("3XdE"),o={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"sticker-container"},[void 0!==e.list.assignees?s("div",{staticClass:"info"},[s("img",{attrs:{src:e.list.assignees.img,width:"37px",height:"37px"}}),e._v(" "),s("span",{staticClass:"name"},[e._v(e._s(e.list.assignees.name))]),e._v(" "),s("span",{staticClass:"time"},[e._v(e._s(e._f("fixTime")(e.list.assignees.time)))])]):e._e(),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:void 0!==e.list.title,expression:"typeof list.title !== 'undefined'"}],staticClass:"context"},[s("a",{attrs:{href:e.list.issueUrl,target:"view_window"}},[e._v("#"+e._s(e.list.number))]),e._v(" "),s("span",[e._v(e._s(e.list.title))])]),e._v(" "),s("div",{staticClass:"labels-container"},e._l(e.list.labels,function(t,i){return s("div",{key:i,staticClass:"label",style:"backgroundColor:#"+t.bgcolor+";color:"+t.ftcolor},[s("span",{staticClass:"label-name"},[e._v(e._s(t.name))])])}),0)])},staticRenderFns:[]};var d=s("C7Lr")({name:"sticker",data:function(){return{}},props:["list"],created:function(){},filters:{fixTime:function(e){return e.substr(0,10)+" "+e.substr(11,8)}}},o,!1,function(e){s("sewH")},"data-v-4bbebd9d",null).exports,c=s("3cXf"),l=s.n(c),u=s("aozt"),h=s.n(u),p=(s("6iV/"),h.a.create({baseURL:"https://api.github.com/graphql",timeout:5e3})),f=["2a2c211ce","e7e68750a0","c104493651","80422b95a62"];p.interceptors.request.use(function(e){return e.headers={"Content-Type":"application/json",Authorization:" bearer "+f.reverse().join("")+" "},e});var v=p;s("+YgL");var m=[],y=[],k=[],w=null,g=[];function _(e){for(var t=[],s=0;s<6;s+=2)t.push(parseInt("0x"+e.slice(s,s+2)));return.299*t[0]+.578*t[1]+.114*t[2]>192?"black":"white"}function b(e){return(w=e).forEach(function(e){e.timelineItems.nodes.forEach(function(e){void 0!==e.source&&m.push(e.source.number)})}),w.forEach(function(e){-1===m.indexOf(e.number)&&y.push(e.number)}),y.forEach(function(e){k.push(function e(t){var s={},i=w[t-1].title,n=w[t-1].number,a=w[t-1].url;if(s.number=n,s.baseurl=a,s.title=i,s.number=w[t-1].number,s.issueUrl=w[t-1].url,s.nodes=[],0!==w[t-1].assignees.nodes.length&&(s.assignees={name:w[t-1].assignees.nodes[0].name,img:w[t-1].assignees.nodes[0].avatarUrl,color:g[w[t-1].assignees.nodes[0].name],time:w[t-1].assignees.nodes[0].updatedAt}),0!=w[t-1].labels.totalCount){var r=[];w[t-1].labels.nodes.forEach(function(e){isNaN(e.name)?r.push({name:e.name,bgcolor:e.color,ftcolor:_(e.color)}):r.unshift({name:e.name,bgcolor:e.color,ftcolor:_(e.color)})}),s.labels=r}return 0===w[t-1].timelineItems.nodes.length?(s.nodes.push({nodes:null}),s):(w[t-1].timelineItems.nodes.forEach(function(t){void 0!==t.source&&s.nodes.push(e(t.source.number))}),s)}(e))}),k}g.youlik="orange",g["诸葛康亮我最帅"]="lightgreen",g.Shimizu="red",g.SprWu="deepskyblue",g.Lieatfhy="yellow",g["动感超人"]="blue",g.Salexal="green",g["刘笑锋"]="black";var x={data:function(){return{data:null,epici:0,userstoryi:0,taski:0,epicState:!1,storyState:!1,taskState:!1,extendState:!1}},methods:{getissue:function(){var e,t=this;(e={query:'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo"){ id name issues(first:100){  totalCount nodes{  title number url body assignees(first:100){ nodes{  name avatarUrl updatedAt} }labels(first:100){totalCount nodes{  name color} } timelineItems(first:20,itemTypes:[REFERENCED_EVENT,CROSS_REFERENCED_EVENT]){ totalCount nodes{ ...on CrossReferencedEvent{ source{ ...on Issue{  number  title labels(first:100){ totalCount  nodes{  name color } } assignees(first:100){  totalCount  nodes{ name } } } }target{  ...on Issue{ number  author{  avatarUrl }}} }}} } }}}}'},v({method:"POST",data:l()(e)})).then(function(e){t.data=b(e.data.data.organization.repository.issues.nodes),t.data.length>4&&(t.epicState=!0),void 0!==t.data[t.epici]&&t.data[t.epici].nodes.length>4&&(t.storyState=!0),void 0!==t.data[t.epici].nodes[t.userstoryi]&&t.data[t.epici].nodes[t.userstoryi].nodes.length>4&&(t.taskState=!0),void 0!==t.data[t.epici].nodes[t.userstoryi].nodes[t.taski]&&t.data[t.epici].nodes[t.userstoryi].nodes[t.taski].nodes.length>4&&(t.epicState=!0)})},selEpic:function(e){this.epici=e,this.userstoryi=0,e>3&&(this.data.unshift(this.data.splice(e,1)[0]),this.epici=0),this.storyState=void 0!==this.data[this.epici]&&this.data[this.epici].nodes.length>4,"unset"==this.$refs.epic.style.overflow&&(this.$refs.epic.style.overflow="hidden")},selStory:function(e){this.userstoryi=e,this.taski=0,e>3&&(this.data[this.epici].nodes.unshift(this.data[this.epici].nodes.splice(e,1)[0]),this.userstoryi=0);try{this.taskState=this.data[this.epici].nodes[this.userstoryi].nodes.length>4}catch(e){this.taskState=!1}"unset"==this.$refs.story.style.overflow&&(this.$refs.story.style.overflow="hidden")},selTask:function(e){this.taski=e,e>3&&this.data[this.epici].nodes[this.userstoryi].nodes.unshift(this.data[this.epici].nodes[this.userstoryi].nodes.splice(e,1)[0]);try{this.extendState=this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes.length>4}catch(e){this.extendState=!1}"unset"==this.$refs.task.style.overflow&&(this.$refs.task.style.overflow="hidden")},selExtend:function(){"unset"==this.$refs.extend.style.overflow&&(this.$refs.extend.style.overflow="hidden")},judge:function(){return null!==this.data[this.epici].nodes[this.userstoryi].nodes&&(null!==this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes&&null!==this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes[0].nodes)},addEpic:function(){var e=this.$refs.epic.style;e.overflow="unset"==e.overflow?"hidden":"unset"},addStory:function(){var e=this.$refs.story.style;e.overflow="unset"==e.overflow?"hidden":"unset"},addTask:function(){var e=this.$refs.task.style;e.overflow="unset"==e.overflow?"hidden":"unset"},addExtend:function(){var e=this.$refs.extend.style;e.overflow="unset"==e.overflow?"hidden":"unset"}},components:{sticker:d},created:function(){this.getissue()}},C={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.data?s("div",{staticClass:"main-contaienr"},[s("div",{ref:"epic",staticClass:"container epic"},[s("transition-group",{attrs:{appear:"",mode:"out-in",name:"sticker"}},e._l(e.data,function(t,i){return s("sticker",{key:t.number+"epic",class:{sticker:!0,selected:i===e.epici},attrs:{list:t},nativeOn:{click:function(t){return e.selEpic(i)}}})}),1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.epicState,expression:"epicState"}],staticClass:"add",on:{click:e.addEpic}},[s("span",[e._v("+")])])],1),e._v(" "),s("div",{ref:"story",staticClass:"container userstory"},[s("transition-group",{attrs:{appear:"",mode:"out-in",name:"sticker"}},e._l(e.data[e.epici].nodes,function(t,i){return s("sticker",{directives:[{name:"show",rawName:"v-show",value:void 0!==t.title,expression:"typeof story.title !== 'undefined'"}],key:t.number+"story",class:{sticker:!0,selected:i===e.userstoryi},attrs:{list:t},nativeOn:{click:function(t){return e.selStory(i)}}})}),1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.storyState,expression:"storyState"}],staticClass:"add",on:{click:e.addStory}},[s("span",[e._v("+")])])],1),e._v(" "),s("div",{ref:"task",staticClass:"container task"},[s("transition-group",{attrs:{appear:"",mode:"out-in",name:"sticker"}},e._l(e.data[e.epici].nodes[e.userstoryi].nodes,function(t,i){return s("sticker",{directives:[{name:"show",rawName:"v-show",value:void 0!==t.title,expression:"typeof task.title !== 'undefined'"}],key:t.number+"task",class:{sticker:!0,selected:i===e.taski},attrs:{list:t},nativeOn:{click:function(t){return e.selTask(i)}}})}),1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.taskState,expression:"taskState"}],staticClass:"add",on:{click:e.addTask}},[s("span",[e._v("+")])])],1),e._v(" "),s("div",{ref:"extend",staticClass:"container extend"},[e.judge()?[s("transition-group",{attrs:{appear:"",mode:"out-in",name:"sticker"}},e._l(e.data[e.epici].nodes[e.userstoryi].nodes[e.taski].nodes,function(t){return s("sticker",{directives:[{name:"show",rawName:"v-show",value:void 0!==t.title,expression:"typeof extend.title !== 'undefined'"}],key:t.number+"extend",staticClass:"sticker",attrs:{list:t},nativeOn:{click:function(t){return e.selExtend(t)}}})}),1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.extendState,expression:"extendState"}],staticClass:"add",on:{click:e.addExtend}},[s("span",[e._v("+")])])]:e._e()],2)]):e._e()},staticRenderFns:[]};var S=s("C7Lr")(x,C,!1,function(e){s("uD1G")},"data-v-47e3df91",null).exports;i.a.use(r.a);var E=new r.a({routes:[{path:"/",name:"StoryList",component:S}]});i.a.config.productionTip=!1,new i.a({el:"#app",router:E,components:{App:a},template:"<App/>"})},s59O:function(e,t){},sewH:function(e,t){},uD1G:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.cae168879c09bdbd20ac.js.map