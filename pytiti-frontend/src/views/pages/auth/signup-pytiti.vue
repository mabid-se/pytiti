<template>
  <div class="auth-page-wrapper pt-5 fondo_verde">
    <!-- auth page bg -->
  
    <!-- auth page content -->
    <div class="auth-page-content">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <AuthLogo title="PPADRON WEB - SENASAG" />
          </div>
        </div>
        <!-- end row -->
        <div class="row justify-content-center">
          <div class="col-md-8 col-lg-8 col-xl-8">
            <div class="card mt-4">
              <div class="card-body p-4"> 
                <div class="text-center mt-2">
                  <h5 class="text-primary">Solicitar acceso al sistema</h5>
                  <p class="text-muted">Llene sus datos correctos para solicitar de acceso al sistema</p>
                </div>

                <div class="row gy-4">
                  <div class="col-xxl-6 col-md-6">
                    <form action="">
                      <div class="mb-3">
                        <label for="placeholderInput" class="form-label">Nombre</label>
                        <input type="" class="form-control" id="placeholderInput" placeholder="Escriba su Nombre(s)">
                      </div>
                      <div class="mb-3">
                        <label for="placeholderInput" class="form-label">Apellido</label>
                        <input type="" class="form-control" id="placeholderInput" placeholder="Escriba su Apellido(s)">
                      </div>
                      <div class="mb-3">
                        <label for="placeholderInput" class="form-label">CI</label>
                        <input type="" class="form-control" id="placeholderInput" placeholder="Escriba su Cédula de identidad">
                      </div>
                      <div class="mb-3">
                        <label for="placeholderInput" class="form-label">Complemento</label>
                        <input type="" class="form-control" id="placeholderInput" placeholder="Ej. LP">
                      </div>
                      <div class="mb-3">
                        <label for="placeholderInput" class="form-label">Tel./Cel.</label>
                        <input type="" class="form-control" id="placeholderInput" placeholder="Escriba su número de teléfono">
                      </div>
                      <div class="mb-3">
                        <label for="exampleDataList" class="form-label">Ciudad de residencia</label>
                        <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Seleccione...">
                        <datalist id="datalistOptions">
                          <option value="Chuquisaca"></option>
                          <option value="Cochabamba"></option>
                          <option value="La Paz"></option>
                          <option value="Oruro"></option>
                          <option value="Pando"></option>
                          <option value="Potosí"></option>
                          <option value="Santa Cruz"></option>
                          <option value="Trinidad"></option>
                          <option value="Tarija"></option>
                        </datalist>
                      </div>
                      <div class="mb-3">
                        <label for="iconInput" class="form-label">Correo electrónico (Administrador)</label>
                        <div class="form-icon right">
                          <input type="email" class="form-control form-control-icon" id="iconInput" placeholder="nombre@empresa.com">
                          <i class="ri-mail-unread-line"></i>
                        </div>
                      </div>
                      <div class="mb-3">                                                
                        <label for="exampleInputpassword" class="form-label">Contraseña</label>
                        <div class="form-icon right">
                          <input type="password" class="form-control" id="exampleInputpassword" placeholder="Escriba una contraseña">
                          <i class="ri-account-circle-line"></i>
                        </div>
                      </div>

                    </form>
                  </div>
                  <!--end col-->
                  <div class="col-xxl-6 col-md-6">
                    <div class="mb-3">
                      <label for="iconInput" class="form-label">Correo electrónico (Empresa)</label>
                      <div class="form-icon right">
                        <input type="email" class="form-control form-control-icon" id="iconInput" placeholder="info@empresa.com">
                        <i class="ri-mail-unread-line"></i>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="formFileMultiple" class="form-label">Fotocopia de NIT</label>                                                
                      <input class="form-control" type="file" id="formFileMultiple" multiple="">
                    </div>
                    <div class="mb-3">
                      <label for="formFileMultiple" class="form-label">Poder legal</label>                                                
                      <input class="form-control" type="file" id="formFileMultiple" multiple="">
                    </div>
                  </div>
                  <!--end col-->
                  <div class="mt-4">
                    <button class="btn btn-success w-100" type="submit">Solicitar registro</button>
                  </div>
                </div>
              </div>
              <!-- end card body -->
            </div>
            <!-- end card -->
            <div class="container">
              <div class="row">
                <div class="col-6 mt-0 izquierda izquierda"><a href="senasag-terminos_de_uso.html" class="fw-semibold text-primary text-decoration-underline"> Términos de uso </a></div>
                <div class="col-6 derecha">
                  <router-link to="/login" class="fw-semibold text-primary text-decoration-underline"> Ya tengo una cuenta </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>
    <!-- end auth page content -->

    <!-- footer -->
    <FooterCentered />
    <!-- end Footer -->
  </div>
</template>

<script>
// components
import FooterCentered from "@/components/footer-centered.vue";
import AuthLogo from "@/components/pytiti/auth-logo.vue";

export default {
    name: "LoginPytiti",
    data() {
      return {
        currentYear: new Date().getFullYear(),
      }
    },
    components: {
        FooterCentered,
        AuthLogo
    }
}
</script>