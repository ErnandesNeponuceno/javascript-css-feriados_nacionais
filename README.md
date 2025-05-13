
# 📅 Feriados Nacionais - Consulta e Exportação

O **Feriados Nacionais** é uma aplicação web desenvolvida com **HTML**, **CSS** e **JavaScript**, que permite consultar os **feriados oficiais do Brasil** para qualquer ano desejado. A aplicação consome dados da API pública [BrasilAPI](https://brasilapi.com.br/) e possibilita exportar os resultados em **PDF** e **CSV**.

Projeto voltado à prática de Git, pull requests e merges no GitHub, promovendo a colaboração entre os desenvolvedores envolvidos [Poliana Vieira](https://github.com/polianav), [Jefferson Barroso Freitas](https://github.com/jefferson-barroso) e [Ernandes Neponuceno](https://github.com/ErnandesNeponuceno).

---

## 🛠️ Funcionalidades

- **Consulta por Ano**:
  - Permite consultar os feriados nacionais de qualquer ano válido com 4 dígitos.
  - Validação de entrada e mensagens de erro amigáveis.

- **Resultado Detalhado**:
  - Lista o nome do feriado, a data e o dia da semana correspondente.
  - Mensagem clara caso não haja feriados ou a API esteja offline.

- **Exportação de Dados**:
  - **Baixar PDF**: Gera um arquivo PDF com a lista de feriados.
  - **Baixar CSV**: Exporta os dados para uma planilha em formato CSV.

- **Acessibilidade e Feedback**:
  - Alertas visuais e sonoros com **ToastifyJS**.
  - Layout responsivo e interativo.

---

## 📁 Estrutura do Projeto

```plaintext
feriados-nacionais/
├── assets/
│   ├── css/
│   │   └── styles.css           # Estilização principal
│   ├── img/
│   │   ├── logo.png             # Logotipo da aplicação
│   │   └── tela.png             # Captura de tela (exemplo de uso)
│   ├── js/
│   │   ├── exportUtils.js       # Lógica de exportação (PDF e CSV)
│   │   └── script.js            # Lógica de interação e requisição da API
├── index.html                   # Estrutura principal da aplicação
├── README.md                    # Documentação do projeto
```

---

## 💻 Tecnologias Utilizadas

<div style="display: inline_block">
  <img alt="HTML" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img alt="CSS" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
</div>

---

## 🚀 Como Rodar o Projeto?

### ✅ Pré-requisitos
- Um navegador moderno e atualizado.

### ▶️ Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/ErnandesNeponuceno/javascript-css-feriados_nacionais.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd feriados-nacionais
   ```

3. Abra o arquivo `index.html` no seu navegador:
   - Clique duas vezes no arquivo **`index.html`**, ou
   - Rode com uma extensão de servidor local (como o Live Server no VS Code).

---

## 🖼️ Exemplo de Uso

- Veja como ficou o projeto acessando: [Link](https://javascript-css-feriados-nacionais.vercel.app/)

<img src="./assets/img/tela.png" alt="Exemplo da aplicação" width="600px">

---

## ✨ Créditos

- Dados fornecidos pela [BrasilAPI](https://brasilapi.com.br/).
- Ícones e alertas com **ToastifyJS**.
- Projeto desenvolvido com fins **educacionais** e **didáticos**.

---

## 📌 Licença

Este projeto é de uso livre para estudos e aprendizagem. Não possui finalidade comercial.
