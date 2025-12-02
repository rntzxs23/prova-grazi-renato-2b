import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Animated } from "react-native";
import { ProgressBar } from "react-native-paper";
import { router } from "expo-router";
import { useCalories } from "../../caloriesContext";




export default function Diario() {
  const { metaDiaria, consumidas, categorias } = useCalories();

  const restante = Math.max(metaDiaria - consumidas, 0);

  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const progresso = consumidas / metaDiaria;

    Animated.timing(anim, {
      toValue: Math.min(Math.max(progresso, 0), 1),
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [consumidas, metaDiaria]);

  return (
    <View style={styles.container}>
      {/* Painel */}
      <View style={styles.painelWrapper}>
        <View style={styles.painel}>
          <Text style={styles.painelNumero}>{restante.toFixed(0)}</Text>
          <Text style={styles.painelTexto}>kcal restantes</Text>
        </View>
      </View>

      {/* Barra de progresso */}
      <ProgressBar progress={anim} color="#2196F3" style={styles.progressBar} />

      {/* Categorias */}
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitulo}>{item.nome}</Text>
              <Text style={styles.cardSub}>{Math.round(item.kcalUsada)} kcal</Text>
            </View>

            <TouchableOpacity
              style={styles.botaoAdd}
              onPress={() => {
                router.push(`/selecionarAlimento?categoriaId=${item.id}`);
              }}
            >
              <Text style={styles.botaoAddTexto}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },

  painelWrapper: { alignItems: "center", marginTop: 20, marginBottom: 30 },

  painel: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },

  painelNumero: { fontSize: 42, fontWeight: "bold", color: "#fff" },
  painelTexto: { color: "#fff", marginTop: 4 },

  progressBar: { height: 10, borderRadius: 10, marginTop: 10 },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
  },

  cardTitulo: { fontSize: 18, fontWeight: "bold", color: "#333" },
  cardSub: { fontSize: 14, color: "#777" },

  botaoAdd: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },

  botaoAddTexto: { color: "#fff", fontSize: 22, fontWeight: "bold" },
});
