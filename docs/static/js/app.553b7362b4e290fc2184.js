webpackJsonp([1],{"8OjY":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("xd7I"),i={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var r=n("C7Lr")({name:"App"},i,!1,function(e){n("zKXW")},null,null).exports,a=n("3XdE"),o=n("3cXf"),l=n.n(o),c=n("aozt"),u=n.n(c),d=(n("6iV/"),u.a.create({baseURL:"https://api.github.com/graphql",timeout:5e3})),f=["2a2c211ce","e7e68750a0","c104493651","80422b95a62"];d.interceptors.request.use(function(e){return e.headers={"Content-Type":"application/json",Authorization:" bearer "+f.reverse().join("")+" "},e});var p=d;n("+YgL");var h=[],v=[],m=[],g=null,_=[];function b(e){var t={},n=g[e-1].title;if(t.title=n,t.number=g[e-1].number,t.issueUrl=g[e-1].url,t.day="未设置",t.nodes=[],0!==g[e-1].assignees.nodes.length&&(t.assignees=[],g[e-1].assignees.nodes.forEach(function(e){t.assignees.push({name:e.name,img:e.avatarUrl,color:_[e.name]})})),0!=g[e-1].labels.totalCount){var s=[];g[e-1].labels.nodes.forEach(function(e){isNaN(e.name)?s.push({name:e.name,bgcolor:e.color,ftcolor:function(e){for(var t=[],n=0;n<6;n+=2)t.push(parseInt("0x"+e.slice(n,n+2)));return.299*t[0]+.578*t[1]+.114*t[2]>192?"black":"white"}(e.color)}):t.day={name:e.name,color:e.color}}),t.labels=s}return 0===g[e-1].timelineItems.nodes.length?(t.nodes.push({nodes:null}),t):(g[e-1].timelineItems.nodes.forEach(function(e){void 0!==e.source&&t.nodes.push(b(e.source.number))}),t)}function y(e){return(g=e).forEach(function(e){e.timelineItems.nodes.forEach(function(e){void 0!==e.source&&h.push(e.source.number)})}),g.forEach(function(e){-1===h.indexOf(e.number)&&v.push(e.number)}),v.forEach(function(e){m.push(b(e))}),m}_.youlik="orange",_["诸葛康亮我最帅"]="lightgreen",_.Shimizu="red",_.SprWu="deepskyblue",_.Lieatfhy="yellow",_["动感超人"]="blue",_.Salexal="green",_["刘笑锋"]="black";var E={data:function(){return{data:null,epici:0,storyi:0,storyShow:!0}},methods:{getissue:function(){var e,t=this;(e={query:'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo"){ id name issues(first:100){  totalCount nodes{  title number url body assignees(first:100){ nodes{  name avatarUrl} }labels(first:100){totalCount nodes{  name color} } timelineItems(first:20,itemTypes:[REFERENCED_EVENT,CROSS_REFERENCED_EVENT]){ totalCount nodes{ ...on CrossReferencedEvent{ source{ ...on Issue{  number  title labels(first:100){ totalCount  nodes{  name color } } assignees(first:100){  totalCount  nodes{ name } } } }target{  ...on Issue{ number  author{  avatarUrl }}} }}} } }}}}'},p({method:"POST",data:l()(e)})).then(function(e){t.data=y(e.data.data.organization.repository.issues.nodes)})},selEpic:function(e){this.epici=e,this.storyi=0,(this.$refs.epic.style.height="auto")&&(this.$refs.epic.style.height="150px")},selStory:function(e){this.storyi=e},addEpic:function(){this.$refs.epic.style.height="auto"==this.$refs.epic.style.height?"150px":"auto"}},filters:{screenTask:function(e,t){return void 0===e.nodes?"":e.nodes[t].title}},created:function(){this.getissue()}},C={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.data?n("div",{staticClass:"main-container"},[n("div",{ref:"epic",staticClass:"epic-container"},[e._l(e.data,function(t,s){return n("div",{key:s,class:{selected:s==e.epici,require:!0},on:{click:function(t){return t.target!==t.currentTarget?null:e.selEpic(s)}}},[n("div",{staticClass:"context-container"},[n("span",[n("a",{attrs:{href:t.issueUrl,target:"view_window"}},[e._v("#"+e._s(t.number))]),e._v(e._s(t.title))])]),e._v(" "),n("div",{staticClass:"label-container"},e._l(t.labels,function(t,s){return n("label",{key:s,style:"backgroundColor:#"+t.bgcolor+";color:#"+t.ftcolor},[e._v(e._s(t.name))])}),0)])}),e._v(" "),n("span",{staticClass:"add",on:{click:e.addEpic}},[e._v("+")])],2),e._v(" "),n("hr"),e._v(" "),n("div",{staticClass:"userstory-container"},e._l(e.data[e.epici].nodes,function(t,s){return n("div",{directives:[{name:"show",rawName:"v-show",value:void 0!==t.title,expression:"typeof story.title != 'undefined'"}],key:s,class:{selected:s==e.storyi,require:!0},on:{click:function(t){return t.target!==t.currentTarget?null:e.selStory(s)}}},[n("div",{staticClass:"context-container"},[n("span",[n("a",{attrs:{href:t.issueUrl,target:"view_window"}},[e._v("#"+e._s(t.number))]),e._v(e._s(t.title))])]),e._v(" "),n("div",{staticClass:"label-container"},e._l(t.assignees,function(e,t){return n("label",{key:t},[n("img",{attrs:{src:e.img,alt:"",width:"30",height:"30"}})])}),0)])}),0),e._v(" "),n("hr"),e._v(" "),n("div",{staticClass:"task-container"},e._l(e.data[e.epici].nodes[e.storyi].nodes,function(t,s){return n("div",{directives:[{name:"show",rawName:"v-show",value:void 0!==t.title,expression:"typeof task.title != 'undefined'"}],key:s,staticClass:"require"},[n("div",{staticClass:"context-container"},[n("span",[n("a",{attrs:{href:t.issueUrl,target:"view_window"}},[e._v("#"+e._s(t.number))]),e._v(e._s(t.title))])]),e._v(" "),n("div",{staticClass:"label-container"},e._l(t.assignees,function(e,t){return n("label",{key:t},[n("img",{attrs:{src:e.img,alt:"",width:"30",height:"30"}})])}),0)])}),0)]):e._e()},staticRenderFns:[]};var w=n("C7Lr")(E,C,!1,function(e){n("8OjY")},"data-v-4e76444c",null).exports;s.a.use(a.a);var k=new a.a({routes:[{path:"/",name:"StoryList",component:w}]});s.a.config.productionTip=!1,new s.a({el:"#app",router:k,components:{App:r},template:"<App/>"})},zKXW:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.553b7362b4e290fc2184.js.map