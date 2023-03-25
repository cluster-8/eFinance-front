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
                <th class="align-table" style="width:15%">Valor Máximo</th>
              </tr>
            </thead>

            <tbody>
        <tr
          v-for="service in services"
          :key="service.id"
        >
          <td class="align-icon">
            <div class="ranking-icon">{{ service.position }}</div></td>
          <td class="institution-name align-table">{{ service.institution }}</td>
          <td class="maximum-value align-table">{{ service.maximumValue }}</td>
        </tr>
      </tbody>
          </table>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      services: [
        {
          id: 1,
          position: "#1",
          institution: "Itaú - Unibanco",
          maximumValue: "R$100",
        },
        {
          id: 2,
          position: "#2",
          institution: "Bradesco",
          maximumValue: "R$200",
        },
          {
          id: 3,
          position: "#3",
          institution: "Santander",
          maximumValue: "R$300",
        },
        {
          id: 4,
          position: "#4",
          institution: "Nubank",
          maximumValue: "R$400",
        },
        {
          id: 5,
          position: "#5",
          institution: "Banco do Brasil",
          maximumValue: "R$500",
        },
      ],
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
    height: 40px;
    width: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: white;
    vertical-align: middle;
  }
  .institution-name {
    font-size: 20px;
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
    font-size: 18px;
    vertical-align: middle;
  }
}
</style>