<template>
  <teleport to="#modals">
    <div class="modal fade" :id="idModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalgridLabel">
              Etiqueta (Rótulo)
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form action="javascript:void(0);">
              <div class="row g-3" :set="(v = v$.data)">
                <div class="col-12">
                  <div>
                    <label
                      for=""
                      class="form-label"
                      :class="{
                        'text-danger': submitted && v.imagen.$error,
                      }"
                      >Cargar imagen</label
                    >

                    <input
                      class="form-control"
                      type="file"
                      id="imagen"
                      name="imagen"
                      :class="{
                        'is-invalid': submitted && v.imagen.$error,
                      }"
                      accept="image/jpeg"
                      ref="imageInput"
                      @change="updateFile"
                    />
                    <div
                      v-for="(item, index) in v.imagen.$errors"
                      :key="index"
                      class="invalid-feedback"
                    >
                      <span v-if="item.$message">{{ item.$message }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div>
                    <label
                      for=""
                      class="form-label"
                      :class="{
                        'text-danger': submitted && v.lado.$error,
                      }"
                      >Lado</label
                    >
                    <select
                      class="form-select"
                      :class="{
                        'is-invalid': submitted && v.lado.$error,
                      }"
                      v-model="data.lado"
                    >
                      <option selected="" disabled="">Seleccione</option>
                      <option value="Anverso">Anverso</option>
                      <option value="Reverso">Reverso</option>
                      <option value="Separata">Separata</option>
                      <option value="Anexa">Anexa</option>
                    </select>
                    <div
                      v-for="(item, index) in v.lado.$errors"
                      :key="index"
                      class="invalid-feedback"
                    >
                      <span v-if="item.$message">{{ item.$message }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="hstack gap-2 justify-content-end">
                    <button
                      type="button"
                      class="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      class="btn btn-primary"
                      @click="onSubmit"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Lado</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="etiqueta in etiquetas">
                    <td>{{ etiqueta.lado }}</td>
                    <td><a :href="etiqueta.imagen" target="_blank">Ver</a></td>
                    <td>
                      <button
                        class="btn btn-info btn-sm"
                        type="button"
                        @click="onDelete(etiqueta.id)"
                      >
                        <div class="btn-content">Eliminar</div>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div></teleport
  >
</template>

<script>
import { Modal } from "bootstrap";
import { generateId } from "@/helpers/string";
import useVuelidate from "@vuelidate/core";
import formMixin from "@/mixins/formMixin";
import NotificationHelper from "@/helpers/notification";

import {
  getPrincipiosActivos,
  registerPrincipioActivo,
  delelePrincipioActivo,
} from "@/services/ProductSAService";

import { getTags, registerTag, deleleTag } from "@/services/ProductSVService";
// lado, imagen
import {
  required,
  helpers,
  integer,
  minLength,
  minValue,
} from "@vuelidate/validators";
export default {
  name: "Etiquetas",
  mixins: [formMixin],
  props: {
    product: {
      type: Object,
      required: true,
    },
    requestProcedureId: {
      type: String,
      required: true,
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      idModal: generateId(),
      modalInstance: null,
      submitted: false,
      data: {
        nombre: "",
      },
      principiosActivo: [],
      etiquetas: [],
    };
  },
  async mounted() {
    await this.$nextTick();
    this.modalInstance = new Modal(`#${this.idModal}`, {
      backdrop: "static",
    });
  },
  methods: {
    updateFile() {
      this.data.imagen = this.$refs.imageInput.files[0];
    },
    async show() {
      const { ok: ok2, data: res2 } = await getTags(
        this.requestProcedureId,
        this.product.id
      );
      if (!ok2) return NotificationHelper.error("Error al cargar etiquetas.");
      this.etiquetas = res2.results;
      this.modalInstance.show();
    },
    hide() {
      this.resetForm();
      this.modalInstance.hide();
    },
    resetForm() {
      this.data = {
        lado: "",
        imagen: null,
      };
      this.$refs.imageInput.value = "";
      this.submitted = false;
    },
    async onDelete(id) {
      const { ok } = await deleleTag(
        this.requestProcedureId,
        this.product.id,
        id
      );
      if (!ok) return NotificationHelper.error("Error al eliminar.");
      this.etiquetas = this.etiquetas.filter((e) => e.id != id);
      NotificationHelper.success("Eliminado exitosamente.");
    },
    async onSubmit() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      if (!this.id) {
        const { ok, data } = await registerTag(
          this.requestProcedureId,
          this.product.id,
          {
            ...this.data,
          }
        );
        if (!ok)
          return NotificationHelper.error(
            "Error al registrar etiqueta activo."
          );
        NotificationHelper.success("Etiqueta registrada exitosamente.");
        this.etiquetas.push(data);
        this.resetForm();
      }
    },
  },
  validations() {
    const validations = {
      data: {
        lado: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        imagen: {
          required: helpers.withMessage("El campo es requerido", required),
        },
      },
    };

    return validations;
  },
};
</script>
