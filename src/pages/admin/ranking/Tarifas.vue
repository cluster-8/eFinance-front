<template>
  <div>
    <h3 class="va-h3">Ranking - Maiores e Menores Tarifas</h3>
    <p>Selecione abaixo o tipo de serviço, o serviço e o tipo de ranking que deseja visualizar</p>
  </div>

  
  <div style="width: 300px; display: flex; margin-top: 20px;">

    <div class="mr-3">
      <va-select
        v-model="selectValue"
        class="mt-3"
        label="Tipo de Serviço"
        :options="tipoPessoa"
        style="width: 200px;"

      />
    </div>
    
    <div class="mr-3">
      <va-select
        v-model="idServico"
        class="mt-3"
        label="Serviço"
        :options="servicos"
        :text-by="(option) => option.nome"
        style="width: 34rem;"
        search-placeholder-text="Buscar"
        searchable

      />
    </div>

    <div class="mr-3">
      <va-select
        v-model="selectValue"
        class="mt-3"
        label="Tipo de Ranking"
        :rules="selectRules"
        :options="services"
      />
    </div>
    
  </div>

  <div style="margin-top: 30px;">

  <Table class="mt-3" style="width: auto;"></Table>
  </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import Table from '../ranking/TarifasTable.vue'
import api from "../../../services/api";

const tipoPessoa = ["Física", "Jurídica"]
const servicos = ref([]);
const idServico = ref();

const fetchServicos = async () => {
  let response = await api.get("servicos");
  servicos.value = response.data
  console.log(response.data)
}

export default {
  components: {
    Table
  },
  data() {
    return {
      selectValue: "",
      validation: null,
      services:['Teste1', 'Teste2'],
      tipoPessoa,
      servicos,
      idServico
    }

  },
  setup() {
    onMounted(() => {
      fetchServicos()
    })
  }
}


</script>