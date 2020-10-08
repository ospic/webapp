<script>
import { Doughnut } from "vue-chartjs";
import Chart from "chart.js";
export default {
  extends: Doughnut,
  data: () => ({
    chartdata: {
      labels: ["Male", "Female"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19],
          backgroundColor: [
            "rgba(255, 64, 64, 0.8)",
            "rgba(54, 162, 235, 0.8)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  methods: {
    textCenter(val) {
      Chart.pluginService.register({
        beforeDraw: function (chart) {
          var width = chart.chart.width;
          var height = chart.chart.height;
          var ctx = chart.chart.ctx;

          ctx.restore();
          var fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";

          var text = val;
          var textX = Math.round((width - ctx.measureText(text).width) / 2);
          var textY = height / 2;

          ctx.fillText(text, textX, textY);
          ctx.save();
        },
      });

      Chart.plugins.unregister(this.chartdata);
    },
  },

  mounted() {
    this.addPlugin({
      id: "my-plugin",
      beforeDraw: function (chart) {},
    });
    this.renderChart(this.chartdata, this.options);
    //this.textCenter(880);
  },
};
</script>