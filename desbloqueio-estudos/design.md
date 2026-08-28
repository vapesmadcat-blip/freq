# Plano de design — Desbloqueio Estudos

## Direção do produto

O Desbloqueio Estudos será um aplicativo de sessão curta para ENEM e concursos. A experiência deve parecer um ritual diário simples: escolher um tema, responder uma questão por vez e acompanhar uma sequência de acertos até chegar a três. A interface assume uso em **portrait**, com navegação confortável para uma mão e ações primárias na metade inferior da tela.

## Telas

| Tela | Conteúdo e funcionalidade |
|---|---|
| Início | Saudação, sequência atual, progresso para três acertos, seletor de trilha ENEM/Concursos e cards de matérias. |
| Questão | Enunciado, alternativas grandes, contador da sequência e botão de confirmação. Depois do envio, mostra feedback e explicação. |
| Resultado | Resumo da sessão, acertos, erros, melhor sequência e ações “Tentar novamente” e “Voltar ao início”. |
| Histórico | Lista local de sessões recentes com data, tema, percentual e melhor sequência. |
| Configurações | Preferência de trilha, alternância de tema claro/escuro e nota explicando a origem das questões. |

## Fluxos principais

1. Usuário abre o Início, escolhe ENEM ou Concursos e seleciona uma matéria.
2. Usuário toca em “Começar desafio”; o app carrega uma questão remota quando a API estiver disponível e usa o banco local como fallback.
3. Usuário seleciona uma alternativa e toca em “Responder”. O botão fica indisponível durante a avaliação.
4. Se acertar, a sequência aumenta e aparece uma confirmação visual. Ao chegar a três acertos, a tela comunica que o desbloqueio foi conquistado.
5. Se errar, a sequência volta a zero, a explicação aparece e o usuário pode avançar para uma nova questão.
6. Ao encerrar a sessão, o resultado é salvo localmente e aparece no Histórico.

## Escolhas visuais

A marca usa **azul-noite #10233F** como base de confiança e foco, **azul elétrico #2F80ED** para ação primária, **verde-lima #B8E986** para acertos e **coral #FF7A6B** para erros. O fundo claro é **#F6F8FC**, os cards usam **#FFFFFF** e o texto principal é **#10233F**. No modo escuro, o fundo é **#0B1220**, os cards **#121D30** e o texto **#F5F7FB**.

Os cards terão cantos de 20 px, bordas discretas e sombra baixa. O progresso para três acertos será uma faixa de três cápsulas numeradas, com preenchimento em azul elétrico e preenchimento verde ao acertar. Alternativas terão área mínima confortável, estados selecionado/correto/incorreto e feedback textual, não apenas cor.

A tipografia prioriza títulos sem serifa fortes, corpo de texto com entrelinha ampla e números grandes para a sequência. Ícones devem ser lineares e familiares, com rótulos quando a ação não for óbvia. Haptics serão usados somente ao responder, acertar três e errar.
