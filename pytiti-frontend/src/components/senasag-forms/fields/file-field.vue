<template>
    <label :for="field.id" :class="field.label_class">{{ field.label }}</label>
    <p class="text-muted">{{ field.title }}</p>
    <input 
    :class="field.class" 
    :name="[field.entity_field === null ? field.name : field.entity_field.name]" 
    :type="field.type" 
    :id="field.id" 
    :multiple="field.multiple">
</template>

<script>
export default {
    name: "FileField",
    props: {
        field: {
            type: Object,
        },
    },
}
</script>