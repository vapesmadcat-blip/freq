# Plano de integração de fontes públicas

## ENEM

A documentação oficial da API comunitária indica o endpoint `GET https://api.enem.dev/v1/exams/{year}/questions`, com parâmetros `limit`, `offset` e `language`. A resposta contém `metadata` e `questions`; cada questão possui `context`, `discipline`, `correctAlternative` e `alternatives`, cujas alternativas trazem `letter`, `text` e `isCorrect`.

Fonte: https://docs.enem.dev/api-reference/quest%C3%B5es/listar-quest%C3%B5es

## Concursos

Foi confirmado um endpoint público em `https://apisunsale.azurewebsites.net/api/PublicQuestoes/questoes-pagged?page=1&quantity=1&anexos=false`. O retorno possui `success`, `quantity`, `total` e `object`; a questão usa `campoQuestao`, `materia`, `assunto`, `respostasQuestoes` e `prova`. Cada resposta tem `textoResposta`; o gabarito pode vir no campo `certa` ou em um detalhe adicional, então o adaptador deve aceitar somente itens com alternativa correta identificável e descartar questões ambíguas para não prejudicar o estudante.

Fonte do endpoint: projeto open-source https://github.com/rodrigoborgesmachado/questoesConcursos, que referencia a API em `src/services/apiConfig.js` e a rota pública em `src/pages/ListagemQuestoes/index.js`.

## Decisão de produto

O app deve consultar as duas fontes sob demanda, normalizar os resultados para o tipo `Question`, mostrar a origem (“API ENEM” ou “API Concursos”) e usar o banco local quando houver erro, timeout, resposta vazia ou ausência de gabarito confiável. Nenhuma chave de API deve ser exigida do usuário.
