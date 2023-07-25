<template>
  <PageHeader :title="title" :items="items" />
  <div class="row margen-contenido" v-if="isReady">
    <div class="col-lg col-xxl">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title mb-3">Solicitud</h4>
        </div>
        <div class="card-body">
          <div class="live-preview">
            <!-- <div class="card card-border-grey">
              <div class="card-header card-border-bottom-grey">
                <div class="row">
                  <div class="col-lg-10">
                    <h6 class="fs-15 mb-0">Datos</h6>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-lg col-xxl">
                    <h5 class="mb-3">DATOS DE PRE-SOLICITUD</h5>
                    <div class="mb-2">
                      <p>
                        <b>Objetivo de Trámite: </b>
                        {{ procedureData.objetivo_tramite }}
                      </p>
                      <p>
                        <b>Actividad de Empresa: </b>
                        {{ procedureData.detalle_actividad_empresa }}
                      </p>
                      <p><b>Tipo: </b> {{ accountType }}</p>
                      <p>
                        <b>Estado: </b>
                        <span :class="stateClassAccount">
                          <i
                            :class="stateIconAccount + ' fs-17 align-middle'"
                          ></i>
                          {{ procedureData.estado }}
                        </span>
                      </p>
                      <p><b>Fecha de Solicitud: </b> {{ dateFormat }}</p>
                    </div>
                  </div>
                  <div
                    class="col-lg col-xxl"
                    v-if="procedureData.empresa !== null"
                  >
                    <h5 class="mb-3">DATOS DE EMPRESA</h5>
                    <div class="mb-2">
                      <p>
                        <b>Razón Social: </b
                        >{{ procedureData.empresa.razon_social }}
                      </p>
                      <p><b>NIT: </b>{{ procedureData.empresa.nit }}</p>
                      <p>
                        <b>Descripción Actividad: </b
                        >{{ procedureData.empresa.descripcionactividad }}
                      </p>
                      <p>
                        <b>Correo Electrónico: </b
                        ><a :href="`mailto:${procedureData.empresa.correo}`">{{
                          procedureData.empresa.correo
                        }}</a>
                      </p>
                    </div>
                  </div>

                  <div
                    class="col-lg col-xxl"
                    v-if="procedureData.fid_sucursal !== null"
                  >
                    <h5 class="mb-3">DATOS DE LA SUCURSAL</h5>
                    <div class="mb-2">
                      <p>
                        <b>Nombre Sucursal: </b
                        >{{ procedureData.fid_sucursal.nombre_sucursal }}
                      </p>

                      <p>
                        <b>Correo Electrónico: </b
                        ><a
                          :href="`mailto:${procedureData.fid_sucursal.correoe}`"
                          >{{ procedureData.fid_sucursal.correoe }}</a
                        >
                      </p>
                      <p>
                        <b>Dirección: </b>
                        {{ procedureData.fid_sucursal.direccion }}
                      </p>
                      <p>
                        <b>Telefono/Celular: </b>
                        {{ procedureData.fid_sucursal.telefonos }} /
                        {{ procedureData.fid_sucursal.celular }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-4 text-center">
                  <router-link
                    :to="{ name: 'senasag.lista.solicitudes.tramite' }"
                    class="btn btn-success btn-label"
                  >
                    <i
                      class="ri-arrow-left-s-line label-icon align-middle fs-24 me-2"
                    ></i>
                    Regresar al listado
                  </router-link>
                </div>
              </div>
            </div> -->
            <div class="card card-border-grey">
              <div class="card-header card-border-bottom-grey">
                <div class="row">
                  <div class="col-lg-10">
                    <h6 class="fs-15 mb-0">Datos</h6>
                  </div>
                  <div class="col-lg">
                    <div class="d-flex flex-wrap gap-2">
                      <router-link
                        :to="{ name: 'senasag.lista.solicitudes.tramite' }"
                        class="btn btn-print btn-label"
                      >
                        <i
                          class="ri-arrow-left-s-line label-icon align-middle fs-24 me-2"
                        ></i>
                        Regresar al listado
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-6">
                    <h5 class="mb-3">DATOS DE LA EMPRESA</h5>
                    <div class="mb-2">
                      <p>
                        <b>Nombre de la empresa: </b>
                        {{ procedureData.empresa.razon_social }}
                      </p>
                      <p>
                        <b>Número de NIT: </b>
                        {{ procedureData.empresa.descripcionactividad }}
                      </p>
                      <p>
                        <b>Dirección de la empresa: </b
                        >{{ procedureData.empresa.direccion }}
                      </p>
                      <p>
                        <b>Correo electrónico de la empresa: </b>
                        {{ procedureData.empresa.correo }}
                      </p>
                      <p>
                        <b>Teléfono: </b>{{ procedureData.empresa.telefono }}
                      </p>
                      <p>
                        <b>Celular: </b> {{ procedureData.empresa.celular }}
                      </p>
                      <p>
                        <b>Página web: </b
                        >{{ procedureData.empresa.direccion_web }}
                      </p>
                      <p>
                        <b>Descripción de la actividad de la empresa: </b>
                        {{ procedureData.empresa.descripcionactividad }}
                      </p>
                      <p>
                        <b>Copia de NIT (adjunto):</b>
                        <a
                          :href="copiaNit?.ruta_url"
                          class="text-success px-1"
                          target="_blank"
                          v-if="copiaNit"
                          >Nit.pdf</a
                        >
                        <span v-else>No tiene</span>
                      </p>
                      <p class="fst-italic">
                        <a :href="copiaNit?.ruta_url" target="_blank">
                          Haga click en el enlace para ver el archivo
                        </a>
                      </p>
                      <p>
                        <b>Carta solicitud de acreditación empresa (adjunto):</b
                        ><a
                          :href="cartaSolicitud?.ruta_url"
                          class="text-success px-1"
                          target="_blank"
                          v-if="cartaSolicitud"
                          >carta.pdf</a
                        >
                        <span v-else>No tiene</span>
                      </p>
                      <p class="fst-italic">
                        <a :href="cartaSolicitud?.ruta_url" target="_blank">
                          Haga click en el enlace para ver el archivo
                        </a>
                      </p>
                    </div>
                  </div>
                  <div class="col-6">
                    <h5 class="mb-3">DATOS DE LA SUCURSAL</h5>
                    <div class="mb-2">
                      <p>
                        <b>Nombre de la Sucursal: </b>
                        {{ procedureData.fid_sucursal.nombre_sucursal }}
                      </p>
                      <p>
                        <b>Dirección: </b>
                        {{ procedureData.fid_sucursal.direccion }}
                      </p>
                      <p>
                        <b>Correo electrónico: </b>
                        {{ procedureData.fid_sucursal.correoe }}
                      </p>
                      <p>
                        <b>Telefono/Celular: </b>
                        {{ procedureData.fid_sucursal.telefonos }}
                        /
                        {{ procedureData.fid_sucursal.celular }}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div class="col-12">
                    <h5 class="mb-3">DATOS DE LA PRE-SOLICITUD</h5>
                    <div class="mb-2">
                      <p>
                        <b>Fecha de Solicitud:: </b
                        ><span>
                          {{
                            formatDateDMYYYYHHmm(procedureData.fecha_solicitud)
                          }}
                        </span>
                      </p>
                      <p>
                        <b>Estado: </b
                        ><span>
                          {{
                            statusPreRequestTexts[procedureData.estado]
                          }}</span
                        >
                      </p>
                      <p>
                        <b>Objetivo del Trámite: </b
                        ><span>{{ procedureData.objetivo_tramite }} </span>
                      </p>
                      <p>
                        <b>Descripción del trámite que desea: </b
                        ><span>
                          {{ procedureData.detalle_actividad_empresa }}
                        </span>
                      </p>
                      <p>
                        <b>Tipo de empresa: </b
                        ><span>{{ CompanyType[procedureData.tipo] }}</span>
                      </p>
                      <p>
                        <b>Trámite solicitado: </b
                        ><span>{{
                          procedures.find(
                            (p) => p.id == procedureData.tramite?.id
                          )?.titulo
                        }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-header card-border-bottom-grey">
                <div class="row">
                  <div class="col-lg-10">
                    <h6 class="fs-15 mb-0">
                      TIPO DE TRAMITE NUEVO O RENOVACION
                    </h6>
                  </div>
                  <div class="mb-2">
                    <Select2
                      v-if="formattedProcedures"
                      v-model="procedureData.tramite.id"
                      :options="formattedProcedures"
                      @change="myChangeEvent($event)"
                      @select="mySelectEvent($event)"
                      :settings="{ width: '100%', dropdownParent: idModal }"
                    />
                    <!-- <select
                      class="form-select mb-3"
                      aria-label="Default select example"
                      v-model="procedureData.tramite.id"
                    >
                      <option selected="" disabled="">
                        Seleccione el trámite o servicio correspondiente
                      </option>
                      <option
                        :value="procedure.id"
                        v-for="procedure in procedures"
                      >
                        ({{ procedure.fid_servicio }}) {{ procedure.titulo }}
                      </option>
                    </select> -->
                  </div>
                </div>
                <div class="mt-4 text-center">
                  {{}}
                  <button
                    @click="showApproveModal"
                    class="btn btn-success btn-label me-1"
                    v-if="
                      !['APROBADO', 'RECHAZADO'].includes(procedureData.estado)
                    "
                  >
                    <i
                      class="ri-chat-check-line label-icon align-middle fs-24 me-2"
                    ></i>
                    Aprobar inicio de nuevo trámite
                  </button>
                  <button
                    v-if="
                      !['APROBADO', 'RECHAZADO'].includes(procedureData.estado)
                    "
                    class="btn btn-danger btn-label"
                    @click="showRejectModal"
                  >
                    <i
                      class="ri-chat-delete-line label-icon align-middle fs-24 me-2"
                    ></i>
                    Rechazar
                  </button>
                  <a href="#" class="btn btn-info btn-label" v-if="false">
                    <i
                      class="ri-message-3-line label-icon align-middle fs-24 me-2"
                    ></i>
                    Comunicación
                  </a>
                </div>
              </div>

              <div class="card-header card-border-bottom-grey">
                <div class="row">
                  <div class="col-lg-10">
                    <h6 class="fs-15 mb-0">Trámites registrados</h6>
                  </div>
                  <div class="col-lg">
                    <div class="d-flex flex-wrap gap-2"></div>
                  </div>
                </div>
              </div>
              <div>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Id Padrón</th>
                      <th scope="col">Distrital</th>
                      <th scope="col">Rubro</th>
                      <th scope="col">Servicio</th>
                      <th scope="col">Trámite</th>
                      <th scope="col" width="100">Fecha de vencimiento</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="st in formattedSolicitudesTramite">
                      <td scope="row">{{ st.idpadron }}</td>
                      <td>
                        {{ st.distrital_name }}
                      </td>
                      <td>{{ st?.rubro_nombre }}</td>
                      <td>{{ st?.rubro_codigoservicio }}</td>
                      <td>
                        {{ st?.fid_tramite.titulo }}
                      </td>
                      <td>
                        <span
                          :class="{
                            'text-danger': olderThanNow(
                              calculateExpirationDate(
                                st.fecharegistro,
                                st.anosvalidez || 0
                              )
                            ),
                          }"
                        >
                          {{
                            calculateExpirationDate(
                              st.fecharegistro,
                              st.anosvalidez || 0
                            )
                          }}
                        </span>
                      </td>
                      <td>
                        <span
                          class="badge bg-success"
                          :class="[StatusColors[st.estado] ?? '']"
                          >{{ st.estado }}</span
                        >
                      </td>
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
                              class="btn btn-info dropdown-toggle"
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
                                <a class="dropdown-item" href="#"
                                  >Reestablecer. deshacer aprobación</a
                                >
                              </li>
                              <li>
                                <a class="dropdown-item" href="#"
                                  >Renovación de registro</a
                                >
                              </li>
                              <li>
                                <a class="dropdown-item" href="#"
                                  >Ingresar producto</a
                                >
                              </li>
                              <li>
                                <a class="dropdown-item" href="#"
                                  >Reimprimir certificado</a
                                >
                              </li>
                              <li>
                                <a class="dropdown-item" href="#"
                                  >Eliminar registro</a
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
      </div>
    </div>
  </div>
  <DeleteConfirmationModal
    @send-confirmation="confirmReject"
    :attrs="rejectData"
  />
  <ApproveConfirmationModal
    @send-confirmation="confirmApprove"
    :attrs="approveData"
  />
  <!--- messages -->
  <ErrorMessage
    :attrs="errorAttrs"
    @change-message-state="changeMessageState"
  />
  <SuccessMessage
    :attrs="successAttrs"
    @change-message-state="changeMessageState"
  />
  <!--- /messages -->
</template>

<script>
import PageHeader from "@/components/page-header";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import ApproveConfirmationModal from "@/components/pytiti/approve-confirmation-modal.vue";
import AccionesDetalle from "@/modules/senasag/components/solicitudes/presolicitudes/ActionsDetail.vue";

// services
import {
  approveRequestedProcedure,
  changeRequestedProcedure,
  getRequestedProcedure,
  rejectRequestedProcedure,
} from "@/services/tramites";
import { userIsAdmin } from "@/services/user";
import { getUserSessionRequest } from "@/helpers/senasag/user";
import { Modal } from "bootstrap";
import NotificationHelper from "@/helpers/notification";
import { getSucursalesTramite } from "@/modules/senasag/services/SucursalTramiteService";
import { mapActions, mapState } from "vuex";
import formatDatesMixin from "@/mixins/formatDatesMixin";
import { StatusColors, statusPreRequestTexts } from "@/constants/StatusColors";
import { CompanyType } from "@/constants/Company";

export default {
  name: "TramitePreSolicitudDetalle",
  mixins: [formatDatesMixin],
  components: {
    PageHeader,
    //
    ApproveConfirmationModal,
    DeleteConfirmationModal,
    AccionesDetalle,
  },
  data() {
    return {
      title: "Detalle Cuenta Empresa",
      items: [
        {
          text: "Senasag",
          href: "/",
        },
        {
          text: "Empresa",
          active: true,
        },
      ],
      //
      procedureData: {},
      procedureId: undefined,
      // modal-data
      rejectData: {
        id: "deleteRecordModal",
        title: "¿Estás seguro?",
        message: "Está seguro de rechazar éste registro",
        buttonText: "Sí, rechazar registro",
      },
      approveData: {
        id: "approveRecordModal",
        title: "Atención",
        message:
          "Esta a punto de ACEPTAR esta solicitud. Debe estar seguro de haber revisado los documentos ¿Desea confirmar?",
        buttonText: "Aceptar",
      },

      //
      userIsAdmin: userIsAdmin(),
      isReady: false,
      //
      hasFailed: false,
      hasSucceed: false,
      successAttrs: {
        title: undefined,
        message: undefined,
        show: false,
      },
      errorAttrs: {
        title: undefined,
        message: undefined,
        show: false,
      },
      selectedRequest: getUserSessionRequest(
        "solicitud_tramitador_seleccionado"
      ).id_solicitud_cuenta,
      selectedState: getUserSessionRequest("solicitud_tramitador_seleccionado")
        .estado,
      solicitudesTramite: [],
      StatusColors,
      statusPreRequestTexts,
      CompanyType,
    };
  },
  computed: {
    formattedSolicitudesTramite() {
      return this.solicitudesTramite.map((st) => {
        const rubro = this.rubros.find((r) => r.idrubro == st.idrubro);
        return {
          ...st,
          distrital_name: this.cities.find(
            (c) => c.id == st.fid_sucursal.iddistrital
          )?.nombre,
          rubro_nombre: rubro?.nombrerubro,
          rubro_codigoservicio: rubro?.codigoservicio,
        };
      });
    },
    formattedProcedures() {
      return this.procedures?.map((p) => ({
        id: p.id,
        text: `(${p.fid_servicio}) ${p.titulo}`,
      }));
    },
    ...mapState("tablasBase", ["cities", "rubros", "procedures"]),
    copiaNit() {
      return this.procedureData.empresa.documentos.find(
        (d) => d.nombre_documento == "copianit"
      );
    },
    cartaSolicitud() {
      return this.procedureData.empresa.documentos.find(
        (d) => d.nombre_documento == "cartasolicitud"
      );
    },
  },
  methods: {
    ...mapActions("tablasBase", ["fetchProcedures"]),
    showApproveModal() {
      this.modal = new Modal(`#${this.approveData.id}`);
      this.modal.show();
    },
    showRejectModal() {
      this.modal = new Modal(`#${this.rejectData.id}`);
      this.modal.show();
    },

    loadRequestedProcedure() {
      this.isReady = false;
      getRequestedProcedure(this.$route.params.requestId).then(
        (res) => {
          this.procedureData = res;
          getSucursalesTramite({
            fid_empresa: this.procedureData.empresa.id,
          }).then(({ ok, data }) => {
            if (!ok) return;
            this.solicitudesTramite = data.results;
            this.isReady = true;
          });
        },
        (err) => {
          console.error(err);
        }
      );
      this.fetchProcedures();
    },
    // async methods
    approveRequest() {
      approveRequestedProcedure(this.procedureData.id_pre_solicitud, {
        tramite: this.procedureData.tramite.id,
      }).then(({ ok }) => {
        if (!ok)
          return NotificationHelper.error(
            null,
            "Ocurrió un error al aprobar la solicitud"
          );
        NotificationHelper.success(
          null,
          "Su solicitud ha sido aceptada correctamente"
        );
        this.loadRequestedProcedure();
      });
    },
    rejectProcedure() {
      rejectRequestedProcedure(this.procedureData.id_pre_solicitud).then(
        ({ ok }) => {
          if (!ok)
            return NotificationHelper.error(
              null,
              "Ocurrió un error al rechazar la solicitud"
            );
          NotificationHelper.success(
            null,
            "Su rechazó de solicitud correctamente"
          );
          this.loadRequestedProcedure();
        }
      );
    },
    changeProcedure() {
      changeRequestedProcedure(this.selectedRequest, this.procedureId).then(
        (res) => {
          if (res.error) {
            this.isReady = false;
            this.errorAttrs.title = "Error para rechazar solicitud";
            this.errorAttrs.message =
              "Ocurrió un error al rechazar la solicitud";
            this.errorAttrs.show = true;
            setTimeout(() => {
              this.isReady = true;
            }, 500);
          } else {
            this.isReady = false;
            this.successAttrs.title = "Solicitud cambiada";
            this.successAttrs.message =
              "Su solicitud ha sido cambiada correctamente.";
            this.successAttrs.show = true;
            setTimeout(() => {
              this.isReady = true;
            }, 500);
          }
        },
        (err) => {
          this.hasFailed = false;
          if (err) {
            this.hasFailed = true;
          }
        }
      );
    },
    // emitted-events
    confirmApprove({ sent }) {
      if (sent === true) {
        this.approveRequest();
      }
    },
    confirmReject({ sent }) {
      if (sent === true) {
        this.rejectProcedure();
      }
    },
    confirmResend({ sent }) {
      if (sent === true) {
        this.changeProcedure();
      }
    },
    //
    representativeExists() {
      return !!this.procedureData.fid_persona_propietario;
    },
    selectPreRequest({ id_pre_solicitud, tramite }) {
      this.selectedRequest = id_pre_solicitud;
      this.procedureId = tramite;
    },
    changeMessageState({ show }) {
      this.successAttrs.show = show;
      this.errorAttrs.show = show;
    },
    //
    myChangeEvent(val) {
      console.log(val);
    },
    mySelectEvent({ id, text }) {
      console.log({ id, text });
    },
  },
  mounted() {
    this.loadRequestedProcedure();
  },
};
</script>

<style scoped>
.card-border-grey {
  border: 2px solid #e1e1e1;
}

.card-border-bottom-grey {
  border-bottom: 2px solid #e1e1e1;
}
</style>
