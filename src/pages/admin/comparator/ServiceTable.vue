<template>
    <div class="markup-tables flex" style="max-width: fit-content;">
      <va-card>
        <va-card-content>
          <div class="table-wrapper">
            <table class="va-table va-table--striped va-table--hoverable">
              
                <thead>
                    <th>Serviços</th>
                </thead>
                
              <tbody>
                <tr v-for="service in groupedProps.serviceName">
                  <td>{{service}}</td>
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
  }
</style>




