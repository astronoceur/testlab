import { Unit } from '../types';

/* ──────────────────────────────────────────────────────────────────
 * UNIDADE 5 — Identificação e Registro de Defeitos
 *
 * Conteudo fiel ao documento
 * "TestLab_Unidade5_Identificacao_e_Registro_de_Defeitos.docx.pdf".
 * Estrutura segue o mesmo molde das Unidades 1, 2, 3 e 4.
 *
 * Mapeamento das atividades para os slots da plataforma:
 *   - Atividade 5.1 (8 classificacoes de defeitos) + Atividade 5.3
 *     (6 cenarios de severidade x prioridade) -> atividade11 com 14
 *     questoes objetivas. Os enunciados de 5.3 sao convertidos em
 *     multi-choice com pares "Severidade/Prioridade".
 *   - Atividade 5.2 (elaborar bug report completo) -> atividade12
 *     discursiva com sample answer cobrindo os 18 campos e rubrica.
 *   - Pratica Guiada (RF-009 e-mail de confirmacao) ->
 *     guidedPracticeRich.
 *   - Pratica Independente (RF-042 certificado carga horaria) ->
 *     independentPracticeRich.
 *   - Avaliacao Final (10 questoes AF-01 a AF-10) ->
 *     finalAssessmentQuestions.
 *   - Desafio Aplicado (3 bug reports para sistema de hotel) ->
 *     finalChallenge (3 campos, um por defeito A/B/C).
 * ────────────────────────────────────────────────────────────────── */

export const unit5: Unit = {
  id: 5,
  title: 'Unidade 5',
  subtitle: 'Identificação e Registro de Defeitos',
  description:
    'Aprenda a identificar, classificar e registrar defeitos encontrados durante a execução de testes: estrutura do bug report, severidade versus prioridade, evidências e comunicação técnica eficaz com o time de desenvolvimento.',
  icon: '🐞',
  meta: {
    cargaHoraria: '6 horas',
    nivel: 'Introdutório',
    referencia: 'CTFL / ISTQB',
    abordagem: 'Eventos de Gagné',
  },
  objectives: [
    'Explicar o que é um defeito em software e distingui-lo de erro e falha no contexto técnico do teste.',
    'Identificar defeitos a partir da comparação entre resultado esperado e resultado obtido na execução de casos de teste.',
    'Classificar defeitos conforme seu tipo: funcional, de interface, de usabilidade, de validação de dados, de desempenho, de integração, de segurança ou de mensagem.',
    'Diferenciar severidade (impacto técnico) de prioridade (urgência de negócio).',
    'Elaborar relatórios de bug claros, completos e reproduzíveis, preenchendo todos os campos essenciais.',
    'Registrar evidências adequadas para apoiar a análise e a reprodução do defeito.',
    'Relacionar casos de teste executados, resultados obtidos e registro de defeitos dentro do fluxo de qualidade.',
    'Aplicar boas práticas de comunicação escrita no relato de problemas, garantindo objetividade e precisão.',
  ],

  /* ─── 3. Situacao-problema inicial ─────────────────────────── */
  situationProblem: {
    title: 'O Bug que Ninguém Conseguia Corrigir',
    paragraphs: [
      'Uma startup de tecnologia educacional lançou a versão 2.0 de sua plataforma de cursos online. Dois dias após o lançamento, começaram a chegar reclamações: o certificado de conclusão não estava sendo gerado. O time de QA abriu um relatório de bug minimalista — ID: BUG-0234, Título: "Certificado não funciona", Descrição: "O certificado não é gerado quando o usuário tenta baixar", Severidade: Alta, Status: Aberto.',
      'O desenvolvedor recebeu o relatório e tentou reproduzir o problema. Não sabia: qual usuário testou? Em qual curso? O usuário havia completado todas as aulas? A nota mínima foi atingida? Qual navegador? O problema ocorria sempre ou apenas em condições específicas?',
      'O desenvolvedor passou dois dias sem conseguir reproduzir. O relatório era inutilizável. O time de QA foi acionado novamente, mas o testador não se lembrava dos detalhes — havia testado vários fluxos naquele dia sem registrar dados de entrada nem ambiente.',
      'O defeito só foi identificado cinco dias depois, quando um usuário afetado detalhou o cenário: ele havia concluído o curso com nota 6,8 em uma plataforma que exigia 7,0 para certificação, mas o sistema exibia o botão "Baixar Certificado" mesmo assim. Ao clicar, retornava erro 500. Com essas informações, o desenvolvedor reproduziu o defeito em dez minutos: o botão era exibido antes da validação da nota. A correção levou quarenta minutos. O custo real foram os cinco dias perdidos por um relatório incompleto.',
    ],
    reflectionQuestions: [
      'Quais campos essenciais estavam ausentes no relatório original?',
      'Como um relatório completo teria acelerado a identificação e correção?',
      'Qual é a diferença entre dizer "o certificado não funciona" e descrever exatamente o que acontece, em que condições e com quais dados?',
    ],
    conclusion:
      'A qualidade de um relatório de bug determina diretamente a velocidade com que o defeito será corrigido. Um relatório completo e preciso permite ao desenvolvedor reproduzir o problema em minutos. Um relatório vago pode fazer o defeito ficar aberto por semanas ou ser fechado como "não reproduzível". Nesta unidade, você aprenderá a estrutura, os critérios de qualidade e as boas práticas de comunicação que transformam um defeito encontrado em um defeito corrigido.',
  },

  /* ─── 4. Ativacao de conhecimentos previos ─────────────────── */
  priorKnowledgeQuestions: [
    {
      id: 'PK5-1',
      question:
        'Um testador executa um caso de teste de login. O resultado esperado era "sistema exibe a tela principal do usuário". O resultado obtido foi "sistema exibe: Erro interno - contate o administrador." O status do caso de teste é:',
      options: [
        'A) Passou, pois o sistema respondeu à ação do usuário.',
        'B) Bloqueado, pois o sistema não concluiu a operação.',
        'C) Falhou, pois o resultado obtido diverge do resultado esperado.',
        'D) Não executado, pois o sistema retornou erro antes de completar o login.',
      ],
      correctIndex: 2,
      explanation:
        'Correto! Quando o resultado obtido diverge do resultado esperado, o caso de teste falhou. Essa divergência indica a presença de um possível defeito, que deve ser registrado em relatório de bug. Conteúdo: Unidade 4, Bloco 7.',
      errorExplanation:
        'O status "Falhou" é determinado pela comparação entre RE e RO. Uma mensagem de erro inesperada é uma divergência. Revise o Bloco 7 da Unidade 4.',
    },
    {
      id: 'PK5-2',
      question:
        'Um desenvolvedor interpreta incorretamente um requisito e implementa uma regra de negócio errada. O código incorreto é entregue. Durante o teste, o sistema produz resultado incorreto. Identifique corretamente os três conceitos:',
      options: [
        'A) Erro: a implementação incorreta. Defeito: a interpretação errada. Falha: o resultado incorreto.',
        'B) Erro: a interpretação incorreta pelo desenvolvedor. Defeito: o código incorreto entregue. Falha: o resultado incorreto durante o teste.',
        'C) Erro: o resultado incorreto. Defeito: o código incorreto. Falha: a interpretação incorreta.',
        'D) Os três conceitos descrevem a mesma coisa e podem ser usados intercambiavelmente.',
      ],
      correctIndex: 1,
      explanation:
        'Correto! Erro = ação humana incorreta (interpretação errada). Defeito = problema no artefato (código incorreto). Falha = comportamento incorreto em execução (resultado errado). Conteúdo: Unidade 1.',
      errorExplanation:
        'Erro, defeito e falha descrevem etapas de uma cadeia causal: erro humano → defeito no artefato → falha em execução. Revise a Unidade 1 e o Bloco 2 desta unidade.',
    },
    {
      id: 'PK5-3',
      question:
        'Qual das opções representa o resultado obtido mais útil para um desenvolvedor investigar um defeito?',
      options: [
        'A) "O sistema não funcionou corretamente."',
        'B) "O sistema apresentou um problema ao salvar o cadastro."',
        'C) "O sistema exibiu: CPF já cadastrado. Nenhum registro criado. Campo CPF com borda vermelha. Hora: 14h32."',
        'D) "Houve um erro no formulário de cadastro."',
      ],
      correctIndex: 2,
      explanation:
        'Correto! O resultado obtido útil é específico, observável e inclui mensagem exata, comportamento visual, efeito no banco e momento. Conteúdo: Unidade 4, Bloco 6.',
      errorExplanation:
        'Descrições vagas não fornecem informação suficiente. Um resultado obtido útil é específico e observável. Revise o Bloco 6 da Unidade 4 e o Bloco 7 desta unidade.',
    },
  ],

  /* ─── 5. Conteudo teorico (12 blocos) ──────────────────────── */
  theoryBlocks: [
    {
      id: 'bloco-1',
      number: 1,
      title: 'O que é um Defeito em Software',
      icon: '🐛',
      explanation: [
        'Um defeito em software — também chamado de bug ou anomalia — é qualquer problema presente em um artefato que cause ou possa causar que o sistema se comporte de forma diferente do especificado. Defeitos podem estar no código-fonte, nos documentos de requisitos, nos modelos de dados ou em qualquer componente do sistema.',
        'Myers define defeito como o resultado de uma ação humana incorreta introduzida em um produto. O defeito é o problema em si — algo errado no artefato — independentemente de ter sido ativado ou não. Um defeito pode existir no código por anos sem ser detectado se as condições para ativá-lo nunca forem atingidas.',
        'Do ponto de vista prático, os defeitos são o alvo central do processo de teste. Todo o esforço de planejamento, seleção de técnicas, elaboração de casos de teste e execução tem como objetivo final encontrar defeitos antes que cheguem ao usuário.',
      ],
      example: {
        title: 'Exemplo — Função de cálculo de desconto',
        body:
          'Considere a linha de código: "desconto = valor_total * 0.1" — quando o correto deveria ser "desconto = valor_total * 0.15".\n\nEsse é um defeito: o código está errado. Se um pedido com desconto de 15% for processado, o sistema calculará 10%.\n\nO defeito existe no código desde que foi escrito. A falha (valor incorreto) só ocorre quando um pedido com desconto é processado.',
      },
      observation: {
        title: 'Atenção',
        body:
          'Nem todo defeito causa uma falha imediata ou visível. Um defeito em uma condição de tratamento de exceção raramente ativada pode existir por anos sem causar problemas — até que a condição ocorra em produção.',
      },
      miniActivity: {
        type: 'truefalse',
        prompt: '"Um defeito só existe no software quando o usuário o percebe."',
        options: ['Verdadeiro', 'Falso'],
        correctIndex: 1,
        expectedAnswer:
          'Falso. Um defeito existe no artefato independentemente de ter sido ativado. O usuário percebe a falha — o comportamento incorreto — mas o defeito pode estar presente muito antes.',
      },
    },
    {
      id: 'bloco-2',
      number: 2,
      title: 'Diferença entre Erro, Defeito e Falha',
      icon: '🔀',
      explanation: [
        'O vocabulário técnico distingue três conceitos que descrevem momentos distintos na cadeia causal que leva um problema a ser percebido pelo usuário.',
        'O erro é a ação humana incorreta que origina o problema. O defeito é o resultado do erro — a manifestação concreta do problema no artefato. A falha é o comportamento incorreto do sistema em execução, causado pela ativação de um defeito.',
        'Resumo: ERRO (ação humana incorreta — interpretação errada) → DEFEITO (problema no artefato — código incorreto) → FALHA (comportamento incorreto — resultado errado ao usuário).',
        'Na prática do mercado, "bug", "defeito" e "falha" são usados de forma intercambiável. No contexto do CTFL e da comunicação técnica formal, a distinção é importante. Usaremos "defeito" para o problema no artefato e "falha" para o comportamento incorreto em execução.',
      ],
      example: {
        title: 'A cadeia causal completa',
        body:
          'Cenário: Um analista especifica o limite máximo de tentativas de login como "5 vezes" quando o correto deveria ser "3 vezes" (decisão de segurança).\n\n• Erro: o analista interpretou mal o documento de segurança (ação humana).\n• Defeito: o requisito documentado contém "5 tentativas" em vez de "3"; o código implementa essa regra incorreta.\n• Falha: um usuário malicioso consegue fazer 5 tentativas, quando deveria ser bloqueado após 3.',
      },
      observation: {
        title: 'Uso prático dos termos',
        body:
          'Na conversa diária da equipe, os termos costumam se misturar. Em documentação formal e comunicação com auditoria, mantenha a distinção: defeito é o problema no artefato; falha é o sintoma observado em execução.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Classifique cada item como Erro (E), Defeito (D) ou Falha (F):\n(a) Analista especifica prazo de 30 dias quando o correto é 22 dias úteis.\n(b) Sistema exibe "Saldo: R$ -50,00" para conta que nunca ficou negativa.\n(c) Código de validação de CPF não verifica o décimo dígito.',
        placeholder: 'a) ... | b) ... | c) ...',
        expectedAnswer:
          '(a) Erro — ação humana incorreta do analista. (b) Falha — comportamento incorreto em execução. (c) Defeito — problema no código, independentemente de ter sido ativado.',
      },
    },
    {
      id: 'bloco-3',
      number: 3,
      title: 'Como Identificar Defeitos durante os Testes',
      icon: '🔎',
      explanation: [
        'A identificação de um defeito ocorre quando, durante a execução de um caso de teste, o resultado obtido diverge do resultado esperado. Essa divergência é o sinal de que algo no sistema não está se comportando conforme especificado.',
        'O processo requer três elementos: (1) resultado esperado claramente definido, derivado do requisito; (2) execução do caso de teste nas condições especificadas; e (3) comparação objetiva entre o que o sistema deveria fazer e o que realmente fez.',
        'Maldonado observa que defeitos também podem ser identificados por revisões estáticas — inspeções de código, revisões de requisitos — sem executar o sistema. A identificação estática é mais barata, mas exige critérios de revisão bem definidos.',
        'Passos básicos: (1) executar o caso de teste seguindo exatamente os passos documentados, com as pré-condições e dados especificados; (2) observar o comportamento do sistema (mensagens exibidas, dados alterados, tempo de resposta, erros no console); (3) comparar o resultado obtido com o resultado esperado definido no caso de teste; (4) se houver divergência, registrar o resultado obtido com precisão, capturar evidências e abrir um relatório de bug.',
      ],
      example: {
        title: 'Possível defeito vs. defeito confirmado',
        body:
          'A divergência indica um possível defeito — não necessariamente confirmado. É possível que o resultado esperado esteja errado (derivado de requisito incorreto). Por isso, o relatório deve incluir o requisito relacionado, para que o desenvolvedor verifique se o problema está no código ou na especificação.',
      },
      observation: {
        title: 'Atenção',
        body:
          'Identificar um defeito é o primeiro passo. Antes de registrar, confirme: (a) que o caso de teste foi executado corretamente; (b) que o resultado esperado está coerente com o requisito; (c) que a divergência é reproduzível.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Ao executar um CT de cálculo de frete, o resultado esperado era "frete = R$ 25 para pedidos acima de R$ 200". O sistema calculou R$ 25 para um pedido de R$ 180. Houve identificação de defeito?',
        placeholder: 'Sim/Não + justificativa...',
        expectedAnswer:
          'Sim. O sistema aplicou o valor de frete para um pedido que não atingiu R$ 200. O RO diverge do RE, indicando possível defeito na lógica de cálculo do frete. O testador deve registrar o defeito incluindo o requisito de frete relacionado.',
      },
    },
    {
      id: 'bloco-4',
      number: 4,
      title: 'Tipos de Defeitos em Software',
      icon: '🏷️',
      explanation: [
        'Classificar o tipo de defeito é útil para direcionar a investigação, priorizar a correção e comunicar o problema para a equipe certa.',
        '• Funcional: o sistema não executa corretamente uma função do requisito (ex.: cálculo de desconto com percentual errado).',
        '• Interface: problemas visuais ou de interação na camada de apresentação (ex.: botão sobreposto; layout quebrado em resolução específica).',
        '• Usabilidade: sistema funciona corretamente mas de forma difícil para o usuário (ex.: mensagem de erro técnica em vez de amigável).',
        '• Validação de dados: sistema aceita entradas inválidas ou rejeita válidas (ex.: campo de CPF aceita letras; e-mail sem @).',
        '• Desempenho: sistema mais lento que o especificado ou trava sob carga (ex.: página demora 30s; trava com 50 usuários simultâneos).',
        '• Integração: problemas na comunicação entre componentes ou sistemas externos (ex.: API de pagamento não recebe dados; sincronização gera duplicatas).',
        '• Segurança: vulnerabilidades que permitem acesso não autorizado ou vazamento (ex.: injeção de SQL; senha exposta em log).',
        '• Mensagem: mensagens exibidas incorretas, enganosas ou ausentes (ex.: mensagem de sucesso após falha; texto em idioma errado).',
      ],
      example: {
        title: 'Classificação não é exclusiva',
        body:
          'Um mesmo defeito pode enquadrar-se em mais de um tipo. Um campo de senha que aceita entradas vazias é simultaneamente um defeito de validação e de segurança. Priorize o tipo que melhor descreve o impacto primário.',
      },
      observation: {
        title: 'Atenção',
        body:
          'A classificação correta facilita a triagem: defeitos de segurança vão para o time de segurança, defeitos de desempenho para o time de infraestrutura, etc. Misclassificar pode atrasar a investigação.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Classifique cada defeito:\n(a) E-commerce exibe preço total sem incluir frete após seleção de entrega expressa.\n(b) Página de busca demora 45s com 100+ resultados.\n(c) Campo de telefone aceita "aaa-bbb-cccc".',
        placeholder: 'a) ... | b) ... | c) ...',
        expectedAnswer:
          '(a) Funcional — o cálculo do total não inclui o frete. (b) Desempenho — tempo de resposta excede o aceitável. (c) Validação de dados — campo aceita entrada inválida.',
      },
    },
    {
      id: 'bloco-5',
      number: 5,
      title: 'O que é um Relatório de Bug',
      icon: '📋',
      explanation: [
        'Um relatório de bug — também chamado de bug report, relatório de defeito ou relatório de incidente — é o documento que registra formalmente um defeito identificado. É o instrumento de comunicação entre o testador que encontrou o problema e o desenvolvedor que vai investigar e corrigir.',
        'A qualidade de um relatório de bug determina diretamente a velocidade com que o defeito será corrigido. Um relatório completo e preciso permite ao desenvolvedor reproduzir o problema em minutos. Um relatório vago pode fazer o defeito ficar aberto por semanas ou ser fechado como "não reproduzível".',
        'Sommerville destaca que a comunicação eficaz entre equipes de QA e desenvolvimento é um fator crítico para a qualidade do software — e o relatório de bug é o principal artefato dessa comunicação.',
        'Funções principais: (1) comunicar o defeito para a equipe que vai corrigir com todas as informações necessárias; (2) registrar a evidência de que o defeito existe, servindo como histórico auditável; (3) permitir a reprodução controlada do problema; (4) fornecer dados para análise de qualidade (defeitos por módulo, tipo e severidade); (5) possibilitar o rastreamento do status até a correção e fechamento.',
      ],
      example: {
        title: 'Linguagem profissional',
        body:
          'Um relatório de bug não é uma crítica ao desenvolvedor. É uma informação técnica. A linguagem deve ser neutra e objetiva. Frases como "o desenvolvedor não testou isso" são inadequadas. O relatório deve descrever o que acontece, não apontar culpados.',
      },
      observation: {
        title: 'Atenção',
        body:
          'O relatório de bug é uma ferramenta de colaboração, não de acusação. A redação afeta diretamente a qualidade da relação entre QA e desenvolvimento — e, por consequência, a qualidade do produto.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Qual é a principal diferença entre um relatório de bug e a descrição informal de um usuário pelo suporte?',
        placeholder: 'Resposta...',
        expectedAnswer:
          'O relatório de bug é estruturado — possui campos definidos como passos de reprodução, resultado esperado, severidade e evidências. A descrição informal é não estruturada e frequentemente vaga. O testador transforma a descrição informal em relatório estruturado e reproduzível.',
      },
    },
    {
      id: 'bloco-6',
      number: 6,
      title: 'Estrutura de um Bug Report',
      icon: '🗂️',
      explanation: [
        'A estrutura define os campos que devem ser preenchidos para comunicar o defeito de forma completa, precisa e útil. A estrutura varia entre ferramentas (Jira, Bugzilla, Azure DevOps), mas os campos essenciais são consistentes na indústria e no padrão CTFL.',
        'Os 18 campos essenciais: ID do defeito (identificador único, ex.: BUG-0042) · Título (descrição concisa e específica, máx. 2 linhas) · Sistema / Módulo · Ambiente de teste (SO, navegador, versão, banco) · Requisito relacionado · Caso de teste relacionado · Pré-condições · Dados utilizados · Passos para reprodução · Resultado esperado · Resultado obtido · Evidências (capturas, vídeos, logs) · Tipo de defeito · Severidade · Prioridade · Status · Responsável sugerido · Observações adicionais.',
        'A estrutura do relatório de bug é complementar à do caso de teste. O caso de teste define o que foi planejado (resultado esperado). O relatório de bug documenta o que foi encontrado na execução (resultado obtido e defeito). Os dois artefatos se completam.',
      ],
      example: {
        title: 'Campos críticos para reprodução',
        body:
          'Três campos são especialmente importantes para a reprodução do defeito:\n• Pré-condições — sem elas, o executor não sabe como preparar o ambiente.\n• Dados utilizados — sem eles, o desenvolvedor pode testar com valores diferentes.\n• Passos para reprodução — sem eles, ninguém sabe o que fazer.',
      },
      observation: {
        title: 'Completude',
        body:
          'Nenhum campo é dispensável sem justificativa. A completude é um critério de qualidade do próprio relatório. Campos vazios sinalizam que algo pode ter sido esquecido.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Quais são os três campos que, se ausentes, tornam praticamente impossível para o desenvolvedor reproduzir o defeito?',
        placeholder: 'Resposta...',
        expectedAnswer:
          'Os três mais críticos para reprodução: (1) Passos para reprodução — sem eles ninguém sabe o que fazer. (2) Pré-condições — sem elas o ambiente não pode ser replicado. (3) Dados utilizados — sem eles o desenvolvedor pode testar com dados diferentes.',
      },
    },
    {
      id: 'bloco-7',
      number: 7,
      title: 'Passos para Reprodução, RE e RO',
      icon: '🪜',
      explanation: [
        'Os passos para reprodução são a sequência numerada e atômica de ações que qualquer pessoa deve executar para acionar o defeito de forma controlada. São o coração do relatório de bug: sem eles, o relatório é inutilizável. Com eles precisos, o defeito pode ser reproduzido em minutos.',
        'Os mesmos princípios dos passos de execução de um caso de teste (Unidade 4, Bloco 5) aplicam-se: cada passo deve ser atômico (uma única ação), objetivo (verbo de ação claro), preciso (com valores específicos) e sequencial.',
        'O resultado esperado no relatório de bug é idêntico ao do caso de teste — vem do requisito. O resultado obtido descreve o que o sistema realmente produziu: mensagem exibida, valor calculado, comportamento visual, log gerado. Quanto mais específico, mais rápida a investigação.',
        'Os passos devem incluir o contexto completo: URL, usuário, dados em cada campo, botões clicados e verificações intermediárias. Qualquer detalhe omitido pode ser exatamente a condição que aciona o defeito.',
      ],
      example: {
        title: 'Passos vagos vs. objetivos',
        body:
          'Vagos (inúteis):\n1) Acessar o sistema. 2) Fazer um pedido. 3) O erro aparece.\n\nObjetivos (reproduzíveis):\n1) Acessar https://loja.sistema.com e fazer login com "comprador@email.com" / "Comprador@2024".\n2) Adicionar "Fone Bluetooth XB500" (PRD-201) ao carrinho, quantidade 1.\n3) Clicar em "Finalizar Pedido".\n4) Selecionar "Pix" na tela de pagamento.\n5) Clicar em "Gerar QR Code".\n6) Aguardar 30 segundos e observar o comportamento.',
      },
      observation: {
        title: 'Completude dos passos',
        body:
          'Inclua o contexto completo do início ao fim. Não pressuponha conhecimento do executor sobre o sistema. Em caso de dúvida, prefira mais detalhes a menos.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'O resultado obtido "O sistema deu erro" é adequado? Reescreva-o de forma mais precisa.',
        placeholder: 'Análise + versão melhorada...',
        expectedAnswer:
          '"O sistema deu erro" é inadequado — vago e não observável. Versão adequada: "O sistema exibiu a mensagem \'Erro 500 - Internal Server Error\'. A página ficou em branco. Nenhum QR Code foi gerado. O console registrou: \'Uncaught TypeError: Cannot read property id of undefined\'."',
      },
    },
    {
      id: 'bloco-8',
      number: 8,
      title: 'Evidências do Defeito',
      icon: '📸',
      explanation: [
        'As evidências transformam o relatório de bug de uma afirmação ("o sistema falhou") em uma demonstração verificável ("veja o que aconteceu"). São especialmente importantes quando o defeito é difícil de reproduzir, quando há discussão sobre se o comportamento é realmente um defeito, ou para auditoria.',
        'Tipos comuns: capturas de tela mostrando o estado no momento do defeito; gravações de tela para sequências de ações; logs do sistema capturados no momento do erro; mensagens de erro completas no console; dados de performance para defeitos de desempenho.',
        'A captura deve ser feita imediatamente após a observação, antes de qualquer ação que altere o estado do sistema. Uma screenshot tirada após recarregar a página pode não mostrar mais o estado de erro.',
        'Boas práticas: screenshots devem incluir URL, hora e mensagem de erro; logs devem ter stack trace completo; vídeos são úteis para defeitos com animações ou sequências difíceis de descrever; sempre informe a frequência do defeito (100%, frequente ou apenas uma vez).',
      ],
      example: {
        title: 'Contexto das evidências',
        body:
          'Evidências sem contexto são menos úteis. Uma screenshot de erro é mais útil acompanhada dos passos que levaram àquele estado. Sempre associe evidências aos passos de reprodução: "Após o passo 5, ver Screenshot_BUG0089_01.png".',
      },
      observation: {
        title: 'Atenção',
        body:
          'Capture as evidências imediatamente. Não pressuponha que o estado de erro estará lá quando você terminar de digitar o relatório. Em muitos sistemas, o estado de erro se perde após qualquer interação.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Um defeito ocorre apenas quando dois usuários fazem login simultaneamente no mesmo dispositivo. O testador só capturou descrição textual. Que evidências deveriam ter sido registradas?',
        placeholder: 'Liste as evidências necessárias...',
        expectedAnswer:
          '(1) Screenshot da tela no momento do erro com URL e mensagem. (2) Log do servidor com as duas sessões simultâneas. (3) Dados de login dos dois usuários. (4) Frequência: ocorre sempre que dois usuários fazem login simultaneamente? (5) Gravação de tela mostrando os dois logins acontecendo.',
      },
    },
    {
      id: 'bloco-9',
      number: 9,
      title: 'Severidade e Prioridade',
      icon: '⚖️',
      explanation: [
        'A severidade e a prioridade são dois campos distintos e frequentemente confundidos. Confundi-los leva a distorções na gestão do backlog de defeitos.',
        'A severidade descreve o impacto técnico: quão grave é o problema funcionalmente? Um defeito que impede completamente uma função principal tem severidade crítica. Um defeito cosmético pode ter severidade baixa.',
        'A prioridade descreve a urgência de correção: quão importante é corrigir agora? A prioridade considera: impacto no usuário (quantos afetados?), visibilidade (perceptível em demonstração?), momento do ciclo (pré-lançamento?) e impacto financeiro ou legal.',
        'Casos aparentemente paradoxais são comuns: defeito de alta severidade com baixa prioridade (bug crítico em módulo legado a ser descontinuado em 30 dias). Defeito de baixa severidade com alta prioridade (erro tipográfico no nome da empresa em relatório oficial antes de auditoria).',
        'Níveis típicos:\n• Crítica — sistema inutilizável; perda de dados; risco de segurança grave; sem contorno.\n• Alta — função principal comprometida; contorno possível mas caro.\n• Média — função secundária afetada; contorno razoável; impacto limitado.\n• Baixa — problema cosmético; sem impacto funcional real.',
      ],
      example: {
        title: 'Quem define cada campo',
        body:
          'A severidade é definida pelo testador com base no impacto técnico — algo objetivo. A prioridade é definida em colaboração com o gerente de produto, pois envolve julgamento de negócio (quem é afetado, quando, com que custo).',
      },
      observation: {
        title: 'Atenção',
        body:
          'Severidade ≠ prioridade. Um bug grave em módulo descontinuado pode ter alta severidade técnica mas baixa prioridade. Um erro de digitação no logo antes de uma demonstração crítica pode ter baixa severidade mas alta prioridade.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Classifique severidade e prioridade do cenário: "O botão de pagamento do e-commerce não funciona em nenhum navegador desde a última atualização."',
        placeholder: 'Severidade: ... | Prioridade: ... | Justificativa: ...',
        expectedAnswer:
          'Severidade: Crítica — função principal bloqueada, sem contorno. Prioridade: Crítica — afeta diretamente a receita, exige correção imediata. Caso clássico de severidade + prioridade críticas.',
      },
    },
    {
      id: 'bloco-10',
      number: 10,
      title: 'Status do Defeito',
      icon: '🚦',
      explanation: [
        'O status rastreia o ciclo de vida do bug desde a abertura até o fechamento. Sistemas de gestão de defeitos mantêm o histórico de transições.',
        'Status comuns:\n• Aberto — defeito reportado, ainda não triado ou atribuído.\n• Em análise — recebido pela equipe de desenvolvimento e sendo investigado.\n• Em correção — defeito confirmado; desenvolvedor implementando a correção.\n• Resolvido — correção implementada, aguardando validação pelo QA.\n• Em validação — testador verificando se a correção eliminou o defeito.\n• Fechado — correção validada e caso de teste passou. Encerrado.\n• Reaberto — validação mostrou que o defeito persiste ou gerou regressão.\n• Não reproduzível — equipe não conseguiu reproduzir com as informações fornecidas.\n• Duplicado — defeito já reportado anteriormente. Fechado e vinculado ao original.\n• Não será corrigido — defeito confirmado, mas decisão de negócio é não corrigir agora.',
        'O status também pode incluir indicações sobre a versão do sistema testada, a data da execução e o nome do executor. Essas informações são essenciais para a rastreabilidade histórica: um caso de teste que passou na versão 1.2 pode falhar na versão 1.3 após uma alteração de código.',
      ],
      example: {
        title: '"Não reproduzível" não significa "inexistente"',
        body:
          '"Não reproduzível" indica que as informações são insuficientes para reproduzir o defeito — não que ele não exista. Um bom relatório raramente recebe esse status. Quando ocorre, o testador deve complementar com mais evidências e reabrir.',
      },
      observation: {
        title: 'Atenção',
        body:
          '"Bloqueado" e "Não reproduzível" são frequentemente confundidos. Bloqueado = caso de teste não pôde ser executado por impedimento. Não reproduzível = bug report executado pelo desenvolvedor mas as informações não permitiram acionar o problema.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Um defeito foi corrigido. O testador reexecutou o caso de teste e o sistema se comporta conforme o esperado. Qual deve ser o novo status?',
        placeholder: 'Status + justificativa...',
        expectedAnswer:
          'Fechado. O testador validou que a correção foi eficaz — o RO agora corresponde ao RE. O ciclo de vida do defeito é encerrado. O caso de teste relacionado deve ter seu status atualizado para "Passou".',
      },
    },
    {
      id: 'bloco-11',
      number: 11,
      title: 'Boas Práticas para Relatórios de Bug',
      icon: '✨',
      explanation: [
        '• Um defeito por relatório: cada relatório deve registrar um único defeito. Não agrupe múltiplos problemas no mesmo report — cada um deve ter seu próprio histórico.',
        '• Título específico e acionável: descreva o problema e o contexto. "Sistema de pagamento não processa cartões Visa na tela de checkout após selecionar parcelas" é melhor que "Pagamento com bug".',
        '• Passos mínimos e suficientes: inclua apenas os passos necessários para reproduzir. Passos demais cansam; passos de menos impedem reprodução.',
        '• Resultado esperado derivado do requisito: sempre baseie no requisito, não em suposições. Se o requisito for ambíguo, registre essa ambiguidade no relatório.',
        '• Resultado obtido específico e factual: descreva exatamente o que aconteceu com mensagens literais, valores e estado visual.',
        '• Frequência e reprodutibilidade: indique se o defeito é consistente (100% das vezes) ou intermitente. Defeitos intermitentes são mais difíceis e precisam de mais investigação.',
        '• Linguagem neutra e profissional: evite linguagem emocional, julgamentos ou especulações. O relatório é técnico, não pessoal.',
        '• Verificar duplicatas antes de abrir: pesquise o sistema de gestão para evitar relatórios duplicados.',
      ],
      example: {
        title: 'Comparativo de títulos',
        body:
          'Inadequado: "Login não funciona"\nAdequado: "Login com senha correta retorna erro 401 no Chrome 120 em homologação"\n\nInadequado: "Bug no relatório"\nAdequado: "Relatório de vendas mensais exibe total zerado quando o mês não tem pedidos"\n\nInadequado: "Sistema crasha"\nAdequado: "Sistema encerra sessão ao exportar relatório com mais de 10.000 registros"',
      },
      observation: {
        title: 'Fórmula do bom título',
        body:
          'Um bom título responde três perguntas: O que falha? Onde falha? Em que condição falha? Essas três respostas permitem que qualquer membro da equipe entenda o defeito antes de abrir o relatório.',
      },
      miniActivity: {
        type: 'text',
        prompt: 'Avalie e reescreva: "Sistema de matrícula com problema."',
        placeholder: 'Sua análise + versão melhorada...',
        expectedAnswer:
          '"Sistema de matrícula com problema" é vago. Versão adequada: "Sistema de matrícula exibe mensagem de conflito de horário incorretamente ao tentar matricular em disciplina sem sobreposição de grade" — responde O QUE (mensagem incorreta), ONDE (matrícula em disciplina) e EM QUE CONDIÇÃO (sem sobreposição real).',
      },
    },
    {
      id: 'bloco-12',
      number: 12,
      title: 'Relação entre CTs, Defeitos e Comunicação',
      icon: '🔗',
      explanation: [
        'O relatório de bug é o elo entre o processo de teste (representado pelo caso de teste) e o processo de correção (realizado pelo desenvolvimento). Quando um caso de teste falha, o testador deve registrar o defeito de forma que permita reprodução e investigação eficiente.',
        'A rastreabilidade entre caso de teste e relatório de bug é fundamental. O campo "Caso de teste relacionado" conecta o defeito ao CT que o revelou, permitindo: (1) saber qual requisito estava sendo verificado; (2) quais dados e condições foram usados; (3) qual é o resultado esperado. Essa rastreabilidade facilita a reexecução do CT após a correção para validar que o defeito foi resolvido.',
        'Fluxo típico:\n• TESTADOR: executa CT → compara RE com RO → identifica divergência → registra bug report com passos, dados, evidências, RE, RO, severidade e prioridade.\n• DESENVOLVIMENTO: recebe o report → reproduz usando os passos → investiga a causa raiz → implementa a correção → atualiza status para Resolvido.\n• QA (validação): reexecuta o CT original → verifica se RE agora corresponde ao RO → testa cenários de regressão → fecha se corrigido; reabre se persistir.',
        'A reexecução do CT original após a correção é chamada de teste de regressão específico. Ela garante que a correção foi eficaz. Além disso, é recomendável executar CTs relacionados para verificar que não foram introduzidos novos defeitos.',
      ],
      example: {
        title: 'Relatório de bug é colaboração, não acusação',
        body:
          'Sommerville destaca que a comunicação entre QA, desenvolvimento e produto é fator crítico de qualidade. O relatório de bug deve ser entendido como ferramenta de colaboração — não de acusação. Linguagem técnica neutra, foco no comportamento e no impacto, não em quem "errou".',
      },
      observation: {
        title: 'Atenção',
        body:
          'A rastreabilidade entre CT e bug report também permite análises de qualidade: requisitos com muitos defeitos podem indicar problemas de especificação. Módulos com alta densidade de bugs apontam áreas que precisam de refatoração ou mais cobertura de teste.',
      },
      miniActivity: {
        type: 'text',
        prompt:
          'Por que é importante incluir o ID do caso de teste no relatório de bug, mesmo que os passos de reprodução sejam idênticos aos do CT?',
        placeholder: 'Resposta...',
        expectedAnswer:
          'O ID do CT estabelece rastreabilidade entre o defeito e o requisito. Permite identificar qual CT deve ser reexecutado após a correção para validar. Permite analisar padrões: requisitos com muitos defeitos podem indicar problemas de especificação. E mantém o histórico de qualidade do projeto.',
      },
    },
  ],

  /* ─── 6. Demonstracao com exemplo resolvido ───────────────── */
  demonstration: {
    requirement:
      'RF-031: A plataforma deve permitir que o aluno envie atividades em formato PDF com tamanho máximo de 10 MB. Arquivos acima de 10 MB devem ser rejeitados com "Arquivo muito grande. O tamanho máximo permitido é de 10 MB." Arquivos em outro formato devem ser rejeitados com "Formato inválido. Apenas arquivos PDF são aceitos."',
    situation:
      'Vamos elaborar passo a passo um bug report completo a partir da execução do CT-ATI-003 (envio de PDF com tamanho exatamente no limite de 10 MB). O caso revelou um defeito clássico de análise de valor limite — o sistema rejeita o valor exato do limite. A demonstração mostra como cada campo do bug report é derivado do contexto do teste.',
    steps: [
      {
        id: 1,
        label: 'Interpretação do requisito e CT',
        question: 'Como o testador identifica o defeito?',
        body:
          'CT-ATI-003: envio de PDF com tamanho exatamente 10 MB.\nObjetivo: verificar se o sistema aceita arquivo PDF com tamanho exato de 10 MB.\nPré-condições: aluno logado; atividade aberta para envio.\nDados: arquivo "trabalho_final.pdf" com tamanho exato de 10.000 KB.\nRE: sistema aceita e exibe "Atividade enviada com sucesso."\n\nAo executar o CT, o sistema exibiu: "Arquivo muito grande. O tamanho máximo permitido é de 10 MB." — rejeitando um arquivo de exatamente 10 MB, que deveria ser aceito.\n\nDivergência clara entre RE e RO: defeito identificado. Hipótese: o código usa ">" em vez de ">=" no operador de comparação do limite (defeito clássico de valor limite — Unidade 3).',
        color: '#1F8A5B',
      },
      {
        id: 2,
        label: 'Identificação, ambiente e rastreabilidade',
        question: 'Como preencher os primeiros campos do bug report?',
        body:
          '• ID: BUG-0089\n• Título: "Sistema rejeita upload de PDF com tamanho exato de 10 MB no módulo de envio de atividades"\n• Sistema / Módulo: Plataforma Educacional — Módulo de Envio de Atividades\n• Ambiente: Windows 11 / Chrome 120.0.6099.130 / Versão plataforma 2.4.1 (homologação) / 1920x1080\n• Requisito relacionado: RF-031 — Restrições de formato e tamanho no envio de atividades\n• Caso de teste relacionado: CT-ATI-003 — Envio de PDF com tamanho no limite (10 MB)\n\nO título responde O QUE (sistema rejeita upload de PDF), ONDE (módulo de envio de atividades) e EM QUE CONDIÇÃO (tamanho exato de 10 MB).',
        color: '#146B4A',
      },
      {
        id: 3,
        label: 'Pré-condições, dados e passos',
        question: 'Como descrever a reprodução com precisão?',
        body:
          'Pré-condições:\n1) Aluno "ana.silva@universidade.edu" logado na plataforma.\n2) Atividade "Trabalho Final" (ATI-2024-12) com status "Aberta para envio".\n3) Prazo de entrega não expirado.\n\nDados utilizados:\n• Arquivo: "trabalho_final.pdf"\n• Tamanho: 10.000 KB (exatamente 10 MB)\n• Formato: PDF\n• Aluno: Ana Silva\n\nPassos para reprodução:\n1) Acessar https://plataforma.universidade.edu e fazer login.\n2) No menu lateral, clicar em "Minhas Disciplinas".\n3) Selecionar "Engenharia de Software".\n4) Clicar na atividade "Trabalho Final".\n5) Clicar em "Enviar Atividade".\n6) Selecionar o arquivo "trabalho_final.pdf" (10 MB).\n7) Clicar em "Confirmar Envio".\n8) Observar a mensagem exibida.',
        color: '#0F3D2E',
      },
      {
        id: 4,
        label: 'Resultado esperado, obtido e evidências',
        question: 'O que registrar como veredicto e prova?',
        body:
          'Resultado esperado: Sistema aceita o arquivo e exibe "Atividade enviada com sucesso." O arquivo aparece em "Minhas Entregas" com status "Enviada".\n\nResultado obtido: O sistema exibiu "Arquivo muito grande. O tamanho máximo permitido é de 10 MB." O arquivo não foi enviado. Nenhuma entrega registrada.\n\nEvidências:\n• Screenshot_BUG0089_01.png: tela de envio com mensagem de erro e arquivo selecionado visível.\n• URL: https://plataforma.universidade.edu/atividades/ATI-2024-12/envio.\n• Hora: 10h47.\n\nO RE é específico (mensagem exata + estado da lista). O RO é factual (mensagem literal + ausência de efeito). A evidência inclui contexto (URL + hora).',
        color: '#4CAF50',
      },
      {
        id: 5,
        label: 'Tipo, severidade, prioridade e status',
        question: 'Como classificar e priorizar o defeito?',
        body:
          '• Tipo: Funcional / Validação de dados (erro de operador de comparação no limite)\n• Severidade: Alta — a função de envio não funciona para arquivos no limite exato, afetando alunos com arquivo próximo ao máximo. Não é crítica porque há contorno (compactar o arquivo), mas o usuário não deveria precisar.\n• Prioridade: Alta — função de entrega de atividades é central para a plataforma e afeta diretamente a avaliação dos alunos. A correção é tecnicamente simples (mudar > para >=).\n• Status: Aberto\n• Responsável sugerido: Equipe de desenvolvimento — Módulo de Upload\n• Observações: Defeito ocorre consistentemente. Testado com 9,9 MB: aceito. Com 10,1 MB: rejeitado corretamente. Hipótese: condição usa ">" em vez de ">=" no operador de comparação do limite.',
        color: '#0F3D2E',
      },
    ],
    lesson:
      'O bug report completo nasce do caso de teste, é estruturado nos 18 campos essenciais e respeita os critérios de qualidade: título específico (O QUE / ONDE / CONDIÇÃO), passos atômicos com dados exatos, RE e RO observáveis, evidências com contexto, e classificação (tipo + severidade + prioridade) com justificativa. Esse padrão deve ser aplicado a qualquer defeito identificado.',
  },

  /* ─── 7+9. Atividade 5.1 (8) + 5.3 (6) = 14 questoes ──────── */
  atividade11: {
    description:
      'Esta atividade combina os exercícios 5.1 (Classificação de Defeitos — 8 cenários) e 5.3 (Severidade e Prioridade — 6 situações). Você responde uma questão por vez em janelas separadas e recebe feedback imediato após cada escolha.',
    questions: [
      /* ─── Atividade 5.1 — Classificacao (8) ─── */
      {
        id: '5.1.1',
        question:
          'Em um sistema de compras online, o usuário aplica cupom de desconto de 20%. A tela exibe o preço original sem desconto, mas o valor cobrado no cartão é o correto (com desconto). Qual é o tipo principal de defeito?',
        options: [
          'A) Defeito de desempenho — o sistema demora a atualizar o preço.',
          'B) Defeito funcional — o cálculo do desconto está errado.',
          'C) Defeito de interface — a tela exibe valor incorreto, embora a cobrança esteja correta.',
          'D) Defeito de integração — o módulo de pagamento não comunica o desconto.',
        ],
        correctIndex: 2,
        explanation:
          'Correto! Você identificou que o problema está na apresentação, não no cálculo. Defeito de interface afeta como a informação é exibida, mesmo que o processamento interno esteja correto.',
        errorExplanation:
          'Observe que a cobrança estava correta — o cálculo funcionou. O problema é na exibição. Quando exclusivamente na apresentação visual, é defeito de interface. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },
      {
        id: '5.1.2',
        question:
          'Um sistema bancário permite transferências apenas para contas do mesmo banco. Ao tentar transferir para outro banco, o sistema aceita sem exibir erro e debita o valor. O dinheiro não chega ao destino. Qual é o tipo principal?',
        options: [
          'A) Defeito de usabilidade — o usuário não entende o processo.',
          'B) Defeito funcional — a regra de restrição de transferência não foi implementada.',
          'C) Defeito de interface — o botão de transferência está no lugar errado.',
          'D) Defeito de desempenho — o sistema demora para processar.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! A regra de negócio não está sendo aplicada. Defeito funcional.',
        errorExplanation:
          'O sistema executa operação que não deveria ser permitida — violação de regra de negócio = defeito funcional. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },
      {
        id: '5.1.3',
        question:
          'Em uma plataforma de e-learning, a página principal de um curso leva 45 segundos para carregar com 200 usuários simultâneos. O requisito especificava máximo de 3 segundos para 500 usuários. Qual é o tipo principal?',
        options: [
          'A) Defeito de integração — os módulos não se comunicam bem.',
          'B) Defeito funcional — a página não exibe o conteúdo correto.',
          'C) Defeito de desempenho — o tempo de resposta excede o especificado.',
          'D) Defeito de segurança — o excesso de usuários pode indicar vulnerabilidade.',
        ],
        correctIndex: 2,
        explanation:
          'Correto! Defeito de desempenho: comportamento funcional correto, mas tempo de resposta não atende ao requisito não funcional.',
        errorExplanation:
          'O sistema funciona mas muito lentamente. Quando o problema é tempo de resposta ou capacidade, é defeito de desempenho. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },
      {
        id: '5.1.4',
        question:
          'Um formulário de cadastro possui campo "Idade" que aceita o valor "-5" sem mensagem de erro. O sistema salva o registro com idade negativa no banco de dados. Qual é o tipo principal?',
        options: [
          'A) Defeito de interface — o campo não tem máscara de entrada.',
          'B) Defeito de validação de dados — o sistema aceita entrada inválida (idade negativa).',
          'C) Defeito funcional — a função de cadastro não salva os dados corretamente.',
          'D) Defeito de usabilidade — o usuário pode digitar qualquer valor sem orientação.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! Aceitar entradas inválidas sem erro é o padrão típico de defeito de validação de dados.',
        errorExplanation:
          'O campo aceita valor que não deveria. A validação de entrada falhou. Defeito de validação de dados. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },
      {
        id: '5.1.5',
        question:
          'Sistema de RH envia dados de horas trabalhadas com "funcionario_id" como texto. O sistema receptor espera inteiro. A folha não é processada e o receptor registra erros de tipo. Qual é o tipo principal?',
        options: [
          'A) Defeito funcional — a folha de pagamento não é calculada.',
          'B) Defeito de validação — o RH deveria validar o formato antes de enviar.',
          'C) Defeito de integração — o contrato de comunicação entre os sistemas não está sendo respeitado.',
          'D) Defeito de desempenho — o envio demora demais.',
        ],
        correctIndex: 2,
        explanation:
          'Correto! Quando a falha está na comunicação entre sistemas ou incompatibilidade de APIs, é integração.',
        errorExplanation:
          'O dado foi enviado mas no formato errado para o receptor. Quando a falha está na comunicação entre sistemas, é integração. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },
      {
        id: '5.1.6',
        question:
          'O botão "Confirmar Pedido" fica completamente invisível na versão mobile quando a tela tem menos de 400 pixels, pois fica atrás do menu de navegação. Qual é o tipo principal?',
        options: [
          'A) Defeito de usabilidade — o usuário não entende o fluxo.',
          'B) Defeito de interface — o elemento está posicionado incorretamente no layout mobile.',
          'C) Defeito funcional — o botão não funciona.',
          'D) Defeito de desempenho — a página não carrega corretamente em mobile.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! Elemento visual sobreposto ou invisível é defeito de interface.',
        errorExplanation:
          'O botão está inacessível por causa do layout, não por falha funcional. Problema de posicionamento = interface. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },
      {
        id: '5.1.7',
        question:
          'Sistema de agendamento médico exibe confirmação em inglês ("Appointment confirmed successfully") mesmo configurado para português do Brasil. Qual é o tipo principal?',
        options: [
          'A) Defeito de integração — o módulo de idiomas não se conecta.',
          'B) Defeito de segurança — a exposição do idioma pode revelar informações do servidor.',
          'C) Defeito de mensagem — a mensagem exibida está no idioma errado.',
          'D) Defeito funcional — o agendamento não foi confirmado.',
        ],
        correctIndex: 2,
        explanation:
          'Correto! Sistema funciona mas a mensagem exibida está incorreta. Defeito de mensagem.',
        errorExplanation:
          'O agendamento foi feito. O problema é apenas na mensagem. Defeitos em textos de interface ou idioma = defeito de mensagem. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },
      {
        id: '5.1.8',
        question:
          'Um e-commerce permite que um usuário acesse o painel administrativo sem autenticação apenas inserindo a URL "/admin". Não há verificação de sessão nem permissão. Qual é o tipo principal?',
        options: [
          'A) Defeito funcional — o painel não exibe os dados corretamente.',
          'B) Defeito de usabilidade — o acesso ao painel é confuso.',
          'C) Defeito de segurança — qualquer usuário acessa o painel sem autenticação.',
          'D) Defeito de interface — a URL está exposta publicamente.',
        ],
        correctIndex: 2,
        explanation:
          'Correto! Falhas de autenticação e controle de acesso são defeitos de segurança.',
        errorExplanation:
          'A funcionalidade existe mas qualquer pessoa acessa sem autenticação. Falhas no controle de acesso = defeito de segurança. Revise o Bloco 4.',
        reviewBlock: 'bloco-4',
      },

      /* ─── Atividade 5.3 — Severidade x Prioridade (6) ─── */
      {
        id: '5.3.1',
        question:
          'Em um sistema bancário, o botão "Realizar Transferência" parou de funcionar após a última atualização. Nenhum usuário consegue fazer transferências. Detectado na sexta-feira, três horas antes do encerramento do expediente. Qual é a classificação correta?',
        options: [
          'A) Severidade: Crítica · Prioridade: Crítica.',
          'B) Severidade: Crítica · Prioridade: Média.',
          'C) Severidade: Média · Prioridade: Crítica.',
          'D) Severidade: Alta · Prioridade: Baixa.',
        ],
        correctIndex: 0,
        explanation:
          'Correto! Função principal completamente bloqueada (severidade crítica) com impacto imediato no negócio (prioridade crítica). Caso clássico de urgência máxima.',
        errorExplanation:
          'Função principal completamente bloqueada = severidade crítica. Impacto no negócio imediato = prioridade crítica. Revise o Bloco 9.',
        reviewBlock: 'bloco-9',
      },
      {
        id: '5.3.2',
        question:
          'Em um sistema hospitalar, o módulo de prontuário pode exibir o prontuário de um paciente para o médico errado. Sistema usado apenas para consultas eletivas. Problema identificado em homologação antes do lançamento. Classificação correta?',
        options: [
          'A) Severidade: Crítica · Prioridade: Crítica.',
          'B) Severidade: Crítica · Prioridade: Alta.',
          'C) Severidade: Alta · Prioridade: Média.',
          'D) Severidade: Média · Prioridade: Baixa.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! Severidade crítica (impacto grave potencial de violação de privacidade), prioridade alta (em homologação ainda — deve ser corrigido antes do lançamento, mas não é emergência de produção).',
        errorExplanation:
          'Severidade = impacto técnico potencial (grave, dados sensíveis). Prioridade = influenciada pelo contexto: em homologação há tempo para correção planejada. Revise o Bloco 9.',
        reviewBlock: 'bloco-9',
      },
      {
        id: '5.3.3',
        question:
          'O logo da empresa aparece com qualidade levemente inferior no rodapé em resolução 4K. Não afeta funcionalidade. Porém, há demonstração ao vivo para investidores amanhã em monitor 4K. Classificação correta?',
        options: [
          'A) Severidade: Baixa · Prioridade: Crítica.',
          'B) Severidade: Baixa · Prioridade: Baixa.',
          'C) Severidade: Alta · Prioridade: Alta.',
          'D) Severidade: Crítica · Prioridade: Crítica.',
        ],
        correctIndex: 0,
        explanation:
          'Correto! Você identificou o paradoxo: baixa severidade técnica (problema puramente estético, sem impacto funcional) mas alta/crítica prioridade de negócio (demonstração para investidores amanhã em monitor 4K, defeito visivelmente perceptível).',
        errorExplanation:
          'Não confunda severidade com prioridade. Severidade = impacto técnico (estético = baixo). Prioridade = urgência de negócio (demonstração amanhã = crítica). Revise o Bloco 9.',
        reviewBlock: 'bloco-9',
      },
      {
        id: '5.3.4',
        question:
          'Em sistema legado de RH que será substituído em 30 dias, foi encontrado defeito crítico no cálculo de férias. A empresa migrará para o novo sistema antes do próximo ciclo de cálculos. Classificação correta?',
        options: [
          'A) Severidade: Crítica · Prioridade: Crítica.',
          'B) Severidade: Alta · Prioridade: Baixa.',
          'C) Severidade: Baixa · Prioridade: Baixa.',
          'D) Severidade: Média · Prioridade: Média.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! Alta severidade (pode causar danos financeiros se ativado) mas baixa prioridade (sistema descontinuado antes do defeito impactar qualquer ciclo). A decisão de negócio afeta diretamente a prioridade.',
        errorExplanation:
          'Alta severidade não significa automaticamente alta prioridade. Se o sistema será descontinuado, a prioridade pode ser baixa. Revise o Bloco 9.',
        reviewBlock: 'bloco-9',
      },
      {
        id: '5.3.5',
        question:
          'Sistema de notas fiscais exibe o CNPJ sem pontuação ("12345678000195" em vez de "12.345.678/0001-95"). O documento é válido legalmente, mas não está no formato padronizado pela Receita Federal. Classificação correta?',
        options: [
          'A) Severidade: Crítica · Prioridade: Crítica.',
          'B) Severidade: Alta · Prioridade: Alta.',
          'C) Severidade: Média · Prioridade: Média.',
          'D) Severidade: Baixa · Prioridade: Baixa.',
        ],
        correctIndex: 2,
        explanation:
          'Correto! Cenário típico de média severidade (documento válido legalmente, mas formato incorreto pode causar problemas operacionais em sistemas de terceiros) e média prioridade (deve ser corrigido, mas sem urgência — pode ser planejado para o próximo ciclo).',
        errorExplanation:
          'Documento válido legalmente (severidade não é crítica), mas formato incorreto pode causar problemas operacionais (média severidade). Prioridade média pois não é urgente mas precisa ser corrigido. Revise o Bloco 9.',
        reviewBlock: 'bloco-9',
      },
      {
        id: '5.3.6',
        question:
          'Em plataforma de vídeos, ao legendar um vídeo 8K (recurso experimental, 0,1% dos usuários beta), o sistema encerra inesperadamente. Usuários perdem trabalho não salvo. Todos os outros recursos funcionam. Classificação correta?',
        options: [
          'A) Severidade: Crítica · Prioridade: Crítica.',
          'B) Severidade: Alta · Prioridade: Baixa.',
          'C) Severidade: Baixa · Prioridade: Alta.',
          'D) Severidade: Média · Prioridade: Média.',
        ],
        correctIndex: 1,
        explanation:
          'Correto! Alta severidade técnica (encerramento com perda de dados é grave) mas baixa prioridade (afeta minoria minúscula em recurso beta — 0,1% dos usuários). O número de usuários afetados e a criticidade do recurso são fatores de prioridade.',
        errorExplanation:
          'Defeito grave tecnicamente (alta severidade), mas afeta quase ninguém em recurso beta (baixa prioridade). Usuários afetados e criticidade do recurso são fatores de prioridade. Revise o Bloco 9.',
        reviewBlock: 'bloco-9',
      },
    ],
  },

  /* ─── 8. Atividade 5.2 — discursiva (elaborar bug report) ─── */
  atividade12: {
    question:
      'Cenário: Sistema de gestão acadêmica — módulo de notas.\n\nRF-017: O sistema deve calcular automaticamente a média final ao final do semestre como média aritmética de P1, P2, P3. Resultado com duas casas decimais. Média >= 7,0: "Aprovado"; média < 7,0: "Reprovado".\n\nCT-NOT-005: Média com valores idênticos (P1=8,0; P2=8,0; P3=8,0 — média esperada: 8,00 — Aprovado)\n\nComportamento observado: ao inserir P1=8,0, P2=8,0, P3=8,0 e clicar em "Calcular Média", o sistema exibiu "Média final: 7,99 — Reprovado".\n\nAmbiente: Windows 10, Chrome 119, versão 3.1.2 (homologação). Usuário: professor@faculdade.edu.\n\nElabore um RELATÓRIO DE BUG COMPLETO para esse defeito. Sua resposta deve incluir, claramente identificados, os 18 campos: ID, Título, Sistema/Módulo, Ambiente de teste, Requisito relacionado, Caso de teste relacionado, Pré-condições, Dados utilizados, Passos para reprodução, Resultado esperado, Resultado obtido, Evidências, Tipo de defeito, Severidade, Prioridade, Status, Responsável sugerido e Observações adicionais.',
    minWords: 250,
    criteria: [
      'Título específico e acionável que responde O QUE / ONDE / EM QUE CONDIÇÃO falha (ex.: "Média final calculada incorretamente: exibe 7,99 em vez de 8,00 para notas idênticas").',
      'Pré-condições controlam o estado do sistema (professor logado, aluno cadastrado, disciplina específica, provas sem nota lançada).',
      'Dados utilizados incluem valores exatos (P1=8,0; P2=8,0; P3=8,0; média esperada 8,00) e identificam aluno e disciplina.',
      'Passos numerados, atômicos e reproduzíveis (do login à observação da média e classificação).',
      'Resultado esperado derivado do requisito (média 8,00 → Aprovado) e resultado obtido factual (média 7,99 → Reprovado).',
      'Severidade Crítica (erro de cálculo pode reprovar alunos que deveriam ser aprovados, com consequências acadêmicas e jurídicas) e prioridade Crítica (afeta processo de avaliação) com justificativa coerente.',
    ],
    sampleAnswer:
      'ID do defeito: BUG-0112\nTítulo: Média final calculada incorretamente — exibe 7,99 em vez de 8,00 para notas idênticas e classifica aluno como Reprovado\nSistema / Módulo: Plataforma de gestão acadêmica — Módulo de Notas / Cálculo de Média\nAmbiente de teste: Windows 10 / Chrome 119 / Plataforma versão 3.1.2 (homologação)\nRequisito relacionado: RF-017 — Cálculo automático de média final\nCaso de teste relacionado: CT-NOT-005 — Média com três notas idênticas (P1=P2=P3=8,0)\n\nPré-condições:\n1) Professor "professor@faculdade.edu" logado com perfil de docente.\n2) Aluno "joao.santos@faculdade.edu" (mat. 20240101) cadastrado em "Cálculo I".\n3) As três provas ainda não possuem nota lançada.\n\nDados utilizados: P1: 8,0 / P2: 8,0 / P3: 8,0 / Média esperada: 8,00\n\nPassos para reprodução:\n1) Login em https://academico.faculdade.edu com "professor@faculdade.edu".\n2) Clicar em "Gerenciar Notas".\n3) Selecionar "Cálculo I".\n4) Localizar aluno "João Santos" (mat. 20240101).\n5) Inserir P1=8,0, P2=8,0, P3=8,0.\n6) Clicar em "Calcular Média".\n7) Observar a média e classificação exibidas.\n\nResultado esperado: O sistema exibe "Média final: 8,00 — Aprovado". Registro atualizado com média correta e status "Aprovado".\n\nResultado obtido: O sistema exibiu "Média final: 7,99 — Reprovado". Aluno classificado incorretamente como Reprovado. Registro salvo com média 7,99.\n\nEvidências: Screenshot_BUG0112_01.png — tela exibindo P1=8,0, P2=8,0, P3=8,0 e média calculada como 7,99 com classificação "Reprovado". Hora: 14h22.\n\nTipo de defeito: Funcional — erro de arredondamento no cálculo da média (possível problema de ponto flutuante).\nSeveridade: Crítica — erro de cálculo pode reprovar alunos que deveriam ser aprovados, gerando consequências acadêmicas e jurídicas.\nPrioridade: Crítica — afeta diretamente o resultado acadêmico; deve ser corrigido antes de qualquer lançamento de notas.\nStatus: Aberto\nResponsável sugerido: Equipe de desenvolvimento — Módulo de Cálculo Acadêmico\nObservações adicionais: Testado também com P1=P2=P3=7,0: média exibida 6,99. Hipótese: erro de representação de ponto flutuante sem arredondamento correto. Ocorre consistentemente com notas que resultam em média exata.',
    rubric: [
      {
        level: 'Insuficiente',
        range: '0 – 25%',
        description:
          'Mais da metade dos campos ausentes; título vago; sem passos reproduzíveis; severidade/prioridade incorretas ou ausentes. Revisitar especialmente os Blocos 6, 7 e 9.',
      },
      {
        level: 'Básico',
        range: '26 – 50%',
        description:
          'Campos principais presentes mas com conteúdo raso (dados sem valores específicos, RO genérico, falta de evidências). Revisar Blocos 6, 7 e 8.',
      },
      {
        level: 'Satisfatório',
        range: '51 – 75%',
        description:
          'Todos os 18 campos preenchidos com coerência. Pequenas imprecisões em severidade/prioridade ou na descrição do RO. Revisar Bloco 9.',
      },
      {
        level: 'Excelente',
        range: '76 – 100%',
        description:
          'Relatório completo e preciso: título com 3 dimensões (O QUE/ONDE/CONDIÇÃO), passos com dados exatos, RE/RO observáveis e factuais, severidade crítica fundamentada no impacto acadêmico e jurídico, observações com hipótese técnica (ponto flutuante).',
      },
    ],
  },

  /* ─── 10. Pratica Guiada — RF-009 e-mail confirmacao ──────── */
  guidedPracticeRich: {
    scenario:
      'Sistema: Aplicativo de agendamento de consultas médicas.\n\nRF-009: O sistema deve enviar e-mail de confirmação ao paciente em até 5 minutos após a confirmação. O e-mail deve conter: nome do médico, data/horário, endereço da clínica e instruções de preparo quando aplicáveis.\n\nCT-AGE-004: Verificar envio de e-mail de confirmação após agendamento bem-sucedido.\n\nComportamento observado: o testador realizou o agendamento com sucesso (sistema confirmou na tela). Aguardou 15 minutos. Nenhum e-mail chegou. Verificou pasta de spam — vazia. O agendamento aparece corretamente na lista do sistema.',
    question:
      'Elabore um relatório de bug completo para esse defeito. Use as dicas progressivas se precisar de apoio.',
    fields: [
      {
        key: 'identificacao',
        label: '1. Identificação (ID, Título, Sistema/Módulo, Ambiente)',
        description: 'Use ID padronizado, título específico (O QUE / ONDE / CONDIÇÃO) e ambiente completo (SO, app, versão).',
        placeholder: 'ID: ... | Título: ... | Sistema/Módulo: ... | Ambiente: ...',
        color: '#1F8A5B',
      },
      {
        key: 'rastreabilidade',
        label: '2. Rastreabilidade e estado inicial (Requisito, CT, Pré-condições, Dados)',
        description: 'Vincule ao RF-009 e CT-AGE-004; descreva pré-condições (paciente logado, médico disponível, caixa de entrada vazia) e dados (médico, data, horário, e-mail).',
        placeholder: 'Requisito: RF-009 | CT: CT-AGE-004 | Pré-condições: ... | Dados: ...',
        color: '#146B4A',
      },
      {
        key: 'reproducao',
        label: '3. Passos para reprodução',
        description: 'Ações numeradas, atômicas, do login até a verificação da caixa de entrada. Inclua o tempo de espera.',
        placeholder: '1) ... | 2) ... | 3) ... | 4) ... | 5) ... | 6) ... | 7) ...',
        color: '#0F3D2E',
      },
      {
        key: 'resultado',
        label: '4. Resultado esperado, obtido e evidências',
        description: 'RE derivado do requisito (e-mail em até 5 min com conteúdo X). RO factual (nenhum e-mail após 15 min). Evidências: screenshots da confirmação e da caixa vazia.',
        placeholder: 'RE: ... | RO: ... | Evidências: ...',
        color: '#4CAF50',
      },
      {
        key: 'classificacao',
        label: '5. Classificação (Tipo, Severidade, Prioridade, Status, Responsável, Observações)',
        description: 'Tipo (funcional/integração); severidade média (função principal funciona, e-mail é função secundária); prioridade alta (impacto direto no usuário).',
        placeholder: 'Tipo: ... | Severidade: ... | Prioridade: ... | Status: ... | Responsável: ... | Observações: ...',
        color: '#E53935',
      },
    ],
    hints: [
      'Título: Um bom título descreve O QUE falha, ONDE falha e EM QUE CONDIÇÃO. Para este defeito: o que não funcionou? (E-mail de confirmação não enviado.) Onde? (Módulo de agendamento.) Condição? (Após agendamento bem-sucedido.) Combine em frase concisa.',
      'Ambiente: qual SO, versão do app e dispositivo foram usados? Web ou mobile? O e-mail testado era real? Quanto tempo foi aguardado antes de verificar?',
      'Passos: comece do login. Inclua dados do agendamento (médico, data, horário), e-mail cadastrado, clique em confirmar e tempo aguardado. O tempo de espera é crítico neste caso.',
      'Severidade e prioridade: a função principal (agendamento) funciona? O e-mail é função crítica para o negócio? O defeito tem contorno (agendamento aparece na lista)? Essas respostas guiam a classificação.',
    ],
    expectedAnswers: {
      identificacao:
        'ID: BUG-0156 | Título: E-mail de confirmação de agendamento não é enviado ao paciente após confirmação bem-sucedida no aplicativo | Sistema/Módulo: Aplicativo de Agendamento de Consultas — Módulo de Notificações por E-mail | Ambiente: Android 13 / App versão 4.2.0 / Rede Wi-Fi corporativa. E-mail: paciente.teste@email.com',
      rastreabilidade:
        'Requisito: RF-009 — Envio de e-mail de confirmação de agendamento. CT relacionado: CT-AGE-004 — Verificar envio de e-mail após agendamento bem-sucedido.\nPré-condições: 1) Paciente "Carlos Mendes" logado com e-mail "carlos.mendes@email.com" verificado. 2) Dr. Ana Ferreira disponível em 20/01/2025 às 14h. 3) Caixa de entrada de "carlos.mendes@email.com" vazia antes do teste.\nDados utilizados: Médico: Dr. Ana Ferreira / Data: 20/01/2025 / Horário: 14h00 / E-mail: carlos.mendes@email.com / Tempo aguardado: 15 minutos.',
      reproducao:
        '1) Abrir o app e fazer login com "carlos.mendes@email.com". 2) Tocar em "Agendar Consulta". 3) Selecionar "Cardiologia". 4) Selecionar "Dr. Ana Ferreira". 5) Selecionar data 20/01/2025 e horário 14h. 6) Tocar em "Confirmar Agendamento". 7) Verificar que o sistema exibe "Consulta agendada com sucesso". 8) Aguardar 15 minutos. 9) Verificar caixa de entrada e spam de carlos.mendes@email.com.',
      resultado:
        'RE: Em até 5 minutos após a confirmação, paciente recebe e-mail com nome da médica (Dr. Ana Ferreira), data/horário (20/01/2025, 14h), endereço da clínica e instruções de preparo.\nRO: Após 15 minutos, nenhum e-mail recebido em carlos.mendes@email.com. Pasta de spam também vazia. Agendamento aparece corretamente na lista do aplicativo.\nEvidências: Screenshot_BUG0156_01 (app exibindo "Consulta agendada com sucesso"); Screenshot_BUG0156_02 (caixa de entrada vazia após 15 minutos); Screenshot_BUG0156_03 (pasta de spam vazia).',
      classificacao:
        'Tipo: Funcional / Possivelmente de integração (módulo de envio de e-mail pode não estar sendo acionado).\nSeveridade: Média — o agendamento foi realizado com sucesso (função principal funcionou). O não envio do e-mail é função secundária, mas importante.\nPrioridade: Alta — pacientes dependem do e-mail para lembrar a consulta e receber instruções de preparo. Pode causar faltas por falta de notificação.\nStatus: Aberto. Responsável sugerido: Equipe de desenvolvimento — Serviço de Notificações.\nObservações: Testado em duas contas diferentes com resultados idênticos. O agendamento é salvo no banco. Verificar logs do serviço de e-mail (SMTP). Frequência: 100% dos agendamentos testados.',
    },
    feedback:
      'Destaque para os passos que incluem o tempo de espera (15 minutos) — dado crítico para defeito de temporização — e as evidências cobrindo tanto a confirmação do agendamento quanto a ausência do e-mail. A severidade média é coerente porque a função principal funcionou, mas a prioridade alta reflete o impacto real (pacientes podem faltar à consulta).',
  },

  /* ─── 11. Pratica Independente — RF-042 certificado ───────── */
  independentPracticeRich: {
    scenario:
      'Sistema: Plataforma de cursos online — módulo de certificados.\n\nRF-042: O sistema deve gerar e disponibilizar o certificado automaticamente quando o aluno: (1) completar 100% das aulas; e (2) atingir nota mínima de 7,0. O certificado deve exibir: nome completo, título do curso, data de conclusão e carga horária.\n\nCT-CERT-001: Verificar geração do certificado para aluno com 100% das aulas e nota >= 7,0.\n\nComportamento observado: o testador completou 100% das aulas do curso "Python para Iniciantes" (40 horas) e obteve nota 8,5. Ao clicar em "Baixar Certificado", o PDF é gerado. Porém, o campo "Carga Horária" exibe "0 horas" em vez de "40 horas".\n\nAmbiente: Windows 11 / Firefox 121 / Plataforma versão 5.0.1 (produção). Usuário: aluno.teste@email.com.',
    tasks: [
      'Elabore um bug report COMPLETO sem auxílio de dicas.',
      'Especifique pré-condições que cubram os dois critérios do requisito (100% aulas E nota >= 7,0).',
      'Inclua dados utilizados específicos (curso, carga horária do curso, nota do aluno).',
      'Descreva passos que incluam a verificação específica do campo no PDF gerado.',
      'Justifique severidade (média — certificado é gerado, apenas um campo errado) e prioridade (alta — documento oficial usado profissionalmente).',
    ],
    fields: [
      {
        key: 'identificacao',
        label: '1. Identificação (ID, Título, Sistema/Módulo, Ambiente)',
        description: 'Use ID padronizado, título específico, ambiente completo (SO, navegador, versão).',
        placeholder: 'ID: ... | Título: ... | Sistema/Módulo: ... | Ambiente: ...',
        color: '#1F8A5B',
      },
      {
        key: 'rastreabilidade',
        label: '2. Rastreabilidade e estado inicial (Requisito, CT, Pré-condições, Dados)',
        description: 'Vincule ao RF-042 e CT-CERT-001; pré-condições cobrem 100% aulas E nota >= 7,0.',
        placeholder: 'Requisito: RF-042 | CT: CT-CERT-001 | Pré-condições: ... | Dados: ...',
        color: '#146B4A',
      },
      {
        key: 'reproducao',
        label: '3. Passos para reprodução',
        description: 'Ações numeradas, atômicas. Inclua a abertura do PDF e localização específica do campo "Carga Horária".',
        placeholder: '1) ... | 2) ... | 3) ... | 4) ... | 5) ... | 6) ... | 7) ... | 8) ...',
        color: '#0F3D2E',
      },
      {
        key: 'resultado',
        label: '4. Resultado esperado, obtido e evidências',
        description: 'RE derivado do RF-042 (campo "Carga Horária: 40 horas"). RO factual (campo exibe "0 horas"). Evidências cobrindo PDF e tela do curso.',
        placeholder: 'RE: ... | RO: ... | Evidências: ...',
        color: '#4CAF50',
      },
      {
        key: 'classificacao',
        label: '5. Classificação (Tipo, Severidade, Prioridade, Status, Responsável, Observações)',
        description: 'Tipo (funcional — dado não recuperado/exibido); severidade média; prioridade alta (documento oficial).',
        placeholder: 'Tipo: ... | Severidade: ... | Prioridade: ... | Status: ... | Responsável: ... | Observações: ...',
        color: '#E53935',
      },
    ],
    expectedAnswers: {
      identificacao:
        'ID: BUG-0201 | Título: Certificado de conclusão exibe carga horária "0 horas" em vez da carga horária correta do curso | Sistema/Módulo: Plataforma de Cursos Online — Módulo de Geração de Certificados | Ambiente: Windows 11 / Firefox 121 / Plataforma versão 5.0.1 (produção).',
      rastreabilidade:
        'Requisito: RF-042 — Geração automática de certificado de conclusão. CT relacionado: CT-CERT-001 — Geração de certificado com 100% das aulas e nota >= 7,0.\nPré-condições: 1) Aluno "Marcos Oliveira" (aluno.teste@email.com) logado. 2) Aluno concluiu 100% das aulas de "Python para Iniciantes" (40 horas). 3) Aluno obteve nota 8,5 na avaliação final. 4) Botão "Baixar Certificado" visível no painel do curso.\nDados utilizados: Curso: Python para Iniciantes / Carga horária do curso: 40 horas / Nota do aluno: 8,5 / Aluno: Marcos Oliveira.',
      reproducao:
        '1) Login em https://cursos.plataforma.com com "aluno.teste@email.com". 2) Acessar o curso "Python para Iniciantes". 3) Verificar que o progresso é 100% e a nota é 8,5. 4) Clicar em "Baixar Certificado". 5) Aguardar o download do PDF. 6) Abrir o arquivo PDF. 7) Localizar o campo "Carga Horária" no certificado. 8) Verificar o valor exibido.',
      resultado:
        'RE: O certificado PDF exibe "Carga Horária: 40 horas". Os demais campos (nome, título, data) corretos.\nRO: O certificado PDF exibe "Carga Horária: 0 horas". Os demais campos (nome, título, data) corretos. Apenas o campo de carga horária está incorreto.\nEvidências: Screenshot_BUG0201_01.png (PDF do certificado exibindo "Carga Horária: 0 horas"); Screenshot_BUG0201_02.png (tela do curso exibindo "40 horas" como carga horária registrada).',
      classificacao:
        'Tipo: Funcional — dado de carga horária não está sendo recuperado e exibido corretamente no certificado.\nSeveridade: Média — o certificado é gerado e dados principais corretos. O erro no campo de carga horária é dado secundário, mas incorreto.\nPrioridade: Alta — certificado é documento oficial usado para fins profissionais e acadêmicos. Dado incorreto compromete validade.\nStatus: Aberto. Responsável sugerido: Equipe de desenvolvimento — Módulo de Geração de Certificados / Serviço de PDF.\nObservações: Testado também com "Excel Avançado" (20 horas): certificado exibe "0 horas". Defeito consistente para todos os cursos. Hipótese: campo de carga horária não está sendo passado para o template de geração do PDF.',
    },
    criteria: [
      {
        label: 'Identificação',
        weight: '20%',
        description: 'Título específico (O QUE/ONDE/CONDIÇÃO), ID, sistema/módulo e ambiente completos.',
      },
      {
        label: 'Rastreabilidade e dados',
        weight: '20%',
        description: 'Vínculo com RF-042 e CT-CERT-001; pré-condições cobrem 100% aulas E nota >= 7,0; dados específicos.',
      },
      {
        label: 'Passos para reprodução',
        weight: '20%',
        description: 'Ações numeradas, atômicas; inclui abertura do PDF e localização específica do campo.',
      },
      {
        label: 'Resultado esperado e obtido',
        weight: '20%',
        description: 'RE derivado do requisito ("Carga Horária: 40 horas"); RO factual ("Carga Horária: 0 horas"); evidências adequadas.',
      },
      {
        label: 'Classificação justificada',
        weight: '20%',
        description: 'Severidade média e prioridade alta com justificativa coerente (certificado é documento oficial).',
      },
    ],
    feedbackCorrect:
      'Excelente! Relatório completo: pré-condições cobrem os dois critérios do requisito (100% conclusão + nota válida), passos incluem verificação específica do campo no PDF, RE e RO com valor exato e justificativa coerente.',
    feedbackIncorrect:
      'Pontos a revisar:\n• Pré-condições insuficientes? Não especificou que o aluno deve ter completado 100% E obtido nota acima de 7,0 (sem essas condições, o botão "Baixar Certificado" pode não estar disponível).\n• RE/RO impreciso? Não especificou qual campo está incorreto nem qual valor foi exibido — "O certificado estava errado" não orienta o desenvolvedor.\nRevise os Blocos 4, 6 e 7.',
  },

  /* ─── 12. Avaliacao Final — 10 questoes (AF5-01 a AF5-10) ── */
  finalAssessmentQuestions: [
    {
      id: 'AF5-01',
      question: 'Qual é a distinção correta entre erro, defeito e falha no contexto do teste de software?',
      options: [
        'A) Erro, defeito e falha são sinônimos aceitos pelo CTFL e podem ser usados intercambiavelmente.',
        'B) Erro é a ação humana incorreta; defeito é o problema no artefato; falha é o comportamento incorreto em execução.',
        'C) Defeito é a ação humana incorreta; erro é o problema no código; falha é a detecção pelo testador.',
        'D) Falha é a ação humana incorreta; erro é o problema no código; defeito é o relatório gerado.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. O CTFL distingue: erro (ação humana incorreta) gera defeito (problema no artefato) que causa falha (comportamento incorreto em execução). Conteúdo: Bloco 2.',
      errorExplanation:
        'A distinção é cadeia causal: erro (humano) → defeito (artefato) → falha (execução). Não são sinônimos no contexto técnico formal. Bloco 2.',
      reviewBlock: 'bloco-2',
    },
    {
      id: 'AF5-02',
      question:
        'Um sistema aceita "abc" no campo de quantidade de itens sem mensagem de erro e tenta salvar o pedido, resultando em erro interno. Qual é o tipo mais adequado?',
      options: [
        'A) Defeito de desempenho — o servidor demora a processar a entrada inválida.',
        'B) Defeito de interface — o campo está posicionado incorretamente.',
        'C) Defeito de validação de dados — o sistema aceita entrada inválida sem rejeitá-la.',
        'D) Defeito de integração — o módulo de pedidos não comunica o erro ao servidor.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. O sistema deveria validar que a quantidade é número inteiro positivo e rejeitar "abc". Ao aceitar sem validar, é defeito de validação de dados. Bloco 4.',
      errorExplanation:
        'O problema é a ausência de validação da entrada: o sistema aceita o inválido. Defeito de validação de dados. Bloco 4.',
      reviewBlock: 'bloco-4',
    },
    {
      id: 'AF5-03',
      question: 'Um testador identifica que o resultado obtido diverge do resultado esperado. Qual é a ação correta imediatamente?',
      options: [
        'A) Reexecutar o caso de teste até o resultado corresponder ao esperado.',
        'B) Fechar o caso de teste como "Não executado" e aguardar a próxima versão.',
        'C) Registrar um relatório de bug com dados relevantes: passos, RE, RO e evidências.',
        'D) Notificar verbalmente o desenvolvedor e aguardar correção antes de registrar.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. A divergência entre RE e RO indica possível defeito. A ação imediata é registrar formalmente o bug report. Notificação verbal pode ser complementar, mas não substitui o registro. Blocos 3 e 5.',
      errorExplanation:
        'A divergência deve ser registrada formalmente. Notificação verbal não garante rastreabilidade. Blocos 3 e 5.',
      reviewBlock: 'bloco-3',
    },
    {
      id: 'AF5-04',
      question: 'Qual campo ausente em um relatório de bug torna mais difícil para o desenvolvedor reproduzir o defeito?',
      options: ['A) ID do defeito.', 'B) Passos para reprodução.', 'C) Status do defeito.', 'D) Responsável sugerido.'],
      correctIndex: 1,
      explanation:
        'Correto. Os passos para reprodução são o campo mais crítico para reprodução. Sem eles, o desenvolvedor não sabe o que fazer. ID, status e responsável são de gestão. Blocos 6 e 7.',
      errorExplanation:
        'Passos para reprodução = campo mais crítico para reprodução técnica. Sem eles, o relatório é inutilizável. Blocos 6 e 7.',
      reviewBlock: 'bloco-7',
    },
    {
      id: 'AF5-05',
      question: 'Qual afirmação descreve corretamente a relação entre severidade e prioridade?',
      options: [
        'A) Severidade e prioridade são equivalentes: alta severidade sempre implica alta prioridade.',
        'B) A prioridade é sempre maior que a severidade, pois é definida pelo negócio.',
        'C) Severidade descreve o impacto técnico; prioridade descreve a urgência de negócio. Os dois podem divergir.',
        'D) A severidade é definida pelo gerente de produto; a prioridade, pelo testador.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. Severidade (impacto técnico) e prioridade (urgência de negócio) são independentes. Defeito cosmético pode ter baixa severidade mas alta prioridade. Defeito crítico em sistema legado pode ter alta severidade mas baixa prioridade. Bloco 9.',
      errorExplanation:
        'Severidade e prioridade são conceitos distintos. Um defeito grave pode ter baixa prioridade se o contexto justificar. Bloco 9.',
      reviewBlock: 'bloco-9',
    },
    {
      id: 'AF5-06',
      question: 'Um relatório de bug recebeu status "Não reproduzível". O que indica e qual a próxima ação do testador?',
      options: [
        'A) O defeito não existe — o testador cometeu um erro. O relatório deve ser fechado.',
        'B) O sistema foi corrigido desde o relatório. O testador deve fechar como resolvido.',
        'C) O time não conseguiu reproduzir com as informações fornecidas. O testador deve complementar e reabrir.',
        'D) O defeito é de baixa prioridade e pode ser ignorado.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. "Não reproduzível" não significa ausência de defeito — significa informações insuficientes. O testador deve capturar mais evidências, detalhar condições e complementar o relatório. Bloco 10.',
      errorExplanation:
        '"Não reproduzível" indica falta de informação, não ausência de defeito. O testador deve complementar e reabrir. Bloco 10.',
      reviewBlock: 'bloco-10',
    },
    {
      id: 'AF5-07',
      question: 'Qual opção representa o título mais adequado para um relatório de bug?',
      options: [
        'A) "Sistema de pagamento com bug."',
        'B) "Pagamento não funciona."',
        'C) "Botão Confirmar Pagamento não responde ao clique na tela de checkout quando o usuário tem mais de 3 itens no carrinho."',
        'D) "O desenvolvedor esqueceu de implementar o evento de clique no botão de pagamento."',
      ],
      correctIndex: 2,
      explanation:
        'Correto. O título C responde: O que falha? (Botão não responde.) Onde? (Tela de checkout.) Em que condição? (Mais de 3 itens.) É factual, sem especulação ou culpa. Bloco 11.',
      errorExplanation:
        'O título deve ser específico (o que, onde, condição) e factual. Opções A e B são vagas; D especula e atribui culpa. Bloco 11.',
      reviewBlock: 'bloco-11',
    },
    {
      id: 'AF5-08',
      question:
        'O testador valida correção de defeito e observa que o sistema se comporta conforme esperado, mas uma funcionalidade adjacente agora apresenta comportamento incorreto. Como proceder?',
      options: [
        'A) Fechar o bug original e não tomar ação — não faz parte do escopo original.',
        'B) Fechar o bug original como resolvido e abrir novo relatório para o problema na funcionalidade adjacente.',
        'C) Reabrir o bug original para incluir o novo problema.',
        'D) Informar verbalmente e aguardar instruções antes de registrar qualquer relatório.',
      ],
      correctIndex: 1,
      explanation:
        'Correto. O bug original foi validado (pode ser fechado). O novo problema é um defeito de regressão — introduzido pela correção — e deve ser registrado em novo relatório. Um relatório por defeito. Blocos 10 e 11.',
      errorExplanation:
        'O bug original foi validado (fechar). O novo é regressão — novo relatório. Um relatório por defeito é boa prática. Blocos 10 e 11.',
      reviewBlock: 'bloco-11',
    },
    {
      id: 'AF5-09',
      question: 'Qual afirmação sobre evidências em relatórios de bug é CORRETA?',
      options: [
        'A) Evidências são opcionais e só necessárias quando o defeito é de severidade crítica.',
        'B) Um screenshot sem contexto (sem URL, dados da tela, horário) é suficiente.',
        'C) As evidências devem ser capturadas imediatamente após a observação, antes de qualquer ação que possa alterar o estado do sistema.',
        'D) Logs do servidor não são evidências válidas — apenas screenshots são aceitos.',
      ],
      correctIndex: 2,
      explanation:
        'Correto. A evidência deve ser capturada imediatamente, pois ações subsequentes podem destruir as informações relevantes. Bloco 8.',
      errorExplanation:
        'Evidências devem ser capturadas imediatamente e com contexto. Logs, vídeos e dados são evidências válidas. Bloco 8.',
      reviewBlock: 'bloco-8',
    },
    {
      id: 'AF5-10',
      question: 'Identifique a afirmação INCORRETA entre as opções:',
      options: [
        'A) Um defeito pode existir no código sem causar falha, se as condições para ativá-lo nunca forem atingidas.',
        'B) A severidade de um defeito é sempre definida pelo gerente de produto, pois reflete o impacto no negócio.',
        'C) Um relatório de bug deve ser objetivo e factual, sem especulações ou atribuição de culpa.',
        'D) O status "Reaberto" indica que a correção foi insuficiente ou que o defeito gerou regressão.',
      ],
      correctIndex: 1,
      explanation:
        'Correto — a afirmação B é a INCORRETA. A severidade é definida pelo testador com base no impacto técnico. O gerente de produto influencia a PRIORIDADE (urgência de negócio), não a severidade. Bloco 9.',
      errorExplanation:
        'A afirmação incorreta é B. Severidade (impacto técnico) = definida pelo testador. Prioridade (urgência de negócio) = influenciada pelo gerente de produto. Bloco 9.',
      reviewBlock: 'bloco-9',
    },
  ],

  reviewMap: {
    'AF5-01': ['bloco-2'],
    'AF5-02': ['bloco-4'],
    'AF5-03': ['bloco-3', 'bloco-5'],
    'AF5-04': ['bloco-6', 'bloco-7'],
    'AF5-05': ['bloco-9'],
    'AF5-06': ['bloco-10'],
    'AF5-07': ['bloco-11'],
    'AF5-08': ['bloco-10', 'bloco-11'],
    'AF5-09': ['bloco-8'],
    'AF5-10': ['bloco-9'],
  },

  /* ─── 13. Desafio Aplicado Final — 3 bug reports ──────────── */
  finalChallenge: {
    enunciado:
      'Você é membro do time de QA testando um sistema de reservas de hotel em homologação. Após executar os casos de teste, identificou TRÊS defeitos distintos. Produza um relatório de bug COMPLETO para cada um (Defeito A, B e C), incluindo os 18 campos essenciais (ID, Título, Sistema/Módulo, Ambiente, Requisito, CT, Pré-condições, Dados, Passos, RE, RO, Evidências, Tipo, Severidade, Prioridade, Status, Responsável, Observações).',
    scenario:
      'Requisitos:\n\nRF-051: O sistema deve calcular o valor total da reserva (diária × número de noites). Exibir na tela de resumo e no e-mail de confirmação.\nRF-052: O sistema deve rejeitar datas de check-in no passado com "Data de check-in inválida. Selecione uma data futura."\nRF-053: Ao finalizar a reserva, exibir número no formato "RES-XXXXX" (5 dígitos numéricos).\n\nCasos de teste executados:\n• CT-HOT-001: Reserva válida — 3 noites, diária R$ 250. RE: valor total = R$ 750.\n• CT-HOT-002: Tentativa de check-in com data de ontem. RE: mensagem de data inválida.\n• CT-HOT-003: Finalizar reserva válida. RE: número no formato "RES-XXXXX".\n\nDefeitos observados:\n• Defeito A (CT-HOT-001): Tela exibiu R$ 500 em vez de R$ 750. E-mail exibiu R$ 750 corretamente.\n• Defeito B (CT-HOT-002): Sistema NÃO exibiu mensagem de erro. Reserva foi processada com check-in no passado.\n• Defeito C (CT-HOT-003): Número gerado como "RES-12" em vez de "RES-00012".\n\nAmbiente: Windows 11 / Chrome 121 / Sistema versão 1.0.0 (homologação).',
    fields: [
      {
        key: 'defeitoA',
        label: 'Bug Report 1 — Defeito A (Valor total incorreto na tela)',
        description:
          'RF-051 / CT-HOT-001. Atenção: o valor cobrado (e-mail) é correto, mas a tela de resumo exibe R$ 500 em vez de R$ 750. Inclua os 18 campos.',
        placeholder:
          'ID: ... | Título: ... | Sistema/Módulo: ... | Ambiente: ... | Requisito: RF-051 | CT: CT-HOT-001 | Pré-condições: ... | Dados (check-in/check-out/diária): ... | Passos: ... | RE: R$ 750,00 | RO: R$ 500,00 (tela) — R$ 750,00 (e-mail) | Evidências: ... | Tipo: ... | Severidade: ... | Prioridade: ... | Status: ... | Responsável: ... | Observações: ...',
        color: '#1F8A5B',
      },
      {
        key: 'defeitoB',
        label: 'Bug Report 2 — Defeito B (Aceitar check-in no passado)',
        description:
          'RF-052 / CT-HOT-002. Sistema aceita data passada sem validação e processa reserva inválida. Inclua os 18 campos.',
        placeholder:
          'ID: ... | Título: ... | Requisito: RF-052 | CT: CT-HOT-002 | Pré-condições (data atual): ... | Dados (check-in passado): ... | Passos: ... | RE: mensagem "Data de check-in inválida..." + reserva NÃO processada | RO: nenhuma mensagem + reserva processada | Severidade: ... | Prioridade: ...',
        color: '#E53935',
      },
      {
        key: 'defeitoC',
        label: 'Bug Report 3 — Defeito C (Número de reserva sem padding)',
        description:
          'RF-053 / CT-HOT-003. Número gerado em formato incorreto (RES-12 em vez de RES-00012). Inclua os 18 campos.',
        placeholder:
          'ID: ... | Título: ... | Requisito: RF-053 | CT: CT-HOT-003 | Pré-condições (reservas existentes no sistema): ... | Dados: ... | Passos: ... | RE: "RES-00012" | RO: "RES-12" | Severidade: Baixa (funcional, único) | Prioridade: Média (comunicação com cliente)',
        color: '#146B4A',
      },
    ],
    expectedAnswers: {
      defeitoA:
        'ID: BUG-0301 | Título: Tela de resumo exibe valor total incorreto (R$ 500 em vez de R$ 750) para reserva de 3 noites com diária R$ 250 | Sistema/Módulo: Sistema de Reservas de Hotel — Módulo de Cálculo e Exibição de Valores | Ambiente: Windows 11 / Chrome 121 / Sistema versão 1.0.0 (homologação) | Requisito: RF-051 — Cálculo e exibição do valor total | CT relacionado: CT-HOT-001.\n\nPré-condições: 1) Usuário "testador@hotel.com" logado. 2) Quarto disponível (diária R$ 250). 3) Sistema na tela de seleção.\nDados: Check-in: 20/01/2025 / Check-out: 23/01/2025 (3 noites) / Diária: R$ 250 / Quarto: Standard Single.\nPassos: 1) Acessar https://reservas.hotel.com e fazer login. 2) Selecionar check-in 20/01/2025, check-out 23/01/2025. 3) Selecionar quarto "Standard Single". 4) Clicar em "Reservar". 5) Na tela de resumo, verificar o campo "Valor Total".\nRE: Tela exibe "Valor Total: R$ 750,00" (3 × R$ 250).\nRO: Tela exibiu "Valor Total: R$ 500,00". O e-mail de confirmação enviado em seguida exibiu o valor correto de R$ 750,00.\nEvidências: Screenshot_BUG0301_01 (tela de resumo com "R$ 500,00"); Screenshot_BUG0301_02 (e-mail com "R$ 750,00").\nTipo: Funcional (erro de cálculo) / Interface (tela exibe valor diferente do processado).\nSeveridade: Alta — o cliente vê valor diferente do cobrado, gerando confusão e potencial litígio.\nPrioridade: Alta — afeta a confiança do usuário antes da finalização da reserva.\nStatus: Aberto. Responsável: Equipe de desenvolvimento — Módulo de Cálculo de Reservas.\nObservações: O valor cobrado é o correto (R$ 750). O defeito é na exibição da tela de resumo. Possível uso de variável diferente entre tela e serviço de e-mail.',
      defeitoB:
        'ID: BUG-0302 | Título: Sistema aceita check-in com data no passado sem mensagem de erro, processando reserva inválida | Sistema/Módulo: Sistema de Reservas — Módulo de Validação de Datas | Ambiente: Windows 11 / Chrome 121 / Sistema versão 1.0.0 (homologação) | Requisito: RF-052 | CT: CT-HOT-002.\n\nPré-condições: 1) Usuário "testador@hotel.com" logado. 2) Data atual do sistema: 19/01/2025.\nDados: Check-in: 18/01/2025 (ontem) / Check-out: 21/01/2025.\nPassos: 1) Acessar https://reservas.hotel.com e fazer login. 2) Selecionar check-in 18/01/2025 (data passada). 3) Selecionar check-out 21/01/2025. 4) Clicar em "Buscar Quartos". 5) Selecionar qualquer quarto. 6) Clicar em "Reservar". 7) Observar o comportamento.\nRE: Sistema exibe "Data de check-in inválida. Selecione uma data futura." Reserva não processada.\nRO: Sistema não exibiu mensagem de erro. Reserva foi processada e confirmada com check-in 18/01/2025 (data passada).\nEvidências: Screenshot_BUG0302_01 (confirmação de reserva com check-in 18/01/2025); Screenshot_BUG0302_02 (data atual do sistema no rodapé — 19/01/2025).\nTipo: Funcional / Validação de dados — regra de validação de data não implementada.\nSeveridade: Alta — sistema cria reservas com datas inválidas, corrompendo o inventário de disponibilidade.\nPrioridade: Alta — defeito funcional que compromete a integridade dos dados de reservas.\nStatus: Aberto. Responsável: Equipe de desenvolvimento — Módulo de Validação de Formulários.\nObservações: Testado com diversas datas passadas: o sistema aceita todas sem validação. A validação parece completamente ausente.',
      defeitoC:
        'ID: BUG-0303 | Título: Número de reserva gerado em formato incorreto ("RES-12" em vez de "RES-00012", 5 dígitos) | Sistema/Módulo: Sistema de Reservas — Módulo de Geração de Números de Reserva | Ambiente: Windows 11 / Chrome 121 / Sistema versão 1.0.0 (homologação) | Requisito: RF-053 — Formato do número de reserva (RES-XXXXX, 5 dígitos) | CT: CT-HOT-003.\n\nPré-condições: 1) Usuário logado. 2) Reserva válida com datas e quarto selecionados. 3) 12 reservas existentes no sistema.\nDados: Check-in: 20/01/2025 / Check-out: 22/01/2025 / Quarto: Standard Single.\nPassos: 1) Acessar https://reservas.hotel.com e fazer login. 2) Selecionar datas válidas e quarto. 3) Clicar em "Confirmar Reserva". 4) Na tela de confirmação, verificar o número da reserva exibido.\nRE: Sistema exibe número no formato "RES-00012" (prefixo RES + 5 dígitos com zeros à esquerda).\nRO: O sistema exibiu "RES-12" — apenas 2 dígitos, sem zeros à esquerda.\nEvidências: Screenshot_BUG0303_01 (tela de confirmação exibindo "Número da Reserva: RES-12").\nTipo: Interface / Funcional — formato de exibição do número não atende ao padrão especificado.\nSeveridade: Baixa — o número é único e funcional; o formato incorreto não impede o uso.\nPrioridade: Média — o formato é usado em comunicações com clientes e pode causar confusão ou problemas de rastreamento.\nStatus: Aberto. Responsável: Equipe de desenvolvimento — Módulo de Geração de Identificadores.\nObservações: Testado com reserva de número 5: exibiu "RES-5" em vez de "RES-00005". O número parece estar sendo gerado sem formatação de zeros à esquerda (padding).',
    },
    rubric: [
      {
        level: 'Insuficiente',
        range: '0 – 25%',
        achievementCount: '0–1 relatórios adequados',
        description:
          'A maioria dos relatórios apresenta campos ausentes, conteúdo vago ou classificação incorreta de severidade/prioridade. Revisitar especialmente os Blocos 6, 7, 8 e 9.',
      },
      {
        level: 'Básico',
        range: '26 – 50%',
        achievementCount: '1 relatório adequado, demais parciais',
        description:
          'Estrutura geral compreendida, mas passos vagos, RE/RO genéricos ou severidade/prioridade não justificadas. Revisar Blocos 7 e 9.',
      },
      {
        level: 'Satisfatório',
        range: '51 – 75%',
        achievementCount: '2 relatórios adequados',
        description:
          'Bom domínio da estrutura. Pequenas imprecisões em um dos relatórios (geralmente em severidade/prioridade ou na descrição do RO). Revisar Bloco 9.',
      },
      {
        level: 'Excelente',
        range: '76 – 100%',
        achievementCount: '3 relatórios adequados',
        description:
          'Domínio excelente: os três relatórios apresentam todos os 18 campos preenchidos, títulos específicos, passos atômicos, RE/RO observáveis, evidências contextualizadas e severidade/prioridade justificadas pelo contexto. Demonstrou capacidade de diferenciar defeitos de cálculo (alta severidade), validação de dados (alta severidade) e formato (baixa severidade).',
      },
    ],
    finalFeedback:
      'Você produziu três bug reports cobrindo o espectro essencial: um defeito de cálculo na tela (alta severidade), um defeito de validação de dados (alta prioridade por impacto na integridade) e um defeito de formato (baixa severidade, média prioridade). Essa capacidade de identificar, classificar e comunicar defeitos é uma das competências mais valorizadas em profissionais de qualidade de software. Você concluiu a Unidade 5 e o ciclo principal da plataforma Test Lab — está preparado para os próximos passos: automação, gestão ágil de qualidade, testes de desempenho e segurança, e certificações como o CTFL/ISTQB Foundation Level.',
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
