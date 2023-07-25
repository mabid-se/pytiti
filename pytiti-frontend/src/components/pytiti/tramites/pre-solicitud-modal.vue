<template>
    
    <div class="mt-2 text-center">
        <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h6 class="fs-15">Guía para seleccionar su trámite</h6>
            <p class="text-muted">Responda a este formulario para que un funcionario SENASAG lo guíe en la selección de su trámite.</p>
        </div>
    </div>
    <form @submit.prevent="sendForm" v-if="isReady">
        <h4 class="fs-13">Ud. eligió el trámite:</h4>
        <h6 class="fs-15 text-primary">Registro sanitario de empresas veterinarias importadoras Comercializadoras.</h6>
        <p class="fs-13">Registro, Evaluación, Inspección y Supervisión zoosanitarias de empresas y sucursales que importan, elaboran, fraccionan, distribuyen, comercializan, productos de uso veterinario.</p>
        <div class="mb-3">
                
            <label for="detalle_actividad_empresa">Detalle la actividad principal a la que se dedica su empresa</label>
            <textarea 
                required  
                name="detalle_actividad_empresa" 
                id="detalle_actividad_empresa" 
                rows="4" 
                v-model="form.detalle_actividad_empresa"
                class="form-control"
            ></textarea>
        </div>
        <div class="mb-3">
            <label for="objetivo_tramite">¿Cuál es el objetivo que desea cumplir al completar este trámite?</label>
            
            <textarea 
                required 
                name="objetivo_tramite" 
                id="objetivo_tramite" 
                rows="4" 
                v-model="form.objetivo_tramite" 
                class="form-control"
            ></textarea>
        </div>
        <div class="mb-3" v-if="userIsCompany">
            <label for="">Encargado de trámite:</label>
            <select 
            required
            name="" 
            id="" 
            v-model="form.tramitador"
            class="form-control">
                <option :value="null">Empresa: {{ company.razonsocial }}</option>
                <option disabled>Tramitadores:</option>
                <option 
                v-for="(item, index) in processors" 
                :value="item.idtramitador" 
                :key="index">
                    {{ item.fid_persona.nombres }}
                    {{ item.fid_persona.apellido_paterno}} 
                    {{ item.fid_persona.apellido_materno}}
                </option>
            </select>
        </div>
        <!-- messages -->
        <div class="mb-3" v-if="successAttrs.show || errorAttrs.show">
            <div 
            v-if="successAttrs.show" 
            class="alert alert-success alert-dismissible alert-solid alert-label-icon fade show" 
            role="alert">
                <i class="ri-notification-off-line label-icon"></i>
                <b>{{ successAttrs.title }}</b> - {{ successAttrs.message }}
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div 
            v-if="errorAttrs.show" 
            class="alert alert-danger alert-dismissible alert-solid alert-label-icon fade show mb-xl-0" 
            role="alert">
                <i class="ri-error-warning-line label-icon"></i>
                <b>{{ errorAttrs.title }}</b> - {{ errorAttrs.message }}
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        </div>
        <!-- /messages -->
        <div class="d-flex flex-wrap gap-2 mb-3 mt-4 mb-lg-0 justify-content-md-center">
            <button class="btn btn-primary btn-label" @click.prevent="$emit('on:close:modal')" aria-label="Close"> 
                <div class="d-flex">
                    <div class="flex-shrink-0">
                        <i class="ri-arrow-left-s-line label-icon align-middle fs-16 me-2"></i>
                    </div>
                <div class="flex-grow-1">Cerrar</div>
                </div>
            </button>
            <button
            class="btn btn-success btn-label right">
                <div class="flex-grow-1">Enviar pre-solicitud</div>
                <div class="d-flex">
                    <div class="flex-shrink-0">
                        <i class="ri-arrow-right-s-line label-icon align-middle fs-16"></i>
                    </div>
                </div>
            </button>
        </div>
    </form>
            
    <!--- messages -->
    <!-- <ErrorMessage :attrs="errorAttrs" @change-message-state="changeMessageState" />
    <SuccessMessage :attrs="successAttrs" @change-message-state="changeMessageState" /> -->
    <!--- /messages -->
</template>

<script>
import { mapGetters } from "vuex";
import { sendProcedurePreRequest } from "@/services/tramites";
import { 
    getUserRole, 
    getCompanyProcessors, 
    getCompanyInfo
} from '@/helpers/senasag/user';
//import { getEnterpriseAccount } from '@/services/cuentas';
import { getUserType, userIsCompany } from '@/services/user';
export default {
    name:"PreSolicitudModal",
    props: {
        attrs: {
            type: Object
        },
        procedureId: {
            type: String
        }
    },
    data() {
        return {
            form: {},
            userRole: getUserRole(),
            companyId: getUserType(),
            company: getCompanyInfo(),
            isReady: false,
            processors: getCompanyProcessors(),
            //
            hasFailed: false,
            hasSucceed: false,
            successAttrs: {
                title: undefined,
                message: undefined,
                show: false
            },
            errorAttrs: {
                title: undefined,
                message: undefined,
                show: false,
            },
            tramite: this.procedureId
        }
    },
    computed: {
        ...mapGetters("permissions", 
        [
          "userIsAdmin", 
          "userIsCompany", 
          "userIsPerson", 
          "userIsProcessor"
        ])
    },
    methods: {
        sendForm() {
            sendProcedurePreRequest(this.userRole, this.form)
                .then(
                    res => {
                        if (res.error) {
                            this.errorAttrs.title = "Error de pre-solicitud";
                            this.errorAttrs.message = "Ocurrió un error al realizar la pre-solicitud";
                            this.errorAttrs.show = true;
                        } else {
                            this.successAttrs.title = "Pre-Solicitud exitosa";
                            this.successAttrs.message = "Su pre-solicitud ha sido realizada correctamente.";
                            this.successAttrs.show = true;
                            setTimeout(() => {
                                window.location.href = "/tramites"
                            }, 2000);
                        }
                    },
                    err => {
                        console.error(err);
                    }
                )
        },
        /*
        getInfoCompany () {
            getEnterpriseAccount(this.companyId)
                .then(
                    res => {
                        this.isReady = true;
                        this.company = res;
                    }, 
                    err => {
                        console.error(err);
                    }
                );
        },
        getCompanyProcessors() {
            getCompanyApprovedProcessors()
                .then(
                    res => {
                        this.processors = res;
                    },
                    err => {
                        console.error(err);
                    }
                )
        },
        */
        changeMessageState({show}) {
            this.successAttrs.show = show;
            this.errorAttrs.show = show;
        },
        selectCompany() {
            this.form = {...this.form, ...{tramitador: null}}
        }
    },
    mounted() {
        //this.getInfoCompany();
        //this.getCompanyProcessors();
        this.isReady = true;
        if (userIsCompany()) {
            this.form = {
                detalle_actividad_empresa: undefined,
                objetivo_tramite: undefined,
                tramitador: undefined,
                tramite: this.procedureId,
            }
        } else {
            this.form = {
                detalle_actividad_empresa: undefined,
                objetivo_tramite: undefined,
                tramite: this.procedureId,
            }
        }
    },
    // updated() {
    //     this.form = {...this.form, ...{tramite: this.procedureId}};
    // }
}
</script>

<style>

</style>