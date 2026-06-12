// Mock Data for Placement Portal
const mockData = {
    queries: [
        { id: 1, studentName: "Priya Sharma", branch: "B.Tech ECE", text: "When will the Google OA results be announced?", status: "Pending", reply: null }
    ],
    companies: [
        {
            id: 1,
            name: "Google",
            status: "Hiring",
            role: "Software Engineer",
            eligibility: "B.Tech CSE/IT, 8.0+ CGPA",
            applyLink: "https://careers.google.com",
            jdLink: "#",
            insights: [
                { id: 1, author: "Aman Sharma (Senior)", text: "The OA had 2 coding questions. One was standard DP, another was a graph traversal problem. Time management is key." },
                { id: 2, author: "Priya Singh (Alumni)", text: "In the interview, they focus heavily on system design and core data structures. Know your basics." }
            ],
            qa: [
                {
                    id: 1,
                    author: "Rahul Verma",
                    isTpo: false,
                    question: "Is this role open for ECE students?",
                    replies: [
                        { id: 1, author: "Placement Cell", isTpo: true, text: "No, currently Google has restricted this drive to CSE and IT only." }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "Microsoft",
            status: "Upcoming",
            role: "SDE 1",
            eligibility: "All Branches, 7.5+ CGPA",
            applyLink: "https://careers.microsoft.com",
            jdLink: "#",
            insights: [
                { id: 1, author: "Karan Johar (Senior)", text: "Expect questions on OS and DBMS along with standard LeetCode mediums." }
            ],
            qa: [
                {
                    id: 1,
                    author: "Sneha Gupta",
                    isTpo: false,
                    question: "When is the tentative date for the OA?",
                    replies: []
                }
            ]
        },
        {
            id: 3,
            name: "Amazon",
            status: "Archived",
            role: "SDE Intern",
            eligibility: "B.Tech CSE/IT/ECE, 7.0+ CGPA",
            applyLink: "#",
            jdLink: "#",
            insights: [
                { id: 1, author: "Vikram R (Senior)", text: "Amazon Leadership Principles are extremely important for the interview stage. Don't ignore them!" }
            ],
            qa: []
        },
        {
            id: 4,
            name: "Atlassian",
            status: "Hiring",
            role: "Frontend Engineer",
            eligibility: "B.Tech All Branches, 8.5+ CGPA",
            applyLink: "https://careers.atlassian.com",
            jdLink: "#",
            insights: [],
            qa: []
        }
    ]
};

// State
let activeCompanyId = null;

// DOM Elements
const companyListEl = document.getElementById('companyList');
const searchInput = document.getElementById('searchInput');

const emptyState = document.getElementById('emptyState');
const companyDetailView = document.getElementById('companyDetailView');

const cdName = document.getElementById('cdName');
const cdStatus = document.getElementById('cdStatus');
const cdApplyBtn = document.getElementById('cdApplyBtn');
const cdAppliedCheckbox = document.getElementById('cdAppliedCheckbox');
const labelAppliedCheckbox = document.getElementById('labelAppliedCheckbox');
const btnSaveJob = document.getElementById('btnSaveJob');
const cdRole = document.getElementById('cdRole');
const cdEligibility = document.getElementById('cdEligibility');

const insightsListEl = document.getElementById('insightsList');
const newInsightText = document.getElementById('newInsightText');
const btnAddInsight = document.getElementById('btnAddInsight');

const qaListEl = document.getElementById('qaList');
const newQaText = document.getElementById('newQaText');
const btnAddQa = document.getElementById('btnAddQa');

// Queries Elements
const btnManageQueries = document.getElementById('btnManageQueries');
const queriesView = document.getElementById('queriesView');
const studentQueryFormContainer = document.getElementById('studentQueryFormContainer');
const newQueryText = document.getElementById('newQueryText');
const btnSubmitQuery = document.getElementById('btnSubmitQuery');
const queriesList = document.getElementById('queriesList');
const queriesListTitle = document.getElementById('queriesListTitle');

// New UI Elements
const patStatusDropdown = document.getElementById('patStatusDropdown');
const btnToggleInsightForm = document.getElementById('btnToggleInsightForm');
const insightFormContainer = document.getElementById('insightFormContainer');
const insightsHeader = document.getElementById('insightsHeader');
const insightsContent = document.getElementById('insightsContent');
const insightsToggleIcon = document.getElementById('insightsToggleIcon');

// QA Elements
const qaHeader = document.getElementById('qaHeader');
const qaContent = document.getElementById('qaContent');
const qaToggleIcon = document.getElementById('qaToggleIcon');

const cdJDText = document.getElementById('cdJDText');
const btnHome = document.getElementById('btnHome');
const btnToggleSidebar = document.getElementById('btnToggleSidebar');
const sidebarEl = document.querySelector('.sidebar');

// Profile Elements
const profileHeader = document.getElementById('profileHeader');
const profileToggleIcon = document.getElementById('profileToggleIcon');
const profileName = document.getElementById('profileName');
const profileRole = document.getElementById('profileRole');
const studentDetails = document.getElementById('studentDetails');
const labelRoll = document.getElementById('labelRoll');
const labelBranch = document.getElementById('labelBranch');
const profileRoll = document.getElementById('profileRoll');
const profileBranch = document.getElementById('profileBranch');
const profileEmail = document.getElementById('profileEmail');

// Modals
const helpdeskModal = document.getElementById('helpdeskModal');
const btnRaiseQuery = document.getElementById('btnRaiseQuery');
const closeHelpdesk = document.getElementById('closeHelpdesk');
const helpdeskForm = document.getElementById('helpdeskForm');

// AI Assistant Elements
const btnAiAssistant = document.getElementById('btnAiAssistant');
const aiAssistantView = document.getElementById('aiAssistantView');
const dropZone = document.getElementById('dropZone');
const aiLoading = document.getElementById('aiLoading');
const aiLoadingText = document.getElementById('aiLoadingText');
const aiResults = document.getElementById('aiResults');
const resumeInput = document.getElementById('resumeInput');
const uploadPrompt = document.getElementById('uploadPrompt');
const fileSelectedState = document.getElementById('fileSelectedState');
const selectedFileName = document.getElementById('selectedFileName');
const btnProcessResume = document.getElementById('btnProcessResume');
const btnChangeFile = document.getElementById('btnChangeFile');

// Dev Mode & PAT Elements
const patActionContainer = document.getElementById('patActionContainer');
const btnPostJob = document.getElementById('btnPostJob');
const postJobModal = document.getElementById('postJobModal');
const postJobModalTitle = document.getElementById('postJobModalTitle');
const closePostJob = document.getElementById('closePostJob');
const postJobForm = document.getElementById('postJobForm');
const btnEditJob = document.getElementById('btnEditJob');

// Auth Elements
const loginOverlay = document.getElementById('loginOverlay');
const tabLogin = document.getElementById('tabLogin');
const tabSignup = document.getElementById('tabSignup');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const resetPasswordForm = document.getElementById('resetPasswordForm');
const linkForgotPassword = document.getElementById('linkForgotPassword');
const linkBackToLogin = document.getElementById('linkBackToLogin');
const authError = document.getElementById('authError');
const authSubtitle = document.getElementById('authSubtitle');
const btnLogout = document.getElementById('btnLogout');
const appContainer = document.getElementById('appContainer');

let currentView = null;
let editingCompanyId = null;

// No local storage initialization needed anymore.
// We are officially using our Node.js Backend Server!

// Initialize
function init() {
    renderCompanyList(mockData.companies);
    setupEventListeners();

    // Check for existing session
    const sessionStr = localStorage.getItem('placebar_session');
    let isAuthenticated = false;
    
    if (sessionStr) {
        try {
            const session = JSON.parse(sessionStr);
            const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes
            
            // Check if session exists AND is less than 15 minutes old
            if (session.role && session.email && session.timestamp && (Date.now() - session.timestamp < SESSION_TIMEOUT)) {
                isAuthenticated = true;
                loginOverlay.classList.add('hidden');
                appContainer.classList.remove('hidden');
                setView(session.role, session.email, session.name, session.identifier);
            } else {
                // Session expired or invalid, remove it
                localStorage.removeItem('placebar_session');
            }
        } catch(e) {}
    }

    if (!isAuthenticated) {
        loginOverlay.classList.remove('hidden');
    }
}

// Render Sidebar List
function renderCompanyList(companies) {
    companyListEl.innerHTML = '';
    companies.forEach(company => {
        const div = document.createElement('div');
        div.className = `company-item ${company.id === activeCompanyId ? 'active' : ''}`;
        div.onclick = () => selectCompany(company.id);
        
        div.innerHTML = `
            <span class="company-item-name">${company.name}</span>
            <span class="badge ${company.status.toLowerCase()}">${company.status}</span>
        `;
        companyListEl.appendChild(div);
    });
}

// Select Company
function selectCompany(id) {
    activeCompanyId = id;
    
    const company = mockData.companies.find(c => c.id === id);
    if (!company) return;

    activeCompanyId = id;
    emptyState.classList.add('hidden');
    aiAssistantView.classList.add('hidden');
    queriesView.classList.add('hidden');
    companyDetailView.classList.remove('hidden');

    // Populate Data
    cdName.textContent = company.name;
    cdRole.textContent = company.role;
    cdEligibility.textContent = company.eligibility;
    cdApplyBtn.href = company.applyLink;
    cdJDText.textContent = company.jd || "No detailed job description provided.";

    if (currentView === 'PAT') {
        cdStatus.classList.add('hidden');
        patStatusDropdown.classList.remove('hidden');
        patStatusDropdown.value = company.status;
        cdApplyBtn.classList.add('hidden');
        if (btnSaveJob) btnSaveJob.classList.add('hidden');
        if (labelAppliedCheckbox) labelAppliedCheckbox.classList.add('hidden');
    } else {
        cdStatus.classList.remove('hidden');
        patStatusDropdown.classList.add('hidden');
        cdStatus.textContent = company.status;
        cdStatus.className = `badge ${company.status.toLowerCase()}`;
        cdApplyBtn.classList.remove('hidden');
        cdApplyBtn.href = company.applyLink || "#";
        
        if (labelAppliedCheckbox) {
            labelAppliedCheckbox.classList.remove('hidden');
            if (cdAppliedCheckbox) cdAppliedCheckbox.checked = !!company.applied;
        }

        if (btnSaveJob) {
            btnSaveJob.classList.remove('hidden');
            btnSaveJob.innerHTML = company.saved ? `<i class='bx bxs-bookmark'></i> Saved` : `<i class='bx bx-bookmark'></i> Save`;
            btnSaveJob.style.background = company.saved ? "rgba(0, 188, 212, 0.2)" : "transparent";
            btnSaveJob.style.borderColor = company.saved ? "#00bcd4" : "rgba(255,255,255,0.2)";
        }
    }

    renderInsights();
    renderQA();
}

// Render Insights
function renderInsights() {
    const company = mockData.companies.find(c => c.id === activeCompanyId);
    insightsListEl.innerHTML = '';
    
    if (company.insights.length === 0) {
        insightsListEl.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">No insights shared yet. Be the first!</p>';
        return;
    }

    company.insights.forEach(insight => {
        const div = document.createElement('div');
        div.className = 'insight-card';
        div.innerHTML = `
            <div class="insight-author">${insight.author}</div>
            <div class="insight-text">${insight.text}</div>
        `;
        insightsListEl.appendChild(div);
    });
}

// Render Q&A
function renderQA() {
    const company = mockData.companies.find(c => c.id === activeCompanyId);
    qaListEl.innerHTML = '';

    if (company.qa.length === 0) {
        qaListEl.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">No questions asked yet.</p>';
        return;
    }

    company.qa.forEach(thread => {
        const div = document.createElement('div');
        div.className = 'qa-thread';
        
        let repliesHtml = '';
        thread.replies.forEach(reply => {
            repliesHtml += `
                <div class="qa-reply">
                    <div class="qa-author ${reply.isTpo ? 'tpo' : ''}">${reply.author} ${reply.isTpo ? '<i class="bx bxs-check-circle"></i>' : ''}</div>
                    <div class="qa-text">${reply.text}</div>
                </div>
            `;
        });

        div.innerHTML = `
            <div class="qa-question">
                <div class="qa-author ${thread.isTpo ? 'tpo' : ''}">${thread.author}</div>
                <div class="qa-text">${thread.question}</div>
            </div>
            <div class="qa-replies">
                ${repliesHtml}
                <div class="reply-form">
                    <input type="text" placeholder="Type a reply..." id="replyInput-${thread.id}">
                    <button class="btn-secondary" onclick="addReply(${thread.id})" style="padding: 8px 12px; font-size: 0.8rem;">Reply</button>
                </div>
            </div>
        `;
        qaListEl.appendChild(div);
    });
}

// Actions
function addInsight() {
    const text = newInsightText.value.trim();
    if (!text || !activeCompanyId) return;

    const company = mockData.companies.find(c => c.id === activeCompanyId);
    company.insights.push({
        id: Date.now(),
        author: "You (Student)",
        text: text
    });

    newInsightText.value = '';
    renderInsights();
}

function addQa() {
    const text = newQaText.value.trim();
    if (!text || !activeCompanyId) return;

    const company = mockData.companies.find(c => c.id === activeCompanyId);
    company.qa.push({
        id: Date.now(),
        author: "You (Student)",
        isTpo: false,
        question: text,
        replies: []
    });

    newQaText.value = '';
    renderQA();
}

// This needs to be attached to window to work with inline onclick
window.addReply = function(threadId) {
    const input = document.getElementById(`replyInput-${threadId}`);
    const text = input.value.trim();
    if (!text) return;

    const company = mockData.companies.find(c => c.id === activeCompanyId);
    const thread = company.qa.find(q => q.id === threadId);
    
    thread.replies.push({
        id: Date.now(),
        author: "You",
        isTpo: currentView === 'PAT',
        text: text
    });

    renderQA();
};

window.resolveQuery = function(id) {
    const text = document.getElementById(`replyQueryText-${id}`).value.trim();
    if (!text) return;
    const q = mockData.queries.find(x => x.id === id);
    if (q) {
        q.reply = text;
        q.status = 'Resolved';
        renderQueries();
    }
};

// Set View Function
function setView(role, email = '', name = '', identifier = '') {
    currentView = role;
    const btnMyApplications = document.getElementById('btnMyApplications');
    
    // Update Profile UI
    if (role === 'STUDENT') {
        patActionContainer.classList.add('hidden');
        btnRaiseQuery.classList.remove('hidden');
        btnEditJob.classList.add('hidden');
        btnAiAssistant.classList.remove('hidden');
        if (btnToggleInsightForm) btnToggleInsightForm.classList.remove('hidden');
        if (btnMyApplications) btnMyApplications.classList.remove('hidden');
        
        // Dynamically get name from email (e.g. sonakshi@gmail.com -> Sonakshi)
        let displayName = name;
        if (!displayName && email && email.includes('@')) {
            let namePart = email.split('@')[0];
            displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
        } else if (!displayName) {
            displayName = "Student";
        }
        
        profileName.textContent = displayName;
        profileRole.textContent = "Student";
        profileEmail.textContent = email || "student@college.edu";
        
        labelRoll.textContent = "Roll";
        profileRoll.textContent = identifier || "20CS01";
        labelBranch.textContent = "Branch";
        profileBranch.textContent = "B.Tech CSE";
    } else {
        patActionContainer.classList.remove('hidden');
        btnRaiseQuery.classList.add('hidden'); // Hide student tools from PAT
        btnEditJob.classList.remove('hidden');
        btnAiAssistant.classList.add('hidden');
        if (btnToggleInsightForm) btnToggleInsightForm.classList.add('hidden');
        if (btnMyApplications) btnMyApplications.classList.add('hidden');
        
        profileName.textContent = name || "Admin Portal";
        profileRole.textContent = "PAT Office";
        profileEmail.textContent = email || "admin@college.edu";
        
        labelRoll.textContent = "ID";
        profileRoll.textContent = identifier || "PAT-01";
        labelBranch.textContent = "Dept";
        profileBranch.textContent = "Placement Cell";
    }
    
    // Ensure profile details are collapsed by default on view change
    studentDetails.style.display = "none";
    profileToggleIcon.className = 'bx bx-chevron-down';

    // Refresh detail view to handle status toggle visibility
    if (activeCompanyId) {
        selectCompany(activeCompanyId);
    }
}

// Event Listeners
function setupEventListeners() {
    // Sidebar Toggle
    btnToggleSidebar.addEventListener('click', () => {
        sidebarEl.classList.toggle('collapsed');
    });

    // AI Career Matcher Button
    btnAiAssistant.addEventListener('click', () => {
        activeCompanyId = null;
        companyDetailView.classList.add('hidden');
        queriesView.classList.add('hidden');
        emptyState.classList.add('hidden');
        aiAssistantView.classList.remove('hidden');
        
        // Reset AI view state
        dropZone.classList.remove('hidden');
        uploadPrompt.classList.remove('hidden');
        fileSelectedState.classList.add('hidden');
        resumeInput.value = '';
        aiLoading.classList.add('hidden');
        aiResults.classList.add('hidden');
    });

    // Handle File Selection
    resumeInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const fileName = e.target.files[0].name;
            selectedFileName.textContent = fileName;
            uploadPrompt.classList.add('hidden');
            fileSelectedState.classList.remove('hidden');
        }
    });

    // Change File
    btnChangeFile.addEventListener('click', () => {
        resumeInput.value = '';
        fileSelectedState.classList.add('hidden');
        uploadPrompt.classList.remove('hidden');
    });

    // Real Resume Processing Flow using Backend
    btnProcessResume.addEventListener('click', async () => {
        const file = resumeInput.files[0];
        if (!file) return;

        dropZone.classList.add('hidden');
        aiLoading.classList.remove('hidden');
        aiResults.classList.add('hidden');
        
        // UI Sequence
        aiLoadingText.textContent = "Parsing PDF structure...";
        
        try {
            const formData = new FormData();
            formData.append('resume', file);
            
            // Hit the actual Node.js backend to parse the PDF!
            const response = await fetch('/api/upload-resume', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (!response.ok || !data.success) {
                throw new Error(data.error || "Backend failed to parse resume");
            }
            
            setTimeout(() => { aiLoadingText.textContent = "Extracting technical skills via Named Entity Recognition..."; }, 1000);
            
            setTimeout(() => {
                aiLoading.classList.add('hidden');
                aiResults.classList.remove('hidden');
                
                const resultsContainer = aiResults.querySelector('.company-list');
                
                // Show the extracted skills right before the mock jobs!
                const extractedSkillsHtml = `
                    <div style="margin-bottom: 24px; padding: 16px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 8px;">
                        <h4 style="color: #38bdf8; margin-bottom: 8px;"><i class='bx bx-check-circle'></i> Resume Parsed Successfully</h4>
                        <p style="color: rgba(255,255,255,0.7); font-size: 0.9rem; margin-bottom: 12px;">We extracted the following core competencies from your document:</p>
                        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                            ${data.skills.map(skill => `<span style="background: rgba(56, 189, 248, 0.2); color: #7dd3fc; padding: 4px 12px; border-radius: 16px; font-size: 0.8rem;">${skill}</span>`).join('')}
                        </div>
                    </div>
                `;

                let jobsHtml = '';
                if (data.jobs && data.jobs.length > 0) {
                    jobsHtml = data.jobs.map((job, index) => {
                        // Generate a fake "Match %" between 80 and 99 for fun UI
                        const matchPct = Math.floor(Math.random() * (99 - 80 + 1)) + 80;
                        const matchColor = matchPct > 90 ? '#4ade80' : '#facc15';
                        const matchBg = matchPct > 90 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)';
                        
                        return `
                            <div class="company-card" style="border: 1px solid rgba(255,255,255,0.1); margin-bottom: 12px;">
                                <h3>${job.title}</h3>
                                <p style="color: rgba(255,255,255,0.6); font-size: 0.85rem; margin-top: 4px;">${job.location} • ${job.company} • ${job.via}</p>
                                <div style="margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                                    <span style="background: ${matchBg}; color: ${matchColor}; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">${matchPct}% Match</span>
                                    <a href="${job.link}" target="_blank" class="btn-primary" style="padding: 4px 12px; font-size: 0.85rem;">Apply on Google</a>
                                </div>
                            </div>
                        `;
                    }).join('');
                } else {
                    jobsHtml = `<p style="color: rgba(255,255,255,0.5);">No live jobs found for these skills right now.</p>`;
                }

                resultsContainer.innerHTML = extractedSkillsHtml + `
                    <h3 style="margin-top: 24px; margin-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">Your Top Job Matches</h3>
                    ${jobsHtml}
                    ${data.moreJobsUrl ? `
                    <div style="margin-top: 24px; text-align: center;">
                        <a href="${data.moreJobsUrl}" target="_blank" class="btn-outline" style="border-color: rgba(255,255,255,0.3); color: #ffffff; width: 100%; display: flex; justify-content: center; align-items: center; gap: 8px;">
                            See More Matches on Google Jobs <i class='bx bx-link-external'></i>
                        </a>
                    </div>` : ''}
                `;
            }, 3000);
            
        } catch(e) {
            console.error(e);
            aiLoadingText.textContent = e.message || "Error parsing resume!";
            setTimeout(() => {
                aiLoading.classList.add('hidden');
                dropZone.classList.remove('hidden');
            }, 3000);
        }
    });

    // Home Button
    btnHome.addEventListener('click', () => {
        activeCompanyId = null;
        companyDetailView.classList.add('hidden');
        aiAssistantView.classList.add('hidden');
        emptyState.classList.remove('hidden');
        renderCompanyList(mockData.companies);
    });

    // Profile Details Toggle
    profileHeader.addEventListener('click', () => {
        if (studentDetails.style.display === 'none') {
            studentDetails.style.display = 'block';
            profileToggleIcon.className = 'bx bx-chevron-up';
        } else {
            studentDetails.style.display = 'none';
            profileToggleIcon.className = 'bx bx-chevron-down';
        }
    });

    // Insights Section Toggle
    insightsHeader.addEventListener('click', () => {
        if (insightsContent.style.display === 'none') {
            insightsContent.style.display = 'block';
            insightsToggleIcon.className = 'bx bx-chevron-up';
        } else {
            insightsContent.style.display = 'none';
            insightsToggleIcon.className = 'bx bx-chevron-down';
        }
    });

    // Q&A Section Toggle
    qaHeader.addEventListener('click', () => {
        if (qaContent.style.display === 'none') {
            qaContent.style.display = 'block';
            qaToggleIcon.className = 'bx bx-chevron-up';
        } else {
            qaContent.style.display = 'none';
            qaToggleIcon.className = 'bx bx-chevron-down';
        }
    });

    // PAT Status Toggle Dropdown
    patStatusDropdown.addEventListener('change', (e) => {
        if (!activeCompanyId) return;
        const company = mockData.companies.find(c => c.id === activeCompanyId);
        if (company) {
            company.status = e.target.value;
            renderCompanyList(mockData.companies); // Refresh sidebar colors
        }
    });

    // Toggle Insight Form
    btnToggleInsightForm.addEventListener('click', () => {
        insightFormContainer.classList.toggle('hidden');
    });

    let viewingSavedJobs = false;
    const btnMyApplications = document.getElementById('btnMyApplications');
    if(btnMyApplications) {
        btnMyApplications.addEventListener('click', () => {
            viewingSavedJobs = !viewingSavedJobs;
            if(viewingSavedJobs) {
                btnMyApplications.style.background = "rgba(0, 188, 212, 0.2)";
                btnMyApplications.style.borderColor = "#00bcd4";
                const filtered = mockData.companies.filter(c => c.saved || c.applied);
                renderCompanyList(filtered);
            } else {
                btnMyApplications.style.background = "transparent";
                btnMyApplications.style.borderColor = "rgba(255,255,255,0.2)";
                renderCompanyList(mockData.companies);
            }
        });
    }

    if(btnSaveJob) {
        btnSaveJob.addEventListener('click', () => {
            const c = mockData.companies.find(x => x.id === activeCompanyId);
            if(c) {
                c.saved = !c.saved;
                btnSaveJob.innerHTML = c.saved ? `<i class='bx bxs-bookmark'></i> Saved` : `<i class='bx bx-bookmark'></i> Save`;
                btnSaveJob.style.background = c.saved ? "rgba(0, 188, 212, 0.2)" : "transparent";
                btnSaveJob.style.borderColor = c.saved ? "#00bcd4" : "rgba(255,255,255,0.2)";
                if (viewingSavedJobs) {
                    const filtered = mockData.companies.filter(x => x.saved || x.applied);
                    renderCompanyList(filtered);
                }
            }
        });
    }

    if(cdApplyBtn) {
        // Just opens the link now, applied status is manually handled by the checkbox
    }

    if(cdAppliedCheckbox) {
        cdAppliedCheckbox.addEventListener('change', (e) => {
            const c = mockData.companies.find(x => x.id === activeCompanyId);
            if(c) {
                c.applied = e.target.checked;
                if (viewingSavedJobs) {
                    const filtered = mockData.companies.filter(x => x.saved || x.applied);
                    renderCompanyList(filtered);
                }
            }
        });
    }

    // Auth Tab Navigation
    tabLogin.addEventListener('click', () => {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        if (resetPasswordForm) resetPasswordForm.classList.add('hidden');
        tabLogin.style.borderColor = '#00bcd4';
        tabLogin.style.color = '#ffffff';
        tabSignup.style.borderColor = 'transparent';
        tabSignup.style.color = 'rgba(255,255,255,0.5)';
        authSubtitle.textContent = "Login to your account";
        authError.style.display = 'none';
        authError.style.color = '#fca5a5';
    });

    tabSignup.addEventListener('click', () => {
        signupForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        if (resetPasswordForm) resetPasswordForm.classList.add('hidden');
        tabSignup.style.borderColor = '#00bcd4';
        tabSignup.style.color = '#ffffff';
        tabLogin.style.borderColor = 'transparent';
        tabLogin.style.color = 'rgba(255,255,255,0.5)';
        authSubtitle.textContent = "Create a new account";
        authError.style.display = 'none';
        authError.style.color = '#fca5a5';
    });

    if (linkForgotPassword) {
        linkForgotPassword.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.add('hidden');
            signupForm.classList.add('hidden');
            resetPasswordForm.classList.remove('hidden');
            authSubtitle.textContent = "Reset Password";
            authError.style.display = 'none';
            authError.style.color = '#fca5a5';
        });
    }

    if (linkBackToLogin) {
        linkBackToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            tabLogin.click();
        });
    }

    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('resetEmail').value;
            const newPassword = document.getElementById('resetNewPassword').value;
            
            try {
                const response = await fetch('/api/reset-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, newPassword })
                });
                const data = await response.json();
                
                if (data.success) {
                    authError.textContent = "Password updated successfully! Please login.";
                    authError.style.color = "#4ade80"; // Green color for success
                    authError.style.display = 'block';
                    resetPasswordForm.reset();
                    setTimeout(() => {
                        tabLogin.click();
                    }, 2000);
                } else {
                    authError.textContent = data.message || "Email not found.";
                    authError.style.color = '#fca5a5';
                    authError.style.display = 'block';
                }
            } catch (error) {
                authError.textContent = "Server offline.";
                authError.style.color = '#fca5a5';
                authError.style.display = 'block';
            }
        });
    }

    const signupRole = document.getElementById('signupRole');
    const identifierLabel = document.getElementById('identifierLabel');
    const signupIdentifier = document.getElementById('signupIdentifier');
    
    if (signupRole) {
        signupRole.addEventListener('change', (e) => {
            if(e.target.value === 'PAT') {
                identifierLabel.textContent = 'Faculty ID';
                signupIdentifier.placeholder = 'e.g. FAC-1001';
            } else {
                identifierLabel.textContent = 'Student ID / Roll No.';
                signupIdentifier.placeholder = 'e.g. 20CS01';
            }
        });
    }

    // Login Form Submit (Connected to Node.js)
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPassword').value;
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: pass })
            });
            const data = await response.json();
            
            if (data.success) {
                localStorage.setItem('placebar_session', JSON.stringify({ role: data.role, email: email, name: data.name, identifier: data.identifier, timestamp: Date.now() }));
                loginOverlay.classList.add('hidden');
                appContainer.classList.remove('hidden');
                loginForm.reset();
                authError.style.display = 'none';
                setView(data.role, email, data.name, data.identifier);
            } else {
                authError.textContent = data.message || "Invalid email or password.";
                authError.style.display = 'block';
            }
        } catch (error) {
            authError.textContent = "Server offline. Did you run 'node server.js' in the terminal?";
            authError.style.display = 'block';
        }
    });

    // Signup Form Submit (Connected to Node.js)
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signupEmail').value;
        const pass = document.getElementById('signupPassword').value;
        const role = document.getElementById('signupRole').value;
        const name = document.getElementById('signupName').value;
        const identifier = document.getElementById('signupIdentifier').value;
        
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password: pass, role, name, identifier })
            });
            const data = await response.json();
            
            if (data.success) {
                localStorage.setItem('placebar_session', JSON.stringify({ role: data.role, email: email, name: data.name, identifier: data.identifier, timestamp: Date.now() }));
                loginOverlay.classList.add('hidden');
                appContainer.classList.remove('hidden');
                signupForm.reset();
                authError.style.display = 'none';
                setView(data.role, email, data.name, data.identifier);
            } else {
                authError.textContent = data.message || "Email is already registered.";
                authError.style.display = 'block';
            }
        } catch (error) {
            authError.textContent = "Server offline. Did you run 'node server.js' in the terminal?";
            authError.style.display = 'block';
        }
    });

    // Logout
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('placebar_session');
        loginOverlay.classList.remove('hidden');
        appContainer.classList.add('hidden');
        // Reset dashboard state
        emptyState.classList.remove('hidden');
        companyDetailView.classList.add('hidden');
        aiAssistantView.classList.add('hidden');
        queriesView.classList.add('hidden');
        activeCompanyId = null;
        renderCompanyList(mockData.companies);
        
        // Reset to Login Tab
        tabLogin.click();
    });

    // Post Job Modal
    btnPostJob.addEventListener('click', () => {
        editingCompanyId = null;
        postJobForm.reset();
        postJobModalTitle.textContent = "Post New Job";
        postJobModal.classList.remove('hidden');
    });

    btnEditJob.addEventListener('click', () => {
        if (!activeCompanyId) return;
        editingCompanyId = activeCompanyId;
        const company = mockData.companies.find(c => c.id === activeCompanyId);
        if (company) {
            document.getElementById('newCompName').value = company.name;
            document.getElementById('newCompRole').value = company.role;
            document.getElementById('newCompJD').value = company.jd || company.eligibility;
            document.getElementById('newCompLink').value = company.applyLink;
            postJobModalTitle.textContent = "Edit Job Details";
            postJobModal.classList.remove('hidden');
        }
    });

    closePostJob.addEventListener('click', () => postJobModal.classList.add('hidden'));
    postJobModal.addEventListener('click', (e) => {
        if (e.target === postJobModal) postJobModal.classList.add('hidden');
    });

    postJobForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullJdText = document.getElementById('newCompJD').value;
        const shortEligibility = fullJdText.length > 50 ? fullJdText.substring(0, 50) + "..." : fullJdText;

        if (editingCompanyId) {
            const company = mockData.companies.find(c => c.id === editingCompanyId);
            if (company) {
                company.name = document.getElementById('newCompName').value;
                company.role = document.getElementById('newCompRole').value;
                company.eligibility = shortEligibility;
                company.jd = fullJdText;
                company.applyLink = document.getElementById('newCompLink').value;
            }
            selectCompany(editingCompanyId); // Refresh details view
        } else {
            const newCompany = {
                id: Date.now(),
                name: document.getElementById('newCompName').value,
                role: document.getElementById('newCompRole').value,
                status: "Hiring",
                eligibility: shortEligibility,
                jd: fullJdText,
                applyLink: document.getElementById('newCompLink').value,
                jdLink: "#",
                insights: [],
                qa: []
            };
            mockData.companies.unshift(newCompany);
            selectCompany(newCompany.id); // Refresh details view
        }
        
        // Retain current search query when rendering
        const query = searchInput.value.toLowerCase();
        const filtered = mockData.companies.filter(c => c.name.toLowerCase().includes(query));
        renderCompanyList(filtered);
        
        postJobForm.reset();
        postJobModal.classList.add('hidden');
    });

    // Search
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = mockData.companies.filter(c => c.name.toLowerCase().includes(query));
        renderCompanyList(filtered);
    });

    // Add Insight
    btnAddInsight.addEventListener('click', addInsight);
    
    // Queries View
    function showQueriesView() {
        activeCompanyId = null;
        companyDetailView.classList.add('hidden');
        emptyState.classList.add('hidden');
        aiAssistantView.classList.add('hidden');
        queriesView.classList.remove('hidden');
        renderQueries();
    }

    if(btnManageQueries) btnManageQueries.addEventListener('click', showQueriesView);
    btnRaiseQuery.addEventListener('click', showQueriesView);

    window.renderQueries = function() {
        queriesList.innerHTML = '';
        let queriesToRender = mockData.queries;

        if (currentView === 'STUDENT') {
            studentQueryFormContainer.classList.remove('hidden');
            queriesListTitle.textContent = "Your Previous Queries";
            queriesToRender = mockData.queries.filter(q => q.studentName === profileName.textContent);
        } else {
            studentQueryFormContainer.classList.add('hidden');
            queriesListTitle.textContent = "All Student Queries";
        }
        
        if (queriesToRender.length === 0) {
            queriesList.innerHTML = '<p style="color: rgba(255,255,255,0.5); font-style: italic;">No queries found.</p>';
            return;
        }

        queriesToRender.forEach(q => {
            const div = document.createElement('div');
            div.className = "card";
            div.style.padding = "20px";
            div.style.border = "1px solid rgba(255,255,255,0.1)";
            
            let statusBadge = q.status === 'Resolved' ? '<span class="badge hiring">Resolved</span>' : '<span class="badge upcoming">Pending</span>';
            
            let html = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                    <div>
                        <strong style="color: #fff;">${q.studentName}</strong> <span style="color: rgba(255,255,255,0.5); font-size: 0.8rem;">(${q.branch})</span>
                    </div>
                    ${statusBadge}
                </div>
                <p style="color: rgba(255,255,255,0.8); margin-bottom: 12px;">${q.text}</p>
            `;
            
            if (q.reply) {
                html += `
                    <div style="background: rgba(37, 99, 235, 0.1); border-left: 3px solid #3b82f6; padding: 12px; margin-top: 12px; border-radius: 4px;">
                        <strong style="color: #60a5fa; font-size: 0.85rem;">T&P Office Reply:</strong>
                        <p style="color: rgba(255,255,255,0.8); font-size: 0.9rem; margin-top: 4px;">${q.reply}</p>
                    </div>
                `;
            } else if (currentView === 'PAT') {
                html += `
                    <div id="replyBox-${q.id}" class="hidden" style="margin-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; animation: fadeIn 0.3s ease;">
                        <textarea id="replyQueryText-${q.id}" placeholder="Type resolution to ${q.studentName} here..." style="width: 100%; padding: 12px; margin-bottom: 12px; border-radius: 8px; background: rgba(0,0,0,0.2); color: #fff; border: 1px solid rgba(255,255,255,0.2); outline: none; min-height: 80px; resize: vertical;"></textarea>
                        <div style="display: flex; justify-content: flex-end; gap: 8px;">
                            <button onclick="document.getElementById('replyBox-${q.id}').classList.add('hidden'); document.getElementById('btnReply-${q.id}').classList.remove('hidden');" class="btn-outline" style="padding: 6px 16px; font-size: 0.85rem; border-color: rgba(255,255,255,0.2);">Cancel</button>
                            <button onclick="resolveQuery(${q.id})" class="btn-primary" style="background: #22c55e; padding: 6px 16px; font-size: 0.85rem;">Submit Resolution</button>
                        </div>
                    </div>
                    <div id="btnReply-${q.id}" style="margin-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; text-align: right;">
                        <button onclick="document.getElementById('replyBox-${q.id}').classList.remove('hidden'); document.getElementById('btnReply-${q.id}').classList.add('hidden');" class="btn-primary" style="background: #22c55e; padding: 6px 16px; font-size: 0.85rem;"><i class='bx bx-reply'></i> Reply & Resolve</button>
                    </div>
                `;
            }
            
            div.innerHTML = html;
            queriesList.appendChild(div);
        });
    };

    window.resolveQuery = function(id) {
        const text = document.getElementById(`replyQueryText-${id}`).value.trim();
        if (!text) return;
        const q = mockData.queries.find(x => x.id === id);
        if (q) {
            q.reply = text;
            q.status = 'Resolved';
            renderQueries();
        }
    };

    btnSubmitQuery.addEventListener('click', () => {
        const text = newQueryText.value.trim();
        if (!text) return;
        mockData.queries.unshift({
            id: Date.now(),
            studentName: profileName.textContent,
            branch: profileBranch.textContent,
            text: text,
            status: 'Pending',
            reply: null
        });
        newQueryText.value = '';
        renderQueries();
    });
}

// Boot
init();
