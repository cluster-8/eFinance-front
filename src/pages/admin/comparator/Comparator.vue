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
          v-model="service"
          class="mt-3"
          label="Serviço"
          :options="servicos"
          :text-by="(option) => option.nome"
          style="width: 34rem;"
          search-placeholder-text="Buscar"
          searchable
          multiple
          :max-visible-options="1"
      />
      <ServiceTable v-bind:serviceName="serviceName" style="width: auto; margin-top: 4rem;"></ServiceTable>

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
      <BankTable v-bind:groupedProps="bank1Props" style="width: auto; margin-top: 4rem;"></BankTable>

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
      <BankTable v-bind:groupedProps="bank2Props" style="width: auto; margin-top: 4rem;"></BankTable>

    </div>
    
  </div>


</template>


<script lang="ts">
  import ServiceTable from './ServiceTable.vue'
  import BankTable from './BankTable.vue'
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
  const service = ref([])
  const error = ref(false)
  const payload = ref([])
  const serviceName = ref([])
  const bank1Payload = ref([])
  const bank2Payload = ref([])
  const bank1Name = ref()
  const bank2Name = ref()
  const idList = ref()
  
  const getServicesIds = (service) => {
    let ids = ''
    service.forEach(element => {
      ids = ids.concat(", ", element.id)
    });
    return ids.slice(2)
  }

  const getServiceNames = (service) => {
    let nameList = []
    service.forEach(element => {
      nameList.push(element.nome)
    })
    return nameList
  }

  const getBankValues = (response, bank) => {
    let bankValues = []
    response.forEach(element => {
      bankValues.push(element.instituicoes[bank])
    });
    return bankValues
  }

  const fetchInstituicoes = async () => {
    let response = await api.get("instituicoes");
    instituicoes.value = response.data;
  };

  const fetchServicos = async () => {
    let response = await api.get("servicos")
    servicos.value = response.data
  }

  const fetchComparator = async (bank1:any, bank2: any, services: any) => {
    if (!bank1 || !bank2 || !services) return;
    idList.value = getServicesIds(services)
    serviceName.value = getServiceNames(services)

    let id1 = toRaw(bank1.id)
    let id2 = toRaw(bank2.id)

    try {
      const response = await ComparatorService.getByIdsAndServiceId(id1, id2, idList.value)
      payload.value = response.data
      console.log(response.data)
      bank1Name.value = response.data[0].instituicoes[0].nome = toRaw(bank1.nome)
      bank2Name.value = response.data[0].instituicoes[1].nome = toRaw(bank2.nome)
      bank1Payload.value = getBankValues(response.data, 0)
      bank2Payload.value = getBankValues(response.data, 1)

    } catch (e) {
      error.value = e.response.data.message
    }
  }

  export default {
    components: {
      ServiceTable,
      BankTable,
    },
    data() {
      return {
        tipoServico,
        tipos,
        bank1,
        bank2,
        instituicoes,
        servicos,
        service,
        error,
        payload,
        serviceName,
        bank1Props: {bankPayload: bank1Payload, bankName: bank1Name},
        bank2Props: {bankPayload: bank2Payload, bankName: bank2Name}
      }
  
    },
    watch: {
      bank1: {
        handler: (newValue) => {
          fetchComparator(newValue, bank2.value, service.value)
        },
        immediate: true,
      },
      bank2: {
        handler: (newValue) => {
          fetchComparator(bank1.value, newValue, service.value)
        },
        immediate: true,
      },
      service: {
        handler: (newValue) => {
          fetchComparator(bank1.value, bank2.value, newValue)
        },
        immediate: true
      },

    },
    
    setup() {
      onMounted(() => {
        fetchInstituicoes()
        fetchServicos()
      })
    }
}

</script>