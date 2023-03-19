<template>
  <div>
    <h3 class="va-h3">Ranking - Maiores e Menores Tarifas</h3>
    <p>Selecione abaixo o tipo de serviço, o serviço e o tipo de ranking que deseja visualizar</p>
  </div>

  
  <div style="width: 300px; display: flex ;">
    <div class="mr-3">
      
      <va-select
        v-model="selectValue"
        class="mt-3"
        label="Tipo de Serviço:"
        :rules="selectRules"
        :options="services"
      />
    </div>
    
    <div class="mr-3">
      <va-select
        v-model="selectValue"
        class="mt-3"
        label="Serviço:"
        :rules="selectRules"
        :options="services"
      />
    </div>

    <div class="mr-3">
      <va-select
        v-model="selectValue"
        class="mt-3"
        label="Tipo de Ranking:"
        :rules="selectRules"
        :options="services"
      />
    </div>
    
  </div>
    
  <Table class="mt-3" style="width: auto;"></Table>

</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import Table from '../ranking/TarifasTable.vue'


export default {
  components: {
    Table
  },
  data() {
    return {
      selectValue: "",
      validation: null,
      services:['Teste1', 'Teste2']
    }

  },
  setup() {
    //const validation = reactive({valitadion : null})
  }
}


</script>