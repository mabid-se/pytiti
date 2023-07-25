<template>
    <div class="card">
        <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">{{ form.form_name }}</h4>
        </div><!-- end card header -->
        <div class="card-body">
            <div class="live-preview">
                <div class="row gy-4">
                    <div class="col-xxl-3 col-md-6" v-for="(field, index) in form.form_schema" :key="index">
                        <InputField :field="field" />
                        <EmailField :field="field" />
                        <TextareaField :field="field" />
                        <HelpinputField :field="field" />
                    </div>
                </div>
                <!--end row-->
            </div>
        </div>
    </div>
</template>

<script>
    import EmailField from "./fields/email-field.vue";
    import TextareaField from "./fields/textarea-field.vue";
    import HelpinputField from "./fields/helpinput-field.vue";
    import InputField from "./fields/input-field.vue";
    
    export default {
        name: "BasicFields",
        components: {
            HelpinputField, EmailField, TextareaField, InputField
        },
        data() {
            return {
                form: {
                    form_name: "Campos de prueba",
                    form_schema: [
                        {
                            element: "readonly",
                            type: "text",
                            label_class: "form-label",
                            class: "form-control-plaintext",
                            name: "readonlyPlainText",
                            label: "Tipo de texto de solo lectura",
                            id: "readonlyPlainText",
                            placeholder: undefined,
                            value: "Dato del campo",
                            required: false,
                            readonly: true,
                        },
                        {
                            element: "email",
                            type: "email",
                            label_class: "form-label",
                            class: "form-control form-control-icon",
                            name: "iconField",
                            label: "Tipo de mail con icon",
                            id: "iconField",
                            placeholder: "ejemplo@gmail.com",
                            value: undefined,
                            required: false,
                            readonly: false,
                        },
                        {
                            element: "date",
                            type: "date",
                            label_class: "form-label",
                            class: "form-control",
                            name: "inputDate",
                            label: "Tipo fecha",
                            id: "inputDate",
                            placeholder: undefined,
                            value: undefined,
                            required: false,
                            readonly: false,
                        },
                        {
                            element: "time",
                            type: "time",
                            label_class: "form-label",
                            class: "form-control",
                            name: "inputTime",
                            label: "Tipo hora",
                            id: "inputTime",
                            placeholder: undefined,
                            value: undefined,
                            required: false,
                            readonly: false,
                        },
                        {
                            element: "password",
                            type: "password",
                            label_class: "form-label",
                            class: "form-control",
                            label: "Tipo contraseña",
                            name: "inputPassord",
                            id: "inputPassord",
                            placeholder: undefined,
                            value: "password123",
                            required: false,
                            readonly: false,
                        },
                        {
                            element: "textarea",
                            label_class: "form-label",
                            class: "form-control",
                            label: "Tipo textarea",
                            name: "textareaField",
                            id: "textareaField",
                            placeholder: undefined,
                            value: undefined,
                            required: false,
                            readonly: false,
                            rows: 3
                        },
                        {
                            element: "helpinput",
                            label_class: "form-label",
                            class: "form-control",
                            label: "Tipo texto con ayuda",
                            name: "helpInput",
                            id: "helpInput",
                            placeholder: undefined,
                            value: undefined,
                            required: false,
                            readonly: false,
                            title: "Texto ayuda del campo"
                        },
                    ]
                }
            }
        },
    }
</script>