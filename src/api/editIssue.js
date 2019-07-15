import axios from '@/fetch'

export function editIssue(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}

export function closeIssue(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}

export function openIssue(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}