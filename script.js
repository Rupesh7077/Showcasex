/**
 * ShowCaseX - Portfolio Generator Script
 * Powered by Google Gemini AI & Pure Vanilla JavaScript (ES6+)
 * 0 External Dependencies
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. Initial State & Constants
  // ==========================================================================
  const STORAGE_KEY = 'showcasex_portfolio_data';
  const GEMINI_API_KEY = 'AQ.Ab8RN6KB8HwCYmUTlgr9FJ5ICnSjXbIZnt4AMUgPRKherygKcQ';
  const GEMINI_MODEL = 'gemini-3.7-flash';

  const defaultData = {
    personal: {
      fullName: '',
      title: '',
      bio: '',
      avatarUrl: '',
      resumeUrl: ''
    },
    contact: {
      email: '',
      phone: '',
      location: '',
      website: '',
      github: '',
      linkedin: '',
      twitter: ''
    },
    skills: [],
    experience: [],
    education: [],
    projects: [],
    theme: 'minimal-light'
  };

  const demoData = {
    personal: {
      fullName: 'Alex Morgan',
      title: 'Senior Full-Stack Engineer & Product Builder',
      bio: 'I build high-performance web applications, distributed backend services, and minimalist developer tools. Passionate about developer ergonomics, modern TypeScript architecture, and crafting fluid user interfaces.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      resumeUrl: 'https://example.com/resume.pdf'
    },
    contact: {
      email: 'alex.morgan@example.com',
      phone: '+1 (555) 234-5678',
      location: 'San Francisco, CA',
      website: 'https://alexmorgan.dev',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com'
    },
    skills: [
      'TypeScript', 'JavaScript (ES6+)', 'React', 'Next.js', 'Node.js', 
      'PostgreSQL', 'GraphQL', 'Tailwind CSS', 'Docker', 'AWS', 'Redis', 'Git'
    ],
    experience: [
      {
        id: 'exp-1',
        role: 'Senior Software Engineer',
        company: 'Veloce Labs',
        duration: '2023 — Present',
        description: 'Lead engineer for the core cloud orchestration dashboard. Improved application load performance by 42% and architected a real-time metrics pipeline supporting 20,000+ daily active workspaces.'
      },
      {
        id: 'exp-2',
        role: 'Full-Stack Developer',
        company: 'Apex Systems',
        duration: '2021 — 2023',
        description: 'Developed scalable client-facing APIs and modular frontend UI component libraries. Collaborated closely with product designers to ship responsive design systems across web and mobile.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'B.S. in Computer Science',
        institution: 'University of California, Berkeley',
        year: '2017 — 2021',
        details: 'Focused on Distributed Systems, Algorithms, and Human-Computer Interaction.'
      }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'CloudPulse Monitoring Engine',
        description: 'Lightweight real-time server health and API latency monitoring service with instant alert webhooks and anomaly detection.',
        tech: 'TypeScript, Next.js, Go, PostgreSQL, WebSockets',
        liveUrl: 'https://example.com/cloudpulse',
        githubUrl: 'https://github.com/example/cloudpulse'
      },
      {
        id: 'proj-2',
        name: 'HyperQuery CLI',
        description: 'High-speed terminal utility for querying and transforming JSON and NDJSON streaming datasets at over 1GB/sec.',
        tech: 'Rust, Node.js, CLI',
        liveUrl: '',
        githubUrl: 'https://github.com/example/hyperquery'
      },
      {
        id: 'proj-3',
        name: 'FlowCraft UI Kit',
        description: 'Accessible, unstyled React component library engineered for high performance, keyboard navigation, and custom design tokens.',
        tech: 'React, TypeScript, CSS Variables, Storybook',
        liveUrl: 'https://example.com/flowcraft',
        githubUrl: 'https://github.com/example/flowcraft'
      }
    ],
    theme: 'minimal-light'
  };

  let portfolioData = JSON.parse(JSON.stringify(defaultData));

  // ==========================================================================
  // 2. DOM Elements Selection
  // ==========================================================================
  // Views
  const viewHome = document.getElementById('view-home');
  const viewBuilder = document.getElementById('view-builder');
  const viewPreview = document.getElementById('view-preview');

  // Home CTA Buttons
  const navLogo = document.getElementById('navLogo');
  const homeStartBtn = document.getElementById('homeStartBtn');
  const homeDemoBtn = document.getElementById('homeDemoBtn');
  const homeAiPromptNavBtn = document.getElementById('homeAiPromptNavBtn');
  const heroBuildBtn = document.getElementById('heroBuildBtn');
  const heroAiPromptBtn = document.getElementById('heroAiPromptBtn');
  const heroDemoBtn = document.getElementById('heroDemoBtn');
  const bottomBuildBtn = document.getElementById('bottomBuildBtn');
  const bottomAiBtn = document.getElementById('bottomAiBtn');

  // Builder Header & Actions
  const builderBackHomeBtn = document.getElementById('builderBackHomeBtn');
  const builderLoadDemoBtn = document.getElementById('builderLoadDemoBtn');
  const builderClearBtn = document.getElementById('builderClearBtn');
  const builderAiModalOpenBtn = document.getElementById('builderAiModalOpenBtn');
  const builderGenerateTopBtn = document.getElementById('builderGenerateTopBtn');
  const builderGenerateBottomBtn = document.getElementById('builderGenerateBottomBtn');
  const saveStatus = document.getElementById('saveStatus');

  // Builder Tabs & Navigation
  const builderTabNav = document.getElementById('builderTabNav');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.form-tab-content');

  // Form Inputs - Personal
  const inputFullName = document.getElementById('inputFullName');
  const errFullName = document.getElementById('errFullName');
  const inputTitle = document.getElementById('inputTitle');
  const errTitle = document.getElementById('errTitle');
  const inputBio = document.getElementById('inputBio');
  const btnAiPolishBio = document.getElementById('btnAiPolishBio');
  const inputAvatarUrl = document.getElementById('inputAvatarUrl');
  const avatarPreviewImg = document.getElementById('avatarPreviewImg');
  const avatarPreviewPlaceholder = document.getElementById('avatarPreviewPlaceholder');
  const inputResumeUrl = document.getElementById('inputResumeUrl');

  // Form Inputs - Contact
  const inputEmail = document.getElementById('inputEmail');
  const inputPhone = document.getElementById('inputPhone');
  const inputLocation = document.getElementById('inputLocation');
  const inputWebsite = document.getElementById('inputWebsite');
  const inputGithub = document.getElementById('inputGithub');
  const inputLinkedin = document.getElementById('inputLinkedin');
  const inputTwitter = document.getElementById('inputTwitter');

  // Skills
  const inputSkillItem = document.getElementById('inputSkillItem');
  const btnAddSkill = document.getElementById('btnAddSkill');
  const presetChipsContainer = document.getElementById('presetChipsContainer');
  const skillTagsContainer = document.getElementById('skillTagsContainer');
  const skillsCountHint = document.getElementById('skillsCountHint');

  // Dynamic Lists Containers & Buttons
  const experienceListContainer = document.getElementById('experienceListContainer');
  const btnAddExperience = document.getElementById('btnAddExperience');
  const educationListContainer = document.getElementById('educationListContainer');
  const btnAddEducation = document.getElementById('btnAddEducation');
  const projectListContainer = document.getElementById('projectListContainer');
  const btnAddProject = document.getElementById('btnAddProject');

  // Theme radios
  const themeRadios = document.querySelectorAll('input[name="portfolioTheme"]');

  // Preview View Controls
  const previewBackBuilderBtn = document.getElementById('previewBackBuilderBtn');
  const previewHomeBtn = document.getElementById('previewHomeBtn');
  const btnThemeLight = document.getElementById('btnThemeLight');
  const btnThemeDark = document.getElementById('btnThemeDark');
  const btnThemeIndigo = document.getElementById('btnThemeIndigo');
  const btnDownloadHtml = document.getElementById('btnDownloadHtml');
  const btnShareModalOpen = document.getElementById('btnShareModalOpen');
  const portfolioCanvas = document.getElementById('portfolioCanvas');

  // Share Modal
  const shareModal = document.getElementById('shareModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const shareUrlInput = document.getElementById('shareUrlInput');
  const modalCopyLinkBtn = document.getElementById('modalCopyLinkBtn');
  const modalOpenTabBtn = document.getElementById('modalOpenTabBtn');

  // Clear Modal
  const clearConfirmModal = document.getElementById('clearConfirmModal');
  const clearModalCloseBtn = document.getElementById('clearModalCloseBtn');
  const clearCancelBtn = document.getElementById('clearCancelBtn');
  const clearConfirmBtn = document.getElementById('clearConfirmBtn');

  // AI Prompt Modal
  const aiPromptModal = document.getElementById('aiPromptModal');
  const aiModalCloseBtn = document.getElementById('aiModalCloseBtn');
  const aiCancelBtn = document.getElementById('aiCancelBtn');
  const aiSubmitBtn = document.getElementById('aiSubmitBtn');
  const aiPromptTextarea = document.getElementById('aiPromptTextarea');
  const aiSpinner = document.getElementById('aiSpinner');
  const aiStatusText = document.getElementById('aiStatusText');

  // Toast
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = document.getElementById('toastIcon');
  let toastTimer = null;

  // ==========================================================================
  // 3. Helper Functions & Utilities
  // ==========================================================================

  /**
   * Escape HTML entities to prevent XSS
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Ensure URL starts with http:// or https://
   */
  function formatUrl(url) {
    if (!url) return '';
    const trimmed = url.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:') || trimmed.startsWith('tel:')) {
      return trimmed;
    }
    return 'https://' + trimmed;
  }

  /**
   * Show toast notification
   */
  function showToast(message, type = 'success') {
    if (toastTimer) clearTimeout(toastTimer);

    toastMessage.textContent = message;

    if (type === 'success') {
      toastIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
      toastIcon.style.color = 'var(--color-success)';
    } else if (type === 'error') {
      toastIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
      toastIcon.style.color = 'var(--color-danger)';
    } else {
      toastIcon.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
      toastIcon.style.color = 'var(--brand-primary)';
    }

    toast.classList.add('show');
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  /**
   * Save data to localStorage
   */
  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
      if (saveStatus) {
        saveStatus.style.opacity = '1';
      }
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  /**
   * Load data from localStorage
   */
  function loadFromStorage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        portfolioData = Object.assign({}, defaultData, parsed);
        return true;
      }
    } catch (e) {
      console.warn('Could not load from localStorage:', e);
    }
    return false;
  }

  /**
   * Base64 encode JSON state for URL sharing (safe UTF-8)
   */
  function encodePortfolioData(data) {
    try {
      const jsonStr = JSON.stringify(data);
      return encodeURIComponent(btoa(encodeURIComponent(jsonStr)));
    } catch (e) {
      console.error('Error encoding portfolio:', e);
      return '';
    }
  }

  /**
   * Base64 decode JSON state from URL hash
   */
  function decodePortfolioData(encodedStr) {
    try {
      const jsonStr = decodeURIComponent(atob(decodeURIComponent(encodedStr)));
      return JSON.parse(jsonStr);
    } catch (e) {
      console.error('Error decoding portfolio from URL:', e);
      return null;
    }
  }

  // ==========================================================================
  // 4. Gemini AI Integration Engine
  // ==========================================================================
  async function callGeminiApi(promptText, isJson = true) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    
    const requestBody = {
      contents: [{
        parts: [{ text: promptText }]
      }]
    };

    if (isJson) {
      requestBody.generationConfig = {
        responseMimeType: 'application/json'
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `HTTP ${response.status} Error`);
    }

    const result = await response.json();
    const candidate = result.candidates?.[0];
    if (!candidate || !candidate.content?.parts?.[0]?.text) {
      throw new Error('Empty response from AI model');
    }

    return candidate.content.parts[0].text;
  }

  async function generateFullPortfolioFromPrompt(userPrompt) {
    if (!userPrompt.trim()) {
      showToast('Please enter a description about yourself', 'error');
      return;
    }

    // Set UI loading state
    aiSpinner.classList.remove('hidden');
    aiStatusText.classList.add('generating');
    aiStatusText.textContent = 'Generating your portfolio with Gemini AI...';
    aiSubmitBtn.disabled = true;

    const systemPrompt = `You are an expert developer portfolio structuring AI. Convert the provided user description into a complete, professional, and detailed JSON portfolio matching exactly this schema:
{
  "personal": {
    "fullName": "Name of person",
    "title": "Professional title (e.g. Senior Full-Stack Engineer)",
    "bio": "Compelling 2-3 sentence professional summary",
    "avatarUrl": "",
    "resumeUrl": ""
  },
  "contact": {
    "email": "email if provided or empty string",
    "phone": "phone if provided or empty string",
    "location": "location if provided or empty string",
    "website": "website if provided or empty string",
    "github": "github url or empty string",
    "linkedin": "linkedin url or empty string",
    "twitter": "twitter url or empty string"
  },
  "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5"],
  "experience": [
    {
      "role": "Job Role",
      "company": "Company Name",
      "duration": "e.g. 2022 — Present",
      "description": "Clear 1-2 sentence description with impact and technologies."
    }
  ],
  "education": [
    {
      "degree": "Degree Name",
      "institution": "University / Institution",
      "year": "Year e.g. 2020",
      "details": "Coursework or honors if applicable"
    }
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Clear summary of the project and what problem it solves.",
      "tech": "Comma-separated technologies (e.g. React, Node.js, PostgreSQL)",
      "liveUrl": "",
      "githubUrl": ""
    }
  ],
  "theme": "minimal-light"
}

Fill in missing details with plausible professional information matching their stack if not explicitly provided. Output ONLY valid JSON matching the schema.

User description:
${userPrompt}`;

    try {
      const jsonText = await callGeminiApi(systemPrompt, true);
      const parsed = JSON.parse(jsonText);

      // Validate core structure
      portfolioData = {
        personal: Object.assign({}, defaultData.personal, parsed.personal || {}),
        contact: Object.assign({}, defaultData.contact, parsed.contact || {}),
        skills: Array.isArray(parsed.skills) ? parsed.skills : [],
        experience: Array.isArray(parsed.experience) ? parsed.experience.map((e, i) => ({ ...e, id: 'exp-' + (i + 1) + '-' + Date.now() })) : [],
        education: Array.isArray(parsed.education) ? parsed.education.map((e, i) => ({ ...e, id: 'edu-' + (i + 1) + '-' + Date.now() })) : [],
        projects: Array.isArray(parsed.projects) ? parsed.projects.map((p, i) => ({ ...p, id: 'proj-' + (i + 1) + '-' + Date.now() })) : [],
        theme: parsed.theme || 'minimal-light'
      };

      saveToStorage();
      populateFormFromState();
      closeAiModal();
      window.location.hash = '#builder';
      showToast('✨ Portfolio generated successfully with Gemini AI!');
    } catch (err) {
      console.error('AI Generation Error:', err);
      showToast(`AI Generation failed: ${err.message}`, 'error');
    } finally {
      aiSpinner.classList.add('hidden');
      aiStatusText.classList.remove('generating');
      aiStatusText.textContent = 'Ready to generate';
      aiSubmitBtn.disabled = false;
    }
  }

  async function polishBioWithAi() {
    const currentBio = inputBio.value.trim();
    const name = inputFullName.value.trim() || 'Software Engineer';
    const title = inputTitle.value.trim() || 'Full-Stack Developer';

    const sourceText = currentBio || `I am ${name}, working as a ${title}.`;

    btnAiPolishBio.disabled = true;
    btnAiPolishBio.textContent = '✨ Polishing...';

    const prompt = `You are a professional resume and portfolio editor. Rewrite and polish the following bio for a developer portfolio into an engaging, concise (2-3 sentences), and impactful summary. Return ONLY the polished bio text with no extra quotes or commentary:\n\n${sourceText}`;

    try {
      const polished = await callGeminiApi(prompt, false);
      inputBio.value = polished.trim().replace(/^["']|["']$/g, '');
      syncFormToState();
      showToast('✨ Bio polished with Gemini AI!');
    } catch (err) {
      console.error('Bio Polish Error:', err);
      showToast(`AI Polish failed: ${err.message}`, 'error');
    } finally {
      btnAiPolishBio.disabled = false;
      btnAiPolishBio.textContent = '✨ AI Polish Bio';
    }
  }

  btnAiPolishBio.addEventListener('click', polishBioWithAi);

  // AI Modal Controls
  function openAiModal() {
    aiPromptModal.classList.add('active');
    aiPromptModal.setAttribute('aria-hidden', 'false');
    aiPromptTextarea.focus();
  }

  function closeAiModal() {
    aiPromptModal.classList.remove('active');
    aiPromptModal.setAttribute('aria-hidden', 'true');
  }

  [heroAiPromptBtn, homeAiPromptNavBtn, bottomAiBtn, builderAiModalOpenBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', openAiModal);
  });

  aiModalCloseBtn.addEventListener('click', closeAiModal);
  aiCancelBtn.addEventListener('click', closeAiModal);

  aiPromptModal.addEventListener('click', (e) => {
    if (e.target === aiPromptModal) closeAiModal();
  });

  aiSubmitBtn.addEventListener('click', () => {
    generateFullPortfolioFromPrompt(aiPromptTextarea.value);
  });

  // Sample prompt chips in modal
  document.querySelectorAll('.sample-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      aiPromptTextarea.value = chip.dataset.prompt;
      aiPromptTextarea.focus();
    });
  });

  // ==========================================================================
  // 5. View Switching & Routing
  // ==========================================================================
  function switchView(viewName) {
    viewHome.classList.remove('active');
    viewBuilder.classList.remove('active');
    viewPreview.classList.remove('active');

    window.scrollTo(0, 0);

    if (viewName === 'builder') {
      viewBuilder.classList.add('active');
      document.title = 'Portfolio Builder — ShowCaseX';
      populateFormFromState();
    } else if (viewName === 'preview') {
      viewPreview.classList.add('active');
      const name = portfolioData.personal.fullName || 'Portfolio';
      document.title = `${name} — Generated by ShowCaseX`;
      renderPortfolio();
    } else {
      viewHome.classList.add('active');
      document.title = 'ShowCaseX — Build Your Professional Portfolio';
    }
  }

  function handleRoute() {
    const hash = window.location.hash;

    if (hash.startsWith('#portfolio=')) {
      const encoded = hash.replace('#portfolio=', '');
      const decoded = decodePortfolioData(encoded);
      if (decoded && decoded.personal) {
        portfolioData = Object.assign({}, defaultData, decoded);
        switchView('preview');
        return;
      }
    }

    if (hash === '#builder') {
      switchView('builder');
    } else if (hash === '#preview') {
      switchView('preview');
    } else {
      switchView('home');
    }
  }

  window.addEventListener('hashchange', handleRoute);

  // ==========================================================================
  // 6. Form Binding & State Sync
  // ==========================================================================
  function populateFormFromState() {
    // Personal
    inputFullName.value = portfolioData.personal.fullName || '';
    inputTitle.value = portfolioData.personal.title || '';
    inputBio.value = portfolioData.personal.bio || '';
    inputAvatarUrl.value = portfolioData.personal.avatarUrl || '';
    inputResumeUrl.value = portfolioData.personal.resumeUrl || '';
    updateAvatarPreview(portfolioData.personal.avatarUrl);

    // Contact
    inputEmail.value = portfolioData.contact.email || '';
    inputPhone.value = portfolioData.contact.phone || '';
    inputLocation.value = portfolioData.contact.location || '';
    inputWebsite.value = portfolioData.contact.website || '';
    inputGithub.value = portfolioData.contact.github || '';
    inputLinkedin.value = portfolioData.contact.linkedin || '';
    inputTwitter.value = portfolioData.contact.twitter || '';

    // Skills
    renderSkillTags();

    // Experience
    renderExperienceList();

    // Education
    renderEducationList();

    // Projects
    renderProjectList();

    // Theme
    themeRadios.forEach(radio => {
      radio.checked = radio.value === (portfolioData.theme || 'minimal-light');
    });
  }

  function syncFormToState() {
    portfolioData.personal.fullName = inputFullName.value.trim();
    portfolioData.personal.title = inputTitle.value.trim();
    portfolioData.personal.bio = inputBio.value.trim();
    portfolioData.personal.avatarUrl = inputAvatarUrl.value.trim();
    portfolioData.personal.resumeUrl = inputResumeUrl.value.trim();

    portfolioData.contact.email = inputEmail.value.trim();
    portfolioData.contact.phone = inputPhone.value.trim();
    portfolioData.contact.location = inputLocation.value.trim();
    portfolioData.contact.website = inputWebsite.value.trim();
    portfolioData.contact.github = inputGithub.value.trim();
    portfolioData.contact.linkedin = inputLinkedin.value.trim();
    portfolioData.contact.twitter = inputTwitter.value.trim();

    // Sync experience from DOM
    const expCards = experienceListContainer.querySelectorAll('.dynamic-card');
    const newExp = [];
    expCards.forEach(card => {
      const id = card.dataset.id;
      const role = card.querySelector('.input-exp-role').value.trim();
      const company = card.querySelector('.input-exp-company').value.trim();
      const duration = card.querySelector('.input-exp-duration').value.trim();
      const description = card.querySelector('.input-exp-desc').value.trim();
      if (role || company || description) {
        newExp.push({ id, role, company, duration, description });
      }
    });
    portfolioData.experience = newExp;

    // Sync education from DOM
    const eduCards = educationListContainer.querySelectorAll('.dynamic-card');
    const newEdu = [];
    eduCards.forEach(card => {
      const id = card.dataset.id;
      const degree = card.querySelector('.input-edu-degree').value.trim();
      const institution = card.querySelector('.input-edu-institution').value.trim();
      const year = card.querySelector('.input-edu-year').value.trim();
      const details = card.querySelector('.input-edu-details').value.trim();
      if (degree || institution || year) {
        newEdu.push({ id, degree, institution, year, details });
      }
    });
    portfolioData.education = newEdu;

    // Sync projects from DOM
    const projCards = projectListContainer.querySelectorAll('.dynamic-card');
    const newProj = [];
    projCards.forEach(card => {
      const id = card.dataset.id;
      const name = card.querySelector('.input-proj-name').value.trim();
      const description = card.querySelector('.input-proj-desc').value.trim();
      const tech = card.querySelector('.input-proj-tech').value.trim();
      const liveUrl = card.querySelector('.input-proj-live').value.trim();
      const githubUrl = card.querySelector('.input-proj-github').value.trim();
      if (name || description) {
        newProj.push({ id, name, description, tech, liveUrl, githubUrl });
      }
    });
    portfolioData.projects = newProj;

    // Sync theme
    const selectedTheme = document.querySelector('input[name="portfolioTheme"]:checked');
    if (selectedTheme) {
      portfolioData.theme = selectedTheme.value;
    }

    saveToStorage();
  }

  // Setup live change listeners on static inputs
  [
    inputFullName, inputTitle, inputBio, inputAvatarUrl, inputResumeUrl,
    inputEmail, inputPhone, inputLocation, inputWebsite, inputGithub, inputLinkedin, inputTwitter
  ].forEach(input => {
    input.addEventListener('input', () => {
      if (input === inputAvatarUrl) {
        updateAvatarPreview(inputAvatarUrl.value.trim());
      }
      if (input === inputFullName && inputFullName.value.trim()) {
        errFullName.classList.remove('show');
        inputFullName.classList.remove('input-error');
      }
      if (input === inputTitle && inputTitle.value.trim()) {
        errTitle.classList.remove('show');
        inputTitle.classList.remove('input-error');
      }
      syncFormToState();
    });
  });

  themeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      portfolioData.theme = radio.value;
      saveToStorage();
    });
  });

  function updateAvatarPreview(url) {
    if (url) {
      avatarPreviewImg.src = url;
      avatarPreviewImg.classList.remove('hidden');
      avatarPreviewPlaceholder.classList.add('hidden');
      avatarPreviewImg.onerror = () => {
        avatarPreviewImg.classList.add('hidden');
        avatarPreviewPlaceholder.classList.remove('hidden');
        avatarPreviewPlaceholder.textContent = 'Invalid';
      };
    } else {
      avatarPreviewImg.src = '';
      avatarPreviewImg.classList.add('hidden');
      avatarPreviewPlaceholder.classList.remove('hidden');
      avatarPreviewPlaceholder.textContent = 'No Image';
    }
  }

  // ==========================================================================
  // 7. Skills Management
  // ==========================================================================
  function renderSkillTags() {
    skillTagsContainer.innerHTML = '';
    const skills = portfolioData.skills || [];

    if (skills.length === 0) {
      skillTagsContainer.innerHTML = '<span style="font-size:0.8125rem; color:var(--text-muted);">No skills added yet. Use the input or suggestions above.</span>';
    } else {
      skills.forEach((skill, index) => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.innerHTML = `
          <span>${escapeHtml(skill)}</span>
          <button type="button" class="skill-tag-remove" data-index="${index}" aria-label="Remove skill">&times;</button>
        `;
        skillTagsContainer.appendChild(tag);
      });
    }

    skillsCountHint.textContent = `${skills.length} skill${skills.length === 1 ? '' : 's'} added.`;

    // Attach remove handlers
    const removeBtns = skillTagsContainer.querySelectorAll('.skill-tag-remove');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index, 10);
        portfolioData.skills.splice(idx, 1);
        renderSkillTags();
        saveToStorage();
      });
    });
  }

  function addSkill(skillName) {
    const clean = skillName.trim();
    if (!clean) return;
    if (!portfolioData.skills) portfolioData.skills = [];

    // Avoid exact duplicate
    if (!portfolioData.skills.some(s => s.toLowerCase() === clean.toLowerCase())) {
      portfolioData.skills.push(clean);
      renderSkillTags();
      saveToStorage();
      showToast(`Added skill: ${clean}`);
    } else {
      showToast(`"${clean}" is already added!`, 'info');
    }
  }

  btnAddSkill.addEventListener('click', () => {
    addSkill(inputSkillItem.value);
    inputSkillItem.value = '';
    inputSkillItem.focus();
  });

  inputSkillItem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(inputSkillItem.value);
      inputSkillItem.value = '';
    }
  });

  // Preset skill chips
  if (presetChipsContainer) {
    presetChipsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.preset-chip');
      if (chip) {
        const skill = chip.dataset.skill;
        addSkill(skill);
      }
    });
  }

  // ==========================================================================
  // 8. Dynamic Lists (Experience, Education, Projects)
  // ==========================================================================

  // --- Experience ---
  function renderExperienceList() {
    experienceListContainer.innerHTML = '';
    const experiences = portfolioData.experience || [];

    if (experiences.length === 0) {
      experienceListContainer.innerHTML = `
        <div class="empty-dynamic-state">
          <p>No work experience entries yet.</p>
          <button type="button" class="btn btn-secondary btn-sm" id="btnEmptyAddExp">
            + Add First Experience
          </button>
        </div>
      `;
      const btn = document.getElementById('btnEmptyAddExp');
      if (btn) btn.addEventListener('click', addExperienceCard);
      return;
    }

    experiences.forEach((exp, idx) => {
      const card = document.createElement('div');
      card.className = 'dynamic-card';
      card.dataset.id = exp.id || `exp-${idx}`;
      card.innerHTML = `
        <div class="dynamic-card-header">
          <span class="dynamic-card-title">Experience #${idx + 1}</span>
          <button type="button" class="btn btn-ghost btn-sm text-danger btn-remove-card" title="Delete entry">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            Remove
          </button>
        </div>
        <div class="form-grid">
          <div class="form-group col-6">
            <label class="form-label">Job Title</label>
            <input type="text" class="form-input input-exp-role" placeholder="e.g. Senior Software Engineer" value="${escapeHtml(exp.role || '')}">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Company / Organization</label>
            <input type="text" class="form-input input-exp-company" placeholder="e.g. Stripe or Freelance" value="${escapeHtml(exp.company || '')}">
          </div>
          <div class="form-group col-12">
            <label class="form-label">Duration / Period</label>
            <input type="text" class="form-input input-exp-duration" placeholder="e.g. 2022 — Present or Jun 2021 - Aug 2023" value="${escapeHtml(exp.duration || '')}">
          </div>
          <div class="form-group col-12">
            <div class="label-with-action">
              <label class="form-label">Responsibilities & Key Achievements</label>
              <button type="button" class="btn-text-ai btn-polish-exp" title="Polish description with AI">
                ✨ AI Polish
              </button>
            </div>
            <textarea class="form-textarea input-exp-desc" rows="3" placeholder="Describe your key impact, technologies used, and accomplishments...">${escapeHtml(exp.description || '')}</textarea>
          </div>
        </div>
      `;
      experienceListContainer.appendChild(card);
    });

    attachDynamicListeners(experienceListContainer);
  }

  function addExperienceCard() {
    syncFormToState();
    portfolioData.experience.push({
      id: 'exp-' + Date.now(),
      role: '',
      company: '',
      duration: '',
      description: ''
    });
    renderExperienceList();
    saveToStorage();
  }

  btnAddExperience.addEventListener('click', addExperienceCard);

  // --- Education ---
  function renderEducationList() {
    educationListContainer.innerHTML = '';
    const educations = portfolioData.education || [];

    if (educations.length === 0) {
      educationListContainer.innerHTML = `
        <div class="empty-dynamic-state">
          <p>No education or credentials added yet.</p>
          <button type="button" class="btn btn-secondary btn-sm" id="btnEmptyAddEdu">
            + Add First Education
          </button>
        </div>
      `;
      const btn = document.getElementById('btnEmptyAddEdu');
      if (btn) btn.addEventListener('click', addEducationCard);
      return;
    }

    educations.forEach((edu, idx) => {
      const card = document.createElement('div');
      card.className = 'dynamic-card';
      card.dataset.id = edu.id || `edu-${idx}`;
      card.innerHTML = `
        <div class="dynamic-card-header">
          <span class="dynamic-card-title">Education #${idx + 1}</span>
          <button type="button" class="btn btn-ghost btn-sm text-danger btn-remove-card" title="Delete entry">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            Remove
          </button>
        </div>
        <div class="form-grid">
          <div class="form-group col-6">
            <label class="form-label">Degree / Certificate</label>
            <input type="text" class="form-input input-edu-degree" placeholder="e.g. B.S. in Computer Science" value="${escapeHtml(edu.degree || '')}">
          </div>
          <div class="form-group col-6">
            <label class="form-label">Institution / University</label>
            <input type="text" class="form-input input-edu-institution" placeholder="e.g. UC Berkeley or Self-Taught" value="${escapeHtml(edu.institution || '')}">
          </div>
          <div class="form-group col-12">
            <label class="form-label">Graduation Year / Period</label>
            <input type="text" class="form-input input-edu-year" placeholder="e.g. 2019 — 2023" value="${escapeHtml(edu.year || '')}">
          </div>
          <div class="form-group col-12">
            <label class="form-label">Additional Details / Honors <span class="badge-optional">Optional</span></label>
            <textarea class="form-textarea input-edu-details" rows="2" placeholder="e.g. GPA 3.8, Dean's List, Relevant Coursework...">${escapeHtml(edu.details || '')}</textarea>
          </div>
        </div>
      `;
      educationListContainer.appendChild(card);
    });

    attachDynamicListeners(educationListContainer);
  }

  function addEducationCard() {
    syncFormToState();
    portfolioData.education.push({
      id: 'edu-' + Date.now(),
      degree: '',
      institution: '',
      year: '',
      details: ''
    });
    renderEducationList();
    saveToStorage();
  }

  btnAddEducation.addEventListener('click', addEducationCard);

  // --- Projects ---
  function renderProjectList() {
    projectListContainer.innerHTML = '';
    const projects = portfolioData.projects || [];

    if (projects.length === 0) {
      projectListContainer.innerHTML = `
        <div class="empty-dynamic-state">
          <p>No projects added yet.</p>
          <button type="button" class="btn btn-secondary btn-sm" id="btnEmptyAddProj">
            + Add First Project
          </button>
        </div>
      `;
      const btn = document.getElementById('btnEmptyAddProj');
      if (btn) btn.addEventListener('click', addProjectCard);
      return;
    }

    projects.forEach((proj, idx) => {
      const card = document.createElement('div');
      card.className = 'dynamic-card';
      card.dataset.id = proj.id || `proj-${idx}`;
      card.innerHTML = `
        <div class="dynamic-card-header">
          <span class="dynamic-card-title">Project #${idx + 1}</span>
          <button type="button" class="btn btn-ghost btn-sm text-danger btn-remove-card" title="Delete project">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            Remove
          </button>
        </div>
        <div class="form-grid">
          <div class="form-group col-12">
            <label class="form-label">Project Name</label>
            <input type="text" class="form-input input-proj-name" placeholder="e.g. CloudFlow Analytics" value="${escapeHtml(proj.name || '')}">
          </div>
          <div class="form-group col-12">
            <div class="label-with-action">
              <label class="form-label">Description</label>
              <button type="button" class="btn-text-ai btn-polish-proj" title="Polish project description with AI">
                ✨ AI Polish
              </button>
            </div>
            <textarea class="form-textarea input-proj-desc" rows="3" placeholder="What does this project do? What problem does it solve?">${escapeHtml(proj.description || '')}</textarea>
          </div>
          <div class="form-group col-12">
            <label class="form-label">Technologies Used</label>
            <input type="text" class="form-input input-proj-tech" placeholder="e.g. React, Node.js, PostgreSQL, Tailwind" value="${escapeHtml(proj.tech || '')}">
            <span class="field-hint">Separate technologies with commas.</span>
          </div>
          <div class="form-group col-6">
            <label class="form-label">Live Demo URL <span class="badge-optional">Optional</span></label>
            <input type="url" class="form-input input-proj-live" placeholder="https://myproject.com" value="${escapeHtml(proj.liveUrl || '')}">
          </div>
          <div class="form-group col-6">
            <label class="form-label">GitHub / Source Repo <span class="badge-optional">Optional</span></label>
            <input type="url" class="form-input input-proj-github" placeholder="https://github.com/user/repo" value="${escapeHtml(proj.githubUrl || '')}">
          </div>
        </div>
      `;
      projectListContainer.appendChild(card);
    });

    attachDynamicListeners(projectListContainer);
  }

  function addProjectCard() {
    syncFormToState();
    portfolioData.projects.push({
      id: 'proj-' + Date.now(),
      name: '',
      description: '',
      tech: '',
      liveUrl: '',
      githubUrl: ''
    });
    renderProjectList();
    saveToStorage();
  }

  btnAddProject.addEventListener('click', addProjectCard);

  // Helper to attach input change and remove handlers to dynamic cards
  function attachDynamicListeners(container) {
    const inputs = container.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        syncFormToState();
      });
    });

    // Remove buttons
    const removeBtns = container.querySelectorAll('.btn-remove-card');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.dynamic-card');
        if (card) {
          card.remove();
          syncFormToState();
          // Re-render to update numbering
          if (container === experienceListContainer) renderExperienceList();
          if (container === educationListContainer) renderEducationList();
          if (container === projectListContainer) renderProjectList();
          showToast('Entry removed');
        }
      });
    });

    // Polish Experience Description Buttons
    const polishExpBtns = container.querySelectorAll('.btn-polish-exp');
    polishExpBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const card = e.target.closest('.dynamic-card');
        const role = card.querySelector('.input-exp-role').value.trim();
        const company = card.querySelector('.input-exp-company').value.trim();
        const descArea = card.querySelector('.input-exp-desc');
        const text = descArea.value.trim() || `${role} at ${company}`;

        btn.disabled = true;
        btn.textContent = '✨ Polishing...';

        try {
          const prompt = `You are a career coach. Rewrite and polish this work experience achievement bullet point for a resume/portfolio to emphasize action verbs, technical impact, and clarity. Keep to 1-2 concise sentences. Return ONLY the polished text:\n\n${text}`;
          const res = await callGeminiApi(prompt, false);
          descArea.value = res.trim().replace(/^["']|["']$/g, '');
          syncFormToState();
          showToast('✨ Experience description polished!');
        } catch(err) {
          showToast(`Polish failed: ${err.message}`, 'error');
        } finally {
          btn.disabled = false;
          btn.textContent = '✨ AI Polish';
        }
      });
    });

    // Polish Project Description Buttons
    const polishProjBtns = container.querySelectorAll('.btn-polish-proj');
    polishProjBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const card = e.target.closest('.dynamic-card');
        const name = card.querySelector('.input-proj-name').value.trim();
        const descArea = card.querySelector('.input-proj-desc');
        const tech = card.querySelector('.input-proj-tech').value.trim();
        const text = descArea.value.trim() || `Project ${name} built with ${tech}`;

        btn.disabled = true;
        btn.textContent = '✨ Polishing...';

        try {
          const prompt = `You are a developer portfolio expert. Polish this project summary to clearly explain the problem it solves and key tech stack highlight in 1-2 crisp sentences. Return ONLY the polished description:\n\n${text}`;
          const res = await callGeminiApi(prompt, false);
          descArea.value = res.trim().replace(/^["']|["']$/g, '');
          syncFormToState();
          showToast('✨ Project description polished!');
        } catch(err) {
          showToast(`Polish failed: ${err.message}`, 'error');
        } finally {
          btn.disabled = false;
          btn.textContent = '✨ AI Polish';
        }
      });
    });
  }

  // ==========================================================================
  // 9. Tab Navigation in Builder
  // ==========================================================================
  function activateTab(tabId) {
    tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });
    tabContents.forEach(content => {
      content.classList.toggle('active', content.id === tabId);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activateTab(btn.dataset.tab);
    });
  });

  // Next / Prev buttons inside tabs
  document.addEventListener('click', (e) => {
    if (e.target.closest('.next-tab-btn')) {
      const nextTab = e.target.closest('.next-tab-btn').dataset.next;
      if (nextTab) activateTab(nextTab);
    }
    if (e.target.closest('.prev-tab-btn')) {
      const prevTab = e.target.closest('.prev-tab-btn').dataset.prev;
      if (prevTab) activateTab(prevTab);
    }
  });

  // ==========================================================================
  // 10. Validation & Generation
  // ==========================================================================
  function validateAndGenerate() {
    syncFormToState();

    let isValid = true;

    if (!portfolioData.personal.fullName) {
      errFullName.classList.add('show');
      inputFullName.classList.add('input-error');
      activateTab('tab-personal');
      inputFullName.focus();
      isValid = false;
    } else {
      errFullName.classList.remove('show');
      inputFullName.classList.remove('input-error');
    }

    if (!portfolioData.personal.title) {
      errTitle.classList.add('show');
      inputTitle.classList.add('input-error');
      if (isValid) {
        activateTab('tab-personal');
        inputTitle.focus();
      }
      isValid = false;
    } else {
      errTitle.classList.remove('show');
      inputTitle.classList.remove('input-error');
    }

    if (!isValid) {
      showToast('Please fill in required fields (Name & Title)', 'error');
      return;
    }

    saveToStorage();
    window.location.hash = '#preview';
    showToast('Portfolio generated successfully!');
  }

  builderGenerateTopBtn.addEventListener('click', validateAndGenerate);
  builderGenerateBottomBtn.addEventListener('click', validateAndGenerate);

  // ==========================================================================
  // 11. Portfolio HTML Rendering Engine
  // ==========================================================================
  function renderPortfolio() {
    const data = portfolioData;
    const personal = data.personal || {};
    const contact = data.contact || {};
    const skills = data.skills || [];
    const experience = data.experience || [];
    const education = data.education || [];
    const projects = data.projects || [];
    const theme = data.theme || 'minimal-light';

    // Set theme class on canvas
    portfolioCanvas.className = `portfolio-canvas theme-${theme}`;
    updateThemeSwitcherUI(theme);

    // Build Initials Fallback
    const initials = (personal.fullName || 'User')
      .split(' ')
      .filter(Boolean)
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    // Check what sections exist
    const hasSkills = skills.length > 0;
    const hasExperience = experience.length > 0 && experience.some(e => e.role || e.company);
    const hasEducation = education.length > 0 && education.some(e => e.degree || e.institution);
    const hasProjects = projects.length > 0 && projects.some(p => p.name);

    // Social Links HTML
    let socialLinksHtml = '';
    if (contact.email) {
      socialLinksHtml += `
        <a href="mailto:${escapeHtml(contact.email)}" class="pf-social-btn" title="Email">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </a>
      `;
    }
    if (contact.github) {
      socialLinksHtml += `
        <a href="${escapeHtml(formatUrl(contact.github))}" target="_blank" rel="noopener noreferrer" class="pf-social-btn" title="GitHub">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
        </a>
      `;
    }
    if (contact.linkedin) {
      socialLinksHtml += `
        <a href="${escapeHtml(formatUrl(contact.linkedin))}" target="_blank" rel="noopener noreferrer" class="pf-social-btn" title="LinkedIn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        </a>
      `;
    }
    if (contact.website) {
      socialLinksHtml += `
        <a href="${escapeHtml(formatUrl(contact.website))}" target="_blank" rel="noopener noreferrer" class="pf-social-btn" title="Website">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </a>
      `;
    }
    if (contact.twitter) {
      socialLinksHtml += `
        <a href="${escapeHtml(formatUrl(contact.twitter))}" target="_blank" rel="noopener noreferrer" class="pf-social-btn" title="Twitter / X">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
        </a>
      `;
    }
    if (contact.phone) {
      socialLinksHtml += `
        <a href="tel:${escapeHtml(contact.phone)}" class="pf-social-btn" title="Phone">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </a>
      `;
    }

    // Nav anchor links
    let navLinksHtml = '';
    if (personal.bio) navLinksHtml += `<a href="#pf-about" class="pf-nav-link">About</a>`;
    if (hasSkills) navLinksHtml += `<a href="#pf-skills" class="pf-nav-link">Skills</a>`;
    if (hasExperience) navLinksHtml += `<a href="#pf-experience" class="pf-nav-link">Experience</a>`;
    if (hasEducation) navLinksHtml += `<a href="#pf-education" class="pf-nav-link">Education</a>`;
    if (hasProjects) navLinksHtml += `<a href="#pf-projects" class="pf-nav-link">Projects</a>`;
    navLinksHtml += `<a href="#pf-contact" class="pf-nav-link">Contact</a>`;

    // Skills pills HTML
    let skillsHtml = '';
    if (hasSkills) {
      skillsHtml = `
        <section id="pf-skills" class="pf-section">
          <div class="pf-container">
            <h2 class="pf-section-title">Skills & Technologies</h2>
            <div class="pf-skills-grid">
              ${skills.map(s => `<span class="pf-skill-pill">${escapeHtml(s)}</span>`).join('')}
            </div>
          </div>
        </section>
      `;
    }

    // Experience cards HTML
    let experienceHtml = '';
    if (hasExperience) {
      const items = experience
        .filter(e => e.role || e.company)
        .map(e => `
          <div class="pf-card">
            <div class="pf-card-header">
              <div>
                <h3 class="pf-card-role">${escapeHtml(e.role || 'Role')}</h3>
                <div class="pf-card-company">${escapeHtml(e.company || '')}</div>
              </div>
              ${e.duration ? `<span class="pf-card-date">${escapeHtml(e.duration)}</span>` : ''}
            </div>
            ${e.description ? `<p class="pf-card-desc">${escapeHtml(e.description)}</p>` : ''}
          </div>
        `).join('');

      experienceHtml = `
        <section id="pf-experience" class="pf-section">
          <div class="pf-container">
            <h2 class="pf-section-title">Experience</h2>
            <div class="pf-experience-list">
              ${items}
            </div>
          </div>
        </section>
      `;
    }

    // Education cards HTML
    let educationHtml = '';
    if (hasEducation) {
      const items = education
        .filter(e => e.degree || e.institution)
        .map(e => `
          <div class="pf-card">
            <div class="pf-card-header">
              <div>
                <h3 class="pf-card-role">${escapeHtml(e.degree || 'Degree')}</h3>
                <div class="pf-card-company">${escapeHtml(e.institution || '')}</div>
              </div>
              ${e.year ? `<span class="pf-card-date">${escapeHtml(e.year)}</span>` : ''}
            </div>
            ${e.details ? `<p class="pf-card-desc">${escapeHtml(e.details)}</p>` : ''}
          </div>
        `).join('');

      educationHtml = `
        <section id="pf-education" class="pf-section">
          <div class="pf-container">
            <h2 class="pf-section-title">Education & Credentials</h2>
            <div class="pf-education-list">
              ${items}
            </div>
          </div>
        </section>
      `;
    }

    // Projects Grid HTML
    let projectsHtml = '';
    if (hasProjects) {
      const items = projects
        .filter(p => p.name)
        .map(p => {
          const techBadges = (p.tech || '')
            .split(',')
            .map(t => t.trim())
            .filter(Boolean)
            .map(t => `<span class="pf-tech-badge">${escapeHtml(t)}</span>`)
            .join('');

          let linksHtml = '';
          if (p.liveUrl) {
            linksHtml += `
              <a href="${escapeHtml(formatUrl(p.liveUrl))}" target="_blank" rel="noopener noreferrer" class="pf-project-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Preview
              </a>
            `;
          }
          if (p.githubUrl) {
            linksHtml += `
              <a href="${escapeHtml(formatUrl(p.githubUrl))}" target="_blank" rel="noopener noreferrer" class="pf-project-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                Source Code
              </a>
            `;
          }

          return `
            <div class="pf-project-card">
              <div>
                <h3 class="pf-project-name">${escapeHtml(p.name)}</h3>
                ${p.description ? `<p class="pf-project-desc">${escapeHtml(p.description)}</p>` : ''}
                ${techBadges ? `<div class="pf-project-techs">${techBadges}</div>` : ''}
              </div>
              ${linksHtml ? `<div class="pf-project-links">${linksHtml}</div>` : ''}
            </div>
          `;
        }).join('');

      projectsHtml = `
        <section id="pf-projects" class="pf-section">
          <div class="pf-container">
            <h2 class="pf-section-title">Featured Projects</h2>
            <div class="pf-projects-grid">
              ${items}
            </div>
          </div>
        </section>
      `;
    }

    // Final Assembly
    portfolioCanvas.innerHTML = `
      <div class="pf-page">
        <!-- Navigation -->
        <nav class="pf-nav">
          <div class="pf-container">
            <div class="pf-nav-inner">
              <span class="pf-nav-brand">${escapeHtml(personal.fullName || 'Portfolio')}</span>
              <div class="pf-nav-links">
                ${navLinksHtml}
              </div>
            </div>
          </div>
        </nav>

        <!-- Hero Section -->
        <header class="pf-hero" id="pf-about">
          <div class="pf-container">
            <div class="pf-hero-content">
              <div class="pf-avatar-wrapper">
                ${personal.avatarUrl
                  ? `<img src="${escapeHtml(personal.avatarUrl)}" alt="${escapeHtml(personal.fullName)}" class="pf-avatar" onerror="this.outerHTML='<div class=\\'pf-avatar-fallback\\'>${initials}</div>'">`
                  : `<div class="pf-avatar-fallback">${initials}</div>`
                }
              </div>

              <div class="pf-hero-text">
                <h1 class="pf-name">${escapeHtml(personal.fullName || 'Your Name')}</h1>
                <div class="pf-title">${escapeHtml(personal.title || 'Professional Title')}</div>
                ${personal.bio ? `<p class="pf-bio">${escapeHtml(personal.bio)}</p>` : ''}

                <div class="pf-hero-actions">
                  ${contact.email ? `
                    <a href="mailto:${escapeHtml(contact.email)}" class="pf-btn pf-btn-primary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      Get in Touch
                    </a>
                  ` : ''}

                  ${personal.resumeUrl ? `
                    <a href="${escapeHtml(formatUrl(personal.resumeUrl))}" target="_blank" rel="noopener noreferrer" class="pf-btn pf-btn-outline">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                      View Resume
                    </a>
                  ` : ''}
                </div>

                ${socialLinksHtml ? `<div class="pf-social-links">${socialLinksHtml}</div>` : ''}
              </div>
            </div>
          </div>
        </header>

        <!-- Skills Section -->
        ${skillsHtml}

        <!-- Experience Section -->
        ${experienceHtml}

        <!-- Education Section -->
        ${educationHtml}

        <!-- Projects Section -->
        ${projectsHtml}

        <!-- Contact CTA Section -->
        <section id="pf-contact" class="pf-section">
          <div class="pf-container">
            <div class="pf-contact-box">
              <h2 class="pf-contact-title">Let's work together</h2>
              <p class="pf-contact-desc">
                Interested in collaborating or discussing opportunities? Feel free to reach out directly.
              </p>
              <div class="pf-contact-actions">
                ${contact.email ? `
                  <a href="mailto:${escapeHtml(contact.email)}" class="pf-btn pf-btn-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Send an Email
                  </a>
                ` : ''}
                ${contact.phone ? `
                  <a href="tel:${escapeHtml(contact.phone)}" class="pf-btn pf-btn-outline">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    ${escapeHtml(contact.phone)}
                  </a>
                ` : ''}
              </div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="pf-footer">
          <div class="pf-container">
            <p>&copy; ${new Date().getFullYear()} ${escapeHtml(personal.fullName || 'ShowCaseX')}. Generated with <a href="#home">ShowCaseX</a>.</p>
          </div>
        </footer>
      </div>
    `;
  }

  function updateThemeSwitcherUI(theme) {
    btnThemeLight.classList.toggle('active', theme === 'minimal-light');
    btnThemeDark.classList.toggle('active', theme === 'modern-dark');
    btnThemeIndigo.classList.toggle('active', theme === 'indigo-slate');
  }

  function switchTheme(newTheme) {
    portfolioData.theme = newTheme;
    portfolioCanvas.className = `portfolio-canvas theme-${newTheme}`;
    updateThemeSwitcherUI(newTheme);
    saveToStorage();
    showToast(`Theme switched to ${newTheme.replace('-', ' ')}`);
  }

  btnThemeLight.addEventListener('click', () => switchTheme('minimal-light'));
  btnThemeDark.addEventListener('click', () => switchTheme('modern-dark'));
  btnThemeIndigo.addEventListener('click', () => switchTheme('indigo-slate'));

  // ==========================================================================
  // 12. Share Modal & Encoded URL Generation
  // ==========================================================================
  function generateShareableUrl() {
    const encoded = encodePortfolioData(portfolioData);
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}#portfolio=${encoded}`;
  }

  btnShareModalOpen.addEventListener('click', () => {
    syncFormToState();
    const shareUrl = generateShareableUrl();
    shareUrlInput.value = shareUrl;
    shareModal.classList.add('active');
    shareModal.setAttribute('aria-hidden', 'false');
    shareUrlInput.select();
  });

  modalCloseBtn.addEventListener('click', () => {
    shareModal.classList.remove('active');
    shareModal.setAttribute('aria-hidden', 'true');
  });

  shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) {
      shareModal.classList.remove('active');
      shareModal.setAttribute('aria-hidden', 'true');
    }
  });

  modalCopyLinkBtn.addEventListener('click', async () => {
    const url = shareUrlInput.value;
    if (!url) return;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        shareUrlInput.select();
        document.execCommand('copy');
      }
      showToast('Link copied to clipboard!');
    } catch (err) {
      shareUrlInput.select();
      document.execCommand('copy');
      showToast('Link copied to clipboard!');
    }
  });

  modalOpenTabBtn.addEventListener('click', () => {
    const url = shareUrlInput.value;
    if (url) {
      window.open(url, '_blank');
    }
  });

  // ==========================================================================
  // 13. Standalone HTML Downloader
  // ==========================================================================
  btnDownloadHtml.addEventListener('click', () => {
    syncFormToState();
    const data = portfolioData;
    const name = data.personal.fullName || 'portfolio';
    const cleanFileName = name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_portfolio.html';

    // Self-contained HTML with embedded styles and responsive markup
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(data.personal.fullName || 'Portfolio')} — ShowCaseX</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    /* Reset & Base */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { font-size: 16px; scroll-behavior: smooth; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.5; min-height: 100vh; }
    a { color: inherit; text-decoration: none; }
    img, svg { display: block; max-width: 100%; }

    /* Themes */
    .theme-minimal-light {
      --pf-bg: #ffffff; --pf-surface: #f8fafc; --pf-card: #ffffff; --pf-border: #e2e8f0;
      --pf-text: #0f172a; --pf-text-sub: #475569; --pf-text-muted: #64748b;
      --pf-accent: #0284c7; --pf-accent-hover: #0369a1; --pf-tag-bg: #f1f5f9; --pf-tag-text: #334155;
    }
    .theme-modern-dark {
      --pf-bg: #09090b; --pf-surface: #121215; --pf-card: #18181b; --pf-border: #27272a;
      --pf-text: #f4f4f5; --pf-text-sub: #a1a1aa; --pf-text-muted: #71717a;
      --pf-accent: #38bdf8; --pf-accent-hover: #0ea5e9; --pf-tag-bg: #27272a; --pf-tag-text: #e4e4e7;
    }
    .theme-indigo-slate {
      --pf-bg: #0f172a; --pf-surface: #1e293b; --pf-card: #1e293b; --pf-border: #334155;
      --pf-text: #f8fafc; --pf-text-sub: #cbd5e1; --pf-text-muted: #94a3b8;
      --pf-accent: #818cf8; --pf-accent-hover: #6366f1; --pf-tag-bg: #334155; --pf-tag-text: #e2e8f0;
    }

    .pf-page { background-color: var(--pf-bg); color: var(--pf-text); min-height: 100vh; }
    .pf-container { max-width: 960px; margin: 0 auto; padding: 0 1.5rem; }
    
    /* Nav */
    .pf-nav { position: sticky; top: 0; z-index: 20; background-color: var(--pf-bg); border-bottom: 1px solid var(--pf-border); backdrop-filter: blur(8px); }
    .pf-nav-inner { display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; }
    .pf-nav-brand { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 1.125rem; }
    .pf-nav-links { display: flex; align-items: center; gap: 1.25rem; }
    .pf-nav-link { font-size: 0.875rem; font-weight: 500; color: var(--pf-text-sub); transition: color 0.15s; }
    .pf-nav-link:hover { color: var(--pf-accent); }

    /* Hero */
    .pf-hero { padding: 5rem 0 4rem; }
    .pf-hero-content { display: flex; flex-direction: column; align-items: flex-start; gap: 1.5rem; }
    .pf-avatar { width: 96px; height: 96px; border-radius: 20px; object-fit: cover; border: 2px solid var(--pf-border); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.07); }
    .pf-avatar-fallback { width: 96px; height: 96px; border-radius: 20px; background-color: var(--pf-surface); border: 2px solid var(--pf-border); color: var(--pf-accent); display: flex; align-items: center; justify-content: center; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 2rem; font-weight: 800; }
    .pf-hero-text { max-width: 720px; }
    .pf-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(2.25rem, 5vw, 3.25rem); font-weight: 800; letter-spacing: -0.035em; line-height: 1.15; margin-bottom: 0.5rem; }
    .pf-title { font-size: 1.25rem; font-weight: 600; color: var(--pf-accent); margin-bottom: 1rem; }
    .pf-bio { font-size: 1.05rem; color: var(--pf-text-sub); line-height: 1.65; margin-bottom: 1.5rem; }
    
    .pf-hero-actions { display: flex; align-items: center; gap: 0.875rem; flex-wrap: wrap; }
    .pf-btn { display: inline-flex; align-items: center; gap: 0.5rem; font-weight: 600; font-size: 0.9375rem; padding: 0.625rem 1.25rem; border-radius: 10px; transition: all 0.15s; }
    .pf-btn-primary { background-color: var(--pf-accent); color: #ffffff; }
    .pf-btn-primary:hover { background-color: var(--pf-accent-hover); transform: translateY(-1px); }
    .pf-btn-outline { background: transparent; color: var(--pf-text); border: 1px solid var(--pf-border); }
    .pf-btn-outline:hover { background-color: var(--pf-surface); }

    .pf-social-links { display: flex; align-items: center; gap: 0.625rem; margin-top: 1rem; flex-wrap: wrap; }
    .pf-social-btn { display: inline-flex; align-items: center; justify-content: center; width: 38px; height: 38px; border-radius: 10px; background: var(--pf-surface); border: 1px solid var(--pf-border); color: var(--pf-text-sub); transition: all 0.15s; }
    .pf-social-btn:hover { color: var(--pf-accent); border-color: var(--pf-accent); transform: translateY(-2px); }

    /* Sections */
    .pf-section { padding: 4rem 0; border-top: 1px solid var(--pf-border); }
    .pf-section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 2rem; display: flex; align-items: center; gap: 0.75rem; }
    .pf-section-title::after { content: ''; flex: 1; height: 1px; background-color: var(--pf-border); margin-left: 0.5rem; }

    /* Skills */
    .pf-skills-grid { display: flex; flex-wrap: wrap; gap: 0.625rem; }
    .pf-skill-pill { background-color: var(--pf-tag-bg); color: var(--pf-tag-text); font-size: 0.875rem; font-weight: 600; padding: 0.45rem 1rem; border-radius: 9999px; border: 1px solid var(--pf-border); }

    /* Cards */
    .pf-experience-list, .pf-education-list { display: flex; flex-direction: column; gap: 1.5rem; }
    .pf-card { background: var(--pf-card); border: 1px solid var(--pf-border); border-radius: 14px; padding: 1.5rem; }
    .pf-card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 0.5rem; flex-wrap: wrap; }
    .pf-card-role { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.125rem; font-weight: 700; }
    .pf-card-company { font-size: 0.9375rem; font-weight: 600; color: var(--pf-accent); }
    .pf-card-date { font-size: 0.8125rem; font-weight: 500; color: var(--pf-text-muted); background: var(--pf-tag-bg); padding: 0.2rem 0.6rem; border-radius: 9999px; }
    .pf-card-desc { font-size: 0.9375rem; color: var(--pf-text-sub); line-height: 1.6; margin-top: 0.75rem; white-space: pre-line; }

    /* Projects */
    .pf-projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .pf-project-card { background: var(--pf-card); border: 1px solid var(--pf-border); border-radius: 14px; padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between; gap: 1.25rem; }
    .pf-project-name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; }
    .pf-project-desc { font-size: 0.9375rem; color: var(--pf-text-sub); line-height: 1.6; }
    .pf-tech-badge { font-size: 0.75rem; font-weight: 600; background: var(--pf-tag-bg); color: var(--pf-tag-text); padding: 0.2rem 0.55rem; border-radius: 6px; border: 1px solid var(--pf-border); }
    .pf-project-links { display: flex; align-items: center; gap: 0.75rem; margin-top: auto; padding-top: 0.75rem; border-top: 1px solid var(--pf-border); }
    .pf-project-link { display: inline-flex; align-items: center; gap: 0.35rem; font-size: 0.8125rem; font-weight: 600; color: var(--pf-text-sub); }
    .pf-project-link:hover { color: var(--pf-accent); }

    /* Contact */
    .pf-contact-box { background: var(--pf-surface); border: 1px solid var(--pf-border); border-radius: 20px; padding: 3rem 2rem; text-align: center; }
    .pf-contact-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1.75rem; font-weight: 800; margin-bottom: 0.75rem; }
    .pf-contact-desc { font-size: 1rem; color: var(--pf-text-sub); max-width: 540px; margin: 0 auto 1.75rem; line-height: 1.6; }
    .pf-contact-actions { display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; }

    /* Footer */
    .pf-footer { padding: 3rem 0; border-top: 1px solid var(--pf-border); text-align: center; font-size: 0.8125rem; color: var(--pf-text-muted); }

    @media (max-width: 680px) {
      .pf-nav-links { display: none; }
      .pf-hero { padding: 3rem 0; }
    }
  </style>
</head>
<body class="theme-${data.theme || 'minimal-light'}">
  ${portfolioCanvas.innerHTML}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = cleanFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    showToast(`Downloaded ${cleanFileName}`);
  });

  // ==========================================================================
  // 14. Clear Data Modal Handlers
  // ==========================================================================
  builderClearBtn.addEventListener('click', () => {
    clearConfirmModal.classList.add('active');
    clearConfirmModal.setAttribute('aria-hidden', 'false');
  });

  function closeClearModal() {
    clearConfirmModal.classList.remove('active');
    clearConfirmModal.setAttribute('aria-hidden', 'true');
  }

  clearModalCloseBtn.addEventListener('click', closeClearModal);
  clearCancelBtn.addEventListener('click', closeClearModal);

  clearConfirmBtn.addEventListener('click', () => {
    portfolioData = JSON.parse(JSON.stringify(defaultData));
    localStorage.removeItem(STORAGE_KEY);
    populateFormFromState();
    closeClearModal();
    showToast('All portfolio data cleared', 'info');
  });

  // ==========================================================================
  // 15. Demo Buttons & Navigation Listeners
  // ==========================================================================
  function loadDemo() {
    portfolioData = JSON.parse(JSON.stringify(demoData));
    saveToStorage();
    populateFormFromState();
    showToast('Loaded demo developer profile');
  }

  builderLoadDemoBtn.addEventListener('click', loadDemo);

  [homeDemoBtn, heroDemoBtn].forEach(btn => {
    btn.addEventListener('click', () => {
      loadDemo();
      window.location.hash = '#preview';
    });
  });

  [homeStartBtn, heroBuildBtn, bottomBuildBtn].forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.hash = '#builder';
    });
  });

  builderBackHomeBtn.addEventListener('click', () => {
    window.location.hash = '#home';
  });

  previewBackBuilderBtn.addEventListener('click', () => {
    window.location.hash = '#builder';
  });

  previewHomeBtn.addEventListener('click', () => {
    window.location.hash = '#home';
  });

  // ==========================================================================
  // 16. Application Initialization
  // ==========================================================================
  function init() {
    // Check if initial URL has portfolio payload
    const hash = window.location.hash;
    if (hash.startsWith('#portfolio=')) {
      handleRoute();
      return;
    }

    // Try loading saved data from localStorage
    const hasSaved = loadFromStorage();
    if (!hasSaved) {
      portfolioData = JSON.parse(JSON.stringify(defaultData));
    }

    handleRoute();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
