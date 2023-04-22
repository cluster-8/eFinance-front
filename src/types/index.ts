enum ServiceType {
  PhysicalPerson = "Pessoa Física",
  JuridicalPerson = "Pessoa Jurídica",
  All = "Todos",
}

enum RankType {
  LowerTariffs = "Menores tarifas",
  HigherTariffs = "Maiores tarifas",
}

type FinancialService = {
  id: string
  nome: string
  codigo: string
  tipo: string
  createdAt: Date
}

export { ServiceType, RankType, FinancialService };
