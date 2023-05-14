import api from "./api";


class ComparatorService {
    getByIdsAndServiceId(id1: string, id2: string, serviceId: string) {
        return api.get(`tarifas/comparador?instituicoesIds=${id1}, ${id2}&servicosIds=${serviceId}`);
    }
}

export default new ComparatorService();
