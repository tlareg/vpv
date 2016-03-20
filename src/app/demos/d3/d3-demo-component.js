import d3 from 'd3';
import d3DemoTemplate from './d3-demo.html';

class D3DemoCtrl {
  constructor() {
    'ngInject';
    this.createDemoBarchart();
  }

  createDemoBarchart() {
    var dataset = [13, 4, 8, 15, 16, 23, 42, 12, 44, 16, 23, 42, 12, 44, 23, 20, 60, 80, 23, 20, 60, 80, 4, 8, 15];

    var svgAttrs = {
      width: 960,
      height: 400
      // style: 'outline: thin solid #000'
    };

    var scaleBarHeight = d3.scale.linear()
      .domain([0, d3.max(dataset)])
      .range([0, svgAttrs.height]);

    var barMargin = 10;
    var barWidth = (svgAttrs.width / dataset.length) - barMargin;

    var barAttrs = {
      x: function(d, i) { return i * (barWidth + barMargin); },
      y: function(d, i) { return (svgAttrs.height - scaleBarHeight(d)); },
      width: barWidth,
      height: function(d) { return scaleBarHeight(d); },
      fill: function(d) { return 'rgb(10, 200, ' + 5 * d + ')'; }
    };

    var barTextAttrs = {
      x: function(d, i) { return (i * (barWidth + barMargin)) + (barWidth/2); },
      y: function(d, i) { return (svgAttrs.height - scaleBarHeight(d) + 15); },
      'text-anchor': 'middle',
      'font-family': 'sans-serif',
      'font-size': 12,
      'fill': '#fff'
    };

    var svg = d3.select('.d3-barchart')
      .append('svg')
      .attr(svgAttrs);

    svg.selectAll('rect')
      .attr("class", "vpv-bar")
      .data(dataset)
      .enter()
      .append('rect')
      .attr(barAttrs)
      .append('title')
      .text(function(d) { return d; });

    svg.selectAll('text')
      .attr("class", "vpv-bar-txt")
      .data(dataset)
      .enter()
      .append('text')
      .text(function(d) { return d; })
      .attr(barTextAttrs);
  }

}

export default {
  template: d3DemoTemplate,
  controller: D3DemoCtrl,
  controllerAs: 'd3DemoCtrl'
};
