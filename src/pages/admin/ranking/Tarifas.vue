<template>
  <div>
    <h3 class="va-h3">Ranking - Maiores e Menores Tarifas</h3>
    <p>Selecione abaixo o tipo de serviço, o serviço e o tipo de ranking que deseja visualizar</p>
  </div>
  <div style="width: 18.75rem; display: flex; margin-top: 1.25rem;">
    <div class="mr-3">
      <va-select
        v-model="tipoServico"
        class="mt-3"
        label="Tipo de Serviço"
        :options="tipos"
        style="width: 10.5rem;"
      />
    </div>
    <div class="mr-3">
      <va-select
        v-model="rankType"
        class="mt-3"
        label="Tipo de Ranking"
        :options="services"
        style="width: 10.5rem;"

      />
    </div>
  </div>
  <div style="margin-top: 1.875rem;">
    <div style="width: 10rem;">
      <va-alert v-if="isError" icon="info" class="" style="width: 20rem; " :description="isError" />
    </div>
    <Table v-if="!isError" v-bind:ranking="ranking" type="tipoServico" class="mt-3" style="width: auto;"></Table>
  </div>
</template>

<script lang="ts">
  import { ref, onMounted } from 'vue';
  import Table from '../ranking/TarifasTable.vue'
  import api from "../../../services/api";

  const tipoServico = ref < "Pessoa Física" | "Pessoa Jurídica" | "Todos" > ("Todos");
  const tipos = ["Pessoa Física", "Pessoa Jurídica", "Todos"]
  const ranking = ref();
  const rankType = ref < 'Maiores tarifas' | 'Menores tarifas' > ('Menores tarifas')
  const isError = ref(false)
  
  const fetchRank = async (service, type) => {
    let pessoa: String
    let order = type == 'Maiores tarifas'? 'asc' : 'desc'

    if(service === "Pessoa Física") {
      pessoa = 'scorePf'
    } 
    else if(service === 'Pessoa Jurídica'){
      pessoa = 'scorePj'
    }
    else {
      pessoa = ''
    }

    try {
      let response = await api.get(`scores?page=1&order=${order}&orderField=${pessoa}`)
      ranking.value = response.data
      isError.value = false
    } catch (error) {
      isError.value = error.response.data.message
    }
  }

  export default {
    components: {
      Table
    },
    data() {
      return {
        isError,
        rankType,
        services:['Maiores tarifas', 'Menores tarifas'],
        tipos,
        tipoServico,
        ranking
      }
    },
    watch: {
      tipoServico(newValue) {
        fetchRank(newValue, rankType)   
      },
      rankType(newValue) {
        fetchRank(tipoServico, newValue)
      }
    },
    setup() {
      onMounted(() => {
        fetchRank(tipoServico, rankType)
      })
    }
  }


</script>
