<template>
    <div class="card">
        <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">{{ form.form_name }}</h4>
        </div><!-- end card header -->
        <div class="card-body">
            <div class="live-preview">
                <div class="row align-items-center g-3">
                    <div class="col-lg-4" v-for="(field, index) in form.form_schema" :key="index">
                        <FileField :field="field" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FileField from './fields/file-field.vue';
    export default {
        name: "FilesForm",
        components: {
            FileField,
        },
        data() {
            return {
                form: {
                    form_name: "Carga de archivos",
                    form_schema: [
                        {
                            element: "files",
                            type: "file",
                            class:"form-control",
                            label_class: "form-label",
                            name: "multipleFilesField",
                            label: "Tipo carga de archivos multiples",
                            id: "multipleFilesField",
                            placeholder: undefined,
                            value: undefined,
                            required: false,
                            readonly: false,
                            title: "Selecciona múltiples archivos para subir",
                            multiple: true
                        },
                    ]
                }
            }
        },
    }
</script>