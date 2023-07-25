<template>
  <div class="col-sm-12 col-lg-12 col-xxl-12">
    <div class="mb-3">
      <h4>Datos del producto</h4>
      <div class="row" :set="(v = v$.data)">
        <div class="col-12">
          <p class="text-muted fw-medium">Origen:</p>
          <div class="mb-3">
            <label for="pais_origen" class="form-label text-muted"
              >País origen</label
            >
            <input
              class="form-control disable"
              id="pais_origen"
              name="pais_origen"
              v-model="response.data.etiquetaPaisOrigen"
              readonly
            />
          </div>
          <div class="mb-3">
            <label for="producido_por" class="form-label"
              >Producido/Exportado por</label
            >
            <input
              class="form-control disable"
              id="producido_por"
              name="producido_por"
              v-model="response.data.etiquetaElaborador"
              readonly
            />
          </div>
        </div>
        <div class="col-12">
          <p class="text-muted fw-medium">Producto:</p>
          <div class="row">
            <div class="mb-3">
              <label for="nombre_producto" class="form-label">Nombre</label>
              <input
                class="form-control disable"
                id="nombre_producto"
                name="nombre_producto"
                v-model="response.data.etiquetaNombreProducto"
                readonly
              />
            </div>
          </div>
          <div class="row">
            <div class="mb-3">
              <label for="exampleInputdate" class="form-label">Marca</label>
              <input
                class="form-control disable"
                id="basiInput"
                v-model="response.data.etiquetaNombreProducto"
                readonly
              />
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <label for="exampleInputdate" class="form-label">Clase</label>
              <input
                class="form-control disable"
                id="basiInput"
                v-model="data.clase"
                readonly
              />
            </div>
            <div class="col-9">
              <label for="opciones_clase" class="form-label">Opciones</label>
              <select
                class="form-select mb-3"
                disabled
                v-model="data.fid_clase_producto"
              >
                <option :value="fs.id" v-for="fs in filteredClasses">
                  {{ fs.etiquetaLineaProducto }}
                </option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <label for="exampleInputdate" class="form-label">Tipo</label>
              <input
                class="form-control"
                id="basiInput"
                v-model="data.tipo"
                readonly
              />
            </div>
            <div class="col-9">
              <label for="opciones_tipo" class="form-label">Opciones</label>
              <select
                class="form-select mb-3"
                disabled
                v-model="data.fid_tipo_producto"
              >
                <option :value="ft.id" v-for="ft in filteredTypes">
                  {{ ft.etiquetaSubClase }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-12">
          <label for="exampleInputdate" class="form-label">Tipo Producto</label>
          <select
            class="form-select mb-3"
            aria-label="Seleccione"
            disabled
            v-model="data.tipoproducto"
          >
            <option value="" disabled="">Seleccione</option>
            <option :value="tp.clave" v-for="tp in typesProduct">
              {{ tp.tipoProducto }}
            </option>
          </select>
        </div>
        <div class="col-12">
          <label
            for="actividad"
            class="form-label"
            :class="{
              'text-danger': submitted && v.fid_tipo_actividad.$error,
            }"
            >Tipo Actividad</label
          >
          <select
            name="actividad"
            id="actividad"
            class="form-select"
            :class="{
              'is-invalid': submitted && v.fid_tipo_actividad.$error,
            }"
            v-model="data.fid_tipo_actividad"
          >
            <option value="" selected disabled>Seleccione</option>
            <option :value="typeAct.id" v-for="typeAct in typesActivity">
              {{ typeAct.nombreactividad }}
            </option>
          </select>

          <div
            v-for="(item, index) in v.fid_tipo_actividad.$errors"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>

        <div>
          <label
            for="observacion"
            class="form-label mt-3"
            :class="{
              'text-danger': submitted && v.observaciones.$error,
            }"
            >Observaciones</label
          >
          <textarea
            v-model="data.observaciones"
            class="form-control"
            :class="{
              'is-invalid': submitted && v.observaciones.$error,
            }"
            id="observacion"
            name="observacion"
            rows="3"
          ></textarea>
          <div
            v-for="(item, index) in v.observaciones.$errors"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12">
      <div class="derecha">
        <button
          type="button"
          class="btn btn-success btn-label right"
          @click="onSubmit"
        >
          <i class="ri-file-edit-line label-icon align-middle fs-16 ms-2"></i>
          Agregar producto
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers, integer } from "@vuelidate/validators";
import NotificationHelper from "@/helpers/notification";

import { registerProduct } from "@/services/ProductService";

export default {
  name: "ProductsConEtiquetaForm",
  props: {
    classes: {
      type: Array,
      required: true,
    },
    responseProp: {
      type: Object,
      required: true,
    },
    filteredClasses: {
      type: Array,
      required: true,
    },
    filteredTypes: {
      type: Array,
      required: true,
    },
    typesProduct: {
      type: Array,
      required: true,
    },
    typesActivity: {
      type: Array,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
    tag: {
      type: Boolean,
      default: false,
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
      response: JSON.parse(JSON.stringify(this.responseProp)),
      data: {
        tipoproducto: this.typesProduct.find(
          (tp) => tp.tipoProducto == this.responseProp.data.tipoProducto
        )?.clave,
        fid_clase_producto: this.classes.find(
          (cl) => cl.nombreclase == this.responseProp.data.etiquetaLineaProducto
        )?.id,
        fid_tipo_producto: this.types.find(
          (t) => t.nombretipo == this.responseProp.data.etiquetaSubClase
        )?.id,
        clase: this.classes.find(
          (cl) => cl.nombreclase == this.responseProp.data.etiquetaLineaProducto
        )?.idclase,
        tipo: this.types.find(
          (t) => t.nombretipo == this.responseProp.data.etiquetaSubClase
        )?.idtipo,
      },
      submitted: false,
    };
  },
  validations() {
    const validations = {
      data: {
        fid_tipo_actividad: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        observaciones: {
          required: helpers.withMessage("El campo es requerido", required),
        },
      },
    };

    return validations;
  },
  methods: {
    async onSubmit() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      const { ok, data } = await registerProduct(
        this.requestProcedureId,
        {
          ...this.response.data,
          ...this.data,
        },
        this.tag
      );

      if (!ok) return NotificationHelper.error("Error al registrar producto.");
      NotificationHelper.success("Producto registrado exitosamente.");

      this.$emit("on:submitted", data);
    },
  },
};
</script>
