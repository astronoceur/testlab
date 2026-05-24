import { Unit } from '../types';

export const unit4: Unit = {
  id: 4,
  title: 'Unidade 4',
  subtitle: 'Casos de Teste',
  description:
    'Aprenda a estruturar, escrever e avaliar casos de teste profissionais: o documento que transforma uma intenção de verificação em instrução precisa, reproduzível e rastreável até o requisito.',
  icon: '🐞',
  meta: {
    cargaHoraria: '6 horas',
    nivel: 'Introdutório',
    referencia: 'CTFL / ISTQB',
    abordagem: 'Eventos de Gagné',
  },
  objectives: [
    'Explicar o que é um caso de teste e qual é o seu papel no processo de verificação de software.',
    'Identificar e descrever os principais elementos de um caso de teste: ID, título, objetivo, pré-condições, dados de entrada, passos de execução, resultado esperado, resultado obtido e status.',
    'Elaborar casos de teste completos a partir de requisitos fornecidos, aplicando os conceitos das unidades anteriores.',
    'Diferenciar pré-condições, dados de entrada, passos de execução e resultado esperado, reconhecendo o papel de cada campo na reprodutibilidade do teste.',
    'Avaliar se um caso de teste está claro, completo e reproduzível, identificando campos ausentes, vagos ou incoerentes.',
    'Aplicar critérios de qualidade na escrita de casos de teste, garantindo objetividade, precisão e rastreabilidade com requisitos.',
  ],

  situationProblem: {
    title: 'O Defeito que Ninguém Conseguia Reproduzir',
    paragraphs: [
      'Em uma empresa de desenvolvimento de software, a equipe de QA havia testado o sistema de agendamento online de consultas médicas antes do lançamento. Os testadores executaram dezenas de verificações manuais ao longo de uma semana e confirmaram ao gerente que o sistema estava "testado e funcionando". O produto foi implantado.',
      'Três dias após o lançamento, os relatos de usuários começaram a chegar: em determinadas situações, o sistema permitia que dois pacientes agendassem o mesmo horário com o mesmo médico — um conflito de agenda que resultava em confusão, constrangimento e perda de credibilidade para a clínica. O suporte técnico foi acionado e pediu à equipe de QA que reproduzisse o problema para investigação.',
      'Foi aí que o problema real emergiu: nenhum dos testadores havia documentado os casos de teste de forma estruturada. Alguns haviam anotado "testado agendamento — ok" em uma planilha sem formato padrão. Outros nem isso: simplesmente executaram os testes mentalmente e anotaram apenas o resultado final. Não havia registro das pré-condições (quantos agendamentos já existiam no sistema?), dos dados de entrada (qual médico? qual data? qual horário?), dos passos executados nem do resultado esperado versus obtido.',
      'A equipe tentou reproduzir o problema por dois dias. Sem saber exatamente o que havia sido testado e com quais dados, era impossível dizer se o conflito de agenda havia sido testado e passado incorretamente, ou simplesmente nunca havia sido testado. O código precisou ser analisado manualmente — um trabalho muito mais lento e custoso do que seria necessário se os casos de teste tivessem sido bem documentados.',
    ],
    reflectionQuestions: [
      'Se o testador tivesse documentado as pré-condições (quantos agendamentos existiam antes do teste), os dados de entrada (médico, data, horário) e os passos executados, o que seria diferente na investigação?',
      'O que distingue "executar um teste" de "ter um caso de teste"?',
      'Como um caso de teste bem escrito facilita a reprodução de um defeito encontrado em produção?',
    ],
    conclusion:
      'O teste sem documentação adequada é, na prática, um teste não verificável. Um caso de teste bem estruturado não é burocracia: é a garantia de que o que foi testado pode ser comunicado, repetido, verificado e usado como evidência de qualidade do software.',
  },

  priorKnowledgeQuestions: [
    {
      id: 'PK4-1',
      question:
        'Na Unidade 1, você aprendeu a diferença entre defeito, erro e falha. Um testador executa um caso de teste de login com usuário válido e senha correta. O sistema retorna "Usuário ou senha inválidos" em vez de liberar o acesso. O resultado obtido diverge do resultado esperado. O que esse resultado negativo indica?',
      options: [
        'A) Que o testador errou ao executar o teste, pois o sistema deveria estar correto.',
        'B) Que o caso de teste é inválido, porque o sistema rejeitou a entrada.',
        'C) Que uma falha foi revelada: o sistema produziu um resultado incorreto, indicando a presença de um possível defeito no código.',
        'D) Que o resultado esperado do caso de teste estava errado e precisa ser corrigido.',
      ],
      correctIndex: 2,
      explanation:
        'Correto! A divergência entre resultado esperado e resultado obtido é a definição de falha observada. Isso indica que há um possível defeito no código — e é exatamente isso que o caso de teste se propõe a revelar. Conteúdo relacionado: Unidade 1.',
      errorExplanation:
        'A falha ocorre quando o sistema se comporta de forma diferente do que é esperado. O testador forneceu entradas válidas e o sistema respondeu incorretamente — isso é uma falha, evidenciando um possível defeito. Revise a Unidade 1.',
    },
    {
      id: 'PK4-2',
      question:
        'Na Unidade 3, você aprendeu sobre particionamento de equivalência e análise de valor limite. Um campo de cadastro aceita idades entre 18 e 60 anos. Um testador define os casos: CT-A: idade=17 (inválido), CT-B: idade=18 (válido), CT-C: idade=40 (válido), CT-D: idade=60 (válido), CT-E: idade=61 (inválido). Esse conjunto aplica qual combinação de técnicas?',
      options: [
        'A) Apenas particionamento de equivalência, pois foram identificadas classes válidas e inválidas.',
        'B) Apenas análise de valor limite, pois foram testados valores nos extremos da faixa.',
        'C) Particionamento de equivalência e análise de valor limite combinados.',
        'D) Cobertura de decisões, pois o código possui condicionais para aceitar ou rejeitar a idade.',
      ],
      correctIndex: 2,
      explanation:
        'Correto! O CT-C representa o particionamento (representante da classe válida). Os CTs A, B, D e E representam a análise de valor limite (valores nos limites e adjacentes). A combinação das duas técnicas é a prática recomendada. Conteúdo relacionado: Unidade 3.',
      errorExplanation:
        'O conjunto usa as duas técnicas: o CT-C cobre a classe válida por particionamento; os demais cobrem os limites por análise de valor limite. As duas são complementares e frequentemente usadas juntas. Revise a Unidade 3.',
    },
    {
      id: 'PK4-3',
      question:
        'Considere a afirmação: "Um teste bem-sucedido é aquele que o sistema passa sem apresentar erros." Essa afirmação está correta?',
      options: [
        'A) Sim, porque o objetivo do teste é confirmar que o sistema funciona corretamente.',
        'B) Não, porque um teste bem-sucedido é aquele que revela um defeito, mesmo que o sistema falhe.',
        'C) Sim, porque testes que o sistema passa aumentam a confiança na qualidade do software.',
        'D) Não, porque o resultado do teste não importa — o que importa é a cobertura de código.',
      ],
      correctIndex: 1,
      explanation:
        'Correto! Segundo Myers, um caso de teste bem-sucedido é aquele que encontra um defeito ainda não descoberto. O objetivo primário do teste é revelar problemas, não confirmar que tudo está certo. Conteúdo relacionado: Unidade 1.',
      errorExplanation:
        'Esta é uma confusão comum. Myers define que o propósito do teste é encontrar defeitos. Um teste que o sistema passa sem revelar nenhum problema pode ter sido mal projetado. Revise a Unidade 1.',
    },
  ],

  theoryBlocks: [
    {
      id: 'bloco-1',
      number: 1,
      title: 'O que é um Caso de Teste',
      icon: '📝',
      explanation: [
        'Um caso de teste é um conjunto estruturado de informações que define uma condição específica a ser verificada em um sistema de software. Ele especifica exatamente o que deve ser feito — quais entradas fornecer, quais passos seguir, em que condições iniciais o sistema deve estar — e qual resultado o sistema deveria produzir se estiver funcionando corretamente.',
        'Myers enfatiza que o teste de software deve ser uma atividade sistemática, não intuitiva. O caso de teste é o instrumento dessa sistematização: ele converte uma intenção vaga de "verificar se o login funciona" em uma instrução precisa que qualquer pessoa com acesso ao sistema pode executar e obter o mesmo resultado.',
        'Maldonado acrescenta que o caso de teste é um artefato do processo de teste, assim como o código-fonte é um artefato do processo de desenvolvimento. Artefatos precisam ser registrados, versionados e mantidos. Um caso de teste que existe apenas na memória do testador não é um caso de teste — é uma intenção não documentada.',
        'Sommerville relaciona os casos de teste diretamente aos requisitos: cada requisito funcional deveria ser coberto por pelo menos um caso de teste, e cada caso de teste deveria ser rastreável até o requisito que verifica. Essa rastreabilidade é o que permite ao gerente afirmar com evidência: "todos os requisitos foram testados".',
      ],
      example: {
        title: 'Intenção informal vs. caso de teste estruturado',
        body:
          'Intenção informal: "Testar se o login funciona com senha errada."\n\nCaso de teste estruturado:\n• ID: CT-LOGIN-002\n• Objetivo: Verificar se o sistema rejeita o acesso com senha incorreta.\n• Pré-condição: Usuário "joao@email.com" existe e está ativo.\n• Dados de entrada: E-mail = "joao@email.com", Senha = "senha_errada_123".\n• Passos: 1) Acessar a página de login. 2) Informar o e-mail. 3) Informar a senha incorreta. 4) Clicar em "Entrar".\n• Resultado esperado: Sistema exibe "E-mail ou senha incorretos." e não concede acesso.',
      },
      observation: {
        title: 'Atenção',
        body:
          'Um caso de teste não é um script de automação. Ele pode ser executado manualmente ou servir de base para automação, mas sua essência é conceitual: é a especificação de uma condição de verificação, independentemente do meio de execução.',
      },
      miniActivity: {
        type: 'fill',
        prompt:
          'Complete a frase: "Um caso de teste transforma uma _____________ de verificação em uma _____________ precisa, que pode ser executada por qualquer pessoa e _____________."',
        placeholder: 'Escreva a frase completa preenchendo as três lacunas...',
        expectedAnswer:
          '"intenção" (ou "ideia"); "instrução" (ou "especificação"); "reproduzida" (ou "replicada"). O caso de teste é o instrumento que garante que o teste seja reproduzível e comunicável.',
      },
    },
    {
      id: 'bloco-2',
      number: 2,
      title: 'Finalidade dos Casos de Teste',
      icon: '🎯',
      explanation: [
        'Os casos de teste servem a múltiplos propósitos no ciclo de vida do software. A finalidade mais imediata é verificar se o sistema se comporta conforme o esperado — identificando desvios entre o comportamento real e o especificado. Mas essa é apenas uma das dimensões.',
        'Uma segunda finalidade é a reprodutibilidade: quando um defeito é encontrado, o caso de teste documenta exatamente as condições que o revelaram. Sem essa documentação, a equipe de desenvolvimento não consegue reproduzir o problema de forma controlada para investigar sua causa. Com ela, o desenvolvedor recebe um roteiro preciso: execute estes passos, com estas entradas, nestas condições, e o defeito aparecerá.',
        'Uma terceira finalidade é a rastreabilidade. Casos de teste vinculados a requisitos específicos permitem responder à pergunta crítica do gerenciamento de qualidade: quais requisitos já foram testados? Com quais dados? Com qual resultado? Essa rastreabilidade é exigida em contextos de auditoria, certificação de qualidade e projetos regulados.',
        'Por fim, os casos de teste são insumos para a automação. Um caso bem estruturado — com entradas precisas, passos definidos e resultado esperado explícito — pode ser traduzido diretamente em um script de automação. Casos vagos ou incompletos não podem ser automatizados com confiança.',
      ],
      example: {
        title: 'Múltiplas finalidades',
        body:
          'Os casos de teste vão além do momento de execução. Eles são: (1) evidências de que o teste foi realizado; (2) insumos para automação; (3) instrumentos de comunicação entre equipes; (4) base para análise de impacto quando requisitos mudam. Um bom conjunto de casos de teste é um ativo do projeto.',
      },
      observation: {
        title: 'Atenção',
        body:
          'A finalidade primária do caso de teste é revelar defeitos, não confirmar correção. Casos cuidadosamente projetados aumentam a probabilidade de exercitar condições onde o sistema pode falhar — exatamente o oposto de procurar apenas o "caminho feliz".',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Identifique Verdadeiro (V) ou Falso (F) para cada item:\n(a) A principal finalidade de um caso de teste é confirmar que o sistema está correto.\n(b) Casos de teste bem documentados facilitam a reprodução de defeitos em produção.\n(c) A rastreabilidade entre casos de teste e requisitos é relevante apenas em projetos muito grandes.\n(d) Um caso de teste bem estruturado pode servir de base para automação.',
        placeholder: 'a) ... | b) ... | c) ... | d) ...',
        expectedAnswer:
          '(a) F — a finalidade primária é revelar defeitos, não confirmar correção. (b) V. (c) F — a rastreabilidade é útil em qualquer projeto. (d) V.',
      },
    },
    {
      id: 'bloco-3',
      number: 3,
      title: 'Estrutura de um Caso de Teste',
      icon: '🧱',
      explanation: [
        'A estrutura de um caso de teste define os campos que devem ser preenchidos para que ele seja completo, claro e reproduzível. Embora diferentes organizações usem nomenclaturas ligeiramente diferentes, os campos essenciais são consistentes na literatura e nos padrões da indústria.',
        'O ID permite que o caso seja referenciado de forma única em relatórios e planilhas de rastreabilidade. O título fornece uma descrição concisa do que é verificado. O objetivo explica por que o caso existe — qual comportamento está sendo verificado e por que é importante. O requisito relacionado estabelece a rastreabilidade com a especificação.',
        'As pré-condições descrevem o estado em que o sistema deve estar antes da execução. Os dados de entrada especificam os valores exatos que serão fornecidos. Os passos de execução descrevem, em ordem, as ações que o executor deve realizar. O resultado esperado define o que o sistema deveria fazer se estiver correto. O resultado obtido registra o que o sistema realmente fez. O status indica se o teste passou ou falhou.',
        'Visão geral dos 10 campos essenciais: ID, Título, Objetivo, Requisito relacionado, Pré-condições, Dados de entrada, Passos de execução, Resultado esperado, Resultado obtido, Status (Passou / Falhou / Bloqueado / Não executado).',
      ],
      example: {
        title: 'Os 10 campos essenciais',
        body:
          '• ID — identificador único (ex.: CT-LOGIN-001).\n• Título — nome breve e descritivo.\n• Objetivo — o que se verifica e por quê.\n• Requisito relacionado — código do requisito (ex.: RF-005).\n• Pré-condições — estado do sistema antes de iniciar.\n• Dados de entrada — valores exatos a fornecer.\n• Passos de execução — ações numeradas a realizar.\n• Resultado esperado — comportamento correto do sistema.\n• Resultado obtido — o que o sistema realmente produziu.\n• Status — Passou (P) / Falhou (F) / Bloqueado (B) / Não executado (N).',
      },
      observation: {
        title: 'Completude',
        body:
          'Nenhum campo é dispensável sem justificativa. Casos sem pré-condições não podem ser reproduzidos. Casos sem resultado esperado não podem ser avaliados. Casos sem ID não podem ser rastreados. A completude é um requisito de qualidade do próprio caso de teste.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Um colega apresenta um caso de teste com os seguintes campos preenchidos: ID, título, dados de entrada, passos e resultado obtido. Quais campos essenciais estão ausentes?',
        placeholder: 'Liste os campos ausentes e indique qual é o mais crítico...',
        expectedAnswer:
          'Estão ausentes: objetivo, requisito relacionado, pré-condições, resultado esperado e status. O resultado esperado é especialmente crítico: sem ele, não é possível determinar se o sistema passou ou falhou no teste.',
      },
    },
    {
      id: 'bloco-4',
      number: 4,
      title: 'Pré-condições e Dados de Entrada',
      icon: '📥',
      explanation: [
        'As pré-condições descrevem o estado do sistema e o contexto necessário para que o caso de teste possa ser executado de forma válida. Elas garantem que o teste comece sempre a partir da mesma situação, tornando-o reproduzível. Pré-condições típicas incluem: estado da base de dados, estado de sessão do usuário, configurações do sistema, dados previamente criados e hora do sistema, quando relevante.',
        'Os dados de entrada especificam os valores exatos que serão fornecidos ao sistema durante a execução. A palavra "exatos" é crucial: dados vagos produzem testes irreproduzíveis. "Inserir um e-mail" não é um dado de entrada — "Inserir o e-mail usuario@dominio.com" é um dado de entrada. A especificidade dos dados é o que permite que dois testadores diferentes executem exatamente o mesmo teste.',
        'Maldonado observa que os dados de entrada devem ser derivados das técnicas de teste — particionamento de equivalência, análise de valor limite, tabelas de decisão — e não escolhidos aleatoriamente. Isso garante que cada caso de teste seja justificado por um critério metodológico.',
        'Pré-condições e dados de entrada respondem a perguntas diferentes. Pré-condições respondem "em que estado o sistema deve estar antes de começar?". Dados de entrada respondem "o que o testador vai fornecer ao sistema durante a execução?". Confundir os dois campos compromete a reprodutibilidade do teste.',
      ],
      example: {
        title: 'Validação de campo de e-mail no cadastro',
        body:
          'Pré-condições adequadas:\n• O sistema de cadastro está acessível.\n• Não existe usuário cadastrado com "teste@exemplo.com".\n• O banco de dados de usuários está vazio para teste.\n\nDados de entrada adequados:\n• Campo Nome: "Carlos Alves"\n• Campo E-mail: "e-mail invalido sem arroba"\n• Campo Senha: "Teste@123"\n\nVersões inadequadas (vagas):\n• Pré-condição: "O sistema está funcionando."\n• Dados: "Nome qualquer, e-mail inválido, senha qualquer."',
      },
      observation: {
        title: 'Distinção importante',
        body:
          'Estado prévio = pré-condição. Valor digitado ou enviado durante a execução = dado de entrada. Quando o cenário exige que algum registro já exista no sistema (ex.: "CPF já cadastrado"), esse registro pertence às pré-condições — não aos dados de entrada.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Classifique cada item como Pré-condição (P) ou Dado de entrada (D):\n(a) O usuário "admin@sistema.com" já está cadastrado com perfil de administrador.\n(b) Campo "Desconto": 15%.\n(c) O carrinho de compras contém 3 itens com valor total de R$ 250,00.\n(d) Campo "Senha atual": "Abc@12345".',
        placeholder: 'a) ... | b) ... | c) ... | d) ...',
        expectedAnswer:
          '(a) P — descreve o estado do sistema antes do teste. (b) D — é o valor fornecido durante a execução. (c) P — é o estado do carrinho antes do início. (d) D — é o valor digitado pelo executor durante os passos.',
      },
    },
    {
      id: 'bloco-5',
      number: 5,
      title: 'Passos de Execução',
      icon: '🪜',
      explanation: [
        'Os passos de execução são a sequência numerada de ações que o executor do teste deve realizar para completar o caso. Eles transformam o caso de teste em um roteiro operacional: lido do início ao fim, o executor sabe exatamente o que fazer, em que ordem, sem precisar interpretar nem improvisar.',
        'Passos de qualidade são atômicos — cada passo descreve uma única ação. São objetivos — usam verbos de ação claros: "Clicar", "Inserir", "Selecionar", "Navegar", "Verificar". São completos — não omitem ações intermediárias que o executor poderia não conhecer. E são sequenciais — a ordem importa, e cada passo pressupõe que o anterior foi concluído com sucesso.',
        'Myers observa que passos mal escritos são uma das causas mais frequentes de divergência de resultados entre testadores diferentes executando o mesmo caso. Quando os passos são vagos ("testar o login"), cada testador interpreta a ação de forma diferente, e o teste deixa de ser reproduzível. A reprodutibilidade é o critério mais básico de qualidade de um passo.',
        'Passos de verificação (começando com "Verificar") devem estar incluídos quando o resultado a ser observado ocorre durante a execução, e não apenas no final. Se um sistema exibe mensagens intermediárias que fazem parte do comportamento esperado, essas verificações devem ser passos explícitos.',
      ],
      example: {
        title: 'Passos vagos vs. passos objetivos',
        body:
          'Vagos (não reproduzíveis):\n1) Abrir o sistema. 2) Fazer o login. 3) Ir para pedidos. 4) Fazer o pedido. 5) Verificar.\n\nObjetivos e reproduzíveis:\n1) Acessar "https://sistema.empresa.com/login".\n2) No campo "E-mail", inserir "gerente@empresa.com".\n3) No campo "Senha", inserir "Gerente@2024".\n4) Clicar em "Entrar".\n5) Verificar que o painel exibe "Bem-vindo, Gerente".\n6) Clicar em "Pedidos" no menu lateral.\n7) Clicar em "Novo Pedido".\n8) No campo "Produto", inserir "Notebook Dell Inspiron 15".\n9) No campo "Quantidade", inserir "2".\n10) Clicar em "Confirmar Pedido".\n11) Verificar a mensagem "Pedido realizado com sucesso" e o número do pedido.',
      },
      observation: {
        title: 'Verificações intermediárias',
        body:
          'Não pressuponha que o executor saiba o que observar. Se há comportamentos intermediários relevantes (diálogos de confirmação, mensagens de status, atualização da tela), inclua-os como passos explícitos de "Verificar".',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'O passo abaixo é adequado? Justifique e, se necessário, reescreva-o:\n"Passo 3: Fazer o pagamento do pedido."',
        placeholder: 'Sua análise + passos reescritos...',
        expectedAnswer:
          'Não é adequado — é vago e não especifica como fazer o pagamento. Reescrita possível: "3. Clicar em \'Prosseguir para Pagamento\'. 4. Selecionar \'Cartão de Crédito\'. 5. No campo \'Número do cartão\', inserir \'4111111111111111\'. 6. No campo \'Validade\', inserir \'12/2028\'. 7. No campo \'CVV\', inserir \'123\'. 8. Clicar em \'Confirmar Pagamento\'."',
      },
    },
    {
      id: 'bloco-6',
      number: 6,
      title: 'Resultado Esperado e Resultado Obtido',
      icon: '🎯',
      explanation: [
        'O resultado esperado é a especificação do comportamento correto do sistema para as entradas e condições do caso de teste. Ele deve ser definido antes da execução — idealmente no momento em que o caso é elaborado, com base no requisito. Um resultado esperado definido após a execução está sujeito ao viés de confirmação: o testador tende a considerar o comportamento observado como "correto" por já tê-lo visto.',
        'O resultado esperado deve ser observável e mensurável. "O sistema funciona corretamente" não é um resultado esperado — é um julgamento subjetivo. "O sistema exibe a mensagem \'Cadastro realizado com sucesso\' e envia um e-mail de confirmação para o endereço informado" é um resultado esperado observável e verificável.',
        'O resultado obtido é o registro do que o sistema realmente fez durante a execução. Quando diverge do resultado esperado, o caso falha — e essa divergência é evidência de um possível defeito. O resultado obtido deve ser registrado com a mesma precisão com que o resultado esperado foi definido.',
        'O resultado esperado é derivado do requisito. Se o requisito é ambíguo ou incompleto, o resultado esperado também será. Casos com resultados esperados imprecisos não são verificáveis. Antes de elaborar o caso, verifique se o requisito é suficientemente claro para derivar um resultado esperado objetivo.',
      ],
      example: {
        title: 'Resultado esperado: inadequado vs. adequado',
        body:
          'Inadequado: "O sistema deve funcionar e salvar o dado."\n\nAdequado: "O sistema exibe a mensagem \'Usuário cadastrado com sucesso.\' O novo usuário aparece na lista de usuários ativos. Um e-mail de boas-vindas é enviado para o endereço informado."\n\nResultado obtido (divergente): "O sistema exibiu a mensagem \'Erro ao salvar usuário: violação de chave única\' e não criou o registro. Nenhum e-mail foi enviado."',
      },
      observation: {
        title: 'Resultado esperado e requisito',
        body:
          'Definir o resultado esperado antes da execução é uma proteção contra o viés de confirmação. Se você define o resultado depois de observar o sistema, qualquer comportamento estranho tende a ser racionalizado como "deve ser assim mesmo".',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'O resultado esperado abaixo é adequado? "O sistema deve mostrar uma mensagem de erro quando o e-mail for inválido."',
        placeholder: 'Sua análise + versão melhorada...',
        expectedAnswer:
          'Parcialmente adequado, mas pode ser melhorado. Falta especificar: qual mensagem exatamente? O campo de e-mail fica destacado de alguma forma? O formulário impede o envio? Versão melhorada: "O sistema exibe a mensagem \'Por favor, informe um e-mail válido.\' abaixo do campo de e-mail. O campo fica com borda vermelha. O formulário não é submetido."',
      },
    },
    {
      id: 'bloco-7',
      number: 7,
      title: 'Status do Teste',
      icon: '🚦',
      explanation: [
        'O status do teste é o campo que registra o veredicto da execução: o caso passou, falhou, foi bloqueado ou não foi executado? O status é determinado pela comparação entre o resultado esperado e o resultado obtido.',
        '"Passou" (P) indica que o sistema se comportou exatamente como especificado no resultado esperado. "Falhou" (F) indica divergência: o sistema se comportou de forma diferente do esperado, evidenciando um possível defeito. "Bloqueado" (B) indica que o caso não pôde ser executado porque uma pré-condição não foi atendida ou um defeito anterior impediu a execução. "Não executado" (N) indica que o caso foi planejado mas ainda não foi executado naquele ciclo.',
        'O status também pode incluir indicações sobre a versão do sistema testada, a data da execução e o nome do executor. Essas informações são essenciais para a rastreabilidade histórica: um caso que passou na versão 1.2 pode falhar na versão 1.3 após uma alteração de código.',
        'O status "Passou" não significa que o sistema é livre de defeitos nessa condição — significa que o sistema se comportou conforme o especificado no resultado esperado. Se o resultado esperado estava errado (derivado de um requisito incorreto), o caso pode passar e o defeito permanecer. A qualidade do resultado esperado determina a qualidade do veredicto.',
      ],
      example: {
        title: 'Tabela de status',
        body:
          '• Passou (P) — RE == RO. O sistema funciona conforme o requisito para esta condição.\n• Falhou (F) — RE != RO. Há um possível defeito que deve ser registrado e investigado.\n• Bloqueado (B) — Pré-condição não atendida ou defeito anterior impediu a execução. Registrar o motivo.\n• Não executado (N) — Planejado mas não executado neste ciclo.',
      },
      observation: {
        title: 'Limitação do status',
        body:
          'Bloqueado ≠ Falhou. Falhou significa que o teste foi executado e o resultado divergiu. Bloqueado significa que o teste não pôde ser executado por impedimento externo. Misturar os dois compromete o diagnóstico e a métrica de qualidade da entrega.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'O testador executou um caso de teste de cadastro. O resultado esperado era "sistema exibe mensagem de sucesso e envia e-mail de confirmação". O sistema exibiu a mensagem, mas não enviou o e-mail. Qual é o status correto e por quê?',
        placeholder: 'Status: ... | Justificativa: ...',
        expectedAnswer:
          'Status: Falhou. O resultado obtido diverge do esperado: apenas uma das duas condições foi atendida (a mensagem foi exibida, mas o e-mail não foi enviado). O caso só pode ter status "Passou" quando todas as condições do resultado esperado são satisfeitas integralmente.',
      },
    },
    {
      id: 'bloco-8',
      number: 8,
      title: 'Critérios de Qualidade de um Bom Caso de Teste',
      icon: '⭐',
      explanation: [
        'Nem todo caso de teste é um bom caso de teste. Um documento com todos os campos preenchidos ainda pode ser de baixa qualidade se os conteúdos forem vagos, incoerentes, irreproduzíveis ou desvinculados do requisito. Os critérios de qualidade definem o que é preciso para que ele seja verdadeiramente útil.',
        'Clareza: qualquer pessoa familiarizada com o sistema deve conseguir executar o caso sem precisar pedir explicações ao autor. Objetividade: cada campo deve conter informações precisas, sem ambiguidades. Completude: nenhum campo essencial pode estar ausente ou vazio. Reprodutibilidade: qualquer executor, em qualquer momento, deve chegar ao mesmo resultado seguindo os passos. Coerência com o requisito: o caso deve verificar exatamente o que o requisito especifica.',
        'Myers acrescenta um critério frequentemente esquecido: a economicidade. Um bom caso de teste é aquele que maximiza a probabilidade de revelar defeitos com o mínimo de esforço. Casos redundantes — que verificam exatamente o mesmo comportamento com dados trivialmente diferentes — não agregam valor proporcional ao custo de executá-los e mantê-los.',
        'Checklist de qualidade: Clareza (qualquer testador consegue executar sem ajuda?), Objetividade (dados/passos/resultado são precisos?), Completude (todos os campos essenciais preenchidos?), Reprodutibilidade (executores diferentes produzem o mesmo resultado?), Coerência com o requisito (verifica exatamente o que o requisito especifica?), Unicidade (verifica algo que nenhum outro CT já verifica?) e Economicidade (é o mais eficiente para revelar o defeito em questão?).',
      ],
      example: {
        title: 'Qualidade ≠ extensão',
        body:
          'Um caso de teste de qualidade não precisa ser longo. A extensão não é critério de qualidade — a precisão sim. Um caso com dois passos claros, pré-condições bem definidas e resultado esperado objetivo é superior a um com dez passos vagos.',
      },
      observation: {
        title: 'Atenção',
        body:
          'A qualidade do caso de teste é avaliada pelo seu conteúdo, não pela sua aparência. Um caso belamente formatado mas com dados vagos é inferior a um simples mas preciso. Privilegie a precisão.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Avalie o caso de teste abaixo com base nos critérios de qualidade:\n\nTítulo: Testar o sistema.\nPassos: 1) Abrir o sistema. 2) Fazer alguma coisa. 3) Verificar se funcionou.\nResultado esperado: O sistema deve funcionar.',
        placeholder: 'Liste os critérios violados...',
        expectedAnswer:
          'Viola: clareza (passos vagos), objetividade (dados ausentes), completude (pré-condições, ID, objetivo e requisito ausentes), reprodutibilidade (impossível reproduzir sem instruções específicas) e coerência com requisito (nenhum requisito referenciado). Praticamente todos os problemas críticos de qualidade.',
      },
    },
    {
      id: 'bloco-9',
      number: 9,
      title: 'Relação entre Requisitos, Técnicas e Casos de Teste',
      icon: '🔗',
      explanation: [
        'Casos de teste não surgem do nada: eles são derivados de requisitos com o apoio de técnicas de teste. Essa cadeia de derivação — requisito → técnica → caso de teste — é o fundamento da rastreabilidade e da sistematização do processo de teste.',
        'O requisito define o comportamento esperado do sistema. As técnicas de teste (particionamento de equivalência, análise de valor limite, cobertura de decisões, entre outras) fornecem os critérios para selecionar quais condições e cenários testar. Os casos de teste concretizam essas condições em instruções executáveis com dados, passos e resultados esperados específicos.',
        'A rastreabilidade entre casos de teste e requisitos permite responder a perguntas críticas: Todos os requisitos foram testados? Quantos casos de teste verificam cada requisito? Se um requisito for alterado, quais casos precisam ser revisados? Em projetos com gestão de qualidade rigorosa, essa rastreabilidade é documentada em uma matriz de rastreabilidade.',
        'Sommerville destaca que a falta de rastreabilidade é um risco de projeto: quando os requisitos mudam, a equipe não sabe quais casos foram invalidados. Resultado: testes obsoletos passam em funcionalidades que não correspondem mais ao requisito atual, dando uma falsa sensação de qualidade.',
      ],
      example: {
        title: 'Exemplo de matriz de rastreabilidade',
        body:
          '• RF-001 (Validar e-mail no cadastro) — Particionamento de equivalência — CT-CAD-001, CT-CAD-002, CT-CAD-003.\n• RF-002 (Limite de tentativas de login) — Valor limite — CT-LOGIN-004, CT-LOGIN-005.\n• RF-003 (Cálculo de desconto por faixa) — Particionamento + valor limite — CT-DESC-001 a CT-DESC-006.\n• RF-004 (Rejeitar pagamento com cartão expirado) — Particionamento — CT-PAG-007, CT-PAG-008.',
      },
      observation: {
        title: 'Rastreabilidade',
        body:
          'Um caso de teste sem requisito relacionado é um teste sem justificativa. Não há como saber se ele verifica algo relevante, se está desatualizado ou se pode ser eliminado. A rastreabilidade é um investimento de curto prazo com alto retorno em manutenção e auditoria.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Um requisito é alterado: o limite de transferência bancária muda de R$ 5.000,00 para R$ 10.000,00. Quais casos de teste precisariam ser revisados? Como a rastreabilidade ajuda?',
        placeholder: 'Sua análise...',
        expectedAnswer:
          'Todos os casos de teste que verificam a regra de limite — especialmente aqueles com dados nos valores-limite antigos (R$ 4.999, R$ 5.000, R$ 5.001) e no novo limite (R$ 9.999, R$ 10.000, R$ 10.001). Sem rastreabilidade, seria necessário revisar todos os casos do módulo de transferência. Com rastreabilidade, a matriz indica imediatamente quais casos estão vinculados ao requisito alterado.',
      },
    },
  ],

  demonstration: {
    requirement:
      'RF-005: O sistema de e-commerce deve aplicar desconto de 10% no valor total do pedido quando o cupom "DESCONTO10" for inserido no campo de cupom da tela de checkout. O cupom deve ser válido apenas para pedidos com valor total superior a R$ 50,00. Cupons inválidos, expirados ou aplicados a pedidos abaixo de R$ 50,00 devem exibir a mensagem de erro correspondente.',
    situation:
      'Vamos elaborar passo a passo um caso de teste completo para o fluxo principal do RF-005 (cupom válido em pedido acima de R$ 50,00), demonstrando como cada campo é derivado do requisito e como os critérios de qualidade são aplicados na prática.',
    steps: [
      {
        id: 1,
        label: 'Interpretar o requisito',
        question: 'Quantos cenários distintos o RF-005 define?',
        body:
          'O RF-005 define três condições distintas que precisam ser testadas:\n\n(1) Cupom válido em pedido acima de R$ 50,00 → desconto aplicado.\n(2) Cupom válido em pedido igual ou abaixo de R$ 50,00 → erro.\n(3) Cupom inválido → erro.\n\nCada condição é um caso de teste separado. Aqui demonstraremos o caso do fluxo principal (condição 1).',
        color: '#1F8A5B',
      },
      {
        id: 2,
        label: 'Identificação e contexto',
        question: 'Como preencher ID, título, objetivo e requisito?',
        body:
          '• ID: CT-DESC-001\n• Título: Aplicar cupom válido em pedido acima de R$ 50,00\n• Objetivo: Verificar se o sistema aplica corretamente o desconto de 10% quando o cupom DESCONTO10 é inserido em um pedido com valor total superior a R$ 50,00, conforme o RF-005.\n• Requisito: RF-005 — Aplicação de cupom de desconto\n\nO objetivo amarra explicitamente o caso ao comportamento esperado e ao requisito. O ID segue um padrão por módulo (DESC = desconto).',
        color: '#146B4A',
      },
      {
        id: 3,
        label: 'Pré-condições e dados de entrada',
        question: 'Qual estado o sistema precisa ter? Quais dados serão fornecidos?',
        body:
          'Pré-condições:\n1) O usuário está logado com a conta "cliente@email.com".\n2) O carrinho contém itens com valor total de R$ 120,00 (escolhido por estar claramente acima do limite de R$ 50,00).\n3) O cupom "DESCONTO10" está ativo e não foi utilizado por este usuário.\n4) O sistema está na tela de checkout, exibindo o resumo do pedido.\n\nDados de entrada:\n• Campo "Cupom de desconto": DESCONTO10\n\nO valor R$ 120,00 foi escolhido porque o cálculo esperado (120 × 0,9 = 108) é simples de verificar.',
        color: '#0F3D2E',
      },
      {
        id: 4,
        label: 'Passos de execução',
        question: 'Como o executor deve interagir com o sistema?',
        body:
          '1) Na tela de checkout, localizar o campo "Cupom de desconto".\n2) Inserir o valor "DESCONTO10" no campo.\n3) Clicar no botão "Aplicar Cupom".\n4) Verificar a mensagem exibida pelo sistema.\n5) Verificar o valor total do pedido após a aplicação do cupom.\n\nCada passo é atômico (uma única ação), objetivo (verbo de ação claro) e específico (valor exato). Os passos 4 e 5 são verificações intermediárias — garantem que o executor saiba o que observar.',
        color: '#4CAF50',
      },
      {
        id: 5,
        label: 'Resultado esperado, obtido e status',
        question: 'Como descrever o veredicto do teste?',
        body:
          'Resultado esperado:\n1) Mensagem "Cupom aplicado com sucesso. Desconto de 10% concedido."\n2) Valor total atualizado de R$ 120,00 para R$ 108,00.\n3) Campo de cupom desabilitado (não permite novo cupom).\n4) Resumo do pedido exibe o desconto de R$ 12,00 de forma destacada.\n\nResultado obtido (simulado): Sistema exibiu a mensagem, valor atualizado para R$ 108,00, campo desabilitado, resumo exibe "Desconto: -R$ 12,00".\n\nStatus: Passou (P). Todas as 4 condições do resultado esperado foram atendidas.',
        color: '#0F3D2E',
      },
    ],
    lesson:
      'O caso de teste completo nasce do requisito (RF-005), é estruturado nos 10 campos essenciais (ID, título, objetivo, requisito, pré-condições, dados, passos, resultado esperado, resultado obtido, status) e respeita os critérios de qualidade: dados específicos, passos atômicos, resultado esperado observável com múltiplas condições verificáveis. Esse padrão pode (e deve) ser aplicado a qualquer requisito.',
  },

  atividade12: {
    question:
      'RF-012: O aluno pode se matricular em uma disciplina optativa apenas se não houver conflito de horário com as disciplinas já matriculadas no mesmo período. Se houver conflito, o sistema deve exibir: "Conflito de horário detectado: [nome da disciplina conflitante]. Matrícula não realizada."\n\nDisciplinas disponíveis: (a) Matemática Discreta — segunda e quarta, 14h–16h; (b) Inteligência Artificial — segunda e quarta, 15h–17h (conflita com Matemática Discreta); (c) Banco de Dados Avançado — terça e quinta, 10h–12h (sem conflito).\n\nElabore um caso de teste COMPLETO para verificar o comportamento do sistema quando o aluno tenta se matricular em uma disciplina com conflito de horário. Sua resposta deve incluir, claramente identificados, os 10 campos: ID, Título, Objetivo, Requisito relacionado, Pré-condições, Dados de entrada, Passos de execução, Resultado esperado, Resultado obtido e Status.',
    minWords: 200,
    criteria: [
      'ID, título, objetivo e requisito relacionado presentes e coerentes com o cenário de conflito.',
      'Pré-condições especificam o estado do aluno (logado) e a disciplina já matriculada com horário exato (Matemática Discreta, 14h–16h).',
      'Dados de entrada identificam a disciplina selecionada com nome e/ou código.',
      'Passos de execução são atômicos, numerados, incluem verificação da mensagem e da lista de matrículas.',
      'Resultado esperado contém a mensagem de erro exata, confirma que a matrícula NÃO foi realizada e descreve o estado final do sistema.',
    ],
    sampleAnswer:
      'ID: CT-MAT-002\nTítulo: Tentativa de matrícula em disciplina com conflito de horário\nObjetivo: Verificar se o sistema detecta o conflito de horário e impede a matrícula em disciplina optativa que se sobrepõe a uma disciplina já matriculada, exibindo a mensagem de erro correta (RF-012).\nRequisito relacionado: RF-012 — Verificação de conflito de horário em matrículas optativas\n\nPré-condições:\n1) O aluno "joao.silva@universidade.edu" está logado no sistema.\n2) O aluno já está matriculado na disciplina "Matemática Discreta" (segunda e quarta, 14h–16h) para o próximo semestre.\n3) A disciplina "Inteligência Artificial" está disponível para matrícula (segunda e quarta, 15h–17h).\n4) O sistema exibe a tela de seleção de disciplinas optativas.\n\nDados de entrada:\n• Disciplina selecionada: Inteligência Artificial (código IA-201)\n\nPassos de execução:\n1) Na tela de seleção de disciplinas optativas, localizar "Inteligência Artificial (IA-201)".\n2) Clicar no botão "Matricular" ao lado da disciplina.\n3) Verificar a mensagem exibida pelo sistema.\n4) Verificar se a disciplina foi adicionada à lista de matrículas do aluno.\n\nResultado esperado:\n1) O sistema exibe: "Conflito de horário detectado: Matemática Discreta. Matrícula não realizada."\n2) A disciplina "Inteligência Artificial" NÃO aparece na lista de disciplinas matriculadas do aluno.\n3) O sistema permanece na tela de seleção de disciplinas.\n\nResultado obtido: (a ser preenchido após a execução)\nStatus: (a ser determinado após execução: Passou / Falhou / Bloqueado)\n\nObservação: as pré-condições controlam o cenário de conflito (Matemática Discreta às 14h–16h se sobrepõe a Inteligência Artificial às 15h–17h). O resultado esperado é completo: contém a mensagem exata + confirmação de que a matrícula NÃO foi realizada + estado final da tela.',
    rubric: [
      {
        level: 'Insuficiente',
        range: '0 – 25%',
        description:
          'A resposta não apresenta campos suficientes, campos vagos ou conteúdo não relacionado ao RF-012. Revisitar todos os blocos da unidade, especialmente o Bloco 3 (Estrutura) e o Bloco 4 (Pré-condições).',
      },
      {
        level: 'Básico',
        range: '26 – 50%',
        description:
          'Campos principais presentes, mas pré-condições vagas, dados sem especificidade ou resultado esperado parcial (não confirma que a matrícula não foi realizada). Revisar Blocos 4, 5 e 6.',
      },
      {
        level: 'Satisfatório',
        range: '51 – 75%',
        description:
          'Todos os 10 campos presentes com conteúdo coerente. Pequenas imprecisões no resultado esperado (ex.: não inclui o estado final da tela) ou nos passos (ainda não atômicos). Revisar Bloco 6.',
      },
      {
        level: 'Excelente',
        range: '76 – 100%',
        description:
          'Caso de teste completo, com pré-condições específicas que garantem a reprodutibilidade, dados precisos, passos atômicos com verificações intermediárias e resultado esperado contendo a mensagem exata, confirmação negativa (matrícula não realizada) e estado final do sistema.',
      },
    ],
  },

  atividade11: {
    description:
      'Avaliação prática de 5 casos de teste prontos. Para cada caso, identifique se ele está adequado ou se possui problemas de qualidade, escolhendo o diagnóstico mais completo entre as alternativas. Você recebe feedback imediato após cada resposta.',
    questions: [
      {
        id: '4.2.1',
        question:
          'Avalie o caso de teste:\n\nTítulo: Testar o sistema de login.\nPré-condições: O sistema deve estar funcionando.\nDados de entrada: Usuário e senha válidos.\nPassos: 1) Abrir o sistema. 2) Fazer o login.\nResultado esperado: O login funciona.\n\nQual é o diagnóstico mais completo?',
        options: [
          'A) O caso de teste está adequado: todos os campos principais foram preenchidos.',
          'B) Apenas o título precisa ser melhorado.',
          'C) Múltiplos problemas: pré-condição vaga, dados de entrada sem valores específicos, passos não atômicos, resultado esperado subjetivo e campos essenciais (ID, objetivo, requisito) ausentes.',
          'D) Apenas o resultado esperado precisa ser refinado; o restante está adequado.',
        ],
        correctIndex: 2,
        explanation:
          'Correto! O caso viola clareza (passos vagos), objetividade (dados vagos), completude (campos ausentes), reprodutibilidade (executor não sabe quais valores usar) e coerência com requisito (nenhum requisito referenciado). Esses são os problemas mais frequentes em casos mal escritos.',
        errorExplanation:
          'Revise o Bloco 8. O caso viola praticamente todos os critérios de qualidade: dados vagos ("usuário e senha válidos"), passos compostos ("fazer o login"), resultado subjetivo ("funciona") e ausência de ID, objetivo e requisito.',
        reviewBlock: 'bloco-8',
      },
      {
        id: '4.2.2',
        question:
          'Avalie o caso CT-PROD-003:\n\nID: CT-PROD-003 · Título: Adicionar produto ao carrinho com estoque zero · Objetivo: Verificar se o sistema impede a adição de produto sem estoque ao carrinho. · Requisito: RF-018. · Pré-condições: O produto "Fone de Ouvido Bluetooth XB500" (PRD-201) tem estoque = 0. · Dados de entrada: Produto: Fone Bluetooth XB500 (PRD-201); Quantidade: 1. · Passos: 1) Acessar a página do produto. 2) Verificar que exibe "Sem estoque". 3) Clicar em "Adicionar ao Carrinho". 4) Verificar a mensagem. · Resultado esperado: O sistema exibe "Produto indisponível no momento. Não é possível adicionar ao carrinho." O produto não é adicionado ao carrinho.\n\nEste caso está adequado?',
        options: [
          'A) Sim — todos os campos essenciais presentes com informações específicas; pré-condição controla o estado crítico (estoque zero); passos atômicos com verificações; resultado esperado observável e inclui verificação negativa (não adicionado).',
          'B) Não — faltam pré-condições.',
          'C) Não — o resultado esperado é vago.',
          'D) Não — os passos não são atômicos.',
        ],
        correctIndex: 0,
        explanation:
          'Correto! Caso de teste bem estruturado. ID presente, objetivo claro, pré-condição controla o estado crítico (estoque zero), dados específicos, passos atômicos com verificações intermediárias e resultado esperado observável com duas condições verificáveis (mensagem exata + confirmação de não adição).',
        errorExplanation:
          'Avalie campo por campo: ID (presente), objetivo (claro), pré-condição (especifica o estado do estoque), dados (produto e quantidade exatos), passos (atômicos), resultado esperado (mensagem exata e confirmação negativa). Compare com os critérios do Bloco 8.',
        reviewBlock: 'bloco-8',
      },
      {
        id: '4.2.3',
        question:
          'Avalie o caso CT-REL-007:\n\nID: CT-REL-007 · Título: Gerar relatório de vendas do mês · Objetivo: Verificar se o relatório de vendas é gerado corretamente. · Passos: 1) Acessar o módulo de relatórios. 2) Selecionar o mês de outubro. 3) Clicar em "Gerar Relatório". 4) Verificar o relatório. · Resultado esperado: O relatório é gerado.\n\nIdentifique os problemas:',
        options: [
          'A) Apenas falta o requisito relacionado.',
          'B) Requisito ausente, pré-condições ausentes, passo de verificação vago ("verificar o relatório") e resultado esperado não verificável ("o relatório é gerado").',
          'C) Apenas falta o resultado esperado.',
          'D) Não há problemas relevantes; o caso pode ser executado.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! Sem requisito não há rastreabilidade. Sem pré-condições o executor não sabe se deve haver vendas cadastradas, qual usuário deve estar logado, qual permissão é necessária. O passo "verificar o relatório" é vago e o resultado "é gerado" não diz quais colunas, totais ou períodos devem aparecer.',
        errorExplanation:
          'Como o executor sabe o que verificar no passo 4 sem um resultado esperado detalhado? O relatório deve conter quais colunas? Quais totais? Sem resposta, o teste não pode ser avaliado objetivamente. Revise os Blocos 4, 5 e 6.',
        reviewBlock: 'bloco-6',
      },
      {
        id: '4.2.4',
        question:
          'Avalie o caso CT-SEG-001:\n\nID: CT-SEG-001 · Título: Tentativa de acesso sem autenticação · Objetivo: Verificar se o sistema redireciona o usuário não autenticado para a página de login ao tentar acessar uma página restrita. · Requisito: RF-003. · Pré-condições: (1) Nenhuma sessão ativa no navegador. (2) O sistema está acessível em https://sistema.empresa.com. · Dados de entrada: URL: https://sistema.empresa.com/dashboard. · Passos: 1) Abrir o navegador sem sessão. 2) Digitar a URL na barra. 3) Pressionar Enter. 4) Verificar a página carregada. · Resultado esperado: O sistema redireciona para /login com a mensagem "Acesso restrito. Por favor, faça o login para continuar." A URL exibe a página de login, não o dashboard.\n\nEste caso está adequado?',
        options: [
          'A) Sim — completo e bem estruturado: todos os campos essenciais presentes, pré-condições definem claramente o estado (sem sessão ativa), dados específicos, passos atômicos e resultado esperado contém URL de redirecionamento, mensagem exata e verificação negativa (não exibe dashboard).',
          'B) Não — falta o requisito relacionado.',
          'C) Não — pré-condições insuficientes.',
          'D) Não — passos não atômicos.',
        ],
        correctIndex: 0,
        explanation:
          'Correto! Caso de teste completo. Destaque para o resultado esperado, que inclui três elementos verificáveis: (1) URL de destino do redirecionamento; (2) mensagem exata exibida; (3) confirmação negativa de que o dashboard não foi carregado.',
        errorExplanation:
          'Analise o resultado esperado: contém URL de destino, mensagem exata e confirmação negativa. Compare com o resultado esperado do CT-REL-007 — a diferença de qualidade é evidente. Revise o Bloco 6.',
        reviewBlock: 'bloco-6',
      },
      {
        id: '4.2.5',
        question:
          'Avalie o caso CT-CAD-009 (cadastro com CPF já existente):\n\nID: CT-CAD-009 · Objetivo: Verificar se o sistema impede o cadastro duplicado de CPF. · Requisito: RF-007. · Pré-condições: Não informadas. · Dados de entrada: CPF: 123.456.789-09; Nome: Maria Souza; E-mail: maria@email.com · Passos: 1) Acessar a tela de cadastro. 2) Preencher CPF, Nome e E-mail. 3) Clicar em "Cadastrar". 4) Verificar a mensagem. · Resultado esperado: O sistema exibe "CPF já cadastrado. Não é possível criar um novo usuário com este CPF." O cadastro não é criado.\n\nQual é o principal problema?',
        options: [
          'A) Falta o título do caso.',
          'B) Falta o ID do caso.',
          'C) As pré-condições estão ausentes — para testar "CPF já existente", o CPF "123.456.789-09" precisa estar previamente cadastrado no sistema antes da execução; sem isso, o sistema aceitaria o cadastro e o teste passaria quando deveria falhar.',
          'D) Os passos são vagos.',
        ],
        correctIndex: 2,
        explanation:
          'Correto! Sem a pré-condição de que o CPF já existe, o teste não pode reproduzir o cenário de duplicidade. O executor precisaria adivinhar que deveria cadastrar o CPF antes de executar o teste — o que não está documentado e gera resultados imprevisíveis. O restante do caso está bem estruturado.',
        errorExplanation:
          'Pré-condições descrevem o estado do sistema antes da execução. Para testar "CPF já existente", o CPF precisa JÁ existir antes do teste começar. Isso deve estar explícito nas pré-condições. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },
    ],
  },

  guidedPracticeRich: {
    scenario:
      'RF-008: O sistema deve permitir o cancelamento de uma consulta agendada pelo próprio paciente, desde que o cancelamento seja realizado com pelo menos 24 horas de antecedência em relação ao horário da consulta. Cancelamentos com menos de 24 horas de antecedência não são permitidos e o sistema deve exibir a mensagem: "Cancelamento não permitido. O prazo mínimo de 24 horas já foi ultrapassado."',
    question:
      'Elabore um caso de teste para o FLUXO PRINCIPAL: o paciente cancela a consulta com mais de 24 horas de antecedência (cancelamento bem-sucedido). Preencha os 10 campos essenciais.',
    fields: [
      {
        key: 'identificacao',
        label: '1. ID, Título, Objetivo e Requisito relacionado',
        description: 'Use um ID padronizado (ex.: CT-CANC-001), título descritivo, objetivo amarrado ao RF-008.',
        placeholder: 'ID: ... | Título: ... | Objetivo: ... | Requisito: RF-008',
        color: '#1F8A5B',
      },
      {
        key: 'preCondicoes',
        label: '2. Pré-condições',
        description: 'Para testar "mais de 24 horas de antecedência", a consulta precisa estar marcada para um momento específico no futuro.',
        placeholder: '1) Paciente logado... | 2) Consulta com Dr. X para amanhã às 10h... | 3) Status "Confirmada"...',
        color: '#146B4A',
      },
      {
        key: 'dadosEntrada',
        label: '3. Dados de entrada',
        description: 'Quais informações o paciente fornece ao sistema para cancelar?',
        placeholder: 'Consulta selecionada: ... | Ação: ... | Confirmação: ...',
        color: '#0F3D2E',
      },
      {
        key: 'passos',
        label: '4. Passos de execução',
        description: 'Ações numeradas, atômicas. Inclua verificação do diálogo de confirmação intermediário.',
        placeholder: '1) ... | 2) ... | 3) ... | 4) ... | 5) ... | 6) ...',
        color: '#4CAF50',
      },
      {
        key: 'resultadoEsperado',
        label: '5. Resultado esperado',
        description: 'Mensagem exata, novo status da consulta, efeito no calendário do médico.',
        placeholder: '1) Diálogo: "..." | 2) Mensagem: "..." | 3) Status: ... | 4) Horário fica disponível...',
        color: '#E53935',
      },
    ],
    hints: [
      'Pré-condições: o que precisa ser verdadeiro no sistema ANTES de o paciente tentar cancelar? O paciente precisa estar logado? A consulta precisa existir? Qual o horário em relação ao momento do cancelamento? Para testar "mais de 24 horas", a consulta precisa estar marcada para um momento específico no futuro (ex.: amanhã às 10h, com a hora atual = hoje às 8h → 26 horas de antecedência).',
      'Dados de entrada: o paciente seleciona a consulta da lista? Confirma o cancelamento? Escolha uma consulta concreta — com data, horário e médico específicos — para garantir a reprodutibilidade.',
      'Resultado esperado: o que o sistema deve fazer após o cancelamento bem-sucedido? Qual mensagem exibir? O que acontece com a consulta na lista de agendamentos? O médico é notificado? O horário fica disponível novamente? Inclua todos os elementos observáveis.',
    ],
    expectedAnswers: {
      identificacao:
        'ID: CT-CANC-001 | Título: Cancelamento de consulta com mais de 24 horas de antecedência | Objetivo: Verificar se o sistema permite o cancelamento de uma consulta agendada quando realizado com mais de 24 horas de antecedência, atualizando o status da consulta corretamente (RF-008). | Requisito: RF-008 — Cancelamento de consulta pelo paciente',
      preCondicoes:
        '1) O paciente "ana.pereira@email.com" está logado no aplicativo. 2) Existe uma consulta agendada para o Dr. Carlos Silva no dia seguinte, às 10h (data/hora atual: hoje, 08h — antecedência de 26 horas). 3) O status da consulta é "Confirmada". 4) O paciente está na tela "Minhas Consultas".',
      dadosEntrada:
        'Consulta selecionada: Dr. Carlos Silva — amanhã, 10h00. Ação: Cancelar consulta. Confirmação: Sim (botão "Confirmar Cancelamento").',
      passos:
        '1) Na tela "Minhas Consultas", localizar a consulta com Dr. Carlos Silva agendada para amanhã, 10h. 2) Clicar no botão "Cancelar" ao lado da consulta. 3) Verificar se o sistema exibe diálogo de confirmação. 4) Clicar em "Confirmar Cancelamento". 5) Verificar a mensagem exibida pelo sistema. 6) Verificar o status da consulta na lista "Minhas Consultas".',
      resultadoEsperado:
        '1) O sistema exibe o diálogo: "Deseja cancelar a consulta com Dr. Carlos Silva em [data] às 10h00? Esta ação não pode ser desfeita." 2) Após confirmação, exibe: "Consulta cancelada com sucesso." 3) A consulta aparece na lista com status "Cancelada" ou é removida da lista de próximas consultas. 4) O horário 10h do médico fica disponível para novos agendamentos.',
    },
    feedback:
      'As pré-condições controlam o elemento mais crítico: a antecedência de mais de 24 horas (26 horas no exemplo). Os dados de entrada especificam a consulta e a ação. Os passos incluem a verificação do diálogo de confirmação — um comportamento intermediário importante. O resultado esperado descreve a mensagem, o estado da consulta e o efeito no calendário do médico.',
  },

  independentPracticeRich: {
    scenario:
      'RF-015: Ao registrar a entrada de mercadoria, o sistema deve atualizar automaticamente a quantidade em estoque do produto. O sistema deve aceitar apenas quantidades inteiras positivas (maiores que zero). Quantidades zero, negativas ou não numéricas devem ser rejeitadas com a mensagem: "Quantidade inválida. Informe um número inteiro positivo." O gerente informa: código do produto, nome do produto, quantidade recebida e fornecedor.',
    tasks: [
      'Elabore um caso de teste para o cenário em que o gerente tenta registrar uma entrada com quantidade ZERO (condição inválida).',
      'Especifique pré-condições que controlem o estoque inicial — é essencial para verificar que o estoque NÃO foi alterado após a tentativa.',
      'Inclua dados de entrada com valores exatos para todos os campos do formulário.',
      'Escreva resultado esperado completo: mensagem exata, confirmação de que o formulário NÃO foi submetido e que o estoque NÃO foi alterado.',
    ],
    fields: [
      {
        key: 'identificacao',
        label: '1. ID, Título, Objetivo e Requisito relacionado',
        description: 'Use ID padronizado (ex.: CT-EST-003), título descritivo, objetivo amarrado ao RF-015.',
        placeholder: 'ID: ... | Título: ... | Objetivo: ... | Requisito: RF-015',
        color: '#1F8A5B',
      },
      {
        key: 'preCondicoes',
        label: '2. Pré-condições',
        description: 'Defina o estoque inicial do produto — essencial para verificar depois que ele NÃO foi alterado.',
        placeholder: '1) Usuário logado como gerente... | 2) Produto X existe com estoque = 50... | 3) Tela do formulário...',
        color: '#146B4A',
      },
      {
        key: 'dadosEntrada',
        label: '3. Dados de entrada',
        description: 'Inclua TODOS os campos do formulário com valores exatos.',
        placeholder: 'Código: ... | Nome: ... | Quantidade: 0 | Fornecedor: ...',
        color: '#0F3D2E',
      },
      {
        key: 'passos',
        label: '4. Passos de execução',
        description: 'Ações numeradas, atômicas. Inclua verificação da mensagem E verificação do estoque após a tentativa.',
        placeholder: '1) ... | 2) ... | 3) ... | 4) ... | 5) ... | 6) Verificar mensagem... | 7) Verificar estoque...',
        color: '#4CAF50',
      },
      {
        key: 'resultadoEsperado',
        label: '5. Resultado esperado',
        description: 'Mensagem exata + formulário NÃO submetido + estoque NÃO alterado + destaque visual no campo.',
        placeholder: '1) Mensagem: "..." | 2) Formulário não submetido | 3) Estoque permanece em 50 | 4) Campo destacado...',
        color: '#E53935',
      },
    ],
    expectedAnswers: {
      identificacao:
        'ID: CT-EST-003 | Título: Tentativa de entrada de mercadoria com quantidade zero | Objetivo: Verificar se o sistema rejeita o registro de entrada de mercadoria quando a quantidade informada é zero, exibindo a mensagem de erro correta (RF-015). | Requisito: RF-015 — Validação de quantidade na entrada de mercadoria',
      preCondicoes:
        '1) O usuário "gerente@loja.com" está logado com perfil de gerente. 2) O produto "Camiseta Polo Azul" (código PRD-441) existe no sistema com estoque atual de 50 unidades. 3) O sistema exibe o formulário "Registrar Entrada de Mercadoria".',
      dadosEntrada:
        'Código do produto: PRD-441. Nome do produto: Camiseta Polo Azul. Quantidade recebida: 0. Fornecedor: Têxtil Sul Ltda.',
      passos:
        '1) No formulário, preencher o campo "Código" com "PRD-441". 2) Verificar que o campo "Nome" é preenchido automaticamente com "Camiseta Polo Azul". 3) No campo "Quantidade recebida", inserir o valor "0". 4) No campo "Fornecedor", inserir "Têxtil Sul Ltda.". 5) Clicar no botão "Registrar Entrada". 6) Verificar a mensagem exibida pelo sistema. 7) Verificar a quantidade em estoque do produto PRD-441.',
      resultadoEsperado:
        '1) O sistema exibe a mensagem: "Quantidade inválida. Informe um número inteiro positivo." 2) O formulário NÃO é submetido. 3) A quantidade em estoque do produto PRD-441 permanece 50 unidades (sem alteração). 4) O campo "Quantidade recebida" fica destacado (borda vermelha ou similar).',
    },
    criteria: [
      {
        label: 'Pré-condições',
        weight: '20%',
        description: 'Especifica usuário logado, produto existente com estoque definido (essencial para verificar que NÃO foi alterado) e tela do formulário.',
      },
      {
        label: 'Dados de entrada',
        weight: '20%',
        description: 'Inclui TODOS os campos do formulário com valores exatos, especialmente quantidade = 0.',
      },
      {
        label: 'Passos de execução',
        weight: '25%',
        description: 'Descreve ações atômicas; inclui verificação da mensagem E verificação do estoque após a tentativa.',
      },
      {
        label: 'Resultado esperado',
        weight: '25%',
        description: 'Inclui mensagem exata, confirma que o formulário NÃO foi submetido e que o estoque NÃO foi alterado.',
      },
      {
        label: 'Outros campos',
        weight: '10%',
        description: 'ID, título, objetivo e requisito presentes e coerentes.',
      },
    ],
    feedbackCorrect:
      'Excelente! Você elaborou o caso de teste com pré-condições que controlam o estoque inicial (essencial para verificar que o estoque NÃO foi alterado), dados específicos, passos atômicos e resultado esperado completo com verificações negativas (não submetido, estoque não alterado).',
    feedbackIncorrect:
      'Pontos a revisar:\n• Resultado esperado incompleto? Lembre-se: além da mensagem de erro, é preciso verificar se o efeito colateral indesejado (alteração do estoque) NÃO ocorreu.\n• Pré-condições insuficientes? Sem o estoque inicial definido, é impossível verificar se ele foi ou não alterado.\nRevise os Blocos 4 e 6.',
  },

  finalAssessmentQuestions: [
    {
      id: 'AF4-01',
      question: 'Qual é a definição mais precisa de caso de teste?',
      options: [
        'A) Um registro informal das ações executadas pelo testador durante a exploração do sistema.',
        'B) Um conjunto de condições, dados de entrada, passos de execução e resultado esperado que define uma verificação específica a ser realizada no sistema.',
        'C) Um script automatizado que verifica o comportamento do sistema sem intervenção humana.',
        'D) Uma lista de funcionalidades que o sistema deve ter, derivada dos requisitos do usuário.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. Um caso de teste é um artefato estruturado que define precisamente uma condição de verificação, incluindo as entradas, o contexto (pré-condições) e o resultado esperado. Conteúdo: Bloco 1.',
      errorExplanation:
        'Um caso de teste é um artefato de verificação estruturado, não informal nem uma lista de requisitos. Ele deve ser preciso e reproduzível. Revise o Bloco 1.',
      reviewBlock: 'bloco-1',
    },
    {
      id: 'AF4-02',
      question:
        'Durante a execução de um caso de teste, o testador observa que o sistema apresentou comportamento diferente do resultado esperado. Qual é o status correto a ser atribuído?',
      options: [
        'A) Passou, pois o sistema executou o caso de teste sem travar.',
        'B) Não executado, pois o resultado não correspondeu ao esperado.',
        'C) Bloqueado, pois o teste não pôde ser concluído com sucesso.',
        'D) Falhou, pois o resultado obtido diverge do resultado esperado.',
      ],
      correctIndex: 3,
      explanation:
        'Correto. O status "Falhou" é atribuído quando o resultado obtido diverge do resultado esperado, independentemente de o sistema ter travado ou não. A divergência entre RE e RO é a condição que define a falha. Conteúdo: Bloco 7.',
      errorExplanation:
        'O status de um caso de teste é determinado pela comparação entre resultado esperado e resultado obtido. Divergência = Falhou. Revise o Bloco 7.',
      reviewBlock: 'bloco-7',
    },
    {
      id: 'AF4-03',
      question:
        'Um caso de teste para verificar o login possui a seguinte pré-condição: "O sistema deve estar funcionando". Qual é o problema desta pré-condição?',
      options: [
        'A) Não há problema: a pré-condição garante que o sistema está operacional.',
        'B) A pré-condição é muito específica e deveria ser mais genérica.',
        'C) A pré-condição é vaga e não descreve o estado necessário do sistema — como o usuário existir e estar com sessão encerrada.',
        'D) Pré-condições não são necessárias para casos de teste de login.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. Pré-condições vagas comprometem a reprodutibilidade. "O sistema deve estar funcionando" não informa se o usuário existe, se a sessão está encerrada, qual é o ambiente. O executor não tem instruções suficientes para preparar o cenário. Conteúdo: Bloco 4.',
      errorExplanation:
        'Pré-condições devem descrever o estado específico do sistema antes da execução — como o usuário existir, a sessão estar encerrada e o ambiente configurado. Generalismos como "funcionando" não são úteis. Revise o Bloco 4.',
      reviewBlock: 'bloco-4',
    },
    {
      id: 'AF4-04',
      question: 'Qual das afirmações descreve melhor a finalidade de registrar o campo "resultado obtido"?',
      options: [
        'A) O resultado obtido é opcional e serve apenas para fins de auditoria em projetos grandes.',
        'B) O resultado obtido documenta o que o sistema realmente produziu na execução, permitindo comparar com o resultado esperado e determinar o status.',
        'C) O resultado obtido substitui o resultado esperado quando o sistema se comporta de forma inesperada.',
        'D) O resultado obtido é preenchido antes da execução pelo analista de testes, junto com o resultado esperado.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. O resultado obtido é o registro do comportamento real do sistema durante a execução. Ele é comparado com o resultado esperado para determinar se o teste passou ou falhou. É preenchido durante ou após a execução, nunca antes. Conteúdo: Bloco 6.',
      errorExplanation:
        'O resultado obtido documenta o que aconteceu de fato na execução. É comparado com o resultado esperado para determinar o status. Não é preenchido antes da execução. Revise o Bloco 6.',
      reviewBlock: 'bloco-6',
    },
    {
      id: 'AF4-05',
      question: 'Qual dos seguintes é um exemplo de passo de execução bem escrito?',
      options: [
        'A) Fazer o cadastro do usuário.',
        'B) Testar a funcionalidade de cadastro com dados válidos.',
        'C) No campo "E-mail", inserir o valor "usuario@dominio.com" e pressionar Tab.',
        'D) Verificar se o sistema funciona corretamente.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. O passo C é atômico (descreve uma única ação), objetivo (usa verbo específico "inserir"), preciso (especifica o valor exato e a ação subsequente "pressionar Tab"). Os demais são compostos, vagos ou subjetivos. Conteúdo: Bloco 5.',
      errorExplanation:
        'Um passo bem escrito é atômico (uma única ação), objetivo (verbo de ação claro) e preciso (valor exato). "Fazer o cadastro", "testar" e "verificar se funciona" são vagos e/ou compostos. Revise o Bloco 5.',
      reviewBlock: 'bloco-5',
    },
    {
      id: 'AF4-06',
      question:
        'Um caso de teste de validação de senha possui o seguinte resultado esperado: "O sistema deve exibir uma mensagem de erro." Qual é o problema?',
      options: [
        'A) Não há problema: a mensagem de erro confirma que o sistema detectou a senha inválida.',
        'B) O resultado esperado é impreciso: não especifica qual mensagem de erro, tornando o teste subjetivo e difícil de avaliar objetivamente.',
        'C) O resultado esperado está correto, mas deveria ser colocado nos passos de execução.',
        'D) Resultados esperados de validação não precisam especificar o texto da mensagem.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. "Uma mensagem de erro" é ambíguo: qualquer mensagem satisfaria o critério, inclusive uma mensagem inesperada de erro de sistema. O resultado esperado deve especificar o texto exato da mensagem, seu local de exibição e qualquer efeito visual associado. Conteúdo: Bloco 6.',
      errorExplanation:
        'O resultado esperado deve ser observável e específico. "Mensagem de erro" sem o texto exato permite que qualquer mensagem seja considerada correta — o que compromete a qualidade da avaliação. Revise o Bloco 6.',
      reviewBlock: 'bloco-6',
    },
    {
      id: 'AF4-07',
      question: 'Qual é a principal razão para estabelecer rastreabilidade entre casos de teste e requisitos?',
      options: [
        'A) Para garantir que o número de casos de teste seja proporcional ao tamanho do sistema.',
        'B) Para saber, em caso de mudança de requisito, quais casos de teste precisam ser revisados ou criados.',
        'C) Para que os desenvolvedores possam usar os casos de teste como documentação do sistema.',
        'D) Para reduzir o tempo de execução dos testes, eliminando casos redundantes.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. A rastreabilidade permite gerenciar o impacto de mudanças de requisitos. Quando um requisito muda, a matriz indica quais casos verificam esse requisito e precisam ser revisados. Sem rastreabilidade, a equipe precisa revisar todos os casos manualmente. Conteúdo: Bloco 9.',
      errorExplanation:
        'Rastreabilidade é sobre gestão de mudanças: se um requisito muda, a equipe precisa saber quais testes são afetados. Sem rastreabilidade, essa identificação é feita manualmente — caro e propenso a erros. Revise o Bloco 9.',
      reviewBlock: 'bloco-9',
    },
    {
      id: 'AF4-08',
      question: 'Um caso de teste está com o status "Bloqueado". O que isso indica?',
      options: [
        'A) O caso de teste foi executado e o sistema produziu o resultado esperado.',
        'B) O caso de teste foi executado e o sistema produziu um resultado diferente do esperado.',
        'C) O caso de teste não pôde ser executado porque uma pré-condição não foi atendida ou um defeito anterior impediu a execução.',
        'D) O caso de teste foi planejado mas não foi executado ainda neste ciclo de testes.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. "Bloqueado" indica que o caso não pôde ser executado — não porque o testador não tentou, mas porque algo impediu a execução: uma pré-condição não atendida (sistema não inicializou, dados de teste não foram preparados) ou um defeito anterior que inviabilizou a chegada a este ponto. Conteúdo: Bloco 7.',
      errorExplanation:
        'Bloqueado não é o mesmo que Falhou. Falhou significa que o teste foi executado e o resultado divergiu. Bloqueado significa que o teste não pôde ser executado por impedimento externo. Revise o Bloco 7.',
      reviewBlock: 'bloco-7',
    },
    {
      id: 'AF4-09',
      question:
        'Analise as afirmações sobre critérios de qualidade de casos de teste:\nI. Um caso de teste longo é mais completo do que um curto, pois mais passos garantem maior cobertura.\nII. Um caso de teste reproduzível pode ser executado por qualquer testador e produzir o mesmo resultado.\nIII. Um caso de teste sem requisito relacionado ainda pode ter alta qualidade se os demais campos estiverem completos.\nIV. O resultado esperado deve ser definido antes da execução, com base no requisito.',
      options: ['A) Apenas I e III.', 'B) Apenas II e IV.', 'C) I, II e IV.', 'D) II, III e IV.'],
      correctIndex: 1,
      explanation:
        'Correto. II é correta: reprodutibilidade é critério fundamental. IV é correta: o resultado esperado deve ser derivado do requisito antes da execução — defini-lo após contamina o veredicto. I é falsa: extensão não é sinônimo de qualidade. III é falsa: sem requisito, o caso não pode ser rastreado nem avaliado quanto à pertinência. Conteúdo: Blocos 6, 8 e 9.',
      errorExplanation:
        'Avalie cada afirmação: I — errada, extensão não é qualidade. II — correta, reprodutibilidade é critério fundamental. III — errada, rastreabilidade é essencial. IV — correta, RE definido antes da execução. Revise os Blocos 6, 8 e 9.',
      reviewBlock: 'bloco-8',
    },
    {
      id: 'AF4-10',
      question:
        'Um testador elabora casos de teste para um módulo de pagamento sem consultar os requisitos, baseando-se apenas em sua experiência com sistemas similares. Qual é o principal risco dessa abordagem?',
      options: [
        'A) Os casos de teste serão muito complexos e difíceis de executar.',
        'B) Os casos de teste podem não cobrir comportamentos específicos do sistema atual, deixar requisitos sem cobertura de teste e gerar testes desatualizados quando os requisitos mudarem.',
        'C) Os casos de teste serão inválidos porque não foram automatizados.',
        'D) Os casos de teste sem referência a requisitos não podem ter status "Passou" ou "Falhou".',
      ],
      correctIndex: 1,
      explanation:
        'Correto. Sem rastreabilidade com os requisitos, é impossível garantir que todos os comportamentos especificados foram testados. Além disso, casos sem vínculo com requisitos não podem ser gerenciados quando os requisitos mudam, resultando em testes obsoletos. Conteúdo: Bloco 9.',
      errorExplanation:
        'Casos de teste sem referência a requisitos perdem rastreabilidade, o que impede a gestão de cobertura e de impacto de mudanças. Não é sobre complexidade nem automação. Revise o Bloco 9.',
      reviewBlock: 'bloco-9',
    },
  ],

  reviewMap: {
    'AF4-01': ['bloco-1'],
    'AF4-02': ['bloco-7'],
    'AF4-03': ['bloco-4'],
    'AF4-04': ['bloco-6'],
    'AF4-05': ['bloco-5'],
    'AF4-06': ['bloco-6'],
    'AF4-07': ['bloco-9'],
    'AF4-08': ['bloco-7'],
    'AF4-09': ['bloco-6', 'bloco-8', 'bloco-9'],
    'AF4-10': ['bloco-9'],
  },

  finalChallenge: {
    enunciado:
      'Você é testador em um projeto de sistema de reservas de hospedagem online. A equipe acaba de concluir a implementação do módulo de reservas. Produza TRÊS casos de teste completos: um para o fluxo principal, um para uma entrada inválida e um para uma situação-limite. Cada caso deve incluir os 10 campos essenciais (ID, Título, Objetivo, Requisito, Pré-condições, Dados de entrada, Passos, Resultado esperado, Resultado obtido, Status).',
    scenario:
      'Requisitos:\n\nRF-021: O sistema deve permitir que o usuário realize uma reserva informando data de check-in, data de check-out e número de hóspedes. A data de check-out deve ser posterior à data de check-in. O número de hóspedes deve ser um inteiro entre 1 e 10 (inclusive). O sistema calcula o número de noites (diferença entre check-out e check-in) e exibe o valor total com base na diária.\n\nRF-022: Caso o número de hóspedes seja inferior a 1 ou superior a 10, o sistema deve exibir: "Número de hóspedes inválido. Informe entre 1 e 10 hóspedes."\n\nRF-023: Caso a data de check-out seja igual ou anterior à data de check-in, o sistema deve exibir: "Data de check-out inválida. O check-out deve ser posterior ao check-in."\n\nInformações adicionais: diária do quarto padrão = R$ 200,00. Quarto disponível para as datas testadas.',
    fields: [
      {
        key: 'ct1FluxoPrincipal',
        label: '1. Caso de Teste 1 — Fluxo Principal (reserva válida)',
        description: 'Reserva válida com datas e número de hóspedes corretos. Inclua os 10 campos. Sugestão: 3 noites, 2 hóspedes → calcular 3 × R$ 200 = R$ 600.',
        placeholder: 'ID: CT-RES-001 | Título: ... | Objetivo: ... | Requisito: RF-021 | Pré-condições: ... | Dados: ... | Passos: ... | Resultado esperado: ... | Resultado obtido: ... | Status: ...',
        color: '#1F8A5B',
      },
      {
        key: 'ct2EntradaInvalida',
        label: '2. Caso de Teste 2 — Entrada Inválida (hóspedes acima do limite)',
        description: 'Tentativa de reserva com número de hóspedes inválido (ex.: 11). Inclua os 10 campos e refira-se ao RF-022.',
        placeholder: 'ID: CT-RES-002 | Título: ... | Objetivo: ... | Requisito: RF-022 | Pré-condições: ... | Dados: ... hóspedes=11 | Passos: ... | Resultado esperado: mensagem exata + reserva NÃO criada | ...',
        color: '#E53935',
      },
      {
        key: 'ct3SituacaoLimite',
        label: '3. Caso de Teste 3 — Situação-Limite (check-out = check-in)',
        description: 'Aplique análise de valor limite ao RF-023: check-out igual ao check-in é o ponto crítico onde operadores de comparação incorretos (> vs >=) causam defeitos.',
        placeholder: 'ID: CT-RES-003 | Título: ... | Objetivo: ... | Requisito: RF-023 | Pré-condições: ... | Dados: check-in=15/11, check-out=15/11 | Passos: ... | Resultado esperado: mensagem exata + reserva NÃO criada | ...',
        color: '#146B4A',
      },
    ],
    expectedAnswers: {
      ct1FluxoPrincipal:
        'ID: CT-RES-001 | Título: Reserva válida com 3 noites e 2 hóspedes | Objetivo: Verificar se o sistema aceita uma reserva com datas válidas e número de hóspedes dentro do limite, calculando corretamente o número de noites e o valor total (RF-021). | Requisito: RF-021.\n\nPré-condições: 1) Usuário "viajante@email.com" logado. 2) Quarto padrão disponível para 10/11/2025 a 13/11/2025. 3) Diária = R$ 200,00. 4) Tela "Nova Reserva" com quarto padrão selecionado.\n\nDados de entrada: Check-in: 10/11/2025 | Check-out: 13/11/2025 | Hóspedes: 2.\n\nPassos: 1) Inserir 10/11/2025 no campo "Data de check-in". 2) Inserir 13/11/2025 no campo "Data de check-out". 3) Inserir 2 no campo "Número de hóspedes". 4) Clicar em "Calcular". 5) Verificar o número de noites. 6) Verificar o valor total. 7) Clicar em "Confirmar Reserva". 8) Verificar a mensagem de confirmação.\n\nResultado esperado: 1) Sistema exibe "Número de noites: 3". 2) Sistema exibe "Valor total: R$ 600,00" (3 × R$ 200). 3) Após confirmação, exibe "Reserva realizada com sucesso! Número da reserva: [gerado]". 4) Reserva aparece em "Minhas Reservas" com status "Confirmada".\n\nResultado obtido: (a preencher na execução). Status: (a determinar).',
      ct2EntradaInvalida:
        'ID: CT-RES-002 | Título: Tentativa de reserva com número de hóspedes inválido (11 hóspedes) | Objetivo: Verificar se o sistema rejeita a reserva e exibe a mensagem de erro correta quando o número de hóspedes supera o limite máximo de 10 (RF-022). | Requisito: RF-022.\n\nPré-condições: 1) Usuário "viajante@email.com" logado. 2) Quarto padrão disponível. 3) Tela "Nova Reserva" com quarto padrão selecionado.\n\nDados de entrada: Check-in: 10/11/2025 | Check-out: 12/11/2025 | Hóspedes: 11.\n\nPassos: 1) Inserir 10/11/2025 no campo "Data de check-in". 2) Inserir 12/11/2025 no campo "Data de check-out". 3) Inserir 11 no campo "Número de hóspedes". 4) Clicar em "Calcular" ou "Confirmar Reserva". 5) Verificar a mensagem exibida. 6) Verificar se a reserva foi criada.\n\nResultado esperado: 1) Sistema exibe "Número de hóspedes inválido. Informe entre 1 e 10 hóspedes." 2) A reserva NÃO é criada. 3) Formulário permanece na tela "Nova Reserva" para correção.\n\nResultado obtido: (a preencher). Status: (a determinar).',
      ct3SituacaoLimite:
        'ID: CT-RES-003 | Título: Tentativa de reserva com check-out igual ao check-in (data inválida no limite) | Objetivo: Verificar se o sistema rejeita a reserva e exibe a mensagem de erro correta quando a data de check-out é idêntica à data de check-in, violando o requisito de check-out posterior ao check-in (RF-023). | Requisito: RF-023.\n\nPré-condições: 1) Usuário "viajante@email.com" logado. 2) Tela "Nova Reserva" com quarto padrão selecionado.\n\nDados de entrada: Check-in: 15/11/2025 | Check-out: 15/11/2025 (igual ao check-in) | Hóspedes: 1.\n\nPassos: 1) Inserir 15/11/2025 no campo "Data de check-in". 2) Inserir 15/11/2025 no campo "Data de check-out". 3) Inserir 1 no campo "Número de hóspedes". 4) Clicar em "Calcular" ou "Confirmar Reserva". 5) Verificar a mensagem exibida. 6) Verificar se a reserva foi criada.\n\nResultado esperado: 1) Sistema exibe "Data de check-out inválida. O check-out deve ser posterior ao check-in." 2) A reserva NÃO é criada. 3) Campo "Data de check-out" fica com indicação de erro (destaque visual).\n\nResultado obtido: (a preencher). Status: (a determinar).\n\nJustificativa: este é o valor exato no limite da condição inválida — o ponto crítico onde operadores de comparação incorretos (> vs >=) causam defeitos. Derivado de análise de valor limite aplicada ao RF-023.',
    },
    rubric: [
      {
        level: 'Insuficiente',
        range: '0 – 25%',
        achievementCount: '0–1 casos de teste adequados',
        description:
          'A maioria dos casos apresenta campos ausentes, conteúdo vago ou diagnóstico incorreto do cenário. Revisitar todos os blocos da unidade.',
      },
      {
        level: 'Básico',
        range: '26 – 50%',
        achievementCount: '1 caso adequado, demais parciais',
        description:
          'Estrutura geral compreendida, mas pré-condições genéricas, resultado esperado parcial ou ausência de verificações negativas (ex.: confirmar que a reserva NÃO foi criada). Revisar Blocos 4 e 6.',
      },
      {
        level: 'Satisfatório',
        range: '51 – 75%',
        achievementCount: '2 casos adequados',
        description:
          'Bom domínio da estrutura. Pequenas imprecisões nos casos de erro/limite. Revisar Bloco 6 (resultado esperado completo, incluindo o que NÃO deve acontecer).',
      },
      {
        level: 'Excelente',
        range: '76 – 100%',
        achievementCount: '3 casos adequados',
        description:
          'Domínio excelente. Os três casos cobrem fluxo principal, entrada inválida e situação-limite com 10 campos completos, dados específicos, passos atômicos e resultado esperado verificável (positivo e negativo). Aplicação correta de particionamento e valor limite na escolha dos cenários.',
      },
    ],
    finalFeedback:
      'Você produziu um conjunto de três casos que cobre o espectro essencial da verificação: fluxo principal (RF-021), entrada inválida (RF-022) e situação-limite (RF-023). A capacidade de transformar um conjunto de requisitos em casos de teste estruturados, rastreáveis e reproduzíveis é uma das habilidades mais valorizadas em profissionais de qualidade de software. Você concluiu a Unidade 4 e está pronto para avançar.',
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
