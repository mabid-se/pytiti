<template>
  <ProductsSVForm
    v-if="!loading"
    :classes="sortedClasses"
    :countries="countries"
    :request-procedure-id="$route.params.slug"
    :types="types"
    :especies-destino="especiesDestino"
    :formulaciones-quimicas="formulacionesQuimicas"
    :key="keyProductsSA"
    :initial-data="currentProduct"
    @on:submitted="addNewProduct"
    @on:updated="editProduct"
  ></ProductsSVForm>

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
                        Editar/Ver
                      </button>
                    </li>

                    <li>
                      <button
                        class="dropdown-item"
                        @click="openEtiquetasModal(pr)"
                      >
                        Gestor de etiquetas
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

  <EtiquetasModal
    ref="etiquetasModal"
    :request-procedure-id="$route.params.slug"
    :product="currentProductModal"
  ></EtiquetasModal>
</template>

<script>
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import ProductsSVForm from "@/components/widgets/ProductsSVForm.vue";
import { Modal } from "bootstrap";
import NotificationHelper from "@/helpers/notification";
import PrincipiosActivosModal from "@/components/modals/ProductsSA/PrincipiosActivos.vue";
import EtiquetasModal from "@/components/modals/ProductosSV/Etiquetas.vue";
import ExcipientesModal from "@/components/modals/ProductsSA/Excipientes.vue";
import {
  getTypes,
  getClassesProduct,
  getProducts,
  deleteProduct,
} from "@/services/ProductService";
import { getCountries } from "@/services/PaisService";

import { getViasAdministracion } from "@/services/ViaAdministracionService";
import { getFormulacionesQuimicas } from "@/services/FormulacionesQuimicasService";

import { getEspeciesDestino } from "@/services/EspeciesDestinoService";
import { getTiemposAlmacenamiento } from "@/services/TiemposAlmacenamientoService";
import { getUnidadesMedida } from "@/services/UnidadMedidasService";

export default {
  name: "ProductosSV",
  props: {
    requestProcedureId: {
      type: String,
      required: true,
    },
  },
  async mounted() {
    console.log(this.requestProcedureId);
    this.modalDelete = new Modal(`#${this.deleteData.id}`, {
      backdrop: "static",
    });
    let [
      { ok: ok2, data: res2 },
      { ok: ok3, data: res3 },
      { ok: ok4, data: res4 },
      { ok: ok6, data: res6 },
      { ok: ok7, data: res7 },
      { ok: ok8, data: res8 },
      { ok: ok9, data: res9 },
    ] = await Promise.all([
      getClassesProduct(),
      getTypes(),
      getEspeciesDestino(),
      getCountries(),
      getProducts(this.requestProcedureId),
      getUnidadesMedida(),
      getFormulacionesQuimicas(),
    ]);
    this.loading = false;

    if (!ok2 || !ok3 || !ok4 || !ok6 || !ok7 || !ok8 || !ok9)
      return NotificationHelper.error("Error al cargar los datos");
    this.classes = res2;
    this.types = res3;
    this.countries = res6;
    this.especiesDestino = res4;
    this.products = res7.results;
    this.unidadesMedida = res8;
    this.formulacionesQuimicas = res9;
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
      especiesDestino: [],
      formulacionesQuimicas: [],
      unidadesMedida: [],
      deleteData: {
        id: "deleteProductSAModal",
        title: "¿Estás seguro?",
        message: "Está seguro de elimina éste registro",
        buttonText: "Sí, eliminar registro",
      },
      currentProduct: {},
      currentProductModal: {},
      keyProductsSA: 1,
    };
  },

  methods: {
    async onDelete() {
      const { ok } = await deleteProduct(
        this.$route.params.slug,
        this.idProductSA
      );
      if (!ok) return NotificationHelper.error("Error al eliminar.");
      this.products = this.products.filter((pr) => pr.id != this.idProductSA);
      this.idProductSA = null;
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
      this.idProductSA = id;
      this.modalDelete.show();
    },
    setCurrentProduct(product) {
      this.currentProduct = { ...product };
      this.keyProductsSA = this.keyProductsSA + 1;
    },

    async openEtiquetasModal(product) {
      this.currentProductModal = { ...product };
      await this.$nextTick();
      this.$refs.etiquetasModal.show();
    },
    async openExcipientesModal(product) {
      this.currentProductModal = { ...product };
      await this.$nextTick();
      this.$refs.excipientesModal.show();
    },
  },
  components: {
    DeleteConfirmationModal,
    ExcipientesModal,
    EtiquetasModal,
    ProductsSVForm,
    PrincipiosActivosModal,
  },
  computed: {
    sortedClasses() {
      return this.classes.sort((a, b) => a.idclase.localeCompare(b.idclase));
    },
  },
};
</script>
