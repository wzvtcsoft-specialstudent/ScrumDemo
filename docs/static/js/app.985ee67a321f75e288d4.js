webpackJsonp([1],{"5J7e":function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("xd7I"),s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var o=n("C7Lr")({name:"App"},s,!1,function(e){n("zKXW")},null,null).exports,a=n("3XdE"),i=n("3cXf"),l=n.n(i),u=n("aozt"),c=n.n(u),d=(n("6iV/"),c.a.create({baseURL:"https://api.github.com/graphql",timeout:5e3})),f=["2a2c211ce","e7e68750a0","c104493651","80422b95a62"];d.interceptors.request.use(function(e){return e.headers={"Content-Type":"application/json",Authorization:" bearer "+f.reverse().join("")+" "},e});var m=d;n("+YgL");var p=[],h=[],v=[],b=null,g=[];function y(e){var t={},n=b[e-1].title;if(t.title=n,t.day="未设置",0!==b[e-1].assignees.nodes.length&&(t.assignees=[],b[e-1].assignees.nodes.forEach(function(e){t.assignees.push({name:e.name,img:e.avatarUrl,color:g[e.name]})})),0!=b[e-1].labels.totalCount){var r=[];b[e-1].labels.nodes.forEach(function(e){isNaN(e.name)?r.push({name:e.name,bgcolor:e.color,ftcolor:function(e){for(var t=[],n=0;n<6;n+=2)t.push(parseInt("0x"+e.slice(n,n+2)));return.299*t[0]+.578*t[1]+.114*t[2]>192?"black":"white"}(e.color)}):t.day={name:e.name,color:e.color}}),t.labels=r}return 0===b[e-1].timelineItems.nodes.length?t:(t.nodes=[],b[e-1].timelineItems.nodes.forEach(function(e){void 0!==e.source&&t.nodes.push(y(e.source.number))}),t)}function _(e){return(b=e).forEach(function(e){e.timelineItems.nodes.forEach(function(e){void 0!==e.source&&p.push(e.source.number)})}),b.forEach(function(e){-1===p.indexOf(e.number)&&h.push(e.number)}),h.forEach(function(e){v.push(y(e))}),console.log(v),v}g.youlik="orange",g["诸葛康亮我最帅"]="lightgreen",g.Shimizu="red",g.SprWu="deepskyblue",g.Lieatfhy="yellow",g["动感超人"]="blue",g.Salexal="green",g["刘笑锋"]="black";var E={name:"subList",data:function(){return{status:!0}},props:{list:Array},methods:{onFocus:function(e){var t=this.$refs.span[e].parentNode;for(t=this.getParentNode(t);"tree"!==this.getParentNode(t).id;)t.children[1].style.border="1.5px solid orange",t=this.getParentNode(t)},onBlur:function(e){var t=this.$refs.span[e].parentNode;for(t=this.getParentNode(t);"tree"!==this.getParentNode(t).id;)t.children[1].style.removeProperty("border"),t=this.getParentNode(t)},getParentNode:function(e){return e.parentNode.parentNode}},filters:{showDay:function(e){return void 0===e?"未设置":e}},created:function(){"undefined"===this.list&&(this.status=!1)}},C={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",e._l(e.list,function(t,r){return n("li",{key:r},[n("label",{staticClass:"timeLabel",style:"backgroundColor:#"+t.day.color,attrs:{title:"完成天数"}},[e._v(e._s(e._f("showDay")(t.day.name)))]),e._v(" "),n("span",{ref:"span",refInFor:!0,staticClass:"span",on:{mouseover:function(t){return e.onFocus(r)},mouseout:function(t){return e.onBlur(r)}}},[e._v(e._s(t.title))]),e._v(" "),e._l(t.assignees,function(e,t){return n("div",{key:t,staticClass:"assignLabel",style:"marginLeft:3px; border:1.5px solid "+e.color,attrs:{title:e.name}},[n("img",{staticClass:"img",attrs:{src:e.img,width:"30",height:"30",alt:e.name}})])}),e._v(" "),e._l(t.labels,function(t,r){return n("label",{key:r+"label",staticClass:"label",style:"backgroundColor:#"+t.bgcolor+";color:"+t.ftcolor},[e._v(e._s(t.name))])}),e._v(" "),e.status?n("sub-list",{attrs:{list:t.nodes}}):e._e()],2)}),0)},staticRenderFns:[]};var N={data:function(){return{title:"",data:null}},components:{subList:n("C7Lr")(E,C,!1,function(e){n("5J7e")},"data-v-4661ded1",null).exports},methods:{init:function(){var e,t=this;(e={query:'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo"){ id name issues(first:100){  totalCount nodes{  title number body assignees(first:100){ nodes{  name avatarUrl} }labels(first:100){totalCount nodes{  name color} } timelineItems(first:20,itemTypes:[REFERENCED_EVENT,CROSS_REFERENCED_EVENT]){ totalCount nodes{ ...on CrossReferencedEvent{ source{ ...on Issue{  number  title labels(first:100){ totalCount  nodes{  name color } } assignees(first:100){  totalCount  nodes{ name } } } }target{  ...on Issue{ number  author{  avatarUrl }}} }}} } }}}}'},m({method:"POST",data:l()(e)})).then(function(e){t.title=e.data.data.organization.repository.name,t.data=_(e.data.data.organization.repository.issues.nodes)})}},created:function(){this.init()}},L={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"tree"}},[t("ul",[t("li",[t("span",[this._v(this._s(this.title)+" 需求地图")]),this._v(" "),t("sub-list",{attrs:{list:this.data}})],1)])])},staticRenderFns:[]};var I=n("C7Lr")(N,L,!1,function(e){n("bEIC")},"data-v-55f77fe4",null).exports;r.a.use(a.a);var k=new a.a({routes:[{path:"/",name:"StoryList",component:I}]});r.a.config.productionTip=!1,new r.a({el:"#app",router:k,components:{App:o},template:"<App/>"})},bEIC:function(e,t){},zKXW:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.985ee67a321f75e288d4.js.map