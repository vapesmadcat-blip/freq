#!/bin/bash

###############################################################################
# 🎵 Binaural Shots - Script de Build Completo
# 
# Uso:
#   ./build.sh                    # Menu interativo
#   ./build.sh debug              # Build debug APK
#   ./build.sh release            # Build release APK (unsigned)
#   ./build.sh clean              # Limpar build
#   ./build.sh install            # Instalar debug APK
#   ./build.sh run                # Instalar e executar
#   ./build.sh all                # Clean + Debug + Release
#
###############################################################################

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Paths
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$PROJECT_ROOT/app"
BUILD_DIR="$APP_DIR/build"
DEBUG_APK="$BUILD_DIR/outputs/apk/debug/app-debug.apk"
RELEASE_APK="$BUILD_DIR/outputs/apk/release/app-release-unsigned.apk"

# Funções de log
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Verificar se gradlew existe
check_gradle() {
    if [ ! -f "$PROJECT_ROOT/gradlew" ]; then
        log_error "gradlew não encontrado!"
        log_info "Abra o projeto no Android Studio ou clone o repositório corretamente"
        exit 1
    fi
    chmod +x "$PROJECT_ROOT/gradlew"
    log_success "gradlew encontrado"
}

# Verificar Android SDK
check_android_sdk() {
    if [ -z "$ANDROID_HOME" ]; then
        log_warning "ANDROID_HOME não está definido"
        log_info "Tente definir: export ANDROID_HOME=~/Android/Sdk"
        log_info "Continuando mesmo assim..."
    else
        log_success "ANDROID_HOME: $ANDROID_HOME"
    fi
}

# Verificar JDK
check_jdk() {
    if ! command -v java &> /dev/null; then
        log_error "Java não encontrado! Instale o JDK 17 ou superior"
        exit 1
    fi
    JAVA_VERSION=$(java -version 2>&1 | head -1)
    log_success "Java encontrado: $JAVA_VERSION"
}

# Build Debug
build_debug() {
    log_info "🔨 Compilando Debug APK..."
    cd "$PROJECT_ROOT"
    ./gradlew assembleDebug --stacktrace
    
    if [ -f "$DEBUG_APK" ]; then
        SIZE=$(du -h "$DEBUG_APK" | cut -f1)
        log_success "Debug APK compilado com sucesso! ($SIZE)"
        log_info "Localização: $DEBUG_APK"
        echo ""
    else
        log_error "Falha ao compilar Debug APK"
        exit 1
    fi
}

# Build Release (unsigned)
build_release() {
    log_info "🔨 Compilando Release APK (unsigned)..."
    cd "$PROJECT_ROOT"
    ./gradlew assembleRelease --stacktrace
    
    if [ -f "$RELEASE_APK" ]; then
        SIZE=$(du -h "$RELEASE_APK" | cut -f1)
        log_success "Release APK compilado com sucesso! ($SIZE)"
        log_info "Localização: $RELEASE_APK"
        log_warning "Este APK ainda precisa ser assinado com sua keystore!"
        echo ""
    else
        log_error "Falha ao compilar Release APK"
        exit 1
    fi
}

# Clean build
clean_build() {
    log_info "🧹 Limpando build anterior..."
    cd "$PROJECT_ROOT"
    ./gradlew clean
    log_success "Build limpo"
}

# Instalar Debug APK
install_apk() {
    if [ ! -f "$DEBUG_APK" ]; then
        log_warning "Debug APK não encontrado. Compilando..."
        build_debug
    fi
    
    log_info "📱 Instalando Debug APK no device..."
    
    if ! command -v adb &> /dev/null; then
        log_error "ADB não encontrado! Instale Android SDK Platform Tools"
        exit 1
    fi
    
    if ! adb devices | grep -q "device$"; then
        log_error "Nenhum device Android conectado!"
        exit 1
    fi
    
    adb install -r "$DEBUG_APK"
    log_success "APK instalado com sucesso!"
}

# Instalar e executar
run_app() {
    install_apk
    
    log_info "🚀 Iniciando aplicativo..."
    adb shell am start -n "com.frequencias.formas/.MainActivity"
    log_success "Aplicativo iniciado!"
}

# Mostrar ajuda
show_help() {
    cat << EOF
${BLUE}🎵 Binaural Shots - Script de Build${NC}

${YELLOW}Uso:${NC}
    $0 [comando]

${YELLOW}Comandos disponíveis:${NC}
    ${GREEN}debug${NC}           Compilar Debug APK (padrão)
    ${GREEN}release${NC}         Compilar Release APK (unsigned)
    ${GREEN}clean${NC}           Limpar build anterior
    ${GREEN}install${NC}         Instalar Debug APK no device
    ${GREEN}run${NC}             Instalar e iniciar app
    ${GREEN}all${NC}             Clean + Debug + Release (build completo)
    ${GREEN}help${NC}            Mostrar esta ajuda
    ${GREEN}(vazio)${NC}         Menu interativo

${YELLOW}Exemplos:${NC}
    $0 debug
    $0 install
    $0 run
    $0 all

${YELLOW}Variáveis de Ambiente:${NC}
    ANDROID_HOME         Caminho do Android SDK
    JAVA_HOME            Caminho do JDK 17+

EOF
}

# Menu interativo
show_menu() {
    clear
    echo -e "${BLUE}"
    echo "╔═══════════════════════════════════════╗"
    echo "║    🎵 Binaural Shots - Build Menu    ║"
    echo "╚═══════════════════════════════════════╝"
    echo -e "${NC}"
    echo "1) 🔨 Build Debug APK"
    echo "2) 🔨 Build Release APK (unsigned)"
    echo "3) 🧹 Clean Build"
    echo "4) 📱 Instalar no Device"
    echo "5) 🚀 Instalar e Executar"
    echo "6) ✅ Build Completo (Clean + Debug + Release)"
    echo "7) 📋 Mostrar Ajuda"
    echo "0) ❌ Sair"
    echo ""
    read -p "Escolha uma opção: " choice
    
    case $choice in
        1) build_debug ;;
        2) build_release ;;
        3) clean_build ;;
        4) install_apk ;;
        5) run_app ;;
        6) 
            clean_build
            build_debug
            build_release
            log_success "Build completo finalizado!"
            ;;
        7) show_help ;;
        0) log_info "Saindo..."; exit 0 ;;
        *) log_error "Opção inválida"; show_menu ;;
    esac
    
    echo ""
    read -p "Pressione ENTER para continuar..."
    show_menu
}

# Main
main() {
    log_info "🎵 Binaural Shots - Build Tool"
    echo ""
    
    # Verificações iniciais
    check_jdk
    check_gradle
    check_android_sdk
    echo ""
    
    # Processar argumentos
    case "${1:-}" in
        debug)
            build_debug
            ;;
        release)
            build_release
            ;;
        clean)
            clean_build
            ;;
        install)
            install_apk
            ;;
        run)
            run_app
            ;;
        all)
            clean_build
            build_debug
            build_release
            log_success "✨ Build completo finalizado!"
            ;;
        help|--help|-h)
            show_help
            ;;
        "")
            show_menu
            ;;
        *)
            log_error "Comando desconhecido: $1"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

main "$@"
