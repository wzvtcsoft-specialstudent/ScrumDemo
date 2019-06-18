<template>
  <div class="board-main">
    <div class="board-title">
      <div class="menu" @click="clickMenu">
        <img src="@/assets/img/menu.png">
        <div class="menu-item" v-show="menuState" @mouseleave="menuState = false">
          <router-link to="/" tag="span" class="link-item">Home</router-link>
          <router-link to="/storyList" tag="span" class="link-item">Story Map</router-link>
          <router-link to="/" tag="span" class="link-item">History Sprint</router-link>
        </div>
      </div>
      <div class="add-task" @click="dialogState = true">Add Task</div>
      <div class="container">
        <div class="sub labels" @click="labelsState = !labelsState">
          <div>Labels</div>
          <img src="@/assets/img/infodrop.png">
        </div>
        <div class="list" v-show="labelsState" @mouseleave="labelsState = false">
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
        <div class="list" v-show="assigneesState" @mouseleave="assigneesState = false">
          <ul>
            <li v-for="(assi,i) in assignees" :key="i">
              <img src="@/assets/img/select.png" class="select" @click="selAssi($event,i)">
              <div class="list-name">{{ assi.name }}</div>
            </li>
          </ul>
        </div>
      </div>
      <img src="@/assets/img/sousuo.png" class="icon">
      <input type="text" class="search" placeholder="Search all tasks">
    </div>
    <div class="board-body" v-show="state">
      <div class="body-container" style="marginLeft:7.25%">
        <span class="title">Future</span>
        <div class="issue-container">
          <sticker
            v-for="(card, i) in boxIssue[0]"
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
            v-for="(card, i) in boxIssue[1]"
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
            v-for="(card, i) in boxIssue[2]"
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
            v-for="(card, i) in boxIssue[3]"
            :key="card.id"
            :list="card.issue"
            class="sticker"
          ></sticker>
        </div>
      </div>
    </div>
    <add-dialog :connect="'0'" :type="'Task'" @state="changeState" v-show="dialogState"></add-dialog>
  </div>
</template>

<script>
import sticker from "./sticker";
import addDialog from './addDialog'
import { getIssue } from "@/api/getIssue";
import { fixBoradData } from "@/assets/js/fixBoradData";

export default {
  name: "board",
  data() {
    return {
      state: false, // 是否开始渲染issue页面
      assignees: this.$store.getters.getAssignees,
      labels: this.$store.getters.getLabels,
      boxInfo: [], // 总列表的信息
      boxIssue: [], // 所有列表的issue集
      labelsState: false,
      assigneesState: false,
      labSel: [], // 选择的labels
      assiSel: [], // 选择的assignees
      dialogState: false,
      menuState: false
    };
  },
  components: {
    sticker,
    addDialog
  },
  methods: {
    getinfo() {
      let params = {
        query:
          'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo") {assignableUsers(first:20){totalCount nodes {id name}}labels(first:20){totalCount nodes {color id name}} projects(first:1){ totalCount nodes { columns(first:4){ nodes{id name cards(first:100){ nodes{ id column { id } state content{ ... on Issue{ id title number url body assignees(first:20) {totalCount  nodes {avatarUrl name updatedAt}} labels(first:20) { totalCount nodes {color name}}}}}}}}}}}}}'
      };
      getIssue(params).then(res => {
        let data = res.data.data.organization.repository;
        this.$store.commit(
          "setAssignees",
          res.data.data.organization.repository.assignableUsers.nodes
        );
        this.$store.commit(
          "setLabels",
          res.data.data.organization.repository.labels.nodes
        );
        this.assignees = data.assignableUsers.nodes;
        this.labels = data.labels.nodes;
        var labLens = this.labels.length,
          assiLens = this.assignees.length;
        for (let i = 0; i < labLens; i++) {
          this.labSel[i] = false;
        }
        for (let j = 0; j < assiLens; j++) {
          this.assiSel[j] = false;
        }
        /* 对源数据进行初次整合 */
        let allData = [];
        data.projects.nodes[0].columns.nodes.forEach(list => {
          this.boxInfo.push({
            name: list.name,
            id: list.id
          });
          let subData = [];
          list.cards.nodes.forEach(item => {
            subData.push({
              id: item.id,
              issue: item.content
            });
          });
          allData.push(subData);
        });
        this.boxIssue = fixBoradData(allData);
        this.state = true;
      });
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
    changeState(val) {
      this.dialogState = false;
    }
  },
  created() {
    this.getinfo();
  }
};
</script>

<style lang="scss" scoped>
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
.board-main {
  width: 1526px;
  height: 712px;
}

.board-body {
  width: 100%;
  height: 651px;
  margin-top: 8px; 
}

.board-title {
  width: 100%;
  height: 50px;
  background: rgba(250, 251, 252, 1);
  opacity: 1;
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

.add-task {
  width: 104px;
  height: 32px;
  display: block;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin: 9px 0 0 116px;
  background: rgba(38, 128, 235, 1);
  border-radius: 5px;
  float: left;
  cursor: pointer;
}
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
  margin-right: 12px;
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
  background:rgba(255,255,255,1);
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
