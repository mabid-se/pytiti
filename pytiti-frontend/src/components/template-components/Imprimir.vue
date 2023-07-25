<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header align-items-center d-flex-">
                    <h4 class="card-title mb-2 flex-grow-1">Impresión de certificado</h4>
                    <h5>Elija el formato de impresión.</h5>
                </div>
                <!-- end card header -->
                <div class="card-body">
                    <div class="live-preview">
                        <div class="row gy-4">
                            <div class="col-sm-12 col-lg-12 col-xxl-12">
                                <div class="row">
                                    <div class="col-12 mb-2">
                                        <div>
                                            <p class="text-muted fw-medium">Tipo de impresión:</p>
                                            <select
                                                class="form-select mb-3"
                                                aria-label="Default select example"
                                                v-model="mode"
                                                @change="onChangeMode()"
                                            >
                                                <option selected disabled>Elija una opción</option>
                                                <option value="prueba">De prueba</option>
                                                <option value="original">Impresión final</option>
                                                <!--<option value="3">Certificado oficial</option>-->
                                            </select>
                                        </div>
                                    </div>
                                    <!--<div class="col-12">
                                                                                                            <div class="mb-2">
                                                                                                                <label for="exampleInputdate" class="form-label">Introduzca el número preimpreso del certificado o formulario original (sin ceros por delante)</label>
                                                                                                                <input class="form-control" id="basiInput">
                                                                                                            </div>                                                                                                            
                                                                                                        </div>-->
                                    <div class="col-12">
                                        <div class="mt-3">
                                            <div class="form-check mb-2" v-if="mode === 'original'">
                                                <input
                                                    @change="incluirFirma()"
                                                    class="form-check-input"
                                                    type="checkbox"
                                                    id="digitalSign"
                                                />
                                                <label class="form-check-label" for="formCheck1">
                                                    Incluir Firma digital
                                                </label>
                                            </div>
                                            <div v-if="!incluirFirmaDigital">
                                                <div class="form-check mb-2">
                                                     
                                                    <input
                                                        type="radio"
                                                        id="sin_membrete"
                                                        name="membrete"
                                                        value="sin-membrete"
                                                        v-model="membrete"
                                                    />
                                                     
                                                    <label for="sin_membrete"
                                                        >Imprimir en hoja Pre-impresa</label
                                                    ><br />
                                                     
                                                    <input
                                                        type="radio"
                                                        id="con_membrete"
                                                        name="membrete"
                                                        value="con-membrete"
                                                        v-model="membrete"
                                                    />
                                                     
                                                    <label for="con_membrete"
                                                        >Imprimir con formato desde sistema</label
                                                    >
                                                </div>
                                            </div>
                                            <!-- <div>
                                                <div class="form-check form-check-success mb-3">
                                                    <input
                                                        @change="
                                                            $emit(
                                                                'on:paperChanged',
                                                                $event.target.checked
                                                            )
                                                        "
                                                        class="form-check-input"
                                                        type="checkbox"
                                                        id="paper"
                                                    />
                                                    <label
                                                        class="form-check-label"
                                                        for="defaultIndeterminateCheck"
                                                    >
                                                        Imprimir en el último modelo de membretado
                                                        (R.A.: 148/2008) Papel: Tamaño carta
                                                        (original de cartulina, copias papel bond)
                                                    </label>
                                                </div>
                                            </div> -->

                                            <hr />
                                            <div
                                                class="mt-3"
                                                v-if="incluirFirmaDigital && mode === 'original'"
                                            >
                                                <label for="formFileMultiple" class="form-label"
                                                    >Seleccione los usuarios que deben firmar el
                                                    documento</label
                                                >
                                                <div class="mb-3">
                                                    <select
                                                        class="form-select mb-0"
                                                        aria-label="Default select example"
                                                        v-model="firmanteSeleccionado"
                                                    >
                                                        <option selected disabled>
                                                            - Seleccione -
                                                        </option>
                                                        <option
                                                            v-for="(
                                                                option, index
                                                            ) of firmantesOpciones"
                                                            :value="option.uuid"
                                                            :key="index"
                                                        >
                                                            {{ option.first_name }}
                                                            {{ option.last_name }}
                                                        </option>
                                                    </select>
                                                    <div
                                                        id="basiInputAyuda"
                                                        class="form-text"
                                                    ></div>
                                                </div>

                                                <div class="col-12 mb-3">
                                                    <div class="derecha">
                                                        <!-- try to send -->
                                                        <button
                                                            type="button"
                                                            href="#"
                                                            class="btn btn-success btn-label right"
                                                            @click="agregar"
                                                        >
                                                            <i
                                                                class="ri-file-edit-line label-icon align-middle fs-16 ms-2"
                                                            ></i>
                                                            Agregar usuario
                                                        </button>
                                                    </div>
                                                </div>

                                                <div class="col-12 mb-3">
                                                    <div class="table-responsive mt-4 mt-xl-0">
                                                        <table
                                                            class="table table-success table-striped table-nowrap- align-middle mb-0"
                                                        >
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">N°</th>
                                                                    <th scope="col">Nombre</th>
                                                                    <th scope="col">Cargo</th>
                                                                    <th scope="col">
                                                                        Estado de firma
                                                                    </th>
                                                                    <th scope="col">Acción</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr
                                                                    v-for="(firmante, index) of this
                                                                        .firmantes"
                                                                    :key="index"
                                                                >
                                                                    <td class="fw-medium">
                                                                        {{
                                                                            firmante.order ||
                                                                            index + 1
                                                                        }}
                                                                    </td>
                                                                    <td>{{ firmante.nombre }}</td>
                                                                    <td>{{ firmante.cargo }}</td>
                                                                    <td>
                                                                        {{
                                                                            firmante.firmado
                                                                                ? "FIRMADO"
                                                                                : "SIN FIRMA"
                                                                        }}
                                                                    </td>
                                                                    <td>
                                                                        <button
                                                                            v-if="!firmante.firmado"
                                                                            type="button"
                                                                            class="btn btn-success"
                                                                            @click="
                                                                                quitar(
                                                                                    firmante.uuid
                                                                                )
                                                                            "
                                                                        >
                                                                            Quitar
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="mb-3">
                                                <div class="row">
                                                    <div class="btn_cen">
                                                        <!-- <button
                                                            type="button"
                                                            class="btn btn-guardar btn-label right mb-1"
                                                            @click="guardar"
                                                        >
                                                            <i
                                                                class="ri-save-line label-icon align-middle fs-16 ms-2"
                                                            ></i>
                                                            Guardar
                                                        </button> -->

                                                        <button
                                                            type="button"
                                                            class="btn btn-print btn-label right mb-1"
                                                            @click="guardar"
                                                            v-if="
                                                                incluirFirmaDigital &&
                                                                mode === 'original'
                                                            "
                                                        >
                                                            <i
                                                                class="ri-printer-line label-icon align-middle fs-16 ms-2"
                                                            ></i
                                                            >Imprimir y Enviar
                                                        </button>

                                                        <a
                                                            type="button"
                                                            class="btn btn-print btn-label right mb-1"
                                                            v-if="
                                                                !incluirFirmaDigital && membrete
                                                            "
                                                            target="_blank"
                                                            :href="imprimirUrl"
                                                        >
                                                            <i
                                                                class="ri-printer-line label-icon align-middle fs-16 ms-2"
                                                            ></i>
                                                            Imprimir
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--end row-->
                    </div>
                </div>
            </div>
        </div>
        <!--end col-->
    </div>
</template>

<script>
import {
    getSigners,
    assingSigners,
    getSingersByProcedure,
    printPdf,
    notifySigners
} from "@/modules/senasag/services/firmaDigitalService"
import NotificationHelper from "@/helpers/notification"
export default {
    data() {
        return {
            mode: "prueba",
            firmanteSeleccionado: null,
            firmantesOpciones: [],
            firmantesOpcionesExtra: [],
            firmantes: [],
            incluirFirmaDigital: false,
            membrete: null
        }
    },
    methods: {
        agregar() {
            if (!this.firmanteSeleccionado) {
                alert("Debe seleccionar un firmante")
                return
            }
            const firmante = this.firmantesOpciones.find(
                (firmante) => this.firmanteSeleccionado === firmante.uuid
            )
            this.firmantesOpciones = this.firmantesOpciones.filter(
                (firmante) => firmante.uuid !== this.firmanteSeleccionado
            )
            const item = {
                uuid: firmante.uuid,
                nombre: `${firmante.first_name} ${firmante.last_name}`
            }
            this.firmantes.push(item)
            this.firmanteSeleccionado = null
        },
        quitar(uuid) {
            //const isSaved = this.firmantes.find((firmante) => uuid === firmante.uuid).id_firma_digital
            const firmante = this.firmantesOpcionesExtra.find((firmante) => firmante.uuid === uuid)
            this.firmantesOpciones.push(firmante)

            this.firmantes = this.firmantes.filter((firmante) => uuid !== firmante.uuid)
        },
        onChangeMode() {
            if (this.mode === "prueba") {
                this.incluirFirmaDigital = false
            }
        },
        incluirFirma() {
            this.incluirFirmaDigital = !this.incluirFirmaDigital
            this.membrete = "con-membrete"
        },
        async guardar() {
            await this.imprimir()
            const payloadFirmantes = this.firmantes.map((firmante, index) => ({
                sia_user: firmante.uuid,
                order: index + 1
            }))
            await assingSigners(this.$route.params.id_solicitud_tramite, payloadFirmantes)
            await notifySigners(this.$route.params.id_solicitud_tramite)
        },
        async imprimir() {
            const printUrl = `tramites/pdf/${this.$route.params.id_solicitud_tramite}/digital/${this.mode}/${this.membrete}`
            await printPdf(printUrl)
        },
        
    },
    mounted() {
        this.$emit("on:modePrintChanged", this.mode)
    },
    async beforeMount() {
        if (this.$route.params.id_solicitud_tramite) {
            const signersOptions = await getSigners(this.$route.params.id_solicitud_tramite)
            this.firmantesOpciones = signersOptions?.data || []
            this.firmantesOpcionesExtra = signersOptions.data || []
            const firmantes = await getSingersByProcedure(this.$route.params.id_solicitud_tramite)
            this.mode = !!firmantes.data.length ? "original": "prueba"
            this.incluirFirmaDigital = !!firmantes.data.length
            /*const cb = document.querySelector("#digitalSign")
            cb.checked = !!firmantes.data.length*/
            this.firmantes = firmantes.data.map((firmante) => ({
                uuid: firmante.sia_user.uuid,
                nombre: `${firmante.sia_user.first_name} ${firmante.sia_user.last_name}`,
                cargo: firmante.sia_user.sia.cargo,
                order: firmante.sia_user.order,
                firmado: firmante.firmado,
                id_firma_digital: firmante.id
            }))
        }
    },
    computed:{
        imprimirUrl() {
            const host = process.env.VUE_APP_PROD_URL
            const url = `${host}api/v1/tramites/pdf/${this.$route.params.id_solicitud_tramite}/digital/${this.mode}/${this.membrete}`
            console.log("imprimir url--->>>",url)
            return url
        }
    }
}
</script>
