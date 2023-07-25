<template>
  <ProductsPetPcrForm
    v-if="!loading"
    :typesActivity="typesActivity"
    :containers="containers"
    :countries="countries"
    :requestProcedureId="$route.params.slug"
    :key="keyProductsPetPcr"
    :initial-data="currentProduct"
    @on:submitted="addNewProduct"
    @on:updated="editProduct"
  ></ProductsPetPcrForm>
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
            <td>{{ pr.nombre }}</td>
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
                        Editar/Ver
                      </button>
                    </li>
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
import ProductsPetPcrForm from "@/components/widgets/ProductsPetPcrForm.vue";
import { Modal } from "bootstrap";
import NotificationHelper from "@/helpers/notification";

import {
  getTypesProduct,
  getTypes,
  deleteProduct,
} from "@/services/ProductService";
// containers
import {
  deleteProductPetPcr,
  getContainers,
  getTypesActivityPetPcr,
  getProductsPetPcr,
} from "@/services/ProductPetPcrService";
import { getCountries } from "@/services/PaisService";
export default {
  name: "ProductosPetPcr",
  props: {
    requestProcedureId: {
      type: String,
      required: true,
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
      getTypesActivityPetPcr(),
      getTypesProduct(),
      getContainers(),
      getTypes(),
      getProductsPetPcr(this.requestProcedureId),
      getCountries(),
    ]);
    this.loading = false;

    if (!ok1 || !ok2 || !ok3 || !ok4 || !ok5 || !ok6)
      return NotificationHelper.error("Error al cargar los datos");
    this.typesActivity = res1;
    this.typesProduct = res2;
    // this.classes = res3;
    this.containers = res3;
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
      containers: [],
      loading: true,
      modalDelete: null,
      deleteData: {
        id: "deleteProductPetPcrModal",
        title: "¿Estás seguro?",
        message: "Está seguro de elimina éste registro",
        buttonText: "Sí, eliminar registro",
      },
      currentProduct: {},
      keyProductsPetPcr: 1,
    };
  },

  methods: {
    async onDelete() {
      const { ok } = await deleteProductPetPcr(
        this.$route.params.slug,
        this.idProductPetPcr
      );
      if (!ok) return NotificationHelper.error("Error al eliminar.");
      this.products = this.products.filter(
        (pr) => pr.id != this.idProductPetPcr
      );
      this.idProductPetPcr = null;
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
      this.idProductPetPcr = id;
      this.modalDelete.show();
    },
    setCurrentProduct(product) {
      this.currentProduct = { ...product };
      this.keyProductsPetPcr = this.keyProductsPetPcr + 1;
    },
  },
  components: {
    DeleteConfirmationModal,
    ProductsPetPcrForm,
  },
};
</script>
