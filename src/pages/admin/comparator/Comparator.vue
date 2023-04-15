<template>
 <h3 class="va-h3">Comparador</h3>
  <p>
    Selecione os serviços desejados, em seguida selecione as instituições para fazer a comparação de valores
  </p>

  <div class="mr-3">
    <va-select
      v-model="tipoServico"
      class="mt-3"
      label="Tipo de Serviço"
      :options="tipos"
      style="width: 200px;"
    />
  </div>
  <div style="display: flex;">
    <div class="mr-5">
      <va-select
            v-model="tipoServico"
            class="mt-3"
            label="Selecione o Serviço"
            :options="tipos"
            style=""
      />
      <Table style="width: auto; margin-top: 4rem;"></Table>

    </div>

    <div class="mr-3" style="">

      <va-select
          placeholder="Selecione a Instituição"
          v-model="banco"
          class="mt-3"
          label="Instituição Financeira 1"
          :options="instituicoes"
          :text-by="(option) => option.nome"
          search-placeholder-text="Buscar"
          searchable
          style=""
      />
      <Table style="width: auto; margin-top: 4rem;"></Table>

    </div>

    <div class="">
      <va-select
        placeholder="Selecione a Instituição"
        v-model="banco"
        class="mt-3 mr-3"
        label="Instituição Financeira 2"
        :options="instituicoes"
        :text-by="(option) => option.nome"
        search-placeholder-text="Buscar"
        searchable
        style=""
    />
    <Table style="width: auto; margin-top: 4rem;"></Table>

    </div>
    
  </div>


</template>


<script lang="ts">
  import Table from './ComparatorTable.vue'
  import { ref } from 'vue'

  const tipoServico = ref<"Pessoa Física" | "Pessoa Jurídica" | "Todos">("Pessoa Física");
  const tipos = ["Pessoa Física", "Pessoa Jurídica", "Todos"];

    export default {
        components: {
            Table
        },
        data() {
            return {
                tipoServico,
                tipos
            }
        
        },
        watch: {

        },
        setup() {

        }
    }

</script>