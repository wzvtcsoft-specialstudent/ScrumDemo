import axios from '@/fetch'

export function moveCard(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}

export function addCards(data) {
    return axios({
        method: "POST",
        data: JSON.stringify(data)
    })
}