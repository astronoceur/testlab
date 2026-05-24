<div align="center">

# 🐞 TestLab

**Plataforma educacional interativa para o ensino de Testes de Software**

Projeto desenvolvido na disciplina *Oficina de Desenvolvimento de Software Educacional 1* — Licenciatura em Computação, Escola Superior de Tecnologia (EST/UEA).

[🔗 Acessar plataforma](https://test-lab-chi.vercel.app)
&nbsp;·&nbsp;
[📄 Documentação](#-documentação-acadêmica)
&nbsp;·&nbsp;
[🐛 Reportar bug](https://github.com/astronoceur/testlab/issues)

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-BaaS-3ECF8E?logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

</div>

---

## 📚 Sobre o projeto

A **TestLab** é uma plataforma educacional digital voltada ao ensino de **Testes de Software** para estudantes do ensino superior em cursos da área de Computação. A proposta articula conteúdo teórico, prática guiada e desafios aplicados, permitindo ao estudante compreender e exercitar:

- conceitos fundamentais de qualidade de software (erro, falha e defeito);
- tipos de teste (unitário, integração, sistema e aceitação);
- técnicas de teste (caixa preta, caixa branca, valor limite, particionamento);
- elaboração de casos de teste a partir de requisitos;
- identificação, classificação e registro de defeitos.

A arquitetura pedagógica é baseada nos **Nove Eventos de Instrução de Robert Gagné**, organizando cada unidade em uma sequência didática progressiva, com feedback imediato, avaliação contínua e controle de progresso.

---

## ✨ Funcionalidades

- 🔐 **Autenticação** de usuários via Supabase Auth (cadastro e login).
- 📖 **Conteúdo teórico** organizado em 5 unidades sequenciais.
- ✏️ **Atividades interativas** — quizzes, classificações e exercícios práticos.
- ⚡ **Feedback automático** imediato e explicativo após cada resposta.
- 📊 **Painel do estudante** com indicadores de desempenho e média de acertos.
- 🔓 **Progressão por desempenho** — unidades liberadas conforme a conclusão da anterior.
- 💾 **Retomada de progresso** — o aluno volta exatamente de onde parou.
- 🎯 **Desafio aplicado** ao final de cada unidade para fixação do conteúdo.

---

## 🛠️ Stack utilizada

| Camada | Tecnologia |
|---|---|
| **Frontend** | React 18, TypeScript, Vite 5 |
| **Estilização** | Tailwind CSS 3, PostCSS, Autoprefixer |
| **Backend (BaaS)** | Supabase (autenticação + PostgreSQL) |
| **Deploy** | Vercel |

---

## 📁 Estrutura do projeto

```
testlab/
├── src/                    # Código-fonte da aplicação React
├── supabase_schema.sql     # Script SQL com o esquema do banco
├── index.html              # Ponto de entrada da aplicação
├── tailwind.config.js      # Configuração do Tailwind
├── postcss.config.js       # Configuração do PostCSS
├── vite.config.ts          # Configuração do Vite
├── tsconfig.json           # Configuração do TypeScript
├── .env.example            # Modelo de variáveis de ambiente
└── package.json            # Dependências e scripts
```

---

## 🚀 Como executar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) **18+**
- [npm](https://www.npmjs.com/) (ou yarn / pnpm)
- Conta gratuita no [Supabase](https://supabase.com/)

### 1. Clonar o repositório

```bash
git clone https://github.com/astronoceur/testlab.git
cd testlab
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar o Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um novo projeto.
2. No painel do projeto, vá em **Settings → API** e copie:
   - `Project URL`
   - `anon public key`
3. Vá em **SQL Editor** e execute o conteúdo do arquivo [`supabase_schema.sql`](./supabase_schema.sql) para criar as tabelas.

### 4. Configurar variáveis de ambiente

Copie o arquivo de exemplo e preencha com suas chaves:

```bash
cp .env.example .env.local
```

Edite o `.env.local`:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-public-key-aqui
```

> ⚠️ **Atenção:** nunca utilize a chave `service_role` no frontend — ela possui acesso total ao banco e deve ficar restrita ao backend.

### 5. Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação ficará disponível em [http://localhost:5173](http://localhost:5173).

---

## 📜 Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento (Vite) |
| `npm run build` | Compila o TypeScript e gera o build de produção |
| `npm run preview` | Pré-visualiza o build de produção localmente |

---

## ☁️ Deploy

A aplicação está publicada na Vercel:

🔗 **[https://test-lab-chi.vercel.app](https://test-lab-chi.vercel.app)**

Para realizar seu próprio deploy:

1. Faça um *fork* deste repositório.
2. Importe o projeto em [vercel.com](https://vercel.com).
3. Configure as variáveis de ambiente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` no painel da Vercel.
4. O deploy é executado automaticamente a cada *push* na branch `main`.

---

## 📄 Documentação acadêmica

A documentação completa da plataforma — escopo e visão do produto, matriz de design instrucional, arquitetura pedagógica, elicitação de requisitos, modelagem (UML e DER) e prototipação — está disponível no documento da disciplina.

**Modelo pedagógico:** Nove Eventos de Instrução de Robert Gagné.
**Carga horária estimada:** 34 horas, distribuídas em 5 unidades.

---

## 🎓 Contexto acadêmico

| | |
|---|---|
| **Instituição** | Universidade do Estado do Amazonas (UEA) |
| **Unidade** | Escola Superior de Tecnologia (EST) |
| **Curso** | Licenciatura em Computação |
| **Disciplina** | Oficina de Desenvolvimento de Software Educacional 1 |
| **Orientador** | Prof. José Carlos Duarte |
| **Período** | Maio de 2026 |

---

## 👩‍💻 Autoria

Desenvolvido por **Luiza Marinho Diniz Schirmer**
🔗 [github.com/astronoceur](https://github.com/astronoceur)

---

<div align="center">

*Projeto acadêmico desenvolvido para fins educacionais.*

</div>
