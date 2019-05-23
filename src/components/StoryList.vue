<template>
  <div class="main-container" v-if="data">
    <div class="epic-container">
      <div v-for="(epic, epic_i) in data" :key="epic_i" class="epic" @click="selEpic(epic_i)">
        <div class="context-container">
          <span>{{ epic.title }}</span>
        </div>
        <!-- <div class="label-container">
          <label
            v-for="(lab, lab_i) in epic.labels"
            :key="lab_i"
            :style="'backgroundColor:#' + lab.bgcolor + ';color:#' + lab.ftcolor"
          >{{ lab.name }}</label>
        </div> -->
      </div>
    </div>
    <hr>
    <div class="userstory-container">
      <div
        v-for="(story, story_i) in data[epici].nodes"
        :key="story_i"
        class="userstory"
        @click="selStory(story_i)"
      >
        <div class="context-container">{{ story.title }}</div>
        <!-- <div class="label-container">
          <label v-for="(lab, lab_i) in story.assignees" :key="lab_i">
            <img :src="lab.img" alt width="30" height="30">
          </label>
        </div> -->
      </div>
    </div>
    <hr>
    <div class="task-container">
      <div
        v-for="(task, task_i) in data[epici].nodes "
        v-show="typeof task.nodes !== 'undefined'"
        :key="task_i"
        class="task"
      >
        <div class="context-container">{{ task | screenTask}}</div>
        <!-- <div class="label-container">
          <label v-for="(lab, lab_i) in task.assignees" :key="lab_i">
            <img :src="lab.img" alt width="30" height="30">
          </label>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getIssue } from "@/api/getIssue";
import { fixData } from "@/assets/js/fixData";

export default {
  data() {
    return {
      data: null,
      epici: 0,
      storyi: 0,
      len: 0
    };
  },
  methods: {
    getissue() {
      let params = {
        query:
          'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo"){ id name issues(first:100){  totalCount nodes{  title number url body assignees(first:100){ nodes{  name avatarUrl} }labels(first:100){totalCount nodes{  name color} } timelineItems(first:20,itemTypes:[REFERENCED_EVENT,CROSS_REFERENCED_EVENT]){ totalCount nodes{ ...on CrossReferencedEvent{ source{ ...on Issue{  number  title labels(first:100){ totalCount  nodes{  name color } } assignees(first:100){  totalCount  nodes{ name } } } }target{  ...on Issue{ number  author{  avatarUrl }}} }}} } }}}}'
      };
      getIssue(params).then( res => {
        console.log(res.data);
        this.data = fixData(res.data.data.organization.repository.issues.nodes)
      })
    },
    selEpic(index) {
      // if(typeof this.data[index].nodes === 'undefined') {
      //   this.epici = this.len-1;
      // } else {
      this.epici = index;
      // }
    },
    selStory(index) {
      this.storyi = index;
    }
  },
  filters: {
    screenTask(val) {
      return typeof val.nodes === "undefined" ? "" : val.nodes[0].title;
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
    display: flex;
    min-height: 150px;
    padding: 2px;
    .epic {
      flex-grow: 1;
      margin-left: 1px;
      overflow: hidden;
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
  flex-grow: 1;
  display: block;
  overflow: hidden;
  margin-left: 1px;
  max-width: 150px;
  border: 1px solid black;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
}
.label-container {
  display: inline-block;
  width: 100%;
  height: 30px;
}
</style>


