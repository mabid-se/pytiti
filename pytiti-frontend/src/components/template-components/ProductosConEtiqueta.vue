<template>
  <div class="col-lg-12" v-if="!readOnly">
    <div class="card">
      <div class="card-header align-items-center d-flex-">
        <h4 class="card-title mb-2 flex-grow-1">
          Registro de productos con etiqueta
        </h4>
        <h5>
          Esta sección le permitirá agregar productos con etiquetas aprobadas
          previamente al trámite solicitado.
        </h5>
      </div>
      <!-- end card header -->
      <div class="card-body" :set="(v = v$)">
        <div class="live-preview">
          <div class="col-6">
            <label for="formFile" class="form-label"
              >Escriba el número de certificado para importar un producto</label
            >
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                :class="{
                  'is-invalid': submitted && v.codigo.$error,
                }"
                v-model="codigo"
                @keypress="isNumber($event)"
              />

              <button class="btn btn-info" type="button" @click="onSubmit">
                Buscar producto
              </button>
            </div>
            <div
              v-if="submitted"
              v-for="(item, index) in v.codigo.$errors"
              :key="index"
              class="error-validation"
            >
              <span v-if="item.$message">{{ item.$message }}</span>
            </div>
          </div>
          <div class="row gy-4">
            <!-- loop servicio -->
            <div class="col-xxl-2"></div>
            <div class="col-xxl-8">
              <h6 class="card-title mb-3 text-center" v-if="errors">
                <span class="badge bg-danger align-middle fs-14">{{
                  errors.message
                }}</span>
              </h6>
              <h6
                class="card-title mb-3 text-center"
                v-if="!errors && response"
              >
                <span class="badge bg-success align-middle fs-14">{{
                  response.message
                }}</span>
              </h6>
              <div
                class="card border card-border-success"
                style="display: block"
                v-if="!errors && response"
              >
                <div class="card-body">
                  <h5 class="text-muted text-uppercase fs-13 mb-4">
                    Datos de la empresa
                  </h5>
                  <div class="row g-3 mb-3">
                    <div class="row g-3 mb-3">
                      <div class="col-lg-12 mt-menor">
                        <label for="basic-url" class="form-label"
                          >Nro. Solicitud:</label
                        >
                        <span class="text-muted ml-1 mb-0">{{
                          response.data.soliciudNro
                        }}</span>
                        <br />
                        <label for="basic-url" class="form-label"
                          >Nombre del solicitante:</label
                        >
                        <span class="text-muted ml-1 mb-0">{{
                          response.data.solicitanteNombre
                        }}</span>
                        <br />
                        <label for="basic-url" class="form-label"
                          >Documento de identidad:</label
                        >
                        <span class="text-muted ml-1 mb-0">{{
                          response.data.solicitanteCi
                        }}</span>
                        <br />
                        <label for="basic-url" class="form-label"
                          >Razón Social:</label
                        >
                        <span class="text-muted ml-1 mb-0">{{
                          response.data.empresaRazonSocial
                        }}</span>
                        <br />
                        <label for="basic-url" class="form-label">Nit:</label>
                        <span class="text-muted ml-1 mb-0">{{
                          response.data.nit
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ProductsConEtiquetaForm
              v-if="!errors && response"
              :response-prop="this.response"
              :filteredClasses="this.filteredClasses"
              :filteredTypes="this.filteredTypes"
              :typesProduct="this.typesProduct"
              :typesActivity="this.typesActivity"
              :types="this.types"
              :classes="this.classes"
              tag
              @on:submitted="resetProduct"
              :requestProcedureId="$route.params.slug"
            ></ProductsConEtiquetaForm>
            <!--end col-->
          </div>
          <!--end row-->
        </div>
      </div>
    </div>
  </div>
  <div class="col-12">
    <div class="table-responsive mt-4 mt-xl-0">
      <table
        class="table table-success table-striped table-nowrap- align-middle mb-0"
      >
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Nombre</th>
            <th scope="col">Marca</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(pr, index) in products">
            <td class="fw-medium">{{ index + 1 }}</td>
            <td>{{ pr.nombrecomercial }}</td>
            <td>{{ pr.presentacion }}</td>
            <td>
              <div
                class="btn-group"
                role="group"
                aria-label="Button group with nested dropdown"
                v-if="!readOnly"
              >
                <div class="btn-group" role="group">
                  <button
                    id="btnGroupDrop1"
                    type="button"
                    variant="primary"
                    class="btn btn-info btn-md dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Opciones
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="btnGroupDrop1"
                    style=""
                    onShowDeleteConfirmation
                  >
                    <li>
                      <button
                        class="dropdown-item"
                        @click="onShowDeleteConfirmation(pr.id)"
                      >
                        Eliminar
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <teleport to="#modals">
    <DeleteConfirmationModal
      @send-confirmation="onDelete"
      :attrs="deleteData"
    />
  </teleport>
</template>

<script>
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";

import { required, helpers, integer } from "@vuelidate/validators";
import {
  searchProduct,
  getTypesActivity,
  getTypesProduct,
  getClassesProduct,
  getTypes,
  getProducts,
  deleteProduct,
} from "@/services/ProductService";
import formMixin from "@/mixins/formMixin";
import ProductsConEtiquetaForm from "@/components/widgets/ProductsConEtiquetaForm.vue";
import useVuelidate from "@vuelidate/core";
import NotificationHelper from "@/helpers/notification";
import { Modal } from "bootstrap";

export default {
  name: "ProductosConEtiqueta",
  mixins: [formMixin],
  props: {
    requestProcedureId: {
      type: String,
      required: true,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  async mounted() {
    this.modalDelete = new Modal(`#${this.deleteData.id}`, {
      backdrop: "static",
    });
    let [
      { ok: ok1, data: res1 },
      { ok: ok2, data: res2 },
      { ok: ok3, data: res3 },
      { ok: ok4, data: res4 },
      { ok: ok5, data: res5 },
    ] = await Promise.all([
      getTypesActivity(),
      getTypesProduct(),
      getClassesProduct(),
      getTypes(),
      getProducts(this.requestProcedureId, true),
    ]);
    if (!ok1 || !ok2 || !ok3 || !ok4 || !ok5)
      return NotificationHelper.error("Error al cargar los datos");
    this.typesActivity = res1;
    this.typesProduct = res2;
    this.classes = res3;
    this.types = res4;
    this.products = res5.results;
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      submitted: false,
      codigo: "",
      response: null,
      typesActivity: [],
      typesProduct: [],
      errors: null,
      data: {},
      classes: [],
      types: [],
      products: [],
      modalDelete: null,
      idProductWithTagToDelete: null,
      deleteData: {
        id: "deleteProductWithTagModal",
        title: "¿Estás seguro?",
        message: "Está seguro de elimina éste registro",
        buttonText: "Sí, eliminar registro",
      },
    };
  },
  validations() {
    const validations = {
      codigo: {
        required: helpers.withMessage("El campo es requerido", required),
        integer: helpers.withMessage("Debe ser un número entero", integer),
      },
    };

    return validations;
  },
  computed: {
    filteredClasses() {
      return this.classes.filter(
        (cl) => cl.nombreclase == this.response.data.etiquetaLineaProducto
      );
    },
    filteredTypes() {
      return this.types.filter(
        (t) => t.nombretipo == this.response.data.etiquetaSubClase
      );
    },
  },
  methods: {
    async onSubmit() {
      this.submitted = true;
      this.v$.$touch();
      this.data = {};
      if (this.v$.codigo.$error) return;
      this.response = null;
      this.errors = null;

      const { ok, data, errors } = await searchProduct({
        codigo: this.codigo,
      });

      if (!ok) {
        this.errors = errors;
        return NotificationHelper.error(errors.message || "Error");
      }
      this.response = data;
    },
    resetProduct(product) {
      this.products.push(product.producto);
      this.errors = null;
      this.response = null;
      this.codigo = null;
      this.submitted = false;
    },
    async onDelete() {
      const { ok } = await deleteProduct(
        this.$route.params.slug,
        this.idProductWithTagToDelete,
        true
      );
      if (!ok) return NotificationHelper.error("Error al eliminar.");
      this.products = this.products.filter(
        (pr) => pr.id != this.idProductWithTagToDelete
      );
      this.idProductWithTagToDelete = null;
      NotificationHelper.success("Eliminado exitosamente.");
    },
    onShowDeleteConfirmation(id) {
      this.idProductWithTagToDelete = id;
      this.modalDelete.show();
    },
  },
  components: {
    ProductsConEtiquetaForm,
    DeleteConfirmationModal,
  },
};
</script>
