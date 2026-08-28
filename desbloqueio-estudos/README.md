# Desbloqueio Estudos

Aplicativo Expo/React Native para estudo de ENEM e concursos. A experiência oferece trilhas por matéria, desafios de uma questão por vez e uma sequência de três acertos para concluir o desbloqueio da sessão.

## Executar localmente

```bash
pnpm install
pnpm dev
```

O projeto usa Expo SDK 54, TypeScript, Expo Router e NativeWind. O banco local mantém questões em português para estudo sem conexão; para a trilha ENEM, o app tenta consultar a API pública [enem.dev](https://enem.dev/) antes de usar o fallback local.

## Validar

```bash
pnpm check
pnpm test
```

## Gerar o APK

No ambiente Manus, use o botão **Publish** do painel WebDev para iniciar a geração do APK. O app está configurado em portrait, com identidade visual própria e assets de launcher em `assets/images/`.

## Estrutura

As telas principais ficam em `app/(tabs)/`: Início, Histórico e Ajustes. A regra de sequência e a normalização das questões ficam em `lib/questions.ts`; os testes automatizados estão em `tests/questions.test.ts`.
