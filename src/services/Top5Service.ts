import api from './api'

class Top5Service {
    getTop5ByServiceAndDate(id: string, date: string) {
        return api.get(
          `tarifas/top-5/${id}?dataFim=${date}&page=1&order=asc`
        );
    }
    getHead(){
      return api.get(`tarifas/top-5/32e599bf-4c21-4ebc-9504-46dd3afc1607?dataFim=2023-08-18&page=0&orderField=asc`)
      }
}

export default new Top5Service();