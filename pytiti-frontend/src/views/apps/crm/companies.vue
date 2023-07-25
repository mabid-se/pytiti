<script>
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

import Layout from "../../../layouts/main.vue";
import PageHeader from "@/components/page-header";
import appConfig from "../../../../app.config";

import Lottie from "@/components/widgets/lottie.vue";
import animationData from "@/components/widgets/msoeawqm.json";

import animationData1 from "@/components/widgets/gsqxdxog.json";

export default {
  page: {
    title: "Contacts",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
    lottie: Lottie,
    Multiselect,
  },
  data() {
    return {
      title: "Contacts",
      items: [
        {
          text: "CRM",
          href: "/",
        },
        {
          text: "Contacts",
          active: true,
        },
      ],
      value: null,
      page: 1,
      perPage: 8,
      pages: [],
      searchQuery: null,
      companies: [
        {
          id: 1,
          compnayId: "#VZ001",
          img: require("@/assets/images/brands/dribbble.png"),
          companyName: "Nesta Technologies",
          owner: "Tonya Noble",
          industryType: "Computer Industry",
          rating: "4.5",
          location: "Los Angeles, USA",
        },
        {
          id: 2,
          compnayId: "#VZ002",
          img: require("@/assets/images/brands/bitbucket.png"),
          companyName: "iTest Factory",
          owner: "Thomas Taylor",
          industryType: "Chemical Industries",
          rating: "3.8",
          location: "Berlin, Germany",
        },
        {
          id: 3,
          compnayId: "#VZ003",
          img: require("@/assets/images/companies/img-8.png"),
          companyName: "Force Medicines",
          owner: "Glen Matney",
          industryType: "Health Services",
          rating: "4.1",
          location: "Phoenix, USA",
        },
        {
          id: 4,
          compnayId: "#VZ004",
          img: require("@/assets/images/companies/img-1.png"),
          companyName: "Digitech Galaxy",
          owner: "Alexis Clarke",
          industryType: "Telecommunications Services",
          rating: "3.2",
          location: "Bogota, Colombia",
        },
        {
          id: 5,
          compnayId: "#VZ005",
          img: require("@/assets/images/companies/img-6.png"),
          companyName: "Zoetic Fashion",
          owner: "James Price",
          industryType: "Textiles: Clothing, Footwear",
          rating: "4.4",
          location: "Brasilia, Brazil",
        },
        {
          id: 6,
          compnayId: "#VZ006",
          img: require("@/assets/images/brands/dropbox.png"),
          companyName: "Micro Design",
          owner: "Mary Cousar",
          industryType: "Financial Services",
          rating: "2.7",
          location: "Windhoek, Namibia",
        },
        {
          id: 7,
          compnayId: "#VZ007",
          img: require("@/assets/images/brands/mail_chimp.png"),
          companyName: "Syntyce Solutions",
          owner: "Michael Morris",
          industryType: "Chemical Industries",
          rating: "4.0",
          location: "Damascus, Syria",
        },
        {
          id: 8,
          compnayId: "#VZ008",
          img: require("@/assets/images/companies/img-3.png"),
          companyName: "Meta4Systems",
          owner: "Nancy Martino",
          industryType: "Computer Industry",
          rating: "3.3",
          location: "London, UK",
        },
        {
          id: 9,
          compnayId: "#VZ009",
          img: require("@/assets/images/companies/img-4.png"),
          companyName: "Moetic Fashion",
          owner: "Timothy Smith",
          industryType: "Textiles: Clothing, Footwear",
          rating: "4.9",
          location: "Damascus, Syria",
        },
        {
          id: 10,
          compnayId: "#VZ0010",
          img: require("@/assets/images/brands/slack.png"),
          companyName: "Syntyce Solutions",
          owner: "Herbert Stokes",
          industryType: "Health Services",
          rating: "2.9",
          location: "Berlin, Germany",
        },
      ],
      defaultOptions: { animationData: animationData },
      defaultOptions1: { animationData: animationData1 },
    };
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.companies);
    },
    resultQuery() {
      if (this.searchQuery) {
        const search = this.searchQuery.toLowerCase();
        return this.displayedPosts.filter((data) => {
          return (
            data.compnayId.toLowerCase().includes(search) ||
            data.companyName.toLowerCase().includes(search) ||
            data.owner.toLowerCase().includes(search) ||
            data.industryType.toLowerCase().includes(search) ||
            data.rating.toLowerCase().includes(search) ||
            data.location.toLowerCase().includes(search)
          );
        });
      } else {
        return this.displayedPosts;
      }
    },
  },
  watch: {
    companies() {
      this.setPages();
    },
  },
  created() {
    this.setPages();
  },
  filters: {
    trimWords(value) {
      return value.split(" ").splice(0, 20).join(" ") + "...";
    },
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.companies.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(companies) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return companies.slice(from, to);
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <div class="d-flex align-items-center flex-wrap gap-2">
              <div class="flex-grow-1">
                <button
                  class="btn btn-info add-btn"
                
                >
                  <i class="ri-add-fill me-1 align-bottom"></i> Add Company
                </button>
              </div>
              <div class="flex-shrink-0">
                <div class="hstack text-nowrap gap-2">
                  <button
                    class="btn btn-danger"
                  >
                    <i class="ri-filter-2-line me-1 align-bottom"></i> Filters
                  </button>
                  <button class="btn btn-soft-success">Import</button>
                  <button
                    type="button"
                    id="dropdownMenuLink1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    class="btn btn-soft-info"
                  >
                    <i class="ri-more-2-fill"></i>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                    <li><a class="dropdown-item" href="#">All</a></li>
                    <li><a class="dropdown-item" href="#">Last Week</a></li>
                    <li><a class="dropdown-item" href="#">Last Month</a></li>
                    <li><a class="dropdown-item" href="#">Last Year</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end col-->
      <div class="col-xxl-9">
        <div class="card" id="companyList">
          <div class="card-header">
            <div class="row g-2">
              <div class="col-md-3">
                <div class="search-box">
                  <input
                    type="text"
                    class="form-control search"
                    placeholder="Search for company..."
                  />
                  <i class="ri-search-line search-icon"></i>
                </div>
              </div>
              <div class="col-md-auto ms-auto">
                <div class="d-flex align-items-center gap-2">
                  <span class="text-muted flex-shrink-0">Sort by: </span>

                  <Multiselect
                    class="form-control"
                    style="width:150px;"
                    v-model="value"
                    :close-on-select="true"
                    :searchable="true"
                    :create-option="true"
                    :options="[
                      { value: 'Owner', label: 'Owner' },
                      { value: 'Company', label: 'Company' },
                      { value: 'location', label: 'Location' },
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <div class="table-responsive table-card mb-3">
                <table
                  class="table align-middle table-nowrap mb-0"
                  id="customerTable"
                >
                  <thead class="table-light">
                    <tr>
                      <th scope="col" style="width: 50px">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="checkAll"
                            value="option"
                          />
                        </div>
                      </th>
                      <th class="sort" data-sort="name" scope="col">
                        Company Name
                      </th>
                      <th class="sort" data-sort="owner" scope="col">Owner</th>
                      <th class="sort" data-sort="industry_type" scope="col">
                        Industry Type
                      </th>
                      <th class="sort" data-sort="star_value" scope="col">
                        Rating
                      </th>
                      <th class="sort" data-sort="location" scope="col">
                        Location
                      </th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody class="list form-check-all">
                    <tr v-for="(data, index) of companies" :key="index">
                      <th scope="row">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="checkAll"
                            value="option1"
                          />
                        </div>
                      </th>
                      <td class="id" style="display: none">
                        <a
                          href="javascript:void(0);"
                          class="fw-medium link-primary"
                          >{{ data.id }}</a
                        >
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div class="flex-shrink-0">
                            <img
                              :src="data.img"
                              alt=""
                              class="avatar-xxs rounded-circle"
                            />
                          </div>
                          <div class="flex-grow-1 ms-2 name">
                            {{ data.companyName }}
                          </div>
                        </div>
                      </td>
                      <td class="owner">{{ data.owner }}</td>
                      <td class="industry_type">{{ data.industryType }}</td>
                      <td>
                        <span class="star_value">{{ data.rating }}</span>
                        <i class="ri-star-fill text-warning align-bottom"></i>
                      </td>
                      <td class="location">{{ data.location }}</td>
                      <td>
                        <ul class="list-inline hstack gap-2 mb-0">
                          <li
                            class="list-inline-item edit"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="top"
                            title="Call"
                          >
                            <a
                              href="javascript:void(0);"
                              class="text-muted d-inline-block"
                            >
                              <i class="ri-phone-line fs-16"></i>
                            </a>
                          </li>
                          <li
                            class="list-inline-item edit"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="top"
                            title="Message"
                          >
                            <a
                              href="javascript:void(0);"
                              class="text-muted d-inline-block"
                            >
                              <i class="ri-question-answer-line fs-16"></i>
                            </a>
                          </li>
                          <li
                            class="list-inline-item"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="top"
                            title="View"
                          >
                            <a href="javascript:void(0);"
                              ><i
                                class="ri-eye-fill align-bottom text-muted"
                              ></i
                            ></a>
                          </li>
                          <li
                            class="list-inline-item"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="top"
                            title="Edit"
                          >
                            <a
                              class="edit-item-btn"
                              ><i
                                class="ri-pencil-fill align-bottom text-muted"
                              ></i
                            ></a>
                          </li>
                          <li
                            class="list-inline-item"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="top"
                            title="Delete"
                          >
                            <a
                              class="remove-item-btn"
                            >
                              <i
                                class="ri-delete-bin-fill align-bottom text-muted"
                              ></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="noresult" style="display: none">
                  <div class="text-center">
                    <lottie
                      class="avatar-xl"
                      colors="primary:#121331,secondary:#08a88a"
                      :options="defaultOptions"
                      :height="75"
                      :width="75"
                    />
                    <h5 class="mt-2">Sorry! No Result Found</h5>
                    <p class="text-muted mb-0">
                      We've searched more than 150+ Orders We did not find any
                      orders for you search.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-end mt-3">
              <div class="pagination-wrap hstack gap-2">
                <a
                  class="page-item pagination-prev disabled"
                  href="#"
                  v-if="page != 1"
                  @click="page--"
                >
                  Previous
                </a>
                <ul class="pagination listjs-pagination mb-0">
                  <li
                     :class="{
                              active: pageNumber == page,
                              disabled: pageNumber == '...',
                            }"
                    v-for="(pageNumber, index) in pages.slice(
                      page - 1,
                      page + 5
                    )"
                    :key="index"
                    @click="page = pageNumber"
                  >
                    <a class="page" href="#">{{ pageNumber }}</a>
                  </li>
                </ul>
                <a
                  class="page-item pagination-next"
                  href="#"
                  @click="page++"
                  v-if="page < pages.length"
                >
                  Next
                </a>
              </div>
            </div>
           
          </div>
        </div>
        <!--end card-->
      </div>
      <!--end col-->
      <div class="col-xxl-3">
        <div class="card">
          <div class="card-body text-center">
            <div class="position-relative d-inline-block">
              <div class="avatar-md">
                <div class="avatar-title bg-light rounded-circle">
                  <img
                    src="@/assets/images/brands/mail_chimp.png"
                    alt=""
                    class="avatar-xs"
                  />
                </div>
              </div>
            </div>
            <h5 class="mt-3 mb-1">Syntyce Solution</h5>
            <p class="text-muted">Michael Morris</p>

            <ul class="list-inline mb-0">
              <li class="list-inline-item avatar-xs">
                <a
                  href="javascript:void(0);"
                  class="avatar-title bg-soft-success text-success fs-15 rounded"
                >
                  <i class="ri-global-line"></i>
                </a>
              </li>
              <li class="list-inline-item avatar-xs">
                <a
                  href="javascript:void(0);"
                  class="avatar-title bg-soft-danger text-danger fs-15 rounded"
                >
                  <i class="ri-mail-line"></i>
                </a>
              </li>
              <li class="list-inline-item avatar-xs">
                <a
                  href="javascript:void(0);"
                  class="avatar-title bg-soft-warning text-warning fs-15 rounded"
                >
                  <i class="ri-question-answer-line"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <h6 class="text-muted text-uppercase fw-semibold mb-3">
              Information
            </h6>
            <p class="text-muted mb-4">
              A company incurs fixed and variable costs such as the purchase of
              raw materials, salaries and overhead, as explained by
              AccountingTools, Inc. Business owners have the discretion to
              determine the actions.
            </p>
            <div class="table-responsive table-card">
              <table class="table table-borderless mb-0">
                <tbody>
                  <tr>
                    <td class="fw-medium" scope="row">Industry Type</td>
                    <td>Chemical Industries</td>
                  </tr>
                  <tr>
                    <td class="fw-medium" scope="row">Location</td>
                    <td>Damascus, Syria</td>
                  </tr>
                  <tr>
                    <td class="fw-medium" scope="row">Employee</td>
                    <td>10-50</td>
                  </tr>
                  <tr>
                    <td class="fw-medium" scope="row">Rating</td>
                    <td>
                      4.0 <i class="ri-star-fill text-warning align-bottom"></i>
                    </td>
                  </tr>
                  <tr>
                    <td class="fw-medium" scope="row">Website</td>
                    <td>
                      <a
                        href="javascript:void(0);"
                        class="link-primary text-decoration-underline"
                        >www.syntycesolution.com</a
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="fw-medium" scope="row">Contact Email</td>
                    <td>info@syntycesolution.com</td>
                  </tr>
                  <tr>
                    <td class="fw-medium" scope="row">Since</td>
                    <td>1995</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!--end card-->
      </div>
      <!--end col-->
    </div>
    <!--end row-->
  </Layout>
</template>
