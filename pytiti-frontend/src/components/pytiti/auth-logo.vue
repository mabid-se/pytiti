<template>
    <div class="text-center mt-sm-5 mb-4 text-white-50">
        <div>
            <a href="/" class="d-inline-block auth-logo">
                <img :src="img" alt="SENASAG" style="width: 100%;">
            </a>
        </div>
        <p class="mt-3 fs-15 fw-medium">{{ title }}</p>
    </div>
</template>

<script>
import logoImg from "../../assets/images/logo-light2.png";

export default {
    name: "AuthLogo",
    props: {
        title: {
            type: String,
        }
    },
    data() {
        return {
            img: logoImg
        }
    }
}
</script>

<style>

</style>