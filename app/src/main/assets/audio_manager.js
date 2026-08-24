// app/src/main/assets/audio_manager.js
// Audio manager and UI integration for freq_completo.html
// Enhanced: populates preset select from presets.json and keeps control labels in sync
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

  // Helper: load and merge external presets files (presets.json and mara-presets.json)
  async function loadExternalPresets() {
    const urls = [
      'presets/presets.json',
      'presets/mara-presets.json'
    ];
    const loaded = [];
    for (const u of urls) {
      try {
        const res = await fetch(u, { cache: 'no-store' });
        if (!res.ok) continue;
        const data = await res.json();
        if (!data) continue;
        if (Array.isArray(data)) {
          // assume array of {id, displayName, settings}
          loaded.push(...data);
        } else if (typeof data === 'object') {
          // if it's an object map (legacy), convert
          Object.keys(data).forEach(k => {
            const v = data[k];
            if (v && typeof v === 'object') {
              loaded.push({ id: k, displayName: v.label || k, description: v.terapia || '', settings: v.settings || v });
            }
          });
        }
      } catch (e) {
        // ignore missing files or parse errors
        console.debug('loadExternalPresets ignore', u, e && e.message);
      }
    }

    // Normalize entries to format {id, displayName, settings}
    const normalized = loaded.map(p => {
      if (!p) return null;
      if (p.id && p.settings) return p;
      if (p.id && (p.freq || p.label)) return { id: p.id, displayName: p.displayName || p.label || p.id, settings: p.settings || p };
      if (p.label && p.freq) return { id: (p.id || p.label).toString().toLowerCase().replace(/\s+/g,'_'), displayName: p.label, settings: p };
      return null;
    }).filter(Boolean);

    // Merge into map by id; later items overwrite earlier ones (so mara-presets will override presets.json)
    const map = {};
    normalized.forEach(p => {
      if (!p.id) return;
      map[p.id] = { id: p.id, displayName: p.displayName || p.id, settings: p.settings || p };
    });

    // Convert to array and set window.presets
    window.presets = Object.values(map);
    return window.presets;
  }

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
      if (!sel) return;
      // If window.presets exists and has entries, use it; otherwise keep current hardcoded options
      if (!window.presets || !Array.isArray(window.presets) || window.presets.length === 0) return;
      sel.innerHTML = '';
      window.presets.forEach(p => {
        const opt = document.createElement('option'); opt.value = p.id; opt.textContent = p.displayName || p.id; sel.appendChild(opt);
      });
      // add 'personalizado' option at end
      const optCustom = document.createElement('option'); optCustom.value = 'personalizado'; optCustom.textContent = '✨ Personalizado (atual)'; sel.appendChild(optCustom);
    }

    // First, try to load external presets and then populate the select if any were found
    loadExternalPresets().then(pres => {
      if (pres && pres.length) {
        populateSelectFromPresets();
        console.info('External presets loaded:', pres.length);
      } else {
        console.info('No external presets found');
      }
    }).catch(e => console.warn('Error loading external presets', e));

    // If user selects by UI
    if (sel) {
      sel.addEventListener('change', async (ev) => {
        const id = ev.target.value;
        const p = findPreset(id);
        if (!p) return;
        await window.audioManager.prepare(p);
        // update visuals if function present
        if (typeof applyVisualPreset === 'function') applyVisualPreset(p);

        // update UI controls to reflect preset values (where elements exist)
        try {
          if (document.getElementById('volume')) document.getElementById('volume').value = p.settings.volume || 50;
          if (document.getElementById('volValue')) document.getElementById('volValue').textContent = (p.settings.volume || 50) + '%';
          if (document.getElementById('periodoSlider')) document.getElementById('periodoSlider').value = p.settings.periodo || 1000;
          if (document.getElementById('periodoValue')) document.getElementById('periodoValue').textContent = (p.settings.periodo || 1000) + ' ms';
          if (document.getElementById('volOscProf')) document.getElementById('volOscProf').value = p.settings.volOscProf || 50;
          if (document.getElementById('volOscValue')) document.getElementById('volOscValue').textContent = (p.settings.volOscProf || 50) + '%';
          if (document.getElementById('oscilacaoProf')) document.getElementById('oscilacaoProf').value = p.settings.oscilacaoProf || 3;
          if (document.getElementById('oscilacaoValue')) document.getElementById('oscilacaoValue').textContent = (p.settings.oscilacaoProf || 3) + ' Hz';
          if (document.getElementById('pulseSpeed')) document.getElementById('pulseSpeed').value = p.settings.pulseSpeed || 2.0;
          if (document.getElementById('pulseSpeedValue')) document.getElementById('pulseSpeedValue').textContent = (p.settings.pulseSpeed || 2.0) + ' Hz';
          if (document.getElementById('waveformSelect')) document.getElementById('waveformSelect').value = p.settings.waveform || 'sine';
          if (document.getElementById('waveformLabel')) document.getElementById('waveformLabel').textContent = p.settings.waveform || 'sine';
          if (document.getElementById('color1')) document.getElementById('color1').value = p.settings.color1 || '#6C63FF';
          if (document.getElementById('color2')) document.getElementById('color2').value = p.settings.color2 || '#a78bfa';
          if (document.getElementById('bgColor')) document.getElementById('bgColor').value = p.settings.bgColor || '#0a0a1a';
        } catch (e) { /* ignore missing elements */ }
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

    // KEEP CONTROL LABELS IN SYNC (ms, Hz, %)
    function wireLabel(rangeId, labelId, unit) {
      const r = document.getElementById(rangeId);
      const l = document.getElementById(labelId);
      if (!r || !l) return;
      const update = () => { l.textContent = r.value + (unit || ''); };
      r.addEventListener('input', update);
      update();
    }

    wireLabel('volume', 'volValue', '%');
    wireLabel('periodoSlider', 'periodoValue', ' ms');
    wireLabel('volOscProf', 'volOscValue', '%');
    wireLabel('oscilacaoProf', 'oscilacaoValue', ' Hz');
    wireLabel('pulseSpeed', 'pulseSpeedValue', ' Hz');
    // waveform label
    const wf = document.getElementById('waveformSelect');
    const wfLabel = document.getElementById('waveformLabel');
    if (wf && wfLabel) { wf.addEventListener('change', () => wfLabel.textContent = wf.value); wfLabel.textContent = wf.value; }

    // color pickers live update
    const color1 = document.getElementById('color1');
    const color2 = document.getElementById('color2');
    const bgColor = document.getElementById('bgColor');
    if (color1) color1.addEventListener('input', (e)=>{ document.querySelectorAll('.color-dot').forEach(d=>d.style.background=e.target.value); });
    if (color2) color2.addEventListener('input', (e)=>{ /* could update secondary visuals */ });
    if (bgColor) bgColor.addEventListener('input', (e)=>{ document.body.style.background = e.target.value; });

    // populate select if presets are available via fetch
    if (!window.presets) {
      // try to fetch presets.json relative to assets folder
      fetch('presets/presets.json').then(r=>r.json()).then(data=>{ window.presets = data; populateSelectFromPresets(); }).catch(()=>{});
    }

    // expose for debugging
    window._audioManager = AM;
  });
})();
