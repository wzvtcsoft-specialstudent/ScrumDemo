<template>
  <div class="main-container" v-if="Epic">
    <!-- epic -->
    <div class="epic-container" ref="epic">
      <div
        v-for="(epic, epic_i) in Epic"
        :key="epic_i"
        :class="{'selected':epic_i==epicSel,'require':true}"
        @click.self="selEpic(epic.number,epic_i)"
      >
        <div class="context-container">
          <span>
            <a :href="epic.url" target="view_window">#{{ epic.number }}</a>
            {{ epic.title }}
          </span>
        </div>
        <div class="label-container">
          <label
            v-for="(lab, lab_i) in epic.labels"
            :key="lab_i"
            :style="'backgroundColor:#' + lab.color + ';color:#' + lab.ftcolor"
          >{{ lab.name }}</label>
        </div>
      </div>
      <span class="add" @click="addEpic">+</span>
    </div>
    <hr>
    <!-- story -->
    <div class="userstory-container">
      <div
        v-for="(story, story_i) in Story[epici]"
        v-show="typeof story.title != 'undefined'"
        :key="story_i"
        :class="{'selected':story_i==storySel,'require':true}"
        @click.self="selStory(story.number, story_i)"
      >
        <div class="context-container">
          <span>
            <a :href="story.url" target="view_window">#{{ story.number }}</a>
            {{ story.title }}
          </span>
        </div>
        <div class="label-container" v-if="story.assignees">
          <label v-for="(lab, lab_i) in story.assignees.nodes" :key="lab_i">
            <img :src="lab.avatarUrl" alt width="30" height="30">
          </label>
        </div>
      </div>
    </div>
    <hr>
    <!-- task -->
    <div class="task-container">
      <div
        v-for="(task, task_i) in Task[storyi]"
        v-show="typeof task.title != 'undefined'"
        :key="task_i"
        class="require"
      >
        <div class="context-container">
          <span>
            <a :href="task.url" target="view_window">#{{ task.number }}</a>
            {{ task.title }}
          </span>
        </div>
        <div class="label-container" v-if="task.assignees">
          <label v-for="(lab, lab_i) in task.assignees.nodes" :key="lab_i">
            <img :src="lab.avatarUrl" alt width="30" height="30">
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getIssue } from "@/api/getIssue";
import { fixData } from "@/assets/js/fixData";
import { fixTableData } from "@/assets/js/fixTableData";

export default {
  data() {
    return {
      epicSel: 0,
      storySel: 0,
      Epic: null,
      Story: null,
      Task: null,
      epici: 0,
      storyi: 0,
      storyShow: true,
      len: 0
    };
  },
  methods: {
    getissue() {
      let params = {
        query:
          'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo"){ id name issues(first:100){  totalCount nodes{  title number url body assignees(first:100){ nodes{  name avatarUrl} }labels(first:100){totalCount nodes{  name color} } timelineItems(first:20,itemTypes:[REFERENCED_EVENT,CROSS_REFERENCED_EVENT]){ totalCount nodes{ ...on CrossReferencedEvent{ source{ ...on Issue{  number  title labels(first:100){ totalCount  nodes{  name color } } assignees(first:100){  totalCount  nodes{ name } } } }target{  ...on Issue{ number  author{  avatarUrl }}} }}} } }}}}'
      };
      getIssue(params).then(res => {
        let newData = fixTableData(
          res.data.data.organization.repository.issues.nodes
        );
        this.Epic = newData[0];
        this.Story = newData[1];
        this.Task = newData[2];
        this.Task.push([]);
        this.len = newData[2].length;
        /* 初始化显示 */
        this.epici = newData[0][0].number;
        this.storyi = newData[1][this.epici][0].number;
      });
    },
    selEpic(index, sel) {
      this.epicSel = sel;
      this.epici = index;
      this.storyi =
        typeof this.Story[this.Epic[sel].number][0] === "undefined"
          ? this.len
          : this.Story[this.Epic[sel].number][0].number; // 重置storyi
      this.storySel = 0;
      if ((this.$refs.epic.style.height = "auto")) {
        this.$refs.epic.style.height = "150px";
      }
    },
    selStory(index, sel) {
      this.storySel = sel;
      this.storyi = index;
    },
    addEpic() {
      this.$refs.epic.style.height =
        this.$refs.epic.style.height == "auto" ? "150px" : "auto";
    }
  },
  filters: {
    screenTask(val, i) {
      return typeof val.nodes === "undefined" ? "" : val.nodes[i].title;
    }
  },
  created() {
    this.getissue();
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  width: 1300px;
  height: 650;
  border: 1px solid black;
  background-color: #eee;
  .epic-container {
    width: 1300px;
    height: 150px;
    min-height: 150px;
    overflow: hidden;
    padding: 2px;
    position: relative;
    z-index: 2;
    .epic {
      flex-grow: 1;
      flex-shrink: 0;
      margin-left: 1px;
      overflow: hidden;
      min-width: 150px;
      max-width: 150px;
      border: 1px solid black;
      background-color: #fff;
      cursor: pointer;
    }
  }
  .userstory-container {
    width: 1300px;
    display: flex;
    min-height: 150px;
    z-index: 1;
    .userstory {
      flex-grow: 1;
      text-align: center;
      margin-left: 1px;
      overflow: hidden;
      max-width: 150px;
      background-color: #fff;
      border: 1px solid black;
      cursor: pointer;
    }
  }
  .task-container {
    width: 1300px;
    display: flex;
    min-height: 150px;
    z-index: 1;
    .task {
      flex-grow: 1;
      overflow: hidden;
      margin-left: 1px;
      max-width: 150px;
      border: 1px solid black;
      background-color: #fff;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
.container {
  width: 1300px;
  display: flex;
  min-height: 150px;
}
.require {
  // flex-grow: 1;
  // flex-shrink: 10;
  min-width: 179px;
  float: left;
  display: block;
  margin-left: 1px;
  max-width: 150px;
  min-height: 150px;
  border: 1.5px solid black;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
}
.require:hover {
  border: 1.5px solid deepskyblue;
}
.label-container {
  display: inline-block;
  width: 100%;
  height: 30px;
}
.selected {
  border: 1.5px solid blue;
}
.add {
  z-index: 999;
  width: 10px;
  position: absolute;
  text-align: center;
  right: 0;
  float: right;
  background-color: orange;
  cursor: pointer;
}
a {
  text-decoration: none;
  font-weight: bold;
}
</style>


