<template>
  <div class="sprint-main-container" >
    <details class="switch" v-if="details">
      <summary></summary>
      <ul>

        <router-link to="/" tag="li">需求地图</router-link>
        <router-link to="/sprint" tag="li">历史sprint</router-link>
        <router-link to="/board" tag="li">看板</router-link>
      </ul>
    </details>
    <div class="spint-list">
      <ul>
        <li class="sprint" v-for="(item,i) in list" :key="i" @click="changeSel(i)">
          <span class="milestones-name">{{ item.title }}</span>
          <el-progress :percentage="item.planne" :format="format"></el-progress>
          <span class="milestones-time">{{ item.createdtime }} — {{ item.closedtime | dueDate }}</span>
        </li>
      </ul>
    </div>
    <div class="sprint-details">
      <sticker
        v-for="issue in details[selIndex]"
        :key="issue.number"
        :list="issue"
        class="sticker"
        v-show="screen(issue)"
      ></sticker>
    </div>
  </div>
</template>

<script>
import { getMilesTones } from "@/api/getInfo";
import { fixSprintData } from "@/assets/js/sprintDetails";
import sticker from "./sticker";

export default {
  name: "sprint",
  data() {
    return {
      list: [],
      details: null,
      selIndex: 0
    };
  },
  methods: {
    getmilestones() {
      let params = {
        query:
          'query{ organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo"){milestones(first:100) {totalCount nodes {title createdAt dueOn issues(first:30){ totalCount nodes{ title state number  url  body assignees(first:20) {nodes{  name avatarUrl updatedAt}}labels(first:100){totalCount nodes{color name} } } }}} } }}'
      };
      getMilesTones(params).then(res => {
        let oldList = [],
          oldDetails = [];
        res.data.data.organization.repository.milestones.nodes.forEach(item => {
          var count = 0;
          item.issues.nodes.forEach(i => {
            if (i.state == "CLOSED") count++;
          });
          oldList.push({
            title: item.title,
            createdtime: item.createdAt.substr(0, 10),
            closedtime: item.dueOn,
            planne: (count / item.issues.totalCount) * 100
          });
          oldDetails.push(item.issues);
        });
        this.list = oldList;
        this.details = fixSprintData(oldDetails);
      });
    },
    changeSel(index) {
      this.selIndex = index;
    },
    format(percentage) {
      return `${percentage.toFixed(1)}%`;
    },
    /* 筛选 */
    screen(issue) {
      return true


      /* Labels筛选 */
      // return issue.labels.some(lab => {
      //   return lab.name == "bug";
      // });

      /* Assignees筛选 */
      // return typeof issue.assignees !== 'undefined'&&issue.assignees.name == "SprWu"
    }
  },
  filters: {
    dueDate(val) {
      if (val == null) return "";
      return val.substr(0, 10);
    }
  },
  components: {
    sticker
  },
  created() {
    this.getmilestones();
  }
};
</script>

<style lang="scss" scoped>
.sprint-main-container {
  margin: 0 auto;
  width: 1480px;
  height: 690px;
}
.spint-list {
  width: 170px;
  height: 690px;
  max-height: 700px;
  overflow: hidden;
  float: left;
  padding: 5px 3px 10px 15px;
  border: 1px solid #ddd;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
.sprint-details {
  width: 1270px;
  height: 690px;
  margin-left: 6px;
  float: left;
  padding: 5px 3px 10px 5px;
  border: 1px solid #ddd;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
}
ul {
  padding: 0;
  margin: 0;
  border: 0;
}
.sprint {
  list-style-type: none;
  background-color: white;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
.milestones-name {
  display: block;
  width: 100%;
  font-weight: 500;
  font-size: 20px;
  margin-top: 10px;
  height: 30;
}
.milestones-time {
  font-size: 12px;
  color: #707070;
  width: 100%;
  height: 10px;
  line-height: 10px;
}
.sprint:hover {
  color: red;
}
.sticker {
  float: left;
  margin-bottom: 45px;
  margin-left: 20px;
}
.switch {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 3px;
  top: 60px;
  font-size: 20px;
  z-index: 1;
}
.switch ul {
  width: 100px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border: 1px solid #ccc;
  padding: 5px 0 0 0;
  margin: 0;
  border: 0;
}
.switch ul li {
  text-align: center;
  list-style-type: none;
  width: 100%;
  height: 30px;
  font-size: 16px;
  line-height: 30px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}
.switch ul li:hover {
  color: red;
}
details ul {
  animation: fadeInDown 0.5s linear;
}
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
summary {
  outline: none;
}
</style>

