import axios, {AxiosInstance} from 'axios'

const api: AxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL 
  baseURL: "/api"
})

export default api
