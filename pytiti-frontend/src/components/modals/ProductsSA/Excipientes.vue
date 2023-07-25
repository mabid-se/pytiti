<template>
  <teleport to="#modals">
    <div
      class="modal fade"
      :id="idModal"
      tabindex="-1"
      aria-labelledby="exampleModalgridLabel"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalgridLabel">Excipiente</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form action="javascript:void(0);" :set="(v = v$.data)">
              <div class="row g-3">
                <div class="col-12">
                  <div>
                    <label
                      for=""
                      class="form-label"
                      :class="{
                        'text-danger': submitted && v.nombre.$error,
                      }"
                      >Nombre</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      :class="{
                        'is-invalid': submitted && v.nombre.$error,
                      }"
                      id="nombre"
                      name="nombre"
                      placeholder=""
                      v-model="data.nombre"
                    />
                    <div
                      v-for="(item, index) in v.nombre.$errors"
                      :key="index"
                      class="invalid-feedback"
                    >
                      <span v-if="item.$message">{{ item.$message }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div>
                    <label
                      for=""
                      class="form-label"
                      :class="{
                        'text-danger': submitted && v.cantidad.$error,
                      }"
                      >Cantidad</label
                    >
                    <input
                      type="number"
                      step="1"
                      min="0"
                      class="form-control"
                      :class="{
                        'is-invalid': submitted && v.cantidad.$error,
                      }"
                      id="cantidad"
                      name="cantidad"
                      placeholder=""
                      v-model.number="data.cantidad"
                      @keypress="isNumber($event)"
                    />
                    <div
                      v-for="(item, index) in v.cantidad.$errors"
                      :key="index"
                      class="invalid-feedback"
                    >
                      <span v-if="item.$message">{{ item.$message }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div>
                    <label
                      for=""
                      class="form-label"
                      :class="{
                        'text-danger': submitted && v.fid_unidad_medida.$error,
                      }"
                      >Medida</label
                    >
                    <select
                      class="form-select mb-3"
                      aria-label="Default select example"
                      :class="{
                        'is-invalid': submitted && v.fid_unidad_medida.$error,
                      }"
                      v-model="data.fid_unidad_medida"
                    >
                      <option selected disabled>Seleccione</option>
                      <option :value="um.id" v-for="um in unidadesMedida">
                        {{ um.medida }}
                      </option>
                    </select>
                    <div
                      v-for="(item, index) in v.fid_unidad_medida.$errors"
                      :key="index"
                      class="invalid-feedback"
                    >
                      <span v-if="item.$message">{{ item.$message }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="hstack gap-2 justify-content-end">
                    <button type="button" class="btn btn-danger" @click="hide">
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
                    <th scope="col">Nombre</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Medida</th>
                    <th scope="col">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="pa in principiosActivo">
                    <td>{{ pa.nombre }}</td>
                    <td>{{ pa.cantidad }}</td>
                    <td>{{ pa.medida }}</td>
                    <td>
                      <button
                        class="btn btn-info btn-sm"
                        type="button"
                        @click="onDelete(pa.id)"
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
    </div>
  </teleport>
</template>

<script>
import { Modal } from "bootstrap";
import { generateId } from "@/helpers/string";
import useVuelidate from "@vuelidate/core";
import formMixin from "@/mixins/formMixin";
import NotificationHelper from "@/helpers/notification";

import {
  getExcipientes,
  deleleExcipiente,
  registerExcipiente,
} from "@/services/ProductSAService";

import {
  required,
  helpers,
  integer,
  minLength,
  minValue,
} from "@vuelidate/validators";
export default {
  name: "Excipientes",
  mixins: [formMixin],
  props: {
    unidadesMedida: {
      type: Array,
      required: true,
    },
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
    };
  },
  async mounted() {
    await this.$nextTick();
    this.modalInstance = new Modal(`#${this.idModal}`, {
      backdrop: "static",
    });
  },
  methods: {
    async show() {
      const { ok, data } = await getExcipientes(
        this.requestProcedureId,
        this.product.id
      );
      if (!ok)
        return NotificationHelper.error("Error al cargar principios activos");
      this.principiosActivo = data.results;
      this.modalInstance.show();
    },
    hide() {
      this.resetForm();
      this.modalInstance.hide();
    },
    resetForm() {
      this.data.nombre = "";
      this.data.cantidad = "";
      this.data.fid_unidad_medida = "";
      this.submitted = false;
    },
    async onDelete(id) {
      const { ok } = await deleleExcipiente(
        this.requestProcedureId,
        this.product.id,
        id
      );
      if (!ok) return NotificationHelper.error("Error al eliminar.");
      this.principiosActivo = this.principiosActivo.filter((pr) => pr.id != id);
      NotificationHelper.success("Eliminado exitosamente.");
    },
    async onSubmit() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      if (!this.id) {
        const { ok, data } = await registerExcipiente(
          this.requestProcedureId,
          this.product.id,
          {
            ...this.data,
          }
        );
        if (!ok)
          return NotificationHelper.error(
            "Error al registrar principio activo."
          );
        NotificationHelper.success("Principio activo registrado exitosamente.");
        this.principiosActivo.push(data);
        this.resetForm();
      }
    },
  },
  validations() {
    const validations = {
      data: {
        nombre: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        cantidad: {
          required: helpers.withMessage("El campo es requerido", required),
          integer: helpers.withMessage("Debe ser un número entero", integer),
          minValue: helpers.withMessage(
            "Debe ser un entero positivo",
            minValue(1)
          ),
        },
        fid_unidad_medida: {
          required: helpers.withMessage("El campo es requerido", required),
        },
      },
    };

    return validations;
  },
};
</script>
