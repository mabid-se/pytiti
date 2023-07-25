<template>
    <div class="card">
        <div class="card-header align-items-center d-flex">
            <h4 class="card-title mb-0 flex-grow-1">Richtext</h4>
        </div><!-- end card header -->
        <div class="card-body">
            <div class="live-preview">
                <ckeditor 
                :editor="editor" 
                v-model="editorData" 
                :config="editorConfig"></ckeditor>
            </div>
        </div>
    </div>
</template>

<script>
    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
    export default {
        name: "RichTextForm",
        data() {
            return {
                editor: ClassicEditor,
                editorData: '<p>Content of the editor.</p>',
                editorConfig: {
                    // The configuration of the editor.
                }
            };
        }
    }
</script>