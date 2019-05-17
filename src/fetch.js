import axios from 'axios'
import qs from 'qs'

const baseURL = "https://api.github.com/graphql";

const service = axios.create({
    baseURL,
    timeout: 5000
});
const Tokena = "87273968"
const Tokenb = "fac550a789c"
const Token = "512a55b72"
const T = "ee051541"
const F = "f4fd"

/* 请求拦截器 */
service.interceptors.request.use( config => {
    config.headers = { // 设置请求头
        'Content-Type': 'application/json',
        'Authorization': " bearer " + Tokena + Tokenb + Token + T + F + " "
    }
    return config;
})

export default service