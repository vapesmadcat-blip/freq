@echo off
REM ============================================================================
REM   Binaural Shots - Build Script para Windows
REM
REM Uso:
REM   build.bat debug              -> Build Debug APK
REM   build.bat release            -> Build Release APK
REM   build.bat clean              -> Limpar build
REM   build.bat install            -> Instalar no device
REM   build.bat run                -> Instalar e executar
REM   build.bat all                -> Build completo
REM   build.bat help               -> Mostrar ajuda
REM   build.bat (vazio)            -> Menu interativo
REM
REM ============================================================================

setlocal enabledelayedexpansion

REM Cores (usando caracteres especiais)
set "GREEN=[92m"
set "RED=[91m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "RESET=[0m"

REM Paths
set "PROJECT_ROOT=%~dp0"
set "APP_DIR=%PROJECT_ROOT%app"
set "BUILD_DIR=%APP_DIR%\build"
set "DEBUG_APK=%BUILD_DIR%\outputs\apk\debug\app-debug.apk"
set "RELEASE_APK=%BUILD_DIR%\outputs\apk\release\app-release-unsigned.apk"

if "%1"=="" goto :menu
if "%1"=="debug" goto :build_debug
if "%1"=="release" goto :build_release
if "%1"=="clean" goto :clean
if "%1"=="install" goto :install
if "%1"=="run" goto :run_app
if "%1"=="all" goto :build_all
if "%1"=="help" goto :help
goto :invalid

:menu
cls
echo.
echo %BLUE%=============================================%RESET%
echo %BLUE%   Binaural Shots - Build Menu (Windows)   %RESET%
echo %BLUE%=============================================%RESET%
echo.
echo 1) Build Debug APK
echo 2) Build Release APK (unsigned)
echo 3) Limpar Build
echo 4) Instalar no Device
echo 5) Instalar e Executar
echo 6) Build Completo (Clean + Debug + Release)
echo 7) Mostrar Ajuda
echo 0) Sair
echo.
set /p choice="Escolha uma opcao: "

if "%choice%"=="1" goto :build_debug
if "%choice%"=="2" goto :build_release
if "%choice%"=="3" goto :clean
if "%choice%"=="4" goto :install
if "%choice%"=="5" goto :run_app
if "%choice%"=="6" goto :build_all
if "%choice%"=="7" goto :help
if "%choice%"=="0" goto :eof
goto :menu

:build_debug
echo.
echo %BLUE%[*] Compilando Debug APK...%RESET%
cd /d "%PROJECT_ROOT%"
call gradlew.bat assembleDebug --stacktrace
if errorlevel 1 (
    echo %RED%[!] Erro ao compilar Debug APK%RESET%
    pause
    exit /b 1
)
if exist "%DEBUG_APK%" (
    for %%A in ("%DEBUG_APK%") do set "SIZE=%%~zA"
    echo %GREEN%[OK] Debug APK compilado com sucesso!%RESET%
    echo %BLUE%[*] Tamanho: %SIZE% bytes%RESET%
    echo %BLUE%[*] Arquivo: %DEBUG_APK%%RESET%
) else (
    echo %RED%[!] APK nao foi criado%RESET%
    pause
    exit /b 1
)
goto :eof

:build_release
echo.
echo %BLUE%[*] Compilando Release APK (unsigned)...%RESET%
cd /d "%PROJECT_ROOT%"
call gradlew.bat assembleRelease --stacktrace
if errorlevel 1 (
    echo %RED%[!] Erro ao compilar Release APK%RESET%
    pause
    exit /b 1
)
if exist "%RELEASE_APK%" (
    for %%A in ("%RELEASE_APK%") do set "SIZE=%%~zA"
    echo %GREEN%[OK] Release APK compilado com sucesso!%RESET%
    echo %BLUE%[*] Tamanho: %SIZE% bytes%RESET%
    echo %BLUE%[*] Arquivo: %RELEASE_APK%%RESET%
    echo %YELLOW%[!] Este APK precisa ser assinado com sua keystore privada!%RESET%
) else (
    echo %RED%[!] APK nao foi criado%RESET%
    pause
    exit /b 1
)
goto :eof

:clean
echo.
echo %BLUE%[*] Limpando build anterior...%RESET%
cd /d "%PROJECT_ROOT%"
call gradlew.bat clean
if errorlevel 1 (
    echo %RED%[!] Erro ao limpar build%RESET%
    pause
    exit /b 1
)
echo %GREEN%[OK] Build limpo com sucesso%RESET%
goto :eof

:install
echo.
if not exist "%DEBUG_APK%" (
    echo %YELLOW%[!] Debug APK nao encontrado. Compilando...%RESET%
    call :build_debug
)
echo %BLUE%[*] Instalando Debug APK no device...%RESET%
adb install -r "%DEBUG_APK%"
if errorlevel 1 (
    echo %RED%[!] Erro ao instalar APK%RESET%
    echo %BLUE%[*] Verifique se o device esta conectado (adb devices)%RESET%
    pause
    exit /b 1
)
echo %GREEN%[OK] APK instalado com sucesso!%RESET%
goto :eof

:run_app
echo.
if not exist "%DEBUG_APK%" (
    echo %YELLOW%[!] Debug APK nao encontrado. Compilando...%RESET%
    call :build_debug
)
echo %BLUE%[*] Instalando Debug APK no device...%RESET%
adb install -r "%DEBUG_APK%"
if errorlevel 1 (
    echo %RED%[!] Erro ao instalar APK%RESET%
    pause
    exit /b 1
)
echo %GREEN%[OK] APK instalado com sucesso!%RESET%
echo.
echo %BLUE%[*] Iniciando aplicativo...%RESET%
adb shell am start -n "com.frequencias.formas/.MainActivity"
echo %GREEN%[OK] Aplicativo iniciado!%RESET%
goto :eof

:build_all
echo.
echo %BLUE%[*] Iniciando build completo (Clean + Debug + Release)...%RESET%
call :clean
call :build_debug
call :build_release
echo %GREEN%[OK] Build completo finalizado com sucesso!%RESET%
goto :eof

:help
cls
echo.
echo %BLUE%=====================================%RESET%
echo %BLUE%  Binaural Shots - Build Script     %RESET%
echo %BLUE%=====================================%RESET%
echo.
echo %YELLOW%USO:%RESET%
echo   build.bat [comando]
echo.
echo %YELLOW%COMANDOS:%RESET%
echo   debug               Compilar Debug APK
echo   release             Compilar Release APK (unsigned)
echo   clean               Limpar build anterior
echo   install             Instalar Debug APK no device
echo   run                 Instalar e iniciar app
echo   all                 Build completo (Clean + Debug + Release)
echo   help                Mostrar esta ajuda
echo.
echo %YELLOW%EXEMPLOS:%RESET%
echo   build.bat debug
echo   build.bat install
echo   build.bat run
echo   build.bat all
echo.
echo %YELLOW%REQUISITOS:%RESET%
echo   - JDK 17 ou superior instalado
echo   - Android SDK instalado
echo   - ANDROID_HOME configurado
echo   - ADB no PATH (para instalar)
echo.
pause
goto :eof

:invalid
echo %RED%[!] Comando desconhecido: %1%RESET%
echo %BLUE%[*] Digite "build.bat help" para ver as opcoes disponiveis%RESET%
pause
exit /b 1
