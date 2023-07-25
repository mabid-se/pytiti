<template>
  <Spinner :loading="loading">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-header align-items-center d-flex-">
          <h4 class="card-title mb-2 flex-grow-1">
            Programación de inspección
          </h4>
          <h5>Designe un inspector y organice su agenda</h5>
        </div>
        <!-- end card header -->
        <div class="card-body">
          <div class="live-preview">
            <div class="row gy-4">
              <div class="col-sm-12 col-lg-12 col-xxl-12">
                <p class="text-black mb-3">
                  <strong>Inpectores asignados:</strong>
                  {{ requestRegistersInspection.length }}
                </p>
                <div class="col-12 mb-3">
                  <div class="table-responsive mt-4 mt-xl-0">
                    <table
                      class="table table-success table-striped table-nowrap- align-middle mb-0"
                    >
                      <thead>
                        <tr>
                          <th scope="col">N°</th>
                          <th scope="col">Fecha y hora de Inicio</th>
                          <th scope="col">Fecha y hora de Finalización</th>
                          <th scope="col">Inspector</th>
                          <th scope="col">Dirección</th>
                          <th scope="col">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(rr, index) in requestRegistersInspection"
                          :key="rr.id"
                        >
                          <td class="fw-medium">{{ index + 1 }}</td>
                          <td>
                            {{
                              formatDatetimedddDMMMHHmm(rr.fecha_hora_inicio)
                            }}
                          </td>
                          <td>
                            {{ formatDatetimedddDMMMHHmm(rr.fecha_hora_fin) }}
                          </td>
                          <td>
                            {{ rr.fid_inspector.first_name }}
                            {{ rr.fid_inspector.last_name }}
                          </td>
                          <td>{{ rr.direccion_inspeccion }}</td>
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
                                >
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      @click.prevent="
                                        openModalAssignedInspector(rr)
                                      "
                                      >Editar</a
                                    >
                                  </li>
                                  <li>
                                    <a
                                      class="dropdown-item"
                                      @click.prevent="showDeleteModal(rr.id)"
                                      >Eliminar</a
                                    >
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
                <div class="mb-3">
                  <p class="text-black mb-3">
                    <strong>Ver agenda del Inspector:</strong>
                  </p>
                  <select
                    v-model="currentInspectorId"
                    class="form-select mb-0"
                    aria-label="Default select example"
                  >
                    <option selected disabled>- Seleccione -</option>
                    <option
                      :value="inspector.id"
                      v-for="inspector in inspectors"
                      :key="inspector.id"
                    >
                      {{ inspector.first_name }} {{ inspector.last_name }}
                    </option>
                  </select>
                  <div id="basiInputAyuda" class="form-text"></div>
                </div>
                <p
                  class="text-black mb-3"
                  style="float: left"
                  v-if="currentInspector"
                >
                  <strong>Agenda de:</strong> {{ currentInspector.first_name }}
                  {{ currentInspector.last_name }}
                </p>
                <div class="col-12 mb-3" v-if="currentInspector">
                  <div class="derecha">
                    <a
                      @click.prevent="openModalAssignedInspector()"
                      class="btn btn-success btn-label right"
                      data-bs-toggle="modal"
                      data-backdrop="static"
                      data-keyboard="false"
                    >
                      <i
                        class="ri-file-edit-line label-icon align-middle fs-16 ms-2"
                      ></i>
                      Asignar inspector
                    </a>
                  </div>
                </div>

                <div class="col-12 mb-3" v-if="currentInspector">
                  <div class="table-responsive mt-4 mt-xl-0">
                    <table
                      class="table table-success table-striped table-nowrap- align-middle mb-0"
                    >
                      <thead>
                        <tr>
                          <th scope="col">N°</th>
                          <th scope="col">Fecha y hora de Inicio</th>
                          <th scope="col">Fecha y hora de Finalización</th>
                          <th scope="col">Inspector</th>
                          <th scope="col">Dirección</th>
                          <th scope="col">Trámite</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(rr, index) in inspectorRegistersInspection"
                          :key="rr.id"
                        >
                          <td class="fw-medium">{{ index + 1 }}</td>
                          <td>
                            {{
                              formatDatetimedddDMMMHHmm(rr.fecha_hora_inicio)
                            }}
                          </td>
                          <td>
                            {{ formatDatetimedddDMMMHHmm(rr.fecha_hora_fin) }}
                          </td>
                          <td>
                            {{ rr.fid_inspector.first_name }}
                            {{ rr.fid_inspector.last_name }}
                          </td>
                          <td>{{ rr.direccion_inspeccion }}</td>
                          <td>
                            <a
                              @click.prevent="openModalVerDatos(rr.id)"
                              class="btn btn-success"
                              >Ver datos</a
                            >
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!--end col-->
            </div>
            <!--end row-->
          </div>
        </div>
      </div>
      <Modal
        ref="verDatos"
        title="Datos de la inpección programada"
        v-if="modals.verDatos && currentRegisterInspection"
        @on:close:modal="
          currentRegisterInspection = null;
          closeModal('verDatos');
        "
        :css-classes="{ 'modal-dialog-centered': true, 'modal-lg': true }"
      >
        <VerDatos
          :inspection="currentRegisterInspection"
          :requestProcedure="requestProcedure"
        ></VerDatos>
        <template v-slot:buttons>
          <div class="d-flex justify-content-end mt-3">
            <a
              @click.prevent="
                currentRegisterInspection = null;
                closeModal('verDatos');
              "
              class="btn btn-secondary btn-md btn btn-soft-dark waves-effect waves-light me-2"
              data-bs-dismiss="modal"
            >
              Cerrar</a
            >
          </div>
        </template>
      </Modal>

      <Modal
        ref="asignarInspector"
        title="Formulario de registro de inspección"
        v-if="modals.asignarInspector"
        @on:close:modal="closeModal('asignarInspector')"
        :css-classes="{ 'modal-dialog-centered': true, 'modal-lg': true }"
        :show-header="false"
      >
        <AsignarInspector
          :inspection="currentRegisterInspection"
          :request-procedure="requestProcedure"
          :inspector="currentInspector"
          :inspection-types="inspectionTypes"
          @on:createUpdateRegisterInspection="
            currentInspectorId = null;
            inspectorRegistersInspection = [];
            currentInspector = null;
            refetch();
          "
          @on:closeModal="closeModal('asignarInspector')"
          :initial-data="currentRegisterInspection"
        ></AsignarInspector>
      </Modal>
      <DeleteConfirmationModal
        @send-confirmation="deleteRegisterInspection"
        :attrs="deleteDataModal"
      /></div
  ></Spinner>
</template>

<script>
import Modal from "@/components/widgets/modal";
import VerDatos from "./modals/VerDatos.vue";
import AsignarInspector from "./modals/AsignarInspector.vue";
import NotificationHelper from "@/helpers/notification";
import {
  getInspectors,
  getInspectionTypes,
  getRegisterInspection,
  getRequestRegisterInspections,
  getInspectorRegisterInspections,
  deleteRegisterInspection,
} from "@/modules/senasag/services/CalendarioService";
import Spinner from "@/components/widgets/spinner";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import formatDatesMixin from "@/mixins/formatDatesMixin";

import { Modal as ModalBootstrap } from "bootstrap";

export default {
  mixins: [formatDatesMixin],
  props: {
    requestProcedure: {
      type: Object,
      required: true,
    },
  },
  components: {
    Modal,
    AsignarInspector,
    DeleteConfirmationModal,
    VerDatos,
    Spinner,
  },
  data() {
    return {
      modals: {
        verDatos: false,
        asignarInspector: false,
      },
      deleteDataModal: {
        id: "deleteRegisterInspectionModal",
        title: "¿Estás seguro?",
        message: "Está seguro de eliminar éste registro",
        buttonText: "Sí, eliminar registro de todos modos",
      },
      loading: true,
      inspectors: [],
      inspectionTypes: [],
      requestRegistersInspection: [],
      currentInspector: null,
      currentInspectorId: null,
      inspectorRegistersInspection: [],
      currentRegisterInspection: null,
      idRegisterInspectionToDelete: null,
    };
  },
  mounted() {
    this.loadInitialData();
  },
  methods: {
    closeModal(nameModal) {
      this.$refs[nameModal].closeModal(false);
      this.modals[nameModal] = false;
    },
    refetch() {
      this.loadInitialData();
      this.fetchInspectorRegisterInspections();
    },
    showDeleteModal(registerId) {
      this.idRegisterInspectionToDelete = registerId;
      this.modal = new ModalBootstrap(`#${this.deleteDataModal.id}`);
      this.modal.show();
    },
    async loadInitialData() {
      Promise.all([
        getInspectors(this.requestProcedure.id_solicitud_tramite),
        getInspectionTypes(),
        getRequestRegisterInspections(
          this.requestProcedure.id_solicitud_tramite
        ),
      ]).then(
        ([
          { ok, data },
          { ok: ok2, data: data2 },
          { ok: ok3, data: data3 },
        ]) => {
          if (!ok || !ok2 || !ok3)
            return NotificationHelper.error("Error al cargar los datos.");
          this.loading = false;
          this.inspectors = data.results;
          this.inspectionTypes = data2.results;
          this.requestRegistersInspection = data3.results;
        }
      );
    },
    async deleteRegisterInspection() {
      const { ok } = await deleteRegisterInspection(
        this.idRegisterInspectionToDelete
      );
      if (!ok)
        return NotificationHelper.error("Error al cargar datos del inspector.");
      NotificationHelper.success(
        "Registro de inspección eliminando exitosamente."
      );
      this.refetch();
    },
    async fetchInspectorRegisterInspections() {
      if (!this.currentInspectorId) return;
      this.inspectorRegistersInspection = [];
      this.currentInspector = null;
      const { ok, data } = await getInspectorRegisterInspections(
        this.currentInspectorId
      );
      if (!ok)
        return NotificationHelper.error("Error al cargar datos del inspector.");
      this.inspectorRegistersInspection = data.results;
      this.currentInspector = this.inspectors.find(
        (inspector) => inspector.id == this.currentInspectorId
      );
    },
    async openModalVerDatos(registerId) {
      this.modals.verDatos = true;
      const { ok, data } = await getRegisterInspection(registerId);
      if (!ok)
        return NotificationHelper.error(
          "Error al cargar datos de la inspección."
        );
      this.currentRegisterInspection = data;
    },
    openModalAssignedInspector(currentRegisterInspection = {}) {
      this.currentRegisterInspection = currentRegisterInspection;
      this.modals.asignarInspector = true;
    },
  },
  watch: {
    async currentInspectorId() {
      this.fetchInspectorRegisterInspections();
    },
  },
};
</script>
