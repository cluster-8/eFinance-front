import api from './api'

class FinancialServices {
    getAll() {
        return api.get('servicos')
    }
}

export default new FinancialServices();