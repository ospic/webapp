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
      thumbnil: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairSides&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=UnibrowNatural&mouthType=Twinkle&skinColor=Light'
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
