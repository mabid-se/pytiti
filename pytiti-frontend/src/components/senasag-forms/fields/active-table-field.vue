<template>
    <div class="card-body" v-if="table.type === 'activeTable'">
        <p class="text-muted">Use <code>table-active</code> class to highlight a table row or cell.</p>

        <div class="live-preview">
            <div class="table-responsive">
                <table class="table align-middle table-nowrap mb-0">
                    <thead>
                        <tr>
                            <th scope="col" style="width: 42px;">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="activetableCheck">
                                    <label class="form-check-label" for="activetableCheck"></label>
                                </div>
                            </th>
                            <th 
                            v-for="(header, index) in table.table.headers" 
                            :key="index" 
                            scope="col">{{ header.name }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr 
                        v-for="(field, index) in table.table.body"
                        :key="index">
                            <th scope="row">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="activetableCheck01" checked="">
                                    <label class="form-check-label" for="activetableCheck01"></label>
                                </div>
                            </th>
                            <td 
                            v-for="(value, i) in field"
                            :key="i">
                                <div v-if="value !== 'file'">{{ value }}</div>
                                <div v-else>
                                    <a :href="value+'#'">
                                        <i class="ri-download-2-line fs-17 lh-1 align-middle"></i>
                                    </a>
                                </div>
                            </td>
                            <!-- <td></td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ActiveTable",
        props: {
            table: {
                type: Object,
            },
        },
    }
</script>