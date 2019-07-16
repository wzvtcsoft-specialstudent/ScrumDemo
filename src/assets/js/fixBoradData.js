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

export function fixBoradData(data) {
  data.forEach(items => {
    let boardIssue = [];
    items.forEach(item => {
      let obj = {}, subIssue = {}; 
      obj.id = item.id;
      subIssue.title = item.issue.title;
      subIssue.body = item.issue.body;
      subIssue.state = item.issue.state;
      subIssue.number = item.issue.number;
      subIssue.issueUrl = item.issue.url;
      subIssue.id = item.issue.id;
      subIssue.labels = [];
      subIssue.assignees = [];
      if (item.issue.assignees.nodes.length != 0) {
        let assi = [];
        item.issue.assignees.nodes.forEach(item => {
          assi.push({
            name: item.name,
            img: item.avatarUrl,
            time: item.updatedAt
          })
        })
        subIssue.assignees = assi;
      }
      if (item.issue.labels.totalCount !== 0) {
        let lab = [];
        item.issue.labels.nodes.forEach(item => {
          lab.push({
            name: item.name,
            bgcolor: item.color,
            ftcolor: changeToRgb(item.color)
          })
        })
        subIssue.labels = lab;
      }
      obj.issue = subIssue;
      boardIssue.push(obj)
    })
    result.push(boardIssue)
  })  
  return result

}
