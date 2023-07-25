<template>
  <form class="row" @submit.prevent="onSubmit">
    <div class="mb-3 col-md-12">
      <label
        for="name"
        class="form-label"
        :class="{
          'text-danger': submitted && v$.data.name.$error,
        }"
        >Nombre del documento
      </label>

      <input
        id="name"
        name="name"
        class="form-control"
        :class="{
          'is-invalid': submitted && v$.data.name.$error,
        }"
        v-model="data.name"
      />

      <div
        v-for="(item, index) in v$.data.name.$errors"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
      </div>
    </div>
    <div class="mb-3">
      <label
        for="description"
        class="form-label"
        :class="{
          'text-danger': submitted && v$.data.description.$error,
        }"
        >Descripción del documento</label
      >
      <textarea
        class="form-control"
        :class="{
          'is-invalid': submitted && v$.data.description.$error,
        }"
        id="description"
        name="description"
        rows="2"
        v-model="data.description"
      ></textarea>

      <div
        v-for="(item, index) in v$.data.description.$errors"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
      </div>
    </div>
    <div class="mb-3">
      <label
        for="file"
        class="form-label"
        :class="{
          'text-danger': createMode && submitted && v$.data.file.$error,
        }"
        >Archivo</label
      >
      <input
        type="file"
        class="form-control"
        :class="{
          'is-invalid': createMode && submitted && v$.data.file.$error,
        }"
        id="file"
        name="file"
        accept="application/pdf"
        @change="data[$event.target.name] = $event.target.files[0]"
      />
      <div
        v-for="(item, index) in v$.data.file?.$errors"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
      </div>
    </div>

    <div class="d-flex justify-content-end mt-3">
      <button
        class="ml-auto btn-right-text gray btn--hover-icon mb-0 mr-3"
        @click.prevent="$emit('on:close:modal')"
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
import formMixin from "@/mixins/formMixin";
import useVuelidate from "@vuelidate/core";

import { required, helpers } from "@vuelidate/validators";
export default {
  mixins: [formMixin],
  props: {
    initialData: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  mounted() {
    this.v$.$touch();
  },
  data() {
    return {
      submitted: false,
      data: {
        name: this.initialData?.name || "",
        description: this.initialData?.description || "",
        file: null,
      },
    };
  },
  methods: {
    onSubmit() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      if (this.createMode) {
        this.$emit("on:create:document", this.data);
      } else {
        this.$emit("on:update:document", {
          ...this.initialData,
          ...this.data,
        });
      }

      this.$emit("on:close:modal");
      this.resetForm();
    },
    resetForm() {
      this.data = {
        name: this.initialData?.name || "",
        description: this.initialData?.description || "",
        file: null,
      };
    },
  },
  validations() {
    const validations = {
      data: {
        name: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        description: {
          required: helpers.withMessage("El campo es requerido", required),
        },
      },
    };

    if (this.createMode) {
      validations.data.file = {
        required: helpers.withMessage("El campo es requerido", required),
      };
    }

    return validations;
  },
  computed: {
    invalid() {
      return this.v$.$invalid;
    },
    createMode() {
      return !this.initialData.uuid;
    },
  },
};
</script>
