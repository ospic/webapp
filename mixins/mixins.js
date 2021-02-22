import Vue from 'vue';
import ChargesTemplate from "@/components/profile/tabs/charges"
Vue.mixin({
  components: {
    "charges-template": ChargesTemplate
  },
  layout: (context) => context.from.name.startsWith('finance-') ? 'finance' : 'default',
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
      itemsperpage: 15,
      body: {
        options: {
          page: 1,
          itemsPerPage: 15,
          sortBy: ["name"]
        }
      },
      thumbnail: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairSides&accessoriesType=Prescription02&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=UnibrowNatural&mouthType=Twinkle&skinColor=Light'
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
    hasRole(r) {
      return this.$store.getters.thisuserroles.includes(r);
    },
    hasPermission(p) {
      return this.$store.getters.thisuserpermissions.includes(p);
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
      return window.location.hostname === "app.ospicx.com";
    },
    isfinance() {
      return this.$root.context.from.name.startsWith(prefix)
    }

  },
});
