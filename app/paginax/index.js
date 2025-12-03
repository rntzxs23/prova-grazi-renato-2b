import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router'; // Importamos useLocalSearchParams
import { RECEITAS } from '../../constants/dadosReceitas'; 

export default function ListaReceitas() {
  const router = useRouter();
  
  // 1. Pegamos o parametro que veio do botão (ex: 'lowcarb' ou 'massa')
  const { filtro } = useLocalSearchParams(); 

  // 2. Filtramos a lista completa para mostrar só o que bate com o filtro
  // Se não tiver filtro (entrou direto), mostra tudo.
  const dadosFiltrados = filtro 
    ? RECEITAS.filter(item => item.categoria === filtro)
    : RECEITAS;

  // Título dinâmico
  const tituloPagina = filtro === 'massa' ? 'GANHO DE MASSA' : 'LOW CARB';

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push(`/paginax/${item.id}`)}
    >
      <Image source={typeof item.imagem === 'string' ? { uri: item.imagem } : item.imagem} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.titulo}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>RECEITAS {tituloPagina}</Text>
      
      <FlatList
        data={dadosFiltrados} // Usamos a lista filtrada aqui!
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 20 }, // Tirei o paddingTop exagerado pois agora temos Header
  headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 10 },
  listContent: { paddingHorizontal: 10, paddingBottom: 50 },
  columnWrapper: { justifyContent: 'space-between' },
  card: { width: '48%', marginBottom: 20, alignItems: 'center' },
  cardImage: { width: '100%', height: 120, borderRadius: 10, resizeMode: 'cover' },
  cardTitle: { marginTop: 5, fontSize: 14, fontWeight: 'bold', textAlign: 'center' }
});