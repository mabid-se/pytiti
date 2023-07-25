<template src="./TramitePlantillaEditar.html"></template>
<script>
import PageHeader from "@/components/page-header";

import "prismjs";
import "prismjs/themes/prism.css";

// services
import { saveComponentInfo } from "@/services/plantilla";

import {
  getComponentFieldsTemplate,
  getGridData,
  deleteEntity,
  updateEntity,
} from "@/modules/empresa/services/PlantillaService";
import {
  goForward,
  goForwardChangeStatus,
} from "@/modules/senasag/services/PlantillaService";
import { verifyProcedureRequestSettlement } from "@/modules/senasag/services/SolicitudesService";

import SenasagForms from "@/components/senasag-forms";

import DocumentosInspeccion from "@/components/template-components/DocumentosInspeccion.vue";
import Requisitos from "@/components/template-components/Requisitos.vue";
import ProductosConEtiqueta from "@/components/template-components/ProductosConEtiqueta.vue";
import ProductosSinEtiqueta from "@/components/template-components/ProductosSinEtiqueta.vue";
import Continuar from "@/components/template-components/Finalizar/Continuar.vue";
import ContinuarInspeccion from "@/components/template-components/Finalizar/Continuar.vue";
import Enviar from "@/components/template-components/Finalizar/Enviar.vue";
import ProductosPetPcr from "@/components/template-components/ProductosPetPcr.vue";
import ProductosSA from "@/components/template-components/ProductosSA.vue";
import ProductosSV from "@/components/template-components/ProductosSV.vue";
import ImprimirListaProductos from "@/components/template-components/ImprimirListaProductos.vue";

import NecesitaLiquidacion from "@/components/template-components/NecesitaLiquidacion.vue";

import ProgramacionInspeccion from "@/components/template-components/ProgramacionInspeccion/Index.vue";
import TasaRubro from "@/components/template-components/TasaRubro.vue";
import Liquidacion from "@/components/template-components/Liquidacion.vue";
import Categoria from "@/components/template-components/Categoria.vue";
import Concluir from "@/components/template-components/Finalizar/Concluir.vue";
import Imprimir from "@/components/template-components/Imprimir.vue";
import GalponesAdmin from "@/components/template-components/GalponesAdmin.vue";

import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import { Modal } from "bootstrap";

import Spinner from "@/components/widgets/spinner";

import NotificationHelper from "@/helpers/notification";

import InforModal from "@/components/pytiti/info-modal.vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers, email } from "@vuelidate/validators";

import {
  getStartedTemplate,
  deleteTemplateProcedure,
  verifyAccreditation,
  checkMatricula,
  checkMatriculaRepresentantes
} from "@/modules/empresa/services/PlantillaService";

import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "TramitePlantillaEditarAdmin",
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
      requirements: [],
      inspectionDocs: [],
      currentComponentTable: [],
      idEntityToDeleteOrUpdate: null,
      modalDelete: null,
      requestProcedure: null,
      currentStep: null,
      formFieldToComponent: {},
      settlement: {},
      accreditedVeterinarian: null,
      seprecInfo: null,
      componentThatNeedsSettlement: [
        "DocumentosInspeccion",
        "ProgramacionInspeccion",
        "Concluir",
        "Imprimir",
        "Cerrar",
      ],
      imprimir: {
        paper: false,
      },
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    PageHeader,
    ...SenasagForms,
    Spinner,
    InforModal,
    DeleteConfirmationModal,
    Continuar,
    ContinuarInspeccion,
    Enviar,
    Requisitos,
    DocumentosInspeccion,
    ProgramacionInspeccion,
    TasaRubro,
    Liquidacion,
    Categoria,
    NecesitaLiquidacion,
    Concluir,
    Imprimir,
    GalponesAdmin,
    ProductosConEtiqueta,
    ProductosSinEtiqueta,
    ProductosPetPcr,
    ProductosSA,
    ProductosSV,
    ImprimirListaProductos,
  },
  mounted() {
    this.modalDelete = new Modal(`#${this.deleteData.id}`, {
      backdrop: "static",
    });
    this.loadTemplate();
  },
  methods: {
    loadTemplate() {
      Promise.all([
        getStartedTemplate(this.$route.params.id_solicitud_tramite),
        verifyProcedureRequestSettlement(
          this.$route.params.id_solicitud_tramite
        ),
      ]).then(([{ ok, data: res }, { ok: ok2, data: data2, errors }]) => {
        const r = data2 || errors;
        this.settlement = {
          ok: ok2,
          message: r.message,
        };
        if (!ok) return NotificationHelper.error("Error al cargar el trámite.");

        this.requestProcedure = res;
        this.template = res.fid_tramite;
        this.steps = this.template.plantilla_tramite.steps;
        this.requirements = res.assigned_requirements;
        this.inspectionDocs =
          this.template.plantilla_tramite.inspeccion_documents;
        this.setCurrentStep(this.requestProcedure.fid_etapa_actual_admin);
      });
    },
    async checkMatriculaSeprec (){
      const matriculas = await checkMatricula(this.requestProcedure.fid_empresa.nit)
      const representantes = await checkMatriculaRepresentantes(this.requestProcedure.fid_empresa.nit)
      this.seprecInfo = matriculas.data?.data?.infoMatricula && representantes.data?.data?.Representantes ? {...matriculas.data.data,...representantes.data.data.Representantes} :""
    },
    formatDate(date, format = "DD/MM/YYYY") {
      return moment(date).format(format);
    },
    setCurrentStep(stepId, component_id = null) {
      this.currentStep = this.steps.find((s) => s.id == stepId);

      if (!this.currentStep)
        return console.log(`current admin step was not found`);

      this.components = this.currentStep.components;

      this.title = "TRAMITE: " + this.template.titulo;
      this.changeSelectedComponent(
        component_id ? component_id : this.components[0].id
      );
      this.isReady = true;
    },

    makeChange(data) {
      Object.keys(data).forEach((key) => {
        data[key] =
          data[key] == "null" || data[key] == "undefined" ? "" : data[key];
      });
      Object.assign(this.form_data, data);
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
    async handleRequest() {
      this.v$.$touch();
      if (this.v$.$invalid) return;
      const { ok } = await saveComponentInfo(
        this.$route.params.id_solicitud_tramite,
        this.requestProcedure.fid_empresa.id,
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
        this.$route.params.id_solicitud_tramite,
        this.requestProcedure.fid_empresa.id,
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
        this.$route.params.id_solicitud_tramite,
        this.requestProcedure.fid_empresa.id,
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
      this.form_data = {};
      this.v$.$reset();
      this.currentComponentTable = [];
      this.currentComponent = null;

      Promise.all([
        verifyProcedureRequestSettlement(
          this.$route.params.id_solicitud_tramite
        ),
        getComponentFieldsTemplate(
          this.$route.params.id_solicitud_tramite,
          componentId,
          this.requestProcedure.fid_empresa.id
        ),
      ]).then(async ([{ ok, data, errors }, { ok: ok2, data: res2 }]) => {
        const r = data || errors;
        this.settlement = {
          ok,
          message: r.message,
        };

        if (!ok2)
          return NotificationHelper.error("Error al cargar el componente.");
        if (res2.grid && !res2.entity)
          return console.log(
            "The component does not have an entity. Grid components must provide an entity"
          );
        if(res2.tipo_persona==="Técnico"){
          const accreditedVeterinarian = await verifyAccreditation(this.requestProcedure.fid_tecnico.idcarnet)
          this.accreditedVeterinarian = {status:accreditedVeterinarian.status_code,...accreditedVeterinarian.data?.data}
        }
        if (res2.grid) {
          getGridData(
            this.$route.params.id_solicitud_tramite,
            this.requestProcedure.fid_empresa.id,
            res2.entity.name
          ).then(({ ok: ok3, data: res3 }) => {
            if (!ok3)
              return NotificationHelper.error("Error al cargar el componente.");
            this.currentComponentTable = res3.results;
          });
        }

        this.currentComponent = res2;

        if (
          this.currentComponent.managed_by_vue &&
          this.componentThatNeedsSettlement.includes(
            this.currentComponent.component_vue
          ) &&
          !this.settlement.ok
        ) {
          this.currentComponent.component_vue = "NecesitaLiquidacion";
        }

        if (this.currentComponent.entity.name == "galpones") {
          this.currentComponent.managed_by_vue = true;
          this.currentComponent.component_vue = "GalponesAdmin";
        }
      });
    },

    async goForward() {
      const { ok } = await goForward(this.$route.params.id_solicitud_tramite);
      if (!ok)
        return NotificationHelper.error(
          "Error al avanzar a la siguiente etapa."
        );
      NotificationHelper.success(
        "Se avanzó a la siguiente etapa exitosamente."
      );
      this.$router.push({ name: "senasag.lista.tramites.llenados" });
    },

    async goForwardChangingStatus(newStatus) {
      const { ok } = await goForwardChangeStatus(
        this.$route.params.id_solicitud_tramite,
        newStatus
      );
      if (!ok)
        return NotificationHelper.error(
          "Error al avanzar a la siguiente etapa."
        );
      NotificationHelper.success(
        "Se avanzó a la siguiente etapa exitosamente."
      );
      this.$router.push({ name: "senasag.lista.tramites.llenados" });
    },
  },
  computed: {
    hideButton() {
      return this.currentComponent.managed_by_vue || this.readOnly;
    },
    hidePrintButton() {
      /* return (
        !this.currentComponent.managed_by_vue ||
        this.currentComponent.component_vue != "Imprimir" ||
        this.requestProcedure.estado == "RECHAZADO"
      ); */
      return true;
    },
    readOnly() {
      return true;
    },
    ...mapGetters("authfack", ["isSenasagUser"]),
    currentComponentPropsAndEvents() {
      switch (this.currentComponent.component_vue) {
        case "Requisitos":
          return {
            readOnly: this.readOnly,
            requirements: this.requirements,
            requestProcedureId: this.$route.params.id_solicitud_tramite,
            companyId: this.requestProcedure.fid_empresa.id,
            isSenasagUser: this.isSenasagUser,
            handleEvent: {
              "on:addRequirementSuccessfully": (requirement) => {
                this.requirements.push(requirement);
              },
            },
          };
        case "DocumentosInspeccion":
          return {
            inspectionDocs: this.inspectionDocs,
            requestProcedureId: this.$route.params.id_solicitud_tramite,
            companyId: this.requestProcedure.fid_empresa.id,
            handleEvent: {},
          };
        case "ProgramacionInspeccion":
          return {
            requestProcedure: this.requestProcedure,
            handleEvent: {},
          };

        case "NecesitaLiquidacion":
          return {
            message: this.settlement.message,
            handleEvent: {},
          };
        case "TasaRubro":
          return {
            liquidationValidation: this.settlement,
            handleEvent: {},
          };

        case "Continuar":
          return {
            liquidationValidation: this.settlement,
            handleEvent: {
              "on:continue": () => {
                this.goForward();
              },
              "on:close": () => {
                deleteTemplateProcedure(
                  this.$route.params.id_solicitud_tramite,
                  this.requestProcedure.fid_empresa.id
                ).then(({ ok }) => {
                  if (!ok)
                    return NotificationHelper.error(
                      "Error al archivar el trámite."
                    );
                  NotificationHelper.success("Trámite archivado exitosamente.");
                  this.$router.push({
                    name: "senasag.lista.tramites.llenados",
                  });
                });
              },
            },
          };

        case "ContinuarInspeccion":
          return {
            liquidationValidation: this.settlement,
            handleEvent: {
              "on:continue": () => {
                this.goForwardChangingStatus("INSPECCION");
              },
              "on:close": () => {
                deleteTemplateProcedure(
                  this.$route.params.id_solicitud_tramite,
                  this.requestProcedure.fid_empresa.id
                ).then(({ ok }) => {
                  if (!ok)
                    return NotificationHelper.error(
                      "Error al archivar el trámite."
                    );
                  return NotificationHelper.success(
                    "Trámite archivado exitosamente."
                  );
                });
              },
            },
          };
        case "Concluir":
          return {
            requestProcedure: this.requestProcedure,
            handleEvent: {
              "on:closedSuccessfully": () => {
                this.loadTemplate();
              },
            },
          };

        case "Imprimir":
          return {
            handleEvent: {
              "on:paperChanged": (newPaper) => {
                this.imprimir.paper = newPaper;
              },
              "on:modePrintChanged": (newMode) => {
                this.imprimir.mode = newMode;
              },
            },
          };

        case "GalponesAdmin":
          return {
            requestProcedure: this.requestProcedure,
            handleEvent: {},
          };

        case "ProductosConEtiqueta":
          return {
            requestProcedureId: this.$route.params.id_solicitud_tramite,
            readOnly: true,
            handleEvent: {},
          };
        case "ProductosSinEtiqueta":
          return {
            requestProcedureId: this.$route.params.id_solicitud_tramite,
            readOnly: true,
            handleEvent: {},
          };
        case "ProductosPetPcr":
          return {
            requestProcedureId: this.$route.params.id_solicitud_tramite,
            handleEvent: {},
          };
        case "ProductosSA":
          return {
            requestProcedureId: this.$route.params.id_solicitud_tramite,
            handleEvent: {},
          };
        case "ProductosSV":
          return {
            requestProcedureId: this.$route.params.id_solicitud_tramite,
            handleEvent: {},
          };
        case "ImprimirListaProductos":
          return {
            requestProcedureId: this.$route.params.id_solicitud_tramite,
            handleEvent: {},
          };
        default:
          return {
            handleEvent: {},
          };
      }
    },
    printUrl() {
      const host = process.env.VUE_APP_PROD_URL;
      return `${host}api/v1/tramites/pdf/${
        this.requestProcedure.id_solicitud_tramite
      }/${this.imprimir.paper ? "impreso" : "digital"}/${
        this.imprimir.mode
      }/sin-membrete`;
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
</style>
