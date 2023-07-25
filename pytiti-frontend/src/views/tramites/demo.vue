<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";

import "prismjs";
import "prismjs/themes/prism.css";

// services
// import { getMetadata } from "@/services/metadata";
import { getProcedureTemplate } from "@/services/tramites";
import { sendProcedureTemplateTest } from "@/services/tramites";
import { loginService } from "@/services/auth";
import { saveToken } from "@/services/token";

// components
import GroupName from "@/components/senasag-forms/group-name.vue";
import HelpinputField from "@/components/senasag-forms/fields/helpinput-field.vue"
import MapField from "@/components/senasag-forms/fields/map-field.vue";
import EmailField from "@/components/senasag-forms/fields/email-field.vue";
import RequirementField from "@/components/senasag-forms/fields/requirement-field.vue";
import SimpleSelectField from "@/components/senasag-forms/fields/simple-select-field.vue";
import MultiSelectField from "@/components/senasag-forms/fields/multi-select-field.vue";
import DefaultField from "@/components/senasag-forms/fields/default-field.vue";
import TextareaField from "@/components/senasag-forms/fields/textarea-field.vue";
import MultiuploadField from "@/components/senasag-forms/fields/multiupload-field.vue";
import CheckField from "@/components/senasag-forms/fields/check-field.vue";
import RadioField from "@/components/senasag-forms/fields/radio-field.vue";
import RichTextField from "@/components/senasag-forms/fields/rich-text-field.vue";
import SwitchField from '@/components/senasag-forms/fields/switch-field.vue';
//
import ChatBox from "@/components/senasag-forms/ui-components/ChatBox.vue";
import FaqBox from "@/components/senasag-forms/ui-components/FaqBox.vue";
import SearchBy from "@/components/senasag-forms/ui-components/SearchBy";

export default {
  name: "Tramites",
  data() {
    return {
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
      entity: 0,
      enable: true,
      form: {},
      form_data: {},
      active_tab: 0,
      available_tabs: 0,
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
    DefaultField,
    TextareaField,
    MultiuploadField,
    CheckField,
    RadioField,
    RichTextField,
    SwitchField,
    //
    ChatBox,
    FaqBox,
    SearchBy
  },
  mounted() {
    getProcedureTemplate("A903D899ED")
        .then(res => {
          this.form = res;
          this.title = this.form.name;
          res.steps.map(step => {
            this.available_tabs = step.components.length;
          });
        })
        .catch(err => {
          console.error(err);
        });
  },
  beforeMount () {
      loginService({user: "adminpytiti@mail.com", password: "12345678x"})
        .then(res => {
            saveToken(res.session.access_token);
        });
  },
  methods: {
    selectTab(index) {
      this.active_tab = index;
      this.entity = index+1; // remove this line when component entity is fixed in backend
    },
    nextTab () {
      let navLinkTabs = [...document.querySelectorAll(`#${this.form.slug} .nav-link`)];
      navLinkTabs[this.active_tab].classList.toggle("active");
      this.active_tab += 1;
      navLinkTabs[this.active_tab].classList.toggle("active");
    },
    backTab() {
      let navLinkTabs = [...document.querySelectorAll(`#${this.form.slug} .nav-link`)];
      navLinkTabs[this.active_tab].classList.toggle("active");
      this.active_tab -= 1;
      navLinkTabs[this.active_tab].classList.toggle("active");
    },
    makeChange(data) {
      Object.assign(this.form_data, data);
    },
    makeCoordinates(data) {
      console.log(data);
    },
    submitForm () { // stop using this method when the enpoint exists (/api/v1/tramites/<slug>/plantilla/registrar/<entity>/)
      // let step = this.form.steps.length-1;
      // let entity = this.form.steps[step].components[this.active_tab].entity;
      let formData = {
        entity: this.entity,
        form_data: this.form_data
      }
      sendProcedureTemplateTest("1DB38501BA", formData, "persona")
        .then(res => {
          console.log(res);
          this.form_data = {}
        })
        .catch(err => {
          console.error(err);
        });
    },
    sendForm () { // Use this method when the endpoint exists (/api/v1/tramites/<slug>/plantilla/registrar/<entity>/)
      let formData = new FormData();
      for(let key in this.form_data) {
        formData.append(key, this.form_data[key]);
      }

      sendProcedureTemplateTest("1DB38501BA", formData)
        .then(res => {
          console.log(res);
          this.form_data = {}
        })
        .catch(err => {
          console.error(err);
        })
    }
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div 
    class="card-header align-items-center d-flex-no color-cabecera-ia"
    v-for="(step, index) in form.steps" 
    :key="index">
      <h5 class="card-title mb-0 flex-grow-1"><span>Registro sanitario de empresas del rubro alimenticio</span> <span>(Procesadoras de alimentos, cámaras frigoríficas, cámaras de maduración de productos vegetales y empresas fraccionadoras de alimentos y bebidas)</span> - <span>Categoría industrial</span></h5>
      <h6 class="card-title mb-0 flex-grow-1">{{ step.name }}</h6>
    </div>
    <div class="row" :id="form.slug">
        <div class="col-lg-2 col-xxl-2" v-if="enable">
          <div 
          class="nav nav-pills flex-column nav-pills-tab custom-verti-nav-pills text-center" 
          id="v-pills-tab" 
          role="tablist" 
          aria-orientation="vertical"
          v-for="(step, stepIndex) in form.steps" :key="stepIndex">
            <a 
            v-for="(component, compIndex) in step.components" 
            :key="compIndex" 
            @click="selectTab(compIndex)"
            :class="'nav-link ' + [active_tab === compIndex ? 'active' : '']" 
            :id="'v-pills-' + component.slug" 
            data-bs-toggle="pill" 
            :href="'#v-pills-' + component.slug" 
            role="tab" 
            :aria-controls="'v-pills-' + component.slug" 
            :aria-selected="[active_tab === compIndex ? true : false]">
              {{ component.name }}
            </a>
          </div>
        </div>
        <div class="col-lg-6 col-xxl-7">
          <SearchBy />
          <div 
          class="tab-content text-muted mt-4 mt-md-0" 
          v-for="(step, stepIndex) in form.steps" :key="stepIndex"
          :id="'v-pills-tabContent'+stepIndex">
            <div 
            v-for="(component, compIndex) in step.components" 
            :key="compIndex" 
            :class="'tab-pane fade ' + [active_tab === compIndex ? 'active show' : '']" 
            :id="'v-pills-'+component.slug" 
            role="tabpanel" 
            :aria-labelledby="'v-pills-'+component.slug">
              <div class="col-lg-12">
                <div class="card" v-for="(form, formIndex) in component.forms" :key="formIndex">
                  <GroupName :name="form.name" />
                  <div class="card-body">
                    <div class="live-preview">
                      <div class="row gy-4">
                        <div 
                        v-for="(field, fieldIndex) in form.fields" 
                        :class="field.col" 
                        :key="fieldIndex">
                          <MapField 
                          @update-coordinates="makeCoordinates" 
                          :field="field" />
                          <HelpinputField 
                          @update-change="makeChange" 
                          :field="field" />
                          <EmailField 
                          @update-change="makeChange" 
                          :field="field" />
                          <RequirementField 
                          :style="fieldIndex % 2 === 0 ? 'background:#eeeeee':''"
                          :field="field" 
                          :index="fieldIndex" />
                          <SimpleSelectField 
                          :field="field" 
                          @update-change="makeChange" />
                          <MultiSelectField 
                          :field="field" 
                          @update-change="makeChange" />
                          <DefaultField 
                          :field="field" 
                          @update-change="makeChange" />
                          <TextareaField 
                          :field="field" 
                          @update-change="makeChange" />
                          <MultiuploadField 
                          :field="field"
                          @update-change="makeChange" />
                          <CheckField
                          :field="field" 
                          @update-change="makeChange" />
                          <RadioField
                          :field="field"
                          @update-change="makeChange" />
                          <RichTextField 
                          :field="field"
                          @update-change="makeChange" />
                          <SwitchField
                          :field="field" 
                          @update-change="makeChange" />
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
                  :disabled="active_tab === 0">
                  <i class="ri-arrow-left-circle-fill label-icon align-middle rounded-pill fs-16 me-2"></i>
                    Anterior
                  </button>
                </div>
                <div class="col-6 col-sm-4 btn_cen">
                  <button @click="submitForm" type="button" class="btn btn-guardar btn-label right"><i class="ri-save-line label-icon align-middle fs-16 ms-2"></i>
                    Guardar
                  </button>
                </div>
                <div class="col btn_der">
                  <button 
                  @click="nextTab" 
                  type="button" 
                  class="btn btn-navega btn-label right rounded-pill"
                  :disabled="active_tab === available_tabs-1">
                  <i class="ri-arrow-right-circle-fill label-icon align-middle rounded-pill fs-16 ms-2"></i>
                    Siguiente
                  </button>
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

<style scoped>
    /* .nav-link.active {
        background: #f7b84b;
        color: #000;
    }
    .nav-link {
        background: #0ab39c;
        color: #fff;
    } */
</style>