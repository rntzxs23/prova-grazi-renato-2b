import React, { createContext, useContext, useState } from 'react';

const CaloriesContext = createContext();

export function CaloriesProvider({ children }) {
  // Metas Gerais
  const [metaDiaria, setMetaDiaria] = useState(2000);
  
  // Metas de Macros
  const [metaCarbos, setMetaCarbos] = useState(258);
  const [metaProteinas, setMetaProteinas] = useState(103);
  const [metaGorduras, setMetaGorduras] = useState(68);

  // Consumo Atual
  const [consumidas, setConsumidas] = useState(0);
  const [gastas, setGastas] = useState(244);
  
  const [macrosConsumidos, setMacrosConsumidos] = useState({
    carbos: 0, proteinas: 0, gorduras: 0
  });

  // --- ATUALIZAÇÃO AQUI: Categorias com METAS e ÍCONES ---
  const [categorias, setCategorias] = useState([
    { id: '1', nome: 'Café da Manhã', kcalUsada: 0, meta: 400, icon: 'coffee-outline' }, // 20%
    { id: '2', nome: 'Almoço',       kcalUsada: 0, meta: 800, icon: 'food-steak' },     // 40%
    { id: '3', nome: 'Jantar',       kcalUsada: 0, meta: 600, icon: 'fish' },           // 30%
    { id: '4', nome: 'Lanches',      kcalUsada: 0, meta: 200, icon: 'food-apple' },     // 10%
  ]);

  const [pesoAtual, setPesoAtual] = useState(70.0);
  const [metaPeso, setMetaPeso] = useState(null);

  // Função de Adicionar
  const addAlimentoCompleto = (alimento, categoriaId) => {
    setConsumidas((prev) => prev + alimento.kcal);

    setMacrosConsumidos((prev) => ({
      carbos: prev.carbos + (alimento.carbos || 0),
      proteinas: prev.proteinas + (alimento.proteinas || 0),
      gorduras: prev.gorduras + (alimento.gorduras || 0),
    }));

    setCategorias((prevCats) =>
      prevCats.map((cat) =>
        cat.id === categoriaId ? { ...cat, kcalUsada: cat.kcalUsada + alimento.kcal } : cat
      )
    );
  };

  const addCalories = (amount, categoriaId) => {
    addAlimentoCompleto({ kcal: amount, carbos: 0, proteinas: 0, gorduras: 0 }, categoriaId);
  };

  return (
    <CaloriesContext.Provider value={{ 
      metaDiaria, consumidas, gastas, categorias,
      macrosConsumidos, metaCarbos, metaProteinas, metaGorduras,
      addCalories, addItems: addAlimentoCompleto,
      pesoAtual, setPesoAtual, metaPeso, setMetaPeso
    }}>
      {children}
    </CaloriesContext.Provider>
  );
}

export function useCalories() {
  return useContext(CaloriesContext);
}