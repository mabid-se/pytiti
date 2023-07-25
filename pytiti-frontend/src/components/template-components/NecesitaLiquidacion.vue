<template>
  <div class="card">
    <div class="card-body pt-0">
      <div class="live-preview">
        <div class="d-flex mb-4">
          <div class="flex-grow-1">
            <div class="row">
              <div class="col-lg-12">
                <div class="card">
                  <div class="card-header align-items-center d-flex-">
                    <h4 class="card-title mb-2 flex-grow-1">
                      Validación Liquidación
                    </h4>
                  </div>
                  <div class="card-body">
                    <div class="live-preview">
                      <div class="row gy-4">
                        <div class="col-sm-12 col-lg-12 col-xxl-12">
                          <div class="row">
                            <div class="col-12">
                              <div class="card mb-0">
                                <div class="card-body p-0">
                                  <div
                                    class="alert alert-danger border-0 rounded-0 m-0 d-flex align-items-center"
                                    role="alert"
                                  >
                                    <div class="flex-grow-1 text-truncate">
                                      {{ message }}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>
