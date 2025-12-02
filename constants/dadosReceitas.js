// constants/dadosReceitas.js

export const RECEITAS = [
  {
    id: "1",
    titulo: "Bolo de Chocolate de Caneca",
    imagem: require("../assets/bolochocolate.jpg"), // Substitua por require('../assets/sua-imagem.jpg')

    ingredientes: [
      "1 unidade ovo",
      "2 colheres de sopa farinha de aveia",
      "1 colher de sopa psyllium",
      "1 ou 2 colheres de sopa açúcar mascavo (ou outro de sua preferência)",
      "1 colher de sopa cacau em pó",
      "1 colher de sopa leite vegetal ou água",
      "1 colher de sopa óleo de coco ou outro",
      "1/2 colher de chá fermento em pó",
    ],
    preparo: [
      "1. Separe uma tigela pequena ou uma caneca e misture todos os ingredientes: ovo, farinhas, açúcar, cacau, leite e óleo – menos o fermento.",
      "2. Bata com um garfo até a massa ficar uniforme.",
      "3. Depois, coloque o fermento e mexa novamente.",
      "4. Coloque no micro-ondas por apenas um minuto e meio – se preferir, pode fazer essa receita em uma frigideira pequena, como a omeleteira, mas deixando-a tampada no fogo baixo até firmar, virando depois o outro lado.",
      "5. Após um minuto e meio, seu bolo de chocolate low carb micro-ondas está pronto!"
    ],
  },
  {
    id: "2",
    titulo: "Pão de Queijo Low Carb",
    imagem: require("../assets/paodequeijao.jpg"),
    ingredientes: ["1 xícara de queijo ralado", "1 ovo", "Tapioca"],
    preparo: ["1. Misture tudo.", "2. Asse a 180 graus."],
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
