<template>
    <img :src="logo" alt="descricao">
</template>

<script>
export default {
    name: 'Logo',
    data() {
        return{
            logo: "/efinance-logo.png",
            descricao: "eFinance Logo"
        }
    }
}
</script>