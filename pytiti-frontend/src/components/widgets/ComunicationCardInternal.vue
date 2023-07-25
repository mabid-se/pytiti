<template>
  <div class="card border card-border-light">
    <div class="card-body">
      <label
        for="labelInput"
        class="form-label text-primary"
        :class="{
          'text-primary': !classMessage,
          'text-success': classMessage,
        }"
        >{{ user }} -
        {{ formatDatetimeDMMMYYYYHHmm(communication.fecha_creacion) }}</label
      >

      <textarea
        class="form-control"
        id="exampleFormControlTextarea5"
        rows="3"
        readonly
        >{{ communication.mensaje }}</textarea
      >
      <div class="d-grid gap-2 mt-2">
        <a
          :href="doc.fid_documento.ruta_url"
          target="_blank"
          class="text-primary text-decoration-underline-"
          v-for="doc in communication.comunication_documents"
          ><i class="ri-attachment-2"></i
          >{{
            (doc.fid_documento.ruta.split("/").slice(-1)[0].length > 40
              ? "..."
              : "") + doc.fid_documento.ruta.split("/").slice(-1)[0].slice(-40)
          }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import formatDatesMixin from "@/mixins/formatDatesMixin";
import { userData } from "@/services/user";

export default {
  name: "ComunicationCardInternal",
  mixins: [formatDatesMixin],
  props: {
    communication: {
      type: Object,
      required: true,
    },
    company: {
      type: Object,
      required: true,
    },
  },
  computed: {
    classMessage() {
      return !!this.communication.user_sender;
    },
    user() {
      return `${this.communication.user_sender.username} - ${this.communication.user_sender.first_name} ${this.communication.user_sender.last_name}`;
    },
  },
};
</script>
