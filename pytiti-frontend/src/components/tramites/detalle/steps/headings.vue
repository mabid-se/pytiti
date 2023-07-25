<template>
  <div class="card">
    <div class="card-header d-flex">
      <h4 class="card-title mb-0 flex-grow-1" v-show="mode == 'list'">
        Proceso de creación de rubros
      </h4>

      <h4 class="card-title mb-0 flex-grow-1" v-show="mode == 'create'">
        Creación de rubro
      </h4>

      <button
        v-show="mode == 'list'"
        class="btn-right-text primary btn--hover-icon"
        @click="$emit('on:update:mode', 'create')"
      >
        <i class="mdi mdi-plus"></i>
        <span class="text">Nuevo</span>
      </button>
    </div>
    <!-- end card header -->
    <HeadingForm
      v-show="mode == 'create'"
      @on:update:mode="$emit('on:update:mode', $event)"
      @on-submit="saveRequirementForm"
    ></HeadingForm>
    <div class="card-body card-padding d-flex align-items-end flex-column">
      <div class="card card-soft-border w-100" v-show="mode == 'list'">
        <div class="card-header">
          <h4 class="card-title mb-0 flex-grow-1">Lista de rubros</h4>
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
                    <div class="d-flex justify-content-between">ID</div>
                  </th>
                  <th scope="col">
                    <div class="d-flex justify-content-between">Rubro</div>
                  </th>
                  <th scope="col">
                    <div class="d-flex justify-content-between">Descripción</div>
                  </th>

                  <th scope="col">
                    <div class="d-flex justify-content-between">Acciones</div>
                  </th>
                </tr>
              </thead>
              <tbody v-sortable class="draggable">
                <tr
                  v-for="r in requirements"
                  :key="`requirement.${r.id}`"
                  class="draggable-row"
                >
                  <td>
                    <div class="d-flex">
                      <a class="fw-medium pointer">
                        <i
                          class="mdi mdi-drag-vertical mdi-24px link-success"
                        ></i>
                      </a>
                      <span class="align-self-center">
                        {{ r.id }}
                      </span>
                    </div>
                  </td>
                  <td>{{ r.rubro }}</td>
                  <td>{{ r.description }}</td>
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
        </div>
      </div>
    </div>
    <!-- end card-body -->
  </div>
</template>

<script>
import HeadingForm from "@/components/tramites/forms/heading-form.vue";

export default {
  props: {
    mode: {
      type: String,
      required: true,
    },
  },

  components: {
    HeadingForm,
  },

  data() {
    return {
      requirements: [
        {
          id: 1,
          rubro: "Industrial /Procesadora de alimentos",
          description:
            "Just pellentesque eleifend. In ligula lacus, tincidunt et mi eget, al",
        },
        {
          id: 2,
          rubro: "Semi-Industrial",
          description:
            "Just pellentesque eleifend. In ligula lacus, tincidunt et mi eget, al",
        },
        {
          id: 3,
          rubro: "Semi-Industrial",
          description:
            "Just pellentesque eleifend. In ligula lacus, tincidunt et mi eget, al",
        },
      ],
      data: {
        requirement: {},
      },
    };
  },
  methods: {
    showRequirementForm(mode = "create") {
      this.$emit("on:update:mode", "create");
      this.form.component.mode = mode;
    },
    saveRequirementForm(formComponent) {
      console.log(formComponent);
      console.log("Now we should show the nested form");
    },
  },
};
</script>
