// Accordion Controls for Thumbnails
document.querySelectorAll('.thumbnail-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.closest('.toggle-marks-btn') || e.target.closest('.inline-view-btn') || e.target.closest('.edu-nav-tab') || e.target.closest('.clickable-name') || e.target.closest('.profile-badge-link')) return;
        
        const panel = button.nextElementSibling;
        button.classList.toggle('active');
        
        if (panel.style.maxHeight && panel.style.maxHeight !== '0px') {
            panel.style.maxHeight = '0px';
        } else {
            document.querySelectorAll('.panel').forEach(p => p.style.maxHeight = '0px');
            document.querySelectorAll('.thumbnail-btn').forEach(b => b.classList.remove('active'));
            
            button.classList.add('active');
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});

// Education Sub-Tab Content Switcher
function switchEduTab(event, targetTabId) {
    event.stopPropagation();
    
    const activeSection = event.target.closest('.panel');
    activeSection.querySelectorAll('.edu-nav-tab').forEach(tab => tab.classList.remove('active-tab'));
    event.target.classList.add('active-tab');

    activeSection.querySelectorAll('.edu-tab-content').forEach(content => content.classList.remove('active-content'));
    const destinationContent = document.getElementById(targetTabId);
    destinationContent.classList.add('active-content');

    activeSection.style.maxHeight = 'none';
    activeSection.style.maxHeight = activeSection.scrollHeight + "px";
}

// Toggle Institutional Info Visual Cards
function toggleInstitutionCard(cardId) {
    const card = document.getElementById(cardId);
    const parentPanel = card.closest('.panel');
    
    if (card.style.display === 'block') {
        card.style.display = 'none';
    } else {
        card.style.display = 'block';
    }
    
    if (parentPanel) {
        parentPanel.style.maxHeight = 'none';
        parentPanel.style.maxHeight = parentPanel.scrollHeight + "px";
    }
}

// Subject Marks Table Toggles
function toggleMarks(event, id) {
    event.stopPropagation(); 
    
    const container = document.getElementById(id);
    const btn = event.target;
    const parentPanel = container.closest('.panel');
    
    if (container.style.maxHeight && container.style.maxHeight !== '0px') {
        container.style.maxHeight = '0px';
        btn.innerText = id === 'marks12' ? '📊 Show Class XII Marks' : '📊 Show Class X Marks';
    } else {
        container.style.maxHeight = container.scrollHeight + "px";
        btn.innerText = id === 'marks12' ? '🙈 Hide Class XII Marks' : '🙈 Hide Class X Marks';
    }
    
    setTimeout(() => {
        if (parentPanel) {
            parentPanel.style.maxHeight = 'none';
            parentPanel.style.maxHeight = parentPanel.scrollHeight + "px";
        }
    }, 50);
}

// Certificate Pop-Up Modal Viewer
function openCertModal(type) {
    const modal = document.getElementById('certModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    
    if (type === 'alison') {
        title.innerText = "Alison Verification Hub";
        body.innerHTML = `
            <h2 style="color: #ffffff; margin-bottom:10px;">🏆 AWARD CERTIFICATE</h2>
            <p style="font-size:1.1rem; margin-bottom:15px; color:#e2e8f0;">Presented to: <strong>KAMAL KANT THAKUR</strong></p>
            <p style="margin-bottom:8px; color:#94a3b8;">For successfully validating comprehensive technical skills inside:</p>
            <h3 style="color: #34d399; margin-bottom:15px; font-size:1.2rem;">Project Management Professional Course</h3>
            <p style="font-size:0.85rem; color:#6b7280;">Date Verified: 27th April, 2024<br>Credential Identifier: 980-20084437</p>
        `;
    } else if (type === 'learntube') {
        title.innerText = "LearnTube.ai Assessment Registry";
        body.innerHTML = `
            <h2 style="color: #ffffff; margin-bottom:10px;">🎖️ P.E.A.K.S. PLACEMENT CERTIFICATE</h2>
            <p style="font-size:1.1rem; margin-bottom:15px; color:#e2e8f0;">Presented to: <strong>KAMAL KANT THAKUR</strong></p>
            <p style="margin-bottom:8px; color:#94a3b8;">For structural competency excellence tracking across:</p>
            <h3 style="color: #38bdf8; margin-bottom:15px; font-size:1.2rem;">Real Job Scenario Project Management Assessment</h3>
            <p style="font-size:0.85rem; color:#6b7280;">Issue Date: June 14, 2026<br>Evaluation Registry ID: DJA-B-1-2635535-0</p>
        `;
    }
    modal.style.display = "flex";
}

function closeCertModal() {
    document.getElementById('certModal').style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById('certModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}