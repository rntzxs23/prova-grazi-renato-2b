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
    ingredientes: ["1 xícara polvilho azedo (ou doce ou tapioca)", "4 fatias muçarela picada", "5 colheres de sopa creme de ricota (requeijão)"],
    preparo: ["1. Em um recipiente, misture o polvilho azedo, o creme de ricota e a muçarela picada.", "2. Misture todos os ingredientes com uma colher para ficar mais fácil quando for sovar.", "3. Sove a massa no recipiente (ou seja, não precisa colocar na mesa) até que fique bem homogêneo.", "4. No fim, coloque uma pitada de sal e continue a sovar para que fique bem misturado.", "5. Pegue uma assadeira, de preferência redonda e a unte com manteiga ou azeite.", "6. Com a massa pronta, pegue pedacinhos e faça uma bolinha com as mãos, como fazemos quando é brigadeiro, mas para formar os pãezinhos de queijo.", "7. Coloque as bolinhas prontas na assadeira untada anteriormente. Deixe as bolinhas uma bem separada da outra para que não grude!", "8. Com o forno preaquecido em 180º C por 10 minutos, leve para assar por 15 ou 20 minutos ou até dourar a assadeira com os bolinhos montados. Aumente a temperatura para 200º C."],
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
