<template>
  <PageHeader :title="title" :items="items" />
  <div class="row justify-content-md-center margen-contenido">
    <div class="col-xxl-7 col-md-7 col-lg-7">
      <div class="row">
        <div class="col-lg col-xxl margin-cont">
          <div class="card">
            <div class="card-body p-0">
              <div class="live-preview">
                <div class="card card-border-grey m-0">
                  <div class="card-header card-border-bottom-grey">
                    <h6 class="fs-15 mb-0">Nueva sucursal</h6>
                  </div>
                  <div class="card-body">
                    <BranchForm :initial-data="{}"></BranchForm>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/page-header";
import BranchForm from "@/modules/empresa/components/forms/Branch.vue";
// services

export default {
  name: "CreateBranch",
  components: {
    PageHeader,
    BranchForm,
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
      //
    };
  },
};
</script>
