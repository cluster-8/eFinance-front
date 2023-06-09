<template>
  <h3 class="va-h3">Taxas de Serviço</h3>
  <p>
    Selecione abaixo o tipo de serviço e a instituição financeira para
    visualizar as taxas de serviços
  </p>

  <div style="display: flex; margin-top: 1.2rem; max-width: 30rem">
    <div class="mr-3">
      <va-select
        v-model="tipoServico"
        class="mt-3"
        label="Tipo de Serviço"
        :options="tipos"
        style="width: 200px"
      />
    </div>
    <div class="mr-3" style="flex-grow: 1">
      <va-select
        placeholder="Selecione a Instituição"
        v-model="banco"
        class="mt-3"
        label="Instituição Financeira"
        :options="instituicoes"
        :text-by="(option) => option.nome"
        search-placeholder-text="Buscar"
        searchable
        style="width: 360px"
      />
    </div>
  </div>
  <div>
    <va-alert v-if="error" icon="info" class="mb-3 mt-3" :description="error" />
  </div>

  <div>
    <div style="position: absolute; top: 50%; left: 50%">
      <scaling-squares-spinner
        v-if="isLoading"
        :animation-duration="1250"
        :size="150"
        color="#154EC1"
      />
    </div>
    <div v-if="isVisible && !isLoading" style="margin-top: 2rem">
      <DataTable v-bind:tarifas="tarifas"></DataTable>
    </div>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
      "
      v-else-if="!isLoading"
    >
      <p>
        Selecione uma instituição financeira para visualizar suas taxas de
        serviços vigentes
      </p>
      <va-image
        class="w-full md:w-1/2 lg:w-1/3"
        :src="image"
        style="width: 43.75rem"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ScalingSquaresSpinner } from "epic-spinners";
import Table from "../dashboard/DashboardTable.vue";
import { onBeforeMount, ref, toRaw } from "vue";
import image from "/accountant-pana.png";
import DataTable from "./DataTable.vue";

import TariffsService from "../../../services/TariffsService";
import FinancialInstituitionsService from "../../../services/FinancialInstituitionsService";

const tarifas = ref();
const instituicoes = ref([]);
const tipoServico = ref<"Pessoa Física" | "Pessoa Jurídica" | "Todos">(
  "Pessoa Física"
);
const tipos = ["Pessoa Física", "Pessoa Jurídica", "Todos"];
const banco = ref();
const error = ref(false);
const isVisible = ref(true);
const isLoading = ref(false);

const fetchInstituicoes = async () => {
  isLoading.value = true;
  const { data } = await FinancialInstituitionsService.getAll();
  instituicoes.value = data;
  isLoading.value = false;
};

const parseTariffsData = (tariffs) => {
  if (!tariffs) return;
  let addedTariffs = "";
  let parsedTariffs = [];

  let servicesIdsString = "";
  let servicesIds = [];

  let filteredTariffs = [];

  tariffs.forEach((element) => {
    if (!servicesIdsString.includes(element.servico.id)) {
      servicesIdsString = servicesIdsString + element.servico.id
      servicesIds.push(element.servico.id);
    }

    // handle valorMinimo null values
    if (element.valorMinimo == null) {
      element.valorMinimo = "-";
    }

    // handle unidade case
    element.unidade =
      element.unidade[0].toUpperCase() +
      element.unidade.substring(1).toLowerCase();

    // handle dataVigencia locale date
    element.dataVigencia = new Date(element.dataVigencia).toLocaleDateString(
      "pt-BR"
    );

    element.periodicidade = element.periodicidade.trim();
    element.unidade = element.unidade.trim();

    const clone = {
      ...(delete element.id && delete element.valorMinimo && element),
    };

    const strClone: string = JSON.stringify(clone);

    if (!addedTariffs.includes(strClone)) {
      addedTariffs = addedTariffs + strClone;
      parsedTariffs.push(clone);
    }
  });

  for (const i in servicesIds) {
    const result = parsedTariffs.filter(
      (el) => el.servico.id == servicesIds[i]
    );

    if (result.length === 1) {
      filteredTariffs.push(result[0]);
    } else if (result.length > 1) {
      filteredTariffs.push(result[result.length - 1]);
    } else continue;
  }

  return filteredTariffs;
};

const fetchTarifas = async (banco) => {
  isLoading.value = true;
  if (!banco) return;
  let id = toRaw(banco.id);

  let tipo =
    tipoServico.value == "Todos" ? "" : `?tipo=${tipoServico.value.charAt(7)}`;

  try {
    const { data } = await TariffsService.getByIdAndServiceType(id, tipo);
    const tariffs = parseTariffsData(data);
    tarifas.value = tariffs;
    error.value = false;
    isLoading.value = false;
    isVisible.value = true;
  } catch (e) {
    isLoading.value = false;
    isVisible.value = false;
    error.value = e.response.data.message;
  }
};

export default {
  components: {
    DataTable,
    Table,
    ScalingSquaresSpinner,
  },
  data() {
    return {
      fetchTarifas,
      instituicoes,
      tipoServico,
      isVisible,
      isLoading,
      tarifas,
      banco,
      tipos,
      error,
      image,
    };
  },
  watch: {
    banco(newValue) {
      fetchTarifas(newValue);
    },
    tipoServico() {
      if (banco.value) fetchTarifas(banco.value);
    },
  },
  setup() {
    onBeforeMount(() => {
      fetchInstituicoes();
      isVisible.value = false;
      if (banco.value) fetchTarifas(banco.value);
    });
  },
};
</script>

<style lang="scss">
@media (max-width: 1500px) {
  .va-data-table__table-td {
    font-size: 90%;
  }
}
</style>
