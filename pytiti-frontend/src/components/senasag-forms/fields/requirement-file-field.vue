<template>
  <div class="row pb-2 pt-2">
    <div class="">
      <label>{{ index + 1 }}. {{ field.label }}</label
      ><br />
      <label>{{ field.title }}</label>
    </div>

    <div class="col-sm-12 col-lg-7 col-xxl-6">
      <input
        :disabled="disabled"
        @change="uploadFileRequirement"
        accept="application/pdf"
        type="file"
        class="form-control mb-2"
        name="requirement_copia_certificado_sanitario"
        multiple
      />
    </div>
    <div class="col-sm-12 col-lg-5 col-xxl-6">
      <button
        @click="enableModal"
        class="btn btn-info btn-label waves-effect waves-light btn-md mt-0 mb-1 mx-1"
        type="button"
        data-bs-toggle="modal"
        :data-bs-target="`#myModal0-${index}`"
      >
        <i class="las la-eye label-icon align-middle fs-16 me-2"></i> Ver
        Ejemplo
      </button>
      <a
        class="btn btn-info btn-label waves-effect waves-light btn-md mt-0 mb-1 mx-1"
        :href="exampleFile"
        target="_blank"
        download=""
      >
        <i class="las la-download label-icon align-middle fs-16 me-2"></i>
        Descargar Ejemplo
      </a>
    </div>

    <div class="col-sm-12 col-lg-12 col-xxl-12" v-if="!!field.value">
      <div class="border rounded border-dashed p-2">
        <div class="row">
          <div class="col-lg-6" v-for="(req, index) in fileValues" :key="index">
            <div class="d-flex align-items-center">
              <div class="flex-shrink-0 me-3">
                <div class="avatar-sm">
                  <div
                    class="avatar-title bg-light text-secondary rounded fs-24"
                  >
                    <i class="ri-folder-zip-line"></i>
                  </div>
                </div>
              </div>
              <div class="flex-grow-1 overflow-hidden">
                <h5 class="fs-13 mb-1">
                  <a
                    :href="req.fid_documento.ruta_url"
                    class="text-body text-truncate d-block"
                    target="_blank"
                    >{{ fileName(req.fid_documento) }}</a
                  >
                </h5>
              </div>
              <div class="flex-shrink-0 ms-2">
                <div class="d-flex gap-1">
                  <a
                    :href="req.fid_documento.ruta_url"
                    target="_blank"
                    class="btn btn-icon text-muted btn-sm fs-18"
                    download
                  >
                    <i class="ri-download-2-line text-muted"></i>
                  </a>
                  <button
                    v-if="!disabled"
                    class="btn btn-icon text-muted btn-sm fs-18"
                    type="button"
                  >
                    <i
                      class="ri-delete-bin-fill align-bottom me-2 text-muted"
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end col -->

    <!-- <div class="col-sm-12 col-lg-12 col-xxl-12">
        <div>
            <label for="exampleFormControlTextarea5" class="form-label">Comentario adicional</label>
            <textarea class="form-control" id="exampleFormControlTextarea5" rows="1"></textarea>
            <div id="basiInputAyuda" class="form-text">
                Escriba un comentario sobre los documentos cargados.
            </div>
        </div>
    </div> -->
    <!--end col -->
  </div>

  <div
    :id="`myModal0-${index}`"
    class="modal fade"
    tabindex="-1"
    :aria-labelledby="`myModal0-${index}`"
    style="display: none"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="`myModal0-${index}`">
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
          <embed :src="exampleFile" width="100%" height="500" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-info" data-bs-dismiss="modal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
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
</template>

<script>
import { uploadRequirementTemplate } from "@/services/plantilla";

export default {
  name: "RequirementFileField",

  props: {
    field: {
      type: Object,
    },
    index: {
      type: Number,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errorVuelidate: {
      type: [Array],
      required: false,
    },
  },
  data() {
    return {
      showModal: false,
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
  computed: {
    // fileName() {
    //     let file = this.field.value.ruta.split("/");
    //     return file[file.length-1];
    // },
    fileValues() {
      return this.field.value;
    },
    exampleFile() {
      return `https://pytiti.thiswebsite.info${this.field.entity_field.example_file}`;
      // return this.field.value === null ? null : this.field.value.ruta_url;
    },
  },
  methods: {
    fileName(reqFile) {
      let file = reqFile.ruta.split("/");
      return file[file.length - 1];
    },
    enableModal() {
      this.showModal = true;
    },
    uploadFileRequirement(e) {
      let formData = new FormData();
      let files = [...e.target.files];
      formData.append("id_solicitud_tramite", this.$route.params.slug);
      for (let file in files) {
        formData.append("ruta", files[file]);
      }

      uploadRequirementTemplate(this.field.id, formData).then(
        (res) => {
          if (res.error) {
            this.errorAttrs.title = "Error al subir archivo";
            this.errorAttrs.message = "";
            this.errorAttrs.show = true;
          } else {
            this.successAttrs.title = "Archivos subidos exitoso";
            this.successAttrs.message = "";
            this.successAttrs.show = true;
          }
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
};
</script>

<style></style>
