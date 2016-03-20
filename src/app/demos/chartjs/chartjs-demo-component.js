import Chart from 'chart.js';
import chartjsDemoTemplate from './chartjs-demo.html';

class ChartjsDemoCtrl {
  constructor() {
    'ngInject';
    this.chartjsBoxEl = $('.chartjs-box');

    this.createBarChart();
    this.createLineChart();
  }

  createCanvas() {
    var canvasEl = $('<canvas style="width: 800px; margin-top: 50px;"></canvas>');
    this.chartjsBoxEl.append(canvasEl);
    return canvasEl.get(0);
  }

  createLineChart(ctx) {
    var lineChart = new Chart(this.createCanvas().getContext("2d"))
      .Line(this.getLineChartData());
  }

  createBarChart(ctx) {
    var barChart = new Chart(this.createCanvas().getContext("2d"))
      .Bar(this.getBarChartData());
  }

  getLineChartData() {
    return {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
  }

  getBarChartData() {
    return {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
  }

}

export default {
  template: chartjsDemoTemplate,
  controller: ChartjsDemoCtrl,
  controllerAs: 'chartjsDemoCtrl'
};
