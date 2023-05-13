<template>
  <div class="markup-tables flex">
    <va-card>
      <va-card-content>
        <div class="table-wrapper va-table">
          <table class="va-table--striped va-table--hoverable">
            <thead>
              <tr>
                <th>Serviço</th>
                <th>Valor Máximo</th>
                <th>Data de Vigência</th>
                <th>Unidade</th>
                <th>Periodicidade</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tarifa in tarifas" :key="tarifa.id">
                <td>{{ tarifa.servico.nome }}</td>
                <td>R${{ tarifa.valorMaximo }}</td>
                <td>{{ tarifa.dataVigencia }}</td>
                <td>{{ tarifa.unidade }}</td>
                <td>{{ tarifa.periodicidade }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script setup lang="ts">

defineProps({
  tarifas: Object
})

</script>

<style lang="scss">
.markup-tables {
  .table-wrapper {
    overflow: auto;
  }

  .va-table {
    width: 100%;
  }
}
</style>




