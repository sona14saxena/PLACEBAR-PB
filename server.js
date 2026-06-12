const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware to parse JSON data from requests
app.use(express.json());
// Allow our frontend to talk to our backend
app.use(cors());

// Automatically serve your beautiful HTML/CSS/JS files
app.use(express.static(path.join(__dirname)));

// --- CORE, SIMPLE DATABASE LOGIC ---
// We will use a simple local JSON file to act as our "Database". 
// This is the easiest way to store data permanently without installing heavy database software.
const DB_FILE = path.join(__dirname, 'database.json');

function readDB() {
    if (!fs.existsSync(DB_FILE)) {
        // Default empty database structure
        return { users: [], companies: [] };
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// --- API ROUTES (The middle-man between frontend and database) ---

// 1. User Login API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const db = readDB();
    
    // Check if user exists with matching password
    const user = db.users.find(u => u.email === email && u.password === password);
    
    if (user) {
        res.json({ success: true, role: user.role, name: user.name, identifier: user.identifier });
    } else if (email === 'admin' && password === 'admin') {
        res.json({ success: true, role: 'PAT', name: 'Admin Portal', identifier: 'PAT-01' });
    } else {
        res.status(401).json({ success: false, message: "Invalid email or password" });
    }
});

// 2. User Signup API
app.post('/api/signup', (req, res) => {
    const { email, password, role, name, identifier } = req.body;
    const db = readDB();
    
    // Check if email already exists
    if (db.users.find(u => u.email === email)) {
        return res.status(400).json({ success: false, message: "Email is already registered" });
    }
    
    // Add new user to database array and save the file
    db.users.push({ email, password, role, name, identifier });
    writeDB(db);
    
    res.json({ success: true, role: role, name: name, identifier: identifier });
});

// 2b. Reset Password API
app.post('/api/reset-password', (req, res) => {
    const { email, newPassword } = req.body;
    const db = readDB();
    
    const userIndex = db.users.findIndex(u => u.email === email);
    if (userIndex !== -1) {
        db.users[userIndex].password = newPassword;
        writeDB(db);
        res.json({ success: true, message: "Password updated successfully" });
    } else {
        res.status(404).json({ success: false, message: "Email not found" });
    }
});

// 3. Get Companies API
app.get('/api/companies', (req, res) => {
    const db = readDB();
    res.json(db.companies);
});

// Configure Multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

// 4. Resume Upload & Parse API
app.post('/api/upload-resume', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        let foundSkills = [];
        let extractedText = '';
        
        try {
            // --- PHASE 4: TRUE AI VISION WITH GEMINI ---
            console.log("Sending PDF to Gemini API...");
            const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
            const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const prompt = "You are an expert technical recruiter. Read this resume document and extract the top 5 technical skills or core competencies. Return ONLY a comma-separated list of the 5 skills (e.g. React, Python, Machine Learning, Java, SQL). Do not include any other conversational text or markdown formatting.";
            
            const pdfPart = {
                inlineData: {
                    data: req.file.buffer.toString("base64"),
                    mimeType: req.file.mimetype === 'application/pdf' ? "application/pdf" : req.file.mimetype
                }
            };

            const result = await model.generateContent([prompt, pdfPart]);
            const responseText = result.response.text();
            extractedText = responseText;
            
            // Clean up the output string into an array
            foundSkills = responseText.replace(/`/g, '').replace(/\n/g, '').split(',').map(s => s.trim()).filter(s => s.length > 0);
            
            console.log("Gemini Extracted Skills:", foundSkills);
            
        } catch (geminiError) {
            console.error("Gemini API failed, falling back to basic parser...", geminiError.message);
            // Fallback to basic pdf-parse if Gemini key is invalid
            if (req.file.mimetype === 'application/pdf') {
                try {
                    const pdfData = await pdfParse(req.file.buffer);
                    extractedText = pdfData.text;
                } catch (err) {
                    extractedText = "";
                }
            } else {
                extractedText = "";
            }

            const possibleSkills = ['React', 'Node', 'Python', 'Java', 'SQL', 'AWS', 'Docker', 'Machine Learning', 'Data Analysis', 'Figma', 'UI/UX', 'JavaScript'];
            foundSkills = possibleSkills.filter(skill => new RegExp(`\\b${skill}\\b`, 'i').test(extractedText));
        }

        if (foundSkills.length === 0) {
            return res.status(400).json({ success: false, error: 'No skills found. The document appears to be blank or unreadable.' });
        }

        // Limit to top 5 skills
        foundSkills = foundSkills.slice(0, 5);

        // --- PHASE 3: SERPAPI INTEGRATION ---
        const SERPAPI_KEY = "1427e0500a289443c01b581c7c02b6d3bf02e0ec1641f585b6e167c17c24ded2";
        // Create a search query using their top skills
        const searchQuery = encodeURIComponent(foundSkills.join(' ') + " developer");
        const serpApiUrl = `https://serpapi.com/search.json?engine=google_jobs&q=${searchQuery}&hl=en&api_key=${SERPAPI_KEY}`;
        const googleJobsUrl = `https://www.google.com/search?q=${searchQuery}&ibp=htl;jobs`;
        
        let liveJobs = [];
        try {
            const serpResponse = await fetch(serpApiUrl);
            const serpData = await serpResponse.json();
            
            if (serpData.jobs_results && serpData.jobs_results.length > 0) {
                // Grab the top 10 live jobs
                liveJobs = serpData.jobs_results.slice(0, 10).map(job => ({
                    title: job.title,
                    company: job.company_name,
                    location: job.location,
                    via: job.via,
                    link: job.share_link || (job.related_links && job.related_links[0] ? job.related_links[0].link : '#')
                }));
            }
        } catch (apiErr) {
            console.error("SerpAPI Error:", apiErr);
        }

        res.json({ success: true, skills: foundSkills, textLength: (extractedText || '').length, jobs: liveJobs, moreJobsUrl: googleJobsUrl });
    } catch (error) {
        console.error("Resume parse error:", error);
        res.status(500).json({ error: 'Failed to parse resume: ' + error.message, stack: error.stack });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ PlaceBar Server is running on http://localhost:${PORT}`);
    console.log(`📂 Serving frontend files directly from the root directory.`);
});
