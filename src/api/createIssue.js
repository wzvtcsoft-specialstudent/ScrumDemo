import axios from '@/fetch'

export function createIssue(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}

export function addComment(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}

export function editComment(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}

export function delComment(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}
