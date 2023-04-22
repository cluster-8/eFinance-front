<template>
  <div>
    <h3 class="va-h3">Top 5</h3>
    <p>Selecione abaixo o tipo de serviço, o serviço e a data do final do período</p>
  </div>

  <div style="width: 18.75rem; display: flex; margin-top: 1.25rem;">

    <div class="mr-3">
      <va-select
        v-model="tipoServico"
        class="mt-3"
        label="Tipo de Serviço"
        :options="tipos"
        style="width: 12.5rem;"
      />
    </div>
    <div class="mr-3">
      <va-select
            placeholder="Selecione o serviço desejado"
            v-model="selectedService"
            class="mt-3"
            label="Serviço"
            :options="servicosFiltrados"
            :text-by="(option) => option.nome"
            style="width: 34rem;"
            search-placeholder-text="Buscar"
            searchable
        />
    </div>

    <div class="mr-3">
      <va-date-input
        v-model="single"
        class="mt-3"
        :reset-on-close="false"
        label="Final do Periodo"
        mode="single"
      />   
    </div>

    
  </div>

  <div style="margin-top: 1.875rem;">
    <div style="width: 10rem;">
      <va-alert v-if="isError" icon="info" class="" style="width: 24rem;" :description="isError" />
    </div>
    <Table v-if="!isError && isVisible" class="mt-3" style="width: auto" v-bind:topFive="topFive"></Table>
  </div>
  
  <va-image
    v-if = "!isVisible || isError"
    class=""
    :src="image"
    style="width: 43.75rem; height: auto; margin-left: 25%; margin-top: -2rem; "
  />

</template>

<script lang="ts">
  import { onMounted } from 'vue';
  import Table from '../ranking/Top5Table.vue'
  import { ref } from 'vue';
  import api from '../../../services/api'
  import image from "/finance-leaders-rafiki.png";

  const tipoServico = ref < "Pessoa Física" | "Pessoa Jurídica" | "Todos" > ("Todos");
  const tipos = ["Pessoa Física", "Pessoa Jurídica", "Todos"]
  const servicos = ref([])
  const servicosFiltrados = ref()
  const selectedService = ref()
  const topFive = ref()
  const formatedDate = ref()
  const isError = ref(false)
  const isVisible = ref(false)

  const fetchServicos = async () => {
    let response = await api.get("servicos")
    servicos.value = response.data
    servicosFiltrados.value = response.data
  }

  const fetchTop = async (id, date, order) => {
    try {
      let response = await api.get(`tarifas/top-5/${id}?dataFim=${date}&page=4&order=${order}`)
      topFive.value = response.data
      isError.value = false
      isVisible.value = true
      
    } catch (error) {
      isError.value = error.response.data.message
    }
  }

  const datePlusDay = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    formatedDate.value = `${year}-${month}-${day}`
  }
  
  const nextWeek = datePlusDay(new Date(), 7);

  export default {
    name: "Variations",
    components: {
      Table
    },
    data() {
      return {
        tipoServico,
        tipos,
        servicos,
        selectedService,
        servicosFiltrados,
        topFive,
        formatedDate,
        isError,
        single: new Date(),
        range: { start: new Date(), end: nextWeek },
        image,
        isVisible
      };
    },
    watch: {
      tipoServico(newValue) {
        if(newValue === 'Pessoa Física'){
          servicosFiltrados.value = servicos.value.filter(item => item.tipo === 'F')
        }
        else if(newValue === 'Pessoa Jurídica'){
          servicosFiltrados.value = servicos.value.filter(item => item.tipo === 'J')
        }
        else if(newValue === 'Todos'){
          servicosFiltrados.value = servicos.value
        }
        
      },
      single(newValue) {
        formatDate(newValue)
      },
      selectedService(newValue){
        fetchTop(newValue.id,formatedDate.value,'asc')
      },
    },
    setup() {
      onMounted(() => {
        fetchServicos()
        let date = new Date()
        formatDate(date)
      })
    }
  };
</script>
