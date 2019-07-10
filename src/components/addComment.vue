<template>
  <div class="dialog-container">
    <div class="dialog">
      <span class="title" v-show="func == 'add'">添加验收标准</span>
      <span class="title" v-show="func == 'edit'">编辑验收标准</span>
      <div class="line"></div>
      <textarea class="comment-body" placeholder="请输入验收标准" v-model="commentBody"></textarea>
      <div class="comment-del" v-show="func == 'edit'" @click="delcomment">删除此验收标准</div>
      <div class="cancel" @click="cancel">取消</div>
      <div class="confirm" @click="confirmAdd" v-if="func == 'add'">确认添加</div>
      <div class="confirm" @click="confirmEdit" v-else>确认编辑</div>
    </div>
  </div>
</template>

<script>
import { addComment, editComment, delComment } from "@/api/createIssue";

export default {
  name: "comment",
  props: ["data", "func"],
  data() {
    return {
      commentBody: ""
    };
  },
  methods: {
    delcomment() {
      this.$confirm("确定删除此验收标准?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            query:
              'mutation {deleteIssueComment(input:{id:"' +
              this.data.id +
              '"}) {clientMutationId}}'
          };
          delComment(params).then(res => {
              if(typeof res.data.errors == 'undefined') {
                  this.$message({
                      message: "删除成功",
                      type: "success"
                  })
                  this.$emit('state', true)
              } else {
                  this.$message.errors("删除失败，请检查...")
              }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    cancel() {
      this.$emit("state", false);
    },
    confirmAdd() {
      if (this.commentBody.trim().length == 0) {
        this.$message.error("请输入验收标准");
        return;
      }
      let params = {
        query:
          'mutation {addComment(input:{subjectId:"' +
          this.data.id +
          '",body:"' +
          this.commentBody +
          '"}) {commentEdge{node{id body}}}}'
      };
      addComment(params).then(res => {
        console.log(res);
        if (typeof res.data.errors == "undefined") {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.$emit("state", true);
        } else {
          this.$message.error("添加出错，请检查...");
        }
      });
    },
    confirmEdit() {
      if (this.commentBody.trim().length == 0) {
        this.$message.error("请输入验收标准");
        return;
      }
      let params = {
        query:
          'mutation {updateIssueComment(input:{id:"' +
          this.data.id +
          '",body:"' +
          this.commentBody +
          '"}) {clientMutationId}}'
      };
      editComment(params).then(res => {
        console.log(res);
        if (typeof res.data.errors == "undefined") {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.$emit("state", true);
        } else {
          this.$message.error("修改失败，请检查...");
        }
      });
    }
  },
  mounted() {
    if (this.func == "edit") {
      this.commentBody = this.data.body;
    }
  }
};
</script>

<style lang="scss" scoped>
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
  height: 580px;
  background-color: white;
  margin: 60px auto;
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
  width: 130px;
  height: 8px;
  background: rgba(231, 231, 231, 1);
  opacity: 1;
  position: absolute;
  top: 50px;
  left: 13px;
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
.comment-body {
  width: 99.16%;
  height: 270px;
  font-size: 16px;
  padding-left: 0.84%;
  margin-top: 90px;
  background: rgba(250, 251, 252, 1);
  border: 1px solid rgba(214, 218, 222, 1);
  resize: none;
}
.comment-body:focus {
  border-color: #2188ff;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
    0 0 0 0.2em rgba(3, 102, 214, 0.3);
  outline: none;
}
.comment-del {
  width: 100px;
  height: 30px;
  background: rgba(38, 128, 235, 1);
  opacity: 1;
  border-radius: 6px;
  margin-top: 10px;
  font-size: 12px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 30px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  cursor: pointer;
}
.confirm {
  width: 125px;
  height: 40px;
  background: rgba(38, 128, 235, 1);
  opacity: 1;
  border-radius: 6px;
  position: absolute;
  top: 430px;
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
  top: 430px;
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
