import { Unit } from '../types';

/* ──────────────────────────────────────────────────────────────────
 * UNIDADE 3 — Técnicas de Teste
 *
 * Conteudo fiel ao documento
 * "TestLab_Unidade3_Tecnicas_de_Teste.docx.pdf".
 * Estrutura segue o mesmo molde das Unidades 1 e 2 (unit1Data.ts /
 * unit2Data.ts) para facilitar manutencao e adicao de novas
 * unidades.
 *
 * Mapeamento das atividades para os slots da plataforma:
 *   - Atividade 3.1 (campos estruturados sobre tecnicas) -> atividade12
 *     (discursiva: o usuario escreve a analise completa num campo
 *     unico, com sample answer detalhada e rubrica).
 *   - Atividade 3.2 (8 questoes objetivas) -> atividade11 (quiz com
 *     modal por questao e feedback imediato).
 *   - Pratica Guiada (saque ATM) -> guidedPracticeRich.
 *   - Pratica Independente (controle de acesso academia) ->
 *     independentPracticeRich.
 *   - Avaliacao Final (10 questoes) -> finalAssessmentQuestions.
 *   - Desafio Aplicado (cadastro de salario) -> finalChallenge.
 * ────────────────────────────────────────────────────────────────── */

export const unit3: Unit = {
  id: 3,
  title: 'Unidade 3',
  subtitle: 'Técnicas de Teste',
  description:
    'Saia do "o que testar" para o "como testar": aprenda técnicas sistemáticas — caixa preta, caixa branca, particionamento de equivalência, análise de valor limite e cobertura de decisões — para selecionar casos de teste eficazes.',
  icon: '🐞',
  meta: {
    cargaHoraria: '8 horas',
    nivel: 'Introdutório',
    referencia: 'CTFL / ISTQB',
    abordagem: 'Eventos de Gagné',
  },
  objectives: [
    'Explicar o que são técnicas de teste de software e qual é o seu papel na seleção de casos de teste.',
    'Diferenciar o teste de caixa preta do teste de caixa branca, identificando o que cada abordagem leva em conta para projetar os testes.',
    'Aplicar a técnica de particionamento de equivalência para organizar entradas em classes válidas e inválidas.',
    'Aplicar a técnica de análise de valor limite para identificar os valores críticos nas fronteiras das faixas de entrada.',
    'Compreender o conceito de cobertura de decisões e identificar as ramificações lógicas que devem ser exercitadas pelos casos de teste.',
    'Selecionar um conjunto mínimo e eficaz de casos de teste a partir de entradas, saídas e regras de negócio de um sistema simples.',
  ],

  /* ─── 3. Situacao-problema inicial ─────────────────────────── */
  situationProblem: {
    title: 'O Sistema de Notas que Aprovava Quem Não Devia',
    paragraphs: [
      'Uma faculdade implantou um novo sistema acadêmico para o controle de notas dos estudantes. A regra de aprovação era simples: o aluno seria aprovado se obtivesse média final igual ou superior a 6,0 em uma escala de 0 a 10. A equipe de desenvolvimento testou o sistema com o caso mais comum — um aluno com média 7,5 — e o resultado foi exibido corretamente como "Aprovado". O sistema foi implantado com confiança.',
      'Na primeira semana letiva, os problemas vieram à tona. Um aluno com média 5,9 estava sendo classificado como "Aprovado". Outro, com média 6,0 exata, aparecia como "Reprovado". E um terceiro, que havia abandonado o curso sem nenhuma nota lançada (média 0,0), também estava sendo mostrado como "Aprovado".',
      'A investigação revelou que a condição de aprovação estava implementada como "media > 6" em vez de "media >= 6", excluindo corretamente o 5,9 mas rejeitando o 6,0. Já o caso de média 0,0 sendo aprovada ocorria porque a função não tratava o caso de ausência de notas — quando todos os campos eram nulos, a média calculada era considerada como "não numérica" e caía em um ramo do código que retornava "Aprovado" por padrão.',
      'A equipe que testou o sistema havia verificado apenas um valor típico no interior da faixa válida. Não testou os limites (5,9; 6,0; 6,1), não testou o valor máximo (10,0), não testou o valor mínimo (0,0) e não testou uma situação inválida (notas ausentes). Todos esses casos teriam revelado os defeitos antes da implantação.',
    ],
    reflectionQuestions: [
      'Por que testar apenas um valor típico, como 7,5, não é suficiente para garantir que uma regra de aprovação funciona corretamente?',
      'Que outros valores você testaria para ter mais confiança de que o sistema está correto?',
      'Existe algum método sistemático para escolher quais entradas testar?',
    ],
    conclusion:
      'Este cenário ilustra por que técnicas de teste existem: elas oferecem critérios objetivos para selecionar casos de teste que maximizam a probabilidade de encontrar defeitos sem precisar testar todas as combinações possíveis. Ao longo desta unidade, você aprenderá a usar essas técnicas de forma prática.',
  },

  /* ─── 4. Ativacao de conhecimentos previos ─────────────────── */
  priorKnowledgeQuestions: [
    {
      id: 'PK3-1',
      question:
        'Na Unidade 1, você aprendeu que o teste de software não pode provar que um sistema é livre de defeitos, mas pode revelar sua presença. Qual é a implicação prática dessa limitação para a seleção de casos de teste?',
      options: [
        'A) Como o teste não pode ser completo, não há critério objetivo para escolher quais casos de teste usar — qualquer entrada serve.',
        'B) O testador deve executar o maior número possível de casos de teste, independentemente de critérios de seleção.',
        'C) O testador deve selecionar casos de teste de forma estratégica, priorizando aqueles com maior probabilidade de revelar defeitos.',
        'D) A seleção de casos de teste é responsabilidade exclusiva do desenvolvedor, que conhece melhor o código.',
      ],
      correctIndex: 2,
      explanation:
        'Correto! Como o teste exaustivo é inviável, o testador precisa escolher estrategicamente quais entradas e cenários testar. As técnicas de teste fornecem esses critérios de seleção — exatamente o tema desta unidade.',
      errorExplanation:
        'A limitação do teste exaustivo não significa que qualquer entrada serve. Ela reforça a necessidade de critérios objetivos para selecionar os casos de teste mais relevantes. Relembre o conceito de objetivo do teste da Unidade 1.',
    },
    {
      id: 'PK3-2',
      question:
        'Considere uma função que valida a idade de um usuário: ela deve aceitar idades entre 18 e 65 anos. Qual afirmação descreve melhor uma estratégia de teste adequada para essa função?',
      options: [
        'A) Testar apenas com a idade 30, pois é um valor típico dentro da faixa válida.',
        'B) Testar com idades 17, 18, 30, 65 e 66, pois cobrem os limites e representantes da faixa válida e inválida.',
        'C) Testar com todas as idades inteiras de 0 a 120, pois o teste exaustivo é o mais seguro.',
        'D) Testar apenas com idades inválidas, pois o objetivo do teste é encontrar erros.',
      ],
      correctIndex: 1,
      explanation:
        'Excelente! A escolha dos valores 17, 18, 30, 65 e 66 cobre os limites inferiores e superiores, um valor representativo válido e valores logo abaixo e acima dos limites. Essa lógica é a base das técnicas que você estudará nesta unidade.',
      errorExplanation:
        'Testar apenas um valor típico é insuficiente. Testar todas as idades é impraticável. O teste focado apenas em entradas inválidas ignora os casos válidos. A estratégia mais eficaz combina valores nos limites e representantes de cada faixa. Aprofunde-se nos Blocos 4 e 5.',
    },
    {
      id: 'PK3-3',
      question:
        'Considere dois cenários de teste para um sistema de login. Cenário A: o testador verifica se o sistema aceita usuário e senha corretos, sem saber como o código foi escrito. Cenário B: o desenvolvedor analisa o código e projeta casos de teste para garantir que todas as condicionais (if/else) sejam executadas pelos testes. Qual afirmação descreve corretamente a diferença entre eles?',
      options: [
        'A) Os dois cenários descrevem o mesmo tipo de teste, pois ambos verificam o comportamento do sistema de login.',
        'B) O Cenário A é um exemplo de teste de caixa branca; o Cenário B, de teste de caixa preta.',
        'C) O Cenário A é um exemplo de teste de caixa preta, baseado no comportamento externo; o Cenário B, de caixa branca, baseado na estrutura interna do código.',
        'D) O Cenário B é mais eficaz porque o desenvolvedor tem acesso ao código, tornando o Cenário A desnecessário.',
      ],
      correctIndex: 2,
      explanation:
        'Correto! O teste de caixa preta (Cenário A) é projetado com base no comportamento externo — entradas e saídas — sem acesso ao código. O teste de caixa branca (Cenário B) usa a estrutura interna do código como guia para os casos de teste. Essa distinção é o tema dos Blocos 2 e 3.',
      errorExplanation:
        'A distinção entre caixa preta e caixa branca não está no sistema testado, mas na informação usada para projetar os testes. Caixa preta: comportamento externo. Caixa branca: estrutura interna. Você estudará isso nos Blocos 2 e 3.',
    },
  ],

  /* ─── 5. Conteudo teorico (7 blocos) ───────────────────────── */
  theoryBlocks: [
    {
      id: 'bloco-1',
      number: 1,
      title: 'O que são Técnicas de Teste de Software',
      icon: '🧰',
      explanation: [
        'Técnicas de teste de software são métodos sistemáticos que orientam a seleção e o projeto de casos de teste. Elas respondem a uma questão prática fundamental: dado que é impossível testar todas as combinações possíveis de entradas e estados de um sistema, quais entradas e cenários devem ser escolhidos para maximizar a probabilidade de revelar defeitos?',
        'Sem uma técnica, o testador fica sujeito à sua intuição, à sua experiência ou ao acaso. O resultado frequente é a concentração de casos de teste em cenários de uso comuns — o "caminho feliz" — e a negligência de situações de fronteira, entradas inválidas e combinações inesperadas de condições. É precisamente nessas situações que os defeitos mais críticos costumam se esconder.',
        'Myers organiza as técnicas em duas grandes categorias, que refletem a perspectiva adotada pelo testador. Quando o testador trata o sistema como uma "caixa preta" — sem acesso ou consideração pela estrutura interna — ele usa técnicas baseadas em especificação. Quando o testador usa o conhecimento da estrutura interna do código como guia — tratando o sistema como uma "caixa branca" — ele aplica técnicas baseadas em código ou estrutura. As duas perspectivas são complementares.',
        'Maldonado acrescenta que as técnicas também podem ser vistas como critérios de cobertura: elas definem o que deve ser exercitado pelos testes para que o conjunto de casos de teste seja considerado adequado. Diferentes critérios possuem diferentes poderes de detecção de defeitos e diferentes custos de aplicação.',
      ],
      example: {
        title: 'Exemplo — Função de Desconto',
        body:
          'Imagine que você deve testar uma função que calcula o desconto aplicado a um pedido com base no valor total. Sem uma técnica, você testaria talvez dois ou três valores que lhe parecem representativos. Com particionamento de equivalência, você identificaria sistematicamente as faixas de valor que recebem tratamentos distintos. Com análise de valor limite, você testaria os pontos exatos onde essas faixas se encontram. Com cobertura de decisões, você garantiria que todas as ramificações do código de cálculo são executadas pelos testes.',
      },
      observation: {
        title: 'Atenção',
        body:
          'As técnicas de teste não são mutuamente exclusivas. Em situações reais, os testadores combinam múltiplas técnicas para obter maior cobertura com menor número de casos de teste. O objetivo é sempre a eficiência: encontrar o máximo de defeitos com o mínimo de esforço.',
      },
      miniActivity: {
        type: 'fill',
        prompt:
          'Complete a frase: "As técnicas de teste existem porque o teste _____________ é inviável para qualquer sistema não trivial. Elas fornecem _____________ para a seleção dos casos de teste mais _____________ de revelar defeitos."',
        placeholder: 'Escreva a frase completa com as três lacunas preenchidas...',
        expectedAnswer:
          '"exaustivo"; "critérios objetivos"; "prováveis". As técnicas substituem a escolha aleatória ou intuitiva por critérios metodológicos que aumentam a eficiência do processo de teste.',
      },
    },
    {
      id: 'bloco-2',
      number: 2,
      title: 'Teste de Caixa Preta',
      icon: '⬛',
      explanation: [
        'O teste de caixa preta — também chamado de teste baseado em especificação ou teste funcional — é uma abordagem em que os casos de teste são projetados exclusivamente com base no comportamento externo do sistema: o que entra, o que sai e quais regras o sistema deve seguir. O testador não tem acesso ao código-fonte, nem precisa tê-lo. O sistema é tratado como uma "caixa opaca": pode-se observar o que sai quando algo entra, mas não se vê o que acontece por dentro.',
        'Essa perspectiva traz uma vantagem importante: o testador adota o ponto de vista do usuário. Ele está verificando se o sistema faz o que deveria fazer, independentemente de como foi implementado. Isso significa que o teste de caixa preta pode ser realizado por pessoas sem conhecimento de programação — analistas de negócios, usuários especialistas, testadores que não são desenvolvedores. Também significa que os casos de teste podem ser projetados a partir da especificação de requisitos, antes mesmo que o código exista.',
        'A limitação do teste de caixa preta é que ele não garante que todas as partes do código foram executadas. Defeitos em caminhos de código que não são ativados pelas entradas testadas podem passar despercebidos. Por isso, as técnicas de caixa preta são mais eficazes quando combinadas com técnicas de caixa branca em uma estratégia de teste abrangente. Técnicas clássicas de caixa preta incluem o particionamento de equivalência e a análise de valor limite, estudadas nos blocos seguintes.',
        'Quando aplicar: quando o testador não tem acesso ao código; quando os casos de teste devem ser derivados dos requisitos; quando o objetivo é verificar se o sistema atende ao comportamento especificado; quando o teste envolve usuários ou representantes do negócio. Objetivo principal: verificar se o sistema se comporta corretamente para o usuário — aceita o que deve aceitar, rejeita o que deve rejeitar e produz as saídas corretas conforme a especificação.',
      ],
      example: {
        title: 'Exemplo — Validação de Ano de Nascimento',
        body:
          'Para um sistema de cadastro que valida o campo "ano de nascimento" (deve aceitar de 1900 a 2006), o testador de caixa preta projeta casos de teste a partir da regra: ano dentro do intervalo deve ser aceito; ano fora do intervalo deve ser rejeitado. Ele não sabe — nem precisa saber — se o código usa um if simples, uma exceção ou uma consulta a banco. Ele fornece anos e verifica se o sistema aceita ou rejeita cada um corretamente.',
      },
      observation: {
        title: 'Atenção',
        body:
          'O teste de caixa preta não garante cobertura do código. É possível que linhas inteiras de código nunca sejam executadas pelos casos de teste de caixa preta, especialmente se condições excepcionais ou caminhos alternativos não forem contemplados pela especificação.',
      },
      miniActivity: {
        type: 'truefalse',
        prompt:
          '"O teste de caixa preta só pode ser realizado por desenvolvedores que conhecem o código-fonte do sistema."',
        options: ['Verdadeiro', 'Falso'],
        correctIndex: 1,
        expectedAnswer:
          'Falso. O teste de caixa preta não requer conhecimento do código-fonte. Ele é baseado em especificações e comportamento externo, podendo ser conduzido por analistas, usuários ou testadores sem conhecimento de programação.',
      },
    },
    {
      id: 'bloco-3',
      number: 3,
      title: 'Teste de Caixa Branca',
      icon: '⬜',
      explanation: [
        'O teste de caixa branca — também chamado de teste estrutural ou teste baseado em código — é uma abordagem em que o conhecimento da estrutura interna do código é utilizado para guiar o projeto dos casos de teste. O testador pode ver "o interior da caixa": as instruções, as estruturas condicionais, os laços, os caminhos de execução e as decisões lógicas do programa.',
        'Enquanto o teste de caixa preta pergunta "o sistema faz o que deveria fazer?", o teste de caixa branca pergunta "o código que foi escrito é exercitado pelos testes?". Isso é importante porque é possível que um sistema passe em todos os testes de caixa preta — produzindo as saídas corretas para as entradas testadas — e ainda conter código defeituoso que nunca foi executado durante os testes.',
        'O teste de caixa branca introduz o conceito de critério de cobertura: uma medida de quanto do código foi exercitado pelos casos de teste. Os critérios mais básicos incluem a cobertura de instruções (todas as linhas do código foram executadas?), a cobertura de decisões (todos os resultados possíveis de cada decisão foram testados?) e a cobertura de caminhos (todas as sequências possíveis de execução foram percorridas?). A cobertura de decisões, estudada no Bloco 6, é o critério mais amplamente exigido em contextos profissionais.',
        'Myers observa que o teste de caixa branca é mais naturalmente realizado pelo próprio desenvolvedor, que tem acesso ao código. No entanto, sua aplicação exclusiva pelo desenvolvedor tem um risco: ele pode repetir os mesmos equívocos de raciocínio tanto na implementação quanto nos testes, fazendo com que defeitos lógicos sistemáticos passem despercebidos. Objetivo principal: garantir que o código escrito seja suficientemente exercitado pelos testes, identificando caminhos de execução, decisões e instruções que não são cobertas pelos casos de teste existentes.',
      ],
      example: {
        title: 'Exemplo — Função de Desconto Estruturada',
        body:
          'Uma função de cálculo de desconto possui quatro condicionais: desconto de 10% para pedidos acima de R$ 100; desconto adicional de 5% para clientes cadastrados há mais de 1 ano; sem desconto para pedidos abaixo de R$ 100; e mensagem de erro para valor negativo. O testador de caixa branca identifica quatro caminhos possíveis no código e projeta casos de teste que garantem que cada caminho seja executado pelo menos uma vez.',
      },
      observation: {
        title: 'Atenção',
        body:
          'Alta cobertura de código não garante ausência de defeitos. Um sistema pode ter 100% de cobertura de instruções e ainda conter defeitos, se o comportamento correto não foi verificado após a execução de cada instrução. Cobertura mede o que foi executado, não se o resultado foi correto.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Um desenvolvedor escreveu testes para sua função e obteve 100% de cobertura de instruções. Ele afirma que o código está correto. Essa conclusão é válida? Justifique.',
        placeholder: 'Responda explicando o que significa cobertura de instruções e por que ela é (ou não) suficiente...',
        expectedAnswer:
          'Não é válida. Cobertura de instruções indica que todas as linhas foram executadas, mas não garante que o comportamento em cada situação foi verificado. É possível executar todas as instruções com casos de teste que não verificam se os resultados estão corretos, ou que não cobrem todas as combinações de condições em uma decisão.',
      },
    },
    {
      id: 'bloco-4',
      number: 4,
      title: 'Particionamento de Equivalência',
      icon: '🧩',
      explanation: [
        'O particionamento de equivalência é uma técnica de teste de caixa preta que organiza o domínio de entrada de uma função ou sistema em grupos — chamados de classes de equivalência — de tal forma que todos os valores dentro de um mesmo grupo são tratados de maneira equivalente pelo sistema. A premissa é que, se o sistema funciona corretamente para um representante de uma classe, ele funcionará corretamente para qualquer outro elemento da mesma classe.',
        'Essa premissa permite uma redução significativa no número de casos de teste necessários. Em vez de testar todos os valores possíveis — o que seria inviável — basta testar um representante de cada classe. Se uma função aceita idades entre 18 e 65, todos os valores nessa faixa formam uma classe válida; qualquer valor abaixo de 18 forma uma classe inválida; qualquer valor acima de 65 forma outra classe inválida.',
        'A identificação de classes segue algumas diretrizes básicas. Quando a entrada é uma faixa numérica (ex.: de 1 a 100), existem pelo menos três classes: abaixo da faixa, dentro da faixa e acima da faixa. Quando a entrada é um conjunto discreto de valores válidos (ex.: "vermelho", "azul", "verde"), cada valor válido pode ser uma classe própria, e qualquer valor fora do conjunto é uma classe inválida. Quando a entrada deve satisfazer uma condição booleana (ex.: "deve ser um número par"), existem duas classes: valores que satisfazem a condição e valores que não satisfazem.',
        'Maldonado destaca que as classes inválidas devem ser testadas separadamente — um caso de teste para cada classe inválida — para garantir que cada condição de erro é tratada corretamente pelo sistema, sem que uma condição inválida mascare outra. Objetivo principal: reduzir o número de casos de teste necessários sem perder cobertura, garantindo que pelo menos um representante de cada categoria de entrada seja testado.',
      ],
      example: {
        title: 'Exemplo — Campo de Parcelas (1 a 60)',
        body:
          'Para um campo de parcelas em sistema de financiamento que aceita valores entre 1 e 60:\n• CE1 (válida 1-60): representante 12 parcelas.\n• CE2 (inválida < 1): representante 0 parcelas.\n• CE3 (inválida > 60): representante 72 parcelas.\n• CE4 (inválida não numérico): representante "abc".\n\nApenas 4 casos de teste cobrem todas as categorias de entrada da função.',
      },
      observation: {
        title: 'Atenção',
        body:
          'O particionamento de equivalência não é suficiente por si só, pois não testa os valores exatos nos limites das faixas — onde defeitos de implementação são mais frequentes. Por isso, ele é frequentemente combinado com a análise de valor limite (Bloco 5).',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Um campo de senha deve ter entre 8 e 20 caracteres. Identifique as classes de equivalência válidas e inválidas, indicando um representante para cada uma.',
        placeholder: 'CE1 (válida): ... | CE2 (inválida): ... | CE3 (inválida): ...',
        expectedAnswer:
          'CE1 (válida): senhas com 8 a 20 caracteres — representante: senha de 12 caracteres. CE2 (inválida): senhas com menos de 8 caracteres — representante: senha de 5 caracteres. CE3 (inválida): senhas com mais de 20 caracteres — representante: senha de 25 caracteres. Opcionalmente: CE4 (inválida): campo vazio.',
      },
    },
    {
      id: 'bloco-5',
      number: 5,
      title: 'Análise de Valor Limite',
      icon: '📏',
      explanation: [
        'A análise de valor limite é uma técnica de teste de caixa preta complementar ao particionamento de equivalência. Enquanto o particionamento seleciona representantes do interior de cada classe, a análise de valor limite foca nos valores exatamente nos limites entre as classes — os pontos de fronteira. A justificativa é empírica: a experiência prática e os estudos de Myers mostram que defeitos se concentram desproporcionalmente nos limites das condições de entrada.',
        'Por que os limites são tão críticos? Porque é nesses pontos que os desenvolvedores cometem erros típicos: usar ">" em vez de ">=", esquecer de incluir o valor do próprio limite em uma faixa, ou cometer erros de arredondamento em cálculos com valores próximos a zero ou ao máximo. Esses erros passam facilmente despercebidos quando apenas valores centrais são testados, mas são imediatamente revelados quando os valores-limite são testados explicitamente.',
        'A regra clássica da análise de valor limite estabelece que, para uma faixa [a, b], os valores a serem testados são: o próprio limite inferior (a), o valor imediatamente abaixo do limite inferior (a-1), o próprio limite superior (b) e o valor imediatamente acima do limite superior (b+1). Para valores contínuos ou com casas decimais, a lógica é similar: testa-se o limite exato e um valor suficientemente próximo acima e abaixo. Quando o domínio tem múltiplas variáveis com limites, os valores-limite de cada variável devem ser testados.',
        'Objetivo principal: revelar defeitos que ocorrem especificamente nos limites das faixas de entrada, onde operadores de comparação incorretos (>, >=, <, <=) ou erros de arredondamento são mais prováveis. A análise de valor limite é essencial sempre que a especificação define intervalos numéricos, faixas de datas, limites de tamanho de texto ou qualquer outra restrição com uma fronteira claramente definida.',
      ],
      example: {
        title: 'Exemplo — Campo de Quantidade (1 a 99)',
        body:
          'Para um campo de quantidade em um pedido que aceita valores entre 1 e 99 unidades:\n• 0 — abaixo do limite inferior, deve ser rejeitado.\n• 1 — limite inferior exato, deve ser aceito (caso crítico).\n• 2 — logo acima do limite inferior, deve ser aceito.\n• 50 — representante válido central, deve ser aceito.\n• 98 — logo abaixo do limite superior, deve ser aceito.\n• 99 — limite superior exato, deve ser aceito (caso crítico).\n• 100 — acima do limite superior, deve ser rejeitado.',
      },
      observation: {
        title: 'Variantes',
        body:
          'A técnica de três pontos (a-1, a, b, b+1) é a mais comum. Algumas variantes adicionam o valor imediatamente acima do limite inferior (a+1) e imediatamente abaixo do limite superior (b-1), resultando em seis valores por faixa. A escolha entre as variantes depende do nível de rigor exigido.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Um sistema bancário aceita transferências de R$ 10,00 a R$ 5.000,00. Quais são os valores-limite que devem ser testados? Indique cada valor e o resultado esperado.',
        placeholder: 'Valor abaixo do mínimo: ... | Limite inferior: ... | Limite superior: ... | Valor acima do máximo: ...',
        expectedAnswer:
          'R$ 9,99 (abaixo do mínimo — deve ser rejeitado); R$ 10,00 (limite inferior — deve ser aceito); R$ 11,00 ou R$ 10,01 (logo acima do mínimo — deve ser aceito); R$ 4.999,00 ou R$ 4.999,99 (logo abaixo do máximo — deve ser aceito); R$ 5.000,00 (limite superior — deve ser aceito); R$ 5.001,00 ou R$ 5.000,01 (acima do máximo — deve ser rejeitado).',
      },
    },
    {
      id: 'bloco-6',
      number: 6,
      title: 'Cobertura de Decisões',
      icon: '🌿',
      explanation: [
        'A cobertura de decisões é um critério de teste de caixa branca que exige que cada decisão lógica presente no código seja exercitada pelo menos uma vez com resultado verdadeiro e pelo menos uma vez com resultado falso. Uma "decisão" é qualquer ponto do código onde o fluxo de execução pode tomar dois ou mais caminhos distintos — tipicamente as instruções "if", "while", "for", "switch" e operadores ternários.',
        'Para compreender a cobertura de decisões, é útil distingui-la do critério ainda mais básico de cobertura de instruções. A cobertura de instruções exige apenas que cada linha de código seja executada pelo menos uma vez. Já a cobertura de decisões é mais rigorosa: ela exige que cada resultado de cada decisão seja exercitado. Uma decisão "if (x > 0)" precisa ser testada tanto com x positivo (resultado verdadeiro) quanto com x zero ou negativo (resultado falso).',
        'Myers e outros autores destacam que a cobertura de instruções é um critério fraco, pois é possível executar todas as instruções sem testar todos os comportamentos do código. Um "if" com um ramo "else" pode ter o bloco "if" executado (cobrindo as instruções do ramo verdadeiro) sem que o ramo "else" seja jamais testado — o que significa que defeitos nesse ramo passarão invisíveis.',
        'A cobertura de decisões é o nível mínimo exigido por muitas normas de qualidade e pelo próprio CTFL/ISTQB. Ela é considerada o ponto de equilíbrio entre custo e poder de detecção de defeitos: mais rigorosa que a cobertura de instruções, mas mais viável do que critérios mais complexos como cobertura de caminhos ou de condições múltiplas. Objetivo principal: garantir que cada resultado possível (verdadeiro e falso) de cada decisão no código seja exercitado por pelo menos um caso de teste.',
      ],
      example: {
        title: 'Exemplo — classificar_nota(nota)',
        body:
          'Considere o trecho:\nse nota >= 6.0 -> retornar "Aprovado"\nsenão -> retornar "Reprovado"\n\nPara cobertura de decisões, dois casos de teste são necessários:\n• Caso 1: nota = 7.0 → resultado verdadeiro da decisão → executa o ramo "Aprovado".\n• Caso 2: nota = 4.0 → resultado falso da decisão → executa o ramo "Reprovado".\n\nSe houvesse uma segunda decisão (ex.: validar se a nota está no intervalo permitido antes de classificar), seriam necessários dois casos adicionais para cobrir os dois resultados dessa nova decisão.',
      },
      observation: {
        title: 'Limitação',
        body:
          'Cobertura de decisões não garante cobertura de todas as combinações de condições em decisões compostas. Se uma decisão é "se (A e B)", cobrir verdadeiro e falso da decisão completa não significa que todas as combinações (A verdadeiro/B falso, A falso/B verdadeiro, etc.) foram testadas. Para isso, seria necessário aplicar critérios mais rigorosos, como cobertura de condições múltiplas.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'O código a seguir possui quantas decisões? Quantos casos de teste são necessários para atingir cobertura de decisões?\n\nfunção verificar_acesso(idade, tipo_conta):\n  se idade >= 18:\n    se tipo_conta == "premium":\n      retornar "Acesso total"\n    senão:\n      retornar "Acesso básico"\n  senão:\n    retornar "Acesso negado"',
        placeholder: 'Número de decisões: ... | Casos de teste necessários: ... | Descreva cada caso...',
        expectedAnswer:
          'Há 2 decisões. Para cobrir ambas, são necessários 3 casos de teste: (1) idade >= 18 e tipo_conta = "premium" — cobre o ramo verdadeiro da segunda decisão; (2) idade >= 18 e tipo_conta != "premium" — cobre o ramo falso da segunda decisão; (3) idade < 18 — cobre o ramo falso da primeira decisão. Casos 1 e 2 cobrem o resultado verdadeiro da primeira decisão; o caso 3 cobre o resultado falso.',
      },
    },
    {
      id: 'bloco-7',
      number: 7,
      title: 'Como Escolher a Técnica Adequada',
      icon: '🎯',
      explanation: [
        'Não existe uma técnica de teste universalmente superior a todas as outras. A escolha da técnica mais adequada depende do contexto: o tipo de sistema, o nível de teste, os recursos disponíveis, o acesso ao código e o tipo de defeito que se deseja priorizar.',
        'Como regra geral, o teste de caixa preta é preferido quando o foco é verificar o comportamento do sistema a partir da perspectiva do usuário, quando os casos de teste devem ser derivados de requisitos ou especificações, e quando o testador não tem acesso ao código. O particionamento de equivalência e a análise de valor limite são as técnicas de caixa preta mais aplicadas na prática e no exame CTFL.',
        'O teste de caixa branca, com critérios como cobertura de instruções e cobertura de decisões, é mais adequado quando o foco é garantir que o código foi suficientemente exercitado pelos testes. É especialmente valioso em contextos de alta criticidade — sistemas médicos, sistemas de controle, software embarcado — onde é necessário demonstrar que partes específicas do código foram testadas. Também é útil para identificar código morto.',
        'Na prática profissional, a abordagem mais eficaz é a combinação das técnicas. Aplica-se particionamento de equivalência e análise de valor limite para construir uma base de casos de teste a partir da especificação. Em seguida, verifica-se a cobertura de decisões para identificar caminhos que ainda não foram exercitados e adicionar casos de teste complementares. Essa combinação equilibra eficiência (caixa preta) e abrangência (caixa branca).',
        'Tabela comparativa resumida — Caixa Preta: usa especificação/requisitos, executor típico testador/usuário, sem acesso ao código necessário, técnicas principais (part. equivalência e valor limite), melhor para verificar comportamento externo. Caixa Branca: usa estrutura do código, executor desenvolvedor/testador, requer acesso ao código, técnicas principais (coberturas), melhor para garantir cobertura. Combinada: usa ambas as fontes, executor equipe de QA, máxima eficácia.',
      ],
      example: {
        title: 'Diretrizes Práticas',
        body:
          '• Campos com faixa numérica e sem acesso ao código → particionamento + valor limite.\n• Funções com múltiplas condicionais e acesso ao código → cobertura de decisões.\n• Conjunto discreto de valores válidos (ex.: status, tipo de plano) → particionamento (cada valor uma classe).\n• Contexto CI/CD com mudanças frequentes → automatizar caixa branca a cada push.\n• Sistemas críticos com normas regulatórias → combinação rigorosa de caixa preta + cobertura ≥ 90%.',
      },
      observation: {
        title: 'Prioridade prática',
        body:
          'Na prática de mercado e nos exames CTFL, o particionamento de equivalência e a análise de valor limite são as técnicas mais cobradas. Domine essas duas antes de aprofundar-se em critérios de caixa branca mais avançados.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Para cada situação abaixo, indique qual técnica seria mais adequada:\na) O testador deve verificar se um campo de texto aceita até 255 caracteres, sem acesso ao código.\nb) O desenvolvedor quer garantir que todos os if/else de uma função de cálculo de impostos sejam exercitados.\nc) O testador precisa organizar as entradas de idade de um formulário em grupos para reduzir o número de casos de teste.',
        placeholder: 'a) ... | b) ... | c) ...',
        expectedAnswer:
          'a) Análise de valor limite (testar 254, 255, 256 caracteres). b) Cobertura de decisões. c) Particionamento de equivalência.',
      },
    },
  ],

  /* ─── 6. Demonstracao com exemplo resolvido ───────────────── */
  demonstration: {
    requirement:
      'Sistema acadêmico que calcula a situação final de um aluno com base na média de duas provas. Situação: Aprovado se média >= 6,0; Reprovado se média < 6,0. Restrições: cada nota deve ser numérica entre 0,0 e 10,0 (inclusive). Notas fora dessa faixa ou não numéricas devem ser rejeitadas com mensagem de erro.',
    situation:
      'Aplicaremos sistematicamente particionamento de equivalência, análise de valor limite e verificação de cobertura de decisões para chegar a um conjunto mínimo e eficaz de casos de teste — que revelaria os defeitos descritos na situação-problema inicial desta unidade.',
    steps: [
      {
        id: 1,
        label: 'Perspectiva de Caixa Preta',
        question: 'Como abordar o problema sem olhar para o código?',
        body:
          'O testador não precisa ver o código. Ele sabe: o sistema recebe duas notas e retorna uma situação.\n\nComportamentos esperados:\n• Aceitar notas válidas.\n• Rejeitar notas inválidas (fora da faixa 0,0–10,0 ou não numéricas).\n• Calcular a média corretamente.\n• Classificar como "Aprovado" se média >= 6,0 e "Reprovado" caso contrário.\n\nA caixa preta nos dá o ponto de partida sem suposições sobre a implementação.',
        color: '#1F8A5B',
      },
      {
        id: 2,
        label: 'Particionamento de Equivalência',
        question: 'Quais classes de entrada existem?',
        body:
          'Classes para cada nota (aplicadas a N1 e N2 separadamente):\n• CE1 — Válida (0,0 a 10,0): N1=7,0 ; N2=6,0 → média=6,5 → Aprovado.\n• CE2 — Inválida (< 0,0): N1=-1,0 → rejeitada com erro.\n• CE3 — Inválida (> 10,0): N1=11,0 → rejeitada com erro.\n• CE4 — Inválida (não numérica): N1="abc" → rejeitada com erro.\n\nClasses para a média resultante:\n• CE5 — Média >= 6,0 → Aprovado.\n• CE6 — Média < 6,0 → Reprovado.',
        color: '#146B4A',
      },
      {
        id: 3,
        label: 'Análise de Valor Limite',
        question: 'Quais pontos de fronteira são críticos?',
        body:
          'Limites críticos: 0,0 (mínimo de nota), 10,0 (máximo de nota) e 6,0 (limite de aprovação na média).\n\nValores a testar:\n• Notas: -0,1 (abaixo do mínimo), 0,0 (limite inferior), 0,1 (logo acima), 9,9 (logo abaixo do máximo), 10,0 (limite superior), 10,1 (acima do máximo).\n• Médias: 5,9 (logo abaixo do limite de aprovação — deve resultar em Reprovado), 6,0 (no limite — deve resultar em Aprovado), 6,1 (logo acima — deve resultar em Aprovado).',
        color: '#0F3D2E',
      },
      {
        id: 4,
        label: 'Conjunto de Casos de Teste',
        question: 'Como ficam os casos de teste consolidados?',
        body:
          '10 casos de teste cobrem os cenários críticos:\n\nCT1: N1=7,0 N2=6,0 → média 6,5 → Aprovado (Part. Equiv. CE1+CE5)\nCT2: N1=4,0 N2=4,0 → média 4,0 → Reprovado (Part. Equiv. CE1+CE6)\nCT3: N1=-1,0 N2=5,0 → Erro: nota inválida (Part. Equiv. CE2)\nCT4: N1=11,0 N2=5,0 → Erro: nota inválida (Part. Equiv. CE3)\nCT5: N1="abc" N2=5,0 → Erro: nota inválida (Part. Equiv. CE4)\nCT6: N1=5,9 N2=6,1 → média 6,0 → Aprovado (Val. Limite média=6,0)\nCT7: N1=5,7 N2=6,1 → média 5,9 → Reprovado (Val. Limite média=5,9)\nCT8: N1=6,1 N2=6,1 → média 6,1 → Aprovado (Val. Limite média=6,1)\nCT9: N1=0,0 N2=0,0 → média 0,0 → Reprovado (Val. Limite nota=0,0)\nCT10: N1=10,0 N2=10,0 → média 10,0 → Aprovado (Val. Limite nota=10,0)',
        color: '#4CAF50',
      },
      {
        id: 5,
        label: 'Caixa Branca e Cobertura de Decisões',
        question: 'Os casos cobrem todos os ramos do código?',
        body:
          'Decisões no código (caixa branca):\n• D1: se (nota < 0.0 ou nota > 10.0) → rejeitar\n• D2: se (média >= 6.0) → Aprovado, senão Reprovado\n\nVerificação:\n• D1 — verdadeiro: CT3 (nota=-1,0) ou CT4 (nota=11,0). Falso: qualquer CT com notas válidas.\n• D2 — verdadeiro (Aprovado): CT1, CT6, CT8, CT10. Falso (Reprovado): CT2, CT7, CT9.\n\nOs 10 casos de teste selecionados pela caixa preta já cobrem todos os resultados de ambas as decisões. Nenhum caso adicional é necessário para atingir cobertura de decisões.',
        color: '#0F3D2E',
      },
    ],
    lesson:
      'A combinação de particionamento de equivalência, análise de valor limite e verificação de cobertura de decisões produziu 10 casos de teste que cobrem os cenários mais críticos do sistema — incluindo os limites de aprovação e os casos que revelaram os defeitos descritos no cenário inicial desta unidade. Nenhuma técnica sozinha teria sido tão eficaz.',
  },

  /* ─── 7. Atividade 3.1 — discursiva (campos integrados) ───── */
  atividade12: {
    question:
      'Um sistema de agendamento de consultas médicas permite que o paciente informe o número de dias de antecedência. Regras: o número deve ser um valor inteiro entre 1 e 30 (inclusive); valores fora desse intervalo (incluindo 0 e negativos) devem ser rejeitados com a mensagem "Número de dias inválido"; valores não inteiros ou não numéricos também devem ser rejeitados. Aplique particionamento de equivalência e análise de valor limite. Em sua resposta, descreva: (a) as classes de equivalência válidas; (b) as classes inválidas; (c) os valores-limite a testar; (d) ao menos 5 casos de teste resultantes; (e) o resultado esperado de cada caso.',
    minWords: 150,
    criteria: [
      'Identifica corretamente as classes de equivalência válidas (1 a 30) e inválidas (< 1, > 30, não inteiros, não numéricos).',
      'Lista os valores-limite críticos: 0 (abaixo do mínimo), 1 (limite inferior), 30 (limite superior) e 31 (acima do máximo).',
      'Propõe pelo menos 5 casos de teste cobrindo limites e representantes de cada classe.',
      'Indica o resultado esperado de cada caso (aceito / "Número de dias inválido").',
      'Demonstra compreensão de por que os limites são críticos para revelar defeitos de operadores de comparação.',
    ],
    sampleAnswer:
      'Classes de equivalência válidas — CE1: valores inteiros entre 1 e 30 (inclusive), representante 15 dias.\n\nClasses de equivalência inválidas — CE2: valores menores que 1, incluindo 0 e negativos (representantes 0 e -5); CE3: valores maiores que 30 (representantes 31 e 45); CE4: valores não inteiros (representantes 1,5 e 10,7); CE5: valores não numéricos (representantes "abc" e "dez").\n\nValores-limite a testar — 0 (abaixo do mínimo — deve ser rejeitado); 1 (limite inferior — deve ser aceito); 2 (logo acima do mínimo — deve ser aceito); 29 (logo abaixo do máximo — deve ser aceito); 30 (limite superior — deve ser aceito); 31 (acima do máximo — deve ser rejeitado).\n\nCasos de teste e resultados esperados —\nCT1: 0 dias → "Número de dias inválido" (valor-limite abaixo do mínimo).\nCT2: 1 dia → Aceito (limite inferior).\nCT3: 15 dias → Aceito (representante da classe válida).\nCT4: 30 dias → Aceito (limite superior).\nCT5: 31 dias → "Número de dias inválido" (valor-limite acima do máximo).\nCT6: -5 dias → "Número de dias inválido" (classe inválida CE2).\nCT7: "abc" → "Número de dias inválido" (classe inválida CE5).\n\nOs valores nos limites (0, 1, 30, 31) são especialmente importantes porque é nesses pontos que defeitos de operadores de comparação (> em vez de >=, por exemplo) costumam se manifestar.',
    rubric: [
      {
        level: 'Insuficiente',
        range: '0 – 25%',
        description:
          'A resposta não identifica corretamente as classes ou os valores-limite, ou propõe casos de teste sem critério claro. Revisitar todos os blocos da unidade.',
      },
      {
        level: 'Básico',
        range: '26 – 50%',
        description:
          'A resposta identifica algumas classes ou valores-limite, mas com lacunas importantes (ex.: omite classes inválidas ou os vizinhos dos limites). Revisar Blocos 4 e 5.',
      },
      {
        level: 'Satisfatório',
        range: '51 – 75%',
        description:
          'A resposta identifica as classes principais e os valores-limite, mas a justificativa ou os casos de teste apresentam pequenas imprecisões. Revisar o Bloco 5.',
      },
      {
        level: 'Excelente',
        range: '76 – 100%',
        description:
          'A resposta identifica todas as classes, todos os valores-limite críticos e propõe um conjunto eficiente de casos de teste com resultados esperados claros. Excelente aplicação das técnicas.',
      },
    ],
  },

  /* ─── 8. Atividade 3.2 — Lista de exercicios (8 questoes) ──── */
  atividade11: {
    description:
      'Lista de exercícios sobre técnicas de teste. Cada questão tem apenas uma alternativa correta. Você recebe feedback imediato após cada resposta. As questões abrangem identificação de técnicas, classificação, análise de classes e seleção de casos de teste.',
    questions: [
      {
        id: '3.2.1',
        question:
          'Um testador deve verificar se um campo de desconto aceita apenas valores entre 0% e 50%. Ele não tem acesso ao código-fonte. Qual técnica é mais adequada para selecionar os casos de teste?',
        options: [
          'A) Cobertura de decisões, pois o campo possui uma condição booleana.',
          'B) Particionamento de equivalência combinado com análise de valor limite, pois a entrada possui faixas válidas e inválidas com limites definidos.',
          'C) Teste de caixa branca, pois é necessário verificar as instruções do código.',
          'D) Cobertura de instruções, pois todas as linhas do módulo de desconto devem ser executadas.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! Sem acesso ao código e com faixa numérica definida, a combinação de particionamento (identifica classes) e valor limite (testa pontos críticos 0, 50 e seus vizinhos) é a escolha padrão.',
        errorExplanation:
          'Sem acesso ao código, técnicas de caixa branca não se aplicam. Para faixas numéricas, a combinação de particionamento e valor limite é a escolha padrão. Revise os Blocos 2, 4 e 5.',
        reviewBlock: 'bloco-4',
      },
      {
        id: '3.2.2',
        question:
          'Classifique cada cenário como Caixa Preta ou Caixa Branca:\n(a) O testador verifica se o sistema de login retorna "Acesso negado" para senha incorreta, sem ver o código.\n(b) O desenvolvedor analisa o código e cria casos de teste para garantir que o ramo "else" de uma condicional seja executado.\n(c) O analista projeta casos de teste a partir dos requisitos de um formulário de cadastro.\nQual sequência está correta?',
        options: [
          'A) (a) Caixa Preta; (b) Caixa Branca; (c) Caixa Preta.',
          'B) (a) Caixa Branca; (b) Caixa Preta; (c) Caixa Preta.',
          'C) (a) Caixa Preta; (b) Caixa Preta; (c) Caixa Branca.',
          'D) (a) Caixa Branca; (b) Caixa Branca; (c) Caixa Preta.',
        ],
        correctIndex: 0,
        explanation:
          'Correto! (a) Caixa Preta — sem acesso ao código, baseado no comportamento externo. (b) Caixa Branca — usa a estrutura interna (ramo "else") para guiar os testes. (c) Caixa Preta — derivado de requisitos, sem acesso ao código.',
        errorExplanation:
          'O critério de distinção é: o testador usa a estrutura interna do código (caixa branca) ou apenas o comportamento externo/especificação (caixa preta)? Revise os Blocos 2 e 3.',
        reviewBlock: 'bloco-2',
      },
      {
        id: '3.2.3',
        question:
          'Um sistema de cadastro exige que o usuário informe o número de telefone com exatamente 11 dígitos numéricos. Quais classes de equivalência são corretas?',
        options: [
          'A) CE1 (válida): números com 11 dígitos; CE2 (inválida): números com menos de 11 dígitos; CE3 (inválida): números com mais de 11 dígitos; CE4 (inválida): entrada com letras ou caracteres especiais.',
          'B) CE1 (válida): qualquer número de telefone; CE2 (inválida): campo vazio.',
          'C) CE1 (válida): números com 11 dígitos; CE2 (inválida): qualquer outro valor.',
          'D) CE1 (válida): números com 10 ou 11 dígitos; CE2 (inválida): números com 9 ou menos dígitos.',
        ],
        correctIndex: 0,
        explanation:
          'Correto! Cada categoria de entrada inválida deve ser uma classe separada, pois cada uma pode provocar um comportamento diferente do sistema (menos dígitos, mais dígitos, caracteres não numéricos).',
        errorExplanation:
          'Cada tipo diferente de entrada inválida deve ser uma classe própria. "Menos de 11 dígitos", "mais de 11 dígitos" e "letras" são categorias distintas com comportamentos potencialmente diferentes. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },
      {
        id: '3.2.4',
        question:
          'Um campo de entrada aceita idades entre 0 e 120 anos. Quais são os valores que a análise de valor limite indica como mais críticos para teste?',
        options: [
          'A) Apenas 60 anos, por ser o valor central da faixa.',
          'B) -1, 0, 1, 119, 120 e 121.',
          'C) 0, 40, 80 e 120, por dividir a faixa em partes iguais.',
          'D) Apenas 0 e 120, pois são os limites.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! A análise de valor limite seleciona os limites exatos e os valores imediatamente adjacentes — onde defeitos de operadores de comparação são mais prováveis.',
        errorExplanation:
          'Análise de valor limite não é apenas os extremos: inclui os vizinhos imediatos dos limites. Para [0, 120]: -1, 0, 1 (entorno do mínimo) e 119, 120, 121 (entorno do máximo). Revise o Bloco 5.',
        reviewBlock: 'bloco-5',
      },
      {
        id: '3.2.5',
        question:
          'Considere o código:\n  se pontos >= 1000 -> categoria = "Gold"\n  senão se pontos >= 500 -> categoria = "Silver"\n  senão -> categoria = "Bronze"\nQuantos casos de teste são necessários para atingir cobertura de decisões?',
        options: [
          'A) 1 caso de teste, pois apenas um resultado é necessário.',
          'B) 2 casos de teste, pois há uma única decisão.',
          'C) 3 casos de teste, para cobrir os três possíveis resultados das decisões encadeadas.',
          'D) 6 casos de teste, pois cada decisão tem dois resultados e há três decisões.',
        ],
        correctIndex: 2,
        explanation:
          'Correto! Há duas decisões encadeadas com três caminhos possíveis: pontos >= 1000 (Gold), 500 <= pontos < 1000 (Silver) e pontos < 500 (Bronze). 3 casos cobrem todos os caminhos.',
        errorExplanation:
          'Duas decisões encadeadas (if/else if/else) produzem 3 caminhos possíveis. A cobertura de decisões exige que cada caminho seja percorrido. Revise o Bloco 6.',
        reviewBlock: 'bloco-6',
      },
      {
        id: '3.2.6',
        question:
          'Um sistema de pagamento aceita cartões de crédito ou débito (tipos válidos) e rejeita qualquer outro tipo. Quais classes de equivalência são mais adequadas?',
        options: [
          'A) CE1 (válida): cartão de crédito; CE2 (válida): cartão de débito; CE3 (inválida): qualquer outro tipo de pagamento.',
          'B) CE1 (válida): qualquer forma de pagamento eletrônico; CE2 (inválida): pagamento em dinheiro.',
          'C) CE1 (válida): cartão de crédito ou débito; CE2 (inválida): outros tipos.',
          'D) CE1 (válida): cartão de crédito; CE2 (inválida): todos os demais.',
        ],
        correctIndex: 0,
        explanation:
          'Correto! Quando a entrada é um conjunto discreto de valores válidos, cada valor válido deve ser uma classe própria. Crédito e débito são tipos distintos que podem ser tratados de forma diferente no código, mesmo que ambos sejam aceitos.',
        errorExplanation:
          'Crédito e débito são tipos distintos de entrada válida e devem ser classes separadas. Mesmo que ambos produzam o mesmo resultado (aceito), são tecnicamente diferentes e podem ser tratados de forma diferente no código. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },
      {
        id: '3.2.7',
        question:
          'Um desenvolvedor afirma: "Meu código tem 100% de cobertura de instruções, portanto todos os defeitos foram encontrados." Essa afirmação é correta?',
        options: [
          'A) Sim, porque 100% de cobertura significa que todas as linhas foram testadas e estão corretas.',
          'B) Não, porque cobertura de instruções não garante que todos os resultados possíveis de cada decisão foram testados.',
          'C) Sim, porque a cobertura de instruções é o critério mais rigoroso de teste de caixa branca.',
          'D) Não, porque o teste de caixa branca não é válido para encontrar defeitos.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! Cobertura de instruções indica que cada linha foi executada, mas não que todos os caminhos de decisão foram exercitados. Um "else" não executado pode conter defeitos invisíveis mesmo com 100% de cobertura de instruções.',
        errorExplanation:
          'Cobertura de instruções é diferente de cobertura de decisões. É possível executar todas as instruções sem cobrir todos os ramos de cada decisão. Revise os Blocos 3 e 6.',
        reviewBlock: 'bloco-6',
      },
      {
        id: '3.2.8',
        question:
          'Considere um formulário de cadastro com dois campos independentes: "Idade" (aceita de 18 a 65) e "Renda mensal" (aceita de R$ 500 a R$ 20.000). Qual é a abordagem correta para aplicar particionamento de equivalência e análise de valor limite?',
        options: [
          'A) Analisar apenas o campo de idade, pois é o campo com restrição mais simples.',
          'B) Analisar cada campo independentemente, identificando classes e valores-limite para cada um.',
          'C) Combinar os dois campos e testar todas as combinações possíveis de classes de equivalência.',
          'D) Aplicar apenas particionamento ao campo de idade e apenas valor limite ao campo de renda.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! Campos independentes são analisados individualmente, identificando suas próprias classes e valores-limite. Isso evita a explosão combinatorial de testar todas as combinações.',
        errorExplanation:
          'Campos independentes são analisados individualmente. Combinar todos os campos multiplicaria o número de casos de teste desnecessariamente. Revise os Blocos 4 e 5.',
        reviewBlock: 'bloco-4',
      },
    ],
  },

  /* ─── 9. Pratica Guiada — Caixa Eletronico (saque) ────────── */
  guidedPracticeRich: {
    scenario:
      'Um sistema bancário simples permite que o correntista realize saques no caixa eletrônico. As regras são: o valor do saque deve ser múltiplo de R$ 50,00; o valor mínimo é R$ 50,00; o valor máximo por operação é R$ 1.500,00; o valor não pode ser superior ao saldo disponível; valores negativos, zero e valores não numéricos devem ser rejeitados.',
    question:
      'Com base nas regras acima, identifique as classes de equivalência, os valores-limite críticos e proponha um conjunto mínimo de casos de teste. Indique a técnica utilizada em cada caso.',
    fields: [
      {
        key: 'classesValidas',
        label: '1. Classes de equivalência VÁLIDAS',
        description: 'Quais combinações de valor são aceitas pelo sistema?',
        placeholder: 'CE1 (válida): ...',
        color: '#1F8A5B',
      },
      {
        key: 'classesInvalidas',
        label: '2. Classes de equivalência INVÁLIDAS',
        description: 'Cada motivo de rejeição é uma classe separada.',
        placeholder: 'CE2: abaixo do mínimo | CE3: acima do máximo | CE4: não múltiplo | CE5: ... | CE6: ... | CE7: ...',
        color: '#E53935',
      },
      {
        key: 'valoresLimite',
        label: '3. Valores-limite identificados',
        description: 'Concentre-se nos extremos R$ 50 e R$ 1.500 e seus vizinhos.',
        placeholder: 'R$ 0 → ... | R$ 50 → ... | R$ 100 → ... | R$ 1.450 → ... | R$ 1.500 → ... | R$ 1.550 → ...',
        color: '#146B4A',
      },
      {
        key: 'casosTeste',
        label: '4. Casos de teste propostos (ao menos 5)',
        description: 'Inclua valor, saldo e resultado esperado.',
        placeholder: 'CT1: ... | CT2: ... | CT3: ... | CT4: ... | CT5: ...',
        color: '#0F3D2E',
      },
      {
        key: 'tecnicas',
        label: '5. Técnica usada em cada caso',
        description: 'Indique se é particionamento de equivalência ou análise de valor limite.',
        placeholder: 'CT1: Part. Equiv. (CE1) | CT2: Val. Limite (abaixo do min.) | ...',
        color: '#4CAF50',
      },
    ],
    hints: [
      'Comece identificando quais valores de saque serão aceitos pelo sistema. Quais condições devem ser satisfeitas simultaneamente para que o saque seja autorizado?',
      'Quantas classes inválidas existem? Pense em: valor abaixo do mínimo, valor acima do máximo, valor não múltiplo de 50, valor não numérico, valor maior que o saldo. Cada condição inválida é uma classe separada.',
      'Para os valores-limite, concentre-se nos extremos da faixa válida: R$ 50,00 e R$ 1.500,00. Quais são os valores imediatamente abaixo de R$ 50 e imediatamente acima de R$ 1.500 que deveriam ser rejeitados?',
    ],
    expectedAnswers: {
      classesValidas:
        'CE1: Valor múltiplo de R$ 50, entre R$ 50 e R$ 1.500, menor ou igual ao saldo. Representante: R$ 200 (com saldo suficiente).',
      classesInvalidas:
        'CE2: valor abaixo de R$ 50 (ex.: R$ 30). CE3: valor acima de R$ 1.500 (ex.: R$ 2.000). CE4: valor não múltiplo de R$ 50 (ex.: R$ 75). CE5: valor zero ou negativo (ex.: R$ 0 ou -R$ 100). CE6: valor superior ao saldo disponível (ex.: saldo R$ 300, saque R$ 500). CE7: valor não numérico (ex.: "duzentos").',
      valoresLimite:
        'R$ 0 (abaixo do mínimo — rejeitado); R$ 50 (limite inferior — aceito); R$ 100 (logo acima do mínimo — aceito); R$ 1.450 (logo abaixo do máximo — aceito); R$ 1.500 (limite superior — aceito); R$ 1.550 (acima do máximo — rejeitado).',
      casosTeste:
        'CT1: R$ 200, saldo R$ 1.000 → Autorizado. CT2: R$ 0, saldo R$ 500 → Rejeitado. CT3: R$ 50, saldo R$ 500 → Autorizado. CT4: R$ 1.500, saldo R$ 2.000 → Autorizado. CT5: R$ 1.550, saldo R$ 2.000 → Rejeitado. CT6: R$ 75, saldo R$ 500 → Rejeitado (não é múltiplo). CT7: R$ 500, saldo R$ 300 → Rejeitado (saldo insuficiente).',
      tecnicas:
        'CT1: Part. Equiv. (CE1). CT2: Val. Limite (abaixo do mínimo). CT3: Val. Limite (limite inferior). CT4: Val. Limite (limite superior). CT5: Val. Limite (acima do máximo). CT6: Part. Equiv. (CE4). CT7: Part. Equiv. (CE6).',
    },
    feedback:
      'Você aplicou corretamente particionamento de equivalência e análise de valor limite a um sistema com múltiplas regras de validação. Note que cada regra inválida gera uma classe própria, e que os valores-limite da faixa de valor de saque (R$ 50 e R$ 1.500) são os casos mais críticos para revelar defeitos de operadores de comparação.',
  },

  /* ─── 10. Pratica Independente — Controle de Acesso Academia ─ */
  independentPracticeRich: {
    scenario:
      'Um sistema de controle de acesso a uma academia verifica se um visitante pode entrar. Regras: a idade deve ser maior ou igual a 16 anos; o plano contratado deve ser "basico", "standard" ou "premium" (qualquer outro valor é inválido); o acesso é liberado somente se o plano estiver com status "ativo" (planos "inativo" ou "suspenso" bloqueiam); visitantes com idade entre 16 e 17 anos precisam ter autorização dos responsáveis (campo booleano). Quando todas as condições são atendidas, o sistema exibe "Acesso liberado"; caso contrário, "Acesso negado" com o motivo.',
    tasks: [
      'Identifique as classes de equivalência válidas e inválidas para cada campo de entrada (idade, plano, status, autorização).',
      'Identifique os valores-limite relevantes (especialmente da idade).',
      'Identifique as decisões lógicas presentes no sistema para verificar cobertura de decisões.',
      'Proponha um conjunto mínimo de casos de teste, indicando a técnica usada em cada um.',
    ],
    fields: [
      {
        key: 'classes',
        label: 'Classes de equivalência por campo',
        description: 'Para cada campo (idade, plano, status, autorização) liste classes válidas e inválidas com representantes.',
        placeholder:
          'Idade: CE1 (>= 18) ... | Plano: CE4 (válida) "basico/standard/premium" ... | Status: CE6 (válida) "ativo" ... | Autorização: ...',
        color: '#1F8A5B',
      },
      {
        key: 'valoresLimite',
        label: 'Valores-limite relevantes',
        description: 'Concentre-se na idade — onde estão as fronteiras críticas?',
        placeholder: '15 → ... | 16 → ... | 17 → ... | 18 → ...',
        color: '#146B4A',
      },
      {
        key: 'decisoes',
        label: 'Decisões lógicas do sistema',
        description: 'Mapeie cada "se" do enunciado como uma decisão.',
        placeholder: 'D1: idade >= 16 ... | D2: plano é válido ... | D3: status é ativo ... | D4: idade entre 16 e 17 ... | D5: autorizado ...',
        color: '#0F3D2E',
      },
      {
        key: 'casosTeste',
        label: 'Conjunto mínimo de casos de teste (com técnica)',
        description: 'Pelo menos 6 casos cobrindo classes principais e limites; indique a técnica.',
        placeholder: 'CT1: idade=25, plano=premium, status=ativo → Acesso liberado (Part. Equiv.) | ...',
        color: '#4CAF50',
      },
    ],
    expectedAnswers: {
      classes:
        'Idade — CE1 (válida >= 18): acesso sem restrição de autorização, rep. 25 anos. CE2 (válida 16-17): exige autorização, rep. 16 anos. CE3 (inválida < 16): rep. 14 anos.\nPlano — CE4 (válida): "basico", "standard" ou "premium" (cada uma idealmente como subclasse). CE5 (inválida): qualquer outro valor, rep. "vip" ou vazio.\nStatus — CE6 (válida): "ativo". CE7 (inválida): "inativo" ou "suspenso".\nAutorização (apenas 16-17 anos) — CE8 (válida): autorizado = verdadeiro. CE9 (inválida): autorizado = falso.',
      valoresLimite:
        '15 (abaixo do mínimo — negado); 16 (limite inferior — exige autorização); 17 (último com restrição de autorização); 18 (primeiro sem restrição de autorização).',
      decisoes:
        'D1: idade >= 16 (verdadeiro/falso). D2: plano é válido (verdadeiro/falso). D3: status é "ativo" (verdadeiro/falso). D4: idade entre 16 e 17 (verdadeiro/falso). D5: autorizado = verdadeiro (avaliado apenas quando D4 é verdadeiro).',
      casosTeste:
        'CT1: 25, premium, ativo → Acesso liberado (Part. Equiv. CE1).\nCT2: 14, standard, ativo → Acesso negado: idade (Part. Equiv. CE3).\nCT3: 25, vip, ativo → Acesso negado: plano inválido (Part. Equiv. CE5).\nCT4: 25, basico, inativo → Acesso negado: plano inativo (Part. Equiv. CE7).\nCT5: 16, standard, ativo, autorizado=verdadeiro → Acesso liberado (Part. Equiv. CE2 + Val. Limite).\nCT6: 16, standard, ativo, autorizado=falso → Acesso negado: sem autorização (Part. Equiv. CE9).\nCT7: 15, standard, ativo → Acesso negado: idade (Val. Limite abaixo do mín.).\nCT8: 18, standard, ativo → Acesso liberado (Val. Limite primeiro sem restrição).',
    },
    criteria: [
      {
        label: 'Classes de equivalência por campo',
        weight: '25%',
        description: 'Identifica corretamente as classes válidas e inválidas para cada campo (idade, plano, status, autorização).',
      },
      {
        label: 'Valores-limite relevantes',
        weight: '25%',
        description: 'Identifica os limites críticos de idade (15, 16, 17, 18).',
      },
      {
        label: 'Decisões lógicas identificadas',
        weight: '25%',
        description: 'Lista as decisões condicionais do sistema corretamente.',
      },
      {
        label: 'Conjunto mínimo de casos de teste',
        weight: '25%',
        description: 'Propõe ao menos 6 casos cobrindo as principais classes e limites, com indicação de técnica.',
      },
    ],
    feedbackCorrect:
      'Excelente! Você aplicou as três técnicas — particionamento de equivalência, análise de valor limite e identificação de decisões lógicas — a um sistema com múltiplas regras de validação independentes. Esse é o tipo de análise esperado de um profissional de teste em situações reais.',
    feedbackIncorrect:
      'Revise o cenário campo por campo. Para cada campo, pergunte: quais valores são aceitos? Quais são rejeitados? A partir disso, as classes se formam. Em seguida, identifique os limites numéricos (campo de idade) e os pontos de fronteira. Por fim, mapeie cada "se" do sistema como uma decisão lógica. Revise os Blocos 4, 5 e 6.',
  },

  /* ─── 11. Avaliacao Final — 10 questoes (AF3-01 a AF3-10) ── */
  finalAssessmentQuestions: [
    {
      id: 'AF3-01',
      question: 'Qual é a principal distinção entre o teste de caixa preta e o teste de caixa branca?',
      options: [
        'A) O teste de caixa preta é realizado apenas por desenvolvedores; o de caixa branca, por usuários.',
        'B) O teste de caixa preta usa o comportamento externo do sistema para projetar os testes; o de caixa branca usa a estrutura interna do código.',
        'C) O teste de caixa preta verifica apenas funcionalidades; o de caixa branca, apenas desempenho.',
        'D) O teste de caixa preta ocorre após o de caixa branca no ciclo de desenvolvimento.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. A distinção fundamental é a fonte de informação usada para projetar os testes: caixa preta usa especificação/comportamento externo; caixa branca usa estrutura/código interno. Conteúdo: Blocos 2 e 3.',
      errorExplanation:
        'A distinção não é sobre quem executa nem sobre o tipo de requisito. É sobre a perspectiva adotada: comportamento externo (caixa preta) ou estrutura interna (caixa branca). Revise os Blocos 2 e 3.',
      reviewBlock: 'bloco-2',
    },
    {
      id: 'AF3-02',
      question:
        'Um campo de entrada aceita números inteiros entre 10 e 99. Usando particionamento de equivalência, quais são as classes corretas?',
      options: [
        'A) CE1 (válida): entre 10 e 99; CE2 (inválida): menor que 10; CE3 (inválida): maior que 99.',
        'B) CE1 (válida): entre 10 e 99; CE2 (inválida): qualquer outro número.',
        'C) CE1 (válida): entre 1 e 100; CE2 (inválida): 0 e números negativos.',
        'D) CE1 (válida): exatamente 10 ou 99; CE2 (inválida): todos os outros valores.',
      ],
      correctIndex: 0,
      explanation:
        'Correto. Para uma faixa numérica [10, 99], o particionamento produz: uma classe válida (10 a 99), uma classe inválida abaixo do mínimo (< 10) e uma classe inválida acima do máximo (> 99). Conteúdo: Bloco 4.',
      errorExplanation:
        'O particionamento de equivalência para uma faixa numérica produz tipicamente três classes: abaixo do mínimo (inválida), dentro da faixa (válida) e acima do máximo (inválida). Revise o Bloco 4.',
      reviewBlock: 'bloco-4',
    },
    {
      id: 'AF3-03',
      question:
        'Para um campo que aceita valores entre 1 e 50, quais valores a análise de valor limite indica como mais críticos?',
      options: [
        'A) Apenas 1 e 50, pois são os extremos da faixa.',
        'B) 0, 1, 2, 49, 50 e 51.',
        'C) 25, pois é o valor central da faixa.',
        'D) 1, 25 e 50, para cobrir início, meio e fim.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. A análise de valor limite seleciona: 0 (abaixo), 1 (limite inferior), 2 (logo acima), 49 (logo abaixo do máximo), 50 (limite superior) e 51 (acima). Esses seis valores são os mais prováveis de revelar defeitos de operadores de comparação. Conteúdo: Bloco 5.',
      errorExplanation:
        'A análise de valor limite não inclui apenas os extremos: inclui os valores imediatamente adjacentes a eles. Para [1, 50]: 0, 1, 2, 49, 50 e 51. Revise o Bloco 5.',
      reviewBlock: 'bloco-5',
    },
    {
      id: 'AF3-04',
      question:
        'Um sistema aceita senhas com 6 a 12 caracteres. Qual conjunto de casos de teste cobre melhor a análise de valor limite?',
      options: [
        'A) Senhas de 1, 6 e 12 caracteres.',
        'B) Senhas de 5, 6, 7, 11, 12 e 13 caracteres.',
        'C) Senhas de 6, 9 e 12 caracteres.',
        'D) Senhas de 6 e 12 caracteres apenas.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. Os valores críticos são: 5 (abaixo do mínimo — inválido), 6 (limite inferior — válido), 7 (logo acima — válido), 11 (logo abaixo do máximo — válido), 12 (limite superior — válido) e 13 (acima do máximo — inválido). Conteúdo: Bloco 5.',
      errorExplanation:
        'Apenas os extremos (6 e 12) não são suficientes. A análise de valor limite exige também os vizinhos imediatos dos limites: 5, 7, 11 e 13. Revise o Bloco 5.',
      reviewBlock: 'bloco-5',
    },
    {
      id: 'AF3-05',
      question: 'Qual dos cenários abaixo é um exemplo de teste de caixa branca?',
      options: [
        'A) Um testador verifica se o sistema de cálculo de frete retorna o valor correto para diferentes pesos de pacote, usando apenas a especificação do serviço.',
        'B) Um usuário valida se o aplicativo de delivery exibe corretamente o status do pedido após o pagamento.',
        'C) Um desenvolvedor projeta casos de teste para garantir que o ramo "else" de uma condicional no módulo de cálculo de impostos seja executado.',
        'D) Um analista de negócios testa o sistema de folha de pagamento executando os fluxos descritos nos requisitos.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. O teste de caixa branca usa a estrutura interna do código — neste caso, o ramo "else" de uma condicional — como guia para o projeto dos casos de teste. Conteúdo: Bloco 3.',
      errorExplanation:
        'O critério de caixa branca é o uso da estrutura interna do código. Os demais cenários usam especificação, comportamento externo ou requisitos — características de caixa preta. Revise o Bloco 3.',
      reviewBlock: 'bloco-3',
    },
    {
      id: 'AF3-06',
      question:
        'Um sistema de concessão de crédito possui o seguinte código:\n  se score >= 700 -> "Aprovado"\n  senão se score >= 500 -> "Análise adicional"\n  senão -> "Reprovado"\nQuantos casos de teste são necessários para atingir cobertura de decisões?',
      options: [
        'A) 2 casos de teste.',
        'B) 3 casos de teste.',
        'C) 6 casos de teste.',
        'D) 4 casos de teste.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. Há duas decisões encadeadas com três caminhos: score >= 700 (Aprovado), 500 <= score < 700 (Análise) e score < 500 (Reprovado). 3 casos cobrem todos os caminhos. Conteúdo: Bloco 6.',
      errorExplanation:
        'Decisões encadeadas (if/else if/else) geram um caminho para cada ramo. Com dois if encadeados, há 3 caminhos possíveis. Revise o Bloco 6.',
      reviewBlock: 'bloco-6',
    },
    {
      id: 'AF3-07',
      question: 'Qual afirmação sobre particionamento de equivalência e análise de valor limite é CORRETA?',
      options: [
        'A) O particionamento de equivalência é suficiente por si só, pois já testa os limites das faixas de entrada.',
        'B) A análise de valor limite complementa o particionamento, pois foca nos pontos de fronteira onde defeitos de implementação são mais frequentes.',
        'C) As duas técnicas são equivalentes e produzem sempre os mesmos casos de teste.',
        'D) A análise de valor limite substitui o particionamento quando a faixa é numérica.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. O particionamento define as classes e seleciona representantes internos. A análise de valor limite complementa, focando nos pontos de fronteira — exatamente onde operadores errados (>, >=, <, <=) causam defeitos. Conteúdo: Blocos 4 e 5.',
      errorExplanation:
        'As técnicas são complementares, não equivalentes nem substitutas. O particionamento reduz o espaço de teste; a análise de valor limite adiciona precisão nos limites. Revise os Blocos 4 e 5.',
      reviewBlock: 'bloco-5',
    },
    {
      id: 'AF3-08',
      question:
        'Um campo de entrada de sistema de notas escolares aceita valores de 0,0 a 10,0 com uma casa decimal. Qual é a classe de equivalência inválida correta para entradas acima do valor máximo?',
      options: [
        'A) Valores maiores que 10,0, como 10,1 ou 11,0, que devem ser rejeitados.',
        'B) O valor 10,0 exato, pois é o limite superior e pode causar erros.',
        'C) Valores maiores que 9,9, pois o limite real seria 9,9 com uma casa decimal.',
        'D) Não existe classe inválida acima do máximo, pois o campo é de texto livre.',
      ],
      correctIndex: 0,
      explanation:
        'Correto. Qualquer valor acima de 10,0 — como 10,1 — forma a classe inválida "acima do máximo". O valor 10,0 é válido (é o limite superior incluso na faixa). Conteúdo: Bloco 4.',
      errorExplanation:
        'O limite superior é 10,0 (incluso). Valores acima de 10,0 formam a classe inválida. Revise o Bloco 4.',
      reviewBlock: 'bloco-4',
    },
    {
      id: 'AF3-09',
      question: 'Qual dos critérios abaixo é mais rigoroso do que a cobertura de instruções?',
      options: [
        'A) Cobertura de instruções é o critério mais rigoroso existente.',
        'B) Cobertura de decisões, pois exige que cada resultado possível de cada decisão seja exercitado.',
        'C) Particionamento de equivalência, pois identifica mais classes de entrada.',
        'D) Análise de valor limite, pois testa mais pontos do domínio de entrada.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. Cobertura de decisões é mais rigorosa que cobertura de instruções: ela exige que cada resultado (verdadeiro e falso) de cada decisão seja exercitado, o que requer mais casos de teste. Conteúdo: Bloco 6.',
      errorExplanation:
        'Cobertura de instruções é o critério mais fraco dos de caixa branca. Cobertura de decisões é mais rigorosa. Particionamento e valor limite são técnicas de caixa preta, não critérios de cobertura de código. Revise o Bloco 6.',
      reviewBlock: 'bloco-6',
    },
    {
      id: 'AF3-10',
      question:
        'Analise as afirmações e identifique a correta:\nI. O teste de caixa preta pode ser projetado antes do código existir, a partir dos requisitos.\nII. O teste de caixa branca garante que o comportamento externo do sistema está correto para todos os usuários.\nIII. A análise de valor limite testa valores exatamente nos limites das faixas de entrada e imediatamente adjacentes a eles.\nIV. O particionamento de equivalência elimina a necessidade de qualquer outro caso de teste.',
      options: ['A) Apenas I e III.', 'B) Apenas II e IV.', 'C) I, II e III.', 'D) I, II, III e IV.'],
      correctIndex: 0,
      explanation:
        'Correto. I é verdadeira: caixa preta é baseada em especificação. III é verdadeira: análise de valor limite testa os limites e seus vizinhos. II é falsa: caixa branca garante cobertura de código, não correção para todos os usuários. IV é falsa: particionamento é complementar, não substituto. Conteúdo: Blocos 2, 4 e 5.',
      errorExplanation:
        'A afirmação II confunde cobertura de código com correção de comportamento. A afirmação IV confunde redução de casos com eliminação de outras técnicas. Somente I e III estão corretas. Revise os Blocos 2, 3, 4 e 5.',
      reviewBlock: 'bloco-5',
    },
  ],

  reviewMap: {
    'AF3-01': ['bloco-2', 'bloco-3'],
    'AF3-02': ['bloco-4'],
    'AF3-03': ['bloco-5'],
    'AF3-04': ['bloco-5'],
    'AF3-05': ['bloco-3'],
    'AF3-06': ['bloco-6'],
    'AF3-07': ['bloco-4', 'bloco-5'],
    'AF3-08': ['bloco-4'],
    'AF3-09': ['bloco-6'],
    'AF3-10': ['bloco-2', 'bloco-3', 'bloco-4', 'bloco-5'],
  },

  /* ─── 12. Desafio Aplicado Final — Cadastro de Salario ───── */
  finalChallenge: {
    enunciado:
      'Leia o cenário a seguir e aplique sistematicamente as técnicas estudadas nesta unidade. Para o sistema descrito, identifique entradas válidas e inválidas, classes de equivalência, valores-limite, decisões lógicas e proponha um conjunto mínimo de casos de teste, indicando a técnica usada em cada um. Esta atividade avalia sua capacidade de derivar casos de teste eficazes a partir de uma especificação real e integradora.',
    scenario:
      'Um sistema de cadastro de funcionários possui um campo de validação de salário mensal bruto. As regras são:\n\n1. O salário deve ser um valor numérico decimal positivo.\n2. O valor mínimo aceito é R$ 1.412,00 (salário mínimo vigente no exemplo).\n3. O valor máximo aceito é R$ 30.000,00.\n4. Salários acima de R$ 10.000,00 exigem a marcação obrigatória do campo "cargo gerencial" (booleano).\n5. Valores negativos, zero, campos vazios e valores não numéricos devem ser rejeitados.\n\nQuando o salário é válido e todas as restrições são atendidas, o sistema exibe "Cadastro realizado com sucesso." Caso contrário, exibe "Erro de validação: [motivo]".',
    fields: [
      {
        key: 'entradasValidasInvalidas',
        label: '1. Entradas válidas e inválidas identificadas',
        description: 'Liste primeiro o que o sistema aceita e o que rejeita, em alto nível.',
        placeholder: 'Válidas: ... | Inválidas: ...',
        color: '#1F8A5B',
      },
      {
        key: 'classesEquivalencia',
        label: '2. Classes de equivalência',
        description: 'Cada motivo distinto de aceitação/rejeição é uma classe.',
        placeholder: 'CE1 (válida sem gerência): ... | CE2 (válida com gerência): ... | CE3 (abaixo do mín.): ... | CE4 (acima do máx.): ... | CE5 (zero/negativo): ... | CE6 (vazio): ... | CE7 (não numérico): ... | CE8 (acima de R$ 10k sem gerência): ...',
        color: '#146B4A',
      },
      {
        key: 'valoresLimite',
        label: '3. Valores-limite a testar',
        description: 'Mínimo (R$ 1.412,00), máximo (R$ 30.000,00) e fronteira de cargo gerencial (R$ 10.000,00).',
        placeholder: 'R$ 1.411,99 → ... | R$ 1.412,00 → ... | R$ 10.000,00 → ... | R$ 10.001,00 → ... | R$ 30.000,00 → ... | R$ 30.001,00 → ...',
        color: '#0F3D2E',
      },
      {
        key: 'decisoesLogicas',
        label: '4. Decisões lógicas do sistema',
        description: 'Cada condicional do enunciado corresponde a uma decisão.',
        placeholder: 'D1: salário >= 1.412 ... | D2: salário <= 30.000 ... | D3: salário > 10.000 ... | D4: cargo_gerencial = verdadeiro ...',
        color: '#4CAF50',
      },
      {
        key: 'casosTeste',
        label: '5. Conjunto mínimo de casos de teste (ao menos 8)',
        description: 'Inclua salário, cargo gerencial, resultado esperado e técnica.',
        placeholder: 'CT1: ... | CT2: ... | CT3: ... | CT4: ... | CT5: ... | CT6: ... | CT7: ... | CT8: ...',
        color: '#E53935',
      },
    ],
    expectedAnswers: {
      entradasValidasInvalidas:
        'Válidas: salário numérico entre R$ 1.412,00 e R$ 10.000,00 (sem exigência de cargo gerencial); salário numérico entre R$ 10.001,00 e R$ 30.000,00 com cargo gerencial = verdadeiro.\nInválidas: salário abaixo de R$ 1.412,00; salário acima de R$ 30.000,00; salário zero ou negativo; campo vazio; valor não numérico; salário acima de R$ 10.000,00 sem marcar cargo gerencial.',
      classesEquivalencia:
        'CE1 (válida): R$ 1.412,00 a R$ 10.000,00 — rep. R$ 5.000,00.\nCE2 (válida com restrição): R$ 10.001,00 a R$ 30.000,00 + cargo gerencial = verdadeiro — rep. R$ 15.000,00.\nCE3 (inválida): abaixo de R$ 1.412,00 — rep. R$ 1.000,00.\nCE4 (inválida): acima de R$ 30.000,00 — rep. R$ 35.000,00.\nCE5 (inválida): zero ou negativo — rep. R$ 0 ou -R$ 500.\nCE6 (inválida): campo vazio.\nCE7 (inválida): valor não numérico — rep. "dois mil".\nCE8 (inválida): acima de R$ 10.000 sem cargo gerencial — rep. R$ 15.000 + gerencial = falso.',
      valoresLimite:
        'R$ 1.411,99 (abaixo do mínimo — inválido); R$ 1.412,00 (limite inferior — válido); R$ 1.413,00 (logo acima do mínimo — válido); R$ 9.999,00 (logo abaixo do limite de gerência — válido sem exigência); R$ 10.000,00 (no limite de gerência — válido sem exigência); R$ 10.001,00 (logo acima do limite — exige cargo gerencial); R$ 29.999,00 (logo abaixo do máximo — válido com gerência); R$ 30.000,00 (limite superior — válido com gerência); R$ 30.001,00 (acima do máximo — inválido).',
      decisoesLogicas:
        'D1: salário >= 1.412,00 (verdadeiro/falso). D2: salário <= 30.000,00 (verdadeiro/falso). D3: salário > 10.000,00 (verdadeiro/falso). D4: cargo_gerencial = verdadeiro (avaliado quando D3 = verdadeiro).',
      casosTeste:
        'CT1: R$ 5.000,00 — Cadastro realizado (Part. Equiv. CE1).\nCT2: R$ 15.000,00 + gerencial=verdadeiro — Cadastro realizado (Part. Equiv. CE2).\nCT3: R$ 15.000,00 + gerencial=falso — Erro: cargo gerencial obrigatório (Part. Equiv. CE8).\nCT4: R$ 1.000,00 — Erro: salário abaixo do mínimo (Part. Equiv. CE3).\nCT5: R$ 35.000,00 + gerencial=verdadeiro — Erro: salário acima do máximo (Part. Equiv. CE4).\nCT6: R$ 1.411,99 — Erro: abaixo do mínimo (Val. Limite).\nCT7: R$ 1.412,00 — Cadastro realizado (Val. Limite — limite inferior).\nCT8: R$ 30.000,00 + gerencial=verdadeiro — Cadastro realizado (Val. Limite — limite superior).\nCT9: R$ 30.001,00 + gerencial=verdadeiro — Erro: acima do máximo (Val. Limite).\nCT10: R$ 10.000,00 — Cadastro realizado sem exigência gerencial (Val. Limite — limite D3).\nCT11: R$ 10.001,00 + gerencial=verdadeiro — Cadastro realizado (Val. Limite — acima limite D3).\nCT12: R$ 0 — Erro: valor inválido (Part. Equiv. CE5).\nCT13: campo vazio — Erro: campo vazio (Part. Equiv. CE6).\nCT14: "dois mil" — Erro: valor não numérico (Part. Equiv. CE7).',
    },
    rubric: [
      {
        level: 'Insuficiente',
        range: '0 – 25%',
        achievementCount: 'Menos de 3 elementos corretos',
        description:
          'O aluno não demonstrou compreensão das técnicas. Revisitar todos os blocos da unidade, especialmente os Blocos 4 e 5.',
      },
      {
        level: 'Básico',
        range: '26 – 50%',
        achievementCount: '3–4 elementos corretos',
        description:
          'O aluno compreendeu parte da análise. Revisar especialmente as classes inválidas e os valores-limite. Blocos 4 e 5.',
      },
      {
        level: 'Satisfatório',
        range: '51 – 75%',
        achievementCount: '5–6 elementos corretos',
        description:
          'O aluno demonstra boa compreensão. Algumas imprecisões nos valores-limite ou nas decisões. Revisar o Bloco 6.',
      },
      {
        level: 'Excelente',
        range: '76 – 100%',
        achievementCount: '7 ou mais elementos corretos',
        description:
          'O aluno identificou corretamente as classes, os limites, as decisões e construiu um conjunto eficaz de casos de teste. Domínio excelente da unidade.',
      },
    ],
    finalFeedback:
      'Ao concluir este desafio, você aplicou sistematicamente as três técnicas centrais desta unidade — particionamento de equivalência, análise de valor limite e identificação de decisões lógicas — a um sistema real com múltiplas regras de validação. A capacidade de derivar casos de teste eficazes a partir de especificações é uma das habilidades mais valorizadas em profissionais de qualidade de software. Você está pronto para avançar para a Unidade 4.',
  },

  /* ─── Estrutura legada (mantida para compatibilidade) ──────── */
  content: [],
  examples: [],
  guidedPractice: {
    question: '',
    context: '',
    options: [],
    correctAnswers: [],
    explanation: '',
  },
  independentPractice: {
    title: '',
    scenario: '',
    fields: [],
    sampleAnswer: {},
  },
  challenge: {
    title: '',
    scenario: '',
    tasks: [],
    fields: [],
    expectedReport: { title: '', steps: '', expected: '', actual: '', severity: '' },
  },
};
