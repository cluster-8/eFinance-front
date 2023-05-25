import api from './api'

class Top5Service {
    getTop5ByServiceAndDate(id: string, date: string) {
        return api.get(
          `tarifas/top-5/${id}?dataFim=${date}&page=0&order=asc`
        );
    }
}

export default new Top5Service();