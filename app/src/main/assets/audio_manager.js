// app/src/main/assets/audio_manager.js
// Audio manager and UI integration for freq_completo.html
// Attach this script after the DOM is ready. It will register UI handlers
// and provide a safe WebAudio singleton that avoids duplicated nodes.

(function () {
  function log() { /*console.log.apply(console, arguments)*/ }

  if (!window.audioManager) window.audioManager = {};
  const AM = window.audioManager;
  AM.ctx = AM.ctx || null;
  AM.isPrepared = false;
  AM.isPlaying = false;

  AM.ensureCtx = async function () {
    if (!AM.ctx) AM.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (AM.ctx.state === 'suspended') {
      try { await AM.ctx.resume(); } catch (e) { console.warn('resume failed', e); }
    }
    return AM.ctx;
  };

  AM.prepare = async function (preset) {
    const ctx = await AM.ensureCtx();
    if (!preset) return;
    if (AM.isPrepared && AM.currentPresetId === preset.id) { AM.updateParams(preset); return; }
    AM.stop(true);

    AM.gain = ctx.createGain();
    AM.gain.gain.value = (preset.settings.volume || 50) / 100;
    AM.gain.connect(ctx.destination);

    AM.osc = ctx.createOscillator();
    AM.osc.type = preset.settings.waveform || 'sine';
    AM.osc.frequency.value = preset.settings.freq || 432;
    AM.osc.connect(AM.gain);

    if (preset.settings.enableOscilacao) {
      AM.lfo = ctx.createOscillator();
      AM.lfoGain = ctx.createGain();
      AM.lfo.frequency.value = preset.settings.oscilacaoProf || 3;
      AM.lfoGain.gain.value = preset.settings.oscilacaoDepth || 3;
      AM.lfo.connect(AM.lfoGain);
      AM.lfoGain.connect(AM.osc.frequency);
    } else { AM.lfo = AM.lfoGain = null; }

    if (preset.settings.volOscProf && preset.settings.periodo) {
      AM.envOsc = ctx.createOscillator();
      AM.envGain = ctx.createGain();
      AM.envOsc.frequency.value = 1000 / (preset.settings.periodo || 1000);
      AM.envGain.gain.value = ((preset.settings.volOscProf || 50) / 100) * (preset.settings.volume || 50) / 100;
      AM.envOsc.connect(AM.envGain);
      AM.envGain.connect(AM.gain.gain);
    } else { AM.envOsc = AM.envGain = null; }

    AM.isPrepared = true;
    AM.currentPresetId = preset.id;
    AM.currentPreset = preset;
    log('audio prepared', preset.id);
  };

  AM.updateParams = function (preset) {
    if (!AM.isPrepared) return;
    const s = preset.settings;
    if (AM.osc) {
      try { AM.osc.type = s.waveform || AM.osc.type; } catch(e){}
      try { AM.osc.frequency.setValueAtTime(s.freq || AM.osc.frequency.value, AM.ctx.currentTime); } catch(e){}
    }
    if (AM.gain) AM.gain.gain.setValueAtTime((s.volume || 50) / 100, AM.ctx.currentTime);
    if (AM.lfo) {
      try { AM.lfo.frequency.setValueAtTime(s.oscilacaoProf || AM.lfo.frequency.value, AM.ctx.currentTime); } catch(e){}
      try { AM.lfoGain.gain.setValueAtTime(s.oscilacaoDepth || AM.lfoGain.gain.value, AM.ctx.currentTime); } catch(e){}
    }
    if (AM.envOsc) {
      try { AM.envOsc.frequency.setValueAtTime(1000 / (s.periodo || 1000), AM.ctx.currentTime); } catch(e){}
      try { AM.envGain.gain.setValueAtTime(((s.volOscProf || 50) / 100) * (s.volume || 50) / 100, AM.ctx.currentTime); } catch(e){}
    }
    AM.currentPreset = preset;
    log('audio updated', preset.id);
  };

  AM.start = async function () {
    if (AM.isPlaying) return;
    if (!AM.isPrepared) { console.warn('Audio not prepared'); return; }
    const now = AM.ctx.currentTime;
    try { AM.osc.start(now + 0.01); } catch (e) { /* ignore */ }
    if (AM.lfo) try { AM.lfo.start(now + 0.01); } catch (e) {}
    if (AM.envOsc) try { AM.envOsc.start(now + 0.01); } catch (e) {}
    AM.isPlaying = true;
    const status = document.getElementById('status'); if (status) { status.textContent = '▶️ Tocando — ' + (AM.currentPreset?.displayName||''); status.classList.add('playing'); }
    log('audio started');
  };

  AM.stop = function (cleanup = false) {
    try {
      if (AM.osc) { try { AM.osc.stop(); } catch(e){} AM.osc.disconnect && AM.osc.disconnect(); AM.osc = null; }
      if (AM.lfo) { try { AM.lfo.stop(); } catch(e){} AM.lfo.disconnect && AM.lfo.disconnect(); AM.lfo = null; }
      if (AM.lfoGain) { AM.lfoGain.disconnect && AM.lfoGain.disconnect(); AM.lfoGain = null; }
      if (AM.envOsc) { try { AM.envOsc.stop(); } catch(e){} AM.envOsc.disconnect && AM.envOsc.disconnect(); AM.envOsc = null; }
      if (AM.envGain) { AM.envGain.disconnect && AM.envGain.disconnect(); AM.envGain = null; }
      if (AM.gain) { AM.gain.disconnect && AM.gain.disconnect(); AM.gain = null; }
    } catch(e){ console.warn('Error during audio stop', e); }
    AM.isPlaying = false;
    if (cleanup) { AM.isPrepared = false; AM.currentPresetId = null; AM.currentPreset = null; }
    const status = document.getElementById('status'); if (status) { status.textContent = '⏹️ Parado'; status.classList.remove('playing'); }
    log('audio stopped');
  };

  // UI integration after DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    const sel = document.getElementById('presetSelect');
    const btnPlay = document.getElementById('btnPlay');
    const btnStop = document.getElementById('btnStop');

    function findPreset(id) {
      if (!id) return null;
      if (window.presets) {
        const p = (window.presets || []).find(x => x.id === id);
        if (p) return p;
      }
      if (window.SHOTS && window.SHOTS[id]) {
        return { id: id, displayName: window.SHOTS[id].label || id, settings: window.SHOTS[id] };
      }
      return null;
    }

    function populateSelectFromPresets() {
      if (!sel || !window.presets) return;
      sel.innerHTML = '';
      window.presets.forEach(p => {
        const opt = document.createElement('option'); opt.value = p.id; opt.textContent = p.displayName || p.id; sel.appendChild(opt);
      });
    }

    // If presets.json was loaded earlier and populated window.presets, refresh select
    populateSelectFromPresets();

    if (sel) {
      sel.addEventListener('change', async (ev) => {
        const id = ev.target.value;
        const p = findPreset(id);
        if (!p) return;
        await window.audioManager.prepare(p);
        // update visuals if function present
        if (typeof applyVisualPreset === 'function') applyVisualPreset(p);
      });
    }

    if (btnPlay) btnPlay.addEventListener('click', async function () {
      await window.audioManager.ensureCtx();
      const currentId = sel?.value;
      const currentPreset = findPreset(currentId) || findPreset('pineal') || null;
      if (!currentPreset) { console.warn('Nenhum preset disponível'); return; }
      if (!window.audioManager.isPrepared || window.audioManager.currentPresetId !== currentPreset.id) {
        await window.audioManager.prepare(currentPreset);
      } else {
        window.audioManager.updateParams(currentPreset);
      }
      await window.audioManager.start();
      if (btnStop) btnStop.disabled = false;
      if (btnPlay) btnPlay.disabled = true;
    });

    if (btnStop) btnStop.addEventListener('click', function () {
      window.audioManager.stop(true);
      if (btnStop) btnStop.disabled = true;
      if (btnPlay) btnPlay.disabled = false;
    });

    // expose for debugging
    window._audioManager = AM;
  });
})();
