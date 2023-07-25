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
                    <h6 class="fs-15 mb-0">Permiso</h6>
                  </div>
                  <div class="card-body">
                    <form
                      @submit="sendForm"
                      class="needs-validation"
                      novalidate
                    >
                      <PermisoFormUpdate @update-form-data="updateFormData" />
                      <button class="btn btn-success float-end">Guardar</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessModal :attrs="modalData" />
      <a
        id="show-success-modal"
        :href="`#${modalData.id}`"
        :data-bs-target="`#${modalData.id}`"
        data-bs-toggle="modal"
        style="display: none"
      ></a>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/page-header";
import PermisoFormUpdate from "@/views/pages/senasag/permisos/permiso-form-update.vue";
import SuccessModal from "@/components/pytiti/success-modal.vue";
// services
import { getPermissionUpdateSiaService } from "@/services/permisos";

export default {
  name: "RegistroTramitador",
  components: {
    PageHeader,
    PermisoFormUpdate,
    SuccessModal,
  },
  data() {
    return {
      title: "Actualizar el permiso",
      items: [
        {
          text: "Solicitud",
          href: "/",
        },
      ],
      formData: {},
      tramites: [],
      modalData: {
        id: "successModal",
        title: "Permiso actulizado",
        message: "El permiso se actulizo correctamente.",
        buttonText: "Aceptar",
        redirectUrl: "/senasag/permisos/",
      },
      backendErrors: {},
    };
  },
  methods: {
    updateFormData(data) {
      Object.assign(this.formData, data);
    },
    sendForm(e) {
      e.preventDefault();
      if (!e.target.checkValidity()) {
        e.stopPropagation();
        e.target.classList.add("was-validated");
      } else {
        getPermissionUpdateSiaService(
          this.$route.params.id,
          this.formData
        ).then(
          (res) => {
            if (e.target.checkValidity()) {
              document.querySelector("#show-success-modal").click();
            }
          },
          (err) => {
            console.error(err);
          }
        );
      }
    },
    //
  },
};
</script>
