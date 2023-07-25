<template>
    <div class="card-body" id="hello" v-if="table.type === 'basicTable'">
        <div class="table-responsive table-card">
            <table class="table align-middle table-nowrap" id="customerTable">
                <thead class="table-light text-muted">
                    <tr>
                        <th 
                        v-for="(header, index) in table.table.headers" 
                        :key="index" 
                        scope="col">{{ header.name }}</th>
                    </tr>
                </thead><!--end thead-->
                <tbody class="list form-check-all">
                    <tr 
                    v-for="(field, index) in table.table.body" 
                    :key="index">
                        <td
                        v-for="(value, i) in field" :key="i">{{ value }}</td>
                        <!-- <td><span><a href="#" class="text-reset text-decoration-underline">Details</a></span></td> -->
                    </tr>
                </tbody><!--end tbody-->
                </table>
            </div>
            <div class="d-flex justify-content-end mt-3">
                <div class="pagination-wrap hstack gap-2"><!--v-if-->
                <ul class="pagination listjs-pagination mb-0">
                    <li class="active"><a class="page" href="#">1</a></li>
                    <li class=""><a class="page" href="#">2</a></li>
                </ul>
                <a class="page-item pagination-next" href="#"> Next </a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:"BasicTableField",
        props: {
            table: {
                type: Object,
            },
        },
    }
</script>