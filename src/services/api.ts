import axios from "axios";
import { parseCookies } from "nookies";

const api = axios.create({
    baseURL: 'https://api.dev.aceno.com/'
})

api.interceptors.request.use(
    (config) => {
      if (config.url?.includes('login' || 'auth/refresh-token')) return config // Info: Not set token on login and refresh token query

    const cookies = parseCookies()
    const token = cookies['aceno.token']

        config.headers.Authorization = `Bearer ${token}`

        return config
    }
)

export { api }