<template>
  <div class="col-lg-12">
    <div class="card color-cabecera-ia">
      <div class="card-body">
        <div class="row">
          <div class="col-md-1 text-center">
            <h6 class="card-title mb-2">
              <i
                class="mdi mdi-lock-pattern mdi-36px align-middle me-1 lh-1"
              ></i>
              TRÁMITE
            </h6>
          </div>
          <div class="col-md-9">
            <p class="text-black">
              <span>{{ title }}</span>
              <span> ({{ description }})</span>
            </p>
          </div>
          <div class="col-md-2">
            <div class="hstack gap-2 justify-content-end">
              <a href="javascript:void(0)" class="btn btn-link link-success"
                ><i
                  class="mdi mdi-cog-outline fs-16 align-middle me-1 link-success"
                ></i>
                <span class="text-black">Editar</span></a
              >
              <a href="javasceript:void(0);" class="btn btn-link link-danger"
                ><i
                  class="mdi mdi-trash-can-outline fs-16 align-middle me-1 link-danger"
                ></i>
                <span class="text-black">Eliminar</span></a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderTramite",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.color-cabecera-ia {
  background: rgba(243, 146, 0, 0.4);
  padding: 5px 10px 5px 15px;
}
</style>
