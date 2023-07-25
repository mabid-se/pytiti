<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-header align-items-center d-flex-">
        <h4 class="card-title mb-2 flex-grow-1">
          Registro de productos sin etiqueta
        </h4>
        <h5>
          Esta sección le permitirá agregar productos sin etiquetas como es la
          materia prima.
        </h5>
      </div>
      <div class="card-body">
        <div class="live-preview">
          <div class="row gy-4">
            <div class="col-sm-12 col-lg-12 col-xxl-12">
              <div class="">
                <h4>Datos del producto</h4>
                <div class="row" :set="(v = v$.data)">
                  <div class="col-12">
                    <p class="text-muted fw-medium">Origen:</p>
                    <div class="">
                      <label
                        for="pais_origen"
                        class="form-label"
                        :class="{
                          'text-danger': submitted && v.paisorigen.$error,
                        }"
                        >País origen</label
                      >

                      <MultiChoice
                        ref="nombrePaisMultiChoices"
                        :options="countries"
                        :key-value="'nombrepais'"
                        :key-title="'nombrepais'"
                        :id="'pais_origen'"
                        :name="'pais_origen'"
                        v-model="data.paisorigen"
                      ></MultiChoice>
                      <div
                        v-if="submitted && v.paisorigen.$error"
                        class="error-validation"
                      >
                        El campo es requerido
                      </div>
                    </div>

                    <div class="mt-3">
                      <label
                        for="laboratorioproduccion"
                        class="form-label"
                        :class="{
                          'text-danger':
                            submitted && v.laboratorioproduccion.$error,
                        }"
                        >Producido/Exportado por</label
                      >
                      <input
                        class="form-control disable"
                        id="laboratorioproduccion"
                        name="laboratorioproduccion"
                        v-model="data.laboratorioproduccion"
                        :class="{
                          'is-invalid':
                            submitted && v.laboratorioproduccion.$error,
                        }"
                        :readonly="readOnly"
                      />
                      <div
                        v-for="(item, index) in v.laboratorioproduccion.$errors"
                        :key="index"
                        class="invalid-feedback"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 mt-3">
                    <p class="text-muted fw-medium">Producto:</p>
                    <div class="row">
                      <div class="">
                        <label
                          for="nombrecomercial"
                          class="form-label"
                          :class="{
                            'text-danger':
                              submitted && v.nombrecomercial.$error,
                          }"
                          >Nombre</label
                        >
                        <input
                          class="form-control disable"
                          id="nombrecomercial"
                          name="nombrecomercial"
                          v-model="data.nombrecomercial"
                          :class="{
                            'is-invalid': submitted && v.nombrecomercial.$error,
                          }"
                          :readonly="readOnly"
                        />
                        <div
                          v-for="(item, index) in v.nombrecomercial.$errors"
                          :key="index"
                          class="invalid-feedback"
                        >
                          <span v-if="item.$message">{{ item.$message }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="">
                        <label
                          for="marca"
                          class="form-label"
                          :class="{
                            'text-danger': submitted && v.presentacion.$error,
                          }"
                          >Marca</label
                        >
                        <input
                          v-model="data.presentacion"
                          class="form-control disable"
                          id="marca"
                          name="marca"
                          :class="{
                            'is-invalid': submitted && v.presentacion.$error,
                          }"
                          :readonly="readOnly"
                        />
                        <div
                          v-for="(item, index) in v.presentacion.$errors"
                          :key="index"
                          class="invalid-feedback"
                        >
                          <span v-if="item.$message">{{ item.$message }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-3">
                        <label for="clase" class="form-label">Clase</label>
                        <input
                          class="form-control disable"
                          id="clase"
                          name="clase"
                          v-model="data.clase"
                          readonly
                        />
                      </div>
                      <div class="col-9">
                        <label
                          for="fid_clase_producto"
                          class="form-label"
                          :class="{
                            'text-danger':
                              submitted && v.fid_clase_producto.$error,
                          }"
                          >Opciones</label
                        >
                        <select
                          class="form-select mb-3"
                          v-model="data.fid_clase_producto"
                          :class="{
                            'is-invalid':
                              submitted && v.fid_clase_producto.$error,
                          }"
                          :disabled="readOnly"
                        >
                          <option value="" selected disabled>Seleccione</option>
                          <option :value="fs.id" v-for="fs in classes">
                            {{ fs.etiquetaLineaProducto }}
                          </option>
                        </select>
                        <div
                          v-for="(item, index) in v.fid_clase_producto.$errors"
                          :key="index"
                          class="invalid-feedback"
                        >
                          <span v-if="item.$message">{{ item.$message }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-3">
                        <label for="name" class="form-label">Tipo</label>
                        <input
                          class="form-control"
                          id="name"
                          name="name"
                          v-model="data.tipo"
                          readonly
                        />
                      </div>
                      <div class="col-9">
                        <label
                          for="fid_tipo_producto"
                          class="form-label"
                          :class="{
                            'text-danger':
                              submitted && v.fid_tipo_producto.$error,
                          }"
                          >Opciones</label
                        >
                        <select
                          class="form-select"
                          aria-label=""
                          name="fid_tipo_producto"
                          id="fid_tipo_producto"
                          v-model="data.fid_tipo_producto"
                          :class="{
                            'is-invalid':
                              submitted && v.fid_tipo_producto.$error,
                          }"
                          :disabled="readOnly"
                        >
                          <option value="" selected disabled>Seleccione</option>
                          <option :value="ft.id" v-for="ft in filteredTypes">
                            {{ ft.etiquetaSubClase }}
                          </option>
                        </select>
                        <div
                          v-for="(item, index) in v.fid_tipo_producto.$errors"
                          :key="index"
                          class="invalid-feedback"
                        >
                          <span v-if="item.$message">{{ item.$message }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-12 mt-3">
                    <label
                      for="fid_tipo_producto"
                      class="form-label"
                      :class="{
                        'text-danger': submitted && v.tipoproducto.$error,
                      }"
                      >Tipo Producto</label
                    >
                    <select
                      class="form-select"
                      aria-label="Seleccione"
                      v-model="data.tipoproducto"
                      :class="{
                        'is-invalid': submitted && v.tipoproducto.$error,
                      }"
                      :disabled="readOnly"
                    >
                      <option value="" selected disabled>Seleccione</option>
                      <option :value="tp.clave" v-for="tp in typesProduct">
                        {{ tp.tipoProducto }}
                      </option>
                    </select>
                    <div
                      v-if="submitted && v.tipoproducto.$error"
                      class="error-validation"
                    >
                      El campo es requerido
                    </div>
                  </div>
                  <div class="col-12 mt-3">
                    <label
                      for="fid_tipo_actividad"
                      class="form-label"
                      :class="{
                        'text-danger': submitted && v.fid_tipo_actividad.$error,
                      }"
                      >Tipo Actividad</label
                    >
                    <select
                      class="form-select"
                      aria-label="Seleccione"
                      v-model="data.fid_tipo_actividad"
                      name="fid_tipo_actividad"
                      id="fid_tipo_actividad"
                      :class="{
                        'is-invalid': submitted && v.fid_tipo_actividad.$error,
                      }"
                      :disabled="readOnly"
                    >
                      <option value="" selected disabled>Seleccione</option>
                      <option
                        :value="typeAct.id"
                        v-for="typeAct in typesActivity"
                      >
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

                  <div class="mt-3">
                    <label
                      for="observaciones"
                      class="form-label"
                      :class="{
                        'text-danger': submitted && v.observaciones.$error,
                      }"
                      >Observaciones</label
                    >
                    <textarea
                      v-model="data.observaciones"
                      class="form-control"
                      id="observaciones"
                      name="observaciones"
                      :class="{
                        'is-invalid': submitted && v.observaciones.$error,
                      }"
                      rows="3"
                      :readonly="readOnly"
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
              <div class="col-12 mt-3" v-if="!readOnly">
                <div class="derecha">
                  <button
                    type="button"
                    class="btn btn-success btn-label right"
                    @click="onSubmit"
                  >
                    <i
                      class="ri-file-edit-line label-icon align-middle fs-16 ms-2"
                    ></i>
                    {{ isUpdate ? "Editar producto" : "Agregar producto" }}
                  </button>
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
import useVuelidate from "@vuelidate/core";
import { required, helpers, integer, minLength } from "@vuelidate/validators";
import NotificationHelper from "@/helpers/notification";

import { registerProduct, updateProduct } from "@/services/ProductService";
import MultiChoice from "@/components/widgets/MultiChoice.vue";

export default {
  name: "ProductsSinEtiquetaForm",
  props: {
    classes: {
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
    countries: {
      type: Array,
      required: true,
    },
    requestProcedureId: {
      type: String,
      required: true,
    },
    initialData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.readOnly) this.$refs.nombrePaisMultiChoices.disable();
  },
  components: {
    MultiChoice,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      show_pais_origin: true,
      id: null,
      data: {
        paisorigen: [],
        clase: "",
        tipo: "",
      },
      submitted: false,
    };
  },

  validations() {
    const validations = {
      data: {
        paisorigen: {
          required: helpers.withMessage("El campo es requerido", required),
          minLength: helpers.withMessage(
            "Seleccione al menos uno",
            minLength(1)
          ),
          $each: helpers.forEach({
            required,
          }),
        },
        laboratorioproduccion: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        nombrecomercial: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        presentacion: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        fid_clase_producto: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        fid_tipo_producto: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        tipoproducto: {
          required: helpers.withMessage("El campo es requerido", required),
        },
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

      if (!this.id) {
        const { ok, data } = await registerProduct(
          this.requestProcedureId,
          {
            ...this.data,
            paisorigen: this.data.paisorigen.join(","),
          },
          this.tag
        );
        if (!ok)
          return NotificationHelper.error("Error al registrar producto.");
        NotificationHelper.success("Producto registrado exitosamente.");
        this.resetForm();
        this.$emit("on:submitted", data);
      } else {
        const { ok, data } = await updateProduct(
          this.requestProcedureId,
          this.id,
          {
            ...this.data,
            paisorigen: this.data.paisorigen.join(","),
          },
          this.tag
        );
        if (!ok)
          return NotificationHelper.error("Error al registrar producto.");
        NotificationHelper.success("Producto actualizado exitosamente.");
        this.resetForm();
        this.$emit("on:updated", data);
      }
    },
    resetForm() {
      this.submitted = false;
      this.data.paisorigen = [];
      this.data.laboratorioproduccion = "";
      this.data.nombrecomercial = "";
      this.data.presentacion = "";
      this.data.clase = "";
      this.data.fid_clase_producto = "";
      this.data.tipo = "";
      this.data.fid_tipo_producto = "";
      this.data.tipoproducto = "";
      this.data.fid_tipo_actividad = "";
      this.data.observaciones = "";
      this.id = null;
      this.$refs.nombrePaisMultiChoices.reset();
    },
  },
  computed: {
    filteredTypes() {
      return this.types
        .filter((t) => t.idclase == this.data.clase)
        .sort((a, b) => a.idtipo.localeCompare(b.idtipo));
    },
    isUpdate() {
      return !!this.id;
    },
  },
  watch: {
    "data.fid_clase_producto"(newVal) {
      this.data.tipo = "";
      this.data.fid_tipo_producto = "";
      this.data.clase = this.classes.find((c) => c.id == newVal)?.idclase;
    },
    "data.fid_tipo_producto"(newVal) {
      this.data.tipo = this.filteredTypes.find((c) => c.id == newVal)?.idtipo;
    },
    initialData: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.submitted = false;
        this.data.paisorigen = newVal.paisorigen?.split(",");
        this.data.laboratorioproduccion = newVal.laboratorioproduccion;
        this.data.nombrecomercial = newVal.nombrecomercial;
        this.data.presentacion = newVal.presentacion;
        this.data.clase = newVal.clase;
        this.data.fid_clase_producto = newVal.fid_clase_producto;
        this.data.tipo = newVal.tipo;
        this.data.fid_tipo_producto = newVal.fid_tipo_producto;
        this.data.tipoproducto = newVal.tipoproducto;
        this.data.fid_tipo_actividad = newVal.fid_tipo_actividad;

        this.data.observaciones = newVal.observaciones;
        this.id = newVal.id;
        if (Object.keys(newVal).length > 0 && newVal.paisorigen)
          this.$nextTick(() => {
            this.$refs.nombrePaisMultiChoices.setInitialData(
              newVal.paisorigen.split(",").map((p) => p) || []
            );
          });
      },
    },
  },
};
</script>
