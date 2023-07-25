<template>
  <Layout>
    <PageHeader :title="title" :items="items" :description="description" />
    <div class="row" v-if="isReady">
      <div class="col-lg-12">
        <div class="card">
          <div
            class="card-header align-items-center d-flex justify-content-between"
            v-for="(step, stepIndex) in steps"
            :key="stepIndex"
          >
            <h6 class="card-title mb-0 flex-grow-1">
              <i class="bx bx-bookmarks fs-6"></i> Etapa: {{ step.name }}
            </h6>
            <div>
              <a
                :href="`#${modalData.id}`"
                :data-bs-target="`#${modalData.id}`"
                data-bs-toggle="modal"
                class="btn btn-success btn-md btn-label right"
              >
                <i
                  class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"
                ></i>
                Enviar a SENASAG
              </a>
            </div>
          </div>
        </div>
        <!-- end card header -->

        <div class="card-body card-background-none">
          <div class="row">
            <!-- Components options -->
            <div class="col-lg-2 col-xxl-2">
              <div
                class="nav nav-pills flex-column nav-pills-tab custom-verti-nav-pills text-center"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  v-for="(comp, compIndex) in components"
                  :key="compIndex"
                  :id="`home-tab-${comp.slug}`"
                  :href="`#home-${comp.slug}`"
                  :aria-controls="`#home-${comp.slug}`"
                  :class="`nav-link ${
                    selectedComponent === compIndex ? 'active' : ''
                  }`"
                  data-bs-toggle="pill"
                  role="tab"
                  aria-selected="false"
                  @click="selectComponent(compIndex)"
                >
                  {{ comp.name }}
                </a>
              </div>
            </div>

            <!-- Forms -->
            <div class="col-lg-6 col-xxl-7">
              <div class="tab-content text-muted mt-3 mt-lg-0">
                <div
                  v-for="(comp, compIndex) in components"
                  :key="compIndex"
                  :class="`tab-pane fade ${
                    selectedComponent === compIndex ? 'active show' : ''
                  }`"
                  :id="`home-${comp.slug}`"
                  role="tabpanel"
                  :aria-labelledby="`home-tab-${comp.slug}`"
                >
                  <div class="d-flex mb-4">
                    <div class="flex-grow-1">
                      <div class="row">
                        <div class="col-lg-12">
                          <div
                            class="card"
                            v-for="(form, formIndex) in comp.forms"
                            :key="formIndex"
                            :set="(v = v$.form_data)"
                          >
                            <GroupName :name="form.name" />
                            <div class="card-body pt-0">
                              <div class="live-preview">
                                <div class="row gy-4 pt-3">
                                  <div
                                    v-for="(field, fieldIndex) in form.fields"
                                    :class="field.col"
                                    :key="fieldIndex"
                                  >
                                    <MapFormField
                                      :error-vuelidate="
                                        v[field.entity_field.name]?.$errors
                                      "
                                      v-if="
                                        field.type_field === 'map' &&
                                        selectedComponent === compIndex
                                      "
                                      @update-coordinates="makeChange"
                                      :field="field"
                                    />
                                    <HelpinputField
                                      v-model="
                                        form_data[field.entity_field.name]
                                      "
                                      :error-vuelidate="
                                        v[field.entity_field.name]?.$errors
                                      "
                                      v-if="
                                        field.type_field === 'helpinput' &&
                                        selectedComponent === compIndex
                                      "
                                      @update-change="makeChange"
                                      :field="field"
                                    />
                                    <EmailField
                                      v-model="
                                        form_data[field.entity_field.name]
                                      "
                                      :error-vuelidate="
                                        v[field.entity_field.name]?.$errors
                                      "
                                      v-if="
                                        field.type_field === 'email' &&
                                        selectedComponent === compIndex
                                      "
                                      @update-change="makeChange"
                                      :field="field"
                                    />
                                    <RequirementFileField
                                      :error-vuelidate="
                                        v[field.entity_field.name]?.$errors
                                      "
                                      v-if="
                                        field.type_field ===
                                          'requirementField' &&
                                        selectedComponent === compIndex
                                      "
                                      :style="
                                        fieldIndex % 2 === 0
                                          ? 'background:#eeeeee'
                                          : ''
                                      "
                                      :field="field"
                                      :index="fieldIndex"
                                    />
                                    <SimpleSelectField
                                      v-model="
                                        form_data[field.entity_field.name]
                                      "
                                      :error-vuelidate="
                                        v[field.entity_field.name]?.$errors
                                      "
                                      v-if="
                                        field.type_field === 'simpleSelect' &&
                                        selectedComponent === compIndex
                                      "
                                      :field="field"
                                      @update-change="makeChange"
                                    />
                                    <MultiSelectField
                                      v-if="
                                        field.type_field === 'multiSelect' &&
                                        selectedComponent === compIndex
                                      "
                                      :field="field"
                                      @update-change="makeChange"
                                    />
                                    <DefaultField
                                      v-model="
                                        form_data[field.entity_field.name]
                                      "
                                      :error-vuelidate="
                                        v[field.entity_field.name]?.$errors
                                      "
                                      v-if="
                                        field.type_field === 'defaultField' &&
                                        selectedComponent === compIndex
                                      "
                                      :field="field"
                                      @update-change="makeChange"
                                    />
                                    <TextareaField
                                      :error-vuelidate="
                                        v[field.entity_field.name]?.$errors
                                      "
                                      v-if="
                                        field.type_field === 'textarea' &&
                                        selectedComponent === compIndex
                                      "
                                      :field="field"
                                      @update-change="makeChange"
                                    />
                                    <MultiuploadField
                                      v-if="
                                        field.type_field ===
                                          'multiuploadField' &&
                                        selectedComponent === compIndex
                                      "
                                      :field="field"
                                      @update-change="makeChange"
                                    />
                                    <CheckField
                                      v-if="
                                        field.type_field === 'check' &&
                                        selectedComponent === compIndex
                                      "
                                      :field="field"
                                      @update-change="makeChange"
                                    />
                                    <RadioField
                                      v-if="
                                        field.type_field === 'radio' &&
                                        selectedComponent === compIndex
                                      "
                                      :field="field"
                                      @update-change="makeChange"
                                      :error-vuelidate="
                                        v[field.entity_field.name]?.$errors
                                      "
                                    />
                                    <RichTextField
                                      v-if="
                                        field.type_field === 'richtextField' &&
                                        selectedComponent === compIndex
                                      "
                                      :field="field"
                                      @update-change="makeChange"
                                      :error-vuelidate="
                                        v[field.entity_field.name]?.$errors
                                      "
                                    />
                                    <SwitchField
                                      v-if="
                                        field.type_field === 'switch' &&
                                        selectedComponent === compIndex
                                      "
                                      :field="field"
                                      @update-change="makeChange"
                                      :error-vuelidate="
                                        v[field.entity_field.name]?.$errors
                                      "
                                    />
                                    <NestedTableField
                                      v-if="
                                        field.type_field === 'nestedTable' &&
                                        selectedComponent === compIndex
                                      "
                                      :field="field"
                                    />
                                    <MultiMapField
                                      v-if="
                                        field.type_field === 'multimapField' &&
                                        selectedComponent === compIndex
                                      "
                                      :field="field"
                                      :table="table"
                                      @make-table="makeTable"
                                      @update-change="
                                        form_data[field.name] = $event
                                      "
                                      :error-vuelidate="v[field.name]?.$errors"
                                      @on:submit="handleRequest"
                                    />
                                    <LocalSearchListField
                                      v-if="
                                        field.type_field ===
                                        'localSelectSearchField'
                                      "
                                      :field="field"
                                      @update-change="makeChange"
                                    />
                                    <DateInputField
                                      v-model="
                                        form_data[field.entity_field.name]
                                      "
                                      v-if="field.type_field === 'dateInput'"
                                      :field="field"
                                      @update-change="makeChange"
                                      :error-vuelidate="
                                        v[field.entity_field.name]?.$errors
                                      "
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- save/print-buttons -->
                      <div class="row">
                        <div class="col-3 align-middle pt-2">
                          <button
                            class="btn btn-navega btn-sm btn-label"
                            @click="goBack"
                          >
                            <i
                              class="bx bxs-chevrons-left label-icon align-middle fs-18"
                            ></i>
                            Anterior
                          </button>
                        </div>
                        <div class="col-3">
                          <button
                            v-if="
                              compIndex < components.length - 1 && !hideButton
                            "
                            @click="handleRequest"
                            type="button"
                            class="btn btn-guardar btn-label right"
                          >
                            <i
                              class="ri-save-line label-icon align-middle fs-16 ms-2"
                            ></i>
                            GUARDAR
                          </button>
                        </div>
                        <div class="col-3">
                          <button
                            type="button"
                            class="btn btn-soft-dark btn-label right"
                          >
                            <i
                              class="ri-printer-line label-icon align-middle fs-16 ms-2"
                            ></i>
                            IMPRIMIR
                          </button>
                        </div>
                        <div class="col-3 align-middle pt-2">
                          <button
                            class="btn btn-navega btn-sm btn-label right"
                            @click="goNext"
                          >
                            <i
                              class="bx bxs-chevrons-right label-icon align-middle fs-16"
                            ></i>
                            Siguiente
                          </button>
                        </div>
                      </div>
                      <!--/save/print-buttons -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <InforModal :attrs="modalData" @send-confirmation="approveSending" />
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
  </Layout>
</template>
<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";

import "prismjs";
import "prismjs/themes/prism.css";

// services
import {
  getProcessorTemplate,
  postProcessorTemplate,
  putProcessorTemplate,
} from "@/services/plantilla";
import { sendProcedureToSenasag } from "@/services/tramites";

// components
import GroupName from "@/components/senasag-forms/group-name.vue";
import HelpinputField from "@/components/senasag-forms/fields/helpinput-field.vue";
import MapFormField from "@/components/senasag-forms/form-fields/map-form-field.vue";
import EmailField from "@/components/senasag-forms/fields/email-field.vue";
import RequirementFileField from "@/components/senasag-forms/fields/requirement-file-field.vue";
import SimpleSelectField from "@/components/senasag-forms/fields/simple-select-field.vue";
import MultiSelectField from "@/components/senasag-forms/fields/multi-select-field.vue";
import DefaultField from "@/components/senasag-forms/fields/default-field.vue";
import TextareaField from "@/components/senasag-forms/fields/textarea-field.vue";
import MultiuploadField from "@/components/senasag-forms/fields/multiupload-field.vue";
import CheckField from "@/components/senasag-forms/fields/check-field.vue";
import RadioField from "@/components/senasag-forms/fields/radio-field.vue";
import RichTextField from "@/components/senasag-forms/fields/rich-text-field.vue";
import SwitchField from "@/components/senasag-forms/fields/switch-field.vue";
import NestedTableField from "@/components/senasag-forms/fields/nested-table-field.vue";
import MultiMapField from "@/components/senasag-forms/fields/multi-map-field.vue";
import LocalSearchListField from "@/components/senasag-forms/fields/local-search-list-field.vue";
import DateInputField from "@/components/senasag-forms/fields/date-input-field.vue";
// //
import { required, helpers, email } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import InforModal from "@/components/pytiti/info-modal.vue";

export default {
  name: "TramiteTramitadorPlantillaEditar",

  data() {
    return {
      title: "PlantillaTramitador",
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
      //
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
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    Layout,
    PageHeader,
    GroupName,
    // fields
    HelpinputField,
    MapFormField,
    EmailField,
    RequirementFileField,
    SimpleSelectField,
    MultiSelectField,
    DefaultField,
    TextareaField,
    MultiuploadField,
    CheckField,
    RadioField,
    RichTextField,
    SwitchField,
    NestedTableField,
    MultiMapField,
    LocalSearchListField,
    DateInputField,
    // //
    InforModal,
  },
  mounted() {
    this.loadTemplate();
  },
  validations() {
    const validations = {
      form_data: {},
    };
    if (this.components[this.selectedComponent]) {
      this.components[this.selectedComponent].forms
        .map((f) => f.fields)
        .flat()
        .filter((f) => !f.read_only && f.required)
        .forEach((f) => {
          console.log(f.name);
          const v = {
            required: helpers.withMessage("El campo es requerido", required),
          };
          if (f.type == "email" || f.type_field == "email") {
            v.email = helpers.withMessage("Escriba un email válido", email);
          }
          if (f.entity_field) {
            console.log(f.entity_field.name);
          } else {
            console.log("no entity_field");
            console.log(f.name);
            console.log(f.entity_field);
            console.log(JSON.stringify(f));
          }
          validations.form_data[f.entity_field?.name || f.name] = v;
        });
    }

    return validations;
  },
  methods: {
    // async load
    loadTemplate() {
      getProcessorTemplate(this.$route.params.slug)
        .then((res) => {
          this.template = res.fid_tramite;
          this.steps = this.template.plantilla_tramite.steps;
          this.steps.map((step) => {
            this.components = step.components.filter(
              (c) => c.name != "Clasificación de la Empresa"
            );
            this.title = "TRAMITE: " + this.template.titulo;
          });
          this.isReady = true;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    createResourceTemplate(entityUrl, formData) {
      postProcessorTemplate(entityUrl, formData).then(
        (res) => {
          if (res.error) {
            this.errorAttrs.title = "Error para aceptar solicitud";
            this.errorAttrs.message =
              "Ocurrió un error al aprobar la solicitud";
            this.errorAttrs.show = true;
          } else {
            this.successAttrs.title = "Solicitud aceptada";
            this.successAttrs.message =
              "Su solicitud ha sido aceptada correctamente.";
            this.successAttrs.show = true;
          }
          console.log(res);
        },
        (err) => {
          this.errorAttrs.title = "Error para aceptar solicitud";
          this.errorAttrs.message = "Ocurrió un error al aprobar la solicitud";
          this.errorAttrs.show = true;
          console.error(err);
        }
      );
    },
    updateResourceTemplate(entityUrl, formData) {
      putProcessorTemplate(entityUrl, formData).then(
        (res) => {
          if (res.error) {
            this.errorAttrs.title = "Error actualizar datos";
            this.errorAttrs.message =
              "Ocurrió un error al actualizar los datos";
            this.errorAttrs.show = true;
          } else {
            this.successAttrs.title = "Datos actualizados";
            this.successAttrs.message =
              "Los datos han sido actualizados correctamente.";
            this.successAttrs.show = true;
          }
          console.log(res);
        },
        (err) => {
          this.errorAttrs.title = "Error actualizar datos";
          this.errorAttrs.message = "Ocurrió un error al actualizar los datos";
          this.errorAttrs.show = true;
          console.error(err);
        }
      );
    },
    //
    makeChange(data) {
      Object.assign(this.form_data, data);
    },
    makeAsyncList(data) {
      console.log(data);
    },
    makeTable() {
      let formData = { ...this.form_data };
      this.table.push(formData);
    },
    goNext() {
      if (this.components.length > this.selectedComponent + 1) {
        this.selectedComponent += 1;
      }
    },
    goBack() {
      if (this.selectedComponent - 1 >= 0) {
        this.selectedComponent -= 1;
      }
    },
    selectComponent(componentIndex) {
      this.selectedComponent = componentIndex;
      this.form_data = {};
    },
    handleRequest() {
      let component = this.components[this.selectedComponent];
      let entities = ["representante", "tecnico"];
      let componentName = component.name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      let [entityUrl] = entities.filter((item) => componentName.includes(item));
      this.updateResourceTemplate(
        entityUrl === undefined ? "/" : `/${entityUrl}/`,
        this.form_data
      );
    },
    approveSending({ sent }) {
      if (sent) {
        this.sendToSenasag();
      }
    },
    sendToSenasag() {
      sendProcedureToSenasag(this.$route.params.slug).then(
        () => {
          this.$router.push("/tramites/curso");
        },
        (err) => {
          console.error(err);
        }
      );
    },
    changeMessageState({ show }) {
      this.successAttrs.show = show;
      this.errorAttrs.show = show;
    },
  },
  computed: {
    hideButton() {
      return (
        this.components[this.selectedComponent]?.name === "Planta y Almacenes"
      );
    },
  },
};
</script>
