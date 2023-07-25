<template>
  <form class="card" novalidate="true" @submit.prevent="onSubmit">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Grupos de requisitos</h4>

            <button
              class="btn-right-text primary btn--hover-icon"
              @click.prevent="newGroup"
            >
              <i class="mdi mdi-plus"></i>
              <span class="text">Nuevo Grupo</span>
            </button>
          </div>
          <div class="card-body">
            <div
              class="alert alert-danger"
              role="alert"
              v-if="data.formFields.length == 0"
            >
              Cargue al menos un grupo.
            </div>
            <div
              class="list-group col nested-list container-sortable"
              v-nested="{
                group: nameGroupElementsSortable,
                f: reorderGroups,
              }"
            >
              <div
                class="list-group-item nested-1"
                :class="{ blurred: !fieldForm.show }"
                v-for="fieldForm in groupsSorted"
                :key="`level0.${fieldForm.uuid}`"
                :data-order="fieldForm.order"
                :data-uuid="fieldForm.uuid"
                :set="
                  (v =
                    v$.data.formFields.$each.$response.$errors[
                      data.formFields.findIndex(
                        (ff) => ff.uuid == fieldForm.uuid
                      )
                    ])
                "
              >
                <div class="d-flex">
                  <i
                    class="mdi mdi-folder text-warning fs-16 align-middle me-2"
                  ></i>
                  <template v-if="!fieldForm.edit">
                    {{ fieldForm.label }}
                  </template>
                  <div
                    class="d-flex justify-content-between align-items-center w-50"
                    v-if="fieldForm.edit"
                  >
                    <input
                      type="text"
                      v-model="
                        data.formFields.find((ff) => ff.uuid == fieldForm.uuid)
                          .label
                      "
                      :class="{
                        'is-invalid': v.label.length > 0,
                      }"
                      class="form-control"
                    />
                    <div
                      class="invalid-feedback mx-2"
                      v-for="(item, index) in v.label"
                      :key="index"
                    >
                      <span v-if="item.$message">{{ item.$message }}</span>
                    </div>
                  </div>

                  <div
                    class="ms-auto me-2 pointer"
                    @click="setCurrentElement(fieldForm.uuid)"
                  >
                    <i
                      class="mdi mdi-plus-box-multiple-outline fs-16 align-middle text-success"
                    ></i>
                    Nuevo elemento
                  </div>
                  <div
                    class="me-2 pointer"
                    @click="toggleGroup(fieldForm.uuid)"
                    v-show="fieldForm.show"
                  >
                    <i
                      class="mdi mdi-eye-off-outline fs-16 align-middle text-danger"
                    ></i>
                    Ocultar
                  </div>

                  <div
                    class="me-2 pointer"
                    @click="toggleGroup(fieldForm.uuid)"
                    v-show="!fieldForm.show"
                  >
                    <i
                      class="mdi mdi-eye-outline fs-16 align-middle text-success"
                    ></i>
                    Mostrar
                  </div>
                  <div
                    class="me-2 pointer"
                    @click="editGroup(fieldForm.uuid, { edit: true })"
                  >
                    <i
                      class="mdi mdi-cog-outline fs-16 align-middle text-success"
                    ></i>
                    Editar
                  </div>
                </div>

                <div
                  class="list-group nested-list nested-sortable"
                  v-nested="{
                    group: nameGroupGroupsSortable,
                    f: reorderGroups,
                  }"
                >
                  <div
                    class="list-group-item nested-2"
                    :class="{ blurred: !fieldForm.show || !fieldFormN1.show }"
                    v-for="fieldFormN1 in fieldForm.nestedL2"
                    :key="`level1.${fieldFormN1.uuid}`"
                    :data-uuid="fieldFormN1.uuid"
                    :data-uuidparent="fieldForm.uuid"
                  >
                    <div class="d-flex">
                      <i
                        class="ri-apps-2-line text-primary fs-16 align-middle me-2"
                      ></i>
                      <template v-if="!fieldFormN1.edit">
                        {{ fieldFormN1.name }}
                      </template>
                      <div
                        class="ms-auto me-2 pointer"
                        @click="toggleElement(fieldForm.uuid, fieldFormN1.uuid)"
                        v-show="fieldFormN1.show"
                      >
                        <i
                          class="mdi mdi-eye-off-outline fs-16 align-middle text-danger"
                        ></i>
                        Ocultar
                      </div>

                      <div
                        class="ms-auto me-2 pointer"
                        @click="toggleElement(fieldForm.uuid, fieldFormN1.uuid)"
                        v-show="!fieldFormN1.show"
                      >
                        <i
                          class="mdi mdi-eye-outline fs-16 align-middle text-success"
                        ></i>
                        Mostrar
                      </div>

                      <div
                        class="pointer"
                        @click="
                          setCurrentElement(fieldForm.uuid, fieldFormN1.uuid)
                        "
                      >
                        <i
                          class="mdi mdi-cog-outline fs-16 align-middle text-success"
                        ></i>
                        Editar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="ml-auto btn-right-text primary btn--hover-icon mb-0 mr-1 mt-3"
              type="submit"
            >
              <i class="mdi mdi-content-save-outline mr-0"></i
              ><span class="text">Guardar</span>
            </button>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>

    <Modal
      ref="modal"
      title="Requisito"
      v-if="modal"
      @on:close:modal="closeModal"
    >
      <RequirementFormModal
        ref="fieldFormModal"
        :initial-data="currentElement"
        @on:update:requirement="updateRequirement"
        @on:create:requirement="newRequirement"
        @on:close:modal="closeModal"
      ></RequirementFormModal>
    </Modal>
  </form>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import Modal from "@/components/widgets/modal";
import RequirementFormModal from "@/components/tramites/forms/requirement-form-modal.vue";
import { v4 as uuidv4 } from "uuid";
import groupsMixin from "@/mixins/groupsMixin";

export default {
  mixins: [groupsMixin],
  components: {
    RequirementFormModal,
    Modal,
  },
  props: {
    initialData: {
      type: Object,
      default: () => {},
    },
    errors: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      nameGroupGroupsSortable: "nestedL0",
      nameGroupElementsSortable: "container",
      groupsKey: "formFields",
      groupsSortKey: "order",
      elementsGroupKey: "nestedL2",
      elementsGroupSortKey: "order",
      submitted: false,
      currentElement: null,
      modal: false,
      currentUuidGroup: null,
      currentUuidElement: null,
      data: {
        typeInfo: this.initialData?.typeInfo,
        table: this.initialData?.table,
        interoperability: this.initialData?.interoperability || [],

        formFields: [
          {
            uuid: "557e5eb4-6f29-4f43-b903-92a135360249",
            order: 1,
            label: "Nuevo grupo",
            edit: false,
            nestedL2: [
              {
                name: "nuevo requisito",
                help: "nuevo requisito",
                exampleFile: "[object File]",
                downloadFile: "[object File]",
                type: "requerido",
                uuid: "724acc19-21b6-458c-8d9c-33b7a2a967a3",
                order: 0,
                show: true,
              },
            ],
            show: true,
          },
          {
            uuid: "1871fe76-c0e6-4f00-9334-16ec4a3665f8",
            order: 0,
            label: "Grupo 2",
            edit: false,
            nestedL2: [
              {
                name: "nuevo requisito",
                help: "nuevo requisito",
                exampleFile: "[object File]",
                downloadFile: "[object File]",
                type: "requerido",
                uuid: "98eeb5ca-1dca-4f0c-8687-0b0e75917a1a",
                order: 0,
                show: true,
              },
            ],
            show: true,
          },
        ],
      },
    };
  },
  validations() {
    const validations = {
      data: {
        formFields: {
          required,
          $each: helpers.forEach({
            label: {
              required: helpers.withMessage("El campo es requerido", required),
            },
            nestedL2: {
              $each: helpers.forEach({
                label: {
                  required: helpers.withMessage(
                    "El campo es requerido",
                    required
                  ),
                },
              }),
            },
          }),
        },
      },
    };

    return validations;
  },
  methods: {
    onSubmit() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      this.resetForm();
      this.$emit("on:update:mode", "list");
    },
    resetForm() {
      this.v$.$reset();
    },
    showModal() {
      this.modal = true;
    },
    setCurrentElement(uuidGroup, uuidElement = null) {
      this.currentUuidGroup = uuidGroup;
      this.currentUuidElement = uuidElement;
      this.currentElement = {};
      if (uuidElement)
        this.currentElement = { ...this.findElement(uuidGroup, uuidElement) };

      this.showModal();
    },
    newRequirement(newRequirement) {
      newRequirement.uuid = uuidv4();
      newRequirement.order = 0;
      newRequirement.show = true;

      this.insertElementToGroup(0, this.currentUuidGroup, newRequirement);
    },
    updateRequirement(updatedRequirement) {
      this.updateElement(
        this.currentUuidGroup,
        this.currentUuidElement,
        updatedRequirement
      );
    },
    closeModal() {
      this.$refs.modal.closeModal(false);
      this.modal = false;
    },
    newGroup() {
      const index = 0;
      this.insertGroupAtIndex(index, {
        uuid: uuidv4(),
        order: index,
        label: "Nuevo grupo",
        edit: true,
        nestedL2: [],
        show: true,
      });
    },
  },
  computed: {},
};
</script>
