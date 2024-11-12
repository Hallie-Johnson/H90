import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

function Summary() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/summary-data')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (data.length === 0) return;
  
    const width = 750, height = 400, radius = Math.min(width, height) / 2 - 50;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    d3.select("#pie-chart").select("svg").remove();
  
    const svg = d3.select("#pie-chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);
  
    const arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");
  
    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.label))
      .attr("stroke", "white")
      .style("stroke-width", "2px");
  
    const labelArc = d3.arc().innerRadius(radius * 0.75).outerRadius(radius * 1.4);
  
    arcs.append("text")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("dy", "0.35em")
      .style("text-anchor", d => (d.endAngle + d.startAngle) / 2 > Math.PI ? "end" : "start") 
      .style("font-size", "12px")
      .style("fill", "#333")
      .text(d => `${d.data.label}: ${d.data.value}%`); 
  
  }, [data]);
  
  

  return (
    <div>
      <h1>Summary of Healthcare Innovations</h1>
      <div id="pie-chart"></div>
      <p>
        This chart highlights the applications that healthcare innovations work on. The chart showcases 17 top healthcare innovations that received the most engagement from the industry. AI/Machine learning and Other areas of healthcare make up over 50% of the most engaging healthcare innovations. (https://www.inpart.io/blog/17-top-healthcare-innovations-2023)
      </p>
    </div>
  );
}

export default Summary;
