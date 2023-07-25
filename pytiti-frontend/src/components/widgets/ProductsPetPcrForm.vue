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
                        for="productor"
                        class="form-label"
                        :class="{
                          'text-danger': submitted && v.productor.$error,
                        }"
                        >Producido por</label
                      >
                      <input
                        class="form-control disable"
                        id="productor"
                        name="productor"
                        v-model="data.productor"
                        :class="{
                          'is-invalid': submitted && v.productor.$error,
                        }"
                      />
                      <div
                        v-for="(item, index) in v.productor.$errors"
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
                          for="nombre"
                          class="form-label"
                          :class="{
                            'text-danger': submitted && v.nombre.$error,
                          }"
                          >Nombre</label
                        >
                        <input
                          class="form-control disable"
                          id="nombre"
                          name="nombre"
                          v-model="data.nombre"
                          :class="{
                            'is-invalid': submitted && v.nombre.$error,
                          }"
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
                  </div>

                  <div class="col-12 mt-3">
                    <label
                      for="fid_tipo_envase"
                      class="form-label"
                      :class="{
                        'text-danger': submitted && v.fid_tipo_envase.$error,
                      }"
                      >Tipo</label
                    >
                    <select
                      name="fid_tipo_envase"
                      id="fid_tipo_envase"
                      class="form-select"
                      aria-label="Seleccione"
                      v-model="data.fid_tipo_envase"
                      :class="{
                        'is-invalid': submitted && v.fid_tipo_envase.$error,
                      }"
                    >
                      <option value="" disabled selected>Seleccione</option>
                      <option :value="c.id" v-for="c in containers">
                        {{ c.nombreenvase }}
                      </option>
                    </select>
                    <div
                      v-if="submitted && v.fid_tipo_envase.$error"
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
import { required, helpers, integer, minLength } from "@vuelidate/validators";
import NotificationHelper from "@/helpers/notification";

import { updateProduct } from "@/services/ProductPetPcrService";
import MultiChoice from "@/components/widgets/MultiChoice.vue";
import { registerProductPetPcr } from "@/services/ProductPetPcrService";
export default {
  name: "ProductsPetPcrForm",
  props: {
    containers: {
      type: Array,
      required: true,
    },
    typesActivity: {
      type: Array,
      required: true,
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
        productor: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        nombre: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        presentacion: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        fid_tipo_envase: {
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
        const { ok, data } = await registerProductPetPcr(
          this.requestProcedureId,
          {
            ...this.data,
            paisorigen: this.data.paisorigen.join(","),
          }
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
      this.data.paisorigen = [];
      this.data.productor = "";
      this.data.nombre = "";
      this.data.presentacion = "";
      this.data.fid_tipo_envase = "";
      this.data.fid_tipo_actividad = "";
      this.data.observaciones = "";
      this.id = null;
      this.$refs.nombrePaisMultiChoices.reset();
    },
  },
  computed: {
    isUpdate() {
      return !!this.id;
    },
  },
  watch: {
    initialData: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.submitted = false;
        this.data.paisorigen = newVal.paisorigen?.split(",");
        this.data.productor = newVal.productor;
        this.data.nombre = newVal.nombre;
        this.data.presentacion = newVal.presentacion;
        this.data.fid_tipo_envase = newVal.fid_tipo_envase;
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
