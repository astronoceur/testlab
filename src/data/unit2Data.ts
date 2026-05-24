import { Unit } from '../types';

export const unit2: Unit = {
  id: 2,
  title: 'Unidade 2',
  subtitle: 'Tipos de Teste de Software',
  description:
    'Conheça os quatro principais níveis de teste — unitário, integração, sistema e aceitação — e aprenda quando e por que cada um deve ser aplicado ao longo do ciclo de desenvolvimento.',
  icon: '🐞',
  meta: {
    cargaHoraria: '8 horas',
    nivel: 'Introdutório',
    referencia: 'CTFL / ISTQB',
    abordagem: 'Eventos de Gagné',
  },
  objectives: [
    'Identificar os quatro principais tipos de teste de software — unitário, integração, sistema e aceitação — e descrever as características de cada um.',
    'Compreender o objetivo específico de cada tipo de teste e o que ele busca verificar no sistema.',
    'Relacionar cada tipo de teste com a etapa correspondente do ciclo de desenvolvimento de software.',
    'Classificar situações práticas de teste, determinando qual tipo é mais adequado para cada cenário descrito.',
    'Justificar por que a aplicação de testes em múltiplos níveis é mais eficaz do que testar apenas em uma etapa final.',
  ],

  situationProblem: {
    title: 'A Atualização que Derrubou o Sistema de Agendamento',
    paragraphs: [
      'Uma clínica médica de médio porte utilizava um sistema de agendamento online desenvolvido internamente. O sistema permitia que pacientes marcassem consultas, escolhessem especialidades e recebessem confirmação automática por e-mail. Após meses de operação estável, a equipe de desenvolvimento realizou uma atualização para adicionar o suporte a agendamentos recorrentes — pacientes com doenças crônicas poderiam agendar consultas mensais de forma automática.',
      'A nova funcionalidade foi desenvolvida por um único programador em duas semanas e implantada em produção numa sexta-feira à tarde. Na manhã de segunda-feira, a recepção da clínica foi tomada por ligações de pacientes confusos: alguns relatavam ter recebido confirmações de consultas que não existiam; outros, que agendamentos já marcados haviam desaparecido. O módulo de notificação por e-mail estava enviando mensagens para os destinatários errados, e o banco de dados mostrava registros duplicados de vários pacientes.',
      'A investigação revelou uma série de problemas encadeados: a função que gerava os agendamentos recorrentes não validava a disponibilidade do médico antes de criar os registros; o módulo de notificação não havia sido atualizado para lidar com o novo tipo de agendamento e continuava usando a lógica antiga; e o sistema completo não havia sido verificado quanto ao desempenho com o volume adicional de registros.',
    ],
    reflectionQuestions: [
      'Um teste da função de geração de agendamentos, executado de forma isolada, teria revelado todos esses problemas?',
      'O problema entre o módulo de agendamento e o módulo de notificação é do tipo que um teste de uma só função consegue detectar?',
      'Se você fosse responsável pelos testes dessa atualização, em quantos momentos diferentes você testaria o sistema?',
    ],
    conclusion:
      'Este cenário ilustra um princípio central do teste de software: diferentes tipos de problema exigem diferentes tipos de teste. Um único nível de verificação raramente é suficiente para garantir a qualidade de um sistema real. Ao longo desta unidade, você aprenderá a identificar e aplicar cada nível de teste de forma estratégica.',
  },

  priorKnowledgeQuestions: [
    {
      id: 'PK2-1',
      question:
        'Na Unidade 1, você aprendeu que o teste de software não pode provar que um sistema é livre de defeitos, mas pode revelar sua presença. Com base nesse princípio, qual afirmação sobre a necessidade de diferentes tipos de teste é correta?',
      options: [
        'A) Como o teste não pode ser exaustivo, basta aplicar um único tipo de teste ao final do desenvolvimento para maximizar a cobertura.',
        'B) Diferentes tipos de teste focam em aspectos distintos do sistema, aumentando a probabilidade de revelar defeitos que um único tipo não detectaria.',
        'C) A aplicação de múltiplos tipos de teste é redundante, pois qualquer defeito encontrado em um nível também seria encontrado em outro.',
        'D) O teste exaustivo é possível quando se combinam todos os tipos de teste disponíveis.',
      ],
      correctIndex: 1,
      explanation:
        'Correto! Cada tipo de teste possui um foco e um objetivo específicos. A combinação estratégica de múltiplos tipos aumenta a cobertura e a probabilidade de revelar defeitos distintos. Esse princípio é o fundamento da Unidade 2.',
      errorExplanation:
        'Relembre que o teste não pode ser exaustivo e que nenhum único tipo cobre todos os aspectos do sistema. A combinação de tipos complementares é a abordagem recomendada pela indústria. Revise o conceito de objetivos do teste da Unidade 1.',
    },
    {
      id: 'PK2-2',
      question:
        'Um desenvolvedor escreve uma função em Python que calcula o valor total de um pedido aplicando desconto. Ele deseja verificar se a função retorna os valores corretos para diferentes entradas antes de integrá-la ao restante do sistema. Qual descrição melhor caracteriza o que ele pretende fazer?',
      options: [
        'A) Verificar o comportamento do sistema completo em condições reais de uso.',
        'B) Validar se o sistema atende às necessidades do usuário final em produção.',
        'C) Testar um componente individual de forma isolada, antes de integrá-lo ao sistema.',
        'D) Avaliar a interação entre o módulo de pedidos e o módulo de pagamentos.',
      ],
      correctIndex: 2,
      explanation:
        'Correto! Testar uma função de forma isolada, antes de integrá-la, é a essência do teste unitário — um dos tipos que você estudará nesta unidade.',
      errorExplanation:
        'Atenção: o desenvolvedor está testando apenas uma função, isoladamente, sem envolver outros módulos. Isso não é um teste do sistema completo nem uma avaliação do usuário. Você aprenderá sobre esse tipo específico de teste no Bloco 2.',
    },
    {
      id: 'PK2-3',
      question:
        'Em um sistema de e-commerce, o módulo de carrinho de compras funciona corretamente de forma isolada e o módulo de pagamentos também foi testado individualmente sem erros. No entanto, ao tentar finalizar uma compra, o sistema falha porque o carrinho envia os dados do pedido em um formato que o módulo de pagamentos não reconhece. Qual conceito melhor descreve esse tipo de problema?',
      options: [
        'A) Um erro humano que gerou um defeito no módulo de carrinho.',
        'B) Uma falha que só poderia ser detectada por testes de aceitação realizados com usuários reais.',
        'C) Um problema de integração entre módulos, que não é detectável por testes de cada componente em isolamento.',
        'D) Uma falha de sistema causada por requisitos incompletos.',
      ],
      correctIndex: 2,
      explanation:
        'Excelente! O problema descrito é clássico de integração: cada parte funciona isoladamente, mas a comunicação entre elas está incorreta. Esse é exatamente o tipo de problema que o teste de integração busca revelar — tema central do Bloco 3.',
      errorExplanation:
        'Componentes funcionando em isolamento não garantem que funcionarão juntos. O problema de formato de dados entre módulos é típico de uma falha de integração, não detectável por testes unitários isolados. Aprofunde-se no Bloco 3.',
    },
  ],

  theoryBlocks: [
    {
      id: 'bloco-1',
      number: 1,
      title: 'Visão Geral sobre Tipos e Níveis de Teste',
      icon: '🔍',
      explanation: [
        'Quando falamos em "tipos de teste" ou "níveis de teste", estamos nos referindo a uma organização sistemática das atividades de teste ao longo do ciclo de desenvolvimento de software. Sistemas de software são compostos por camadas — desde funções e classes individuais até módulos integrados e, finalmente, o sistema como um todo funcionando em seu ambiente real. Cada camada apresenta riscos e possibilidades de defeitos distintos, e por isso exige uma abordagem de teste específica.',
        'A literatura de engenharia de software e os padrões internacionais como o CTFL/ISTQB organizam os testes em quatro níveis principais, que podem ser vistos como uma progressão lógica: teste unitário, teste de integração, teste de sistema e teste de aceitação. Esses níveis não são mutuamente exclusivos — são complementares. Um defeito encontrado no nível unitário é mais barato de corrigir do que o mesmo defeito encontrado apenas no teste de sistema.',
        'Cada nível de teste possui um objeto de teste (o que é verificado), um objetivo principal (o que se quer descobrir), um ambiente de execução (onde o teste ocorre) e critérios de entrada e saída (quando começar e quando encerrar). Compreender esses elementos é o que permite ao profissional de qualidade planejar testes eficazes e justificar as decisões de quando e como testar.',
      ],
      example: {
        title: 'Exemplo — Folha de Pagamento',
        body:
          'Imagine um sistema de folha de pagamento composto por módulos de cadastro de funcionários, cálculo de salário, geração de holerites e envio por e-mail. Cada um desses módulos pode ser testado individualmente (teste unitário). A troca de dados entre o cálculo de salário e a geração de holerites pode ser testada (integração). O sistema completo de folha, processando um mês inteiro, pode ser verificado (sistema). E um profissional de RH pode validar se o sistema atende aos requisitos legais e operacionais da empresa (aceitação).',
      },
      observation: {
        title: 'Terminologia',
        body:
          'A denominação "tipos de teste" pode se referir a diversas classificações: por nível (unitário, integração, sistema, aceitação), por objetivo (funcional, não funcional, estrutural) ou por técnica de projeto (caixa-branca, caixa-preta). Nesta unidade, o foco é nos níveis de teste, que são os mais amplamente abordados nos exames CTFL e na indústria.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Numere de 1 a 4 os níveis de teste abaixo na ordem em que tipicamente são aplicados no desenvolvimento de software, do mais granular ao mais abrangente: (  ) Teste de Aceitação; (  ) Teste Unitário; (  ) Teste de Integração; (  ) Teste de Sistema.',
        placeholder: 'Escreva a ordem (ex.: Aceitação=4, Unitário=1, ...)',
        expectedAnswer:
          '1 — Teste Unitário; 2 — Teste de Integração; 3 — Teste de Sistema; 4 — Teste de Aceitação. A progressão vai do mais granular (componente individual) ao mais abrangente (validação com o usuário).',
      },
    },
    {
      id: 'bloco-2',
      number: 2,
      title: 'Teste Unitário',
      icon: '🧪',
      explanation: [
        'O teste unitário é o nível mais granular de teste de software. Seu objeto de teste é a menor unidade testável do sistema — tipicamente uma função, um método ou uma classe em linguagens orientadas a objetos. O objetivo central é verificar se cada unidade se comporta corretamente de acordo com sua especificação, de forma completamente isolada das demais partes do sistema.',
        'A palavra "isolamento" é fundamental aqui. Para garantir que apenas a unidade em questão está sendo verificada, as dependências externas — bancos de dados, serviços de rede, outros módulos ou APIs — são substituídas por substitutos controlados, conhecidos como stubs ou mocks. Dessa forma, uma falha no teste aponta diretamente para um problema na unidade testada, sem ambiguidade.',
        'Myers enfatiza que o teste unitário é mais eficaz quando realizado pelo próprio desenvolvedor, logo após a escrita do código. Práticas modernas como o Desenvolvimento Orientado por Testes (TDD) formalizam essa ideia ao exigir que os testes sejam escritos antes do código de produção.',
        'Quando aplicar: durante ou logo após a codificação de cada componente. Em projetos ágeis, é realizado continuamente a cada iteração; em projetos com TDD, antes do próprio código de produção. Objetivo principal: verificar se cada unidade executa corretamente sua função especificada, detectando defeitos introduzidos durante a codificação antes que o componente seja integrado ao restante do sistema.',
      ],
      example: {
        title: 'Exemplo — calcular_desconto(valor, percentual)',
        body:
          'Casos de teste unitário para essa função incluiriam: valor positivo com percentual válido (caso normal); percentual igual a zero (sem desconto); percentual igual a 100 (desconto total); valor negativo (condição inválida); percentual maior que 100 (condição inválida). Cada caso verifica um comportamento específico da função, sem envolver banco de dados ou outros módulos.',
      },
      observation: {
        title: 'Atenção',
        body:
          'O fato de todos os testes unitários passarem não garante que o sistema funciona corretamente. Componentes verificados em isolamento podem falhar quando interagem entre si. Por isso, o teste unitário é necessário, mas não suficiente.',
      },
      miniActivity: {
        type: 'truefalse',
        prompt:
          '"No teste unitário, é necessário que o banco de dados e os serviços externos estejam disponíveis e funcionando, pois o objetivo é testar a unidade em condições reais de produção."',
        options: ['Verdadeiro', 'Falso'],
        correctIndex: 1,
        expectedAnswer:
          'Falso. O teste unitário executa cada componente em isolamento, substituindo dependências externas por substitutos controlados (stubs/mocks). Isso garante que eventuais falhas sejam atribuídas exclusivamente à unidade testada.',
      },
    },
    {
      id: 'bloco-3',
      number: 3,
      title: 'Teste de Integração',
      icon: '🔗',
      explanation: [
        'Depois de verificados individualmente, os componentes de um sistema precisam ser combinados para formar módulos maiores e, eventualmente, o sistema completo. O teste de integração é o nível responsável por verificar se essa combinação funciona corretamente — isto é, se os componentes interagem entre si de acordo com o esperado.',
        'O objeto de teste no nível de integração é a interface entre componentes: os dados que um módulo envia para outro, os formatos esperados, os contratos de comunicação (como APIs) e os fluxos que envolvem múltiplas partes do sistema. Defeitos típicos incluem incompatibilidades de formato de dados, erros em chamadas entre módulos, problemas em comunicações via rede ou banco de dados e comportamentos inesperados em sequências que envolvem mais de um componente.',
        'Maldonado destaca que a integração pode ocorrer de diferentes formas. Na integração incremental, os componentes são adicionados e testados progressivamente — o que facilita a localização de defeitos. Na integração não incremental ("big bang"), todos os componentes são integrados de uma vez; defeitos são mais difíceis de localizar. A abordagem incremental (top-down ou bottom-up) é amplamente preferida pela indústria.',
        'Quando aplicar: após os componentes relevantes terem sido individualmente verificados. Em projetos ágeis, ocorre de forma contínua, frequentemente automatizado em pipelines de integração contínua (CI). Objetivo principal: verificar se os componentes e módulos do sistema interagem corretamente entre si, detectando defeitos nas interfaces e nos fluxos de dados entre partes distintas do sistema.',
      ],
      example: {
        title: 'Exemplo — Agendamento Médico',
        body:
          'Em um sistema de agendamento médico, o módulo de cadastro de pacientes envia dados para o módulo de verificação de disponibilidade. Um teste de integração verificaria: o módulo de cadastro envia os dados no formato correto? O módulo de disponibilidade os recebe e interpreta corretamente? O resultado da verificação é retornado ao módulo correto? Esses aspectos não são verificáveis por testes unitários de cada módulo individualmente.',
      },
      observation: {
        title: 'Atenção',
        body:
          'É comum que sistemas apresentem problemas de integração mesmo quando todos os componentes passaram nos testes unitários. Isso ocorre porque o teste unitário usa substitutos controlados (mocks/stubs), que podem não reproduzir exatamente o comportamento real do componente substituído.',
      },
      miniActivity: {
        type: 'truefalse',
        prompt:
          'Um sistema possui três módulos: Autenticação, Perfil de Usuário e Histórico de Acesso. Cada módulo foi testado unitariamente. Qual das afirmações descreve um caso de teste de integração adequado?',
        options: [
          'a) Verificar se a função de hash de senha dentro do módulo de Autenticação retorna o valor correto.',
          'b) Verificar se, após o login bem-sucedido no módulo de Autenticação, o módulo de Histórico de Acesso registra corretamente o evento.',
          'c) Verificar se a interface gráfica de login exibe mensagens de erro quando o usuário digita credenciais inválidas.',
        ],
        correctIndex: 1,
        expectedAnswer:
          'Alternativa b. É o único caso que verifica a interação entre dois módulos distintos (Autenticação e Histórico de Acesso), que é a essência do teste de integração.',
      },
    },
    {
      id: 'bloco-4',
      number: 4,
      title: 'Teste de Sistema',
      icon: '🖥️',
      explanation: [
        'O teste de sistema é o nível em que o sistema é avaliado como um todo integrado, verificando se ele atende aos requisitos especificados — tanto funcionais quanto não funcionais. Diferentemente dos níveis anteriores, que focam em partes do sistema, o teste de sistema trata o software como uma caixa-preta: o testador interage com o sistema da mesma forma que um usuário faria, sem necessariamente conhecer sua estrutura interna.',
        'O objeto de teste é o sistema completo, configurado em um ambiente que simule ou reproduza o ambiente de produção o mais fielmente possível. Os requisitos funcionais descrevem o que o sistema deve fazer; os requisitos não funcionais descrevem como ele deve se comportar (tempo de resposta, desempenho sob carga, segurança, usabilidade). O teste de sistema deve cobrir ambos.',
        'Sommerville observa que, nesse nível, os casos de teste são derivados dos requisitos — um documento formal ou um conjunto de histórias de usuário — e não do código. Tipos frequentemente associados ao nível de sistema incluem teste de desempenho, teste de carga, teste de segurança e teste de usabilidade.',
        'Quando aplicar: quando os componentes e módulos estão integrados e o sistema pode ser executado como um todo. Tipicamente antes da entrega ao cliente. Objetivo principal: verificar se o sistema completo atende aos requisitos funcionais e não funcionais especificados, em condições próximas ao uso real.',
      ],
      example: {
        title: 'Exemplo — Matrículas Acadêmicas',
        body:
          'Em um sistema de matrículas acadêmicas, um teste de sistema verificaria: um estudante consegue acessar o sistema, visualizar as disciplinas disponíveis, selecionar uma disciplina, confirmar a matrícula e receber a confirmação correta? Esse fluxo completo envolve autenticação, consulta ao banco de dados, regras de negócio e geração de confirmação — aspectos que só podem ser avaliados adequadamente no nível de sistema.',
      },
      observation: {
        title: 'Atenção',
        body:
          'O teste de sistema é tipicamente realizado pela equipe de teste, não pelos desenvolvedores. Isso contribui para uma perspectiva mais crítica e independente sobre o comportamento do sistema, o que aumenta a probabilidade de encontrar defeitos que a equipe de desenvolvimento pode ter ignorado por excesso de familiaridade com o código.',
      },
      miniActivity: {
        type: 'truefalse',
        prompt: 'Qual das situações abaixo representa um caso de teste de sistema?',
        options: [
          'a) Verificar se o método calcularJuros() retorna o valor correto para diferentes taxas.',
          'b) Verificar se o módulo de pagamento comunica corretamente o resultado ao módulo de comprovantes.',
          'c) Verificar se um usuário consegue realizar uma compra completa — do login ao comprovante — em menos de 10 segundos.',
          'd) Verificar se um gerente de loja confirma que o sistema atende ao fluxo de aprovação de descontos.',
        ],
        correctIndex: 2,
        expectedAnswer:
          'Alternativa c. É o único caso que verifica o sistema completo (fluxo end-to-end) com um critério de desempenho (tempo), típico do teste de sistema. A alternativa d descreve um teste de aceitação.',
      },
    },
    {
      id: 'bloco-5',
      number: 5,
      title: 'Teste de Aceitação',
      icon: '✅',
      explanation: [
        'O teste de aceitação é o último nível formal de teste antes que o sistema seja entregue ao cliente ou implantado em produção. Seu objetivo é validar se o sistema está pronto para uso — isto é, se ele satisfaz as necessidades reais do negócio e dos usuários finais, não apenas se está tecnicamente correto de acordo com os requisitos documentados.',
        'É frequentemente conduzido pelo próprio cliente, pelos usuários finais ou por representantes do negócio, com ou sem apoio da equipe de qualidade. Ele se baseia em critérios de aceitação definidos previamente. O resultado não é "passou" ou "falhou" no sentido técnico, mas sim "aceito" ou "não aceito" para uso em produção.',
        'Dois tipos principais são amplamente reconhecidos. O Teste de Aceitação pelo Usuário (UAT) é conduzido por usuários reais em ambiente que simula produção; o teste alpha ocorre no ambiente do desenvolvedor com usuários selecionados, e o teste beta é realizado pelos próprios usuários em seus ambientes reais. Além do UAT, o teste de aceitação contratual verifica se o sistema atende aos critérios em contrato, e o teste de aceitação regulatório garante conformidade com normas, leis ou regulamentações.',
        'Quando aplicar: após os testes de sistema, imediatamente antes da implantação. Objetivo principal: validar se o sistema está pronto para entrega e uso em produção, confirmando que satisfaz as necessidades e expectativas dos usuários, clientes e partes interessadas.',
      ],
      example: {
        title: 'Exemplo — Gestão de Estoque',
        body:
          'Uma empresa contratou o desenvolvimento de um sistema de gestão de estoque. Após os testes de sistema, um representante do setor de logística executa o teste de aceitação: ele segue os fluxos reais de entrada e saída de produtos, verifica se os relatórios gerados correspondem aos seus processos e confirma se as notificações de estoque mínimo atendem à política interna da empresa. Se ele considerar o sistema adequado, o sistema é aceito para implantação.',
      },
      observation: {
        title: 'Atenção',
        body:
          'O teste de aceitação não é uma repetição do teste de sistema. Enquanto o teste de sistema verifica conformidade com requisitos técnicos, o teste de aceitação verifica adequação ao negócio e ao uso real. É possível que um sistema passe no teste de sistema e seja reprovado no de aceitação — por exemplo, se um fluxo tecnicamente correto for considerado inutilizável pelos usuários.',
      },
      miniActivity: {
        type: 'truefalse',
        prompt: 'Qual situação representa um caso de teste de aceitação?',
        options: [
          'a) A equipe de QA verifica se o sistema gera relatórios financeiros corretamente para todos os meses do ano.',
          'b) O diretor financeiro de uma empresa executa o fluxo de fechamento mensal e confirma se ele atende ao processo interno da empresa antes de autorizar a implantação.',
          'c) O desenvolvedor verifica se a função gerarRelatorio() retorna o objeto correto.',
        ],
        correctIndex: 1,
        expectedAnswer:
          'Alternativa b. O usuário de negócio (diretor financeiro) valida se o sistema atende ao processo real da empresa antes da implantação — essa é a essência do teste de aceitação.',
      },
    },
    {
      id: 'bloco-6',
      number: 6,
      title: 'Comparação entre os Tipos de Teste',
      icon: '📊',
      explanation: [
        'Para consolidar a compreensão de cada nível, é útil compará-los lado a lado. As diferenças não são apenas de escopo, mas também de objetivo, executor, ambiente e critérios de avaliação.',
        '• Objeto — Unitário: função/método/classe · Integração: interface entre módulos · Sistema: sistema completo · Aceitação: sistema em uso real.',
        '• Executor — Unitário: desenvolvedor · Integração: dev ou equipe de teste · Sistema: equipe de teste · Aceitação: cliente/usuário/negócio.',
        '• Abordagem — Unitário: caixa-branca · Integração: caixa-cinza · Sistema: caixa-preta · Aceitação: caixa-preta.',
        '• Ambiente — Unitário: isolado (mocks) · Integração: parcialmente integrado · Sistema: homologação · Aceitação: produção ou similar.',
        '• Objetivo — Unitário: verificar lógica interna · Integração: verificar interfaces · Sistema: verificar requisitos · Aceitação: validar adequação ao negócio.',
        '• Quando — Unitário: durante/após codificação · Integração: após testes unitários · Sistema: antes da entrega · Aceitação: antes da implantação.',
      ],
      example: {
        title: 'Comparação Resumida',
        body:
          'Pense nos níveis como camadas: o teste unitário verifica a peça; o teste de integração verifica como as peças se encaixam; o teste de sistema verifica a máquina montada; o teste de aceitação confirma que a máquina serve para o trabalho do cliente. Cada camada acrescenta uma perspectiva nova — e nenhuma substitui as anteriores.',
      },
      observation: {
        title: 'Atenção',
        body:
          'Na prática, as fronteiras entre os níveis podem ser fluidas. Em equipes ágeis, por exemplo, os testes de sistema e de aceitação podem acontecer dentro de um mesmo ciclo de iteração. O importante não é a rigidez dos limites, mas a consciência de que diferentes perspectivas e objetivos de verificação são necessários ao longo do desenvolvimento.',
      },
      miniActivity: {
        type: 'match',
        prompt: 'Associe cada situação ao nível de teste mais adequado:',
        pairs: [
          {
            left: 'A equipe de QA executa o sistema completo e verifica todos os requisitos funcionais documentados.',
            right: 'Teste de Sistema',
          },
          {
            left: 'O desenvolvedor verifica se calcularMedia() retorna NaN para listas vazias.',
            right: 'Teste Unitário',
          },
          {
            left: 'O cliente executa os fluxos do sistema e aprova sua implantação.',
            right: 'Teste de Aceitação',
          },
          {
            left: 'O testador verifica se o módulo de login passa os dados do usuário corretamente ao módulo de sessão.',
            right: 'Teste de Integração',
          },
        ],
        expectedAnswer:
          'Sistema completo verificado contra requisitos pela equipe de QA → Teste de Sistema. Método isolado → Teste Unitário. Cliente aprovando uso → Teste de Aceitação. Comunicação entre módulos → Teste de Integração.',
      },
    },
    {
      id: 'bloco-7',
      number: 7,
      title: 'Relação dos Tipos de Teste com o Ciclo de Desenvolvimento',
      icon: '🔄',
      explanation: [
        'A relação entre os níveis de teste e o ciclo de desenvolvimento não é acidental — ela é estrutural. O modelo V (V-Model), amplamente citado na literatura, formaliza essa correspondência: para cada fase do desenvolvimento (lado esquerdo do "V") existe um nível correspondente de teste (lado direito). Requisitos → Teste de Aceitação; Projeto de sistema → Teste de Sistema; Projeto de módulos → Teste de Integração; Codificação → Teste Unitário.',
        'Essa correspondência tem uma implicação prática importante: os casos de teste para cada nível podem e devem ser planejados em paralelo com a fase correspondente do desenvolvimento. Planejar os testes de aceitação enquanto os requisitos ainda estão sendo discutidos ajuda a identificar requisitos ambíguos ou incompletos — uma forma de prevenção de defeitos que antecede qualquer linha de código.',
        'Em abordagens ágeis, a correspondência não é tão rígida, mas o princípio permanece: quanto mais cedo um tipo de problema é detectado, menor o custo de correção. Por isso, equipes ágeis frequentemente automatizam os testes unitários e de integração para que sejam executados a cada nova modificação do código, mantendo uma rede de segurança contínua enquanto o sistema evolui.',
        'Sommerville destaca que uma das piores práticas é tratar todos os testes como uma única atividade final, realizada "quando o sistema estiver pronto". Isso elimina a oportunidade de detectar defeitos nos níveis mais baratos de corrigir e sobrecarrega o teste de sistema.',
      ],
      example: {
        title: 'Exemplo — Sistema de Controle de Ponto (4 meses)',
        body:
          'Os testes unitários das funções de cálculo de jornada ocorrem no primeiro mês, junto com a codificação. Os testes de integração entre o módulo de registro de ponto e o módulo de geração de relatórios ocorrem no segundo mês. No terceiro mês, o sistema completo é testado pela equipe de QA. No quarto mês, o gerente de RH realiza o teste de aceitação antes da implantação.',
      },
      observation: {
        title: 'Automação e CI/CD',
        body:
          'A automação de testes — especialmente dos níveis unitário e de integração — é essencial em contextos de entrega contínua (CI/CD). Sistemas que evoluem rapidamente não podem depender apenas de testes manuais para manter a qualidade. Uma suíte de testes automatizados que executa a cada push de código é prática recomendada pela indústria.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Por que é recomendado planejar os casos de teste de aceitação durante a fase de levantamento de requisitos, mesmo que o sistema ainda não exista?',
        placeholder: 'Justifique em 2-3 frases...',
        expectedAnswer:
          'Planejar os testes de aceitação junto com os requisitos ajuda a identificar requisitos ambíguos, incompletos ou conflitantes antes que se tornem defeitos de código. Além disso, os critérios de aceitação tornam os requisitos mais objetivos e verificáveis, reduzindo o risco de o sistema ser desenvolvido de forma diferente do que o cliente esperava.',
      },
    },
  ],

  demonstration: {
    requirement: 'Funcionalidade "Adicionar produto ao carrinho" de uma loja virtual.',
    situation:
      'O usuário busca um produto, clica em "Adicionar ao Carrinho" e o sistema registra o item, atualiza o totalizador e exibe uma confirmação. Veja como essa mesma funcionalidade é abordada em cada nível de teste — e quais problemas distintos cada nível pode revelar.',
    steps: [
      {
        id: 1,
        label: 'Teste Unitário',
        question: 'Como o nível unitário aborda essa funcionalidade?',
        body:
          'O que seria testado: a função adicionar_ao_carrinho(produto, quantidade, carrinho).\n\nObjetivo: verificar se a função calcula corretamente o subtotal, adiciona o item à lista interna e lida com entradas inválidas (quantidade zero, produto nulo, quantidade negativa).\n\nCasos de teste: produto válido com quantidade 1; produto válido com quantidade 5; quantidade igual a zero (deve retornar erro); produto inexistente (deve retornar erro).\n\nProblema que poderia ser identificado: a função aceita quantidade negativa sem validar, resultando em subtotal negativo no carrinho.\n\nPor que esse teste é adequado: a lógica de adição é uma unidade discreta de responsabilidade. Testá-la isoladamente — sem envolver banco de dados ou interface — permite identificar defeitos lógicos com rapidez e custo mínimo.',
        color: '#1F8A5B',
      },
      {
        id: 2,
        label: 'Teste de Integração',
        question: 'Como o nível de integração aborda essa funcionalidade?',
        body:
          'O que seria testado: a interação entre o módulo de carrinho e o módulo de inventário do sistema.\n\nObjetivo: verificar se, ao adicionar um produto ao carrinho, o módulo de inventário é consultado corretamente e retorna a disponibilidade atual.\n\nCasos de teste: adicionar produto com estoque disponível; adicionar produto com estoque zerado; adicionar quantidade maior que o estoque disponível.\n\nProblema que poderia ser identificado: o módulo de carrinho consulta o inventário com um parâmetro de produto no formato errado (ID numérico em vez de string UUID), fazendo com que o inventário sempre retorne "disponível", independentemente do estoque real.\n\nPor que esse teste é adequado: esse defeito é invisível nos testes unitários, pois cada módulo usa mocks que respondem corretamente. Somente na integração real entre os módulos o formato incorreto do parâmetro é detectado.',
        color: '#146B4A',
      },
      {
        id: 3,
        label: 'Teste de Sistema',
        question: 'Como o nível de sistema aborda essa funcionalidade?',
        body:
          'O que seria testado: o fluxo completo de compra, do login ao fechamento do pedido.\n\nObjetivo: verificar se o sistema completo executa o fluxo de compra conforme os requisitos, incluindo desempenho e comportamento sob carga.\n\nCasos de teste: usuário faz login, busca produto, adiciona ao carrinho, aplica cupom de desconto, seleciona forma de pagamento e conclui a compra; o mesmo fluxo com 100 usuários simultâneos.\n\nProblema que poderia ser identificado: com 50 usuários simultâneos adicionando itens ao carrinho, o tempo de resposta ultrapassa 8 segundos, violando o requisito de desempenho de menos de 2 segundos.\n\nPor que esse teste é adequado: requisitos de desempenho e fluxos end-to-end só podem ser verificados com o sistema completo operando em condições próximas ao uso real.',
        color: '#0F3D2E',
      },
      {
        id: 4,
        label: 'Teste de Aceitação',
        question: 'Como o nível de aceitação aborda essa funcionalidade?',
        body:
          'O que seria testado: se a experiência de compra atende às expectativas e ao processo de negócio da loja.\n\nObjetivo: validar se o cliente (dono da loja) considera o sistema adequado para suas operações antes do lançamento.\n\nCasos de teste: o gerente comercial da loja executa uma compra completa usando os produtos reais do catálogo; verifica se os relatórios de vendas são gerados conforme o processo interno; confirma se as notificações de pedido chegam no formato esperado.\n\nProblema que poderia ser identificado: o relatório de vendas agrupa produtos por categoria interna do sistema, mas o cliente precisa que sejam agrupados por fornecedor — o requisito não capturou adequadamente essa necessidade de negócio.\n\nPor que esse teste é adequado: essa discrepância entre o que o sistema faz e o que o negócio precisa só é detectável quando o usuário real interage com o sistema em um contexto real.',
        color: '#4CAF50',
      },
    ],
    lesson:
      'A mesma funcionalidade — adicionar produto ao carrinho — revela problemas completamente distintos em cada nível de teste. Nenhum nível sozinho seria capaz de detectar todos os problemas. Essa é a justificativa fundamental para a abordagem em múltiplos níveis.',
  },

  atividade11: {
    description:
      'Esta atividade combina os exercícios 2.1 (Classificação de Testes — 10 situações) e 2.2 (Quiz Avaliativo sobre Tipos de Teste — 8 questões). Você responde uma questão por vez em janelas separadas e recebe feedback imediato após cada escolha.',
    questions: [
      {
        id: '2.1.1',
        question:
          'Classifique a situação: "O desenvolvedor escreve um conjunto de assertivas para verificar se o método validarCPF(cpf) retorna verdadeiro para CPFs válidos e falso para CPFs inválidos, executando o método de forma completamente isolada."',
        options: ['A) Teste Unitário', 'B) Teste de Integração', 'C) Teste de Sistema', 'D) Teste de Aceitação'],
        correctIndex: 0,
        explanation:
          'Excelente! Testar um método individual em isolamento, sem dependências externas, caracteriza o teste unitário.',
        errorExplanation:
          'Atenção: o teste é de um método individual, em isolamento. Não há comunicação com outros módulos. Isso é teste unitário. Revise o Bloco 2.',
        reviewBlock: 'bloco-2',
      },
      {
        id: '2.1.2',
        question:
          'Classifique a situação: "A equipe de QA executa o sistema de gestão hospitalar completo em ambiente de homologação, percorrendo os fluxos de internação, prescrição e alta de pacientes, verificando se todos os requisitos funcionais e de desempenho estão sendo atendidos."',
        options: ['A) Teste Unitário', 'B) Teste de Integração', 'C) Teste de Sistema', 'D) Teste de Aceitação'],
        correctIndex: 2,
        explanation:
          'Correto! O sistema completo sendo avaliado em ambiente de homologação, contra os requisitos, é o teste de sistema em sua forma mais clássica.',
        errorExplanation:
          'Revise o Bloco 4. Quando o sistema completo é avaliado pela equipe de QA em ambiente controlado, contra requisitos documentados, isso caracteriza o teste de sistema.',
        reviewBlock: 'bloco-4',
      },
      {
        id: '2.1.3',
        question:
          'Classifique a situação: "Antes do lançamento de um novo módulo de pagamento, o responsável financeiro da empresa executa transações reais — pagamentos, estornos e consultas de extrato — para confirmar se o sistema atende aos processos internos."',
        options: ['A) Teste Unitário', 'B) Teste de Integração', 'C) Teste de Sistema', 'D) Teste de Aceitação'],
        correctIndex: 3,
        explanation:
          'Excelente! O critério de quem executa (usuário de negócio) e o critério de avaliação (adequação ao processo real) são marcadores do teste de aceitação.',
        errorExplanation:
          'Atenção: o executor é o usuário de negócio, não a equipe de QA. O objetivo é validar adequação ao processo real, não verificar requisitos técnicos. Isso é teste de aceitação. Revise o Bloco 5.',
        reviewBlock: 'bloco-5',
      },
      {
        id: '2.1.4',
        question:
          'Classifique a situação: "Após a codificação do módulo de notificações, o testador verifica se, quando o módulo de vendas registra um pedido aprovado, o módulo de notificações recebe o evento e envia corretamente o e-mail de confirmação ao cliente."',
        options: ['A) Teste Unitário', 'B) Teste de Integração', 'C) Teste de Sistema', 'D) Teste de Aceitação'],
        correctIndex: 1,
        explanation:
          'Perfeito! O foco é na interação entre dois módulos, não em um componente isolado nem no sistema completo.',
        errorExplanation:
          'O teste não é unitário (há dois módulos envolvidos) nem de sistema (não é o sistema completo). O foco é na comunicação entre módulos. Revise o Bloco 3.',
        reviewBlock: 'bloco-3',
      },
      {
        id: '2.1.5',
        question:
          'Classifique a situação: "A equipe usa um framework para verificar se calcularFrete(peso, distancia) retorna valores corretos para todas as faixas previstas na tabela de preços, usando valores de fronteira."',
        options: ['A) Teste Unitário', 'B) Teste de Integração', 'C) Teste de Sistema', 'D) Teste de Aceitação'],
        correctIndex: 0,
        explanation:
          'Correto! Técnicas como análise de valor de fronteira são frequentemente aplicadas no teste unitário para maximizar a cobertura de uma função.',
        errorExplanation:
          'Apesar da técnica avançada (valores de fronteira), o objeto é uma única função, testada em isolamento. Isso é teste unitário. Revise o Bloco 2.',
        reviewBlock: 'bloco-2',
      },
      {
        id: '2.1.6',
        question:
          'Classifique a situação: "O testador simula 500 usuários acessando simultaneamente o portal de matrículas da universidade durante o período de matrículas, monitorando o tempo de resposta e a estabilidade do sistema."',
        options: ['A) Teste Unitário', 'B) Teste de Integração', 'C) Teste de Sistema', 'D) Teste de Aceitação'],
        correctIndex: 2,
        explanation:
          'Excelente! Testes de carga e desempenho são típicos do teste de sistema, pois só fazem sentido com o sistema completo operando.',
        errorExplanation:
          'Testes de carga e desempenho requerem o sistema completo operando. Isso é teste de sistema, não unitário nem de integração. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },
      {
        id: '2.1.7',
        question:
          'Classifique a situação: "O testador verifica se, ao atualizar o cadastro de um cliente no módulo de CRM, as informações são propagadas corretamente para o módulo de faturamento, que utiliza esses dados para gerar boletos."',
        options: ['A) Teste Unitário', 'B) Teste de Integração', 'C) Teste de Sistema', 'D) Teste de Aceitação'],
        correctIndex: 1,
        explanation:
          'Correto! O ponto crítico é a comunicação entre módulos (CRM e faturamento), não o comportamento interno de cada um.',
        errorExplanation:
          'Não se trata de testar um módulo isolado, nem o sistema completo. O foco é na troca de dados entre CRM e faturamento. Revise o Bloco 3.',
        reviewBlock: 'bloco-3',
      },
      {
        id: '2.1.8',
        question:
          'Classifique a situação: "Um aplicativo de delivery está prestes a ser lançado. O gestor de operações da empresa simula pedidos reais, verifica os relatórios de entregas e confirma se os fluxos de cancelamento e reembolso estão de acordo com a política da empresa."',
        options: ['A) Teste Unitário', 'B) Teste de Integração', 'C) Teste de Sistema', 'D) Teste de Aceitação'],
        correctIndex: 3,
        explanation:
          'Excelente! A presença do usuário de negócio como executor e a verificação de adequação aos processos da empresa são características definitivas do teste de aceitação.',
        errorExplanation:
          'O critério de aceitação e o avaliador (usuário de negócio, não equipe de QA) definem isso como teste de aceitação. Revise o Bloco 5.',
        reviewBlock: 'bloco-5',
      },
      {
        id: '2.1.9',
        question:
          'Classifique a situação: "O desenvolvedor verifica se a classe GerenciadorDeSessao lança a exceção SessaoExpiradaException corretamente quando o token de autenticação tem mais de 30 minutos de inatividade, sem depender de banco de dados ou serviços externos."',
        options: ['A) Teste Unitário', 'B) Teste de Integração', 'C) Teste de Sistema', 'D) Teste de Aceitação'],
        correctIndex: 0,
        explanation:
          'Correto! Verificar o comportamento de uma classe em isolamento, incluindo o tratamento de exceções, é uma atividade típica de teste unitário.',
        errorExplanation:
          'O objeto é uma classe, sem dependências externas. O comportamento verificado (exceção) é interno à classe. Isso é teste unitário. Revise o Bloco 2.',
        reviewBlock: 'bloco-2',
      },
      {
        id: '2.1.10',
        question:
          'Classifique a situação: "A equipe de teste executa todos os casos de uso documentados do sistema de biblioteca, incluindo empréstimo, renovação, devolução e geração de multas, em ambiente de homologação, verificando conformidade com os requisitos."',
        options: ['A) Teste Unitário', 'B) Teste de Integração', 'C) Teste de Sistema', 'D) Teste de Aceitação'],
        correctIndex: 2,
        explanation:
          'Excelente! A cobertura dos casos de uso completos, em ambiente de homologação, pela equipe de teste, é o perfil clássico do teste de sistema.',
        errorExplanation:
          'Não é teste de aceitação porque o executor é a equipe de teste, não o usuário de negócio. Não é integração porque abrange o sistema completo. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },

      {
        id: '2.2.1',
        question: 'Qual é o principal objetivo do teste unitário?',
        options: [
          'A) Verificar se o sistema completo atende aos requisitos funcionais documentados.',
          'B) Verificar se componentes individuais de código funcionam corretamente em isolamento.',
          'C) Validar se o sistema atende às necessidades dos usuários antes da implantação.',
          'D) Verificar se módulos distintos do sistema interagem corretamente entre si.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! O teste unitário verifica unidades individuais — funções, métodos ou classes — de forma isolada, sem envolver outros componentes do sistema.',
        errorExplanation:
          'Revise o Bloco 2. O teste unitário foca em componentes individuais em isolamento, não no sistema como um todo nem na interação entre módulos.',
        reviewBlock: 'bloco-2',
      },
      {
        id: '2.2.2',
        question:
          'Um sistema de vendas passou por testes unitários em todos os seus módulos sem falhas. Ao integrar o módulo de pedidos com o módulo de estoque, foram identificadas inconsistências nos dados transmitidos. Qual nível de teste deveria ter detectado esse problema?',
        options: [
          'A) Teste unitário, pois os módulos deveriam ser testados novamente após a integração.',
          'B) Teste de aceitação, pois envolve dados de negócio.',
          'C) Teste de integração, pois o problema está na interface entre os módulos.',
          'D) Teste de sistema, pois ambos os módulos pertencem ao mesmo sistema.',
        ],
        correctIndex: 2,
        explanation:
          'Correto! O teste de integração é responsável por verificar a comunicação e a troca de dados entre módulos distintos. Problemas de interface são tipicamente revelados nesse nível.',
        errorExplanation:
          'Problemas entre módulos não são detectáveis por testes unitários (que usam mocks) nem precisam aguardar o teste de sistema completo. Revise o Bloco 3.',
        reviewBlock: 'bloco-3',
      },
      {
        id: '2.2.3',
        question: 'Qual das afirmações sobre o teste de aceitação é correta?',
        options: [
          'A) Substitui o teste de sistema quando o cliente é envolvido nos testes.',
          'B) É realizado pela equipe interna de QA para verificar conformidade com requisitos técnicos.',
          'C) Valida se o sistema está pronto para uso, confirmando adequação às necessidades dos usuários e ao negócio.',
          'D) É realizado antes do teste de sistema, pois os critérios de aceitação são definidos primeiro.',
        ],
        correctIndex: 2,
        explanation:
          'Correto! O teste de aceitação valida se o sistema é adequado ao uso real, envolvendo usuários ou representantes do negócio, e ocorre após o teste de sistema.',
        errorExplanation:
          'O teste de aceitação não substitui o teste de sistema e não é realizado pela equipe de QA como atividade principal. Ele valida adequação ao negócio. Revise o Bloco 5.',
        reviewBlock: 'bloco-5',
      },
      {
        id: '2.2.4',
        question: 'Por que stubs e mocks são utilizados no teste unitário?',
        options: [
          'A) Para simular o comportamento de usuários reais durante os testes.',
          'B) Para substituir dependências externas, garantindo que o teste verifique apenas a unidade em questão.',
          'C) Para aumentar o desempenho do sistema durante a execução dos testes.',
          'D) Para registrar automaticamente os resultados dos testes no banco de dados.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! Stubs e mocks substituem dependências externas (banco de dados, APIs, outros módulos) durante o teste unitário, garantindo que o foco seja exclusivamente na unidade testada.',
        errorExplanation:
          'Stubs e mocks não simulam usuários nem gerenciam desempenho. Eles isolam a unidade testada de suas dependências externas. Revise o Bloco 2.',
        reviewBlock: 'bloco-2',
      },
      {
        id: '2.2.5',
        question: 'Qual dos cenários descreve uma situação típica de teste de sistema?',
        options: [
          'A) O desenvolvedor verifica se o método converterMoeda() retorna o valor correto para diferentes taxas de câmbio.',
          'B) A equipe de QA executa o fluxo completo de solicitação de reembolso, do pedido do cliente ao crédito na conta, em ambiente de homologação.',
          'C) O usuário final confirma se o sistema de reembolso atende ao processo interno da empresa.',
          'D) O testador verifica se o módulo de solicitação envia os dados corretamente para o módulo de aprovação.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! O fluxo end-to-end executado pela equipe de QA em homologação, cobrindo o processo completo, é típico do teste de sistema.',
        errorExplanation:
          'A alternativa A é teste unitário; a C é aceitação; a D é integração. O teste de sistema cobre fluxos completos pela equipe de QA em ambiente controlado. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },
      {
        id: '2.2.6',
        question:
          'De acordo com o modelo V (V-Model), qual nível de teste corresponde à fase de especificação de requisitos do sistema?',
        options: ['A) Teste Unitário.', 'B) Teste de Integração.', 'C) Teste de Sistema.', 'D) Teste de Aceitação.'],
        correctIndex: 3,
        explanation:
          'Correto! No modelo V, o teste de aceitação corresponde à fase de especificação de requisitos. Os critérios de aceitação são definidos com base nos requisitos e validados pelo cliente.',
        errorExplanation:
          'No modelo V: Requisitos → Aceitação; Projeto de sistema → Sistema; Projeto de módulos → Integração; Codificação → Unitário. Revise o Bloco 7.',
        reviewBlock: 'bloco-7',
      },
      {
        id: '2.2.7',
        question: 'Qual é a principal diferença entre o teste de sistema e o teste de aceitação?',
        options: [
          'A) O teste de sistema é automatizado; o teste de aceitação é sempre manual.',
          'B) O teste de sistema verifica conformidade com requisitos técnicos; o teste de aceitação valida adequação ao negócio e ao uso real.',
          'C) O teste de sistema é realizado pelo cliente; o teste de aceitação, pela equipe de QA.',
          'D) O teste de sistema ocorre em produção; o teste de aceitação, em ambiente de desenvolvimento.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! O teste de sistema verifica se o sistema atende aos requisitos especificados (conformidade técnica). O teste de aceitação valida se o sistema é adequado ao uso real e ao negócio.',
        errorExplanation:
          'Teste de sistema é realizado pela equipe de QA; teste de aceitação envolve usuários ou negócio. A distinção central é: requisitos técnicos vs. adequação ao negócio. Revise os Blocos 4, 5 e 6.',
        reviewBlock: 'bloco-6',
      },
      {
        id: '2.2.8',
        question:
          'Uma equipe adota integração contínua (CI) e executa automaticamente um conjunto de testes a cada push de código. Qual nível de teste é mais adequado para ser automatizado nesse contexto, considerando granularidade e velocidade?',
        options: [
          'A) Teste de aceitação, pois é o nível mais abrangente.',
          'B) Teste de sistema, pois cobre mais requisitos.',
          'C) Teste unitário e teste de integração, pois são mais rápidos e focados em partes específicas do sistema.',
          'D) Teste de aceitação e teste de sistema, pois são os mais relevantes para o cliente.',
        ],
        correctIndex: 2,
        explanation:
          'Correto! Testes unitários e de integração são ideais para CI/CD por serem rápidos, focados e de fácil automação. Testes de sistema e aceitação, pela sua complexidade e dependência de ambientes completos, são menos adequados para execução a cada push.',
        errorExplanation:
          'Testes de sistema e aceitação exigem ambientes mais completos e são mais lentos. Para CI/CD, testes unitários e de integração são os mais indicados. Revise o Bloco 7.',
        reviewBlock: 'bloco-7',
      },
    ],
  },

  guidedPracticeRich: {
    scenario:
      'Uma startup está desenvolvendo um aplicativo de gestão financeira pessoal que permite: cadastrar contas bancárias; registrar receitas e despesas manualmente; sincronizar transações via integração com a API de um banco parceiro; gerar relatórios mensais de gastos por categoria; e receber alertas por push notification quando o saldo atinge um limite mínimo. A equipe completou a codificação dos cinco módulos principais.',
    question:
      'Considerando os quatro níveis de teste, indique quais tipos deveriam ser aplicados e para qual parte do sistema cada um seria mais adequado.',
    fields: [
      {
        key: 'unitario',
        label: '1. Teste Unitário — O que testar e qual o objetivo?',
        description: 'Pense nas menores unidades testáveis: funções de cálculo, categorização, validações.',
        placeholder: 'O que testar: ... | Objetivo: ...',
        color: '#1F8A5B',
      },
      {
        key: 'integracao',
        label: '2. Teste de Integração — O que testar e qual o objetivo?',
        description: 'Pense nos pontos onde os módulos se comunicam (API do banco, propagação de dados).',
        placeholder: 'O que testar: ... | Objetivo: ...',
        color: '#146B4A',
      },
      {
        key: 'sistema',
        label: '3. Teste de Sistema — O que testar e qual o objetivo?',
        description: 'Pense no fluxo completo, requisitos não funcionais (desempenho, segurança).',
        placeholder: 'O que testar: ... | Objetivo: ...',
        color: '#0F3D2E',
      },
      {
        key: 'aceitacao',
        label: '4. Teste de Aceitação — O que testar e qual o objetivo?',
        description: 'Pense em quem valida se o aplicativo realmente serve para controle financeiro pessoal.',
        placeholder: 'O que testar: ... | Objetivo: ...',
        color: '#4CAF50',
      },
    ],
    hints: [
      'Comece pelo menor componente. Qual é a menor unidade testável desse sistema? Pense nas funções de cálculo (saldo, categorias, alertas) e nas funções de validação de dados.',
      'Agora pense em onde os módulos se comunicam. O módulo de sincronização precisa falar com a API do banco. O módulo de alertas precisa consultar os saldos. Essas interações são testadas em qual nível?',
      'Quem deveria validar se o aplicativo é realmente útil para controle financeiro pessoal? Um usuário real ou a equipe de QA? Isso orienta qual é o nível de aceitação.',
    ],
    expectedAnswers: {
      unitario:
        'O que testar: funções de cálculo de saldo total por conta, função de categorização de despesas, função de verificação de saldo mínimo e função de formatação de valores monetários. Objetivo: verificar se cada função retorna os valores corretos para diferentes entradas, incluindo casos limite e entradas inválidas, sem depender de banco de dados ou API externa.',
      integracao:
        'O que testar: a comunicação entre o módulo de sincronização e a API do banco parceiro; a propagação dos dados sincronizados para o módulo de relatórios; o fluxo entre o módulo de saldos e o módulo de alertas. Objetivo: verificar se os módulos trocam dados corretamente, nos formatos esperados, e se falhas na API externa são tratadas adequadamente pelo sistema.',
      sistema:
        'O que testar: o fluxo completo de uso — cadastro de conta, registro de transação, sincronização, geração de relatório e envio de alerta — em ambiente de homologação; testes de desempenho com múltiplos usuários; testes de segurança nos dados financeiros. Objetivo: verificar se o sistema completo atende a todos os requisitos funcionais e não funcionais documentados.',
      aceitacao:
        'O que testar: usuários reais utilizam o aplicativo em seus smartphones por um período de avaliação, realizando tarefas reais (cadastrar contas, registrar gastos, analisar relatórios). Objetivo: validar se o aplicativo atende às necessidades reais dos usuários de controle financeiro pessoal e se a experiência de uso é satisfatória.',
    },
    feedback:
      'Você aplicou corretamente a lógica de progressão dos níveis de teste, do mais granular (funções isoladas) ao mais abrangente (validação com usuários reais). Cada nível tem um objeto de teste e um objetivo distintos, o que justifica a aplicação de todos eles nesse cenário.',
  },

  independentPracticeRich: {
    scenario:
      'Uma prefeitura está desenvolvendo um portal de serviços ao cidadão. O portal oferece: emissão de segunda via de IPTU (cálculo de multas, correção monetária e geração de boleto); agendamento de serviços presenciais (postos de saúde, cartório, DETRAN); consulta e acompanhamento de processos administrativos; e envio de denúncias anônimas com número de protocolo automático. O sistema será usado por cidadãos, servidores municipais e gestores. A implantação está prevista para daqui a 30 dias.',
    tasks: [
      'Para cada nível de teste, indique qual parte do sistema seria testada e em qual momento.',
      'Descreva o principal objetivo daquele nível no contexto do portal.',
      'Aponte qual problema esse tipo de teste poderia detectar que os outros níveis não detectariam.',
      'Justifique sua escolha com base no objeto de teste, executor e ambiente.',
    ],
    fields: [
      {
        key: 'unitario',
        label: 'Teste Unitário',
        description: 'Parte testada, momento, objetivo e problema exclusivo detectável.',
        placeholder: 'Parte testada: ... | Momento: ... | Objetivo: ... | Problema exclusivo: ...',
        color: '#1F8A5B',
      },
      {
        key: 'integracao',
        label: 'Teste de Integração',
        description: 'Parte testada, momento, objetivo e problema exclusivo detectável.',
        placeholder: 'Parte testada: ... | Momento: ... | Objetivo: ... | Problema exclusivo: ...',
        color: '#146B4A',
      },
      {
        key: 'sistema',
        label: 'Teste de Sistema',
        description: 'Parte testada, momento, objetivo e problema exclusivo detectável.',
        placeholder: 'Parte testada: ... | Momento: ... | Objetivo: ... | Problema exclusivo: ...',
        color: '#0F3D2E',
      },
      {
        key: 'aceitacao',
        label: 'Teste de Aceitação',
        description: 'Parte testada, momento, objetivo e problema exclusivo detectável.',
        placeholder: 'Parte testada: ... | Momento: ... | Objetivo: ... | Problema exclusivo: ...',
        color: '#4CAF50',
      },
    ],
    expectedAnswers: {
      unitario:
        'Parte testada: funções de cálculo de multa e correção monetária do IPTU; função de geração de número de protocolo de denúncia; validação de datas no agendamento. Momento: durante e imediatamente após a codificação. Objetivo: verificar resultados corretos para diferentes cenários (IPTU com multa zero, datas inválidas, protocolos duplicados). Problema exclusivo: a função de cálculo de multa usa a taxa de juros diária errada (0.1% em vez de 0.01% por um erro de vírgula), detectável imediatamente em testes de cálculo isolados.',
      integracao:
        'Parte testada: comunicação entre o módulo de geração de boleto e o sistema de pagamentos; propagação do agendamento para o sistema interno do serviço; fluxo da denúncia anônima entre portal e gestão de processos. Momento: após os testes unitários dos módulos relevantes. Objetivo: verificar se os módulos trocam dados corretamente e se sistemas externos respondem adequadamente. Problema exclusivo: o módulo de agendamento envia data no formato DD/MM/AAAA, mas o sistema do DETRAN espera MM-DD-AAAA, causando agendamentos na data errada — invisível nos testes unitários.',
      sistema:
        'Parte testada: o portal completo, cobrindo todos os serviços, em ambiente de homologação. Momento: antes da entrega à prefeitura. Objetivo: verificar requisitos funcionais e não funcionais (desempenho com milhares de acessos, segurança, acessibilidade). Problema exclusivo: com 2.000 usuários simultâneos no serviço de IPTU, o sistema ultrapassa o tempo de resposta de 3 segundos exigido — só detectável com o sistema completo sob carga.',
      aceitacao:
        'Parte testada: fluxos reais com cidadãos e servidores municipais. Momento: imediatamente antes da implantação, com a prefeitura como avaliadora. Objetivo: validar se o portal atende às necessidades reais dos cidadãos e suporta os processos administrativos. Problema exclusivo: o fluxo de denúncia anônima gera protocolos que não são visíveis para o servidor responsável pela triagem — perfil de acesso não especificado nos requisitos, detectado apenas quando o servidor tenta acessar as denúncias no teste real.',
    },
    criteria: [
      {
        label: 'Identificação correta da parte testada em cada nível',
        weight: '25%',
        description: 'Descreve objetos de teste apropriados para cada nível (função, interface, sistema, uso real).',
      },
      {
        label: 'Indicação correta do momento de aplicação',
        weight: '25%',
        description: 'Posiciona cada nível na fase correta do ciclo de desenvolvimento.',
      },
      {
        label: 'Descrição do objetivo de cada nível',
        weight: '25%',
        description: 'Articula o objetivo específico de cada nível com clareza e precisão.',
      },
      {
        label: 'Identificação de problema exclusivo de cada nível',
        weight: '25%',
        description: 'Aponta um defeito que só seria detectado por aquele nível específico.',
      },
    ],
    feedbackCorrect:
      'Excelente! Você demonstrou compreensão do propósito e do momento de aplicação de cada nível de teste, além de reconhecer que diferentes níveis revelam diferentes categorias de defeito. Essa é a habilidade central desta unidade.',
    feedbackIncorrect:
      'Se você confundiu os níveis, retorne ao Bloco 6 (Comparação entre os Tipos de Teste) e revise a tabela comparativa. Cada nível tem um objeto de teste específico: função (unitário), interface entre módulos (integração), sistema completo (sistema), uso real pelo usuário (aceitação).',
  },

  finalAssessmentQuestions: [
    {
      id: 'AF2-01',
      question: 'Qual dos seguintes elementos é o objeto de teste no nível de teste unitário?',
      options: [
        'A) O sistema completo, configurado em ambiente de homologação.',
        'B) A interface entre dois módulos que trocam dados por meio de uma API interna.',
        'C) Um método ou função individual, verificado de forma isolada de outros componentes.',
        'D) O fluxo de trabalho completo de um usuário no sistema, do login ao logout.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. O objeto de teste no nível unitário é a menor unidade testável do sistema — tipicamente um método ou função — verificada em isolamento. Conteúdo: Bloco 2.',
      errorExplanation:
        'O teste unitário foca na menor unidade testável, em isolamento. Sistema completo é teste de sistema; interface entre módulos é integração; fluxo de usuário é sistema ou aceitação. Revise o Bloco 2.',
      reviewBlock: 'bloco-2',
    },
    {
      id: 'AF2-02',
      question:
        'Uma equipe verificou individualmente todos os componentes de um sistema de gestão de contratos. Ao combinar o módulo de cadastro com o módulo de notificações automáticas, o sistema deixou de enviar alertas de vencimento. Qual nível de teste teria sido mais adequado para identificar esse problema?',
      options: [
        'A) Teste unitário, pois o problema está em um dos componentes individuais.',
        'B) Teste de integração, pois o problema surge na interação entre os módulos.',
        'C) Teste de aceitação, pois envolve o comportamento esperado pelo usuário.',
        'D) Teste de sistema, pois o sistema completo não funciona corretamente.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. O problema surge na interação entre dois módulos, não no comportamento interno de cada um. O teste de integração é projetado para detectar exatamente esse tipo de defeito. Conteúdo: Bloco 3.',
      errorExplanation:
        'O problema não está em um componente individual (não é unitário), nem requer o sistema completo. O foco é na interface entre módulos — teste de integração. Revise o Bloco 3.',
      reviewBlock: 'bloco-3',
    },
    {
      id: 'AF2-03',
      question: 'Qual das afirmações descreve corretamente o teste de sistema?',
      options: [
        'A) O teste de sistema é conduzido pelo cliente para validar se o produto atende ao contrato.',
        'B) O teste de sistema verifica o sistema como um todo em relação aos requisitos especificados, em ambiente que simula o de produção.',
        'C) O teste de sistema foca exclusivamente em requisitos não funcionais, como desempenho e segurança.',
        'D) O teste de sistema ocorre após o teste de aceitação e antes da implantação definitiva.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. O teste de sistema avalia o sistema completo contra os requisitos (funcionais e não funcionais) em ambiente de homologação. É conduzido pela equipe de teste, não pelo cliente. Conteúdo: Bloco 4.',
      errorExplanation:
        'O teste de sistema é conduzido pela equipe de QA (não pelo cliente); abrange requisitos funcionais e não funcionais; e ocorre antes do teste de aceitação. Revise o Bloco 4.',
      reviewBlock: 'bloco-4',
    },
    {
      id: 'AF2-04',
      question:
        'Qual dos itens abaixo representa um critério correto para distinguir o teste de aceitação do teste de sistema?',
      options: [
        'A) O teste de aceitação é sempre automatizado; o teste de sistema é sempre manual.',
        'B) O teste de aceitação verifica requisitos técnicos; o teste de sistema verifica requisitos de negócio.',
        'C) O teste de sistema verifica conformidade com requisitos especificados; o teste de aceitação valida adequação ao uso e ao negócio.',
        'D) O teste de aceitação ocorre antes do teste de sistema, pois os critérios de aceitação são definidos primeiro.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. A distinção central está no objetivo e no executor: sistema verifica requisitos técnicos (pela equipe de QA); aceitação valida adequação ao negócio (por usuários ou representantes). Conteúdo: Blocos 4, 5 e 6.',
      errorExplanation:
        'Teste de aceitação não ocorre antes do sistema; não é sempre automatizado; e não verifica requisitos técnicos — valida adequação ao uso real. Revise os Blocos 4, 5 e 6.',
      reviewBlock: 'bloco-6',
    },
    {
      id: 'AF2-05',
      question:
        'No contexto do modelo V (V-Model), com qual fase do desenvolvimento o teste de integração se relaciona diretamente?',
      options: [
        'A) Especificação de requisitos.',
        'B) Projeto detalhado de módulos e suas interfaces.',
        'C) Codificação e testes unitários.',
        'D) Validação com o cliente.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. No modelo V, o teste de integração corresponde à fase de projeto de módulos e interfaces, pois é nessa fase que as interfaces entre componentes são definidas. Conteúdo: Bloco 7.',
      errorExplanation:
        'No modelo V: Requisitos → Aceitação; Projeto de sistema → Sistema; Projeto de módulos/interfaces → Integração; Codificação → Unitário. Revise o Bloco 7.',
      reviewBlock: 'bloco-7',
    },
    {
      id: 'AF2-06',
      question:
        'Por que é considerado uma boa prática automatizar os testes unitários e de integração em pipelines de integração contínua (CI)?',
      options: [
        'A) Porque esses níveis de teste substituem a necessidade de testes de sistema e aceitação.',
        'B) Porque a automação permite detectar rapidamente defeitos introduzidos por novas alterações no código, mantendo a qualidade ao longo do desenvolvimento.',
        'C) Porque testes manuais não são suficientemente precisos para detectar defeitos nesses níveis.',
        'D) Porque o CTFL/ISTQB exige a automação como critério de conformidade para testes unitários.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. A automação em CI permite executar os testes a cada nova modificação, identificando rapidamente defeitos introduzidos por alterações recentes. Não substitui outros níveis — complementa. Conteúdo: Bloco 7.',
      errorExplanation:
        'Automação em CI não substitui outros níveis nem é exigida por normas. A razão é a velocidade de feedback: defeitos detectados logo após sua introdução são mais baratos de corrigir. Revise o Bloco 7.',
      reviewBlock: 'bloco-7',
    },
    {
      id: 'AF2-07',
      question: 'Analise as afirmações e identifique a que é FALSA:',
      options: [
        'A) O teste unitário usa stubs e mocks para isolar a unidade testada de suas dependências.',
        'B) O teste de integração verifica se componentes individuais atendem à sua especificação de forma isolada.',
        'C) O teste de sistema pode incluir testes de desempenho e segurança.',
        'D) O teste de aceitação pode ser conduzido por usuários finais em um teste beta.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. A afirmação B é falsa: verificar componentes individuais de forma isolada é o objetivo do teste UNITÁRIO, não do de integração. O teste de integração verifica a interação entre componentes. Conteúdo: Blocos 2 e 3.',
      errorExplanation:
        'A alternativa B descreve o teste unitário, não o de integração. As demais afirmações estão corretas. Revise os Blocos 2 e 3.',
      reviewBlock: 'bloco-2',
    },
    {
      id: 'AF2-08',
      question:
        'Um sistema passou pelo teste de sistema sem falhas. Ao ser apresentado ao cliente, porém, ele rejeitou o sistema porque o relatório gerencial não seguia o formato exigido pelo conselho de administração — uma necessidade que não havia sido documentada explicitamente. Qual nível de teste deveria ter detectado esse problema?',
      options: [
        'A) Teste unitário, pois o módulo de geração de relatórios deveria ter sido testado isoladamente.',
        'B) Teste de integração, pois o módulo de relatórios não estava comunicando corretamente com o módulo de dados.',
        'C) Teste de aceitação, pois envolve uma necessidade real do negócio que o cliente não havia comunicado como requisito formal.',
        'D) O problema não pode ser detectado por nenhum nível de teste, pois o requisito não estava documentado.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. O teste de aceitação, conduzido com o cliente, teria revelado essa necessidade de negócio antes da entrega formal. É exatamente para isso que ele existe: identificar discrepâncias entre o sistema e as necessidades reais do negócio. Conteúdo: Bloco 5.',
      errorExplanation:
        'O problema não é de lógica interna (unitário) nem de comunicação entre módulos (integração). É uma necessidade de negócio não capturada nos requisitos — o teste de aceitação é o nível adequado. Revise o Bloco 5.',
      reviewBlock: 'bloco-5',
    },
    {
      id: 'AF2-09',
      question:
        'Qual das seguintes situações representa o uso correto da integração incremental no teste de integração?',
      options: [
        'A) Todos os módulos do sistema são integrados e testados simultaneamente após a conclusão de toda a codificação.',
        'B) Os módulos são adicionados e testados progressivamente, um de cada vez, facilitando a localização de defeitos de integração.',
        'C) Cada módulo é testado individualmente antes de ser integrado, eliminando a necessidade de testes de integração posteriores.',
        'D) Os módulos são integrados e testados apenas no ambiente de produção, após a implantação.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. A integração incremental adiciona e testa módulos progressivamente, tornando mais fácil identificar qual integração introduziu um defeito. É a abordagem recomendada em contraste com a integração "big bang". Conteúdo: Bloco 3.',
      errorExplanation:
        'A integração "big bang" (todos os módulos de uma vez) é a alternativa menos recomendada. A integração incremental é preferida pela facilidade de localização de defeitos. Revise o Bloco 3.',
      reviewBlock: 'bloco-3',
    },
    {
      id: 'AF2-10',
      question:
        'Considere as afirmações sobre os níveis de teste:\nI. O teste unitário é tipicamente realizado pelo próprio desenvolvedor, durante ou logo após a codificação.\nII. O teste de integração pode revelar defeitos que o teste unitário não detectou, pois verifica a interação entre componentes.\nIII. O teste de sistema é realizado pelo cliente final para validar o produto antes da assinatura do contrato.\nIV. O teste de aceitação pode incluir testes alpha e beta, dependendo do contexto do produto.\nQuais afirmações são corretas?',
      options: ['A) Apenas I e III.', 'B) Apenas II e IV.', 'C) I, II e IV.', 'D) I, II, III e IV.'],
      correctIndex: 2,
      explanation:
        'Correto. As afirmações I, II e IV estão corretas. A afirmação III é falsa: o teste de sistema é realizado pela equipe de teste (QA), não pelo cliente. O cliente participa do teste de aceitação. Conteúdo: Blocos 2, 3, 4 e 5.',
      errorExplanation:
        'A afirmação III é falsa: o cliente participa do teste de aceitação, não do teste de sistema. As demais (I, II e IV) estão corretas. Revise os Blocos 2, 3, 4 e 5.',
      reviewBlock: 'bloco-6',
    },
  ],

  reviewMap: {
    'AF2-01': ['bloco-2'],
    'AF2-02': ['bloco-3'],
    'AF2-03': ['bloco-4'],
    'AF2-04': ['bloco-4', 'bloco-5', 'bloco-6'],
    'AF2-05': ['bloco-7'],
    'AF2-06': ['bloco-7'],
    'AF2-07': ['bloco-2', 'bloco-3'],
    'AF2-08': ['bloco-5'],
    'AF2-09': ['bloco-3'],
    'AF2-10': ['bloco-2', 'bloco-3', 'bloco-4', 'bloco-5'],
  },

  finalChallenge: {
    enunciado:
      'Leia o cenário a seguir e responda às quatro questões propostas. Para cada problema relatado em produção, identifique qual tipo de teste deveria tê-lo detectado, em que momento esse teste deveria ter sido aplicado, qual seu objetivo e como ele evitaria a falha. Esta atividade avalia sua capacidade de aplicar os níveis de teste a um cenário real e integrador.',
    scenario:
      'Uma empresa de logística opera um sistema de rastreamento de encomendas. O sistema permite que clientes consultem o status de suas entregas em tempo real, que motoristas atualizem status via aplicativo móvel e que o setor de operações gere relatórios de produtividade por região.\n\nApós uma atualização para adicionar suporte a códigos QR nas etiquetas, foram relatados em produção:\n\nProblema 1 — A função de geração do código QR produz códigos idênticos para diferentes encomendas quando o número de rastreio contém letras maiúsculas e minúsculas misturadas.\n\nProblema 2 — O aplicativo do motorista atualiza o status no banco, mas o sistema do cliente não reflete a atualização em tempo real — o módulo de notificações em tempo real não está recebendo os eventos do módulo de rastreamento após a atualização.\n\nProblema 3 — Sob carga de 3.000 usuários simultâneos, o sistema apresenta tempo de resposta superior a 15 segundos para consultas de status — o requisito é de no máximo 3 segundos.\n\nProblema 4 — O gerente de operações identificou que os relatórios de produtividade não refletem o fluxo real da empresa: o sistema agrupa as entregas por cidade, mas o processo interno é por zona de entrega — necessidade que não estava nos requisitos formais.',
    fields: [
      {
        key: 'problema1',
        label: '1. Problema 1 — Códigos QR duplicados',
        description: 'Indique: tipo de teste, momento, objetivo e como evitaria a falha.',
        placeholder:
          'Tipo de teste: ... | Momento: ... | Objetivo: ... | Como evitaria: ...',
        color: '#1F8A5B',
      },
      {
        key: 'problema2',
        label: '2. Problema 2 — Atualização em tempo real não chega ao cliente',
        description: 'Indique: tipo de teste, momento, objetivo e como evitaria a falha.',
        placeholder:
          'Tipo de teste: ... | Momento: ... | Objetivo: ... | Como evitaria: ...',
        color: '#146B4A',
      },
      {
        key: 'problema3',
        label: '3. Problema 3 — Desempenho sob carga',
        description: 'Indique: tipo de teste, momento, objetivo e como evitaria a falha.',
        placeholder:
          'Tipo de teste: ... | Momento: ... | Objetivo: ... | Como evitaria: ...',
        color: '#0F3D2E',
      },
      {
        key: 'problema4',
        label: '4. Problema 4 — Relatórios não atendem ao negócio',
        description: 'Indique: tipo de teste, momento, objetivo e como evitaria a falha.',
        placeholder:
          'Tipo de teste: ... | Momento: ... | Objetivo: ... | Como evitaria: ...',
        color: '#4CAF50',
      },
    ],
    expectedAnswers: {
      problema1:
        'Tipo: Teste Unitário. Momento: durante ou imediatamente após a codificação da função de geração de QR. Objetivo: verificar se geraCodigoQR(numeroRastreio) produz códigos únicos para todas as entradas válidas, incluindo letras maiúsculas e minúsculas. Como evitaria: um caso de teste com rastreios variando somente na capitalização (ex.: "BR123abc" e "BR123ABC") teria revelado a duplicidade antes da implantação, pois o defeito está na lógica interna da função.',
      problema2:
        'Tipo: Teste de Integração. Momento: após os testes unitários dos módulos de rastreamento e de notificações. Objetivo: verificar se o módulo de rastreamento dispara corretamente os eventos para o módulo de notificações em tempo real após a atualização de status. Como evitaria: um teste de integração que simulasse a atualização pelo motorista e verificasse se o evento chegava ao módulo de notificações teria detectado que a conexão foi quebrada pela atualização.',
      problema3:
        'Tipo: Teste de Sistema (carga/desempenho). Momento: em ambiente de homologação, com o sistema completo, antes da entrega. Objetivo: verificar se o sistema atende ao requisito de tempo de resposta (máximo 3 segundos) sob a carga esperada de usuários simultâneos. Como evitaria: um teste de carga com 3.000 usuários simultâneos em homologação teria revelado a degradação de desempenho antes da implantação, permitindo otimização.',
      problema4:
        'Tipo: Teste de Aceitação. Momento: antes da implantação em produção, com o gerente de operações como avaliador. Objetivo: validar se os relatórios atendem ao fluxo de trabalho real da equipe de operações. Como evitaria: se o gerente tivesse participado de um teste de aceitação antes da implantação, ele teria identificado que o agrupamento por cidade não corresponde ao processo real (por zona de entrega), permitindo a correção antes do lançamento.',
    },
    rubric: [
      {
        level: 'Insuficiente',
        range: '0 – 25%',
        achievementCount: '0–1 problemas classificados corretamente',
        description:
          'O aluno não demonstrou compreensão dos níveis de teste. Recomenda-se revisitar todos os blocos, com ênfase na tabela comparativa do Bloco 6.',
      },
      {
        level: 'Básico',
        range: '26 – 50%',
        achievementCount: '2 problemas classificados corretamente',
        description:
          'O aluno compreendeu parte da lógica de aplicação dos níveis. Revise especialmente os Blocos 2, 3 e 5.',
      },
      {
        level: 'Satisfatório',
        range: '51 – 75%',
        achievementCount: '3 problemas classificados corretamente',
        description:
          'O aluno demonstra boa compreensão, com algumas imprecisões na justificativa ou no momento de aplicação. Revise o Bloco 7.',
      },
      {
        level: 'Excelente',
        range: '76 – 100%',
        achievementCount: '4 problemas classificados corretamente',
        description:
          'O aluno identificou corretamente o nível de teste para cada problema e justificou com clareza o momento e o objetivo. Excelente domínio da unidade.',
      },
    ],
    finalFeedback:
      'Ao concluir este desafio, você aplicou os quatro níveis de teste a um cenário real de sistema em produção. A capacidade de identificar qual nível de teste deveria ter detectado cada tipo de problema é uma competência essencial para profissionais de qualidade de software. Você concluiu a Unidade 2 e está preparado para avançar ao estudo das técnicas de projeto de casos de teste.',
  },

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
