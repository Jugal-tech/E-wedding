# Royal Rajasthani Indian Wedding Website
**Aarav Singh & Priya Rathore • Jaipur, Rajasthan (Feb 17–19, 2027)**

This project is a complete, production-ready static website converted from React into a clean, modular **HTML5, CSS3, and JavaScript** architecture with proper file division and zero build tool dependencies.

---

## 📁 File Structure

```
d:\wedding\
├── index.html          # Semantic HTML5 markup, accessible landmarks & SVG symbol defs
├── css\
│   └── style.css       # Master stylesheet (custom properties, 3D tilt, animations, responsive design)
├── js\
│   ├── data.js         # Event data, couple story, photo dataset, fallback SVG generator
│   ├── audio.js        # Pure Web Audio API synthesiser (Tanpura, Sitar, Tabla & Temple Bell)
│   └── app.js          # Stage controller, countdown timer, gallery filter, lightbox, modals & guestbook
└── README.md           # Documentation & feature overview
```

---

## ✨ Features & Architecture

### 1. Stage-Based Experience
* **Stage 1 (Invitation Card):** 3D tilting Jharokha arch invitation card tracking mouse coordinates, sacred Ganesh shloka, royal lotus crest, and sliding palace doors opening animation.
* **Stage 2 (Welcome Screen):** Fullscreen cinematic varmala background, live countdown timer to the wedding date (`18 Feb 2027, 7:00 PM IST`), and ambient music toggle.
* **Stage 3 (Main Wedding Portal):** Full wedding website with sticky royal navigation bar, reading progress bar, hero couple portrait, love story timeline, celebrations, cinematic gallery, 4K wedding film player, guestbook, and footer.

### 2. Pure Web Audio API Synthesiser (`js/audio.js`)
* **Zero External Audio Files Needed:** Synthesizes sound directly in the browser using the Web Audio API.
* **Auspicious Temple Bell (Ghanti):** 4 tuned harmonic partials for metallic temple resonance when opening the card or clicking "Chime Temple Bell".
* **Tanpura Drone:** Multi-oscillator drone (Sa - Pa - Sa' - Ni).
* **Raag Yaman Sitar / Santoor:** Microtonal glides (meend) with shimmer resonance.
* **Royal Tabla:** Dynamic Bayan (bass pulse) & Dayan (crisp tap) rhythm.
* **Volume Slider & Mixer:** Fine-tune volume levels or chime the bell on demand.

### 3. Interactive Components (`js/app.js`)
* **Live Countdown Timer:** Calculates days, hours, minutes, and seconds dynamically.
* **Six Royal Celebrations:** Interactive event cards with color swatches, dress codes, and a detailed ceremony modal with photo galleries.
* **Cinematic Gallery with Filter Pills:** Filter by *All, Pre-Wedding, Haldi, Mehendi, Sangeet, Baraat & Pheras, Reception*.
* **Full-Screen Lightbox:** Next / Previous navigation, photo/video playback, captions, and keyboard shortcuts (`Escape`, `ArrowLeft`, `ArrowRight`).
* **Wedding Film Player:** 4K video showcase that automatically pauses background sitar music during playback.
* **Interactive Guestbook with Photo Upload:** Client-side `FileReader` image preview, validation, demo session badges, and persistent live wall.
* **Share Link:** One-click clipboard copy with animated toast notification.
* **Floating Back-to-Top:** Smoothly scrolls back to top when scrolling down.
* **Zero Broken Images:** Handcrafted SVG fallback generator (`createIndianWeddingFallback`) displays a royal Rajputana Mehraab arch if any remote photo fails to load.

---

## 🚀 How to Run

1. **Directly in Browser:** Double-click [index.html](file:///d:/wedding/index.html) to open directly in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.
2. **Local Server (Optional):** You can also serve it with any static server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Or using VS Code Live Server extension
   ```
