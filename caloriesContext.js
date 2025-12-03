import React, { createContext, useContext, useState } from 'react';

const CaloriesContext = createContext();

export function CaloriesProvider({ children }) {
  // --- Configurações Iniciais ---
  const [metaDiaria, setMetaDiaria] = useState(2000);
  const [consumidas, setConsumidas] = useState(0);
  
  // Categorias de refeição
  const [categorias, setCategorias] = useState([
    { id: '1', nome: 'Café da Manhã', kcalUsada: 0 },
    { id: '2', nome: 'Almoço', kcalUsada: 0 },
    { id: '3', nome: 'Jantar', kcalUsada: 0 },
    { id: '4', nome: 'Lanches', kcalUsada: 0 },
  ]);

  // --- Dados de Peso (Que adicionamos antes) ---
  const [pesoAtual, setPesoAtual] = useState(70.0); 
  const [metaPeso, setMetaPeso] = useState(null); 

  // --- A FUNÇÃO PRINCIPAL ---
  const addCalories = (amount, categoriaId) => {
    // 1. Atualiza o total geral
    setConsumidas((prev) => prev + amount);

    // 2. Atualiza a categoria específica (ex: soma só no Almoço)
    setCategorias((prevCats) =>
      prevCats.map((cat) =>
        cat.id === categoriaId ? { ...cat, kcalUsada: cat.kcalUsada + amount } : cat
      )
    );
  };

  return (
    <CaloriesContext.Provider value={{ 
      metaDiaria, 
      consumidas, 
      categorias, 
      
      // AQUI ESTÁ A CORREÇÃO MÁGICA:
      // Disponibilizamos a função com os dois nomes para não dar erro
      addCalories,
      addItems: addCalories, // <--- Isso conserta o erro "addItems is not a function"

      // Dados de peso
      pesoAtual, 
      setPesoAtual,
      metaPeso, 
      setMetaPeso
    }}>
      {children}
    </CaloriesContext.Provider>
  );
}

export function useCalories() {
  return useContext(CaloriesContext);
}