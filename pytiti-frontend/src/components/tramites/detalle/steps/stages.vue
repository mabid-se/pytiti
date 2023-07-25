<template>
  <div class="card">
    <div class="card-header d-flex">
      <h4 class="card-title mb-0 flex-grow-1" v-if="mode == 'list'">
        Proceso de creación de etapas de un trámite
      </h4>

      <h4 class="card-title mb-0 flex-grow-1" v-if="mode == 'create'">
        Nueva etapa
      </h4>

      <h4 class="card-title mb-0 flex-grow-1" v-if="mode == 'create-component'">
        Nuevo componente
      </h4>

      <button
        v-if="mode == 'list'"
        class="btn-right-text primary btn--hover-icon"
        @click="setCurrentStep()"
      >
        <i class="mdi mdi-plus"></i>
        <span class="text">Nuevo</span>
      </button>
    </div>
    <!-- end card header -->
    <div class="card-body card-padding d-flex align-items-end flex-column">
      <div class="card card-soft-border w-100" v-if="mode == 'list'">
        <div class="card-header">
          <h4 class="card-title mb-0 flex-grow-1">Lista de etapas</h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table
              class="table align-middle table-nowrapx mb-0"
              id="stagesTable"
            >
              <thead>
                <tr>
                  <th scope="col">
                    <div class="d-flex justify-content-between">
                      Nombre de etapa
                      <i class="las la-sort la-lg my-auto pointer"></i>
                    </div>
                  </th>
                  <th scope="col">
                    <div class="d-flex justify-content-between">
                      Descripción
                      <i class="las la-sort la-lg my-auto pointer"></i>
                    </div>
                  </th>
                  <th scope="col">
                    <div class="d-flex justify-content-between">
                      Tiempo <i class="las la-sort la-lg my-auto pointer"></i>
                    </div>
                  </th>
                  <th scope="col">
                    <div class="d-flex justify-content-between">
                      Componentes
                      <i class="las la-sort la-lg my-auto pointer"></i>
                    </div>
                  </th>
                  <th scope="col">
                    <div class="d-flex justify-content-between">
                      Acciones <i class="las la-sort la-lg my-auto pointer"></i>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="draggable" v-sortable="reorderTable">
                <tr
                  :data-id="or.data.id"
                  :class="{
                    'draggable-row': or.type == 'stage',
                  }"
                  v-for="or in orders"
                  :key="`row.${or.stage.id}.${or.order}`"
                  v-show="
                    or.type == 'stage' ||
                    (or.type == 'components' && nesteds[or.stage.id].show)
                  "
                >
                  <template v-if="or.type == 'stage'">
                    <td>
                      <a class="fw-medium">
                        <i
                          class="mdi mdi-drag-vertical mdi-24px link-success"
                        ></i>
                      </a>
                      {{ or.data.name }}
                      <a
                        class="fw-medium"
                        @click.stop="showComponents(or.data.id)"
                      >
                        <i
                          v-if="!nesteds[or.data.id].show"
                          class="mdi mdi-plus-circle-outline mdi-24px align-middle me-1 lh-1 link-success"
                        ></i>
                      </a>
                      <a class="fw-medium" @click="hideComponents(or.data.id)">
                        <i
                          v-if="nesteds[or.data.id].show"
                          class="mdi mdi-minus-circle-outline mdi-24px align-middle me-1 lh-1 link-danger"
                        ></i>
                      </a>
                    </td>
                    <td>{{ or.data.description }}</td>
                    <td>{{ or.data.time }}</td>
                    <td>{{ or.data.components }}</td>
                    <td>
                      <div class="d-flex">
                        <Spinner :loading="loading">
                          <button
                            @click="showComponentForm(or.data)"
                            class="btn-icon primary btn--hover-icon"
                            v-tooltip
                            data-bs-placement="top"
                            title="+Componente"
                          >
                            <i class="mdi mdi-text-box-plus-outline"></i>
                          </button>
                        </Spinner>
                        <Spinner :loading="loading">
                          <button
                            @click="setCurrentStep(or.data)"
                            class="btn-icon primary btn--hover-icon"
                            v-tooltip
                            data-bs-placement="top"
                            title="Editar"
                          >
                            <i class="mdi mdi-cog-outline"></i></button
                        ></Spinner>
                        <Spinner :loading="loading">
                          <button
                            class="btn-icon danger btn--hover-icon"
                            v-tooltip
                            data-bs-placement="top"
                            title="Eliminar"
                            @click="showDeleteStageModal"
                          >
                            <i class="mdi mdi-trash-can-outline"></i></button
                        ></Spinner>
                      </div>
                    </td>
                  </template>

                  <template v-if="or.type == 'components'">
                    <td colspan="5">
                      <div class="table-responsive nested">
                        <table class="table">
                          <thead>
                            <tr>
                              <td><b>Nombre del componente</b></td>
                              <td><b>Descripción</b></td>
                              <td><b>Tipo de info</b></td>
                              <td><b>Tabla</b></td>
                              <td><b>Acciones</b></td>
                            </tr>
                          </thead>
                          <tbody
                            :id="`components.${or.stage.id}`"
                            class="draggable"
                            v-sortable
                          >
                            <tr
                              v-for="component in nesteds[or.stage.id]
                                .components"
                              :key="`component.${component.id}`"
                              class="draggable-row"
                            >
                              <td>
                                <a class="fw-medium">
                                  <i
                                    class="mdi mdi-drag-vertical mdi-24px link-success"
                                  ></i>
                                </a>
                                {{ component.name }}
                              </td>
                              <td>{{ component.description }}</td>
                              <td>{{ component.type_component }}</td>
                              <td>{{ component.table }}</td>
                              <td>
                                <div class="d-flex">
                                  <button
                                    class="btn-icon primary btn--hover-icon"
                                    v-tooltip
                                    data-bs-placement="top"
                                    title="Editar"
                                  >
                                    <i class="mdi mdi-cog-outline"></i>
                                  </button>

                                  <button
                                    class="btn-icon danger btn--hover-icon"
                                    v-tooltip
                                    data-bs-placement="top"
                                    title="Eliminar"
                                  >
                                    <i class="mdi mdi-trash-can-outline"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </template>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <StageForm
        v-if="mode == 'create'"
        :initial-data="currentStage"
        @on:submit="onSubmitStage"
        @on:update:mode="$emit('on:update:mode', $event)"
        @on:reload:stages="$emit('on:reload:stages')"
      ></StageForm>

      <ComponentForm
        @on:update:mode="$emit('on:update:mode', $event)"
        v-if="mode == 'create-component'"
        @on-submit="saveComponent"
      ></ComponentForm>

      <DeleteConfirmationModal
        @send-confirmation="confirmDeleteStage"
        :attrs="deleteStageModal"
      />
    </div>
    <!-- end card-body -->
  </div>
</template>

<script>
import ComponentForm from "@/components/tramites/forms/component-form.vue";
import StageForm from "@/components/tramites/forms/stage-form.vue";
// import { registerUpdateStep } from "@/services/creador-tramites/etapas";
import NotificationHelper from "@/helpers/notification";
import { getStepBySlug } from "@/services/creador-tramites/etapas";
import Spinner from "@/components/widgets/spinner";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import { Modal } from "bootstrap";

export default {
  props: {
    mode: {
      type: String,
      required: true,
    },
    steps: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    ComponentForm,
    DeleteConfirmationModal,
    StageForm,
    Spinner,
  },

  data() {
    const nesteds = {};
    this.steps.forEach((step) => {
      nesteds[step.slug] = {
        ...step,
        show: false,
        components: step.components,
        orderStage: (step.orden - 1) * 2,
        orderComponent: (step.orden - 1) * 2 + 1,
        stage: {
          id: step.slug,
          name: step.name,
          description: step.descripcion,
          time: step.tiempo,
          slug: step.slug,
          components: step.components.length,
        },
      };
    });
    return {
      loading: false,
      nesteds,
      currentStage: null,
      form: {
        component: {
          mode: "",
        },
      },
      data: {
        component: {},
      },
      deleteStageModal: {
        id: "confirmDeleteStage",
        title: "Atención",
        message:
          "Esta a punto de ACEPTAR eliminar la etapa. Esta acción es irreversible ¿Desea confirmar?",
        buttonText: "Aceptar",
      },
      modalDeleteStage: null,
    };
  },
  mounted() {
    this.modalDeleteStage = new Modal(`#${this.deleteStageModal.id}`);
  },
  computed: {
    orders() {
      const data = [];
      Object.keys(this.nesteds).forEach((key) => {
        const o = this.nesteds[key];
        data.push({
          order: o.orderStage,
          type: "stage",
          data: o.stage,
          stage: o.stage,
        });
        data.push({
          order: o.orderComponent,
          type: "components",
          data: o.components,
          stage: o.stage,
          show: o.show,
        });
      });
      return data.sort((a, b) => a.order - b.order);
    },
  },
  methods: {
    reorderTable(evt) {
      const oldStage = Object.keys(this.nesteds)
        .map((key) => this.nesteds[key])
        .find(
          (stage) =>
            stage.orderStage == evt.newDraggableIndex * 2 &&
            stage.orderComponent == evt.newDraggableIndex * 2 + 1
        );

      let targetRowOrderStage = oldStage.orderStage;
      let targetRowOrderComponent = oldStage.orderComponent;

      this.nesteds[oldStage.stage.id].orderStage =
        this.nesteds[evt.item.dataset.id].orderStage;
      this.nesteds[oldStage.stage.id].orderComponent =
        this.nesteds[evt.item.dataset.id].orderComponent;

      this.nesteds[evt.item.dataset.id].orderStage = targetRowOrderStage;
      this.nesteds[evt.item.dataset.id].orderComponent =
        targetRowOrderComponent;
    },

    hideComponents(idStage) {
      this.nesteds[idStage].show = false;
    },
    async showComponents(idStage) {
      this.nesteds[idStage].show = true;
    },
    showComponentForm(stage, mode = "create") {
      this.$emit("on:update:mode", "create-component");
      this.currentStage = stage;
      this.form.component.mode = mode;
    },
    saveComponent(formComponent) {
      console.log(formComponent);
      console.log("Now we should show the nested form");
    },
    async setCurrentStep(step = {}) {
      this.loading = true;
      if (step.slug) {
        const { ok, data } = await getStepBySlug(step.slug);
        if (!ok) {
          return NotificationHelper.error("Error al recuperar etapa.");
        }
        this.currentStage = data;
      } else {
        this.currentStage = step;
      }
      this.loading = false;
      this.$emit("on:update:mode", "create");
    },
    showDeleteStageModal() {
      this.modalDeleteStage.show();
    },
    confirmDeleteStage(data) {
      console.log(data);
    },
  },
};
</script>
