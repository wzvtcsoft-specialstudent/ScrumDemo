var result = [];

function changeToRgb(oldVal) {
  let rgbArr = [];
  let sum = 0;
  for (let i = 0; i < 6; i += 2) {
    rgbArr.push(parseInt("0x" + oldVal.slice(i, i + 2)))
  }
  sum = rgbArr[0] * 0.299 + rgbArr[1] * 0.578 + rgbArr[2] * 0.114;
  return sum > 192 ? 'black' : 'white'; // 深色背景，白色文字；浅色背景，黑色文字
}

export function fixSprintData(data) {
  data.forEach(item => {
    let milestones = [];
    item.nodes.forEach(issue => {
      let obj = {};
      obj.title = issue.title;
      obj.number = issue.number;
      obj.issueUrl = issue.url;
      if (issue.assignees.nodes.length != 0) {
        obj.assignees = {
          name: issue.assignees.nodes[0].name,
          img: issue.assignees.nodes[0].avatarUrl,
          time: issue.assignees.nodes[0].updatedAt
        }
      }
      if (issue.labels.totalCount !== 0) {
        let lab = [];
        issue.labels.nodes.forEach(item => {
          lab.push({
            name: item.name,
            bgcolor: item.color,
            ftcolor: changeToRgb(item.color)
          })
        })
        obj.labels = lab;
      }
      milestones.push(obj)
    })
    result.push(milestones)
  })
  return result
}
