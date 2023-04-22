<template>
  <div class="markup-tables flex">
    <va-card>
      <va-card-content>
        <div class="table-wrapper va-table-responsive">
          <table class="va-table va-table--striped va-table--hoverable">
            <thead>
              <tr>
                <th class="align-table" style="width: 15%">Posição</th>
                <th class="align-table" style="width: 70%">Instituição Financeira</th>
                <th class="align-table" style="width: 15%">Score (média de tarifas)</th>
              </tr>
            </thead>

            <tbody>
        <tr
          v-for="(institution, index) in groupedProps.ranking"
          :key="institution.id"
        >
          <td class="align-icon">
            <div class="ranking-icon">#{{ (index+1) + ((groupedProps.currentPage-1) * 20) }}</div></td>
          <td class="institution-name align-table">{{ institution.instituicao.nome }}</td>
          <td v-if="groupedProps.type === 'Pessoa Física'" class="maximum-value align-table">{{ institution.scorePf }}</td>
          <td v-else-if="groupedProps.type === 'Pessoa Jurídica'" class="maximum-value align-table">{{ institution.scorePj }}</td>
          <td v-else-if="groupedProps.type === 'Todos'" class="maximum-value align-table">{{ institution.scoreTtl }}</td>
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
        groupedProps: {
          ranking: Object,
          type: Object,
          currentPage: Number,
        }
      },
    data() {
      return {
      }
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
    background-color: #0050c0;
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
