import axios from '@/fetch'

export function createIssue(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}
