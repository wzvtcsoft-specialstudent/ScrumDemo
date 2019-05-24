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


// var data = [
//                         {
//                             "title": "作为111，我能够看到111，以便于111",
//                             "number": 1,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/1",
//                             "body": "111\r\n",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 9,
//                                 "nodes": [
//                                     {
//                                         "name": "8",
//                                         "color": "a120f7"
//                                     },
//                                     {
//                                         "name": "bug",
//                                         "color": "d73a4a"
//                                     },
//                                     {
//                                         "name": "duplicate",
//                                         "color": "cfd3d7"
//                                     },
//                                     {
//                                         "name": "enhancement",
//                                         "color": "a2eeef"
//                                     },
//                                     {
//                                         "name": "good first issue",
//                                         "color": "7057ff"
//                                     },
//                                     {
//                                         "name": "help wanted",
//                                         "color": "008672"
//                                     },
//                                     {
//                                         "name": "invalid",
//                                         "color": "e4e669"
//                                     },
//                                     {
//                                         "name": "question",
//                                         "color": "d876e3"
//                                     },
//                                     {
//                                         "name": "wontfix",
//                                         "color": "ffffff"
//                                     }
//                                 ]
//                             },
//                             "timelineItems": {
//                                 "totalCount": 5,
//                                 "nodes": [
//                                     {
//                                         "source": {
//                                             "number": 2,
//                                             "title": "作为222，我能够看到222，以便于222",
//                                             "labels": {
//                                                 "totalCount": 3,
//                                                 "nodes": [
//                                                     {
//                                                         "name": "5",
//                                                         "color": "11a041"
//                                                     },
//                                                     {
//                                                         "name": "good first issue",
//                                                         "color": "7057ff"
//                                                     },
//                                                     {
//                                                         "name": "help wanted",
//                                                         "color": "008672"
//                                                     }
//                                                 ]
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 1,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     },
//                                     {
//                                         "source": {
//                                             "number": 3,
//                                             "title": "作为333，我能够看到333，以便于333",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 1,
//                                                 "nodes": [
//                                                     {
//                                                         "name": "SprWu"
//                                                     }
//                                                 ]
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 1,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     },
//                                     {
//                                         "source": {
//                                             "number": 4,
//                                             "title": "作为444，我能够看到444，以便于444",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 1,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     },
//                                     {
//                                         "source": {
//                                             "number": 8,
//                                             "title": "作为888，我能够看到888，以便于888",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 1,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     },
//                                     {
//                                         "source": {
//                                             "number": 14,
//                                             "title": "作为121212，我能够看到121212，以便于121212",
//                                             "labels": {
//                                                 "totalCount": 1,
//                                                 "nodes": [
//                                                     {
//                                                         "name": "bug",
//                                                         "color": "d73a4a"
//                                                     }
//                                                 ]
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 1,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     }
//                                 ]
//                             }
//                         },
//                         {
//                             "title": "作为222，我能够看到222，以便于222",
//                             "number": 2,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/2",
//                             "body": "222\r\n#1 ",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 3,
//                                 "nodes": [
//                                     {
//                                         "name": "5",
//                                         "color": "11a041"
//                                     },
//                                     {
//                                         "name": "good first issue",
//                                         "color": "7057ff"
//                                     },
//                                     {
//                                         "name": "help wanted",
//                                         "color": "008672"
//                                     }
//                                 ]
//                             },
//                             "timelineItems": {
//                                 "totalCount": 1,
//                                 "nodes": [
//                                     {
//                                         "source": {
//                                             "number": 15,
//                                             "title": "作为131313，我能够看到131313，以便于131313",
//                                             "labels": {
//                                                 "totalCount": 2,
//                                                 "nodes": [
//                                                     {
//                                                         "name": "8",
//                                                         "color": "a120f7"
//                                                     },
//                                                     {
//                                                         "name": "good first issue",
//                                                         "color": "7057ff"
//                                                     }
//                                                 ]
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 4,
//                                                 "nodes": [
//                                                     {
//                                                         "name": "Shimizu"
//                                                     },
//                                                     {
//                                                         "name": "youlik"
//                                                     },
//                                                     {
//                                                         "name": "Salexal"
//                                                     },
//                                                     {
//                                                         "name": "SprWu"
//                                                     }
//                                                 ]
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 2,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     }
//                                 ]
//                             }
//                         },
//                         {
//                             "title": "作为333，我能够看到333，以便于333",
//                             "number": 3,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/3",
//                             "body": "333\r\n#1",
//                             "assignees": {
//                                 "nodes": [
//                                     {
//                                         "name": "SprWu",
//                                         "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                     }
//                                 ]
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 2,
//                                 "nodes": [
//                                     {
//                                         "source": {
//                                             "number": 5,
//                                             "title": "作为555，我能够看到555，以便于555",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 3,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     },
//                                     {
//                                         "source": {
//                                             "number": 6,
//                                             "title": "作为666，我能够看到666，以便于666",
//                                             "labels": {
//                                                 "totalCount": 1,
//                                                 "nodes": [
//                                                     {
//                                                         "name": "good first issue",
//                                                         "color": "7057ff"
//                                                     }
//                                                 ]
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 1,
//                                                 "nodes": [
//                                                     {
//                                                         "name": "SprWu"
//                                                     }
//                                                 ]
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 3,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     }
//                                 ]
//                             }
//                         },
//                         {
//                             "title": "作为444，我能够看到444，以便于444",
//                             "number": 4,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/4",
//                             "body": "444\r\n#1",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 1,
//                                 "nodes": [
//                                     {
//                                         "source": {
//                                             "number": 16,
//                                             "title": "this is new api create  issue",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 4,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     }
//                                 ]
//                             }
//                         },
//                         {
//                             "title": "作为555，我能够看到555，以便于555",
//                             "number": 5,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/5",
//                             "body": "555\r\n#3",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 1,
//                                 "nodes": [
//                                     {
//                                         "source": {
//                                             "number": 7,
//                                             "title": "作为777，我能够看到777，以便于777",
//                                             "labels": {
//                                                 "totalCount": 1,
//                                                 "nodes": [
//                                                     {
//                                                         "name": "3",
//                                                         "color": "0e8a16"
//                                                     }
//                                                 ]
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 2,
//                                                 "nodes": [
//                                                     {
//                                                         "name": "诸葛康亮我最帅"
//                                                     },
//                                                     {
//                                                         "name": "动感超人"
//                                                     }
//                                                 ]
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 5,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     }
//                                 ]
//                             }
//                         },
//                         {
//                             "title": "作为666，我能够看到666，以便于666",
//                             "number": 6,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/6",
//                             "body": "666\r\n#3",
//                             "assignees": {
//                                 "nodes": [
//                                     {
//                                         "name": "SprWu",
//                                         "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                     }
//                                 ]
//                             },
//                             "labels": {
//                                 "totalCount": 1,
//                                 "nodes": [
//                                     {
//                                         "name": "good first issue",
//                                         "color": "7057ff"
//                                     }
//                                 ]
//                             },
//                             "timelineItems": {
//                                 "totalCount": 2,
//                                 "nodes": [
//                                     {
//                                         "source": {
//                                             "number": 9,
//                                             "title": "作为999，我能够看到999，以便于9999",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 6,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     },
//                                     {
//                                         "source": {
//                                             "number": 17,
//                                             "title": "this is new api postman create  issue",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 6,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     }
//                                 ]
//                             }
//                         },
//                         {
//                             "title": "作为777，我能够看到777，以便于777",
//                             "number": 7,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/7",
//                             "body": "777\r\n#5",
//                             "assignees": {
//                                 "nodes": [
//                                     {
//                                         "name": "诸葛康亮我最帅",
//                                         "avatarUrl": "https://avatars0.githubusercontent.com/u/43224889?v=4"
//                                     },
//                                     {
//                                         "name": "动感超人",
//                                         "avatarUrl": "https://avatars2.githubusercontent.com/u/43224933?v=4"
//                                     }
//                                 ]
//                             },
//                             "labels": {
//                                 "totalCount": 1,
//                                 "nodes": [
//                                     {
//                                         "name": "3",
//                                         "color": "0e8a16"
//                                     }
//                                 ]
//                             },
//                             "timelineItems": {
//                                 "totalCount": 2,
//                                 "nodes": [
//                                     {
//                                         "source": {
//                                             "number": 9,
//                                             "title": "作为999，我能够看到999，以便于9999",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 7,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     },
//                                     {
//                                         "source": {
//                                             "number": 12,
//                                             "title": "oioioioioio",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 7,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     }
//                                 ]
//                             }
//                         },
//                         {
//                             "title": "作为888，我能够看到888，以便于888",
//                             "number": 8,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/8",
//                             "body": "#1",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             }
//                         },
//                         {
//                             "title": "作为999，我能够看到999，以便于9999",
//                             "number": 9,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/9",
//                             "body": "999\r\n#7 #6 ",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 1,
//                                 "nodes": [
//                                     {
//                                         "source": {
//                                             "number": 10,
//                                             "title": "作为101010，我能看到101010，以便于101010",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 9,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     }
//                                 ]
//                             }
//                         },
//                         {
//                             "title": "作为101010，我能看到101010，以便于101010",
//                             "number": 10,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/10",
//                             "body": "101010\r\n#9",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 1,
//                                 "nodes": [
//                                     {
//                                         "source": {
//                                             "number": 11,
//                                             "title": "111111111",
//                                             "labels": {
//                                                 "totalCount": 1,
//                                                 "nodes": [
//                                                     {
//                                                         "name": "8",
//                                                         "color": "a120f7"
//                                                     }
//                                                 ]
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 8,
//                                                 "nodes": [
//                                                     {
//                                                         "name": "刘笑锋"
//                                                     },
//                                                     {
//                                                         "name": "Shimizu"
//                                                     },
//                                                     {
//                                                         "name": "youlik"
//                                                     },
//                                                     {
//                                                         "name": "Salexal"
//                                                     },
//                                                     {
//                                                         "name": "诸葛康亮我最帅"
//                                                     },
//                                                     {
//                                                         "name": "Lieatfhy"
//                                                     },
//                                                     {
//                                                         "name": "动感超人"
//                                                     },
//                                                     {
//                                                         "name": "SprWu"
//                                                     }
//                                                 ]
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 10,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     }
//                                 ]
//                             }
//                         },
//                         {
//                             "title": "111111111",
//                             "number": 11,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/11",
//                             "body": "1111111\r\n#10 ",
//                             "assignees": {
//                                 "nodes": [
//                                     {
//                                         "name": "刘笑锋",
//                                         "avatarUrl": "https://avatars3.githubusercontent.com/u/6415962?v=4"
//                                     },
//                                     {
//                                         "name": "Shimizu",
//                                         "avatarUrl": "https://avatars2.githubusercontent.com/u/34497105?v=4"
//                                     },
//                                     {
//                                         "name": "youlik",
//                                         "avatarUrl": "https://avatars3.githubusercontent.com/u/34698209?v=4"
//                                     },
//                                     {
//                                         "name": "Salexal",
//                                         "avatarUrl": "https://avatars1.githubusercontent.com/u/41779305?v=4"
//                                     },
//                                     {
//                                         "name": "诸葛康亮我最帅",
//                                         "avatarUrl": "https://avatars0.githubusercontent.com/u/43224889?v=4"
//                                     },
//                                     {
//                                         "name": "Lieatfhy",
//                                         "avatarUrl": "https://avatars0.githubusercontent.com/u/43224896?v=4"
//                                     },
//                                     {
//                                         "name": "动感超人",
//                                         "avatarUrl": "https://avatars2.githubusercontent.com/u/43224933?v=4"
//                                     },
//                                     {
//                                         "name": "SprWu",
//                                         "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                     }
//                                 ]
//                             },
//                             "labels": {
//                                 "totalCount": 1,
//                                 "nodes": [
//                                     {
//                                         "name": "8",
//                                         "color": "a120f7"
//                                     }
//                                 ]
//                             },
//                             "timelineItems": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             }
//                         },
//                         {
//                             "title": "oioioioioio",
//                             "number": 12,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/12",
//                             "body": "你好\r\n#7 ",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 1,
//                                 "nodes": [
//                                     {
//                                         "source": {
//                                             "number": 13,
//                                             "title": "55555",
//                                             "labels": {
//                                                 "totalCount": 1,
//                                                 "nodes": [
//                                                     {
//                                                         "name": "bug",
//                                                         "color": "d73a4a"
//                                                     }
//                                                 ]
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 12,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                             }
//                                         }
//                                     }
//                                 ]
//                             }
//                         },
//                         {
//                             "title": "55555",
//                             "number": 13,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/13",
//                             "body": "ssss\r\n#12 ",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 1,
//                                 "nodes": [
//                                     {
//                                         "name": "bug",
//                                         "color": "d73a4a"
//                                     }
//                                 ]
//                             },
//                             "timelineItems": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             }
//                         },
//                         {
//                             "title": "作为121212，我能够看到121212，以便于121212",
//                             "number": 14,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/14",
//                             "body": "121212\r\n#1 ",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 1,
//                                 "nodes": [
//                                     {
//                                         "name": "bug",
//                                         "color": "d73a4a"
//                                     }
//                                 ]
//                             },
//                             "timelineItems": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             }
//                         },
//                         {
//                             "title": "作为131313，我能够看到131313，以便于131313",
//                             "number": 15,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/15",
//                             "body": "#2 ",
//                             "assignees": {
//                                 "nodes": [
//                                     {
//                                         "name": "Shimizu",
//                                         "avatarUrl": "https://avatars2.githubusercontent.com/u/34497105?v=4"
//                                     },
//                                     {
//                                         "name": "youlik",
//                                         "avatarUrl": "https://avatars3.githubusercontent.com/u/34698209?v=4"
//                                     },
//                                     {
//                                         "name": "Salexal",
//                                         "avatarUrl": "https://avatars1.githubusercontent.com/u/41779305?v=4"
//                                     },
//                                     {
//                                         "name": "SprWu",
//                                         "avatarUrl": "https://avatars1.githubusercontent.com/u/43224960?v=4"
//                                     }
//                                 ]
//                             },
//                             "labels": {
//                                 "totalCount": 2,
//                                 "nodes": [
//                                     {
//                                         "name": "8",
//                                         "color": "a120f7"
//                                     },
//                                     {
//                                         "name": "good first issue",
//                                         "color": "7057ff"
//                                     }
//                                 ]
//                             },
//                             "timelineItems": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             }
//                         },
//                         {
//                             "title": "this is new api create  issue",
//                             "number": 16,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/16",
//                             "body": "thi is so cool\n #4",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             }
//                         },
//                         {
//                             "title": "this is new api postman create  issue",
//                             "number": 17,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/17",
//                             "body": "this is so cool\n #6",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             }
//                         },
//                         {
//                             "title": "this is Test",
//                             "number": 18,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/18",
//                             "body": "1",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             }
//                         },
//                         {
//                             "title": "Test",
//                             "number": 19,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/19",
//                             "body": "Test createIssue",
//                             "assignees": {
//                                 "nodes": [
//                                     {
//                                         "name": "Lieatfhy",
//                                         "avatarUrl": "https://avatars0.githubusercontent.com/u/43224896?v=4"
//                                     }
//                                 ]
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             }
//                         },
//                         {
//                             "title": "作为使用者，我想要通过看板了解任务卡处在开发哪一阶段，以便于透明化任务管理",
//                             "number": 20,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/20",
//                             "body": "",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 6,
//                                 "nodes": [
//                                     {
//                                         "source": {
//                                             "number": 21,
//                                             "title": "作为使用者，我想要新建、删除、移动看板，以便于开发流程的规划",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 20,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars0.githubusercontent.com/u/21036219?v=4"
//                                             }
//                                         }
//                                     },
//                                     {
//                                         "source": {
//                                             "number": 22,
//                                             "title": "作为使用者，我想要对看板进行命名，以便于看板管理",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 20,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars0.githubusercontent.com/u/21036219?v=4"
//                                             }
//                                         }
//                                     },
//                                     {
//                                         "source": {
//                                             "number": 23,
//                                             "title": "作为使用者，我想要对不同看板内的卡片进行移动，以便于更新任务进程",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 20,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars0.githubusercontent.com/u/21036219?v=4"
//                                             }
//                                         }
//                                     },
//                                     {
//                                         "source": {
//                                             "number": 24,
//                                             "title": "作为使用者，我想要对卡片的移动作记录，以便于历史追踪",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 20,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars0.githubusercontent.com/u/21036219?v=4"
//                                             }
//                                         }
//                                     },
//                                     {
//                                         "source": {
//                                             "number": 25,
//                                             "title": "作为使用者，我想要通过卡片所属(人、点数、里程碑、标签)进行筛选，以便于查看相应任务卡片",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 20,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars0.githubusercontent.com/u/21036219?v=4"
//                                             }
//                                         }
//                                     },
//                                     {
//                                         "source": {
//                                             "number": 26,
//                                             "title": "作为使用者，我想要通过里程碑来作为一个spirit冲刺周期，以便以任务卡片的规划",
//                                             "labels": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             },
//                                             "assignees": {
//                                                 "totalCount": 0,
//                                                 "nodes": []
//                                             }
//                                         },
//                                         "target": {
//                                             "number": 20,
//                                             "author": {
//                                                 "avatarUrl": "https://avatars0.githubusercontent.com/u/21036219?v=4"
//                                             }
//                                         }
//                                     }
//                                 ]
//                             }
//                         },
//                         {
//                             "title": "作为使用者，我想要新建、删除、移动看板，以便于开发流程的规划",
//                             "number": 21,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/21",
//                             "body": "#20 ",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             }
//                         },
//                         {
//                             "title": "作为使用者，我想要对看板进行命名，以便于看板管理",
//                             "number": 22,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/22",
//                             "body": "#20 ",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             }
//                         },
//                         {
//                             "title": "作为使用者，我想要对不同看板内的卡片进行移动，以便于更新任务进程",
//                             "number": 23,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/23",
//                             "body": "#20 ",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             }
//                         },
//                         {
//                             "title": "作为使用者，我想要对卡片的移动作记录，以便于历史追踪",
//                             "number": 24,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/24",
//                             "body": "#20 ",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             }
//                         },
//                         {
//                             "title": "作为使用者，我想要通过卡片所属(人、点数、里程碑、标签)进行筛选，以便于查看相应任务卡片",
//                             "number": 25,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/25",
//                             "body": "#20 ",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             }
//                         },
//                         {
//                             "title": "作为使用者，我想要通过里程碑来作为一个spirit冲刺周期，以便以任务卡片的规划",
//                             "number": 26,
//                             "url": "https://github.com/wzvtcsoft-specialstudent/ScrumDemo/issues/26",
//                             "body": "#20 ",
//                             "assignees": {
//                                 "nodes": []
//                             },
//                             "labels": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             },
//                             "timelineItems": {
//                                 "totalCount": 0,
//                                 "nodes": []
//                             }
//                         }
//                     ]
