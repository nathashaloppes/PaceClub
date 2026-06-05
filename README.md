# PaceClub

Aplicativo mobile-first de corrida e comunidade. Acompanhe seus treinos, dispute rankings por percurso, encontre parceiros de corrida com segurança e use o botão SOS de emergência.

## Telas

| Tela | Descrição |
|------|-----------|
| **Início** | Feed social com posts de corridas |
| **Rankings** | Ranking por percurso (Geral / Feminino / Masculino / Faixa etária) |
| **Correr** | Timer ao vivo, mapa de rota, BPM, compartilhamento e SOS |
| **Comunidade** | Amigos, eventos e compromissos |
| **Perfil** | Conquistas, recordes pessoais e rankings atuais |

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão **16 ou superior**
- npm versão 8 ou superior (já vem com o Node)

Verifique suas versões:
```bash
node --version   # v16.x ou superior
npm --version    # 8.x ou superior
```

## Instalação e execução local

```bash
# 1. Clone o repositório (ou baixe o zip)
git clone <url-do-repositorio>
cd paceclub

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Abra o navegador em **http://localhost:5173** (ou a porta indicada no terminal).

> Para melhor experiência mobile, abra o Chrome DevTools (F12), ative o modo responsivo (Ctrl+Shift+M) e selecione um iPhone ou Android como dispositivo.

## Build para produção

```bash
npm run build
```

Os arquivos otimizados ficam na pasta `dist/`. Para servir localmente:

```bash
npm run preview
```

## Estrutura do projeto

```
paceclub/
├── public/
├── src/
│   ├── components/
│   │   ├── Avatar.jsx        # Avatar com iniciais coloridas
│   │   └── BottomNav.jsx     # Barra de navegação inferior
│   ├── screens/
│   │   ├── HomeScreen.jsx    # Feed social
│   │   ├── RankingsScreen.jsx
│   │   ├── RunScreen.jsx     # Corrida ao vivo
│   │   ├── CommunityScreen.jsx
│   │   ├── ProfileScreen.jsx
│   │   └── RoutesScreen.jsx
│   ├── data/
│   │   └── mockData.js       # Dados de exemplo
│   ├── App.jsx               # Roteamento entre telas
│   └── index.css             # Estilos globais (Tailwind)
├── .claude/
│   └── settings.json         # Permissões do Claude Code
├── CLAUDE.md                 # Documentação técnica para o Claude
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Tecnologias utilizadas

- **React 18** — Interface de usuário
- **Vite 4** — Build tool e dev server
- **Tailwind CSS 3** — Estilização utility-first
- **lucide-react** — Ícones

## Funcionalidades

- Feed social com stories, curtidas, comentários e compartilhamento
- Timer de corrida ao vivo com contador de km, ritmo e BPM simulado
- Mapa SVG de rota durante a corrida
- Rankings com filtros por categoria (geral, feminino, masculino, faixa etária)
- Comunidade com amigos, grupos e eventos
- Perfil com conquistas e recordes pessoais
- Compartilhamento de localização com amigos durante a corrida
- Botão SOS de emergência
- Nível de confiança do corredor (verificação por telefone, eventos, etc.)

## Dados

Todos os dados são mockados em `src/data/mockData.js`. Para conectar a um backend real, substitua as importações desse arquivo por chamadas de API mantendo os mesmos formatos de objeto.
