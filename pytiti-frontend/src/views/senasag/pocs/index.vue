<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-lg col-xxl">
                <div class="card">
                    <div class="card-body">
                        <div class="live-preview">
                            <!-- SelectSearchField -->
                            <div class="row">
                                <div class="col-lg-3">
                                    <SelectSearchField :field="field" @update-change="makeChange" />
                                </div>
                            </div>
                            <!-- /SelectSearchField -->
                            <!-- vue-good-table -->
                            <div class="row">
                                <div class="col-lg">
                                    <vue-good-table 
                                    @selected-rows-change="selectedChanged" 
                                    :columns="columns"
                                    :rows="rows"
                                    :select-options="{enabled: true}">
                                        <template #selected-row-actions>
                                            <div class="d-flex gap-2">
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
                                </div>
                            </div>
                            <!-- /vue-good-table -->
                            <!-- vue-draggable -->
                            <div class="row">
                                <div class="col-lg">
                                    <DragDrop />
                                </div>
                            </div>
                            <!-- /vue-draggable -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Edit-Modal -->
        <div class="modal fade" id="showModal" tabindex="-1" aria-labelledby="exampleModalLabel" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-light p-3">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Customer</h5>
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
                                <input type="text" id="date-field" class="form-control flatpickr-input" placeholder="Select Date" required="" readonly="readonly">
                            </div>

                            <div>
                                <label for="status-field" class="form-label">Status</label>
                                <div class="choices" data-type="select-one" tabindex="0" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false"><div class="choices__inner"><select class="form-control choices__input" data-trigger="" name="status-field" id="status-field" hidden="" tabindex="-1" data-choice="active"><option value="Active" data-custom-properties="[object Object]">Active</option></select><div class="choices__list choices__list--single"><div class="choices__item choices__item--selectable" data-item="" data-id="2" data-value="Active" data-custom-properties="[object Object]" aria-selected="true">Active</div></div></div><div class="choices__list choices__list--dropdown" aria-expanded="false"><input type="text" class="choices__input choices__input--cloned" autocomplete="off" autocapitalize="off" spellcheck="false" role="textbox" aria-autocomplete="list" aria-label="Status" placeholder=""><div class="choices__list" role="listbox"><div id="choices--status-field-item-choice-3" class="choices__item choices__item--choice choices__placeholder choices__item--selectable is-highlighted" role="option" data-choice="" data-id="3" data-value="" data-select-text="Press to select" data-choice-selectable="" aria-selected="true">Status</div><div id="choices--status-field-item-choice-1" class="choices__item choices__item--choice is-selected choices__item--selectable" role="option" data-choice="" data-id="1" data-value="Active" data-select-text="Press to select" data-choice-selectable="">Active</div><div id="choices--status-field-item-choice-2" class="choices__item choices__item--choice choices__item--selectable" role="option" data-choice="" data-id="2" data-value="Block" data-select-text="Press to select" data-choice-selectable="">Block</div></div></div></div>
                            </div>
                        </div>
                        <div class="modal-footer" style="display: block;">
                            <div class="hstack gap-2 justify-content-end">
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-success" id="add-btn" style="display: none;">Add Customer</button>
                                <button type="button" class="btn btn-success" id="edit-btn" style="display: block;">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- /Edit-Modal -->
        <!-- Delete-Modal -->
        <div class="modal fade zoomIn" id="deleteRecordModal" tabindex="-1" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="btn-close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mt-2 text-center">
                            <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon>
                            <div class="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                <h4>Are you Sure ?</h4>
                                <p class="text-muted mx-4 mb-0">Are you Sure You want to Remove this Record ?</p>
                            </div>
                        </div>
                        <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
                            <button type="button" class="btn w-sm btn-light" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn w-sm btn-danger " id="delete-record">Yes, Delete It!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /Delete-Modals -->
    </Layout>
</template>

<script>
import Layout from "@/layouts/main.vue"
import PageHeader from "@/components/page-header";
// components
import SelectSearchField from "@/components/senasag-forms/fields/select-search-field.vue";
// ui-components
import DragDrop from "@/components/senasag-forms/ui-components/DragDrop.vue";

export default {
    name: "Pocs",
    order: 5,
    components: {
        Layout,
        PageHeader,
        // components
        SelectSearchField,
        //
        DragDrop,
    },
    data(){
        return {
            title: "Senasag",
            items: [
                {
                    text: "Senasag",
                    href: "/",
                },
                {
                    text: "Proof of Concept",
                    active: true,
                },
            ],
            // select-search-field
            field: {
                type_field: "selectSearchField",
                options: '[{"id": 1,"nombre": "Jorge Luis"},{"id": 2,"nombre": "Marisela"},{"id": 3,"nombre": "Lucas Jorge"},{"id": 4,"nombre": "Jorge Dalmiro"},{"id": 5,"nombre": "Nancy Gladys"},{"id": 6,"nombre": "Angela Inés"},{"id": 7,"nombre": "Érika Gladys"},{"id": 8,"nombre": "Daniel Alonzo"},{"id": 9,"nombre": "Noelia Stephanie"},{"id": 10,"nombre": "Gregorio"},{"id": 11,"nombre": "Germania"},{"id": 12,"nombre": "Laura"},{"id": 13,"nombre": "Carla"},{"id": 14,"nombre": "Axel José"}]',
                api: "/api/v1/select-options/municipios",
                entity_field: {
                    name: "municipiocampo"
                },
                placeholder: "Buscar municipio"
            },
            // vue-good-table-next
            selectedRowIds: [],
            selectedRows: [],
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                },
                {
                    label: 'Age',
                    field: 'age',
                    type: 'number',
                },
                {
                    label: 'Created On',
                    field: 'createdAt',
                    type: 'date',
                    dateInputFormat: 'yyyy-MM-dd',
                    dateOutputFormat: 'MMM do yy',
                },
                {
                    label: 'Percent',
                    field: 'score',
                    type: 'percentage',
                },
            ],
            rows: [
                { id:1, name:"John", age: 20, createdAt: '2022-05-24',score: 0.03343 },
                { id:2, name:"Jane", age: 24, createdAt: '2011-10-31', score: 0.03343 },
                { id:3, name:"Susan", age: 16, createdAt: '2011-10-30', score: 0.03343 },
                { id:4, name:"Chris", age: 55, createdAt: '2011-10-11', score: 0.03343 },
                { id:5, name:"Dan", age: 40, createdAt: '2011-10-21', score: 0.03343 },
                { id:6, name:"Jack", age: 20, createdAt: '2011-10-31', score: 0.03343 },
            ],
        }
    },
    methods: {
        selectedChanged(data) {
            this.selectedRows = data.selectedRows;
        },
        deleteSelectedRows() {
            console.log(this.selectedRows);
        },
        //
        makeChange(data) {
            console.log(data);
        },
    },
    mounted() {
        //
    }
}
</script>