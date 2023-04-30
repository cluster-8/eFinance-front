<template>
  <div class="markup-tables flex">
    <va-card>
      <va-card-content>
        <div class="table-wrapper">
          <table class="va-table va-table--striped va-table--hoverable">

            <thead>
              <th>{{ bankPayload.nome }}</th>
            </thead>

            <tbody>
              <tr>
                <td>{{ bankPayload.valorMaximo }}</td>
              </tr>
              <tr>
                <td>{{ bankPayload.moeda }}</td>
              </tr>
              <tr>
                <td>{{ bankPayload.unidade }}</td>
              </tr>
              <tr>
                <td>{{ bankPayload.dataVigencia }}</td>
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
      bankPayload: {
        Object,
      },
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




