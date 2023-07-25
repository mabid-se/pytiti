export default {
  data() {
    return {
      readOnlyFields: [
        "empresa_nombre",
        "empresa_nit",
        // "empresa_ciudad",
        "empresa_direccion",
        "empresa_ubicacion",
        "empresa_telefono",
        "empresa_email",
        "representante_legal_nombres",
        "representante_legal_apellido_paterno",
        "representante_legal_apellido_materno",
        "representante_legal_carnet",
        "representante_legal_expedido",
      ],
    };
  },
  methods: {
    checkIfReadOnly(nameField) {
      return this.readOnlyFields.includes(nameField);
    },
  },
  computed: {
    readOnlyV() {
      return this.field.read_only || this.checkIfReadOnly(this.field.name);
    },
  },
};
