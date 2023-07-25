<template>
  <PageHeader :title="title" :items="items" :description="description" />

  <!-- contenedor grande -->
  <div class="row margen-contenido" v-if="isReady">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body card-background-none">
          <div class="row">
            <div class="col-lg-8 col-xxl-9">
              <div
                class="card-header align-items-center d-flex-no color-cabecera"
                v-if="currentStep"
              >
                <div class="titulo">
                  <h6 class="card-title mb-0 flex-grow-1">
                    <i class="ri-honour-line icon-grande2"></i>
                    {{ currentStep.name }}
                  </h6>
                </div>
              </div>
              <!-- end card header -->

              <div class="row">
                <!-- Componentes -->
                <div class="col-lg-4 col-xxl-2">
                  <div
                    class="nav nav-pills flex-column nav-pills-tab custom-verti-nav-pills text-center"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <a
                      v-for="(comp, compIndex) in components"
                      :key="compIndex"
                      :id="`home-tab-${comp?.slug}`"
                      :href="`#home-${comp?.slug}`"
                      :aria-controls="`#home-${comp?.slug}`"
                      :class="`nav-link ${
                        currentComponent?.slug === comp.slug ? 'active' : ''
                      }`"
                      data-bs-toggle="pill"
                      role="tab"
                      aria-selected="false"
                      @click="changeSelectedComponent(comp.id)"
                    >
                      {{ comp.name }}
                    </a>
                  </div>
                </div>
                <!-- end col-->
                <div class="col-lg-8 col-xxl-10">
                  <div class="tab-content text-muted mt-3 mt-lg-0">
                    <Spinner :loading="!currentComponent">
                      <div
                        class="tab-pane fade active show"
                        :id="`home-${currentComponent.slug}`"
                        role="tabpanel"
                        :aria-labelledby="`home-tab-${currentComponent.slug}`"
                      >
                        <div class="d-flex mb-4">
                          <div class="flex-grow-1">
                            <div class="row">
                              <div
                                class="col-lg-12"
                                v-if="!currentComponent.managed_by_vue"
                              >
                                <div
                                  class="card"
                                  v-for="(
                                    form, formIndex
                                  ) in currentComponent.forms"
                                  :key="formIndex"
                                  :set="(v = v$.form_data)"
                                >
                                  <GroupName :name="form.name" />
                                  <div class="card-body pt-0">
                                    <div class="live-preview">
                                      <div class="row gy-4 pt-3">
                                        <div
                                          v-for="(
                                            field, fieldIndex
                                          ) in form.fields"
                                          :class="field.col"
                                          :key="fieldIndex"
                                        >
                                          <MapFormField
                                            :read-only="readOnly"
                                            :error-vuelidate="
                                              v[field.entity_field?.id]?.$errors
                                            "
                                            v-if="
                                              field.type_field === 'map' ||
                                              field.type_field ===
                                                'multimapField'
                                            "
                                            @update-coordinates="makeChange"
                                            :field="field"
                                          />

                                          <HelpinputField
                                            :read-only="readOnly"
                                            v-model="
                                              form_data[field.entity_field.id]
                                            "
                                            :error-vuelidate="
                                              v[field.entity_field.id]?.$errors
                                            "
                                            v-if="
                                              field.type_field === 'helpinput'
                                            "
                                            @update-change="makeChange"
                                            :field="field"
                                          />

                                          <EmailField
                                            :read-only="readOnly"
                                            v-model="
                                              form_data[field.entity_field?.id]
                                            "
                                            :error-vuelidate="
                                              v[field.entity_field?.id]?.$errors
                                            "
                                            v-if="field.type_field === 'email'"
                                            @update-change="makeChange"
                                            :field="field"
                                          />

                                          <SimpleSelectAjaxField
                                            :read-only="readOnly"
                                            v-model="
                                              form_data[field.entity_field.id]
                                            "
                                            :error-vuelidate="
                                              v[field.entity_field.id]?.$errors
                                            "
                                            v-if="
                                              field.type_field === 'selectAjax'
                                            "
                                            :field="field"
                                            @update-change="makeChange"
                                          />

                                          <SimpleSelectField
                                            :read-only="readOnly"
                                            v-model="
                                              form_data[field.entity_field.id]
                                            "
                                            :error-vuelidate="
                                              v[field.entity_field.id]?.$errors
                                            "
                                            v-if="
                                              field.type_field ===
                                              'simpleSelect'
                                            "
                                            :field="field"
                                            @update-change="makeChange"
                                          />

                                          <MultiSelectField
                                            v-if="
                                              field.type_field === 'multiSelect'
                                            "
                                            :field="field"
                                            @update-change="makeChange"
                                          />

                                          <DefaultField
                                            :read-only="readOnly"
                                            v-model="
                                              form_data[field.entity_field.id]
                                            "
                                            :error-vuelidate="
                                              v[field.entity_field.id]?.$errors
                                            "
                                            v-if="
                                              field.type_field ===
                                              'defaultField'
                                            "
                                            :field="field"
                                            @update-change="makeChange"
                                          />

                                          <TextareaField
                                            :read-only="readOnly"
                                            :error-vuelidate="
                                              v[field.entity_field.id]?.$errors
                                            "
                                            v-if="
                                              field.type_field === 'textarea'
                                            "
                                            :field="field"
                                            @update-change="makeChange"
                                          />

                                          <MultiuploadField
                                            :read-only="readOnly"
                                            v-if="
                                              field.type_field ===
                                              'multiuploadField'
                                            "
                                            :field="field"
                                            @update-change="makeChange"
                                            @on:delete-metadata-file="
                                              field.value.splice($event, 1)
                                            "
                                          />

                                          <CheckField
                                            :read-only="readOnly"
                                            v-if="field.type_field === 'check'"
                                            :field="field"
                                            @update-change="makeChange"
                                          />

                                          <RadioField
                                            :read-only="readOnly"
                                            v-if="field.type_field === 'radio'"
                                            :field="field"
                                            @update-change="makeChange"
                                            :error-vuelidate="
                                              v[field.entity_field.id]?.$errors
                                            "
                                          />

                                          <RichTextField
                                            :read-only="readOnly"
                                            v-if="
                                              field.type_field ===
                                              'richtextField'
                                            "
                                            :field="field"
                                            @update-change="makeChange"
                                            :error-vuelidate="
                                              v[field.entity_field.id]?.$errors
                                            "
                                          />

                                          <SwitchField
                                            :read-only="readOnly"
                                            v-if="field.type_field === 'switch'"
                                            :field="field"
                                            @update-change="makeChange"
                                            :error-vuelidate="
                                              v[field.entity_field.id]?.$errors
                                            "
                                          />

                                          <NestedTableField
                                            :read-only="readOnly"
                                            v-if="
                                              field.type_field === 'nestedTable'
                                            "
                                            :field="field"
                                          />

                                          <LocalSearchListField
                                            v-model="
                                              form_data[field.entity_field.id]
                                            "
                                            :read-only="readOnly"
                                            v-if="
                                              field.type_field ===
                                              'localSelectSearchField'
                                            "
                                            :field="field"
                                            :error-vuelidate="
                                              v[field.entity_field.id]?.$errors
                                            "
                                            @update-change="makeChange"
                                            @on:load="onLoadLocalSearchField"
                                            @on:reset-nested-selects="
                                              resetNestedSelects
                                            "
                                          />

                                          <SelectSearchField
                                            :read-only="readOnly"
                                            v-if="
                                              field.type_field ===
                                              'selectSearchField'
                                            "
                                            :field="field"
                                            @update-change="makeChange"
                                          />

                                          <DateInputField
                                            :read-only="readOnly"
                                            v-model="
                                              form_data[field.entity_field?.id]
                                            "
                                            v-if="
                                              field.type_field === 'dateInput'
                                            "
                                            :field="field"
                                            @update-change="makeChange"
                                            :error-vuelidate="
                                              v[field.entity_field?.id]?.$errors
                                            "
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <component
                              :read-only="readOnly"
                              v-if="
                                !currentComponent.managed_by_vue &&
                                currentComponent.grid
                              "
                              :data="currentComponentTable"
                              :is="currentComponent.entity.name"
                              @on:click:delete="onShowDeleteConfirmation"
                              @on:click:update="setDataToUpdate"
                            ></component>
                            <div class="card-body pt-0">
                              <div class="live-preview">
                                <component
                                  v-if="currentComponent.managed_by_vue"
                                  :is="currentComponent.component_vue"
                                  v-bind="{
                                    handleEvent,
                                    ...currentComponentPropsAndEvents,
                                  }"
                                  v-on="
                                    currentComponentPropsAndEvents.handleEvent
                                  "
                                >
                                </component>
                              </div>
                            </div>

                            <div class="mb-3">
                              <div class="row">
                                <div class="col btn_izq"></div>
                                <div class="col-6 col-sm-4 btn_cen">
                                  <button
                                    type="button"
                                    class="btn btn-guardar btn-label right mb-1 mr-1"
                                    v-if="
                                      !hideButton && !idEntityToDeleteOrUpdate
                                    "
                                    @click="handleRequest"
                                  >
                                    <i
                                      class="ri-save-line label-icon align-middle fs-16 ms-2"
                                    ></i>
                                    Guardar
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-guardar btn-label right mb-1 mr-1"
                                    v-if="
                                      !hideButton && idEntityToDeleteOrUpdate
                                    "
                                    @click="handleRequestUpdate"
                                  >
                                    <i
                                      class="ri-save-line label-icon align-middle fs-16 ms-2"
                                    ></i>
                                    Guardar
                                  </button>
                                  <button
                                    type="button"
                                    class="btn btn-print btn-label right mb-1"
                                    v-if="!hidePrintButton"
                                  >
                                    <i
                                      class="ri-printer-line label-icon align-middle fs-16 ms-2"
                                    ></i>
                                    Imprimir
                                  </button>
                                </div>
                                <div class="col btn_der"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Spinner>
                  </div>
                </div>
                <!-- end col-->
              </div>
            </div>

            <div class="col-lg-4 col-xxl-3">
              <div class="card2 comunicacion2">
                <div class="card-body2">
                  <div
                    class="card-header align-items-center d-flex-no color-cabecera2"
                  >
                    <div class="titulo">
                      <h6 class="card-title mb-0 flex-grow-1">
                        <i class="ri-chat-settings-line icon-grande2"></i> Menú
                        trámite
                      </h6>
                    </div>
                  </div>

                  <div class="margen-top">
                    <div
                      class="d-grid gap-2 mb-2"
                      v-if="requestProcedure.can_see_communication"
                    >
                      <router-link
                        :to="{
                          name: 'empresa.comunicacion.tramites.curso',
                          params: {
                            slug: $route.params.slug,
                          },
                        }"
                        role="button"
                        class="btn btn-observar right ancho"
                        ><i
                          class="bx bxs-bell label-icon align-middle fs-16 ms-2"
                        ></i>
                        Realizar observaciones</router-link
                      >
                    </div>
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
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#accor_borderedExamplecollapse1"
                              aria-expanded="false"
                              aria-controls="accor_borderedExamplecollapse1"
                            >
                              Verificación Externa
                            </button>
                          </h2>
                          <div
                            id="accor_borderedExamplecollapse1"
                            class="accordion-collapse collapse"
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
                              Advertencia
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
  <!-- end -->
  <teleport to="#modals">
    <DeleteConfirmationModal
      @send-confirmation="onDelete"
      :attrs="deleteData"
    />
  </teleport>
  <InforModal :attrs="modalData" @send-confirmation="approveSending" />
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
import {
  sendProcedureToSenasag,
  sendProductProcedureToSenasag,
} from "@/services/tramites";

import DocumentosInspeccion from "@/components/template-components/DocumentosInspeccion.vue";
import Requisitos from "@/components/template-components/Requisitos.vue";
import ProductosConEtiqueta from "@/components/template-components/ProductosConEtiqueta.vue";
import ProductosSinEtiqueta from "@/components/template-components/ProductosSinEtiqueta.vue";
import ProductosPetPcr from "@/components/template-components/ProductosPetPcr.vue";
import ProductosSA from "@/components/template-components/ProductosSA.vue";
import ProductosSV from "@/components/template-components/ProductosSV.vue";
import Enviar from "@/components/template-components/Finalizar/Enviar.vue";
import EnviarProd from "@/components/template-components/Finalizar/EnviarProd.vue";

import SenasagForms from "@/components/senasag-forms";

import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import { Modal } from "bootstrap";

import Spinner from "@/components/widgets/spinner";

import NotificationHelper from "@/helpers/notification";

import InforModal from "@/components/pytiti/info-modal.vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";

import { userData } from "@/services/user";
import { mapGetters } from "vuex";

export default {
  name: "TramitePlantillaEditarEmpresa",

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
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    PageHeader,
    ...SenasagForms,
    Enviar,
    EnviarProd,
    Requisitos,
    DocumentosInspeccion,
    Spinner,
    InforModal,
    DeleteConfirmationModal,
    ProductosConEtiqueta,
    ProductosSinEtiqueta,
    ProductosPetPcr,
    ProductosSA,
    ProductosSV,
  },
  mounted() {
    this.modalDelete = new Modal(`#${this.deleteData.id}`, {
      backdrop: "static",
    });
    this.loadTemplate();
  },
  methods: {
    async loadTemplate() {
      const { ok, data: res } = await getStartedTemplate(
        this.$route.params.slug,
        this.companyData.id
      );
      if (!ok) return NotificationHelper.error("Error al cargar el trámite.");
      this.requestProcedure = res;
      this.template = res.fid_tramite;
      this.steps = this.template.plantilla_tramite.steps;
      this.requirements = res.assigned_requirements;

      this.currentStep = this.steps.find(
        (s) => s.id == res.fid_etapa_actual_user
      );
      if (!this.currentStep)
        return console.log(`current user step was not found`);
      this.components = this.currentStep.components;

      this.title = "TRAMITE: " + this.template.titulo;
      this.changeSelectedComponent(this.components[0].id);
      this.isReady = true;
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
    async sendProdToSenasag() {
      const { ok, errors } = await sendProductProcedureToSenasag(
        this.$route.params.slug,
        this.requestProcedure.fid_empresa.id
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
        case "EnviarProd":
          return {
            error: this.errorSendingSenasag,
            handleEvent: {
              "on:submitToSenasag": () => {
                this.sendProdToSenasag();
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
        case "ProductosConEtiqueta":
          return {
            requestProcedureId: this.$route.params.slug,
            handleEvent: {},
          };
        case "ProductosSinEtiqueta":
          return {
            requestProcedureId: this.$route.params.slug,
            handleEvent: {},
          };
        case "ProductosPetPcr":
          return {
            requestProcedureId: this.$route.params.slug,
            handleEvent: {},
          };
        case "ProductosSA":
          return {
            requestProcedureId: this.$route.params.slug,
            handleEvent: {},
          };
        case "ProductosSV":
          return {
            requestProcedureId: this.$route.params.slug,
            handleEvent: {},
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
.nav-pills {
  max-width: 130px !important;
}
.nav-pills a.nav-link {
  max-width: 130px !important;
}

.nav-pills .nav-link {
  max-width: 130px !important;
}
</style>
