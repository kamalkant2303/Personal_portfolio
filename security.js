// ====================================================================
// SECURITY.JS - Comprehensive Client-Side Security Infrastructure
// ====================================================================

(function () {
    'use strict';

    // Track page initialization timestamp for Time-Based Bot Trap
    const pageLoadTime = Date.now();

    // ----------------------------------------------------------------
    // 1. Anti-Clickjacking / Frameguard Defense
    // Prevents unauthorized third-party websites from framing your site
    // ----------------------------------------------------------------
    function enforceFrameSecurity() {
        if (window.top !== window.self) {
            try {
                if (window.top.location.hostname !== window.self.location.hostname) {
                    window.top.location.href = window.self.location.href;
                }
            } catch (e) {
                document.body.innerHTML = "<h2 style='color:#f472b6; text-align:center; margin-top:50px;'>⚠️ Security Error: Unauthorized Embedding Blocked.</h2>";
            }
        }
    }

    // ----------------------------------------------------------------
    // 2. Comprehensive Input Sanitization Engine (Anti-XSS)
    // Encodes HTML special characters & strips dangerous URI protocols
    // ----------------------------------------------------------------
    function sanitizeInput(inputString) {
        if (typeof inputString !== 'string') return '';
        let sanitized = inputString
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
        
        // Strip javascript: pseudo-protocols
        if (/javascript:/i.test(sanitized)) {
            sanitized = sanitized.replace(/javascript:/gi, '');
        }
        return sanitized.trim();
    }

    // ----------------------------------------------------------------
    // 3. Client-Side Rate Limiter & Cooldown Engine
    // Blocks automated scripts from spamming submission requests
    // ----------------------------------------------------------------
    function checkRateLimit(actionKey, cooldownSeconds = 60) {
        const lastExecuted = localStorage.getItem(`sec_timer_${actionKey}`);
        if (lastExecuted) {
            const elapsed = (Date.now() - parseInt(lastExecuted, 10)) / 1000;
            if (elapsed < cooldownSeconds) {
                const remaining = Math.ceil(cooldownSeconds - elapsed);
                return { allowed: false, remainingTime: remaining };
            }
        }
        return { allowed: true, remainingTime: 0 };
    }

    function updateRateLimit(actionKey) {
        localStorage.setItem(`sec_timer_${actionKey}`, Date.now().toString());
    }

    // ----------------------------------------------------------------
    // 4. Honeypot Bot Trap Detector
    // Catches automated web crawlers filling hidden fields
    // ----------------------------------------------------------------
    function isHoneypotTriggered(formElement) {
        const trapField = formElement.querySelector('input[name="_website_hp"]');
        return trapField && trapField.value.trim() !== "";
    }

    // ----------------------------------------------------------------
    // 5. Time-Based Human Verification Trap
    // Automated bots submit forms instantly (<3 seconds from page load)
    // ----------------------------------------------------------------
    function isSubmittedTooFast(minimumSeconds = 3) {
        const elapsedSeconds = (Date.now() - pageLoadTime) / 1000;
        return elapsedSeconds < minimumSeconds;
    }

    // Initialize frame protection immediately
    enforceFrameSecurity();

    // Export frozen (tamper-proof) security object
    const SecurityModule = {
        sanitizeInput: sanitizeInput,
        checkRateLimit: checkRateLimit,
        updateRateLimit: updateRateLimit,
        isHoneypotTriggered: isHoneypotTriggered,
        isSubmittedTooFast: isSubmittedTooFast
    };

    window.PortfolioSecurity = Object.freeze(SecurityModule);
})();