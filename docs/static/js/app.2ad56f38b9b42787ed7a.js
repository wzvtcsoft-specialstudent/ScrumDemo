webpackJsonp([1],{"+v9c":function(e,t){},JKkS:function(e,t){},NHnr:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s("xd7I"),a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var n=s("C7Lr")({name:"App"},a,!1,function(e){s("s59O")},null,null).exports,o=s("3XdE"),r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"sticker-container"},[void 0!==e.list.assignees?s("div",{staticClass:"info"},[s("img",{attrs:{src:e.list.assignees.img,width:"37px",height:"37px"}}),e._v(" "),s("span",{staticClass:"name"},[e._v(e._s(e.list.assignees.name))]),e._v(" "),s("span",{staticClass:"time"},[e._v(e._s(e._f("fixTime")(e.list.assignees.time)))])]):e._e(),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:void 0!==e.list.title,expression:"typeof list.title !== 'undefined'"}],staticClass:"context"},[s("a",{attrs:{href:e.list.issueUrl,target:"view_window"}},[e._v("#"+e._s(e.list.number))]),e._v(" "),s("span",[e._v(e._s(e.list.title))])]),e._v(" "),s("div",{staticClass:"labels-container"},e._l(e.list.labels,function(t,i){return s("div",{key:i,staticClass:"label",style:"backgroundColor:#"+t.bgcolor+";color:"+t.ftcolor},[s("span",{staticClass:"label-name"},[e._v(e._s(t.name))])])}),0)])},staticRenderFns:[]};var c=s("C7Lr")({name:"sticker",data:function(){return{}},props:["list"],created:function(){},filters:{fixTime:function(e){return e.substr(0,10)+" "+e.substr(11,8)}}},r,!1,function(e){s("sewH")},"data-v-4bbebd9d",null).exports,l=s("3cXf"),d=s.n(l),u=s("aozt"),h=s.n(u),v=(s("6iV/"),h.a.create({baseURL:"https://api.github.com/graphql",timeout:1e4})),p=["2a2c211ce","e7e68750a0","c104493651","80422b95a62"].reverse().join("");v.interceptors.request.use(function(e){return e.headers={"Content-Type":"application/json",Authorization:" bearer "+p+" "},e});var f=v;var m={name:"addDialog",data:function(){return{assignees:this.$store.getters.getAssignees,labels:this.$store.getters.getLabels,title:"",body:"",people:[],lab:[]}},props:["connect"],methods:{confirm:function(){var e=this;if(""!=this.title.trim()&&""!=this.body.trim()){var t=this.lab.map(function(e){return'"'+e+'"'}).join(","),s=this.people.map(function(e){return'"'+e+'"'}).join(","),i=this.body.replace(/#\d/g,"");0!=this.connect&&(i=i+" #"+this.connect);var a,n={query:'mutation{createIssue(input:{repositoryId:"MDEwOlJlcG9zaXRvcnkxODcxMTgwMTM=",title:"'+this.title+'",body:"'+i+'",assigneeIds:['+s+"],labelIds:["+t+"]}){issue{ body  title}}}"};this.title="",this.body="",console.log(n),(a=n,f({method:"POST",data:d()(a)})).then(function(t){console.log(t),e.$emit("state",null!=t.data.data.createIssue)})}},cancel:function(){this.$emit("state",!1)}}},b={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"dialog-container"},[s("div",{staticClass:"dialog"},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.title,expression:"title"}],staticClass:"issue-title",attrs:{type:"text",placeholder:"Title"},domProps:{value:e.title},on:{input:function(t){t.target.composing||(e.title=t.target.value)}}}),e._v(" "),s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.body,expression:"body"}],staticClass:"issue-body",attrs:{placeholder:"Leave a comment"},domProps:{value:e.body},on:{input:function(t){t.target.composing||(e.body=t.target.value)}}}),e._v(" "),s("div",{staticClass:"inform"},[s("div",{staticClass:"box"},[s("details",[s("summary",[e._v("添加负责人")]),e._v(" "),s("div",{staticClass:"labels"},[s("el-checkbox-group",{model:{value:e.people,callback:function(t){e.people=t},expression:"people"}},e._l(e.assignees,function(t){return s("el-checkbox",{key:t.id,staticClass:"checkbox",attrs:{label:t.id}},[e._v(e._s(t.name))])}),1)],1)])]),e._v(" "),s("div",{staticClass:"box"},[s("details",[s("summary",[e._v("添加标签")]),e._v(" "),s("div",{staticClass:"labels"},[s("el-checkbox-group",{model:{value:e.lab,callback:function(t){e.lab=t},expression:"lab"}},e._l(e.labels,function(t){return s("el-checkbox",{key:t.id,staticClass:"checkbox",attrs:{label:t.id}},[e._v(e._s(t.name))])}),1)],1)])])]),e._v(" "),s("div",{staticClass:"sub-buttom"},[s("button",{staticClass:"confirm",on:{click:e.confirm}},[e._v("创建Issue")]),e._v(" "),s("button",{staticClass:"cancel",on:{click:e.cancel}},[e._v("取消创建")])])])])},staticRenderFns:[]};var y=s("C7Lr")(m,b,!1,function(e){s("+v9c")},"data-v-091cd33f",null).exports;s("+YgL");var g=[],k=[],_=[],w=null,x=[];function C(e){for(var t=[],s=0;s<6;s+=2)t.push(parseInt("0x"+e.slice(s,s+2)));return.299*t[0]+.578*t[1]+.114*t[2]>192?"black":"white"}function S(e){var t={},s=function(e){for(var t in w)if(w[t].number==e)return w[t]}(e),i=s.title,a=s.number,n=s.url;if(t.number=a,t.baseurl=n,t.title=i,t.number=s.number,t.issueUrl=s.url,t.nodes=[],0!==s.assignees.nodes.length&&(t.assignees={name:s.assignees.nodes[0].name,img:s.assignees.nodes[0].avatarUrl,color:x[s.assignees.nodes[0].name],time:s.assignees.nodes[0].updatedAt}),0!=s.labels.totalCount){var o=[];s.labels.nodes.forEach(function(e){isNaN(e.name)?o.push({name:e.name,bgcolor:e.color,ftcolor:C(e.color)}):o.unshift({name:e.name,bgcolor:e.color,ftcolor:C(e.color)})}),t.labels=o}return 0===s.timelineItems.nodes.length?(t.nodes.push({nodes:null}),t):(s.timelineItems.nodes.forEach(function(e){void 0!==e.source&&t.nodes.push(S(e.source.number))}),t)}function E(e){return(w=e).forEach(function(e){e.timelineItems.nodes.forEach(function(e){void 0!==e.source&&g.push(e.source.number)})}),w.forEach(function(e){-1===g.indexOf(e.number)&&k.push(e.number)}),k.forEach(function(e){_.push(S(e))}),_}x.youlik="orange",x["诸葛康亮我最帅"]="lightgreen",x.Shimizu="red",x.SprWu="deepskyblue",x.Lieatfhy="yellow",x["动感超人"]="blue",x.Salexal="green",x["刘笑锋"]="black";var I={data:function(){return{data:null,epici:0,userstoryi:0,taski:0,epicState:!1,storyState:!1,taskState:!1,extendState:!1,dialogState:!1,connectIssue:0}},methods:{extendData:function(){try{return this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes}catch(e){return[]}},getissue:function(){var e,t=this;(e={query:'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo"){assignableUsers(first:20){totalCount nodes {id name}}labels(first:20){totalCount nodes {color id name}} id name issues(states:[OPEN],first:100){  totalCount nodes{  title number url body assignees(first:100){ nodes{  name avatarUrl updatedAt} }labels(first:100){totalCount nodes{  name color} } timelineItems(first:20,itemTypes:[REFERENCED_EVENT,CROSS_REFERENCED_EVENT]){ totalCount nodes{ ...on CrossReferencedEvent{ source{ ...on Issue{  number  title labels(first:100){ totalCount  nodes{  name color } } assignees(first:100){  totalCount  nodes{ name } } } }target{  ...on Issue{ number  author{  avatarUrl }}} }}} } }}}}'},f({method:"POST",data:d()(e)})).then(function(e){t.data=E(e.data.data.organization.repository.issues.nodes),t.$store.commit("setAssignees",e.data.data.organization.repository.assignableUsers.nodes),t.$store.commit("setLabels",e.data.data.organization.repository.labels.nodes),t.data.length>4&&(t.epicState=!0),void 0!==t.data[t.epici]&&t.data[t.epici].nodes.length>4&&(t.storyState=!0),void 0!==t.data[t.epici].nodes[t.userstoryi]&&t.data[t.epici].nodes[t.userstoryi].nodes.length>4&&(t.taskState=!0),void 0!==t.data[t.epici].nodes[t.userstoryi].nodes[t.taski]&&t.data[t.epici].nodes[t.userstoryi].nodes[t.taski].nodes.length>4&&(t.epicState=!0)})},selEpic:function(e){this.epici=e,this.userstoryi=0,this.taski=0,e>3&&(this.data.unshift(this.data.splice(e,1)[0]),this.epici=0);try{this.storyState=this.data[this.epici].nodes.length>4}catch(e){this.storyState=!1}"unset"==this.$refs.epic.style.overflow&&(this.$refs.epic.style.overflow="hidden")},selStory:function(e){this.userstoryi=e,this.taski=0,e>3&&(this.data[this.epici].nodes.unshift(this.data[this.epici].nodes.splice(e,1)[0]),this.userstoryi=0);try{this.taskState=this.data[this.epici].nodes[this.userstoryi].nodes.length>4}catch(e){this.taskState=!1}"unset"==this.$refs.story.style.overflow&&(this.$refs.story.style.overflow="hidden")},selTask:function(e){this.taski=e,e>3&&this.data[this.epici].nodes[this.userstoryi].nodes.unshift(this.data[this.epici].nodes[this.userstoryi].nodes.splice(e,1)[0]);try{this.extendState=this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes.length>4}catch(e){this.extendState=!1}"unset"==this.$refs.task.style.overflow&&(this.$refs.task.style.overflow="hidden")},selExtend:function(){"unset"==this.$refs.extend.style.overflow&&(this.$refs.extend.style.overflow="hidden")},judge:function(){return null!==this.data[this.epici].nodes[this.userstoryi].nodes&&(null!==this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes&&null!==this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].nodes[0].nodes)},addEpic:function(){var e=this.$refs.epic.style;e.overflow="unset"==e.overflow?"hidden":"unset"},addStory:function(){var e=this.$refs.story.style;e.overflow="unset"==e.overflow?"hidden":"unset"},addTask:function(){var e=this.$refs.task.style;e.overflow="unset"==e.overflow?"hidden":"unset"},addExtend:function(){var e=this.$refs.extend.style;e.overflow="unset"==e.overflow?"hidden":"unset"},changeState:function(e){this.dialogState=!1,e&&window.location.reload()},create:function(e){switch(e){case 0:this.connectIssue=0;break;case 1:this.connectIssue=this.data[this.epici].number;break;case 2:this.connectIssue=this.data[this.epici].nodes[this.userstoryi].number;break;case 3:this.connectIssue=this.data[this.epici].nodes[this.userstoryi].nodes[this.taski].number}this.dialogState=!0}},components:{sticker:c,addDialog:y},created:function(){this.getissue()}},N={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.data?s("div",{staticClass:"main-contaienr"},[s("div",{ref:"epic",staticClass:"container epic"},[s("transition-group",{attrs:{appear:"",mode:"out-in",name:"sticker"}},e._l(e.data,function(t,i){return s("sticker",{key:t.number+"epic",class:{sticker:!0,selected:i===e.epici},attrs:{list:t},nativeOn:{click:function(t){return e.selEpic(i)}}})}),1),e._v(" "),s("div",{staticClass:"create",on:{click:function(t){return e.create(0)}}},[s("span",[e._v("创建Issue")])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.epicState,expression:"epicState"}],staticClass:"add",on:{click:e.addEpic}},[s("span",[e._v("+")])])],1),e._v(" "),s("div",{ref:"story",staticClass:"container userstory"},[s("transition-group",{attrs:{appear:"",mode:"out-in",name:"sticker"}},e._l(e.data[e.epici].nodes,function(t,i){return s("sticker",{directives:[{name:"show",rawName:"v-show",value:void 0!==t.title,expression:"typeof story.title !== 'undefined'"}],key:t.number+"story",class:{sticker:!0,selected:i===e.userstoryi},attrs:{list:t},nativeOn:{click:function(t){return e.selStory(i)}}})}),1),e._v(" "),s("div",{staticClass:"create",on:{click:function(t){return e.create(1)}}},[s("span",[e._v("创建Issue")])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.storyState,expression:"storyState"}],staticClass:"add",on:{click:e.addStory}},[s("span",[e._v("+")])])],1),e._v(" "),s("div",{ref:"task",staticClass:"container task"},[s("transition-group",{attrs:{appear:"",mode:"out-in",name:"sticker"}},e._l(e.data[e.epici].nodes[e.userstoryi].nodes,function(t,i){return s("sticker",{directives:[{name:"show",rawName:"v-show",value:void 0!==t.title,expression:"typeof task.title !== 'undefined'"}],key:t.number+"task",class:{sticker:!0,selected:i===e.taski},attrs:{list:t},nativeOn:{click:function(t){return e.selTask(i)}}})}),1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.data[e.epici].nodes[e.userstoryi].number,expression:"data[epici].nodes[userstoryi].number"}],staticClass:"create",on:{click:function(t){return e.create(2)}}},[s("span",[e._v("创建Issue")])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.taskState,expression:"taskState"}],staticClass:"add",on:{click:e.addTask}},[s("span",[e._v("+")])])],1),e._v(" "),s("div",{ref:"extend",staticClass:"container extend"},[s("transition-group",{attrs:{appear:"",mode:"out-in",name:"sticker"}},e._l(e.extendData(),function(t){return s("sticker",{directives:[{name:"show",rawName:"v-show",value:void 0!==t.title,expression:"typeof extend.title !== 'undefined'"}],key:t.number+"extend",staticClass:"sticker",attrs:{list:t},nativeOn:{click:function(t){return e.selExtend(t)}}})}),1),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.data[e.epici].nodes[e.userstoryi].nodes&&e.data[e.epici].nodes[e.userstoryi].nodes[0].nodes,expression:"data[epici].nodes[userstoryi].nodes && data[epici].nodes[userstoryi].nodes[0].nodes "}],staticClass:"create",on:{click:function(t){return e.create(3)}}},[s("span",[e._v("创建Issue")])]),e._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:e.extendState,expression:"extendState"}],staticClass:"add",on:{click:e.addExtend}},[s("span",[e._v("+")])])],1),e._v(" "),s("add-dialog",{directives:[{name:"show",rawName:"v-show",value:e.dialogState,expression:"dialogState"}],attrs:{connect:e.connectIssue},on:{state:e.changeState}})],1):e._e()},staticRenderFns:[]};var $=s("C7Lr")(I,N,!1,function(e){s("V1cr")},"data-v-04f2edc2",null).exports;i.default.use(o.a);var T=new o.a({routes:[{path:"/",name:"StoryList",component:$}]}),O=s("2bvH");i.default.use(O.a);var L=new O.a.Store({state:{assignees:[],labels:[]},mutations:{setAssignees:function(e,t){e.assignees=t},setLabels:function(e,t){e.labels=t}},getters:{getAssignees:function(e){return e.assignees},getLabels:function(e){return e.labels}}}),R=s("4gzT"),z=s.n(R);s("JKkS");i.default.config.productionTip=!1,i.default.use(z.a),new i.default({el:"#app",router:T,components:{App:n},template:"<App/>",store:L})},V1cr:function(e,t){},s59O:function(e,t){},sewH:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.2ad56f38b9b42787ed7a.js.map