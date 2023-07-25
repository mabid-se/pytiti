<template>
  <PageHeader :title="title" :items="items" />
  <div class="row margen-contenido">
    <div class="col-lg col-xxl">
      <div class="card">
        <div class="card-header">
          <h4 class="card-title mb-3">Solicitud</h4>
        </div>
        <div class="card-body mt-48">
          <Spinner :loading="loading">
            <div class="live-preview">
              <div class="card card-border-grey">
                <div class="card-header card-border-bottom-grey">
                  <div class="row">
                    <div class="col-lg-10">
                      <h6 class="fs-15 mb-0">Datos</h6>
                    </div>
                    <div class="col-lg">
                      <router-link
                        :to="{ name: 'senasag.lista.solicitudes.empresas' }"
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
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg col-xxl">
                      <h5 class="mb-3">DATOS DE LA EMPRESA</h5>
                      <div class="mb-2">
                        <p>
                          <b>Nombre de la empresa: </b>
                          {{ companyAccountRequest.emp_razonsocial }}
                        </p>
                        <p>
                          <b>Número de NIT: </b>
                          {{ companyAccountRequest.emp_nit }}
                        </p>
                        <p>
                          <b>Dirección de la empresa: </b>
                          {{ companyAccountRequest.emp_direccion }}
                        </p>
                        <p>
                          <b>Correo electrónico de la empresa: </b>
                          {{ companyAccountRequest.emp_correoe }}
                        </p>
                        <p>
                          <b>Teléfono: </b>
                          {{ companyAccountRequest.emp_telefonos }}
                        </p>
                        <p>
                          <b>Celular: </b>
                          {{ companyAccountRequest.emp_celular }}
                        </p>
                        <p>
                          <b>Página web: </b>
                          {{ companyAccountRequest.emp_direccionweb }}
                        </p>
                        <p>
                          <b>Descripción de la actividad de la empresa: </b>
                          {{ companyAccountRequest.emp_descripcionactividad }}
                        </p>
                        <p>
                          <b>Copia de NIT (adjunto):</b>
                          <a
                            :href="companyAccountRequest.emp_copianit"
                            class="text-success px-1"
                            target="_blank"
                            >Nit.pdf</a
                          >
                        </p>
                        <a
                          target="_blank"
                          :href="companyAccountRequest.emp_copianit"
                        >
                          <p class="fst-italic">
                            Haga click en el enlace para ver el archivo
                          </p></a
                        >
                        <p>
                          <b
                            >Carta solicitud de acreditación empresa
                            (adjunto):</b
                          >
                          <a
                            :href="companyAccountRequest.emp_cartasolicitud"
                            class="text-success px-1"
                            target="_blank"
                            >carta.pdf</a
                          >
                        </p>
                        <a
                          target="_blank"
                          :href="companyAccountRequest.emp_cartasolicitud"
                        >
                          <p class="fst-italic">
                            Haga click en el enlace para ver el archivo
                          </p></a
                        >
                      </div>
                    </div>
                    <div class="col-lg col-xxl">
                      <h5 class="mb-3">DATOS DEL REPRESENTANTE LEGAL</h5>
                      <div class="mb-2">
                        <p>
                          <b>Nombre del representante legal: </b>
                          <span>{{ companyAccountRequest.per_nombres }}</span>
                        </p>
                        <p>
                          <b>Apellidos del representante legal: </b>
                          <span
                            >{{ companyAccountRequest.per_apellido_paterno }}
                            {{
                              companyAccountRequest.per_apellido_materno
                            }}</span
                          >
                        </p>
                        <p>
                          <b>Número de CI: </b>
                          <span>{{ companyAccountRequest.per_idcarnet }} </span>
                        </p>

                        <p>
                          <b>Fecha de nacimiento: </b>
                          <span>{{ companyAccountRequest.per_fechanac }} </span>
                        </p>
                        <p>
                          <b>Correo electrónico del representatnte: </b>
                          <span>{{ companyAccountRequest.per_correoe }}</span>
                        </p>

                        <p>
                          <b>Dirección: </b>
                          <span>{{ companyAccountRequest.per_direccion }}</span>
                        </p>

                        <p>
                          <b>Teléfono: </b>
                          <span>{{ companyAccountRequest.per_telefonos }}</span>
                        </p>

                        <p>
                          <b>Copia poder de representante legal (adjunto):</b>
                          <a
                            v-if="companyAccountRequest.per_copia_cartapoder"
                            :href="companyAccountRequest.per_copia_cartapoder"
                            class="text-success px-1"
                            target="_blank"
                            >poder.pdf</a
                          >
                          <span v-else> No se envió</span>
                        </p>
                        <a
                          target="_blank"
                          :href="companyAccountRequest.per_copia_cartapoder"
                        >
                          <p
                            v-if="companyAccountRequest.per_copia_cartapoder"
                            class="fst-italic"
                          >
                            Haga click en el enlace para ver el archivo
                          </p>
                        </a>
                        <p>
                          <b>Copia de CI (adjunto):</b>
                          <a
                            :href="companyAccountRequest.per_copiaci"
                            class="text-success px-1"
                            target="_blank"
                            >ci.pdf</a
                          >
                        </p>
                        <a
                          target="_blank"
                          :href="companyAccountRequest.per_copiaci"
                        >
                          <p class="fst-italic">
                            Haga click en el enlace para ver el archivo
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg col-xxl">
                      <MapReadField
                        v-if="
                          companyAccountRequest.emp_latitud &&
                          companyAccountRequest.emp_longitud
                        "
                        :field="{
                          label: 'Ubicación',
                          type_field: 'map',
                          id: 'ubicacion',
                          value: `${companyAccountRequest.emp_longitud},${companyAccountRequest.emp_latitud}`,
                        }"
                      />
                    </div>
                  </div>

                  <h5 class="mb-3">Registros - Servicios</h5>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Id Padrón</th>
                        <th scope="col">Distrital</th>
                        <th scope="col">Rubro</th>
                        <th scope="col">Cod. Servicio</th>
                        <th scope="col">Servicio</th>
                        <th scope="col">NIT/Carnet</th>
                        <th scope="col">Validez</th>
                        <th scope="col">Fecha de vencimiento</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="st in formattedSolicitudesTramite">
                        <td>{{ st.idpadron }}</td>
                        <td>
                          {{
                            cities.find(
                              (c) => c.id == st.sucursal_tramite.iddistrital
                            )?.nombre
                          }}
                        </td>
                        <td>
                          {{ st.rubro_nombre }}
                        </td>
                        <td>
                          {{ st.rubro_codigoservicio }}
                        </td>
                        <td>
                          {{ st.tramite_titulo }}
                        </td>
                        <td>
                          {{
                            hasNit
                              ? st.sucursal_tramite.nit
                              : st.fid_empresa?.fid_persona_propietario
                                  ?.idcarnet
                          }}
                        </td>
                        <td>{{ st.anosvalidez }}</td>
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
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="mt-4 text-center" data-v-18fcbbc4="">
              <a
                class="btn btn-success btn-label me-1"
                @click="showApproveModal"
                v-if="
                  !['APROBADO', 'RECHAZADO'].includes(
                    companyAccountRequest.estado
                  )
                "
              >
                <i
                  class="ri-chat-check-line label-icon align-middle fs-24 me-2"
                  data-v-18fcbbc4=""
                ></i>
                Aprobar cuenta / Asignar
              </a>
              <button
                class="btn btn-danger btn-label"
                @click="showRejectModal"
                v-if="
                  !['APROBADO', 'RECHAZADO'].includes(
                    companyAccountRequest.estado
                  )
                "
              >
                <i
                  class="ri-chat-delete-line label-icon align-middle fs-24 me-2"
                ></i>
                Rechazar
              </button>
              <a
                v-if="false"
                href="/senasag/solicitudes/empresa/"
                class="btn btn-info btn-label"
                data-v-18fcbbc4=""
              >
                <i
                  class="ri-message-3-line label-icon align-middle fs-24 me-2"
                  data-v-18fcbbc4=""
                ></i>
                Comunicación
              </a>
            </div>
          </Spinner>
        </div>
      </div>
    </div>
  </div>
  <EmailConfirmationModal
    @send-confirmation="resendEmail"
    :attrs="confirmResendEmail"
  />
  <DeleteConfirmationModal
    @send-confirmation="confirmReject"
    :attrs="rejectData"
  />
  <ApproveConfirmationModal
    @send-confirmation="confirmApprove"
    :attrs="approveData"
  />
</template>

<script>
import { mapState } from "vuex";

import PageHeader from "@/components/page-header";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import ApproveConfirmationModal from "@/components/pytiti/approve-confirmation-modal.vue";
import EmailConfirmationModal from "@/components/pytiti/email-confirmation.vue";
import MapReadField from "@/components/senasag-forms/form-fields/map-read-field.vue";
import Spinner from "@/components/widgets/spinner";
import ActionsDetail from "@/modules/senasag/components/solicitudes/company/ActionsDetail.vue";
import {
  getCompanyRequestAccount,
  answerCompanyAccountRequest,
  resendEmailPassword,
} from "@/modules/senasag/services/SolicitudesService";
import { Modal } from "bootstrap";

import { userIsAdmin } from "@/services/user";
import NotificationHelper from "@/helpers/notification";

import { filterSucursalTramiteByNitOrCi } from "@/modules/senasag/services/SucursalTramiteService";
import formatDatesMixin from "@/mixins/formatDatesMixin";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "EmpresaDetalle",
  mixins: [formatDatesMixin],
  components: {
    PageHeader,
    ApproveConfirmationModal,
    DeleteConfirmationModal,
    EmailConfirmationModal,
    MapReadField,
    Spinner,
    ActionsDetail,
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
      companyData: {},
      companyAccountRequest: {},
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
      confirmResendEmail: {
        id: "confirmResendEmail",
        title: "Atención",
        message:
          "Esta a punto de REENVIAR el email de configuración de contraseña ¿Desea confirmar?",
        buttonText: "Aceptar",
        buttonReject: "Cancelar",
      },
      userIsAdmin: userIsAdmin(),
      isReady: false,
      // errors
      hasFailed: false,
      hasSucceed: false,
      successAttrs: {
        title: undefined,
        message: undefined,
      },
      errorAttrs: {
        title: undefined,
        message: undefined,
      },
      loading: true,
      sucursalesTramite: [],
    };
  },
  mounted() {
    this.loadCompanyAccountRequest();
    this.fetchProcedures();
  },
  methods: {
    showApproveModal() {
      this.modal = new Modal(`#${this.approveData.id}`);
      this.modal.show();
    },
    showRejectModal() {
      this.modal = new Modal(`#${this.rejectData.id}`);
      this.modal.show();
    },
    showResendEmailModal() {
      this.modal = new Modal(`#${this.confirmResendEmail.id}`);
      this.modal.show();
    },
    loadCompanyAccountRequest() {
      getCompanyRequestAccount(this.$route.params.id_solicitud_cuenta).then(
        ({ ok, data }) => {
          if (!ok)
            return NotificationHelper.error(
              null,
              "Error al cargar la solicitud de cuenta de empresa."
            );
          this.companyAccountRequest = data;
          const queryString = {};
          if (this.hasNit) {
            queryString.nit = this.companyAccountRequest.emp_nit;
          } else {
            queryString.carnet = this.companyAccountRequest.per_idcarnet;
          }
          filterSucursalTramiteByNitOrCi(queryString).then(({ ok, data }) => {
            if (!ok)
              return NotificationHelper.error(
                null,
                "Error al cargar la solicitud de cuenta de empresa."
              );

            const s = new Set(data.results.map((p) => p.idpadron));
            let uniqueIdpadrones = [...s];

            const uniques = uniqueIdpadrones.map((ip) =>
              data.results.find((p) => p.idpadron === ip)
            );

            this.sucursalesTramite = uniques;
            this.loading = false;
          });
          // this.loading = false;
        }
      );
    },
    // async methods
    approveCompany() {
      answerCompanyAccountRequest(this.$route.params.id_solicitud_cuenta, {
        estado: "APROBADO",
      }).then(({ ok }) => {
        if (!ok)
          return NotificationHelper.error(null, "Error al aprobar solicitud.");
        NotificationHelper.success(null, "Solicitud aprobada exitosamente");
        this.loadCompanyAccountRequest();
      });
    },

    rejectAccountRequest() {
      answerCompanyAccountRequest(this.$route.params.id_solicitud_cuenta, {
        estado: "RECHAZADO",
      }).then(({ ok }) => {
        if (!ok)
          return NotificationHelper.error(null, "Error al rechazar solicitud.");
        NotificationHelper.success(null, "Solicitud rechazada exitosamente");
        this.loadCompanyAccountRequest();
      });
    },
    resendEmail() {
      resendEmailPassword(this.$route.params.id_solicitud_cuenta).then(
        ({ ok }) => {
          if (!ok)
            return NotificationHelper.error(null, "Error al reenviar email.");
          NotificationHelper.success(null, "Email reenviado exitosamente");
          this.loadCompanyAccountRequest();
        }
      );
    },

    // emitted events
    confirmApprove({ sent }) {
      if (sent === true) {
        this.approveCompany();
      }
    },
    confirmReject({ sent }) {
      if (sent === true) {
        this.rejectAccountRequest();
      }
    },
    confirmResend({ sent }) {
      if (sent === true) {
        this.resendEmail();
      }
    },
    //
    representativeExists() {
      return !!this.companyAccountRequest.emp_fid_persona_propietario;
    },
    ...mapActions("tablasBase", ["fetchProcedures"]),
  },
  computed: {
    ...mapState("tablasBase", ["cities", "rubros", "procedures"]),
    hasNit() {
      return !!this.companyAccountRequest.emp_nit;
    },
    formattedSolicitudesTramite() {
      return this.sucursalesTramite
        .map(({ solicitudes_tramite, ...rest }) => {
          return solicitudes_tramite.map((solicitud_tramite) => {
            const rubro = this.rubros.find(
              (r) => r.idrubro == solicitud_tramite.idrubro
            );
            const procedure = this.procedures.find(
              (p) => p.fid_servicio == rubro?.codigoservicio
            );
            return {
              ...solicitud_tramite,
              sucursal_tramite: rest,
              rubro_nombre: rubro?.nombrerubro,
              rubro_codigoservicio: rubro?.codigoservicio,
              tramite_titulo: procedure?.titulo,
            };
          });
        })
        .flat();
    },
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
