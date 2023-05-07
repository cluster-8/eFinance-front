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
                <!-- <td >{{ parseData(value.valorMaximo) }}</td> -->
                <td>{{ value.valorMaximo}}</td>
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

  function parseData (value) {
    return `R$ ${value}`
  }

  export default defineComponent({
    props: {
      groupedProps: {
        bankPayload: Object,
        bankName: Object
      }
    },
    data() {
      return {
        parseData,
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




