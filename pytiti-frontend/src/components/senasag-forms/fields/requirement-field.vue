<template>
    <div v-if="field.type_field === 'requirementField'">
        <div class="bg-gray-100 px-2 py-2 pr-0">
            <div class="form-check mb-2" v-if="!field.required">
                <input class="form-check-input" type="checkbox" id="formCheck1">
                <label>Seleccionar este requisito</label>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <label>{{index + 1}}. {{ field.label }}<br/>{{ field.title }}</label>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-7">
                    <input 
                        :disabled="userIsAdmin"
                        accept="image/png,image/jpg,image/jpeg,.pdf,.doc,.docx"
                        type="file" 
                        class="form-control" 
                        :name="field.name" 
                        @change="handleChange" multiple>
                        <div 
                        class="d-flex align-items-center"
                        v-for="(f, index) in files" 
                        :key="index">
                    <div class="flex-shrink-0 me-3">
                        <div class="avatar-sm">
                            <div class="avatar-title bg-light text-secondary rounded fs-24">
                                <i class="ri-folder-zip-line"></i>
                            </div>
                        </div>
                    </div>
                    <div class="flex-grow-1 overflow-hidden">
                        <label :for="'requirement_file_'+index" class="fs-13 mb-1 label-req-field">
                            {{ f.name }}
                        </label>
                        <div>{{ fileOnMb(f) }}</div>
                    </div>
                    <div class="flex-shrink-0 ms-2">
                        <div class="d-flex gap-1">
                            <button type="button" class="btn btn-icon text-muted btn-sm fs-18" :disabled="userIsAdmin"><i class="ri-download-2-line"></i></button>
                            <div class="dropdown">
                                <button :disabled="userIsAdmin" class="btn btn-icon text-muted btn-sm fs-18 dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="ri-more-fill"></i>
                                </button>
                                <ul class="dropdown-menu" style="">
                                    <!-- <li><a class="dropdown-item" href="#"><i class="ri-pencil-fill align-bottom me-2 text-muted"></i> Rename</a></li> -->
                                    <li>
                                      <button :disabled="userIsAdmin" @click="cleanFile(index)" class="dropdown-item"><i class="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Borrar</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
                <!-- Examples view and download-->
                <div class="col-lg-5 p-0">
                    <div class="row">
                        <div class="col-auto">
                            <PdfModal 
                            :index="index"
                            :srcFile="fileUrl"
                            />
                        </div>
                        <div class="col-auto">
                            <a 
                            :disabled="userIsAdmin"
                            class="btn btn-primary btn-label waves-effect waves-light btn-sm mt-1 mb-1" 
                            :href="field.entity_field.example_file" 
                            target="_blank" download>
                                <i class="las la-download label-icon align-middle fs-16 me-2"></i> 
                                Descargar Ejemplo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PdfModal from "@/components/senasag-forms/ui-components/PdfModal.vue";
import { sendProcedureRequirementFiles } from '@/services/tramites';
import { mapGetters } from 'vuex';
export default {
    name: "RequirementField",
    props: {
        field: {
            type: Object
        },
        index: {
            type: Number
        },
    },
    data() {
        return {
            file: {
                size: undefined,
                name: "Subir"
            },
            files: [],
            srcFile: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf"
        }
    },
    components: {
        PdfModal,
    },
    computed: {
        fileMBSize() {
            if (this.file.size) {
                let sizeMB = this.file.size/1024/1024;
                return `${sizeMB.toFixed(2)}MB`;
            }
            return "";
        },
        ...mapGetters("permissions", ["userIsAdmin"]),
        fileUrl() {
            return this.field.value === null ? this.srcFile : this.field.value.ruta_url;
        }
    },
    methods: {
        fileOnMb (file) {
            let size = file.size/1024/1024;
            return `${size.toFixed(2)}MB`;
        },
        handleFile(e) {
            let file = e.target.files[0];
            this.file.size = file.size;
            this.file.name = file.name;
        },
        cleanFile(index) {
            let file = [...document.querySelector(`input[name="${this.field.name}"]`).files];
            file.splice(index, 1);
            this.files.splice(index, 1);
        },
        handleChange(e) {
            if (!e.target.hasAttribute("readonly")) {
                let files = [...e.target.files]
                this.files = files;
    
                let bodyData = new FormData();
                bodyData.append("entity", 1);
                bodyData.append("date", new Date().toLocaleDateString().split("/").reverse().join("-"));
                bodyData.append("slug", "1DB38501BA");
                this.files.map(file => {
                    bodyData.append("form_data", file);
                });
    
                sendProcedureRequirementFiles(this.$route.params.slug, bodyData)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        }
    },
}
</script>

<style scoped>
    .label-req-field:hover {
        cursor:pointer;
    }
</style>