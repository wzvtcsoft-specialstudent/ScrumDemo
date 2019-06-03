var have = [], // 临时存放非根Issue
  epici = [], // 存放根Issue
  epic = [], // 存放epic
  storyi = [], // 存放story索引
  story = [], // 存放story
  task = [], // 存放task
  res = []; // 整理好的数据
var data = null; // 存放原始数据
var userColor = [];
userColor['youlik'] = 'orange';
userColor['诸葛康亮我最帅'] = 'lightgreen';
userColor['Shimizu'] = 'red';
userColor['SprWu'] = 'deepskyblue';
userColor['Lieatfhy'] = 'yellow';
userColor['动感超人'] = 'blue';
userColor['Salexal'] = 'green';
userColor['刘笑锋'] = 'black';

function init() {
  /* 找出非根Issue的编号 */
  data.forEach(item => {
    item.timelineItems.nodes.forEach(i => {
      // 如果不为 undefined ，说明关联的别人
      if (typeof i.source !== 'undefined') {
        have.push(i.source.number)
      }
    });
  });
  /* 找出根Issue的编号 */
  data.forEach(item => {
    if (have.indexOf(item.number) === -1) {
      epici.push(item.number)
    }
  });
}

/* 颜色十六进制转rgb */
function changeToRgb(oldVal) {
  let rgbArr = [];
  let sum = 0;
  for (let i = 0; i < 6; i += 2) {
    rgbArr.push(parseInt("0x" + oldVal.slice(i, i + 2)))
  }
  sum = rgbArr[0] * 0.299 + rgbArr[1] * 0.578 + rgbArr[2] * 0.114;
  return sum > 192 ? 'black' : 'white'; // 深色背景，白色文字；浅色背景，黑色文字
}

/* 返回对应的issue对象 */
function getIssue(index) {
  let t = data[index - 1];
  return {
    title: t.title,
    number: t.number,
    url: t.url,
    assignees: t.assignees,
    labels: (() => {
        let arr = [];
        t.labels.nodes.forEach( item => {
            arr.push({
                name: item.name,
                color:item.color,
                ftcolor: changeToRgb(item.color)
            })
        })
        return arr;
    })()
  };
}
/* 遍历epici数组，生成epic、storyi、story数组 */
function getEpic() {
  epici.forEach(index => {
    /* epic本身 */
    epic.push(getIssue(index))
    /* storyi、story */
    story[index] = []; // 以每个issue的number为键
    data[index - 1].timelineItems.nodes.forEach(item => {
      if (typeof item.source !== 'undefined') {
        storyi.push(item.source.number)
        story[index].push(getIssue(item.source.number))
      }
    })
  });
}

/* 遍历storyi数组，生成task数组 */
function getTask() {
  storyi.forEach(index => {
    task[index] = [];
    data[index - 1].timelineItems.nodes.forEach(item => {
      if (typeof item.source !== 'undefined') {
        task[index].push(getIssue(item.source.number))
      }
    })
  })
}

export function fixTableData(oldData) {
  data = oldData;
  init();
  getEpic();
  getTask();
  res.push(epic);
  res.push(story);
  res.push(task);
  return res;
}
