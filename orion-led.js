/* ============================================
   Orion-Led Proctored Exam Portal - Logic
   ============================================ */

// Global Variables
let mediaStream = null;
let timerInterval = null;
let totalSeconds = 15 * 60; // 15 minutes
let examStarted = false;
let tabSwitchCount = 0;
let webcamDenied = false;

// DOM Elements
const timerDisplay = document.getElementById('timer');
const examInfoSection = document.getElementById('examInfoSection');
const examSection = document.getElementById('examSection');
const webcamContainer = document.getElementById('webcamContainer');
const webcamVideo = document.getElementById('webcamVideo');
const startBtn = document.getElementById('startBtn');

// ============================================
// SECURITY FEATURES
// ============================================

// Disable right-click context menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

// Disable developer tools shortcuts
document.addEventListener('keydown', (e) => {
    // Disable F12
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+C (Inspect)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+P (Print)
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+S (Save Page)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+A (Select All)
    if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+C (Copy)
    if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+V (Paste)
    if (e.ctrlKey && e.key === 'v') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+X (Cut)
    if (e.ctrlKey && e.key === 'x') {
        e.preventDefault();
        return false;
    }
    
    // Disable Print Screen
    if (e.key === 'PrintScreen') {
        e.preventDefault();
        return false;
    }
});

// Prevent text selection via CSS is in the CSS file

// ============================================
// TIMER LOGIC
// ============================================

function updateTimer() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Warning when less than 1 minute
    if (totalSeconds <= 60) {
        timerDisplay.classList.add('warning');
    }
    
    totalSeconds--;
    
    // Auto-submit when time is up
    if (totalSeconds < 0) {
        autoSubmitExam();
    }
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// ============================================
// WEBCAM AND MEDIA LOGIC
// ============================================

async function initExam() {
    try {
        // Request camera and microphone access
        startBtn.textContent = 'Requesting Access...';
        startBtn.disabled = true;
        
        mediaStream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 }
            },
            audio: true
        });
        
        // Set video source
        webcamVideo.srcObject = mediaStream;
        
        // Show webcam container
        webcamContainer.style.display = 'block';
        
        // Start the exam
        examStarted = true;
        examInfoSection.style.display = 'none';
        examSection.classList.add('active');
        
        // Start timer
        startTimer();
        
        // Add event listeners for tab switching
        setupTabSwitchDetection();
        
    } catch (error) {
        console.error('Error accessing media devices:', error);
        webcamDenied = true;
        showError('Camera and microphone access is required to start the exam. Please refresh the page and allow access.');
        startBtn.disabled = false;
        startBtn.textContent = 'Start Exam';
    }
}

function stopWebcam() {
    if (mediaStream) {
        mediaStream.getTracks().forEach(track => {
            track.stop();
        });
        mediaStream = null;
    }
}

// ============================================
// TAB SWITCH DETECTION
// ============================================

function setupTabSwitchDetection() {
    // Visibility Change Event
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Window Blur Event
    window.addEventListener('blur', handleWindowBlur);
    
    // Prevent leaving the page
    window.addEventListener('beforeunload', handleBeforeUnload);
}

function handleVisibilityChange() {
    if (document.hidden && examStarted) {
        handleTabSwitch();
    }
}

function handleWindowBlur() {
    if (examStarted && !document.hidden) {
        handleTabSwitch();
    }
}

function handleBeforeUnload(e) {
    if (examStarted) {
        e.preventDefault();
        e.returnValue = 'Are you sure you want to leave? Your exam is still in progress.';
        return e.returnValue;
    }
}

function handleTabSwitch() {
    tabSwitchCount++;
    
    if (tabSwitchCount <= 5) {
        // Show warning popup
        showWarningModal();
    } else if (tabSwitchCount > 5) {
        // Auto-submit after 5 violations
        autoSubmitExam('tab-switch');
    }
}

// ============================================
// MODAL FUNCTIONS
// ============================================

function showWarningModal() {
    const warningModal = document.getElementById('warningModal');
    const countInfo = document.getElementById('countInfo');
    const remaining = 5 - tabSwitchCount;
    
    countInfo.textContent = `Tab switches: ${tabSwitchCount}. ${remaining} warning${remaining !== 1 ? 's' : ''} remaining before auto-submission.`;
    warningModal.classList.add('show');
    
    console.log(`Tab switch detected - Count: ${tabSwitchCount}`);
}

function closeWarningModal() {
    document.getElementById('warningModal').classList.remove('show');
}

function showSubmitModal(title, message) {
    const submitModal = document.getElementById('submitModal');
    document.getElementById('submitTitle').textContent = title;
    document.getElementById('submitMessage').textContent = message;
    submitModal.classList.add('show');
}

function closeSubmitModal() {
    document.getElementById('submitModal').classList.remove('show');
}

function showError(message) {
    const errorModal = document.getElementById('errorModal');
    document.getElementById('errorMessage').textContent = message;
    errorModal.classList.add('show');
}

function closeErrorModal() {
    document.getElementById('errorModal').classList.remove('show');
}

// ============================================
// CONFIRMATION MODAL FUNCTIONS
// ============================================

// Show confirmation modal for manual submissions
function showConfirmModal() {
    const confirmModal = document.getElementById('confirmModal');
    confirmModal.classList.add('show');
}

// Close confirmation modal without submitting
function closeConfirmModal() {
    document.getElementById('confirmModal').classList.remove('show');
}

// Confirm and proceed with submission
function confirmSubmission() {
    closeConfirmModal();
    // Proceed with actual submission
    processSubmission('manual');
}

// ============================================
// EXAM SUBMISSION
// ============================================

/**
 * Main submission handler - shows confirmation for manual submissions
 * @param {string} reason - 'manual', 'timeout', or 'tab-switch'
 */
function submitExam(reason = 'manual') {
    if (!examStarted) return;
    
    // Only show confirmation for manual submissions
    if (reason === 'manual') {
        showConfirmModal();
        return;
    }
    
    // Auto-submissions skip confirmation
    processSubmission(reason);
}

/**
 * Actual submission process - executes after confirmation or auto-trigger
 * @param {string} reason - Submission reason
 */
function processSubmission(reason) {
    // Stop timer
    stopTimer();
    
    // Stop webcam
    stopWebcam();
    
    // Collect answers
    const answers = {
        q1: document.querySelector('input[name="q1"]:checked')?.value || 'Not answered',
        q2: document.querySelector('input[name="q2"]:checked')?.value || 'Not answered',
        q3: document.querySelector('input[name="q3"]:checked')?.value || 'Not answered',
        q4: document.querySelector('input[name="q4"]:checked')?.value || 'Not answered',
        q5: document.querySelector('input[name="q5"]:checked')?.value || 'Not answered'
    };
    
    console.log('Exam Submitted:', answers);
    console.log('Submission Reason:', reason);
    console.log('Tab Switches:', tabSwitchCount);
    
    // Determine submission message
    let title, message;
    if (reason === 'timeout') {
        title = '⏰ Time\'s Up!';
        message = 'Your test has been submitted. Time limit reached.';
    } else if (reason === 'tab-switch') {
        title = '🚫 Test Auto-Submitted';
        message = 'Test auto-submitted due to multiple tab switches.';
    } else {
        title = '✅ Submission Complete';
        message = 'Your test has been submitted successfully.';
    }
    
    // Show submission modal
    showSubmitModal(title, message);
    
    // Hide exam section
    examSection.classList.remove('active');
    webcamContainer.style.display = 'none';
    
    examStarted = false;
}

/**
 * Auto-submission wrapper - skips confirmation
 * @param {string} reason - 'timeout' or 'tab-switch'
 */
function autoSubmitExam(reason = 'timeout') {
    processSubmission(reason);
}

// ============================================
// INITIALIZATION
// ============================================

// Prevent multiple instances
window.addEventListener('load', () => {
    if (localStorage.getItem('orionLedExamActive')) {
        alert('Another instance of this exam is already open. Please close other tabs.');
        window.close();
    }
    localStorage.setItem('orionLedExamActive', 'true');
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    stopWebcam();
    stopTimer();
    localStorage.removeItem('orionLedExamActive');
});

// Initialize on page load
console.log('Orion-Led Proctored Exam Portal Initialized');
console.log('Security features: Active');

