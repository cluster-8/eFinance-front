<template>
  <div class="markup-tables flex">
    <va-card>
      <va-card-content>
        <div class="table-wrapper">
          <table class="va-table va-table--striped va-table--hoverable">

            <thead>
              <th>{{ groupedProps.bankName }}</th>
            </thead>

            <tbody>
              <tr v-for="(value, idx) in groupedProps.bankPayload" :key="idx">
                <td>{{ value.valorMaximo ? `R$ ${value.valorMaximo}`: 'Serviço não oferecido' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>
  
<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: {
      groupedProps: {
        bankPayload: Object,
        bankName: Object
      }
    }
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




