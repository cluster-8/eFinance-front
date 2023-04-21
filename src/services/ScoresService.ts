import api from './api'

class ScoresService {
    getAll(sortBy: string, serviceType: string ) {
        return api.get(
          `scores?page=1&order=${sortBy}&orderField=${serviceType}`
        );
    }
}

export default new ScoresService();