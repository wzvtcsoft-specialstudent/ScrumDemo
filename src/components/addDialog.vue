<template>
  <div class="dialog-container">
    <div class="dialog">
      <span class="title">Epic</span>
      <div class="line"></div>
      <div class="info">
        <div class="conatiner">
          <div class="info-sub" @click="labelsState = true">
            <div>Labels</div>
            <img src="@/assets/img/infodrop.png">
          </div>
          <div class="list" v-show="labelsState" @mouseleave="labelsState = false">
            <ul>
              <li v-for="(lab,i) in labels" :key="i">
                <img
                  src="@/assets/img/select.png"
                  class="select"
                  @click="selLab($event,i)"
                >
                <div class="list-name">{{ lab.name }}</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="info-sub">
          <div>Estimate</div>
          <img src="@/assets/img/infodrop.png">
        </div>
        <div class="info-sub">
          <div>Assignees</div>
          <img src="@/assets/img/infodrop.png">
        </div>
      </div>
      <input type="text" placeholder="Title" class="issue-title">
      <textarea class="issue-body" placeholder="Leave a comment"></textarea>
      <div class="cancel">Cancel</div>
      <div class="confirm">Created</div>
    </div>
  </div>
</template>

<script>
import { createIssue } from "@/api/createIssue";
export default {
  name: "addDialog",
  data() {
    return {
      assignees: this.$store.getters.getAssignees,
      labels: this.$store.getters.getLabels,
      labelsState: false, // list显示/隐藏
      estimateState: false,
      assigneesState: false,
      labSel: [], // 保存选中的项
      estiSel: [],
      assiSel: [],
      title: "",
      body: "",
      people: [],
      lab: [] // 需要优化，应该为数组(标签可多选)
    };
  },
  props: ["connect"],
  methods: {
    confirm() {
      if (this.title.trim() == "" || this.body.trim() == "") return;
      var labelStr = this.lab
          .map(id => {
            return '"' + id + '"';
          })
          .join(","),
        assigneesStr = this.people
          .map(id => {
            return '"' + id + '"';
          })
          .join(","),
        body = this.body.replace(/#\d/g, "");
      if (this.connect != 0) {
        body = body + " #" + this.connect;
      }
      let params = {
        query:
          'mutation{createIssue(input:{repositoryId:"MDEwOlJlcG9zaXRvcnkxODcxMTgwMTM=",title:"' +
          this.title +
          '",body:"' +
          body +
          '",assigneeIds:[' +
          assigneesStr +
          "],labelIds:[" +
          labelStr +
          "]}){issue{ body  title}}}"
      };
      this.title = "";
      this.body = "";
      console.log(params);
      createIssue(params).then(res => {
        console.log(res);
        this.$emit("state", res.data.data.createIssue != null);
      });
    },
    cancel() {
      this.$emit("state", false);
    },
    /* 标签 */
    selLab(e,index) {
      console.log(index);
      if (this.labSel[index]) {
        e.currentTarget.src = require('@/assets/img/select.png')
        this.labSel[index] = false;
      } else {
        e.currentTarget.src = require('@/assets/img/selected.png')
        this.labSel[index] = true;
      }
    }
  },
  mounted() {
    var lens = this.labels.length;
    for (let i = 0; i < lens; i++) {
      this.labSel[i] = false;
    }
  }
};
</script>

<style lang="scss" scoped>
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
.dialog-container {
  position: absolute;
  width: 100%;
  height: 722px;
  background-color: rgba(255, 255, 255, 0.5);
  top: 0;
  left: 0;
}
.dialog {
  position: relative;
  width: 64.25%;
  height: 680px;
  background-color: white;
  margin: 10px auto;
  padding: 0 36px 0 36px;
  border: 1px solid rgba(234, 236, 238, 1);
}
.title {
  position: absolute;
  width: 39px;
  height: 23px;
  font-size: 20px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 34px;
  color: rgba(112, 112, 112, 1);
  opacity: 1;
  top: 12px;
  left: 13px;
}
.line {
  width: 60px;
  height: 8px;
  background: rgba(231, 231, 231, 1);
  opacity: 1;
  position: absolute;
  top: 50px;
  left: 13px;
}
.info {
  width: 100%;
  height: 32px;
  margin-top: 77px;
}
.conatiner {
  width: 118px;
  float: left;
  position: relative;
}
.info-sub {
  width: 118px;
  height: 32px;
  background: rgba(218, 218, 218, 1);
  opacity: 1;
  float: left;
  margin-right: 12px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}
.info-sub div {
  display: block;
  width: 70px;
  height: 20px;
  font-size: 14px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(112, 112, 112, 1);
  opacity: 1;
  float: left;
  margin: 5px 0 5px 10px;
}
.info-sub img {
  margin: 8px 0 8px 6px;
  float: left;
}
.list {
  position: absolute;
  top: 32px;
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

input::-webkit-input-placeholder {
  width: 33px;
  height: 40px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 40px;
  color: rgba(179, 179, 179, 1);
  opacity: 1;
}
.issue-title {
  width: 99.16%;
  height: 40px;
  background: rgba(250, 251, 252, 1);
  border: 1px solid rgba(214, 218, 222, 1);
  padding-left: 0.84%;
  font-size: 16px;
  margin-top: 22px;
}
.issue-title:focus {
  border-color: #2188ff;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
    0 0 0 0.2em rgba(3, 102, 214, 0.3);
  outline: none;
}
textarea::-webkit-input-placeholder {
  width: auto;
  height: 16px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 27px;
  color: rgba(179, 179, 179, 1);
  opacity: 1;
}
.issue-body {
  width: 99.16%;
  height: 270px;
  font-size: 16px;
  padding-left: 0.84%;
  margin-top: 19px;
  background: rgba(250, 251, 252, 1);
  border: 1px solid rgba(214, 218, 222, 1);
  resize: none;
}
.issue-body:focus {
  border-color: #2188ff;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
    0 0 0 0.2em rgba(3, 102, 214, 0.3);
  outline: none;
}
.confirm {
  width: 125px;
  height: 40px;
  background: rgba(38, 128, 235, 1);
  opacity: 1;
  border-radius: 6px;
  position: absolute;
  top: 594px;
  left: 523px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 40px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  cursor: pointer;
}
.cancel {
  width: 125px;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(38, 128, 235, 1);
  opacity: 0.8;
  border-radius: 6px;
  position: absolute;
  top: 594px;
  left: 381px;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 40px;
  color: rgba(38, 128, 235, 1);
  text-align: center;
  cursor: pointer;
}
</style>


