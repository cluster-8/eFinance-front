import axios, {AxiosInstance} from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  // baseURL: import.meta.env.VITE_API_URL 
})

export default api
