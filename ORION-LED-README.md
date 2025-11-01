# Orion-Led Proctored Exam Portal

A professional, front-end-only proctored examination system built with HTML, CSS, and JavaScript.

## 📋 Features

### Core Functionality
- ✅ **Professional UI** with clean, minimal design
- ✅ **15-minute countdown timer** with auto-submission
- ✅ **Live webcam feed** displayed in fixed window on the right
- ✅ **Microphone monitoring** throughout the exam
- ✅ **5 sample questions** for testing

### Proctoring & Security
- ✅ **Tab switch detection** with 5-warning system
- ✅ **Auto-submission after 6 tab switches**
- ✅ **Right-click disabled** (context menu blocked)
- ✅ **Text selection disabled** (prevents copy-paste)
- ✅ **Keyboard shortcuts disabled** (Ctrl+C, Ctrl+V, F12, DevTools, etc.)
- ✅ **Print Screen disabled**
- ✅ **Proctoring watermark** visible on screen
- ✅ **Single instance detection** (prevents multiple tabs)

### User Experience
- ✅ **Modal popups** for warnings and submissions
- ✅ **Warning counter** showing remaining violations
- ✅ **Visual indicators** for webcam status
- ✅ **Responsive design** for different screen sizes
- ✅ **Smooth animations** for all interactions

## 🚀 Getting Started

### Quick Start

1. Open `orion-led.html` in a modern web browser
2. Click **"Start Exam"** button
3. Allow camera and microphone access when prompted
4. Begin answering questions

### File Structure

```
orion-led-portal/
├── orion-led.html      # Main HTML structure
├── orion-led.css       # Styles and layout
├── orion-led.js        # Exam logic and security
└── ORION-LED-README.md # This file
```

## 📖 How It Works

### 1. Initialization
- User opens the portal
- Exam info and instructions are displayed
- User clicks "Start Exam"

### 2. Permission Request
- Browser requests camera and microphone access
- If denied, exam cannot start (shows error)
- If allowed, webcam feed activates

### 3. Exam Process
- 15-minute countdown begins
- Webcam feed displays in fixed container on right
- User answers 5 multiple-choice questions
- Timer turns red when less than 1 minute remains

### 4. Tab Switch Handling
- **1-5 switches**: Shows warning modal with remaining count
- **6+ switches**: Auto-submits the exam
- Counter persists until page reload

### 5. Submission
- **Manual**: Click "Submit Exam" button
- **Timeout**: Automatic after 15 minutes
- **Violation**: Automatic after 6+ tab switches

## 🔒 Security Features

### Disabled Actions
- Right-click context menu
- Text selection
- Copy (Ctrl+C)
- Paste (Ctrl+V)
- Cut (Ctrl+X)
- Select All (Ctrl+A)
- Print Screen
- F12 (Developer Tools)
- Ctrl+Shift+I/J/C (DevTools shortcuts)
- Ctrl+U (View Source)
- Ctrl+P (Print)
- Ctrl+S (Save Page)

### Active Protections
- Tab switch detection
- Window blur detection
- Single instance enforcement
- Required media permissions
- Before-unload confirmation

## 🎨 UI Components

### Header
- Exam title
- Countdown timer with label

### Webcam Feed
- Fixed position (top-right)
- Live indicator with blinking dot
- "Orion-Led Proctoring Active" footer
- 240x180px container

### Watermark
- "ORION-LED PROCTORED" diagonal text
- Semi-transparent overlay
- Always visible during exam

### Modals
- **Warning Modal**: Tab switch alerts
- **Submit Modal**: Confirmation messages
- **Error Modal**: Permission/system errors

## ⚙️ Configuration

### Timer Duration
Edit in `orion-led.js` line 10:
```javascript
let totalSeconds = 15 * 60; // Change 15 to your desired minutes
```

### Warning Threshold
Edit in `orion-led.js` line 234:
```javascript
if (tabSwitchCount <= 5) { // Change 5 to your desired threshold
```

### Questions
Add/modify questions in `orion-led.html` (questions-container section)

## 🌐 Browser Compatibility

**Supported:**
- Chrome (recommended)
- Firefox
- Edge
- Safari
- Opera

**Requirements:**
- Modern browser with getUserMedia API support
- Camera and microphone access
- JavaScript enabled

## 🧪 Testing Checklist

- [ ] Open portal in browser
- [ ] Click "Start Exam"
- [ ] Allow camera/mic permissions
- [ ] Verify webcam feed appears
- [ ] Check countdown timer starts
- [ ] Answer some questions
- [ ] Test tab switching (warning popup)
- [ ] Switch tabs 6 times (auto-submit)
- [ ] Test right-click (should be disabled)
- [ ] Test Ctrl+C (should be disabled)
- [ ] Test F12 (should be disabled)
- [ ] Wait for timer to reach 0 (auto-submit)
- [ ] Manually submit exam

## 📝 Notes

- **No Backend Required**: This is a pure front-end implementation
- **Local Storage**: Used only for single-instance detection
- **No Data Persistence**: Answers are logged to console only
- **Production Ready**: Can be deployed to any static hosting

## 🔮 Future Enhancements

Potential additions for production:
- Backend API integration
- Database storage
- User authentication
- Session management
- PDF report generation
- Advanced cheating detection
- Screen recording
- AI-based proctoring

## 📄 License

ISC License - Free to use and modify

## 👤 Support

For issues or questions, refer to the code comments in `orion-led.js`.

---

**Built with ❤️ using Vanilla JavaScript**

