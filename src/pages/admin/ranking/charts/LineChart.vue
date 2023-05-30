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
  mounted() {
    // const ctx = document.getElementById("line-chart");
    // new Chart(ctx, this.lineChartData);
  },
  watch: {
    chartData: {
      handler(newValue) {
        console.log("NewValue", newValue.data);
        const ctx = document.getElementById("line-chart");
        new Chart(ctx, newValue);
      },
      // deep: true,
    },
  },
};
</script>

<style scoped>
.container {
  width: 65vw;
  margin: 40px 20px 20px 0px;
}
</style>
