<template>
  <div class="markup-tables flex">
    <va-card>
      <va-card-content>
        <div class="table-wrapper va-table-responsive">
          <table class="va-table va-table--striped va-table--hoverable">
            <thead>
              <tr>
                <th class="align-table" style="width:15%">Posição</th>
                <th class="align-table" style="width:70%">Instituição</th>
                <th class="align-table" style="width:15%">Valor</th>
              </tr>
            </thead>

            <tbody>
        <tr
          v-for="(item, index) in topFive"
          :key="item.id"
        >
          <td class="align-icon">
            <div class="ranking-icon">#{{ index+1 }}</div></td>
          <td class="institution-name align-table">{{ item.instituicao.nome }}</td>
          <td class="maximum-value align-table">{{ item.valorMaximo }}</td>
        </tr>
      </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {
      topFive: {
        Array
      }
    },
  data() {
    return {
     
    };
  },
});
</script>

<style lang="scss">
.markup-tables {
  .table-wrapper {
    overflow: auto;
  }

  .va-table {
    width: 100%;
  }

  .ranking-icon {
    display: flex;
    background-color: #0050C0;
    text-align: center;
    height: 30px;
    width: 30px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: white;
    vertical-align: middle;
  }
  .institution-name {
    vertical-align: middle;
  }

  .align-table {
    text-align: center;
  }
  .align-icon {
    align-items: center;
    justify-content: center;
    display: flex;

  }

  .maximum-value {
    vertical-align: middle;
  }
}
</style>
