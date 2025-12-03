import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Animated, Alert, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Svg, { Circle } from 'react-native-svg';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Para um fundo bonito no círculo

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function JejumScreen() {
  // --- ESTADOS DO JEJUM ---
  // Começa agora
  const [inicio, setInicio] = useState(new Date());
  // Termina daqui a 16 horas (padrão popular)
  const [fim, setFim] = useState(new Date(new Date().getTime() + 16 * 60 * 60 * 1000)); 
  const [estaJejuando, setEstaJejuando] = useState(false);
  const [agora, setAgora] = useState(new Date());

  // Controles dos modais de data
  const [showPickerInicio, setShowPickerInicio] = useState(false);
  const [showPickerFim, setShowPickerFim] = useState(false);
  const [mode, setMode] = useState('date'); // 'date' ou 'time'

  // --- LÓGICA DO TIMER (Roda a cada segundo) ---
  useEffect(() => {
    let interval = null;
    if (estaJejuando) {
      // Atualiza o relógio "agora" a cada segundo
      interval = setInterval(() => {
        setAgora(new Date());
      }, 1000);
    } else if (!estaJejuando && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [estaJejuando]);

  // --- CÁLCULOS DE TEMPO ---
  const totalDuration = fim.getTime() - inicio.getTime();
  const elapsed = agora.getTime() - inicio.getTime();
  const remaining = fim.getTime() - agora.getTime();
  
  // Calcula a porcentagem concluída (entre 0 e 1)
  let progress = 0;
  if (estaJejuando) {
      progress = Math.min(Math.max(elapsed / totalDuration, 0), 1);
  }

  // Verifica se acabou
  useEffect(() => {
      if (estaJejuando && progress >= 1) {
          setEstaJejuando(false);
          Alert.alert("Parabéns! 🎉", "Você completou seu jejum!");
      }
  }, [progress, estaJejuando]);

  // Formata HH:MM:SS restantes
  const formatRemainingTime = (ms) => {
    if (ms <= 0) return "00:00:00";
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)));
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Formata data e hora legível (ex: Hoje, 20:00)
  const formatPrettyDate = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
  };


  // --- CONFIGURAÇÃO DA ANIMAÇÃO SVG ---
  const size = 280; // Tamanho do círculo grande
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
      Animated.timing(animValue, {
          toValue: progress,
          duration: 1000, // Atualiza suavemente a cada segundo
          useNativeDriver: true,
      }).start();
  }, [progress]);

  const strokeDashoffset = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [circumference, 0], // Do vazio ao cheio
  });


  // --- HANDLERS DOS DATE PICKERS ---
  const showMode = (currentMode, type) => {
    setMode(currentMode);
    if (type === 'inicio') setShowPickerInicio(true);
    else setShowPickerFim(true);
  };

  const onChangeInicio = (event, selectedDate) => {
    setShowPickerInicio(Platform.OS === 'ios');
    if (selectedDate) setInicio(selectedDate);
  };

  const onChangeFim = (event, selectedDate) => {
    setShowPickerFim(Platform.OS === 'ios');
    if (selectedDate) {
        // Validação simples: Fim deve ser depois do início
        if (selectedDate <= inicio) {
            Alert.alert("Erro", "O fim do jejum deve ser após o início.");
            setFim(new Date(inicio.getTime() + 60*60*1000)); // Reseta para 1h depois
        } else {
            setFim(selectedDate);
        }
    }
  };


  return (
    <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center', paddingVertical: 30}}>
      
      <Text style={styles.headerTitle}>Rastreador de Jejum</Text>

      {/* --- PAINEL CIRCULAR ANIMADO --- */}
      <View style={styles.timerContainer}>
        <Svg width={size} height={size} style={styles.svg}>
          {/* Círculo de Fundo */}
          <Circle cx={size/2} cy={size/2} r={radius} stroke="#e0e0e0" strokeWidth={strokeWidth} fill="transparent" />
          
          {/* Círculo de Progresso (Gradiente simulado com cor sólida por enquanto) */}
          <AnimatedCircle
            cx={size/2} cy={size/2} r={radius}
            stroke={estaJejuando ? "#6A1B9A" : "#ccc"} // Roxo se ativo, cinza se parado
            strokeWidth={strokeWidth} fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round" rotation="-90" origin={`${size/2}, ${size/2}`}
          />
        </Svg>

        {/* Texto no meio do círculo */}
        <View style={styles.timerTextContainer}>
          {estaJejuando ? (
            <>
              <Text style={styles.timerLabel}>Tempo Restante</Text>
              <Text style={styles.timerValue}>{formatRemainingTime(remaining)}</Text>
              <Text style={styles.timerPercent}>{(progress * 100).toFixed(0)}% concluído</Text>
            </>
          ) : (
            <>
               <MaterialCommunityIcons name="timer-off" size={50} color="#ccc" style={{marginBottom: 10}} />
               <Text style={styles.timerLabelDisabled}>Jejum não iniciado</Text>
               <Text style={styles.timerSubDisabled}>Configure os horários abaixo</Text>
            </>
          )}
        </View>
      </View>


      {/* --- SELEÇÃO DE HORÁRIOS --- */}
      <View style={styles.controlsContainer}>
        
        {/* Botão INÍCIO */}
        <TouchableOpacity style={styles.timeButton} onPress={() => showMode('date', 'inicio')} disabled={estaJejuando}>
          <View>
            <Text style={styles.timeLabel}>INÍCIO</Text>
            <Text style={styles.timeValue}>{formatPrettyDate(inicio)}</Text>
          </View>
          <FontAwesome5 name="calendar-alt" size={20} color={estaJejuando ? "#ccc" : "#6A1B9A"} />
        </TouchableOpacity>

        {/* Botão FIM */}
        <TouchableOpacity style={styles.timeButton} onPress={() => showMode('date', 'fim')} disabled={estaJejuando}>
           <View>
            <Text style={styles.timeLabel}>FIM PREVISTO</Text>
            <Text style={styles.timeValue}>{formatPrettyDate(fim)}</Text>
           </View>
           <FontAwesome5 name="calendar-check" size={20} color={estaJejuando ? "#ccc" : "#6A1B9A"} />
        </TouchableOpacity>

        {/* Botão Principal de Ação */}
        <TouchableOpacity 
            style={[styles.mainButton, { backgroundColor: estaJejuando ? '#FF3B30' : '#6A1B9A' }]}
            onPress={() => {
                if (estaJejuando) {
                     Alert.alert("Parar Jejum", "Tem certeza que deseja parar?", [
                         {text: "Cancelar"},
                         {text: "Sim, parar", onPress: () => setEstaJejuando(false)}
                     ])
                } else {
                    // Iniciar
                    setAgora(new Date()); // Sincroniza o início
                    setEstaJejuando(true);
                }
            }}
        >
            <Text style={styles.mainButtonText}>
                {estaJejuando ? "PARAR JEJUM AGORA" : "INICIAR JEJUM"}
            </Text>
        </TouchableOpacity>

      </View>

        {/* PICKERS (Invisíveis até serem chamados) */}
        {showPickerInicio && (
            <DateTimePicker value={inicio} mode={mode} is24Hour={true} display="default" onChange={onChangeInicio} />
        )}
        {showPickerFim && (
            <DateTimePicker value={fim} mode={mode} is24Hour={true} display="default" onChange={onChangeFim} />
        )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  
  // Estilos do Timer Circular
  timerContainer: { width: 280, height: 280, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
  svg: { position: 'absolute' },
  timerTextContainer: { alignItems: 'center', justifyContent: 'center' },
  timerLabel: { fontSize: 16, color: '#666', marginBottom: 5 },
  timerValue: { fontSize: 40, fontWeight: 'bold', color: '#6A1B9A' }, // Roxo para tema de jejum
  timerPercent: { fontSize: 14, color: '#888', marginTop: 5 },
  timerLabelDisabled: { fontSize: 18, fontWeight: 'bold', color: '#999' },
  timerSubDisabled: { fontSize: 14, color: '#aaa', marginTop: 5 },

  // Estilos dos Controles
  controlsContainer: { width: '90%', backgroundColor: '#fff', padding: 20, borderRadius: 20, elevation: 3 },
  timeButton: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  timeLabel: { fontSize: 12, color: '#999', fontWeight: 'bold', marginBottom: 4 },
  timeValue: { fontSize: 18, color: '#333', fontWeight: '600' },

  mainButton: { marginTop: 25, paddingVertical: 18, borderRadius: 12, alignItems: 'center', elevation: 5 },
  mainButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
});