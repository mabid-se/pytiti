<template>
    <Layout>
        <PageHeader :title="title" />
        <div class="row">
            <div class="col-12 margin-cont">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title mb-0">Vincular liquidación o multa</h4>
                    </div>
                    <!-- end card header -->

                    <div class="card-body">
                        <div id="customerList">
                            <div class="row">
                                <div class="col-xxl-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <span class="link"
                                                >Con este formulario se puede vincular un documento
                                                de Liquidación o de Multa previamente generado a
                                                través del
                                                <a
                                                    href="https://paititi.senasag.gob.bo/liquidador/"
                                                    target="new"
                                                    >sistema de Liquidador</a
                                                >.</span
                                            >
                                            <br /><br />
                                            <!-- Nav tabs -->
                                            <ul
                                                class="nav nav-pills nav-justified mb-3"
                                                role="tablist"
                                            >
                                                <li class="nav-item waves-effect waves-light">
                                                    <a
                                                        class="nav-link active"
                                                        data-bs-toggle="tab"
                                                        href="#liq"
                                                        role="tab"
                                                        @click="changeTab('liquidacion')"
                                                    >
                                                        Liquidación
                                                    </a>
                                                </li>
                                                <li class="nav-item waves-effect waves-light">
                                                    <a
                                                        class="nav-link"
                                                        data-bs-toggle="tab"
                                                        href="#multa"
                                                        role="tab"
                                                        @click="changeTab('multa')"
                                                    >
                                                        Multas
                                                    </a>
                                                </li>
                                            </ul>

                                            <!-- Tab panes -->
                                            <div class="tab-content">
                                                <div
                                                    class="tab-pane active"
                                                    id="liq"
                                                    role="tabpanel"
                                                >
                                                    <div class="d-flex">
                                                        <div class="flex-grow-1 ms-2">
                                                            <div class="row">
                                                                <div class="col-lg-10">
                                                                    <div
                                                                        class="flex-shrink-0"
                                                                        v-for="(
                                                                            option, index
                                                                        ) of this
                                                                            .serviciosInfoArray"
                                                                        :key="index"
                                                                    >
                                                                        <p>
                                                                            <i
                                                                                class="ri-checkbox-multiple-blank-fill text-success"
                                                                            ></i>
                                                                            CODIGO DE SERVICIO:
                                                                            {{
                                                                                option.codigoservicio
                                                                            }}
                                                                        </p>
                                                                        <p>
                                                                            {{ option.nombrerubro }}
                                                                        </p>
                                                                    </div>

                                                                    <!-- <select
                                                                        v-model="selected"
                                                                        @change="
                                                                            hasLiquidation(
                                                                                $event.target.value
                                                                            )
                                                                        "
                                                                    >
                                                                        <option
                                                                            v-for="(
                                                                                option, index
                                                                            ) of empresas"
                                                                            :value="option.value"
                                                                            :key="index"
                                                                        >
                                                                            {{ option.text }}
                                                                        </option>
                                                                    </select> -->
                                                                    <div class="col-5">
                                                                        <label
                                                                            for="formFile"
                                                                            class="form-label"
                                                                            >Escriba el código de
                                                                            liquidación para
                                                                            vincular la liquidación
                                                                            al trámite</label
                                                                        >
                                                                        <div
                                                                            class="input-group mb-3"
                                                                            v-if="
                                                                                !liquidacionVinculada
                                                                            "
                                                                        >
                                                                            <input
                                                                                type="text"
                                                                                class="form-control"
                                                                                v-model="
                                                                                    nroLiquidacion
                                                                                "
                                                                            />
                                                                            <button
                                                                                class="btn btn-info"
                                                                                type="button"
                                                                                @click="sendRequest"
                                                                            >
                                                                                Verificar
                                                                                liquidación
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div
                                                                class="row"
                                                                v-if="
                                                                    this.errorMessage !== '' ||
                                                                    this.errorMessage !==
                                                                        'Este Nro de Liquidación no corresponde al servicio'
                                                                "
                                                            >
                                                                <div class="col-12">
                                                                    <div class="row">
                                                                        <div
                                                                            class="col-xxl-4"
                                                                        ></div>
                                                                        <!-- end col -->
                                                                        <div class="col-xxl-4">
                                                                            <h6
                                                                                class="card-title mb-3 text-center"
                                                                            >
                                                                                <span
                                                                                    class="badge bg-danger align-middle fs-14"
                                                                                    >{{
                                                                                        this
                                                                                            .errorMessage
                                                                                    }}</span
                                                                                >
                                                                            </h6>
                                                                        </div>
                                                                        <!-- end col -->
                                                                        <div
                                                                            class="col-xxl-4"
                                                                        ></div>
                                                                        <!-- end col -->
                                                                    </div>
                                                                    <!-- end row -->
                                                                </div>
                                                                <!-- end col -->
                                                            </div>
                                                            <!-- end row -->

                                                            <div
                                                                class="row"
                                                                v-for="(mensaje, index) of this
                                                                    .errorServicioMessage"
                                                                :key="index"
                                                            >
                                                                <div
                                                                    class="col-12"
                                                                    v-if="
                                                                        mensaje !==
                                                                        this.errorMessage
                                                                    "
                                                                >
                                                                    <div class="row">
                                                                        <div
                                                                            class="col-xxl-4"
                                                                        ></div>
                                                                        <!-- end col -->
                                                                        <div class="col-xxl-4">
                                                                            <h6
                                                                                class="card-title mb-3 text-center"
                                                                            >
                                                                                <span
                                                                                    class="badge bg-danger align-middle fs-14"
                                                                                    >{{
                                                                                        mensaje
                                                                                    }}</span
                                                                                >
                                                                            </h6>
                                                                        </div>
                                                                        <!-- end col -->
                                                                        <div
                                                                            class="col-xxl-4"
                                                                        ></div>
                                                                        <!-- end col -->
                                                                    </div>
                                                                    <!-- end row -->
                                                                </div>
                                                                <!-- end col -->
                                                            </div>

                                                            <div class="row" v-if="message !== ''">
                                                                <div class="col-12">
                                                                    <div class="row">
                                                                        <div
                                                                            class="col-xxl-4"
                                                                        ></div>
                                                                        <!-- end col -->
                                                                        <div class="col-xxl-4">
                                                                            <h6
                                                                                class="card-title mb-3 text-center"
                                                                            >
                                                                                <span
                                                                                    class="badge bg-success align-middle fs-14"
                                                                                    >{{
                                                                                        message
                                                                                    }}</span
                                                                                >
                                                                            </h6>
                                                                        </div>
                                                                        <!-- end col -->
                                                                        <div
                                                                            class="col-xxl-4"
                                                                        ></div>
                                                                        <!-- end col -->
                                                                    </div>
                                                                    <!-- end row -->
                                                                </div>
                                                                <!-- end col -->
                                                            </div>

                                                            <div
                                                                class="row"
                                                                v-if="this.respuestaObject"
                                                            >
                                                                <div
                                                                    class="col-12"
                                                                    v-if="!liquidacionVinculada"
                                                                >
                                                                    <div class="row">
                                                                        <div
                                                                            class="col-xxl-4"
                                                                        ></div>
                                                                        <!-- end col -->
                                                                        <div class="col-xxl-4">
                                                                            <h6
                                                                                class="card-title mb-3 text-center"
                                                                            >
                                                                                <span
                                                                                    class="badge bg-success align-middle fs-14"
                                                                                    >Registro
                                                                                    obtenido con
                                                                                    éxito</span
                                                                                >
                                                                            </h6>
                                                                            <div
                                                                                class="card border card-border-success"
                                                                                style="
                                                                                    display: block;
                                                                                "
                                                                            >
                                                                                <div
                                                                                    class="card-body"
                                                                                >
                                                                                    <h5
                                                                                        class="text-muted text-uppercase fs-13 mb-4"
                                                                                    >
                                                                                        Datos
                                                                                    </h5>
                                                                                    <div
                                                                                        class="row g-3 mb-3"
                                                                                    >
                                                                                        <div
                                                                                            class="col-lg-12 mt-menor"
                                                                                        >
                                                                                            <label
                                                                                                for="basic-url"
                                                                                                class="form-label"
                                                                                                >Nro.
                                                                                                Liquidación:</label
                                                                                            ><span
                                                                                                class="text-muted ml-1 mb-0"
                                                                                                >{{
                                                                                                    this
                                                                                                        .respuestaObject
                                                                                                        .nroLiquidacion
                                                                                                }}</span
                                                                                            >
                                                                                        </div>
                                                                                        <div
                                                                                            class="col-lg-12 mt-menor"
                                                                                        >
                                                                                            <label
                                                                                                for="basic-url"
                                                                                                class="form-label"
                                                                                                >Nombre
                                                                                                del
                                                                                                solicitante:</label
                                                                                            ><span
                                                                                                class="text-muted ml-1 mb-0"
                                                                                                >{{
                                                                                                    this
                                                                                                        .respuestaObject
                                                                                                        .solicitanteNombre
                                                                                                }}</span
                                                                                            >
                                                                                        </div>
                                                                                        <div
                                                                                            class="col-lg-12 mt-menor"
                                                                                        >
                                                                                            <label
                                                                                                for="basic-url"
                                                                                                class="form-label"
                                                                                                >Razón
                                                                                                Social:</label
                                                                                            ><span
                                                                                                class="text-muted ml-1 mb-0"
                                                                                                >{{
                                                                                                    this
                                                                                                        .respuestaObject
                                                                                                        .empresaRazonSocial
                                                                                                }}</span
                                                                                            >
                                                                                        </div>
                                                                                        <div
                                                                                            class="col-lg-12 mt-menor"
                                                                                        >
                                                                                            <label
                                                                                                for="basic-url"
                                                                                                class="form-label"
                                                                                                >Nit:</label
                                                                                            ><span
                                                                                                class="text-muted ml-1 mb-0"
                                                                                                >{{
                                                                                                    this
                                                                                                        .respuestaObject
                                                                                                        .empresaNit
                                                                                                }}</span
                                                                                            >
                                                                                        </div>
                                                                                        <div
                                                                                            class="col-lg-12 mt-menor"
                                                                                        >
                                                                                            <label
                                                                                                for="basic-url"
                                                                                                class="form-label"
                                                                                                >Costo
                                                                                                total:</label
                                                                                            ><span
                                                                                                class="text-muted ml-1 mb-0"
                                                                                                >{{
                                                                                                    this
                                                                                                        .respuestaObject
                                                                                                        .totalCosto
                                                                                                }}</span
                                                                                            >
                                                                                        </div>
                                                                                        <hr />
                                                                                        <div
                                                                                            v-for="(
                                                                                                servicio,
                                                                                                index
                                                                                            ) of this
                                                                                                .respuestaObject
                                                                                                .datosServicio"
                                                                                            :key="
                                                                                                index
                                                                                            "
                                                                                        >
                                                                                            <div
                                                                                                class="col-lg-12 mt-menor"
                                                                                            >
                                                                                                <label
                                                                                                    for="basic-url"
                                                                                                    class="form-label"
                                                                                                    >Ejecutado:</label
                                                                                                ><span
                                                                                                    class="text-muted ml-1 mb-0"
                                                                                                    >{{
                                                                                                        servicio.cantidadEjecutado
                                                                                                    }}</span
                                                                                                >
                                                                                            </div>
                                                                                            <div
                                                                                                class="col-lg-12 mt-menor"
                                                                                            >
                                                                                                <label
                                                                                                    for="basic-url"
                                                                                                    class="form-label"
                                                                                                    >Pago:</label
                                                                                                ><span
                                                                                                    class="text-muted ml-1 mb-0"
                                                                                                    >{{
                                                                                                        servicio.costo
                                                                                                    }}</span
                                                                                                >
                                                                                            </div>
                                                                                            <div
                                                                                                class="col-lg-12 mt-menor"
                                                                                            >
                                                                                                <label
                                                                                                    for="basic-url"
                                                                                                    class="form-label"
                                                                                                    >Servicio:</label
                                                                                                ><span
                                                                                                    class="text-muted ml-1 mb-0"
                                                                                                    >{{
                                                                                                        servicio.CodigoServicio
                                                                                                    }}</span
                                                                                                >
                                                                                            </div>
                                                                                            <div
                                                                                                class="col-lg-12 mt-menor"
                                                                                            >
                                                                                                <label
                                                                                                    for="basic-url"
                                                                                                    class="form-label"
                                                                                                    >Cantidad:</label
                                                                                                ><span
                                                                                                    class="text-muted ml-1 mb-0"
                                                                                                    >{{
                                                                                                        servicio.cantidad
                                                                                                    }}</span
                                                                                                >
                                                                                            </div>
                                                                                            <hr />
                                                                                        </div>
                                                                                    </div>
                                                                                    <p
                                                                                        class="card-text"
                                                                                    ></p>
                                                                                    <div
                                                                                        class="text-end"
                                                                                    ></div>
                                                                                    <!-- Default File Input Example -->
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!-- end col -->

                                                                        <!-- end col -->
                                                                    </div>
                                                                    <!-- end row -->
                                                                </div>
                                                                <!-- end col -->
                                                                <div class="col-xxl-4"></div>
                                                                <div
                                                                    class="col-xxl-4 mb-2"
                                                                    style="display: block"
                                                                    v-if="
                                                                        (!existeLiquidacion ||
                                                                            !liquidacionVinculada) &&
                                                                        !errorServicioMessage.find(
                                                                            (str) =>
                                                                                str.includes(
                                                                                    'Este Nro de Liquidación no corresponde al servicio'
                                                                                )
                                                                        )
                                                                    "
                                                                >
                                                                    <label
                                                                        for="formFile"
                                                                        class="form-label"
                                                                        >Adjuntar archivo de
                                                                        liquidación</label
                                                                    >
                                                                    <input
                                                                        @change="updateChange"
                                                                        class="form-control"
                                                                        type="file"
                                                                        id="adjunto"
                                                                        name="adjunto"
                                                                    />
                                                                </div>
                                                                <div class="col-xxl-4"></div>
                                                                <div
                                                                    class="row text-center"
                                                                    style="display: block"
                                                                    v-if="
                                                                        (!existeLiquidacion ||
                                                                            !liquidacionVinculada) &&
                                                                        !errorServicioMessage.find(
                                                                            (str) =>
                                                                                str.includes(
                                                                                    'Este Nro de Liquidación no corresponde al servicio'
                                                                                )
                                                                        )
                                                                    "
                                                                >
                                                                    <div
                                                                        class="d-flex- flex-wrap gap-2 mb-3 mb-lg-0"
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            class="btn btn-info btn-label"
                                                                            @click="vincularCobro"
                                                                        >
                                                                            <i
                                                                                class="ri-link label-icon align-middle fs-16 me-2"
                                                                            ></i>
                                                                            Vincular cobro
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="row"
                                                                    v-if="liquidacionVinculada"
                                                                >
                                                                    <div class="col-lg-12">
                                                                        <div class="card">
                                                                            <div class="card-body">
                                                                                <div
                                                                                    class="live-preview"
                                                                                >
                                                                                    <div
                                                                                        class="row"
                                                                                    >
                                                                                        <div
                                                                                            class="col-xl-12"
                                                                                        >
                                                                                            <div
                                                                                                class="table-responsive mt-4 mt-xl-0"
                                                                                            >
                                                                                                <table
                                                                                                    class="table table-success table-striped table-nowrap- align-middle mb-0"
                                                                                                >
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <th
                                                                                                                scope="col"
                                                                                                            >
                                                                                                                N°
                                                                                                            </th>
                                                                                                            <th
                                                                                                                scope="col"
                                                                                                            >
                                                                                                                Código
                                                                                                            </th>
                                                                                                            <th
                                                                                                                scope="col"
                                                                                                            >
                                                                                                                Servicio
                                                                                                            </th>
                                                                                                            <th
                                                                                                                scope="col"
                                                                                                            >
                                                                                                                Fecha
                                                                                                                emisión
                                                                                                            </th>
                                                                                                            <th
                                                                                                                scope="col"
                                                                                                            >
                                                                                                                Pago
                                                                                                            </th>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        <tr
                                                                                                            v-for="(
                                                                                                                servicio,
                                                                                                                index
                                                                                                            ) of this
                                                                                                                .respuestaObject
                                                                                                                .datosServicio"
                                                                                                            :key="
                                                                                                                index
                                                                                                            "
                                                                                                        >
                                                                                                            <td
                                                                                                                class="fw-medium"
                                                                                                            >
                                                                                                                {{
                                                                                                                    index +
                                                                                                                    1
                                                                                                                }}
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                {{
                                                                                                                    servicio.CodigoServicio ||
                                                                                                                    servicio.codigoServicio
                                                                                                                }}
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <a
                                                                                                                    href="#"
                                                                                                                    data-toggle="tooltip"
                                                                                                                    title="{{servicio.nombreServicio}}"
                                                                                                                    >{{
                                                                                                                        servicio.nombreServicio
                                                                                                                    }}</a
                                                                                                                >
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                {{
                                                                                                                    formatDate(
                                                                                                                        this
                                                                                                                            .respuestaObject
                                                                                                                            .fechaEmision ||
                                                                                                                            this
                                                                                                                                .respuestaObject
                                                                                                                                .fechadeposito
                                                                                                                    )
                                                                                                                }}
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                {{
                                                                                                                    currentDate()
                                                                                                                }}
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                        </div>
                                                                                        <!--end col-->
                                                                                    </div>
                                                                                    <!--end row-->
                                                                                </div>
                                                                            </div>
                                                                            <!-- end card-body -->
                                                                        </div>
                                                                        <!-- end card -->
                                                                    </div>
                                                                    <!-- end col -->
                                                                </div>
                                                                <!--end row-->
                                                                <div
                                                                    class="row text-center"
                                                                    style="display: block"
                                                                    v-if="
                                                                        liquidacionVinculada ||
                                                                        ejecutado
                                                                    "
                                                                >
                                                                    <div
                                                                        class="d-flex- flex-wrap gap-2 mb-3 mb-lg-0"
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            class="btn btn-success btn-label mr-1"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target=".bs-example-modal-center"
                                                                            v-if="estaPagado"
                                                                        >
                                                                            <i
                                                                                class="ri-exchange-dollar-line label-icon align-middle fs-16 me-2"
                                                                            ></i
                                                                            >Verificar pago
                                                                        </button>
                                                                        <div
                                                                            class="modal fade bs-example-modal-center"
                                                                            tabindex="-1"
                                                                            role="dialog"
                                                                            aria-labelledby="mySmallModalLabel"
                                                                            aria-hidden="true"
                                                                            id="modal-consumir"
                                                                        >
                                                                            <div
                                                                                class="modal-dialog modal-dialog-centered"
                                                                            >
                                                                                <div
                                                                                    class="modal-content"
                                                                                >
                                                                                    <div
                                                                                        class="modal-body text-center p-5"
                                                                                    >
                                                                                        <lord-icon
                                                                                            src="https://cdn.lordicon.com/hrqwmuhr.json"
                                                                                            trigger="loop"
                                                                                            colors="primary:#121331,secondary:#08a88a"
                                                                                            style="
                                                                                                width: 120px;
                                                                                                height: 120px;
                                                                                            "
                                                                                        >
                                                                                        </lord-icon>
                                                                                        <div
                                                                                            class="mt-4"
                                                                                        >
                                                                                            <h4
                                                                                                class="mb-3"
                                                                                            >
                                                                                                Pago
                                                                                                completo.
                                                                                            </h4>
                                                                                            <p
                                                                                                class="text-muted mb-4"
                                                                                            >
                                                                                                La
                                                                                                liquidación
                                                                                                está
                                                                                                lista
                                                                                                para
                                                                                                ser
                                                                                                consumida.
                                                                                            </p>
                                                                                            <div
                                                                                                class="hstack gap-2 justify-content-center"
                                                                                            >
                                                                                                <button
                                                                                                    type="button"
                                                                                                    class="btn btn-light"
                                                                                                    data-bs-dismiss="modal"
                                                                                                    id="cerrar-modal"
                                                                                                >
                                                                                                    Cerrar
                                                                                                </button>
                                                                                                <a
                                                                                                    href="javascript:void(0);"
                                                                                                    class="btn btn-success"
                                                                                                    @click="
                                                                                                        hideModal
                                                                                                    "
                                                                                                    >Consumir
                                                                                                    servicios</a
                                                                                                >
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            class="btn btn-danger btn-label"
                                                                            @click="liberarServicio"
                                                                        >
                                                                            <i
                                                                                class="ri-link-unlink label-icon align-middle fs-16 me-2"
                                                                            ></i>
                                                                            Liberar liquidación
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- end row -->
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="tab-pane" id="multa" role="tabpanel">
                                                    <div class="d-flex">
                                                        <div class="flex-grow-1 ms-2">
                                                            <div class="row">
                                                                <div class="col-12">
                                                                    <div class="col-12">
                                                                        <label
                                                                            for="formFile"
                                                                            class="form-label"
                                                                            >Elija el tipo de
                                                                            parámetro y escriba el
                                                                            valor</label
                                                                        >
                                                                        <div class="row">
                                                                            <div class="col-lg-3">
                                                                                <select
                                                                                    class="form-select mb-3"
                                                                                    aria-label="Default select example"
                                                                                    v-model="
                                                                                        tipoParametro
                                                                                    "
                                                                                >
                                                                                    <option
                                                                                        selected
                                                                                        disabled
                                                                                    >
                                                                                        -Parámetro-
                                                                                    </option>
                                                                                    <option
                                                                                        value="nroMulta"
                                                                                    >
                                                                                        Nro. de
                                                                                        Multa
                                                                                    </option>
                                                                                    <option
                                                                                        value="nroActa"
                                                                                    >
                                                                                        Nro. Acta o
                                                                                        Resolución
                                                                                        Sancionatoria
                                                                                    </option>
                                                                                </select>
                                                                            </div>
                                                                            <div class="col-lg-4">
                                                                                <div
                                                                                    class="input-group"
                                                                                >
                                                                                    <input
                                                                                        type="text"
                                                                                        class="form-control"
                                                                                        aria-label="Documento"
                                                                                        aria-describedby="button-addon2"
                                                                                        v-model="
                                                                                            valor
                                                                                        "
                                                                                    />
                                                                                </div>
                                                                                <p>
                                                                                    Escriba el valor
                                                                                    para vincular la
                                                                                    multa al trámite
                                                                                </p>
                                                                            </div>
                                                                            <div class="col-lg-5">
                                                                                <div
                                                                                    class="input-group"
                                                                                >
                                                                                    <input
                                                                                        type="text"
                                                                                        class="form-control left w-50"
                                                                                        aria-label="CI"
                                                                                        aria-describedby="button-addon2"
                                                                                        v-model="
                                                                                            carnetIdentidad
                                                                                        "
                                                                                    /><button
                                                                                        class="btn btn-info"
                                                                                        type="button"
                                                                                        id="button-addon2"
                                                                                        @click="
                                                                                            sendRequestMulta
                                                                                        "
                                                                                    >
                                                                                        Buscar multa
                                                                                    </button>
                                                                                    <p>
                                                                                        Escriba su
                                                                                        carnet de
                                                                                        identidad
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div
                                                                class="row"
                                                                v-if="
                                                                    mensajeMulta !==
                                                                    errorMessageMulta
                                                                "
                                                            >
                                                                <div class="col-12">
                                                                    <div class="row">
                                                                        <div
                                                                            class="col-xxl-4"
                                                                        ></div>
                                                                        <!-- end col -->

                                                                        <div class="col-xxl-4">
                                                                            <h6
                                                                                class="card-title mb-3 text-center"
                                                                            >
                                                                                <span
                                                                                    class="badge bg-danger align-middle fs-14"
                                                                                    >{{
                                                                                        errorMessageMulta
                                                                                    }}</span
                                                                                >
                                                                            </h6>
                                                                        </div>
                                                                        <!-- end col -->
                                                                        <div
                                                                            class="col-xxl-4"
                                                                        ></div>
                                                                        <!-- end col -->
                                                                    </div>
                                                                    <!-- end row -->
                                                                </div>
                                                                <!-- end col -->
                                                            </div>
                                                            <!-- end row -->

                                                            <div
                                                                class="row"
                                                                v-if="messageMulta !== ''"
                                                            >
                                                                <div class="col-12">
                                                                    <div class="row">
                                                                        <div
                                                                            class="col-xxl-4"
                                                                        ></div>
                                                                        <!-- end col -->
                                                                        <div class="col-xxl-4">
                                                                            <h6
                                                                                class="card-title mb-3 text-center"
                                                                            >
                                                                                <span
                                                                                    class="badge bg-success align-middle fs-14"
                                                                                    >{{
                                                                                        messageMulta
                                                                                    }}</span
                                                                                >
                                                                            </h6>
                                                                        </div>
                                                                        <!-- end col -->
                                                                        <div
                                                                            class="col-xxl-4"
                                                                        ></div>
                                                                        <!-- end col -->
                                                                    </div>
                                                                    <!-- end row -->
                                                                </div>
                                                                <!-- end col -->
                                                            </div>

                                                            <div
                                                                class="row"
                                                                v-if="this.multaObject"
                                                            >
                                                                <div
                                                                    class="col-12"
                                                                    v-if="!multaVinculada"
                                                                >
                                                                    <div class="row">
                                                                        <div
                                                                            class="col-xxl-4"
                                                                        ></div>
                                                                        <!-- end col -->
                                                                        <div class="col-xxl-4">
                                                                            <h6
                                                                                class="card-title mb-3 text-center"
                                                                            >
                                                                                <span
                                                                                    class="badge bg-success align-middle fs-14"
                                                                                    >Registro
                                                                                    obtenido con
                                                                                    éxito</span
                                                                                >
                                                                            </h6>
                                                                            <div
                                                                                class="card border card-border-success"
                                                                                style="
                                                                                    display: block;
                                                                                "
                                                                            >
                                                                                <div
                                                                                    class="card-body"
                                                                                >
                                                                                    <h5
                                                                                        class="text-muted text-uppercase fs-13 mb-4"
                                                                                    >
                                                                                        Datos
                                                                                    </h5>
                                                                                    <div
                                                                                        class="row g-3 mb-3"
                                                                                    >
                                                                                        <div
                                                                                            class="col-lg-12 mt-menor"
                                                                                        >
                                                                                            <label
                                                                                                for="basic-url"
                                                                                                class="form-label"
                                                                                                >Nro.
                                                                                                Multa:</label
                                                                                            ><span
                                                                                                class="text-muted ml-1 mb-0"
                                                                                                >{{
                                                                                                    this
                                                                                                        .multaObject
                                                                                                        .nroMulta
                                                                                                }}</span
                                                                                            >
                                                                                        </div>
                                                                                        <div
                                                                                            class="col-lg-12 mt-menor"
                                                                                        >
                                                                                            <label
                                                                                                for="basic-url"
                                                                                                class="form-label"
                                                                                                >Nombre
                                                                                                del
                                                                                                responsable:</label
                                                                                            ><span
                                                                                                class="text-muted ml-1 mb-0"
                                                                                                >{{
                                                                                                    this
                                                                                                        .multaObject
                                                                                                        .responsableNombre
                                                                                                }}</span
                                                                                            >
                                                                                        </div>
                                                                                        <div
                                                                                            class="col-lg-12 mt-menor"
                                                                                        >
                                                                                            <label
                                                                                                for="basic-url"
                                                                                                class="form-label"
                                                                                                >Razón
                                                                                                Social:</label
                                                                                            ><span
                                                                                                class="text-muted ml-1 mb-0"
                                                                                                >{{
                                                                                                    this
                                                                                                        .multaObject
                                                                                                        .empresaRazonSocial
                                                                                                }}</span
                                                                                            >
                                                                                        </div>
                                                                                        <div
                                                                                            class="col-lg-12 mt-menor"
                                                                                        >
                                                                                            <label
                                                                                                for="basic-url"
                                                                                                class="form-label"
                                                                                                >Nit:</label
                                                                                            ><span
                                                                                                class="text-muted ml-1 mb-0"
                                                                                                >{{
                                                                                                    this
                                                                                                        .multaObject
                                                                                                        .empresaNit
                                                                                                }}</span
                                                                                            >
                                                                                        </div>
                                                                                        <div
                                                                                            class="col-lg-12 mt-menor"
                                                                                        >
                                                                                            <label
                                                                                                for="basic-url"
                                                                                                class="form-label"
                                                                                                >Costo
                                                                                                total:</label
                                                                                            ><span
                                                                                                class="text-muted ml-1 mb-0"
                                                                                                >{{
                                                                                                    this
                                                                                                        .multaObject
                                                                                                        .totalCosto
                                                                                                }}</span
                                                                                            >
                                                                                        </div>
                                                                                        <hr />
                                                                                        <div
                                                                                            v-for="(
                                                                                                servicio,
                                                                                                index
                                                                                            ) of this
                                                                                                .multaObject
                                                                                                .datosServicio"
                                                                                            :key="
                                                                                                index
                                                                                            "
                                                                                        >
                                                                                            <div
                                                                                                class="col-lg-12 mt-menor"
                                                                                            >
                                                                                                <label
                                                                                                    for="basic-url"
                                                                                                    class="form-label"
                                                                                                    >Area
                                                                                                    Técnica:</label
                                                                                                ><span
                                                                                                    class="text-muted ml-1 mb-0"
                                                                                                    >{{
                                                                                                        servicio.areaTecnica
                                                                                                    }}</span
                                                                                                >
                                                                                            </div>
                                                                                            <div
                                                                                                class="col-lg-12 mt-menor"
                                                                                            >
                                                                                                <label
                                                                                                    for="basic-url"
                                                                                                    class="form-label"
                                                                                                    >Pago:</label
                                                                                                ><span
                                                                                                    class="text-muted ml-1 mb-0"
                                                                                                    >{{
                                                                                                        servicio.costo
                                                                                                    }}</span
                                                                                                >
                                                                                            </div>
                                                                                            <div
                                                                                                class="col-lg-12 mt-menor"
                                                                                            >
                                                                                                <label
                                                                                                    for="basic-url"
                                                                                                    class="form-label"
                                                                                                    >Area:</label
                                                                                                ><span
                                                                                                    class="text-muted ml-1 mb-0"
                                                                                                    >{{
                                                                                                        servicio.area
                                                                                                    }}</span
                                                                                                >
                                                                                            </div>
                                                                                            <div
                                                                                                class="col-lg-12 mt-menor"
                                                                                            >
                                                                                                <label
                                                                                                    for="basic-url"
                                                                                                    class="form-label"
                                                                                                    >Motivo
                                                                                                    de
                                                                                                    la
                                                                                                    multa:</label
                                                                                                ><span
                                                                                                    class="text-muted ml-1 mb-0"
                                                                                                    >{{
                                                                                                        servicio.motivoMulta
                                                                                                    }}</span
                                                                                                >
                                                                                            </div>
                                                                                            <hr />
                                                                                        </div>
                                                                                    </div>
                                                                                    <p
                                                                                        class="card-text"
                                                                                    ></p>
                                                                                    <div
                                                                                        class="text-end"
                                                                                    ></div>
                                                                                    <!-- Default File Input Example -->
                                                                                    <div class="">
                                                                                        <label
                                                                                            for="formFile"
                                                                                            class="form-label"
                                                                                            >Adjuntar
                                                                                            archivo
                                                                                            de
                                                                                            multa</label
                                                                                        >
                                                                                        <input
                                                                                            class="form-control"
                                                                                            type="file"
                                                                                            id="formFile"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <!-- end col -->
                                                                        <div
                                                                            class="col-xxl-4"
                                                                        ></div>
                                                                        <!-- end col -->
                                                                    </div>
                                                                    <!-- end row -->
                                                                </div>
                                                                <!-- end col -->
                                                                <div
                                                                    class="row text-center"
                                                                    v-if="
                                                                        !existeMulta ||
                                                                        !multaVinculada
                                                                    "
                                                                >
                                                                    <div
                                                                        class="d-flex- flex-wrap gap-2 mb-3 mb-lg-0"
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            class="btn btn-info btn-label"
                                                                            @click="vincularMulta"
                                                                        >
                                                                            <i
                                                                                class="ri-link label-icon align-middle fs-16 me-2"
                                                                            ></i>
                                                                            Vincular multa
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    class="row"
                                                                    v-if="multaVinculada"
                                                                >
                                                                    <div class="col-lg-12">
                                                                        <div class="card">
                                                                            <div class="card-body">
                                                                                <div
                                                                                    class="live-preview"
                                                                                >
                                                                                    <div
                                                                                        class="row"
                                                                                    >
                                                                                        <div
                                                                                            class="col-xl-12"
                                                                                        >
                                                                                            <div
                                                                                                class="table-responsive mt-4 mt-xl-0"
                                                                                            >
                                                                                                <table
                                                                                                    class="table table-success table-striped table-nowrap- align-middle mb-0"
                                                                                                >
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <th
                                                                                                                scope="col"
                                                                                                            >
                                                                                                                N°
                                                                                                            </th>
                                                                                                            <th
                                                                                                                scope="col"
                                                                                                            >
                                                                                                                Área
                                                                                                            </th>
                                                                                                            <th
                                                                                                                scope="col"
                                                                                                            >
                                                                                                                Área
                                                                                                                técnica
                                                                                                            </th>
                                                                                                            <th
                                                                                                                scope="col"
                                                                                                            >
                                                                                                                Motivo
                                                                                                                de
                                                                                                                la
                                                                                                                multa
                                                                                                            </th>
                                                                                                            <th
                                                                                                                scope="col"
                                                                                                            >
                                                                                                                Fecha
                                                                                                                emisión
                                                                                                            </th>
                                                                                                            <th
                                                                                                                scope="col"
                                                                                                            >
                                                                                                                Pago
                                                                                                            </th>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        <tr
                                                                                                            v-for="(
                                                                                                                servicio,
                                                                                                                index
                                                                                                            ) of this
                                                                                                                .multaObject
                                                                                                                .datosServicio"
                                                                                                            :key="
                                                                                                                index
                                                                                                            "
                                                                                                        >
                                                                                                            <td
                                                                                                                class="fw-medium"
                                                                                                            >
                                                                                                                {{
                                                                                                                    index +
                                                                                                                    1
                                                                                                                }}
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                {{
                                                                                                                    servicio.area
                                                                                                                }}
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                {{
                                                                                                                    servicio.areaTecnica
                                                                                                                }}
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                {{
                                                                                                                    servicio.motivoMulta
                                                                                                                }}
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                {{
                                                                                                                    this
                                                                                                                        .multaObject
                                                                                                                        .fechaActa
                                                                                                                }}
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                5
                                                                                                                días
                                                                                                                -
                                                                                                                Pago
                                                                                                                pendiente
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                        </div>
                                                                                        <!--end col-->
                                                                                    </div>
                                                                                    <!--end row-->
                                                                                </div>
                                                                            </div>
                                                                            <!-- end card-body -->
                                                                        </div>
                                                                        <!-- end card -->
                                                                    </div>
                                                                    <!-- end col -->
                                                                </div>
                                                                <!--end row-->

                                                                <div
                                                                    class="row text-center"
                                                                    style="display: block"
                                                                    v-if="
                                                                        liquidacionVinculada ||
                                                                        ejecutado
                                                                    "
                                                                >
                                                                    <div
                                                                        class="d-flex- flex-wrap gap-2 mb-3 mb-lg-0"
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            class="btn btn-success btn-label mr-1"
                                                                            data-bs-toggle="modal"
                                                                            data-bs-target=".bs-example-modal-center-multa"
                                                                            v-if="!estaPagadoMulta"
                                                                        >
                                                                            <i
                                                                                class="ri-exchange-dollar-line label-icon align-middle fs-16 me-2"
                                                                            ></i
                                                                            >Verificar pago
                                                                        </button>
                                                                        <div
                                                                            class="modal fade bs-example-modal-center-multa"
                                                                            tabindex="-1"
                                                                            role="dialog"
                                                                            aria-labelledby="mySmallModalLabel"
                                                                            aria-hidden="true"
                                                                            id="modal-multa"
                                                                        >
                                                                            <div
                                                                                class="modal-dialog modal-dialog-centered"
                                                                            >
                                                                                <div
                                                                                    class="modal-content"
                                                                                >
                                                                                    <div
                                                                                        class="modal-body text-center p-5"
                                                                                    >
                                                                                        <lord-icon
                                                                                            src="https://cdn.lordicon.com/hrqwmuhr.json"
                                                                                            trigger="loop"
                                                                                            colors="primary:#121331,secondary:#08a88a"
                                                                                            style="
                                                                                                width: 120px;
                                                                                                height: 120px;
                                                                                            "
                                                                                        >
                                                                                        </lord-icon>
                                                                                        <div
                                                                                            class="mt-4"
                                                                                        >
                                                                                            <h4
                                                                                                class="mb-3"
                                                                                            >
                                                                                                Pago
                                                                                                completo.
                                                                                            </h4>
                                                                                            <p
                                                                                                class="text-muted mb-4"
                                                                                            >
                                                                                                La
                                                                                                multa
                                                                                                esta
                                                                                                pagada,
                                                                                                para
                                                                                                su
                                                                                                actualización.
                                                                                            </p>
                                                                                            <div
                                                                                                class="hstack gap-2 justify-content-center"
                                                                                            >
                                                                                                <button
                                                                                                    type="button"
                                                                                                    class="btn btn-light"
                                                                                                    data-bs-dismiss="modal"
                                                                                                    id="cerrar-modal-multa"
                                                                                                >
                                                                                                    Cerrar
                                                                                                </button>
                                                                                                <a
                                                                                                    href="javascript:void(0);"
                                                                                                    class="btn btn-success"
                                                                                                    @click="
                                                                                                        hideModalMulta
                                                                                                    "
                                                                                                    >Actualizar
                                                                                                    multa</a
                                                                                                >
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            class="btn btn-danger btn-label"
                                                                            @click="liberarMulta"
                                                                        >
                                                                            <i
                                                                                class="ri-link-unlink label-icon align-middle fs-16 me-2"
                                                                            ></i>
                                                                            Liberar Multa
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <!-- end row -->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- end card-body -->
                                    </div>
                                    <!-- end card -->
                                </div>
                                <!--end col-->
                            </div>
                            <!--end row-->
                        </div>
                    </div>
                    <!-- end card -->
                </div>
                <!-- end col -->
            </div>
            <!-- end col -->
        </div>
        <!-- end row -->
    </Layout>
</template>
<script>
import Layout from "../../../../layouts/main.vue"
import PageHeader from "@/components/page-header"
import appConfig from "../../../../../app.config"
import moment from "moment"
import {
    getLiquidacion,
    getMulta,
    uploadLiquidationFile,
    registerDeposit,
    linkLiquidation,
    checkLiquidation,
    checkLinkLiquidation,
    consumeService,
    checkCompanyLiquidation,
    registerLiquidation,
    releaseLiquidation,
    releaseService,
    updateDeposit,
    uploadLiquidation,
    checkMulta,
    checkLinkMultas,
    linkMultas,
    releaseMultas
} from "@/services/liquidacion"

import {getServicesByProcedure} from "@/services/rubros"

export default {
    page: {
        title: "Liquidador",
        meta: [{name: "description", content: appConfig.description}]
    },
    data() {
        return {
            respuestaObject: null,
            multaObject: null,
            errorMessage: "",
            errorMessageMulta: "",
            message: "",
            errorServicioMessage: [],
            title: "Liquidador",
            tab: "liquidacion",
            servicio: 51,
            tipoParametro: "",
            valor: "",
            carnetIdentidad: "",
            nroLiquidacion: "",
            adjunto_name: "",
            adjunto: "",
            existeLiquidacion: false,
            existeLiquidacionObject: null,
            liquidacionVinculada: false,
            multaVinculada: false,
            idDeposito: "00D93",
            estaPagado: false,
            estaPagadoMulta: false,
            ejecutado: false,
            empresas: [
                {text: "Empresa prueba 1", value: "c6971ba4-a970-402d-8762-32bf0ec58e7d"},
                {text: "Empresa prueba 2", value: "c746433e-4b97-409c-abee-29a423cbc59a"},
                {text: "Empresa prueba 3", value: "2604436e-a330-40f9-8edc-6fb64297a8ba"},
                {text: "Empresa prueba 4", value: "9ea73b9c-3024-40f8-ac0d-a5072a1c03fc"},
                {text: "Empresa prueba 5", value: "d1a679bd-2da2-43e9-9572-1d6037afd2b5"},
                {text: "Empresa prueba 6", value: "4c5cb5f1-1295-43e0-99b9-95c17b96b8c1"},
                {text: "Empresa prueba 7", value: "15b555d5-2315-4712-931d-2b86d748a327"}
            ],
            serviciosInfoArray: [],
            solicitudTramiteInfo: null
        }
    },
    name: "Widgets",
    components: {
        Layout,
        PageHeader
    },
    computed: {},
    watch: {},
    filters: {},
    methods: {
        changeTab(tab) {
            if (tab === "multa") {
                this.multaObject = null
            }
            this.tab = tab
        },
        async hideModal() {
            await this.consumirServicio()
            document.getElementById("cerrar-modal").click()
        },

        async hideModalMulta() {
            //await this.consumirServicio()
            await this.actualizarMulta()
            document.getElementById("cerrar-modal-multa").click()
        },

        async hasLiquidation(value) {
            const hasLiquidation = await checkCompanyLiquidation(value)
            this.errorMessage = ""
            this.errorMessageMulta = ""
            this.message = ""
            this.messageMulta = ""
            this.estaPagado = false
            this.liquidacionVinculada = false
            this.existeLiquidacion = false
            this.nroLiquidacion = ""
            this.respuestaObject = null
            if (!hasLiquidation.mensaje) {
                this.liquidacionVinculada = true
                this.existeLiquidacion = true
                this.nroLiquidacion = hasLiquidation.nroliquidacion
                const liquidacionInfo = await checkLiquidation(hasLiquidation.nroliquidacion)

                const res =
                    this.tab === "liquidacion"
                        ? await getLiquidacion(hasLiquidation.nroliquidacion)
                        : await getMulta(this.tipoParametro, this.valor, this.carnetIdentidad)
                if (res.finalizado && res.datos.pago) {
                    this.message = "Liquidación pagada lista para consumir"
                    this.estaPagado = true
                    const datosPago = res.datos.datosPago[res.datos.datosPago.length - 1]
                    const liquidacionPayload = {
                        pago: res.datos.pago,
                        montoTotalPagado: res.datos.montoTotalPagado,
                        fechaPago: moment(datosPago.fechaPago).format("YYYY-MM-DD")
                    }
                    await uploadLiquidation(liquidacionInfo.id_liquidacion, liquidacionPayload)
                }
                if (!res.finalizado) {
                    this.errorMessage = res.mensaje
                }
                const liquidacion = await checkLiquidation(hasLiquidation.nroliquidacion)
                const {datosServicios, datosPagos, ...rest} = liquidacion
                this.respuestaObject = {
                    ...rest,
                    datosPago: datosPagos,
                    ...res.datos,
                    datosServicio: datosServicios
                }
            }
        },
        async sendRequestMulta() {
            const res = await getMulta(this.tipoParametro, this.valor, this.carnetIdentidad)
            await this.multaSiExiste()
            this.multaObject = res.datos || null
            this.errorMessageMulta = ""
            this.estaPagadoMulta = false
            if (!res.datos?.pago) {
                this.errorMessageMulta = res.mensaje
            }
            if (res.finalizado && res.datos.pago) {
                this.messageMulta = "Multa pagada"
            }
            this.estaPagadoMulta = !!res.datos?.pago
        },
        async sendRequest() {
            this.ejecutado = false
            this.estaPagado = false
            this.message = ""
            this.errorMessage = ""
            this.respuestaObject = null
            this.errorServicioMessage = []
            const res = await getLiquidacion(this.nroLiquidacion)
            await this.liquidacionSiExiste()
            this.respuestaObject = res.datos || null
            this.verificarServicios()

            if (!res.finalizado) {
                this.errorMessage = res.mensaje
            }
            if (
                this.liquidacionVinculada ||
                this.errorMessage === "Este Nro de Liquidación ya fue Utilizado"
            ) {
                this.ejecutado = true
                this.respuestaObject = {...this.respuestaObject, ...this.existeLiquidacionObject}
            }
            if (res.finalizado && res.datos.pago) {
                this.message = "Liquidación pagada lista para consumir"
            }
            this.estaPagado = !!res.datos?.pago
        },
        async vincularCobro() {
            if (!this.existeLiquidacion) {
                await this.sendForm()
                this.existeLiquidacion = true
            }
            if (!this.liquidacionVinculada) {
                //await linkLiquidation(this.nroLiquidacion, this.selected)
                await linkLiquidation(
                    this.nroLiquidacion,
                    this.solicitudTramiteInfo?.id_solicitud_tramite
                )
                this.liquidacionVinculada = true
            }
            await this.sendRequest()
        },
        async vincularMulta() {
            if (!this.existeMulta) {
                await this.sendFormMulta()
                this.existeMulta = true
            }
            if (!this.multaVinculada) {
                //await linkLiquidation(this.nroLiquidacion, this.selected)
                await linkMultas(
                    this.tipoParametro,
                    this.valor,
                    this.carnetIdentidad,
                    this.solicitudTramiteInfo?.id_solicitud_tramite
                )
                this.multaVinculada = true
            }
            await this.sendRequestMulta()
        },
        async liquidacionSiExiste() {
            //const vinculacion = await checkLinkLiquidation(this.nroLiquidacion, this.selected)
            const vinculacion = await checkLinkLiquidation(
                this.nroLiquidacion,
                this.solicitudTramiteInfo?.id_solicitud_tramite
            )
            const liquidacion = await checkLiquidation(this.nroLiquidacion)
            this.liquidacionVinculada = !(
                vinculacion.mensaje === "La liquidacion no esta vinculada"
            )
            this.existeLiquidacion = !(liquidacion.mensaje === "La liquidacion no existe")
            if (this.existeLiquidacion) {
                const {nroliquidacion, datosServicios, fechadeposito, ...rest} = liquidacion
                this.existeLiquidacionObject = {
                    nroLiquidacion: nroliquidacion,
                    datosServicio: datosServicios,
                    fechadeposito: moment(fechadeposito).format("DD/MM/YYYY"),
                    ...rest
                }
            }
        },
        async multaSiExiste() {
            const vinculacion = await checkLinkMultas(
                this.tipoParametro,
                this.valor,
                this.carnetIdentidad,
                this.solicitudTramiteInfo?.id_solicitud_tramite
            )
            const multa = await checkMulta(this.tipoParametro, this.valor, this.carnetIdentidad)
            this.multaVinculada = !(vinculacion.mensaje === "La multa no esta vinculada")
            this.existeMulta = !(multa.mensaje === "La multa no existe")
            if (this.existeMulta) {
                const {nroliquidacion, datosServicios, fechadeposito, ...rest} = multa
                this.existeMultaObject = {
                    datosServicio: datosServicios,
                    fechadeposito: moment(fechadeposito).format("DD/MM/YYYY"),
                    ...rest
                }
            }
        },
        updateChange(e) {
            this.adjunto_name = e.target.name
            this.adjunto = e.target.files[0]
        },
        async verificarServicios() {
            //const servicios = [53, 57]
            const servicios = this.serviciosInfoArray.map((servicio) => +servicio.codigoservicio)
            const serviciosLiquidador = this.respuestaObject.datosServicio.map(
                ({CodigoServicio}) => +CodigoServicio
            )
            for (const servicio of servicios) {
                const respuesta = serviciosLiquidador.includes(servicio)
                if (!respuesta) {
                    this.errorServicioMessage.push(
                        `Este Nro de Liquidación no corresponde al servicio : ${servicio}`
                    )
                }
            }
        },
        async sendForm() {
            try {
                const {datosPago, datosServicio, ...rest} = this.respuestaObject
                const payload = {
                    ...rest,
                    fidSolicitudTramite: this.solicitudTramiteInfo?.id_solicitud_tramite,
                    datosPagos: datosPago,
                    datosServicios: datosServicio.map(({CodigoServicio, ...rest}) => ({
                        codigoServicio: CodigoServicio,
                        ...rest
                    }))
                }
                const liquidacion = await registerLiquidation(payload)
                const {
                    data: {id_liquidacion, pago}
                } = liquidacion
                if (this.adjunto_name) {
                    let dataFile = new FormData()
                    dataFile.append("ruta", this.adjunto)
                    dataFile.append("nombre_documento", this.adjunto_name)
                    const file = await uploadLiquidationFile(id_liquidacion, dataFile)
                }
                this.existeLiquidacion = true
            } catch (error) {
                console.error(err)
            }
        },
        async sendFormMulta() {
            try {
                const {datosPago, datosServicio, fechaActa, ...rest} = this.multaObject
                const payload = {
                    ...rest,
                    fechaActa: moment(fechaActa, "DD/MM/YYYY").format("YYYY-MM-DD"),
                    fidSolicitudTramite: this.solicitudTramiteInfo?.id_solicitud_tramite,
                    datosPagos: datosPago,
                    datosServicios: datosServicio.map(({CodigoServicio, ...rest}) => ({
                        codigoServicio: CodigoServicio,
                        ...rest
                    }))
                }
                const multa = await registerLiquidation(payload)
                const {
                    data: {id_liquidacion}
                } = multa
                if (this.adjunto_name) {
                    let dataFile = new FormData()
                    dataFile.append("ruta", this.adjunto)
                    dataFile.append("nombre_documento", this.adjunto_name)
                    const file = await uploadLiquidationFile(id_liquidacion, dataFile)
                }
                this.existeMulta = true
            } catch (error) {
                console.error(error)
            }
        },
        async actualizarMulta() {
            const promises = []
            const lengthDatosPago = this.multaObject.datosPago.length
            const datosPago = this.multaObject.datosPago[lengthDatosPago - 1]
            const depositoPayload = {
                iddeposito: this.idDeposito,
                idtipodeposito: 4,
                fechadeposito: datosPago.fechaPago,
                boleta: datosPago.nroTransaccion,
                montodepositado: parseFloat(datosPago.montoPago.replace(/,/g, "")),
                montodebitar: parseFloat(datosPago.montoPago.replace(/,/g, ""))
            }
            const liquidacionPayload = {
                ejecutado: true,
                pago: this.multaObject.pago,
                montoTotalPagado: this.multaObject.montoTotalPagado,
                fechaPago: moment(datosPago.fechaPago).format("YYYY-MM-DD")
            }
            promises.push(
                await uploadLiquidation(this.existeMultaObject.id_liquidacion, liquidacionPayload)
            )
            promises.push(await registerDeposit(depositoPayload))

            await Promise.all(promises)

            await this.sendRequestMulta()
        },
        async consumirServicio() {
            const promises = []
            //const servicios = [53, 57]
            const servicios = this.serviciosInfoArray.map((servicio) => +servicio.codigoservicio)
            const userInfo = JSON.parse(localStorage.user) || {}
            servicios.map(async (servicio) => {
                const datoServicio = this.respuestaObject.datosServicio.find(
                    (datoServicio) => datoServicio && +datoServicio.codigoServicio === servicio
                )
                const payload = {
                    nroLiquidacion: this.nroLiquidacion,
                    codigoServicio: +servicio,
                    tabla: "datosServicio",
                    idRegistro: datoServicio.id_datosservicio,
                    direccionIp: window.location.host,
                    nombreUsuario: `${userInfo?.profile?.first_name} ${userInfo?.profile?.last_name}`
                }
                promises.push(await consumeService(payload))
            })
            const lengthDatosPago = this.respuestaObject.datosPago.length
            const datosPago = this.respuestaObject.datosPago[lengthDatosPago - 1]
            const depositoPayload = {
                iddeposito: this.idDeposito,
                idtipodeposito: 4,
                idpadron: this.idpadron,
                fechadeposito: datosPago.fechaPago,
                boleta: datosPago.nroTransaccion,
                montodepositado: parseFloat(datosPago.montoPago.replace(/,/g, "")),
                montodebitar: parseFloat(datosPago.montoPago.replace(/,/g, "")),
                nroliquidacion: this.nroLiquidacion
            }
            const liquidacionPayload = {
                ejecutado: true
            }
            promises.push(
                await uploadLiquidation(this.respuestaObject.id_liquidacion, liquidacionPayload)
            )
            promises.push(await registerDeposit(depositoPayload))

            await Promise.all(promises)

            await this.sendRequest()
        },
        async liberarServicio() {
            //const servicios = [53, 57]
            const servicios = this.serviciosInfoArray.map((servicio) => +servicio.codigoservicio)
            const promises = []
            servicios.map(async (servicio) => {
                const datoServicio = this.respuestaObject.datosServicio.find(
                    (datoServicio) => datoServicio && +datoServicio.codigoServicio === servicio
                )
                const payload = {
                    nroLiquidacion: this.nroLiquidacion,
                    codigoServicio: +servicio,
                    tabla: "datosServicio",
                    idRegistro: datoServicio.id_datosservicio,
                    direccionIp: "127.0.0.1",
                    nombreUsuario: "Juan Perez"
                }
                promises.push(await releaseService(payload))
            })
            const liquidacionPayload = {
                ejecutado: false
            }
            promises.push(
                await uploadLiquidation(this.respuestaObject.id_liquidacion, liquidacionPayload)
            )
            promises.push(
                await releaseLiquidation(
                    this.nroLiquidacion,
                    this.solicitudTramiteInfo?.id_solicitud_tramite
                )
            )
            await Promise.all(promises)
            await this.sendRequest()
        },
        async liberarMulta() {
            const promises = []

            const multaPayload = {
                ejecutado: false
            }
            promises.push(
                await uploadLiquidation(this.existeMultaObject.id_liquidacion, multaPayload)
            )
            promises.push(
                await releaseMultas(
                    this.tipoParametro,
                    this.valor,
                    this.carnetIdentidad,
                    this.solicitudTramiteInfo?.id_solicitud_tramite
                )
            )
            await Promise.all(promises)
            await this.sendRequest()
        },
        currentDate() {
            const given = moment(this.respuestaObject.fechaEmision, "YYYY-MM-DD")
            const current = moment().startOf("day")
            const diff = moment.duration(current.diff(given)).asDays()
            return this.respuestaObject.fechaPago
                ? this.formatDate(this.respuestaObject.fechaPago)
                : `${diff} día(s) - Pago pendiente`
        },
        formatDate(date, format = "DD/MM/YYYY") {
            return moment(date).format(format)
        }
    },
    async beforeMount() {
        if (this.$route.query.id_solicitud_tramite) {
            const serviciosInfo = await getServicesByProcedure(
                this.$route.query.id_solicitud_tramite
            )
            this.serviciosInfoArray = serviciosInfo.map(({rubros_id}) => ({
                codigoservicio: rubros_id.codigoservicio,
                nombrerubro: rubros_id.nombrerubro
            }))
            const solicitudTramite = serviciosInfo[0].solicitud_tramite_id
            this.solicitudTramiteInfo = solicitudTramite
            if (solicitudTramite.nroliquidacion) {
                this.liquidacionVinculada = true
                this.existeLiquidacion = true
                this.nroLiquidacion = solicitudTramite.nroliquidacion
                const liquidacionInfo = await checkLiquidation(solicitudTramite.nroliquidacion)

                const res =
                    this.tab === "liquidacion"
                        ? await getLiquidacion(solicitudTramite.nroliquidacion)
                        : await getMulta(this.tipoParametro, this.valor, this.carnetIdentidad)
                if (res.finalizado && res.datos.pago) {
                    this.message = "Liquidación pagada lista para consumir"
                    this.estaPagado = true
                    const datosPago = res.datos.datosPago[res.datos.datosPago.length - 1]
                    const liquidacionPayload = {
                        pago: res.datos.pago,
                        montoTotalPagado: res.datos.montoTotalPagado,
                        fechaPago: moment(datosPago.fechaPago).format("YYYY-MM-DD")
                    }
                    await uploadLiquidation(liquidacionInfo.id_liquidacion, liquidacionPayload)
                }
                if (!res.finalizado) {
                    this.errorMessage = res.mensaje
                }
                const liquidacion = await checkLiquidation(solicitudTramite.nroliquidacion)
                const {datosServicios, datosPagos, ...rest} = liquidacion
                this.respuestaObject = {
                    ...rest,
                    datosPago: datosPagos,
                    ...res.datos,
                    datosServicio: datosServicios
                }
            }
        }
    }
}
</script>
