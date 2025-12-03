// constants/dadosReceitas.js

export const RECEITAS = [
  {
    id: "1",
    titulo: "Bolo de Chocolate de Caneca",
    imagem: require("../assets/bolochocolate.jpg"), // Substitua por require('../assets/sua-imagem.jpg')
    categoria: 'lowcarb', // <--- ADICIONE ISSO

    ingredientes: [
      " unidade ovo",
      " colheres de sopa farinha de aveia",
      " colher de sopa psyllium",
      " ou 2 colheres de sopa açúcar mascavo (ou outro de sua preferência)",
      " colher de sopa cacau em pó",
      " colher de sopa leite vegetal ou água",
      " colher de sopa óleo de coco ou outro",
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
    categoria: 'lowcarb', // <--- ADICIONE ISSO
    imagem: require("../assets/paodequeijao.jpg"),
    ingredientes: ["1 xícara polvilho azedo (ou doce ou tapioca)", "4 fatias muçarela picada", "5 colheres de sopa creme de ricota (requeijão)"],
    preparo: ["1. Em um recipiente, misture o polvilho azedo, o creme de ricota e a muçarela picada.", "2. Misture todos os ingredientes com uma colher para ficar mais fácil quando for sovar.", "3. Sove a massa no recipiente (ou seja, não precisa colocar na mesa) até que fique bem homogêneo.", "4. No fim, coloque uma pitada de sal e continue a sovar para que fique bem misturado.", "5. Pegue uma assadeira, de preferência redonda e a unte com manteiga ou azeite.", "6. Com a massa pronta, pegue pedacinhos e faça uma bolinha com as mãos, como fazemos quando é brigadeiro, mas para formar os pãezinhos de queijo.", "7. Coloque as bolinhas prontas na assadeira untada anteriormente. Deixe as bolinhas uma bem separada da outra para que não grude!", "8. Com o forno preaquecido em 180º C por 10 minutos, leve para assar por 15 ou 20 minutos ou até dourar a assadeira com os bolinhos montados. Aumente a temperatura para 200º C."],
  },
  {
    id: "3",
    titulo: "Crepioca proteica",
    categoria: 'massa',
    imagem: require("../assets/crepioca.jpg"),
    ingredientes: ["1 ovo",
      "uma clara",
      "duas colheres de sopa de goma de tapioca",
      "uma pitada de sal."
    ],
    preparo: [
      "Misturando um ovo, uma clara, duas colheres de sopa de goma de tapioca e uma pitada de sal, você cria uma massa versátil.",
      "O recheio pode variar conforme suas preferências, sendo indicado incluir fontes de proteína, como frango, queijo ou atum.",
      "Basta bater os ingredientes, despejar a mistura na frigideira antiaderente e virar quando a parte de baixo soltar, garantindo um resultado dourado e saboroso. Sirva com o recheio de sua escolha para uma refeição nutritiva e prática.",
    ],
  },
  {
    id: "4",
    titulo: "Pão Low Carb de Frigideira",
    categoria: 'lowcarb', // <--- ADICIONE ISSO
    imagem: require("../assets/paolowcarb.jpg"),
    ingredientes: ["ovo",
      "2 colheres de sopa farinha de amêndoas ou farinha de amendoim",
      "1 colher de sopa farinha de coco",
      "1/2 colher de chá fermento em pó (opcional)",
      "1 colher de sopa água", 
      "sal a gosto",
      "gordura para untar (azeite, óleo de coco ou manteiga)",
    ],
    preparo: ["1 - Misturar bem todos os ingredientes (pode ser com um garfo ou um mixer)",
      "2 - Distribuir a mistura em uma frigideira untada com óleo de coco, azeite ou manteiga;",
      "3 - Quando o pão estiver firme, vire-o;",
      "4 - Deixar o pão dourar dos dois lados até que fique do seu gosto;",
      "5 - Servir."
    ],
  },
  {
    id: "5",
    titulo: "Bolo de Chocolate ",
    categoria: 'lowcarb', // <--- ADICIONE ISSO
    imagem: require("../assets/bolo.jpg"),
    ingredientes: ["4 ovos",
      "4 colheres de sopa óleo de coco",
      "5 colheres de sopa xilitol ou açúcar de coco",
      "1 xícara cacau em pó",
      "1 xícara água",
      "100 g farinha de amêndoas", 
      "1 colher fermento em pó",
    ],
    preparo: ["1 - Bata todos os ingredientes no liquidificador, um a um na sequência da receita, exceto o fermento, que deve ser adicionado ao final e misturado com uma colher.",
      "2 - Se preferir, adicione 1/4 de xícara (chá) de nozes picadas ou coco ralado.",
      "3 - Unte uma forma com óleo de coco e o cacau em pó.",
      "4 - Leve ao forno médio por 30 minutos, ou até a massa assar.",
      "5 - Servir."
    ],
  },
  {
    id: "6",
    titulo: "Panqueca proteica ",
    categoria: 'massa', // <--- ADICIONE ISSO
    imagem: require("../assets/panqueca.jpg"),
    ingredientes: ["uma banana prata;",
      "duas colheres de sopa de farinha de aveia;",
      "1 ovo;",
      "duas colheres de chá de açúcar de coco.",
    ],
    preparo: ["Para preparar, amasse uma banana prata com um garfo e adicione farinha de aveia, um ovo e açúcar de coco, misturando até obter uma massa homogênea. Cozinhe porções da massa em uma frigideira antiaderente, virando para dourar ambos os lados. Desfrute de uma panqueca deliciosa e nutritiva.",
    ],
  },
  {
    id: "7",
    titulo: "Bolo de caneca proteico",
    categoria: 'massa', // <--- ADICIONE ISSO
    imagem: require("../assets/bolodebanana.jpg"),
    ingredientes: ["1 ovo;",
      "1 colher sopa de cacau em pó;",
      "1 colher sopa de farelo de aveia;",
      "1 banana nanica madura;",
      "1 colher de chá de fermento em pó.",
    ],
    preparo: ["Comece batendo um ovo em um recipiente e, em seguida, adicione a banana amassada, misturando até obter uma consistência uniforme. Acrescente o cacau e o farelo de aveia, realizando uma nova mistura. Integre o fermento suavemente para potencializar seu efeito. Despeje a massa em uma caneca previamente untada com óleo de coco, azeite, manteiga ou margarina e leve ao micro-ondas por aproximadamente 3 minutos. Se preferir, utilize um liquidificador ou mixer, e, caso deseje, adicione um pouco de açúcar ou adoçante conforme seu gosto.",
    ],
  },
  {
    id: "8",
    titulo: "Shake de mamão",
    categoria: 'massa', // <--- ADICIONE ISSO
    imagem: require("../assets/mamao.jpg"),
    ingredientes: ["1 xícara de chá de mamão descascado e picado;",
      "1 xícara de chá de leite desnatado gelado;",
      "1 colher de sopa de farelo de aveia;",
      "1 colher de mel ou agave.",
    ],
    preparo: ["Essa receita é bastante simples. Basta colocar todos os ingredientes no liquidificador, bater bem e servir. Uma dica para realçar o sabor é consumir o shake gelado. Aproveite!",
    ],
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
