export type Track = "ENEM" | "Concursos";

export type Question = {
  id: string;
  track: Track;
  subject: string;
  statement: string;
  options: string[];
  answer: number;
  explanation: string;
  source: "api-enem" | "api-concursos" | "local";
};

const localQuestions: Question[] = [
  { id: "local-port-1", track: "ENEM", subject: "Linguagens", statement: "Em um texto argumentativo, a tese corresponde principalmente a:", options: ["uma informação acessória", "a ideia central defendida", "o título do texto", "uma citação literal"], answer: 1, explanation: "A tese é a posição central que o autor procura sustentar ao longo do texto.", source: "local" },
  { id: "local-mat-1", track: "ENEM", subject: "Matemática", statement: "Uma camisa de R$ 80 recebe desconto de 25%. Qual é o novo preço?", options: ["R$ 55", "R$ 60", "R$ 65", "R$ 70"], answer: 1, explanation: "25% de R$ 80 equivale a R$ 20. Portanto, R$ 80 − R$ 20 = R$ 60.", source: "local" },
  { id: "local-hist-1", track: "ENEM", subject: "Ciências Humanas", statement: "A Constituição brasileira de 1988 é conhecida por ampliar a proteção de:", options: ["direitos sociais", "monopólios coloniais", "censura prévia", "privilégios hereditários"], answer: 0, explanation: "A Constituição de 1988 consolidou direitos sociais e garantias fundamentais no período de redemocratização.", source: "local" },
  { id: "local-conc-1", track: "Concursos", subject: "Português", statement: "Assinale a alternativa em que a concordância verbal está adequada:", options: ["Houveram muitos pedidos.", "Fazem dois anos que estudo.", "Existem boas oportunidades.", "A gente estudamos cedo."], answer: 2, explanation: "O verbo existir concorda normalmente com o sujeito plural: existem boas oportunidades.", source: "local" },
  { id: "local-conc-2", track: "Concursos", subject: "Raciocínio lógico", statement: "Se todo servidor é pontual e Ana é servidora, então podemos concluir que:", options: ["Ana é pontual", "Ana nunca falta", "todo pontual é servidor", "não há conclusão possível"], answer: 0, explanation: "Pela regra de inclusão, sendo Ana servidora e todo servidor pontual, Ana é pontual.", source: "local" },
  { id: "local-conc-3", track: "Concursos", subject: "Direito constitucional", statement: "A administração pública deve obedecer, entre outros, ao princípio da:", options: ["legalidade", "improvisação", "exclusividade privada", "informalidade absoluta"], answer: 0, explanation: "Legalidade é um dos princípios expressos que orientam a administração pública.", source: "local" },
];

function decodeHtml(value: string) {
  return value.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "").replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\\n/g, "\n").trim();
}

async function getJson(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
    if (!response.ok) return undefined;
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeEnem(payload: any, subject?: string): Question[] {
  const rows = Array.isArray(payload?.questions) ? payload.questions : [];
  return rows.map((row: any, index: number) => {
    const alternatives = Array.isArray(row.alternatives) ? row.alternatives : [];
    const options = alternatives.map((item: any) => decodeHtml(String(item.text ?? ""))).filter(Boolean).slice(0, 5);
    const correctLetter = String(row.correctAlternative ?? alternatives.find((item: any) => item.isCorrect)?.letter ?? "A").toUpperCase();
    return { id: `enem-${row.year ?? 2023}-${row.index ?? index}`, track: "ENEM" as const, subject: String(row.discipline ?? "ENEM"), statement: decodeHtml(String([row.title, row.context, row.alternativesIntroduction].filter(Boolean).join("\n\n"))), options, answer: Math.max(0, "ABCDE".indexOf(correctLetter)), explanation: "Gabarito indicado pela API ENEM.", source: "api-enem" as const };
  }).filter((question: Question) => question.options.length >= 2 && question.statement && (!subject || question.subject.toLowerCase().includes(subject.toLowerCase())));
}

function normalizeConcursos(payload: any): Question[] {
  const rows = Array.isArray(payload?.object) ? payload.object : payload?.object ? [payload.object] : [];
  return rows.map((row: any, index: number) => {
    const answers = Array.isArray(row.respostasQuestoes) ? row.respostasQuestoes : [];
    const options = answers.map((item: any) => decodeHtml(String(item.textoResposta ?? ""))).filter(Boolean).slice(0, 5);
    const answerIndex = answers.findIndex((item: any) => [true, 1, "1", "true", "sim", "sim,", "certo", "certa", "x"].includes(typeof item.certa === "string" ? item.certa.trim().toLowerCase() : item.certa));
    return { id: `concursos-${row.Id ?? index}`, track: "Concursos" as const, subject: String(row.materia ?? row.assunto ?? "Concursos"), statement: decodeHtml(String(row.campoQuestao ?? "")), options, answer: answerIndex, explanation: "Gabarito indicado pela fonte pública de concursos.", source: "api-concursos" as const };
  }).filter((question: Question) => question.options.length >= 2 && question.statement && question.answer >= 0);
}

export async function fetchQuestions(track: Track, subject?: string): Promise<Question[]> {
  try {
    if (track === "ENEM") {
      const payload = await getJson("https://api.enem.dev/v1/exams/2023/questions?limit=20&offset=0");
      const remote = normalizeEnem(payload, subject);
      if (remote.length) return remote;
    } else {
      const payload = await getJson("https://apisunsale.azurewebsites.net/api/PublicQuestoes/questoes-pagged?page=1&quantity=20&anexos=false");
      const remote = normalizeConcursos(payload).filter((question) => !subject || question.subject.toLowerCase().includes(subject.toLowerCase()));
      if (remote.length) return remote;
    }
  } catch {
    // A queda da rede não interrompe o estudo: o banco local é usado abaixo.
  }
  return localQuestions.filter((question) => question.track === track && (!subject || question.subject === subject));
}

export function getSubjects(track: Track) {
  return Array.from(new Set(localQuestions.filter((question) => question.track === track).map((question) => question.subject)));
}

export function nextQuestion(questions: Question[], usedIds: string[]) {
  return questions.find((question) => !usedIds.includes(question.id)) ?? questions[0];
}

export function updateStreak(streak: number, isCorrect: boolean) {
  return isCorrect ? Math.min(3, streak + 1) : 0;
}
