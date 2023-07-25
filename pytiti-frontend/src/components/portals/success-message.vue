<template>
    <div 
    v-if="attrs.show"
    class="alert alert-success alert-dismissible alert-label-icon request-state-message rounded-label fade show" 
    role="alert">
        <i class="ri-error-warning-line label-icon"></i>
        <span class="fw-semibold me-auto">{{ attrs.title }}</span> - {{ attrs.message }}
        <button 
        id="success-message-close" 
        type="button" 
        class="btn-close" 
        data-bs-dismiss="alert" 
        aria-label="Close"></button>
    </div>
</template>

<script>
export default {
    name: "SuccessMessage",
    props: {
        attrs: {
            type: Object
        }
    },
    methods: {
        dismissModal() {
            setTimeout(() => {
                document.querySelector("#success-message-close").click();
                this.$emit("change-message-state", {show:false});
            }, 4000);
        }
    },
    updated() {
        this.dismissModal();
    }
}
</script>

<style scoped>
    .request-state-message {
        position: fixed;
        z-index: 1000;
        bottom: 10%;
        right: 0%;
    }
</style>