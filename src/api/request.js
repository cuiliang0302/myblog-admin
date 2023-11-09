import axios from 'axios'
import {ElMessage} from 'element-plus'

export function request(config) {
    // 创建axios的实例
    const instance = axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_URL,
        timeout: 2 * 60 * 1000
    })
    // 请求拦截器配置
    instance.interceptors.request.use(config => {
            let env_name = import.meta.env.MODE
            if (env_name === 'development') {
                // 开发模式，使用jwt认证
                const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5NTQwMzE0LCJpYXQiOjE2OTk1Mzk3MTQsImp0aSI6ImVmYTc0NDhkZDFhNjQzZTQ4ODUzNWZkZDAxMzM2ZTRkIiwidXNlcl9pZCI6MX0.FQUbS5ofp_iV-8Jl-yqIX9mVT5DPK_DEzHdzCdZDdCk'
                config.headers.Authorization = 'Bearer ' + token
            } else {
                // 生产模式，使用csrf认证
                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                let regex = /.*csrftoken=([^;.]*).*$/; // 用于从cookie中匹配 csrftoken值
                config.headers['X-CSRFToken'] = document.cookie.match(regex) === null ? null : document.cookie.match(regex)[1];
            }
            console.log(config)
            return config
        }, error => {
            console.log(error)
            return Promise.error(error)
        }
    )
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
