<template>
<div class="board-main">
  <div class="board-title">
    <div class="menu" @click="clickMenu">
      <img src="@/assets/img/menu.png" />
      <div class="menu-item" v-show="menuState" @mouseleave="menuState = false">
        <router-link to="/" tag="span" class="link-item">Home</router-link>
        <router-link to="/storyList" tag="span" class="link-item">Story Map</router-link>
        <router-link to="/history" tag="span" class="link-item">History Sprint</router-link>
        <router-link to="/bug" tag="span" class="link-item">bug</router-link>
      </div>
    </div>
    <div class="container" style="marginLeft:4.19%">
      <div class="sprint_title" @dblclick="editProState = true">{{this.sprint_title}}</div>
    </div>
    <div class="container">
      <div class="sub createPro" @click="createProState = true">Create sprint</div>
    </div>
    <div class="container">
      <div class="sub labels" @click="labelsState = !labelsState">
        <div>Labels</div>
        <img src="@/assets/img/infodrop.png" />
      </div>
      <div class="list" v-show="labelsState" @mouseleave="selComplete(1)">
        <ul>
          <li v-for="(lab,i) in labels" :key="i">
            <img src="@/assets/img/select.png" class="select" @click="selLab($event,i)" />
            <div class="list-name">{{ lab.name }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="sub assignees" @click="assigneesState = !assigneesState">
        <div>Assignees</div>
        <img src="@/assets/img/infodrop.png" />
      </div>
      <div class="list" v-show="assigneesState" @mouseleave="selComplete(2)">
        <ul>
          <li v-for="(assi,i) in assignees" :key="i">
            <img src="@/assets/img/select.png" class="select" @click="selAssi($event,i)" />
            <div class="list-name">{{ assi.name }}</div>
          </li>
        </ul>
      </div>
    </div>
    <img src="@/assets/img/sousuo.png" class="icon" />
    <input type="text" class="search" placeholder="Search all tasks" v-model="word" @keydown.enter="selComplete(3)" />

    <div class="task-container">
      <div class="add-task" @click="showTaskBox">Add Card</div>
      <div class="card-box" v-show="addTaskState" @mouseleave="addTaskState = false">
        <div class="card-search-box">
          <img src="@/assets/img/sousuo.png" />
          <input type="text" placeholder="Search all tasks" v-model="taskword" @keydown.enter="searchTask" />
        </div>
        <div class="task-card-box">
          <div class="task-card" v-for="(addCard, i) in alltask" :key="addCard.number">
            <a :href="addCard.issueUrl">#{{ addCard.number | fixNum }}</a>
            <div class="task-card-title">{{ addCard.title }}</div>
            <img src="@/assets/img/right.png" @click="addTaskCard(addCard.id,i,addCard)" />
          </div>
        </div>
        <!-- <sticker class="task-card" v-for="addCard in alltask" :key="addCard.number + 'card'" :list="addCard"></sticker> -->
      </div>
      <div class="loginIn" @click="delRecord">退出</div>
    </div>

  </div>

  <div class="board-body" v-if="state" @dragenter="prev" @dragover="prev" key="board">
    <div class="body-container" style="marginLeft:7.25%">
      <span class="title">Future</span>
      <div class="issue-container">
        <!--@changecard="movedcard"-->
        <sticker v-for="(card, i) in boxIssue[0]" :key="card.id + 'board'" :comments="commitData[card.issue.number]" :list="card.issue" :isHome="true" :id="card.id" @addcomment="adCmt" @editcomment="edCmt" @edit="clickEdit" draggable="true" @dragstart.native="drop"
          @dragend.native="dropend($event, card, i, 0)" @dragenter.native="prev" @dragover.native="prev" class="sticker"></sticker>
      </div>
    </div>
    <div class="body-container">
      <span class="title">To do</span>
      <div class="issue-container">
        <sticker v-for="(card, i) in boxIssue[1]" :comments="commitData[card.issue.number]" :key="card.id + 'board'" :list="card.issue" :isHome="true" :id="card.id" @addcomment="adCmt" @editcomment="edCmt" @edit="clickEdit" draggable="true" @dragstart.native="drop"
          @dragend.native="dropend($event, card, i, 1)" @dragenter.native="prev" @dragover.native="prev" class="sticker"></sticker>
      </div>
    </div>
    <div class="body-container">
      <span class="title">Doing</span>
      <div class="issue-container">
        <sticker v-for="(card, i) in boxIssue[2]" :comments="commitData[card.issue.number]" :key="card.id + 'board'" :list="card.issue" :isHome="true" :id="card.id" @addcomment="adCmt" @editcomment="edCmt" @edit="clickEdit" draggable="true" @dragstart.native="drop"
          @dragend.native="dropend($event, card, i, 2)" @dragenter.native="prev" @dragover.native="prev" class="sticker"></sticker>
      </div>
    </div>
    <div class="body-container">
      <span class="title">Done</span>
      <div class="issue-container">
        <sticker v-for="(card, i) in boxIssue[3]" :comments="commitData[card.issue.number]" :key="card.id + 'board'" :list="card.issue" :isHome="true" :id="card.id" @addcomment="adCmt" @editcomment="edCmt" @edit="clickEdit" draggable="true" @dragstart.native="drop"
          @dragend.native="dropend($event, card, i, 3)" class="sticker"></sticker>
      </div>
    </div>
    <edit-dialog class="edit-dialog" v-if="editDialogState" :list="editInfo" @state="cgEditState"></edit-dialog>
  </div>
  <div class="not-content" v-if="notState">
    No sprint cycle information，
    <b @click="createProState = true">Click to create</b>
  </div>
  <create-pro style="z-index:999" @state="cgProState" v-if="createProState"></create-pro>
  <edit-pro style="z-index:999" @state="edProState" v-if="editProState" :title="sprint_title" :body="sprint_body" :id="sprint_id"></edit-pro>
  <add-comment v-if="addComState" :data="addComData" :func="cmtFunc" @state="cgCmtState" style="z-index: 999"></add-comment>
</div>
</template>

<script>

import sticker from "./sticker";
import editDialog from "./editDialog";
import createPro from "./createPro";
import editPro from "./editPro";
import addComment from "./addComment";
import {
  closeIssue
} from "@/api/editIssue";
import {
  openIssue
} from "@/api/editIssue";
import {
  getIssue
} from "@/api/getIssue";
import {
  getCommit
} from "@/api/getCommit";
import {
  moveCard,
  addCards,
  getCard
} from "@/api/card";
import {
  fixBoradData
} from "@/assets/js/fixBoradData";
import {
  fixComments
} from "@/assets/js/fixComments";
import {
  findTask
} from "@/assets/js/findTask";

function judge(obj, val) {
  for (let key in obj) {
    if (obj[key].id == val) return false;
  }
  return true;
}

export default {
  name: "board",

  data() {
    return {
      state: false, // 是否开始渲染issue页面(有内容)
      notState: false, // 是否开始渲染创建页面(无内容)
      assignees: this.$store.getters.getAssignees,
      labels: this.$store.getters.getLabels,
      boxInfo: [], // 总列表的信息
      boxIssue: [], // 所有列表的issue集
      staticIssue: [], // 静态issue集
      staticTask: null, // 静态task集
      commitData: [],
      xiangmu: {},
      alltask: null, // 显示的task
      labelsState: false,
      assigneesState: false,
      addTaskState: false,
      editDialogState: false,
      createProState: false,
      editProState: false,
      addComState: false,
      addComData: {}, // 要添加comment的id
      cmtFunc: "add", // 处理comment的类型
      editInfo: null,
      labSel: [], // 选择的labels
      assiSel: [], // 选择的assignees
      word: "", // 搜索的内容
      taskword: "", // 搜索task的内容
      menuState: false,
      labChange: false, // 是否显示的是源数据
      assiChange: false,
      searchNaN: false, // 上次搜索是否没有结果
      clickx: 0,
      dropIndex: 0,
      allCardId: [], // 当前sprint所有task的id
      sprint_title: "",
      sprint_body: "",
      sprint_id: "",
      LOGIN: "",
      NAME: "",
      XIANGMU_ID: "",
      XIANGMU_OWNERID: ""
    };
  },
  components: {
    sticker,
    editDialog,
    createPro,
    editPro,
    addComment
  },
  methods: {
    /* 鼠标拖动 */
    drop(e) {
      this.clickx = e.clientX;
    },
    dropend(e, card, i, index) {
      let diff = e.clientX - this.clickx,
        num = 0;
      num = parseInt(diff / 300);
      if (diff % 300 >= 160) num++;
      if (num == 0 || index + num > 3) return;
      let temp = this.staticIssue[index].splice(i, 1);
      this.staticIssue[index + num].push(...temp);
      if ((index + num) == 3) {

        this.ClosedIssue(card.issue.id)
      } else {
        this.OpenIssue(card.issue.id)
      }
      let params = {
        query: 'mutation{moveProjectCard(input:{cardId:"' +
          card.id +
          '",columnId:"' +
          this.boxInfo[index + num].id +
          '"}){cardEdge{node{content{... on Issue{body}}}}}}'
      };
      moveCard(params).then(res => {
        if (typeof res.data.data.errors != "undefined") {
          console.log("拖放出错");
        }
      });
    },
    prev(e) {
      e.preventDefault();
    },
    getinfo() {
      this.LOGIN = localStorage.getItem('LOGIN')
      this.NAME = localStorage.getItem('NAME')
      this.XIANGMU_ID = localStorage.getItem('XIANGMU_ID')
      this.XIANGMU_OWNERID = localStorage.getItem('XIANGMU_OWNERID')
     
      let params = {
        query: 'query{organization(login:"' +
          this.LOGIN +
          '"){repository(name:"' +
          this.NAME +
          '") {assignableUsers(first:20){totalCount nodes {id name}}labels(first:20){totalCount nodes {color id name}} projects(first:47, orderBy:{field:CREATED_AT,direction:DESC}){ totalCount nodes { id name columns(first:4){ nodes{id name cards(first:60){totalCount nodes{ id column { id } state content{ ... on Issue{ id title state number url body assignees(first:20) {totalCount  nodes {avatarUrl name updatedAt}} labels(first:20) { totalCount nodes {color name}}}}}}}}}}}}}'
      };
      getIssue(params).then(res => {
        console.log("刷新")
        let data = res.data.data.organization.repository,
          nowData = {};

        try {
          if (data.projects.nodes.length == 0) {
            this.notState = true;
            localStorage.setItem(
              "history",
              JSON.stringify(data.projects.nodes)
            );
            return;
          }
        } catch (error) {
          this.notState = true;
          return;
        }
        this.sprint_title = data.projects.nodes[0].name,
          this.sprint_body = data.projects.nodes[0].body,
          this.sprint_id = data.projects.nodes[0].id
        nowData = data.projects.nodes.shift();
        this.$store.commit("setAssignees", data.assignableUsers.nodes);
        this.$store.commit("setLabels", data.labels.nodes);
        // this.$store.commit("setBoardData", data.projects.nodes);
        localStorage.setItem("labels", JSON.stringify(data.labels.nodes));
        localStorage.setItem(
          "assignees",
          JSON.stringify(data.assignableUsers.nodes)
        );
        localStorage.setItem("history", JSON.stringify(data.projects.nodes));
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
        nowData.columns.nodes.forEach(list => {
          this.boxInfo.push({
            name: list.name,
            id: list.id
          });
          let subData = [];
          list.cards.nodes.forEach(item => {
            this.allCardId.push(item.content.id);
            subData.push({
              id: item.id,
              issue: item.content
            });
          });
          allData.push(subData);
        });
        this.boxIssue = fixBoradData(allData);
        this.getcommit();
        //  this.moveChangedCard();
        this.staticIssue = this.boxIssue;

      });
      
    },
    getcommit() {
      let params = {
        query: 'query{organization(login: "' +
          this.LOGIN +
          '") {repository(name: "' +
          this.NAME +
          '") {issues(states:[OPEN] first:100){totalCount nodes{number comments(first:100){nodes{id body}}}}}}}'
      };
      getCommit(params).then(res => {

        let commitData = res.data.data.organization.repository.issues.nodes;

        commitData = fixComments(commitData);
        localStorage.setItem("commit", JSON.stringify(commitData));
        this.commitData = commitData;
        this.state = true;

      });
    },
    ClosedIssue(id) {
      let params = {
        query: 'mutation{closeIssue(input:{issueId: "' +
          id +
          '"}) {clientMutationId}}'
      };
      closeIssue(params).then(() => {
        window.location.reload();
      })
    },
    OpenIssue(id) {
      let params = {
        query: 'mutation{reopenIssue(input:{issueId: "' +
          id +
          '"}) {clientMutationId}}'
      };
      openIssue(params).then(() => {
        window.location.reload();
      })
    },
    clickEdit(list) {
      this.editInfo = list;
      this.editDialogState = true;
    },
    cgEditState(state) {
      this.editDialogState = state;
    },
    cgProState(state) {
      this.createProState = false;
      if (state) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
    edProState(state) {
      this.editProState = false;
      if (state) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
    cgCmtState(state) {
      this.addComState = false;
      if (state) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
    /* 添加Task */
    showTaskBox() {
      this.addTaskState = !this.addTaskState;
      if (this.staticTask != null) return;
      let params = {
        query: 'query{organization(login:"' +
          this.LOGIN +
          '"){repository(name:"' +
          this.NAME +
          '"){id name issues(first:100){  totalCount nodes{ id state title number url body assignees(first:100){ nodes{  name avatarUrl updatedAt} }labels(first:100){totalCount nodes{  name color} } timelineItems(first:20,itemTypes:[REFERENCED_EVENT,CROSS_REFERENCED_EVENT]){ totalCount nodes{ ...on CrossReferencedEvent{ source{ ...on Issue{  number  title labels(first:100){ totalCount  nodes{  name color } } assignees(first:100){  totalCount  nodes{ name } } } }target{  ...on Issue{ number  author{  avatarUrl }}} }}} } }}}}'
      };
      getCard(params).then(res => {
        try {
          let cardData = res.data.data.organization.repository.issues.nodes
          let temp = this.findAllTask(
              findTask(res.data.data.organization.repository.issues.nodes),
            ),
            result = [],
            idArry = this.allCardId;
          temp.forEach(task => {
            if (!idArry.includes(task.id)) {
              if (typeof task.labels !== 'undefined') {} else {
                result.push(task);
              }
            }
          });

          this.staticTask = result;
          this.alltask = result;

          cardData.forEach(i => {
            if (typeof i.labels !== 'undefined') {
              i.labels.nodes.forEach(it => {
                if ((it.name == '功能Bug') || (it.name == '界面Bug')) {

                  this.alltask.push(i)
                }
              })
            }
          })
          this.staticTask = this.alltask

        } catch (error) {
          this.staticTask = [];
          this.alltask = [];
        }
      });

    },
    delRecord() {
      localStorage.removeItem('LOGIN')
      localStorage.removeItem('NAME')
      localStorage.removeItem('XIANGMU_ID')
      localStorage.removeItem('XIANGMU_OWNERID')
      localStorage.removeItem('access_token')
      localStorage.removeItem('history')
      this.boxIssue.splice(0,this.boxIssue.length)
      this.staticIssue.splice(0,this.staticIssue.length)
      this.$router.push({
        path: '/'
      })
    },
    addTaskCard(id, index, card) {
      let params = {
        query: 'mutation{ addProjectCard(input:{contentId:"' +
          id +
          '",projectColumnId:"' +
          this.boxInfo[1].id +
          '"}){cardEdge{node{id}}}}'
      };
      addCards(params).then(res => {
        if (typeof res.data.data.error != "undefined") {
          alert("Add failed, it may be that the Task already exists in the board");
        }
        this.staticTask.splice(index, 1);
        this.alltask = this.staticTask;
        this.staticIssue[1].push({
          id: res.data.data.addProjectCard.cardEdge.node.id,
          issue: card
        });
        this.boxIssue = this.staticIssue;
      });
    },
    
    movedcard(id) {

      console.log(id)
      console.log("ID" + this.boxInfo[3].id)
      let params = {
        query: 'mutation{moveProjectCard(input:{cardId:"' +
          id +
          '",columnId:"' +
          this.boxInfo[3].id +
          '"}){cardEdge{node{content{... on Issue{body}}}}}}'
      };

      moveCard(params).then(res => {
        console.log("11124454646")
        window.location.reload();
      })
    },
    findAllTask(data) {
      function judgeTask(task) {
        var flag = true;
        if (typeof task.nodes == "undefined" || task.nodes == null) return true;
        task.nodes.forEach(node => {
          if (typeof node.number != "undefined") flag = false;
        });
        return flag;
      }
      var result = [];
      data.forEach(epic => {
        if (typeof epic.nodes == "undefined") return false;
        epic.nodes.forEach(story => {
          if (typeof story.nodes == "undefined" || story.nodes == null)
            return false;
          let flags = true;
          story.nodes.forEach(item => {
            if (item.nodes == null) return false;
            try {
              if (typeof item.nodes[0].number != "undefined") {
                flags = false;
              }
            } catch (error) {
              flags = false;
            }
          });
          story.nodes.forEach(task => {
            if (judgeTask(task) && flags) {
              result.push(task);
            } else if (typeof task.nodes != "undefined" && task.nodes != null)
              result.push(...task.nodes);
          });
        });
      });
      let allTast = result.filter(item => typeof item.title != "undefined");
      // this.$store.commit('setAllTask',allTast)
      return allTast;
    },
    searchTask() {
      this.alltask = this.staticTask;
      if (this.taskword == "") {
        this.alltask = this.staticTask;
        return;
      }
      let result = [];
      this.alltask.forEach(task => {
        if (task.title.indexOf(this.taskword) != -1) result.push(task);
      });
      this.alltask = result;
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
          this.boxIssue = this.staticIssue;
        }
        return;
      }
      this.boxIssue.forEach(line => {
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
      this.boxIssue = result;
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
          this.boxIssue = this.staticIssue;
        }
        return;
      }
      this.boxIssue.forEach(line => {
        let sub = [];
        line.forEach(item => {
          item.issue.assignees.forEach(assi => {
            if (selected.indexOf(assi.name) != -1 && judge(sub, item.id)) {
              sub.push(item);
            }
          });
        });
        result.push(sub);
      });
      this.assiChange = true;
      this.boxIssue = result;
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
        this.boxIssue = this.staticIssue;
        return;
      }
      if (this.searchNaN) this.boxIssue = this.staticIssue;
      let result = [],
        nohave = true;
      this.boxIssue.forEach(line => {
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
      this.boxIssue = result;
    },
    adCmt(id) {
      this.cmtFunc = "add";
      this.addComData = {
        id: id,
        body: ""
      };
      this.addComState = true;
    },
    edCmt(id, body) {
      this.cmtFunc = "edit";
      this.addComData = {
        id: id,
        body: body
      };
      this.addComState = true;
    }
  },
  filters: {
    fixNum(num) {
      if (num < 10) return `0${num}`;
      return num;
    }
  },
  created() {
    this.getinfo();

    // this.getBug()
  }
};
</script>

<style scoped>
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

.not-content {
  width: 100%;
  height: 600px;
  margin-top: 8px;
  padding-top: 51px;
  text-align: center;
  font-size: 25px;
}

.not-content b {
  cursor: pointer;
}

.not-content b:hover {
  color: lightcoral;
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
  width: 130px;
  height: 126px;
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

.task-container {
  width: auto;
  height: auto;
  float: right;
  margin: 9px 7.25% 0 0;
  position: relative;
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
  background: rgba(38, 128, 235, 1);
  border-radius: 5px;
  float: left;
  cursor: pointer;
}

.loginIn {
  width: 104px;
  height: 32px;
  display: block;
  text-align: center;
  line-height: 32px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  margin-left: 5px;
  color: rgba(255, 255, 255, 1);
  background: rgba(38, 128, 235, 1);
  border-radius: 5px;
  float: left;
  cursor: pointer;
}

.card-box {
  width: 300px;
  height: 651px;
  position: absolute;
  right: 0;
  top: 49px;
  background-color: white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  z-index: 1000;
}

.card-search-box {
  width: auto;
}

.card-search-box img {
  width: 13px;
  height: 13px;
  padding: 8px;
  margin: 9px 0 0 12px;
  border: 1px solid rgba(214, 218, 222, 1);
  background: rgba(250, 251, 252, 1);
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  float: left;
}

.card-search-box input {
  width: 245px;
  height: 29px;
  background: rgba(250, 251, 252, 1);
  margin: 9px 0 0 0;
  border: 1px solid rgba(214, 218, 222, 1);
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  float: left;
}

.card-search-box input:focus {
  outline: none;
}

.task-card-box {
  width: 300px;
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.task-card {
  width: 300px;
  min-height: 31px;
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  max-height: 63px;
  background: rgba(250, 251, 252, 1);
  margin-bottom: 8px;
  float: left;
}

.task-card-title {
  display: block;
  width: 210px;
  min-height: 31px;
  margin: 4% 0 0 7px;
  color: rgba(112, 112, 112, 1);
  float: left;
}

a {
  text-decoration: none;
  margin: 4% 0 0 16px;
  color: rgba(38, 128, 235, 1);
  float: left;
}

.task-card img {
  margin: 4% 16px 0 0;
  float: right;
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

.createPro {
  line-height: 32px;
  text-align: center;
  background: rgba(38, 128, 235, 1);
  color: white;
  border-radius: 5px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
}

.sprint_title {
  line-height: 32px;
  text-align: center;
  color: rgba(112, 112, 112, 1);
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  font-style: italic;
  cursor: pointer;
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
  z-index: 9999;
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
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  float: left;
}

.search {
  width: 299px;
  height: 32px;
  background: rgba(250, 251, 252, 1);
  margin: 9px 0 0 0;
  border: 1px solid rgba(214, 218, 222, 1);
  border-left: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
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
  background: rgba(255, 255, 255, 1);
}

.edit-dialog {
  z-index: 999;
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
