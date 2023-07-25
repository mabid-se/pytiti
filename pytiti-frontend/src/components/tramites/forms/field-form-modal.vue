<template>
  <form class="row" :set="(v = v$.modelValue)">
    <div class="col-md-12" v-if="modelValue.isNewField">
      <label
        class="form-label"
        :class="{
          'text-danger': v.type.$error,
        }"
        >Tipo</label
      >
      <select
        name="type"
        id="type"
        class="form-select"
        :class="{
          'is-invalid': v.type.$error,
        }"
        @input="updateChange"
      >
        <option
          :selected="modelValue.type === field.value"
          :value="field.value"
          v-for="(field, index) in typesField"
          :key="`type.${index}`"
        >
          {{ field.label }}
        </option>
      </select>
      <div
        v-for="(item, index) in v.type.$errors"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
      </div>
    </div>

    <div class="col-md-12 mt-3">
      <label
        class="form-label"
        :class="{
          'text-danger': v.label.$error,
        }"
        >Label</label
      >
      <input
        type="text"
        class="form-control"
        :class="{
          'is-invalid': v.label.$error,
        }"
        @input="updateChange"
        name="label"
        id="label"
        :value="modelValue.label"
      />
      <div
        v-for="(item, index) in v.label.$errors"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
      </div>
    </div>

    <div class="col-md-12 mt-3">
      <label
        class="form-label"
        :class="{
          'text-danger': v.help.$error,
        }"
        >Texto de ayuda</label
      >
      <input
        type="text"
        class="form-control"
        :class="{
          'is-invalid': v.help.$error,
        }"
        @input="updateChange"
        name="help"
        id="help"
        :value="modelValue.help"
      />
      <div
        v-for="(item, index) in v.help.$errors"
        :key="index"
        class="invalid-feedback"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
      </div>
    </div>
    
    <div class="col-md-12 mt-3">
      <div class="d-flex">
        <label class="form-check-label" for="required">Requerido </label>
        <input
          :checked="modelValue.required"
          name="required"
          id="required"
          class="form-check-input success mx-1"
          type="checkbox"
          @input="updateChange"
        />
      </div>
    </div>

    <div
      class="col-md-12 mt-3"
      v-if="modelValue.type == 'select' && modelValue.isNewField"
    >
      <div class="mb-3">
        <label
          class="form-label me-2"
          :class="{
            'text-danger': invalid,
          }"
          >Opciones</label
        >
        <input
          v-model="newOption"
          v-on:keyup.enter="addNewOption"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': invalid,
          }"
        />
        <div
          class="invalid-feedback"
        >
          <span>Debe cargar al menos una opción</span>
        </div>
      </div>
      <ul
        class="list-group"
        v-for="(option, index) in modelValue.options"
        :key="`option.${index}`"
      >
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          {{ option }}
          <i
            class="mdi mdi-trash-can-outline text-danger"
            @click="removeOption(index)"
          ></i>
        </li>
      </ul>
    </div>
  </form>
</template>

<script>
import formMixin from "@/mixins/formMixin";
import useVuelidate from "@vuelidate/core";

import { required, helpers, minLength } from "@vuelidate/validators";
export default {
  mixins: [formMixin],
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    typesField: {
      type: Array,
      required: true,
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
      newOption: "",
    };
  },
  methods: {
    addNewOption() {
      if (this.newOption.length <= 0) return;
      const options = [...this.modelValue.options];
      options.push(this.newOption);
      this.newOption = "";
      this.$emit("update:modelValue", {
        ...this.modelValue,
        options,
      });
    },
    removeOption(index) {
      const options = [...this.modelValue.options];
      options.splice(index, 1);
      this.$emit("update:modelValue", {
        ...this.modelValue,
        options,
      });
    },
  },
  validations() {
    const validations = {
      modelValue: {
        label: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        help: {
          required: helpers.withMessage("El campo es requerido", required),
        },
      },
    };
    if (this.modelValue.isNewField)
      validations.modelValue["type"] = {
        required: helpers.withMessage("El campo es requerido", required),
      };
    if (this.modelValue.isNewField && this.modelValue.type == "select")
      validations.modelValue["options"] = {
        required: helpers.withMessage("El campo es requerido", required),
        minLength: helpers.withMessage("Seleccione al menos uno", minLength(1)),
        $each: helpers.forEach({
          required,
        }),
      };
    return validations;
  },
  computed: {
    invalid() {
      return this.v$.$invalid;
    },
  },
  watch: {
    "modelValue.type"(newValue) {
      if (newValue === "select") this.v$.$touch();
    },
  },
};
</script>
