<template>
  <ProductsSAForm
    v-if="!loading"
    :classes="sortedClasses"
    :countries="countries"
    :request-procedure-id="$route.params.slug"
    :vias-administracion="viasAdministracion"
    :types="types"
    :especies-destino="especiesDestino"
    :tiempos-almacenado="tiemposAlmacenado"
    :key="keyProductsSA"
    :initial-data="currentProduct"
    @on:submitted="addNewProduct"
    @on:updated="editProduct"
  ></ProductsSAForm>

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
                        @click="openPrincipiosActivoModal(pr)"
                      >
                        Registrar principios activos
                      </button>
                    </li>
                    <li>
                      <button
                        class="dropdown-item"
                        @click="openExcipientesModal(pr)"
                      >
                        Registrar excipientes
                      </button>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalgrid3"
                        >Historial</a
                      >
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

  <PrincipiosActivosModal
    ref="principiosModal"
    :request-procedure-id="$route.params.slug"
    :unidades-medida="unidadesMedida"
    :product="currentProductModal"
  ></PrincipiosActivosModal>

  <ExcipientesModal
    ref="excipientesModal"
    :request-procedure-id="$route.params.slug"
    :unidades-medida="unidadesMedida"
    :product="currentProductModal"
  ></ExcipientesModal>
  <teleport to="#modals">
    <div
      class="modal fade"
      id="exampleModalgrid3"
      tabindex="-1"
      aria-labelledby="exampleModalgridLabel"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalgridLabel">Historial</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Tipo</th>
                    <th scope="col">Inicio trámite</th>
                    <th scope="col">Observado</th>
                    <th scope="col">Fecha Registro</th>
                    <th scope="col">Años</th>
                    <th scope="col">Caducidad</th>
                    <th scope="col">Costo Bs.</th>
                    <th scope="col">Libro</th>
                    <th scope="col">Folio</th>
                    <th scope="col">Última impresión</th>
                    <th scope="col">Modificado por</th>
                    <th scope="col">Modificado el</th>
                    <th scope="col">Nro. Liquidación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>R</td>
                    <td>19/8/2020</td>
                    <td>CHECKBOX</td>
                    <td>3/10/2020</td>
                    <td>5</td>
                    <td>2/10/2025</td>
                    <td>3971</td>
                    <td>02/20</td>
                    <td>.</td>
                    <td>26/11/2015</td>
                    <td>fcuellar</td>
                    <td>14/12/2020 11:06:52</td>
                    <td>484876</td>
                  </tr>
                  <tr>
                    <td>R</td>
                    <td>19/8/2020</td>
                    <td>CHECKBOX</td>
                    <td>3/10/2020</td>
                    <td>5</td>
                    <td>2/10/2025</td>
                    <td>3971</td>
                    <td>02/20</td>
                    <td>.</td>
                    <td>26/11/2015</td>
                    <td>fcuellar</td>
                    <td>14/12/2020 11:06:52</td>
                    <td>484876</td>
                  </tr>
                  <tr>
                    <td>R</td>
                    <td>19/8/2020</td>
                    <td>CHECKBOX</td>
                    <td>3/10/2020</td>
                    <td>5</td>
                    <td>2/10/2025</td>
                    <td>3971</td>
                    <td>02/20</td>
                    <td>.</td>
                    <td>26/11/2015</td>
                    <td>fcuellar</td>
                    <td>14/12/2020 11:06:52</td>
                    <td>484876</td>
                  </tr>
                  <tr>
                    <td>R</td>
                    <td>19/8/2020</td>
                    <td>CHECKBOX</td>
                    <td>3/10/2020</td>
                    <td>5</td>
                    <td>2/10/2025</td>
                    <td>3971</td>
                    <td>02/20</td>
                    <td>.</td>
                    <td>26/11/2015</td>
                    <td>fcuellar</td>
                    <td>14/12/2020 11:06:52</td>
                    <td>484876</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import ProductsSAForm from "@/components/widgets/ProductsSAForm.vue";
import { Modal } from "bootstrap";
import NotificationHelper from "@/helpers/notification";
import PrincipiosActivosModal from "@/components/modals/ProductsSA/PrincipiosActivos.vue";
import ExcipientesModal from "@/components/modals/ProductsSA/Excipientes.vue";
import {
  getTypes,
  getClassesProduct,
  getProducts,
  deleteProduct,
} from "@/services/ProductService";
import { getCountries } from "@/services/PaisService";

import { getViasAdministracion } from "@/services/ViaAdministracionService";

import { getEspeciesDestino } from "@/services/EspeciesDestinoService";
import { getTiemposAlmacenamiento } from "@/services/TiemposAlmacenamientoService";
import { getUnidadesMedida } from "@/services/UnidadMedidasService";

export default {
  name: "ProductosSA",
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
      { ok: ok7, data: res7 },
      { ok: ok8, data: res8 },
    ] = await Promise.all([
      getViasAdministracion(),
      getClassesProduct(),
      getTypes(),
      getEspeciesDestino(),
      getTiemposAlmacenamiento(),
      getCountries(),
      getProducts(this.requestProcedureId),
      getUnidadesMedida(),
    ]);
    this.loading = false;

    if (!ok1 || !ok2 || !ok3 || !ok4 || !ok5 || !ok6 || !ok7 || !ok8)
      return NotificationHelper.error("Error al cargar los datos");
    this.classes = res2;
    this.types = res3;
    this.viasAdministracion = res1;
    this.countries = res6;
    this.especiesDestino = res4;
    this.tiemposAlmacenado = res5;
    this.products = res7.results;
    this.unidadesMedida = res8;
  },
  data() {
    return {
      data: {
        paisorigen: [],
        clase: "",
        tipo: "",
      },
      viasAdministracion: [],
      typesActivity: [],
      typesProduct: [],
      classes: [],
      types: [],
      products: [],
      countries: [],
      viasAdministracion: [],
      loading: true,
      modalDelete: null,
      especiesDestino: [],
      tiemposAlmacenado: [],

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

    async openPrincipiosActivoModal(product) {
      this.currentProductModal = { ...product };
      await this.$nextTick();
      this.$refs.principiosModal.show();
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
    ProductsSAForm,
    PrincipiosActivosModal,
  },
  computed: {
    sortedClasses() {
      return this.classes.sort((a, b) => a.idclase.localeCompare(b.idclase));
    },
  },
};
</script>
