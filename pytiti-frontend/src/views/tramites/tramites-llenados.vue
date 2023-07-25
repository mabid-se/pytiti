<script>
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";

// services
import { asignProcedure, getFilledProceduresList } from "@/services/tramites";
import { userProfile } from '@/helpers/senasag/user';

export default {
    name: "Tramites",
    data() {
        return {
            title: "TRÁMITES LLENADOS",
            items: [
                {
                text: "Trámites",
                href: "/",
                },
                {
                text: "Trámites Llenados",
                active: true,
                },
            ],
            //
            procedures: [],
            byPages: 8,
            //
            selectedUUID: undefined,
            selectedRowIds: [],
            selectedRows: [],
            columns: [
                {
                    label: "UUID",
                    field: "idtramite_llenado"
                },
                {
                    label: 'Nombre Trámite',
                    field: 'object_tramite.titulo',
                },
                {
                    label: 'Costo',
                    field: 'costobs',
                },
                {
                    label: 'Estado',
                    field: 'estado',
                },
                {
                    label: 'Inicio',
                    field: 'iniciotramite',
                    type: 'dateTime',
                    dateInputFormat: 'yyyy-MM-ddThh:mm:ss',
                    dateOutputFormat: 'do MMM yy',
                },
            ],
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
        pickedRow(data) {
            this.selectedUUID = data.selectedRows[0].idtramite_llenado;
        },
        selectProcedure(data) {
            console.log(data.row);
        },
        //
        getProcedures() {
            getFilledProceduresList()
                .then(
                    res => {
                        this.procedures = res;
                    },
                    err => {
                        console.error(err);
                    }
                );
        },
        pickProcedure(id) {
            let data = {
                fid_tramite: id,
                _usuario_creacion: userProfile().uuid,
                iniciotramite: new Date().toLocaleDateString().split("/").join("-"),
                costobs: 150,
                idempadronamiento: 1
            }
            asignProcedure(data)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.error(err);
                });
        },
    },
    mounted() {
        this.getProcedures();
    }
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
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
                            <vue-good-table
                            @selected-rows-change="pickedRow" 
                            @row-click="selectProcedure" 
                            :pagination-options="{
                                enabled: true
                            }"
                            :columns="columns"
                            :rows="procedures"
                            :select-options="{enabled:true}">
                                <template #table-row="props">
                                    <span v-if="props.column.field == 'idtramite_llenado'">
                                        <a :href="`/tramites/${props.row.idtramite_llenado}`">
                                            {{ props.row.idtramite_llenado }}
                                        </a>
                                    </span>
                                </template>
                                <template #selected-row-actions>
                                    <div class="d-flex gap-2">
                                        <div>
                                            <router-link class="btn btn-sm btn-primary" :to="`/tramites/${selectedUUID}`">Ir Trámite</router-link>
                                        </div>
                                        <div class="edit">
                                            <button class="btn btn-sm btn-success edit-item-btn" data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                        </div>
                                        <div class="remove">
                                            <button 
                                            @click="deleteSelectedRows"
                                            class="btn btn-sm btn-danger remove-item-btn" 
                                            data-bs-toggle="modal" 
                                            data-bs-target="#deleteRecordModal">Remove</button>
                                        </div>
                                    </div>
                                </template>
                            </vue-good-table>
                            <div class="noresult" style="display: none">
                                <div class="text-center">
                                    <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px">
                                    </lord-icon>
                                    <h5 class="mt-2">No hay resultados</h5>
                                    <p class="text-muted mb-0">No encontramos una coincidencia.</p>
                                </div>
                            </div>
                        </div>
                        <!--<div class="d-flex justify-content-end">
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
                        </div>-->
                    </div>
                </div><!-- end card -->
            </div>
            <!-- end col -->
        </div>
        <!-- end col -->
    </div>
  </Layout>
</template>