import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

function Reports() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/reports-data')
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
      <h1>Healthcare Innovations Report</h1>
      <div id="pie-chart"></div>
      <p>
        This chart highlights the universities that are producing the top healthcare innovations. USA, Canada, and the UK are leading healthcare innovations, followed by Japan and Colombia. USA universities that are contributing to healthcare innovations are Cornell University, Case Western Reserve University, Texas Tech University System, University of California - Irvine, Georgia State University, University of Hawaii, and Queen's University. UK universities that are contributing are Imperial College London, Western University, University of Huddersfield, University of Sussex, and the Science and Technology Facilities Council. (https://www.inpart.io/blog/17-top-healthcare-innovations-2023)
      </p>
    </div>
  );
}

export default Reports;
