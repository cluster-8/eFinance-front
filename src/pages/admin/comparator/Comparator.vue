
<template>
  <div>
  <h3 class="va-h3">Comparador</h3>
   <p>
     Selecione os serviços desejados, em seguida selecione as instituições para fazer a comparação de valores
   </p>
   
   <div class="mr-3">
     <va-select
       v-model="tipoServico"
       class="mt-3 quebra_linha font_size"
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
           class="mt-3 quebra_linha width_service font_size"
           label="Serviços"
           :options="servicos"
           :text-by="(option) => option.nome"
           search-placeholder-text="Buscar"
           searchable
           multiple
           :max-visible-options="1"
       />
       <ServiceTable v-if="isVisible" v-bind:services="serviceName" class="width_service font_size" style=" margin-top: 4rem;"></ServiceTable>
 
     </div>
 
     <div class="mr-3" style="">
 
       <va-select
           placeholder="Selecione a Instituição"
           v-model="bank1"
           class="mt-3 quebra_linha width_bank font_size"
           label="Instituição Financeira 1"
           :options="instituicoes"
           :text-by="(option) => option.nome"
           search-placeholder-text="Buscar"
           searchable
 
       />
       <BankTable v-if="isVisible" class="width_bank" v-bind:groupedProps="bank1Props" style="margin-top: 4rem;"></BankTable>
       
     </div>
 
     <div class="">
       <va-select
         placeholder="Selecione a Instituição"
         v-model="bank2"
         class="mt-3 mr-3 quebra_linha width_bank font_size"
         label="Instituição Financeira 2"
         :options="instituicoes"
         :text-by="(option) => option.nome"
         search-placeholder-text="Buscar"
         searchable
       />
       <BankTable v-if="isVisible" class="width_bank" v-bind:groupedProps="bank2Props" style="margin-top: 4rem;"></BankTable>
 
     </div>
     
   </div>
 
   <div>
     <va-alert v-if="error" icon="info" class="mb-3 mt-3" :description="error" />
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
   const isVisible = ref(false)
   
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
     bank1Name.value = bank1.nome
     bank2Name.value = bank2.nome
     let id1 = toRaw(bank1.id)
     let id2 = toRaw(bank2.id)
     let payload1 = []
     let payload2 = []
     try {
        const response = await ComparatorService.getByIdsAndServiceId(id1, id2, idList.value)
        
        if (!response.data) {
          payload1.push({
            id: id1,
            valorMaximo: "Serviço não oferecido" 
          })
          payload2.push({
            id: id2,
            valorMaximo: "Serviço não oferecido" 
          })
          return
        }
        
        payload.value = response.data        

   
        response.data.map((servico) => {
          let instA = servico.instituicoes.find((banco) => banco.instituicaoId == id1)
          let instB = servico.instituicoes.find((banco) => banco.instituicaoId == id2)

          if (!instA) payload1.push({
            id: id1,
            valorMaximo: "Serviço não oferecido" 
          })
          else payload1.push(instA)

          if (!instB) payload2.push({
            id: id2,
            valorMaximo: "Serviço não oferecido" 
          })
          else payload2.push(instB)

          bank1Payload.value = payload1
          bank2Payload.value = payload2
       })

      isVisible.value = true
      error.value = false
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
          isVisible,
          payload,
          serviceName,
          bank1Payload,
          bank2Payload,
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
 
 <style lang="scss">
 .quebra_linha {
   white-space: nowrap;
 }
 .va-dropdown__content {
  white-space: nowrap;
 }

 .width_bank{
  width: 18rem !important
 };

 .width_service{
  width: 34rem !important
 }

 .va-table td {
  font-size: 98%;
}

 @media (max-width: 1500px){

  .width_bank{
  width: 14.5rem !important
 };

 .width_service{
  width: 32rem !important
 }
 
 .font_size {
  font-size: 95%;
}

.va-select-option {
  font-size:90%
}

.va-table td {
  font-size: 95%;
}

 }
 </style>
