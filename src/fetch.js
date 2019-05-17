import axios from 'axios'
import qs from 'qs'

const baseURL = "https://api.github.com/graphql";

const service = axios.create({
    baseURL,
    timeout: 5000
});

const Tokena = "6"
const Tokenb = "a4e4e5e47b244d93b7c0ca1c8b9a5994ec60324"

/* 请求拦截器 */
service.interceptors.request.use( config => {
    config.headers = { // 设置请求头
        'Content-Type': 'application/json',
        'Authorization': " bearer " + Tokena + Tokenb + " "
    }
    return config;
})

export default service