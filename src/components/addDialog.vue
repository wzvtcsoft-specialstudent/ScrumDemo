<template>
  <div class="dialog-container">
    <div class="dialog">
      <input type="text" class="issue-title" placeholder="Title">
      <textarea class="issue-body" placeholder="Leave a comment"></textarea>
      <div class="inform">
        <div class="box">
          <span>负责人:</span>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
        <div class="box">
          <span>标签:</span>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
        </div>
      </div>
      <div class="sub-buttom">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addDialog",
  data() {
    return {};
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
  width: 760px;
  height: 610px;
  background-color: white;
  margin: 10px auto;
  padding: 20px 20px 20px 20px;
}
.issue-title {
  width: 720px;
  height: 30px;
  font-size: 16px;
  padding: 4px 10px;
  background-color: #fafbfc;
  border: 1px solid #d1d5da;
}
.issue-title:focus {
  border-color: #2188ff;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
    0 0 0 0.2em rgba(3, 102, 214, 0.3);
  outline: none;
}
.issue-body {
  width: 727px;
  height: 284px;
  min-height: 260px;
  max-height: 350px;
  margin-top: 30px;
  resize: vertical;
  padding: 8px;
  font-size: 14px;
  font-family: monospace;
  border-color: rgb(169, 169, 169);
  white-space: pre-wrap;
  overflow-wrap: break-word;
  font-family: inherit;
  background-color: #fafbfc;
  line-height: 20px;
  border: 1px solid #d1d5da;
}
.issue-body:focus {
  border-color: #2188ff;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075),
    0 0 0 0.2em rgba(3, 102, 214, 0.3);
  outline: none;
}
.inform {
  width: 725px;
  height: 50px;
  padding: 0 10px;
  margin-top: 30px;
}
.box {
  width: 200px;
  height: 50px;
  border: 0.5px solid black;
  margin-left: 100px;
  float: left;
}
select {
  width: 100px;
}
.sub-buttom {
  width: 725px;
  height: 30px;
  background-color: pink;
  margin-top: 60px;
}
// details summary::-webkit-details-marker { display:none; }
// summary{outline:none;}
</style>


