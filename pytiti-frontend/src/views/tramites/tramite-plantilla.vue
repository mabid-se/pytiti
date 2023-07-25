<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";

import "prismjs";
import "prismjs/themes/prism.css";

// services
// import { getMetadata } from "@/services/metadata";
import { getProcedureTemplate } from "@/services/tramites";
import {
  sendProcedureTemplate,
  updateProcedureTemplate,
} from "@/services/tramites";

// components
import GroupName from "@/components/senasag-forms/group-name.vue";
import HelpinputField from "@/components/senasag-forms/fields/helpinput-field.vue";
import MapField from "@/components/senasag-forms/fields/map-field.vue";
import EmailField from "@/components/senasag-forms/fields/email-field.vue";
import RequirementField from "@/components/senasag-forms/fields/requirement-field.vue";
import SimpleSelectField from "@/components/senasag-forms/fields/simple-select-field.vue";
import SelectSearchField from "@/components/senasag-forms/fields/select-search-field.vue";
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
import HiddenInputField from "@/components/senasag-forms/fields/hidden-input-field.vue";
//
import ChatBox from "@/components/senasag-forms/ui-components/ChatBox.vue";
import FaqBox from "@/components/senasag-forms/ui-components/FaqBox.vue";
//import SearchBy from "@/components/senasag-forms/ui-components/SearchBy";

export default {
  name: "Tramites",
  data() {
    return {
      entity: 1,
      title: "Trámites",
      items: [
        {
          text: "Trámites",
          href: "/",
        },
        {
          text: "Demo",
          active: true,
        },
      ],
      enable: true,
      procedure_state: undefined,
      procedure_description: {},
      form: {},
      form_data: {},
      active_tab: 0,
      available_tabs: 0,
      table: [],
      enable_save_button: true,
    };
  },
  components: {
    Layout,
    PageHeader,
    GroupName,
    HelpinputField,
    MapField,
    EmailField,
    RequirementField,
    SimpleSelectField,
    MultiSelectField,
    SelectSearchField,
    DefaultField,
    TextareaField,
    MultiuploadField,
    CheckField,
    RadioField,
    RichTextField,
    SwitchField,
    NestedTableField,
    MultiMapField,
    HiddenInputField,
    //
    ChatBox,
    FaqBox,
    //SearchBy,
  },
  mounted() {
    getProcedureTemplate(this.$route.params.slug)
      .then((res) => {
        this.form = res.plantilla_tramite_id;
        this.procedure_description = res.descripcion;
        this.procedure_state = res.estado_tramite_llenado;
        this.title = res.plantilla_tramite_id.name;
        //
        res.plantilla_tramite_id.steps.map((step) => {
          this.available_tabs = step.components.length;
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    selectTab(index) {
      this.active_tab = index;
      this.enable_save_button =
        this.form.steps[0].components[index].with_button;
      this.entity = this.form.steps[0].components[index].entity; // remove this line when component entity is fixed in backend
      this.form_data = {};
    },
    nextTab() {
      let navLinkTabs = [
        ...document.querySelectorAll(`#${this.form.slug} .nav-link`),
      ];
      navLinkTabs[this.active_tab].classList.toggle("active");
      this.active_tab += 1;
      navLinkTabs[this.active_tab].classList.toggle("active");
    },
    backTab() {
      let navLinkTabs = [
        ...document.querySelectorAll(`#${this.form.slug} .nav-link`),
      ];
      navLinkTabs[this.active_tab].classList.toggle("active");
      this.active_tab -= 1;
      navLinkTabs[this.active_tab].classList.toggle("active");
    },
    makeChange(data) {
      Object.assign(this.form_data, data);
    },
    makeTable() {
      let formData = { ...this.form_data };
      this.table.push(formData);
      this.sendForm();
    },
    sendForm() {
      // Use this method when the endpoint exists (/api/v1/tramites/<slug>/plantilla/registrar/<entity>/)
      let formData = new FormData();
      for (let key in this.form_data) {
        formData.append(key, this.form_data[key]);
      }
      sendProcedureTemplate(this.$route.params.slug, formData, this.entity)
        .then((res) => {
          console.log(res);
          this.form_data = {};
        })
        .catch((err) => {
          console.error(err);
        });
    },
    updateForm() {
      // Use this method when the endpoint exists (/api/v1/tramites/<slug>/plantilla/registrar/<entity>/)
      let formData = new FormData();
      for (let key in this.form_data) {
        formData.append(key, this.form_data[key]);
      }
      updateProcedureTemplate(this.$route.params.slug, formData, this.entity)
        .then((res) => {
          console.log(res);
          this.form_data = {};
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <!--<div 
    class="card-header align-items-center d-flex-no color-cabecera-ia"
    v-for="(step, index) in form.steps" 
    :key="index">
      <h5 class="card-title mb-0 flex-grow-1"><span>Registro sanitario de empresas del rubro alimenticio</span> <span>{{ procedure_description }}</span></h5>
      <h6 class="card-title mb-0 flex-grow-1">{{ step.name }}</h6>
    </div>-->
    <div class="row" :id="form.slug">
      <div class="col-lg-8 col-xxl-9">
        <!-- -->
        <div class="card-header align-items-center d-flex-no color-cabecera">
          <div class="titulo">
            <h6 class="card-title mb-0 flex-grow-1">
              <i class="ri-honour-line icon-grande2"></i> Etapa: Evaluación
              documental
            </h6>
          </div>
          <div class="derecha enviar" v-if="!readOnly">
            <button type="button" class="btn btn-paso btn-label right ancho">
              <i
                class="ri-file-edit-line label-icon align-middle fs-16 ms-2"
              ></i>
              ENVIAR
            </button>
          </div>
        </div>
        <!--/-->
        <div class="row">
          <div class="col-lg-4 col-xxl-2" v-if="enable">
            <div
              class="nav nav-pills flex-column nav-pills-tab custom-verti-nav-pills text-center"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
              v-for="(step, stepIndex) in form.steps"
              :key="stepIndex"
            >
              <a
                v-for="(component, compIndex) in step.components"
                :key="compIndex"
                @click="selectTab(compIndex)"
                :class="
                  'nav-link ' + [active_tab === compIndex ? 'active' : '']
                "
                :id="'v-pills-' + component.slug"
                data-bs-toggle="pill"
                :href="'#v-pills-' + component.slug"
                role="tab"
                :aria-controls="'v-pills-' + component.slug"
                :aria-selected="[active_tab === compIndex ? true : false]"
              >
                {{ component.name }}
              </a>
            </div>
          </div>
          <div class="col-lg-8 col-xxl-10">
            <!--<SearchBy />-->
            <div
              class="tab-content text-muted mt-4 mt-md-0"
              v-for="(step, stepIndex) in form.steps"
              :key="stepIndex"
              :id="'v-pills-tabContent' + stepIndex"
            >
              <div
                v-for="(component, compIndex) in step.components"
                :key="compIndex"
                :class="
                  'tab-pane fade ' +
                  [active_tab === compIndex ? 'active show' : '']
                "
                :id="'v-pills-' + component.slug"
                role="tabpanel"
                :aria-labelledby="'v-pills-' + component.slug"
              >
                <div class="col-lg-12">
                  <div
                    class="card"
                    v-for="(form, formIndex) in component.forms"
                    :key="formIndex"
                  >
                    <GroupName :name="form.name" />
                    <div class="card-body">
                      <div class="live-preview">
                        <div class="row gy-4">
                          <div
                            v-for="(field, fieldIndex) in form.fields"
                            :class="field.col"
                            :key="fieldIndex"
                          >
                            <MapField
                              v-if="
                                field.type_field === 'map' &&
                                active_tab === compIndex
                              "
                              @update-coordinates="makeChange"
                              :field="field"
                            />
                            <HelpinputField
                              v-if="
                                field.type_field === 'helpinput' &&
                                active_tab === compIndex
                              "
                              @update-change="makeChange"
                              :field="field"
                            />
                            <EmailField
                              v-if="
                                field.type_field === 'email' &&
                                active_tab === compIndex
                              "
                              @update-change="makeChange"
                              :field="field"
                            />
                            <RequirementField
                              v-if="field.type_field === 'requirementField'"
                              :style="
                                fieldIndex % 2 === 0 ? 'background:#eeeeee' : ''
                              "
                              :field="field"
                              :index="fieldIndex"
                            />
                            <SimpleSelectField
                              v-if="
                                field.type_field === 'simpleSelect' &&
                                active_tab === compIndex
                              "
                              :field="field"
                              @update-change="makeChange"
                            />
                            <SelectSearchField
                              v-if="
                                field.type_field === 'selectSearchField' &&
                                active_tab === compIndex
                              "
                              :field="field"
                              @update-change="makeChange"
                            />
                            <MultiSelectField
                              v-if="
                                field.type_field === 'multiSelect' &&
                                active_tab === compIndex
                              "
                              :field="field"
                              @update-change="makeChange"
                            />
                            <DefaultField
                              v-if="
                                field.type_field === 'defaultField' &&
                                active_tab === compIndex
                              "
                              :field="field"
                              @update-change="makeChange"
                            />
                            <TextareaField
                              v-if="
                                field.type_field === 'textarea' &&
                                active_tab === compIndex
                              "
                              :field="field"
                              @update-change="makeChange"
                            />
                            <MultiuploadField
                              v-if="
                                field.type_field === 'multiuploadField' &&
                                active_tab === compIndex
                              "
                              :field="field"
                              @update-change="makeChange"
                            />
                            <CheckField
                              v-if="
                                field.type_field === 'check' &&
                                active_tab === compIndex
                              "
                              :field="field"
                              @update-change="makeChange"
                            />
                            <RadioField
                              v-if="
                                field.type_field === 'radio' &&
                                active_tab === compIndex
                              "
                              :field="field"
                              @update-change="makeChange"
                            />
                            <RichTextField
                              v-if="
                                field.type_field === 'richtextField' &&
                                active_tab === compIndex
                              "
                              :field="field"
                              @update-change="makeChange"
                            />
                            <SwitchField
                              v-if="
                                field.type_field === 'switch' &&
                                active_tab === compIndex
                              "
                              :field="field"
                              @update-change="makeChange"
                            />
                            <NestedTableField
                              v-if="
                                field.type_field === 'nestedTable' &&
                                active_tab === compIndex
                              "
                              :field="field"
                            />
                            <MultiMapField
                              v-if="
                                field.type_field === 'multimapField' &&
                                active_tab === compIndex
                              "
                              :field="field"
                              :table="table"
                              @update-change="makeChange"
                              @make-table="makeTable"
                            />
                            <HiddenInputField
                              v-if="
                                field.type_field === 'hiddeninput' &&
                                active_tab === compIndex
                              "
                              :field="field"
                              @update-change="makeChange"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="col btn_izq">
                    <button
                      @click="backTab"
                      type="button"
                      class="btn btn-navega btn-label rounded-pill"
                      :disabled="active_tab === 0"
                    >
                      <i
                        class="ri-arrow-left-circle-fill label-icon align-middle rounded-pill fs-16 me-2"
                      ></i>
                      Anterior
                    </button>
                  </div>
                  <div class="col-6 col-sm-4 btn_cen">
                    <button
                      @click="sendForm"
                      v-if="enable_save_button && procedure_state === 'NUEVO'"
                      type="button"
                      class="btn btn-guardar btn-label right mb-1"
                    >
                      <i
                        class="ri-save-line label-icon align-middle fs-16 ms-2"
                      ></i>
                      Guardar
                    </button>
                    <button
                      v-if="
                        enable_save_button && procedure_state === 'EN_CURSO'
                      "
                      @click="updateForm"
                      type="button"
                      class="btn btn-guardar btn-label right mb-1"
                    >
                      <i
                        class="ri-save-line label-icon align-middle fs-16 ms-2"
                      ></i>
                      Guardar Cambios
                    </button>
                    <button
                      type="button"
                      class="btn btn-print btn-label right mb-1"
                    >
                      <i
                        class="ri-printer-line label-icon align-middle fs-16 ms-2"
                      ></i>
                      Imprimir
                    </button>
                  </div>
                  <div class="col btn_der">
                    <button
                      @click="nextTab"
                      type="button"
                      class="btn btn-navega btn-label right rounded-pill"
                      :disabled="active_tab === available_tabs - 1"
                    >
                      <i
                        class="ri-arrow-right-circle-fill label-icon align-middle rounded-pill fs-16 ms-2"
                      ></i>
                      Siguiente
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-xxl-3">
        <ChatBox />
        <FaqBox />
      </div>
    </div>
  </Layout>
</template>
