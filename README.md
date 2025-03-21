# Pokédex Ionic

Este é um aplicativo de Pokédex criado com **Ionic** e **Angular**, que permite visualizar detalhes dos 151 Pokémon da primeira geração.

## 📌 Funcionalidades

✅ Exibe detalhes de cada Pokémon, incluindo nome, imagem, altura, peso, tipos e habilidades.  
✅ Navegação entre os Pokémon usando setas laterais.  
✅ Modo claro/escuro ajustável pelo usuário.  
✅ Interface responsiva e otimizada para dispositivos móveis.  

---

## 🚀 Como rodar o projeto

### **1️⃣ Requisitos**
- Node.js (versão recomendada: 16+)
- Ionic CLI instalado globalmente (`npm install -g @ionic/cli`)
- API do Pokémon (PokéAPI)

### **2️⃣ Clonar o repositório**
```bash
git clone https://github.com/seu-usuario/pokedex-ionic.git
cd pokedex-ionic
```

### **3️⃣ Instalar dependências**
```bash
yarn install  # ou npm install
```

### **4️⃣ Rodar o aplicativo**
```bash
ionic serve
```
Acesse `http://localhost:8100/` no navegador.

---

## 📂 Estrutura do Projeto

```
/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   ├── details/  # Tela de detalhes do Pokémon
│   │   ├── services/     # Consumo da PokéAPI
│   ├── assets/           # Ícones e imagens
│   ├── theme/            # Estilos globais
│   ├── global.scss       # Arquivo global de estilos
└── README.md
```

---

## 🎨 Estilos e Componentes

O projeto utiliza **Ionic UI Components** para uma interface moderna e responsiva. Algumas classes importantes:

- `.card-container`: Centraliza o card do Pokémon e adiciona as setas de navegação.
- `.arrow`: Estiliza as setas laterais de navegação.
- `.dark-theme`: Ativa o modo escuro.
- `.imagem-container`: Ajusta o tamanho dos ícones e imagens.

---

## 📡 Consumo da PokéAPI
O aplicativo obtém os detalhes dos Pokémon da [PokéAPI](https://pokeapi.co/). Exemplo de chamada HTTP:
```typescript
this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  .subscribe(response => {
    this.pokemon = response;
  });
```

---

## 🛠 Tecnologias Utilizadas
- **Ionic 6** (Framework Híbrido)
- **Angular 19.1.7**
- **TypeScript**
- **PokéAPI** (para buscar os dados dos Pokémon)

