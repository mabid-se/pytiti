<template>
  <div
    class="tab-pane fade active show"
    id="custom-v-pills-profile"
    role="tabpanel"
    aria-labelledby="custom-v-pills-home-tab"
  >
    <div class="d-flex mb-4">
      <div class="flex-grow-1">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-header align-items-center d-flex-">
                <h4 class="card-title mb-2 flex-grow-1">
                  Aprobación y cierre de etapa
                </h4>
                <h5>
                  Seleccione la opción que desee para continuar el trámite.
                </h5>
              </div>
              <div class="card-body">
                <div class="live-preview">
                  <div class="row gy-4 mt-1">
                    <div class="col-12" v-if="error">
                      <div class="card mb-0">
                        <div class="card-body p-0">
                          <div
                            class="alert alert-danger border-0 rounded-0 m-0 d-flex align-items-center"
                            role="alert"
                          >
                            <div class="flex-grow-1 text-truncate">
                              {{ error }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-12 col-lg-12 col-xxl-12">
                      <div class="row">
                        <div class="col-12 center mb-3">
                          <button
                            type="button"
                            class="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target=".bs-example-modal-lg"
                          >
                            <i class="bx bx-bell fs-22"></i> Hacer observaciones
                          </button>
                        </div>
                        <div class="col-12">
                          <div class="card mb-0">
                            <div class="card-body p-0">
                              <div
                                class="alert alert-info border-0 rounded-0 m-0 d-flex align-items-center"
                                role="alert"
                              >
                                <div class="flex-grow-1">
                                  <div style="float: left">
                                    <button
                                      class="btn btn-warning btn-md btn-label"
                                      type="button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#archivarModal"
                                    >
                                      <div class="btn-content">
                                        <i
                                          class="ri-arrow-left-s-line label-icon align-middle fs-16 me-2"
                                        ></i>
                                        Archivar trámite
                                      </div>
                                    </button>
                                    <div
                                      class="modal fade bs-example-modal-center"
                                      tabindex="-1"
                                      role="dialog"
                                      id="archivarModal"
                                      aria-labelledby="archivarModal"
                                      aria-hidden="true"
                                    >
                                      <div
                                        class="modal-dialog modal-dialog-centered"
                                      >
                                        <div class="modal-content">
                                          <div
                                            class="modal-body text-center p-5"
                                          >
                                            <img
                                              src="@/assets/icons/warn-icon.png"
                                              alt="delete"
                                              style="width: 100px"
                                            />
                                            <div class="mt-4">
                                              <h4 class="mb-3">
                                                ¿Está seguro de archivar el
                                                trámite?
                                              </h4>
                                              <p class="text-muted mb-4">
                                                A continuación usted cerrará el
                                                trámite con la información
                                                registrada.
                                              </p>
                                              <div
                                                class="hstack gap-2 justify-content-center"
                                              >
                                                <button
                                                  type="button"
                                                  class="btn btn-danger"
                                                  data-bs-dismiss="modal"
                                                >
                                                  Cerrar
                                                </button>
                                                <a
                                                  @click.prevent="
                                                    $emit('on:close')
                                                  "
                                                  data-bs-dismiss="modal"
                                                  class="btn btn-success"
                                                >
                                                  Continuar
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div
                                      class="modal fade"
                                      id="exampleModalgrid"
                                      tabindex="-1"
                                      aria-labelledby="exampleModalgridLabel"
                                    >
                                      <div class="modal-dialog">
                                        <div class="modal-content">
                                          <div class="modal-header">
                                            <h5
                                              class="modal-title"
                                              id="exampleModalgridLabel"
                                            >
                                              Observaciones
                                            </h5>
                                            <button
                                              type="button"
                                              class="btn-close"
                                              data-bs-dismiss="modal"
                                              aria-label="Close"
                                            ></button>
                                          </div>
                                          <div class="modal-body">
                                            <form action="javascript:void(0);">
                                              <div class="row g-3">
                                                <div class="col-xxl-6">
                                                  <div>
                                                    <label
                                                      for="firstName"
                                                      class="form-label"
                                                      >Etapa</label
                                                    >
                                                    <input
                                                      type="text"
                                                      class="form-control"
                                                      id="firstName"
                                                      placeholder="Enter firstname"
                                                    />
                                                  </div>
                                                </div>

                                                <div class="col-xxl-6">
                                                  <div>
                                                    <label
                                                      for="lastName"
                                                      class="form-label"
                                                      >Plazo</label
                                                    >
                                                    <input
                                                      type="text"
                                                      class="form-control"
                                                      id="lastName"
                                                      placeholder="Enter lastname"
                                                    />
                                                  </div>
                                                </div>

                                                <div class="col-lg-12">
                                                  <label class="form-label"
                                                    >Gender</label
                                                  >
                                                </div>

                                                <div class="col-xxl-6"></div>

                                                <div class="col-xxl-6"></div>

                                                <div class="col-lg-12">
                                                  <div
                                                    class="hstack gap-2 justify-content-end"
                                                  >
                                                    <button
                                                      type="button"
                                                      class="btn btn-light"
                                                      data-bs-dismiss="modal"
                                                    >
                                                      Cancelar
                                                    </button>
                                                    <button
                                                      type="submit"
                                                      class="btn btn-primary"
                                                    >
                                                      Enviar observaciones
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </form>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div style="float: right">
                                    <button
                                      class="btn btn-success btn-md btn-label right"
                                      type="button"
                                      data-bs-toggle="modal"
                                      data-bs-target="#avanzarModal"
                                    >
                                      <div class="btn-content">
                                        <i
                                          class="ri-arrow-right-s-line label-icon align-middle fs-16 ms-2"
                                        ></i>
                                        Avanzar a la siguiente etapa
                                      </div>
                                    </button>
                                    <div
                                      class="modal fade bs-example-modal-center"
                                      tabindex="-1"
                                      role="dialog"
                                      id="avanzarModal"
                                      aria-labelledby="avanzarModal"
                                      aria-hidden="true"
                                    >
                                      <div
                                        class="modal-dialog modal-dialog-centered"
                                      >
                                        <div class="modal-content">
                                          <div
                                            class="modal-body text-center p-5"
                                          >
                                            <img
                                              src="@/assets/icons/warn-icon.png"
                                              alt="delete"
                                              style="width: 100px"
                                            />
                                            <div class="mt-4">
                                              <h4 class="mb-3">
                                                ¿Está seguro de avanzar a la
                                                siguiente etapa?
                                              </h4>
                                              <p class="text-muted mb-4">
                                                A continuación usted guardará
                                                toda la información registrada
                                                en la etapa y la dará por
                                                revisada y aprobada.
                                              </p>
                                              <div
                                                class="hstack gap-2 justify-content-center"
                                              >
                                                <button
                                                  type="button"
                                                  class="btn btn-danger"
                                                  data-bs-dismiss="modal"
                                                >
                                                  Cerrar
                                                </button>
                                                <a
                                                  class="btn btn-success"
                                                  @click.prevent="
                                                    $emit('on:submitToSenasag')
                                                  "
                                                  data-bs-dismiss="modal"
                                                  >Continuar</a
                                                >
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
          </div>
        </div>
      </div>
    </div>
    <div class="mb-3"></div>
  </div>
</template>

<script>
export default {
  name: "EnviarProd",
  props: {
    error: {
      type: String,
      required: false,
    },
  },
};
</script>
