<template>
  <ul>
    <li v-for="(item, i) in list" :key="i">
      <label class="timeLabel" title="完成天数">{{ item.labels | showDay}}</label>
      <span @mouseover="onFocus(i)" @mouseout="onBlur(i)" ref="span" class="span">{{ item.title }}</span>
      <label
        v-for="(name, i) in item.assignees"
        :key="i"
        class="assignLabel"
        :title="name"
      >{{ name }}</label>
      <sub-list v-if="status" :list="item.nodes"></sub-list>
    </li>
  </ul>
</template>

<script>
export default {
  name: "subList",
  data() {
    return {
      status: true
    };
  },
  props: {
    list: Array
  },
  methods: {
    onFocus(i) {
      let ele = this.$refs.span[i].parentNode;
      ele = this.getParentNode(ele);
      while (this.getParentNode(ele).id !== "tree") {
        ele.firstChild.style.border = "1.5px dashed orange";
        ele = this.getParentNode(ele);
      }
    },
    onBlur(i) {
      let ele = this.$refs.span[i].parentNode;
      ele = this.getParentNode(ele);
      while (this.getParentNode(ele).id !== "tree") {
        ele.firstChild.style.removeProperty("border");
        ele = this.getParentNode(ele);
      }
    },
    getParentNode(node) {
      return node.parentNode.parentNode;
    }
  },
  filters: {
    showDay(value) {
      return typeof value === "undefined" ? "未设置" : value[0];
    }
  },
  created() {
    if (this.list === "undefined") {
      this.status = false;
    }
  }
};
</script>

<style scoped>
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
  text-align: left;
  height: 45px;
  color: #888;
  line-height: 45px;
  min-width: 100px;
  max-width: 1000px;
  max-lines: 1;
  border: 1.5px solid #ddd;
  border-radius: 5px;
  padding: 0 8px;

  font-size: 1.5em;
  cursor: pointer;
}

.timeLabel {
  display: block;
  height: 45px;
  max-height: 45px;
  line-height: 45px;
  border-radius: 5px;
  float: left;
  padding: 0 8px;
  font-size: 1em;
  color: #ddd;
  border: 1.5px solid #ddd;
}

.assignLabel {
  display: inline-block;
  /* 防止在 display:inline-block 下，元素不对齐 */
  vertical-align: bottom; 
  height: 45px;
  max-height: 45px;
  line-height: 45px;
  max-width: 100px;
  /* 过长的文字用 ... 省略 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 5px;
  font-size: 1.5em;
  color: #ddd;
  border: 1.5px solid #ddd;
  background-color: rgb(14, 166, 226);
}
/* 获得焦点改变背景色 */
#tree span:hover,
#tree span:hover + ul span {
  color: #fff;
  background-color: deepskyblue;
}
/* 获得焦点改变边框和连线的颜色 */
#tree span:hover,
#tree span:hover ~ ul span,
#tree span:hover ~ ul li:before,
#tree span:hover ~ ul li:after {
  border-color: blue;
}
</style>

