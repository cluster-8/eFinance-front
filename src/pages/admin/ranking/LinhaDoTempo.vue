<template>
  <div>
    <h3 class="va-h3">Linha do tempo</h3>
    <p>
      Selecione abaixo o tipo de serviço, o serviço e a instituição financeira
      para visualizar o histórico da variação da média do preço da tarifa com
      tendência.
    </p>
  </div>
  <div style="width: 300px; display: flex; margin-top: 20px">
    <div class="mr-3">
      <va-select
        v-model="tipo"
        class="mt-3"
        label="Tipo de Serviço"
        :options="tipoServico"
        style="width: 200px"
      />
    </div>

    <div class="mr-3">
      <va-select
        placeholder="Selecione o serviço desejado"
        v-model="servico"
        class="mt-3 quebra_linha width_service font_size"
        label="Serviços"
        :options="servicos"
        :text-by="(option) => option.nome"
        search-placeholder-text="Buscar"
        searchable
        :max-visible-options="1"
      />
    </div>

    <div class="mr-3">
      <va-select
      placeholder="Selecione a instituição desejada"
        v-model="banco"
        class="mt-3"
        label="Busque a Instituição"
        :options="instituicoesOptions"
        :text-by="(option) => option.nome"
        style="width: 360px"
        searchable
      />
    </div>
  </div>
  <div id="app">
    <PlanetChart :chart-data="chartData" />
  </div>
</template>

<script>
import PlanetChart from "./charts/LineChart.vue";

import api from "../../../services/api";
import { onMounted, ref, toRaw, watch } from "vue";

const chartData = ref({
  type: "line",
  data: {
    labels: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
    ],
    datasets: [
      {
        label: "Dados Históricos",
        data: [57.1, 55.2, 56.9, 58.3, 60.1, 66.9, 62.7],
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "#36495d",
        borderWidth: 3,
      },
      {
        label: "Predição",
        data: [null, null, null, null, null, null, 62.7, 69.3],
        backgroundColor: "rgba(71, 183,132,.5)",
        borderColor: "#47b784",
        borderWidth: 3,
      },
    ],
  },
  options: {
    responsive: true,
    lineTension: 1,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            padding: 25,
          },
        },
      ],
    },
  },
});

const servico = ref();
const servicos = ref();
const instituicoes = ref([]);
const tipoServico = ["Física", "Jurídica", "Todos"];
const tipo = ref("Todos");
const banco = ref();
const error = ref(false);

const fetchInstituicoes = async () => {
  let response = await api.get("instituicoes");
  instituicoes.value = response.data;
};

const fetchServicos = async () => {
  let response = await api.get("servicos");
  servicos.value = response.data;
};

const setServicos = async (newValue) => {
  await fetchServicos();

  if (newValue == "Física") {
    servicos.value = servicos.value.filter((el) => el.tipo == "F");
  } else if (newValue == "Jurídica") {
    servicos.value = servicos.value.filter((el) => el.tipo == "J");
  }
};

const fetchChartData = async (servico, banco) => {
  if (!servico || !banco) return;

  console.log(servico, banco);
};

export default {
  name: "App",
  components: {
    PlanetChart,
  },
  data() {
    const instituicoesOptions = instituicoes;
    return {
      services: ["one", "two", "three"],
      banco,
      instituicoesOptions,
      tipo,
      tipoServico,
      error,
      servico,
      servicos,
      chartData,
    };
  },
  watch: {
    tipo(newValue) {
      setServicos(newValue);
    },
    servico(newValue) {
      fetchChartData(newValue, banco.value);
    },
    banco(newValue) {
      fetchChartData(servico.value, newValue);
    },
  },
  setup() {
    onMounted(() => {
      fetchInstituicoes();
      fetchServicos();
    });
  },
};
</script>
