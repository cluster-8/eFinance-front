<template>
  <div>
    <h3 class="va-h3">Top 5</h3>
    <p>Selecione abaixo o tipo de serviço, o serviço e a data do final do período</p>
  </div>

  <div style="width: 300px; display: flex; margin-top: 20px;">

    <div class="mr-3">
      <va-select
        v-model="tipoServico"
        class="mt-3"
        label="Tipo de Serviço"
        :options="tipos"
        style="width: 200px;"
      />
    </div>
    <div class="mr-3">
      <va-select
            placeholder="Selecione o serviço desejado"
            v-model="idServico"
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

  <div style="margin-top: 30px;">
  <Table class="mt-3" style="width: auto"></Table>
  </div>
  

</template>

<script lang="ts">
  import { onMounted } from 'vue';
  import Table from '../ranking/Top5Table.vue'
  import { ref } from 'vue';
  import api from '../../../services/api'

  const tipoServico = ref < "Pessoa Física" | "Pessoa Jurídica" | "Todos" > ("Todos");
  const tipos = ["Pessoa Física", "Pessoa Jurídica", "Todos"]
  const servicos = ref([])
  const servicosFiltrados = ref()
  const idServico = ref()

  const fetchServicos = async () => {
    let response = await api.get("servicos")
    servicos.value = response.data
    servicosFiltrados.value = response.data
  }

  const datePlusDay = (date, days) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };
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
        idServico,
        servicosFiltrados,
        single: new Date(),
        range: { start: new Date(), end: nextWeek },

      };
    },
    watch: {
      tipoServico(newValue) {
        console.log(newValue)
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
      }
    },
    setup() {
      onMounted(() => {
        fetchServicos()
      })
    }
  };
</script>
