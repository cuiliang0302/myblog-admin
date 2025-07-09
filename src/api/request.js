import axios from 'axios'
import {ElMessage} from 'element-plus'

export function request(config) {
    // 创建axios的实例
    const instance = axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_URL,
        timeout: 2 * 60 * 1000,
        withCredentials: true
    })
    // 请求拦截器配置
    instance.interceptors.request.use(config => {
        let env_name = import.meta.env.MODE
        if (env_name === 'development') {
            console.log("开发模式，使用jwt认证")
            // 开发模式，使用jwt认证
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUyMzk0NzYzLCJpYXQiOjE3NTEwOTg3NjMsImp0aSI6IjU2MjE3Nzc1MDg5MDQ1YWY5ZTA5OTFlYTVjMzIyNTc2IiwidXNlcl9pZCI6MX0.VhjfgfTj7Z5BW7MctpswGFAzqHlbrwV4KByY_eemONM'
            config.headers.Authorization = 'Bearer ' + token
        } else {
            console.log("生产模式，使用csrf认证")
            // 生产模式，使用csrf认证
            config.headers['X-Requested-With'] = 'XMLHttpRequest';
            // 从cookie中匹配 csrftoken值
            console.log("当前浏览器 Cookie:", document.cookie);
            const match = document.cookie.match(/(^|;) ?csrftoken=([^;]*)/);
            const csrfToken = match ? match[2] : null;
            console.log("提取到的 csrftoken:", csrfToken);
            config.headers['X-CSRFToken'] = csrfToken;
            console.log(config)
        }
        console.log(config)
        return config
    }, error => {
        console.log(error)
        return Promise.error(error)
    })
    // 响应拦截器配置
    instance.interceptors.response.use(response => {
        return response.data
    }, error => {
        console.log(error)
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    return Promise.reject(error.response.data)
                case 401:
                    console.log("无权访问")
                    ElMessage.error('对不起，您暂无权限访问此接口，请登录重试！')
                    break
                case 403:
                    ElMessage.error('对不起，您的身份信息已过期，请重新登录！')
                    break
                case 404:
                    console.log("404啦")
                    break
                case 500:
                    console.log("500啦")
                    ElMessage.error('后端接口异常，请稍候重试！')
                    break
                default:
                    return Promise.reject(error)
            }
        } else {
            console.log("请求超时")
            ElMessage.error('请求超时，检查网络状态或刷新重试！')
        }
        return Promise.reject(error)
    })
    // 发送真正的网络请求
    return instance(config);
}

export default request
