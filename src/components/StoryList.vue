<template>
  <div id="tree">
    <ul>
      <li>
        <span>{{ title }} 需求地图</span>
          <sub-list :list="data"></sub-list>
          <pre>
    <code v-html="data"></code>
  </pre>
        <!-- <ul>
          <li v-for="(epic, epic_i) in data" :key="epic_i">
            <span>{{ epic.title }}</span>
            <ul>
              <li v-for="(user, user_i) in epic.nodes" :key="user_i">
                <span>{{ user.title }}</span>
                <ul>
                  <li v-for="(task, task_i) in user.nodes" :key="task_i">
                    <span>{{ task.title }}</span>
                    <ul>
                      <li v-for="(tak, tak_i) in task.nodes" :key="tak_i">
                        <span>{{ tak.title }}</span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>-->
      </li>
    </ul>
  </div>
</template>

<script>
import { getIssue } from "@/api/getIssue";
import { fixData } from "@/assets/js/fixData";
import subList from "./subList";
export default {
  data() {
    return {
      title: "",
      data: null
    };
  },
  components: {
    subList
  },
  methods: {
    init() {
      // study-checklist
      // ScrumDemo
      var req = {
        query:
          'query{organization(login:"wzvtcsoft-specialstudent"){repository(name:"ScrumDemo"){ id name issues(first:100){  totalCount nodes{  title number url body assignees(first:100){ nodes{  name avatarUrl} }labels(first:100){totalCount nodes{  name color} } timelineItems(first:20,itemTypes:[REFERENCED_EVENT,CROSS_REFERENCED_EVENT]){ totalCount nodes{ ...on CrossReferencedEvent{ source{ ...on Issue{  number  title labels(first:100){ totalCount  nodes{  name color } } assignees(first:100){  totalCount  nodes{ name } } } }target{  ...on Issue{ number  author{  avatarUrl }}} }}} } }}}}'
      };
      getIssue(req).then(res => {
        this.title = res.data.data.organization.repository.name;
        this.data = fixData(res.data.data.organization.repository.issues.nodes);
      });
    }
  },
  created() {
    this.init();
  }
};
</script>

<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}
/* 固定写法,配合使用实现列表的平稳动画 */
.v-move {
  transition: all 1s ease;
}
.v-leave-active {
  position: absolute;
}

#tree {
  display: block;
  position: relative;
  padding: 5px 15px;
}
#tree ul {
  position: relative;
  padding-left: 60px;
  margin: 0;
}
#tree ul > li {
  position: relative;
  padding: 5px 0;
}
#tree > ul {
  padding: 0;
  margin: 0;
}
/* 水平线 */
#tree > ul ul > li:after {
  content: "  ";
  position: absolute;
  top: 30px;
  left: -45px;
  width: 45px;
  border-top: 1px solid #ddd;
}
/** 垂直方向连线 */
#tree ul > li:not(:last-child):before {
  content: " ";
  position: absolute;
  top: 0;
  left: -45px;
  height: 100%;
  border: none;
  border-left: 1px solid #ddd;
}

#tree ul > li:last-child:before {
  content: " ";
  position: absolute;
  top: 0;
  left: -45px;
  height: 30px;
  border: none;
  border-left: 1px solid #ddd;
}

ul {
  list-style-type: none;
  text-align: left;
}
span {
  display: inline-block;
  text-align: center;
  height: 45px;
  color: #888;
  line-height: 45px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0 8px;
  font-size: 1.5em;
  cursor: pointer;
}

/* 获得焦点改变背景色 */
#tree span:hover,
#tree span:hover + ul span {
  color: #fff;
  background-color: deepskyblue;
}
/* 获得焦点改变边框和连线的颜色 */
#tree span:hover,
#tree span:hover + ul span,
#tree span:hover + ul li:before,
#tree span:hover + ul li:after {
  border-color: blue;
}
</style>
