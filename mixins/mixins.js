import Vue from 'vue';
Vue.mixin({
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


  },
});
