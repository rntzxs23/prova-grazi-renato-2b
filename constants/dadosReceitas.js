// constants/dadosReceitas.js

export const RECEITAS = [
  {
    id: '1',
    titulo: 'Bolo de Chocolate de Caneca',
    imagem: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?q=80&w=1000&auto=format&fit=crop', // Substitua por require('../assets/sua-imagem.jpg')
    ingredientes: [
      '1 unidade ovo',
      '2 colheres de sopa farinha de aveia',
      '1 colher de sopa cacau em pó',
      '1 colher de sopa adoçante'
    ],
    preparo: [
      '1. Misture todos os ingredientes na caneca.',
      '2. Leve ao microondas por 2 minutos.',
      '3. Sirva quente.'
    ]
  },
  {
    id: '2',
    titulo: 'Pão de Queijo Low Carb',
    imagem: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1000&auto=format&fit=crop', 
    ingredientes: [
      '1 xícara de queijo ralado',
      '1 ovo',
      'Tapioca'
    ],
    preparo: [
      '1. Misture tudo.',
      '2. Asse a 180 graus.'
    ]
  },
  // --- PARA ADICIONAR OUTRA RECEITA, COPIE E COLE O BLOCO ABAIXO ---
  // {
  //   id: '3',
  //   titulo: 'Nome da Nova Receita',
  //   imagem: require('../assets/nova-foto.jpg'),
  //   ingredientes: ['Item 1', 'Item 2'],
  //   preparo: ['Passo 1', 'Passo 2']
  // },
];