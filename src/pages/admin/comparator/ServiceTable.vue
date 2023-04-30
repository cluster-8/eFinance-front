<template>
    <div class="markup-tables flex">
      <va-card>
        <va-card-content>
          <div class="table-wrapper">
            <table class="va-table va-table--striped va-table--hoverable">
              
                <thead>
                    <th>{{ groupedProps.serviceName }}</th>
                </thead>
                
              <tbody>
                <tr>
                  <td>Valor Máximo</td>
                </tr>
                <tr>
                  <td>Moeda</td>
                </tr>
                <tr>
                  <td>Unidade</td>
                </tr>
                <tr>
                  <td>Data de Vigência</td>
                </tr>
              <!--   
                <tr v-for="(value, key) in groupedProps.bank1Payload">
                    <td>{{ key }}: {{ value }}</td>
                </tr>
                 -->
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
        payload: Object,
        bank1Payload: Object,
        bank2Payload: Object,
        serviceName: Object
      }
    },
    data() {
      return {
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




