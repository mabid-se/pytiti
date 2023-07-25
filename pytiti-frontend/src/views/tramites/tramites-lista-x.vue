<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";

// services
import { 
    //asignProcedure, 
    getProceduresList, 
    asignationProcedure 
} from "@/services/tramites";
//import { userProfile } from '@/helpers/senasag/user';

export default {
  name: "Tramites",
  data() {
    return {
      title: "REGISTRA NACIONAL SANITARIO DE INOCUIDAD ALIMENTARIA",
      items: [
        {
          text: "Trámites",
          href: "/",
        },
        {
          text: "Trámites Listado",
          active: true,
        },
      ],
      //
      procedures: [],
      byPages: 8
    };
  },
  computed: {
      procedurePages() {
          return Math.ceil(this.procedures.length/this.byPages);
      }
  },
  components: {
    Layout,
    PageHeader,
  },
  methods: {
      getProcedures() {
          getProceduresList()
            .then(
                res => {
                    this.procedures = res;
                },
                err => {
                    console.error(err);
                }
            )
      },
      pickProcedure(procedureId) {
        asignationProcedure({ idempadronamiento: 11}, procedureId)
            .then(
                res => {
                    console.log(res);
                },
                err => {
                    console.error(err);
                }
            )
      }
  },
  mounted() {
      this.getProcedures()
  }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <!-- Modal -->
    <div class="modal fade" id="showModal" tabindex="-1" aria-labelledby="exampleModalLabel" style="display: none;" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-light p-3">
                    <h5 class="modal-title" id="exampleModalLabel">List Customer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close-modal"></button>
                </div>
                <form>
                    <div class="modal-body">

                        <div class="mb-3" id="modal-id" style="display: none;">
                            <label for="id-field" class="form-label">ID</label>
                            <input type="text" id="id-field" class="form-control" placeholder="ID" readonly="">
                        </div>

                        <div class="mb-3">
                            <label for="customername-field" class="form-label">Customer Name</label>
                            <input type="text" id="customername-field" class="form-control" placeholder="Enter Name" required="">
                        </div>

                        <div class="mb-3">
                            <label for="email-field" class="form-label">Email</label>
                            <input type="email" id="email-field" class="form-control" placeholder="Enter Email" required="">
                        </div>

                        <div class="mb-3">
                            <label for="phone-field" class="form-label">Phone</label>
                            <input type="text" id="phone-field" class="form-control" placeholder="Enter Phone no." required="">
                        </div>

                        <div class="mb-3">
                            <label for="date-field" class="form-label">Joining Date</label>
                            <input type="text" id="date-field" class="form-control" placeholder="Select Date" required="">
                        </div>

                        <div>
                            <label for="status-field" class="form-label">Status</label>
                            <div class="choices" data-type="select-one" tabindex="0" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false"><div class="choices__inner"><select class="form-control choices__input" data-trigger="" name="status-field" id="status-field" hidden="" tabindex="-1" data-choice="active"><option value="" data-custom-properties="[object Object]">Status</option></select><div class="choices__list choices__list--single"><div class="choices__item choices__placeholder choices__item--selectable" data-item="" data-id="1" data-value="" data-custom-properties="[object Object]" aria-selected="true">Status</div></div></div><div class="choices__list choices__list--dropdown" aria-expanded="false"><input type="text" class="choices__input choices__input--cloned" autocomplete="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" aria-label="Status" placeholder=""><div class="choices__list" role="listbox"><div id="choices--status-field-item-choice-3" class="choices__item choices__item--choice is-selected choices__placeholder choices__item--selectable is-highlighted" role="option" data-choice="" data-id="3" data-value="" data-select-text="Press to select" data-choice-selectable="" aria-selected="true">Status</div><div id="choices--status-field-item-choice-1" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="1" data-value="Active" data-select-text="Press to select" data-choice-selectable="">Active</div><div id="choices--status-field-item-choice-2" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="2" data-value="Block" data-select-text="Press to select" data-choice-selectable="">Block</div></div></div></div>
                        </div>
                    </div>
                    <div class="modal-footer" style="display: none;">
                        <div class="hstack gap-2 justify-content-end">
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-success" id="add-btn">Add Customer</button>
                            <button type="button" class="btn btn-success" id="edit-btn">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- /Modal -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title mb-0">Listado de trámites</h4>
                </div><!-- end card header -->

                <div class="card-body">
                    <div id="customerList">
                        <div class="row g-4 mb-3">
                            <div class="col-sm-auto">
                                <div>
                                    <div class="search-box ms-2">
                                        <input type="text" class="form-control search" placeholder="Buscar...">
                                        <i class="ri-search-line search-icon"></i>
                                    </div>                                                   
                                    
                                </div>
                            </div>
                            <div class="col-sm">
                                <div class="d-flex justify-content-sm-end">
                                    
                                    <button type="button" class="btn btn-success btn-label" data-bs-toggle="modal" id="create-btn" data-bs-target="#showModal"><i class="mdi mdi-plus label-icon align-middle fs-16 me-2"></i>Nuevo</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="table-responsive table-card mt-3 mb-1">
                            <table class="table align-middle table-striped table-hover table-nowrap-0" id="customerTable">
                                <thead class="table-light">
                                    <tr>
                                        <th scope="col" style="width: 50px;">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" id="checkAll" value="option">
                                            </div>
                                        </th>
                                        <th class="sort" data-sort="customer_name">Nombre del trámite</th>
                                        <th class="sort" data-sort="email">Descripción</th>
                                        <th class="sort" data-sort="phone">Área</th>
                                        <th class="sort" data-sort="date">Usuario</th>
                                        <th class="sort" data-sort="status">Vigencia (Años)</th>
                                        <th class="sort" data-sort="action">Acciones</th>
                                        </tr>
                                </thead>
                                <tbody class="list form-check-all">
                                    <tr v-for="(procedure, index) in procedures" :key="index">
                                        <th scope="row">
                                            <div class="form-check">
                                                <input 
                                                class="form-check-input" 
                                                type="checkbox" 
                                                name="chk_child" 
                                                value="option1"
                                                @change="pickProcedure(procedure.id)">
                                            </div>
                                        </th>
                                        <td class="id" style="display:none;"><a href="javascript:void(0);" class="fw-medium link-primary">#VZ10</a></td>
                                        <td class="" style="width:32%">
                                            <router-link :to="'/tramites/' + procedure.id">
                                                {{ procedure.descripcion }}
                                            </router-link>
                                        </td>
                                        <td class="">**(Evaluación documental, registro en sistema y emisión del certificado de registro)</td>
                                        <td class="">**IA</td>
                                        <td class="">**Usuario externo</td>
                                        <td class="">**5</td>
                                        <td class="" style="width:12%" nowrap="">
                                            <li><a href="#showModal" class="link-success" data-bs-toggle="modal" data-bs-target="#showModal"><i class="mdi mdi-cog-outline  fs-16 align-middle me-1 link-success"></i> Iniciar Trámite </a></li>
                                            <li><a href="#deleteRecordModal" class="link-danger" data-bs-toggle="modal" data-bs-target="#deleteRecordModal"><i class="mdi mdi-trash-can-outline fs-16 align-middle me-1 link-danger"></i> Ver Proceso </a></li>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="noresult" style="display: none">
                                <div class="text-center">
                                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px">
                                    </lord-icon>
                                    <h5 class="mt-2">No hay resultados</h5>
                                    <p class="text-muted mb-0">No encontramos una coincidencia.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="d-flex justify-content-end">
                            <div class="pagination-wrap hstack gap-2" style="display: flex;">
                                <a class="page-item pagination-prev disabled" href="#">
                                    Anterior
                                </a>
                                <ul class="pagination listjs-pagination mb-0">
                                    <li class="active" v-for="(page, index) in procedurePages" :key="index">
                                        <a class="page" href="#" :data-i="index+1" :data-page="byPages">{{ index+1 }}</a>
                                    </li>
                                </ul>
                                <a class="page-item pagination-next" href="#">
                                    Siguiente
                                </a>
                            </div>
                        </div>
                    </div>
                </div><!-- end card -->
            </div>
            <!-- end col -->
        </div>
        <!-- end col -->
    </div>
  </Layout>
</template>