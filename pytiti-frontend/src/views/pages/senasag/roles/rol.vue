<template>
  <Layout>
      <PageHeader :title="title" :items="items" />
      <div class="row">
          <div class="col-lg col-xxl margin-cont">
              <div class="card">
                  <div class="card-body">
                      <div class="live-preview">
                          <div class="table-responsive table-card">
                                  <div class="enviar">
                                      <a href="/registro/rol" class="btn btn-success btn-label waves-effect waves-light" role="button">
                                          <i class="ri-add-line label-icon align-middle fs-16 me-2"></i> Nuevo rol </a>
                                  </div>
                                  <h4 class="card-title mb-0 flex-grow-1"> Lista de Roles</h4>
                                  <table class="table align-middle table-striped table-nowrap-" id="customerTable">
                                      <thead class="table-light text-muted">
                                          <tr>
                                            <th class="sort" data-sort="currency_name" scope="col">Nombre</th>
                                            <th class="sort" data-sort="current_value" scope="col"> Opciones </th>
                                          </tr>
                                      </thead>
                                      <!--end thead-->
                                      <tbody class="list form-check-all">
                                        <tr v-for="(data, index) of columns" v-bind:key="index">
                                          <td>
                                              {{ data.name }}
                                          </td>
                                          <td style="width: 25%">
                                              <a class="btn btn-info btn-label right" id="dropdownMenuLink1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <div class="flex-shrink-0">
                                                      <i class="bx bxs-chevron-down label-icon align-middle fs-16 ms-2"></i>
                                                    </div>
                                                    <div class="flex-grow-1">Opciones</div>
                                              </a>
                                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink1" data-popper-placement="bottom-start">
                                                  <li>
                                                      <a :href="'/actualizar/rol/' + data.id + '/'" class="dropdown-item" data-bs-toogle="tooltip" data-bs-original-title="" title=""> Editar</a>
                                                  </li>
                                                  <li>
                                                      <a class="dropdown-item" data-bs-toogle="tooltip" @click="deleteModal(data)">Eliminar</a>
                                                  </li>
                                              </ul>
                                          </td>
                                          </tr>
                                      </tbody>
                                  </table>
                          </div>
                      </div>
                      <DeleteConfirmationModal 
                        @send-confirmation="confirmDelete"
                        :attrs="modalData" />
                      <a 
                        id="show-delete"
                        :href="`#${modalData.id}`" 
                        :data-bs-target="`#${modalData.id}`"
                        data-bs-toggle="modal" style="display:none"></a>
                  </div>
              </div>
          </div>
      </div>
  </Layout>
</template>



<script>
// components
import Layout from "@/layouts/main.vue"
import PageHeader from "@/components/page-header";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
// services
import { getRolesSiaService, deleteRoleSiaService} from "@/services/permisos";

export default {
    name: "Roles",
    components: {
        Layout,
        PageHeader,
        DeleteConfirmationModal,
    },
    data(){
        return {
            title: "Roles",
            items: [
                {
                    text: "Lista de Roles",
                },
            ],
            id_to_delete: 0,
            columns: [],
            modalData: {
                id: "deleteRolModal", 
                title: "¿Estás seguro ?", 
                buttonText: "Eliminar",
                redirectUrl: "/roles/"
            },
        }
    },
    mounted() { 
        getRolesSiaService().then(
          (res) => {
              const items = JSON.parse(JSON.stringify(res.results));
              this.columns = items;
          },
          err => {
              console.error(err);
          }
        ); 
    },
    methods: {
        deleteModal: function(data) {
            this.modalData["message"] = "Está seguro de eliminar el rol " + data.name;
            this.id_to_delete = data.id;
            document.querySelector("#show-delete").click();
        },
        confirmDelete({sent}) {
            if (sent === true && this.id_to_delete !== 0) {
                deleteRoleSiaService(this.id_to_delete).then(
                    (res) => {
                        const filtersList = this.columns.filter(
                            (element) => element.id != this.id_to_delete
                        );
                        this.columns = filtersList;
                        this.id_to_delete = 0;
                    },
                    err => {
                        console.error(err);
                    }
                );
            }
        }
    },
}
</script>