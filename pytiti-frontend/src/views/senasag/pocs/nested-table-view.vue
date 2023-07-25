<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-lg col-xxl">
                <div class="card">
                    <div class="card-body">
                        <div class="live-preview">
                            <div class="row gy-4 mt-3 mb-3">
                                <div :class="field.col" v-for="(field, index) in form.fields" :key="index">
                                    <HelpinputField @update-change="makeChange" :field="field" />
                                </div>
                            </div>
                            <div class="row mt-3 mb-4">
                                <button 
                                class="btn btn-primary"
                                @click="addToTableRow">Save</button>
                            </div>
                            <div class="row mt-3 mb-3">
                                <div class="table-responsive mt-4 mt-xl-0">
                                    <table class="table table-success table-striped table-nowrap align-middle mb-0">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th v-for="(head, headIndex) in table_headers" :key="headIndex" scope="col">{{ head.label }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(row, rowIndex) in table_rows" :key="rowIndex">
                                                <td>{{ rowIndex + 1}}</td>
                                                <td v-for="(keyTable, keyIndex) in table_headers" :key="keyIndex">
                                                    {{ row[keyTable.name] }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import Layout from "@/layouts/main.vue"
import PageHeader from "@/components/page-header";
// fields
import HelpinputField from "@/components/senasag-forms/fields/helpinput-field.vue";

export default {
    name: "Nested Table",
    components: {
        Layout,
        PageHeader,
        // fields
        HelpinputField,
    },
    methods: {
        makeChange(data) {
            Object.assign(this.form_data, data);
        },
        addToTableRow() {
            let formData = {...this.form_data};
            this.table_rows.push(formData);
        },
        loadFormFields () {
            let formFields = [
                {
                    type_field: "helpinput",
                    type: "text",
                    name: "first_name",
                    entity_field: { name: "firstname", value: null },
                    label: "First Name",
                    class_field: "form-control",
                    max_length: 20,
                    col: "col-xxl-6 col-lg-6"
                },
                {
                    type_field: "helpinput",
                    type: "text",
                    name: "last_name",
                    entity_field: { name: "lastname", value: null },
                    label: "Last Name",
                    class_field: "form-control",
                    max_length: 20,
                    col: "col-xxl-6 col-lg-6"
                },
                {
                    type_field: "helpinput",
                    type: "text",
                    name: "country",
                    entity_field: { name: "country", value: null },
                    label: "Country",
                    class_field: "form-control",
                    max_length: 20,
                    col: "col-xxl-6 col-lg-6"
                },
                {
                    type_field: "helpinput",
                    type: "text",
                    name: "city",
                    entity_field: { name: "city", value: null },
                    label: "City",
                    class_field: "form-control",
                    max_length: 20,
                    col: "col-xxl-6 col-lg-6"
                },
            ];
            this.form.fields = formFields;
            this.table_headers = formFields.map(item => {
                return {name: item.entity_field.name, label: item.label};
            });
        }
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
                    text: "Pocs",
                    href: "/senasag/pocs"
                },
                {
                    text: "Nested Table",
                    active: true,
                },
            ],
            //
            form: {},
            // multi map field only
            form_data: {},
            // dynamic table builder
            table_headers: [],
            table_rows: [],
        }
    },
    mounted() {
        this.loadFormFields();
    }
}
</script>