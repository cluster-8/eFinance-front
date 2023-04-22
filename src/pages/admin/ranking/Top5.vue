<template>
  <div>
    <h3 class="va-h3">Top 5</h3>
    <p>
      Selecione abaixo o tipo de serviço, o serviço e a data do final do período
    </p>
  </div>

  <div style="width: 18.75rem; display: flex; margin-top: 1.25rem">
    <div class="mr-3">
      <va-select
        v-model="tipoServico"
        class="mt-3"
        label="Tipo de Serviço"
        :options="tipos"
        style="width: 12.5rem"
      />
    </div>
    <div class="mr-3">
      <va-select
        placeholder="Selecione o serviço desejado"
        v-model="selectedService"
        class="mt-3"
        label="Serviço"
        :options="servicosFiltrados"
        :text-by="(option) => option.nome"
        style="width: 34rem"
        search-placeholder-text="Buscar"
        searchable
      />
    </div>

    <div class="mr-3">
      <va-date-input
        v-model="single"
        class="mt-3"
        :reset-on-close="false"
        label="Final do Periodo"
        mode="single"
        :format-date="(e: Date) => e.toLocaleDateString('pt-BR')"
      />
    </div>
  </div>

  <div style="margin-top: 1.875rem">
    <div style="width: 10rem">
      <va-alert
        v-if="isError"
        icon="info"
        class=""
        style="width: 24rem"
        :description="isError"
      />
    </div>
    <Table
      v-if="!isError && isVisible"
      class="mt-3"
      style="width: auto"
      v-bind:topFive="topFive"
    />
  </div>

  <va-image
    v-if="!isVisible || isError"
    class=""
    :src="image"
    style="width: 43.75rem; height: auto; margin-left: 25%; margin-top: -2rem"
  />
</template>

<script lang="ts">
import { ref, onMounted } from "vue";

import Table from "../ranking/Top5Table.vue";
import image from "/finance-leaders-rafiki.png";

import FinancialServices from "../../../services/FinancialServicesService";
import Top5Service from "../../../services/Top5Service";

import { FinancialService, ServiceType } from "../../../types";

const tipoServico = ref<ServiceType>(ServiceType.All);
const tipos: ServiceType[] = [
  ServiceType.All,
  ServiceType.PhysicalPerson,
  ServiceType.JuridicalPerson,
];
const servicosFiltrados = ref<FinancialService[]>();
const selectedService = ref<FinancialService>();
const servicos = ref<FinancialService[]>([]);
const isVisible = ref<boolean>(false);
const isError = ref<boolean>(false);
const topFive = ref<FinancialService[]>();
const formatedDate = ref<string>();

const fetchServicos = async () => {
  const { data } = await FinancialServices.getAll();
  servicos.value = sortServicosAsc(data);
  servicosFiltrados.value = sortServicosAsc(data);
};

const fetchTop = async (id: string, date: string) => {
  try {
    const { data } = await Top5Service.getTop5ByServiceAndDate(id, date);
    topFive.value = data;
    isError.value = false;
    isVisible.value = true;
  } catch (error) {
    isError.value = error.response.data.message;
  }
};

const formatDate = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  formatedDate.value = `${year}-${month}-${day}`;
};

const sortServicosAsc = (data: FinancialService[]) => {
  data.sort((a, b) => {
    const nameA = a.nome.toUpperCase();
    const nameB = b.nome.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  return data;
};

export default {
  name: "Variations",
  components: {
    Table,
  },
  data() {
    return {
      single: new Date(),
      servicosFiltrados,
      selectedService,
      formatedDate,
      tipoServico,
      isVisible,
      servicos,
      topFive,
      isError,
      tipos,
      image,
    };
  },
  watch: {
    tipoServico: {
      handler: (newValue: ServiceType) => {
        if (newValue === "Pessoa Física") {
          servicosFiltrados.value = servicos.value.filter(
            (item) => item.tipo === "F"
          );
        } else if (newValue === "Pessoa Jurídica") {
          servicosFiltrados.value = servicos.value.filter(
            (item) => item.tipo === "J"
          );
        } else if (newValue === "Todos") {
          servicosFiltrados.value = servicos.value;
        }
      },
      immediate: true,
    },
    single: {
      handler: (newValue: Date) => {
        formatDate(newValue);
        if (selectedService.value)
          fetchTop(selectedService.value.id, formatedDate.value);
      },
      immediate: true,
    },
    selectedService: {
      handler: (newValue: FinancialService) => {
        fetchTop(newValue.id, formatedDate.value);
      },
    },
  },
  setup() {
    onMounted(() => {
      fetchServicos();
      let date = new Date();
      formatDate(date);
    });
  },
};
</script>
