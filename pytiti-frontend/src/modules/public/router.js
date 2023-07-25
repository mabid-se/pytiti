const Module = () => import("./Module.vue");
import store from "@/state/store";

const moduleRoute = {
  path: "/",
  name: "public",
  component: Module,
  children: [
    {
      path: "/cuenta/confirma-password",
      name: "cuenta-confirmacion",
      meta: {
        title: "Cuenta confirmación",
      },
      component: () => import("./views/ConfirmPassword.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/auth/LoginPytiti.vue"),
      meta: {
        title: "Login",
      },
    },
    {
      path: "/registro",
      name: "registro.cuenta",
      component: () => import("./views/SelectType.vue"),
      meta: {
        title: "Seleccione uno",
      },
    },

    {
      path: "/registro/empresa",
      name: "registro.cuenta.empresa",
      meta: {
        title: "Registro Cuenta Empresa",
      },
      component: () => import("./views/register/Empresa.vue"),
    },
    {
      path: "/registro/persona",
      name: "registro.cuenta.persona",
      meta: {
        title: "Registro Cuenta Persona",
      },
      component: () => import("./views/register/PersonaNatural.vue"),
    },
    {
      path: "/registro/tramitador",
      name: "registro.cuenta.tramitador",
      meta: {
        title: "Registro Cuenta Tramitador",
      },
      component: () => import("./views/register/Tramitador.vue"),
    },
    {
      path: "/sia/signin",
      name: "signin",
      meta: {
        title: "Login",
      },
      component: () => import("./views/SiaSignIn.vue"),
    },
    {
      path: "/sia/signin-solicitudservicios",
      name: "signin-solicitudservicios",
      meta: {
        title: "Solicitud de Servicios",
      },
      component: () => import("./views/SiaSigninSolicitudServicios.vue"),
    },
  ],
  meta: {
    beforeResolve(routeTo, routeFrom, next) {
      if (store.getters["authfack/isSenasagUser"])
        return next({ name: "senasag.default" });
      if (
        store.getters["authfack/isExternalUser"] &&
        store.getters["authfack/isCompanyUser"]
      )
        return next({ name: "empresa.default" });
      if (
        store.getters["authfack/isExternalUser"] &&
        store.getters["authfack/isProcessorUser"]
      )
        return next({ name: "tramitador.default" });
      next();
    },
  },
};

export default (router) => {
  router.addRoute(moduleRoute);
};
