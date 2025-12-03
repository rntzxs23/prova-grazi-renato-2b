import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useCalories } from '../../caloriesContext'; 
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

// BANCO DE DADOS
const ALIMENTOS_DB = [
  { id: '1', nome: 'Ovo Cozido (Unid)', kcal: 70, carbos: 0.6, proteinas: 6, gorduras: 5 },
  { id: '2', nome: 'Frango Grelhado (100g)', kcal: 160, carbos: 0, proteinas: 32, gorduras: 3.5 },
  { id: '3', nome: 'Batata Doce (100g)', kcal: 86, carbos: 20, proteinas: 1.6, gorduras: 0.1 },
  { id: '4', nome: 'Arroz Branco (100g)', kcal: 130, carbos: 28, proteinas: 2.7, gorduras: 0.3 },
  { id: '5', nome: 'Whey Protein (Scoop)', kcal: 120, carbos: 3, proteinas: 24, gorduras: 1 },
  { id: '6', nome: 'Banana Prata', kcal: 90, carbos: 23, proteinas: 1, gorduras: 0.3 },
  { id: '7', nome: 'Aveia (30g)', kcal: 110, carbos: 17, proteinas: 4, gorduras: 2 },
  { id: '8', nome: 'Pão Integral (Fatia)', kcal: 60, carbos: 12, proteinas: 3, gorduras: 1 },
  { id: '9', nome: 'Azeite de Oliva (1 col)', kcal: 108, carbos: 0, proteinas: 0, gorduras: 12 },
  { id: '10', nome: 'Maçã (Unid)', kcal: 52, carbos: 14, proteinas: 0.3, gorduras: 0.2 },
];

export default function SelecionarAlimento() {
  const router = useRouter();
  const { categoriaId } = useLocalSearchParams(); 
  const { addItems } = useCalories(); 

  const [busca, setBusca] = useState('');
  
  // ESTADO NOVO: Lista de itens que o usuário clicou
  const [selecionados, setSelecionados] = useState([]);

  const alimentosFiltrados = ALIMENTOS_DB.filter(item => 
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Função para marcar/desmarcar item
  const toggleSelecao = (item) => {
    const jaSelecionado = selecionados.find(i => i.id === item.id);

    if (jaSelecionado) {
      // Se já tá selecionado, remove da lista
      setSelecionados(prev => prev.filter(i => i.id !== item.id));
    } else {
      // Se não tá, adiciona na lista
      setSelecionados(prev => [...prev, item]);
    }
  };

  // Função para finalizar e mandar tudo pro Contexto
  const finalizarAdicao = () => {
    selecionados.forEach(item => {
      addItems(item, categoriaId);
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Adicionar Alimento</Text>
        
        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="Buscar alimento..."
            value={busca}
            onChangeText={setBusca}
          />
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lista */}
      <FlatList
        data={alimentosFiltrados}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }} // Espaço extra pro botão flutuante
        renderItem={({ item }) => {
          // Verifica se esse item específico está na lista de selecionados
          const isSelected = selecionados.some(i => i.id === item.id);

          return (
            <TouchableOpacity 
              style={[styles.card, isSelected && styles.cardSelected]} // Muda cor se selecionado
              onPress={() => toggleSelecao(item)}
            >
              <View style={{flex: 1}}>
                <Text style={[styles.foodName, isSelected && styles.textSelected]}>{item.nome}</Text>
                <Text style={[styles.foodMacros, isSelected && styles.textSelected]}>
                  C: {item.carbos}g | P: {item.proteinas}g | G: {item.gorduras}g
                </Text>
              </View>
              
              <View style={styles.kcalBadge}>
                <Text style={[styles.kcalText, isSelected && styles.textSelected]}>{item.kcal}</Text>
                
                {/* Troca o ícone: Mais (+) ou Check (✓) */}
                {isSelected ? (
                  <FontAwesome5 name="check-circle" size={24} color="#4CAF50" style={{marginLeft: 10}} />
                ) : (
                  <FontAwesome5 name="plus-circle" size={24} color="#0055ff" style={{marginLeft: 10}} />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* BOTÃO FLUTUANTE DE CONCLUIR (Só aparece se tiver algo selecionado) */}
      {selecionados.length > 0 && (
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.btnConcluir} onPress={finalizarAdicao}>
            <Text style={styles.btnConcluirTexto}>
              Adicionar {selecionados.length} ite{selecionados.length > 1 ? 'ns' : 'm'}
            </Text>
            <MaterialIcons name="check" size={24} color="#fff" style={{marginLeft: 5}} />
          </TouchableOpacity>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20, paddingTop: 50 },
  
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  input: { flex: 1, backgroundColor: '#fff', padding: 15, borderRadius: 12, fontSize: 16, borderWidth: 1, borderColor: '#ddd' },
  cancelButton: { padding: 10 },
  cancelText: { color: '#FF3B30', fontSize: 16, fontWeight: 'bold' },

  // Estilos do Card
  card: { backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderRadius: 15, marginBottom: 10, elevation: 2, borderWidth: 1, borderColor: 'transparent' },
  
  // Estilos quando selecionado
  cardSelected: { backgroundColor: '#e8f5e9', borderColor: '#4CAF50' }, // Fundo verde claro
  textSelected: { color: '#2E7D32' }, // Texto verde escuro

  foodName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  foodMacros: { fontSize: 12, color: '#666', marginTop: 4 },
  kcalBadge: { flexDirection: 'row', alignItems: 'center' },
  kcalText: { fontSize: 16, fontWeight: 'bold', color: '#0055ff' },

  // Botão Flutuante Embaixo
  footerContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    alignItems: 'center'
  },
  btnConcluir: {
    backgroundColor: '#0055ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  btnConcluirTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});