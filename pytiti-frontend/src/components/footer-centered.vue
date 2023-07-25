<template>
    <footer class="footer">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="text-center">
                        <p class="mb-0 text">{{ currentYear }} - SENASAG</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "FooterCentered",
    data() {
        return {
            currentYear: new Date().getFullYear()
        }
    }
}
</script>