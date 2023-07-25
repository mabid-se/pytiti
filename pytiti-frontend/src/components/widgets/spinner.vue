<template>
  <div class="spinner-border text-success me-2" role="status" v-if="loading">
    <span class="visually-hidden">Cargando...</span>
  </div>
  <slot v-else></slot>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
    
  },
};
</script>
