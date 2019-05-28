<template>
  <div class="main-container" v-if="data">
    <!-- <pre><code v-html="data"></code></pre> -->
    <!-- epic -->
    <div class="epic-container" ref="epic">
      <div v-for="(epic, epic_i) in data"  :key="epic_i" :class="{'selected':epic_i==epici,'require':true}" @click.self="selEpic(epic_i)">
        <div class="context-container">
          <span><a :href="epic.issueUrl" target="view_window">#{{ epic.number }}</a>{{ epic.title }}</span>
        </div>
        <div class="label-container">
          <label
            v-for="(lab, lab_i) in epic.labels"
            :key="lab_i"
            :style="'backgroundColor:#' + lab.bgcolor + ';color:#' + lab.ftcolor"
          >{{ lab.name }}</label>
        </div>
      </div>
      <span class="add" @click="addEpic">+</span>
    </div>
    <hr>
    <!-- story -->
    <div class="userstory-container">
      <div
        v-for="(story, story_i) in data[epici].nodes"
        v-show="typeof story.title != 'undefined'"
        :key="story_i"
        :class="{'selected':story_i==storyi,'require':true}"
        @click.self="selStory(story_i)"
      >
        <div class="context-container">
          <span><a :href="story.issueUrl" target="view_window">#{{ story.number }}</a>{{ story.title }}</span>
        </div>
        <div class="label-container">
          <label v-for="(lab, lab_i) in story.assignees" :key="lab_i">
            <img :src="lab.img" alt width="30" height="30">
          </label>
        </div>
      </div>
    </div>
    <hr>
    <!-- story -->
    <div class="task-container">
      <div
        v-for="(task, task_i) in data[epici].nodes[storyi].nodes"
       v-show="typeof task.title != 'undefined'"
        :key="task_i"
        class="require"
        @click.self="selStory2(task_i)"
      >
        <div class="context-container">
          <span><a :href="task.issueUrl" target="view_window">#{{ task.number }}</a>{{ task.title }}</span>

        </div>
        <div class="label-container">
          <label v-for="(lab, lab_i) in task.assignees" :key="lab_i">
            <img :src="lab.img" alt width="30" height="30">
          </label>
        </div>
      </div>
    </div>
    <!-- task -->
    <div class="task-container" v-if="judge()">
      <div
        v-for="(task, task_i) in data[epici].nodes[storyi].nodes[storyi2].nodes"
        v-show="task.title != null"
        :key="task_i"
        class="require"
      >
        <div class="context-container">
          <span><a :href="task.issueUrl" target="view_window">#{{ task.number }}</a>{{ task.title }}</span>
        </div>
        <div class="label-container">
          <label v-for="(lab, lab_i) in task.assignees" :key="lab_i">
            <img :src="lab.img" alt width="30" height="30">
          </label>
        </div>
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
      storyi:0,
      storyi2: 0,
      storyShow: true
    };
  },
  methods: {
    getissue() {
      let params = {
        query:
          'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo"){ id name issues(first:100){  totalCount nodes{  title number url body assignees(first:100){ nodes{  name avatarUrl} }labels(first:100){totalCount nodes{  name color} } timelineItems(first:20,itemTypes:[REFERENCED_EVENT,CROSS_REFERENCED_EVENT]){ totalCount nodes{ ...on CrossReferencedEvent{ source{ ...on Issue{  number  title labels(first:100){ totalCount  nodes{  name color } } assignees(first:100){  totalCount  nodes{ name } } } }target{  ...on Issue{ number  author{  avatarUrl }}} }}} } }}}}'
      };
      getIssue(params).then( res => {
        this.data = fixData(res.data.data.organization.repository.issues.nodes)
      })
    },
    selEpic(index) {
      // if(typeof this.data[index].nodes === 'undefined') {
      //   this.epici = this.len-1;
      // } else {
         this.epici = index;
      this.storyi = 0;// 重置storyi
      if(this.$refs.epic.style.height = 'auto') {
        this.$refs.epic.style.height = '150px'
        // this.$refs.epic.style.position = 'relative'
      }
              
      if(index > 6) {
        let temp = this.data[index];
        this.data.splice(index, 1);
        this.data.unshift(temp);
        this.epici = 0; // 因为选中项的位置变为0，所以选中值也要变为0
        
      }
     
      // }
    },
    selStory(index) {
      this.storyi = index;
    },
    selStory2(index) {
      this.storyi2 = index;
    },
    addEpic() {
      this.$refs.epic.style.height = this.$refs.epic.style.height == 'auto'?'151px':'auto'
      // this.$refs.epic.style.position = this.$refs.epic.style.position == 'absolute'?'relative':'absolute'
    },
    /* 判断是否显示userstory */
    judge() {
      // console.log(this.epici + '---------' + this.storyi);
      //if(typeof this.data[this.epici].nodes[this.storyi] === 'undefined') return false
      // console.log(this.data[this.epici].nodes[this.storyi].nodes === null);
      if(this.data[this.epici].nodes[this.storyi].nodes === null) return false
      return true
    }
  },
  filters: {
    screenTask(val,i) {
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
    height: 151px;
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
  color: blue;
}
</style>


