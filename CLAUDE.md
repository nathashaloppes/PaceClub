# PaceClub — Documentação do Projeto

## Visão Geral
Aplicativo mobile-first de corrida e comunidade, inspirado no design do mockup PaceClub.pdf. Construído como Progressive Web App (PWA) para funcionar em celular via browser.

## Tech Stack
- **Framework**: React 18 + Vite 4
- **Estilização**: Tailwind CSS 3
- **Ícones**: lucide-react
- **Node mínimo**: 16.x

## Estrutura de Arquivos

```
src/
  components/
    Avatar.jsx        — Avatar com iniciais e gradiente baseado no nome
    BottomNav.jsx     — Navegação inferior (5 abas)
  screens/
    HomeScreen.jsx    — Feed social (stories + posts de corridas)
    RankingsScreen.jsx — Ranking por percurso (Beira Mar 5km etc.)
    RunScreen.jsx     — Tela de corrida em andamento + SOS
    CommunityScreen.jsx — Amigos / Grupos / Eventos
    ProfileScreen.jsx — Perfil do usuário logado
    RoutesScreen.jsx  — Percursos em mapa e lista
  data/
    mockData.js       — Dados mock: usuário, feed, rankings, rotas, amigos
  App.jsx             — Roteamento entre telas via estado
  index.css           — Tailwind + estilos globais
```

## Telas e Navegação
| Tab ID        | Tela                   |
|---------------|------------------------|
| `home`        | HomeScreen             |
| `rankings`    | RankingsScreen         |
| `run`         | RunScreen              |
| `community`   | CommunityScreen        |
| `profile`     | ProfileScreen          |

> A tela `RoutesScreen` está no `SCREENS` map mas sem tab própria — pode ser acessada programaticamente ou associada a outro tab.

## Paleta de Cores
```js
primary: '#2563EB'   // azul (ações, navegação ativa, destaque)
accent:  '#F97316'   // laranja (botão Correr, CTA principais)
```

## Decisões de Arquitetura
- **Sem router externo**: navegação por `useState` em `App.jsx` — simples, suficiente para mobile SPA sem deep links.
- **Dados mock**: tudo em `src/data/mockData.js`. Para conectar backend, trocar pelas chamadas de API mantendo os mesmos shapes de dados.
- **Avatar sem imagem**: gera gradiente e iniciais automaticamente a partir do nome — sem necessidade de upload de fotos para o MVP.
- **Timer de corrida**: usa `setInterval` local em `RunScreen` — não persiste entre reloads, adequado para demo.

## Como Rodar
```bash
npm install
npm run dev
# abre em http://localhost:5173
```

## Funcionalidades Implementadas
- [x] Feed social com stories e posts de corrida
- [x] Curtir, comentar, salvar posts
- [x] Ranking por percurso com filtros de categoria
- [x] Tela de corrida com timer ao vivo, GPS, BPM e mapa
- [x] Compartilhamento de localização com amigos
- [x] Botão SOS de emergência
- [x] Comunidade: amigos, grupos, eventos
- [x] Perfil com conquistas, recordes pessoais e rankings
- [x] Percursos em mapa SVG e lista
- [x] Nível de confiança do corredor

## Próximas Features (Backlog)
- [ ] Autenticação (login / cadastro)
- [ ] Integração com GPS real via `navigator.geolocation`
- [ ] Mapa real com Mapbox ou Google Maps
- [ ] Backend com Supabase ou Firebase
- [ ] Push notifications para eventos
- [ ] Upload de foto de perfil
- [ ] Onboarding para novos usuários

## Convenções
- Componentes: PascalCase, um por arquivo
- Dados mock: importar de `../data/mockData` — não hardcodar nos componentes
- Estilos: Tailwind utility-first; `className` inline; sem CSS Modules
- Sem comentários nos componentes salvo por `WHY` não-óbvio
