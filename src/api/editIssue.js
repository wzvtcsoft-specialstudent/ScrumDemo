import axios from '@/fetch'

export function editIssue(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}