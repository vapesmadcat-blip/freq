// ============================================================
//  BANCO DE DADOS DE SHOTS FUNCIONAIS
//  (SEM REVELAR AS FÓRMULAS)
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
        dosagem: '30-50 mL',
        formato: 'Spray sublingual',
        beneficios: ['Ansiedade', 'Pânico', 'Crises emocionais'],
        emocoes: ['ansioso', 'confuso'],
        horarios: ['manha', 'tarde', 'noite'],
        contextos: ['emergencia', 'trabalho', 'social'],
        compatibilidade: 9,
        prioridade: 'maxima'
    },
    sos_estresse: {
        id: 'sos_estresse',
        nome: 'SOS - Spray Antiestresse Agudo',
        categoria: 'SOS',
        emoji: '🌪️',
        descricao: 'Redução rápida do estresse e tensão emocional',
        tempoAcao: '15-20 min',
        dosagem: 'Spray sublingual',
        formato: 'Base PG com etanol',
        beneficios: ['Estresse', 'Tensão', 'Pressão arterial'],
        emocoes: ['irritado', 'cansado', 'confuso'],
        horarios: ['tarde', 'noite'],
        contextos: ['trabalho', 'pós-trabalho'],
        compatibilidade: 8.5,
        prioridade: 'alta'
    },
    sos_cortisol: {
        id: 'sos_cortisol',
        nome: 'SOS - Shot Anticortisol Emergencial',
        categoria: 'SOS',
        emoji: '🚨',
        descricao: 'Redução de pico de cortisol e estresse agudo',
        tempoAcao: '20-30 min',
        dosagem: '30-50 mL',
        formato: 'Shot oral',
        beneficios: ['Cortisol', 'Stress físico', 'Recuperação'],
        emocoes: ['cansado', 'irritado'],
        horarios: ['qualquer'],
        contextos: ['pós-treino', 'pós-trabalho'],
        compatibilidade: 9,
        prioridade: 'maxima'
    },
    sos_emocional: {
        id: 'sos_emocional',
        nome: 'SOS - Spray de Crise Emocional',
        categoria: 'SOS',
        emoji: '💔',
        descricao: 'Alívio imediato durante estados de sobrecarga nervosa',
        tempoAcao: '15-20 min',
        dosagem: 'Spray sublingual',
        formato: 'Base PG/Glicólica',
        beneficios: ['Sobrecarga emocional', 'Nervosismo', 'Desconforto'],
        emocoes: ['ansioso', 'irritado', 'confuso'],
        horarios: ['qualquer'],
        contextos: ['emergencia', 'social'],
        compatibilidade: 9,
        prioridade: 'maxima'
    },
    sos_pos_corte: {
        id: 'sos_pos_corte',
        nome: 'SOS - Pós-Corte de Estresse',
        categoria: 'SOS',
        emoji: '🔄',
        descricao: 'Recuperação física, emocional e cognitiva após estresse intenso',
        tempoAcao: '30-45 min',
        dosagem: '50 mL',
        formato: 'Shot noturno',
        beneficios: ['Recuperação', 'Equilibrio hormonal', 'Sono'],
        emocoes: ['cansado', 'deprimido'],
        horarios: ['noite'],
        contextos: ['pós-trabalho', 'pós-treino'],
        compatibilidade: 8.5,
        prioridade: 'alta'
    },

    // ⚡ ESTÍMULO E ENERGIA
    acorde_viva: {
        id: 'acorde_viva',
        nome: 'Shot Acorde e Viva',
        categoria: 'Energia',
        emoji: '🌅',
        descricao: 'Energia matinal, libido e clareza mental',
        tempoAcao: '15-20 min',
        dosagem: '50 mL',
        formato: 'Drinkshot oral',
        beneficios: ['Energia', 'Clareza', 'Libido', 'Vigor'],
        emocoes: ['cansado', 'deprimido'],
        horarios: ['manha'],
        contextos: ['trabalho', 'treino'],
        compatibilidade: 8,
        prioridade: 'normal'
    },
    clarity_boost: {
        id: 'clarity_boost',
        nome: 'Shot Clarity Boost',
        categoria: 'Energia',
        emoji: '💡',
        descricao: 'Clareza emocional, social e motivacional',
        tempoAcao: '10-15 min',
        dosagem: '30-40 mL',
        formato: 'Sublingual ou shot',
        beneficios: ['Clareza', 'Foco', 'Motivação', 'Atenção'],
        emocoes: ['confuso', 'cansado', 'deprimido'],
        horarios: ['manha', 'tarde'],
        contextos: ['trabalho', 'estudo'],
        compatibilidade: 8.5,
        prioridade: 'normal'
    },
    substituto_cafeina: {
        id: 'substituto_cafeina',
        nome: 'Shot Substitutivo da Cafeína',
        categoria: 'Energia',
        emoji: '☕',
        descricao: 'Estímulo limpo e equilibrado, sem crash',
        tempoAcao: '15 min',
        dosagem: '30 mL',
        formato: 'Shot oral',
        beneficios: ['Energia', 'Foco', 'Sem crash', 'Equilibrado'],
        emocoes: ['cansado'],
        horarios: ['manha', 'tarde'],
        contextos: ['trabalho', 'estudo'],
        compatibilidade: 8,
        prioridade: 'normal'
    },
    estímulo_cognitivo: {
        id: 'estímulo_cognitivo',
        nome: 'Shot Estímulo Cognitivo',
        categoria: 'Energia',
        emoji: '🧠',
        descricao: 'Ativação cerebral, foco e memória de curto prazo',
        tempoAcao: '15-20 min',
        dosagem: '30-50 mL',
        formato: 'Shot funcional',
        beneficios: ['Foco', 'Memória', 'Aprendizado', 'Atenção'],
        emocoes: ['confuso', 'cansado'],
        horarios: ['manha', 'tarde'],
        contextos: ['trabalho', 'estudo', 'exame'],
        compatibilidade: 8.5,
        prioridade: 'normal'
    },
    testobalance: {
        id: 'testobalance',
        nome: 'Shot TestoBalance',
        categoria: 'Energia',
        emoji: '💪',
        descricao: 'Suporte hormonal e disposição no corpo masculino',
        tempoAcao: '30-45 min',
        dosagem: 'Diária',
        formato: 'Shot ou cápsula',
        beneficios: ['Testosterona', 'Vigor', 'Disposição', 'Força'],
        emocoes: ['cansado', 'deprimido'],
        horarios: ['manha'],
        contextos: ['treino', 'desempenho'],
        compatibilidade: 7.5,
        prioridade: 'normal'
    },

    // 🧠 COGNITIVOS E NEUROCLARIDADE
    foco_absoluto: {
        id: 'foco_absoluto',
        nome: 'Shot Foco Absoluto',
        categoria: 'Cognitivo',
        emoji: '🎯',
        descricao: 'Clareza, atenção sustentada e foco mental',
        tempoAcao: '15-20 min',
        dosagem: '30-50 mL',
        formato: 'Shot ou sublingual',
        beneficios: ['Foco', 'Atenção', 'Concentração', 'Clareza'],
        emocoes: ['confuso', 'cansado'],
        horarios: ['manha', 'tarde'],
        contextos: ['trabalho', 'estudo', 'exame'],
        compatibilidade: 9,
        prioridade: 'alta'
    },
    foco_memoria: {
        id: 'foco_memoria',
        nome: 'Shot Foco & Memória',
        categoria: 'Cognitivo',
        emoji: '📚',
        descricao: 'Retenção, aprendizado e clareza mental',
        tempoAcao: '20-30 min',
        dosagem: '30-50 mL',
        formato: 'Shot diário ou spray',
        beneficios: ['Memória', 'Aprendizado', 'Retenção', 'Foco'],
        emocoes: ['confuso', 'cansado'],
        horarios: ['manha', 'tarde'],
        contextos: ['trabalho', 'estudo'],
        compatibilidade: 8.5,
        prioridade: 'normal'
    },
    neurodivergente_am: {
        id: 'neurodivergente_am',
        nome: 'Shot Neurodivergente AM',
        categoria: 'Cognitivo',
        emoji: '🌈',
        descricao: 'Clareza, foco e equilíbrio em perfis neurodivergentes',
        tempoAcao: '20-30 min',
        dosagem: '30-50 mL',
        formato: 'Shot matinal',
        beneficios: ['Foco', 'Equilibrio', 'TDAH', 'Autismo'],
        emocoes: ['confuso', 'irritado', 'cansado'],
        horarios: ['manha'],
        contextos: ['trabalho', 'estudo', 'social'],
        compatibilidade: 9,
        prioridade: 'alta'
    },

    // 😴 CALMANTES E NOTURNOS
    relaxamento_noturno: {
        id: 'relaxamento_noturno',
        nome: 'Shot Relaxamento Noturno',
        categoria: 'Sono',
        emoji: '🌙',
        descricao: 'Indução ao sono e relaxamento emocional',
        tempoAcao: '20-30 min',
        dosagem: '50 mL',
        formato: 'Shot oral noturno',
        beneficios: ['Sono', 'Relaxamento', 'Tranquilidade', 'Repouso'],
        emocoes: ['ansioso', 'cansado', 'irritado'],
        horarios: ['noite'],
        contextos: ['dormir', 'insomnia'],
        compatibilidade: 9,
        prioridade: 'alta'
    },
    sono_reparador: {
        id: 'sono_reparador',
        nome: 'Shot Sono Reparador',
        categoria: 'Sono',
        emoji: '💤',
        descricao: 'Sono profundo e redução de microdespertares',
        tempoAcao: '30-45 min',
        dosagem: '30-50 mL',
        formato: 'Shot noturno ou spray',
        beneficios: ['Sono profundo', 'Descanso', 'Regeneração', 'Ciclo'],
        emocoes: ['cansado', 'irritado'],
        horarios: ['noite'],
        contextos: ['dormir', 'insomnia'],
        compatibilidade: 9,
        prioridade: 'alta'
    },
    floral_sensorial_noturno: {
        id: 'floral_sensorial_noturno',
        nome: 'Shot Floral Sensorial Noturno',
        categoria: 'Sono',
        emoji: '🌸',
        descricao: 'Calma emocional, abertura sensorial e sonho lúcido',
        tempoAcao: '30 min',
        dosagem: '50 mL',
        formato: 'Shot, goma ou vaporizável',
        beneficios: ['Calma', 'Sensorialidade', 'Sonho lúcido', 'Abertura'],
        emocoes: ['ansioso', 'cansado', 'calmo'],
        horarios: ['noite'],
        contextos: ['dormir', 'meditacao'],
        compatibilidade: 8,
        prioridade: 'normal'
    },

    // ✨ SENSORIAL / VAPORIZÁVEL
    sensorial_kanna: {
        id: 'sensorial_kanna',
        nome: 'Sensorial Vaporizável (Kanna)',
        categoria: 'Sensorial',
        emoji: '💨',
        descricao: 'Bem-estar leve, sociabilidade e foco sensorial',
        tempoAcao: '5-10 min',
        dosagem: 'Vaporização',
        formato: 'Base PG/VG',
        beneficios: ['Bem-estar', 'Sociabilidade', 'Foco', 'Relaxamento'],
        emocoes: ['ansioso', 'cansado', 'calmo'],
        horarios: ['qualquer'],
        contextos: ['social', 'recreacao'],
        compatibilidade: 7,
        prioridade: 'normal'
    },
    sensorial_azul: {
        id: 'sensorial_azul',
        nome: 'Shot Sensorial Azul (Com Mudança de Cor)',
        categoria: 'Sensorial',
        emoji: '🎨',
        descricao: 'Sensorialidade, ritual emocional e ativação criativa',
        tempoAcao: '15-20 min',
        dosagem: 'Shot oral',
        formato: 'Com mudança de cor',
        beneficios: ['Criatividade', 'Sensorialidade', 'Ritual', 'Emocao'],
        emocoes: ['feliz', 'calmo'],
        horarios: ['tarde', 'noite'],
        contextos: ['social', 'creative'],
        compatibilidade: 7.5,
        prioridade: 'normal'
    },

    // 👩 SAÚDE FEMININA / HORMONAL
    encanto_azul: {
        id: 'encanto_azul',
        nome: 'Shot Encanto Azul',
        categoria: 'Feminino',
        emoji: '💙',
        descricao: 'Libido, vascularização e brilho emocional feminino',
        tempoAcao: '20-30 min',
        dosagem: '50 mL',
        formato: 'Goma ou shot',
        beneficios: ['Libido', 'Vascularização', 'Hormonal', 'Brilho'],
        emocoes: ['feliz', 'calmo'],
        horarios: ['tarde', 'noite'],
        contextos: ['lazer', 'romance'],
        compatibilidade: 7.5,
        prioridade: 'normal',
        genero: 'feminino'
    },
    libido_vital: {
        id: 'libido_vital',
        nome: 'Shot Libido Vital',
        categoria: 'Feminino',
        emoji: '❤️',
        descricao: 'Ativação sensorial, libido e vitalidade emocional',
        tempoAcao: '20-30 min',
        dosagem: '30-50 mL',
        formato: 'Chiclete ou shot',
        beneficios: ['Libido', 'Sensorialidade', 'Vitalidade', 'Desejo'],
        emocoes: ['feliz', 'calmo'],
        horarios: ['noite'],
        contextos: ['romance', 'lazer'],
        compatibilidade: 8,
        prioridade: 'normal',
        genero: 'feminino'
    },
    tpm_balance: {
        id: 'tpm_balance',
        nome: 'Shot TPM Balance',
        categoria: 'Feminino',
        emoji: '🌸',
        descricao: 'Apoio durante o ciclo menstrual, reduzindo tensão e desconforto',
        tempoAcao: '30-45 min',
        dosagem: 'Diária',
        formato: 'Shot ou cápsula',
        beneficios: ['TPM', 'Hormonal', 'Tensão', 'Desconforto'],
        emocoes: ['irritado', 'cansado'],
        horarios: ['manha', 'tarde'],
        contextos: ['ciclo'],
        compatibilidade: 9,
        prioridade: 'alta',
        genero: 'feminino'
    },
    flor_lua: {
        id: 'flor_lua',
        nome: 'Shot Flor da Lua',
        categoria: 'Feminino',
        emoji: '🌕',
        descricao: 'Suporte sensorial e emocional feminino, ritual de autocuidado',
        tempoAcao: '20-30 min',
        dosagem: '30 mL',
        formato: 'Shot floral ou chiclete',
        beneficios: ['Emocional', 'Autocuidado', 'Hormonal', 'Sensorial'],
        emocoes: ['feliz', 'calmo', 'cansado'],
        horarios: ['noite'],
        contextos: ['autocuidado', 'ritual'],
        compatibilidade: 8,
        prioridade: 'normal',
        genero: 'feminino'
    },

    // 👨 AFRODISÍACO MASCULINO / VITALIDADE
    vitalidade_masculina: {
        id: 'vitalidade_masculina',
        nome: 'Shot Vitalidade Masculina',
        categoria: 'Masculino',
        emoji: '🔥',
        descricao: 'Libido, vascularização, desempenho emocional e físico',
        tempoAcao: '20-30 min',
        dosagem: '30-50 mL',
        formato: 'Shot oral',
        beneficios: ['Libido', 'Vascularização', 'Desempenho', 'Vigor'],
        emocoes: ['feliz', 'cansado'],
        horarios: ['noite'],
        contextos: ['romance', 'lazer'],
        compatibilidade: 8,
        prioridade: 'normal',
        genero: 'masculino'
    },
    pre_treino_arginina: {
        id: 'pre_treino_arginina',
        nome: 'Shot Pré-Treino com Arginina',
        categoria: 'Masculino',
        emoji: '💪',
        descricao: 'Estímulo físico, vascularização e foco pré-atividade',
        tempoAcao: '15-20 min',
        dosagem: '30 mL',
        formato: 'Shot oral',
        beneficios: ['Energia', 'Vascularização', 'Foco', 'Performance'],
        emocoes: ['calmo', 'feliz'],
        horarios: ['manha', 'tarde'],
        contextos: ['treino', 'exercicio'],
        compatibilidade: 8.5,
        prioridade: 'normal',
        genero: 'masculino'
    },

    // 💪 RECUPERAÇÃO / ANTI-INFLAMATÓRIO
    recuperacao_total: {
        id: 'recuperacao_total',
        nome: 'Shot Recuperação Total',
        categoria: 'Recuperacao',
        emoji: '⚡',
        descricao: 'Regeneração física, anti-inflamação e energia celular',
        tempoAcao: '30-45 min',
        dosagem: '30-50 mL',
        formato: 'Shot pós-treino',
        beneficios: ['Recuperacao', 'Anti-inflamatorio', 'Energia', 'Musculo'],
        emocoes: ['cansado'],
        horarios: ['qualquer'],
        contextos: ['pós-treino'],
        compatibilidade: 9,
        prioridade: 'alta'
    },
    pos_corte_fisico: {
        id: 'pos_corte_fisico',
        nome: 'Shot Pós-Corte Estresse Físico',
        categoria: 'Recuperacao',
        emoji: '🔄',
        descricao: 'Recuperação após dias intensos ou treinos pesados',
        tempoAcao: '30-60 min',
        dosagem: '50 mL',
        formato: 'Shot oral',
        beneficios: ['Recuperacao', 'Sono', 'Relaxamento', 'Energia'],
        emocoes: ['cansado'],
        horarios: ['noite'],
        contextos: ['pós-treino', 'pós-trabalho'],
        compatibilidade: 9,
        prioridade: 'alta'
    },
    anti_inflamatorio: {
        id: 'anti_inflamatorio',
        nome: 'Shot Anti-Inflamatório Articular',
        categoria: 'Recuperacao',
        emoji: '🦴',
        descricao: 'Reduzir dores articulares, inflamação leve e fadiga',
        tempoAcao: '30-45 min',
        dosagem: '30 mL',
        formato: 'Shot funcional diário',
        beneficios: ['Anti-inflamatorio', 'Dor articular', 'Fadiga', 'Mobilidade'],
        emocoes: ['cansado', 'irritado'],
        horarios: ['qualquer'],
        contextos: ['pós-treino', 'dor'],
        compatibilidade: 8.5,
        prioridade: 'normal'
    },

    // 🚭 REDUÇÃO DE DANOS / ANTIVÍCIO
    pare_fumar: {
        id: 'pare_fumar',
        nome: 'Pare de Fumar, Fumando',
        categoria: 'Antivicio',
        emoji: '🚭',
        descricao: 'Reduzir craving por nicotina via vaporização sensorial',
        tempoAcao: '10-15 min',
        dosagem: 'Vaporização',
        formato: 'Spray ou vaporização',
        beneficios: ['Craving', 'Abstinencia', 'Reducao de danos'],
        emocoes: ['ansioso', 'cansado'],
        horarios: ['qualquer'],
        contextos: ['cessacao'],
        compatibilidade: 8,
        prioridade: 'normal'
    },
    anti_abstinencia: {
        id: 'anti_abstinencia',
        nome: 'Spray Anti-Abstinência',
        categoria: 'Antivicio',
        emoji: '🆘',
        descricao: 'Redução de estresse e craving em momentos críticos',
        tempoAcao: '10-15 min',
        dosagem: 'Spray sublingual',
        formato: 'Spray funcional',
        beneficios: ['Craving', 'Estresse', 'Abstinencia'],
        emocoes: ['ansioso', 'irritado'],
        horarios: ['qualquer'],
        contextos: ['cessacao'],
        compatibilidade: 8,
        prioridade: 'normal'
    },
    chiclete_antivicio: {
        id: 'chiclete_antivicio',
        nome: 'Chiclete Antivício',
        categoria: 'Antivicio',
        emoji: '🍬',
        descricao: 'Substituir ato de fumar, com suporte oral e químico',
        tempoAcao: '15-20 min',
        dosagem: 'Chiclete mastigável',
        formato: 'Goma funcional',
        beneficios: ['Craving', 'Habito oral', 'Cessacao'],
        emocoes: ['ansioso'],
        horarios: ['qualquer'],
        contextos: ['cessacao'],
        compatibilidade: 7.5,
        prioridade: 'normal'
    },

    // 🍬 CHICLETES E GOMAS FUNCIONAIS
    chiclete_adaptogeno: {
        id: 'chiclete_adaptogeno',
        nome: 'Chiclete Adaptógeno',
        categoria: 'Gomas',
        emoji: '🌿',
        descricao: 'Equilíbrio e clareza ao longo do dia',
        tempoAcao: '15-20 min',
        dosagem: 'Chiclete (10 min)',
        formato: 'Goma mastigável',
        beneficios: ['Equilibrio', 'Clareza', 'Stress', 'Energia'],
        emocoes: ['cansado', 'confuso', 'calmo'],
        horarios: ['qualquer'],
        contextos: ['trabalho', 'qualquer'],
        compatibilidade: 8,
        prioridade: 'normal'
    },
    chiclete_libido: {
        id: 'chiclete_libido',
        nome: 'Chiclete Libido Vital',
        categoria: 'Gomas',
        emoji: '💋',
        descricao: 'Aumento do desejo e conexão emocional',
        tempoAcao: '20-30 min',
        dosagem: 'Chiclete funcional',
        formato: 'Goma mastigável',
        beneficios: ['Libido', 'Desejo', 'Conexao', 'Sensorialidade'],
        emocoes: ['feliz', 'calmo'],
        horarios: ['noite'],
        contextos: ['romance', 'social'],
        compatibilidade: 7.5,
        prioridade: 'normal'
    },
    goma_sensorial_azul: {
        id: 'goma_sensorial_azul',
        nome: 'Goma Sensorial Azul Noturna',
        categoria: 'Gomas',
        emoji: '🌙',
        descricao: 'Relaxamento, sensorialidade e introspecção criativa',
        tempoAcao: '20-30 min',
        dosagem: 'Chiclete ou goma',
        formato: 'Goma antes de dormir',
        beneficios: ['Relaxamento', 'Sono', 'Criatividade', 'Introspecção'],
        emocoes: ['cansado', 'calmo', 'feliz'],
        horarios: ['noite'],
        contextos: ['dormir', 'meditacao'],
        compatibilidade: 8.5,
        prioridade: 'normal'
    },
    goma_tpm: {
        id: 'goma_tpm',
        nome: 'Goma TPM Sensorial',
        categoria: 'Gomas',
        emoji: '🌸',
        descricao: 'Equilíbrio emocional durante o ciclo',
        tempoAcao: '20-30 min',
        dosagem: 'Chiclete funcional',
        formato: 'Goma mastigável',
        beneficios: ['TPM', 'Hormonal', 'Emocional', 'Tensão'],
        emocoes: ['irritado', 'cansado'],
        horarios: ['qualquer'],
        contextos: ['ciclo'],
        compatibilidade: 8.5,
        prioridade: 'normal',
        genero: 'feminino'
    },

    // 🎁 FÓRMULAS ESPECIAIS
    sos_doce: {
        id: 'sos_doce',
        nome: 'SOS-Doce',
        categoria: 'Especial',
        emoji: '🍭',
        descricao: 'Alívio rápido de craving (doce, cigarro, compulsão oral)',
        tempoAcao: '10-15 min',
        dosagem: 'Spray ou chiclete',
        formato: 'Spray/Chiclete',
        beneficios: ['Craving', 'Compulsao oral', 'Doce', 'Cigarro'],
        emocoes: ['ansioso'],
        horarios: ['qualquer'],
        contextos: ['craving'],
        compatibilidade: 7.5,
        prioridade: 'normal'
    },
    sos_noite_doce: {
        id: 'sos_noite_doce',
        nome: 'SOS Noite Doce',
        categoria: 'Especial',
        emoji: '🌙',
        descricao: 'Desligar o corpo, acalmar o coração',
        tempoAcao: '20-30 min',
        dosagem: 'Shot noturno',
        formato: 'Shot oral',
        beneficios: ['Sono', 'Relaxamento', 'Calma', 'Descanso'],
        emocoes: ['ansioso', 'cansado'],
        horarios: ['noite'],
        contextos: ['dormir', 'insomnia'],
        compatibilidade: 8.5,
        prioridade: 'normal'
    },
    pre_reuniao: {
        id: 'pre_reuniao',
        nome: 'Pré-Reunião (Afirma)',
        categoria: 'Especial',
        emoji: '🎤',
        descricao: 'Clareza mental, segurança emocional e carisma',
        tempoAcao: '15-20 min',
        dosagem: 'Shot sublingual',
        formato: 'Shot ou spray',
        beneficios: ['Clareza', 'Seguranca', 'Carisma', 'Foco'],
        emocoes: ['ansioso', 'confuso', 'cansado'],
        horarios: ['manha', 'tarde'],
        contextos: ['trabalho', 'apresentacao'],
        compatibilidade: 8,
        prioridade: 'normal'
    },
    pos_briga_ex: {
        id: 'pos_briga_ex',
        nome: 'Pós-Briga com Ex (Flor de Volta)',
        categoria: 'Especial',
        emoji: '💗',
        descricao: 'Acolhimento, processamento emocional e retorno à presença',
        tempoAcao: '20-30 min',
        dosagem: 'Shot emocional',
        formato: 'Shot oral',
        beneficios: ['Emocional', 'Processamento', 'Acolhimento', 'Calma'],
        emocoes: ['triste', 'ansioso', 'irritado'],
        horarios: ['noite'],
        contextos: ['emocional'],
        compatibilidade: 8,
        prioridade: 'normal'
    },
    emagrecimento_termogenico: {
        id: 'emagrecimento_termogenico',
        nome: 'Shot Emagrecimento Termogênico',
        categoria: 'Especial',
        emoji: '🔥',
        descricao: 'Termogênese, saciedade e estabilização comportamental',
        tempoAcao: '20-30 min',
        dosagem: '50 mL',
        formato: 'Shot oral',
        beneficios: ['Termogenese', 'Saciedade', 'Metabolismo', 'Humor'],
        emocoes: ['cansado', 'deprimido'],
        horarios: ['manha', 'tarde'],
        contextos: ['emagrecimento'],
        compatibilidade: 7.5,
        prioridade: 'normal'
    }
};

// ============================================================
//  MATRIZ DE RECOMENDAÇÃO (Emoção → Shots)
// ============================================================
const RECOMENDACOES_EMOCAO = {
    deprimido: [
        'acorde_viva',
        'clarity_boost',
        'foco_absoluto',
        'vitalidade_masculina',
        'libido_vital',
        'pre_reuniao'
    ],
    ansioso: [
        'sos_ansiedade',
        'sos_estresse',
        'relaxamento_noturno',
        'chiclete_adaptogeno',
        'sos_doce'
    ],
    irritado: [
        'sos_emocional',
        'sos_cortisol',
        'relaxamento_noturno',
        'tpm_balance',
        'anti_inflamatorio'
    ],
    cansado: [
        'acorde_viva',
        'clarity_boost',
        'substituto_cafeina',
        'sos_pos_corte',
        'sono_reparador'
    ],
    confuso: [
        'clarity_boost',
        'foco_absoluto',
        'foco_memoria',
        'neurodivergente_am',
        'pre_reuniao'
    ],
    calmo: [
        'chiclete_adaptogeno',
        'goma_sensorial_azul',
        'libido_vital',
        'floral_sensorial_noturno',
        'sensorial_kanna'
    ],
    feliz: [
        'sensorial_azul',
        'libido_vital',
        'vitalidade_masculina',
        'goma_sensorial_azul',
        'flor_lua'
    ]
};

// ============================================================
//  MATRIZ POR CONTEXTO
// ============================================================
const RECOMENDACOES_CONTEXTO = {
    emergencia: ['sos_ansiedade', 'sos_emocional', 'sos_cortisol'],
    trabalho: ['foco_absoluto', 'clarity_boost', 'pre_reuniao', 'estímulo_cognitivo'],
    estudo: ['foco_absoluto', 'foco_memoria', 'neurodivergente_am', 'clarity_boost'],
    treino: ['pre_treino_arginina', 'recuperacao_total', 'pos_corte_fisico'],
    dormir: ['relaxamento_noturno', 'sono_reparador', 'goma_sensorial_azul'],
    social: ['vitalidade_masculina', 'libido_vital', 'sensorial_kanna', 'pre_reuniao'],
    romance: ['vitalidade_masculina', 'libido_vital', 'flor_lua', 'sensorial_azul'],
    autocuidado: ['flor_lua', 'goma_sensorial_azul', 'chiclete_adaptogeno'],
    ciclo: ['tpm_balance', 'flor_lua', 'goma_tpm'],
    cessacao: ['pare_fumar', 'anti_abstinencia', 'chiclete_antivicio'],
    pós_treino: ['recuperacao_total', 'pos_corte_fisico', 'sos_cortisol'],
    pós_trabalho: ['sos_pos_corte', 'relaxamento_noturno', 'sono_reparador']
};

// ============================================================
//  ENGINE DE RECOMENDAÇÃO
// ============================================================
function recomendarShots(emocao, contexto = null, horario = null, genero = null) {
    let recomendados = [];
    let scores = {};

    // 1. Baseado em emoção (alta prioridade)
    const porEmocao = RECOMENDACOES_EMOCAO[emocao] || [];
    porEmocao.forEach(id => {
        scores[id] = (scores[id] || 0) + 10;
    });

    // 2. Baseado em contexto (média prioridade)
    if (contexto && RECOMENDACOES_CONTEXTO[contexto]) {
        const porContexto = RECOMENDACOES_CONTEXTO[contexto];
        porContexto.forEach(id => {
            scores[id] = (scores[id] || 0) + 6;
        });
    }

    // 3. Filtrar por horário (compatibilidade)
    if (horario) {
        Object.keys(SHOTS_DATABASE).forEach(id => {
            const shot = SHOTS_DATABASE[id];
            if (shot.horarios.includes(horario) || shot.horarios.includes('qualquer')) {
                scores[id] = (scores[id] || 0) + 2;
            } else {
                scores[id] = (scores[id] || 0) - 3;
            }
        });
    }

    // 4. Filtrar por gênero (compatibilidade)
    if (genero) {
        Object.keys(SHOTS_DATABASE).forEach(id => {
            const shot = SHOTS_DATABASE[id];
            if (shot.genero && shot.genero !== genero) {
                scores[id] = (scores[id] || 0) - 5;
            }
        });
    }

    // 5. Ordenar por score
    recomendados = Object.keys(scores)
        .sort((a, b) => scores[b] - scores[a])
        .slice(0, 5) // Top 5
        .map(id => ({
            ...SHOTS_DATABASE[id],
            score: scores[id]
        }));

    return recomendados;
}

// Exportar para uso global
window.SHOTS_DATABASE = SHOTS_DATABASE;
window.recomendarShots = recomendarShots;
