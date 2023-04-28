import api from "./api";

class ScoresService {
  getAll(sortBy: string, serviceType: string, page: number) {
    return api.get(`scores?page=${page}&order=${sortBy}&orderField=${serviceType}`);
  }
}

export default new ScoresService();
