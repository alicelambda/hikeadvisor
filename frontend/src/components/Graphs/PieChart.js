import React from 'react';
import * as d3 from 'd3';

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.createPieChart = this.createPieChart.bind(this);
  }

  componentDidMount() {
    this.createPieChart();
  }

  createPieChart() {
    const margin = 40;
    const height = 500;
    const width = 1000;
    const radius = Math.min(width, height) / 2 - margin;

    const rawSvg = d3
      .select(this.refs.pieChart)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    const svg = rawSvg
      .append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    const pie = d3.pie().value(d => d.value);
    const data = pie(d3.entries(this.props.data).sort((a, b) => b.value - a.value));
    const segments = d3
      .arc()
      .innerRadius(radius / 4)
      .outerRadius(radius)
      .padAngle(0.05)
      .padRadius(50);
    var colorScale = null;
    if(this.props.count == 10) {
      colorScale = d3.scaleOrdinal(['#ff0000', '#ffff00', '#0000ff', '#ff00ff', '#cc00ff', '#000066', '#336600', '#ffbf00', '#ff8000', '#0099ff']);
    }
    else {
      colorScale = d3.scaleOrdinal(['#ff0000', '#ffff00', '#0000ff', '#ff00ff', '#cc00ff', '#000066', '#336600', '#ffbf00', '#ff8000', '#0099ff', '#8000ff', '#993300', '#660066']);
    }

    svg
      .selectAll('slice')
      .data(data)
      .enter()
      .append('path')
      .attr('d', segments)
      .attr('fill', (d, i) => colorScale(i))
      .style('opacity', 0.7);

    const legend = rawSvg
      .selectAll('legendElems')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d, i) => 'translate(' + (width - 260) + ',' + (i * 25 + 25) + ')')
      .attr('class', 'legend');
    legend
      .append('ellipse')
      .attr("cx", 5)
      .attr("cy", 5)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr('fill', (d, i) => colorScale(i));
    legend
      .append('text')
      .text(d => `${d.data.key}: ${d.data.value}`)
      .style('font-size', 16)
      .attr('y', 10)
      .attr('x', 15);
  }

  render() {
    return <div ref="pieChart"></div>;
  }
}

export default PieChart;
