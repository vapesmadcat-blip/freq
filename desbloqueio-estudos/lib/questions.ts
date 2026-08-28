export type Track = "ENEM" | "Concursos";

export type Question = {
  id: string;
  track: Track;
  subject: string;
  statement: string;
  options: string[];
  answer: number;
  explanation: string;
  source: "api" | "local";
};

const localQuestions: Question[] = [
  {
    id: "local-port-1",
    track: "ENEM",
    subject: "Linguagens",
    statement: "Em um texto argumentativo, a tese corresponde principalmente a:",
    options: ["uma informação acessória", "a ideia central defendida", "o título do texto", "uma citação literal"],
    answer: 1,
    explanation: "A tese é a posição central que o autor procura sustentar ao longo do texto.",
    source: "local",
  },
  {
    id: "local-mat-1",
    track: "ENEM",
    subject: "Matemática",
    statement: "Uma camisa de R$ 80 recebe desconto de 25%. Qual é o novo preço?",
    options: ["R$ 55", "R$ 60", "R$ 65", "R$ 70"],
    answer: 1,
    explanation: "25% de R$ 80 equivale a R$ 20. Portanto, R$ 80 − R$ 20 = R$ 60.",
    source: "local",
  },
  {
    id: "local-hist-1",
    track: "ENEM",
    subject: "Ciências Humanas",
    statement: "A Constituição brasileira de 1988 é conhecida por ampliar a proteção de:",
    options: ["direitos sociais", "monopólios coloniais", "censura prévia", "privilégios hereditários"],
    answer: 0,
    explanation: "A Constituição de 1988 consolidou direitos sociais e garantias fundamentais no período de redemocratização.",
    source: "local",
  },
  {
    id: "local-conc-1",
    track: "Concursos",
    subject: "Português",
    statement: "Assinale a alternativa em que a concordância verbal está adequada:",
    options: ["Houveram muitos pedidos.", "Fazem dois anos que estudo.", "Existem boas oportunidades.", "A gente estudamos cedo."],
    answer: 2,
    explanation: "O verbo existir concorda normalmente com o sujeito plural: existem boas oportunidades.",
    source: "local",
  },
  {
    id: "local-conc-2",
    track: "Concursos",
    subject: "Raciocínio lógico",
    statement: "Se todo servidor é pontual e Ana é servidora, então podemos concluir que:",
    options: ["Ana é pontual", "Ana nunca falta", "todo pontual é servidor", "não há conclusão possível"],
    answer: 0,
    explanation: "Pela regra de inclusão, sendo Ana servidora e todo servidor pontual, Ana é pontual.",
    source: "local",
  },
  {
    id: "local-conc-3",
    track: "Concursos",
    subject: "Direito constitucional",
    statement: "A administração pública deve obedecer, entre outros, ao princípio da:",
    options: ["legalidade", "improvisação", "exclusividade privada", "informalidade absoluta"],
    answer: 0,
    explanation: "Legalidade é um dos princípios expressos que orientam a administração pública.",
    source: "local",
  },
];

function decodeHtml(value: string) {
  return value.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

export async function fetchQuestions(track: Track, subject?: string): Promise<Question[]> {
  if (track === "ENEM") {
    try {
      const response = await fetch("https://api.enem.dev/v1/questions?limit=20");
      if (response.ok) {
        const payload = await response.json();
        const rows = Array.isArray(payload) ? payload : payload.questions ?? payload.data ?? [];
        const remote = rows.map((row: any, index: number) => {
          const options = row.alternatives ?? row.options ?? row.answers ?? [];
          const normalized = options.map((option: any) => decodeHtml(String(option.text ?? option.description ?? option))).filter(Boolean);
          const answerValue = row.correctAnswer ?? row.correct_answer ?? row.answer ?? 0;
          const answer = typeof answerValue === "number" ? answerValue : Math.max(0, "ABCDE".indexOf(String(answerValue).toUpperCase()));
          return {
            id: String(row.id ?? `api-${index}`),
            track: "ENEM" as const,
            subject: String(row.discipline ?? row.subject ?? "ENEM"),
            statement: decodeHtml(String(row.context ?? row.statement ?? row.question ?? "Questão do ENEM")),
            options: normalized.slice(0, 5),
            answer,
            explanation: decodeHtml(String(row.explanation ?? "Resposta obtida da fonte remota.")),
            source: "api" as const,
          };
        }).filter((question: Question) => question.options.length >= 2 && question.statement);
        if (remote.length) return subject ? remote.filter((question: Question) => question.subject.toLowerCase().includes(subject.toLowerCase())) : remote;
      }
    } catch {
      // Fallback silencioso para manter o estudo funcional sem rede.
    }
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
