<template>
    <div class="card comunicacion">
        <div class="card-body">
            <h4 class="card-title mb-4">Seguimiento</h4>
            <p>Despliege las pestañas para realizar el seguimiento del proceso.</p>
            <div class="d-flex flex-wrap gap-2 fs-16">
                <div class="accordion custom-accordionwithicon custom-accordion-border accordion-border-box accordion-success" id="accordionBordered">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="accordionborderedExample1">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#accor_borderedExamplecollapse1" aria-expanded="true" aria-controls="accor_borderedExamplecollapse1">
                                What is User Interface Design?
                            </button>
                        </h2>
                        <div id="accor_borderedExamplecollapse1" class="accordion-collapse collapse show" aria-labelledby="accordionborderedExample1" data-bs-parent="#accordionBordered">
                            <div class="accordion-body">
                                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua nulla assumenda shoreditch et.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="accordionborderedExample2">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accor_borderedExamplecollapse2" aria-expanded="false" aria-controls="accor_borderedExamplecollapse2">
                                What is Digital Marketing?
                            </button>
                        </h2>
                        <div id="accor_borderedExamplecollapse2" class="accordion-collapse collapse" aria-labelledby="accordionborderedExample2" data-bs-parent="#accordionBordered">
                            <div class="accordion-body">
                                Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien.
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="accordionborderedExample3">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accor_borderedExamplecollapse3" aria-expanded="false" aria-controls="accor_borderedExamplecollapse3">
                                Where does it come from ?
                            </button>
                        </h2>
                        <div id="accor_borderedExamplecollapse3" class="accordion-collapse collapse" aria-labelledby="accordionborderedExample3" data-bs-parent="#accordionBordered">
                            <div class="accordion-body">
                                Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis aliquam ultrices mauris.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end card body -->
    </div>
</template>

<script>
    export default {
        name: "FaqBox"
    }
</script>