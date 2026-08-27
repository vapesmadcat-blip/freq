// ============================================================
//  BANCO DE DADOS DE SHOTS FUNCIONAIS
//  Sistema de Recomendação Inteligente
// ============================================================

const SHOTS_DATABASE = {
    // 🆘 SOS E INTERVENÇÃO RÁPIDA
    sos_ansiedade: {
        id: 'sos_ansiedade',
        nome: 'SOS - Ansiedade',
        categoria: 'SOS',
        emoji: '😰',
        descricao: 'Alívio emergencial para estados de pânico e crises emocionais',
        tempoAcao: '10-15 min',
        beneficios: ['Ansiedade', 'Pânico', 'Crises emocionais'],
        emocoes: ['ansioso', 'confuso'],
        horarios: ['qualquer'],
        contextos: ['emergencia', 'trabalho', 'social'],
        compatibilidade: 9,
        frequenciaRecomendada: 396
    },
    clarity_boost: {
        id: 'clarity_boost',
        nome: 'Shot Clarity Boost',
        categoria: 'Energia',
        emoji: '💡',
        descricao: 'Clareza emocional, social e motivacional',
        tempoAcao: '10-15 min',
        beneficios: ['Clareza', 'Foco', 'Motivação', 'Atenção'],
        emocoes: ['confuso', 'cansado', 'deprimido'],
        horarios: ['manha', 'tarde'],
        contextos: ['trabalho', 'estudo'],
        compatibilidade: 8.5,
        frequenciaRecomendada: 741
    },
    foco_absoluto: {
        id: 'foco_absoluto',
        nome: 'Shot Foco Absoluto',
        categoria: 'Cognitivo',
        emoji: '🎯',
        descricao: 'Clareza, atenção sustentada e foco mental',
        tempoAcao: '15-20 min',
        beneficios: ['Foco', 'Atenção', 'Concentração', 'Clareza'],
        emocoes: ['confuso', 'cansado'],
        horarios: ['manha', 'tarde'],
        contextos: ['trabalho', 'estudo', 'exame'],
        compatibilidade: 9,
        frequenciaRecomendada: 852
    },
    acorde_viva: {
        id: 'acorde_viva',
        nome: 'Shot Acorde e Viva',
        categoria: 'Energia',
        emoji: '🌅',
        descricao: 'Energia matinal, libido e clareza mental',
        tempoAcao: '15-20 min',
        beneficios: ['Energia', 'Clareza', 'Libido', 'Vigor'],
        emocoes: ['cansado', 'deprimido'],
        horarios: ['manha'],
        contextos: ['trabalho', 'treino'],
        compatibilidade: 8,
        frequenciaRecomendada: 741
    },
    relaxamento_noturno: {
        id: 'relaxamento_noturno',
        nome: 'Shot Relaxamento Noturno',
        categoria: 'Sono',
        emoji: '🌙',
        descricao: 'Indução ao sono e relaxamento emocional',
        tempoAcao: '20-30 min',
        beneficios: ['Sono', 'Relaxamento', 'Tranquilidade', 'Repouso'],
        emocoes: ['ansioso', 'cansado', 'irritado'],
        horarios: ['noite'],
        contextos: ['dormir', 'insomnia'],
        compatibilidade: 9,
        frequenciaRecomendada: 174
    },
    sono_reparador: {
        id: 'sono_reparador',
        nome: 'Shot Sono Reparador',
        categoria: 'Sono',
        emoji: '💤',
        descricao: 'Sono profundo e redução de microdespertares',
        tempoAcao: '30-45 min',
        beneficios: ['Sono profundo', 'Descanso', 'Regeneração', 'Ciclo'],
        emocoes: ['cansado', 'irritado'],
        horarios: ['noite'],
        contextos: ['dormir', 'insomnia'],
        compatibilidade: 9,
        frequenciaRecomendada: 174
    },
    recuperacao_total: {
        id: 'recuperacao_total',
        nome: 'Shot Recuperação Total',
        categoria: 'Recuperacao',
        emoji: '⚡',
        descricao: 'Regeneração física, anti-inflamação e energia celular',
        tempoAcao: '30-45 min',
        beneficios: ['Recuperacao', 'Anti-inflamatorio', 'Energia', 'Musculo'],
        emocoes: ['cansado'],
        horarios: ['qualquer'],
        contextos: ['pós-treino'],
        compatibilidade: 9,
        frequenciaRecomendada: 528
    },
    libido_vital: {
        id: 'libido_vital',
        nome: 'Shot Libido Vital',
        categoria: 'Feminino',
        emoji: '❤️',
        descricao: 'Ativação sensorial, libido e vitalidade emocional',
        tempoAcao: '20-30 min',
        beneficios: ['Libido', 'Sensorialidade', 'Vitalidade', 'Desejo'],
        emocoes: ['feliz', 'calmo'],
        horarios: ['noite'],
        contextos: ['romance', 'lazer'],
        compatibilidade: 8,
        frequenciaRecomendada: 639
    },
    tpm_balance: {
        id: 'tpm_balance',
        nome: 'Shot TPM Balance',
        categoria: 'Feminino',
        emoji: '🌸',
        descricao: 'Apoio durante o ciclo menstrual, reduzindo tensão e desconforto',
        tempoAcao: '30-45 min',
        beneficios: ['TPM', 'Hormonal', 'Tensão', 'Desconforto'],
        emocoes: ['irritado', 'cansado'],
        horarios: ['qualquer'],
        contextos: ['ciclo'],
        compatibilidade: 9,
        frequenciaRecomendada: 639
    },
    vitalidade_masculina: {
        id: 'vitalidade_masculina',
        nome: 'Shot Vitalidade Masculina',
        categoria: 'Masculino',
        emoji: '🔥',
        descricao: 'Libido, vascularização, desempenho emocional e físico',
        tempoAcao: '20-30 min',
        beneficios: ['Libido', 'Vascularização', 'Desempenho', 'Vigor'],
        emocoes: ['feliz', 'cansado'],
        horarios: ['noite'],
        contextos: ['romance', 'lazer'],
        compatibilidade: 8,
        frequenciaRecomendada: 639
    },
    neurodivergente_am: {
        id: 'neurodivergente_am',
        nome: 'Shot Neurodivergente AM',
        categoria: 'Cognitivo',
        emoji: '🌈',
        descricao: 'Clareza, foco e equilíbrio em perfis neurodivergentes',
        tempoAcao: '20-30 min',
        beneficios: ['Foco', 'Equilibrio', 'TDAH', 'Autismo'],
        emocoes: ['confuso', 'irritado', 'cansado'],
        horarios: ['manha'],
        contextos: ['trabalho', 'estudo', 'social'],
        compatibilidade: 9,
        frequenciaRecomendada: 852
    },
    sensorial_kanna: {
        id: 'sensorial_kanna',
        nome: 'Sensorial Vaporizável (Kanna)',
        categoria: 'Sensorial',
        emoji: '💨',
        descricao: 'Bem-estar leve, sociabilidade e foco sensorial',
        tempoAcao: '5-10 min',
        beneficios: ['Bem-estar', 'Sociabilidade', 'Foco', 'Relaxamento'],
        emocoes: ['ansioso', 'cansado', 'calmo'],
        horarios: ['qualquer'],
        contextos: ['social', 'recreacao'],
        compatibilidade: 7,
        frequenciaRecomendada: 432
    },
    chiclete_adaptogeno: {
        id: 'chiclete_adaptogeno',
        nome: 'Chiclete Adaptógeno',
        categoria: 'Gomas',
        emoji: '🌿',
        descricao: 'Equilíbrio e clareza ao longo do dia',
        tempoAcao: '15-20 min',
        beneficios: ['Equilibrio', 'Clareza', 'Stress', 'Energia'],
        emocoes: ['cansado', 'confuso', 'calmo'],
        horarios: ['qualquer'],
        contextos: ['trabalho', 'qualquer'],
        compatibilidade: 8,
        frequenciaRecomendada: 432
    },
    goma_sensorial_azul: {
        id: 'goma_sensorial_azul',
        nome: 'Goma Sensorial Azul Noturna',
        categoria: 'Gomas',
        emoji: '🌙',
        descricao: 'Relaxamento, sensorialidade e introspecção criativa',
        tempoAcao: '20-30 min',
        beneficios: ['Relaxamento', 'Sono', 'Criatividade', 'Introspecção'],
        emocoes: ['cansado', 'calmo', 'feliz'],
        horarios: ['noite'],
        contextos: ['dormir', 'meditacao'],
        compatibilidade: 8.5,
        frequenciaRecomendada: 396
    },
    flor_lua: {
        id: 'flor_lua',
        nome: 'Shot Flor da Lua',
        categoria: 'Feminino',
        emoji: '🌕',
        descricao: 'Suporte sensorial e emocional feminino, ritual de autocuidado',
        tempoAcao: '20-30 min',
        beneficios: ['Emocional', 'Autocuidado', 'Hormonal', 'Sensorial'],
        emocoes: ['feliz', 'calmo', 'cansado'],
        horarios: ['noite'],
        contextos: ['autocuidado', 'ritual'],
        compatibilidade: 8,
        frequenciaRecomendada: 639
    },
    pre_reuniao: {
        id: 'pre_reuniao',
        nome: 'Pré-Reunião (Afirma)',
        categoria: 'Especial',
        emoji: '🎤',
        descricao: 'Clareza mental, segurança emocional e carisma',
        tempoAcao: '15-20 min',
        beneficios: ['Clareza', 'Seguranca', 'Carisma', 'Foco'],
        emocoes: ['ansioso', 'confuso', 'cansado'],
        horarios: ['manha', 'tarde'],
        contextos: ['trabalho', 'apresentacao'],
        compatibilidade: 8,
        frequenciaRecomendada: 852
    }
};

// ============================================================
//  ENGINE DE RECOMENDAÇÃO
// ============================================================

function recomendarShots(emocao, contexto = null, horario = 'qualquer') {
    let scores = {};

    // Inicializar scores
    Object.keys(SHOTS_DATABASE).forEach(id => {
        scores[id] = 0;
    });

    // 1. Filtrar por emoção (ALTA PRIORIDADE - 10 pontos)
    Object.keys(SHOTS_DATABASE).forEach(id => {
        const shot = SHOTS_DATABASE[id];
        if (shot.emocoes.includes(emocao)) {
            scores[id] += 10;
        }
    });

    // 2. Filtrar por contexto (MÉDIA PRIORIDADE - 6 pontos)
    if (contexto) {
        Object.keys(SHOTS_DATABASE).forEach(id => {
            const shot = SHOTS_DATABASE[id];
            if (shot.contextos.includes(contexto)) {
                scores[id] += 6;
            }
        });
    }

    // 3. Filtrar por horário (BAIXA PRIORIDADE - 2 pontos)
    Object.keys(SHOTS_DATABASE).forEach(id => {
        const shot = SHOTS_DATABASE[id];
        if (shot.horarios.includes(horario) || shot.horarios.includes('qualquer')) {
            scores[id] += 2;
        } else {
            scores[id] -= 3;
        }
    });

    // 4. Ordenar por score e retornar top 5
    const recomendados = Object.keys(scores)
        .sort((a, b) => scores[b] - scores[a])
        .slice(0, 5)
        .map(id => ({
            ...SHOTS_DATABASE[id],
            score: scores[id]
        }));

    return recomendados;
}

// ============================================================
//  INTERFACE MODAL DE RECOMENDAÇÃO
// ============================================================

function abrirSondagemEmocional() {
    const modal = document.getElementById('modalSondagem');
    if (modal) {
        modal.classList.add('show');
    }
}

function fecharSondagem() {
    const modal = document.getElementById('modalSondagem');
    if (modal) {
        modal.classList.remove('show');
    }
}

function procesarSondagem(emocao, contexto, horario) {
    const recomendados = recomendarShots(emocao, contexto, horario);
    mostrarResultadoRecomendacao(recomendados, emocao);
}

function mostrarResultadoRecomendacao(recomendados, emocao) {
    const modal = document.getElementById('modalRecomendacao');
    if (!modal) return;

    const grid = modal.querySelector('#shotsRecomendadosGrid');
    grid.innerHTML = '';

    recomendados.forEach((shot, index) => {
        const card = document.createElement('div');
        card.className = 'shot-card-recomendado';
        card.innerHTML = `
            <div class="card-header">
                <span class="shot-numero">#${index + 1}</span>
                <span class="shot-emoji">${shot.emoji}</span>
            </div>
            <div class="card-content">
                <h3>${shot.nome}</h3>
                <p class="categoria">${shot.categoria}</p>
                <p class="descricao">${shot.descricao}</p>
                <div class="detalhes">
                    <span class="tempo">⏱️ ${shot.tempoAcao}</span>
                    <span class="compat">⭐ ${shot.compatibilidade}/10</span>
                </div>
                <div class="beneficios">
                    ${shot.beneficios.map(b => `<span class="badge">${b}</span>`).join('')}
                </div>
                <div class="freq-rec">
                    🎵 ${shot.frequenciaRecomendada} Hz
                </div>
            </div>
            <button class="btn-usar-shot" onclick="usarShotRecomendado('${shot.id}', ${shot.frequenciaRecomendada})">
                Usar este Shot
            </button>
        `;
        grid.appendChild(card);
    });

    modal.classList.add('show');
}

function usarShotRecomendado(shotId, frequencia) {
    // Fechar modal
    const modal = document.getElementById('modalRecomendacao');
    if (modal) modal.classList.remove('show');

    // Aplicar frequência recomendada
    if (window.aplicarFrequencia) {
        window.aplicarFrequencia(frequencia);
    }

    // Atualizar estado do shot
    const shot = SHOTS_DATABASE[shotId];
    console.log('🎵 Shot utilizado:', shot.nome, `(${frequencia} Hz)`);
}

// Exportar funções globais
window.recomendarShots = recomendarShots;
window.abrirSondagemEmocional = abrirSondagemEmocional;
window.fecharSondagem = fecharSondagem;
window.procesarSondagem = procesarSondagem;
window.usarShotRecomendado = usarShotRecomendado;
window.SHOTS_DATABASE = SHOTS_DATABASE;
