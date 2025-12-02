// app/listaReceitas/[id].js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
// Caminho CORRETO para sair de (tabs)/listaReceitas/index.js
// Note que agora são DOIS conjuntos de pontos
import { RECEITAS } from '../../constants/dadosReceitas';

export default function DetalhesReceita() {
  const { id } = useLocalSearchParams();
  
  // Encontra a receita clicada baseada no ID
  const receita = RECEITAS.find(r => r.id === id);

  if (!receita) {
    return <View style={styles.container}><Text>Receita não encontrada</Text></View>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{receita.titulo.toUpperCase()}</Text>
      
      <Image 
        source={typeof receita.imagem === 'string' ? { uri: receita.imagem } : receita.imagem} 
        style={styles.image} 
      />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>INGREDIENTES</Text>
        {receita.ingredientes.map((ingrediente, index) => (
          <Text key={index} style={styles.textItem}>• {ingrediente}</Text>
        ))}

        <View style={styles.separator} />

        <Text style={styles.sectionTitle}>MODO DE PREPARO</Text>
        {receita.preparo.map((passo, index) => (
          <Text key={index} style={styles.textItem}>{passo}</Text>
        ))}
      </View>
      
      {/* Espaço em branco no final para rolagem confortável */}
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '900', textAlign: 'center', marginVertical: 20 },
  image: { width: '100%', height: 250, resizeMode: 'cover' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, marginTop: 10 },
  textItem: { fontSize: 16, marginBottom: 5, lineHeight: 22, color: '#444' },
  separator: { height: 1, backgroundColor: '#eee', marginVertical: 20 }
});