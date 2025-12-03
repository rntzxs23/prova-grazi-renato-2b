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

  // Função auxiliar para navegar enviando o filtro
  const abrirReceitas = (tipo) => {
    router.push({
      pathname: '/paginax',
      params: { filtro: tipo } // Aqui enviamos 'lowcarb' ou 'massa'
    });
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* =================================== */}
      {/* BLOCO 1: LOW CARB                   */}
      {/* =================================== */}
      <View style={styles.section}>
        <Image
          source={require("../../assets/lowcarb.jpg")}
          style={styles.heroImage}
        />
        <View style={styles.content}>
          <Text style={styles.title}>
            RECEITAS FITS PARA VOCÊ NÃO SAIR DA DIETA
          </Text>
          <Text style={styles.description}>
            A dieta low carb é baseada na redução da ingestão de carboidratos e aumento no consumo de proteínas e gorduras saudáveis. Alguns dos benefícios dessa dieta incluem redução de peso, quando ajustada para déficit calórico, melhora na saúde metabólica e aumento da saciedade.
          </Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => abrirReceitas('lowcarb')} // Envia o filtro 'lowcarb'
          >
            <Text style={styles.buttonText}>CONFIRA AQUI</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Divisória Visual */}
      <View style={styles.separator} />

      {/* =================================== */}
      {/* BLOCO 2: GANHO DE MASSA (Novo)      */}
      {/* =================================== */}
      <View style={styles.section}>
        <Image
          // IMPORTANTE: Coloque uma foto chamada 'massa.jpg' na pasta assets ou use a mesma por enquanto
          source={require("../../assets/massa.png")} 
          style={styles.heroImage}
        />
        <View style={styles.content}>
          <Text style={styles.title}>
            RECEITAS PARA GANHO DE MASSA MUSCULAR
          </Text>
          <Text style={styles.description}>
            Incorporar receitas para ganhar massa muscular ricas em proteínas, carboidratos complexos e gorduras saudáveis é essencial para suportar o crescimento muscular. 
          </Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => abrirReceitas('massa')} // Envia o filtro 'massa'
          >
            <Text style={styles.buttonText}>CONFIRA AQUI</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Espaço final */}
      <View style={styles.extraSpace}>
         <Text style={{ color: "#ccc", textAlign: "center" }}>
           Novas categorias em breve...
         </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  section: { marginBottom: 10, backgroundColor: '#fff', paddingBottom: 10 },
  separator: { height: 10, backgroundColor: '#f0f0f0' }, // Linha cinza separando
  
  heroImage: { width: "100%", height: 250, resizeMode: "cover" },
  content: { padding: 20 },
  
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: '#333'
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
  
  extraSpace: { padding: 20, paddingBottom: 50 }, 
});