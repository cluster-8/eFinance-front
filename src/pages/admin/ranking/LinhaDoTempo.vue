<template>
  <div>
    <h3 class="va-h3">Linha do tempo</h3>
    <p>
      Selecione abaixo o tipo de serviço, o serviço e a instituição financeira
      para visualizar o histórico da variação da média do preço da tarifa com
      tendência.
    </p>
  </div>

  <div
    style="width: 300px; display: flex; margin-top: 20px; margin-bottom: 30px"
  >
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

  <div class="my-8">
    <va-divider />
  </div>

   <!-- <div id="app" class="chart-container">
        <PlanetChart :chart-data="chartData" />
      </div> -->

  <div>
    <div v-show="hasChartData">
      <div id="app" class="chart-container">
        <PlanetChart :chart-data="chartData" />
      </div>
    </div>

    <div v-show="!hasChartData">
      <div class="content-container" v-if="!isSelected">
        <va-card stripe stripe-color="">
          <va-card-title>Selecione</va-card-title>
          <va-card-content>
            Selecione o serviço da desejada da instituição financeira para
            visualizar o histórico e a predição para o próximo valor.
          </va-card-content>
        </va-card>
      </div>
      <div class="content-container" v-else>
        <va-card stripe stripe-color="warning">
          <va-card-title>Sem dados históricos</va-card-title>
          <va-card-content>
            Não há dados históricos para o serviço selecionado.
          </va-card-content>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import PlanetChart from "./charts/LineChart.vue";

import nodataimage from "/no-data-found.png";
import selectdata from "/select-data.png";

import api from "../../../services/api";
import { onMounted, ref } from "vue";

import PredictionService from "../../../services/PredictionService";

const chartData = ref({
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Dados Históricos",
        data: [],
        backgroundColor: "rgba(54,73,93,.5)",
        borderColor: "#36495d",
        borderWidth: 3,
      },
      {
        label: "Predição",
        data: [],
        backgroundColor: "rgba(71, 183,132,.5)",
        borderColor: "#47b784",
        borderWidth: 3,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Variação Histórica de Tarifa e Predição",
      font: {
        size: 24,
        style: "italic",
        family: "Helvetica Neue",
      },
    },
    tooltips: {},
    responsive: true,
    lineTension: 1,
    scales: {
      xAxes: [
        {
          type: "time",
          distribution: "series",
          // time: {
          //   displayFormats: {
          //     quarter: "MMM YYYY",
          //   },
          //   // unit: "hour",
          //   tooltipFormat: "DD/MM/YYYY - HH:mm",
          // },
        },
      ],
      yAxes: [
        {
          title: {
            text: "Valor de tarifa",
          },
          ticks: {
            beginAtZero: true,
            padding: 25,
            // Include a dollar sign in the ticks
            callback: function (value, index, ticks) {
              return "R$" + value;
            },
          },
        },
      ],
    },
  },
});

const loading = ref(false);
const hasChartData = ref(false);
const isSelected = ref(false);
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
  if (!servico || !banco) {
    isSelected.value = false;
    return;
  }

  isSelected.value = true;

  const { data } = await PredictionService.predict(servico.id, banco.id);

  hasChartData.value = data.message ? false : true;
  mountChartData(data);
};

const mountChartData = (data) => {
  // caso em que não há dados de tarifas para calcular predição
  if (data.message) {
    hasChartData.value = false;
    return;
  }

  let aux = { ...chartData.value };
  let labels = data.historic.dates.map((el) => el);
  labels.forEach((el) => console.log(el))
  labels.push(data.prediction.date);
  aux.data.labels = labels;
  let historic = data.historic.values;
  let predictionSeries = historic.map((el) => null);
  predictionSeries[predictionSeries.length - 1] = historic[historic.length - 1];
  historic.push(null);
  predictionSeries.push(data.prediction.value);
  aux.data.datasets[0].data = historic;
  aux.data.datasets[1].data = predictionSeries;

  chartData.value = aux;
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
      hasChartData,
      isSelected,
      loading,
      nodataimage,
      selectdata,
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

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 2rem;
  width: 50vw;
}

.panel-container {
  background-color: #ecf0f1;
  width: 100%;
  height: 80px;
  margin: 20px 0px 50px 0px;
}
</style>
