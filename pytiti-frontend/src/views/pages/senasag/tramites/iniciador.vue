<template>
    <ErrorMessage v-if="isReady">
        <template #title>
            <span class="fw-semibold me-auto">Error al enviar solicitud</span>
        </template>
        <template #message>
            Se ha producido un error por favor inténtelo de nuevo.
        </template>
    </ErrorMessage>
</template>

<script>
export default {
    name: "TramiteIniciador",
    data() {
        return {
            isReady: false,
        }
    },
    mounted() {
        this.isReady = true;
    }
}
</script>