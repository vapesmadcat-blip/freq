# SHOWCASE

FREQ — Sons terapêuticos com visual reativo

Breve
---
FREQ combina frequências sonoras curadas com visualizações reativas para apoiar foco, relaxamento e práticas meditativas. Selecione presets (shots), personalize volume, forma e efeitos visuais e inicie sua sessão.

Como usar
---
1. Abra `app/src/main/assets/freq_completo.html` em um navegador (ou via WebView no app)
2. Selecione um preset e pressione TOCAR. No navegador, permita reprodução de áudio quando solicitado.
3. Use PARAR para interromper e evite múltiplos toques em Play — o audio manager evita duplicações automaticamente.

Testes rápidos
---
- Servidor local: `cd app/src/main/assets && python3 -m http.server 8000`
- Abra `http://localhost:8000/freq_completo.html`
- Selecionar presets, tocar, trocar presets enquanto toca e verificar console (window._audioManager)

Notas técnicas
---
- Áudio: WebAudio API (AudioContext, OscillatorNode, GainNode). Implementado em `audio_manager.js`.
- Presets: gerados a partir do objeto `SHOTS` embutido em `freq_completo.html` via `scripts/extract_shots.py`.

Contatos
---
Nexus Solucoes Globais — panzerbr8@gmail.com
