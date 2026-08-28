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

O workflow `.github/workflows/build-desbloqueio-estudos.yml` prepara o projeto Expo, gera o Android nativo e publica o APK release como artefato. Para iniciar manualmente, abra a aba **Actions**, selecione **Build Desbloqueio Estudos APK** e clique em **Run workflow**. Para criar uma Release automaticamente, envie uma tag no formato `desbloqueio-v1.0.0`; o APK será anexado à Release. O app está configurado em portrait, com identidade visual própria e assets de launcher em `assets/images/`.

No ambiente Manus, o botão **Publish** também pode iniciar a geração do APK a partir do checkpoint do projeto.

## Estrutura

As telas principais ficam em `app/(tabs)/`: Início, Histórico e Ajustes. A regra de sequência e a normalização das questões ficam em `lib/questions.ts`; os testes automatizados estão em `tests/questions.test.ts`.
