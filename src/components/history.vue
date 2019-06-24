<template>
  <div class="history-main">
    <div class="history-title">
      <div class="menu" @click="clickMenu">
        <img src="@/assets/img/menu.png">
        <div class="menu-item" v-show="menuState" @mouseleave="menuState = false">
          <router-link to="/" tag="span" class="link-item">Home</router-link>
          <router-link to="/storyList" tag="span" class="link-item">Story Map</router-link>
          <router-link to="/history" tag="span" class="link-item">History Sprint</router-link>
        </div>
      </div>
      <!-- <div class="add-task" @click="dialogState = true">Add Task</div> -->
      <div class="container" style="marginLeft:116px">
        <div class="sub labels" @click="labelsState = !labelsState">
          <div>Labels</div>
          <img src="@/assets/img/infodrop.png">
        </div>
        <div class="list" v-show="labelsState" @mouseleave="selComplete(1)">
          <ul>
            <li v-for="(lab,i) in labels" :key="i">
              <img src="@/assets/img/select.png" class="select" @click="selLab($event,i)">
              <div class="list-name">{{ lab.name }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="container">
        <div class="sub assignees" @click="assigneesState = !assigneesState">
          <div>Assignees</div>
          <img src="@/assets/img/infodrop.png">
        </div>
        <div class="list" v-show="assigneesState" @mouseleave="selComplete(2)">
          <ul>
            <li v-for="(assi,i) in assignees" :key="i">
              <img src="@/assets/img/select.png" class="select" @click="selAssi($event,i)">
              <div class="list-name">{{ assi.name }}</div>
            </li>
          </ul>
        </div>
      </div>
      <img src="@/assets/img/sousuo.png" class="icon">
      <input
        type="text"
        class="search"
        placeholder="Search all tasks"
        v-model="word"
        @keydown.enter="selComplete(3)"
      >
    </div>
    <div class="history-body" v-show="state">
      <div class="selectbox">
        <div class="sprint-item" v-for="(spr, i) in sprintInfo" :key="spr.id" @click="selSprint(i)">{{ spr.name }}</div>
      </div>
      <div class="body-container">
        <span class="title">Future</span>
        <div class="issue-container">
          <sticker
            v-for="(card, i) in listIssue[0]"
            :key="card.id"
            :list="card.issue"
            class="sticker"
          ></sticker>
        </div>
      </div>
      <div class="body-container">
        <span class="title">To do</span>
        <div class="issue-container">
          <sticker
            v-for="(card, i) in listIssue[1]"
            :key="card.id"
            :list="card.issue"
            class="sticker"
          ></sticker>
        </div>
      </div>
      <div class="body-container">
        <span class="title">Doing</span>
        <div class="issue-container">
          <sticker
            v-for="(card, i) in listIssue[2]"
            :key="card.id"
            :list="card.issue"
            class="sticker"
          ></sticker>
        </div>
      </div>
      <div class="body-container">
        <span class="title">Done</span>
        <div class="issue-container">
          <sticker
            v-for="(card, i) in listIssue[3]"
            :key="card.id"
            :list="card.issue"
            class="sticker"
          ></sticker>
        </div>
      </div>
      <!-- <add-dialog :connect="'0'" :type="'Task'" @state="changeState" v-if="dialogState"></add-dialog> -->
    </div>
  </div>
</template>

<script>
import sticker from "./sticker";
import addDialog from "./addDialog";
import { getIssue } from "@/api/getIssue";
import { moveCard } from "@/api/card";
import { fixBoradData } from "@/assets/js/fixBoradData";

function judge(obj, val) {
  for (let key in obj) {
    if (obj[key].id == val) return false;
  }
  return true;
}

export default {
  name: "history",
  data() {
    return {
      state: false, // 是否开始渲染issue页面
      assignees: [],
      labels: [],
      sprintInfo: [], // 所有里程碑的信息
      sprintIndex: 0, // 选中的里程碑索引
      listInfo: [], // 总列表的信息
      listIssue: [], // 所有列表的issue集
      staIssue: [], // 静态issue集
      labelsState: false,
      assigneesState: false,
      labSel: [], // 选择的labels
      assiSel: [], // 选择的assignees
      word: "", // 搜索的内容
      //   dialogState: false,
      menuState: false,
      labChange: false, // 是否显示的是源数据
      assiChange: false,
      searchNaN: false, // 上次搜索是否没有结果
      clickx: 0,
      dropIndex: 0
    };
  },
  components: {
    sticker,
    addDialog
  },
  methods: {
    /* 鼠标拖动 */
    // drop(e) {
    //   this.clickx = e.clientX;
    // },
    // dropend(e, card, i, index) {
    //   let diff = e.clientX - this.clickx,
    //     num = 0;
    //   num = parseInt(diff / 300);
    //   if (diff % 300 >= 160) num++;
    //   if (num == 0 || index + num > 3) return;
    //   let temp = this.staIssue[index].splice(i, 1);
    //   this.staIssue[index + num].push(...temp);
    //   let params = {
    //     query:
    //       'mutation{moveProjectCard(input:{cardId:"' +
    //       card.id +
    //       '",columnId:"' +
    //       this.listInfo[index + num].id +
    //       '"}){cardEdge{node{content{... on Issue{body}}}}}}'
    //   };
    //   moveCard(params).then(res => {
    //     if (typeof res.data.data.errors != "undefined") {
    //       console.log("拖放出错");
    //     }
    //   });
    // },
    // prev(e) {
    //   e.preventDefault();
    // },
    // getinfo() {
    //   let params = {
    //     query:
    //       'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo") {assignableUsers(first:20){totalCount nodes {id name}}labels(first:20){totalCount nodes {color id name}} projects(first:47, orderBy:{field:CREATED_AT,direction:DESC}){ totalCount nodes { id name columns(first:4){ nodes{id name cards(first:60){ nodes{ id column { id } state content{ ... on Issue{ id title number url body assignees(first:20) {totalCount  nodes {avatarUrl name updatedAt}} labels(first:20) { totalCount nodes {color name}}}}}}}}}}}}}'
    //   };
    //   getIssue(params).then(res => {
    //     let data = res.data.data.organization.repository,
    //       nowData = {};
    //     nowData = data.projects.nodes.shift();
    //     this.$store.commit("setAssignees", data.assignableUsers.nodes);
    //     this.$store.commit("setLabels", data.labels.nodes);
    //     this.$store.commit("setBoardData", data.projects.nodes);
    //     this.assignees = data.assignableUsers.nodes;
    //     this.labels = data.labels.nodes;
    //     var labLens = this.labels.length,
    //       assiLens = this.assignees.length;
    //     for (let i = 0; i < labLens; i++) {
    //       this.labSel[i] = false;
    //     }
    //     for (let j = 0; j < assiLens; j++) {
    //       this.assiSel[j] = false;
    //     }
    //     /* 对源数据进行初次整合 */
    //     let allData = [];
    //     nowData.columns.nodes.forEach(list => {
    //       this.listInfo.push({
    //         name: list.name,
    //         id: list.id
    //       });
    //       let subData = [];
    //       list.cards.nodes.forEach(item => {
    //         subData.push({
    //           id: item.id,
    //           issue: item.content
    //         });
    //       });
    //       allData.push(subData);
    //     });
    //     this.listIssue = fixBoradData(allData);
    //     this.staIssue = this.listIssue;
    //     this.state = true;
    //   });
    // },
    
    /* 选择里程碑 */
    selSprint(i) {
        this.sprintIndex = i;
        this.listIssue = this.staIssue[i];
        console.log(i);
    },
    clickMenu() {
      this.menuState = !this.menuState;
    },
    /* 选择labels标签 */
    selLab(e, index) {
      if (this.labSel[index]) {
        e.currentTarget.src = require("@/assets/img/select.png");
        this.labSel[index] = false;
      } else {
        e.currentTarget.src = require("@/assets/img/selected.png");
        this.labSel[index] = true;
      }
    },
    labelScreen() {
      this.labelsState = false;
      let selected = [],
        result = [],
        sub = [];
      this.labSel.forEach((state, i) => {
        if (state) {
          selected.push(this.labels[i].name);
        }
      });
      if (selected.length == 0) {
        if (this.labChange) {
          this.labChange = false;
          this.listIssue = this.staIssue[this.sprintIndex];
        }
        return;
      }
      this.listIssue.forEach(line => {
        let sub = [];
        line.forEach(item => {
          item.issue.labels.forEach(lab => {
            if (selected.indexOf(lab.name) !== -1 && judge(sub, item.id)) {
              sub.push(item);
            }
          });
        });
        result.push(sub);
      });
      this.labChange = true;
      this.listIssue = result;
    },
    /* 选择assignees标签 */
    selAssi(e, index) {
      if (this.assiSel[index]) {
        e.currentTarget.src = require("@/assets/img/select.png");
        this.assiSel[index] = false;
      } else {
        e.currentTarget.src = require("@/assets/img/selected.png");
        this.assiSel[index] = true;
      }
    },
    assiScreen() {
      this.assigneesState = false;
      let selected = [],
        result = [],
        sub = [];
      this.assiSel.forEach((state, i) => {
        if (state) {
          selected.push(this.assignees[i].name);
        }
      });
      if (selected.length == 0) {
        if (this.assiChange) {
          this.assiChange = false;
          this.listIssue = this.staIssue[this.sprintIndex];
        }
        return;
      }
      this.listIssue.forEach(line => {
        let sub = [];
        line.forEach(item => {
          if (
            typeof item.issue.assignees != "undefined" &&
            selected.indexOf(item.issue.assignees.name) != -1
          ) {
            sub.push(item);
          }
        });
        result.push(sub);
      });
      this.assiChange = true;
      this.listIssue = result;
    },
    changeState(val) {
      this.dialogState = false;
    },
    /* 选择完筛选条件后执行 */
    selComplete(state) {
      // 通过state来判断两个方法的执行先后顺序
      switch (state) {
        case 1:
        case 3:
          this.search();
          this.labelScreen();
          this.assiScreen();
          break;
        case 2:
          this.search();
          this.assiScreen();
          this.labelScreen();
          break;
      }
    },
    search() {
      if (this.word == "") {
        this.listIssue = this.staIssue[this.sprintIndex];
        return;
      }
      if (this.searchNaN) this.listIssue = this.staIssue[this.sprintIndex];
      let result = [],
        nohave = true;
      this.listIssue.forEach(line => {
        let sub = [];
        line.forEach(item => {
          if (
            item.issue.title.indexOf(this.word) != -1 &&
            judge(sub, item.id)
          ) {
            sub.push(item);
          }
        });
        if (sub.length != 0) nohave = false;
        result.push(sub);
      });
      if (nohave) this.searchNaN = true;
      this.listIssue = result;
    },
    initData() {
      let data = JSON.parse(localStorage.getItem("history"));
      console.log(data);
      var sprintInfo = [],result = [],fixresult = [];
      var projectData = [],projectInfo = [],issueData = []
      for(let i in data) {
        sprintInfo.push({
          id: data[i].id,
          name: data[i].name
        })
        console.log('-----------------------------');
        // projectInfo  每一列的id和name
        projectData = []
        projectInfo = [] 
        data[i].columns.nodes.forEach(list => {
          projectInfo.push({
            id: list.id,
            name: list.name
          })
          issueData = []
          list.cards.nodes.forEach(item => {
            issueData.push({
              id: item.id,
              issue: item.content
            })
          })
          projectData.push(issueData)
        })
        result.push(fixBoradData(projectData))
      }
      for(let i =0,lens = result[0].length; i<lens;i+=4) {
        fixresult.push(result[0].slice(i,i+4))
      }
      this.staIssue = fixresult;
      this.listInfo = projectInfo;
      this.listIssue = fixresult[0];
      this.sprintInfo = sprintInfo;
      this.assignees = JSON.parse(localStorage.getItem('assignees'));
      this.labels = JSON.parse(localStorage.getItem('labels'))
      this.state = true;
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style  scoped>
* {
  border: 0;
  margin: 0;
  padding: 0;
}
ul {
  margin: 0;
  padding: 0;
  border: 0;
  list-style-type: none;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(234, 236, 238, 1);
}
li {
  display: inline-block;
  width: 164px;
  height: 31px;
}
.history-main {
  width: 1526px;
  height: 712px;
}

.history-body {
  width: 100%;
  height: 651px;
  margin-top: 8px;
}

.history-title {
  width: 100%;
  height: 50px;
  background: rgba(250, 251, 252, 1);
  opacity: 1;
}
.selectbox {
  width: 160px;
  height: 625px;
  margin: 0 0 0 15px;
  padding: 10px 10px 15px 10px;
  border: 1px solid rgba(214, 218, 222, 1);
  float: left;
  cursor: pointer;
}
.sprint-item {
  width: 100%;
  height: 95px;
  background:rgba(250,251,252,1);
  margin-bottom: 6px;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 95px;
  color: rgba(112, 112, 112, 1);
  overflow: hidden;
}
.menu {
  margin: 9px 0 0 15px;
  cursor: pointer;
  float: left;
}
.menu-item {
  width: 8.5%;
  height: 102px;
  position: absolute;
  left: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  z-index: 999;
}
.link-item {
  display: block;
  width: auto;
  height: 16px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 27px;
  color: rgba(112, 112, 112, 1);
  opacity: 1;
  margin: 12px 0 0 8.82%;
}
.link-item:hover {
  color: #2680eb;
}

/* // .add-task {
//   width: 104px;
//   height: 32px;
//   display: block;
//   text-align: center;
//   line-height: 32px;
//   font-size: 14px;
//   font-family: Source Han Sans CN;
//   font-weight: 400;
//   color: rgba(255, 255, 255, 1);
//   margin: 9px 0 0 116px;
//   background: rgba(38, 128, 235, 1);
//   border-radius: 5px;
//   float: left;
//   cursor: pointer;
// } */
.container {
  width: 118px;
  position: relative;
  margin: 9px 0 0 12px;
  float: left;
}
.sub {
  width: 118px;
  height: 32px;
  position: relative;
  background: rgba(218, 218, 218, 1);
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}
.labels div {
  display: block;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(112, 112, 112, 1);
  opacity: 1;
  float: left;
  margin: 6px 0 0 28px;
}
.assignees div {
  display: block;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(112, 112, 112, 1);
  opacity: 1;
  float: left;
  margin: 6px 0 0 18px;
}
.labels img {
  width: 16px;
  height: 16px;
  float: left;
  margin: 8px 0 0 12px;
}
.assignees img {
  width: 16px;
  height: 16px;
  float: left;
  margin: 8px 0 0 8px;
}
.list {
  position: absolute;
  top: 32px;
  z-index: 999;
}
.select {
  width: 14px;
  height: 14px;
  float: left;
  margin: 13px 0 0 12px;
  cursor: pointer;
}
.list-name {
  float: left;
  margin: 13px 0 0 7px;
}
.icon {
  width: 16px;
  height: 16px;
  padding: 8px;
  margin: 9px 0 0 12px;
  border: 1px solid rgba(214, 218, 222, 1);
  border-right: none;
  float: left;
}
.search {
  width: 299px;
  height: 32px;
  background: rgba(250, 251, 252, 1);
  margin: 9px 0 0 0;
  border: 1px solid rgba(214, 218, 222, 1);
  border-left: none;
  float: left;
}
.search:focus {
  outline: none;
}

.body-container {
  border: 1px solid rgba(214, 218, 222, 1);
  width: 318px;
  min-width: 280px;
  height: 635px;
  margin-left: 12px;
  padding-bottom: 15px;
  float: left;
}
.issue-container {
  width: 298px;
  height: 595px;
  min-width: 280px;
  padding: 0 10px 0 10px;
  margin-top: 9px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.title {
  width: 91%;
  height: 40px;
  background: rgba(250, 251, 252, 1);
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 40px;
  color: rgba(112, 112, 112, 1);
  display: block;
  padding-left: 12px;
  margin: 2% 6% 0 3%;
}
.sticker {
  width: 263px !important;
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 1);
}

::-webkit-scrollbar {
  width: 6px;
  height: 670px;
}
::-webkit-scrollbar-thumb {
  width: 6px;
  height: 212px;
  background: rgba(210, 210, 210, 1);
  opacity: 1;
  border-radius: 19px;
}
</style>


/* let params = {
        query:
          'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo") {assignableUsers(first:20){totalCount nodes {id name}}labels(first:20){totalCount nodes {color id name}} projects(first:47, orderBy:{field:CREATED_AT,direction:DESC}){ totalCount nodes { id name columns(first:4){ nodes{id name cards(first:60){ nodes{ id column { id } state content{ ... on Issue{ id title number url body assignees(first:20) {totalCount  nodes {avatarUrl name updatedAt}} labels(first:20) { totalCount nodes {color name}}}}}}}}}}}}}'
      };
      getIssue(params).then( res => {
        let data = res.data.data.organization.repository.projects.nodes;
        data = data.shift();
        console.log(data);
         var sprintInfo = [],result = [],fixresult = [];
      var projectData = [],projectInfo = [],issueData = []
      for(let i in data) {
        sprintInfo.push({
          id: data[i].id,
          name: data[i].name
        })
        console.log('-----------------------------');
        // projectInfo  每一列的id和name
        projectData = []
        projectInfo = [] 
        data[i].columns.nodes.forEach(list => {
          projectInfo.push({
            id: list.id,
            name: list.name
          })
          issueData = []
          list.cards.nodes.forEach(item => {
            issueData.push({
              id: item.id,
              issue: item.content
            })
          })
          projectData.push(issueData)
        })
        result.push(fixBoradData(projectData))
      }
      for(let i =0,lens = result[0].length; i<lens;i+=4) {
        fixresult.push(result[0].slice(i,i+4))
      }
      this.staIssue = fixresult;
      this.listInfo = projectInfo;
      this.listIssue = fixresult[0];
      this.sprintInfo = sprintInfo;
      this.assignees = JSON.parse(localStorage.getItem('assignees'));
      this.labels = JSON.parse(localStorage.getItem('labels'))
      this.state = true; */