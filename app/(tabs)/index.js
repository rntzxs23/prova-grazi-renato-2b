import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useCalories } from '../../caloriesContext'; // Importe o contexto

export default function HomeScreen() {
  const router = useRouter();
  
  // Pegamos a meta e a função de definir meta do contexto
  const { metaPeso, setMetaPeso } = useCalories();
  
  // Estado local para o input
  const [inputMeta, setInputMeta] = useState('');

  const salvarMeta = () => {
    if (inputMeta) {
      // Substitui a vírgula por ponto para evitar erro numérico
      const valorFormatado = parseFloat(inputMeta.replace(',', '.'));
      setMetaPeso(valorFormatado);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      
      {/* Cabeçalho com Logo (Seu código antigo) */}
      <View style={styles.headerContainer}>
        <Image 
          source={require('../../assets/logo.png')} 
          style={styles.logo}
        />
        <Text style={styles.welcomeText}>Bem-vindo ao MyShape</Text>
      </View>

      {/* --- NOVA ÁREA: PERGUNTA DA META --- */}
      {/* Só aparece se a metaPeso for null (ainda não definida) */}
      {metaPeso === null ? (
        <View style={styles.metaCard}>
          <Text style={styles.metaTitle}>Qual é o seu objetivo de peso?</Text>
          <Text style={styles.metaSub}>Vamos te ajudar a chegar lá!</Text>
          
          <View style={styles.inputRow}>
            <TextInput 
              style={styles.input}
              placeholder="Ex: 65.5"
              keyboardType="numeric"
              value={inputMeta}
              onChangeText={setInputMeta}
            />
            <Text style={styles.kgText}>kg</Text>
          </View>

          <TouchableOpacity style={styles.btnSalvar} onPress={salvarMeta}>
            <Text style={styles.btnSalvarTexto}>DEFINIR META</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Se já tem meta, mostra uma mensagem motivacional simples
        <View style={styles.metaDefinidaBox}>
          <Text style={styles.metaDefinidaTexto}>
            Sua meta atual é: <Text style={{fontWeight: 'bold'}}>{metaPeso} kg</Text>
          </Text>
          <TouchableOpacity onPress={() => setMetaPeso(null)}>
             <Text style={styles.alterarMetaLink}>Alterar meta</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Botão de Jornada (Seu código antigo) */}
      <View style={styles.actionContainer}>
        <Text style={styles.callToAction}>Pronto para sua nova versão?</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/diario')}
        >
          <Text style={styles.buttonText}>IR PARA MEU DIÁRIO</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', alignItems: 'center',
    justifyContent: 'space-between', paddingVertical: 40, paddingHorizontal: 20,
  },
  headerContainer: { alignItems: 'center', width: '100%', marginTop: 20 },
  logo: { width: 250, height: 150, resizeMode: 'contain', marginBottom: 10 },
  welcomeText: { fontSize: 26, fontWeight: '900', color: '#0055ff', textAlign: 'center' },

  // --- ESTILOS DO CARTÃO DE META ---
  metaCard: {
    width: '100%', backgroundColor: '#f0f8ff', padding: 20, borderRadius: 20,
    alignItems: 'center', elevation: 2
  },
  metaTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  metaSub: { fontSize: 14, color: '#666', marginBottom: 15 },
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  input: { 
    backgroundColor: '#fff', width: 100, padding: 10, borderRadius: 10,
    textAlign: 'center', fontSize: 20, fontWeight: 'bold', borderWidth: 1, borderColor: '#ddd'
  },
  kgText: { fontSize: 18, marginLeft: 10, fontWeight: 'bold', color: '#555' },
  btnSalvar: { backgroundColor: '#0055ff', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 10 },
  btnSalvarTexto: { color: '#fff', fontWeight: 'bold' },

  metaDefinidaBox: { marginBottom: 20 },
  metaDefinidaTexto: { fontSize: 16, color: '#333' },
  alterarMetaLink: { color: '#0055ff', fontSize: 14, textAlign: 'center', marginTop: 5, textDecorationLine: 'underline' },

  // --- ESTILOS DO BOTÃO PRINCIPAL ---
  actionContainer: { width: '100%', alignItems: 'center', marginBottom: 20 },
  callToAction: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  button: {
    backgroundColor: '#0055ff', width: '100%', paddingVertical: 18, borderRadius: 12,
    alignItems: 'center', elevation: 8,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
});