export const suggestedUsers = [
  { id: 1, name: 'Pedro Alves', city: 'Fortaleza, CE', mutualFriends: 8 },
  { id: 2, name: 'Juliana Costa', city: 'Fortaleza, CE', mutualFriends: 5 },
  { id: 3, name: 'Rafael Melo', city: 'Caucaia, CE', mutualFriends: 3 },
  { id: 4, name: 'Beatriz Lima', city: 'Maracanaú, CE', mutualFriends: 11 },
  { id: 5, name: 'Thiago Rocha', city: 'Fortaleza, CE', mutualFriends: 2 },
  { id: 6, name: 'Fernanda Dias', city: 'Eusébio, CE', mutualFriends: 7 },
];

export const currentUser = {
  id: 1,
  name: 'Nathasha Lopes',
  username: '@nathashalopes',
  location: 'Fortaleza, CE',
  assessoria: 'Running Team Fortaleza',
  rating: 5.0,
  avatar: null,
  followers: 245,
  following: 180,
  runs: 367,
};

export const initialFeedPosts = [
  {
    id: 1,
    type: 'workout',
    user: { name: 'Nathasha Lopes' },
    isOwn: true,
    time: 'Hoje às 06:15',
    location: 'Beira Mar, Fortaleza',
    distance: '5,02',
    duration: '28:10',
    pace: '5:37 /km',
    description: 'Treino concluído com sucesso! 🏅\nBora pra cima! 💪',
    likes: 128,
    comments: 23,
    participants: [],
  },
  {
    id: 2,
    type: 'workout',
    user: { name: 'Íkaro Sousa' },
    time: 'Ontem às 18:30',
    location: 'Parque do Cocó',
    distance: '10,1',
    duration: '59:40',
    pace: '5:55 /km',
    description: 'Corrida noturna no Cocó! Que clima gostoso.',
    likes: 95,
    comments: 12,
    participants: [],
  },
];

export const achievements = [
  { id: 1, icon: '🥇', label: '12', sublabel: 'Medalhas' },
  { id: 2, icon: '👑', label: 'Rainha da', sublabel: 'Beira Mar (Jun)' },
  { id: 3, icon: '🔥', label: '45', sublabel: 'Dias consecutivos' },
  { id: 4, icon: '🏆', label: 'Top 10', sublabel: 'Fortaleza' },
];

export const personalRecords = [
  { distance: '5 km', time: '28:10', isRecord: true },
  { distance: '10 km', time: '58:40', isRecord: true },
  { distance: '21 km', time: '2:15:30', isRecord: true },
  { distance: 'Total', time: '1.850 km', isRecord: false },
];

export const currentRankings = [
  { race: 'Beira Mar 5 km', position: '2º lugar', time: '28:10' },
  { race: 'Parque do Cocó 10 km', position: '3º lugar', time: '59:40' },
];

export const rankingRoutes = [
  {
    id: 1, name: 'Beira Mar 5 km', city: 'Fortaleza', state: 'CE',
    participants: 2347, record: '25:08',
    leaderboard: [
      { pos: 1, name: 'Ana Paula', time: '25:08', pace: '5:01 /km' },
      { pos: 2, name: 'Isa Albuquerque', time: '26:40', pace: '5:20 /km' },
      { pos: 3, name: 'Íkaro Sousa', time: '27:00', pace: '5:24 /km' },
      { pos: 4, name: 'Nathasha Lopes', time: '28:10', pace: '5:37 /km', isCurrentUser: true },
      { pos: 5, name: 'Ian Carlos', time: '29:15', pace: '5:51 /km' },
      { pos: 6, name: 'Carla Mendes', time: '30:02', pace: '6:00 /km' },
      { pos: 7, name: 'Lucas Ferreira', time: '30:45', pace: '6:09 /km' },
      { pos: 8, name: 'Amanda Silva', time: '31:20', pace: '6:16 /km' },
    ],
  },
  {
    id: 2, name: 'Beira Mar 10 km', city: 'Fortaleza', state: 'CE',
    participants: 1456, record: '47:30',
    leaderboard: [
      { pos: 1, name: 'Mateus Lima', time: '47:30', pace: '4:45 /km' },
      { pos: 2, name: 'Carlos Neto', time: '49:12', pace: '4:55 /km' },
      { pos: 3, name: 'Íkaro Sousa', time: '51:20', pace: '5:08 /km' },
      { pos: 4, name: 'Pedro Alves', time: '53:00', pace: '5:18 /km' },
      { pos: 5, name: 'Nathasha Lopes', time: '58:40', pace: '5:52 /km', isCurrentUser: true },
      { pos: 6, name: 'Juliana Costa', time: '59:10', pace: '5:55 /km' },
      { pos: 7, name: 'Lucas Ferreira', time: '1:01:00', pace: '6:06 /km' },
    ],
  },
  {
    id: 3, name: 'Parque do Cocó 10 km', city: 'Fortaleza', state: 'CE',
    participants: 1892, record: '47:35',
    leaderboard: [
      { pos: 1, name: 'Rafael Melo', time: '47:35', pace: '4:45 /km' },
      { pos: 2, name: 'Mateus Lima', time: '48:50', pace: '4:53 /km' },
      { pos: 3, name: 'Nathasha Lopes', time: '59:40', pace: '5:58 /km', isCurrentUser: true },
      { pos: 4, name: 'Amanda Silva', time: '1:02:00', pace: '6:12 /km' },
      { pos: 5, name: 'Carla Mendes', time: '1:05:30', pace: '6:33 /km' },
    ],
  },
  {
    id: 4, name: 'Praia do Futuro 7 km', city: 'Fortaleza', state: 'CE',
    participants: 1256, record: '32:19',
    leaderboard: [
      { pos: 1, name: 'Ana Paula', time: '32:19', pace: '4:37 /km' },
      { pos: 2, name: 'Lucas Ferreira', time: '33:45', pace: '4:49 /km' },
      { pos: 3, name: 'Íkaro Sousa', time: '35:00', pace: '5:00 /km' },
      { pos: 4, name: 'Nathasha Lopes', time: '38:22', pace: '5:29 /km', isCurrentUser: true },
      { pos: 5, name: 'Beatriz Lima', time: '40:10', pace: '5:44 /km' },
    ],
  },
  {
    id: 5, name: 'Ibirapuera 21 km', city: 'São Paulo', state: 'SP',
    participants: 4521, record: '1:42:30',
    leaderboard: [
      { pos: 1, name: 'Diego Santos', time: '1:42:30', pace: '4:54 /km' },
      { pos: 2, name: 'Marina Lopes', time: '1:45:00', pace: '5:00 /km' },
      { pos: 3, name: 'Fernanda Dias', time: '1:48:20', pace: '5:09 /km' },
      { pos: 4, name: 'Thiago Rocha', time: '1:52:00', pace: '5:19 /km' },
      { pos: 5, name: 'Nathasha Lopes', time: '2:15:30', pace: '6:27 /km', isCurrentUser: true },
    ],
  },
  {
    id: 6, name: 'Aterro do Flamengo 10 km', city: 'Rio de Janeiro', state: 'RJ',
    participants: 3102, record: '45:20',
    leaderboard: [
      { pos: 1, name: 'Bruno Carvalho', time: '45:20', pace: '4:32 /km' },
      { pos: 2, name: 'Carolina Souza', time: '46:55', pace: '4:41 /km' },
      { pos: 3, name: 'Rafael Melo', time: '48:10', pace: '4:49 /km' },
      { pos: 4, name: 'Luciana Pinto', time: '50:30', pace: '5:03 /km' },
      { pos: 5, name: 'Pedro Alves', time: '52:00', pace: '5:12 /km' },
    ],
  },
  {
    id: 7, name: 'Parque da Cidade 5 km', city: 'Brasília', state: 'DF',
    participants: 892, record: '26:15',
    leaderboard: [
      { pos: 1, name: 'Felipe Costa', time: '26:15', pace: '5:15 /km' },
      { pos: 2, name: 'Amanda Silva', time: '27:30', pace: '5:30 /km' },
      { pos: 3, name: 'Ricardo Nunes', time: '28:45', pace: '5:45 /km' },
      { pos: 4, name: 'Beatriz Lima', time: '29:20', pace: '5:52 /km' },
      { pos: 5, name: 'Lucas Ferreira', time: '30:00', pace: '6:00 /km' },
    ],
  },
  {
    id: 8, name: 'Orla de Maceió 8 km', city: 'Maceió', state: 'AL',
    participants: 678, record: '38:44',
    leaderboard: [
      { pos: 1, name: 'Paulo Mendes', time: '38:44', pace: '4:51 /km' },
      { pos: 2, name: 'Viviane Torres', time: '39:50', pace: '4:59 /km' },
      { pos: 3, name: 'Jorge Barros', time: '41:00', pace: '5:08 /km' },
      { pos: 4, name: 'Camila Freitas', time: '42:30', pace: '5:19 /km' },
      { pos: 5, name: 'Alex Rocha', time: '44:00', pace: '5:30 /km' },
    ],
  },
];

export const routes = [
  { id: 1, name: 'Beira Mar 5 km', participants: 2347, record: '25:08', color: '#3B82F6', distance: 5 },
  { id: 2, name: 'Parque do Cocó 10 km', participants: 1892, record: '47:35', color: '#F97316', distance: 10 },
  { id: 3, name: 'Praia do Futuro 7 km', participants: 1256, record: '32:19', color: '#8B5CF6', distance: 7 },
];

export const friends = [
  { id: 1, name: 'Amanda Silva', assessoria: 'RTF', distance: '5 km', pace: '5:30', following: true },
  { id: 2, name: 'Lucas Ferreira', assessoria: 'RTF', distance: '10 km', pace: '5:45', following: true },
  { id: 3, name: 'Carla Mendes', assessoria: 'Supera', distance: '21 km', pace: '6:10', following: false },
  { id: 4, name: 'Íkaro Sousa', assessoria: 'RTF', distance: '10 km', pace: '5:20', following: true },
  { id: 5, name: 'Marina Lopes', assessoria: 'Vem Correr', distance: '5 km', pace: '6:00', following: false },
  { id: 6, name: 'Pedro Alves', assessoria: 'RTF', distance: '5 km', pace: '5:15', following: true },
  { id: 7, name: 'Juliana Costa', assessoria: 'Supera', distance: '10 km', pace: '5:50', following: false },
];

export const followers = [
  { id: 1, name: 'Amanda Silva', assessoria: 'RTF', pace: '5:30' },
  { id: 2, name: 'Lucas Ferreira', assessoria: 'RTF', pace: '5:45' },
  { id: 3, name: 'Íkaro Sousa', assessoria: 'RTF', pace: '5:20' },
  { id: 4, name: 'Carla Mendes', assessoria: 'Supera', pace: '6:10' },
  { id: 5, name: 'Ian Carlos', assessoria: 'Vem Correr', pace: '5:51' },
  { id: 6, name: 'Beatriz Lima', assessoria: 'Supera', pace: '5:44' },
];

export const groups = [
  { id: 1, name: 'Running Team Fortaleza', members: 234, category: 'Assessoria' },
  { id: 2, name: 'Maratonistas CE', members: 89, category: 'Grupo' },
  { id: 3, name: 'Iniciantes Beira Mar', members: 156, category: 'Iniciantes' },
];

export const events = [
  { id: 1, name: 'Corrida Beira Mar', date: '15 Jun', distance: '5 km', participants: 2347 },
  { id: 2, name: 'Night Run Cocó', date: '22 Jun', distance: '10 km', participants: 892 },
  { id: 3, name: 'Ultra Praia do Futuro', date: '29 Jun', distance: '21 km', participants: 445 },
];

export const initialNotifications = [
  { id: 1, type: 'like', user: 'Amanda Silva', text: 'curtiu sua publicação', time: '2 min', preview: '5,02 km · 28:10', read: false },
  { id: 2, type: 'comment', user: 'Lucas Ferreira', text: 'comentou: "Muito bom! 🔥"', time: '15 min', preview: '5,02 km · 28:10', read: false },
  { id: 3, type: 'follow_request', user: 'Rafael Melo', text: 'quer te seguir', time: '1h', read: false },
  { id: 4, type: 'participate', user: 'Íkaro Sousa', text: 'quer participar do seu treino em Beira Mar', time: '2h', read: false },
  { id: 5, type: 'training_invite', user: 'Amanda Silva', text: 'te convidou para correr', time: '3h', location: 'Parque do Cocó', date: '15/06', runTime: '07:00', distance: '10 km', read: true },
  { id: 6, type: 'like', user: 'Carla Mendes', text: 'curtiu sua publicação', time: '5h', read: true },
  { id: 7, type: 'follow_request', user: 'Beatriz Lima', text: 'quer te seguir', time: '1d', read: true },
];

export const myProfilePosts = [
  {
    id: 'mp1',
    type: 'workout',
    user: { name: 'Nathasha Lopes' },
    time: 'Hoje às 06:15',
    location: 'Beira Mar, Fortaleza',
    distance: '5,02',
    duration: '28:10',
    pace: '5:37 /km',
    description: 'Treino concluído com sucesso! 🏅\nBora pra cima! 💪',
    likes: 128,
    comments: 23,
  },
  {
    id: 'mp2',
    type: 'thought',
    user: { name: 'Nathasha Lopes' },
    time: 'Ontem às 18:00',
    text: 'Cada km conta! 💪 Sem desculpas hoje.',
    likes: 45,
    comments: 8,
  },
  {
    id: 'mp3',
    type: 'workout',
    user: { name: 'Nathasha Lopes' },
    time: '3 dias atrás',
    location: 'Parque do Cocó',
    distance: '10,1',
    duration: '1:01:20',
    pace: '6:04 /km',
    description: 'Longa de sábado! Meta batida 🎯',
    likes: 92,
    comments: 14,
  },
  {
    id: 'mp4',
    type: 'photo',
    user: { name: 'Nathasha Lopes' },
    time: '5 dias atrás',
    description: 'Nascer do sol na Beira Mar 🌅',
    likes: 67,
    comments: 11,
  },
];

export const thirdPartyProfilePosts = [
  {
    id: 'tp1',
    type: 'workout',
    time: 'Hoje às 07:30',
    location: 'Beira Mar, Fortaleza',
    distance: '7,5',
    duration: '42:30',
    pace: '5:40 /km',
    description: 'Treino matinal! Cada dia mais forte 💪',
    likes: 78,
    comments: 9,
  },
  {
    id: 'tp2',
    type: 'thought',
    time: 'Ontem às 20:00',
    text: 'Quem corre junto, chega mais longe! Bora galera 🔥',
    likes: 34,
    comments: 5,
  },
  {
    id: 'tp3',
    type: 'workout',
    time: '4 dias atrás',
    location: 'Praia do Futuro',
    distance: '5,0',
    duration: '28:45',
    pace: '5:45 /km',
    likes: 55,
    comments: 7,
  },
];

export const initialCommitments = [
  { id: 1, friend: 'Amanda Silva', location: 'Beira Mar, Fortaleza', date: '15 Jun', time: '06:00', distance: '5 km', status: 'confirmed' },
  { id: 2, friend: 'Lucas Ferreira', location: 'Parque do Cocó', date: '22 Jun', time: '07:00', distance: '10 km', status: 'confirmed' },
  { id: 3, friend: 'Íkaro Sousa', location: 'Praia do Futuro', date: '29 Jun', time: '05:30', distance: '7 km', status: 'pending_my_response' },
];
