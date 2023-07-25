<template>
    <div class="card">
        <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">{{ form.form_name }}</h4>
        </div><!-- end card header -->
        <div class="card-body">
            <div class="live-preview">
                <div class="mt-4">
                    <h5 class="fs-15">Ejemplos</h5> 
                    <div v-for="(field, index) in form.fields" :key="index">
                        <SimpleSelectField :field="field" />
                        <MultiSelectField :field="field" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SimpleSelectField from "@/components/senasag-forms/fields/simple-select-field.vue"
    import MultiSelectField from '@/components/senasag-forms/fields/multi-select-field.vue';

    export default {
        name: "SelectsForm",
        components: {
            SimpleSelectField,
            MultiSelectField
        },
        data() {
            return {
                form: {
                    form_name: "Tipo selects",
                    fields: [
                        {
                            element: "simpleSelect",
                            label: "Provincia",
                            id: "empresa-prov",
                            name: "empresa-prov",
                            placeholder: "Seleccionar provincia",
                            readonly: false,
                            title: "Seleccionar provincia",
                            options: [
                                {
                                    value: "abel-iturralde",
                                    text: "Abel Iturralde"
                                },
                                {
                                    value: "pedro-domingo-murillo",
                                    text: "Pedro Domingo Murillo"
                                },
                                {
                                    value: "pacajes",
                                    text: "Pacajes"
                                },
                                {
                                    value: "inquisivi",
                                    text: "Inquisivi"
                                },
                                {
                                    value: "munecas",
                                    text: "Muñecas"
                                },
                            ]
                        },
                        {
                            element: "multiSelect",
                            value: undefined,
                            placeholder: "Seleccionar línea de productos",
                            options: [
                                "one", "two", "three", "four", "five", "six", "seven"
                            ]
                        }
                    ]
                }
            }
        },
    }
</script>