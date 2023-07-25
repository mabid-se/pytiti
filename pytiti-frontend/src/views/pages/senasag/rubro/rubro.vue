<template>
    <Layout>
        <div class="d-flex mb-4">
            <div class="flex-grow-1">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header align-items-center d-flex-">
                                <h4 class="card-title mb-2 flex-grow-1">
                                    Clasificación de la empresa
                                </h4>
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
                                                                <div
                                                                    class="flex-grow-1 text-truncate"
                                                                >
                                                                    Descripción de la actividad de
                                                                    la empresa o persona natural
                                                                </div>
                                                            </div>
                                                            <div class="row align-items-end">
                                                                <div class="col-sm-8">
                                                                    <div class="p-3">
                                                                        <p class="fs-16 lh-base">
                                                                            {{
                                                                                empresaInfo
                                                                                    ? empresaInfo
                                                                                          ?.data
                                                                                          ?.razonsocial
                                                                                    : ""
                                                                            }}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="basiInputAyuda" class="form-text">
                                                        Tome en cuenta el texto escrito por la
                                                        empresa al momento de iniciar el trámite
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12 col-lg-12 col-xxl-12">
                                            <h4 class="card-title mb-2 flex-grow-1">
                                                Tasa y rubro
                                            </h4>
                                            <div class="mb-3">
                                                <select
                                                    class="form-select mb-0"
                                                    v-model="tramiteSeleccionado"
                                                    @change="filtrarServicios($event.target.value)"
                                                >
                                                    <option
                                                        v-for="(option, index) of tramitesOpciones"
                                                        :value="option.id"
                                                        :key="index"
                                                    >
                                                        {{ option.titulo }}
                                                    </option>
                                                </select>
                                                <div id="basiInputAyuda" class="form-text">
                                                    Seleccione el trámite adecuado.
                                                </div>
                                            </div>
                                            <div>
                                                <select
                                                    class="form-select mb-0"
                                                    v-model="rubroSeleccionado"
                                                >
                                                    <option
                                                        v-for="(option, index) of rubroOpciones"
                                                        :value="option.id_rubros"
                                                        :key="index"
                                                    >
                                                        {{ option.nombrerubro }}
                                                    </option>
                                                </select>
                                                <div id="basiInputAyuda" class="form-text">
                                                    Seleccione el rubro adecuado.
                                                </div>
                                            </div>
                                            <div class="col-12">
                                                <div class="derecha">
                                                    <!-- try to send -->
                                                    <button
                                                        type="button"
                                                        class="btn btn-success btn-label right"
                                                        @click="agregar"
                                                    >
                                                        <i
                                                            class="ri-file-edit-line label-icon align-middle fs-16 ms-2"
                                                        ></i>
                                                        Agregar código de tasa
                                                    </button>
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

                <div class="col-12">
                    <div class="table-responsive mt-4 mt-xl-0">
                        <table
                            class="table table-success table-striped table-nowrap- align-middle mb-0"
                        >
                            <thead>
                                <tr>
                                    <th scope="col">N°</th>
                                    <th scope="col">Código de tasa</th>
                                    <th scope="col">Trámite</th>
                                    <th scope="col">Rubro</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(servicio, index) of this.seleccionados" :key="index">
                                    <td class="fw-medium">{{ index + 1 }}</td>
                                    <td>{{ servicio.codigoTasa }}</td>
                                    <td>
                                        {{ servicio.tramite }}
                                    </td>
                                    <td>{{ servicio.rubro }}</td>
                                    <td>
                                        <div
                                            class="btn-group"
                                            role="group"
                                            aria-label="Button group with nested dropdown"
                                        >
                                            <div class="btn-group" role="group">
                                                <button
                                                    id="btnGroupDrop1"
                                                    type="button"
                                                    variant="primary"
                                                    class="btn btn-info btn-md dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    Opciones
                                                </button>
                                                <ul
                                                    class="dropdown-menu"
                                                    aria-labelledby="btnGroupDrop1"
                                                    style=""
                                                >
                                                    <li>
                                                        <a
                                                            class="dropdown-item"
                                                            href="#"
                                                            @click="editar(servicio.id_rubro)"
                                                            >Editar</a
                                                        >
                                                    </li>
                                                    <li>
                                                        <a
                                                            class="dropdown-item"
                                                            href="#"
                                                            @click="eliminar(servicio.id_rubro)"
                                                            >Eliminar</a
                                                        >
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="mb-3">
            <div class="row">
                <div class="col btn_izq">
                    <button type="button" class="btn btn-navega btn-label rounded-pill" disabled>
                        <i
                            class="ri-arrow-left-s-line label-icon align-middle rounded-pill fs-16 me-2"
                        ></i>
                        Anterior
                    </button>
                </div>
                <div class="col-6 col-sm-4 btn_cen">
                    <button
                        type="button"
                        class="btn btn-guardar btn-label right mb-1"
                        @click="guardar"
                    >
                        <i class="ri-save-line label-icon align-middle fs-16 ms-2"></i> Guardar
                    </button>
                    <button type="button" class="btn btn-print btn-label right mb-1">
                        <i class="ri-printer-line label-icon align-middle fs-16 ms-2"></i> Imprimir
                    </button>
                </div>
                <div class="col btn_der">
                    <button type="button" class="btn btn-navega btn-label right rounded-pill">
                        <i
                            class="ri-arrow-right-s-line label-icon align-middle rounded-pill fs-16 ms-2"
                        ></i>
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    </Layout>
</template>
<script>
import Layout from "../../../../layouts/main.vue"
import PageHeader from "@/components/page-header"
import appConfig from "../../../../../app.config"
import {getProceduresList} from "@/services/tramites"
import {getRubrosByTramite, registerServices} from "@/services/rubros"
import {getProcedureTemplateForAdmin} from "@/services/plantilla"

export default {
    page: {
        title: "Liquidador",
        meta: [{name: "description", content: appConfig.description}]
    },
    data() {
        return {
            tramitesOpciones: [],
            tramitesOpcionesExtra: [],
            rubroOpciones: [],
            rubroOpcionesExtra: [],
            seleccionados: [],
            tramiteSeleccionado: null,
            rubroSeleccionado: null,
            empresaInfo: {},
            solicitud_tramite_id: null
        }
    },
    name: "Widgets",
    components: {
        Layout,
        PageHeader
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {
        async getTramites() {
            const {results} = await getProceduresList()
            const tramites = results.filter((tramite) => tramite.fid_servicio)
            this.tramitesOpciones = tramites
            this.tramitesOpcionesExtra = tramites
        },
        async filtrarServicios(value) {
            const tramite = this.tramitesOpciones.find((tramite) => tramite.id === value)
            const {results} = await getRubrosByTramite(tramite.fid_servicio)
            this.rubroOpciones = results
        },
        agregar() {
            if (!this.tramiteSeleccionado && !this.rubroSeleccionado) {
                alert("Debe seleccionar un tramite y un rubro")
                return
            }
            const tramite = this.tramitesOpciones.find(
                (tramite) => tramite.id === this.tramiteSeleccionado
            )
            const rubro = this.rubroOpciones.find(
                (rubro) => rubro.id_rubros === this.rubroSeleccionado
            )

            this.tramitesOpciones = this.tramitesOpciones.filter(
                (tramite) => tramite.id !== this.tramiteSeleccionado
            )
            this.rubroOpciones = this.tramitesOpciones.filter(
                (rubro) => rubro.id_rubros !== this.rubroSeleccionado
            )
            const item = {
                codigoTasa: rubro.codigoservicio,
                tramite: tramite.titulo,
                rubro: rubro.nombrerubro,
                id_rubro: rubro.id_rubros,
                tramiteSeleccionado: this.tramiteSeleccionado,
                rubroSeleccionado: this.rubroSeleccionado
            }
            this.seleccionados.push(item)
            this.tramiteSeleccionado = null
            this.rubroSeleccionado = null
        },
        async editar(id_rubro) {
            const editarData = this.seleccionados.find((item) => item.id_rubro === id_rubro)
            this.tramitesOpciones.push(
                this.tramitesOpcionesExtra.find(
                    (tramite) => tramite.id === editarData.tramiteSeleccionado
                )
            )
            this.tramiteSeleccionado = editarData.tramiteSeleccionado

            await this.filtrarServicios(editarData.tramiteSeleccionado)
            this.rubroSeleccionado = editarData.rubroSeleccionado
            this.seleccionados = this.seleccionados.filter((item) => item.id_rubro !== id_rubro)
        },
        eliminar(id_rubro) {
            this.seleccionados = this.seleccionados.filter((item) => item.id_rubro !== id_rubro)
        },
        async guardar() {
            const payload = this.seleccionados.map((item) => ({
                solicitud_tramite_id: this.solicitud_tramite_id,
                rubros_id: item.rubroSeleccionado
            }))
            await registerServices(payload)
            alert("se guardo los servicios correctamente")
        },
        filterSelectedTramites(id) {
            console.log("id-->>", id)
            console.log("this.seleccionados-ss->>", this.seleccionados)
            return !this.seleccionados.find((item) => item && item?.tramiteSeleccionado === id)
        }
    },
    async beforeMount() {
        await this.getTramites()
        console.log(this.$route.query.id_solicitud_tramite)
        if (this.$route.query.id_solicitud_tramite) {
            this.solicitud_tramite_id = this.$route.query.id_solicitud_tramite
            /*const sucursal = await getProcedureTemplateForAdmin(this.$route.query.id_solicitud_tramite)
            this.empresaInfo = sucursal
            console.log("this.empresaInfo--->>>", this.empresaInfo.data)*/
        }
    }
}
</script>
