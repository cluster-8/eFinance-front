import axios, {AxiosInstance} from 'axios'

const api: AxiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL
  baseURL: "http://35.238.2.146:3000",
});

export default api
