<template>
  <form class="w-100 card-body" novalidate="true" @submit.prevent="onSubmit">
    <div class="row mb-3">
      <div class="col-md-8">
        <label
          for="rubro"
          class="form-label"
          :class="{
            'text-danger': submitted && v$.data.rubro.$error,
          }"
          >Rubro</label
        >
        <input
          class="form-control"
          :class="{
            'is-invalid': submitted && v$.data.rubro.$error,
          }"
          id="rubro"
          name="rubro"
          v-model="data.rubro"
        />
        <div
          v-for="(item, index) in v$.data.rubro.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-2">
        <label
          for="typeInfo"
          class="form-label"
          :class="{
            'text-danger': submitted && v$.data.serviceCode.$error,
          }"
          >Código de servicio</label
        >
        <select
          id="serviceCode"
          name="serviceCode"
          class="form-select"
          :class="{
            'is-invalid': submitted && v$.data.serviceCode.$error,
          }"
          v-model="data.serviceCode"
        >
          <option value="">Seleccione uno</option>
          <option value="52">52</option>
          <option value="53">53</option>
        </select>

        <div
          v-for="(item, index) in v$.data.serviceCode.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>
      <div class="col-md-2">
        <label
          for="rubroCode"
          class="form-label"
          :class="{
            'text-danger': submitted && v$.data.rubroCode.$error,
          }"
          >Código de rubro</label
        >
        <input
          class="form-control"
          :class="{
            'is-invalid': submitted && v$.data.rubroCode.$error,
          }"
          id="rubroCode"
          name="rubroCode"
          v-model="data.rubroCode"
        />
        <div
          v-for="(item, index) in v$.data.rubroCode.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>
      <div class="col-md-2">
        <label
          for="typeInfo"
          class="form-label"
          :class="{
            'text-danger': submitted && v$.data.status.$error,
          }"
          >Estado</label
        >
        <select
          id="typeInfo"
          name="typeInfo"
          class="form-select"
          :class="{
            'is-invalid': submitted && v$.data.status.$error,
          }"
          v-model="data.status"
        >
          <option value="">Seleccione uno</option>
          <option value="publicado">Publicado</option>
          <option value="noPublicado">No publicado</option>
        </select>

        <div
          v-for="(item, index) in v$.data.status.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>
    </div>

    <div class="mt-3">
      <label
        for="description"
        class="form-label"
        :class="{
          'text-danger': submitted && v$.data.description.$error,
        }"
        >Descripción</label
      >
      <textarea
        class="form-control"
        :class="{
          'is-invalid': submitted && v$.data.description.$error,
        }"
        v-model="data.description"
        id="description"
        name="description"
        rows="2"
      ></textarea>
      <div
        v-for="(item, index) in v$.data.description.$errors"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
      </div>
    </div>

    <div class="d-flex justify-content-end mt-3">
      <button
        class="ml-auto btn-right-text gray btn--hover-icon mb-0 mr-3"
        @click.prevent="cancel"
      >
        <i class="mdi mdi-undo-variant mr-0"></i>

        <span class="text">Cancelar</span>
      </button>

      <button class="ml-auto btn-right-text primary btn--hover-icon mb-0 mr-1">
        <i class="mdi mdi-content-save-outline mr-0"></i>

        <span class="text">Guardar</span>
      </button>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  components: {},
  props: {
    initialData: {
      type: Object,
      default: () => {},
    },
    errors: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      submitted: false,
      data: {
        rubro: this.initialData?.rubro || "",
        serviceCode: this.initialData?.serviceCode || "",
        rubroCode: this.initialData?.rubroCode || "",
        status: this.initialData?.status || "",
        description: this.initialData?.description || "",
      },
    };
  },
  validations() {
    const validations = {
      data: {
        rubro: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        serviceCode: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        rubroCode: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        status: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        description: {
          required: helpers.withMessage("El campo es requerido", required),
        },
      },
    };
    return validations;
  },
  methods: {
    onSubmit() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      this.resetForm();
      this.$emit("on:update:mode", "list");
    },
    resetForm() {
      this.data = {
        rubro: this.initialData?.rubro || "",
        serviceCode: this.initialData?.serviceCode || "",
        rubroCode: this.initialData?.rubroCode || "",
        status: this.initialData?.status || "",
        description: this.initialData?.description || "",
      };
      this.v$.$reset();
    },
    cancel() {
      this.resetForm();
      this.$emit("on:update:mode", "list");
    },
  },
  computed: {},
};
</script>
