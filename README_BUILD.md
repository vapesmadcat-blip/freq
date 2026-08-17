# 🎵 Binaural Shots - APK Android

**Projeto 100% pronto para compilar via terminal e GitHub Actions**

## ⚡ Quick Start (30 segundos)

### Compilar Agora (Linux/Mac)
```bash
chmod +x build.sh gradlew
./build.sh debug
```

### Compilar Agora (Windows)
```batch
build.bat debug
```

**Resultado:** APK em `app/build/outputs/apk/debug/app-debug.apk`

---

## 🎯 3 Formas de Compilar

### 1️⃣ **Script Menu (Mais Fácil)** ⭐

Linux/Mac:
```bash
./build.sh
# 🎯 Menu interativo com 7 opções
```

Windows:
```batch
build.bat
REM Menu interativo com 7 opções
```

**Opções:**
- 1 = Build Debug
- 2 = Build Release  
- 3 = Limpar build
- 4 = Instalar no device
- 5 = Instalar e executar
- 6 = Build completo
- 7 = Ajuda

---

### 2️⃣ **Gradle Direto** (Clássico)

Linux/Mac:
```bash
./gradlew assembleDebug    # Debug APK
./gradlew assembleRelease  # Release APK
```

Windows:
```batch
gradlew.bat assembleDebug    REM Debug APK
gradlew.bat assembleRelease  REM Release APK
```

---

### 3️⃣ **GitHub Actions** (Automático) ☁️

1. Push para `main` ou `master`
   ```bash
   git push origin main
   ```

2. Vai na aba **Actions** do GitHub

3. Espera compilar automaticamente ✅

4. Baixa o APK em **Artifacts**

**Bonus:** Enviar tag `v1.0.0` cria Release automática com download direto

---

## 📋 Requisitos

- ✅ **JDK 17+** ([Download](https://adoptium.net/))
- ✅ **Android SDK** (via Android Studio)
- ✅ **Git** (para repositório)

### Verificar Instalação
```bash
java -version
echo $ANDROID_HOME  # Linux/Mac
echo %ANDROID_HOME% # Windows
```

---

## 📱 Instalar no Device

```bash
# 1. Compilar
./build.sh debug

# 2. Conectar device via USB e ativar USB Debugging

# 3. Instalar
adb install -r app/build/outputs/apk/debug/app-debug.apk

# 4. Executar
adb shell am start -n "com.frequencias.formas/.MainActivity"

# Ou tudo de uma vez:
./build.sh run
```

---

## 📦 Arquivos Importantes

```
freq/
├── 🔨 build.sh              Script menu Linux/Mac
├── 🔨 build.bat             Script menu Windows  
├── 📋 BUILD_GUIDE.md        Guia detalhado
├── gradlew                  Gradle wrapper (não mexer)
├── app/
│   ├── build.gradle         Dependências
│   └── src/main/
│       ├── assets/
│       │   ├── 🎵 freq_completo.html
│       │   └── 🎵 shots_emocionais.html
│       ├── java/...
│       │   └── MainActivity.java (WebView)
│       └── AndroidManifest.xml (Permissões)
└── .github/
    └── workflows/
        └── 🤖 build-apk.yml (CI/CD automático)
```

---

## 🔐 Build de Release (Para Play Store)

1. **Gerar Keystore** (primeira vez)
   ```bash
   keytool -genkey -v -keystore my-key.jks \
     -keyalg RSA -keysize 2048 -validity 10000 \
     -alias my-alias
   ```

2. **Compilar Release**
   ```bash
   ./gradlew assembleRelease
   ```

3. **Assinar APK**
   ```bash
   apksigner sign --ks my-key.jks app-release-unsigned.apk
   ```

4. **Verificar**
   ```bash
   apksigner verify app-release.apk
   ```

> ℹ️ Veja `BUILD_GUIDE.md` para instruções detalhadas

---

## 🛠️ Troubleshooting

| Erro | Solução |
|------|---------|
| `gradlew: command not found` | `chmod +x gradlew` (Linux/Mac) |
| `ANDROID_HOME not set` | `export ANDROID_HOME=/path/to/sdk` |
| `Java not found` | Instalar JDK 17+ |
| `No devices` | Ativar USB Debugging e reconectar |
| `Out of memory` | `export GRADLE_OPTS="-Xmx2048m"` |

---

## 📊 Tamanhos Esperados

| APK | Tamanho |
|-----|---------|
| Debug | 4-5 MB |
| Release | 2-3 MB |

---

## 🤖 GitHub Actions Status

```yaml
name: 🚀 Build APK (Binaural Shots)
✅ Debug APK
✅ Release APK
✅ Upload Artifacts  
✅ GitHub Release (se tag v*)
✅ Instruções de Assinatura
```

**Trigger automático:**
- Push em main/master/develop
- Pull Requests
- Workflow dispatch (manual)
- Tags v* (Release automática)

---

## 📚 Documentação Completa

- **BUILD_GUIDE.md** - Guia detalhado com tudo
- **COMO_GERAR_O_APK.md** - Original (ainda válido)

---

## ✨ Recursos

- 🎵 42 Binaural Shots com frequências ajustáveis
- 📊 Mapa emocional interativo
- 🎨 Visualizações em Canvas
- 🔊 Web Audio API integrada
- 💾 Suporte a presets
- 📱 Android 7.0+ (API 24+)
- 🌐 WebView otimizada

---

## 🚀 Próximos Passos

1. **Compilar:** `./build.sh debug`
2. **Testar:** `./build.sh run`
3. **Distribuir:** `./gradlew assembleRelease` + assinatura
4. **Automático:** Push para GitHub → Actions compila

---

## 📞 Precisa de Help?

1. Verifique `BUILD_GUIDE.md` (guia completo)
2. Verifique logs: `./gradlew assembleDebug --stacktrace`
3. Limpe e tente novamente: `./gradlew clean assembleDebug`

---

**🎉 Pronto para compilar!** Use `./build.sh` ou `build.bat` agora.
