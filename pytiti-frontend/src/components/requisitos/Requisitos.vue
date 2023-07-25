<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-header align-items-center d-flex">
        <h4 class="card-title mb-0 flex-grow-1">Requisitos</h4>
      </div>
      <div class="card-body pt-0">
        <div class="live-preview">
          <div class="row gy-4 pt-3">
            <div v-for="(r, index) in requirements" :key="r.id">
              <div class="row pb-2 pt-2">
                <div class="">
                  <label>{{ index + 1 }}.{{ r.name }}</label
                  ><br /><label>{{ r.help_detail }}</label>
                </div>
                <div class="row">
                  <div class="col-sm-12 col-lg-7 col-xxl-6">
                    <div class="input-group">
                      <input
                        :disabled="readOnly"
                        :ref="`inputFile${r.id}`"
                        @change="onChangeFile($event, r.id)"
                        accept="application/pdf"
                        type="file"
                        class="form-control"
                        :name="`requirements${r.id}[]`"
                        multiple
                      />
                    </div>
                    <br />
                  </div>

                  <div class="col-sm-12 col-lg-5 col-xxl-6">
                    <a
                      class="btn btn-info btn-label waves-effect waves-light btn-md mt-0 mb-1 mx-1"
                      v-if="r.example_file"
                      :href="r.example_file"
                      target="_blank"
                    >
                      <i
                        class="las la-eye label-icon align-middle fs-16 me-2"
                      ></i>
                      Ver Ejemplo
                    </a>

                    <a
                      v-if="r.download_example"
                      class="btn btn-info btn-label waves-effect waves-light btn-md mt-0 mb-1 mx-1"
                      :href="r.download_example"
                      target="_blank"
                      download
                      ><i
                        class="las la-download label-icon align-middle fs-16 me-2"
                      ></i>
                      Descargar Ejemplo
                    </a>
                  </div>

                  <div class="col-md-12">
                    <button
                      class="btn btn-success btn-label waves-effect waves-light btn-md mt-0 mb-1 mx-1"
                      @click.prevent="saveRequirement(r.id)"
                      v-if="data[r.id] && data[r.id].length > 0"
                    >
                      <i
                        class="las la-save label-icon align-middle fs-16 me-2"
                      ></i>
                      Guardar
                    </button>
                  </div>

                  <div
                    class="d-flex align-items-center border border-dashed p-2 rounded"
                    v-for="fr in filledRequirementsFormated[r.id]"
                    :key="fr"
                  >
                    <div class="flex-shrink-0 avatar-sm">
                      <div class="avatar-title bg-light rounded">
                        <i class="ri-file-zip-line fs-20 text-primary"></i>
                      </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <h6 class="mb-1">
                        <a :href="fr.fid_documento.ruta_url" target="_blank">{{
                          fr.fid_documento.ruta.split("/").pop()
                        }}</a>
                      </h6>
                      <small class="text-muted"></small>
                    </div>
                    <div class="hstack gap-3 fs-16">
                      <a
                        :href="fr.fid_documento.ruta_url"
                        target="_blank"
                        class="text-muted"
                        ><i class="ri-download-2-line fs-20"></i
                      ></a>
                      <a
                        v-if="!readOnly"
                        class="text-muted"
                        @click="onShowDeleteConfirmation(fr.id)"
                      >
                        <i class="ri-delete-bin-line fs-20 pointer"></i>
                      </a>
                    </div>
                  </div>
                </div>
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
  </div>
  <teleport to="#modals">
    <DeleteConfirmationModal
      @send-confirmation="onDelete"
      :attrs="deleteData"
    />
  </teleport>
</template>

<script>
import NotificationHelper from "@/helpers/notification";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import { Modal } from "bootstrap";

import {
  getFilledRequirements,
  deleteFilledRequirement,
  saveRequirement,
} from "@/modules/empresa/services/SolicitudTramiteRequisito";
export default {
  name: "Requirements",
  components: {
    DeleteConfirmationModal,
  },
  props: {
    requirements: {
      type: Array,
      required: true,
    },
    companyId: {
      type: String,
      required: true,
    },
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
    this.modalDelete = new Modal(`#${this.deleteData.id}`, {
      backdrop: "static",
    });
    this.loadRequirements();
  },
  data() {
    return {
      idRequirementToDelete: null,
      filledRequirements: [],
      data: {},
      deleteData: {
        id: "deleteRequestProcedureRequirementModal",
        title: "¿Estás seguro?",
        message: "Está seguro de elimina éste registro",
        buttonText: "Sí, eliminar registro",
      },
      modalDelete: null,
    };
  },
  methods: {
    async loadRequirements() {
      const { ok, data: res } = await getFilledRequirements(
        this.requestProcedureId,
        this.companyId
      );
      if (!ok)
        return NotificationHelper.error(
          "Error al cargar el requisitos llenados."
        );
      this.filledRequirements = res.results;
    },
    onShowDeleteConfirmation(id) {
      this.idRequirementToDelete = id;
      this.modalDelete.show();
    },
    onChangeFile(event, reqId) {
      this.data[reqId] = [...event.target.files];
    },
    async onDelete() {
      const { ok } = await deleteFilledRequirement(
        this.requestProcedureId,
        this.idRequirementToDelete
      );
      if (!ok)
        return NotificationHelper.error(
          "Error al cargar el eliminar requisito."
        );
      NotificationHelper.success("Requisito eliminado exitosamente.");
      this.loadRequirements();
    },
    async saveRequirement(reqId) {
      const { ok } = await saveRequirement(
        this.requestProcedureId,
        this.companyId,
        reqId,
        {
          requirements: this.data[reqId],
        }
      );
      if (!ok)
        return NotificationHelper.error("Error al cargar el requisitos.");
      NotificationHelper.success("Requisito cargado exitosamente.");
      this.$refs[`inputFile${reqId}`][0].value = null;
      delete this.data[reqId];
      this.loadRequirements();
    },
  },
  computed: {
    filledRequirementsFormated() {
      const requirements = {};
      this.requirements.forEach((r) => {
        requirements[r.id] = this.filledRequirements
          .filter((fr) => fr.fid_requisito == r.id)
          .map((fr) => ({
            ...fr,
            fid_documento: {
              ...fr.fid_documento,
              ruta_url: fr.fid_documento.ruta,
              ruta:
                (fr.fid_documento.ruta.split("/").slice(-1)[0].length > 40
                  ? "..."
                  : "") +
                fr.fid_documento.ruta.split("/").slice(-1)[0].slice(-40),
            },
          }));
      });
      return requirements;
    },
    formattedFieldsValue() {
      const data = this.field.value || [];
      return data.map((ff) => ({
        ...ff,
        ruta:
          (ff.ruta_url.split("/").slice(-1)[0].length > 40 ? "..." : "") +
          ff.ruta_url.split("/").slice(-1)[0].slice(-40),
      }));
    },
  },
};
</script>
