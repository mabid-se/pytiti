<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <TramiteHeader
      v-if="!loading"
      :title="currentTemplate.titulo"
      :description="currentTemplate.descripcion"
    ></TramiteHeader>
    <div class="row" v-if="!loading">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body p-0 opacity-100">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs custom" id="templateTabs" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-bs-toggle="tab"
                  href="#nav-stages"
                  role="tab"
                  aria-selected="true"
                >
                  Etapas
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  href="#nav-requirements"
                  role="tab"
                  aria-selected="false"
                >
                  Requisitos
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  href="#nav-entry"
                  role="tab"
                  aria-selected="false"
                >
                  Rubros
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  href="#nav-print"
                  role="tab"
                  aria-selected="false"
                >
                  Impresión de registro
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  data-bs-toggle="tab"
                  href="#nav-useful-documents"
                  role="tab"
                  aria-selected="false"
                >
                  Documentos de ayuda
                </a>
              </li>
            </ul>

            <div class="tab-content" style="border-top: none">
              <div class="tab-pane active" id="nav-stages" role="tabpanel">
                <StepStages
                  v-if="tabs.stages.show"
                  :mode="tabs.stages.mode"
                  :steps="steps"
                  @on:update:mode="tabs.stages.mode = $event"
                  @on:reload:stages="reloadStages"
                  :key="stagesKey"
                ></StepStages>
              </div>
              <div class="tab-pane" id="nav-requirements" role="tabpanel">
                <StepRequirements
                  v-if="tabs.requirements.show"
                  :mode="tabs.requirements.mode"
                  @on:update:mode="tabs.requirements.mode = $event"
                ></StepRequirements>
              </div>
              <div class="tab-pane" id="nav-entry" role="tabpanel">
                <StepHeadings
                  v-if="tabs.headings.show"
                  :mode="tabs.headings.mode"
                  @on:update:mode="tabs.headings.mode = $event"
                ></StepHeadings>
              </div>
              <div class="tab-pane" id="nav-print" role="tabpanel">
                <div class="d-flex" v-if="tabs.print.show">
                  <div class="flex-shrink-0">
                    <i class="ri-checkbox-circle-line text-success"></i>
                  </div>
                  <div class="flex-grow-1 ms-2">
                    when darkness overspreads my eyes, and heaven and earth seem
                    to dwell in my soul and absorb its power, like the form of a
                    beloved mistress, then I often think with longing, Oh, would
                    I could describe these conceptions, could impress upon paper
                    all that is living so full and warm within me, that it might
                    be the.
                    <div class="mt-2">
                      <a href="javascript:void(0);" class="btn btn-link"
                        >Read More
                        <i class="ri-arrow-right-line ms-1 align-middle"></i
                      ></a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="nav-useful-documents" role="tabpanel">
                <StepHelpDocuments
                  v-if="tabs.helpDocuments.show"
                  :mode="tabs.helpDocuments.mode"
                  @on:update:mode="tabs.helpDocuments.mode = $event"
                ></StepHelpDocuments>
              </div>
            </div>
          </div>
          <!-- end card-body -->
        </div>
      </div>
      <!--end col-->
    </div>
    <div
      class="spinner-grow text-success"
      style="width: 3rem; height: 3rem"
      role="status"
      v-if="loading"
    >
      <span class="visually-hidden">Cargando...</span>
    </div>
  </Layout>
</template>

<script>
import NotificationHelper from "@/helpers/notification";
import Layout from "@/layouts/main.vue";
import PageHeader from "@/components/page-header";
import TramiteHeader from "@/components/tramites/detalle/header.vue";
import StepStages from "@/components/tramites/detalle/steps/stages";
import StepRequirements from "@/components/tramites/detalle/steps/requirements.vue";
import StepHeadings from "@/components/tramites/detalle/steps/headings.vue";
import StepHelpDocuments from "@/components/tramites/detalle/steps/help-documents.vue";
import { Tab } from "bootstrap";
import { getSteps } from "@/services/creador-tramites/etapas";
import { getProcedureById } from "@/services/creador-tramites/tramites";

export default {
  name: "TramitesDetalle",
  components: {
    Layout,
    PageHeader,
    StepHelpDocuments,
    StepHeadings,
    StepStages,
    StepRequirements,
    TramiteHeader,
  },
  data() {
    return {
      loading: true,
      title: "MÓDULO DE CREACIÓN Y MODIFICACIÓN DE FORMULARIOS",
      items: [
        {
          text: "Senasag",
          href: "/",
        },
        {
          text: "Proof of Concept",
          active: true,
        },
      ],
      tabs: {
        stages: {
          mode: "list",
          show: true,
        },
        requirements: {
          mode: "list",
          show: false,
        },
        headings: {
          mode: "list",
          show: false,
        },
        print: {
          mode: "list",
          show: false,
        },
        helpDocuments: {
          mode: "list",
          show: false,
        },
      },
      currentTemplate: {},
      stagesKey: 0,
      steps: [],
    };
  },
  methods: {
    reloadStages() {
      getSteps(this.$route.params.idTramite).then(async (r) => {
        const { ok, data } = r;
        if (!ok) {
          return NotificationHelper.error("Errores al obtener la información");
        }
        this.stagesKey = this.stagesKey + 1;
        this.steps = data;
        this.tabs.stages.mode = "list";
      });
    },
  },
  mounted() {
    Promise.all([
      getSteps(this.$route.params.idTramite),
      getProcedureById(this.$route.params.idTramite),
    ]).then(([{ ok, data }, { ok: ok2, data: data2 }]) => {
      if (!ok || !ok2) {
        return NotificationHelper.error("Errores al obtener la información");
      }
      this.loading = false;
      this.currentTemplate = data2;
      this.steps = data;
      this.$nextTick().then(() => {
        const triggerTabList = [].slice.call(
          document.querySelectorAll("#templateTabs a")
        );
        triggerTabList.forEach((triggerEl) => {
          const tabTrigger = new Tab(triggerEl);

          triggerEl.addEventListener("click", (event) => {
            switch (triggerEl.getAttribute("href")) {
              case "#nav-stages":
                this.tabs.stages.show = true;
                break;
              case "#nav-requirements":
                this.tabs.requirements.show = true;
                break;
              case "#nav-entry":
                this.tabs.headings.show = true;
                break;
              case "#nav-print":
                this.tabs.print.show = true;
                break;
              case "#nav-useful-documents":
                this.tabs.helpDocuments.show = true;
                break;
            }
            event.preventDefault();
            tabTrigger.show();
          });
        });
      });
    });
  },
};
</script>
