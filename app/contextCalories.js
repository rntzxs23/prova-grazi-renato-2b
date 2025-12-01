import React, { createContext, useContext, useState } from "react";

const CaloriesContext = createContext(null);

export function CaloriesProvider({ children }) {
  const CALORIA_META = 2000;

  const [metaDiaria] = useState(CALORIA_META);

  // 🔥 Agora armazenamos os itens de verdade, não só números
  const [items, setItems] = useState({
    "1": [], // café da manhã
    "2": [], // almoço
    "3": [], // jantar
    "4": []  // lanches
  });

  // 🔥 Soma correta das calorias consumidas
  const consumidas = Object.values(items)
    .flat()
    .reduce((acc, item) => acc + item.kcal, 0);

  const categorias = [
    {
      id: "1",
      nome: "Café da manhã",
      kcalUsada: items["1"].reduce((acc, item) => acc + item.kcal, 0),
    },
    {
      id: "2",
      nome: "Almoço",
      kcalUsada: items["2"].reduce((acc, item) => acc + item.kcal, 0),
    },
    {
      id: "3",
      nome: "Jantar",
      kcalUsada: items["3"].reduce((acc, item) => acc + item.kcal, 0),
    },
    {
      id: "4",
      nome: "Lanches",
      kcalUsada: items["4"].reduce((acc, item) => acc + item.kcal, 0),
    },
  ];

  // 🔥 Agora os itens são adicionados corretamente
  function addItems(categoriaId, newItems) {
    if (!newItems || newItems.length === 0) return;

    setItems((prev) => ({
      ...prev,
      [categoriaId]: [...prev[categoriaId], ...newItems],
    }));
  }

  function resetDay() {
    setItems({
      "1": [],
      "2": [],
      "3": [],
      "4": []
    });
  }

  return (
    <CaloriesContext.Provider
      value={{
        metaDiaria,
        consumidas,
        categorias,
        addItems,
        resetDay
      }}
    >
      {children}
    </CaloriesContext.Provider>
  );
}

export function useCalories() {
  const ctx = useContext(CaloriesContext);
  if (!ctx) throw new Error("useCalories must be used within CaloriesProvider");
  return ctx;
}
