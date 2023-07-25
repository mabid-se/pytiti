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
              <Spinner :loading="loading">
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
                                            href="#interna"
                                            role="tab"
                                            aria-selected="true"
                                          >
                                            Comunicación externa con el
                                            solicitante
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
                                                :company="companyData"
                                              ></ComunicationCardExternal>
                                            </div>
                                          </div>
                                          <CommentBoxExternal
                                            @on:submitted="
                                              communications.unshift($event)
                                            "
                                          ></CommentBoxExternal>
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
              </Spinner>
            </div>

            <div class="col-lg-4 col-xxl-3">
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
                  <!-- 
                  <div class="mt-1">
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
// import { StatusRequestProcedure } from "@/constants/SolicitudTramite";
import PageHeader from "@/components/page-header";
import { CommunicationType } from "@/constants/Communication";

import "prismjs";
import "prismjs/themes/prism.css";

// services
import { saveComponentInfo } from "@/services/plantilla";
import { getCommunications } from "@/modules/empresa/services/ComunicacionService";

// import // deleteTemplateProcedure,
// getStartedTemplate,
// getComponentFieldsTemplate,
// getGridData,
// deleteEntity,
// updateEntity,
// "@/modules/empresa/services/PlantillaService";
// import { sendProcedureToSenasag } from "@/services/tramites";

// import DocumentosInspeccion from "@/components/template-components/DocumentosInspeccion.vue";
// import Requisitos from "@/components/template-components/Requisitos.vue";
// import Enviar from "@/components/template-components/Finalizar/Enviar.vue";

import SenasagForms from "@/components/senasag-forms";

// import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
// import { Modal } from "bootstrap";
import ComunicationCardExternal from "@/components/widgets/ComunicationCardExternal.vue";
import CommentBoxExternal from "@/components/widgets/CommentBoxExternal.vue";
import Spinner from "@/components/widgets/spinner";

import NotificationHelper from "@/helpers/notification";

// import InforModal from "@/components/pytiti/info-modal.vue";
import useVuelidate from "@vuelidate/core";
// import { required, helpers, email } from "@vuelidate/validators";

import { userData } from "@/services/user";
// import { mapGetters } from "vuex";

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
      //
      communications: [],
      loading: true,
      CommunicationType,
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    PageHeader,
    ...SenasagForms,
    ComunicationCardExternal,
    CommentBoxExternal,
    // Enviar,
    // Requisitos,
    // DocumentosInspeccion,
    Spinner,
    // InforModal,
    // DeleteConfirmationModal,
  },
  mounted() {
    // this.modalDelete = new Modal(`#${this.deleteData.id}`, {
    //   backdrop: "static",
    // });
    this.loadCommunications();
  },
  methods: {
    async loadCommunications() {
      const { ok, data: res } = await getCommunications(
        this.companyData.id,
        this.$route.params.slug
      );
      if (!ok) return NotificationHelper.error("Error al cargar comunicación.");
      this.communications = res.results;
      this.loading = false;
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

    // async handleRequestUpdate() {
    //   this.v$.$touch();
    //   if (this.v$.$invalid) return;
    //   const { ok } = await updateEntity(
    //     this.$route.params.slug,
    //     this.companyData.id,
    //     this.currentComponent.entity.name,
    //     this.idEntityToDeleteOrUpdate,
    //     this.form_data
    //   );

    //   if (!ok) return NotificationHelper.error("Error al guardar datos.");
    //   this.form_data = {};
    //   this.idEntityToDeleteOrUpdate = null;
    //   NotificationHelper.success("Datos guardados exitosamente.");
    //   this.changeSelectedComponent(this.currentComponent.id);
    // },

    // onShowDeleteConfirmation(id) {
    //   this.idEntityToDeleteOrUpdate = id;
    //   this.modalDelete.show();
    // },
  },
  computed: {
    // hideButton() {
    //   return this.readOnly || this.currentComponent.managed_by_vue;
    // },
    // hidePrintButton() {
    //   return true;
    // },
    // isCurrentComponentRequirements() {
    //   return this.currentComponent?.name.toLowerCase() === "requisitos";
    // },
    // readOnly() {
    //   return (
    //     this.requestProcedure &&
    //     this.requestProcedure.estado == StatusRequestProcedure.SENT
    //   );
    // },
    // ...mapGetters("authfack", ["isSenasagUser"]),
    // currentStepUser() {
    //   return this.requestProcedure.fid_etapa_actual_user;
    // },
    // currentComponentPropsAndEvents() {
    //   switch (this.currentComponent.component_vue) {
    //     case "Requisitos":
    //       return {
    //         readOnly: this.readOnly,
    //         requirements: this.requirements,
    //         requestProcedureId: this.$route.params.slug,
    //         companyId: this.companyData.id,
    //         isSenasagUser: this.isSenasagUser,
    //         handleEvent: {},
    //       };
    //     case "Enviar":
    //       return {
    //         error: this.errorSendingSenasag,
    //         handleEvent: {
    //           "on:submitToSenasag": () => {
    //             this.sendToSenasag();
    //           },
    //           "on:close": () => {
    //             deleteTemplateProcedure(
    //               this.$route.params.slug,
    //               this.companyData.id
    //             ).then(({ ok }) => {
    //               if (!ok)
    //                 return NotificationHelper.error(
    //                   "Error al archivar el trámite."
    //                 );
    //               NotificationHelper.success("Trámite archivado exitosamente.");
    //               this.$router.push({ name: "empresa.lista.tramites.curso" });
    //             });
    //           },
    //         },
    //       };
    //     default:
    //       return {};
    //   }
    // },
  },
  validations() {
    const validations = {
      form_data: {},
    };
    return validations;
  },
};
</script>
