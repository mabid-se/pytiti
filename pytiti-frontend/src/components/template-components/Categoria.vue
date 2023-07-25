<template>
    <div class="d-flex mb-4">
        <div class="flex-grow-1">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <div class="card-header align-items-center d-flex-">
                            <h4 class="card-title mb-2 flex-grow-1">Clasificación de la empresa</h4>
                            <h5>
                                Esta sección le permitirá asignar servicios prestados al trámite
                                solicitado.
                            </h5>
                        </div>
                        <!-- end card header -->
                        <div class="card-body">
                            <div class="live-preview">
                                <div class="row gy-4">
                                    <div class="col-sm-12 col-lg-12 col-xxl-12">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="card mb-0">
                                                    <div class="card-body p-0">
                                                        <div
                                                            class="alert alert-info border-0 rounded-0 m-0 d-flex align-items-center"
                                                            role="alert"
                                                        >
                                                            <div class="flex-grow-1 text-truncate">
                                                                Descripción de la actividad de la
                                                                empresa o persona natural
                                                            </div>
                                                        </div>
                                                        <div class="row align-items-end">
                                                            <div class="col-sm-8">
                                                                <div class="p-3">
                                                                    <p class="fs-16 lh-base">
                                                                        {{
                                                                            solicitudTramiteInfo
                                                                                ? solicitudTramiteInfo
                                                                                      ?.fid_empresa
                                                                                      ?.descripcionactividad
                                                                                : ""
                                                                        }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="basiInputAyuda" class="form-text">
                                                    Tome en cuenta el texto escrito por la empresa
                                                    al momento de iniciar el trámite
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-lg-12 col-xxl-12">
                                        <div v-if="!!categoriaCombos.nivel_mercado?.show">
                                            <h5 class="card-title mb-2 flex-grow-1">
                                                Nivel de mercado
                                            </h5>
                                            <div class="mb-3">
                                                <select
                                                    class="form-select mb-0"
                                                    aria-label="Default select example"
                                                    v-model="nivelMercadoSelected"
                                                    v-if="!categoriaCombos.nivel_mercado?.isMulti"
                                                >
                                                    <option value="">--Seleccionar--</option>
                                                    <option
                                                        v-for="(option, index) of this
                                                            .nivelMercadoOpciones"
                                                        :value="option.value"
                                                        :key="index"
                                                    >
                                                        {{ option.label }}
                                                    </option>
                                                </select>
                                                <Multiselect
                                                    v-model="nivelMercadoSelected"
                                                    mode="tags"
                                                    :placeholder="'Seleccione los valores'"
                                                    :close-on-select="false"
                                                    :options="nivelMercadoOpciones"
                                                    v-if="categoriaCombos.nivel_mercado?.isMulti"
                                                />
                                                <div id="basiInputAyuda" class="form-text">
                                                    Seleccione el nivel de mercado.
                                                </div>
                                            </div>
                                        </div>

                                        <div v-if="!!categoriaCombos.linea_alimento?.show">
                                            <h5 class="card-title mb-2 flex-grow-1">
                                                Línea de alimento
                                            </h5>
                                            <div class="mb-3">
                                                <select
                                                    class="form-select mb-0"
                                                    aria-label="Default select example"
                                                    v-model="lineaAlimentoSelected"
                                                    v-if="!categoriaCombos.linea_alimento?.isMulti"
                                                >
                                                    <option value="">--Seleccionar--</option>
                                                    <option
                                                        v-for="(option, index) of this
                                                            .lineaAlimentoOpciones"
                                                        :key="index"
                                                        :value="option.value"
                                                    >
                                                        {{ option.label }}
                                                    </option>
                                                </select>
                                                <Multiselect
                                                    v-model="lineaAlimentoSelected"
                                                    mode="tags"
                                                    :placeholder="'Seleccione los valores'"
                                                    :close-on-select="false"
                                                    :options="lineaAlimentoOpciones"
                                                    v-if="categoriaCombos.linea_alimento?.isMulti"
                                                />
                                                <div id="basiInputAyuda" class="form-text">
                                                    Seleccione la ínea de alimento respectiva.
                                                </div>
                                            </div>
                                        </div>

                                        <div v-if="!!categoriaCombos.ambito?.show">
                                            <h5 class="card-title mb-2 flex-grow-1">Ámbito</h5>
                                            <div class="mb-3">
                                                <select
                                                    class="form-select mb-0"
                                                    aria-label="Default select example"
                                                    v-model="ambitoSelected"
                                                    v-if="!categoriaCombos.ambito?.isMulti"
                                                >
                                                    <option value="">--Seleccionar--</option>
                                                    <option
                                                        v-for="(option, index) of this
                                                            .ambitoOpciones"
                                                        :key="index"
                                                        :value="option.value"
                                                    >
                                                        {{ option.label }}
                                                    </option>
                                                </select>
                                                <Multiselect
                                                    v-model="ambitoSelected"
                                                    mode="tags"
                                                    :placeholder="'Seleccione los valores'"
                                                    :close-on-select="false"
                                                    :options="ambitoOpciones"
                                                    v-if="categoriaCombos.ambito?.isMulti"
                                                />
                                                <div id="basiInputAyuda" class="form-text">
                                                    Seleccione el ámbito de acción.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--end col-->
                                </div>
                                <!--end row-->
                            </div>
                        </div>
                    </div>
                </div>
                <!--end col-->
            </div>
            <!--end row-->
        </div>
    </div>
    <div class="mb-3">
        <div class="row">
            <div class="btn_cen">
                <button
                    type="button"
                    class="btn btn-guardar btn-label right mb-1"
                    @click="updateInfo"
                >
                    <i class="ri-save-line label-icon align-middle fs-16 ms-2"></i>
                    Guardar
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import Multiselect from "@vueform/multiselect"
import "@vueform/multiselect/themes/default.css"
import {getInfo} from "@/modules/senasag/services/PlantillaService"
import {
    getScopes,
    getMarketLevels,
    getProductTypes,
    getUpdateCategories
} from "@/services/categoria"
import NotificationHelper from "@/helpers/notification";

export default {
    components: {
        Multiselect
    },
    data() {
        return {
            categoriaCombos: {},
            solicitudTramiteInfo: null,
            ambitoOpciones: [],
            nivelMercadoOpciones: [],
            lineaAlimentoOpciones: [],
            nivelMercadoSelected: null,
            lineaAlimentoSelected: null,
            ambitoSelected: null
        }
    },
    methods: {
        async getNivelMercado() {
            const {results: nivelMercado} = await getMarketLevels()
            this.nivelMercadoOpciones = nivelMercado.map(({codigo_certificado, nivel}) => ({
                value: codigo_certificado,
                label: nivel
            }))
        },
        async getAmbito() {
            const {results: ambitos} = await getScopes()
            this.ambitoOpciones = ambitos.map(({codigo_certificado, ambito}) => ({
                value: codigo_certificado,
                label: ambito
            }))
        },
        async getLineaAlimento(unidad) {
            const {results: lineaAlimento} = await getProductTypes(unidad)
            this.lineaAlimentoOpciones = lineaAlimento.map(({nombreclase, idclase}) => ({
                value: idclase,
                label: nombreclase
            }))
        },
        async updateInfo() {
            let codigo_certificado = {}

            if (
                this.categoriaCombos?.nivel_mercado?.show &&
                this.nivelMercadoSelected &&
                this.nivelMercadoSelected.length
            ) {
                codigo_certificado.nivel_mercado = this.categoriaCombos?.nivel_mercado?.isMulti
                    ? Object.values(this.nivelMercadoSelected).join(",")
                    : this.nivelMercadoSelected
            }
            console.log("this.ambitoSelected*--->", this.ambitoSelected)
            if (
                this.categoriaCombos?.ambito?.show &&
                this.ambitoSelected &&
                this.ambitoSelected.length
            ) {
                codigo_certificado.ambito = this.categoriaCombos?.ambito?.isMulti
                    ? Object.values(this.ambitoSelected).join(",")
                    : this.ambitoSelected
            }
            if (
                this.categoriaCombos?.linea_alimento?.show &&
                this.lineaAlimentoSelected &&
                this.lineaAlimentoSelected.length
            ) {
                codigo_certificado.linea_alimento = this.categoriaCombos?.linea_alimento?.isMulti
                    ? Object.values(this.lineaAlimentoSelected).join(",")
                    : this.lineaAlimentoSelected
            }
            const payload = {
                codigo_certificado
            }
            await getUpdateCategories(this.$route.params.id_solicitud_tramite, payload)
            NotificationHelper.success("Se guardo las categorias correctamente.");
        }
    },
    async beforeMount() {
        this.getAmbito()
        this.getNivelMercado()
        if (this.$route.params.id_solicitud_tramite) {
            const {data: solicitudTramite} = await getInfo(
                this.$route.params.id_solicitud_tramite
            )
            this.getLineaAlimento(solicitudTramite.fid_tramite.unidad)
            this.categoriaCombos = solicitudTramite.fid_tramite.categoria_combos
            this.solicitudTramiteInfo = solicitudTramite
            if (this.categoriaCombos?.nivel_mercado?.show) {
                const value = this.categoriaCombos?.nivel_mercado?.isMulti
                    ? solicitudTramite.codigo_certificado?.nivel_mercado.split(",")
                    : solicitudTramite.codigo_certificado?.nivel_mercado
                this.nivelMercadoSelected = value
            }
            if (this.categoriaCombos?.ambito?.show) {
                const value = this.categoriaCombos?.ambito?.isMulti
                    ? solicitudTramite.codigo_certificado?.ambito?.split(",")
                    : solicitudTramite.codigo_certificado?.ambito
                this.ambitoSelected = value
            }
            if (this.categoriaCombos?.linea_alimento?.show) {
                const value = this.categoriaCombos?.linea_alimento?.isMulti
                    ? solicitudTramite.codigo_certificado?.linea_alimento.split(",")
                    : solicitudTramite.codigo_certificado?.linea_alimento
                this.lineaAlimentoSelected = value
            }
        }

        if (this.$route.query.id_solicitud_tramite) {
            this.solicitud_tramite_id = this.$route.query.id_solicitud_tramite
        }
    }
}
</script>
