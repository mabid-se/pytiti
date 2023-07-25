<template>
  <div class="row">
    <div class="row">
      <div class="col-lg-12">
        <label
          :class="{
            required: field.required,
            'text-danger': errorVuelidate && errorVuelidate.length > 0,
          }"
          >{{ field.label }}</label
        >
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <input
          accept="image/png,image/jpg,image/jpeg,.pdf,.doc,.docx"
          type="file"
          class="form-control"
          :required="field.required"
          :disabled="field.read_only || readOnly"
          :name="[
            field.entity_field === null ? field.name : field.entity_field.name,
          ]"
          :class="{
            'is-invalid': errorVuelidate && errorVuelidate.length > 0,
          }"
          @change="handleChange"
          multiple
        />
        <div
          v-for="(item, index) in errorVuelidate"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
          <span v-else>{{ item }}</span>
        </div>

        <div
          class="d-flex align-items-center border border-dashed p-2 rounded"
          v-for="(f, index) in formattedFieldsValue || []"
          :key="index"
        >
          <div class="flex-shrink-0 avatar-sm">
            <div class="avatar-title bg-light rounded">
              <i class="ri-file-zip-line fs-20 text-primary"></i>
            </div>
          </div>
          <div class="flex-grow-1 ms-3">
            <h6 class="mb-1">
              <a href="javascript:void(0);">{{ f.ruta }}</a>
            </h6>
            <small class="text-muted"></small>
          </div>
          <div class="hstack gap-3 fs-16">
            <a :href="f.ruta_url" target="_blank" class="text-muted"
              ><i class="ri-download-2-line"></i></a
            ><a
              v-if="!field.read_only && !readOnly"
              @click.prevent="deleteFileMetadata(index, f.id_documento)"
              class="text-muted"
              ><i class="ri-delete-bin-line"></i
            ></a>
          </div>
        </div>
        <div
          class="d-flex align-items-center border border-dashed p-2 rounded"
          v-for="(f, index) in filesShow"
          :key="index"
        >
          <div class="flex-shrink-0 avatar-sm">
            <div class="avatar-title bg-light rounded">
              <i class="ri-file-zip-line fs-20 text-primary"></i>
            </div>
          </div>
          <div class="flex-grow-1 ms-3">
            <h6 class="mb-1">
              <a href="javascript:void(0);">{{ f.name }}</a>
            </h6>
            <small class="text-muted">{{ fileOnMb(f) }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//
import { deleteFileMetadata } from "@/services/plantilla";

import NotificationHelper from "@/helpers/notification";

import { mapGetters } from "vuex";
export default {
  name: "MultiuploadField",
  props: {
    field: {
      type: Object,
    },
    errorVuelidate: {
      type: [Array],
      required: false,
    },
    readOnly: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      file: {
        size: undefined,
        name: "Subir",
      },
      files: [],
      filesShow: [],
    };
  },
  computed: {
    formattedFieldsValue() {
      const data = this.field.value || [];
      return data.map((ff) => ({
        ...ff,
        ruta:
          (ff.ruta_url.split("/").slice(-1)[0].length > 40 ? "..." : "") +
          ff.ruta_url.split("/").slice(-1)[0].slice(-40),
      }));
    },
    fileMBSize() {
      if (this.file.size) {
        let sizeMB = this.file.size / 1024 / 1024;
        return `${sizeMB.toFixed(2)}MB`;
      }
      return "";
    },
    ...mapGetters("permissions", ["userIsAdmin"]),
  },
  methods: {
    mounted() {
      if (!this.field.entity_field)
        console.error("Entity field was not provided");
    },
    fileOnMb(file) {
      let size = file.size / 1024 / 1024;
      return `${size.toFixed(2)}MB`;
    },
    // handleFile(file) {
    //   console.log(file);
    //   this.filesShow.push({
    //     size: file.size,
    //     name: file.name,
    //   });
    //   console.log(this.filesShow);
    // },
    cleanFile(index) {
      let file = [
        ...document.querySelector(`input[name="${this.field.name}"]`).files,
      ];
      file.splice(index, 1);
      this.files.splice(index, 1);
    },
    handleChange(e) {
      if (!e.target.hasAttribute("disabled")) {
        let files = [...e.target.files];
        files.map((file) => {
          if (file.size < 15 * 1024 * 1024) {
            this.files.push(file);
            // this.handleFile(file);
          }
        });
        this.$emit("update-change", {
          [this.field.entity_field.id]: [...this.files],
        });
      }
    },
    async deleteFileMetadata(index, idDocument) {
      const { ok } = await deleteFileMetadata(
        this.field.entity_field.name,
        idDocument
      );
      console.log(ok);
      if (!ok) {
        NotificationHelper.error(
          "Ocurrió un error al eliminar archivo",
          "Error actualizar datos",
          10000
        );
      } else {
        NotificationHelper.success(
          "Archivo eliminado exitosamente.",
          "Datos actualizados",
          10000
        );
        this.$emit("on:delete-metadata-file", index);
      }
    },
  },
};
</script>

<style scoped>
.label-req-field:hover {
  cursor: pointer;
}
</style>
