<template>
    <div class="card">
        <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Tablas</h4>
        </div><!-- end card header -->
        <div class="card-body">
            <div class="live-preview"
            v-for="(table, index) in tables" :key="index">
                <CardName :name="table.card_name" />
                <NestedTableField :table="table" />
                <ActiveTable :table="table" />
                <BasicTable :table="table" />
            </div>
        </div>
    </div>
</template>

<script>
    import CardName from './card-name.vue';
    import NestedTableField from './fields/nested-table-field.vue';
    import ActiveTable from './fields/active-table-field.vue';
    import BasicTable from './fields/basic-table-field.vue';

    export default {
        name: "TableForm",
        data() {
            return {
                tables: [
                    {
                        card_name: "Table Nesting",
                        type: "nestingTable",
                        table: {
                            headers: [
                                { name: "ID" },
                                { name: "Name" },
                                { name: "Job Title" },
                                { name: "Date" },
                                { name: "Payment" }
                            ],
                            body: [
                                {
                                    id: "01",
                                    name: "Annette Black",
                                    job_title: "Industrial Designer",
                                    date: "10, Nov 2021",
                                    payment: "$450"
                                },
                                {
                                    id: "02", 
                                    name: "Bessie Cooper", 
                                    job_title: "Graphic Designer", 
                                    date: "13, Nov 2021", 
                                    payment: "$875", 
                                },
                                {
                                    id:"03",
                                    name:"Leslie Alexander",
                                    job_title:"Product Manager",
                                    date:"16, Nov 2021",
                                    payment:"$410",
                                },
                                {
                                    id:"04",
                                    name:"Bettie Johson",
                                    job_title:"Applications Engineer",
                                    date:"24, Nov 2021",
                                    payment:"$620",
                                },
                            ]
                        }
                    },
                    {
                        card_name: "Active Tables",
                        type: "activeTable",
                        table: {
                            headers: [
                                {name: "Order ID"},
                                {name: "Shop"},
                                {name: "Customer"},
                                {name: "Price"},
                                {name: "Action"},
                            ],
                            body: [
                                {
                                    order_id: "#541254265",
                                    shop: "Amezon",
                                    customer: "Cleo Carson",
                                    price: "$4,521",
                                    action: "file"
                                },
                                {
                                    order_id: "#541254265",
                                    shop: "Amezon",
                                    customer: "Cleo Carson",
                                    price: "$4,521",
                                    action: "file"
                                },
{
                                    order_id: "#541254265",
                                    shop: "Amezon",
                                    customer: "Cleo Carson",
                                    price: "$4,521",
                                    action: "file"
                                },
                                {
                                    order_id: "#541254265",
                                    shop: "Amezon",
                                    customer: "Cleo Carson",
                                    price: "$4,521",
                                    action: "file"
                                }
                            ]
                        }
                    },
                    {
                        card_name: "Basic Table",
                        type: "basicTable",
                        table: {
                            headers: [
                                { name: "ID" },
                                { name: "Name" },
                                { name: "Email" },
                                { name: "Position" },
                                { name: "Company" },
                                { name: "Country" },
                                { name: "Action" },
                            ],
                            body: [
                                {
                                    id: "Jonathan",
                                    email: "jonathan@example.com",
                                    position: "Senior Implementation Architect",
                                    company: "Hauck Inc",
                                    country: "Holy See",
                                    action: "link"
                                },
                                {
                                    id: "Jonathan",
                                    email: "jonathan@example.com",
                                    position: "Senior Implementation Architect",
                                    company: "Hauck Inc",
                                    country: "Holy See",
                                    action: "link"
                                },
                                {
                                    id: "Jonathan",
                                    email: "jonathan@example.com",
                                    position: "Senior Implementation Architect",
                                    company: "Hauck Inc",
                                    country: "Holy See",
                                    action: "link"
                                },
                                {
                                    id: "Jonathan",
                                    email: "jonathan@example.com",
                                    position: "Senior Implementation Architect",
                                    company: "Hauck Inc",
                                    country: "Holy See",
                                    action: "link"
                                },
                                {
                                    id: "Jonathan",
                                    email: "jonathan@example.com",
                                    position: "Senior Implementation Architect",
                                    company: "Hauck Inc",
                                    country: "Holy See",
                                    action: "link"
                                },
                                {
                                    id: "Jonathan",
                                    email: "jonathan@example.com",
                                    position: "Senior Implementation Architect",
                                    company: "Hauck Inc",
                                    country: "Holy See",
                                    action: "link"
                                },
                                {
                                    id: "Jonathan",
                                    email: "jonathan@example.com",
                                    position: "Senior Implementation Architect",
                                    company: "Hauck Inc",
                                    country: "Holy See",
                                    action: "link"
                                }
                            ]
                        }
                    }
                ]
            }
        },
        components: {
            CardName,
            NestedTableField,
            ActiveTable,
            BasicTable,
        },
    }
</script>