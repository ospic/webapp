import Vue from 'vue';
import ChargesTemplate from "@/components/consultation/tabs/charges"
import PDFViewer from "@/components/PdfViewer.vue"
import { mapGetters } from "vuex";
Vue.mixin({
  components: {
    "charges-template": ChargesTemplate,
    "v-pdf": PDFViewer,

  },
  layout: 'default',
  data: function () {

    return {
      months_labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      week_labels: [
        'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
      ],
      publicPath: window.location.origin + '/lib',
      itemsperpage: 15,
      totalvisible: 7,
      delay_seconds: 2000,
      toggle_exclusive: 2,
      body: {
        options: {
          page: 1,
          itemsPerPage: 15,
          sortBy: ["name"]
        }
      },
      thumbnil: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairSides&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=UnibrowNatural&mouthType=Twinkle&skinColor=Light',
      menuoptions: {

        patients: [
          {
            title: "label.menu.appointmentandschedule",
            icon: 'mdi-rhombus-split',
            to: "/appointments",
            permissions:
              "ALL_FUNCTIONS, CREATE_PATIENT, UPDATE_PATIENT, DELETE_PATIENT, DELETE_PATIENT",
          },
          {
            title: "label.menu.patients",
            icon: 'mdi-rhombus-split',
            to: "/patients",

            permissions:
              "ALL_FUNCTIONS, CREATE_PATIENT, UPDATE_PATIENT, DELETE_PATIENT, DELETE_PATIENT",
          },
          {
            title: "label.menu.opdcenter",
            icon: 'mdi-rhombus-split',
            to: "/opd",

            permissions:
              "ALL_FUNCTIONS, CREATE_PATIENT, UPDATE_PATIENT, DELETE_PATIENT, DELETE_PATIENT",
          },
          {
            title: "label.menu.ipdcenter",
            icon: 'mdi-rhombus-split',
            to: "/ipd",
            permissions: "ALL_FUNCTIONS",
          },
        ],

        inventory: [
          {
            title: "label.titles.pharmacy",
            icon: 'mdi-rhombus-split',
            to: "/inventory/",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.titles.medicine",
            icon: 'mdi-rhombus-split',
            to: "/inventory/medicine",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.titles.bloodbank",
            icon: 'mdi-rhombus-split',
            to: "/inventory/bloods",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.titles.wards",
            icon: 'mdi-rhombus-split',
            to: "/inventory/ward",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.titles.beds",
            icon: 'mdi-rhombus-split',
            to: "/inventory/bed",
            permissions: "ALL_FUNCTIONS",
          },
        ],
        services: [
          {
            title: "label.menu.laboratory",
            icon: 'mdi-rhombus-split',
            to: "/services/laboratory",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.menu.radiology",
            icon: 'mdi-rhombus-split',
            to: "/services/radiology",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.titles.medicalservices",
            icon: 'mdi-rhombus-split',
            to: "/services",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.titles.servicecategories",
            icon: 'mdi-rhombus-split',
            to: "/services/types",
            permissions: "ALL_FUNCTIONS",
          },
        ],

        organization: [
          {
            title: "label.menu.staff",
            icon: 'mdi-rhombus-split',
            to: "/staffs",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.titles.departments",
            icon: 'mdi-rhombus-split',
            to: "/departments",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.titles.insurances",
            icon: 'mdi-rhombus-split',
            to: "/insurances",
            permissions:
              "ALL_FUNCTIONS, READ_INSURANCE_COMPANY,UPDATE_INSURANCE_COMPANY,DELETE_INSURANCE_COMPANY,CREATE_INSURANCE_COMPANY",
          },
        ],

        finance: [
          {
            title: "label.menu.dashboard",
            icon: 'mdi-rhombus-split',
            to: "/finance",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.menu.bills",
            icon: 'mdi-rhombus-split',
            to: "/finance/bills",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.menu.transactions",
            icon: 'mdi-rhombus-split',
            to: "/finance/transactions",
            permissions: "ALL_FUNCTIONS",
          },

        ],
        calendar: [
          {
            title: "label.menu.calendar",
            icon: 'mdi-rhombus-split',
            to: "/calendar",
            permissions:
              "ALL_FUNCTIONS, READ_INSURANCE_COMPANY,UPDATE_INSURANCE_COMPANY,DELETE_INSURANCE_COMPANY,CREATE_INSURANCE_COMPANY",
          },
          {
            title: "label.menu.calendarlist",
            icon: 'mdi-rhombus-split',
            to: "/calendar/list",
            permissions: "ALL_FUNCTIONS",
          },

        ],
        reports: [
          {
            title: "label.menu.allreports",
            icon: 'mdi-rhombus-split',
            to: "/reports",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.menu.financereports",
            icon: 'mdi-rhombus-split',
            to: "/finance/reports",
            permissions:
              "ALL_FUNCTIONS, READ_INSURANCE_COMPANY,UPDATE_INSURANCE_COMPANY,DELETE_INSURANCE_COMPANY,CREATE_INSURANCE_COMPANY"
          },
        ],
        settings: [
          {
            title: "label.titles.users",
            to: "/settings",
            icon: "mdi-account-settings",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.menu.selfservice",
            to: "/settings/selfservices",
            icon: "mdi-tooltip-account",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.menu.roles",
            icon: "mdi-account-cog",
            to: "/settings/roles",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.titles.sms",
            to: "/settings/sms",
            icon: "mdi-message-cog-outline",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.titles.email",
            to: "/settings/config/email",
            icon: "mdi-folder-cog-outline",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.titles.themecolor",
            to: "/settings/colors",
            icon: "mdi-invert-colors",
            permissions: "ALL_FUNCTIONS",
          },
          {
            title: "label.menu.system",
            to: "/settings/configurations",
            icon: "mdi-cog-transfer",
            permissions: "ALL_FUNCTIONS",
          }
        ]


      },
      defaultmenu: [
        {
          title: "label.menu.patients",
          icon: "mdi-account-group",
          to: "/patients",
          permissions:
            "ALL_FUNCTIONS, CREATE_PATIENT, UPDATE_PATIENT, DELETE_PATIENT, DELETE_PATIENT",
        },
        {
          title: "label.menu.inventoryandstock",
          icon: "mdi-rhombus-outline",
          permissions: "ALL_FUNCTIONS",
          to: "/inventory",
        },
        {
          title: "label.menu.medicalservices",
          icon: "mdi-square-rounded",
          to: "/services",
          permissions: "ALL_FUNCTIONS",
        },
        {
          title: "label.menu.organization",
          icon: "mdi-tooltip",
          to: "/staffs",
          permissions: "ALL_FUNCTIONS",
        },
        {
          title: "label.menu.finance",
          icon: "mdi-wallet-plus",
          to: "/finance",
          permissions:
            "ALL_FUNCTIONS, CREATE_BILL, READ_BILL,UPDATE_BILL,DELETE_BILL",
        },
        {
          title: "label.menu.calendar",
          icon: "mdi-calendar-month",
          to: "/calendar",

          permissions: "ALL_FUNCTIONS",
        },
        {
          title: "label.menu.reports",
          icon: "mdi-chart-box",
          to: "/reports",

          permissions: "ALL_FUNCTIONS",
        },
        {
          title: "label.menu.settings",
          icon: "mdi-cog",
          to: "/settings",
          permissions: "ALL_FUNCTIONS",
        },
      ],
    }
  },
  methods: {
    async fetchclientdata(id) {
      return await this.$api
        .$get(`patients/${id}/`)
        .then(response => {
          this.userdata = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    async getPatientDiagnoses(id) {
      return await this.$api.$get(`diagnoses/${id}/`)
        .then(response => {
          this.diagnoses = response.reverse();
        }).catch(error => {
          console.log(error);

        });
    },

    row_classes(item) {
      if (item.isReversed) {
        return "strikeout";
      }
    },

    hasPermission(p) {
      //console.log(this.hasAnyPermission(this.$store.getters.thisuserpermissions, p))
      return this.hasAnyPermission(this.$store.getters.thisuserpermissions, p);
    },
    formatPrice(value) {
      if (value != null) {
        return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      }
    },
    hasAnyPermission: function (source, target) {
      if (source === undefined) {
        return true;
      } else {
        var result = source.filter(function (item) { return target.indexOf(item) > -1 });
        return (result.length > 0);
      }
    },
    fetch_medical_service_types() {
      this.$store.dispatch("get_medical_service_types");
    },
    filter_medical_services: function (it) {
      this.$router.push(`/services/${it}`);
    },
    fetch_measures: function () {
      this.$store.dispatch("fetch_medicine_measurements");
    }
  },
  computed: {
    isMdAndUp() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    userinfo() {
      return this.$store.getters.userInfos;
    },
    username() {
      return this.userinfo.username;
    },
    email() {
      return this.userinfo.email;
    },
    domain() {
      return window.location.hostname === "app.ospicx.com" || "localhost";
    },
    isfinance() {
      return this.$root.context.from.name.startsWith(prefix)
    },
    filebaseUri() {
      var url = this.$api.defaults.baseURL;
      var path = url.endsWith("/") ? url.slice(0, -1) : url;
      return path;
    },
    thumbnail() {
      return this.profileimage == null ? this.thumbnil : this.filebaseUri + this.profileimage;
    },
    ...mapGetters({
      servicetypes: "servicetypes",
      measures: "medicinemeasurements",
      profileimage: "profileimage"
    }),


  },
});
