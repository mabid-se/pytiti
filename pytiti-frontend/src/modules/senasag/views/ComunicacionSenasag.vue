<template>
  <PageHeader :title="title" :items="items" :description="description" />

  <div class="row margen-contenido">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body card-background-none">
          <div class="row">
            <div class="col-lg-8 col-xxl-9">
              <div
                class="card-header align-items-center d-flex-no color-cabecera"
              >
                <div class="titulo">
                  <h6 class="card-title mb-0 flex-grow-1">
                    <i class="ri-honour-line icon-grande2"></i> Comunicación
                    interna y externa
                  </h6>
                </div>
              </div>
              <!-- end card header -->

              <div class="row">
                <div class="col-lg-12 col-xxl-12">
                  <div class="tab-content text-muted mt-3 mt-lg-0">
                    <div
                      class="tab-pane fade active show"
                      id="custom-v-pills-profile"
                      role="tabpanel"
                      aria-labelledby="custom-v-pills-home-tab"
                    >
                      <div class="d-flex mb-4">
                        <div class="flex-grow-1">
                          <div class="row">
                            <div class="col-lg-12">
                              <div class="card">
                                <div
                                  class="card-header align-items-center d-flex"
                                >
                                  <h4 class="card-title mb-0 flex-grow-1">
                                    Formulario de comunicación
                                  </h4>
                                </div>
                                <!-- end card header -->
                                <div class="card-body">
                                  <div class="live-preview">
                                    <!-- Nav tabs -->
                                    <ul
                                      class="nav nav-pills animation-nav nav-justified gap-2 mb-3"
                                      role="tablist"
                                    >
                                      <li
                                        class="nav-item waves-effect waves-light"
                                      >
                                        <a
                                          class="nav-link active"
                                          data-bs-toggle="tab"
                                          data-type="external"
                                          href="#interna"
                                          role="tab"
                                          aria-selected="true"
                                        >
                                          Comunicación externa con el
                                          solicitante
                                        </a>
                                      </li>
                                      <li
                                        class="nav-item waves-effect waves-light"
                                      >
                                        <a
                                          class="nav-link"
                                          data-bs-toggle="tab"
                                          data-type="internal"
                                          href="#externa"
                                          role="tab"
                                          aria-selected="false"
                                        >
                                          Comunicación interna del SENASAG
                                        </a>
                                      </li>
                                    </ul>
                                    <div class="tab-content text-muted">
                                      <div
                                        class="tab-pane active"
                                        id="interna"
                                        role="tabpanel"
                                      >
                                        <div class="row gy-4">
                                          <div
                                            class="col-sm-12 col-lg-12 col-xxl-12"
                                          >
                                            <ComunicationCardExternal
                                              v-for="communication in communications"
                                              :key="communication.id"
                                              :communication="communication"
                                              :company="company"
                                              is-admin
                                            ></ComunicationCardExternal>
                                          </div>
                                          <!--end col-->
                                        </div>
                                        <CommentBoxSenasag
                                          type="external"
                                          @on:submitted="
                                            communications.unshift($event)
                                          "
                                        ></CommentBoxSenasag>
                                      </div>
                                      <div
                                        class="tab-pane"
                                        id="externa"
                                        role="tabpanel"
                                      >
                                        <div class="row gy-4">
                                          <div
                                            class="col-sm-12 col-lg-12 col-xxl-12"
                                          >
                                            <ComunicationCardInternal
                                              v-for="communication in internalCommunications"
                                              :key="communication.id"
                                              :communication="communication"
                                              :company="company"
                                            ></ComunicationCardInternal>
                                          </div>
                                        </div>
                                        <CommentBoxSenasag
                                          hide-checkbox
                                          type="internal"
                                          :options="communicationUsers"
                                          @on:submitted="
                                            internalCommunications.unshift(
                                              $event
                                            )
                                          "
                                        ></CommentBoxSenasag>
                                      </div>
                                    </div>
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
                          <div class="col btn_izq"></div>
                          <div class="col-6 col-sm-4 btn_cen"></div>
                          <div class="col btn_der"></div>
                        </div>
                      </div>
                    </div>
                    <!--end tab-pane-->
                  </div>
                </div>
                <!-- end col-->
              </div>
            </div>

            <div class="col-lg-4 col-xxl-3">
              <!--<div class="card_top">
                                                <div class="derecha enviar">
                                                    <button type="button" class="btn btn-enviar btn-label right ancho"><i
                                                            class="ri-file-edit-line label-icon align-middle fs-16 ms-2"></i>
                                                            Enviar al SENASAG</button>
                                                </div>                                                
                                            </div>-->
              <div class="card2 comunicacion2">
                <div class="card-body2">
                  <div
                    class="card-header align-items-center d-flex-no color-cabecera2"
                  >
                    <div class="titulo">
                      <h6 class="card-title mb-0 flex-grow-1">
                        <i class="ri-chat-settings-line icon-grande2"></i>
                        Información y Observaciones
                      </h6>
                    </div>
                  </div>
                  <!-- end card header -->

                  <!-- <div class="mt-1">
                    <a
                      href="#"
                      role="button"
                      class="btn btn-observar right ancho"
                      ><i
                        class="bx bxs-bell label-icon align-middle fs-16 ms-2"
                      ></i>
                      Realizar observaciones</a
                    >
                  </div>
                  <div class="mt-1">
                    <a
                      href="#"
                      role="button"
                      class="btn btn-responder right ancho"
                      ><i
                        class="bx bxs-bell label-icon align-middle fs-16 ms-2"
                      ></i>
                      Ver respuestas y realizar observaciones</a
                    >
                  </div> -->

                  <div class="margen-top">
                    <div class="d-flex- flex-wrap gap-2 fs-16">
                      <div
                        class="accordion custom-accordionwithicon custom-accordion-border accordion-border-box accordion-success"
                        id="accordionBordered"
                      >
                        <div class="accordion-item">
                          <h2
                            class="accordion-header"
                            id="accordionborderedExample1"
                          >
                            <button
                              class="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#accor_borderedExamplecollapse1"
                              aria-expanded="true"
                              aria-controls="accor_borderedExamplecollapse1"
                            >
                              Verificación externa
                            </button>
                          </h2>
                          <div
                            id="accor_borderedExamplecollapse1"
                            class="accordion-collapse collapse show"
                            aria-labelledby="accordionborderedExample1"
                            data-bs-parent="#accordionBordered"
                          >
                            <div class="accordion-body">
                              <!--SEPREC-->
                              <strong>VERIFICACIÓN SEPREC</strong><br />
                              <br />
                              <strong>EMPRESA ARGUS SA.</strong><br />
                              <strong>NIT: </strong>3433535<br />
                              <strong>MATRÍCULA: </strong>SDFSDSFDSDF<br />
                              <strong>ESTADO: </strong>VIGENTE<br />
                              <!--SEGIP-->
                              <strong>VERIFICACIÓN SEGIP</strong><br />
                              <br />
                              <strong>FERNANDO PEREZ</strong><br />
                              <strong>CI: </strong>3433535<br />
                              <!--IMPUESTOS-->
                              <strong>VERIFICACIÓN IMPUESTOS NACIONALES</strong
                              ><br />
                              <br />
                              <strong>EMPRESA ARGUS SA.</strong><br />
                              <strong>NIT: </strong>3433535<br />
                              <strong>ESTADO: </strong>VIGENTE<br />
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h2
                            class="accordion-header"
                            id="accordionborderedExample2"
                          >
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#accor_borderedExamplecollapse2"
                              aria-expanded="false"
                              aria-controls="accor_borderedExamplecollapse2"
                            >
                              Verificación interna
                            </button>
                          </h2>
                          <div
                            id="accor_borderedExamplecollapse2"
                            class="accordion-collapse collapse"
                            aria-labelledby="accordionborderedExample2"
                            data-bs-parent="#accordionBordered"
                          >
                            <div class="accordion-body">
                              <p>El responsable no trabaja en otra empresa.</p>
                              <p class="danger">
                                El responsable trabaja en otra empresa.
                              </p>
                              <p>
                                Notifique al solicitante
                                <a href="#">AQUÍ</a> para que cambie de
                                responsable.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- end card body -->
              </div>
              <!-- end card -->
            </div>
          </div>
        </div>
        <!-- end card-body -->
      </div>
      <!-- end card -->
    </div>
  </div>
</template>
<script>
import { StatusRequestProcedure } from "@/constants/SolicitudTramite";
import PageHeader from "@/components/page-header";

import "prismjs";
import "prismjs/themes/prism.css";

// services
import { saveComponentInfo } from "@/services/plantilla";

import {
  deleteTemplateProcedure,
  getStartedTemplate,
  getComponentFieldsTemplate,
  getGridData,
  deleteEntity,
  updateEntity,
} from "@/modules/empresa/services/PlantillaService";
import { sendProcedureToSenasag } from "@/services/tramites";

import SenasagForms from "@/components/senasag-forms";

import NotificationHelper from "@/helpers/notification";

import useVuelidate from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";

import { userData } from "@/services/user";
import { mapGetters } from "vuex";
import { getCommunications } from "@/modules/empresa/services/ComunicacionService";
import {
  getCommunications as getInternalCommunications,
  getCommunicationUsers,
} from "@/modules/senasag/services/ComunicacionService";
import ComunicationCardExternal from "@/components/widgets/ComunicationCardExternal.vue";

import CommentBoxSenasag from "@/components/widgets/CommentBoxSenasag.vue";
import ComunicationCardInternal from "@/components/widgets/ComunicationCardInternal.vue";

export default {
  name: "ComunicacionEmpresa",

  data() {
    return {
      title: "Trámites",
      description: "",
      items: [
        {
          text: "Trámites",
          href: "/",
        },
        {
          text: "Vista Previa Plantilla",
          active: true,
        },
      ],
      // procedure-data
      currentComponent: null,
      steps: [],
      components: [],
      // actions
      selectedComponent: 0,
      // data
      entity: undefined,
      table: [],
      form_data: {},
      isReady: false,
      // messages
      modalData: {
        id: "warnModal",
        title: "Atención",
        messages: [
          "Usted está pasando de la Etapa 1 a la Etapa 2 en trámite Registro Sanitario de empresas del rubro alimenticio.",
          "Presione Continuar para conseguir el trámite. Presione Cancelar para comletar o revisar su información.",
        ],
        buttonText: "Continuar",
        redirectUrl: "/tramites/curso",
      },

      deleteData: {
        id: "deleteRecordModal",
        title: "¿Estás seguro?",
        message: "Está seguro de elimina éste registro",
        buttonText: "Sí, eliminar registro",
      },
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
      companyData: userData(),
      requirements: [],
      currentComponentTable: [],
      idEntityToDeleteOrUpdate: null,
      modalDelete: null,
      requestProcedure: null,
      currentStep: null,
      localSearchFields: {},
      errorSendingSenasag: null,
      company: null,
      communications: [],
      internalCommunications: [],
      loading: true,
      type: "external",
      communicationUsers: [],
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    PageHeader,
    ...SenasagForms,
    ComunicationCardExternal,
    ComunicationCardInternal,
    CommentBoxSenasag,
  },
  mounted() {
    this.loadCommunications();
    const tabList = [].slice.call(
      document.querySelectorAll('a[data-bs-toggle="tab"]')
    );
    tabList.forEach((tab) => {
      tab.addEventListener("shown.bs.tab", (e) => {
        this.type = e.target.dataset.type;
      });
    });
  },
  methods: {
    async loadCommunications() {
      let [
        { ok: ok3, data: res3 },
        { ok: ok2, data: res2 },
        { ok: ok4, data: res4 },
      ] = await Promise.all([
        getInternalCommunications(this.$route.params.id_solicitud_tramite),
        getStartedTemplate(this.$route.params.id_solicitud_tramite),
        getCommunicationUsers(this.$route.params.id_solicitud_tramite),
      ]);
      console.log(res4);
      if (!ok2 || !ok3 || !ok4)
        return NotificationHelper.error(
          "Error al cargar datos de comunicación."
        );

      this.communicationUsers = res4.results;
      this.internalCommunications = res3.results;
      this.company = res2.fid_empresa;

      const { ok, data: res } = await getCommunications(
        this.company.id,
        this.$route.params.id_solicitud_tramite
      );
      if (!ok) return NotificationHelper.error("Error al cargar comunicación.");
      this.communications = res.results;
      this.loading = false;
    },

    makeChange(data) {
      Object.keys(data).forEach((key) => {
        data[key] =
          data[key] == "null" || data[key] == "undefined" ? "" : data[key];
      });
      Object.assign(this.form_data, data);
    },
    async handleRequest() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      const { ok } = await saveComponentInfo(
        this.$route.params.slug,
        this.companyData.id,
        this.currentComponent.id,
        this.form_data
      );

      if (!ok) return NotificationHelper.error("Error al guardar datos.");
      NotificationHelper.success("Datos guardados exitosamente.");
      this.changeSelectedComponent(this.currentComponent.id);
    },

    async handleRequestUpdate() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      const { ok } = await updateEntity(
        this.$route.params.slug,
        this.companyData.id,
        this.currentComponent.entity.name,
        this.idEntityToDeleteOrUpdate,
        this.form_data
      );

      if (!ok) return NotificationHelper.error("Error al guardar datos.");
      this.form_data = {};
      this.idEntityToDeleteOrUpdate = null;
      NotificationHelper.success("Datos guardados exitosamente.");
      this.changeSelectedComponent(this.currentComponent.id);
    },

    onShowDeleteConfirmation(id) {
      this.idEntityToDeleteOrUpdate = id;
      this.modalDelete.show();
    },
    async onDelete() {
      const { ok } = await deleteEntity(
        this.$route.params.slug,
        this.companyData.id,
        this.currentComponent.entity.name,
        this.idEntityToDeleteOrUpdate
      );
      if (!ok) return NotificationHelper.error("Error al eliminar.");
      this.idEntityToDeleteOrUpdate = null;
      NotificationHelper.success("Eliminado exitosamente.");
      this.changeSelectedComponent(this.currentComponent.id);
    },
    setDataToUpdate({ instance, id }) {
      this.idEntityToDeleteOrUpdate = id;
      this.currentComponent.forms.forEach((f) => {
        f.fields.forEach((field) => {
          if (field.entity_field.name !== "latitud,longitud") {
            this.form_data[field.entity_field.id] =
              instance[field.entity_field.name];
          } else {
            this.form_data[
              field.entity_field.id
            ] = `${instance.latitud},${instance.longitud}`;
          }
        });
      });
    },
    async changeSelectedComponent(componentId) {
      this.errorSendingSenasag = null;
      this.form_data = {};
      this.v$.$reset();
      this.currentComponentTable = [];
      this.currentComponent = null;
      const { ok: ok2, data: res2 } = await getComponentFieldsTemplate(
        this.$route.params.slug,
        componentId,
        this.companyData.id
      );
      if (!ok2)
        return NotificationHelper.error("Error al cargar el componente.");
      if (res2.grid && !res2.entity)
        return console.log(
          "The component does not have an entity. Grid components must provide an entity"
        );

      if (res2.grid) {
        const { ok: ok3, data: res3 } = await getGridData(
          this.$route.params.slug,
          this.companyData.id,
          res2.entity.name
        );
        if (!ok3)
          return NotificationHelper.error("Error al cargar el componente.");

        this.currentComponentTable = res3.results;
      }
      this.currentComponent = res2;
    },
    approveSending({ sent }) {
      if (sent) {
        this.sendToSenasag();
      }
    },
    async sendToSenasag() {
      const { ok, errors } = await sendProcedureToSenasag(
        this.$route.params.slug,
        this.companyData.id
      );
      if (!ok) {
        this.errorSendingSenasag = errors.message;
        return NotificationHelper.error("Error al enviar al senasag.");
      }

      NotificationHelper.success("Enviado al senasag exitosamente.");
      this.$router.push({ name: "empresa.lista.tramites.curso" });
    },
    onLoadLocalSearchField({ id, type }) {
      this.localSearchFields[type] = id;
    },
    resetNestedSelects(name) {
      if (name == "iddistrital") {
        if (this.localSearchFields["idprovincia"]) {
          this.form_data[this.localSearchFields["idprovincia"]] = null;
        }
        if (this.localSearchFields["idmunicipio"]) {
          this.form_data[this.localSearchFields["idmunicipio"]] = null;
        }
      }
      if (name == "idprovincia")
        if (this.localSearchFields["idmunicipio"]) {
          this.form_data[this.localSearchFields["idmunicipio"]] = null;
        }
    },
  },
  computed: {
    hideButton() {
      return this.readOnly || this.currentComponent.managed_by_vue;
    },
    hidePrintButton() {
      return true;
    },
    isCurrentComponentRequirements() {
      return this.currentComponent?.name.toLowerCase() === "requisitos";
    },
    readOnly() {
      return (
        this.requestProcedure &&
        this.requestProcedure.estado == StatusRequestProcedure.SENT
      );
    },
    ...mapGetters("authfack", ["isSenasagUser"]),
    currentStepUser() {
      return this.requestProcedure.fid_etapa_actual_user;
    },
    currentComponentPropsAndEvents() {
      switch (this.currentComponent.component_vue) {
        case "Requisitos":
          return {
            readOnly: this.readOnly,
            requirements: this.requirements,
            requestProcedureId: this.$route.params.slug,
            companyId: this.companyData.id,
            isSenasagUser: this.isSenasagUser,
            handleEvent: {},
          };
        case "Enviar":
          return {
            error: this.errorSendingSenasag,
            handleEvent: {
              "on:submitToSenasag": () => {
                this.sendToSenasag();
              },
              "on:close": () => {
                deleteTemplateProcedure(
                  this.$route.params.slug,
                  this.companyData.id
                ).then(({ ok }) => {
                  if (!ok)
                    return NotificationHelper.error(
                      "Error al archivar el trámite."
                    );
                  NotificationHelper.success("Trámite archivado exitosamente.");
                  this.$router.push({ name: "empresa.lista.tramites.curso" });
                });
              },
            },
          };

        default:
          return {};
      }
    },
  },
  validations() {
    const validations = {
      form_data: {},
    };
    if (this.currentComponent != null) {
      this.currentComponent.forms
        .map((f) => f.fields)
        .flat()
        .filter((f) => !f.read_only && f.required)
        .forEach((f) => {
          if (!f.entity_field) console.error("entity field was not provided");
          const v = {
            required: helpers.withMessage("El campo es requerido", required),
          };
          if (f.type == "email" || f.type_field == "email") {
            v.email = helpers.withMessage("Escriba un email válido", email);
          }
          validations.form_data[f.entity_field.id] = v;
        });
    }
    return validations;
  },
};
</script>

<style scoped>
ul .nav-item {
  width: 50%;
}
</style>
