#!/usr/bin/env bash
set -euo pipefail

# Mantém a Activity apontando para a página principal, que contém o áudio
# e a visualização animada em canvas. A implementação completa já está
# versionada em app/src/main/java/com/frequencias/formas/MainActivity.java.

# Garante as configurações necessárias para áudio e aceleração da WebView.
grep -q 'android.permission.INTERNET' app/src/main/AndroidManifest.xml || \
  sed -i '/<manifest[^>]*>/a\    <uses-permission android:name="android.permission.INTERNET" />' app/src/main/AndroidManifest.xml

grep -q 'android:hardwareAccelerated="true"' app/src/main/AndroidManifest.xml || \
  sed -i 's/<application /<application android:hardwareAccelerated="true" /' app/src/main/AndroidManifest.xml

echo "Correções preservadas. Compile com: ./gradlew clean assembleDebug"
