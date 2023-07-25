<template>
  <div class="row gy-4">
    <div class="col-sm-12 col-lg-12 col-xxl-12">
      <h4 class="card-title mb-1 flex-grow-1 text-info">
        <i class="ri-message-2-line"></i>
        Escribir mensaje
      </h4>
      <div class="card border card-border-light" :set="(v = v$)">
        <div class="card-body">
          <div class="row mb-3">
            <div class="col-6" v-if="!isExternal">
              Seleccione a quién desea enviar el mensaje:
            </div>
            <div class="col-6">
              <div class="mb-2" v-if="!isExternal">
                <select
                  v-model="user_receiver"
                  class="form-select mb-3"
                  :class="{
                    'is-invalid': submitted && v.user_receiver?.$error,
                  }"
                >
                  <option selected disabled v-if="isExternal" :value="null">
                    Usuario solicitante
                  </option>
                  <option selected disabled v-else :value="null">
                    Seleccione al usuario del SENASAG
                  </option>
                  <option :value="option.id" v-for="option in options">
                    {{ option.username }} - {{ option.first_name }}
                    {{ option.last_name }}
                  </option>
                </select>
                <div
                  v-for="(item, index) in v.user_receiver?.$errors"
                  :key="index"
                  class="invalid-feedback"
                >
                  <span v-if="item.$message">{{ item.$message }}</span>
                </div>
                <div id="basiInputAyuda" class="form-text mb-3">
                  Escriba su mensaje lo más detallado posible.
                </div>
              </div>
              <div class="form-check mb-2" v-if="!hideCheckbox">
                <input
                  id="open"
                  name="open"
                  class="form-check-input"
                  type="checkbox"
                  :checked="open === 'True'"
                  @change="open = $event.target.checked ? 'True' : 'False'"
                />
                <label class="form-check-label" for="open">
                  Permitir edición de información
                </label>
              </div>
            </div>
          </div>

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
// import { registerCommunication } from "@/modules/empresa/services/ComunicacionService";
// import { registerCommunication } from "@/modules/empresa/services/ComunicacionService";
import { registerCommunication } from "@/modules/senasag/services/ComunicacionService";
import NotificationHelper from "@/helpers/notification";
import { userData } from "@/services/user";

import useVuelidate from "@vuelidate/core";
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: () => {},
    },
    hideCheckbox: {
      type: Boolean,
      default: false,
    },
  },
  name: "CommentBoxSenasag",
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    const validations = {
      message: {
        required: helpers.withMessage("El campo es requerido", required),
      },
    };
    if (this.type == "internal")
      validations["user_receiver"] = {
        required: helpers.withMessage("El campo es requerido", required),
      };
    return validations;
  },
  data() {
    return {
      message: "",
      documents: [],
      user_receiver: null,
      submitted: false,
      companyData: userData(),
      open: "False",
      tipo: this.type == "external" ? "EXTERNO" : "INTERNO",
    };
  },
  computed: {
    isExternal() {
      return this.type == "external";
    },
  },
  methods: {
    resetForm() {
      this.documents = [];
      this.message = "";
      this.user_receiver = null;
      this.$refs["documents"].value = null;
      this.submitted = false;
      this.open = "False";
    },
    onChangeFile(event) {
      this.documents = [...event.target.files];
    },
    async onSubmit() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      const { ok, data } = await registerCommunication(
        this.$route.params.id_solicitud_tramite,
        {
          mensaje: this.message,
          documents: this.documents,
          user_receiver: this.user_receiver,
          open: this.open,
          tipo: this.tipo,
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
