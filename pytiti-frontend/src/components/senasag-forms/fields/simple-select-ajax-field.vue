<template>
  <Spinner :loading="loading">
    <div>
      <label
        :for="field.name"
        class="form-label"
        :class="{
          required: field.required,
          'text-danger': errorVuelidate && errorVuelidate.length > 0,
        }"
      >
        {{ field.label }}
      </label>
      <select
        :value="modelValue"
        :name="field.name"
        :id="field.name"
        :disabled="field.read_only || readOnly"
        :readonly="field.read_only || readOnly"
        class="form-select"
        :class="{
          'is-invalid': errorVuelidate && errorVuelidate.length > 0,
        }"
        @input="$emit('update:modelValue', $event.target.value)"
      >
        <option disabled>{{ field.title }}</option>
        <option value="">Seleccione un valor</option>
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.id"
        >
          {{ option.nombre }}
        </option>
      </select>
      <div class="form-text">{{ field.title }}</div>
      <div
        v-for="(item, index) in errorVuelidate"
        :key="index"
        class="error-validation"
      >
        <span v-if="item.$message">{{ item.$message }}</span>
        <span v-else>{{ item }}</span>
      </div>
    </div>
  </Spinner>
</template>

<script>
import Spinner from "@/components/widgets/spinner";
import { HttpClient, TypeHttpRequest } from "@/services/httpClient";
const host = process.env.VUE_APP_PROD_URL;
import NotificationHelper from "@/helpers/notification";

export default {
  name: "SimpleSelectAjaxField",
  components: {
    Spinner,
  },
  data() {
    return {
      options: [],
      loading: true,
    };
  },
  props: {
    field: {
      type: Object,
    },
    errorVuelidate: {
      type: [Array],
      required: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    modelValue: () => "",
  },

  methods: {
    handleChange(e) {
      this.$emit("update-change", {
        [this.field.entity_field.name]: e.target.value,
      });
    },
    fetchData() {
      const httpClient = new HttpClient(
        TypeHttpRequest.Json,
        host.slice(0, -1)
      );
      httpClient.get(this.field.api).then(({ ok, data }) => {
        if (!ok) return NotificationHelper.error("Error al recuperar datos.");
        this.options = data.results;
        this.loading = false;
      });
    },
  },
  mounted() {
    if (!this.field.entity_field)
      console.error("Entity field was not provided");
    this.$emit("update-change", {
      [this.field.entity_field.id]: this.field.value,
    });
    this.fetchData();
  },
};
</script>
