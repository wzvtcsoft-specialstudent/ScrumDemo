var task=[];

export function fixTask(data){
    data.foreach(item=>{
       let tasks=[];
    item.forEach(issue => {
        let obj = {};
        if(issue.timelineItems.length==0)
        {
            obj.title = issue.title;
            obj.number = issue.number;
            obj.issueUrl = issue.url;
        }
        tasks.push(obj)
    })
    task.push(tasks)
    })
    return task;
}