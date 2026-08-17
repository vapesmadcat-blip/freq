# 🎵 Binaural Shots - Guia Completo de Build

**100% pronto para compilar via terminal e GitHub Actions**

## 📋 Índice
- [Requisitos](#-requisitos)
- [Setup Rápido](#-setup-rápido)
- [Build Local](#-build-local)
- [Build Automático (GitHub Actions)](#-build-automático-github-actions)
- [Assinatura de Release](#-assinatura-de-release)
- [Troubleshooting](#-troubleshooting)

---

## ✅ Requisitos

### Obrigatório
- **JDK 17 ou superior** ([Download](https://adoptium.net/))
- **Android SDK** (Instalado via Android Studio ou sdkmanager)
- **Git** (para clonar o repositório)

### Opcional
- **Android Studio** (para desenvolvimento visual)
- **ADB** (para instalar APK localmente)

### Verificar Instalação
```bash
# Verificar JDK
java -version

# Verificar Android SDK
echo $ANDROID_HOME  # Linux/Mac
echo %ANDROID_HOME% # Windows

# Verificar ADB
adb version
```

---

## 🚀 Setup Rápido

### 1️⃣ Clonar Repositório
```bash
git clone https://github.com/vapesmadcat-blip/freq.git
cd freq
```

### 2️⃣ Configurar Variáveis de Ambiente

**Linux/Mac:**
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

**Windows (PowerShell):**
```powershell
$env:ANDROID_HOME = "C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\tools;$env:ANDROID_HOME\platform-tools"
```

**Windows (CMD - Permanente):**
1. `Win + Pause` → Variáveis de Ambiente Avançadas
2. Adicionar `ANDROID_HOME` com valor: `C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk`
3. Adicionar `;%ANDROID_HOME%\platform-tools` ao PATH

### 3️⃣ Verificar Permissões (Linux/Mac)
```bash
chmod +x gradlew
chmod +x build.sh
```

---

## 🔨 Build Local

### Option A: Script de Build (Recomendado)

#### Linux/Mac
```bash
# Menu interativo
./build.sh

# Ou comando direto
./build.sh debug     # Build Debug APK
./build.sh release   # Build Release APK
./build.sh install   # Instalar no device
./build.sh run       # Instalar e executar
./build.sh all       # Build completo
```

#### Windows
```batch
REM Menu interativo
build.bat

REM Ou comando direto
build.bat debug     REM Build Debug APK
build.bat release   REM Build Release APK
build.bat install   REM Instalar no device
build.bat run       REM Instalar e executar
build.bat all       REM Build completo
```

### Option B: Gradle Direto

```bash
# Linux/Mac
./gradlew assembleDebug
./gradlew assembleRelease

# Windows
gradlew.bat assembleDebug
gradlew.bat assembleRelease
```

### Option C: Android Studio
1. File → Open → Selecionar pasta do projeto
2. Build → Build Bundle(s) / APK(s) → Build APK(s)
3. APK gerado em: `app/build/outputs/apk/debug/`

---

## 📊 Saída do Build

Após compilar com sucesso, você verá:

```
✅ Debug APK compilado com sucesso! (4.5 MB)
Localização: app/build/outputs/apk/debug/app-debug.apk

✅ Release APK compilado com sucesso! (2.8 MB)
Localização: app/build/outputs/apk/release/app-release-unsigned.apk
```

### Tamanhos Típicos
- **Debug APK**: ~4-5 MB (com símbolos de debug)
- **Release APK**: ~2-3 MB (otimizado, sem símbolos)

---

## 🤖 Build Automático (GitHub Actions)

O projeto vem configurado com CI/CD completo!

### Trigger Automático
- ✅ Push para `main`, `master`, `develop`
- ✅ Pull Request
- ✅ Manual (Actions → Run workflow)
- ✅ Tag com formato `v*` (cria Release)

### Como Usar

#### 1. Push Automático
```bash
git add .
git commit -m "Meu commit"
git push origin main
# ⏳ GitHub Actions roda automaticamente
```

#### 2. Release com Tag
```bash
# Criar tag
git tag v1.0.0

# Enviar para GitHub
git push origin v1.0.0

# ⏳ GitHub Actions compila e cria Release com APKs
```

### Acessar Resultados
1. GitHub → Actions (aba)
2. Selecione o workflow mais recente
3. Artifacts → Baixe os APKs
4. Ou em Releases para tags

### Workflow CI/CD Incluído
- ✅ Checkout do código
- ✅ Setup JDK 17
- ✅ Verificação de assets HTML
- ✅ Compilação Debug APK
- ✅ Compilação Release APK
- ✅ Upload de artifacts
- ✅ Criação de Release (se tag)
- ✅ Instruções de assinatura

---

## 🔐 Assinatura de Release

Para distribuir um APK em produção, você PRECISA assinaturá-lo com sua keystore privada.

### 1. Gerar Keystore (Primeira Vez)

```bash
# Linux/Mac
keytool -genkey -v -keystore my-release-key.jks \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias my-key-alias

# Windows
keytool -genkey -v -keystore my-release-key.jks ^
  -keyalg RSA -keysize 2048 -validity 10000 ^
  -alias my-key-alias
```

**Preencha com:**
- First and last name: `Your Name`
- Organizational unit: `App Development`
- Organization: `Your Company`
- City: `Your City`
- State: `Your State`
- Country code: `BR` (ou seu país)
- Keystore password: `seu-senha-forte`
- Key password: `senha-da-chave`

### 2. Assinar APK

**Opção A: Com apksigner (Recomendado - Android SDK)**
```bash
apksigner sign --ks my-release-key.jks \
  --out app-release.apk \
  app-release-unsigned.apk
```

**Opção B: Com jarsigner (JDK)**
```bash
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
  -keystore my-release-key.jks \
  app-release-unsigned.apk my-key-alias
```

### 3. Otimizar com zipalign

```bash
zipalign -v 4 app-release-unsigned.apk app-release.apk
```

### 4. Verificar Assinatura

```bash
# Com apksigner
apksigner verify app-release.apk

# Com jarsigner
jarsigner -verify -verbose -certs app-release.apk
```

---

## 📱 Instalar APK no Device

### Conectar Device
```bash
# Listar devices conectados
adb devices

# Se não aparecer, enable USB Debugging:
# Settings → Developer Options → USB Debugging (ON)
```

### Instalar APK
```bash
# Debug APK
adb install -r app/build/outputs/apk/debug/app-debug.apk

# Release APK (assinado)
adb install -r app-release.apk

# Ver logs
adb logcat -e "Frequencias|MainActivity"
```

### Desinstalar
```bash
adb uninstall com.frequencias.formas
```

---

## 🛠️ Troubleshooting

### ❌ "Gradle not found"
```bash
# Verificar gradlew
ls -la gradlew

# Dar permissão executável
chmod +x gradlew

# Tentar build novamente
./gradlew assembleDebug
```

### ❌ "ANDROID_HOME not set"
```bash
# Adicionar ao ~/.bashrc ou ~/.zshrc
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

# Recarregar
source ~/.bashrc  # ou source ~/.zshrc
```

### ❌ "Java not found"
```bash
# Instalar JDK 17
# Linux: sudo apt install openjdk-17-jdk
# Mac: brew install openjdk@17
# Windows: Download de https://adoptium.net/

# Verificar instalação
java -version
```

### ❌ "No devices found"
```bash
# Device não conectado ou USB Debugging desativado
# 1. Conecte via USB
# 2. Settings → Developer Options → USB Debugging (ON)
# 3. Autorize a conexão ADB no device
# 4. Verifique: adb devices
```

### ❌ "Build fails on HTML assets"
```bash
# Verificar se HTML files existem
ls -la app/src/main/assets/

# Arquivos necessários:
# - freq_completo.html
# - shots_emocionais.html

# Se faltarem, restaure pelo git
git restore app/src/main/assets/
```

### ❌ "Out of memory during build"
```bash
# Aumentar memória Java
# Linux/Mac em ~/.bashrc
export GRADLE_OPTS="-Xmx2048m -XX:MaxPermSize=2048m"

# Windows PowerShell
$env:GRADLE_OPTS = "-Xmx2048m -XX:MaxPermSize=2048m"
```

---

## 📊 Estrutura de Arquivos

```
freq/
├── app/
│   ├── src/main/
│   │   ├── assets/
│   │   │   ├── freq_completo.html       ✅ HTML Principal
│   │   │   ├── shots_emocionais.html    ✅ Mapa Emocional
│   │   │   └── www/index.html
│   │   ├── java/com/frequencias/formas/
│   │   │   └── MainActivity.java         ✅ WebView configurado
│   │   ├── res/
│   │   │   ├── layout/activity_main.xml
│   │   │   ├── values/strings.xml, colors.xml
│   │   │   └── mipmap-*/ic_launcher.png
│   │   └── AndroidManifest.xml           ✅ Permissões INTERNET
│   ├── build.gradle                      ✅ Dependências
│   └── proguard-rules.pro
├── .github/
│   └── workflows/
│       └── build-apk.yml                 ✅ GitHub Actions
├── build.gradle                          ✅ Config Gradle
├── settings.gradle
├── gradlew                               ✅ Gradle Wrapper
├── gradlew.bat
├── build.sh                              ✅ Script Linux/Mac
├── build.bat                             ✅ Script Windows
└── gradle/wrapper/
    └── gradle-wrapper.jar                ✅ Gradle Wrapper Jar
```

---

## 🎯 Checklist de Build

- [ ] JDK 17+ instalado
- [ ] ANDROID_HOME configurado
- [ ] Git repo clonado
- [ ] `gradlew` com permissão executável
- [ ] HTML files em `app/src/main/assets/`
- [ ] `./gradlew assembleDebug` compila com sucesso
- [ ] APK gerado em `app/build/outputs/apk/debug/`

---

## 📞 Suporte

Se encontrar problemas:

1. **Limpar cache:**
   ```bash
   ./gradlew clean
   ./gradlew assembleDebug --stacktrace
   ```

2. **Atualizar dependências:**
   ```bash
   ./gradlew dependencies --refresh-dependencies
   ```

3. **Sincronizar projeto:**
   - Android Studio → File → Sync Now
   - Ou: `./gradlew sync`

4. **Verificar configuração:**
   ```bash
   ./gradlew -v
   ./gradlew systemProp
   ```

---

## 🎉 Pronto!

Agora você tem um projeto 100% pronto para compilar:
- ✅ Build local via script ou Gradle
- ✅ Build automático via GitHub Actions
- ✅ Release com CI/CD automático
- ✅ Instruções de assinatura
- ✅ APK pronto para distribuição

**Boa compilação! 🚀**
