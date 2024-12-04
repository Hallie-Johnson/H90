# ITIS 5166 Final Project - H90
## Hallie Johnson

### 🏆 Goal:
- Create a live web application based on the specifications outlined below.


### 🗃️ Database:
- Use **MongoDB** if your student ID ends in an even number.


### ◀️ Backend:
- Choose one of the following: **NodeJS**, PHP, Python, or Java.
- **NodeJS** is chosen for this project.


### ▶️ Frontend:
- Use **React** if the last two digits of your student ID are between 51 and 99.


### 🖥️ App Title:
- The title of your app should be the first letter of your name followed by the last two digits of your student ID.
- App Title: H90


### 🩺 Subject:
- Recent innovations in healthcare from the last 6 months - if your first name starts with a letter between E and J.


### 📋 Requirements:
1. The app must be a **Single Page Application (SPA)**, with the frontend and backend fully decoupled and communicating through HTTP calls.
    - Focus on functionality; design is secondary.
2. The app should begin with a **login page**.
    - Use **JWT** for authentication.
    - The credentials should be **your first name** (Hallie) as both the login and password (for testing purposes).
    - Usually, credentials are stored encrypted inside the database. But to simplify this project, feel free to hardcode it on the backend code. 
    - After logging in, users should be redirected to a **dashboard page** and not see the login page again, unless they log out.
3. The **dashboard page** must contain a **200-word summary** of the selected topic.
    - Include a **reference** (URL) for the source of your content.
    - Below the summary, add a **paragraph describing the technical aspects** of your project, such as the tech stack and infrastructure.
4. All pages of the SPA should include a **top menu** with links to the **Dashboard**, **Summary**, and **Reports** pages.
    - Add the logout button there as well.
    - Attempting to access the **Dashboard**, **Summary**, or **Reports** pages without logging in should redirect users to the **login page**.
5. The **Summary** and **Reports** pages should each include a dynamic chart.
    - The chart content must be retrieved **asynchronously** from the backend/database via an **HTTP GET** call with a **JSON** response.
    - The chart data can be hardcoded and should correlate with your topic.
    - Use any charting library (e.g., **D3.js**).
    - Include a paragraph below each chart explaining its content and source.
6. Incorporate **ADA/WCAG accessibility** principles into the frontend code as much as possible.
7. Host both the **backend** and **frontend** on the same server (box).
    - **Apache** is used to serve the frontend.
    - The backend should run on **port 3000**.
    - The frontend should run on the standard **HTTP port (80)**.
8. The backend should operate independently of the frontend and respond to HTTP calls appropriately.
    - You will likely need two endpoints - one for each chart.
    - Remember to use JWT to validate these requests.
9. Once your app is fully operational you can work on making it prettier.
10. Commit the entire project (backend and frontend code) to a single **GitHub repository**.
    - Do not commit sensitive information, like **secret keys or passwords**.
    - Do not include unnecessary files (e.g., **node_modules**).
    - Use **.gitignore** to manage this.
11. Ensure that the app is accessible from any computer at any time. Verify that it remains running even after disconnecting from SSH.