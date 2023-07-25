<template>
  <div v-if="field.type_field === 'richtextField'">
    <label :for="field.name">{{ field.label }}</label>
    <ckeditor
      :id="field.name"
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
    ></ckeditor>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "RichTextField",
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  props: {
    field: {
      type: Object,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  updated() {
    let name =
      this.field.entity_field === null
        ? this.field.name
        : this.field.entity_field.name;
    this.$emit("update-change", { [name]: this.editorData });
  },
};
</script>

<style></style>
