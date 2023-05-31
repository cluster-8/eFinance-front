<template>
  <div class="container">
    <canvas id="line-chart"></canvas>
  </div>
</template>

<script>

import Chart from "chart.js";

import planetChartData from "./planet-data.js";

export default {
  name: "LineChart",
  props: {
    chartData: Object,
  },
  data() {
    return {
      lineChartData: this.chartData || planetChartData,
    };
  },
  watch: {
    chartData: {
      handler(newValue) {
        const ctx = document.getElementById("line-chart");
        new Chart(ctx, newValue);
      },
    },
  },
};
</script>

<style scoped>
.container {
  height: 40vh;
  width: 65vw;
  margin: 40px 20px 20px 0px;
}
</style>
