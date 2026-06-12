# 🎓 PlaceBar - Campus Hiring Portal

A modern, highly-interactive Campus Placement Dashboard built to bridge the gap between students and the Placement & Training (PAT) Office. Designed with a stunning **Glassmorphic Teal Dark Mode** aesthetic, it offers a premium user experience for tracking job applications, discovering insights, and utilizing AI for career matching.

## ✨ Key Features

### For Students:
- **Application Tracking:** Easily bookmark jobs ("Save") and mark them as "Applied" to keep track of your progress in the dedicated *My Applications* tab.
- **AI Career Matcher:** Upload your resume (PDF format) and let the integrated Google Gemini AI parse your skills to find the perfect job matches from the active listings.
- **Peer Insights & Q&A:** Read interview experiences from seniors and alumni, and ask direct questions to the PAT office regarding specific companies.
- **Secure Authentication:** Role-based login and a dedicated "Forgot Password" recovery flow.

### For Faculty / PAT Office:
- **Dashboard Management:** Post new job opportunities and manage existing company statuses (Hiring, Upcoming, Archived).
- **Query Resolution:** Directly review and answer questions raised by students on specific company listings.
- **Administrative Control:** Maintain the integrity of senior insights and job eligibility criteria.

## 🛠 Tech Stack

- **Frontend:** Vanilla JavaScript, HTML5, Custom CSS3 (Glassmorphism, CSS Variables, Animations)
- **Backend:** Node.js, Express.js
- **Database:** Local JSON File (`database.json`) for lightweight, disk-based persistence
- **AI Integration:** Google Gemini API (for Resume Parsing)
- **File Parsing:** `multer` and `pdf-parse`

## 🚀 Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/placebar.git
   cd placebar
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open in Browser:**
   Navigate to `http://localhost:3000`

## 🌐 Deployment (Railway / Render)

Because this application relies on reading and writing to `database.json` for managing users and job statuses, it requires a host that provisions a persistent environment. **It cannot be deployed on stateless serverless platforms like Vercel.**

**To deploy:**
1. Upload this repository to GitHub.
2. Connect your GitHub repository to [Railway.app](https://railway.app/) or [Render.com](https://render.com/) (as a Web Service).
3. The platform will automatically detect the `package.json`, install all dependencies, and run the `npm start` command to spin up the Node server.
