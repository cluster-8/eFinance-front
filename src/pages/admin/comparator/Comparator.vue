<template>
 <h3 class="va-h3">Comparador</h3>
  <p>
    Selecione abaixo o tipo de serviço e a instituição financeira para
    visualizar as taxas de serviços
  </p>

  <div>
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
                v-model="tipoServico"
                class="mt-3"
                label="Tipo de Serviço"
                :options="tipos"
                style="width: 200px;"
            />
        </div>

        <div class="mr-3" style="flex-grow: 1">
            <va-select
                placeholder="Seleciona a Instituição"
                v-model="banco"
                class="mt-3"
                label="Instituição Financeira"
                :options="instituicoes"
                :text-by="(option) => option.nome"
                search-placeholder-text="Buscar"
                searchable
                style="width: 360px;"
            />
        </div>
    </div>
        
    <div style="display: flex;">
        <Table style="width: fit-content;"></Table>
        <Table style="width: fit-content;"></Table>
        <Table style="width: fit-content;"></Table>
    </div>

</template>


<script>
    import Table from './ComparatorTable.vue'

    export default {
        components: {
            Table
        },
        data() {
            return
        },
        watch: {

        },
        setup() {

        }
    }

</script>