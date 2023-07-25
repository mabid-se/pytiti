<template>
  <div class="d-flex mb-4">
    <div class="flex-grow-1">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-header align-items-center d-flex-">
              <h4 class="card-title mb-2 flex-grow-1">Lista de productos</h4>
              <h5>Elija el formato de impresión.</h5>
            </div>
            <div class="card-body">
              <div class="live-preview">
                <div class="row gy-4">
                  <div class="col-sm-12 col-lg-12 col-xxl-12">
                    <div class="row">
                      <div class="col-12">
                        <div class="form-check mb-2 mt-3">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="membrete"
                            @change="membrete = $event.target.checked"
                          />
                          <label class="form-check-label" for="membrete">
                            Imprimir escudo y logo
                          </label>
                        </div>
                        <hr />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mb-3">
    <div class="row">
      <div class="col btn_izq"></div>
      <div class="col-6 col-sm-4 btn_cen">
        <a
          class="btn btn-print btn-label right mb-1"
          target="_blank"
          :href="printProductsUrl"
        >
          <i class="ri-printer-line label-icon align-middle fs-16 ms-2"></i>
          Imprimir lista de productos
        </a>
      </div>
      <div class="col btn_der"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    requestProcedureId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      membrete: false,
    };
  },
  computed: {
    printProductsUrl() {
      const host = process.env.VUE_APP_PROD_URL;
      return `${host}api/v1/admin/solicitud-tramite/${
        this.requestProcedureId
      }/productos/pdf/?template=${this.membrete ? "membrete" : "sin-membrete"}`;
    },
  },
};
</script>
