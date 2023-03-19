import axios, {AxiosInstance} from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: "https://api-efinance.herokuapp.com/",
})

export default api
