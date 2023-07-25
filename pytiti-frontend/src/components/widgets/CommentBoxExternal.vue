<template>
  <div class="row gy-4">
    <div class="col-sm-12 col-lg-12 col-xxl-12">
      <h4 class="card-title mb-1 flex-grow-1 text-info">
        <i class="ri-message-2-line"></i>
        Escribir mensaje
      </h4>
      <div class="card border card-border-light" :set="(v = v$)">
        <div class="card-body">
          <textarea
            class="form-control"
            :class="{
              'is-invalid': submitted && v.message.$error,
            }"
            id="message"
            name="message"
            rows="3"
            v-model="message"
          ></textarea>
          <div
            v-for="(item, index) in v.message.$errors"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
          </div>
          <div id="basiInputAyuda" class="form-text mb-3">
            Escriba su mensaje lo más detallado posible.
          </div>
          <div>
            <label for="formFileMultiple" class="form-label text-info"
              >Archivos de apoyo</label
            >
            <p class="text-muted">
              Puede adjuntar archivos adicionales que le sean solicitados.
            </p>
            <input
              ref="documents"
              class="form-control"
              type="file"
              id="documents"
              name="documents"
              multiple
              accept="application/pdf"
              @change="onChangeFile"
            />
            <div id="basiInputAyuda" class="form-text mb-2">
              Los documento oficiales deberán ser adjuntados en su respectivo
              componente.
            </div>
          </div>
          <div class="center">
            <button
              @click="onSubmit"
              type="button"
              class="btn btn-info waves-effect waves-light center"
            >
              Enviar mensaje
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--end col-->
  </div>
</template>

<script>
import { required, helpers } from "@vuelidate/validators";
import { registerCommunication } from "@/modules/empresa/services/ComunicacionService";
import NotificationHelper from "@/helpers/notification";
import { userData } from "@/services/user";

import useVuelidate from "@vuelidate/core";
export default {
  name: "CommentBoxExternal",
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    const validations = {
      message: {
        required: helpers.withMessage("El campo es requerido", required),
      },
    };
    return validations;
  },
  data() {
    return {
      message: "",
      documents: [],
      submitted: false,
      companyData: userData(),
    };
  },
  methods: {
    resetForm() {
      this.documents = [];
      this.message = "";
      this.$refs["documents"].value = null;
      this.submitted = false;
    },
    onChangeFile(event) {
      this.documents = [...event.target.files];
    },
    async onSubmit() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      const { ok, data } = await registerCommunication(
        this.companyData.id,
        this.$route.params.slug,
        {
          mensaje: this.message,
          documents: this.documents,
        }
      );

      if (!ok) return NotificationHelper.error("Error al enviar mensaje.");
      NotificationHelper.success("Mensaje enviado exitosamente.");
      this.resetForm();
      this.$emit("on:submitted", data);
    },
  },
};
</script>
