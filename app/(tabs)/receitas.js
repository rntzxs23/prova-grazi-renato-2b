// app/(tabs)/receitas.js
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function ReceitasTab() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Imagem de Capa */}
      <Image
        source={require("../../assets/lowcarb.jpg")}
        style={styles.heroImage}
      />

      

      <View style={styles.content}>
        <Text style={styles.title}>
          RECEITAS FITS PARA VOCÊ NÃO SAIR DA DIETA
        </Text>

        <Text style={styles.description}>
          A dieta low carb é baseada na redução da ingestão de carboidratos e
          aumento no consumo de proteínas e gorduras saudáveis.
          {"\n\n"}
          Além disso, a dieta low carb pode ajudar a reduzir a pressão arterial
          e melhorar o controle glicêmico.
        </Text>

        {/* 2. CONFIGURE O BOTÃO AZUL AQUI */}
      <TouchableOpacity 
        style={styles.button}
        // O caminho '/listaReceitas' leva para o arquivo index.js dentro da pasta listaReceitas
        onPress={() => router.push('/minhasReceitas')} 
      >
        <Text style={styles.buttonText}>CONFIRA AQUI</Text>
      </TouchableOpacity>

        {/* --- AQUI VOCÊ PODE ACRESCER MAIS COISAS NA PARTE BRANCA --- */}
        <View style={styles.extraSpace}>
          <Text style={{ color: "#ccc", textAlign: "center" }}>
            Espaço reservado para futuras adições...
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  heroImage: { width: "100%", height: 300, resizeMode: "cover" },
  content: { padding: 20 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  overlayTitleContainer: { alignItems: "center", marginVertical: 10 },
  overlayTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    position: "absolute",
    top: -180,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowRadius: 10,
  },
  overlaySubtitle: {
    fontSize: 40,
    fontWeight: "900",
    color: "#fff",
    position: "absolute",
    top: -145,
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowRadius: 10,
  },
  description: {
    fontSize: 14,
    textAlign: "justify",
    lineHeight: 20,
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#0099ff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  extraSpace: { marginTop: 50, height: 200 }, // Espaço vazio extra
});
