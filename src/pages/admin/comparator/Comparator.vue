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
      <ServiceTable v-bind:groupedProps="groupedProps" style="width: auto; margin-top: 4rem;"></ServiceTable>

    </div>

    <div class="mr-3" style="">

      <va-select
          placeholder="Selecione a Instituição"
          v-model="bank1"
          class="mt-3"
          label="Instituição Financeira 1"
          :options="instituicoes"
          :text-by="(option) => option.nome"
          search-placeholder-text="Buscar"
          searchable
          style="width: 20rem;"

      />
      <Bank1Table v-bind:groupedProps="groupedProps" style="width: auto; margin-top: 4rem;"></Bank1Table>

    </div>

    <div class="">
      <va-select
        placeholder="Selecione a Instituição"
        v-model="bank2"
        class="mt-3 mr-3"
        label="Instituição Financeira 2"
        :options="instituicoes"
        :text-by="(option) => option.nome"
        search-placeholder-text="Buscar"
        searchable
        style="width: 20rem;"
      />
      <Bank2Table v-bind:groupedProps="groupedProps" style="width: auto; margin-top: 4rem;"></Bank2Table>

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
  const bank1 = ref()
  const bank2 = ref()
  const serviceId = ref()
  const error = ref(false)
  const payload = ref([])
  const bank1Name = ref()
  const bank2Name = ref()
  const serviceName = ref()
  
  const fetchInstituicoes = async () => {
    let response = await api.get("instituicoes");
    instituicoes.value = response.data;
  };

  const fetchServicos = async () => {
    let response = await api.get("servicos")
    servicos.value = response.data
  }

  const fetchComparator = async (bank1:any, bank2: any, service: any) => {
    if (!bank1 || !bank2 || !service) return;
    let id1 = toRaw(bank1.id)
    let id2 = toRaw(bank2.id)
    let serviceId = toRaw(service.id)
    bank1Name.value = toRaw(bank1.nome)
    bank2Name.value = toRaw(bank2.nome)
    serviceName.value = toRaw(service.name)
    console.log(bank1Name.value, bank2Name.value)

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
        bank1,
        bank2,
        instituicoes,
        servicos,
        serviceId,
        error,
        payload,
        groupedProps: {payload: payload, serviceName: serviceName, bank1Name: bank1Name, bank2Name: bank2Name}
      }
  
    },
    watch: {
      bank1: {
        handler: (newValue) => {
          fetchComparator(newValue, bank2.value, serviceId.value)
        },
        immediate: true,
      },
      bank2: {
        handler: (newValue) => {
          fetchComparator(bank1.value, newValue, serviceId.value)
        },
        immediate: true,
      },
      serviceId: {
        handler: (newValue) => {
          fetchComparator(bank1.value, bank2.value, newValue)
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