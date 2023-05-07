<template>
    <div class="markup-tables flex">
      <va-card>
        <va-card-content>
          <div class="table-wrapper">
            <table class="va-table va-table--striped va-table--hoverable">
              
                <thead>
                    <th>Serviços</th>
                </thead>
                
              <tbody>
                <tr v-for="service in services">
                  <td class="quebra_linha">{{service.servicoId}}</td>
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
      services: Object
    },
    data() {
      return {
      }
    }
  })

</script>

<style lang="scss">

.quebra_linha {
  white-space: nowrap
}


</style>






