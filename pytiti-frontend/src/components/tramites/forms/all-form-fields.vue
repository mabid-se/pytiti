<template>
  <form class="w-100 card-body" novalidate="true" @submit.prevent="onSubmit">
    <div class="row" :set="(v = v$.data)">
      <div class="col-lg-6 mb-3">
        <label
          for="textarea"
          class="form-label"
          :class="{
            'text-danger': submitted && v.textarea.$error,
          }"
          >Textarea</label
        >
        <textarea
          class="form-control"
          :class="{
            'is-invalid': submitted && v.textarea.$error,
          }"
          id="textarea"
          name="textarea"
          placeholder="placeholder"
          rows="2"
          v-model="data.textarea"
        ></textarea>
        <div
          v-for="(item, index) in v.textarea.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>
      <div class="col-lg-6 mb-3">
        <label
          for="inputText"
          class="form-label"
          :class="{
            'text-danger': submitted && v.inputText.$error,
          }"
          >Input text</label
        ><input
          type="text"
          class="form-control"
          id="inputText"
          name="inputText"
          placeholder="placeholder"
          :class="{
            'is-invalid': submitted && v.inputText.$error,
          }"
          v-model="data.inputText"
        />
        <div
          v-for="(item, index) in v.inputText.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>

      <div class="col-lg-6 mb-3">
        <label
          for="inputInteger"
          class="form-label"
          :class="{
            'text-danger': submitted && v.inputDecimal.$error,
          }"
          >Input decimal</label
        ><input
          type="number"
          class="form-control"
          :class="{
            'is-invalid': submitted && v.inputDecimal.$error,
          }"
          id="inputInteger"
          placeholder="placeholder"
          v-model.number="data.inputDecimal"
          @keypress="isNumber($event)"
        />
        <div
          v-for="(item, index) in v.inputDecimal.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>

      <div class="col-lg-6 mb-3">
        <label
          for="inputInteger"
          class="form-label"
          :class="{
            'text-danger': submitted && v.inputInteger.$error,
          }"
          >Input integer</label
        ><input
          type="number"
          class="form-control"
          :class="{
            'is-invalid': submitted && v.inputInteger.$error,
          }"
          id="inputInteger"
          placeholder="placeholder"
          v-model.number="data.inputInteger"
          @keypress="isNumber($event)"
        />
        <div
          v-for="(item, index) in v.inputInteger.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>

      <div class="col-lg-6 mb-3">
        <label
          for="inputFile"
          class="form-label"
          :class="{
            'text-danger': submitted && v.inputFile.$error,
          }"
          >Input file</label
        >
        <input
          type="file"
          class="form-control"
          :class="{
            'is-invalid': submitted && v.inputFile.$error,
          }"
          id="inputFile"
          name="inputFile"
          accept="*/*"
          @change="(e) => (data[`${e.target.name}`] = e.target.files[0])"
        />

        <div
          v-for="(item, index) in v.inputFile.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>

      <div class="col-lg-6 mb-3">
        <label
          class="class-label"
          :class="{
            'text-danger': submitted && v.radio.$error,
          }"
          >Input radio</label
        >
        <div class="d-flex">
          <div class="form-check form-check-inline"
            v-for="(o, index) in optionsRadio"
            :key="`radiobutton.${index}`"
          >
            <input
              class="form-check-input success"
              :class="{
                'is-invalid': submitted && v.radio.$error,
              }"
              type="radio"
              name="radiobutton"
              :id="`radiobutton-${index}`"
              :value="o.value"
              v-model="data.radio"
            />
            <label class="form-check-label" :for="`radiobutton-${index}`">{{o.label}}</label>
          </div>
        </div>

        <div
          v-for="(item, index) in v.radio.$errors"
          :key="index"
          class="error-validation"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>

      <div class="col-lg-6 mb-3">
        <label
          class="class-label"
          :class="{
            'text-danger': submitted && v.checkbox.$error,
          }"
          >Input checkbox</label
        >
        <div class="d-flex">
          <div class="form-check form-check-inline" :value="o.value"
            v-for="(o, index) in optionsCheck"
            :key="`checkbox.${index}`">
            <input
              class="form-check-input success"
              :class="{
                'is-invalid': submitted && v.checkbox.$error,
              }"
              type="checkbox"
              name="checkbox"
              :id="`checkbox-${index}`"
              :value="o.value"
              v-model="data.checkbox"
            />
            <label class="form-check-label" :for="`checkbox-${index}`">{{o.label}}</label>
          </div>
        </div>

        <div
          v-for="(item, index) in v.checkbox.$errors"
          :key="index"
          class="error-validation"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>

      <div class="col-lg-6 mb-3">
        <label
          for="multichoices"
          class="form-label"
          :class="{
            'text-danger': submitted && v.multichoices.$error,
          }"
          >Multichoice</label
        >
        <select
          class="form-control"
          id="multichoices"
          name="multichoices"
          multiple
          v-model="data.multichoices"
          v-choice
        >
          <option
            :value="o.value"
            v-for="(o, index) in optionsMultichoices"
            :key="`multichoice.${index}`"
          >
            {{ o.label }}
          </option>
        </select>
        <div
          v-for="(item, index) in v.multichoices.$errors"
          :key="index"
          class="error-validation"
        >
          {{ item.$message }}
        </div>
      </div>

      <div class="col-lg-6 mb-3">
        <div class="d-flex flex-column datepicker success">
          <label
            class="form-label mb-0"
            :class="{
              'text-danger': submitted && v.datepicker.$error,
            }"
            for="datepicker"
            >Datepicker</label
          >
          <flat-pickr
            id="datepicker"
            name="datepicker"
            v-model="data.datepicker"
            class="form-control flatpickr-input"
            :class="{
              'is-invalid': submitted && v.datepicker.$error,
            }"
          ></flat-pickr>
          <div
            v-for="(item, index) in v.datepicker.$errors"
            :key="index"
            class="error-validation"
          >
            {{ item.$message }}
          </div>
        </div>
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
import { numeric2digits } from "@/validations/custom";
import formMixin from "@/mixins/formMixin";
import {
  required,
  helpers,
  minLength,
  minValue,
  integer,
} from "@vuelidate/validators";
import flatPickr from "vue-flatpickr-component";

export default {
  mixins: [formMixin],
  components: {
    flatPickr,
  },
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
      optionsRadio: [
        {
          value: 1,
          label: "one",
        },
        {
          value: 2,
          label: "two",
        },
      ],
      optionsCheck: [
        {
          value: 1,
          label: "one",
        },
        {
          value: 2,
          label: "two",
        },
         {
          value: 3,
          label: "three",
        },
      ],
      optionsMultichoices: [
        {
          value: 52,
          label: "52",
        },
        {
          value: 53,
          label: "53",
        },
        {
          value: 54,
          label: "54",
        },
        {
          value: 55,
          label: "55",
        },
      ],
      data: {
        textarea: this.initialData?.textarea || "",
        inputText: this.initialData?.inputText || "",
        inputInteger: this.initialData?.inputInteger || "",
        inputDecimal: this.initialData?.inputDecimal || "",
        inputFile: this.initialData?.inputFile || null,
        datepicker: this.initialData?.datepicker || "",
        radio: this.initialData?.radio || "",
        checkbox: this.initialData?.checkbox || [],
        multichoices: this.initialData?.services || [],
      },
    };
  },
  validations() {
    const validations = {
      data: {
        textarea: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        inputText: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        inputFile: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        inputInteger: {
          required: helpers.withMessage("El campo es requerido", required),
          integer: helpers.withMessage("Debe ser un número entero", integer),
          minValue: helpers.withMessage(
            "Debe ser un entero positivo",
            minValue(1)
          ),
        },
        inputDecimal: {
          required: helpers.withMessage("El campo es requerido", required),
          numeric2digits: helpers.withMessage(
            "Debe tener hasta 2 decimales",
            numeric2digits
          ),
          minValue: helpers.withMessage("Debe ser mayor a 0", minValue(0)),
        },
        datepicker: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        radio: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        multichoices: {
          required: helpers.withMessage("El campo es requerido", required),
          minLength: helpers.withMessage(
            "Seleccione al menos uno",
            minLength(1)
          ),
          $each: helpers.forEach({
            required,
          }),
        },
        checkbox: {
          required: helpers.withMessage("El campo es requerido", required),
          minLength: helpers.withMessage(
            "Seleccione al menos uno",
            minLength(1)
          ),
          $each: helpers.forEach({
            required,
          }),
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
        textarea: this.initialData?.textarea || "",
        inputText: this.initialData?.inputText || "",
        inputInteger: this.initialData?.inputInteger || "",
        inputDecimal: this.initialData?.inputDecimal || "",
        inputFile: this.initialData?.inputFile || null,
        datepicker: this.initialData?.datepicker || "",
        radio: this.initialData?.radio || "",
        checkbox: this.initialData?.checkbox || [],
        multichoices: this.initialData?.services || [],
      };
      this.v$.$reset();
    },
    cancel() {
      this.resetForm();
    },
  },
  computed: {
    isAPI() {
      return this.data.typeInfo === "api";
    },
    isForm() {
      return this.data.typeInfo === "formulario";
    },
    isCustomized() {
      return this.data.typeInfo === "personalizado";
    },
  },
};
</script>
