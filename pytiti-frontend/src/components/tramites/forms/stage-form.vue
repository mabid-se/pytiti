<template>
  <form class="w-100" novalidate="true" @submit.prevent="onSubmit">
    <div class="row">
      <div class="col-lg-9 mb-3">
        <label
          for="name"
          class="form-label"
          :class="{
            'text-danger': submitted && v$.data.name.$error,
          }"
          >Nombre de la etapa</label
        >
        <input
          type="text"
          v-model="data.name"
          id="name"
          class="form-control"
          :class="{
            'is-invalid': submitted && v$.data.name.$error,
          }"
        />
        <div
          v-for="(item, index) in v$.data.name.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>
      <div class="col-lg-3 mb-3">
        <label
          for="time"
          class="form-label"
          :class="{
            'text-danger': submitted && v$.data.tiempo.$error,
          }"
          >Tiempo (días)</label
        >
        <input
          type="number"
          v-model="data.tiempo"
          class="form-control"
          :class="{
            'is-invalid': submitted && v$.data.tiempo.$error,
          }"
          id="time"
          name="time"
          @keypress="isNumber($event)"
        />
        <div
          v-for="(item, index) in v$.data.tiempo.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>

      <div class="col-lg-12 mb-3">
        <label
          for="description"
          class="form-label"
          :class="{
            'text-danger': submitted && v$.data.descripcion.$error,
          }"
          >Descripción de la etapa</label
        >
        <textarea
          class="form-control"
          :class="{
            'is-invalid': submitted && v$.data.descripcion.$error,
          }"
          v-model="data.descripcion"
          id="description"
          name="description"
          rows="2"
        ></textarea>
        <div
          v-for="(item, index) in v$.data.descripcion.$errors"
          :key="index"
          class="invalid-feedback"
        >
          <span v-if="item.$message">{{ item.$message }}</span>
        </div>
      </div>

      <label for="name" class="form-label">Acciones de cierre de etapa</label>

      <div class="col-lg-10 mx-3 mb-3">
        <div class="form-check">
          <input
            class="form-check-input success"
            type="checkbox"
            id="aprobar"
            :checked="data.aprobar"
            @input="data.aprobar = $event.target.checked"
          />
          <label class="form-check-label" for="aprobar">Aprobar</label>
          <p class="fst-italic">
            Permite pasar a la siguiente etapa, y de esta manera quedaría
            aprobada la etapa actual.
          </p>
        </div>

        <div class="form-check">
          <input
            class="form-check-input success"
            type="checkbox"
            id="observar"
            :checked="data.observar"
            @input="data.observar = $event.target.checked"
          />
          <label class="form-check-label" for="observar"
            >Observar</label
          >
          <p class="fst-italic">
            A partir de la etapa de Revisión documental en adelante, se puede
            realizar observaciones a la etapa anterior, lo que significa que se
            envía un email al encargado de la anterior etapa con las
            observaciones y documentos adjuntos.
          </p>
        </div>

        <div class="form-check">
          <input
            class="form-check-input success"
            type="checkbox"
            id="vincular_cobro"
            :checked="data.vincular_cobro"
            @input="data.vincular_cobro = $event.target.checked"
          />
          <label class="form-check-label" for="vincular_cobro"
            >Vincular cobro</label
          >
          <p class="fst-italic">
            Formulario con la posibilidad de registrar una liquidación y/o una
            multa al trámite.
          </p>
        </div>

        <div class="form-check">
          <input
            class="form-check-input success"
            type="checkbox"
            id="firma_digital"
            :checked="data.firma_digital"
            @input="data.firma_digital = $event.target.checked"
          />
          <label class="form-check-label" for="firma_digital"
            >Firma digital</label
          >
          <p class="fst-italic">
            Permite incluir una firma digital con un Token físico en un
            documento PDF que puede ser generado a través del sistema de manera
            automática o que el usuario firmante puede subir para su firma.
            Luego de incluir la firma, se prueba la etapa automáticamente.
          </p>
        </div>

        <div class="form-check mb-3">
          <label
            for="quantitySignatures"
            class="form-label"
            :class="{
              'text-danger': submitted && v$.data.cantidad_firmas.$error,
            }"
            >Cantidad de firmas</label
          >
          <input
            type="number"
            class="form-control"
            :class="{
              'is-invalid': submitted && v$.data.cantidad_firmas.$error,
            }"
            id="quantitySignatures"
            name="quantitySignatures"
            v-model="data.cantidad_firmas"
            @keypress="isNumber($event)"
          />
          <div
            v-for="(item, index) in v$.data.cantidad_firmas.$errors"
            :key="index"
            class="invalid-feedback"
          >
            <span v-if="item.$message">{{ item.$message }}</span>
          </div>
        </div>

        <div class="form-check">
          <input
            class="form-check-input success"
            type="checkbox"
            id="imprimir"
            :checked="data.imprimir"
            @input="data.imprimir = $event.target.checked"
          />
          <label class="form-check-label" for="imprimir"
            >Imprimir (Registro sanitarios/fitosanitario)</label
          >
          <p class="fst-italic">
            Habilita la impresión del documento PDF generado automáticamente por
            el sistema y que está relacionado al trámite, donde debe incluir las
            firmas digitales o manuales
          </p>
        </div>

        <div class="form-check">
          <input
            class="form-check-input success"
            type="checkbox"
            id="enviar_oficina_nacional"
            :checked="data.enviar_oficina_nacional"
            @input="data.enviar_oficina_nacional = $event.target.checked"
          />
          <label class="form-check-label" for="enviar_oficina_nacional"
            >Enviar a Oficina Nacional</label
          >
          <p class="fst-italic">
            Envía una notificación por email a la Oficina Nacional para que se
            realice la revisión del trámite que ha concluido en el sistema. La
            Oficina Nacional puede realizar observaciones en caso de ser
            necesario.
          </p>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end">
      <button
        class="ml-auto btn-right-text gray btn--hover-icon mb-0 mr-3"
        @click.prevent="$emit('on:update:mode', 'list')"
      >
        <i class="mdi mdi-undo-variant mr-0"></i>
        <span class="text">Cancelar</span>
      </button>
      <Spinner :loading="loading">
        <button
          class="ml-auto btn-right-text primary btn--hover-icon mb-0"
          style="margin-right: 5px"
        >
          <i class="mdi mdi-content-save-outline mr-0"></i>

          <span class="text">Guardar</span>
        </button>
      </Spinner>
    </div>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, integer, helpers, minValue } from "@vuelidate/validators";
import formMixin from "@/mixins/formMixin";
import { registerUpdateStep } from "@/services/creador-tramites/etapas";
import NotificationHelper from "@/helpers/notification";
import Spinner from "@/components/widgets/spinner";

export default {
  mixins: [formMixin],
  props: {
    initialData: {
      type: Object,
      dafault: () => {},
    },
  },
  components: {
    Spinner,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      errors: {},
      submitted: false,
      data: {
        state: "I",
        name: this.initialData?.name || "",
        tiempo: this.initialData?.tiempo || "",
        descripcion: this.initialData?.descripcion || "",
        cantidad_firmas: this.initialData?.cantidad_firmas || "",
        aprobar: this.initialData?.aprobar || false,
        observar: this.initialData?.observar || false,
        vincular_cobro: this.initialData?.vincular_cobro || false,
        firma_digital: this.initialData?.firma_digital || false,
        imprimir: this.initialData?.imprimir || false,
        enviar_oficina_nacional: this.initialData?.enviar_oficina_nacional || false,
      },
      loading: false,
    };
  },
  methods: {
    onSubmit() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;
      this.loading = true;
      registerUpdateStep(
        this.$route.params.idTramite,
        this.data,
        this.initialData.slug
      ).then(async (r) => {
        this.loading = false;
        const { ok, errors } = r;
        console.log(errors);
        if (!ok) {
          return console.log(errors);
        }

        NotificationHelper.success(
          `Etapa de plantilla de trámite ${
            !this.initialData.slug ? "registrada" : "actualizada"
          } exitosamente.`
        );

        this.$emit("on:reload:stages");
      });
    },
  },
  validations() {
    const validations = {
      data: {
        name: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        tiempo: {
          required: helpers.withMessage("El campo es requerido", required),
          integer: helpers.withMessage("Debe ser un número entero", integer),
          minValue: helpers.withMessage("Debe ser mayor a 0", minValue(1)),
        },
        descripcion: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        cantidad_firmas: {
          required: helpers.withMessage("El campo es requerido", required),
          integer: helpers.withMessage("Debe ser un número entero", integer),
          minValue: helpers.withMessage("Debe ser mayor a 0", minValue(1)),
        },
      },
    };
    return validations;
  },
};
</script>
