export const state = {
  CLASE_CUENTAS: {
    SOLICITADO: "badge bg-info",
    INSPECCION: "badge bg-info",
    APROBADO: "badge bg-success",
    ACTIVADO: "badge bg-primary",
    RECHAZADO: "badge bg-danger",
    //
    ENVIADO: "badge bg-info",
    EN_CURSO: "badge bg-success",
    DEVUELTO: "badge bg-primary",
    FINALIZADO: "badge bg-success",
  },
  ICONO_CUENTAS: {
    SOLICITADO: "ri-radio-button-line",
    APROBADO: "ri-check-line",
    ACTIVADO: "ri-check-double-line",
    RECHAZADO: "ri-close-line",
    //
    ENVIADO: "ri-check-line",
    EN_CURSO: "ri-check-line",
    DEVUELTO: "ri-check-radio-button-line",
    FINALIZADO: "ri-check-double-line",
  },
};

export const getters = {
  claseTipoCuenta: (state) => (tipoCuenta) => {
    return state.CLASE_CUENTAS[tipoCuenta];
  },
  iconoTipoCuenta: (state) => (tipoCuenta) => {
    return state.ICONO_CUENTAS[tipoCuenta];
  },
};
