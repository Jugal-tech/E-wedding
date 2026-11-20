/**
 * Royal Rajasthani Indian Wedding - Interactive Application Controller
 * Aarav Singh & Priya Rathore • Jaipur, Rajasthan (Feb 17-19, 2027)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  const state = {
    currentStage: 'invitation', // 'invitation' | 'welcome' | 'main'
    isMusicPlaying: false,
    musicVolume: 0.24,
    galleryFilter: 'All',
    filteredGallery: [...window.GALLERY_ITEMS],
    activeLightboxIndex: null,
    wishes: [...window.INITIAL_WISHES],
    uploadedPhotoData: null,
    uploadedPhotoName: '',
    audioEngine: new window.RoyalAmbienceEngine()
  };

  // --------------------------------------------------------------------------
  // DOM ELEMENT REFERENCES
  // --------------------------------------------------------------------------
  const dom = {
    // Stages
    stageInvitation: document.getElementById('stage-invitation'),
    stageWelcome: document.getElementById('stage-welcome'),
    stageMain: document.getElementById('stage-main'),

    // Invitation Card
    cardDoorsLeft: document.getElementById('doors-left'),
    cardDoorsRight: document.getElementById('doors-right'),
    invitationCard: document.getElementById('invitation-card'),
    btnOpenInvitation: document.getElementById('btn-open-invitation'),

    // Welcome Screen
    btnBackInvitation: document.getElementById('btn-back-invitation'),
    btnWelcomeAudio: document.getElementById('btn-welcome-audio'),
    btnEnterWedding: document.getElementById('btn-enter-wedding'),
    countdownDays: document.getElementById('countdown-days'),
    countdownHours: document.getElementById('countdown-hours'),
    countdownMinutes: document.getElementById('countdown-minutes'),
    countdownSeconds: document.getElementById('countdown-seconds'),

    // Navigation
    royalNav: document.getElementById('royal-nav'),
    readingProgress: document.getElementById('reading-progress'),
    navLinks: document.querySelectorAll('.nav-link'),
    btnNavAudio: document.getElementById('btn-nav-audio'),
    btnAudioMixerToggle: document.getElementById('btn-audio-mixer-toggle'),
    audioMixerPopover: document.getElementById('audio-mixer-popover'),
    btnCloseMixer: document.getElementById('btn-close-mixer'),
    volumeSlider: document.getElementById('volume-slider'),
    volumePercentText: document.getElementById('volume-percent-text'),
    btnChimeBell: document.getElementById('btn-chime-bell'),
    btnReturnCard: document.getElementById('btn-return-card'),
    btnMenuToggle: document.getElementById('btn-menu-toggle'),
    mobileNavDrawer: document.getElementById('mobile-nav-drawer'),
    mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),

    // Sections & Dynamic Containers
    timelineContainer: document.getElementById('timeline-container'),
    celebrationsContainer: document.getElementById('celebrations-container'),
    galleryFiltersContainer: document.getElementById('gallery-filters-container'),
    galleryGridContainer: document.getElementById('gallery-grid-container'),
    btnShareWedding: document.getElementById('btn-share-wedding'),
    btnHeroCelebrations: document.getElementById('btn-hero-celebrations'),

    // Film
    filmPosterView: document.getElementById('film-poster-view'),
    filmVideoView: document.getElementById('film-video-view'),
    weddingFilmVideo: document.getElementById('wedding-film-video'),
    btnPlayFilm: document.getElementById('btn-play-film'),
    btnCloseFilm: document.getElementById('btn-close-film'),

    // Guestbook & Memories
    guestForm: document.getElementById('guestbook-form'),
    guestNameInput: document.getElementById('guest-name'),
    guestRelationInput: document.getElementById('guest-relation'),
    guestMessageInput: document.getElementById('guest-message'),
    photoFileInput: document.getElementById('photo-file-input'),
    uploadDropzone: document.getElementById('upload-dropzone'),
    uploadPlaceholder: document.getElementById('upload-placeholder'),
    uploadPreviewWrap: document.getElementById('upload-preview-wrap'),
    uploadPreviewImg: document.getElementById('upload-preview-img'),
    uploadFilenameText: document.getElementById('upload-filename-text'),
    formFeedback: document.getElementById('form-feedback'),
    blessingsWall: document.getElementById('blessings-wall'),

    // Floating & Modals
    btnBackToTop: document.getElementById('btn-back-to-top'),
    eventModal: document.getElementById('event-modal'),
    btnCloseEventModal: document.getElementById('btn-close-event-modal'),
    eventModalDay: document.getElementById('event-modal-day'),
    eventModalName: document.getElementById('event-modal-name'),
    eventModalDate: document.getElementById('event-modal-date'),
    eventModalVenue: document.getElementById('event-modal-venue'),
    eventModalDresscode: document.getElementById('event-modal-dresscode'),
    eventModalDesc: document.getElementById('event-modal-desc'),
    eventModalHighlight: document.getElementById('event-modal-highlight'),
    eventModalNote: document.getElementById('event-modal-note'),
    eventModalGallery: document.getElementById('event-modal-gallery'),

    lightboxModal: document.getElementById('lightbox-modal'),
    btnCloseLightbox: document.getElementById('btn-close-lightbox'),
    btnLightboxPrev: document.getElementById('btn-lightbox-prev'),
    btnLightboxNext: document.getElementById('btn-lightbox-next'),
    lightboxMediaFrame: document.getElementById('lightbox-media-frame'),
    lightboxCounter: document.getElementById('lightbox-counter'),
    lightboxTitle: document.getElementById('lightbox-title'),
    lightboxCaption: document.getElementById('lightbox-caption'),
    toastNotice: document.getElementById('toast-notice')
  };

  // --------------------------------------------------------------------------
  // STAGE CONTROLLER
  // --------------------------------------------------------------------------
  function setStage(stageName) {
    state.currentStage = stageName;

    // Reset visibility
    dom.stageInvitation.classList.remove('active');
    dom.stageWelcome.classList.remove('active');
    dom.stageMain.classList.remove('active');

    if (stageName === 'invitation') {
      dom.stageInvitation.classList.add('active');
      if (dom.cardDoorsLeft && dom.cardDoorsRight) {
        dom.cardDoorsLeft.classList.remove('opening');
        dom.cardDoorsRight.classList.remove('opening');
      }
      if (dom.invitationCard) {
        dom.invitationCard.style.opacity = '1';
        dom.invitationCard.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
      }
    } else if (stageName === 'welcome') {
      dom.stageWelcome.classList.add('active');
    } else if (stageName === 'main') {
      dom.stageMain.classList.add('active');
      updateScrollProgress();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --------------------------------------------------------------------------
  // INVITATION CARD 3D TILT EFFECT
  // --------------------------------------------------------------------------
  if (dom.invitationCard) {
    dom.invitationCard.addEventListener('mousemove', (e) => {
      const rect = dom.invitationCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotX = (-y * 7).toFixed(2);
      const rotY = (x * 7).toFixed(2);
      dom.invitationCard.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    dom.invitationCard.addEventListener('mouseleave', () => {
      dom.invitationCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  // Open Invitation Button Trigger
  if (dom.btnOpenInvitation) {
    dom.btnOpenInvitation.addEventListener('click', () => {
      // Play Auspicious Temple Bell Chime
      state.audioEngine.playTempleBellChime();

      // Auto-start ambient sitar and tanpura
      if (!state.isMusicPlaying) {
        state.audioEngine.start();
        state.isMusicPlaying = true;
        updateAudioButtons(true);
      }

      // Animate royal palace sliding doors opening
      if (dom.cardDoorsLeft && dom.cardDoorsRight) {
        dom.cardDoorsLeft.classList.add('opening');
        dom.cardDoorsRight.classList.add('opening');
      }
      if (dom.invitationCard) {
        dom.invitationCard.style.opacity = '0';
        dom.invitationCard.style.transform = 'scale(0.94)';
      }

      setTimeout(() => {
        setStage('welcome');
      }, 1050);
    });
  }

  if (dom.btnBackInvitation) {
    dom.btnBackInvitation.addEventListener('click', () => setStage('invitation'));
  }

  if (dom.btnEnterWedding) {
    dom.btnEnterWedding.addEventListener('click', () => setStage('main'));
  }

  if (dom.btnReturnCard) {
    dom.btnReturnCard.addEventListener('click', () => setStage('invitation'));
  }

  // --------------------------------------------------------------------------
  // AUDIO CONTROLS & SYNTHESIZER INTEGRATION
  // --------------------------------------------------------------------------
  function updateAudioButtons(isPlaying) {
    // Welcome Audio Button
    if (dom.btnWelcomeAudio) {
      dom.btnWelcomeAudio.innerHTML = isPlaying
        ? `<svg class="w-4 h-4 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg><span>Raag Yaman On</span>`
        : `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg><span>Play Sitar Ambience</span>`;
    }

    // Nav Audio Button
    if (dom.btnNavAudio) {
      dom.btnNavAudio.innerHTML = isPlaying
        ? `<svg class="w-4 h-4 animate-pulse text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg><span class="hidden md:inline">Raag On</span>`
        : `<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg><span class="hidden md:inline">Play Music</span>`;
    }
  }

  function toggleMusic() {
    const playing = state.audioEngine.toggle();
    state.isMusicPlaying = playing;
    updateAudioButtons(playing);
  }

  if (dom.btnWelcomeAudio) dom.btnWelcomeAudio.addEventListener('click', toggleMusic);
  if (dom.btnNavAudio) dom.btnNavAudio.addEventListener('click', toggleMusic);

  // Audio Mixer Popover Controls
  if (dom.btnAudioMixerToggle && dom.audioMixerPopover) {
    dom.btnAudioMixerToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dom.audioMixerPopover.classList.toggle('open');
    });

    if (dom.btnCloseMixer) {
      dom.btnCloseMixer.addEventListener('click', () => {
        dom.audioMixerPopover.classList.remove('open');
      });
    }

    document.addEventListener('click', (e) => {
      if (dom.audioMixerPopover && !dom.audioMixerPopover.contains(e.target) && e.target !== dom.btnAudioMixerToggle) {
        dom.audioMixerPopover.classList.remove('open');
      }
    });
  }

  if (dom.volumeSlider) {
    dom.volumeSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      state.musicVolume = val;
      state.audioEngine.setVolume(val);
      if (dom.volumePercentText) {
        dom.volumePercentText.textContent = `${Math.round((val / 0.45) * 100)}%`;
      }
      if (!state.isMusicPlaying) {
        state.audioEngine.start();
        state.isMusicPlaying = true;
        updateAudioButtons(true);
      }
    });
  }

  if (dom.btnChimeBell) {
    dom.btnChimeBell.addEventListener('click', () => {
      state.audioEngine.playTempleBellChime();
    });
  }

  // --------------------------------------------------------------------------
  // COUNTDOWN TIMER
  // --------------------------------------------------------------------------
  function updateCountdown() {
    const now = Date.now();
    const diff = Math.max(0, window.WEDDING_DATE_TARGET - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (dom.countdownDays) dom.countdownDays.textContent = String(days).padStart(2, '0');
    if (dom.countdownHours) dom.countdownHours.textContent = String(hours).padStart(2, '0');
    if (dom.countdownMinutes) dom.countdownMinutes.textContent = String(minutes).padStart(2, '0');
    if (dom.countdownSeconds) dom.countdownSeconds.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // --------------------------------------------------------------------------
  // SCROLL PROGRESS, SCROLL SPY & BACK-TO-TOP
  // --------------------------------------------------------------------------
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;

    if (dom.readingProgress) {
      dom.readingProgress.style.width = `${progress}%`;
    }

    if (dom.btnBackToTop) {
      if (scrollTop > 500) {
        dom.btnBackToTop.classList.add('visible');
      } else {
        dom.btnBackToTop.classList.remove('visible');
      }
    }

    // Scroll Spy for Nav Links
    const sections = ['story', 'celebrations', 'gallery', 'film', 'memories'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 180 && rect.bottom >= 180) {
          dom.navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('data-section') === id);
          });
          break;
        }
      }
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  if (dom.btnBackToTop) {
    dom.btnBackToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth Scroll to Section Helper
  function scrollToSection(id) {
    if (dom.mobileNavDrawer) dom.mobileNavDrawer.classList.remove('open');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  dom.navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sec = link.getAttribute('data-section');
      if (sec) scrollToSection(sec);
    });
  });

  if (dom.btnHeroCelebrations) {
    dom.btnHeroCelebrations.addEventListener('click', () => scrollToSection('celebrations'));
  }

  // Mobile Menu Drawer
  if (dom.btnMenuToggle && dom.mobileNavDrawer) {
    dom.btnMenuToggle.addEventListener('click', () => {
      dom.mobileNavDrawer.classList.toggle('open');
    });

    dom.mobileNavLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        const sec = link.getAttribute('data-section');
        if (sec === 'invitation') {
          dom.mobileNavDrawer.classList.remove('open');
          setStage('invitation');
        } else if (sec) {
          scrollToSection(sec);
        }
      });
    });
  }

  // Share Invitation Link
  if (dom.btnShareWedding) {
    dom.btnShareWedding.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).catch(() => {});
      }
      showToast('Invitation link copied to clipboard!');
    });
  }

  function showToast(msg) {
    if (!dom.toastNotice) return;
    dom.toastNotice.textContent = msg;
    dom.toastNotice.classList.add('show');
    setTimeout(() => {
      dom.toastNotice.classList.remove('show');
    }, 2800);
  }

  // --------------------------------------------------------------------------
  // DYNAMIC RENDERING: STORY TIMELINE
  // --------------------------------------------------------------------------
  function renderTimeline() {
    if (!dom.timelineContainer) return;
    dom.timelineContainer.innerHTML = window.LOVE_STORY_TIMELINE.map((item) => `
      <div class="timeline-card">
        <div class="timeline-img-wrap">
          <img 
            src="${item.image}" 
            alt="${item.title}" 
            loading="lazy"
            onerror="this.src=window.createIndianWeddingFallback('${item.title}', '${item.year}')"
          />
        </div>
        <div class="timeline-info">
          <span class="timeline-date-badge">${item.year} • ${item.location}</span>
          <h3 class="timeline-title">${item.title}</h3>
          <p class="timeline-desc">${item.story}</p>
        </div>
      </div>
    `).join('');
  }

  // --------------------------------------------------------------------------
  // DYNAMIC RENDERING: SIX ROYAL CELEBRATIONS
  // --------------------------------------------------------------------------
  function renderCelebrations() {
    if (!dom.celebrationsContainer) return;
    dom.celebrationsContainer.innerHTML = window.WEDDING_EVENTS.map((ev, idx) => `
      <article class="celebration-card">
        <div class="celebration-cover-wrap">
          <img 
            src="${ev.coverImage}" 
            alt="${ev.name}" 
            loading="lazy"
            onerror="this.src=window.createIndianWeddingFallback('${ev.name}', '${ev.dayLabel}')"
          />
          <div class="celebration-overlay"></div>

          <div class="celebration-top-badge">
            <span class="celebration-day-pill">0${idx + 1} • ${ev.dayLabel}</span>
            <span class="celebration-hindi">${ev.hindiTitle}</span>
          </div>

          <div class="celebration-meta-bottom">
            <h3 class="celebration-name">${ev.name}</h3>
            <p class="celebration-venue">${ev.venue}</p>
          </div>
        </div>

        <div class="celebration-footer">
          <div class="celebration-swatches">
            <div class="swatch-dots">
              ${ev.paletteSwatches.map(hex => `
                <span class="swatch-dot" style="background-color: ${hex}"></span>
              `).join('')}
            </div>
            <span class="celebration-dresscode">${ev.dressCode}</span>
          </div>

          <button 
            type="button"
            class="btn-celebration-details" 
            data-event-id="${ev.id}"
          >
            Gallery
          </button>
        </div>
      </article>
    `).join('');

    // Attach event listeners to all celebration details buttons
    dom.celebrationsContainer.querySelectorAll('.btn-celebration-details').forEach((btn) => {
      btn.addEventListener('click', () => {
        const evId = btn.getAttribute('data-event-id');
        const eventData = window.WEDDING_EVENTS.find((e) => e.id === evId);
        if (eventData) openEventModal(eventData);
      });
    });
  }

  // --------------------------------------------------------------------------
  // DYNAMIC RENDERING: CINEMATIC GALLERY WITH EVENT FILTERS
  // --------------------------------------------------------------------------
  function renderGalleryFilters() {
    if (!dom.galleryFiltersContainer) return;
    const filterCategories = ['All', 'Pre-Wedding', 'Haldi', 'Mehendi', 'Sangeet', 'Baraat & Pheras', 'Reception'];
    dom.galleryFiltersContainer.innerHTML = filterCategories.map(cat => `
      <button 
        type="button"
        class="btn-gallery-filter ${cat === state.galleryFilter ? 'active' : ''}" 
        data-filter="${cat}"
      >
        ${cat}
      </button>
    `).join('');

    dom.galleryFiltersContainer.querySelectorAll('.btn-gallery-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-filter');
        setGalleryFilter(cat);
      });
    });
  }

  function setGalleryFilter(filterCategory) {
    state.galleryFilter = filterCategory;
    renderGalleryFilters();

    if (filterCategory === 'All') {
      state.filteredGallery = [...window.GALLERY_ITEMS];
    } else {
      state.filteredGallery = window.GALLERY_ITEMS.filter(item => item.event === filterCategory);
    }
    renderGalleryGrid();
  }

  function renderGalleryGrid() {
    if (!dom.galleryGridContainer) return;
    dom.galleryGridContainer.innerHTML = state.filteredGallery.map((item, idx) => `
      <div 
        class="gallery-card ${item.aspectClass}" 
        data-index="${idx}"
      >
        <span class="gallery-card-badge">
          ${item.type === 'video' ? `
            <svg class="w-3 h-3 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>Video Reel</span>
          ` : `
            <svg class="w-3 h-3 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            <span>Photo</span>
          `}
        </span>

        <img 
          src="${item.url}" 
          alt="${item.title}" 
          class="gallery-media"
          loading="lazy"
          onerror="this.src=window.createIndianWeddingFallback('${item.title}', '${item.event}')"
        />

        <div class="gallery-card-overlay">
          <h4 class="gallery-card-title">${item.title}</h4>
          <p class="gallery-card-sub">${item.caption} • ${item.event}</p>
        </div>
      </div>
    `).join('');

    dom.galleryGridContainer.querySelectorAll('.gallery-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-index'), 10);
        openLightbox(idx);
      });
    });
  }

  // --------------------------------------------------------------------------
  // FULLSCREEN LIGHTBOX CONTROLLER
  // --------------------------------------------------------------------------
  function openLightbox(index) {
    if (index < 0 || index >= state.filteredGallery.length) return;
    state.activeLightboxIndex = index;
    const item = state.filteredGallery[index];

    if (item.type === 'video' && item.videoUrl) {
      dom.lightboxMediaFrame.innerHTML = `
        <video 
          src="${item.videoUrl}" 
          poster="${item.url}" 
          controls 
          autoplay 
          playsinline 
          class="max-h-[72vh] w-auto object-contain"
        ></video>
      `;
    } else {
      dom.lightboxMediaFrame.innerHTML = `
        <img 
          src="${item.url}" 
          alt="${item.title}" 
          class="max-h-[72vh] w-auto object-contain"
          onerror="this.src=window.createIndianWeddingFallback('${item.title}', '${item.event}')"
        />
      `;
    }

    if (dom.lightboxCounter) {
      dom.lightboxCounter.innerHTML = `
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        <span>${item.event} • ${index + 1} of ${state.filteredGallery.length}</span>
      `;
    }
    if (dom.lightboxTitle) dom.lightboxTitle.textContent = item.title;
    if (dom.lightboxCaption) dom.lightboxCaption.textContent = item.caption;

    dom.lightboxModal.classList.add('open');
  }

  function closeLightbox() {
    dom.lightboxModal.classList.remove('open');
    if (dom.lightboxMediaFrame) {
      dom.lightboxMediaFrame.innerHTML = '';
    }
    state.activeLightboxIndex = null;
  }

  if (dom.btnCloseLightbox) dom.btnCloseLightbox.addEventListener('click', closeLightbox);
  if (dom.lightboxModal) {
    dom.lightboxModal.addEventListener('click', (e) => {
      if (e.target === dom.lightboxModal) closeLightbox();
    });
  }

  if (dom.btnLightboxPrev) {
    dom.btnLightboxPrev.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.activeLightboxIndex !== null) {
        const nextIdx = (state.activeLightboxIndex - 1 + state.filteredGallery.length) % state.filteredGallery.length;
        openLightbox(nextIdx);
      }
    });
  }

  if (dom.btnLightboxNext) {
    dom.btnLightboxNext.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.activeLightboxIndex !== null) {
        const nextIdx = (state.activeLightboxIndex + 1) % state.filteredGallery.length;
        openLightbox(nextIdx);
      }
    });
  }

  // Keyboard Navigation: Escape, Arrow Left, Arrow Right
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeEventModal();
      if (dom.mobileNavDrawer) dom.mobileNavDrawer.classList.remove('open');
      if (dom.audioMixerPopover) dom.audioMixerPopover.classList.remove('open');
    } else if (state.activeLightboxIndex !== null) {
      if (e.key === 'ArrowRight' && dom.btnLightboxNext) {
        dom.btnLightboxNext.click();
      } else if (e.key === 'ArrowLeft' && dom.btnLightboxPrev) {
        dom.btnLightboxPrev.click();
      }
    }
  });

  // --------------------------------------------------------------------------
  // EVENT DETAIL MODAL
  // --------------------------------------------------------------------------
  function openEventModal(eventData) {
    if (!dom.eventModal) return;
    if (dom.eventModalDay) dom.eventModalDay.textContent = `${eventData.dayLabel} • ${eventData.hindiTitle}`;
    if (dom.eventModalName) dom.eventModalName.textContent = eventData.name;
    if (dom.eventModalDate) dom.eventModalDate.textContent = eventData.date;
    if (dom.eventModalVenue) dom.eventModalVenue.textContent = eventData.venue;
    if (dom.eventModalDresscode) dom.eventModalDresscode.textContent = eventData.dressCode;
    if (dom.eventModalDesc) dom.eventModalDesc.textContent = eventData.description;
    if (dom.eventModalHighlight) dom.eventModalHighlight.textContent = eventData.ritualHighlight;
    if (dom.eventModalNote) dom.eventModalNote.textContent = eventData.hospitalityNote;

    if (dom.eventModalGallery) {
      dom.eventModalGallery.innerHTML = eventData.gallery.map((g, idx) => `
        <div class="event-modal-gallery-item">
          <div class="event-modal-img-wrap">
            <img 
              src="${g.url}" 
              alt="${g.caption}" 
              loading="lazy"
              onerror="this.src=window.createIndianWeddingFallback('${eventData.name}', 'MOMENT 0${idx + 1}')"
            />
          </div>
          <p class="event-modal-caption">${g.caption}</p>
        </div>
      `).join('');
    }

    dom.eventModal.classList.add('open');
  }

  function closeEventModal() {
    if (dom.eventModal) dom.eventModal.classList.remove('open');
  }

  if (dom.btnCloseEventModal) dom.btnCloseEventModal.addEventListener('click', closeEventModal);
  if (dom.eventModal) {
    dom.eventModal.addEventListener('click', (e) => {
      if (e.target === dom.eventModal) closeEventModal();
    });
  }

  // --------------------------------------------------------------------------
  // WEDDING FILM CONTROLLER
  // --------------------------------------------------------------------------
  if (dom.btnPlayFilm && dom.filmPosterView && dom.filmVideoView && dom.weddingFilmVideo) {
    dom.btnPlayFilm.addEventListener('click', () => {
      dom.filmPosterView.style.display = 'none';
      dom.filmVideoView.classList.add('active');
      dom.weddingFilmVideo.play();

      // Pause ambient sitar music when video starts playing
      if (state.isMusicPlaying) {
        state.audioEngine.stop();
        state.isMusicPlaying = false;
        updateAudioButtons(false);
      }
    });
  }

  if (dom.btnCloseFilm && dom.filmPosterView && dom.filmVideoView && dom.weddingFilmVideo) {
    dom.btnCloseFilm.addEventListener('click', () => {
      dom.weddingFilmVideo.pause();
      dom.filmVideoView.classList.remove('active');
      dom.filmPosterView.style.display = 'block';
    });
  }

  // --------------------------------------------------------------------------
  // GUESTBOOK, MEMORIES & PHOTO UPLOAD
  // --------------------------------------------------------------------------
  if (dom.photoFileInput) {
    dom.photoFileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        showFormFeedback('Please select a valid image file (JPG, PNG, or WEBP).', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        state.uploadedPhotoData = reader.result;
        state.uploadedPhotoName = file.name;

        if (dom.uploadPlaceholder) dom.uploadPlaceholder.style.display = 'none';
        if (dom.uploadPreviewWrap) dom.uploadPreviewWrap.style.display = 'flex';
        if (dom.uploadPreviewImg) dom.uploadPreviewImg.src = state.uploadedPhotoData;
        if (dom.uploadFilenameText) dom.uploadFilenameText.textContent = `${file.name} • Change Photo`;
      };
      reader.readAsDataURL(file);
    });
  }

  function showFormFeedback(msg, type = 'success') {
    if (!dom.formFeedback) return;
    dom.formFeedback.style.display = 'flex';
    dom.formFeedback.innerHTML = `
      <svg class="w-4 h-4 text-[#D4AF37] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>${msg}</span>
    `;
  }

  if (dom.guestForm) {
    dom.guestForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = dom.guestNameInput?.value.trim();
      const relation = dom.guestRelationInput?.value.trim() || 'Honoured Wedding Guest';
      const message = dom.guestMessageInput?.value.trim();

      if (!name || !message) {
        showFormFeedback('Please enter your name and a blessing message for Aarav & Priya.', 'error');
        return;
      }

      const newWish = {
        id: `wish-${Date.now()}`,
        name: name,
        relation: relation,
        message: message,
        timestamp: 'Added in Demo Session • Just now',
        photoUrl: state.uploadedPhotoData || null,
        isDemoSession: true
      };

      state.wishes.unshift(newWish);
      renderBlessings();

      // Reset form fields
      dom.guestNameInput.value = '';
      dom.guestRelationInput.value = '';
      dom.guestMessageInput.value = '';
      dom.photoFileInput.value = '';
      state.uploadedPhotoData = null;
      state.uploadedPhotoName = '';

      if (dom.uploadPlaceholder) dom.uploadPlaceholder.style.display = 'flex';
      if (dom.uploadPreviewWrap) dom.uploadPreviewWrap.style.display = 'none';

      showFormFeedback('Khamma Ghani! Your blessing and memory have been posted to the live demo guestbook.');
    });
  }

  function renderBlessings() {
    if (!dom.blessingsWall) return;
    dom.blessingsWall.innerHTML = state.wishes.map(wish => `
      <div class="blessing-card">
        <div class="blessing-header">
          <div>
            <h4 class="blessing-author-name">${wish.name}</h4>
            <p class="blessing-relation">${wish.relation}</p>
          </div>
          <span class="blessing-badge ${wish.isDemoSession ? 'live-demo' : 'official'}">
            ${wish.timestamp}
          </span>
        </div>

        <p class="blessing-text">“${wish.message}”</p>

        ${wish.photoUrl ? `
          <div class="blessing-photo-wrap">
            <img src="${wish.photoUrl}" alt="${wish.name}" />
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  // --------------------------------------------------------------------------
  // INITIALIZE ALL COMPONENTS
  // --------------------------------------------------------------------------
  renderTimeline();
  renderCelebrations();
  renderGalleryFilters();
  renderGalleryGrid();
  renderBlessings();
  setStage('invitation');
});
