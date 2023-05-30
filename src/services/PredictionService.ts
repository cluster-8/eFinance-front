import axios, { AxiosInstance } from "axios";


class PredictionService {
  predict(serviceId: string, instituitionId: string) {

    const flaskService: AxiosInstance = axios.create({
      baseURL: "http://localhost:5000",
    });

    return flaskService.post('/predict-tariff', {instituitionId, serviceId} )
  }
}

export default new PredictionService();
