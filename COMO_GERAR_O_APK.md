# Como gerar o APK

Este é um projeto Android nativo (WebView) pronto, contendo seu app
`freq_completo.html` dentro de `app/src/main/assets/www/index.html`.
Eu não consigo compilar o APK aqui porque este ambiente não tem o
Android SDK nem acesso à internet — mas o projeto está 100% pronto
para você compilar. Duas formas fáceis:

## Opção 1 — Android Studio (recomendado, mais fácil)
1. Baixe e instale o [Android Studio](https://developer.android.com/studio) (gratuito).
2. Abra o Android Studio → **Open** → selecione a pasta `android_project`.
3. Espere o Gradle sincronizar (ele baixa tudo sozinho na primeira vez).
4. Menu **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
5. O APK sai em: `app/build/outputs/apk/debug/app-debug.apk`.
6. Transfira esse arquivo pro celular e instale (ative "Fontes desconhecidas" nas configurações do Android).

## Opção 2 — Linha de comando (se já tiver o Android SDK instalado)
```bash
cd android_project
./gradlew assembleDebug
```
O APK fica em `app/build/outputs/apk/debug/app-debug.apk`.

## Gerar um APK "de verdade" (assinado, para distribuir)
No Android Studio: **Build → Generate Signed Bundle / APK** → siga o
assistente para criar sua chave de assinatura (keystore) e gerar o
APK de release.

## Sobre o app
- O HTML/CSS/JS do seu projeto está intacto dentro da WebView.
- Configurei a WebView para permitir áudio (Web Audio API) tocar
  sem exigir toque prévio, JavaScript habilitado, e armazenamento
  local (para salvar suas configurações/presets).
- Ícone do app já incluso em todas as resoluções (mipmap-*).

---

# Alternativa mais rápida: PWA (sem compilar nada)

Na pasta `pwa/` deixei uma versão "instalável" direto do navegador:
- `index.html`, `manifest.json`, `service-worker.js`, ícones.

Para usar:
1. Suba essa pasta em qualquer hospedagem com HTTPS (GitHub Pages,
   Netlify, Vercel — todos têm planos gratuitos).
2. Abra o link no Chrome do celular.
3. Vai aparecer (ou você pode tocar no menu ⋮) a opção
   **"Adicionar à tela inicial" / "Instalar app"**.
4. Ele passa a abrir como um app normal, em tela cheia, com ícone
   próprio — sem precisar de APK, loja ou Android Studio.

Essa é a forma mais rápida de ter "um app" funcionando hoje.
