<template>
    
    <div class="card">
        <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">{{ form.form_name }}</h4>
        </div>
        <div class="card-body">
            <div class="live-preview">
                <div class="row">
                    <div 
                    class="col-lg-4 col-md-6" 
                    v-for="(field, index) in form.fields" 
                    :key="index">
                        <CheckField :field="field" />
                        <RadioField :field="field" />
                        <SwitchField :field="field" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CheckField from './fields/check-field.vue';
    import RadioField from './fields/radio-field.vue';
    import SwitchField from './fields/switch-field.vue';

    export default {
        name: "RadioCheckSwitchForm",
        components: {
            CheckField,
            RadioField,
            SwitchField
        },
        data() {
            return {
                form: {
                    form_name: "Radio, Check y Switch",
                    fields: [
                        {
                            element: "check",
                            type: "checkbox",
                            id: "check-field",
                            name: "check-field",
                            class: "form-check-input",
                            label: "Seleccionar opciones",
                            label_class: "form-label",
                            required: false,
                            readonly: false,
                            options: [
                                {
                                    value: 1,
                                    text: "Option 1"
                                },
                                {
                                    value: 2,
                                    text: "Option 2"
                                },
                            ]
                        },
                        {
                            element: "radio",
                            type: "radio",
                            id: "radio-field",
                            name: "radio-field",
                            class: "form-check-input",
                            label_class: "form-check-label",
                            label: "Seleccionar opción",
                            required: false,
                            readonly: false,
                            options: [
                                {
                                    value: 1,
                                    text: "Option 1"
                                },
                                {
                                    value: 2,
                                    text: "Option 2"
                                },
                            ]
                        },
                        {
                            element: "switch",
                            type: "checkbox",
                            id: "switch-field",
                            name: "switch-field",
                            class: "form-check-input",
                            label_class: "form-check-label",
                            label: "Mostrar",
                            required: false,
                            readonly: false,
                            checked: false,
                        }
                    ]
                }
            }
        },
    }
</script>