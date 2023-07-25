<template>
    <div v-if="field.type_field === 'selectSearchField'">
        <label :for="field.name">{{ field.label }}</label>
        <div style="position:relative">
            <input 
            :placeholder="field.placeholder" 
            @input="handleQueryUrl" 
            type="text" 
            :name="field.name" 
            :id="field.name" 
            :value="query.search" 
            style="padding-left:40px" 
            class="form-control" />
            <span class="mdi mdi-magnify search-widget-icon fs-18" data-v-594434d5=""></span>
        </div>
        <div class="form-text">{{ field.title }}</div>
        <div class="mb-3" style="position:relative;">
            <ul class="list-group search-results" v-if="resultsFound">
                <li 
                v-for="(item, index) in computedResults" :key="index"
                @click="selectItem(item)"
                class="list-group-item">{{ item.nombre }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { 
    // getLocalSelectList, 
    getSelectList } 
from "@/services/tablas-base";

export default {
    name: "AsyncSearchListField",
    props: {
        field: {
            type: Object
        }
    },
    data() {
        return {
            query: {
                search: undefined,
                pageSize: 15,
            },
            queryParams: undefined,
            //
            allResults: [],
            results: [],
            resultsFound: false,
            //
            selectedItem: {},
        }
    },
    computed: {
        computedResults() {
            if (this.field.entity_field.name === "idprovincia") {
                return this.results.filter(item => item.distrital_id === sessionStorage.getItem("iddistrital"));
            } else if (this.field.entity_field.name === "idmunicipio") {
                return this.results.filter(item => item.provincia_id === sessionStorage.getItem("idprovincia"));
            }
            return this.results;
        }
    },
    methods: {
        handleQueryUrl(e) {
            this.query.search = e.target.value;
            this.queryParams = new URLSearchParams(this.query).toString();
            this.searchList();
        },
        searchList() {
            let fixedApiUrl = this.field.api.charAt(0) === "/" ? this.field.api.slice(1) : this.field.api;
            getSelectList(`${fixedApiUrl}?${this.queryParams}`)
                .then(
                    res => {
                        this.resultsFound = true;
                        this.results = res.results;
                    },
                    err => {
                        console.error(err);
                    }
                );
        },
        selectItem(item) {
            this.selectedItem = item;
            this.query.search = item.nombre;
            this.$emit("update-change", {[this.field.entity_field.name]: this.selectedItem.id});
            this.resultsFound = false;
            console.log("hi!");
            //
            if (this.field.entity_field.name === "iddistrital") {
                sessionStorage.setItem("iddistrital", item.id);
            }
            if (this.field.entity_field.name === "idprovincia") {
                sessionStorage.setItem(
                    "idprovincia",
                    `${sessionStorage.getItem("iddistrital")}${item.id}`
                );
            }
            if(this.field.entity_field.name === "idmunicipio") {
                // sessionStorage.setItem(
                //     "idmunicipio",
                //     `${sessionStorage.getItem("idprovincia")}${item.id}`
                // );
                sessionStorage.setItem(
                    `${this.field.entity_field.name}`, 
                    `${sessionStorage.getItem("idprovincia")}${this.field.value.trim()}`
                );
            }
        },
        searchFullList() {
            let fixedApiUrl = this.field.api.charAt(0) === "/" ? this.field.api.slice(1) : this.field.api;
            getSelectList(`${fixedApiUrl}`)
                .then(
                    res => {
                        // this.allResults = res.results;
                        // this.query.search = this.allResults.find(item => item.unic_id === sessionStorage.getItem(`${this.field.entity_field.name}`)).nombre;
                        if (this.field.entity_field.name === "iddistrital") {
                            this.query.search = res.results.find(item => item.unic_id === sessionStorage.getItem(`${this.field.entity_field.name}`)).nombre;
                        }
                        if (this.field.entity_field.name === "idprovincia") {
                            this.allResults = res.results.filter(item => item.distrital_id === sessionStorage.getItem("iddistrital"));
                            this.query.search = this.allResults.find(item => item.unic_id === sessionStorage.getItem(`${this.field.entity_field.name}`)).nombre;
                        }
                        if (this.field.entity_field.name === "idmunicipio") {
                            let idDistritalProvincia = sessionStorage.getItem("idprovincia");
                            this.allResults = res.results.filter(
                                item => `${item.distrital_id.trim()}${item.provincia_id.trim()}` === idDistritalProvincia
                            );
                            this.query.search = this.allResults.find(item => item.unic_id === sessionStorage.getItem(`${this.field.entity_field.name}`)).nombre;
                        }
                    },
                    err => {
                        console.error(err);
                    }
                )
        }
    },
    mounted() {
        this.searchFullList();
        if (this.field.value !== null) {
            this.query.search = this.field.value;
            this.$emit("update-change", {[this.field.entity_field.name]: this.field.value});

            if (this.field.entity_field.name === "iddistrital") {
                sessionStorage.setItem(`${this.field.entity_field.name}`, this.field.value.trim());
            }
            if (this.field.entity_field.name === "idprovincia") {
                sessionStorage.setItem(
                    `${this.field.entity_field.name}`, 
                    `${sessionStorage.getItem("iddistrital")}${this.field.value.trim()}`
                );
            }
            if(this.field.entity_field.name === "idmunicipio") {
                sessionStorage.setItem(
                    `${this.field.entity_field.name}`, 
                    `${sessionStorage.getItem("idprovincia")}${this.field.value.trim()}`
                );
            }
        }
    }
}
</script>

<style scoped>
span.search-widget-icon {
	position: absolute;
	z-index: 10;
	font-size: 18px;
	line-height: 38px;
	left: 13px;
	top: 0;
	color: #878a99;
}

.search-results {
    position:absolute;
    height: 205px;
    overflow: auto;
    z-index:1;
}

.list-group.search-results:hover {
    cursor:pointer;
}
</style>