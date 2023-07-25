<template>
  <form @submit.prevent="onSubmit" class="needs-validation" novalidate>
    <div>
      <h5 class="mb-3">DATOS DE LA SUCURSAL</h5>
      <div class="mb-3" :set="(v = v$.formData)">
        <InputFormField
          :error-vuelidate="submitted && errors['nombre_sucursal']"
          @update-change="updateChange"
          :field="{
            type: 'text',
            label: 'Nombre de la sucursal',
            id: 'nombre_sucursal',
            name: 'nombre_sucursal',
            placeholder: 'Nombre de la sucursal',
            required: true,
          }"
        />
        <InputFormField
          @update-change="updateChange"
          :field="{
            type: 'text',
            label: 'Licencia de funcionamiento',
            id: 'licenciafunciona',
            name: 'licenciafunciona',
            placeholder: '',
            required: false,
          }"
        />
        <InputFormField
          :error-vuelidate="submitted && errors['telefonos']"
          @update-change="updateChange"
          :field="{
            type: 'text',
            label: 'Teléfonos',
            id: 'telefonos',
            name: 'telefonos',
            placeholder: 'Escriba su número de teléfono',
            required: true,
          }"
        />
        <InputFormField
          @update-change="updateChange"
          :field="{
            type: 'text',
            label: 'Fax',
            id: 'fax',
            name: 'fax',
            placeholder: 'Escriba su número de fax',
            required: false,
          }"
        />
        <InputFormField
          :error-vuelidate="submitted && errors['direccion']"
          @update-change="updateChange"
          :field="{
            type: 'text',
            label: 'Dirección',
            id: 'direccion',
            name: 'direccion',
            placeholder: 'Escriba su dirección completa',
            required: true,
          }"
        />

        <LocalSearchListField
          class="mb-3"
          @update-change="updateFormData"
          :error-vuelidate="submitted && errors['iddistrital']"
          @reset-nesteds="$refs.provinces.resetItem()"
          :field="{
            label: 'Departamento',
            entity_field: {
              name: 'iddistrital',
            },
            value: '',
          }"
        />
        <LocalSearchListField
          class="mb-3"
          ref="provinces"
          :error-vuelidate="submitted && errors['idprovincia']"
          @update-change="updateFormData"
          @reset-nesteds="$refs.municipalities.resetItem()"
          :field="{
            label: 'Provincia',
            entity_field: {
              name: 'idprovincia',
            },
            value: '',
          }"
        />
        <LocalSearchListField
          ref="municipalities"
          @update-change="updateFormData"
          :error-vuelidate="submitted && errors['idmunicipio']"
          :field="{
            label: 'Municipio',
            entity_field: {
              name: 'idmunicipio',
            },
            value: '',
          }"
        />
        <InputFormField
          class="mt-3"
          :error-vuelidate="submitted && errors['ciudad']"
          @update-change="updateChange"
          :field="{
            type: 'text',
            label: 'Ciudad',
            id: 'ciudad',
            name: 'ciudad',
            placeholder: '',
            required: true,
          }"
        />
        <MapWriteField
          :error-vuelidate="
            submitted &&
            ((v['latitud']?.$errors && v['latitud']?.$errors.length > 0) ||
              (v['longitud']?.$errors && v['longitud']?.$errors.length > 0))
          "
          @update-coordinates="updateMapLocation"
          :field="{
            label: 'Ubicación',
            type_field: 'map',
            id: 'ubicacion',
            required: true,
          }"
        />
        <EmailFormField
          class="mt-3"
          @update-change="updateChange"
          :field="{
            type: 'email',
            label: 'Correo electrónico de la sucursal',
            id: 'correoe',
            name: 'correoe',
            placeholder: 'Ej: info@empresa.com',
            required: false,
          }"
        />
        <InputFormField
          @update-change="updateChange"
          :error-vuelidate="submitted && errors['persona_nombres']"
          :field="{
            type: 'text',
            label: 'Nombre persona de contacto',
            id: 'persona_nombres',
            name: 'persona_nombres',
            placeholder: 'Escriba el nombre de la persona de contacto',
            required: true,
          }"
        />

        <InputFormField
          @update-change="updateChange"
          :error-vuelidate="submitted && errors['persona_apellido_paterno']"
          :field="{
            type: 'text',
            label: 'Apellido paterno de persona de contacto',
            id: 'persona_apellido_paterno',
            name: 'persona_apellido_paterno',
            placeholder:
              'Escriba el apellido paterno de la persona de contacto',
            required: true,
          }"
        />
        <InputFormField
          @update-change="updateChange"
          :field="{
            type: 'text',
            label: 'Apellido materno de persona de contacto',
            id: 'persona_apellido_materno',
            name: 'persona_apellido_materno',
            placeholder:
              'Escriba el apellido materno de la persona de contacto',
            required: false,
          }"
        />
        <InputFormField
          @update-change="updateChange"
          :error-vuelidate="submitted && errors['persona_cargo']"
          :field="{
            type: 'text',
            label: 'Cargo',
            id: 'persona_cargo',
            name: 'persona_cargo',
            placeholder: 'Escriba el cargo de la persona de contacto',
            required: true,
          }"
        />
        <InputFormField
          @update-change="updateChange"
          :error-vuelidate="submitted && errors['persona_telefonos']"
          :field="{
            type: 'text',
            label: 'Teléfono o Celular',
            id: 'persona_telefonos',
            name: 'persona_telefonos',
            placeholder: 'Escriba el número de la persona de contacto',
            required: true,
          }"
        />
        <InputFormField
          @update-change="updateChange"
          :field="{
            type: 'text',
            label: 'Correo electrónico',
            id: 'persona_correoe',
            name: 'persona_correoe',
            placeholder:
              'Escriba el correo electrónico de la persona de contacto',
            required: false,
          }"
        />
      </div>
    </div>
    <button class="btn btn-success float-end">Guardar</button>
  </form>
</template>

<script>
import InputFormField from "@/components/form-fields/input-form-field.vue";
import EmailFormField from "@/components/form-fields/email-form-field.vue";
import MapWriteField from "@/components/form-fields/map-write-field.vue";
import { registerUpdateBranch } from "@/modules/empresa/services/BranchService";
import NotificationHelper from "@/helpers/notification";
import { userData } from "@/services/user";
import LocalSearchListField from "@/modules/public/components/fields/LocalSearchListField.vue";
import useVuelidate from "@vuelidate/core";

import { required, helpers } from "@vuelidate/validators";

export default {
  name: "BranchForm",
  components: {
    InputFormField,
    EmailFormField,
    MapWriteField,
    LocalSearchListField,
  },
  props: {
    initialData: {
      type: Object,
      default: () => {},
    },
  },

  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      title: "Crear nueva sucursal",
      items: [
        {
          text: "Solicitud",
          href: "/",
        },
        {
          text: "Nueva sucursal",
          active: true,
        },
      ],
      submitted: false,
      formData: {
        // textarea: this.initialData?.textarea || "",
        // inputText: this.initialData?.inputText || "",
        // inputInteger: this.initialData?.inputInteger || "",
      },
      tramites: [],
      modalData: {
        id: "successModal",
        title: "Solicitud enviada",
        message:
          "La solicitud para su registro fue enviada correctamente, SENASAG evaluará su información y se contactará a su mail.",
        buttonText: "Aceptar",
        redirectUrl: "/tramitadores",
      },
      backendErrors: {},
      companyData: userData(),
    };
  },
  validations() {
    const validations = {
      formData: {
        nombre_sucursal: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        telefonos: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        direccion: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        iddistrital: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        idprovincia: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        idmunicipio: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        ciudad: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        latitud: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        longitud: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        persona_nombres: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        persona_apellido_paterno: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        persona_cargo: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        persona_telefonos: {
          required: helpers.withMessage("El campo es requerido", required),
        },
      },
    };
    return validations;
  },
  methods: {
    updateFormData(data) {
      Object.assign(this.formData, data);
    },
    onSubmit() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      const newData = { fid_persona_propietario: {} };
      for (let key in this.formData) {
        if (key.startsWith("persona_")) {
          newData.fid_persona_propietario[key.replace("persona_", "")] =
            this.formData[key];
        } else {
          newData[key] = this.formData[key];
        }
      }
      this.backendErrors = {};
      registerUpdateBranch(this.companyData.id, null, newData)
        .then(({ ok, errors: e }) => {
          if (!ok) {
            const { errors, message } = e;
            NotificationHelper.error(null, message);
            return (this.backendErrors = errors);
          }
          NotificationHelper.success(
            null,
            "Solicitud de sucursal creada exitosamente"
          );
          this.$router.push({ name: "empresa.lista.sucursales" });
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    updateChange(data) {
      Object.assign(this.formData, data);
    },
    updateMapLocation({ latitud, longitud }) {
      Object.assign(this.formData, {
        latitud,
        longitud,
      });
    },
  },
  computed: {
    errors() {
      return {
        nombre_sucursal: [
          [
            ...(this.v["nombre_sucursal"]?.$errors || []),
            ...(this.backendErrors["nombre_sucursal"] || []),
          ],
        ],
        telefonos: [
          ...(this.v["telefonos"]?.$errors || []),
          ...(this.backendErrors["telefonos"] || []),
        ],
        direccion: [
          ...(this.v["direccion"]?.$errors || []),
          ...(this.backendErrors["direccion"] || []),
        ],
        iddistrital: [
          ...(this.v["iddistrital"]?.$errors || []),
          ...(this.backendErrors["iddistrital"] || []),
        ],
        idprovincia: [
          ...(this.v["idprovincia"]?.$errors || []),
          ...(this.backendErrors["idprovincia"] || []),
        ],
        idmunicipio: [
          ...(this.v["idmunicipio"]?.$errors || []),
          ...(this.backendErrors["idmunicipio"] || []),
        ],
        ciudad: [
          ...(this.v["ciudad"]?.$errors || []),
          ...(this.backendErrors["ciudad"] || []),
        ],
        latitud: [
          ...(this.v["latitud"]?.$errors || []),
          ...(this.backendErrors["latitud"] || []),
        ],
        longitud: [
          ...(this.v["longitud"]?.$errors || []),
          ...(this.backendErrors["longitud"] || []),
        ],
        persona_nombres: [
          ...(this.v["persona_nombres"]?.$errors || []),
          ...(this.backendErrors["persona_nombres"] || []),
        ],
        persona_apellido_paterno: [
          ...(this.v["persona_apellido_paterno"]?.$errors || []),
          ...(this.backendErrors["persona_apellido_paterno"] || []),
        ],
        persona_apellido_materno: [
          ...(this.v["persona_apellido_materno"]?.$errors || []),
          ...(this.backendErrors["persona_apellido_materno"] || []),
        ],
        persona_cargo: [
          ...(this.v["persona_cargo"]?.$errors || []),
          ...(this.backendErrors["persona_cargo"] || []),
        ],
        persona_telefonos: [
          ...(this.v["persona_telefonos"]?.$errors || []),
          ...(this.backendErrors["persona_telefonos"] || []),
        ],
        persona_correoe: [
          ...(this.v["persona_correoe"]?.$errors || []),
          ...(this.backendErrors["persona_correoe"] || []),
        ],
      };
    },
  },
};
</script>
