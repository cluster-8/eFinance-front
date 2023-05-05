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
                <!--  
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.country }}</td>
                <td>
                  <va-badge :text="user.status" :color="getStatusColor(user.status)" />
                </td>
                 -->
              </tr>
            </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import data from '../../../data/tables/markup-table/data.json'
import { onMounted } from 'vue';

defineProps({
  tarifas: Object
})
const { t } = useI18n()


const users = ref(data.slice(0, 8))

function getStatusColor(status: string) {
  if (status === 'paid') {
    return 'success'
  }

  if (status === 'processing') {
    return 'info'
  }

  return 'danger'
}

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




