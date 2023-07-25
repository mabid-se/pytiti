<template>
    <div v-if="field.type_field === 'hiddeninput'">
        <input 
        :value="typePerson"
        :name="field.name"
        type="text" 
        hidden />
    </div>
</template>

<script>
    export default {
        name: "HiddenInputField",
        props: {
            field: {
                type: Object,
            },
        },
        computed: {
            typePerson() {
                return this.field.type
            }
        },
        mounted() {
            let data = {
               [this.field.name]: this.field.type
            };
            this.$emit("update-change", data);
        }
    }
</script>