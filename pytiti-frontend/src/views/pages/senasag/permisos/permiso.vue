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
                                      <a href="/registro/permiso" class="btn btn-success btn-label waves-effect waves-light" role="button">
                                          <i class="ri-add-line label-icon align-middle fs-16 me-2"></i> Nuevo Permiso </a>
                                  </div>
                                  <h4 class="card-title mb-0 flex-grow-1">Lista de Permisos</h4>
                                    
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
                                                       <a :href="'/actualizar/permiso/' + data.id + '/'"  class="dropdown-item" data-bs-toogle="tooltip" data-bs-original-title="" title=""> Editar</a>
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
import { deletePermissionSiaService, getPermissionsSiaService } from "@/services/permisos";

export default {
    name: "ListaPermisos",
    order: 5,
    components: {
        Layout,
        PageHeader,
        DeleteConfirmationModal,
    },
    data(){
        return {
            title: "Permisos",
            items: [
                {
                    text: "Lista de Permisos",
                    active: true,
                },
            ],
            columns: [],
            id_to_delete: 0,
            modalData: {
                id: "deleteRolModal", 
                title: "¿Estás seguro ?", 
                buttonText: "Eliminar",
                redirectUrl: "/permisos/"
            },
        }
    },
    methods: {
        deleteModal: function(data) {
            this.modalData["message"] = "Está seguro de eliminar el Permiso " + data.name;
            this.id_to_delete = data.id;
            document.querySelector("#show-delete").click();
        },
        confirmDelete({sent}) {
            if (sent === true && this.id_to_delete !== 0) {
                deletePermissionSiaService(this.id_to_delete).then(
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
    mounted() { 
      getPermissionsSiaService().then(
          (res) => {
              const items = JSON.parse(JSON.stringify(res.results))
              this.columns = items;
          },
          err => {
              console.error(err);
          }
      );
    }
}
</script>

<style scoped>
.card-border-grey {
    border: 2px solid #e1e1e1;
}

.card-border-bottom-grey {
    border-bottom: 2px solid #e1e1e1;
}
</style>