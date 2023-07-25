<script>
import "flatpickr/dist/flatpickr.css";

import PageHeader from "@/components/page-header";

export default {
  name: "DefaultSia",
  components: {
    PageHeader,
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: "Dashboards",
          href: "/",
        },
        {
          text: "Dashboard",
          active: true,
        },
      ],
      date: null,
      config: {
        mode: "range",
      },
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        labels: ["Direct", "Social", "Email", "Other", "Referrals"],
        chart: {
          height: 333,
          type: "donut",
        },
        legend: {
          position: "bottom",
        },
        stroke: {
          show: false,
        },
        dataLabels: {
          dropShadow: {
            enabled: false,
          },
        },
        colors: ["#405189", "#0AB39C", "#F7B84B", "#F06548", "#299CDB"],
      },
      //
      profile: {
        personName: undefined,
      },
    };
  },
  methods: {
    rightcolumn() {
      if (
        document
          .querySelector(".layout-rightside-col")
          .classList.contains("d-none")
      ) {
        document
          .querySelector(".layout-rightside-col")
          .classList.remove("d-none");
      } else {
        document.querySelector(".layout-rightside-col").classList.add("d-none");
      }
    },
  },
  mounted() {
    let { first_name } = this.$store.state.authfack.user.profile;
    this.profile.personName = first_name;
  },
};
</script>

<template>
  <PageHeader :title="title" :items="items" />
  <div class="row">
    <div class="col">
      <div class="h-100">
        <div class="row mb-3 pb-1">
          <div class="col-12">
            <div class="d-flex align-items-lg-center flex-lg-row flex-column">
              <div class="flex-grow-1">
                <h4 class="fs-16 mb-1">¡Buen día {{ profile.personName }}!</h4>
                <p class="text-muted mb-0">
                  <!-- add some text here -->
                </p>
              </div>
            </div>
            <!-- end card header -->
          </div>
          <!--end col-->
        </div>
        <!-- end row-->
      </div>
      <!-- end .h-100-->
    </div>
    <!-- end col -->
  </div>
</template>
