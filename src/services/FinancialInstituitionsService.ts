import api from './api'

class FinancialInstituitionsService {
    getAll() {
        return api.get('instituicoes')
    }
}

export default new FinancialInstituitionsService();