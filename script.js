// ====================================================================
// PORTFOLIO LOGIC ENGINE
// Handles Accordion Drawers, Tabs, Modals, and Terminal CLI
// ====================================================================

document.addEventListener('DOMContentLoaded', function () {
    
    // ----------------------------------------------------------------
    // 1. ACCORDION EXPANSION DRAWER LOGIC
    // ----------------------------------------------------------------
    const accordionButtons = document.querySelectorAll('.thumbnail-btn');

    accordionButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('active');
            const panel = this.nextElementSibling;

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // Helper to recalculate open drawer heights dynamically
    window.recalculatePanelHeight = function (element) {
        const panel = element.closest('.panel');
        if (panel && panel.style.maxHeight) {
            panel.style.maxHeight = panel.scrollHeight + 500 + "px";
        }
    };

    // ----------------------------------------------------------------
    // 2. EDUCATION SUB-NAV TAB SWITCHER
    // ----------------------------------------------------------------
    window.switchEduTab = function (evt, tabId) {
        const tabContents = document.querySelectorAll('.edu-tab-content');
        tabContents.forEach(content => content.classList.remove('active-content'));

        const tabButtons = document.querySelectorAll('.edu-nav-tab');
        tabButtons.forEach(btn => btn.classList.remove('active-tab'));

        document.getElementById(tabId).classList.add('active-content');
        evt.currentTarget.classList.add('active-tab');

        recalculatePanelHeight(evt.currentTarget);
    };

    // ----------------------------------------------------------------
    // 3. INSTITUTION CARD & MARKS TOGGLE LOGIC
    // ----------------------------------------------------------------
    window.toggleInstitutionCard = function (cardId) {
        const card = document.getElementById(cardId);
        if (card) {
            const isHidden = card.style.display === 'none' || card.style.display === '';
            card.style.display = isHidden ? 'block' : 'none';
            recalculatePanelHeight(card);
        }
    };

    window.toggleMarks = function (evt, marksId) {
        const marksBox = document.getElementById(marksId);
        if (marksBox) {
            const isHidden = marksBox.style.display === 'none' || marksBox.style.display === '';
            marksBox.style.display = isHidden ? 'block' : 'none';
            evt.target.textContent = isHidden ? "📊 Hide Marks Breakdown" : "📊 Show Marks";
            recalculatePanelHeight(marksBox);
        }
    };

    // ----------------------------------------------------------------
    // 4. MODAL LOGIC (CERTIFICATES & FEATURE #5: RESUME PDF VIEWER)
    // ----------------------------------------------------------------
    const modal = document.getElementById('certModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    window.openCertModal = function (certType) {
        modal.style.display = 'block';
        if (certType === 'alison') {
            modalTitle.textContent = 'Alison Certificate: Project Management';
            modalBody.innerHTML = `
                <p><strong>Verified Credential:</strong> Completion of Project Management Course</p>
                <p><strong>Issued By:</strong> Alison Learning Systems</p>
                <p><strong>Status:</strong> Verified & Completed</p>
                <div style="margin-top:15px; padding:12px; background-color:#030712; border:1px solid #1f2937; border-radius:6px;">
                    📜 Credential Record ID: ALISON-PM-2024-VERIFIED
                </div>
            `;
        } else if (certType === 'learntube') {
            modalTitle.textContent = 'LearnTube Certificate: Project Management Assessment';
            modalBody.innerHTML = `
                <p><strong>Verified Credential:</strong> Project Management Technical Assessment</p>
                <p><strong>Issued By:</strong> LearnTube Portal</p>
                <p><strong>Status:</strong> Passed with Distinction</p>
                <div style="margin-top:15px; padding:12px; background-color:#030712; border:1px solid #1f2937; border-radius:6px;">
                    📜 Assessment Record ID: LT-PMA-2024-PASS
                </div>
            `;
        }
    };

    window.openResumeModal = function () {
        modal.style.display = 'block';
        modalTitle.textContent = 'Standardized Resume Document';
        modalBody.innerHTML = `
            <p style="margin-bottom:10px;">Viewing verified resume file (<code>resume.pdf</code>):</p>
            <iframe src="resume.pdf" style="width:100%; height:450px; border:1px solid #1f2937; border-radius:6px;" title="Resume PDF Document">
                <p>Your browser does not support PDF iframes. <a href="resume.pdf" target="_blank" style="color:#00f5ff;">Click here to download resume.pdf</a></p>
            </iframe>
        `;
    };

    window.closeCertModal = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // ----------------------------------------------------------------
    // 5. FEATURE #1: INTERACTIVE COMMAND LINE TERMINAL CLI LOGIC
    // ----------------------------------------------------------------
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');

    if (terminalInput && terminalBody) {
        terminalInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                this.value = '';

                // Echo command
                const line = document.createElement('div');
                line.className = 'terminal-line';
                line.innerHTML = `<span class="cmd-prompt">kamal@portfolio:~$</span> ${command}`;
                terminalBody.appendChild(line);

                // Process response
                const response = document.createElement('div');
                response.className = 'terminal-response';

                switch (command) {
                    case 'help':
                        response.innerHTML = `Available commands:<br>
                        - <span class="highlight">whoami</span> : Brief background summary<br>
                        - <span class="highlight">skills</span> : List technical stack<br>
                        - <span class="highlight">projects</span> : Show key repositories<br>
                        - <span class="highlight">education</span> : Show academic background<br>
                        - <span class="highlight">resume</span> : Open PDF resume modal<br>
                        - <span class="highlight">contact</span> : Show email / message link<br>
                        - <span class="highlight">clear</span> : Clear terminal screen`;
                        break;
                    case 'whoami':
                        response.innerHTML = "Kamal Kant Thakur — B.Tech Computer Science (AIML) Student at AITD Kanpur / AKTU Lucknow.";
                        break;
                    case 'skills':
                        response.innerHTML = "Core Languages: Python, C/C++, SQL.<br>Frameworks: Data Structures & Algorithms, Software Engineering, RDBMS.";
                        break;
                    case 'projects':
                        response.innerHTML = "1. Bank Management System (Python & MySQL)<br>2. Cryptography System (Encryption Engine)";
                        break;
                    case 'education':
                        response.innerHTML = "B.Tech CSE (AIML) @ AITD Kanpur (2023-2027)<br>Class XII @ Lucknow Public School (66.4%)<br>Class X @ Lucknow Public School (94.8%)";
                        break;
                    case 'resume':
                        openResumeModal();
                        response.innerHTML = "📄 Opening Resume PDF viewer modal...";
                        break;
                    case 'contact':
                        response.innerHTML = "Email: kamalkantthakur0023@gmail.com | Use bottom contact portal to send a direct message.";
                        break;
                    case 'clear':
                        terminalBody.innerHTML = '';
                        return;
                    case '':
                        return;
                    default:
                        response.innerHTML = `Command not recognized: '<span class="highlight">${command}</span>'. Type '<span class="highlight">help</span>' for options.`;
                }

                terminalBody.appendChild(response);
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }

});