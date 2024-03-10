import axios from 'axios';
import {message} from 'antd';
import cookie from 'react-cookies';


const instance = axios.create({
    baseURL: '/api',
    headers: {'Content-Type': 'application/json'}
});

instance.interceptors.response.use(
    res => res,
    async error => {
        if (error.response.status === 401 || error.response.status === 403) {
            await message.error("Login expired, please login again", 2, () => {
                cookie.remove('user', {path: '/'})
                window.location.href = "/user-login";
            })
        }
        return Promise.reject(error)
    }
)


export default instance;
