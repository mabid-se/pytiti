<template>
  <div class="card">
    <div class="card-header align-items-center d-flex">
      <h4 class="card-title mb-0 flex-grow-1">Requisitos Adicionales</h4>
    </div>
    <div class="card-body pt-0">
      <div class="live-preview">
        <div class="row gy-4 pt-3">
          <div class="" v-for="r in requirements" :key="r.id">
            <div class="row pb-2 pt-2">
              <div class="col-md-12">
                <button
                  class="btn btn-info btn-label waves-effect waves-light btn-md mt-0 mb-1"
                  type="button"
                  @click="addUnassignedRequirement(r.id)"
                >
                  <i
                    class="mdi mdi-folder-multiple-plus label-icon align-middle fs-16 me-2"
                  ></i>
                  Agregar
                </button>
                <div class="">
                  <label>{{ r.name }}</label
                  ><br /><label>{{ r.help_detail }}</label>
                </div>
              </div>

              <div class="col-sm-12 col-lg-7 col-xxl-6">
                <div class="input-group mb-3">
                  <input
                    :disabled="readOnly"
                    :ref="`inputFile${r.id}`"
                    accept="application/pdf"
                    type="file"
                    class="form-control"
                    :name="`requirements${r.id}[]`"
                    multiple
                  />
                  <button
                    type="button"
                    class="btn btn-success px-3"
                    v-if="data[r.id] && data[r.id].length > 0"
                  >
                    <i class="mdi mdi-content-save-outline mr-0"></i>
                  </button>
                </div>
                <br />
              </div>
              <div class="col-sm-12 col-lg-5 col-xxl-6">
                <button
                  class="btn btn-info btn-label waves-effect waves-light btn-md mt-0 mb-1 mx-1"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal0-0"
                  v-if="r.example_file"
                >
                  <i class="las la-eye label-icon align-middle fs-16 me-2"></i>
                  Ver Ejemplo
                </button>
                <a
                  v-if="r.download_example"
                  class="btn btn-info btn-label waves-effect waves-light btn-md mt-0 mb-1 mx-1"
                  :href="r.download_example"
                  target="_blank"
                  download=""
                  ><i
                    class="las la-download label-icon align-middle fs-16 me-2"
                  ></i>
                  Descargar Ejemplo
                </a>
              </div>
              <!---->
            </div>
            <div
              id="myModal0-0"
              class="modal fade"
              tabindex="-1"
              aria-labelledby="myModal0-0"
              aria-hidden="true"
              style="display: none"
            >
              <div class="modal-dialog modal-dialog-scrollable modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="myModal0-0">
                      Archivo de ejemplo
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <embed
                      type="application/pdf"
                      :src="r.example_file"
                      width="100%"
                      height="500"
                    />
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-info"
                      data-bs-dismiss="modal"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationHelper from "@/helpers/notification";

import {
  getUnassignedRequirements,
  addUnassignedRequirement,
} from "@/modules/empresa/services/SolicitudTramiteRequisito";
export default {
  name: "UnassignedRequirements",
  props: {
    requestProcedureId: {
      type: String,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.loadRequirements();
  },
  data() {
    return { data: {}, requirements: [] };
  },
  methods: {
    async loadRequirements() {
      const { ok, data: res } = await getUnassignedRequirements(
        this.requestProcedureId
      );
      if (!ok)
        return NotificationHelper.error(
          "Error al cargar el requisitos no asignados."
        );
      this.requirements = res.results;
    },

    async addUnassignedRequirement(requirementId) {
      const { ok } = await addUnassignedRequirement(
        this.requestProcedureId,
        requirementId
      );
      if (!ok) return NotificationHelper.error("Error al agregar requisito.");
      NotificationHelper.success("Requisito agregado exitosamente.");

      const deletedRequirement = {
        ...this.requirements.find((r) => r.id === requirementId),
      };
      this.requirements = this.requirements.filter(
        (r) => r.id !== requirementId
      );
      this.$emit("on:addRequirementSuccessfully", deletedRequirement);
    },
  },
};
</script>

<style></style>
