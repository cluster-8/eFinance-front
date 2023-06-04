import axios, { AxiosInstance } from "axios";


class PredictionService {
  predict(serviceId: string, instituitionId: string) {

    const flaskService: AxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_FLASK_URL,
    });

    return flaskService.post('/predict-tariff', {instituitionId, serviceId} )
  }
}

export default new PredictionService();
