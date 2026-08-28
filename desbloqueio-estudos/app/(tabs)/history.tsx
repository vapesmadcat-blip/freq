import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

type HistoryItem = { id: string; title: string; date: string; score: string };

export default function HistoryScreen() {
  const colors = useColors();
  const [items, setItems] = useState<HistoryItem[]>([]);
  useEffect(() => { AsyncStorage.getItem("studyHistory").then((value) => setItems(value ? JSON.parse(value) : [])); }, []);
  return <ScreenContainer className="px-5 pt-5"><Text style={[styles.eyebrow, { color: colors.primary }]}>SEU RITMO</Text><Text style={[styles.title, { color: colors.foreground }]}>Histórico</Text><Text style={[styles.subtitle, { color: colors.muted }]}>Suas sessões ficam salvas neste dispositivo.</Text><FlatList data={items} keyExtractor={(item) => item.id} contentContainerStyle={styles.list} ListEmptyComponent={<View style={[styles.empty, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Nenhuma sessão ainda</Text><Text style={[styles.emptyText, { color: colors.muted }]}>Complete um desafio para ver sua evolução por aqui.</Text></View>} renderItem={({ item }) => <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}><View><Text style={[styles.cardTitle, { color: colors.foreground }]}>{item.title}</Text><Text style={[styles.cardDate, { color: colors.muted }]}>{item.date}</Text></View><Text style={[styles.score, { color: colors.success }]}>{item.score}</Text></View>} /></ScreenContainer>;
}
const styles = StyleSheet.create({ eyebrow: { fontSize: 12, fontWeight: "800", letterSpacing: 1.5 }, title: { fontSize: 32, fontWeight: "800", marginTop: 6 }, subtitle: { fontSize: 15, marginTop: 9, lineHeight: 21 }, list: { paddingTop: 26, paddingBottom: 30, gap: 10 }, card: { padding: 17, borderRadius: 17, borderWidth: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, cardTitle: { fontSize: 15, fontWeight: "800" }, cardDate: { fontSize: 12, marginTop: 5 }, score: { fontSize: 18, fontWeight: "900" }, empty: { padding: 24, borderRadius: 20, borderWidth: 1, marginTop: 12 }, emptyTitle: { fontSize: 17, fontWeight: "800" }, emptyText: { fontSize: 14, lineHeight: 21, marginTop: 7 },
});
