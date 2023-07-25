<script>
// components
import Layout from "../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import BasicForm from "@/components/senasag-forms/basic-form.vue";
import FieldsForm from "@/components/senasag-forms/files-form.vue";
import SelectsField from "@/components/senasag-forms/selects-form.vue";
import RadioCheckSwitchForm from "@/components/senasag-forms/radio-check-switch-form.vue";
import MapForm from "@/components/senasag-forms/map-form.vue";
import RichTextForm from "@/components/senasag-forms/rich-text-form.vue"
import TableForm from "@/components/senasag-forms/table-form.vue";
// config
import appConfig from "../../../app.config";

export default {
  page: {
    title: "Senasag Test",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    Layout, 
    PageHeader, 
    BasicForm, 
    FieldsForm, 
    SelectsField, 
    MapForm,
    RichTextForm,
    RadioCheckSwitchForm,
    TableForm
  },
  data() {
    return {
      title: "Senasag",
      items: [
        {
          text: "App",
          href: "/",
        },
        {
          text: "senasag-test",
          active: true,
        },
      ],
    };
  },
};
</script>

<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
            <div class="col-lg-12">
                <BasicForm />
                <FieldsForm />
                <SelectsField />
                <MapForm />
                <RichTextForm />
                <RadioCheckSwitchForm />
                <TableForm />
            </div>
        </div>     
    </Layout>
</template>