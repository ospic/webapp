<template>
  <div>
    <v-container>
      <p
        class="pa-5 mt-10 text-h3 font-weight-medium text-uppercase text-center"
      >
        Made By Us
      </p>
      <div class="d-flex justify-center mb-5">
        <v-btn-toggle v-model="text" tile color="orange accent-3" group>
          <v-btn @click="filterData(website)" value="left">Design</v-btn>
          <v-btn @click="filterData(design)" value="center">Website</v-btn>
          <v-btn @click="filterData(mobile)" value="right">Mobile App</v-btn>
        </v-btn-toggle>
      </div>

      <v-row>
        <v-col
          cols="12"
          sm="12"
          md="4"
          lg="3"
          v-for="(service, index) in services"
          :key="index"
        >
          <v-card class="mx-auto" max-width="344">
            <v-img :src="service.image" height="250px"></v-img>
            <p class="text-h5 text-center font-weight-bold mt-5">
              {{ service.title }}
            </p>
            <div class="d-flex justify-center">
              <v-btn color="orange white--text mb-5">View Live</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  metaInfo: {},
  data() {
    return {
      website: "website",
      design: "design",
      mobile: "mobile",
      text: "center",
      icon: "justify",
      toggle_none: null,
      toggle_one: 0,
      toggle_exclusive: 2,
      toggle_multiple: [0, 1, 2],
      show: false,
      filtered: [],
      serviceslist: [
        {
          title: "Online Store",
          type: "website",
          image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
          color: "blue--text",
          number: "01"
        },
        {
          title: "Website Development",
          type: "design",
          icon: "mdi-web",
          color: "purple--text",
          number: "02"
        },
        {
          title: "UI/UX Design",
          type: "website",
          icon: "mdi-material-design",
          color: "red--text",
          number: "03"
        },
        {
          title: "Cloud & DevOps",
          type: "mobile",
          icon: "mdi-cloud-tags",
          color: "green--text",
          number: "04"
        },
        {
          title: "Analytic Solutions",
          type: "mobile",
          icon: "mdi-chart-bar-stacked",
          color: "orange--text",
          number: "05"
        },
        {
          title: "Database Administration",
          type: "website",
          icon: "mdi-microsoft-access",
          color: "teal--text",
          number: "06"
        }
      ]
    };
  },
  created() {
    this.filtered = this.serviceslist;
  },

  methods: {
    filterData(type) {
      console.log("filtered", type);
      this.filtered = this.serviceslist.filter(p => p.type === type);
    }
  },

  computed: {
    services: function() {
      return this.filtered;
    }
  }
};
</script>
