<template>
    <!-- Default Modals -->
    <b-button 
    @click="enableModal" 
    data-bs-toggle="modal" 
    :data-bs-target="'#myModal'+index" 
    variant="primary" 
    class="btn-label waves-effect waves-light btn-sm mt-1 mb-1">
    <i class="las la-eye label-icon align-middle fs-16 me-2"></i> 
        Ver Ejemplo
    </b-button>
    <div 
    :id="'myModal'+index" 
    class="modal fade" 
    tabindex="-1" 
    aria-labelledby="myModalLabel" 
    aria-hidden="true" 
    style="display: none;">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myModalLabel">Archivo de Ejemplo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="disableModal"> </button>
                </div>
                <div class="modal-body">
                    <!-- <PdfField :file="pdfSrcFile" v-if="enabled" /> -->
                    <PdfField :file="srcFile" v-if="enabled" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal" @click="disableModal">Cerrar</button>
                </div>

            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</template>

<script>
    import PdfField from "@/components/senasag-forms/fields/pdf-field.vue"
    export default {
        name: "PdfModal",
        components: {
            PdfField
        },
        props: {
            srcFile: {
                type: String,
            },
            index: {
                type: Number
            },
        },
        computed: {
            pdfSrcFile () {
                return this.srcFile;
            }
        },
        data() {
            return {
                enabled: false
            }
        },
        methods: {
            enableModal() {
                this.enabled = true;
            },
            disableModal () {
                this.enabled = false;
            }
        },
    }
</script>