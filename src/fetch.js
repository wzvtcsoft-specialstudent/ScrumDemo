import axios from 'axios'
import qs from 'qs'

const baseURL = "https://api.github.com/graphql";

const service = axios.create({
    baseURL,
    timeout: 5000
});


/* 请求拦截器 */
service.interceptors.request.use( config => {
    config.headers = { // 设置请求头
        'Content-Type': 'application/json',
        'Authorization': ' bearer 61b6587f19e2d792a2185ff4f8f23e051b4cfc84 '
    }
    return config;
})

export default service