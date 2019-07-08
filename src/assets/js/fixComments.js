export function fixComments(data) {
    var result = [],state = true, tmp = [];
    result[0] = {
        number: 0,
        body: "All Comments"
    };
    data.forEach(comment => {
        state = true;
        tmp = [];
        if(comment.comments.nodes.length == 0) {
            state = false
        } else {
            comment.comments.nodes.forEach(cmd => {
                tmp.push({
                    id: cmd.id,
                    body: cmd.body
                })
            })
        }
        result.push({
            state: state,
            comments: tmp
        })
    })
    return result;
}