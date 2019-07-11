<template>
  <div class="dialog-container">
    <div class="dialog">
      <span class="title">{{ type }}</span>
      <div class="line"></div>
      <div class="info">
        <div class="container">
          <div class="info-sub" @click="labelsState = !labelsState">
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
          <div class="info-sub" @click="estimateState = !estimateState">
            <div>Estimate</div>
            <img src="@/assets/img/infodrop.png">
          </div>
          <div class="list" v-show="estimateState" @mouseleave="estimateState = false">
            <ul>
              <li v-for="(esti,i) in estimations" :key="i">
                <img src="@/assets/img/select.png" class="select" @click="selEsti($event,i)">
                <div class="list-name">{{ esti.name }}</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="container">
          <div class="info-sub" @click="assigneesState = !assigneesState">
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
      </div>
      <input type="text" v-model="title" placeholder="Title" class="issue-title">
      <textarea class="issue-body" v-model="body" :placeholder="connect!=0?'Leave a comment,This Issue is related to #' + connect:'Leave a comment,This Issue is Epic'"></textarea>
      <div><input type="checkbox" >是否添加到当前里程碑</div>
      <div class="selLabels">
        <div
          class="selLabels-item"
          v-for="(esti, i) in estimations"
          v-show="estiSel[i]"
          :key="i+'esti'"
          :style="'backgroundColor:#' + esti.color + ';color:' + changeToRgb(esti.color)"
        >{{ esti.name }}</div>
        <div
          class="selLabels-item"
          v-for="(lab, i) in labels"
          v-show="labSel[i]"
          :key="i+'lab'"
          :style="'backgroundColor:#' + lab.color + ';color:' + changeToRgb(lab.color)"
        >{{ lab.name }}</div>
      </div>
      <div class="selAssignees">
        <div class="selAssignees-item" v-for="(assi,i) in assignees" :key="i+'assi'" v-show="assiSel[i]">{{ assi.name }}</div>
      </div>
      <div class="cancel" @click="cancel">Cancel</div>
      <div class="confirm" @click="confirm">Created</div>
    </div>
  </div>
</template>

<script>
import { createIssue } from "@/api/createIssue";
import { XIANGMU_ID } from "@/project"
export default {
  name: "addDialog",
  data() {
    return {
      assignees: this.$store.getters.getAssignees,
      labels: this.$store.getters.getLabels,
      estimations: this.$store.getters.getEstimate,
      labelsState: false, // list显示/隐藏
      estimateState: false,
      assigneesState: false,
      labSel: [], // 保存选中的项
      estiSel: [],
      assiSel: [],
      title: "",
      body: ""
    };
  },
  props: ["connect","type"],
  methods: {
    confirm() {
      if (this.title.trim() == "") return;
      var labelStr = [],assigneesStr = [],body;
      this.labSel.forEach((state,i) => {
            if(state) {
              labelStr.push('"' + this.labels[i].id + '"')
            }
          })
      this.estiSel.forEach((state,i) => {
        if(state) {
          labelStr.push('"' + this.estimations[i].id + '"')
        }
      })
      labelStr = labelStr.join(',')

      this.assiSel.forEach((state,i) => {
        if(state) {
          assigneesStr.push('"' + this.assignees[i].id + '"')
        }
      })
      assigneesStr = assigneesStr.join(',')
    
      body = this.body.replace(/#\d/g, "");
      if (this.connect != 0 && typeof this.connect != 'undefined' && this.connect < 10000) {
        body = body + " #" + this.connect;
      }
      
      let params = {
        query:
          'mutation{createIssue(input:{repositoryId:"' + XIANGMU_ID +'",title:"' +
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
      // console.log(params);
      createIssue(params).then(res => {
        if(typeof res.data.errors == 'undefined') {
          this.$emit("state", true);
          this.$message({
            message: "创建成功",
            type: "success"
          })
        } else {
          this.$message.error("创建失败，请检查...")
        }
        
      });
    },
    cancel() {
      this.$emit("state", false);
    },
    /* 标签 */
    selLab(e, index) {
      if (this.labSel[index]) {
        e.currentTarget.src = require("@/assets/img/select.png");
        this.labSel[index] = false;
      } else {
        e.currentTarget.src = require("@/assets/img/selected.png");
        this.labSel[index] = true;
      }
    },
    /* 故事点 */
    selEsti(e, index) {
      if (this.estiSel[index]) {
        e.currentTarget.src = require("@/assets/img/select.png");
        this.estiSel[index] = false;
      } else {
        e.currentTarget.src = require("@/assets/img/selected.png");
        this.estiSel[index] = true;
      }
    },
    /* 负责人 */
    selAssi(e, index) {
      if (this.assiSel[index]) {
        e.currentTarget.src = require("@/assets/img/select.png");
        this.assiSel[index] = false;
      } else {
        e.currentTarget.src = require("@/assets/img/selected.png");
        this.assiSel[index] = true;
      }
    },
    /* 字体颜色 */
    changeToRgb(oldVal) {
      let rgbArr = [];
      let sum = 0;
      for (let i = 0; i < 6; i += 2) {
        rgbArr.push(parseInt("0x" + oldVal.slice(i, i + 2)));
      }
      sum = rgbArr[0] * 0.299 + rgbArr[1] * 0.578 + rgbArr[2] * 0.114;
      return sum > 192 ? "#707070" : "#FFFFFF"; // 深色背景，白色文字；浅色背景，黑色文字
    }
  },
  mounted() {
    var labLens = this.labels.length,
    estiLens = this.estimations.length,
     assiLens = this.assignees.length;
    for (let i = 0; i < labLens; i++) {
      this.labSel[i] = false;
    }
    for(let j = 0; j < assiLens; j++) {
      this.assiSel[j] = false;
    }
    for(let k = 0; k< estiLens; k++) {
      this.estiSel[k] = false;
    }
  }
};
</script>

<style  scoped>
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
  width: 1536px;
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
  width: auto;
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
.container {
  width: 118px;
  float: left;
  position: relative;
  margin-right: 12px;
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
.selLabels {
  width: 100%;
  height: 20px;
  margin-top: 14px;
}
.selLabels-item {
  display: block;
  height: 18px;
  line-height: 18px;
  float: left;
  padding: 1px 11px 1px 12px;
  border-radius: 14px;
  border: 0.5px solid rgba(214, 218, 222, 1);
  margin-right: 6px;
}
.selAssignees {
  width: 100%;
  height: 32px;
  margin-top: 12px;
}
.selAssignees-item {
  display: block;
  height: 12px;
  line-height: 12px;
  border:1px solid rgba(214,218,222,1);
  border-radius: 16px;
  padding: 10px 12px 10px 11px;
  margin-right: 6px;
  float: left;
}
.confirm {
  width: 125px;
  height: 40px;
  background: rgba(38, 128, 235, 1);
  opacity: 1;
  border-radius: 6px;
  position: absolute;
  top: 594px;
  left: 50.88%;
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
  left: 37.06%;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 40px;
  color: rgba(38, 128, 235, 1);
  text-align: center;
  cursor: pointer;
}
</style>


