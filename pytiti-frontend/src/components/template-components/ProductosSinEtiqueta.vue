<template>
  <ProductsSinEtiquetaForm
    v-if="!loading"
    :types-product="typesProduct"
    :types-activity="typesActivity"
    :types="types"
    :classes="sortedClasses"
    :countries="countries"
    @on:submitted="addNewProduct"
    @on:updated="editProduct"
    :request-procedure-id="$route.params.slug"
    :key="keyProductsWithoutTag"
    :initial-data="currentProduct"
    :read-only="readOnly"
  ></ProductsSinEtiquetaForm>
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
                        @click="setCurrentProduct(pr)"
                      >
                        {{ !readOnly ? "Editar/Ver" : "Ver" }}
                      </button>
                    </li>
                    <li v-if="!readOnly">
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
import ProductsSinEtiquetaForm from "@/components/widgets/ProductsSinEtiquetaForm.vue";
import { Modal } from "bootstrap";
import NotificationHelper from "@/helpers/notification";

import {
  getTypesActivity,
  getTypesProduct,
  getClassesProduct,
  getTypes,
  getProducts,
  deleteProduct,
} from "@/services/ProductService";
import { getCountries } from "@/services/PaisService";
export default {
  name: "ProductosSinEtiqueta",
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
      { ok: ok6, data: res6 },
    ] = await Promise.all([
      getTypesActivity(),
      getTypesProduct(),
      getClassesProduct(),
      getTypes(),
      getProducts(this.requestProcedureId),
      getCountries(),
    ]);
    this.loading = false;

    if (!ok1 || !ok2 || !ok3 || !ok4 || !ok5 || !ok6)
      return NotificationHelper.error("Error al cargar los datos");
    this.typesActivity = res1;
    this.typesProduct = res2;
    this.classes = res3;
    this.types = res4;
    this.products = res5.results;
    this.countries = res6;
  },
  data() {
    return {
      data: {
        paisorigen: [],
        clase: "",
        tipo: "",
      },
      typesActivity: [],
      typesProduct: [],
      classes: [],
      types: [],
      products: [],
      countries: [],
      loading: true,
      modalDelete: null,
      deleteData: {
        id: "deleteProductWithoutTagModal",
        title: "¿Estás seguro?",
        message: "Está seguro de elimina éste registro",
        buttonText: "Sí, eliminar registro",
      },
      currentProduct: {},
      keyProductsWithoutTag: 1,
    };
  },

  methods: {
    async onDelete() {
      const { ok } = await deleteProduct(
        this.$route.params.slug,
        this.idProductWithoutTagToDelete
      );
      if (!ok) return NotificationHelper.error("Error al eliminar.");
      this.products = this.products.filter(
        (pr) => pr.id != this.idProductWithoutTagToDelete
      );
      this.idProductWithoutTagToDelete = null;
      NotificationHelper.success("Eliminado exitosamente.");
    },
    addNewProduct(product) {
      this.products.push(product);
    },
    editProduct(product) {
      const index = this.products.findIndex((pr) => pr.id == product.id);
      this.products.splice(index, 1, product);
      this.currentProduct = {};
    },

    onShowDeleteConfirmation(id) {
      this.idProductWithoutTagToDelete = id;
      this.modalDelete.show();
    },
    setCurrentProduct(product) {
      this.currentProduct = { ...product };
      this.keyProductsWithoutTag = this.keyProductsWithoutTag + 1;
    },
  },
  components: {
    DeleteConfirmationModal,
    ProductsSinEtiquetaForm,
  },
  computed: {
    sortedClasses() {
      return this.classes.sort((a, b) => a.idclase.localeCompare(b.idclase));
    },
  },
};
</script>
