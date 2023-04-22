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
  id: string;
  nome: string;
  codigo: string;
  tipo: string;
  createdAt: Date;
};

type FinancialInstituition = {
  id: string;
  nome: string;
  cnpj: string;
  cnpjFormatado: string;
  createdAt: Date;
};

type RankedFinancialInstituition = {
  id: string;
  instituicao: FinancialInstituition;
  scorePf: number;
  scorePj: number;
  scoreTtl: number;
};

export {
  ServiceType,
  RankType,
  FinancialService,
  FinancialInstituition,
  RankedFinancialInstituition,
};
