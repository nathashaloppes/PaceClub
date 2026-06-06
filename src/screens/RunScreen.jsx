import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Pause, Play, Flag, Lock, Radio, AlertTriangle, Search, X, ChevronRight, MapPin } from 'lucide-react';
import Avatar from '../components/Avatar';
import { friends } from '../data/mockData';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function formatPace(seconds, km) {
  if (km === 0) return '--:--';
  const paceSeconds = seconds / km;
  const m = Math.floor(paceSeconds / 60);
  const s = Math.floor(paceSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const ALL_ROUTES = [
  { name: 'Beira Mar 5 km',          record: '25:08', participants: 2347, color: '#7C3AED' },
  { name: 'Parque do Cocó 10 km',    record: '47:35', participants: 1892, color: '#F97316' },
  { name: 'Praia do Futuro 7 km',    record: '32:19', participants: 1256, color: '#8B5CF6' },
  { name: 'Mucuripe 3 km',           record: '14:45', participants: 987,  color: '#10B981' },
  { name: 'Aldeota Loop 8 km',       record: '39:02', participants: 763,  color: '#EF4444' },
  { name: 'Cocó – Aguas Park 12 km', record: '58:17', participants: 541,  color: '#3B82F6' },
];

export default function RunScreen() {
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [bpm, setBpm] = useState(0);
  const [showSOS, setShowSOS] = useState(false);
  const [showMoreRoutes, setShowMoreRoutes] = useState(false);
  const [friendSearch, setFriendSearch] = useState('');
  const [sharingWith, setSharingWith] = useState(new Set([friends[0]?.name, friends[1]?.name].filter(Boolean)));
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setElapsed(e => e + 1);
        setDistance(d => d + 0.0014);
        setBpm(b => {
          const variation = (Math.random() - 0.5) * 4;
          const target = 165;
          return Math.round(Math.max(140, Math.min(185, b + (target - b) * 0.05 + variation)));
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function handleStart() {
    setStarted(true);
    setRunning(true);
    setBpm(155);
  }

  function handleToggle() {
    setRunning(r => !r);
  }

  function toggleShare(name) {
    setSharingWith(prev => {
      const s = new Set(prev);
      s.has(name) ? s.delete(name) : s.add(name);
      return s;
    });
  }

  const visibleRoutes = showMoreRoutes ? ALL_ROUTES : ALL_ROUTES.slice(0, 3);
  const filteredFriends = friends.filter(f =>
    f.name.toLowerCase().includes(friendSearch.toLowerCase()) ||
    f.assessoria.toLowerCase().includes(friendSearch.toLowerCase())
  );

  const km = distance.toFixed(2);
  const pace = formatPace(elapsed, distance);

  if (!started) {
    return (
      <div className="flex flex-col h-full bg-gray-50 overflow-hidden">
        <div className="pt-12 pb-4 px-4 bg-white border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Correr</h2>
          <p className="text-sm text-gray-500 mt-1">Pronto para começar seu treino?</p>
        </div>

        <div className="flex-1 scrollable p-4 space-y-4 pb-4">
          {/* Mapa */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="relative h-44 map-bg">
              <div className="absolute inset-0 bg-black/20" />
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 176" preserveAspectRatio="none">
                <path d="M 20 140 Q 60 110 100 90 Q 140 70 180 80 Q 220 90 260 65 Q 290 50 310 45" fill="none" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
                <circle cx="20" cy="140" r="6" fill="#7C3AED" />
                <circle cx="310" cy="45" r="8" fill="#F97316">
                  <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <path d="M 60 100 Q 80 85 100 90" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 4" />
                <path d="M 180 80 Q 200 72 220 78" fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="6 4" />
              </svg>
              <div className="absolute top-3 left-3 bg-white/90 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-xs font-semibold text-gray-700">GPS ativo</span>
              </div>
              <div className="absolute bottom-3 right-3 flex flex-col gap-1">
                <div className="bg-white/90 rounded-lg p-1.5 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">+</span>
                </div>
                <div className="bg-white/90 rounded-lg p-1.5 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">−</span>
                </div>
              </div>
            </div>
          </div>

          {/* Percursos populares */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin size={16} className="text-primary" />
              </span>
              Percursos populares
            </h3>
            {visibleRoutes.map(route => (
              <div key={route.name} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: route.color }} />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">{route.name}</p>
                  <p className="text-xs text-gray-400">{route.participants.toLocaleString('pt-BR')} participantes · Recorde {route.record}</p>
                </div>
                <button className="text-primary text-xs font-semibold border border-primary px-3 py-1.5 rounded-full">
                  Selecionar
                </button>
              </div>
            ))}
            {!showMoreRoutes && (
              <button
                onClick={() => setShowMoreRoutes(true)}
                className="w-full flex items-center justify-center gap-1 pt-3 text-primary text-sm font-semibold"
              >
                Ver mais percursos
                <ChevronRight size={16} />
              </button>
            )}
          </div>

          {/* Compartilhar localização */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                <Radio size={16} className="text-green-500" />
              </span>
              Compartilhar localização
            </h3>

            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2.5 mb-3">
              <Search size={15} className="text-gray-400 flex-shrink-0" />
              <input
                className="bg-transparent flex-1 text-sm outline-none text-gray-700 placeholder-gray-400"
                placeholder="Buscar amigo para acompanhar"
                value={friendSearch}
                onChange={e => setFriendSearch(e.target.value)}
              />
              {friendSearch && (
                <button onClick={() => setFriendSearch('')}>
                  <X size={14} className="text-gray-400" />
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-52 overflow-y-auto">
              {filteredFriends.map(f => {
                const isSharing = sharingWith.has(f.name);
                return (
                  <div key={f.id} className="flex items-center gap-3">
                    <Avatar name={f.name} size={36} />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-gray-700 truncate block">{f.name}</span>
                      <span className="text-xs text-gray-400 truncate block">{f.assessoria}</span>
                    </div>
                    <button
                      onClick={() => toggleShare(f.name)}
                      className={`w-11 h-6 rounded-full relative transition-colors ${isSharing ? 'bg-primary' : 'bg-gray-200'}`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow ${isSharing ? 'right-0.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                );
              })}
              {filteredFriends.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-2">Nenhum amigo encontrado</p>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 py-3 bg-white border-t border-gray-100">
          <button
            onClick={handleStart}
            className="w-full bg-accent text-white font-black text-lg py-5 rounded-2xl shadow-lg shadow-orange-200 active:scale-95 transition-transform"
          >
            Iniciar Corrida
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <button
          onClick={() => { setStarted(false); setRunning(false); setElapsed(0); setDistance(0); setBpm(0); }}
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="font-semibold">Corrida em andamento</span>
        <div className="flex items-center gap-1.5">
          <span className="text-green-400 text-sm font-semibold">GPS</span>
          <div className="flex gap-1">
            {[1,2,3].map(i => (
              <div key={i} className="w-1.5 h-1.5 bg-green-400 rounded-full" style={{ opacity: running ? 1 : 0.3 }} />
            ))}
          </div>
        </div>
      </div>

      <div className="text-center px-4 pb-6 bg-gray-900">
        <p className="text-8xl font-black tracking-tight text-white">{km}</p>
        <p className="text-gray-400 text-lg mt-1">Quilômetros</p>

        <div className="flex justify-around mt-8">
          <div className="text-center">
            <p className="text-4xl font-bold">{formatTime(elapsed)}</p>
            <p className="text-gray-400 text-sm mt-1">Tempo</p>
          </div>
          <div className="w-px bg-gray-700" />
          <div className="text-center">
            <p className="text-4xl font-bold">{bpm > 0 ? bpm : '--'}</p>
            <p className="text-gray-400 text-sm mt-1">BPM médio</p>
          </div>
          <div className="w-px bg-gray-700" />
          <div className="text-center">
            <p className="text-4xl font-bold">{pace}</p>
            <p className="text-gray-400 text-sm mt-1">Ritmo médio /km</p>
          </div>
        </div>
      </div>

      <div className="flex-1 relative map-bg">
        <div className="absolute inset-0 bg-black/30" />
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 200" preserveAspectRatio="none">
          <path
            d="M 30 160 Q 80 120 120 100 Q 160 80 200 90 Q 240 100 270 80"
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="30" cy="160" r="6" fill="#22c55e" />
          <circle cx="270" cy="80" r="8" fill="#7C3AED">
            <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      <div className="bg-gray-900 px-6 pt-4 pb-6">
        <div className="flex justify-around items-center mb-4">
          <button className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center active:scale-95 transition-transform">
            <Lock size={22} />
          </button>
          <button
            onClick={handleToggle}
            className="w-18 h-18 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 active:scale-95 transition-transform"
            style={{ width: 72, height: 72 }}
          >
            {running ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" />}
          </button>
          <button className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center active:scale-95 transition-transform">
            <Flag size={22} />
          </button>
        </div>

        <div className="bg-gray-800 rounded-2xl p-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-2">Compartilhando com {sharingWith.size} {sharingWith.size === 1 ? 'pessoa' : 'pessoas'}</p>
              <div className="flex gap-2">
                {Array.from(sharingWith).slice(0, 3).map(name => (
                  <div key={name} className="flex items-center gap-1.5">
                    <Avatar name={name} size={28} />
                    <span className="text-xs text-gray-300">{name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="bg-primary px-4 py-2 rounded-xl text-sm font-semibold">
              Ver ao vivo
            </button>
          </div>
        </div>

        <button
          onClick={() => setShowSOS(true)}
          className="w-full bg-red-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <AlertTriangle size={20} />
          SOS Enviar alerta de emergência
        </button>
      </div>

      {showSOS && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 px-6">
          <div className="bg-white rounded-3xl p-6 w-full">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle size={32} className="text-red-500" />
              </div>
              <h3 className="text-xl font-black text-gray-900">Alerta de Emergência</h3>
              <p className="text-gray-500 text-sm mt-2">Sua localização será compartilhada com seus contatos de emergência.</p>
            </div>
            <button
              onClick={() => setShowSOS(false)}
              className="w-full bg-red-500 text-white font-bold py-4 rounded-2xl mb-3 text-lg"
            >
              Enviar SOS
            </button>
            <button
              onClick={() => setShowSOS(false)}
              className="w-full text-gray-500 font-semibold py-3"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
