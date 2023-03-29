<template>
  <h3 class="va-h3">Taxas de Serviço</h3>
  <p>Selecione abaixo o tipo de serviço e a instituição financeira para visualizar as taxas de serviços</p>
  
  <div style="width: 300px; display: flex; margin-top: 1.2rem;">
    <div class="mr-3">
      <va-select 
        v-model="tipoServico" 
        class="mt-3" 
        label="Tipo de Serviço:" 
        :options="tipos"
      />
    </div>
    <div class="mr-3">
      <va-select 
        v-model="banco" 
        class="mt-3" 
        loading
        label="Busque a Instituição" 
        :options="instituicoes"
        :text-by="(option) => option.nome" searchable />
    </div>
  </div> 
  <div style="width: 400px;">
    <va-alert
      v-if="error"
      icon="info"
      class="mb-3 mt-3"
      :description="error"
    />
  </div>

  <div style="margin-top: 2rem;">
    <Table
      v-if="isVisible"
      :tarifas="!error ? tarifas : ''"
    ></Table>
  </div>
</template>



<script lang="ts">
import { ScalingSquaresSpinner } from 'epic-spinners'
import Table from '../dashboard/DashboardTable.vue'
import api from '../../../services/api'
import { onBeforeMount, onMounted, ref, toRaw, watch } from 'vue';

const tarifas = ref()
const instituicoes = ref([])
const tipoServico = ref<'Física' | 'Jurídica'>('Física')
const tipos = ['Física', 'Jurídica']
const banco = ref()
const error = ref(false)
const isVisible = ref(true)

const fetchInstituicoes = async () => {
  let response = await api.get('instituicoes')
  instituicoes.value = response.data
}

const fetchTarifas = async (banco) => {
  
  if (!banco) return
  console.log(' Tipo =',tipoServico)
  let id = toRaw(banco.id)
  try {
    let response = await api.get(`instituicao/tarifas/${id}?tipo=${tipoServico.value.charAt(0)}`)
    isVisible.value = true
    tarifas.value = response.data
    console.log(response.data)
    error.value = false
  } catch (e) {
    isVisible.value = false
    // error.value = e.response.data.message;
  }
}


export default {
  components: {
    Table,
    ScalingSquaresSpinner
  },
  data() {
    return {
      banco,
      tipos,
      tipoServico,
      fetchTarifas,
      tarifas,
      instituicoes,
      error,
      isVisible
    };
  },
  watch: {
    banco(newValue, oldValue) {
      console.log(newValue, oldValue)
      fetchTarifas(newValue)
    },
    tipoServico(newValue, oldValue) {
      console.log(newValue)
      fetchTarifas(banco.value)
    }
   },
  setup() {
    // watch(banco, (newValue) => {
    //   fetchTarifas(newValue)
    // })
   
    onBeforeMount(() => {
      fetchInstituicoes()
      isVisible.value = false
    })
  },


};
</script>