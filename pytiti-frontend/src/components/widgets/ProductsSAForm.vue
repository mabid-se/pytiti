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
              <div>
                <h4>Datos del producto</h4>
                <div class="row" :set="(v = v$.data)">
                  <div class="col-12">
                    <p class="text-muted fw-medium">Origen:</p>
                    <div>
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
                        for="laboratoriotitular"
                        class="form-label"
                        :class="{
                          'text-danger':
                            submitted && v.laboratoriotitular.$error,
                        }"
                        >Lab. Titular</label
                      >
                      <input
                        class="form-control disable"
                        id="laboratoriotitular"
                        name="laboratoriotitular"
                        v-model="data.laboratoriotitular"
                        :class="{
                          'is-invalid':
                            submitted && v.laboratoriotitular.$error,
                        }"
                      />
                      <div
                        v-for="(item, index) in v.laboratoriotitular.$errors"
                        :key="index"
                        class="invalid-feedback"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
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
                        >Lab. producción</label
                      >
                      <input
                        class="form-control disable"
                        id="productor"
                        name="productor"
                        v-model="data.laboratorioproduccion"
                        :class="{
                          'is-invalid':
                            submitted && v.laboratorioproduccion.$error,
                        }"
                      />
                      <div
                        v-for="(item, index) in v.laboratorioproduccion.$errors"
                        :key="index"
                        class="invalid-feedback"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                      </div>
                    </div>

                    <div class="mt-3">
                      <label
                        for="productor"
                        class="form-label"
                        :class="{
                          'text-danger': submitted && v.formulaquimica.$error,
                        }"
                        >Período de retiro</label
                      >
                      <input
                        class="form-control disable"
                        id="formulaquimica"
                        name="formulaquimica"
                        v-model="data.formulaquimica"
                        :class="{
                          'is-invalid': submitted && v.formulaquimica.$error,
                        }"
                      />
                      <div
                        v-for="(item, index) in v.formulaquimica.$errors"
                        :key="index"
                        class="invalid-feedback"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                      </div>
                    </div>

                    <div>
                      <label
                        for="momentoaplicacion"
                        class="form-label"
                        :class="{
                          'text-danger':
                            submitted && v.momentoaplicacion.$error,
                        }"
                        >Vía administración</label
                      >

                      <MultiChoice
                        ref="momentoAplicacionMultiChoices"
                        :options="viasAdministracion"
                        :key-value="'valor'"
                        :key-title="'valor'"
                        :id="'momentoaplicacion'"
                        :name="'momentoaplicacion'"
                        v-model="data.momentoaplicacion"
                      ></MultiChoice>

                      <div
                        v-if="submitted && v.momentoaplicacion.$error"
                        class="error-validation"
                      >
                        El campo es requerido
                      </div>
                    </div>
                  </div>
                  <div class="col-12 mt-3">
                    <p class="text-muted fw-medium">Producto:</p>
                    <div class="row">
                      <div class="col-4">
                        <div class="mb-3">
                          <label
                            for="idproducto"
                            class="form-label"
                            :class="{
                              'text-danger': submitted && v.idproducto.$error,
                            }"
                            >Código</label
                          >
                          <input
                            class="form-control disable"
                            id="idproducto"
                            name="idproducto"
                            v-model="data.idproducto"
                            :class="{
                              'is-invalid': submitted && v.idproducto.$error,
                            }"
                          />
                          <div
                            v-for="(item, index) in v.idproducto.$errors"
                            :key="index"
                            class="invalid-feedback"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-8">
                        <div class="mb-3">
                          <label
                            for="nombrecomercial"
                            class="form-label"
                            :class="{
                              'text-danger':
                                submitted && v.nombrecomercial.$error,
                            }"
                            >Nombre comercial</label
                          >
                          <input
                            class="form-control disable"
                            id="nombrecomercial"
                            name="nombrecomercial"
                            v-model="data.nombrecomercial"
                            :class="{
                              'is-invalid':
                                submitted && v.nombrecomercial.$error,
                            }"
                          />
                          <div
                            v-for="(item, index) in v.nombrecomercial.$errors"
                            :key="index"
                            class="invalid-feedback"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="row"
                      v-if="isUpdate && data.principioactivo?.trim()"
                    >
                      <div>
                        <label for="nombre" class="form-label"
                          >Ingrediente activo</label
                        >
                        <input
                          class="form-control disable"
                          id="nombre"
                          name="nombre"
                          v-model="data.principioactivo"
                        />
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-6">
                        <label
                          for="fid_clase_producto"
                          class="form-label"
                          :class="{
                            'text-danger':
                              submitted && v.fid_clase_producto.$error,
                          }"
                          >Clase</label
                        >
                        <select
                          class="form-select mb-3"
                          name="fid_clase_producto"
                          id="fid_clase_producto"
                          :class="{
                            'is-invalid':
                              submitted && v.fid_clase_producto.$error,
                          }"
                          v-model="data.fid_clase_producto"
                        >
                          <option value="" selected disabled>Seleccione</option>
                          <option
                            :value="cls.id"
                            v-for="cls in filteredClasses"
                          >
                            {{ cls.nombreclase }}
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
                      <div class="col-6">
                        <label
                          for="fid_tipo_producto"
                          class="form-label"
                          :class="{
                            'text-danger':
                              submitted && v.fid_tipo_producto.$error,
                          }"
                          >Tipo</label
                        >
                        <select
                          class="form-select mb-3"
                          name="fid_tipo_producto"
                          id="fid_tipo_producto"
                          :class="{
                            'is-invalid':
                              submitted && v.fid_tipo_producto.$error,
                          }"
                          v-model="data.fid_tipo_producto"
                        >
                          <option value="" selected disabled>Seleccione</option>
                          <option :value="t.id" v-for="t in filteredTypes">
                            {{ t.nombretipo }}
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
                    <div class="row">
                      <div>
                        <label
                          for="nombre"
                          class="form-label"
                          :class="{
                            'text-danger': submitted && v.presentacion.$error,
                          }"
                        >
                          Presentación</label
                        >
                        <input
                          class="form-control disable"
                          id="nombre"
                          name="nombre"
                          v-model="data.presentacion"
                          :class="{
                            'is-invalid': submitted && v.presentacion.$error,
                          }"
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
                    <div class="mt-3">
                      <label
                        for="especiedestino"
                        class="form-label"
                        :class="{
                          'text-danger': submitted && v.especiedestino.$error,
                        }"
                        >Especie destino</label
                      >

                      <MultiChoice
                        ref="especieDestinoMultiChoices"
                        :options="especiesDestino"
                        :key-value="'valor'"
                        :key-title="'nombre'"
                        :id="'especiedestino'"
                        :name="'especiedestino'"
                        v-model="data.especiedestino"
                      ></MultiChoice>

                      <div
                        v-if="submitted && v.especiedestino.$error"
                        class="error-validation"
                      >
                        El campo es requerido
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div>
                        <label
                          for="uso"
                          class="form-label"
                          :class="{
                            'text-danger': submitted && v.uso.$error,
                          }"
                          >Uso</label
                        >
                        <input
                          v-model="data.uso"
                          class="form-control disable"
                          id="uso"
                          name="uso"
                          :class="{
                            'is-invalid': submitted && v.uso.$error,
                          }"
                        />
                        <div
                          v-for="(item, index) in v.uso.$errors"
                          :key="index"
                          class="invalid-feedback"
                        >
                          <span v-if="item.$message">{{ item.$message }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <label
                      for="periodoalmacen"
                      class="form-label mt-3"
                      :class="{
                        'text-danger':
                          submitted &&
                          (v.periodoalmacen.$error || v.cneto.$error),
                      }"
                      >Periodo de estabilidad</label
                    >
                    <div class="col-6">
                      <div class="mb-3">
                        <input
                          class="form-control disable"
                          :class="{
                            'is-invalid': submitted && v.periodoalmacen.$error,
                          }"
                          id="periodoalmacen"
                          name="periodoalmacen"
                          v-model="data.periodoalmacen"
                          @keypress="isNumber($event)"
                        />
                        <div
                          v-for="(item, index) in v.periodoalmacen.$errors"
                          :key="index"
                          class="invalid-feedback"
                        >
                          <span v-if="item.$message">{{ item.$message }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-6">
                      <select
                        class="form-select"
                        v-model="data.cneto"
                        :class="{
                          'is-invalid': submitted && v.cneto.$error,
                        }"
                      >
                        <option value="" selected disabled>Seleccione</option>
                        <option
                          :value="ta.valor"
                          v-for="ta in tiemposAlmacenado"
                        >
                          {{ ta.nombre }}
                        </option>
                      </select>
                      <div
                        v-for="(item, index) in v.cneto.$errors"
                        :key="index"
                        class="invalid-feedback"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                      </div>
                    </div>
                  </div>
                  <div>
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
              <div class="col-12 mt-3">
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
import {
  required,
  helpers,
  integer,
  minLength,
  minValue,
} from "@vuelidate/validators";
import NotificationHelper from "@/helpers/notification";
import formMixin from "@/mixins/formMixin";

import MultiChoice from "@/components/widgets/MultiChoice.vue";
import {
  registerProduct,
  updateProduct,
  getProductId,
} from "@/services/ProductService";
export default {
  name: "ProductsSAForm",
  mixins: [formMixin],
  props: {
    countries: {
      type: Array,
      required: true,
    },
    viasAdministracion: {
      type: Array,
      required: true,
    },
    classes: {
      type: Array,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
    especiesDestino: {
      type: Array,
      required: true,
    },
    tiemposAlmacenado: {
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
      clase: "",
      data: {
        paisorigen: [],
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
        laboratoriotitular: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        laboratorioproduccion: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        formulaquimica: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        observaciones: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        momentoaplicacion: {
          required: helpers.withMessage("El campo es requerido", required),
          minLength: helpers.withMessage(
            "Seleccione al menos uno",
            minLength(1)
          ),
          $each: helpers.forEach({
            required,
          }),
        },
        idproducto: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        nombrecomercial: {
          required: helpers.withMessage("El campo es requerido", required),
        },

        fid_clase_producto: {
          required: helpers.withMessage("El campo es requerido", required),
        },

        fid_tipo_producto: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        presentacion: {
          required: helpers.withMessage("El campo es requerido", required),
        },

        especiedestino: {
          required: helpers.withMessage("El campo es requerido", required),
          minLength: helpers.withMessage(
            "Seleccione al menos uno",
            minLength(1)
          ),
          $each: helpers.forEach({
            required,
          }),
        },
        uso: {
          required: helpers.withMessage("El campo es requerido", required),
        },

        periodoalmacen: {
          required: helpers.withMessage("El campo es requerido", required),
          integer: helpers.withMessage("Debe ser un número entero", integer),
          minValue: helpers.withMessage(
            "Debe ser un entero positivo",
            minValue(1)
          ),
        },
        cneto: {
          required: helpers.withMessage("El campo es requerido", required),
        },
      },
    };

    return validations;
  },
  methods: {
    async onSubmit() {
      if (!this.data.idproducto) {
        const { ok, data, errors } = await getProductId();
        if (ok) this.data.idproducto = data.idproducto;
      }

      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      if (!this.id) {
        const { ok, data } = await registerProduct(this.requestProcedureId, {
          ...this.data,
          paisorigen: this.data.paisorigen.join(","),
          momentoaplicacion: this.data.momentoaplicacion.join(","),
          especiedestino: this.data.especiedestino.join(","),
        });
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
            momentoaplicacion: this.data.momentoaplicacion.join(","),
            especiedestino: this.data.especiedestino.join(","),
          }
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
      this.data.cneto = "";
      this.data.especiedestino = [];
      this.data.fid_clase_producto = "";
      this.data.fid_tipo_actividad = "";
      this.data.fid_tipo_envase = "";
      this.data.fid_tipo_producto = "";
      this.data.formulaquimica = "";
      this.data.idproducto = "";
      this.data.laboratorioproduccion = "";
      this.data.laboratoriotitular = "";
      this.data.momentoaplicacion = [];
      this.data.nombre = "";
      this.data.nombrecomercial = "";
      this.data.observaciones = "";
      this.data.paisorigen = [];
      this.data.periodoalmacen = "";
      this.data.presentacion = "";
      this.data.principioactivo = "";
      this.data.productor = "";
      this.data.uso = "";
      this.id = null;
      this.$refs.nombrePaisMultiChoices.reset();
      this.$refs.momentoAplicacionMultiChoices.reset();
      this.$refs.especieDestinoMultiChoices.reset();
    },
  },
  computed: {
    isUpdate() {
      return !!this.id;
    },
    filteredTypes() {
      return this.types
        .filter((t) => t.idclase == this.clase)
        .sort((a, b) => a.idtipo.localeCompare(b.idtipo));
    },
    filteredClasses() {
      return this.classes.filter((c) => c.unidadoperativa == "SA");
    },
  },
  watch: {
    initialData: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.submitted = false;
        const {
          cneto,
          fid_clase_producto,
          fid_tipo_actividad,
          fid_tipo_envase,
          fid_tipo_producto,
          formulaquimica,
          idproducto,
          laboratorioproduccion,
          laboratoriotitular,
          nombre,
          nombrecomercial,
          observaciones,
          periodoalmacen,
          presentacion,
          principioactivo,
          productor,
          uso,
        } = newVal;
        this.data = {
          cneto,
          fid_clase_producto,
          fid_tipo_actividad,
          fid_tipo_envase,
          fid_tipo_producto,
          formulaquimica,
          idproducto,
          laboratorioproduccion,
          laboratoriotitular,
          nombre,
          nombrecomercial,
          observaciones,
          periodoalmacen,
          presentacion,
          principioactivo,
          productor,
          uso,
          especiesDestino: newVal.especiedestino?.split(","),
          momentoaplicacion: newVal.momentoaplicacion?.split(","),
          paisorigen: newVal.paisorigen?.split(","),
        };
        this.clase = this.classes.find(
          (cl) => cl.id == this.data.fid_clase_producto
        )?.idclase;
        this.id = newVal.id;

        this.$nextTick(() => {
          if (Object.keys(newVal).length > 0 && newVal.paisorigen)
            this.$refs.nombrePaisMultiChoices.setInitialData(
              newVal.paisorigen.split(",").map((p) => p) || []
            );
          if (Object.keys(newVal).length > 0 && newVal.momentoaplicacion)
            this.$refs.momentoAplicacionMultiChoices.setInitialData(
              newVal.momentoaplicacion.split(",").map((p) => p) || []
            );
          if (Object.keys(newVal).length > 0 && newVal.especiedestino)
            this.$refs.especieDestinoMultiChoices.setInitialData(
              newVal.especiedestino.split(",").map((p) => p) || []
            );
        });
      },
    },
    "data.fid_clase_producto": {
      handler(newVal) {
        console.log("Value changed");
        console.log(newVal);
        this.clase = this.classes.find((cl) => cl.id == newVal)?.idclase;
        this.data.fid_tipo_producto = null;
      },
    },
  },
};
</script>
