import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useCalories } from "../../caloriesContext";


export default function SelecionarAlimento() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const categoriaId = params.categoriaId;

  const { addItems } = useCalories();

  const alimentos = useMemo(
    () => [
      { id: "1", nome: "Frango grelhado", kcal: 165 },
      { id: "2", nome: "Arroz branco", kcal: 130 },
      { id: "3", nome: "Ovo cozido", kcal: 78 },
      { id: "4", nome: "Batata doce", kcal: 86 },
      { id: "5", nome: "Banana", kcal: 89 },
      { id: "6", nome: "Feijão", kcal: 95 },
    ],
    []
  );

  const [busca, setBusca] = useState("");
  const [selecionados, setSelecionados] = useState([]);

  function toggleSelecionar(id) {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function onAdicionar() {
    const escolhidos = alimentos.filter((a) => selecionados.includes(a.id));
    if (escolhidos.length === 0) return;

    addItems(categoriaId, escolhidos);
    router.back();
  }

  const filtrados = alimentos.filter((a) =>
    a.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Selecionar alimento</Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      {/* Busca */}
      <TextInput
        placeholder="Pesquisar alimento..."
        style={styles.input}
        value={busca}
        onChangeText={setBusca}
      />

      {/* Lista */}
      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 12 }}
        renderItem={({ item }) => {
          const ativo = selecionados.includes(item.id);
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => toggleSelecionar(item.id)}
            >
              <View>
                <Text style={styles.cardTitulo}>{item.nome}</Text>
                <Text style={styles.cardSub}>{item.kcal} kcal</Text>
              </View>

              <View style={[styles.bolinha, ativo && styles.bolinhaAtiva]} />
            </TouchableOpacity>
          );
        }}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.btnCancel} onPress={() => router.back()}>
          <Text style={styles.btnCancelTxt}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btnAdd,
            selecionados.length === 0 && styles.btnAddDisabled,
          ]}
          onPress={onAdicionar}
          disabled={selecionados.length === 0}
        >
          <Text style={styles.btnAddTxt}>ADICIONAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ======= ESTILOS ======= */

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerTitle: { fontSize: 22, fontWeight: "800" },
  cancelText: { color: "#2196F3", fontWeight: "700" },

  input: {
    marginTop: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
  },

  cardTitulo: { fontSize: 18, fontWeight: "700" },
  cardSub: { color: "#666", marginTop: 4 },

  bolinha: {
    width: 26,
    height: 26,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#999",
  },

  bolinhaAtiva: { backgroundColor: "#2196F3", borderColor: "#2196F3" },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },

  btnCancel: {
    flex: 1,
    marginRight: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#e6e6e6",
    alignItems: "center",
  },
  btnCancelTxt: { fontSize: 16 },

  btnAdd: {
    flex: 1,
    marginLeft: 8,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#2196F3",
    alignItems: "center",
  },
  btnAddDisabled: { backgroundColor: "#9ec3f5" },
  btnAddTxt: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
