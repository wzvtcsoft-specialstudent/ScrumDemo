<template>
  <div>
    <div class="his-header">
      <div class="his-menu" @click="menuState = !menuState">
        <img src="@/assets/img/menu.png">
        <div class="his-menu-item" v-show="menuState" @mouseleave="menuState = false">
          <router-link to="/" tag="span" class="link-item">Home</router-link>
          <router-link to="/storyList" tag="span" class="link-item">Story Map</router-link>
          <router-link to="/history" tag="span" class="link-item">History Sprint</router-link>
        </div>
      </div>
      <div class="his-container" style="marginLeft:116px">
        <div class="sub labels" @click="labelState = !labelState">
          <div>Labels</div>
          <img src="@/assets/img/infodrop.png">
        </div>
        <div class="list" v-show="labelState" @mouseleave="sel(1)">
          <ul>
            <li v-for="(lab,i) in labels" :key="i">
              <img src="@/assets/img/select.png" class="select" @click="selLab($event,i)">
              <div class="list-name">{{ lab.name }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="his-container">
        <div class="sub assignees" @click="assginState = !assginState">
          <div>Assignees</div>
          <img src="@/assets/img/infodrop.png">
        </div>
        <div class="list" v-show="assginState" @mouseleave="sel(2)">
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
        @keydown.enter="sel(3)"
      >
    </div>
    <div class="his-body" v-show="state">
      <div class="selectbox">
        <div
          class="sprint-item"
          v-for="(spr, i) in sprintInfo"
          :key="spr.id"
          @click="selSprint(i)"
        >{{ spr.name }}</div>
      </div>
      <div class="column" :key="issueInfo[sprintSel][0].id">
        <span>Future</span>
        <div class="issue-box">
          <sticker
            v-for="future in sprintIssue[0]"
            :key="'historyFuture' + future.id"
            :list="future.issue"
            class="his-sticker"
          ></sticker>
        </div>
      </div>
      <div class="column" :key="issueInfo[sprintSel][1].id">
        <span>To do</span>
        <div class="issue-box">
          <sticker
            v-for="todo in sprintIssue[1]"
            :key="'historyFuture' + todo.id"
            :list="todo.issue"
            class="his-sticker"
          ></sticker>
        </div>
      </div>
      <div class="column" :key="issueInfo[sprintSel][2].id">
        <span>Doing</span>
        <div class="issue-box">
          <sticker
            v-for="doing in sprintIssue[2]"
            :key="'historyFuture' + doing.id"
            :list="doing.issue"
            class="his-sticker"
          ></sticker>
        </div>
      </div>
      <div class="column" :key="issueInfo[sprintSel][3].id">
        <span>Done</span>
        <div class="issue-box">
          <sticker
            v-for="done in sprintIssue[3]"
            :key="'historyFuture' + done.id"
            :list="done.issue"
            class="his-sticker"
          ></sticker>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sticker from "./sticker";
import { getSprint } from "@/api/getHistory";
import { fixHistoryData } from "@/assets/js/fixHistory"
import { fixBoradData } from "@/assets/js/fixBoradData";

export default {
  name: "history",
  data() {
    return {
      menuState: false,
      labelState: false,
      assginState: false,
      labSel: [],
      assiSel: [],
      labels: [],
      sprintSel: 0,
      assignees: [],
      sprintAllIssue: [], // 总数据
      sprintIssue: [], // 当前sprint数据
      sprintInfo: [],
      issueInfo: [],
      word: "", // 搜索的内容
      labChange: false,
      assiChange: false,
      searchNaN: false,
      state: false
    };
  },
  components: {
    sticker
  },
  methods: {
    initData() {
      let data = JSON.parse(localStorage.getItem("history"));
      console.log(data);
      var sprintInfo = [],result = [],fixresult = [], issueInfo = [];
      var projectData = [],projectInfo = [],issueData = []
      for(let i in data) {
        sprintInfo.push({
          id: data[i].id,
          name: data[i].name
        })
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
        issueInfo.push(projectData)
        result.push(fixHistoryData(projectData))
      }
      for(let i =0,lens = result[0].length; i<lens;i+=4) {
        fixresult.push(result[0].slice(i,i+4))
      }
      this.sprintAllIssue = fixresult;
      this.issueInfo = issueInfo;
      this.sprintIssue = fixresult[0];
      this.sprintInfo = sprintInfo;
      this.assignees = JSON.parse(localStorage.getItem('assignees'));
      this.labels = JSON.parse(localStorage.getItem('labels'))
      this.state = true;


      // let params = {
      //   query:
      //     'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo") {assignableUsers(first:20){totalCount nodes {id name}}labels(first:20){totalCount nodes {color id name}} projects(first:47, orderBy:{field:CREATED_AT,direction:DESC}){ totalCount nodes { id name columns(first:4){ nodes{id name cards(first:60){ nodes{ id column { id } state content{ ... on Issue{ id title number url body assignees(first:20) {totalCount  nodes {avatarUrl name updatedAt}} labels(first:20) { totalCount nodes {color name}}}}}}}}}}}}}'
      // };
      // getSprint(params).then(res => {
      //   this.assignees = res.data.data.organization.repository.assignableUsers.nodes;
      //   this.labels = res.data.data.organization.repository.labels.nodes;
      //   var sprintData = res.data.data.organization.repository.projects.nodes
      //   sprintData.shift()
      //   var sprintInfo = [],
      //     issueInfo = [],
      //     result = [],
      //     fixresult = [];
      //   var projectData = [],
      //     projectInfo = [],
      //     issueData = [];
      //   for (let i in sprintData) {
      //     sprintInfo.push({
      //       id: sprintData[i].id,
      //       name: sprintData[i].name
      //     });
      //     // projectInfo  每一列的id和name
      //     projectData = [];
      //     projectInfo = [];
      //     sprintData[i].columns.nodes.forEach(list => {
      //       projectInfo.push({
      //         id: list.id,
      //         name: list.name
      //       });
      //       issueData = [];
      //       list.cards.nodes.forEach(item => {
      //         issueData.push({
      //           id: item.id,
      //           issue: item.content
      //         });
      //       });
      //       projectData.push(issueData);
      //     });
      //     issueInfo.push(projectInfo)
      //     result.push(fixHistoryData(projectData));
      //   }
      //   for (let i = 0, lens = result[0].length; i < lens; i += 4) {
      //     fixresult.push(result[0].slice(i, i + 4));
      //   }
        // fixresult.shift();
        // sprintInfo.shift();
        // issueInfo.shift();
      //   this.sprintAllIssue = fixresult;
      //   this.sprintInfo = sprintInfo;
      //   this.issueInfo = issueInfo;
      //   this.sprintIssue = fixresult[0];
      //   this.state = true
      // });
    },
    /* 选择 */
    selLab(e, index) {
      if (this.labSel[index]) {
        e.currentTarget.src = require("@/assets/img/select.png");
        this.labSel[index] = false;
      } else {
        e.currentTarget.src = require("@/assets/img/selected.png");
        this.labSel[index] = true;
      }
    },
    selAssi(e, index) {
      if (this.assiSel[index]) {
        e.currentTarget.src = require("@/assets/img/select.png");
        this.assiSel[index] = false;
      } else {
        e.currentTarget.src = require("@/assets/img/selected.png");
        this.assiSel[index] = true;
      }
    },
    selSprint(i) {
      this.sprintSel = i;
      this.sprintIssue = this.sprintAllIssue[i];
    },
    /* 筛选 */
    labelScreen() {
      this.labelState = false;
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
          this.sprintIssue = this.sprintAllIssue[this.sprintSel];
        }
        return;
      }
      this.sprintIssue.forEach(line => {
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
      this.sprintIssue = result;
    },
    assiScreen() {
      this.assginState = false;
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
          this.sprintIssue = this.sprintAllIssue[this.sprintSel];
        }
        return;
      }
      this.sprintIssue.forEach(line => {
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
      this.sprintIssue = result;
    },
    search() {
      if (this.word == "") {
        this.sprintIssue = this.sprintAllIssue[this.sprintSel];
        return;
      }
      if (this.searchNaN)
        this.sprintIssue = this.sprintAllIssue[this.sprintSel];
      let result = [],
        nohave = true;
      this.sprintIssue.forEach(line => {
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
      this.sprintIssue = result;
    },
    sel(state) {
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
    }
  },
  created() {
    this.initData();
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
.his-header {
  width: 100%;
  height: 50px;
  background-color: rgba(250, 251, 252, 1);
}
.his-menu {
  margin: 9px 0 0 15px;
  cursor: pointer;
  float: left;
}
.his-menu-item {
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
.his-container {
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

.his-body {
  width: 100%;
  height: 651px;
  margin-top: 8px;
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
  background: rgba(250, 251, 252, 1);
  margin-bottom: 6px;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 95px;
  color: rgba(112, 112, 112, 1);
  overflow: hidden;
}
.column {
  border: 1px solid rgba(214, 218, 222, 1);
  width: 316px;
  min-width: 280px;
  height: 635px;
  margin-left: 12px;
  padding-bottom: 15px;
  float: left;
}
.column span {
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
.column .issue-box {
  width: 296px;
  height: 595px;
  min-width: 280px;
  padding: 0 10px 0 10px;
  margin-top: 9px;
  overflow-y: auto;
  overflow-x: hidden;
}
.his-sticker {
  width: 263px !important;
  margin-bottom: 12px;
  background: rgba(255, 255, 255, 1);
}
</style>
