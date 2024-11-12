import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <h1>Dashboard</h1>

      <section>
        <h2>Recent Innovations in Healthcare</h2>
        <p>
          In 2024, healthcare has continued to improve through innovations in Artificial Intelligence (AI), virtual care, and other areas. AI has allowed for better workflow for workers by allowing automation in routine tasks and prediction analytics. AI can help reduce the time needed to complete administrative tasks, like summarizing patient visits. AI can also help predict and manage patient flow, which allows doctors and staff to be deployed in an optimized way to areas that need them. One current example of AI in healthcare is in radiography. Radiographers can enhance an image with AI-reconstruction to make better diagnosis’. Virtual collaboration has become more developed to help with times where specialist staff is unavailable. An example being radiology operations command centers, which is a cloud-based hub which allows doctors to communicate and/or train their colleagues from anywhere. Additionally, Tele-intensive programs can reduce the burden of staff by adding more support for bedside care for patients. Healthcare technology for home-use has also improved. Items like smartwatches can help promote healthier habits by setting step goals or keeping track of vitals. Technologies like this allow health management to fit within people’s lives. This technology will continue to grow and with the addition of AI, this can lead to better measures to help predict and prevent future health issues. (https://www.philips.com/a-w/about/news/archive/features/2023/20231114-10-healthcare-technology-trends-for-2024.html)
        </p>
      </section>

      <section>
        <h2>Technical Details</h2>
        <p>
          This web application uses MongoDB for the database, Express and Node.js for the backend, and React for the frontend. The backend communicates with the frontend via HTTP, and authentication is managed with JSON Web Tokens (JWTs). The app is hosted on a single server, where NGINX or Apache is used to route requests between the frontend and backend. 
        </p>
      </section>
    </div>
  );
}

export default Dashboard;