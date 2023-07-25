<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-lg col-xxl">
                <div class="card">
                    <div class="card-body">
                        <div class="live-preview">
                            <div class="row gy-4 mt-3 mb-3" v-for="(field, index) in form.fields" :key="index">
                                <div :class="field.col">
                                    <HelpinputField 
                                    v-if="field.type_field === 'helpinput'" 
                                    @update-change="makeChange" 
                                    :field="field" />
                                    <SimpleSelectField 
                                    v-if="field.type_field === 'simpleSelect'" 
                                    @update-change="makeChange" 
                                    :field="field" />
                                    <DefaultSelectField 
                                    v-if="field.type_field === 'defaultSelect'" 
                                    @update-change="makeChange" 
                                    :field="field" />
                                    <CheckField 
                                    v-if="field.type_field === 'check'" 
                                    :field="field" 
                                    @update-change="makeChange" />
                                    <EmailField 
                                    v-if="field.type_field === 'email'" 
                                    :field="field" 
                                    @update-change="makeChange" />
                                    <RadioField 
                                    v-if="field.type_field === 'radio'" 
                                    :field="field" 
                                    @update-change="makeChange" />
                                    <TextareaField 
                                    v-if="field.type_field === 'textarea'" 
                                    :field="field" 
                                    @update-change="makeChange" />
                                    <RichTextField 
                                    v-if="field.type_field === 'richtextField'" 
                                    :field="field" 
                                    @update-change="makeChange" />
                                    <MultiSelectField 
                                    v-if="field.type_field === 'multiSelect'" 
                                    :field="field" 
                                    @update-change="makeChange" />
                                    <SwitchField 
                                    v-if="field.type_field === 'switch'" 
                                    :field="field" 
                                    @update-change="makeChange" />
                                    <RequirementField 
                                    v-if="field.type_field === 'requirementField'" 
                                    :style="index % 2 === 0 ? 'background:#eeeeee':''" :field="field" 
                                    :index="index" />
                                    <MultiuploadField 
                                    v-if="field.type_field === 'multiuploadField'" 
                                    :field="field" 
                                    @update-change="makeChange" />
                                    <MapField 
                                    v-if="field.type_field === 'map'" 
                                    @update-coordinates="makeChange" 
                                    :field="field" />
                                    <MultiMapField 
                                    v-if="field.type_field === 'multimapField'" 
                                    :table="table" 
                                    :field="field" 
                                    @update-change="makeChange" 
                                    @make-table="makeTable" />
                                </div>
                                <div class="col-lg-6 col-xxl-6">
                                    <label for="">Estructura JSON</label>
                                    <textarea readonly="true" rows="5" class="form-control language-markup" :value="JSON.stringify(field, null, 3)"></textarea>
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
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
// fields
import HelpinputField from "@/components/senasag-forms/fields/helpinput-field.vue";
import SimpleSelectField from "@/components/senasag-forms/fields/simple-select-field.vue";
import DefaultSelectField from "@/components/senasag-forms/fields/default-select-field.vue";
import CheckField from "@/components/senasag-forms/fields/check-field.vue";
import EmailField from "@/components/senasag-forms/fields/email-field.vue";
import RadioField from "@/components/senasag-forms/fields/radio-field.vue";
import TextareaField from "@/components/senasag-forms/fields/textarea-field.vue";
import RichTextField from "@/components/senasag-forms/fields/rich-text-field.vue";
import MultiSelectField from "@/components/senasag-forms/fields/multi-select-field.vue";
import SwitchField from "@/components/senasag-forms/fields/switch-field.vue";
import MultiuploadField from "@/components/senasag-forms/fields/multiupload-field.vue";
import RequirementField from "@/components/senasag-forms/fields/requirement-field.vue";
import MultiMapField from "@/components/senasag-forms/fields/multi-map-field.vue";
import MapField from "@/components/senasag-forms/fields/map-field.vue";

export default {
    name: "Documentation",
    components: {
        Layout,
        PageHeader,
        // fields
        HelpinputField,
        SimpleSelectField,
        CheckField,
        EmailField,
        RadioField,
        SwitchField,
        TextareaField,
        RichTextField,
        MultiSelectField,
        MultiuploadField,
        RequirementField,
        MapField,
        MultiMapField,
        DefaultSelectField
    },
    methods: {
        makeChange(data) {
            Object.assign(this.form_data, data);
        },
        makeTable() {
            let formData = {...this.form_data};
            this.table.push(formData);
            this.form_data = {};
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
                    text: "Documentación",
                    active: true,
                },
            ],
            //
            form: {},
            // multi map field only
            table: [],
            form_data: {},
        }
    },
    mounted() {
        this.form.fields = [
            {
                type_field: "helpinput",
                type: "text",
                name: "helpinput_field",
                entity_field: { name: "helpinputfield1", value: "example text" },
                label: "helpinput",
                class_field: "form-control",
                max_length: 20,
                col: "col-xxl-6 col-lg-6"
            },
            {
                type_field: "helpinput",
                type: "date",
                name: "helpinput_field",
                entity_field: { name: "helpinputfield2", value: "15-06-2022" },
                label: "helpinput",
                class_field: "form-control",
                max_length: 20,
                col: "col-xxl-6 col-lg-6"
            },
            {
                type_field: "helpinput",
                type: "time",
                name: "helpinput_field",
                entity_field: { name: "helpinputfield3", value: "10:30" },
                label: "helpinput",
                class_field: "form-control",
                max_length: 20,
                col: "col-xxl-6 col-lg-6"
            },
            {
                type_field: "email",
                name: "email_field",
                entity_field: { name: "emailfield1", value: "example@mail.com"},
                label: "email",
                class_field: "form-control form-control-icon",
                col: "col-xxl-6 col-lg-6"
            },
            {
                type_field: "textarea",
                name: "textarea_field",
                entity_field: { name: "textareafield1", value: "this is a text example" },
                label: "textarea",
                class_field: "form-control",
                max_length: 20,
                col: "col-xxl-6 col-lg-6"
            },
            {
                type_field: "richtextField",
                name: "richtext_field",
                entity_field: { name: "richtextfield1", value: "More text" },
                label: "richtextField",
                col: "col-xxl-6 col-lg-6"
            },
            {
                type_field: "defaultSelect",
                name: "simpleSelect_field",
                entity_field: { name: "simpleselect_field1", value: "2"},
                label: "defaultSelect",
                visible:true,
                options: '[{"value": "1","text": "option 1"},{"value": "2","text": "option 1"}]',
                col: "col-xxl-6 col-lg-6"
            },
            {
                type_field: "multiSelect",
                name: "multiselect_field",
                entity_field: { name: "multiselectfield1", value: "2" },
                label: "multiSelect",
                visible:true,
                options: '[{"value": "1","label": "option 1"},{"value": "2","label": "option 2"}, {"value": "3", "label": "option 3"}]',
                col: "col-xxl-6 col-lg-6"
            },
            {
                type_field: "check",
                type: "checkbox",
                class_field: "form-check-input",
                name: "check_field",
                entity_field: { name: "checkfield1", value: "1" },
                label: "check",
                col: "col-xxl-6 col-lg-6",
                options: '[{"value": "1","text": "option 1"},{"value": "2","text": "option 1"}]'
            },
            {
                type_field: "radio",
                type: "radio",
                class_field: "form-check-input",
                name: "radio",
                entity_field: { name: "radiofield1", value: "2" },
                label: "radio",
                col: "col-xxl-6 col-lg-6",
                options: '[{"value": "1","text": "option 1"},{"value": "2","text": "option 1"}]'
            },
            {
                type_field: "switch",
                class_field: "form-check-input",
                type: "checkbox",
                label: "switch",
                col: "col-xxl-6 col-lg-6",
                name: "switch_field",
                entity_field: { name: "switchfield1", value: "" }
            },
            {
                type_field: "multiuploadField",
                col: "col-xxl-6 co-lg-6",
                label: "multiuploadField",
                entity_field: { name: "multiupload_field" }
            },
            {
                type_field: "requirementField",
                col: "col-xxl-6 col-lg-6",
                label: "requirementField",
                entity_field: { name: "requirement_field", example_file: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf" },
            },
            {
                type_field: "map",
                col: "col-xxl-6 col-lg-6",
                label: "map",
                entity_field: { name: "map_field", value: "-66.123456,-12.123456" }
            },
            {
                type_field: "multimapField",
                col: "col-xxl-6 col-lg-6",
                label: "multimapField",
                entity_field: { name: "multimap_field" }
            }
        ]
    }
}
</script>

<style scope>
textarea[class*="language-"] {
	color: #000;
	background: none;
	text-shadow: 0 1px #fff;
	font-family: Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;
	font-size: 1.5em;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.5;
	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;
	-webkit-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}
</style>