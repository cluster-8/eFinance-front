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
          placeholder="Selecione o serviço desejado"
          v-model="serviceId"
          class="mt-3"
          label="Serviço"
          :options="servicos"
          :text-by="(option) => option.nome"
          style="width: 34rem;"
          search-placeholder-text="Buscar"
          searchable
      />
      <ServiceTable v-bind="payload" style="width: auto; margin-top: 4rem;"></ServiceTable>

    </div>

    <div class="mr-3" style="">

      <va-select
          placeholder="Selecione a Instituição"
          v-model="banco1"
          class="mt-3"
          label="Instituição Financeira 1"
          :options="instituicoes"
          :text-by="(option) => option.nome"
          search-placeholder-text="Buscar"
          searchable
          style="width: 20rem;"

      />
      <Bank1Table v-bind="payload" style="width: auto; margin-top: 4rem;"></Bank1Table>

    </div>

    <div class="">
      <va-select
        placeholder="Selecione a Instituição"
        v-model="banco2"
        class="mt-3 mr-3"
        label="Instituição Financeira 2"
        :options="instituicoes"
        :text-by="(option) => option.nome"
        search-placeholder-text="Buscar"
        searchable
        style="width: 20rem;"
      />
      <Bank2Table v-bind="payload" style="width: auto; margin-top: 4rem;"></Bank2Table>

    </div>
    
  </div>


</template>


<script lang="ts">
  import ServiceTable from './ServiceTable.vue'
  import Bank1Table from './Bank1Table.vue'
  import Bank2Table from './Bank2Table.vue'
  import { ref, toRaw } from 'vue'
  import api from '../../../services/api'
  import ComparatorService from '../../../services/ComparatorService';
  import { onMounted } from 'vue';

  const tipoServico = ref<"Pessoa Física" | "Pessoa Jurídica" | "Todos">("Pessoa Física");
  const tipos = ["Pessoa Física", "Pessoa Jurídica", "Todos"]
  const instituicoes = ref([])
  const servicos = ref([])
  const banco1 = ref()
  const banco2 = ref()
  const serviceId = ref()
  const error = ref(false)
  const payload = ref([])
  
  const fetchInstituicoes = async () => {
    let response = await api.get("instituicoes");
    instituicoes.value = response.data;
  };

  const fetchServicos = async () => {
    let response = await api.get("servicos")
    servicos.value = response.data
  }

  const fetchComparator = async (id1:any, id2: any, serviceId: any) => {
    if (!id1 || !id2 || !serviceId) return;
    id1 = toRaw(id1.id)
    id2 = toRaw(id2.id)
    serviceId = toRaw(serviceId.id)

    try {
      const response = await ComparatorService.getByIdsAndServiceId(id1, id2, serviceId)
      payload.value = response.data
      console.log(response.data)
    } catch (e) {
      error.value = e.response.data.message
    }
  }

  export default {
    components: {
      ServiceTable,
      Bank1Table,
      Bank2Table
    },
    data() {
      return {
        tipoServico,
        tipos,
        banco1,
        banco2,
        instituicoes,
        servicos,
        serviceId,
        error,
        payload
      }
  
    },
    watch: {
      banco1: {
        handler: (newValue) => {
          fetchComparator(newValue, banco2.value, serviceId.value)
        },
        immediate: true,
      },
      banco2: {
        handler: (newValue) => {
          fetchComparator(banco1.value, newValue, serviceId.value)
        },
        immediate: true,
      },
      serviceId: {
        handler: (newValue) => {
          fetchComparator(banco1.value, banco2.value, newValue)
        },
        immediate: true
      }
    },
    
    setup() {
      onMounted(() => {
        fetchInstituicoes()
        fetchServicos()
      })
    }
}

</script>