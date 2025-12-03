import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Alert } from "react-native";
import { ProgressBar } from "react-native-paper";
import { router } from "expo-router";
import { useCalories } from "../../../caloriesContext";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

// (MANTENHA O COMPONENTE CopoAgua AQUI IGUAL AO ANTERIOR...)
const CopoAgua = ({ status, onPress, isMeta }) => {
  // ... (código do copo igualzinho ao que te mandei antes)
  const alturaAgua = useRef(new Animated.Value(status === 'cheio' ? 100 : 0)).current;
  useEffect(() => {
    if (status === 'cheio') {
      Animated.timing(alturaAgua, { toValue: 100, duration: 1000, useNativeDriver: false }).start();
    }
  }, [status]);
  return (
    <View style={styles.copoContainer}>
      <View style={styles.copoWrapper}>
        <View style={styles.copoFundo}>
          <Animated.View style={[styles.agua, { height: alturaAgua.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }]} />
        </View>
        <MaterialCommunityIcons name="glass-stange" size={50} color="#333" style={styles.copoBorda} />
        {status === 'ativo' && (
          <TouchableOpacity style={styles.btnAdicionar} onPress={onPress}>
            <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
      {isMeta && status === 'cheio' && (
        <View style={styles.checkMeta}><MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" /></View>
      )}
      <Text style={styles.mlTexto}>250ml</Text>
    </View>
  );
};

export default function Diario() {
  const { metaDiaria, consumidas, categorias, pesoAtual, setPesoAtual, metaPeso } = useCalories();
  const restante = Math.max(metaDiaria - consumidas, 0);
  const anim = useRef(new Animated.Value(0)).current;
  const [coposBebeu, setCoposBebeu] = useState(0);

  // Animação Calorias
  useEffect(() => {
    const progresso = consumidas / metaDiaria;
    Animated.timing(anim, { toValue: Math.min(Math.max(progresso, 0), 1), duration: 600, useNativeDriver: false }).start();
  }, [consumidas, metaDiaria]);

  const beberAgua = () => setCoposBebeu(prev => prev + 1);
  const totalCoposParaMostrar = Math.max(8, coposBebeu + 1);
  const coposArray = Array.from({ length: totalCoposParaMostrar });

  // --- FUNÇÕES DE PESO ---
  const alterarPeso = (valor) => {
    const novoPeso = parseFloat((pesoAtual + valor).toFixed(1));
    setPesoAtual(novoPeso);

    // Verifica se atingiu a meta (considerando uma margem pequena de 0.1kg)
    if (metaPeso && Math.abs(novoPeso - metaPeso) < 0.1) {
      Alert.alert("PARABÉNS! 🎉", "Você atingiu sua meta de peso! Continue firme na sua jornada.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      
      {/* PAINEL CALORIAS */}
      <View style={styles.painelWrapper}>
        <View style={styles.painel}>
          <Text style={styles.painelNumero}>{restante.toFixed(0)}</Text>
          <Text style={styles.painelTexto}>kcal restantes</Text>
        </View>
      </View>
      <ProgressBar progress={consumidas / metaDiaria} color="#2196F3" style={styles.progressBar} />


      {/* --- NOVO: CONTROLE DE PESO --- */}
      <View style={styles.pesoContainer}>
        <View style={styles.pesoHeader}>
          <Text style={styles.pesoTitulo}>Controle de Peso</Text>
          {metaPeso && <Text style={styles.metaTexto}>Meta: {metaPeso} kg</Text>}
        </View>
        
        <View style={styles.pesoControles}>
          {/* Botão Menos */}
          <TouchableOpacity style={styles.btnPeso} onPress={() => alterarPeso(-0.1)}>
            <MaterialCommunityIcons name="minus" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Peso Atual no Meio */}
          <View style={styles.pesoDisplay}>
            <Text style={styles.pesoValor}>{pesoAtual.toFixed(1)}</Text>
            <Text style={styles.pesoUnidade}>kg</Text>
          </View>

          {/* Botão Mais */}
          <TouchableOpacity style={styles.btnPeso} onPress={() => alterarPeso(0.1)}>
            <MaterialCommunityIcons name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>


      {/* LISTA DE REFEIÇÕES */}
      <View style={{ marginTop: 20 }}>
        {categorias.map((item) => (
          <View key={item.id} style={styles.card}>
            <View>
              <Text style={styles.cardTitulo}>{item.nome}</Text>
              <Text style={styles.cardSub}>{Math.round(item.kcalUsada)} kcal</Text>
            </View>
            <TouchableOpacity style={styles.botaoAdd} onPress={() => router.push(`/selecionarAlimento?categoriaId=${item.id}`)}>
              <Text style={styles.botaoAddTexto}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* ÁGUA */}
      <View style={styles.aguaSection}>
        <Text style={styles.tituloAgua}>Hidratação ({coposBebeu * 250}ml)</Text>
        <View style={styles.gridCopos}>
          {coposArray.map((_, index) => {
            let status = 'vazio';
            if (index < coposBebeu) status = 'cheio';
            if (index === coposBebeu) status = 'ativo';
            return <CopoAgua key={index} status={status} onPress={beberAgua} isMeta={index === 7} />;
          })}
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  painelWrapper: { alignItems: "center", marginTop: 20, marginBottom: 30 },
  painel: { width: 180, height: 180, borderRadius: 100, backgroundColor: "#2196F3", justifyContent: "center", alignItems: "center", elevation: 8 },
  painelNumero: { fontSize: 42, fontWeight: "bold", color: "#fff" },
  painelTexto: { color: "#fff", marginTop: 4 },
  progressBar: { height: 10, borderRadius: 10, marginTop: 10 },
  
  // --- ESTILOS DO PESO (NOVO) ---
  pesoContainer: { backgroundColor: '#fff', marginTop: 20, padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#eee', elevation: 2 },
  pesoHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  pesoTitulo: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  metaTexto: { fontSize: 16, color: '#4CAF50', fontWeight: 'bold' },
  pesoControles: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20 },
  btnPeso: { backgroundColor: '#2196F3', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', elevation: 3 },
  pesoDisplay: { alignItems: 'center', width: 100 },
  pesoValor: { fontSize: 32, fontWeight: 'bold', color: '#333' },
  pesoUnidade: { fontSize: 14, color: '#777' },

  // (MANTENHA OS OUTROS ESTILOS: card, aguaSection, etc...)
  card: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#f1f1f1", padding: 18, borderRadius: 18, marginBottom: 12 },
  cardTitulo: { fontSize: 18, fontWeight: "bold", color: "#333" },
  cardSub: { fontSize: 14, color: "#777" },
  botaoAdd: { width: 40, height: 40, borderRadius: 50, backgroundColor: "#2196F3", justifyContent: "center", alignItems: "center" },
  botaoAddTexto: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  aguaSection: { marginTop: 30, backgroundColor: '#F0F8FF', padding: 15, borderRadius: 20, marginBottom: 20 },
  tituloAgua: { fontSize: 20, fontWeight: 'bold', color: '#0099ff', marginBottom: 15, textAlign: 'center' },
  gridCopos: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  copoContainer: { width: '22%', alignItems: 'center', marginBottom: 20 },
  copoWrapper: { width: 50, height: 50, justifyContent: 'center', alignItems: 'center' },
  copoFundo: { position: 'absolute', bottom: 5, width: 30, height: 40, backgroundColor: '#ddd', overflow: 'hidden', borderBottomLeftRadius: 5, borderBottomRightRadius: 5 },
  copoBorda: { position: 'absolute' },
  agua: { width: '100%', backgroundColor: '#0099ff', position: 'absolute', bottom: 0 },
  btnAdicionar: { position: 'absolute', backgroundColor: '#0099ff', borderRadius: 15, width: 24, height: 24, justifyContent: 'center', alignItems: 'center', top: -5, right: -5, zIndex: 10 },
  checkMeta: { position: 'absolute', top: 0, right: -5, backgroundColor: '#fff', borderRadius: 10, zIndex: 5 },
  mlTexto: { fontSize: 10, color: '#666', marginTop: 5 }
});