import { useState } from 'react';
import { ArrowLeft, Search, MapPin, Users, Flame, X } from 'lucide-react';
import Avatar from '../components/Avatar';
import { rankingRoutes } from '../data/mockData';

const TABS = ['Geral', 'Feminino', 'Masculino', 'Faixa etária'];
const MEDAL = { 1: 'bg-yellow-400', 2: 'bg-gray-300', 3: 'bg-orange-400' };

const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const d = new Date();
const CURRENT_MONTH = `${MONTHS_PT[d.getMonth()]} ${d.getFullYear()}`;

// ─── Lista de percursos ────────────────────────────────────────────
function RouteList({ onSelect }) {
  const [search, setSearch] = useState('');

  const filtered = rankingRoutes.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.city.toLowerCase().includes(search.toLowerCase()) ||
    r.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-12 pb-3 bg-white border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Rankings</h2>
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5">
          <Search size={16} className="text-gray-400 flex-shrink-0" />
          <input
            className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"
            placeholder="Buscar percurso por nome ou cidade..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch('')}>
              <X size={14} className="text-gray-400" />
            </button>
          )}
        </div>
      </div>

      <div className="scrollable flex-1 min-h-0 pb-6 bg-gray-50 pt-3 px-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Search size={36} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm font-medium">Nenhum percurso encontrado</p>
            <p className="text-gray-300 text-xs mt-1">Tente outro nome ou cidade</p>
          </div>
        ) : (
          filtered.map(route => (
            <button
              key={route.id}
              onClick={() => onSelect(route)}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-left active:scale-98 transition-transform flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#7C3AED">
                  <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 truncate">{route.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={11} className="text-gray-400" />
                  <p className="text-xs text-gray-400">{route.city} - {route.state}</p>
                </div>
                <p className="text-xs text-primary/70 font-medium mt-0.5">{CURRENT_MONTH}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="flex items-center gap-1">
                    <Users size={11} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{route.participants.toLocaleString('pt-BR')} part.</span>
                  </div>
                  <span className="text-xs text-gray-300">·</span>
                  <span className="text-xs text-gray-500">Recorde {route.record}</span>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-300 flex-shrink-0">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Detalhe do percurso ───────────────────────────────────────────
function RouteDetail({ route, onBack }) {
  const [tab, setTab] = useState('Geral');
  const list = route.leaderboard || [];

  return (
    <div className="flex flex-col h-full">
      <div className="relative">
        <div className="h-44 map-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/55" />
          <button
            onClick={onBack}
            className="absolute top-12 left-4 w-9 h-9 bg-white/20 backdrop-blur rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={18} color="white" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-2xl font-black text-white">{route.name}</h2>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={13} color="white" className="opacity-80" />
              <span className="text-white text-sm opacity-80">{route.city} - {route.state}</span>
            </div>
            <p className="text-white/60 text-xs mt-0.5 font-medium">{CURRENT_MONTH}</p>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Users size={15} className="text-gray-400" />
            <span className="text-sm text-gray-600 font-medium">
              {route.participants.toLocaleString('pt-BR')} participantes
            </span>
          </div>
          <button className="text-primary text-sm font-semibold border border-primary/40 px-3 py-1.5 rounded-full">
            Sobre o percurso
          </button>
        </div>
      </div>

      <div className="flex bg-white px-4 pt-3 pb-1 gap-2 overflow-x-auto flex-shrink-0">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0 transition-colors ${tab === t ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="scrollable flex-1 min-h-0 bg-white pb-36 pt-2">
        {list.map(runner => (
          <div
            key={runner.pos}
            className={`flex items-center gap-3 px-4 py-3 ${runner.isCurrentUser ? 'bg-blue-50 mx-2 rounded-2xl my-1' : 'border-b border-gray-50'}`}
          >
            <div className="w-8 flex-shrink-0 flex items-center justify-center">
              {runner.pos <= 3 ? (
                <div className={`w-7 h-7 rounded-full ${MEDAL[runner.pos]} flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{runner.pos}</span>
                </div>
              ) : (
                <span className="text-gray-400 font-semibold text-sm">{runner.pos}</span>
              )}
            </div>
            <Avatar name={runner.name} size={40} ring={runner.isCurrentUser} />
            <div className="flex-1 min-w-0">
              <p className={`font-semibold text-sm truncate ${runner.isCurrentUser ? 'text-primary' : 'text-gray-900'}`}>
                {runner.name}
              </p>
              <p className="text-xs text-gray-400">Ritmo {runner.pace}</p>
            </div>
            <p className={`font-bold text-base ${runner.isCurrentUser ? 'text-primary' : 'text-gray-900'}`}>
              {runner.time}
            </p>
          </div>
        ))}
      </div>

      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 pb-2">
        <button className="w-full bg-accent text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-orange-200 active:scale-95 transition-transform">
          <Flame size={20} />
          Tentar bater este ranking
        </button>
      </div>
    </div>
  );
}

// ─── Rankings Screen ───────────────────────────────────────────────
export default function RankingsScreen() {
  const [selectedRoute, setSelectedRoute] = useState(null);

  if (selectedRoute) {
    return <RouteDetail route={selectedRoute} onBack={() => setSelectedRoute(null)} />;
  }
  return <RouteList onSelect={setSelectedRoute} />;
}
