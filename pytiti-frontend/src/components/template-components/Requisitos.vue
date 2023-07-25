<template>
  <div class="col-lg-12">
    <Requisitos
      v-if="!previewMode"
      :read-only="readOnly"
      :request-procedure-id="requestProcedureId"
      :company-id="companyId"
      :requirements="requirements"
    ></Requisitos>
    <RequisitosPreview
      v-else
      :read-only="readOnly"
      :request-procedure-id="requestProcedureId"
      :company-id="companyId"
      :requirements="requirements"
    ></RequisitosPreview>
  </div>
  <div class="col-lg-12" v-if="isSenasagUser">
    <RequisitosNoAsignados
      :read-only="readOnly"
      :request-procedure-id="requestProcedureId"
      @on:addRequirementSuccessfully="
        $emit('on:addRequirementSuccessfully', $event)
      "
    ></RequisitosNoAsignados>
  </div>
</template>

<script>
import Requisitos from "@/components/requisitos/Requisitos.vue";
import RequisitosPreview from "@/components/requisitos/RequisitosPreview.vue";
import RequisitosNoAsignados from "@/components/requisitos/RequisitosNoAsignados.vue";
export default {
  name: "TemplateComponentRequisitos",
  props: {
    isSenasagUser: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    requestProcedureId: {
      type: String,
      required: true,
    },
    companyId: {
      type: String,
      required: true,
    },
    requirements: {
      type: Array,
      required: true,
    },
    previewMode: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Requisitos,
    RequisitosPreview,
    RequisitosNoAsignados,
  },
};
</script>
