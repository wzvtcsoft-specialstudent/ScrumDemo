
function changeToRgb(oldVal) {
  let rgbArr = [];
  let sum = 0;
  for(let i=0;i<6;i+=2) {
    rgbArr.push(parseInt("0x" + oldVal.slice(i, i+2)))
  }
  sum = rgbArr[0]*0.299 + rgbArr[1]*0.578 + rgbArr[2]*0.114;
  return sum > 192?'black':'white'; // 深色背景，白色文字；浅色背景，黑色文字
}
export function findInterface(data)
  {
    var BugItem=[]
    var InterfaceBug=[] //存放界面bug
  var FunctionalBug=[] //存放功能bug
    data.forEach(item=>{
      let obj={}
      obj.assignees=[]
      obj.labels=[]
      if(typeof item.labels.nodes!=='undefined')
      {
         let lab={}
         
        item.labels.nodes.forEach(i=>{
          if(i.name=='界面bug')
          {
            lab.bgcolor=i.color
            lab.ftcolor=changeToRgb(i.color)
            lab.name=i.name
            obj.number=item.number
            obj.baseurl=item.url
            obj.issueUrl=item.url
            obj.title=item.title
            obj.body=item.body
            obj.state = item.state
            obj.id=item.id
            obj.labels.push(lab)
            if(item.assignees.nodes.length!==0){
              
                item.assignees.nodes.forEach(ass=>{
              let assi = [];
              assi.push({
                name:ass.name,
                img:ass.avatarUrl,
                time: ass.updatedAt
              })
             obj.assignees=assi;
            })
            }
           
            InterfaceBug.push(obj)
          }
          if(i.name=='功能Bug')
          {
            lab.bgcolor=i.color
            lab.ftcolor=changeToRgb(i.color)
            lab.name=i.name
            obj.number=item.number
            obj.url=item.url
            obj.title=item.title
            obj.body=item.body
            obj.state = item.state
            obj.id=item.id
            obj.labels.push(lab)
            if(item.assignees.nodes.length!==0){
              
              item.assignees.nodes.forEach(ass=>{
            let assi = [];
            assi.push({
              name:ass.name,
              img:ass.avatarUrl,
              time: ass.updatedAt
            })
           obj.assignees=assi;
          })
          }
            FunctionalBug.push(obj)
          }
        })
      }
    })
    BugItem.push(InterfaceBug)
    BugItem.push(FunctionalBug)
    
    return BugItem
  }