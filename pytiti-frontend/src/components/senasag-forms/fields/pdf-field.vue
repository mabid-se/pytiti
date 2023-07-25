<template>
    <VuePdf 
    v-for="page in numOfPages" 
    :key="page" 
    :src="file" 
    :page="page"
    scale="1" />
</template>

<script>
    import { VuePdf, createLoadingTask } from 'vue3-pdfjs/esm';

    export default {
        name: "PdfField",
        components: {
            VuePdf,
        },
        props: {
            file: {
                type: String,
            },
        },
        data() {
            return {
                numOfPages: undefined,
            }
        },
        mounted () {
            const loadingTask = createLoadingTask(this.file)
            loadingTask.promise.then((pdf) => {
                console.log(pdf);
                this.numOfPages = pdf.numPages;
            })
        },
    }
</script>

<style>
    .vue-pdf__wrapper-text-layer {
        box-shadow: 2px 3px 3px rgb(0 0 0 / 70%);
        border: 1px solid rgb(0, 0, 0, 0.7);
    }
</style>