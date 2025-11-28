import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function SelecionarAlimento() {
  const router = useRouter();
  const { categoriaId } = useLocalSearchParams();

  // Barra de pesquisa
  const [pesquisa, setPesquisa] = useState("");

  // Lista de alimentos (exemplo — mantém a sua)
  const alimentos = [
    { id: "1", nome: "Frango grelhado", kcal: 165 },
    { id: "2", nome: "Arroz branco", kcal: 130 },
    { id: "3", nome: "Ovo cozido", kcal: 78 },
    { id: "4", nome: "Batata doce", kcal: 86 },
  ];

  // Seleção múltipla
  const [selecionados, setSelecionados] = useState([]);

  const toggleSelecionar = (id) => {
    if (selecionados.includes(id)) {
      setSelecionados(selecionados.filter((item) => item !== id));
    } else {
      setSelecionados([...selecionados, id]);
    }
  };

  const adicionar = () => {
    const escolhidos = alimentos.filter((a) => selecionados.includes(a.id));

    router.replace({
      pathname: "/",
      params: {
        itens: JSON.stringify(escolhidos),
        categoriaId: categoriaId,
      },
    });
  };

  const filtrados = alimentos.filter((a) =>
    a.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selecionar alimento</Text>

      {/* Barra de pesquisa (mantida do seu layout) */}
      <TextInput
        placeholder="Pesquisar alimento..."
        style={styles.input}
        value={pesquisa}
        onChangeText={setPesquisa}
      />

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
              <TouchableOpacity
    onPress={() => router.back()}
    style={{
      padding: 12,
      backgroundColor: "#ccc",
      borderRadius: 10,
      width: "45%",
      alignItems: "center",
    }}
  ></TouchableOpacity>

              {/* bolinha */}
              <View
                style={[styles.bolinha, ativo && styles.bolinhaAtiva]}
              />
            </TouchableOpacity>
          );
        }}
      />

      {/* Botão ADICIONAR só aparece quando tiver algo selecionado */}
      {selecionados.length > 0 && (
        <TouchableOpacity style={styles.btnAdd} onPress={adicionar}>
          <Text style={styles.btnAddTxt}>ADICIONAR</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },

  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },

  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
  },

  cardTitulo: { fontSize: 18, fontWeight: "bold" },
  cardSub: { color: "#666" },

  bolinha: {
    width: 28,
    height: 28,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#999",
  },

  bolinhaAtiva: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },

  btnAdd: {
    backgroundColor: "#2196F3",
    padding: 16,
    borderRadius: 14,
    marginTop: 10,
  },

  btnAddTxt: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
