import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SobreScreen() {
  return (
    <ScrollView style={styles.container}>
      
      {/* Cabeçalho com Foto e Fundo */}
      <View style={styles.header}>
        <View style={styles.headerBackground} />
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/perfil.jpg')} // Certifique-se que o nome é esse
            style={styles.profileImage} 
          />
        </View>
        
        <Text style={styles.name}>Renato</Text>
        <Text style={styles.role}>Criador do MyShape & Entusiasta Fitness</Text>
      </View>

      {/* Seção Sobre */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🙋‍♂️ SOBRE MIM</Text>
          <Text style={styles.text}>
            Olá! Sou apaixonado por tecnologia e musculação. Criei o MyShape porque sentia falta de um app que unisse simplicidade e foco em resultados 
            reais, tanto para quem quer emagrecer quanto para quem busca hipertrofia.
          </Text>
        </View>

        {/* Seção Curiosidades */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚡ CURIOSIDADES</Text>
          
          <View style={styles.itemRow}>
            <FontAwesome5 name="dumbbell" size={18} color="#0055ff" style={{marginRight: 10}} />
            <Text style={styles.text}>Treino focado em cargas altas.</Text>
          </View>
          
          <View style={styles.itemRow}>
            <FontAwesome5 name="code" size={18} color="#0055ff" style={{marginRight: 10}} />
            <Text style={styles.text}>Desenvolvi esse app usando React Native.</Text>
          </View>

          <View style={styles.itemRow}>
            <FontAwesome5 name="carrot" size={18} color="#0055ff" style={{marginRight: 10}} />
            <Text style={styles.text}>Sigo a dieta flexível 80/20.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  
  header: { alignItems: 'center', marginBottom: 20 },
  headerBackground: {
    backgroundColor: '#0055ff',
    height: 120,
    width: '100%',
    position: 'absolute',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  imageContainer: {
    marginTop: 60, // Para a foto ficar meio dentro meio fora do azul
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  profileImage: {
    width: 100,
    height: 140,
    borderRadius: 70, // Redonda
    borderWidth: 4,
    borderColor: '#fff',
    resizeMode: 'cover' // Garante que a foto preencha bem
  },
  name: { fontSize: 26, fontWeight: 'bold', color: '#333', marginTop: 10 },
  role: { fontSize: 14, color: '#666', fontStyle: 'italic' },

  content: { paddingHorizontal: 20 },
  
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 2, // Sombra suave
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#0055ff', marginBottom: 15 },
  text: { fontSize: 15, color: '#444', lineHeight: 22 },
  
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },

  socialButton: {
    backgroundColor: '#E1306C', // Cor do Instagram
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30
  },
  socialText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});