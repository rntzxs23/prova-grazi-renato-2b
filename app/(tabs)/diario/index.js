import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView, Alert } from "react-native";
import { ProgressBar } from "react-native-paper";
import { router } from "expo-router";
import { useCalories } from "../../../caloriesContext"; // Verifique se o caminho dos pontos está certo pra você
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';

// Componente para animar o círculo do SVG
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// --- NOVO COMPONENTE: CARD DA CATEGORIA ---
const CategoriaCard = ({ item, onPressAdd }) => {
  // Configuração do Círculo Pequeno
  const size = 50; 
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Calcula progresso (0 a 1)
    const progress = item.meta > 0 ? item.kcalUsada / item.meta : 0;
    Animated.timing(anim, {
      toValue: Math.min(Math.max(progress, 0), 1),
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [item.kcalUsada, item.meta]);

  const strokeDashoffset = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0]
  });

  return (
    <View style={styles.catCard}>
      {/* Lado Esquerdo: Ícone com Círculo Animado */}
      <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
        <Svg width={size} height={size}>
          {/* Fundo Cinza */}
          <Circle cx={size/2} cy={size/2} r={radius} stroke="#f0f0f0" strokeWidth={strokeWidth} fill="transparent" />
          {/* Progresso Azul */}
          <AnimatedCircle
            cx={size/2} cy={size/2} r={radius}
            stroke="#2196F3" strokeWidth={strokeWidth} fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size/2}, ${size/2}`}
          />
        </Svg>
        {/* Ícone no Centro */}
        <View style={{ position: 'absolute' }}>
           <MaterialCommunityIcons name={item.icon} size={24} color="#555" />
        </View>
      </View>

      {/* Meio: Textos */}
      <View style={styles.catInfo}>
        <Text style={styles.catTitle}>{item.nome}</Text>
        <Text style={styles.catMeta}>
          {Math.round(item.kcalUsada)} / {item.meta} kcal
        </Text>
      </View>

      {/* Direita: Botão Adicionar */}
      <TouchableOpacity style={styles.btnAdd} onPress={onPressAdd}>
        <MaterialCommunityIcons name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};
// ------------------------------------------

// (MANTENHA O COMPONENTE COPO DE ÁGUA - Igual)
const CopoAgua = ({ status, onPress, isMeta }) => {
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
      {isMeta && status === 'cheio' && <View style={styles.checkMeta}><MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" /></View>}
      <Text style={styles.mlTexto}>250ml</Text>
    </View>
  );
};

export default function Diario() {
  const { 
    metaDiaria, consumidas, gastas, categorias, pesoAtual, setPesoAtual, metaPeso,
    macrosConsumidos, metaCarbos, metaProteinas, metaGorduras 
  } = useCalories();

  const restante = Math.max(metaDiaria - consumidas, 0);
  const [coposBebeu, setCoposBebeu] = useState(0);
  
  // Animação Painel Principal
  const anim = useRef(new Animated.Value(0)).current;
  const radius = 50; 
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const progresso = metaDiaria > 0 ? consumidas / metaDiaria : 0;
    Animated.timing(anim, {
      toValue: Math.min(Math.max(progresso, 0), 1),
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [consumidas, metaDiaria]);

  const strokeDashoffset = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0]
  });

  const beberAgua = () => setCoposBebeu(prev => prev + 1);
  const totalCoposParaMostrar = Math.max(8, coposBebeu + 1);
  const coposArray = Array.from({ length: totalCoposParaMostrar });

  const alterarPeso = (valor) => {
    const novoPeso = parseFloat((pesoAtual + valor).toFixed(1));
    setPesoAtual(novoPeso);
    if (metaPeso && Math.abs(novoPeso - metaPeso) < 0.1) Alert.alert("PARABÉNS! 🎉", "Meta atingida!");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      
      {/* PAINEL PRINCIPAL */}
      <View style={styles.novoPainel}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValor}>{consumidas.toFixed(0)}</Text>
            <Text style={styles.statLabel}>Consumidas</Text>
          </View>
          <View style={styles.circleWrapper}>
            <Svg height="120" width="120" viewBox="0 0 120 120">
              <Circle cx="60" cy="60" r={radius} stroke="#f0f0f0" strokeWidth="10" fill="transparent" />
              <AnimatedCircle
                cx="60" cy="60" r={radius} stroke="#4DB6AC" strokeWidth="10" fill="transparent"
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                strokeLinecap="round" rotation="-90" origin="60, 60"
              />
            </Svg>
            <View style={styles.circleTextContainer}>
              <Text style={styles.circleNumber}>{restante.toFixed(0)}</Text>
              <Text style={styles.circleLabel}>Restantes</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValor}>{gastas}</Text>
            <Text style={styles.statLabel}>Gastas</Text>
          </View>
        </View>

        <View style={styles.macrosContainer}>
          <View style={styles.macroItem}>
            <Text style={styles.macroLabel}>Carboidratos</Text>
            <ProgressBar progress={macrosConsumidos.carbos / metaCarbos} color="#4FC3F7" style={styles.macroBar} />
            <Text style={styles.macroValue}>{macrosConsumidos.carbos.toFixed(0)} / {metaCarbos} g</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroLabel}>Proteína</Text>
            <ProgressBar progress={macrosConsumidos.proteinas / metaProteinas} color="#4DB6AC" style={styles.macroBar} />
            <Text style={styles.macroValue}>{macrosConsumidos.proteinas.toFixed(0)} / {metaProteinas} g</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroLabel}>Gordura</Text>
            <ProgressBar progress={macrosConsumidos.gorduras / metaGorduras} color="#FFB74D" style={styles.macroBar} />
            <Text style={styles.macroValue}>{macrosConsumidos.gorduras.toFixed(0)} / {metaGorduras} g</Text>
          </View>
        </View>
      </View>

      {/* CONTROLE DE PESO */}
      <View style={styles.pesoContainer}>
        <View style={styles.pesoHeader}>
          <Text style={styles.pesoTitulo}>Controle de Peso</Text>
          {metaPeso && <Text style={styles.metaTexto}>Meta: {metaPeso} kg</Text>}
        </View>
        <View style={styles.pesoControles}>
          <TouchableOpacity style={styles.btnPeso} onPress={() => alterarPeso(-0.1)}><MaterialCommunityIcons name="minus" size={24} color="#fff" /></TouchableOpacity>
          <View style={styles.pesoDisplay}><Text style={styles.pesoValor}>{pesoAtual.toFixed(1)}</Text><Text style={styles.pesoUnidade}>kg</Text></View>
          <TouchableOpacity style={styles.btnPeso} onPress={() => alterarPeso(0.1)}><MaterialCommunityIcons name="plus" size={24} color="#fff" /></TouchableOpacity>
        </View>
      </View>

      {/* --- LISTA DE REFEIÇÕES (NOVO VISUAL) --- */}
      <View style={{ marginTop: 20 }}>
        {categorias.map((item) => (
          <CategoriaCard 
            key={item.id} 
            item={item} 
            onPressAdd={() => router.push(`/selecionarAlimento?categoriaId=${item.id}`)}
          />
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
  container: { flex: 1, backgroundColor: "#f8f9fa", padding: 20 },

  // --- ESTILOS DO CARD DA CATEGORIA (NOVO) ---
  catCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2, // Sombra Android
    shadowColor: '#000', // Sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  catInfo: {
    flex: 1, // Ocupa o espaço do meio
    paddingHorizontal: 15,
  },
  catTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  catMeta: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  btnAdd: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // --- ESTILOS DO PAINEL PRINCIPAL ---
  novoPainel: {
    backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8,
  },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  statItem: { alignItems: 'center', flex: 1 },
  statValor: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 2 },
  circleWrapper: { width: 120, height: 120, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  circleTextContainer: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
  circleNumber: { fontSize: 26, fontWeight: 'bold', color: '#333' },
  circleLabel: { fontSize: 12, color: '#888' },
  macrosContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  macroItem: { width: '30%', alignItems: 'center' },
  macroLabel: { fontSize: 12, color: '#666', marginBottom: 5 },
  macroBar: { width: '100%', height: 6, borderRadius: 5, backgroundColor: '#f0f0f0' },
  macroValue: { fontSize: 11, fontWeight: 'bold', color: '#333', marginTop: 5 },

  // --- ESTILOS PESO E ÁGUA ---
  pesoContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 15, elevation: 1 },
  pesoHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  pesoTitulo: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  metaTexto: { fontSize: 16, color: '#4CAF50', fontWeight: 'bold' },
  pesoControles: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20 },
  btnPeso: { backgroundColor: '#2196F3', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  pesoDisplay: { alignItems: 'center', width: 100 },
  pesoValor: { fontSize: 32, fontWeight: 'bold', color: '#333' },
  pesoUnidade: { fontSize: 14, color: '#777' },

  aguaSection: { marginTop: 10, backgroundColor: '#F0F8FF', padding: 15, borderRadius: 20, marginBottom: 20 },
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