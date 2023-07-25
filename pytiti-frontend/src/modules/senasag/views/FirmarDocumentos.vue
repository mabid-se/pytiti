<template>
  <PageHeader :title="title" :items="items" />
  <div class="row margen-contenido">
    <div class="col-lg col-xxl">
      <div class="card">
        <div class="card-body">
          <div class="live-preview">
            <div class="table-responsive table-card">
              <KTable
                url="admin/firmas-digitales/"
                :current-limit="5"
                :query-params="queryParams"
                ref="tableTest"
              >
                <template v-slot:title>
                  <h4 class="card-title mb-0 flex-grow-1">
                    {{ items[1].text }}
                  </h4>
                </template>
                <template v-slot:filters>
                  <label class="form-label col-auto fw-bold"
                    >Filtrar trámites en curso por:</label
                  >
                  <div class="col-md-3">
                    <input
                      type="text"
                      id="name"
                      class="form-control"
                      v-model="search"
                    />
                  </div>
                  <label class="form-label col-auto fw-bold"> Estado: </label>
                  <div class="col-md-3">
                    <select
                      name="estado"
                      id="estado"
                      class="form-select"
                      v-model="status"
                    >
                      <option value="" selected>MOSTRAR TODO</option>
                      <option value="APROBADO">APROBADO</option>
                      <option value="ENVIADO">ENVIADO</option>
                      <option value="RECHAZADO">RECHAZADO</option>
                      <option value="INSPECCION">INSPECCION</option>
                    </select>
                  </div>

                  <hr />
                </template>
                <template v-slot:thead>
                  <tr>
                    <th
                      scope="col"
                      v-for="(item, index) in columns"
                      :key="index"
                    >
                      <div class="d-flex justify-content-between">
                        {{ item.label
                        }}<i
                          v-if="item.showOrderIcon"
                          @click="ordering = item.orderKey"
                          class="las la-sort la-lg my-auto pointer"
                        ></i>
                      </div>
                    </th>
                  </tr>
                </template>
                <template v-slot:row="{ item }">
                  <tr>
                    <td>{{ formatDateDMYYYYHHmm(item.field_fecha_creacion) }}</td>
                    <td>{{ item.solicitud_tramite.fid_empresa.razon_social }}</td>
                    <td>{{ item.solicitud_tramite.fid_tramite.descripcion }}</td>
                    <td>{{ item.solicitud_tramite.fid_tramite.objetivo }}</td>
                    <td>
                      <span
                        class="fw-normal fs-9"
                        :class="stateClassAccount(item)"
                      >
                        <i
                          :class="stateIconAccount(item) + ' fs-9 align-middle'"
                        ></i>
                        {{ item.firmado ? "FIRMADO":"SIN FIRMA"  }}
                      </span>
                    </td>
                    <td>
                      <div class="list-grid-nav hstack gap-1">
                        <a
                          class="btn btn-info btn-label right"
                          id="dropdownMenuLink1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          data-v-3b9a351b=""
                        >
                          <div class="d-flex">
                            <div class="flex-shrink-0">
                              <i
                                class="bx bxs-chevron-down label-icon align-middle fs-16 ms-2"
                              ></i>
                            </div>
                            <div class="flex-grow-1">Opciones</div>
                          </div>
                        </a>
                        <ul
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuLink1"
                          data-popper-placement="bottom-start"
                        >
                          <li
                          >
                            <a
                                  :href="printPdf(item.solicitud_tramite.id_solicitud_tramite)"
                                  class="dropdown-item"
                                  v-if="!!item.pdf_url"
                                  target="_blank"
                                >
                              Ver certificado
                            </a>
                          </li>
                          <li
                          >
                            <!-- <router-link
                              class="dropdown-item"
                              :to="{
                                name: 'senasag.detalle.tramites.llenados',
                                params: {
                                  id_solicitud_tramite:
                                    item.solicitud_tramite.id_solicitud_tramite,
                                },
                              }"
                              v-b-tooltip.hover
                            >
                              Firmar
                            </router-link> -->
                            <a class="dropdown-item" v-if="!!item.pdf && !item.firmado" @click="startToSign(item.solicitud_tramite.id_solicitud_tramite,item.id,item.pdf)">Firmar</a>
                            <a class="dropdown-item" id="firmaError" style="display: none;" href="#" data-bs-toggle="modal" data-bs-target=".bs-example-modal-center-err">Firmar (error)</a>
                            <a class="dropdown-item" id="firmaModal" href="#" data-bs-toggle="modal" style="display: none;" data-bs-target=".bs-example-modal-center">Firmar (correcto)</a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </template>
              </KTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade bs-example-modal-center-err" id="modalError" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-body text-center p-5">                                        
                                        <div class="mt-4">
                                            <h4 class="mb-3">Error!</h4>
                                            <p class="text-muted- mb-4">{{modalErrorMessage}}</p>
                                            <!-- <p class="text-muted- mb-4"> Este usuario no tiene permiso para firmar digitalmente.</p>
                                            <p class="text-muted- mb-4"> El sistema JACOBITUS no está habilitado en este equipo.</p>      -->                                       
                                            <div class="hstack gap-2 justify-content-center">
                                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>                                                
                                            </div>
                                        </div>
                                    </div>
                                </div><!-- /.modal-content -->
                            </div><!-- /.modal-dialog -->
                        </div><!-- /.modal -->

                        <div class="modal fade bs-example-modal-center" id="modalSign" tabindex="-1" aria-labelledby="exampleModalgridLabel" aria-modal="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" id="modalSignCerrar"></button>
                                    </div>
                                    <div class="modal-body">
                                            <div class="row g-3">
                                                <div>
                                                    <h4>Ingrese los datos de su firma</h4>
                                                </div>                
                                                <div class="col-12">
                                                    <div>
                                                        <label for="passwordInput" class="form-label">Password</label>
                                                        <input type="password" class="form-control" 
                                                        v-model="tokenPassword"
                                                        >
                                                    </div>
                                                </div><!--end col-->                                                                                                                                                   
                                                <div class="col-12">
                                                    <div>
                                                        
                                                    </div>
                                                </div><!--end col-->
                                                <div class="col-12">
                                                    <div class="hstack gap-2 justify-content-end">
                                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                                                        <button @click="sendPdf" class="btn btn-success">Firmar</button>
                                                    </div>
                                                </div><!--end col-->
                                            </div><!--end row-->
                                    </div>
                                </div>
                            </div>
                        </div>

  <DeleteConfirmationModal
    @send-confirmation="confirmDelete"
    :attrs="deleteData"
  />
  <ApproveConfirmationModal
    @send-confirmation="confirmApprove"
    :attrs="approveData"
  />
</template>

<script>
// components
import PageHeader from "@/components/page-header";
import DeleteConfirmationModal from "@/components/pytiti/delete-confirmation-modal.vue";
import ApproveConfirmationModal from "@/components/pytiti/approve-confirmation-modal.vue";
import KTable from "@/components/widgets/table";
import formatDatesMixin from "@/mixins/formatDatesMixin";
// services
import { approveEnterpriseAccout } from "@/services/cuentas";
import { getUserType } from "@/services/user";
import moment from "moment";
import {
    checkProgramStatus,
    getTokenData,
    getTokenConnected,
    signPdf,
    sendPdfSigned,
    checkTokenValidacion
} from "@/modules/senasag/services/firmaDigitalService"
import NotificationHelper from "@/helpers/notification"
export default {
  name: "ListaTramitesAdmin",
  order: 5,
  mixins: [formatDatesMixin],
  components: {
    PageHeader,
    KTable,
    //
    DeleteConfirmationModal,
    ApproveConfirmationModal,
  },
  data() {
    return {
      pdfPrueba:``,
      title: "Listado de Todos los Trámites para firmar",
      items: [
        {
          text: "Trámites",
          href: "/",
        },
        {
          text: "Lista Todos los Trámites para firmar",
          active: true,
        },
      ],
      // vue-good-table
      columns: [
        {
          label: "Fecha Inicio",
          field: this.dateFormat,
          orderKey: "solicitud_tramite.iniciotramite",
          showOrderIcon: true,
        },
        {
          label: "Empresa",
          field: "solicitud_tramite.fid_empresa.razonsocial",
          orderKey: "",
          showOrderIcon: false,
        },
        {
          label: "Nombre Trámite",
          field: "fid_empresa.razonsocial",
          orderKey: "solicitud_tramite.fid_tramite__titulo",
          showOrderIcon: true,
        },
        {
          label: "Objetivo",
          field: "fid_empresa.descripcionactividad",
          orderKey: "solicitud_tramite.fid_tramite__objetivo",
          showOrderIcon: true,
        },
        {
          label: "Estado",
          field: "",
          orderKey: "",
          showOrderIcon: true,
        },
        {
          label: "Acciones",
          field: "solicitud_tramite.fid_empresa",
          showOrderIcon: false,
        },
      ],
      userType: getUserType(),
      rows: [],
      // modal-data
      deleteData: {
        id: "deleteRecordModal",
        title: "¿Estás seguro?",
        message: "Está seguro de eliminar este registro",
        buttonText: "Si, eliminar registro",
      },
      approveData: {
        id: "approveRecordModal",
        title: "Atención",
        message:
          "Esta a punto de ACEPTAR esta solicitud. Debe estar seguro de haber revisado los documentos ¿Desea confirmar?",
        buttonText: "Aceptar",
      },
      //
      selectedRequest: undefined,
      search: "",
      ordering: "-iniciotramite",
      status: "",
      modalErrorMessage:"",
      tokenInfo:{},
      tokenConnectedInfo:{},
      tokenPassword:null,
      tramiteSeleccionado:null
    };
  },
  methods: {
     printPdf(solicitud_tramite){
      const host = process.env.VUE_APP_PROD_URL;
      return `${host}api/v1/admin/solicitud-tramite/${
        solicitud_tramite
      }/ver-original/?`;
    },
    stateClassAccount({ estado }) {
      return this.$store.getters["tipoCuenta/claseTipoCuenta"](estado);
    },
    stateIconAccount({ estado }) {
      return this.$store.getters["tipoCuenta/iconoTipoCuenta"](estado);
    },
    contactColumn(data) {
      return `${data.fid_empresa.correoe}<br/>T. ${data.fid_empresa.telefonos}`;
    },
    dateFormat(data) {
      let date = new Date(data.iniciotramite);
      return date.toLocaleDateString();
    },
    // events
    approveCompany() {
      approveEnterpriseAccout(this.selectedRequest).then(
        (res) => {
          if (res) {
            this.isReady = false;
            setTimeout(() => {
              this.isReady = true;
            }, 1000);
          }
        },
        (err) => {
          console.error(err);
        }
      );
    },
    selectProcedure({ id_solicitud_cuenta }) {
      this.selectedRequest = id_solicitud_cuenta;
    },
    // emitted-events
    confirmApprove({ sent }) {
      if (sent === true) {
        this.approveCompany();
      }
    },
    confirmDelete(data) {
      console.log(data);
    },
    async startToSign(id_solicitud_tramite,id_firma_digital,pdf){
      this.modalErrorMessage=""
      this.tramiteSeleccionado=null
      this.tramiteSeleccionado={id_solicitud_tramite,id_firma_digital,pdf}
      const checkProgram= await checkProgramStatus()
      if(!checkProgram.ok && checkProgram.errors.status===503){
        this.modalErrorMessage="El sistema JACOBITUS no está habilitado en este equipo."
        document.getElementById("firmaError").click();
        return
      }
      const tokenConnected = await getTokenConnected()
      console.log("tokenConnected-->",tokenConnected)
      if(!tokenConnected?.data?.data?.connected){
        this.modalErrorMessage="No se detecto nigun token conectado"
        document.getElementById("firmaError").click();
        return
      }
      this.tokenInfo.slot=tokenConnected.data.data.tokens[0].slot
      document.getElementById("firmaModal").click();
    },
    async sendPdf(){
      if(!this.tokenPassword){
        alert("Ingrese su contraseña.")
        return
      }
      const tokenDataPayload = {
        "slot":this.tokenInfo.slot,
        "pin":this.tokenPassword
      }
      const tokenData = await getTokenData(tokenDataPayload)
      console.log("tokenData-->>>",tokenData)

      if(!tokenData.data.finished){
        alert(tokenData.data.message)
        return
      }
      const adsibCertificate = tokenData.data.data.data_token.data.find(info=>info.adsib && info.validez && moment().isBetween(info.validez?.desde,info.validez?.hasta) ) 
      if(!adsibCertificate){
        alert("El certificado no es valido.")
        return
      }
      this.tokenInfo.alias=adsibCertificate.alias
      const localStorageUser = JSON.parse(localStorage.getItem("user"))
      const checkTokenValidation = await checkTokenValidacion({
        "tokenAlias":this.tokenInfo.alias,
        "ci":localStorageUser.sia.nro_ci,
        "unidad":localStorageUser.sia.area,
        "login":localStorageUser.profile.username
      })
      if(!checkTokenValidation.data.finished){
        alert(`${checkTokenValidation.data.message}`)
        return
      }
      this.tokenInfo.pin=this.tokenPassword
      this.tokenInfo.pdf=this.tramiteSeleccionado.pdf
      const signPdfInfo = await signPdf(this.tokenInfo)
      if(!signPdfInfo.data.finished){
        NotificationHelper.error("Ocurrio un error al firmar el documento.")
        document.getElementById("modalSignCerrar").click()
        return
      }
      if(signPdfInfo.data.finished){
        const {id_solicitud_tramite,id_firma_digital}=this.tramiteSeleccionado
        const payload={
          pdf:signPdfInfo.data.data.pdf_firmado
        }
        const pdfSigned = await sendPdfSigned(id_solicitud_tramite,id_firma_digital,payload)
        if(pdfSigned.status_code===400){
          this.modalErrorMessage=pdfSigned.errors.errors.firmado[0]
          document.getElementById("modalSignCerrar").click()
          document.getElementById("firmaError").click();
          return
        }
        NotificationHelper.success("Se firmo el documento correctamente.")
        document.getElementById("modalSignCerrar").click()
        this.$refs.tableTest.fetchData()
      }

    },
    closeModal(){
      const backdrop = document.querySelector('.modal-backdrop.fade.show');
      // Remove the `modal-open` class from the body
      document.body.classList.remove('modal-open');
      // Re-hide the modal from screen readers
      
      // Remove the `show` class from the backdrop
      backdrop.classList.remove('show');
      // Remove the `show` class from the modal 
      
      // Change the modal `display` style to `none`
      
      // Remove the backdrop div from the body
      backdrop.remove();
      document.body.style.overflow=null
      document.body.style.paddingRight=null
    }
  },
  computed: {
    queryParams() {
      return {
        search: this.search,
        ordering: this.ordering,
        estado: this.status,
      };
    },
   
  },
  mounted() {
    //
  },
};
</script>

<style scoped>
.card-border-grey {
  border: 2px solid #e1e1e1;
}

.card-border-bottom-grey {
  border-bottom: 2px solid #e1e1e1;
}
</style>
