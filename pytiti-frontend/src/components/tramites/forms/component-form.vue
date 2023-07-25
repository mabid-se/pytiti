<template>
  <div class="card card-soft-border w-100">
    <div class="card-header">
      <h4 class="card-title mb-0 flex-grow-1">Crear componente</h4>
    </div>
    <div class="card-body">
      <form class="w-100" novalidate="true" @submit.prevent="onSubmit">
        <div class="row">
          <div class="col-lg-6">
            <label
              for="typeInfo"
              class="form-label"
              :class="{
                'text-danger': submitted && v$.data.typeInfo.$error,
              }"
              >Tipo de información</label
            >
            <select
              id="typeInfo"
              name="typeInfo"
              class="form-select"
              :class="{
                'is-invalid': submitted && v$.data.typeInfo.$error,
              }"
              v-model="data.typeInfo"
            >
              <option value="">Seleccione un tipo</option>
              <option value="formulario">Formulario</option>
              <option value="api">API</option>
              <option value="personalizado">Personalizado</option>
            </select>

            <div
              v-for="(item, index) in v$.data.typeInfo.$errors"
              :key="index"
              class="invalid-feedback"
            >
              <span v-if="item.$message">{{ item.$message }}</span>
            </div>
          </div>

          <div class="col-lg-6" v-if="isForm">
            <label
              for="table"
              class="form-label"
              :class="{
                'text-danger': submitted && v$.data.table.$error,
              }"
              >Tabla</label
            >
            <select
              id="table"
              name="table"
              class="form-select"
              :class="{
                'is-invalid': submitted && v$.data.table.$error,
              }"
              v-model="data.table"
            >
              <option value="">Seleccione uno</option>
              <option value="empresa">Empresa</option>
            </select>

            <div
              v-for="(item, index) in v$.data.table.$errors"
              :key="index"
              class="invalid-feedback"
            >
              <span v-if="item.$message">{{ item.$message }}</span>
            </div>
          </div>

          <div class="col-lg-6" v-if="isAPI">
            <label
              for="apiList"
              class="form-label"
              :class="{
                'text-danger': submitted && v$.data.listAPI.$error,
              }"
              >Lista de APIS</label
            >
            <select
              id="apiList"
              name="apiList"
              class="form-select"
              :class="{
                'is-invalid': submitted && v$.data.listAPI.$error,
              }"
              aria-label="Default select example"
              v-model="data.listAPI"
            >
              <option value="">Seleccione uno</option>
              <option value="name">Nombre de la API</option>
            </select>
            <div
              v-for="(item, index) in v$.data.listAPI.$errors"
              :key="index"
              class="invalid-feedback"
            >
              <span v-if="item.$message">{{ item.$message }}</span>
            </div>
          </div>
        </div>
        <div
          class="row"
          v-if="
            isCustomized ||
            (isForm && data.table !== '') ||
            (isAPI && data.listAPI !== '')
          "
        >
          <div class="col-lg-6 mt-3">
            <label
              for="name-component"
              class="form-label"
              :class="{
                'text-danger': submitted && v$.data.name.$error,
              }"
              >Nombre del componente</label
            >
            <input
              type="text"
              class="form-control"
              id="name-component"
              :class="{
                'is-invalid': submitted && v$.data.name.$error,
              }"
              v-model="data.name"
            />
            <div
              v-for="(item, index) in v$.data.name.$errors"
              :key="index"
              class="invalid-feedback"
            >
              <span v-if="item.$message">{{ item.$message }}</span>
            </div>
          </div>
          <div class="col-lg-6 mt-3">
            <label
              for="description-component"
              class="form-label"
              :class="{
                'text-danger': submitted && v$.data.description.$error,
              }"
              >Descripción del componente</label
            >
            <input
              type="text"
              class="form-control"
              id="description-component"
              v-model="data.description"
              :class="{
                'is-invalid': submitted && v$.data.description.$error,
              }"
            />
            <div
              v-for="(item, index) in v$.data.description.$errors"
              :key="index"
              class="invalid-feedback"
            >
              <span v-if="item.$message">{{ item.$message }}</span>
            </div>
          </div>

          <div class="col-lg-6 mt-3" v-if="isForm || isCustomized">
            <div class="mb-3">
              <label
                for="interoperability"
                class="form-label"
                :class="{
                  'text-danger': submitted && v$.data.interoperability.$error,
                }"
                >Interoperabilidad</label
              >
              <select
                v-choice
                class="form-control"
                id="interoperability"
                name="interoperability"
                multiple
                v-model="data.interoperability"
              >
                <option value="SEGIP">SEGIP</option>
                <option value="SEPREG">SEPREG</option>
                <option value="NIT">NIT</option>
              </select>
              <div
                v-for="(item, index) in v$.data.interoperability.$errors"
                :key="index"
                class="error-validation"
              >
                {{ item.$message }}
              </div>
            </div>
          </div>

          <div class="col-md-6 mt-3">
            <div class="d-flex">
              <label class="form-check-label" for="grid">Grid</label>
              <input
                id="grid"
                name="grid"
                class="form-check-input success mx-1"
                type="checkbox"
                :checked="data.grid"
                @input="data[e.target.name] = $event.target.checked"
              />
            </div>
          </div>

          <div class="col-lg-6 mt-3"></div>
        </div>
        <div class="row" v-if="(isForm && data.table !== '') || isCustomized">
          <div class="col-lg-12">
            <div class="card card-soft-border">
              <div class="card-header d-flex">
                <h4 class="card-title mb-0 flex-grow-1">Campos formulario</h4>

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
                    :set="
                      (v =
                        v$.data.formFields.$each.$response.$errors[
                          data.formFields.findIndex(
                            (ff) => ff.uuid == fieldForm.uuid
                          )
                        ])
                    "
                    :data-order="fieldForm.order"
                    :data-uuid="fieldForm.uuid"
                  >
                    <div class="d-flex">
                      <i
                        class="mdi mdi-folder text-warning fs-16 align-middle me-2"
                      ></i>
                      <template v-if="!fieldForm.edit">
                        {{ fieldForm.label }}
                      </template>
                      <div
                        v-if="fieldForm.edit"
                        class="d-flex justify-content-between align-items-center w-50"
                      >
                        <input
                          type="text"
                          v-model="
                            data.formFields.find(
                              (ff) => ff.uuid == fieldForm.uuid
                            ).label
                          "
                          class="form-control"
                          :class="{
                            'is-invalid': v.label.length > 0,
                          }"
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
                        @click="newCustomField(fieldForm.uuid)"
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
                        class="pointer"
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
                        :class="{
                          blurred: !fieldForm.show || !fieldFormN1.show,
                        }"
                        v-for="(fieldFormN1, index2) in fieldForm.nestedL2"
                        :key="`level1.${fieldFormN1.uuid}`"
                        :data-uuid="fieldFormN1.uuid"
                        :data-uuidparent="fieldForm.uuid"
                      >
                        <div class="d-flex">
                          <i
                            class="ri-apps-2-line text-primary fs-16 align-middle me-2"
                          ></i>
                          <template v-if="!fieldFormN1.edit">
                            {{ fieldFormN1.label }}
                          </template>
                          <div
                            class="d-flex justify-content-between align-items-center w-50"
                          >
                            <input
                              type="text"
                              v-model="fieldFormN1.label"
                              v-if="fieldFormN1.edit"
                              class="form-control"
                              :class="{
                                'is-invalid':
                                  v.nestedL2.length > 0 &&
                                  v.nestedL2[0].$message[index2][0],
                              }"
                            />
                            <div class="invalid-feedback mx-2">
                              <span v-if="v.nestedL2.length > 0">{{
                                v.nestedL2[0].$message[index2][0]
                              }}</span>
                            </div>
                          </div>
                          <div
                            class="ms-auto me-2 pointer"
                            @click="
                              toggleElement(fieldForm.uuid, fieldFormN1.uuid)
                            "
                            v-show="fieldFormN1.show"
                          >
                            <i
                              class="mdi mdi-eye-off-outline fs-16 align-middle text-danger"
                            ></i>
                            Ocultar
                          </div>

                          <div
                            class="ms-auto me-2 pointer"
                            @click="
                              toggleElement(fieldForm.uuid, fieldFormN1.uuid)
                            "
                            v-show="!fieldFormN1.show"
                          >
                            <i
                              class="mdi mdi-eye-outline fs-16 align-middle text-success"
                            ></i>
                            Mostrar
                          </div>

                          <div
                            class="pointer"
                            @click="showModal(fieldForm.uuid, fieldFormN1.uuid)"
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
              </div>
              <!-- end card-body -->
            </div>
            <!-- end card -->
          </div>
          <!-- end col -->
        </div>
        <div class="row mt-3">
          <div class="col-md-12 d-flex justify-content-end">
            <button
              class="ml-auto btn-right-text gray btn--hover-icon mb-0 mr-3"
              @click.prevent="$emit('on:update:mode', 'list')"
            >
              <i class="mdi mdi-undo-variant mr-0"></i
              ><span class="text">Cancelar</span>
            </button>

            <button
              class="ml-auto btn-right-text primary btn--hover-icon mb-0 mr-1"
              type="submit"
            >
              <i class="mdi mdi-content-save-outline mr-0"></i
              ><span class="text">Guardar</span>
            </button>
          </div>
        </div>
        <Modal
          ref="modal"
          title="Edición campo de formulario"
          v-if="modal"
          :closable="!$refs.fieldFormModal?.invalid"
          @on:close:modal="closeModal"
        >
          <FieldFormModal
            ref="fieldFormModal"
            v-model="currentField"
            :types-field="typesField"
          ></FieldFormModal>
          <template v-slot:buttons>
            <button
              class="ml-auto btn-right-text gray btn--hover-icon mb-0 mr-3"
              @click.prevent="closeModal"
              :disabled="$refs.fieldFormModal?.invalid"
            >
              <i class="mdi mdi-undo-variant mr-0"></i
              ><span class="text">Cancelar</span>
            </button>
            <button
              class="ml-auto btn-right-text primary btn--hover-icon mb-0 mr-1"
              @click.prevent="closeModal"
              :disabled="$refs.fieldFormModal?.invalid"
            >
              <i class="mdi mdi-content-save-outline mr-0"></i
              ><span class="text">Guardar</span>
            </button>
          </template>
        </Modal>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import Modal from "@/components/widgets/modal";
import FieldFormModal from "@/components/tramites/forms/field-form-modal.vue";
import { v4 as uuidv4 } from "uuid";
import groupsMixin from "@/mixins/groupsMixin";

export default {
  mixins: [groupsMixin],
  components: {
    FieldFormModal,
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
      currentField: null,
      modal: false,
      typesField: [
        {
          value: "text",
          label: "Campo de texto",
        },
        {
          value: "number",
          label: "Campo numérico",
        },
        {
          value: "select",
          label: "Select",
        },
      ],

      data: {
        grid: this.initialData?.grid || false,
        typeInfo: this.initialData?.typeInfo,
        table: this.initialData?.table,
        interoperability: this.initialData?.interoperability || [],
        formFields: [],
      },
    };
  },
  watch: {
    "data.typeInfo"() {
      this.data.table = this.data.listAPI = "";

      if (this.isCustomized || this.isAPI) {
        this.data.formFields = [];
      }
      if (this.isAPI) {
        this.data.interoperability = [];
      }

      if (this.isForm) {
        this.data.formFields = [
          {
            id: 1,
            uuid: uuidv4(),
            order: 0,
            label: "Datos generales de la empresa",
            edit: false,
            show: true,
            nestedL2: [
              {
                id: 1,
                uuid: uuidv4(),
                order: 0,
                show: true,
                isNewField: false,
                type: "text",
                help: "Texto de ayuda",
                label: "Nombre o Razón Social * (text)",
                required: true,
                options: [],
                grid: true,
              },
              {
                id: 2,
                uuid: uuidv4(),
                order: 1,
                show: true,
                isNewField: false,
                type: "text",
                help: "Texto de ayuda",
                label: "NIT * (text )",
                required: true,
                options: [],
                grid: true,
              },
              {
                id: 3,
                uuid: uuidv4(),
                order: 2,
                show: true,
                isNewField: false,
                type: "text",
                help: "Texto de ayuda",
                label: "Licencia de funcionamiento (text)",
                required: true,
                options: [],
                grid: false,
              },
            ],
          },
          {
            id: 2,
            uuid: uuidv4(),
            order: 1,
            label: "Dirección y ubicación de la empresa",
            edit: false,
            show: true,
            nestedL2: [
              {
                id: 4,
                uuid: uuidv4(),
                order: 0,
                show: true,
                isNewField: false,
                type: "text",
                help: "Texto de ayuda",
                label: "Dirección *",
                required: true,
                options: [],
                grid: true,
              },
              {
                id: 5,
                uuid: uuidv4(),
                order: 1,
                show: true,
                isNewField: false,
                type: "text",
                help: "Texto de ayuda",
                label: "País *",
                required: true,
                options: [],
                grid: false,
              },
              {
                id: 6,
                uuid: uuidv4(),
                order: 2,
                show: true,
                isNewField: false,
                type: "text",
                help: "Texto de ayuda",
                label: "Departamento *",
                required: true,
                options: [],
                grid: true,
              },
            ],
          },
          {
            id: 3,
            uuid: uuidv4(),
            order: 2,
            label: "Contactos en la empresa",
            edit: false,
            show: true,
            nestedL2: [
              {
                id: 7,
                uuid: uuidv4(),
                order: 0,
                show: true,
                isNewField: false,
                type: "text",
                help: "Texto de ayuda",
                label: "Teléfono / Celular *",
                required: true,
                options: [],
                grid: false,
              },
              {
                id: 8,
                uuid: uuidv4(),
                order: 1,
                show: true,
                isNewField: false,
                type: "text",
                help: "Texto de ayuda",
                label: "Fax",
                required: true,
                options: [],
                grid: true,
              },
              {
                id: 9,
                uuid: uuidv4(),
                order: 2,
                show: true,
                isNewField: false,
                type: "text",
                help: "Texto de ayuda",
                label: "Email *",
                required: true,
                options: [],
                grid: false,
              },
              {
                id: 10,
                uuid: uuidv4(),
                order: 3,
                show: true,
                isNewField: false,
                type: "select",
                help: "Texto de ayuda",
                label: "Select *",
                required: true,
                options: ["uno", "dos", "tres"],
              },
            ],
          },
        ];
      }
    },
  },
  validations() {
    const validations = {
      data: {
        typeInfo: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        name: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        description: {
          required: helpers.withMessage("El campo es requerido", required),
        },
      },
    };

    if (this.isForm || this.isCustomized) {
      validations.data["interoperability"] = {
        required: helpers.withMessage("El campo es requerido", required),
      };
      validations.data["formFields"] = {
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
      };
    }

    if (this.isForm) {
      validations.data["table"] = {
        required: helpers.withMessage("El campo es requerido", required),
      };
    }

    if (this.isAPI) {
      validations.data["listAPI"] = {
        required: helpers.withMessage("El campo es requerido", required),
      };
    }
    return validations;
  },
  methods: {
    onSubmit() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      if (this.isAPI) console.log("endpoint api");
      if (this.isForm) console.log("endpoint form");
      if (this.isCustomized) console.log("endpoint customized");
      this.resetForm();
      this.$emit("on:update:mode", "list");
    },
    resetForm() {
      this.data = {
        typeInfo: this.initialData?.typeInfo || "",
        table: this.initialData?.table || "",
        interoperability: this.initialData?.interoperability || [],
        formFields: [],
      };
      this.v$.$reset();
    },
    cancel() {
      this.resetForm();
      this.$emit("on:update:mode", "list");
    },
    showModal(uuidParent, uuid) {
      this.currentGroupUuid = uuidParent;
      this.currentFormField = uuid;
      const currentGroup = this.data.formFields.find(
        (ff) => ff.uuid == uuidParent
      );
      this.currentField = currentGroup.nestedL2.find((n) => n.uuid == uuid);
      this.modal = true;
    },
    newCustomField(uuidGroup) {
      const newCustomField = {
        order: 0,
        uuid: uuidv4(),
        edit: false,
        show: true,
        isNewField: true,
        type: "text",
        help: "Texto de ayuda",
        label: "Nuevo campo",
        required: false,
        options: [],
        grid: false,
      };

      this.insertElementToGroup(0, uuidGroup, newCustomField);
      this.showModal(uuidGroup, newCustomField.uuid);
    },
    closeModal() {
      this.$refs.modal.closeModal(false);
      this.modal = false;
      const currentGroup = this.data.formFields.find(
        (ff) => ff.uuid == this.currentGroupUuid
      );
      Object.assign(
        currentGroup.nestedL2.find((n) => n.uuid == this.currentFormField),
        { ...this.currentField }
      );
    },
    newGroup() {
      const index = 0;
      this.insertGroupAtIndex(index, {
        uuid: uuidv4(),
        order: index,
        label: "Nuevo grupo",
        edit: true,
        nestedL2: [],
      });
    },
  },
  computed: {
    isAPI() {
      return this.data.typeInfo === "api";
    },
    isForm() {
      return this.data.typeInfo === "formulario";
    },
    isCustomized() {
      return this.data.typeInfo === "personalizado";
    },
  },
};
</script>
