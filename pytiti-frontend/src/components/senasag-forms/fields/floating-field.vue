<template>
    <div v-if="field.type_field === 'floatingInput'" class="form-floating">
        <input 
        :type="field.type" 
        :class="field.class" 
        :id="field.id" 
        :name="[field.entity_field === null ? field.name : field.entity_field.name]"
        :placeholder="field.placeholder">
        <label :for="field.id">{{ field.label }}</label>
    </div>
</template>

<script>
    export default {
        name: "FloatingField",
        props: {
            field: {
                type: Object,
            },
        },
    }
</script>