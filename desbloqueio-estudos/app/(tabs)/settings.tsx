import { useColorScheme } from "react-native";
import { StyleSheet, Switch, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useColors } from "@/hooks/use-colors";

export default function SettingsScreen() {
  const colors = useColors();
  const scheme = useColorScheme();
  return <ScreenContainer className="px-5 pt-5"><Text style={[styles.eyebrow, { color: colors.primary }]}>PREFERÊNCIAS</Text><Text style={[styles.title, { color: colors.foreground }]}>Configurações</Text><View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}><View style={styles.row}><View style={styles.copy}><Text style={[styles.cardTitle, { color: colors.foreground }]}>Aparência do sistema</Text><Text style={[styles.cardText, { color: colors.muted }]}>O app acompanha o tema do dispositivo.</Text></View><Switch value={scheme === "dark"} disabled trackColor={{ false: colors.border, true: colors.primary }} /></View></View><View style={[styles.info, { backgroundColor: colors.primary + "12" }]}><Text style={[styles.infoTitle, { color: colors.primary }]}>Sobre as questões</Text><Text style={[styles.infoText, { color: colors.foreground }]}>As questões do ENEM tentam ser carregadas da API pública enem.dev. Quando não há conexão ou a API não retorna dados compatíveis, o desafio usa um banco local para você não perder o ritmo.</Text></View></ScreenContainer>;
}
const styles = StyleSheet.create({ eyebrow: { fontSize: 12, fontWeight: "800", letterSpacing: 1.5 }, title: { fontSize: 32, fontWeight: "800", marginTop: 6, marginBottom: 26 }, card: { borderWidth: 1, borderRadius: 19, padding: 17 }, row: { flexDirection: "row", alignItems: "center" }, copy: { flex: 1, paddingRight: 12 }, cardTitle: { fontSize: 15, fontWeight: "800" }, cardText: { fontSize: 13, lineHeight: 19, marginTop: 5 }, info: { borderRadius: 19, padding: 18, marginTop: 16 }, infoTitle: { fontSize: 15, fontWeight: "800" }, infoText: { fontSize: 13, lineHeight: 20, marginTop: 7 },
});
