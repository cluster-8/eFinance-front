<template>
  <form @submit.prevent="onsubmit()">

    <va-input
      v-model="name"
      class="mb-3"
      type="input"
      :label="t('auth.name')"
      :error="!!nameErrors.length"
      :error-messages="nameErrors"
    />

    <va-input
      v-model="email"
      class="mb-3"
      type="email"
      :label="t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="password"
      class="mb-3"
      type="password"
      :label="t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <va-input
      v-model="confirmpassword"
      class="mb-3"
      type="password"
      :label="t('auth.confirmpassword')"
      :error="!!confirmpasswordErrors.length"
      :error-messages="confirmpasswordErrors"
    />

    <div class="d-flex justify-center mt-3">
      <va-button class="my-0" @click="onsubmit">{{ t('Cadastrar') }}</va-button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmpassword = ref('')
  const nameErrors = ref<string[]>([])
  const emailErrors = ref<string[]>([])
  const passwordErrors = ref<string[]>([])
  const confirmpasswordErrors = ref<string[]>([])


  const formReady = computed(() => {
    return !(emailErrors.value.length || passwordErrors.value.length|| confirmpasswordErrors.value.length || nameErrors.value.length)
  })

  function onsubmit() {
    if (!formReady.value) return


    nameErrors.value = name.value ? [] : ['Digite o nome']
    emailErrors.value = email.value ? [] : ['Digite o email']
    passwordErrors.value = password.value ? [] : ['Digite a senha']
    confirmpasswordErrors.value = password.value ? [] : ['Digite a senha novamente']


    useRouter().push({ name: 'dashboard' })
  }
</script>
