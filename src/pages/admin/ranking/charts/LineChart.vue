<template>
  <div class="container">
    <canvas id="line-chart"></canvas>
  </div>
</template>

<script>

/*
FONTE: https://www.digitalocean.com/community/tutorials/vuejs-vue-chart-js
*/

import Chart from "chart.js";

import planetChartData from "./planet-data.js";

export default {
  name: "LineChart",
  props: {
    chartData: Object
  },
  data() {
    return {
      lineChartData: this.chartData || planetChartData,
    };
  },
  mounted() {
    console.log("Chart Data...",this.chartData)
    const ctx = document.getElementById("line-chart");
    new Chart(ctx, this.lineChartData);
  },
};
</script>

<style scoped>

.container {
  width: 70vw;
  margin: 40px 20px 20px 0px;
}
</style>