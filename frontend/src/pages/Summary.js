import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import './Footer.css';


function Summary() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    axios.get('http://165.227.191.18:3000/api/summary-data')
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

      <header
        className="page-header"
        style={{ backgroundImage: "url('/images/healthcare_innovations.jpg')" }}
        role="banner"
        aria-labelledby="summary-heading"
      >
        <h1 id="summary-heading">Summary</h1>
      </header>

      <main role="main">

        <div className="container">
          <div
            id="pie-chart"
            className="card"
            style={{ textAlign: 'center', padding: '20px' }}
            aria-labelledby="chart-description"
          ></div>
          <p>
            This chart highlights the applications that healthcare innovations work on. The chart showcases 17 top healthcare innovations that received the most engagement from the industry. AI/Machine Learning and Other areas of healthcare make up over 50% of the most engaging healthcare innovations. While AI/Machine Learning and Other areas take up most of the healthcare innovations, antimicrobials and wearable technologies are a huge interest to the healthcare industry. However, the recent strides in Artificial Intelligence and Machine Learning have led to a focus on those types of innovations.
          </p>
          <a
            href="https://www.inpart.io/blog/17-top-healthcare-innovations-2023"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read more about the top healthcare innovations of 2023 on the inPart blog"
          >
            https://www.inpart.io/blog/17-top-healthcare-innovations-2023
          </a>
        </div>

        <div className="container">
          <section className="card">
            <a
              href="https://insuranceblog.accenture.com/wp-content/uploads/2020/08/AdobeStock_208124828-1920x791.jpeg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View the full-size header image on an external website"
            >
              Header Image Link
            </a>
          </section>
        </div>

      </main>

      <footer className="page-footer" role="contentinfo">
        <h5 className="page-footer-text">Created by Hallie Johnson - ITIS 5166</h5>
      </footer>

    </div>
  );
  
}

export default Summary;
