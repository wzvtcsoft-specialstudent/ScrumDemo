import { isNumber } from "util";

var have = [], // 临时存放非根Issue
  epic = [], // 存放根Issue
  res = []; // 整理好的数据
var data = null; // 存放原始数据
var userColor = [];
    userColor['youlik'] = 'orange';
    userColor['诸葛康亮我最帅'] = 'lightgreen';
    userColor['Shimizu'] ='red';
    userColor['SprWu'] = 'deepskyblue';
    userColor['Lieatfhy'] = 'yellow';
    userColor['动感超人'] = 'blue';
    userColor['Salexal'] = 'green';
    userColor['刘笑锋'] = 'black';

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

/* 颜色十六进制转rgb */
function changeToRgb(oldVal) {
  let rgbArr = [];
  let sum = 0;
  for(let i=0;i<6;i+=2) {
    rgbArr.push(parseInt("0x" + oldVal.slice(i, i+2)))
  }
  sum = rgbArr[0]*0.299 + rgbArr[1]*0.578 + rgbArr[2]*0.114;
  return sum > 192?'black':'white'; // 深色背景，白色文字；浅色背景，黑色文字
}

/* 查找 */
function search(number) {
  for(let item in data) {
    if(data[item].number == number) return data[item]
  }
}

/* 递归遍历(深度)，连接Issue */
function merge(index) {
  let obj = {};
  let issueItem = search(index)
  if(typeof issueItem === 'undefined'){
    obj.number = Math.random()*10000
    return obj
  }
  let context = issueItem.title;
  let context1 = issueItem.number;
  let Url= issueItem.url;
  obj.number=context1;
  obj.baseurl=Url;
  obj.title = context;
  obj.number = issueItem.number;
  obj.issueUrl = issueItem.url
  obj.nodes = [];
  if(issueItem.assignees.nodes.length !== 0) {
    obj.assignees = {
      name:issueItem.assignees.nodes[0].name,
      img:issueItem.assignees.nodes[0].avatarUrl,
      color: userColor[issueItem.assignees.nodes[0].name],
      time: issueItem.assignees.nodes[0].updatedAt
    };
    // data[index -1].assignees.nodes.forEach( item => {
    //   obj.assignees.push({name:item.name, img:item.avatarUrl, color: userColor[item.name]})
    // })
  }
  /* 标签 */
  if(issueItem.labels.totalCount != 0) {
    let lab = [];
    issueItem.labels.nodes.forEach( item => {
      if(!isNaN(item.name)) lab.unshift({name:item.name, bgcolor:item.color, ftcolor: changeToRgb(item.color)})
      else lab.push({name:item.name, bgcolor:item.color,ftcolor: changeToRgb(item.color)})
    })
    obj.labels = lab;
  }
  if (issueItem.timelineItems.nodes.length === 0) {
    obj.nodes.push({nodes:null});
    return obj;
  }
  issueItem.timelineItems.nodes.forEach(item => {
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
