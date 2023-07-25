<template>
  <Layout>
    <PageHeader :title="title" :items="items" :description="description" />
    <div class="row" v-if="isReady">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header align-items-center d-flex justify-content-between" v-for="(step, stepIndex) in steps"
            :key="stepIndex">
            <!-- <h5 class="card-title mb-0 flex-grow-1"><span>Registro sanitario de empresas del rubro alimenticio</span> <span>(Procesadoras de alimentos, cámaras frigoríficas, cámaras de maduración de productos vegetales y empresas fraccionadoras de alimentos y bebidas)</span> - <span>Categoría industrial</span></h5> -->
            <!--h5 class="card-title mb-0 flex-grow-1"><span>{{ template.objetivo }}</span> <span>{{ template.descripcion }}</span></h5-->
            <h6 class="card-title mb-0 flex-grow-1">
              <i class="bx bx-bookmarks fs-6"></i> Etapa: {{ step.name }}
            </h6>
            
          </div>
          <!-- end card header -->

          <div class="card-body card-background-none">
            <div class="row">
              <!-- Components options -->
              <div class="col-lg-2 col-xxl-2">
                <div class="nav nav-pills flex-column nav-pills-tab custom-verti-nav-pills text-center" role="tablist"
                  aria-orientation="vertical">
                  <a v-for="(comp, compIndex) in components" :key="compIndex" :id="`home-tab-${comp.slug}`"
                    :href="`#home-${comp.slug}`" :aria-controls="`#home-${comp.slug}`"
                    :class="`nav-link ${selectedComponent === compIndex ? 'active' : ''}`" data-bs-toggle="pill"
                    role="tab" aria-selected="false" @click="selectComponent(compIndex)">
                    {{ comp.name }}
                  </a>
                </div>
              </div>

              <!-- Forms -->
              <div class="col-lg-6 col-xxl-7">
                <div class="tab-content text-muted mt-3 mt-lg-0">
                  <div v-for="(comp, compIndex) in components" :key="compIndex"
                    :class="`tab-pane fade ${selectedComponent === compIndex ? 'active show' : ''}`"
                    :id="`home-${comp.slug}`" role="tabpanel" :aria-labelledby="`home-tab-${comp.slug}`">
                    <div class="d-flex mb-4">
                      <div class="flex-grow-1">
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="card" v-for="(form, formIndex) in comp.forms" :key="formIndex">
                              <GroupName :name="form.name" />
                              <div class="card-body pt-0">
                                <div class="live-preview">
                                  <div class="row gy-4 pt-3">
                                    <div v-for="(field, fieldIndex) in form.fields" :class="field.col"
                                      :key="fieldIndex">
                                      <MapField 
                                      v-if="field.type_field === 'map' && selectedComponent === compIndex" 
                                      :field="field"
                                      />
                                      <HelpinputField 
                                      v-if="field.type_field === 'helpinput' && selectedComponent === compIndex" 
                                      :field="field" :disabled="true" />
                                      <EmailField
                                      v-if="field.type_field === 'email' && selectedComponent === compIndex" 
                                      :field="field" :disabled="true" />
                                      <RequirementFileField 
                                      v-if="field.type_field === 'requirementField' && selectedComponent === compIndex" 
                                      :style="fieldIndex % 2 === 0 ? 'background:#eeeeee':''"
                                      :field="field" 
                                      :index="fieldIndex" />
                                      <!--<SimpleSelectField 
                                      v-if="field.type_field === 'simpleSelect' && selectedComponent === compIndex" 
                                      :field="field" 
                                     />-->
                                      <MultiSelectField
                                        v-if="field.type_field === 'multiSelect' && selectedComponent === compIndex"
                                        :field="field" />
                                      <DefaultField
                                        v-if="field.type_field === 'defaultField' && selectedComponent === compIndex"
                                        :field="field" />
                                      <TextareaField
                                        v-if="field.type_field === 'textarea' && selectedComponent === compIndex"
                                        :field="field" />
                                      <MultiuploadField
                                        v-if="field.type_field === 'multiuploadField' && selectedComponent === compIndex"
                                        :field="field" />
                                      <CheckField v-if="field.type_field === 'check' && selectedComponent === compIndex"
                                        :field="field" />
                                      <RadioField v-if="field.type_field === 'radio' && selectedComponent === compIndex"
                                        :field="field" />
                                      <RichTextField
                                        v-if="field.type_field === 'richtextField' && selectedComponent === compIndex"
                                        :field="field" />
                                      <SwitchField
                                        v-if="field.type_field === 'switch' && selectedComponent === compIndex"
                                        :field="field" />
                                      <NestedTableField
                                        v-if="field.type_field === 'nestedTable' && selectedComponent === compIndex"
                                        :field="field" />
                                      <MultiMapField
                                        v-if="field.type_field === 'multimapField' && selectedComponent === compIndex"
                                        :field="field" :table="table" />
                                      <LocalSearchListField 
                                      v-if="field.type_field === 'localSelectSearchField'" 
                                      :field="field" :disabled="true" />
                                      <DateInputField 
                                        v-if="field.type_field === 'dateInput'" 
                                        :field="field" @update-change="makeChange" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- save/print-buttons -->
                        <div class="row justify-content-md-center">
                          <div class="col-3 align-middle pt-2">
                            <button class="btn btn-navega btn-sm btn-label float-left" @click="goBack">
                              <i class="bx bxs-chevrons-left label-icon align-middle fs-18"></i>
                              Anterior
                            </button>
                          </div>
                          <div class="col align-middle">
                            <div class="text-center">
                            </div>
                          </div>
                          <div class="col-3 align-middle pt-2">
                            <button class="btn btn-navega btn-sm btn-label right" @click="goNext">
                              <i class="bx bxs-chevrons-right label-icon align-middle fs-16"></i>
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
    </div>
  </Layout>
</template>
<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";

import "prismjs";
import "prismjs/themes/prism.css";

// services
import { getPreviewProcedureTemplate } from "@/services/tramites";
//import { sendProcedureTemplate, updateProcedureTemplate } from "@/services/tramites";

// components
import GroupName from "@/components/senasag-forms/group-name.vue";
import HelpinputField from "@/components/senasag-forms/fields/helpinput-field.vue"
import MapField from "@/components/senasag-forms/fields/map-field.vue";
import EmailField from "@/components/senasag-forms/fields/email-field.vue";
import RequirementFileField from "@/components/senasag-forms/fields/requirement-file-field.vue";
// import SimpleSelectField from "@/components/senasag-forms/fields/simple-select-field.vue";
import MultiSelectField from "@/components/senasag-forms/fields/multi-select-field.vue";
import DefaultField from "@/components/senasag-forms/fields/default-field.vue";
import TextareaField from "@/components/senasag-forms/fields/textarea-field.vue";
import MultiuploadField from "@/components/senasag-forms/fields/multiupload-field.vue";
import CheckField from "@/components/senasag-forms/fields/check-field.vue";
import RadioField from "@/components/senasag-forms/fields/radio-field.vue";
import RichTextField from "@/components/senasag-forms/fields/rich-text-field.vue";
import SwitchField from '@/components/senasag-forms/fields/switch-field.vue';
import NestedTableField from '@/components/senasag-forms/fields/nested-table-field.vue';
import MultiMapField from '@/components/senasag-forms/fields/multi-map-field.vue';
import LocalSearchListField from "@/components/senasag-forms/fields/local-search-list-field.vue";
import DateInputField from "@/components/senasag-forms/fields/date-input-field.vue";

export default {
  name: "PlantillaPrevia",
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
      steps: [],
      components: [],
      // actions
      selectedComponent: 0,
      // data
      entity: undefined,
      table: [],
      form_data: {},
      isReady: false,
    };
  },
  components: {
    Layout,
    PageHeader,
    GroupName,
    // fields
    HelpinputField,
    MapField,
    EmailField,
    RequirementFileField,
    // SimpleSelectField,
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
  },
  mounted() {
    this.loadTemplate();
  },
  methods: {
    // async load
    loadTemplate() {
      getPreviewProcedureTemplate(this.$route.params.slug)
      .then(res => {
        this.steps = res.steps;
        this.steps.map(step => {
          // this.components = step.components;
          this.components = step.components.filter(c=>c.name!="Clasificación de la Empresa")
              .map(c => ({ ...c, forms: c.forms.filter(f=>!["Documentación del representante legal","Documentación del técnico responsable"].includes(f.name)) }));
          
          this.title = "TRAMITE: " + res.name;
          //this.description = " - " + this.template.descripcion;
        });
        this.isReady = true;
      })
      .catch(err => {
        console.error(err);
      });
    },
    //
    makeChange(data) {
      Object.assign(this.form_data, data);
    },
    makeAsyncList(data) {
      console.log(data);
    },
    makeTable(){
      let formData = {...this.form_data};
      this.table.push(formData);
      //this.sendForm();
    },
    goNext() {
      if (this.components.length > this.selectedComponent+1) {
        this.selectedComponent += 1;
      }
    },
    goBack() {
      if (this.selectedComponent-1 >= 0) {
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
      let componentName = component.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      let [entityUrl] = entities.filter(item => componentName.includes(item));
      this.updateResourceTemplate(entityUrl===undefined?"/":`/${entityUrl}`, this.form_data);
    }
  },
};
</script>