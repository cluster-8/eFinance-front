<template>
  <div>
    <h3 class="va-h3">Ranking - Maiores e Menores Tarifas</h3>
    <p>
      Selecione abaixo o tipo de serviço, o serviço e o tipo de ranking que
      deseja visualizar
    </p>
  </div>
  <div style="width: 18.75rem; display: flex; margin-top: 1.25rem">
    <div class="mr-3">
      <va-select
        v-model="tipoServico"
        class="mt-3"
        label="Tipo de Serviço"
        :options="tipos"
        style="width: 10.5rem"
      />
    </div>
    <div class="mr-3">
      <va-select
        v-model="rankType"
        class="mt-3"
        label="Tipo de Ranking"
        :options="services"
        style="width: 10.5rem"
      />
    </div>
  </div>
  <div style="margin-top: 1.875rem">
    <div style="width: 10rem">
      <va-alert
        v-if="isError"
        icon="info"
        class=""
        style="width: 20rem"
        :description="isError"
      />
    </div>
    <Table
      v-if="!isError"
      v-bind:groupedProps="groupedProps"
      class="mt-3"
      style="width: auto"
    ></Table>
  </div>
  <div class="pagination-container">
    <va-pagination
      v-model="currentPage"
      :pages="totalPages"
      :visible-pages="3"
      buttons-preset="secondary"
      rounded
      gapped
      border-color="primary"
    />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import Table from "../ranking/TarifasTable.vue";
import ScoresService from "../../../services/ScoresService";
import { ServiceType, RankType, RankedFinancialInstituition } from "../../../types";

const tipoServico = ref<ServiceType>(ServiceType.All);
const tipos: ServiceType[] = [
  ServiceType.PhysicalPerson,
  ServiceType.JuridicalPerson,
  ServiceType.All,
];
const ranking = ref<RankedFinancialInstituition[]>();
const rankType = ref<RankType>(RankType.LowerTariffs);
const isError = ref<boolean>(false);
const currentPage = ref<number>(1);
const totalPages = ref<number>(0);

const fetchRank = async (
  serviceType: ServiceType,
  sortType: RankType
): Promise<void> => {
  
  let pessoa: string;
  let order = sortType == "Maiores tarifas" ? "desc" : "asc";

  if (serviceType === "Pessoa Física") {
    pessoa = "scorePf";
  } else if (serviceType === "Pessoa Jurídica") {
    pessoa = "scorePj";
  } else {
    pessoa = "";
  }

  try {
    const { data,headers } = await ScoresService.getAll(
      order,
      pessoa,
      currentPage.value
    );
    ranking.value = data;
    totalPages.value = (parseInt(headers.total));
    totalPages.value =(Math.ceil(totalPages.value/20));
    isError.value = false;
  } catch (error) {
    isError.value = error.response.data.message;
  }
};

export default {
  components: {
    Table,
  },
  data() {
    return {
      groupedProps: { ranking: ranking, type: tipoServico, currentPage: currentPage },
      services: ["Menores tarifas", "Maiores tarifas"],
      tipoServico,
      currentPage,
      totalPages,
      rankType,
      isError,
      ranking,
      tipos,
    };
  },
  watch: {
    tipoServico: {
      handler: (newValue: ServiceType) => {
        fetchRank(newValue, rankType.value);
      },
      immediate: true,
    },
    rankType: {
      handler: (newValue: RankType) => fetchRank(tipoServico.value, newValue),
      immediate: true,
    },
    currentPage: {
      handler: (newValue: number) =>
        fetchRank(tipoServico.value, rankType.value),
      immediate: true,
    },
  },
  setup() {
    onMounted(() => {
      fetchRank(tipoServico.value, rankType.value);
    });
  },
};
</script>

<style>
.pagination-container {
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
