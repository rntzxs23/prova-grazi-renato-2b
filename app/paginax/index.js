// app/listaReceitas/index.js
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
// Caminho CORRETO para sair de (tabs)/listaReceitas/index.js
// Note que agora são DOIS conjuntos de pontos
import { RECEITAS } from '../../constants/dadosReceitas';

export default function ListaReceitas() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push(`/paginax/${item.id}`)} // Vai para o detalhe
    >
      <Image source={typeof item.imagem === 'string' ? { uri: item.imagem } : item.imagem} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.titulo}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>RECEITAS LOW CARB</Text>
      
      <FlatList
        data={RECEITAS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2} // Garante o estilo de Grid (2 colunas)
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  listContent: { paddingHorizontal: 10 },
  columnWrapper: { justifyContent: 'space-between' },
  card: { width: '48%', marginBottom: 20, alignItems: 'center' }, // 48% para caber 2 lado a lado
  cardImage: { width: '100%', height: 120, borderRadius: 10, resizeMode: 'cover' },
  cardTitle: { marginTop: 5, fontSize: 14, fontWeight: 'bold', textAlign: 'center' }
});