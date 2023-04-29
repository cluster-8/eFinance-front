import axios, {AxiosInstance} from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api-efinance.herokuapp.com/",
})

export default api
