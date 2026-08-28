import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Animated, Easing, FlatList, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenContainer } from "@/components/screen-container";
import { fetchQuestions, getSubjects, nextQuestion, type Question, type Track, updateStreak } from "@/lib/questions";
import { haptic } from "@/lib/haptics";
import { useColors } from "@/hooks/use-colors";

const TRACKS: Track[] = ["ENEM", "Concursos"];

export default function HomeScreen() {
  const colors = useColors();
  const [track, setTrack] = useState<Track>("ENEM");
  const [subject, setSubject] = useState<string>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState<Question>();
  const [selected, setSelected] = useState<number>();
  const [streak, setStreak] = useState(0);
  const [answered, setAnswered] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"home" | "quiz" | "result">("home");
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const feedbackOpacity = useRef(new Animated.Value(0)).current;
  const feedbackLift = useRef(new Animated.Value(12)).current;
  const feedbackScale = useRef(new Animated.Value(0.94)).current;
  const feedbackShake = useRef(new Animated.Value(0)).current;

  const subjects = useMemo(() => getSubjects(track), [track]);

  useEffect(() => {
    if (!subject || !subjects.includes(subject)) setSubject(subjects[0]);
  }, [subjects, subject]);

  async function startChallenge() {
    setLoading(true);
    const loaded = await fetchQuestions(track, subject);
    setQuestions(loaded);
    setQuestion(nextQuestion(loaded, []));
    setSelected(undefined);
    setAnswered(undefined);
    setStreak(0);
    setSessionCorrect(0);
    setMode("quiz");
    setLoading(false);
  }

  function animateFeedback(correct: boolean) {
    feedbackOpacity.setValue(0);
    feedbackLift.setValue(12);
    feedbackScale.setValue(0.94);
    feedbackShake.setValue(0);
    const entrance = Animated.parallel([
      Animated.timing(feedbackOpacity, { toValue: 1, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
      Animated.timing(feedbackLift, { toValue: 0, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
      Animated.timing(feedbackScale, { toValue: 1, duration: 280, easing: Easing.out(Easing.back(1.15)), useNativeDriver: false }),
    ]);
    if (correct) {
      Animated.sequence([entrance, Animated.sequence([
        Animated.timing(feedbackScale, { toValue: 1.04, duration: 100, useNativeDriver: false }),
        Animated.timing(feedbackScale, { toValue: 1, duration: 140, useNativeDriver: false }),
      ])]).start();
    } else {
      Animated.sequence([entrance, Animated.sequence([
        Animated.timing(feedbackShake, { toValue: -5, duration: 55, useNativeDriver: false }),
        Animated.timing(feedbackShake, { toValue: 5, duration: 55, useNativeDriver: false }),
        Animated.timing(feedbackShake, { toValue: -3, duration: 45, useNativeDriver: false }),
        Animated.timing(feedbackShake, { toValue: 0, duration: 45, useNativeDriver: false }),
      ])]).start();
    }
  }

  async function answerQuestion() {
    if (selected === undefined || !question || answered !== undefined) return;
    const correct = selected === question.answer;
    const nextStreak = updateStreak(streak, correct);
    setAnswered(correct);
    setStreak(nextStreak);
    animateFeedback(correct);
    setSessionCorrect((current) => current + (correct ? 1 : 0));
    correct ? haptic.success() : haptic.error();
    if (nextStreak === 3) {
      await AsyncStorage.setItem("lastUnlock", new Date().toISOString());
      const previous = await AsyncStorage.getItem("studyHistory");
      const history = previous ? JSON.parse(previous) : [];
      history.unshift({ id: String(Date.now()), title: `${track} · ${subject}`, date: new Date().toLocaleDateString("pt-BR"), score: `${sessionCorrect + (correct ? 1 : 0)} acertos` });
      await AsyncStorage.setItem("studyHistory", JSON.stringify(history.slice(0, 20)));
      setTimeout(() => setMode("result"), 850);
    }
  }

  function next() {
    if (!question) return;
    const used = [question.id];
    setQuestion(nextQuestion(questions, used));
    setSelected(undefined);
    setAnswered(undefined);
    feedbackOpacity.setValue(0);
    feedbackLift.setValue(12);
    feedbackScale.setValue(0.94);
    feedbackShake.setValue(0);
  }

  const trackLabel = track === "ENEM" ? "Preparação ENEM" : "Reta final dos concursos";

  if (mode === "quiz" && question) {
    return (
      <ScreenContainer className="px-5 pt-5" edges={["top", "left", "right", "bottom"]}>
        <View style={styles.quizHeader}>
          <Pressable onPress={() => setMode("home")} style={({ pressed }) => [styles.back, pressed && styles.pressed]}><Text style={[styles.backText, { color: colors.primary }]}>‹  Sair</Text></Pressable>
          <Text style={[styles.quizMeta, { color: colors.muted }]}>{question.subject} · {question.source === "api-enem" ? "API ENEM" : question.source === "api-concursos" ? "API Concursos" : "Banco local"}</Text>
        </View>
        <View style={styles.streakRow}>
          {[0, 1, 2].map((item) => <View key={item} style={[styles.streakDot, { backgroundColor: item < streak ? colors.success : colors.border }]}><Text style={[styles.streakNumber, { color: item < streak ? colors.background : colors.muted }]}>{item + 1}</Text></View>)}
          <Text style={[styles.streakLabel, { color: colors.muted }]}>{streak}/3 acertos para desbloquear</Text>
        </View>
        <View style={styles.questionArea}>
          <Text style={[styles.kicker, { color: colors.primary }]}>QUESTÃO {sessionCorrect + 1}</Text>
          <Text style={[styles.statement, { color: colors.foreground }]}>{question.statement}</Text>
          <FlatList data={question.options} keyExtractor={(_, index) => String(index)} contentContainerStyle={styles.options} renderItem={({ item, index }) => {
            const isSelected = selected === index;
            const isCorrect = answered !== undefined && index === question.answer;
            const isWrong = answered === false && isSelected;
            return <Pressable onPress={() => { if (answered === undefined) { setSelected(index); haptic.light(); } }} style={({ pressed }) => [styles.option, { borderColor: isCorrect ? colors.success : isWrong ? colors.error : isSelected ? colors.primary : colors.border, backgroundColor: isCorrect ? colors.success + "22" : isWrong ? colors.error + "18" : isSelected ? colors.primary + "12" : colors.surface }, pressed && answered === undefined && styles.pressed]}>
              <View style={[styles.optionBadge, { backgroundColor: isCorrect ? colors.success : isWrong ? colors.error : isSelected ? colors.primary : colors.border }]}><Text style={[styles.optionLetter, { color: isCorrect || isWrong || isSelected ? colors.background : colors.muted }]}>{String.fromCharCode(65 + index)}</Text></View>
              <Text style={[styles.optionText, { color: colors.foreground }]}>{item}</Text>
            </Pressable>;
          }} />
          {answered !== undefined && <Animated.View style={[styles.feedback, { backgroundColor: answered ? colors.success + "18" : colors.error + "15", opacity: feedbackOpacity, transform: [{ translateY: feedbackLift }, { translateX: feedbackShake }] }]}><Animated.View style={[styles.feedbackIcon, { backgroundColor: answered ? colors.success : colors.error, transform: [{ scale: feedbackScale }] }]}><Text style={styles.feedbackIconText}>{answered ? "✓" : "!"}</Text></Animated.View><View style={styles.feedbackCopy}><Text style={[styles.feedbackTitle, { color: answered ? colors.success : colors.error }]}>{answered ? (streak === 3 ? "Desbloqueio conquistado!" : "Mandou bem!") : "Quase lá — siga estudando"}</Text><Text style={[styles.feedbackText, { color: colors.foreground }]}>{question.explanation}</Text></View></Animated.View>}
        </View>
        <Pressable onPress={answered === undefined ? answerQuestion : next} style={({ pressed }) => [styles.primaryButton, { backgroundColor: colors.primary }, pressed && styles.pressed]}><Text style={styles.primaryButtonText}>{answered === undefined ? "Responder" : streak === 3 ? "Ver resultado" : "Próxima questão"}</Text></Pressable>
      </ScreenContainer>
    );
  }

  if (mode === "result") {
    return <ScreenContainer className="px-5 pt-10" edges={["top", "left", "right", "bottom"]}><View style={styles.resultWrap}><Text style={[styles.resultEmoji, { color: colors.success }]}>✓</Text><Text style={[styles.resultTitle, { color: colors.foreground }]}>Desbloqueio conquistado</Text><Text style={[styles.resultSubtitle, { color: colors.muted }]}>Você acertou três questões e liberou o próximo passo da sua sessão.</Text><View style={[styles.resultCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={[styles.resultBig, { color: colors.primary }]}>{sessionCorrect}</Text><Text style={[styles.resultLabel, { color: colors.muted }]}>acertos na sessão</Text><View style={styles.resultLine}><Text style={[styles.resultLabel, { color: colors.muted }]}>Trilha</Text><Text style={[styles.resultValue, { color: colors.foreground }]}>{track}</Text></View><View style={styles.resultLine}><Text style={[styles.resultLabel, { color: colors.muted }]}>Matéria</Text><Text style={[styles.resultValue, { color: colors.foreground }]}>{subject}</Text></View></View><Pressable onPress={startChallenge} style={({ pressed }) => [styles.primaryButton, { backgroundColor: colors.primary }, pressed && styles.pressed]}><Text style={styles.primaryButtonText}>Novo desafio</Text></Pressable><Pressable onPress={() => setMode("home")} style={styles.secondaryButton}><Text style={[styles.secondaryText, { color: colors.primary }]}>Voltar ao início</Text></Pressable></View></ScreenContainer>;
  }

  return <ScreenContainer className="px-5 pt-5" edges={["top", "left", "right"]}><FlatList data={subjects} keyExtractor={(item) => item} ListHeaderComponent={<View><View style={styles.topLine}><View><Text style={[styles.eyebrow, { color: colors.primary }]}>DESBLOQUEIO ESTUDOS</Text><Text style={[styles.title, { color: colors.foreground }]}>Seu foco de hoje.</Text></View><View style={[styles.avatar, { backgroundColor: colors.primary }]}><Text style={styles.avatarText}>D</Text></View></View><View style={[styles.heroCard, { backgroundColor: colors.primary }]}><View style={styles.heroCopy}><Text style={styles.heroEyebrow}>DESAFIO RÁPIDO</Text><Text style={styles.heroTitle}>{trackLabel}</Text><Text style={styles.heroBody}>Acerte 3 perguntas e mantenha seu ritmo.</Text></View><Text style={styles.heroMark}>3×</Text></View><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Escolha sua trilha</Text><View style={styles.trackRow}>{TRACKS.map((item) => <Pressable key={item} onPress={() => setTrack(item)} style={[styles.trackPill, { backgroundColor: track === item ? colors.foreground : colors.surface, borderColor: colors.border }]}><Text style={[styles.trackText, { color: track === item ? colors.background : colors.muted }]}>{item}</Text></Pressable>)}</View><Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 26 }]}>Matéria</Text></View>} renderItem={({ item }) => <Pressable onPress={() => setSubject(item)} style={[styles.subjectCard, { backgroundColor: subject === item ? colors.primary + "12" : colors.surface, borderColor: subject === item ? colors.primary : colors.border }]}><View style={[styles.subjectIcon, { backgroundColor: subject === item ? colors.primary : colors.border }]}><Text style={{ color: subject === item ? colors.background : colors.muted, fontWeight: "800" }}>✓</Text></View><Text style={[styles.subjectText, { color: colors.foreground }]}>{item}</Text><Text style={[styles.chevron, { color: colors.muted }]}>›</Text></Pressable>} ListFooterComponent={<View><Pressable onPress={startChallenge} disabled={loading || !subject} style={({ pressed }) => [styles.primaryButton, { backgroundColor: colors.primary, marginTop: 24 }, pressed && styles.pressed, (!subject || loading) && styles.disabled]}>{loading ? <ActivityIndicator color={colors.background} /> : <Text style={styles.primaryButtonText}>Começar desafio</Text>}</Pressable><Text style={[styles.footerNote, { color: colors.muted }]}>Cada desafio consulta primeiro a API pública da sua trilha. Se a rede falhar, o banco local mantém seu estudo ativo.</Text></View>} showsVerticalScrollIndicator={false} /> </ScreenContainer>;
}

const styles = StyleSheet.create({
  topLine: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  eyebrow: { fontSize: 12, fontWeight: "800", letterSpacing: 1.5 }, title: { fontSize: 32, fontWeight: "800", marginTop: 6, letterSpacing: -0.8 }, avatar: { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center" }, avatarText: { color: "#fff", fontSize: 18, fontWeight: "800" }, heroCard: { borderRadius: 24, padding: 22, flexDirection: "row", justifyContent: "space-between", overflow: "hidden", marginBottom: 28 }, heroCopy: { flex: 1 }, heroEyebrow: { color: "#B8E986", fontSize: 11, fontWeight: "800", letterSpacing: 1.2 }, heroTitle: { color: "#fff", fontSize: 22, fontWeight: "800", marginTop: 9 }, heroBody: { color: "#DCE8FA", fontSize: 14, lineHeight: 20, marginTop: 7, maxWidth: 240 }, heroMark: { color: "#B8E986", fontSize: 52, fontWeight: "900", alignSelf: "center" }, sectionTitle: { fontSize: 18, fontWeight: "800", marginBottom: 13 }, trackRow: { flexDirection: "row", gap: 10 }, trackPill: { borderRadius: 14, paddingHorizontal: 17, paddingVertical: 11, borderWidth: 1 }, trackText: { fontSize: 14, fontWeight: "700" }, subjectCard: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 17, padding: 15, marginBottom: 10 }, subjectIcon: { width: 34, height: 34, borderRadius: 11, alignItems: "center", justifyContent: "center", marginRight: 12 }, subjectText: { fontSize: 15, fontWeight: "700", flex: 1 }, chevron: { fontSize: 25 }, primaryButton: { height: 56, borderRadius: 17, alignItems: "center", justifyContent: "center", marginTop: 18 }, primaryButtonText: { color: "#fff", fontSize: 16, fontWeight: "800" }, footerNote: { textAlign: "center", fontSize: 12, lineHeight: 18, marginTop: 14, marginBottom: 30 }, pressed: { opacity: 0.82, transform: [{ scale: 0.985 }] }, disabled: { opacity: 0.5 }, quizHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }, back: { paddingVertical: 6, paddingRight: 10 }, backText: { fontWeight: "800", fontSize: 15 }, quizMeta: { fontSize: 12, fontWeight: "700" }, streakRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 34 }, streakDot: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" }, streakNumber: { fontWeight: "800" }, streakLabel: { fontSize: 12, fontWeight: "700", marginLeft: 4 }, questionArea: { flex: 1 }, kicker: { fontSize: 12, fontWeight: "800", letterSpacing: 1 }, statement: { fontSize: 25, lineHeight: 33, fontWeight: "800", marginTop: 12, letterSpacing: -0.3 }, options: { gap: 10, paddingTop: 24, paddingBottom: 12 }, option: { minHeight: 60, borderWidth: 1.5, borderRadius: 16, flexDirection: "row", alignItems: "center", padding: 12 }, optionBadge: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", marginRight: 11 }, optionLetter: { fontWeight: "800" }, optionText: { flex: 1, fontSize: 15, lineHeight: 21, fontWeight: "600" }, feedback: { borderRadius: 16, padding: 14, marginTop: 2, flexDirection: "row", alignItems: "flex-start" }, feedbackIcon: { width: 30, height: 30, borderRadius: 15, alignItems: "center", justifyContent: "center", marginRight: 10 }, feedbackIconText: { color: "#fff", fontSize: 18, fontWeight: "900" }, feedbackCopy: { flex: 1 }, feedbackTitle: { fontSize: 15, fontWeight: "800", marginBottom: 5 }, feedbackText: { fontSize: 13, lineHeight: 19 }, resultWrap: { flex: 1, alignItems: "center", justifyContent: "center" }, resultEmoji: { fontSize: 58, fontWeight: "900" }, resultTitle: { textAlign: "center", fontSize: 30, fontWeight: "900", marginTop: 12 }, resultSubtitle: { textAlign: "center", fontSize: 15, lineHeight: 22, marginTop: 10, maxWidth: 320 }, resultCard: { width: "100%", borderWidth: 1, borderRadius: 20, padding: 20, marginTop: 26, marginBottom: 10 }, resultBig: { fontSize: 42, fontWeight: "900" }, resultLabel: { fontSize: 13, fontWeight: "600" }, resultLine: { flexDirection: "row", justifyContent: "space-between", marginTop: 17 }, resultValue: { fontSize: 14, fontWeight: "800" }, secondaryButton: { padding: 16 }, secondaryText: { fontWeight: "800", fontSize: 15 },
});
