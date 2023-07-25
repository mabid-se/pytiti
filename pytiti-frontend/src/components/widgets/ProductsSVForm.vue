<template>
  <div class="col-lg-12">
    <div class="card">
      <div class="card-header align-items-center d-flex-">
        <h4 class="card-title mb-2 flex-grow-1">Registro de productos</h4>
        <h5>Esta sección le permitirá agregar productos.</h5>
      </div>
      <div class="card-body">
        <div class="live-preview">
          <div class="row gy-4">
            <div class="col-sm-12 col-lg-12 col-xxl-12">
              <div>
                <h4>Datos del producto</h4>
                <div class="row" :set="(v = v$.data)">
                  <div class="col-12">
                    <p class="text-muted fw-medium">Origen:</p>
                    <div>
                      <label
                        for="pais_origen"
                        class="form-label"
                        :class="{
                          'text-danger': submitted && v.paisorigen.$error,
                        }"
                        >País origen</label
                      >

                      <MultiChoice
                        ref="nombrePaisMultiChoices"
                        :options="countries"
                        :key-value="'nombrepais'"
                        :key-title="'nombrepais'"
                        :id="'pais_origen'"
                        :name="'pais_origen'"
                        v-model="data.paisorigen"
                      ></MultiChoice>

                      <div
                        v-if="submitted && v.paisorigen.$error"
                        class="error-validation"
                      >
                        El campo es requerido
                      </div>
                    </div>
                    <div class="mt-3">
                      <label
                        for="laboratoriotitular"
                        class="form-label"
                        :class="{
                          'text-danger':
                            submitted && v.laboratoriotitular.$error,
                        }"
                        >Fabricante, Formulador</label
                      >
                      <input
                        class="form-control disable"
                        id="laboratoriotitular"
                        name="laboratoriotitular"
                        v-model="data.laboratoriotitular"
                        :class="{
                          'is-invalid':
                            submitted && v.laboratoriotitular.$error,
                        }"
                      />
                      <div
                        v-for="(item, index) in v.laboratoriotitular.$errors"
                        :key="index"
                        class="invalid-feedback"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 mt-3">
                    <p class="text-muted fw-medium">Producto:</p>
                    <div class="row">
                      <div class="col-4" v-if="!isUpdate">
                        <div class="mb-3">
                          <label
                            for="idproducto"
                            class="form-label"
                            :class="{
                              'text-danger': submitted && v.idproducto.$error,
                            }"
                            >Código</label
                          >
                          <input
                            class="form-control disable"
                            id="idproducto"
                            name="idproducto"
                            v-model="data.idproducto"
                            readonly
                            :class="{
                              'is-invalid': submitted && v.idproducto.$error,
                            }"
                          />
                          <div
                            v-for="(item, index) in v.idproducto.$errors"
                            :key="index"
                            class="invalid-feedback"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-8">
                        <div class="mb-3">
                          <label
                            for="nombrecomercial"
                            class="form-label"
                            :class="{
                              'text-danger':
                                submitted && v.nombrecomercial.$error,
                            }"
                            >Nombre comercial</label
                          >
                          <input
                            class="form-control disable"
                            id="nombrecomercial"
                            name="nombrecomercial"
                            v-model="data.nombrecomercial"
                            :class="{
                              'is-invalid':
                                submitted && v.nombrecomercial.$error,
                            }"
                          />
                          <div
                            v-for="(item, index) in v.nombrecomercial.$errors"
                            :key="index"
                            class="invalid-feedback"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="row">
                        <div>
                          <label
                            for="principioactivo"
                            class="form-label"
                            :class="{
                              'text-danger':
                                submitted && v.principioactivo.$error,
                            }"
                            >Ingrediente activo</label
                          >
                          <input
                            class="form-control disable"
                            id="principioactivo"
                            name="principioactivo"
                            :class="{
                              'is-invalid':
                                submitted && v.principioactivo.$error,
                            }"
                            v-model="data.principioactivo"
                          />

                          <div
                            v-for="(item, index) in v.principioactivo.$errors"
                            :key="index"
                            class="invalid-feedback"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-6">
                        <label
                          for="fid_clase_producto"
                          class="form-label"
                          :class="{
                            'text-danger':
                              submitted && v.fid_clase_producto.$error,
                          }"
                          >Clase</label
                        >
                        <select
                          class="form-select mb-3"
                          name="fid_clase_producto"
                          id="fid_clase_producto"
                          :class="{
                            'is-invalid':
                              submitted && v.fid_clase_producto.$error,
                          }"
                          v-model="data.fid_clase_producto"
                        >
                          <option value="" selected disabled>Seleccione</option>
                          <option
                            :value="cls.id"
                            v-for="cls in filteredClasses"
                          >
                            {{ cls.nombreclase }}
                          </option>
                        </select>
                        <div
                          v-for="(item, index) in v.fid_clase_producto.$errors"
                          :key="index"
                          class="invalid-feedback"
                        >
                          <span v-if="item.$message">{{ item.$message }}</span>
                        </div>
                      </div>
                      <div class="col-6">
                        <label
                          for="fid_tipo_producto"
                          class="form-label"
                          :class="{
                            'text-danger':
                              submitted && v.fid_tipo_producto.$error,
                          }"
                          >Tipo</label
                        >
                        <select
                          class="form-select mb-3"
                          name="fid_tipo_producto"
                          id="fid_tipo_producto"
                          :class="{
                            'is-invalid':
                              submitted && v.fid_tipo_producto.$error,
                          }"
                          v-model="data.fid_tipo_producto"
                        >
                          <option value="" selected disabled>Seleccione</option>
                          <option :value="t.id" v-for="t in filteredTypes">
                            {{ t.nombretipo }}
                          </option>
                        </select>
                        <div
                          v-for="(item, index) in v.fid_tipo_producto.$errors"
                          :key="index"
                          class="invalid-feedback"
                        >
                          <span v-if="item.$message">{{ item.$message }}</span>
                        </div>
                      </div>
                    </div>
                    <div class="mt-3">
                      <label
                        for="especiedestino"
                        class="form-label"
                        :class="{
                          'text-danger': submitted && v.especiedestino.$error,
                        }"
                        >Especie destino</label
                      >

                      <MultiChoice
                        ref="especieDestinoMultiChoices"
                        :options="especiesDestino"
                        :key-value="'valor'"
                        :key-title="'nombre'"
                        :id="'especiedestino'"
                        :name="'especiedestino'"
                        v-model="data.especiedestino"
                      ></MultiChoice>

                      <div
                        v-if="submitted && v.especiedestino.$error"
                        class="error-validation"
                      >
                        El campo es requerido
                      </div>
                    </div>

                    <div class="row">
                      <div>
                        <label
                          for="nombre"
                          class="form-label"
                          :class="{
                            'text-danger': submitted && v.presentacion.$error,
                          }"
                        >
                          Contenidos autorizados</label
                        >
                        <input
                          class="form-control disable"
                          id="nombre"
                          name="nombre"
                          v-model="data.presentacion"
                          :class="{
                            'is-invalid': submitted && v.presentacion.$error,
                          }"
                        />
                        <div
                          v-for="(item, index) in v.presentacion.$errors"
                          :key="index"
                          class="invalid-feedback"
                        >
                          <span v-if="item.$message">{{ item.$message }}</span>
                        </div>
                      </div>
                    </div>

                    <label
                      class="form-label mt-3"
                      :class="{
                        'text-danger':
                          submitted &&
                          (v.periodoalmacen.$error || v.cneto.$error),
                      }"
                      >Estabilidad de almacenamiento (Años/Meses)</label
                    >
                    <div class="row">
                      <div class="col-6">
                        <div class="mb-3">
                          <select
                            name="periodoalmacen"
                            id="periodoalmacen"
                            class="form-select mb-3"
                            :class="{
                              'is-invalid':
                                submitted && v.periodoalmacen.$error,
                            }"
                            v-model="data.periodoalmacen"
                          >
                            <option value="" selected="" disabled="">
                              Seleccione
                            </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                            <option value="32">32</option>
                            <option value="33">33</option>
                            <option value="34">34</option>
                            <option value="35">35</option>
                            <option value="36">36</option>
                            <option value="37">37</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                            <option value="43">43</option>
                            <option value="44">44</option>
                            <option value="45">45</option>
                            <option value="46">46</option>
                            <option value="47">47</option>
                            <option value="48">48</option>
                            <option value="49">49</option>
                            <option value="50">50</option>
                            <option value="51">51</option>
                            <option value="52">52</option>
                            <option value="53">53</option>
                            <option value="54">54</option>
                            <option value="55">55</option>
                            <option value="56">56</option>
                            <option value="57">57</option>
                            <option value="58">58</option>
                            <option value="59">59</option>
                          </select>
                          <div
                            v-for="(item, index) in v.periodoalmacen.$errors"
                            :key="index"
                            class="invalid-feedback"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-6">
                        <select
                          id="cneto"
                          name="cneto"
                          class="form-select mb-3"
                          :class="{
                            'is-invalid': submitted && v.cneto.$error,
                          }"
                          v-model="data.cneto"
                        >
                          <option value="" selected="" disabled="">
                            Seleccione
                          </option>
                          <option value="Meses">Meses</option>
                          <option value="Años">Años</option>
                        </select>
                        <div
                          v-for="(item, index) in v.cneto.$errors"
                          :key="index"
                          class="invalid-feedback"
                        >
                          <span v-if="item.$message">{{ item.$message }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="mb-3">
                      <label
                        for="formulaquimica"
                        class="form-label"
                        :class="{
                          'text-danger': submitted && v.formulaquimica.$error,
                        }"
                        >Composición</label
                      >
                      <textarea
                        class="form-control"
                        :class="{
                          'is-invalid': submitted && v.formulaquimica.$error,
                        }"
                        id="formulaquimica"
                        name="formulaquimica"
                        rows="3"
                        v-model="data.formulaquimica"
                      ></textarea>
                      <div
                        v-for="(item, index) in v.formulaquimica.$errors"
                        :key="index"
                        class="invalid-feedback"
                      >
                        <span v-if="item.$message">{{ item.$message }}</span>
                      </div>
                    </div>

                    <div class="row">
                      <p class="text-muted fw-medium">Toxicología:</p>
                      <div class="col-8">
                        <label
                          for="fid_formulaciones"
                          class="form-label"
                          :class="{
                            'text-danger':
                              submitted && v.fid_formulaciones.$error,
                          }"
                          >Formulación</label
                        >
                        <select
                          id="fid_formulaciones"
                          name="fid_formulaciones"
                          class="form-select mb-3"
                          :class="{
                            'is-invalid':
                              submitted && v.fid_formulaciones.$error,
                          }"
                          v-model="data.fid_formulaciones"
                        >
                          <option value="" selected disabled>Seleccione</option>
                          <option
                            :value="fq.id"
                            v-for="fq in formulacionesQuimicas"
                          >
                            {{ fq.nombreformulacion }}
                          </option>
                        </select>
                        <div
                          v-for="(item, index) in v.fid_formulaciones.$errors"
                          :key="index"
                          class="invalid-feedback"
                        >
                          <span v-if="item.$message">{{ item.$message }}</span>
                        </div>
                      </div>
                      <div class="col-4">
                        <label
                          for="clasiftoxicologica"
                          class="form-label"
                          :class="{
                            'text-danger':
                              submitted && v.clasiftoxicologica.$error,
                          }"
                          >Clasif. toxicológica</label
                        >
                        <select
                          id="clasiftoxicologica"
                          name="clasiftoxicologica"
                          class="form-select mb-3"
                          :class="{
                            'is-invalid':
                              submitted && v.clasiftoxicologica.$error,
                          }"
                          v-model="data.clasiftoxicologica"
                        >
                          <option value="" selected disabled>Seleccione</option>
                          <option value="Ia">Ia</option>
                          <option value="Ib">Ib</option>
                          <option value="II">II</option>
                          <option value="III">III</option>
                          <option value="IV">IV</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                        <div
                          v-for="(item, index) in v.clasiftoxicologica.$errors"
                          :key="index"
                          class="invalid-feedback"
                        >
                          <span v-if="item.$message">{{ item.$message }}</span>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="mb-3">
                          <label
                            for="exampleInputdate"
                            class="form-label"
                            :class="{
                              'text-danger':
                                submitted && v.limitemaximoresiduos.$error,
                            }"
                            >LMR - Exprese si es mg/kg, ppm</label
                          >
                          <input
                            class="form-control disable"
                            id="basiInput"
                            :class="{
                              'is-invalid':
                                submitted && v.limitemaximoresiduos.$error,
                            }"
                            v-model="data.limitemaximoresiduos"
                          />
                          <div
                            v-for="(item, index) in v.limitemaximoresiduos
                              .$errors"
                            :key="index"
                            class="invalid-feedback"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="mb-3">
                          <label
                            for="periodocarencia"
                            class="form-label"
                            :class="{
                              'text-danger':
                                submitted && v.periodocarencia.$error,
                            }"
                            >Período de carencia (días)</label
                          >
                          <input
                            class="form-control disable"
                            id="periodocarencia"
                            name="periodocarencia"
                            :class="{
                              'is-invalid':
                                submitted && v.periodocarencia.$error,
                            }"
                            v-model="data.periodocarencia"
                          />
                          <div
                            v-for="(item, index) in v.periodocarencia.$errors"
                            :key="index"
                            class="invalid-feedback"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="mb-3">
                          <label
                            for="dosisletalmediaoral"
                            class="form-label"
                            :class="{
                              'text-danger':
                                submitted && v.dosisletalmediaoral.$error,
                            }"
                            >DL50 Oral - mg/kg</label
                          >
                          <input
                            class="form-control disable"
                            id="dosisletalmediaoral"
                            name="dosisletalmediaoral"
                            :class="{
                              'is-invalid':
                                submitted && v.dosisletalmediaoral.$error,
                            }"
                            v-model="data.dosisletalmediaoral"
                          />
                          <div
                            v-for="(item, index) in v.dosisletalmediaoral
                              .$errors"
                            :key="index"
                            class="invalid-feedback"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="mb-3">
                          <label
                            for="dosisletalmediadermal"
                            class="form-label"
                            :class="{
                              'text-danger':
                                submitted && v.dosisletalmediadermal.$error,
                            }"
                            >DL50 Dermal - mg/kg</label
                          >
                          <input
                            class="form-control disable"
                            id="dosisletalmediadermal"
                            name="dosisletalmediadermal"
                            :class="{
                              'is-invalid':
                                submitted && v.dosisletalmediadermal.$error,
                            }"
                            v-model="data.dosisletalmediadermal"
                          />
                          <div
                            v-for="(item, index) in v.dosisletalmediadermal
                              .$errors"
                            :key="index"
                            class="invalid-feedback"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="mb-3">
                          <label
                            for="modoaccion"
                            class="form-label"
                            :class="{
                              'text-danger': submitted && v.modoaccion.$error,
                            }"
                            >Modo de acción</label
                          >
                          <input
                            class="form-control disable"
                            id="modoaccion"
                            name="modoaccion"
                            :class="{
                              'is-invalid': submitted && v.modoaccion.$error,
                            }"
                            v-model="data.modoaccion"
                          />
                          <div
                            v-for="(item, index) in v.modoaccion.$errors"
                            :key="index"
                            class="invalid-feedback"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="mb-3">
                          <label
                            for="grupoquimico"
                            class="form-label"
                            :class="{
                              'text-danger': submitted && v.grupoquimico.$error,
                            }"
                            >Grupo químico</label
                          >
                          <input
                            class="form-control disable"
                            id="grupoquimico"
                            name="grupoquimico"
                            :class="{
                              'is-invalid': submitted && v.grupoquimico.$error,
                            }"
                            v-model="data.grupoquimico"
                          />
                          <div
                            v-for="(item, index) in v.grupoquimico.$errors"
                            :key="index"
                            class="invalid-feedback"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="mb-3">
                          <label
                            for="momentoaplicacion"
                            class="form-label"
                            :class="{
                              'text-danger':
                                submitted && v.momentoaplicacion.$error,
                            }"
                            >Momento de aplicación</label
                          >
                          <input
                            class="form-control disable"
                            id="momentoaplicacion"
                            name="momentoaplicacion"
                            :class="{
                              'is-invalid':
                                submitted && v.momentoaplicacion.$error,
                            }"
                            v-model="data.momentoaplicacion"
                          />
                          <div
                            v-for="(item, index) in v.momentoaplicacion.$errors"
                            :key="index"
                            class="invalid-feedback"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="mb-3">
                          <label
                            for="observaciones"
                            class="form-label"
                            :class="{
                              'text-danger':
                                submitted && v.observaciones.$error,
                            }"
                            >Observaciones</label
                          >
                          <textarea
                            class="form-control"
                            id="observaciones"
                            name="observaciones"
                            rows="3"
                            :class="{
                              'is-invalid': submitted && v.observaciones.$error,
                            }"
                            v-model="data.observaciones"
                          ></textarea>
                          <div
                            v-for="(item, index) in v.observaciones.$errors"
                            :key="index"
                            class="invalid-feedback"
                          >
                            <span v-if="item.$message">{{
                              item.$message
                            }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 mt-3">
                <div class="derecha">
                  <button
                    type="button"
                    class="btn btn-success btn-label right"
                    @click="onSubmit"
                  >
                    <i
                      class="ri-file-edit-line label-icon align-middle fs-16 ms-2"
                    ></i>
                    {{ isUpdate ? "Editar producto" : "Agregar producto" }}
                  </button>
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
import useVuelidate from "@vuelidate/core";
import {
  required,
  helpers,
  integer,
  minLength,
  minValue,
} from "@vuelidate/validators";
import NotificationHelper from "@/helpers/notification";
import formMixin from "@/mixins/formMixin";
import MultiChoice from "@/components/widgets/MultiChoice.vue";
import {
  registerProduct,
  updateProduct,
  getProductId,
} from "@/services/ProductService";
export default {
  name: "ProductsSVForm",
  mixins: [formMixin],
  props: {
    countries: {
      type: Array,
      required: true,
    },
    classes: {
      type: Array,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
    especiesDestino: {
      type: Array,
      required: true,
    },
    formulacionesQuimicas: {
      type: Array,
      required: true,
    },
    requestProcedureId: {
      type: String,
      required: true,
    },
    initialData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: {
    MultiChoice,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  mounted() {
    this.generateProductId();
  },
  data() {
    return {
      show_pais_origin: true,
      id: null,
      clase: "",
      data: {
        paisorigen: [],
      },
      submitted: false,
    };
  },

  validations() {
    const validations = {
      data: {
        paisorigen: {
          required: helpers.withMessage("El campo es requerido", required),
          minLength: helpers.withMessage(
            "Seleccione al menos uno",
            minLength(1)
          ),
          $each: helpers.forEach({
            required,
          }),
        },
        laboratoriotitular: {
          required: helpers.withMessage("El campo es requerido", required),
        },

        idproducto: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        nombrecomercial: {
          required: helpers.withMessage("El campo es requerido", required),
        },

        fid_clase_producto: {
          required: helpers.withMessage("El campo es requerido", required),
        },

        fid_tipo_producto: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        presentacion: {
          required: helpers.withMessage("El campo es requerido", required),
        },

        especiedestino: {
          required: helpers.withMessage("El campo es requerido", required),
          minLength: helpers.withMessage(
            "Seleccione al menos uno",
            minLength(1)
          ),
          $each: helpers.forEach({
            required,
          }),
        },
        periodoalmacen: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        cneto: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        formulaquimica: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        limitemaximoresiduos: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        periodocarencia: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        dosisletalmediaoral: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        dosisletalmediadermal: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        modoaccion: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        grupoquimico: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        momentoaplicacion: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        observaciones: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        //
        fid_formulaciones: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        clasiftoxicologica: {
          required: helpers.withMessage("El campo es requerido", required),
        },
        principioactivo: {
          required: helpers.withMessage("El campo es requerido", required),
        },
      },
    };

    return validations;
  },
  methods: {
    async generateProductId() {
      const { ok, data } = await getProductId({ unidad: "SV" });
      if (!ok) NotificationHelper.error("Error al generar el código.");
      this.data.idproducto = data.idproducto;
    },
    async onSubmit() {
      this.submitted = true;
      this.v$.$touch();

      if (this.v$.$invalid) return;

      if (!this.id) {
        const { ok, data } = await registerProduct(this.requestProcedureId, {
          ...this.data,
          paisorigen: this.data.paisorigen.join(","),
          especiedestino: this.data.especiedestino.join(","),
        });
        if (!ok)
          return NotificationHelper.error("Error al registrar producto.");
        NotificationHelper.success("Producto registrado exitosamente.");
        this.resetForm();
        this.$emit("on:submitted", data);
      } else {
        const { ok, data } = await updateProduct(
          this.requestProcedureId,
          this.id,
          {
            ...this.data,
            paisorigen: this.data.paisorigen.join(","),
            especiedestino: this.data.especiedestino.join(","),
          }
        );
        if (!ok)
          return NotificationHelper.error("Error al registrar producto.");
        NotificationHelper.success("Producto actualizado exitosamente.");
        this.resetForm();
        this.$emit("on:updated", data);
      }
    },
    resetForm() {
      this.submitted = false;
      this.data.especiedestino = [];
      this.data.fid_clase_producto = "";
      this.data.fid_tipo_actividad = "";
      this.data.fid_tipo_envase = "";
      this.data.fid_tipo_producto = "";
      this.data.idproducto = "";
      this.data.laboratoriotitular = "";
      this.data.nombre = "";
      this.data.nombrecomercial = "";
      this.data.paisorigen = [];
      this.data.presentacion = "";
      this.data.principioactivo = "";
      this.data.productor = "";
      this.data.periodoalmacen = "";
      this.data.cneto = "";
      this.data.formulaquimica = "";
      this.data.fid_formulaciones = "";
      this.data.clasiftoxicologica = "";
      this.data.limitemaximoresiduos = "";
      this.data.periodocarencia = "";
      this.data.dosisletalmediaoral = "";
      this.data.dosisletalmediadermal = "";
      this.data.modoaccion = "";
      this.data.grupoquimico = "";
      this.data.momentoaplicacion = "";
      this.data.observaciones = "";
      this.data.idproducto = "";
      this.id = null;
      this.$refs.nombrePaisMultiChoices.reset();
      this.$refs.especieDestinoMultiChoices.reset();
      this.generateProductId();
    },
  },
  computed: {
    isUpdate() {
      return !!this.id;
    },
    filteredTypes() {
      return this.types
        .filter((t) => t.idclase == this.clase)
        .sort((a, b) => a.idtipo.localeCompare(b.idtipo));
    },
    filteredClasses() {
      return this.classes.filter((c) => c.unidadoperativa == "SV");
    },
  },
  watch: {
    initialData: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.data.idproducto = "";
        this.submitted = false;
        const {
          fid_clase_producto,
          fid_tipo_actividad,
          fid_tipo_envase,
          fid_tipo_producto,
          idproducto,
          laboratoriotitular,
          nombre,
          nombrecomercial,
          presentacion,
          principioactivo,
          productor,

          periodoalmacen,
          cneto,
          formulaquimica,
          fid_formulaciones,
          clasiftoxicologica,
          limitemaximoresiduos,
          periodocarencia,
          dosisletalmediaoral,
          dosisletalmediadermal,
          modoaccion,
          grupoquimico,
          momentoaplicacion,
          observaciones,
        } = newVal;
        this.data = {
          fid_clase_producto,
          fid_tipo_actividad,
          fid_tipo_envase,
          fid_tipo_producto,
          idproducto,
          laboratoriotitular,
          nombre,
          nombrecomercial,
          presentacion,
          principioactivo,
          productor,
          especiedestino: newVal.especiedestino?.split(","),
          paisorigen: newVal.paisorigen?.split(","),
          periodoalmacen,
          cneto,
          formulaquimica,
          fid_formulaciones,
          clasiftoxicologica,
          limitemaximoresiduos,
          periodocarencia,
          dosisletalmediaoral,
          dosisletalmediadermal,
          modoaccion,
          grupoquimico,
          momentoaplicacion,
          observaciones,
        };
        this.clase = this.classes.find(
          (cl) => cl.id == this.data.fid_clase_producto
        )?.idclase;
        this.id = newVal.id;

        this.$nextTick(() => {
          if (Object.keys(newVal).length > 0 && newVal.paisorigen)
            this.$refs.nombrePaisMultiChoices.setInitialData(
              newVal.paisorigen.split(",").map((p) => p) || []
            );

          if (Object.keys(newVal).length > 0 && newVal.especiedestino)
            this.$refs.especieDestinoMultiChoices.setInitialData(
              newVal.especiedestino.split(",").map((p) => p) || []
            );
        });
        this.data.idproducto = idproducto;
      },
    },
    "data.fid_clase_producto": {
      handler(newVal) {
        this.clase = this.classes.find((cl) => cl.id == newVal)?.idclase;
        this.data.fid_tipo_producto = null;
      },
    },
  },
};
</script>
