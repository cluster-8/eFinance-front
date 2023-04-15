<template>
    <div>
    <h3 class="va-h3">Linha do tempo</h3>
      <p>Selecione abaixo o tipo de serviço, o serviço e a instituição financeira para visualizar o histórico da variação da média do preço
da tarifa com tendência.</p>
    </div>
      <div style="width: 300px; display: flex; margin-top: 20px;">
    
        <div class="mr-3">
        <va-select
          v-model="pessoa"
          class="mt-3"
          label="Tipo de Serviço"
          :options="tipoPessoa"
          style="width: 200px;"

        />
        </div>
    
        <div class="mr-3">
        <va-select
          v-model="value"
          class="mt-3"
          label="Serviço"
          :options="services"
          searchable
          highlight-matched-text
        />
        </div>

        <div class="mr-3">
        <va-select 
        v-model="banco" 
        class="mt-3" 
        label="Busque a Instituição" 
        :options="options"
        :text-by="(option) => option.nome" 
        searchable />
      

        </div>
    
          </div>

    
    </template>
    
    <script>

    import Table from '../dashboard/DashboardTable.vue'
    import api from '../../../services/api'
    import { onMounted, ref, toRaw, watch } from 'vue';
    
    const tarifas = ref()
    const instituicoes = ref([])
    const tipoPessoa = ["Física", "Jurídica"]
    const pessoa = ref()
    const banco = ref()
    const error = ref(false) 
    
    const fetchInstituicoes = async () => {
      let response = await api.get('instituicoes')
      instituicoes.value = response.data
    }
    
    const fetchTarifas = async (banco) => {
      if (!banco) return
      console.log(banco)
      let id = toRaw(banco.id)
      let response = await api.get(`instituicao/tarifas/${id}`)
      tarifas.value = response.data
    }
    
    const handleSubmit = (pessoa, banco) => {
      console.log(pessoa)
      console.log(banco)
    }
    
    export default {
 
      data() {
        const options = instituicoes
        return {
            services: [
                "one",
                "two",
                "three"
            ],
          banco,
          options,
          pessoa,
          tipoPessoa,
          handleSubmit,
          fetchTarifas,
          tarifas,
          error
        };
      },
      setup() {
        watch(banco, (newValue) => {
          fetchTarifas(newValue)
        })
        onMounted(() => {
          fetchInstituicoes()
        })
      },
    
    
    };
    </script>
    