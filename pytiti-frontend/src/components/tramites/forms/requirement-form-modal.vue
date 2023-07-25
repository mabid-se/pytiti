<template>
  <form class="row" @submit.prevent="onSubmit">
    <div class="mb-3">
      <label
        for="namee"
        class="form-label"
        :class="{
          'text-danger': submitted && v$.data.name.$error,
        }"
        >Nombre del requisito
      </label>

      <textarea
        id="namee"
        name="namee"
        class="form-control"
        :class="{
          'is-invalid': submitted && v$.data.name.$error,
        }"
        v-model="data.name"
        rows="2"
      ></textarea>

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
        for="help"
        class="form-label"
        :class="{
          'text-danger': submitted && v$.data.help.$error,
        }"
        >Ayuda</label
      >
      <textarea
        class="form-control"
        :class="{
          'is-invalid': submitted && v$.data.help.$error,
        }"
        id="help"
        name="help"
        rows="2"
        v-model="data.help"
      ></textarea>

      <div
        v-for="(item, index) in v$.data.help.$errors"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
      </div>
    </div>
    <div class="row pe-0">
      <div class="col-lg-6">
        <div class="mb-3">
          <!--  -->
          <label
            for="exampleFile"
            class="form-label"
            :class="{
              'text-danger':
                createMode && submitted && v$.data.exampleFile.$error,
            }"
            >Archivo de ejemplo</label
          >
          <input
            type="file"
            class="form-control"
            :class="{
              'is-invalid':
                createMode && submitted && v$.data.exampleFile.$error,
            }"
            id="exampleFile"
            name="exampleFile"
            accept="application/pdf"
            @change="data[$event.target.name] = $event.target.files[0]"
          />
          <div
            v-for="(item, index) in v$.data.exampleFile?.$errors"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </div>
      <div class="col-lg-6 px-0">
        <div class="mb-3">
          <!--  -->
          <label
            for="downloadFile"
            class="form-label"
            :class="{
              'text-danger':
                createMode && submitted && v$.data.downloadFile.$error,
            }"
            >Archivo de descarga</label
          >
          <input
            type="file"
            class="form-control"
            :class="{
              'is-invalid':
                createMode && submitted && v$.data.downloadFile.$error,
            }"
            id="downloadFile"
            name="downloadFile"
            accept="application/pdf"
            @change="data[$event.target.name] = $event.target.files[0]"
          />
          <div
            v-for="(item, index) in v$.data.downloadFile?.$errors"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <label
          class="class-label"
          :class="{
            'text-danger': submitted && v$.data.type.$error,
          }"
          >Tipo</label
        >

        <div class="d-flex">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              :class="{
                'is-invalid': submitted && v$.data.type.$error,
              }"
              v-model="data.type"
              type="radio"
              value="opcional"
              name="type"
              id="type1"
            />
            <label class="form-check-label" for="type1">Opcional</label>
          </div>

          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              :class="{
                'is-invalid': submitted && v$.data.type.$error,
              }"
              v-model="data.type"
              value="requerido"
              type="radio"
              name="type"
              id="type2"
            />
            <label class="form-check-label text-nowrap" for="type2"
              >Requerido</label
            >
          </div>
        </div>

        <div
          v-for="(item, index) in v$.data.type.$errors"
          :key="index"
          class="error-validation"
        >
          <span v-if="item.$message && submitted && v$.data.type.$errors">{{
            item.$message
          }}</span>
        </div>
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
        help: this.initialData?.help || "",
        exampleFile: null,
        downloadFile: null,
        type: this.initialData?.type || "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      if (this.createMode) {
        this.$emit("on:create:requirement", this.data);
      } else {
        this.$emit("on:update:requirement", {
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
        help: this.initialData?.help || "",
        exampleFile: null,
        downloadFile: null,
        type: this.initialData?.type || "",
      };
    },
  },
  validations() {
    const validations = {
      data: {
        name: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        help: {
          required: helpers.withMessage("El campo es requerido", required),
        },

        type: {
          required: helpers.withMessage("El campo es requerido", required),
        },
      },
    };

    if (this.createMode) {
      validations.data.exampleFile = {
        required: helpers.withMessage("El campo es requerido", required),
      };
      validations.data.downloadFile = {
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
