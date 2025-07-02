
# 📄 NFe Scraper API

> **Versão atual:** 1.0.0  
> **Linguagem:** TypeScript (JavaScript runtime)  
> **Framework:** Express.js  
> **Finalidade:** Extração de dados públicos da Nota Fiscal do Consumidor Eletrônica (NFC-e)

---

## 📌 Visão Geral

Este projeto foi desenvolvido como uma **API intermediária** responsável por consumir e interpretar as informações públicas das **notas fiscais eletrônicas (NFC-e)** emitidas via portais estaduais da Fazenda.  
Seu propósito principal é **facilitar a integração com uma segunda aplicação**, a ser desenvolvida posteriormente, que fará o consumo direto dessas informações para geração de relatórios, dashboards e organização financeira.

A API foi construída em **JavaScript (TypeScript)** por sua **agilidade de prototipação** e vasto ecossistema de bibliotecas voltadas à manipulação de conteúdo HTML e HTTP.

---

## ⚙️ Funcionalidades

- 🔍 **Busca de NFC-e** com base na **chave de acesso**
- 🌐 Suporte a múltiplas **UFs** com aplicação do **design pattern Strategy**
- 🧠 Parsing de documentos HTML da Fazenda via **Cheerio.js**
- 📦 Extração estruturada de:
  - Emitente
  - Endereço
  - Produtos
  - Sumário (valor pago, valor a pagar, total de itens)
  - Tributos (totais, federais, estaduais, fonte)
  - Informações gerais da nota
- 🧪 DTOs prontos para consumo via frontend ou outros microserviços

---

## 🧱 Arquitetura

- **Camada de Estratégia (Strategy):**
  Cada UF possui um _strategy_ implementado com base na sua estrutura de HTML.

- **Parser HTML:**
  Utiliza a lib `cheerio` para extrair os dados relevantes do HTML da nota.

- **DTOs:**
  Todos os dados são organizados em **Data Transfer Objects** consistentes para padronização do retorno.

- **Service Layer:**
  Responsável por orquestrar o scraping e retorno de dados.

---

## 🚀 Rotas Disponíveis

### `GET /api`

Consulta e extrai informações da NFC-e com base na URL da nota (geralmente obtida via QR Code).

#### 🔸 Body:

{
  "url": "https://www.fazenda.pr.gov.br/nfce/qrcode?p=..."
}

#### 🔸 Resposta:

{
  "issuer": { ... },
  "address": { ... },
  "products": [ ... ],
  "summary": { ... },
  "taxes": { ... },
  "generalInfo": { ... }
}

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- Yarn ou npm

### Passos

git clone https://github.com/WesleyParastchuk/nfe-api.git
cd nfe-api
npm install
npm run dev

---

## 🛠️ Tecnologias

- Express.js
- TypeScript
- Axios
- Cheerio

---

## 📁 Estrutura de Pastas

src/
├── controllers/
├── dto/
├── routes/
├── service/
│   ├── extraction/
│   │   └── extractors/
│   └── nfeServices/
└── index.ts

---

## 🧩 Estratégia de Expansão

- ✅ Atualmente implementado: PR
- 🏗️ Facilidade de adicionar novas UFs via Strategy Pattern
- 🛡️ Pronto para ser encapsulado em um microserviço isolado

---

## 📲 Uso em outra aplicação

Esta API foi criada com a finalidade de ser **consumida por outro sistema**, que irá:

- Ler NFC-es escaneadas ou importadas via QR Code
- Obter todos os dados extraídos de forma estruturada
- Usar essas informações para gerar relatórios, extratos ou gráficos

---

## 🧾 Licença

Este projeto é **privado** e destinado a fins educacionais ou experimentais.  
Não utilize em produção sem respeitar a legislação vigente sobre scraping de dados públicos.
