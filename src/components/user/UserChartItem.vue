<script>
  import { Line, mixins } from 'vue-chartjs';

  const CHART_OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    legend: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          fontColor: '#ffffff',
          fontSize: 12,
        },
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          beginAtZero: true,
          fontColor: '#ffffff',
          fontSize: 12,
        },
      }],
    },
  };

  export default {
    extends: Line,
    mixins: [
      mixins.reactiveProp,
    ],
    props: {
      chartData: {
        default: null,
        required: true,
        validator: (prop) => ['object'].includes(typeof prop) || prop === null,
      },
      options: {
        type: Object,
        default: () => (CHART_OPTIONS),
      },
    },
    mounted() {
      const { chartData, options } = this;
      this.renderChart(chartData, options);
    },
  };
</script>
