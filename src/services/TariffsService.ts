import api from "./api";

class TariffsService {
  getByIdAndServiceType(id: string, serviceType: string) {
    return api.get(`instituicao/tarifas/${id}${serviceType}`);
  }
}

export default new TariffsService();
