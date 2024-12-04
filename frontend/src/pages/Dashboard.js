import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './Header.css';
import './Footer.css';

function Dashboard() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <header 
        className="page-header" 
        style={{ backgroundImage: "url('/images/health_insurance_banner.jpg')" }}
        role="banner"
        aria-label="Dashboard Header with a healthcare-related image"
      >
        <h1>Dashboard</h1>
      </header>

      <main role="main">

        <div className="container">
          
          <section className="card">
            <h2 id="innovations-heading">Recent Innovations in Healthcare</h2>
            <p>
              In 2024, healthcare has continued to improve through innovations in Artificial Intelligence (AI), virtual care, and other areas. AI has allowed for better workflow for workers by automating routine tasks and providing predictive analytics. AI can help reduce the time needed to complete administrative tasks, like summarizing patient visits. AI can also help predict and manage patient flow, which allows doctors and staff to be deployed in an optimized way to areas that need them. One current example of AI in healthcare is in radiography. Radiographers can enhance an image with AI-reconstruction to make better diagnoses.
            </p>
            <p>
              Virtual collaboration has become more developed to help when specialist staff is unavailable. For example, radiology operations command centers, which are cloud-based hubs, allow doctors to communicate and/or train their colleagues from anywhere. Additionally, tele-intensive programs can reduce the burden on staff by adding more support for bedside care for patients. 
            </p>
            <p>
              Healthcare technology for home use has also improved. Items like smartwatches can help promote healthier habits by setting step goals or tracking vitals. Technologies like this allow health management to fit into people’s lives. This technology will continue to grow, and with the addition of AI, it can lead to better measures to help predict and prevent future health issues.
            </p>
            <a 
              href="https://www.philips.com/a-w/about/news/archive/features/2023/20231114-10-healthcare-technology-trends-for-2024.html" 
              aria-labelledby="innovations-heading"
              target="_blank" 
              rel="noopener noreferrer"
              className="accessible-link"
            >
              https://www.philips.com/a-w/about/news/archive/features/2023/20231114-10-healthcare-technology-trends-for-2024.html
            </a>
          </section>

          <section className="card">
            <h2 id="technical-details-heading">Technical Details</h2>
            <p>
              This web application uses MongoDB for the database, Express and Node.js for the backend, and React for the frontend. The backend communicates with the frontend via HTTP, and authentication is managed with JSON Web Tokens (JWTs). The app is hosted on a single server, where NGINX is used to route requests between the frontend and backend.
            </p>
          </section>
        </div>

        <div className="container">
          <section className="card">
            <h2 id="image-link-heading">Header Image Information</h2>
            <a 
              href="https://www.ers.usda.gov/media/uefd2biq/health_insurance_banner.jpg?format=jpg&quality=85" 
              aria-labelledby="image-link-heading"
              target="_blank" 
              rel="noopener noreferrer"
              className="accessible-link"
            >
              View the original header image
            </a>
          </section>
        </div>
      </main>

      <footer className="page-footer" role="contentinfo">
        <h5 className="page-footer-text">
          Created by Hallie Johnson - ITIS 5166
        </h5>
      </footer>

    </div>
  );
}

export default Dashboard;