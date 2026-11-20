/**
 * Royal Rajasthani Web Audio Ambience Engine
 * Pure Web Audio API synthesiser - no external audio files required!
 * Synthesizes:
 *  1. Deep Tanpura Drone (Sa - Pa - Sa' - Ni)
 *  2. Raag Yaman Sitar / Santoor Plucks with microtonal glide & shimmer
 *  3. Bayan & Dayan Tabla Rhythm Pulses
 *  4. Auspicious Temple Bell (Ghanti) Chime with 4 tuned harmonic overtones
 */

class RoyalAmbienceEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.melodyIntervalId = null;
    this.tablaIntervalId = null;
    this.volume = 0.22;
  }

  ensureContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      if (!this.masterGain && this.ctx) {
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
      return this.ctx;
    } catch (e) {
      console.warn('Web Audio Context initialization warning:', e);
      return null;
    }
  }

  setVolume(val) {
    this.volume = Math.max(0.02, Math.min(0.45, Number(val)));
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.12);
    }
  }

  /**
   * Auspicious Temple Bell (Ghanti) Chime on Card Opening
   * Produces authentic metallic resonance using multiple tuned harmonic partials
   */
  playTempleBellChime() {
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;
    const now = ctx.currentTime;
    const harmonics = [523.25, 1046.5, 1567.98, 2093.0]; // C5, C6, G6, C7
    
    harmonics.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      const amp = 0.16 / (idx + 1);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(amp, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8 - idx * 0.35);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 2.9);
    });
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  start() {
    if (this.isPlaying) return;
    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    this.masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(this.volume, ctx.currentTime + 1.6);

    // 1. Rich Tanpura Drone (Sa - Pa - Sa' - Ni)
    const droneFreqs = [130.81, 196.0, 261.63, 246.94];
    droneFreqs.forEach((freq, i) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const oscGain = this.ctx.createGain();

      osc.type = i % 2 === 0 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, this.ctx.currentTime);

      oscGain.gain.setValueAtTime(i === 0 ? 0.08 : 0.045, this.ctx.currentTime);
      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.masterGain);
      osc.start();
    });

    // 2. Raag Yaman Sitar / Santoor Pluck & Sympathetic Resonance
    const ragaYamanNotes = [261.63, 293.66, 329.63, 369.99, 392.0, 440.0, 493.88, 523.25, 587.33];
    let step = 0;

    const pluckSitar = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      const note = ragaYamanNotes[step % ragaYamanNotes.length];
      step += Math.random() > 0.35 ? 1 : 2;

      const osc = this.ctx.createOscillator();
      const shimmerOsc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const env = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note, now);
      // Subtle sitar meend (pitch glide)
      osc.frequency.exponentialRampToValueAtTime(note * 1.004, now + 0.35);

      shimmerOsc.type = 'sine';
      shimmerOsc.frequency.setValueAtTime(note * 2, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1750, now);
      filter.frequency.exponentialRampToValueAtTime(340, now + 2.4);

      env.gain.setValueAtTime(0.001, now);
      env.gain.linearRampToValueAtTime(0.18, now + 0.03);
      env.gain.exponentialRampToValueAtTime(0.0008, now + 2.6);

      osc.connect(filter);
      shimmerOsc.connect(filter);
      filter.connect(env);
      env.connect(this.masterGain);

      osc.start(now);
      shimmerOsc.start(now);
      osc.stop(now + 2.7);
      shimmerOsc.stop(now + 2.7);
    };

    // 3. Soft Royal Tabla Pulse (Bayan bass + Dayan crisp tap)
    let beat = 0;
    const playTablaBeat = () => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      const isBassBeat = beat % 4 === 0 || beat % 4 === 1;
      beat++;

      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();
      osc.type = 'sine';

      if (isBassBeat) {
        // Warm Bayan ("Dha / Ge")
        osc.frequency.setValueAtTime(118, now);
        osc.frequency.exponentialRampToValueAtTime(64, now + 0.24);
        env.gain.setValueAtTime(0.001, now);
        env.gain.linearRampToValueAtTime(0.14, now + 0.015);
        env.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      } else {
        // Crisp Dayan ("Na / Tin")
        osc.frequency.setValueAtTime(310, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.12);
        env.gain.setValueAtTime(0.001, now);
        env.gain.linearRampToValueAtTime(0.075, now + 0.008);
        env.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      }

      osc.connect(env);
      env.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.35);
    };

    this.isPlaying = true;
    pluckSitar();
    this.melodyIntervalId = window.setInterval(pluckSitar, 1650);
    this.tablaIntervalId = window.setInterval(playTablaBeat, 620);
  }

  stop() {
    this.isPlaying = false;
    if (this.melodyIntervalId) {
      clearInterval(this.melodyIntervalId);
      this.melodyIntervalId = null;
    }
    if (this.tablaIntervalId) {
      clearInterval(this.tablaIntervalId);
      this.tablaIntervalId = null;
    }
    if (this.ctx && this.masterGain) {
      try {
        this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.2);
        setTimeout(() => {
          if (!this.isPlaying && this.ctx) {
            this.ctx.close();
            this.ctx = null;
            this.masterGain = null;
          }
        }, 420);
      } catch (e) {
        // Safe cleanup
      }
    }
  }
}

window.RoyalAmbienceEngine = RoyalAmbienceEngine;
