import { isNumber } from "util";

var have = [], // 临时存放非根Issue
  epic = [], // 存放根Issue
  res = []; // 整理好的数据
var data = null; // 存放原始数据


/* 初始化 */
function init() {
    var i =0;
  /* 找出存在上级issue的issue编号 */
  data.forEach(item => {
    // for (let key in item.timelineItems.nodes) {
    //     console.log(i++);
    //  if(item.timelineItems.nodes[key].source === 'undefined')
    //     have.push(item.timelineItems.nodes[key].source.number)
      
    // }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    item.timelineItems.nodes.forEach( i => {
        //console.log(i);
        if(typeof i.source !== 'undefined') {
            have.push(i.source.number)
        }
    })
  })
  /* 找出epic */
  data.forEach(item => {
    if (have.indexOf(item.number) === -1) {
      epic.push(item.number)
    }
  })
}

/* 递归遍历(深度)，连接Issue */
function merge(index) {
  let obj = {};
  let context = data[index - 1].title;
  obj.title = context;
  obj.day = "未设置";
  if(data[index - 1].assignees.nodes.length !== 0) {
    obj.assignees = [];
    data[index -1].assignees.nodes.forEach( item => {
      obj.assignees.push(item.name)
    })
  }
  if(data[index - 1].labels.totalCount != 0) {
    let lab = [];
    data[index - 1].labels.nodes.forEach( item => {
      if(!isNaN(item.name)) obj.day = item.name;
      else lab.push(item.name)
    })
    obj.labels = lab;
  }
  if (data[index - 1].timelineItems.nodes.length === 0) return obj;
  obj.nodes = [];
  data[index - 1].timelineItems.nodes.forEach(item => {
    if(typeof item.source !== 'undefined') {
        obj.nodes.push(merge(item.source.number))
    }
        
  })
  return obj;
}

export function fixData(oldData) {
  data = oldData;
  init();
  epic.forEach(i => {
    res.push(merge(i));
  });
  return res;
}
