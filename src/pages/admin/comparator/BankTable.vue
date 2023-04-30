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
                <td>my text 1</td>
              </tr>
              <tr>
                <td>my text 1</td>
              </tr>
              <tr>
                <td>my text 1</td>
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
        payload: Object,
        serviceName: Object,
        bank1Name: Object,
        bank2Name: Object
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




