import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Animated } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useLocalSearchParams, router } from "expo-router";

export default function Diario() {
  const params = useLocalSearchParams();

  const [caloriasTotais] = useState(2000);
  const [consumidas, setConsumidas] = useState(0);

  const restante = caloriasTotais - consumidas;

  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: consumidas / caloriasTotais,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [consumidas]);

  // categorias zeradas
  const [categorias, setCategorias] = useState([
    { id: '1', nome: 'Café da manhã', kcalUsada: 0 },
    { id: '2', nome: 'Almoço', kcalUsada: 0 },
    { id: '3', nome: 'Jantar', kcalUsada: 0 },
    { id: '4', nome: 'Lanches', kcalUsada: 0 },
  ]);

  // RECEBE itens da tela SelecionarAlimento
  useEffect(() => {
    if (params.itens && params.categoriaId) {
      const itens = JSON.parse(params.itens);

      let total = 0;
      itens.forEach((a) => (total += a.kcal));

      setConsumidas((prev) => prev + total);

      setCategorias((prev) =>
        prev.map((cat) =>
          cat.id === params.categoriaId
            ? { ...cat, kcalUsada: cat.kcalUsada + total }
            : cat
        )
      );
    }
  }, [params]);

  const progress = anim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <View style={styles.container}>

      {/* Painel calorias */}
      <View style={styles.painelWrapper}>
        <View style={styles.painel}>
          <Text style={styles.painelNumero}>{restante.toFixed(0)}</Text>
          <Text style={styles.painelTexto}>kcal restantes</Text>
        </View>
      </View>

      <ProgressBar progress={progress} color="#2196F3" style={styles.progressBar} />

      {/* Lista categorias */}
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitulo}>{item.nome}</Text>
              <Text style={styles.cardSub}>{item.kcalUsada.toFixed(0)} kcal</Text>
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
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },

  painelWrapper: { alignItems: 'center', marginTop: 20, marginBottom: 30 },

  painel: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

  painelNumero: { fontSize: 42, fontWeight: 'bold', color: '#fff' },
  painelTexto: { color: '#fff', marginTop: 4 },

  progressBar: { height: 10, borderRadius: 10 },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
  },

  cardTitulo: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardSub: { fontSize: 14, color: '#777' },

  botaoAdd: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },

  botaoAddTexto: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
});
